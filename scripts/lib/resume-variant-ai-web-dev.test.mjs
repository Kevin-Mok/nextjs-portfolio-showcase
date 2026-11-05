import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_RESUME_VARIANT_ID,
  orderedResumeVariantIds,
  resumeVariantById,
} from '../../lib/resume-data.ts';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

test('ai-web-dev variant becomes the default recruiter-facing resume', () => {
  assert.equal(DEFAULT_RESUME_VARIANT_ID, 'ai-web-dev');
  assert.equal(orderedResumeVariantIds[0], 'applied-ai');
  assert.ok(
    orderedResumeVariantIds.includes('ai-web-dev'),
    'expected orderedResumeVariantIds to include ai-web-dev'
  );

  const aiWebDevVariant = resumeVariantById['ai-web-dev'];
  assert.ok(aiWebDevVariant, 'expected resumeVariantById.ai-web-dev to exist');
  assert.equal(aiWebDevVariant.label, 'AI + Web Dev');
  assert.equal(aiWebDevVariant.fileName, 'kevin-mok-resume-ai-web-dev.pdf');
  assert.equal(aiWebDevVariant.showSummary, true);

  const pdfVariant = resumePdfVariants.find((variant) => variant.id === 'ai-web-dev');
  assert.deepEqual(pdfVariant, {
    id: 'ai-web-dev',
    fileName: 'kevin-mok-resume-ai-web-dev.pdf',
  });
});

test('ai-web-dev uses the master web, transcription and session-analysis draft', () => {
  const variant = resumeVariantById['ai-web-dev'];
  assert.match(variant.summary, /Whisper transcription/);
  assert.deepEqual(variant.resume.experience.map((entry) => entry.company), ['www.ntcharts.com', 'Red Hat']);
  assert.deepEqual(variant.resume.projects.map((entry) => entry.name), ['Toronto Zoo Blog', 'Codex Session Analytics']);
  assert.equal(variant.resume.projects.flatMap((entry) => entry.bullets).length, 6);
  assert.equal(variant.agenticEngineering?.length ?? 0, 0);
  assert.equal(variant.otherExperience?.length ?? 0, 0);
  assert.doesNotMatch(JSON.stringify(variant), /Graphiti|RAG|fine-tuning/);
});
