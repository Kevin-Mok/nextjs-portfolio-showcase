import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resumeVariants, orderedResumeVariantIds, resolveResumeVariantId } from '../../lib/resume-data.ts';
import { resumePdfVariants } from './resume-pdf-variants.mjs';

const master = readFileSync(new URL('../../docs/resume/MASTER_DRAFTS.md', import.meta.url), 'utf8');
const drafts = [...master.matchAll(/## \d+\. [^\n]+\(`([^`]+)`\)[\s\S]*?```markdown\n([\s\S]*?)```/g)];
const plain = (text) => text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();

test('all 25 master drafts are selectable and have matching PDF destinations', () => {
  assert.equal(drafts.length, 25);
  assert.equal(resumeVariants.length, 25);
  assert.equal(new Set(orderedResumeVariantIds).size, 25);
  assert.equal(resumePdfVariants.length, 25);
  for (const [, id] of drafts) {
    const variant = resumeVariants.find((item) => item.id === id);
    assert.ok(variant, `missing ${id}`);
    assert.ok(orderedResumeVariantIds.includes(id));
    assert.equal(resolveResumeVariantId(id), id);
    assert.equal(resolveResumeVariantId(variant.fileName), id);
    assert.ok(resumePdfVariants.some((item) => item.id === id && item.fileName === variant.fileName));
  }
});

test('live summaries, ordered bullets, section order and education preserve the master copy', () => {
  for (const [, id, draft] of drafts) {
    const variant = resumeVariants.find((item) => item.id === id);
    assert.ok(variant, id);
    const lines = draft.trim().split('\n');
    const summary = draft.split(/github\.com\/Kevin-Mok\s*\n/)[1].split('\n## ')[0].trim();
    assert.equal(variant.showSummary, true, id);
    assert.equal(plain(variant.summary), plain(summary), `${id}: summary`);
    const projectsFirst = draft.indexOf('## Projects') >= 0 && draft.indexOf('## Projects') < draft.indexOf('## Experience');
    assert.equal(variant.primarySectionOrder === 'projects-first', projectsFirst, `${id}: order`);
    const groups = projectsFirst
      ? [...variant.resume.projects, ...variant.resume.experience]
      : [...variant.resume.experience, ...variant.resume.projects];
    assert.deepEqual(groups.flatMap((entry) => entry.bullets.map(plain)), lines.filter((line) => line.startsWith('- ')).map((line) => plain(line.slice(2))), `${id}: bullets`);
    assert.equal(variant.resume.education[0].date.replace(/—/g, '-'), '2019 - 2024', id);
    assert.doesNotMatch(JSON.stringify(variant), /R\d{3}-B\d{2}|SRC-RH-|Selected source map/);
    assert.ok(variant.resume.projects.every((project) => project.url?.startsWith('https://')), `${id}: linked projects`);
  }
});


test('selector follows the requested category ranking independently of the default', () => {
  assert.deepEqual(orderedResumeVariantIds, [
    'applied-ai', 'ai-agentic', 'developer-tools', 'cloud-native', 'aws',
    'aws-python', 'backend-api', 'aws-web-dev', 'ai-web-dev', 'automation-data',
    'python', 'web-dev-django', 'python-nerdwallet', 'support-automation',
    'frontend', 'web-dev', 'browser-extensions', 'qa-automation',
    'linux-self-hosting', 'technical-documentation', 'it-support-aws',
    'it-support-sql', 'it-support', 'sales', 'call-centre',
  ]);
  assert.equal(resolveResumeVariantId(undefined), 'ai-web-dev');
});
