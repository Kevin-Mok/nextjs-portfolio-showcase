export function evaluateWhitespaceConstraints({
  topWhitespacePts,
  bottomWhitespacePts,
  tolerancePts,
  caps,
}) {
  const topDeficitPts = caps.topMinPts - topWhitespacePts;
  const hasBottomMin = Number.isFinite(caps.bottomMinPts);
  const bottomDeficitPts = hasBottomMin ? caps.bottomMinPts - bottomWhitespacePts : 0;
  const hasBottomMax = Number.isFinite(caps.bottomMaxPts);
  const bottomOverflowPts = hasBottomMax ? bottomWhitespacePts - caps.bottomMaxPts : 0;

  let primaryFailure = 'none';
  if (bottomDeficitPts > tolerancePts && bottomDeficitPts >= topDeficitPts) {
    primaryFailure = 'bottom-underflow';
  } else if (topDeficitPts > tolerancePts) {
    primaryFailure = 'top-underflow';
  } else if (bottomOverflowPts > tolerancePts) {
    primaryFailure = 'bottom-overflow';
  }

  return {
    pass:
      topDeficitPts <= tolerancePts &&
      bottomDeficitPts <= tolerancePts &&
      bottomOverflowPts <= tolerancePts,
    primaryFailure,
    bottomMinPts: hasBottomMin ? caps.bottomMinPts : null,
    topDeficitPts,
    bottomDeficitPts,
    bottomOverflowPts,
    bottomMaxPts: hasBottomMax ? caps.bottomMaxPts : null,
  };
}
