import test from 'node:test';
import assert from 'node:assert/strict';

import {
  loadResumeLayoutBaseline,
  resolveWhitespaceCapsForVariant,
} from './resume-layout-baseline.mjs';

test('warp-agentic enforces a bottom whitespace ceiling', () => {
  const baseline = loadResumeLayoutBaseline();

  const warpCaps = resolveWhitespaceCapsForVariant('warp-agentic', baseline);
  assert.equal(warpCaps.topMinPts, baseline.whitespaceCaps.topMinPts);
  assert.equal(warpCaps.bottomMinPts, 0);
  assert.equal(warpCaps.bottomMaxPts, 15);

  const webDevCaps = resolveWhitespaceCapsForVariant('web-dev', baseline);
  assert.equal(webDevCaps.topMinPts, baseline.whitespaceCaps.topMinPts);
  assert.equal(webDevCaps.bottomMinPts, baseline.whitespaceCaps.bottomMinPts);
  assert.equal(webDevCaps.bottomMaxPts, null);
});
