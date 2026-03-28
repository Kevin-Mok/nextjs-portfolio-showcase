#!/usr/bin/env node

import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  assertPdfToolsAvailable,
  formatPoints,
  measureBottomWhitespace,
} from './lib/pdf-layout-metrics.mjs';
import {
  loadResumeLayoutBaseline,
  resolveWhitespaceCapsForVariant,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';
import { evaluateWhitespaceConstraints } from './lib/resume-layout-constraints.mjs';

function parseArgs(argv) {
  let pdfPath = null;
  let outputJson = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--pdf') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('Missing value for --pdf');
      }
      pdfPath = value;
      index += 1;
      continue;
    }

    if (arg === '--json') {
      outputJson = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      console.log(
        [
          'Usage:',
          '  node scripts/verify-resume-layout.mjs',
          '  node scripts/verify-resume-layout.mjs --pdf <path>',
          '  node scripts/verify-resume-layout.mjs [--json]',
        ].join('\n')
      );
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { pdfPath, outputJson };
}

function resolveTargets(pdfPathArg) {
  if (pdfPathArg) {
    const resolvedPath = path.resolve(pdfPathArg);
    const variant =
      resumePdfVariants.find((item) => item.fileName === path.basename(resolvedPath)) ?? null;
    return [{ variant, pdfPath: resolvedPath }];
  }

  const outputDir = path.join(process.cwd(), 'public', 'resume');
  return resumePdfVariants.map((variant) => ({
    variant,
    pdfPath: path.join(outputDir, variant.fileName),
  }));
}

function formatRatio(ratio) {
  return `${(ratio * 100).toFixed(4)}%`;
}

let args;
let baseline;

try {
  args = parseArgs(process.argv.slice(2));
  assertPdfToolsAvailable(['pdftotext']);
  baseline = loadResumeLayoutBaseline();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}

const targets = resolveTargets(args.pdfPath);
if (!baseline.whitespaceCaps) {
  console.error(
    `Missing enforcement whitespace caps in ${baseline.baselinePath}. Set enforcement.topWhitespaceMinPts and enforcement.bottomWhitespaceMinPts.`
  );
  process.exit(1);
}
const capMetrics = {
  sourceLabel: `${path.basename(baseline.baselinePath)}#enforcement`,
};
const results = [];
let hasFailures = false;

for (const { pdfPath, variant } of targets) {
  if (!existsSync(pdfPath)) {
    hasFailures = true;
    results.push({ pdfPath, status: 'fail', error: 'PDF file does not exist' });
    continue;
  }

  try {
    const metrics = measureBottomWhitespace(pdfPath);
    const caps = resolveWhitespaceCapsForVariant(variant?.id ?? null, baseline);
    const constraints = evaluateWhitespaceConstraints({
      topWhitespacePts: metrics.topWhitespacePts,
      bottomWhitespacePts: metrics.bottomWhitespacePts,
      tolerancePts: baseline.tolerancePts,
      caps,
    });

    if (!constraints.pass) {
      hasFailures = true;
    }

    results.push({
      pdfPath,
      status: constraints.pass ? 'ok' : 'fail',
      primaryFailure: constraints.primaryFailure,
      expectedTopWhitespacePts: caps.topMinPts,
      expectedBottomWhitespacePts: caps.bottomMinPts,
      expectedBottomWhitespaceMaxPts: constraints.bottomMaxPts,
      actualTopWhitespacePts: metrics.topWhitespacePts,
      actualBottomWhitespacePts: metrics.bottomWhitespacePts,
      topDeficitPts: constraints.topDeficitPts,
      bottomDeficitPts: constraints.bottomDeficitPts,
      bottomOverflowPts: constraints.bottomOverflowPts,
      tolerancePts: baseline.tolerancePts,
      pageHeightPts: metrics.pageHeightPts,
      topWhitespaceRatio: metrics.topWhitespaceRatio,
      bottomWhitespaceRatio: metrics.bottomWhitespaceRatio,
    });
  } catch (error) {
    hasFailures = true;
    const message = error instanceof Error ? error.message : String(error);
    results.push({ pdfPath, status: 'fail', error: message });
  }
}

if (args.outputJson) {
  console.log(
    JSON.stringify(
      {
        referencePdfPath: baseline.referencePdfPath,
        baselineRatio: baseline.ratio,
        tolerancePts: baseline.tolerancePts,
        capSource: capMetrics.sourceLabel,
        topWhitespaceMinPts: baseline.whitespaceCaps.topMinPts,
        bottomWhitespaceMinPts: baseline.whitespaceCaps.bottomMinPts,
        count: results.length,
        results,
      },
      null,
      2
    )
  );
} else {
  console.log(
    `Whitespace constraints source: ${capMetrics.sourceLabel} (top=${formatPoints(
      baseline.whitespaceCaps.topMinPts
    )}, defaultBottomMin=${formatPoints(baseline.whitespaceCaps.bottomMinPts)}, tolerance=${formatPoints(
      baseline.tolerancePts
    )})`
  );

  for (const result of results) {
    if (result.status === 'ok') {
      const bottomTargetText =
        result.expectedBottomWhitespacePts === null ||
        result.expectedBottomWhitespacePts === undefined
          ? `max=${formatPoints(result.expectedBottomWhitespaceMaxPts)}`
          : `min=${formatPoints(result.expectedBottomWhitespacePts)}${
              result.expectedBottomWhitespaceMaxPts === null ||
              result.expectedBottomWhitespaceMaxPts === undefined
                ? ''
                : ` max=${formatPoints(result.expectedBottomWhitespaceMaxPts)}`
            }`;
      console.log(
        `OK ${path.basename(result.pdfPath)} actual=${formatPoints(
          result.actualBottomWhitespacePts
        )} ${bottomTargetText} bottomDeficit=${formatPoints(
          result.bottomDeficitPts
        )} bottomOverflow=${formatPoints(result.bottomOverflowPts)} topDeficit=${formatPoints(
          result.topDeficitPts
        )} ratio=${formatRatio(
          result.bottomWhitespaceRatio
        )}`
      );
      continue;
    }

    console.error(`FAIL ${path.basename(result.pdfPath)}`);
    if (result.error) {
      console.error(`  - ${result.error}`);
      continue;
    }

    const topMinAllowedPts = result.expectedTopWhitespacePts - result.tolerancePts;
    const bottomMinAllowedPts =
      result.expectedBottomWhitespacePts === null ||
      result.expectedBottomWhitespacePts === undefined
        ? null
        : result.expectedBottomWhitespacePts - result.tolerancePts;
    const bottomMaxAllowedPts =
      result.expectedBottomWhitespaceMaxPts === null ||
      result.expectedBottomWhitespaceMaxPts === undefined
        ? null
        : result.expectedBottomWhitespaceMaxPts + result.tolerancePts;
    const bottomBoundsText =
      bottomMinAllowedPts === null
        ? `max ${formatPoints(bottomMaxAllowedPts)}`
        : bottomMaxAllowedPts === null
          ? `min ${formatPoints(bottomMinAllowedPts)}`
          : `min ${formatPoints(bottomMinAllowedPts)}, max ${formatPoints(bottomMaxAllowedPts)}`;
    console.error(
      `  - whitespace outside bounds: top actual ${formatPoints(
        result.actualTopWhitespacePts
      )} (min ${formatPoints(topMinAllowedPts)}), bottom actual ${formatPoints(
        result.actualBottomWhitespacePts
      )} (${bottomBoundsText}), topDeficit ${formatPoints(
        result.topDeficitPts
      )}, bottomDeficit ${formatPoints(result.bottomDeficitPts)}, bottomOverflow ${formatPoints(
        result.bottomOverflowPts
      )}`
    );
  }
}

if (hasFailures) {
  process.exit(1);
}

if (!args.outputJson) {
  console.log('All checked resume PDFs meet configured top/bottom whitespace bounds.');
}
