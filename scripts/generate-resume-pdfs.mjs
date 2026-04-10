#!/usr/bin/env node

import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';

const host = process.env.RESUME_PDF_HOST || '127.0.0.1';
const port = process.env.RESUME_PDF_PORT || '3100';
const origin = `http://${host}:${port}`;
const outputDir = path.join(process.cwd(), 'public', 'resume');
const nextBuildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
const manifestPath = path.join(process.cwd(), '.next', 'cache', 'resume-pdf-manifest.json');
const resumeStylesPath = path.join(process.cwd(), 'app', 'styles', '13-resume-latex.css');
const resumeFingerprintTargets = [
  path.join(process.cwd(), 'app', 'resume', 'page.tsx'),
  path.join(process.cwd(), 'components', 'tiles', 'content', 'ResumeContent.tsx'),
  path.join(process.cwd(), 'components', 'tiles', 'content', 'resume'),
];

function hashContent(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectFilesRecursively(targetPath) {
  let entries;
  try {
    entries = await readdir(targetPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectFilesRecursively(entryPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function buildGlobalResumeFingerprint() {
  const files = [];

  for (const target of resumeFingerprintTargets) {
    if (!(await pathExists(target))) {
      continue;
    }

    let directoryEntries;
    try {
      directoryEntries = await readdir(target);
    } catch {
      files.push(target);
      continue;
    }

    if (directoryEntries) {
      const nestedFiles = await collectFilesRecursively(target);
      files.push(...nestedFiles);
    }
  }

  files.sort();

  const hash = createHash('sha256');
  for (const filePath of files) {
    const content = await readFile(filePath);
    hash.update(filePath);
    hash.update(content);
  }

  return hash.digest('hex');
}

async function loadPdfManifest() {
  try {
    const raw = await readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && parsed.variants && typeof parsed.variants === 'object') {
      return {
        version: 1,
        globalFingerprint: typeof parsed.globalFingerprint === 'string' ? parsed.globalFingerprint : '',
        variants: parsed.variants,
      };
    }
  } catch {
    // Treat unreadable/missing manifest as first-run behavior.
  }

  return {
    version: 1,
    globalFingerprint: '',
    variants: {},
  };
}

async function writePdfManifest(manifest) {
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function normalizeResumeHtml(html) {
  const mainMatch = html.match(/<main[^>]*class="[^"]*resume-latex[^"]*"[^>]*>[\s\S]*?<\/main>/i);
  let normalized = mainMatch ? mainMatch[0] : html;

  normalized = normalized
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/nonce="[^"]*"/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
}

function buildVariantStyleFingerprints(cssText, globalFingerprint) {
  const variantPattern = /\.resume-variant-([a-z-]+)\s*\{[\s\S]*?\}/g;
  const variantCssById = {};

  for (const match of cssText.matchAll(variantPattern)) {
    const variantId = match[1];
    const cssBlock = match[0];
    variantCssById[variantId] = cssBlock.trim();
  }

  const commonCss = cssText.replace(variantPattern, '').trim();
  const commonCssHash = hashContent(commonCss);

  const styleHashes = {};
  for (const variant of resumePdfVariants) {
    styleHashes[variant.id] = hashContent(
      `${globalFingerprint}\n${commonCssHash}\n${variantCssById[variant.id] ?? ''}`
    );
  }

  return styleHashes;
}

async function fetchVariantHtml(variantId) {
  const response = await fetch(buildResumeUrl(variantId));
  if (!response.ok) {
    throw new Error(
      `Failed to fetch rendered resume HTML for variant "${variantId}" (${response.status} ${response.statusText})`
    );
  }

  const html = await response.text();
  return normalizeResumeHtml(html);
}

function commandExists(command) {
  const result = spawnSync(command, ['--version'], { stdio: 'ignore' });
  return !result.error;
}

function resolveChromeBinary() {
  if (process.env.CHROME_BIN) {
    if (commandExists(process.env.CHROME_BIN)) {
      return process.env.CHROME_BIN;
    }

    throw new Error(
      `CHROME_BIN is set to "${process.env.CHROME_BIN}" but that executable is not available.`
    );
  }

  const chromeCandidates = [
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
  ];

  const resolved = chromeCandidates.find(commandExists);
  if (resolved) {
    return resolved;
  }

  throw new Error(
    [
      'No Chrome/Chromium executable found for resume PDF generation.',
      `Checked: ${chromeCandidates.join(', ')}`,
      'Install one of those binaries or set CHROME_BIN to an executable path.',
    ].join('\n')
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServerReady(serverProcess, timeoutMs = 60000) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next.js server exited early with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetch(`${origin}/resume`);
      if (response.ok) {
        return;
      }
    } catch {
      // Server is not up yet.
    }

    await sleep(500);
  }

  throw new Error(`Timed out waiting for ${origin}/resume after ${timeoutMs}ms`);
}

function runCommand(command, args, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`${label} failed to start: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      const snapCgroupHint = /is not a snap cgroup/i.test(stderr)
        ? '\nDetected Snap Chromium confinement failure. Use a non-Snap Chrome/Chromium binary and set CHROME_BIN (for example: /usr/bin/google-chrome-stable).'
        : '';

      reject(new Error(`${label} failed with exit code ${code}\n${stderr}${snapCgroupHint}`));
    });
  });
}

function buildResumeUrl(variantId) {
  const url = new URL('/resume', origin);
  url.searchParams.set('variant', variantId);
  url.searchParams.set('render', 'pdf');
  return url.toString();
}

function resolveNextBinary() {
  let currentDir = process.cwd();

  while (true) {
    const candidate = path.join(currentDir, 'node_modules', '.bin', 'next');
    if (existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  return 'next';
}

async function generateVariantPdf(variant, chromeBin) {
  const pdfPath = path.join(outputDir, variant.fileName);
  const url = buildResumeUrl(variant.id);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=20000',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    url,
  ];

  await runCommand(chromeBin, args, `PDF generation for ${variant.fileName}`);
}

function startNextServer() {
  const nextBin = resolveNextBinary();
  return spawn(nextBin, ['start', '-H', host, '-p', port], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function shutdownServer(serverProcess) {
  if (serverProcess.exitCode !== null) {
    return;
  }

  serverProcess.kill('SIGTERM');

  const forceKillTimer = setTimeout(() => {
    if (serverProcess.exitCode === null) {
      serverProcess.kill('SIGKILL');
    }
  }, 5000);

  await new Promise((resolve) => {
    serverProcess.once('exit', () => {
      clearTimeout(forceKillTimer);
      resolve();
    });
  });
}

async function main() {
  try {
    await access(nextBuildIdPath);
  } catch {
    throw new Error(
      'No Next.js production build found at .next/BUILD_ID.\nRun "npm run build" before "npm run generate-resume-pdfs".'
    );
  }

  const chromeBin = resolveChromeBinary();
  await mkdir(outputDir, { recursive: true });
  const globalFingerprint = await buildGlobalResumeFingerprint();
  const cssText = await readFile(resumeStylesPath, 'utf8');
  const variantStyleFingerprints = buildVariantStyleFingerprints(cssText, globalFingerprint);
  const previousManifest = await loadPdfManifest();

  const server = startNextServer();
  let serverStdout = '';
  let serverStderr = '';

  server.stdout.on('data', (chunk) => {
    serverStdout += chunk.toString();
  });

  server.stderr.on('data', (chunk) => {
    serverStderr += chunk.toString();
  });

  try {
    await waitForServerReady(server);

    let generatedCount = 0;
    let skippedCount = 0;
    const nextManifestVariants = {};

    for (const variant of resumePdfVariants) {
      const htmlHash = hashContent(await fetchVariantHtml(variant.id));
      const styleHash = variantStyleFingerprints[variant.id];
      const pdfPath = path.join(outputDir, variant.fileName);
      const previousVariant = previousManifest.variants[variant.id];
      const pdfExists = await pathExists(pdfPath);
      const shouldRegenerate =
        !pdfExists ||
        !previousVariant ||
        previousVariant.htmlHash !== htmlHash ||
        previousVariant.styleHash !== styleHash;

      if (shouldRegenerate) {
        // Keep output visible in CI/local builds for easier diagnosis.
        console.log(`Generating ${variant.fileName} (${variant.id})`);
        await generateVariantPdf(variant, chromeBin);
        generatedCount += 1;
      } else {
        console.log(`Skipping ${variant.fileName} (${variant.id}) - unchanged`);
        skippedCount += 1;
      }

      nextManifestVariants[variant.id] = {
        fileName: variant.fileName,
        htmlHash,
        styleHash,
      };
    }

    await writePdfManifest({
      version: 1,
      generatedAt: new Date().toISOString(),
      globalFingerprint,
      variants: nextManifestVariants,
    });

    console.log(
      `Generated ${generatedCount} resume PDFs and skipped ${skippedCount} unchanged variants in ${outputDir}`
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${detail}\n\nNext.js server stdout:\n${serverStdout}\n\nNext.js server stderr:\n${serverStderr}`
    );
  } finally {
    await shutdownServer(server);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
