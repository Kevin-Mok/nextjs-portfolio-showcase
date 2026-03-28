import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_RESUME_VARIANT_ID,
  orderedResumeVariantIds,
  resumeVariantById,
} from '../../lib/resume-data.ts';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

test('warp-agentic variant is registered without changing the default resume', () => {
  assert.equal(DEFAULT_RESUME_VARIANT_ID, 'web-dev');
  assert.equal(orderedResumeVariantIds[0], 'web-dev');
  assert.ok(
    orderedResumeVariantIds.includes('warp-agentic'),
    'expected orderedResumeVariantIds to include warp-agentic'
  );

  const warpVariant = resumeVariantById['warp-agentic'];
  assert.ok(warpVariant, 'expected resumeVariantById.warp-agentic to exist');
  assert.equal(warpVariant.label, 'Warp / Agentic Devtools');
  assert.equal(warpVariant.fileName, 'kevin-mok-resume-warp-agentic.pdf');
  assert.equal(warpVariant.primarySectionOrder, 'projects-first');
  assert.equal(warpVariant.sectionTitles?.experience, 'Work Experience');

  const pdfVariant = resumePdfVariants.find((variant) => variant.id === 'warp-agentic');
  assert.deepEqual(pdfVariant, {
    id: 'warp-agentic',
    fileName: 'kevin-mok-resume-warp-agentic.pdf',
    bottomWhitespaceMinPts: 0,
    bottomWhitespaceMaxPts: 15,
  });
});

test('warp-agentic variant keeps the required project and experience structure', () => {
  const warpVariant = resumeVariantById['warp-agentic'];
  assert.ok(warpVariant, 'expected resumeVariantById.warp-agentic to exist');

  const projects = warpVariant.resume.projects;
  assert.equal(projects.length, 3, 'expected exactly 3 projects');
  assert.ok(projects.every((project) => project.date === 'Mar 2026 — Present'));
  assert.equal(
    projects.find((project) => project.name === 'Local Chess Forensics CLI')?.url,
    'https://github.com/Kevin-Mok/ai-chess-coach-llm'
  );

  const totalProjectBullets = projects.reduce((sum, project) => sum + project.bullets.length, 0);
  assert.ok(
    totalProjectBullets >= 6 && totalProjectBullets <= 7,
    `expected 6-7 total project bullets, got ${totalProjectBullets}`
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
    projectText.some((text) => /postal code/i.test(text)),
    'expected the OpenClaw bullet to use a generic postal-code reference'
  );
  assert.ok(
    projectText.every((text) => !/M1E 4V4/i.test(text)),
    'expected warp-agentic projects to avoid a hard-coded postal code'
  );
  assert.ok(
    projectText.some((text) => /(auto-detection|deterministic forensic text|rewrite backend)/i.test(text)),
    'expected the chess project to mention local rewrite/fallback behavior'
  );

  const experiences = warpVariant.resume.experience;
  assert.equal(experiences.length, 1, 'expected exactly 1 experience entry');
  assert.equal(experiences[0].company, 'Red Hat');
  assert.equal(experiences[0].title, 'Cloud/Software Engineer Intern');

  const totalExperienceBullets = experiences.reduce((sum, entry) => sum + entry.bullets.length, 0);
  assert.equal(totalExperienceBullets, 5, `expected 5 total Red Hat bullets, got ${totalExperienceBullets}`);
  const experienceText = experiences[0].bullets.join(' ');
  assert.match(experienceText, /472-line|onboarding/i);
  assert.match(experienceText, /587-line|Quarkus|Spring Boot/i);
});

test('warp-agentic skills and summary stay compact for one-page layout', () => {
  const warpVariant = resumeVariantById['warp-agentic'];
  assert.ok(warpVariant, 'expected resumeVariantById.warp-agentic to exist');

  assert.ok(warpVariant.summary, 'expected warp-agentic summary to be present');
  const summaryLineCount = warpVariant.summary.split('\n').length;
  assert.ok(summaryLineCount <= 2, `expected summary to be 2 lines max, got ${summaryLineCount}`);

  const skillLineCount =
    warpVariant.skillsHtmlLines?.length ?? warpVariant.skillsLines?.length ?? 0;
  assert.ok(skillLineCount > 0, 'expected compact skills lines for warp-agentic');
  assert.ok(skillLineCount <= 4, `expected 4 skill lines max, got ${skillLineCount}`);
});
