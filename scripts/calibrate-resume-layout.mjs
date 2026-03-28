#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  measureBottomWhitespace,
  parsePdfInfo,
  runPdfCommand,
} from './lib/pdf-layout-metrics.mjs';
import {
  expectedWhitespacePointsForPageHeight,
  loadResumeLayoutBaseline,
  resolveWhitespaceCapsForVariant,
} from './lib/resume-layout-baseline.mjs';
import { resumePdfVariants } from './lib/resume-pdf-variants.mjs';
import { evaluateWhitespaceConstraints } from './lib/resume-layout-constraints.mjs';
import {
  CALIBRATION_LIMITS,
  computeNextSettings,
  createVariantSolverState,
  registerObservation,
} from './lib/resume-calibration-solver.mjs';

const cssPath = path.join(process.cwd(), 'app', 'styles', '13-resume-latex.css');
const pdfDir = path.join(process.cwd(), 'public', 'resume');
const MINIMUM_PRINT_SCALE_FLOOR = 1.14;
const MINIMUM_PRINT_SCALE_FLOOR_BY_VARIANT = new Map([
  ['it-support-sql', 1.08],
]);
const minimumScaleByVariant = new Map(
  resumePdfVariants.map((variant) => [
    variant.id,
    MINIMUM_PRINT_SCALE_FLOOR_BY_VARIANT.get(variant.id) ?? MINIMUM_PRINT_SCALE_FLOOR,
  ])
);

function formatPoints(value) {
  return `${value.toFixed(3)}pt`;
}

function formatNumber(value) {
  return Number(value.toFixed(3)).toString();
}

function measureCurrentWhitespaceCaps(baseline, variantId) {
  if (!baseline.whitespaceCaps) {
    throw new Error(
      `Missing enforcement whitespace caps in ${baseline.baselinePath}. Set enforcement.topWhitespaceMinPts and enforcement.bottomWhitespaceMinPts.`
    );
  }

  const caps = resolveWhitespaceCapsForVariant(variantId, baseline);
  return {
    sourceVariantId: variantId ?? 'enforcement-values',
    sourceFileName: path.basename(baseline.baselinePath),
    topMinPts: caps.topMinPts,
    bottomMinPts: caps.bottomMinPts,
    bottomMaxPts: caps.bottomMaxPts,
    pageHeightPts: null,
  };
}

function parseArgs(argv) {
  let maxIterations = 8;
  let skipBuildFirst = false;
  let dryRun = false;
  let noBuild = false;
  let variantId = null;
  let keepPartialOnFailure = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--max-iterations') {
      const value = Number(argv[index + 1]);
      if (!Number.isInteger(value) || value <= 0) {
        throw new Error('Expected a positive integer after --max-iterations');
      }
      maxIterations = value;
      index += 1;
      continue;
    }

    if (arg === '--skip-build-first') {
      skipBuildFirst = true;
      continue;
    }

    if (arg === '--dry-run') {
      dryRun = true;
      continue;
    }

    if (arg === '--no-build') {
      noBuild = true;
      continue;
    }

    if (arg === '--variant') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error('Expected a resume variant id after --variant');
      }
      variantId = value;
      index += 1;
      continue;
    }

    if (arg === '--keep-partial-on-failure') {
      keepPartialOnFailure = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      console.log(
        [
          'Usage:',
          '  node scripts/calibrate-resume-layout.mjs [--max-iterations <n>] [--skip-build-first] [--dry-run] [--no-build] [--variant <id>] [--keep-partial-on-failure]',
          '',
          'What it does:',
          '  1) Build + regenerate resume PDFs',
          '  2) Measure each resume PDF against legacy baseline',
          '  3) Update per-variant print variables in app/styles/13-resume-latex.css',
          '  4) Repeat until all variants pass or max iterations reached',
          '',
          'Defaults:',
          '  - max iterations: 8',
          '  - build each iteration after CSS updates',
          '',
          'Flags:',
          '  --skip-build-first   Use existing generated PDFs for iteration 1',
          '  --dry-run            Measure and report without writing CSS',
          '  --no-build           Never run build; useful only when PDFs are already generated',
          '  --variant <id>       Calibrate only one variant (e.g. web-dev)',
          '  --keep-partial-on-failure  Keep best-known in-flight CSS changes when calibration fails',
        ].join('\n')
      );
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    maxIterations,
    skipBuildFirst,
    dryRun,
    noBuild,
    variantId,
    keepPartialOnFailure,
  };
}

function sleepMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Busy wait is acceptable here because calibration is an explicit CLI workflow.
  }
}

function runCommand(command, args, env, label) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    env,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.error) {
    throw new Error(`${label} failed to start: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status ?? 'unknown'}`);
  }
}

function buildFailureHint(message) {
  if (/listen EPERM|operation not permitted/i.test(message)) {
    return (
      '\nHint: build-time PDF generation starts a local server. ' +
      'Ensure this command can bind localhost ports in your environment.'
    );
  }

  if (/No Chrome\/Chromium executable found/i.test(message)) {
    return (
      '\nHint: install Chrome/Chromium or set CHROME_BIN to a valid executable path.'
    );
  }

  return '';
}

function runNpmBuild() {
  const attempts = 2;
  let lastErrorMessage = '';

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    // Avoid intermittent port collisions with other local processes.
    const dynamicPort = String(3300 + Math.floor(Math.random() * 1200));
    const env = {
      ...process.env,
      RESUME_PDF_PORT: dynamicPort,
    };

    try {
      runCommand('npm', ['run', 'build'], env, `npm run build (RESUME_PDF_PORT=${dynamicPort})`);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastErrorMessage = message;
    }

    if (attempt < attempts) {
      console.warn(
        `[calibrate] Build attempt ${attempt} failed. Retrying once...`
      );
      sleepMs(1500);
      continue;
    }
  }

  throw new Error(`npm run build failed after ${attempts} attempts.${buildFailureHint(lastErrorMessage)}`);
}

/**
 * Locate a CSS class block and return its offsets.
 *
 * This parser only needs to handle flat CSS blocks used in this stylesheet.
 */
function findClassBlock(cssText, className) {
  const classIndex = cssText.indexOf(className);
  if (classIndex === -1) {
    throw new Error(`Missing CSS class block: ${className}`);
  }

  const braceStart = cssText.indexOf('{', classIndex);
  if (braceStart === -1) {
    throw new Error(`Malformed CSS block for ${className}: missing "{"`);
  }

  let depth = 0;
  for (let index = braceStart; index < cssText.length; index += 1) {
    const char = cssText[index];
    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return {
          start: classIndex,
          end: index + 1,
          block: cssText.slice(classIndex, index + 1),
        };
      }
    }
  }

  throw new Error(`Malformed CSS block for ${className}: missing closing "}"`);
}

function parseCssVariable(blockText, variableName, unit = '') {
  const escaped = variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = unit
    ? new RegExp(`${escaped}\\s*:\\s*(-?[0-9.]+)${unit}\\s*;`)
    : new RegExp(`${escaped}\\s*:\\s*(-?[0-9.]+)\\s*;`);
  const match = blockText.match(pattern);
  if (!match) {
    return null;
  }

  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function setCssVariable(blockText, variableName, value, unit = '') {
  const escaped = variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const valueText = unit ? `${formatNumber(value)}${unit}` : formatNumber(value);
  const pattern = unit
    ? new RegExp(`(${escaped}\\s*:\\s*)(-?[0-9.]+)${unit}(\\s*;)`)
    : new RegExp(`(${escaped}\\s*:\\s*)(-?[0-9.]+)(\\s*;)`);

  if (pattern.test(blockText)) {
    return blockText.replace(pattern, `$1${valueText}$3`);
  }

  const insertion = `  ${variableName}: ${valueText};\n`;
  return blockText.replace(/\}\s*$/, `${insertion}}`);
}

function readVariantPrintSettings(cssText, variantId) {
  const className = `.resume-variant-${variantId}`;
  const block = findClassBlock(cssText, className);

  const scale = parseCssVariable(block.block, '--resume-print-scale');
  const leading =
    parseCssVariable(block.block, '--resume-print-leading') ?? 1;
  const topOffsetPts =
    parseCssVariable(block.block, '--resume-print-top-offset', 'pt') ?? 0;

  if (!Number.isFinite(scale)) {
    throw new Error(`Missing --resume-print-scale for ${className}`);
  }

  return {
    className,
    start: block.start,
    end: block.end,
    block: block.block,
    scale,
    leading,
    topOffsetPts,
  };
}

function writeVariantPrintSettings(cssText, variantId, nextSettings) {
  const current = readVariantPrintSettings(cssText, variantId);
  let nextBlock = current.block;
  nextBlock = setCssVariable(nextBlock, '--resume-print-scale', nextSettings.scale);
  nextBlock = setCssVariable(nextBlock, '--resume-print-leading', nextSettings.leading);
  nextBlock = setCssVariable(nextBlock, '--resume-print-top-offset', nextSettings.topOffsetPts, 'pt');

  return (
    cssText.slice(0, current.start) +
    nextBlock +
    cssText.slice(current.end)
  );
}

function measureVariant(variant, baselineRatio, tolerancePts, whitespaceCaps) {
  const pdfPath = path.join(pdfDir, variant.fileName);
  const pdfInfo = parsePdfInfo(runPdfCommand('pdfinfo', [pdfPath]));
  const layout = measureBottomWhitespace(pdfPath);

  const expectedPts = expectedWhitespacePointsForPageHeight(
    layout.pageHeightPts,
    baselineRatio
  );
  const deltaPts = layout.bottomWhitespacePts - expectedPts;
  const constraints = evaluateWhitespaceConstraints({
    topWhitespacePts: layout.topWhitespacePts,
    bottomWhitespacePts: layout.bottomWhitespacePts,
    tolerancePts,
    caps: {
      topMinPts: whitespaceCaps.topMinPts,
      bottomMinPts: whitespaceCaps.bottomMinPts,
      bottomMaxPts: whitespaceCaps.bottomMaxPts,
    },
  });

  let solverDeltaPts = -constraints.bottomDeficitPts;
  let primaryFailure = constraints.primaryFailure;
  if (pdfInfo.pages !== 1) {
    primaryFailure = 'page-overflow';
  } else if (constraints.primaryFailure === 'bottom-underflow') {
    // Negative solver delta nudges top-offset upward (more bottom whitespace).
    solverDeltaPts = -constraints.bottomDeficitPts;
  } else if (constraints.primaryFailure === 'top-underflow') {
    // Positive solver delta nudges top-offset downward (more top whitespace).
    solverDeltaPts = constraints.topDeficitPts;
  } else if (constraints.primaryFailure === 'bottom-overflow') {
    // Positive solver delta nudges top-offset downward (less bottom whitespace).
    solverDeltaPts = constraints.bottomOverflowPts;
  }

  const pass = pdfInfo.pages === 1 && constraints.pass;

  return {
    id: variant.id,
    fileName: variant.fileName,
    pdfPath,
    pages: pdfInfo.pages ?? 0,
    expectedPts,
    actualPts: layout.bottomWhitespacePts,
    deltaPts: solverDeltaPts,
    baselineDeltaPts: deltaPts,
    topExpectedPts: whitespaceCaps.topMinPts,
    topActualPts: layout.topWhitespacePts,
    topDeficitPts: constraints.topDeficitPts,
    bottomExpectedPts: whitespaceCaps.bottomMinPts,
    bottomDeficitPts: constraints.bottomDeficitPts,
    bottomMaxPts: constraints.bottomMaxPts,
    bottomOverflowPts: constraints.bottomOverflowPts,
    primaryFailure,
    pageHeightPts: layout.pageHeightPts,
    pass,
  };
}

function printIterationReport(iteration, results) {
  console.log(`\n[calibrate] Iteration ${iteration}`);
  for (const result of results) {
    const status = result.pass ? 'OK ' : 'FAIL';
    console.log(
      `${status} ${result.fileName} pages=${result.pages} top=${formatPoints(
        result.topActualPts
      )}/${formatPoints(result.topExpectedPts)} (delta=${formatPoints(
        result.topDeficitPts
      )}) bottom=${formatPoints(result.actualPts)}/${
        result.bottomExpectedPts === null
          ? `max ${formatPoints(result.bottomMaxPts)}`
          : formatPoints(result.bottomExpectedPts)
      } (delta=${formatPoints(result.bottomDeficitPts)}${
        result.bottomMaxPts === null
          ? ''
          : `, overflow=${formatPoints(result.bottomOverflowPts)}/${formatPoints(result.bottomMaxPts)}`
      }) solverDelta=${formatPoints(
        result.deltaPts
      )} reason=${result.primaryFailure}`
    );
  }
}

function resolveVariants(variantId) {
  if (!variantId) {
    return resumePdfVariants;
  }

  const selected = resumePdfVariants.find((variant) => variant.id === variantId);
  if (!selected) {
    const knownVariants = resumePdfVariants.map((variant) => variant.id).join(', ');
    throw new Error(
      `Unknown variant "${variantId}". Expected one of: ${knownVariants}`
    );
  }

  return [selected];
}

function enforceScaleFloorInCss(cssText, variants) {
  let nextCssText = cssText;
  const adjustments = [];

  for (const variant of variants) {
    const minimumScale = minimumScaleByVariant.get(variant.id);
    if (!minimumScale) {
      continue;
    }

    const settings = readVariantPrintSettings(nextCssText, variant.id);
    if (settings.scale + 0.0005 >= minimumScale) {
      continue;
    }

    nextCssText = writeVariantPrintSettings(nextCssText, variant.id, {
      scale: minimumScale,
      leading: settings.leading,
      topOffsetPts: settings.topOffsetPts,
    });

    adjustments.push({
      id: variant.id,
      fromScale: settings.scale,
      toScale: minimumScale,
    });
  }

  return { cssText: nextCssText, adjustments };
}

function classifyBoundedFailure(variantId, measurement, settings, tolerancePts) {
  if (measurement.primaryFailure === 'top-underflow') {
    return null;
  }

  const minimumScale = minimumScaleByVariant.get(variantId) ?? CALIBRATION_LIMITS.scaleMin;
  const atLowerDensityBound =
    settings.scale <= minimumScale + 0.0005 &&
    settings.leading <= CALIBRATION_LIMITS.leadingMin + 0.0005 &&
    settings.topOffsetPts <= CALIBRATION_LIMITS.topOffsetMin + 0.05;
  const atUpperDensityBound =
    settings.scale >= CALIBRATION_LIMITS.scaleMax - 0.0005 &&
    settings.leading >= CALIBRATION_LIMITS.leadingMax - 0.0005 &&
    settings.topOffsetPts >= CALIBRATION_LIMITS.topOffsetMax - 0.05;

  if (measurement.pages > 1 && atLowerDensityBound) {
    return {
      code: 'content-too-long-at-floor',
      explanation:
        'Still over one page while scale/leading/top-offset are at minimum allowed density.',
      recommendation:
        'Trim or tighten this variant content, or explicitly lower the minimum scale floor for this variant.',
    };
  }

  if (measurement.pages === 1 && measurement.deltaPts < -tolerancePts && atLowerDensityBound) {
    return {
      code: 'content-too-long-at-floor',
      explanation:
        'Bottom whitespace remains below the minimum cap while density settings are already at floor.',
      recommendation:
        'Trim or tighten this variant content, or explicitly lower the minimum scale floor for this variant.',
    };
  }

  if (measurement.pages === 1 && measurement.deltaPts > tolerancePts && atUpperDensityBound) {
    return {
      code: 'content-too-short-at-ceiling',
      explanation:
        measurement.primaryFailure === 'bottom-overflow'
          ? 'Bottom whitespace remains above the maximum cap while scale/leading/top-offset are already at maximum allowed density.'
          : 'Top whitespace remains below the minimum cap while scale/leading/top-offset are at maximum allowed density.',
      recommendation:
        measurement.primaryFailure === 'bottom-overflow'
          ? 'Add more content to the variant or explicitly raise max density bounds in the solver.'
          : 'Relax the top whitespace minimum, or explicitly raise max density bounds in the solver.',
    };
  }

  return null;
}

function printContentBoundDiagnostics(boundFailures) {
  if (boundFailures.size === 0) {
    return;
  }

  console.error('\n[calibrate] Content-bound variants:');
  for (const [variantId, failure] of boundFailures) {
    console.error(
      `- ${variantId} [${failure.code}] pages=${failure.measurement.pages} delta=${formatPoints(
        failure.measurement.deltaPts
      )} | ${failure.explanation} | Action: ${failure.recommendation}`
    );
  }
}

function restoreBestKnownSettings(cssText, variants, solverByVariant) {
  let nextCssText = cssText;
  let restoredCount = 0;

  for (const variant of variants) {
    const state = solverByVariant.get(variant.id);
    if (!state?.bestObservation || !state?.lastObservation) {
      continue;
    }

    if (state.bestObservation.score + 0.01 >= state.lastObservation.score) {
      continue;
    }

    const minimumScale = minimumScaleByVariant.get(variant.id);
    const bestSettings = {
      ...state.bestObservation.settings,
      scale:
        minimumScale && state.bestObservation.settings.scale < minimumScale
          ? minimumScale
          : state.bestObservation.settings.scale,
    };

    nextCssText = writeVariantPrintSettings(
      nextCssText,
      variant.id,
      bestSettings
    );
    restoredCount += 1;

    console.error(
      `[calibrate] ${variant.id}: restoring best-known settings from iteration ${state.bestObservation.iteration} (score ${formatNumber(
        state.bestObservation.score
      )}).`
    );
  }

  return {
    cssText: nextCssText,
    restoredCount,
  };
}

function printNonConvergenceDiagnostics(variants, solverByVariant) {
  console.error('\n[calibrate] Non-convergence diagnostics:');
  for (const variant of variants) {
    const state = solverByVariant.get(variant.id);
    if (!state?.lastObservation || !state?.bestObservation) {
      continue;
    }

    const last = state.lastObservation;
    const best = state.bestObservation;
    if (last.measurement.pass) {
      continue;
    }

    console.error(
      [
        `- ${variant.id}`,
        `last: iter=${last.iteration} pages=${last.measurement.pages} delta=${formatPoints(
          last.measurement.deltaPts
        )} score=${formatNumber(last.score)}`,
        `best: iter=${best.iteration} pages=${best.measurement.pages} delta=${formatPoints(
          best.measurement.deltaPts
        )} score=${formatNumber(best.score)}`,
        `bestSettings: scale=${formatNumber(best.settings.scale)} leading=${formatNumber(
          best.settings.leading
        )} topOffset=${formatNumber(best.settings.topOffsetPts)}pt`,
      ].join(' | ')
    );
  }
}

const options = parseArgs(process.argv.slice(2));
const baseline = loadResumeLayoutBaseline();
const targetVariants = resolveVariants(options.variantId);
const solverByVariant = new Map(
  targetVariants.map((variant) => [variant.id, createVariantSolverState()])
);
let originalCssText = readFileSync(cssPath, 'utf8');
let wroteCss = false;
let restoreLogged = false;
let forceBuildFirst = false;
const boundFailures = new Map();

function writeCss(cssText) {
  writeFileSync(cssPath, cssText, 'utf8');
  wroteCss = true;
}

function maybeRestoreOriginalCss(reason) {
  if (options.keepPartialOnFailure || !wroteCss) {
    return;
  }

  writeFileSync(cssPath, originalCssText, 'utf8');
  if (!restoreLogged) {
    console.error(`[calibrate] Restored original CSS after ${reason}.`);
    restoreLogged = true;
  }
}

function handleSignal(signal) {
  maybeRestoreOriginalCss(`signal ${signal}`);
  process.exit(signal === 'SIGINT' ? 130 : 143);
}

process.on('SIGINT', () => handleSignal('SIGINT'));
process.on('SIGTERM', () => handleSignal('SIGTERM'));
process.on('uncaughtException', (error) => {
  maybeRestoreOriginalCss('uncaught exception');
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});
process.on('unhandledRejection', (error) => {
  maybeRestoreOriginalCss('unhandled rejection');
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exit(1);
});

const preflightFloorEnforcement = enforceScaleFloorInCss(originalCssText, targetVariants);
if (preflightFloorEnforcement.adjustments.length > 0) {
  const changesText = preflightFloorEnforcement.adjustments
    .map(
      (change) =>
        `${change.id}: ${formatNumber(change.fromScale)} -> ${formatNumber(change.toScale)}`
    )
    .join(', ');

  if (options.noBuild || options.dryRun) {
    console.warn(
      `[calibrate] Minimum scale floor would be enforced (${changesText}), but current mode is read-only/no-build.`
    );
  } else {
    writeCss(preflightFloorEnforcement.cssText);
    originalCssText = preflightFloorEnforcement.cssText;
    forceBuildFirst = true;
    console.log(`[calibrate] Enforced minimum scale floor before calibration: ${changesText}`);
  }
}

if ((options.noBuild || options.dryRun) && options.maxIterations > 1) {
  console.warn(
    '[calibrate] max-iterations > 1 requested without rebuild/write progression. Using single-pass mode.'
  );
  options.maxIterations = 1;
}

let converged = false;
let activeWhitespaceCaps = null;

for (let iteration = 1; iteration <= options.maxIterations; iteration += 1) {
  const shouldBuild =
    !options.noBuild &&
    !options.dryRun &&
    (forceBuildFirst || !options.skipBuildFirst || iteration > 1);
  if (shouldBuild) {
    console.log(`\n[calibrate] Running build (iteration ${iteration})...`);
    runNpmBuild();
    if (iteration === 1) {
      forceBuildFirst = false;
    }
  }

  const cssBefore = readFileSync(cssPath, 'utf8');
  const whitespaceCapsByVariant = new Map(
    targetVariants.map((variant) => [variant.id, measureCurrentWhitespaceCaps(baseline, variant.id)])
  );
  for (const variant of targetVariants) {
    activeWhitespaceCaps = whitespaceCapsByVariant.get(variant.id);
    if (!activeWhitespaceCaps) {
      continue;
    }
    console.log(
      `[calibrate] ${variant.id} constraints from ${activeWhitespaceCaps.sourceFileName}: top>=${formatPoints(
        activeWhitespaceCaps.topMinPts
      )} ${
        activeWhitespaceCaps.bottomMinPts === null
          ? `bottom<=${formatPoints(activeWhitespaceCaps.bottomMaxPts)}`
          : `bottom>=${formatPoints(activeWhitespaceCaps.bottomMinPts)}`
      } (-${formatPoints(baseline.tolerancePts)} tolerance)`
    );
  }
  const measurements = targetVariants.map((variant) =>
    measureVariant(
      variant,
      baseline.ratio,
      baseline.tolerancePts,
      whitespaceCapsByVariant.get(variant.id)
    )
  );
  const settingsByVariant = new Map();
  for (const result of measurements) {
    settingsByVariant.set(result.id, readVariantPrintSettings(cssBefore, result.id));
  }

  printIterationReport(iteration, measurements);

  for (const result of measurements) {
    const settingsSnapshot = settingsByVariant.get(result.id);
    const state = solverByVariant.get(result.id);
    if (!settingsSnapshot || !state) {
      continue;
    }

    registerObservation(state, {
      measurement: result,
      settings: settingsSnapshot,
      tolerancePts: baseline.tolerancePts,
      iteration,
    });
  }

  const failing = measurements.filter((result) => !result.pass);
  if (failing.length === 0) {
    converged = true;
    console.log('\n[calibrate] All variants meet page-count + configured top/bottom whitespace constraints.');
    break;
  }

  const adjustableFailing = [];
  for (const result of failing) {
    const currentSettings = settingsByVariant.get(result.id);
    if (!currentSettings) {
      throw new Error(`Missing settings snapshot for variant "${result.id}"`);
    }

    const boundFailure = classifyBoundedFailure(
      result.id,
      result,
      currentSettings,
      baseline.tolerancePts
    );
    if (!boundFailure) {
      boundFailures.delete(result.id);
      adjustableFailing.push(result);
      continue;
    }

    const existing = boundFailures.get(result.id);
    boundFailures.set(result.id, {
      ...boundFailure,
      measurement: result,
      settings: currentSettings,
    });

    if (!existing || existing.code !== boundFailure.code) {
      console.warn(
        `[calibrate] ${result.id}: ${boundFailure.code} (pages=${result.pages}, delta=${formatPoints(
          result.deltaPts
        )}). ${boundFailure.recommendation}`
      );
    }
  }

  if (options.dryRun) {
    console.log('\n[calibrate] Dry run mode: no CSS updates were written.');
    printContentBoundDiagnostics(boundFailures);
    maybeRestoreOriginalCss('dry-run exit');
    process.exit(1);
  }

  if (options.noBuild) {
    console.log(
      '\n[calibrate] --no-build mode: stopping after one measurement pass with existing PDFs.'
    );
    printContentBoundDiagnostics(boundFailures);
    maybeRestoreOriginalCss('no-build exit');
    process.exit(1);
  }

  if (adjustableFailing.length === 0) {
    console.error(
      '\n[calibrate] Remaining failures are content-bounded within current scale/leading/top-offset limits.'
    );
    break;
  }

  let cssAfter = cssBefore;
  for (const result of adjustableFailing) {
    const currentSettings = settingsByVariant.get(result.id);
    const solverState = solverByVariant.get(result.id);
    if (!currentSettings) {
      throw new Error(`Missing settings snapshot for variant "${result.id}"`);
    }
    if (!solverState) {
      throw new Error(`Missing solver state for variant "${result.id}"`);
    }

    const nextSettings = computeNextSettings({
      state: solverState,
      currentSettings,
      measurement: result,
      tolerancePts: baseline.tolerancePts,
    });

    const minimumScale = minimumScaleByVariant.get(result.id);
    if (minimumScale && nextSettings.scale < minimumScale) {
      nextSettings.scale = minimumScale;
    }

    cssAfter = writeVariantPrintSettings(cssAfter, result.id, nextSettings);

    const strategySuffix = nextSettings.strategy ? ` [${nextSettings.strategy}]` : '';
    console.log(
      `[calibrate] ${result.id}: scale ${formatNumber(currentSettings.scale)} -> ${formatNumber(
        nextSettings.scale
      )}, leading ${formatNumber(currentSettings.leading)} -> ${formatNumber(
        nextSettings.leading
      )}, top-offset ${formatNumber(currentSettings.topOffsetPts)}pt -> ${formatNumber(
        nextSettings.topOffsetPts
      )}pt${strategySuffix}`
    );
  }

  if (cssAfter === cssBefore) {
    console.error('\n[calibrate] No CSS changes applied; stopping to avoid infinite loop.');
    maybeRestoreOriginalCss('stalled calibration');
    process.exit(1);
  }

  writeCss(cssAfter);
}

if (converged) {
  process.exit(0);
}

if (options.keepPartialOnFailure) {
  const cssAtFailure = readFileSync(cssPath, 'utf8');
  const restored = restoreBestKnownSettings(cssAtFailure, targetVariants, solverByVariant);
  if (restored.restoredCount > 0 && restored.cssText !== cssAtFailure) {
    writeCss(restored.cssText);
    console.error(
      '[calibrate] Restored best-known settings for non-converged variants. Rebuild and rerun verify to confirm.'
    );
  }
} else {
  maybeRestoreOriginalCss('non-convergence');
  console.error(
    '[calibrate] Reverted all calibration edits because convergence was not reached. Use --keep-partial-on-failure to keep in-flight adjustments.'
  );
}

printContentBoundDiagnostics(boundFailures);
printNonConvergenceDiagnostics(targetVariants, solverByVariant);

console.error(
  `\n[calibrate] Reached max iterations (${options.maxIterations}) before convergence.\nRun "npm run verify:resume-layout" to inspect remaining deltas.`
);
process.exit(1);
