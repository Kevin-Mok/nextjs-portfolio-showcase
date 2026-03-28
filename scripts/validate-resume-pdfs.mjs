#!/usr/bin/env node

import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  assertPdfToolsAvailable,
  extractFontFamilies,
  formatPoints,
  hasBoldFont,
  measureBottomWhitespace,
  parsePdfFonts,
  parsePdfInfo,
  runPdfCommand,
} from './lib/pdf-layout-metrics.mjs';
import {
  loadResumeLayoutBaseline,
  resolveWhitespaceCapsForVariant,
} from './lib/resume-layout-baseline.mjs';
import { evaluateWhitespaceConstraints } from './lib/resume-layout-constraints.mjs';
import { resumePdfFileNames, resumePdfVariants } from './lib/resume-pdf-variants.mjs';

const allowedFontFamilies = new Set(['CMUSerif']);
const expectedBoldFamilyPrefix = 'CMUSerif';
const pdfDir = path.join(process.cwd(), 'public', 'resume');

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function validateGeneratedPdfsExist() {
  const missingPdfs = resumePdfFileNames.filter((fileName) =>
    !existsSync(path.join(pdfDir, fileName))
  );

  if (missingPdfs.length === 0) {
    return;
  }

  throw new Error(
    [
      `Missing generated resume PDF(s): ${missingPdfs.join(', ')}`,
      'Run "npm run build" (or "npm run generate-resume-pdfs") before validation.',
    ].join('\n')
  );
}

let baseline;
let capMetrics;

try {
  assertPdfToolsAvailable(['pdfinfo', 'pdffonts', 'pdftotext']);
  validateGeneratedPdfsExist();
  baseline = loadResumeLayoutBaseline();

  if (!baseline.whitespaceCaps) {
    throw new Error(
      `Missing enforcement whitespace caps in ${baseline.baselinePath}. Set enforcement.topWhitespaceMinPts and enforcement.bottomWhitespaceMinPts.`
    );
  }

  capMetrics = {
    sourceLabel: `${path.basename(baseline.baselinePath)}#enforcement`,
  };
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}

let hasFailures = false;

for (const fileName of resumePdfFileNames) {
  const pdfPath = path.join(pdfDir, fileName);
  const failures = [];
  const variant = resumePdfVariants.find((item) => item.fileName === fileName);

  try {
    const pdfInfo = parsePdfInfo(runPdfCommand('pdfinfo', [pdfPath]));
    const fonts = parsePdfFonts(runPdfCommand('pdffonts', [pdfPath]));
    const fontFamilies = extractFontFamilies(fonts);
    const whitespace = measureBottomWhitespace(pdfPath);

    if (pdfInfo.pages !== 1) {
      failures.push(`expected exactly 1 page, got ${pdfInfo.pages ?? 'unknown'}`);
    }

    if (!pdfInfo.size || !pdfInfo.size.toLowerCase().includes('(letter)')) {
      failures.push(`expected US Letter page size, got "${pdfInfo.size ?? 'unknown'}"`);
    }

    const disallowedFamilies = [...fontFamilies].filter(
      (family) => !allowedFontFamilies.has(family)
    );
    if (disallowedFamilies.length > 0) {
      failures.push(`unexpected font families: ${disallowedFamilies.join(', ')}`);
    }

    if (!hasBoldFont(fonts, expectedBoldFamilyPrefix)) {
      failures.push('missing bold font face (expected CMUSerif-Bold subset)');
    }

    const constraints = evaluateWhitespaceConstraints({
      topWhitespacePts: whitespace.topWhitespacePts,
      bottomWhitespacePts: whitespace.bottomWhitespacePts,
      tolerancePts: baseline.tolerancePts,
      caps: resolveWhitespaceCapsForVariant(variant?.id ?? null, baseline),
    });
    if (!constraints.pass) {
      const topMinAllowedPts = baseline.whitespaceCaps.topMinPts - baseline.tolerancePts;
      const bottomMinAllowedPts =
        constraints.bottomMinPts === null ? null : constraints.bottomMinPts - baseline.tolerancePts;
      const bottomMaxAllowedPts =
        constraints.bottomMaxPts === null ? null : constraints.bottomMaxPts + baseline.tolerancePts;
      failures.push(
        [
          `whitespace outside bounds`,
          `expectedTopMin=${formatPoints(topMinAllowedPts)}`,
          bottomMinAllowedPts === null
            ? null
            : `expectedBottomMin=${formatPoints(bottomMinAllowedPts)}`,
          bottomMaxAllowedPts === null
            ? null
            : `expectedBottomMax=${formatPoints(bottomMaxAllowedPts)}`,
          `actualTop=${formatPoints(whitespace.topWhitespacePts)}`,
          `actualBottom=${formatPoints(whitespace.bottomWhitespacePts)}`,
          `topDeficit=${formatPoints(constraints.topDeficitPts)}`,
          `bottomDeficit=${formatPoints(constraints.bottomDeficitPts)}`,
          `bottomOverflow=${formatPoints(constraints.bottomOverflowPts)}`,
        ]
          .filter(Boolean)
          .join(' ')
      );
    }

    if (failures.length > 0) {
      hasFailures = true;
      console.error(`FAIL ${fileName}`);
      for (const failure of failures) {
        console.error(`  - ${failure}`);
      }
      continue;
    }

    console.log(
      [
        `OK ${fileName}`,
        'pages=1',
        'size=Letter',
        `fonts=${[...fontFamilies].join(',')}`,
        `topWhitespace=${formatPoints(whitespace.topWhitespacePts)}`,
        `bottomWhitespace=${formatPoints(whitespace.bottomWhitespacePts)}`,
        `targetTopMin=${formatPoints(baseline.whitespaceCaps.topMinPts)}`,
        Number.isFinite(variant?.bottomWhitespaceMaxPts)
          ? null
          : `targetBottomMin=${formatPoints(baseline.whitespaceCaps.bottomMinPts)}`,
        Number.isFinite(variant?.bottomWhitespaceMaxPts)
          ? `targetBottomMax=${formatPoints(variant.bottomWhitespaceMaxPts)}`
          : null,
        `ratio=${formatPercent(whitespace.bottomWhitespaceRatio)}`,
      ]
        .filter(Boolean)
        .join(' ')
    );
  } catch (error) {
    hasFailures = true;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`FAIL ${fileName}`);
    console.error(`  - validator error: ${message}`);
  }
}

if (hasFailures) {
  process.exit(1);
}

console.log(
  [
    'All resume PDFs passed validation.',
    `Whitespace constraints source: ${capMetrics.sourceLabel}`,
    `Top min=${formatPoints(baseline.whitespaceCaps.topMinPts)} Default bottom min=${formatPoints(
      baseline.whitespaceCaps.bottomMinPts
    )} tolerance=${formatPoints(baseline.tolerancePts)}${
      resumePdfVariants.some((variant) => Number.isFinite(variant.bottomWhitespaceMaxPts))
        ? ' variant-specific bottom ceilings enforced'
        : ''
    }`,
  ].join(' ')
);
