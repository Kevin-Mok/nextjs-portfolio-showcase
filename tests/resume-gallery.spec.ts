import { expect, test } from '@playwright/test';
import { pdfVariants } from '../lib/resume-data';

test('every active PDF has its ordered name and a real first-page preview', async ({ page }) => {
  await page.goto('/resume-gallery');
  const cards = page.getByRole('button', { name: /^Preview / });
  await expect(cards).toHaveCount(pdfVariants.length);
  for (const [index, variant] of pdfVariants.entries()) {
    const card = cards.nth(index);
    await expect(card).toHaveAccessibleName(`Preview ${variant.label}`);
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator('canvas')).toBeVisible();
    expect(await card.locator('canvas').evaluate((canvas: HTMLCanvasElement) => {
      const pixels = canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data;
      return pixels.some((value, i) => i % 4 !== 3 && value < 100);
    })).toBe(true);
    await card.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAccessibleName(variant.label);
    await expect(dialog.getByRole('link', { name: 'Open PDF' })).toHaveAttribute('href', `/resume/${variant.value}`);
    await expect(dialog.locator('canvas').first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(card).toBeFocused();
  }
});

test('zoom is accurate, bounded, scrollable and fit resets/resizes; modal contains focus', async ({ page }) => {
  await page.goto('/resume-gallery');
  const card = page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true });
  await expect(card).toBeVisible();
  await card.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  const zoom = dialog.getByRole('status', { name: 'Zoom level' });
  await expect(dialog.locator('canvas').first()).toBeVisible();
  const initialFit = parseInt((await zoom.textContent())!);
  await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await expect(zoom).toHaveText(`${Math.min(250, initialFit + 25)}%`);
  for (let i = 0; i < 12 && await dialog.getByRole('button', { name: 'Zoom in' }).isEnabled(); i++) await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await expect(zoom).toHaveText('250%');
  await expect(dialog.getByRole('button', { name: 'Zoom in' })).toBeDisabled();
  await expect(dialog.locator('canvas').first()).toHaveAttribute('data-scale', '2.5');
  const canvas = dialog.locator('canvas').first();
  expect(await canvas.evaluate((el: HTMLCanvasElement) => el.getBoundingClientRect().width)).toBeCloseTo(612 * 2.5, 0);
  expect(await canvas.evaluate((el: HTMLCanvasElement) => el.width)).toBeGreaterThanOrEqual(1530);
  const scroller = dialog.getByRole('region', { name: 'PDF pages' });
  expect(await scroller.evaluate((el) => { el.scrollLeft = el.scrollWidth; el.scrollTop = el.scrollHeight; return el.scrollLeft > 0 && el.scrollTop > 0; })).toBe(true);
  for (let i = 0; i < 12 && await dialog.getByRole('button', { name: 'Zoom out' }).isEnabled(); i++) await dialog.getByRole('button', { name: 'Zoom out' }).click();
  await expect(zoom).toHaveText('25%');
  await expect(dialog.getByRole('button', { name: 'Zoom out' })).toBeDisabled();
  await dialog.getByRole('button', { name: 'Fit page' }).click();
  await expect(zoom).toHaveText(`${initialFit}%`);
  await page.setViewportSize({ width: 650, height: 500 });
  await expect.poll(async () => parseInt((await zoom.textContent())!)).toBeLessThan(initialFit);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(card).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('button', { name: `Preview ${pdfVariants[1].label}`, exact: true }).click();
  await expect(dialog.locator('canvas').first()).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Fit page' })).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await card.focus();
  await page.keyboard.press('Space');
  await expect(dialog).toBeVisible();
});

test('failed PDFs offer direct access and retry, without breaking other cards', async ({ page }) => {
  const target = `**/resume/${pdfVariants[0].value}`;
  await page.route(target, (route) => route.fulfill({ status: 404, body: 'Missing PDF' }));
  await page.goto('/resume-gallery');
  await page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('alert')).toContainText('Could not load');
  await expect(dialog.getByRole('link', { name: 'Open PDF' })).toHaveAttribute('href', `/resume/${pdfVariants[0].value}`);
  await page.unroute(target);
  await dialog.getByRole('button', { name: 'Retry' }).click();
  await expect(dialog.locator('canvas').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: `Preview ${pdfVariants[1].label}`, exact: true }).click();
  await expect(dialog.locator('canvas').first()).toBeVisible();
});

test('zoom never displays a canvas from the previous scale while rendering', async ({ page }) => {
  await page.goto('/resume-gallery');
  await page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('canvas')).toBeVisible();
  await dialog.evaluate((element) => {
    element.dataset.staleScales = '0';
    const observer = new MutationObserver(() => {
      const selectedScale = parseInt(element.querySelector('output')!.textContent!) / 100;
      for (const canvas of element.querySelectorAll('canvas')) {
        if (Number(canvas.dataset.scale) !== selectedScale) element.dataset.staleScales = String(Number(element.dataset.staleScales) + 1);
      }
    });
    observer.observe(element, { childList: true, characterData: true, subtree: true });
  });
  await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await expect.poll(async () => dialog.locator('canvas').getAttribute('data-scale')).toBe((parseInt((await dialog.locator('output').textContent())!) / 100).toString());
  await expect(dialog).toHaveAttribute('data-stale-scales', '0');
});

test('closing restores the activated card even when activation did not focus it', async ({ page }) => {
  await page.goto('/resume-gallery');
  const card = page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true });
  await card.evaluate((element: HTMLButtonElement) => element.click());
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(card).toBeFocused();
});

test('dark gallery shares a keyboard-accessible PDF inversion toggle with its viewer', async ({ page }) => {
  await page.goto('/resume-gallery');
  const card = page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true });
  const toggle = page.getByRole('button', { name: 'Invert PDF colors', exact: true });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(card.locator('canvas')).toBeVisible();
  await expect(card.locator('canvas')).toHaveCSS('filter', /resume-gallery-colors/);
  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(card.locator('canvas')).toHaveCSS('filter', 'none');
  await card.click();
  const dialog = page.getByRole('dialog');
  const viewerToggle = dialog.getByRole('button', { name: 'Invert PDF colors', exact: true });
  await expect(viewerToggle).toHaveAttribute('aria-pressed', 'false');
  await expect(dialog.locator('canvas')).toBeVisible();
  const displayedColors = async () => {
    const screenshot = await dialog.locator('canvas').screenshot();
    return page.evaluate(async (encoded) => {
      const img = new Image();
      img.src = `data:image/png;base64,${encoded}`;
      await img.decode();
      const sample = document.createElement('canvas');
      sample.width = img.width;
      sample.height = img.height;
      const context = sample.getContext('2d')!;
      context.drawImage(img, 0, 0);
      const pixels = context.getImageData(0, 0, sample.width, sample.height).data;
      return {
        background: Array.from(context.getImageData(4, 4, 1, 1).data).slice(0, 3),
        matchingText: pixels.some((value, i) => i % 4 === 0 && value === 240 && pixels[i + 1] === 246 && pixels[i + 2] === 252),
      };
    }, screenshot.toString('base64'));
  };
  expect((await displayedColors()).background).toEqual([255, 255, 255]);
  await viewerToggle.click();
  await expect(viewerToggle).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.locator('canvas')).toHaveCSS('filter', /resume-gallery-colors/);
  expect(await displayedColors()).toEqual({ background: [13, 17, 23], matchingText: true });
  await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await expect(dialog.locator('canvas')).toBeVisible();
  await expect(dialog.locator('canvas')).toHaveCSS('filter', /resume-gallery-colors/);
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(card.locator('canvas')).toHaveCSS('filter', /resume-gallery-colors/);
});

test('previous and next follow gallery order, retain colors and reset fit without leaving the viewer', async ({ page }) => {
  await page.goto('/resume-gallery');
  const first = page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true });
  await first.click();
  const dialog = page.getByRole('dialog');
  await page.setViewportSize({ width: 650, height: 650 });
  expect((await dialog.getByRole('heading', { level: 2 }).boundingBox())!.height).toBeLessThan(80);
  expect(await dialog.getByRole('button').evaluateAll((buttons) => {
    const boxes = buttons.map((button) => button.getBoundingClientRect());
    return boxes.every((a, i) => boxes.every((b, j) => i === j || a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top));
  })).toBe(true);
  await expect(dialog.getByRole('button', { name: 'Previous resume' })).toBeDisabled();
  await expect(dialog.locator('canvas')).toBeVisible();
  await dialog.getByRole('button', { name: 'Zoom in' }).click();
  await dialog.getByRole('button', { name: 'Invert PDF colors' }).click();
  await dialog.getByRole('button', { name: 'Next resume' }).click();
  await expect(dialog).toHaveAccessibleName(pdfVariants[1].label);
  await expect(dialog.locator('canvas')).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Open PDF' })).toHaveAttribute('href', `/resume/${pdfVariants[1].value}`);
  await expect(dialog.getByRole('button', { name: 'Fit page' })).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.getByRole('button', { name: 'Invert PDF colors' })).toHaveAttribute('aria-pressed', 'false');
  await dialog.getByRole('button', { name: 'Previous resume' }).click();
  await expect(dialog).toHaveAccessibleName(pdfVariants[0].label);
  await expect(dialog.getByRole('button', { name: 'Previous resume' })).toBeDisabled();
  await page.keyboard.press('Escape');
  await expect(first).toBeFocused();
  const last = page.getByRole('button', { name: `Preview ${pdfVariants.at(-1)!.label}`, exact: true });
  await last.click();
  await expect(dialog.getByRole('button', { name: 'Next resume' })).toBeDisabled();
  await expect(dialog.getByRole('button', { name: 'Previous resume' })).toBeEnabled();
  await dialog.getByRole('button', { name: 'Previous resume' }).click();
  await expect(dialog).toHaveAccessibleName(pdfVariants.at(-2)!.label);
});

test('narrow layout fits its controls and route stays unlisted', async ({ page, request }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('/resume-gallery');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: `Preview ${pdfVariants[0].label}`, exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('canvas').first()).toBeVisible();
  expect(await dialog.evaluate((el) => Math.round(el.getBoundingClientRect().width))).toBe(360);
  for (const label of ['Previous resume', 'Next resume', 'Zoom in', 'Zoom out', 'Fit page', 'Invert PDF colors', 'Close']) await expect(dialog.getByRole('button', { name: label, exact: true })).toBeInViewport();
  await page.screenshot({ path: '.local/resume-gallery/mobile-viewer.png' });
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('resume-gallery');
  await page.goto('/');
  await expect(page.locator('a[href="/resume-gallery"]')).toHaveCount(0);
});
