import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluateWhitespaceConstraints } from './resume-layout-constraints.mjs';

test('fails when a variant exceeds the configured bottom whitespace maximum', () => {
  const result = evaluateWhitespaceConstraints({
    topWhitespacePts: 5,
    bottomWhitespacePts: 18,
    tolerancePts: 1,
    caps: {
      topMinPts: 4.894,
      bottomMinPts: 12,
      bottomMaxPts: 15,
    },
  });

  assert.equal(result.pass, false);
  assert.equal(result.primaryFailure, 'bottom-overflow');
  assert.equal(result.bottomOverflowPts, 3);
});

test('passes when whitespace stays within min/max tolerance', () => {
  const result = evaluateWhitespaceConstraints({
    topWhitespacePts: 5,
    bottomWhitespacePts: 15.8,
    tolerancePts: 1,
    caps: {
      topMinPts: 4.894,
      bottomMinPts: 12,
      bottomMaxPts: 15,
    },
  });

  assert.equal(result.pass, true);
  assert.equal(result.primaryFailure, 'none');
  assert.ok(Math.abs(result.bottomOverflowPts - 0.8) < 0.001);
});
