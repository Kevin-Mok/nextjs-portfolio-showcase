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
  assert.equal(orderedResumeVariantIds[0], 'ai-web-dev');
  assert.ok(
    orderedResumeVariantIds.includes('ai-agentic'),
    'expected orderedResumeVariantIds to include ai-agentic'
  );

  const aiAgenticVariant = resumeVariantById['ai-agentic'];
  assert.ok(aiAgenticVariant, 'expected resumeVariantById.ai-agentic to exist');
  assert.equal(aiAgenticVariant.label, 'AI/Agentic');
  assert.equal(aiAgenticVariant.fileName, 'kevin-mok-resume-ai-agentic.pdf');
  assert.equal(aiAgenticVariant.primarySectionOrder, 'projects-first');
  assert.equal(aiAgenticVariant.sectionTitles?.experience, 'Work Experience');
  assert.equal(aiAgenticVariant.showSummary ?? false, false);

  const pdfVariant = resumePdfVariants.find((variant) => variant.id === 'ai-agentic');
  assert.deepEqual(pdfVariant, {
    id: 'ai-agentic',
    fileName: 'kevin-mok-resume-ai-agentic.pdf',
    bottomWhitespaceMinPts: 0,
    bottomWhitespaceMaxPts: 15,
  });
});

test('ai-agentic variant keeps the required project and experience structure', () => {
  const aiAgenticVariant = resumeVariantById['ai-agentic'];
  assert.ok(aiAgenticVariant, 'expected resumeVariantById.ai-agentic to exist');

  const projects = aiAgenticVariant.resume.projects;
  assert.equal(projects.length, 3, 'expected exactly 3 projects');
  assert.ok(projects.every((project) => project.date === 'Mar 2026 — Present'));
  assert.equal(
    projects.find((project) => project.name === 'Local Chess Analytics CLI')?.url,
    'https://github.com/Kevin-Mok/ai-chess-coach-llm'
  );

  const totalProjectBullets = projects.reduce((sum, project) => sum + project.bullets.length, 0);
  assert.ok(
    totalProjectBullets >= 5 && totalProjectBullets <= 6,
    `expected 5-6 total project bullets, got ${totalProjectBullets}`
  );

  const projectText = projects.map((project) => project.bullets.join(' '));
  assert.ok(
    projectText.some((text) => /(Graphiti|Codex|AGENTS|ExecPlan|Neo4j|stdio)/i.test(text)),
    'expected one project to cover the linux-config agentic workflow'
  );
  assert.ok(
    projectText.some((text) => /(Stockfish|Lc0|llama-cli|Ollama|forensic)/i.test(text)),
    'expected one project to cover the chess local-first analysis workflow'
  );
  assert.ok(
    projectText.some((text) => /(OpenClaw|SQLite|Indeed|Discord|X\/Twitter|browser)/i.test(text)),
    'expected one project to cover the openclaw job-ops workflow'
  );
  assert.ok(
    projectText.some((text) => /(Toronto location policy|location policy|location rules)/i.test(text)),
    'expected the OpenClaw bullet to describe generic location-based routing'
  );
  assert.ok(
    projectText.every((text) => !/M1E 4V4/i.test(text)),
    'expected ai-agentic projects to avoid a hard-coded postal code'
  );
  assert.ok(
    projectText.some((text) => /(deterministic fallback text|Ollama|llama-cli|rewrites)/i.test(text)),
    'expected the chess project to mention local rewrite/fallback behavior'
  );

  const experiences = aiAgenticVariant.resume.experience;
  assert.equal(experiences.length, 1, 'expected exactly 1 experience entry');
  assert.equal(experiences[0].company, 'Red Hat');
  assert.equal(experiences[0].title, 'Cloud/Software Engineer Intern');

  const totalExperienceBullets = experiences.reduce((sum, entry) => sum + entry.bullets.length, 0);
  assert.equal(totalExperienceBullets, 5, `expected 5 total Red Hat bullets, got ${totalExperienceBullets}`);
  const experienceText = experiences[0].bullets.join(' ');
  assert.match(experienceText, /\bGo\b|GoLang|Golang/i);
  assert.match(experienceText, /500\+ line|onboarding/i);
  assert.match(experienceText, /Quarkus|Spring Boot|startup probes|Helm charts/i);
});

test('ai-agentic skills and summary stay compact for one-page layout', () => {
  const aiAgenticVariant = resumeVariantById['ai-agentic'];
  assert.ok(aiAgenticVariant, 'expected resumeVariantById.ai-agentic to exist');

  assert.ok(aiAgenticVariant.summary, 'expected ai-agentic summary to be present');
  const summaryLineCount = aiAgenticVariant.summary.split('\n').length;
  assert.ok(summaryLineCount <= 2, `expected summary to be 2 lines max, got ${summaryLineCount}`);

  const skillLineCount =
    aiAgenticVariant.skillsHtmlLines?.length ?? aiAgenticVariant.skillsLines?.length ?? 0;
  assert.ok(skillLineCount > 0, 'expected compact skills lines for ai-agentic');
  assert.ok(skillLineCount <= 4, `expected 4 skill lines max, got ${skillLineCount}`);
});
