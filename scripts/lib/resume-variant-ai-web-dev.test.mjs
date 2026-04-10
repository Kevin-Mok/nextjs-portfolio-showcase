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
  assert.equal(orderedResumeVariantIds[0], 'ai-web-dev');
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

test('ai-web-dev variant keeps the requested section mix', () => {
  const aiWebDevVariant = resumeVariantById['ai-web-dev'];
  assert.ok(aiWebDevVariant, 'expected resumeVariantById.ai-web-dev to exist');

  assert.match(
    aiWebDevVariant.summary ?? '',
    /four concurrent AI workflows|4 concurrent AI workflows/i
  );
  assert.match(aiWebDevVariant.summary ?? '', /Next\.js|TypeScript|Node\.js|Python|Django/i);

  const experiences = aiWebDevVariant.resume.experience;
  assert.equal(experiences.length, 1, 'expected exactly 1 primary work experience entry');
  assert.equal(experiences[0].company, 'www.ntcharts.com');

  const projects = aiWebDevVariant.resume.projects;
  assert.equal(projects.length, 2, 'expected exactly 2 web projects');
  assert.deepEqual(
    projects.map((project) => project.name),
    ['Kevin Mok\'s Chess Analytics', 'www.kevin-mok.com']
  );
  assert.equal(projects[0].url, 'https://chess.kevin-mok.com/');

  const agenticProjects = aiWebDevVariant.agenticEngineering ?? [];
  assert.equal(agenticProjects.length, 1, 'expected exactly 1 agentic engineering project');
  assert.equal(agenticProjects[0].name, 'AI CLI Dotfiles');
  assert.equal(
    agenticProjects[0].bullets.length,
    1,
    'expected the ai-web-dev AI CLI entry to keep only the non-Graphiti bullet'
  );
  assert.ok(
    agenticProjects[0].bullets.every((bullet) => !/Graphiti/i.test(bullet)),
    'expected the ai-web-dev AI CLI entry to omit Graphiti bullet content'
  );
  assert.ok(
    agenticProjects[0].bullets.some((bullet) => /regression tests|correctness/i.test(bullet)),
    'expected the ai-web-dev AI CLI entry to mention regression tests and correctness'
  );

  const otherExperience = aiWebDevVariant.otherExperience ?? [];
  assert.equal(otherExperience.length, 1, 'expected exactly 1 supporting experience block');
  assert.equal(otherExperience[0].company, 'Red Hat');
  assert.equal(otherExperience[0].title, 'Cloud/Software Engineer Intern');
});
