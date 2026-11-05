import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_RESUME_VARIANT_ID,
  orderedResumeVariantIds,
  resumeVariantById,
} from '../../lib/resume-data.ts';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

test('ai-agentic variant is registered without changing the default resume', () => {
  assert.equal(DEFAULT_RESUME_VARIANT_ID, 'ai-web-dev');
  assert.equal(orderedResumeVariantIds[0], 'applied-ai');
  assert.ok(
    orderedResumeVariantIds.includes('ai-agentic'),
    'expected orderedResumeVariantIds to include ai-agentic'
  );

  const aiAgenticVariant = resumeVariantById['ai-agentic'];
  assert.ok(aiAgenticVariant, 'expected resumeVariantById.ai-agentic to exist');
  assert.equal(aiAgenticVariant.label, 'AI/Agentic');
  assert.equal(aiAgenticVariant.fileName, 'kevin-mok-resume-ai-agentic.pdf');
  assert.equal(aiAgenticVariant.primarySectionOrder, 'projects-first');
  assert.equal(aiAgenticVariant.sectionTitles?.experience, 'Experience');
  assert.equal(aiAgenticVariant.showSummary ?? false, true);

  const pdfVariant = resumePdfVariants.find((variant) => variant.id === 'ai-agentic');
  assert.deepEqual(pdfVariant, {
    id: 'ai-agentic',
    fileName: 'kevin-mok-resume-ai-agentic.pdf',
    bottomWhitespaceMinPts: 0,
    bottomWhitespaceMaxPts: 15,
  });
});

test('ai-agentic preserves human review and privacy in the master tooling draft', () => {
  const variant = resumeVariantById['ai-agentic'];
  assert.deepEqual(variant.resume.projects.map((entry) => entry.name), ['Codex Session Analytics', 'OpenClaw Job Operations']);
  assert.equal(variant.resume.projects.flatMap((entry) => entry.bullets).length, 6);
  assert.match(variant.summary, /explicit human review/);
  assert.match(variant.resume.projects[0].bullets.join(' '), /skipping conversation bodies/);
  assert.match(variant.resume.projects[1].bullets.join(' '), /manual approval/);
  assert.doesNotMatch(JSON.stringify(variant), /M1E 4V4|autonomous agent orchestration/);
  assert.deepEqual(variant.resume.experience.map((entry) => entry.company), ['www.ntcharts.com', 'Red Hat']);
  assert.equal(variant.resume.experience[1].title, 'Cloud/Software Engineer Intern');
});
