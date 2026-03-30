# Resume Generation Spec

This document defines the required layout rules for all generated resume PDFs.

## Baseline Reference (Source of Truth)

- Legacy reference PDF: `/home/kevin/coding/mf-site/static/pdf/kevin-mok-resume-web-dev.pdf`
- Baseline values are tracked in: `docs/resume/resume-layout-baseline.json`

## Non-Negotiable Rules

1. Bottom whitespace lock:
   - Every generated resume PDF must keep at least the current `web-dev` variant top/bottom whitespace (minimum floor enforcement).
   - Enforcement source is the generated `public/resume/kevin-mok-resume-web-dev.pdf`.
   - Allowed minimum-side tolerance: `-1.0pt` below the `web-dev` top/bottom whitespace floors.
   - Denser layouts that go below those floors are not allowed.
   - Specific variants may also enforce a tighter bottom-whitespace ceiling when a company-specific resume should fill the page more aggressively.
2. Spacing and legibility:
   - Keep resume content dense but readable.
   - Tighten section and bullet spacing to reduce excess vertical gaps.
   - If font size changes, keep line-height proportional so text stays readable.
3. Bold preservation:
   - Bold emphasis from legacy style must remain visible in generated PDFs.
   - Validate both CSS `font-weight` emphasis and embedded bold font faces in output PDFs.
4. Font determinism:
   - Resume PDFs must use the local Computer Modern font assets under `public/fonts/cmu/`.
   - Do not depend on external font CDNs for PDF generation.

## Measurement Method

Bottom whitespace is measured with `pdftotext -bbox-layout`:

- Parse first-page `<word yMax="...">` values.
- Find the maximum `yMax` (lowest rendered text boundary).
- Compute:
  - `bottomWhitespacePts = pageHeightPts - lastContentYMaxPts`
  - `bottomWhitespaceRatio = bottomWhitespacePts / pageHeightPts`

## Commands

Measure a single PDF (for baseline or debugging):

```fish
node scripts/measure-resume-bottom-whitespace.mjs --pdf /home/kevin/coding/mf-site/static/pdf/kevin-mok-resume-web-dev.pdf --json
```

Measure all generated resume PDFs:

```fish
npm run measure:resume-layout
```

Verify baseline lock against the stored legacy baseline:

```fish
npm run verify:resume-layout
```

Automatically calibrate print variables (iterative build -> measure -> adjust loop):

```fish
npm run calibrate:resume-layout
```

Target one variant during debugging:

```fish
npm run calibrate:resume-layout -- --variant web-dev
```

Run full resume PDF validation (pages, page size, fonts, bold, baseline lock):

```fish
npm run validate-resume-pdfs
```

Regenerate resume PDFs:

```fish
npm run build
```

## Enforcement Notes

- Verification scope is the canonical variant list in `scripts/lib/resume-pdf-variants.mjs`.
- Layout gate mode across calibration/verification/validation uses the baseline top/bottom minimums plus any per-variant bottom ceiling declared in `scripts/lib/resume-pdf-variants.mjs`:
  - pass if `pageCount === 1`
  - `actualTopWhitespacePts >= webDevTopWhitespacePts - tolerancePts`
  - `actualBottomWhitespacePts >= webDevBottomWhitespacePts - tolerancePts` unless a variant-specific ceiling replaces the default bottom minimum
  - `actualBottomWhitespacePts <= variantBottomWhitespaceMaxPts + tolerancePts` when a variant-specific ceiling is present
- `ai-agentic` currently enforces `bottomWhitespace <= 15pt` so the PDF cannot pass with a large blank block under the education section.
- Per-variant print controls live in `app/styles/13-resume-latex.css`:
  - Calibration now tracks best-so-far candidates and restores best-known settings if max iterations are reached without convergence.
  - `--resume-print-scale`
  - `--resume-print-leading`
  - `--resume-print-top-offset` (fine-tuning offset in print only)
- Local resume font assets:
  - `public/fonts/cmu/cmunrm.woff`
  - `public/fonts/cmu/cmunbx.woff`
  - `public/fonts/cmu/cmunti.woff`
  - `public/fonts/cmu/cmunbi.woff`
  - `app/styles/03-fonts.css` (`@font-face` declarations)

## Recalibration Workflow

Use this when resume content changes and layout checks fail:

1. Update content in `lib/resume-data.ts`.
2. Regenerate PDFs:

```fish
npm run build
```

3. Measure current whitespace:

```fish
npm run measure:resume-layout
```

4. Adjust per-variant print variables in `app/styles/13-resume-latex.css`.
5. Re-run verification:

```fish
npm run verify:resume-layout
```

6. Confirm full validation:

```fish
npm run validate-resume-pdfs
```

Optional automated loop:

```fish
npm run calibrate:resume-layout
```

If a variant still fails after calibration, apply fallback trimming in this order: `web-dev` projects first (remove one lowest-priority project bullet), then re-run calibration and verification.
