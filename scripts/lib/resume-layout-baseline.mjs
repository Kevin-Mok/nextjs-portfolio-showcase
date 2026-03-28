import { readFileSync } from 'node:fs';
import path from 'node:path';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

const baselinePath = path.join(process.cwd(), 'docs', 'resume', 'resume-layout-baseline.json');

export function loadResumeLayoutBaseline() {
  let raw;
  try {
    raw = readFileSync(baselinePath, 'utf8');
  } catch {
    throw new Error(
      `Missing baseline file at ${baselinePath}\nRun the baseline setup workflow in docs/resume/resume-generation-spec.md.`
    );
  }

  let baseline;
  try {
    baseline = JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to parse ${baselinePath}: ${message}`);
  }

  const ratio = baseline?.reference?.bottomWhitespaceRatio;
  const tolerancePts = baseline?.enforcement?.tolerancePts;
  const mode = baseline?.enforcement?.mode;
  const referencePdfPath = baseline?.reference?.pdfPath;
  const topWhitespaceMinPts = baseline?.enforcement?.topWhitespaceMinPts;
  const bottomWhitespaceMinPts = baseline?.enforcement?.bottomWhitespaceMinPts;

  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new Error(`Invalid baseline ratio in ${baselinePath}. Expected a positive number.`);
  }

  if (!Number.isFinite(tolerancePts) || tolerancePts < 0) {
    throw new Error(`Invalid tolerancePts in ${baselinePath}. Expected a non-negative number.`);
  }

  if (mode !== 'normalized_ratio') {
    throw new Error(
      `Unsupported enforcement mode "${String(mode)}" in ${baselinePath}. Expected "normalized_ratio".`
    );
  }

  if (typeof referencePdfPath !== 'string' || referencePdfPath.length === 0) {
    throw new Error(`Invalid reference.pdfPath in ${baselinePath}.`);
  }

  const hasTopCap = topWhitespaceMinPts !== undefined;
  const hasBottomCap = bottomWhitespaceMinPts !== undefined;
  if (hasTopCap !== hasBottomCap) {
    throw new Error(
      `Invalid enforcement caps in ${baselinePath}. Expected both topWhitespaceMinPts and bottomWhitespaceMinPts, or neither.`
    );
  }

  let whitespaceCaps = null;
  if (hasTopCap && hasBottomCap) {
    if (!Number.isFinite(topWhitespaceMinPts) || topWhitespaceMinPts < 0) {
      throw new Error(
        `Invalid enforcement.topWhitespaceMinPts in ${baselinePath}. Expected a non-negative number.`
      );
    }

    if (!Number.isFinite(bottomWhitespaceMinPts) || bottomWhitespaceMinPts < 0) {
      throw new Error(
        `Invalid enforcement.bottomWhitespaceMinPts in ${baselinePath}. Expected a non-negative number.`
      );
    }

    whitespaceCaps = {
      topMinPts: topWhitespaceMinPts,
      bottomMinPts: bottomWhitespaceMinPts,
    };
  }

  return {
    ratio,
    tolerancePts,
    mode,
    referencePdfPath,
    whitespaceCaps,
    raw: baseline,
    baselinePath,
  };
}

export function expectedWhitespacePointsForPageHeight(pageHeightPts, baselineRatio) {
  return baselineRatio * pageHeightPts;
}

export function resolveWhitespaceCapsForVariant(variantId, baseline = loadResumeLayoutBaseline()) {
  if (!baseline.whitespaceCaps) {
    throw new Error(
      `Missing enforcement whitespace caps in ${baseline.baselinePath}. Set enforcement.topWhitespaceMinPts and enforcement.bottomWhitespaceMinPts.`
    );
  }

  const variant = resumePdfVariants.find((candidate) => candidate.id === variantId) ?? null;
  const bottomWhitespaceMinPts = Number.isFinite(variant?.bottomWhitespaceMinPts)
    ? variant.bottomWhitespaceMinPts
    : null;
  const bottomWhitespaceMaxPts = Number.isFinite(variant?.bottomWhitespaceMaxPts)
    ? variant.bottomWhitespaceMaxPts
    : null;

  return {
    topMinPts: baseline.whitespaceCaps.topMinPts,
    bottomMinPts:
      bottomWhitespaceMinPts !== null
        ? bottomWhitespaceMinPts
        : bottomWhitespaceMaxPts === null
          ? baseline.whitespaceCaps.bottomMinPts
          : null,
    bottomMaxPts: bottomWhitespaceMaxPts,
  };
}
