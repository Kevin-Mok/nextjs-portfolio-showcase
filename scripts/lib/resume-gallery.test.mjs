import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pdfVariants } from '../../lib/resume-data.ts';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

test('gallery metadata covers precisely the generated PDFs, with unique names and destinations', () => {
  assert.equal(new Set(pdfVariants.map(({ id }) => id)).size, pdfVariants.length);
  assert.equal(new Set(pdfVariants.map(({ value }) => value)).size, pdfVariants.length);
  assert.deepEqual(
    pdfVariants.map(({ id, value }) => `${id}:${value}`).sort(),
    resumePdfVariants.map(({ id, fileName }) => `${id}:${fileName}`).sort(),
  );
  for (const { label, value } of pdfVariants) {
    assert.ok(label.trim());
    assert.equal(readFileSync(new URL(`../../public/resume/${value}`, import.meta.url)).subarray(0, 5).toString(), '%PDF-');
  }
});
