import test from 'node:test';
import assert from 'node:assert/strict';

import {
  loadResumeLayoutBaseline,
  resolveWhitespaceCapsForVariant,
} from './resume-layout-baseline.mjs';

test('ai-agentic enforces a bottom whitespace ceiling', () => {
  const baseline = loadResumeLayoutBaseline();

  const aiAgenticCaps = resolveWhitespaceCapsForVariant('ai-agentic', baseline);
  assert.equal(aiAgenticCaps.topMinPts, baseline.whitespaceCaps.topMinPts);
  assert.equal(aiAgenticCaps.bottomMinPts, 0);
  assert.equal(aiAgenticCaps.bottomMaxPts, 15);

  const webDevCaps = resolveWhitespaceCapsForVariant('web-dev', baseline);
  assert.equal(webDevCaps.topMinPts, baseline.whitespaceCaps.topMinPts);
  assert.equal(webDevCaps.bottomMinPts, baseline.whitespaceCaps.bottomMinPts);
  assert.equal(webDevCaps.bottomMaxPts, null);
});
