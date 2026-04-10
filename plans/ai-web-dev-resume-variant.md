# AI + Web Dev Resume Variant

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

The portfolio site already ships multiple one-page resume variants, but none combines Kevin's strongest recruiter-facing web work with the current agentic-engineering story in a single default resume. After this change, visiting `/resume` should open a new default `AI + Web Dev` variant that shows a visible top summary, a web-development-first experience and project mix, a dedicated `Agentic Engineering` section, and a downloadable `kevin-mok-resume-ai-web-dev.pdf` that still fits on one US Letter page.

The change is visible in three places: the `/resume` route, the PDF dropdown/download behavior, and the homepage/mobile resume CTA that links to the default PDF. The work is complete only when the new variant is registered, rendered, documented, built into `public/resume/`, and verified by the resume validation pipeline.

## Progress

- [x] (2026-04-10 19:35Z) Re-read the existing resume data, renderer, PDF wiring, tests, and docs to confirm the current variant model and default behavior.
- [x] (2026-04-10 19:35Z) Wrote this ExecPlan in `plans/ai-web-dev-resume-variant.md`.
- [x] (2026-04-10 20:09Z) Added the `ai-web-dev` contract test, confirmed the new variant behavior, and kept the `ai-agentic` contract aligned with the new default.
- [x] (2026-04-10 20:09Z) Implemented the new variant data contract in `lib/resume-data.ts`, including the default ordering, dedicated `Agentic Engineering` section, trimmed Red Hat support block, and updated AI CLI bullet copy.
- [x] (2026-04-10 20:20Z) Updated the resume renderer and CTA link so the summary renders as an `Intro` block, the new section displays correctly, and the homepage PDF link follows the default variant.
- [x] (2026-04-10 20:22Z) Updated PDF registration, print CSS, smoke tests, README/docs, prompt artifacts, and related resume guidance for the new default recruiter-facing variant.
- [x] (2026-04-10 20:25Z) Ran the full resume verification gate successfully: `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs`.

## Surprises & Discoveries

- Observation: The resume data model already contains an optional `summary` field, but `components/tiles/content/ResumeContent.tsx` does not render it anywhere.
  Evidence: `lib/resume-data.ts` defines `summary?: string`, while `ResumeContent.tsx` renders header, sections, skills, education, and references only.

- Observation: The mobile parallax resume CTA hard-codes `/resume/kevin-mok-resume-web-dev.pdf`, so changing the default resume requires updating more than `DEFAULT_RESUME_VARIANT_ID`.
  Evidence: `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx` links directly to `kevin-mok-resume-web-dev.pdf`.

- Observation: `scripts/generate-resume-pdfs.mjs` assumed a local worktree `node_modules/.bin/next`, which broke `npm run build` in this worktree until the script learned how to resolve the binary from parent directories.
  Evidence: Initial builds failed before PDF generation until `resolveNextBinary()` was added to walk up for `node_modules/.bin/next`.

- Observation: The first `ai-web-dev` draft needed two separate content-tightening passes before calibration could succeed: first to restore one-page output, then a final copy tighten to recover enough bottom whitespace.
  Evidence: Early calibration runs reported `page-overflow`, then later `content-too-long-at-floor`, until the default variant trimmed the Red Hat block, compressed the portfolio/AI CLI copy, and finally passed calibration.

## Decision Log

- Decision: Add a new first-class variant `ai-web-dev` instead of overwriting `web-dev`, `web-dev-django`, or `ai-agentic`.
  Rationale: The existing resume system already supports multiple focused variants cleanly, and preserving the old variants avoids deleting established targeting surfaces.
  Date/Author: 2026-04-10 / Codex

- Decision: Render a visible top summary only for the new variant instead of enabling summary rendering globally.
  Rationale: The user explicitly wanted the intro visible on the new hybrid resume, and turning on summary rendering for all variants would change the existing `ai-agentic` presentation unexpectedly.
  Date/Author: 2026-04-10 / Codex

- Decision: Model `Agentic Engineering` as a dedicated new section rather than squeezing `AI CLI Dotfiles` into `Web Dev Projects`.
  Rationale: The user asked for `Agentic Engineering` as a separate section, and the current project renderer can be reused without inventing a broad arbitrary-sections framework.
  Date/Author: 2026-04-10 / Codex

- Decision: Keep the supporting experience block engineering-safe by using the Red Hat `Cloud/Software Engineer Intern` entry, not the support-intern track.
  Rationale: `AGENTS.repo.md` forbids mixing software-engineering/cloud and technical-support tracks inside the same resume variant.
  Date/Author: 2026-04-10 / Codex

- Decision: Render the visible summary as an `Intro` heading plus summary text instead of a bare paragraph.
  Rationale: The user explicitly asked for an intro header after the first summary-only implementation.
  Date/Author: 2026-04-10 / Codex

## Outcomes & Retrospective

Implemented the new `ai-web-dev` default resume variant, including visible `Intro` copy, dedicated `Agentic Engineering`, new chess analytics/project mix, homepage CTA default-PDF wiring, and updated resume docs/tests. The final `AI CLI Dotfiles` bullet now emphasizes concurrent agent workflows plus auto-written regression tests, while omitting the removed Graphiti bullet from the default variant.

All targeted and full-gate checks passed on the final state:

- `node --experimental-strip-types --test scripts/lib/resume-variant-ai-web-dev.test.mjs`
- `node --experimental-strip-types --test scripts/lib/resume-variant-ai-agentic.test.mjs`
- `npm run build`
- `npm run calibrate:resume-layout`
- `npm run verify:resume-layout`
- `npm run validate-resume-pdfs`

## Context and Orientation

The resume system is driven by `lib/resume-data.ts`. That file defines the `ResumeVariantId` union, the `ResumeVariantDefinition` interface, all reusable project and experience templates, the `resumeVariants` array, the ordered dropdown list, and the default variant export. The `/resume` route and the homepage resume tile both render through `components/tiles/content/ResumeContent.tsx`, which chooses a variant from `resumeVariantById` and renders the header, projects, work experience, skills, education, and references in a fixed structure.

PDF generation is controlled by `scripts/lib/resume-pdf-variants.mjs`, which is the canonical list used by build-time generation and by validation scripts such as `scripts/verify-resume-layout.mjs` and `scripts/validate-resume-pdfs.mjs`. Variant-specific print tuning lives in `app/styles/13-resume-latex.css` using `.resume-variant-<id>` selectors and CSS custom properties. Manual smoke coverage for the resume system lives in `docs/smoke-tests.md`. Resume docs in `docs/resume/` and recruiter-facing repo docs in `README.md` describe which variant is the default and how the system is maintained.

The new variant must be named `ai-web-dev`, labeled `AI + Web Dev`, and exported as `kevin-mok-resume-ai-web-dev.pdf`. It must become the default variant at `/resume`. The new visible top summary should state that Kevin is a high-output full-stack web developer using agentic engineering and four concurrent AI workflows, while naming Next.js, TypeScript, Node.js, Python, and Django. The new content mix is intentionally narrow: `www.ntcharts.com` as the main web work experience, `Kevin Mok's Chess Analytics` and `www.kevin-mok.com` as the web projects, `AI CLI Dotfiles` as the dedicated agentic-engineering project, a compact Red Hat cloud/software-engineering support block, grouped skills, and the unchanged education entry.

## Plan of Work

Start by locking the runtime contract with a new Node test in `scripts/lib/resume-variant-ai-web-dev.test.mjs`. The test should import `DEFAULT_RESUME_VARIANT_ID`, `orderedResumeVariantIds`, and `resumeVariantById` from `lib/resume-data.ts`, plus `resumePdfVariants` from `scripts/lib/resume-pdf-variants.mjs`. It must assert that `ai-web-dev` exists, is first in the ordered list, is the default variant, uses the expected label and PDF file name, enables summary rendering, includes exactly one web work experience entry (`www.ntcharts.com`), exactly two web projects (`Kevin Mok's Chess Analytics` and `www.kevin-mok.com`), exactly one agentic-engineering project (`AI CLI Dotfiles`), and exactly one supporting Red Hat engineering entry. Run the test before implementation and confirm it fails because the variant does not exist yet.

Next, update `lib/resume-data.ts`. Extend the variant interface with the smallest possible additions needed for this feature: an opt-in `showSummary` boolean and an optional `agenticEngineering` project array, plus a matching section-title key. Define the new `ai-web-dev` variant using existing reusable project/experience templates where possible and source-backed new chess-site bullets where required. Add the new variant ID to `ResumeVariantId`, register it in `resumeVariants`, add it to `orderedResumeVariantIds` at the front, switch `DEFAULT_RESUME_VARIANT_ID` to `ai-web-dev`, and register its PDF metadata in `scripts/lib/resume-pdf-variants.mjs`.

Then update rendering. In `components/tiles/content/ResumeContent.tsx`, render the summary only when `selectedVariant.showSummary` and `selectedVariant.summary` are both truthy. Place it directly below `ResumeHeader` and before the PDF download controls. Add a dedicated `Agentic Engineering` section that reuses `ProjectEntry` so the new section visually matches the existing project section. Keep the section order for the new default variant as work experience, web projects, agentic engineering, supporting experience, skills, and education. In `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx`, replace the hard-coded default PDF path with a link derived from the default variant from `lib/resume-data.ts`.

After the runtime changes, add print tuning for `.resume-variant-ai-web-dev` in `app/styles/13-resume-latex.css`. Keep the initial print controls conservative and let the official calibration script adjust them if needed. Update the existing `ai-agentic` test so it stops assuming `web-dev` remains the default but still proves that `ai-agentic` is registered, projects-first, and wired to its PDF. Update docs that would otherwise become false: `docs/smoke-tests.md`, `docs/resume/RESUME_VARIANT_POSITIONING.md`, `docs/resume/README_RESUME.md`, `docs/resume/RESUME_ARCHITECTURE.md`, `docs/resume/RESUME_MAINTENANCE.md`, `docs/resume/reference/RESUME_FEATURE_OVERVIEW.md`, `docs/resume/reference/RESUME_FILE_STRUCTURE.md`, the root `README.md`, and the prompt file `prompts/ai-agentic-resume-variant.md` where it insists that `web-dev` must remain the default recruiter-facing variant.

## Concrete Steps

Run these commands from `/home/kevin/coding/portfolio-site/.worktrees/ai-web-dev`.

1. Red test:

       node --experimental-strip-types --test scripts/lib/resume-variant-ai-web-dev.test.mjs

   Expected before implementation: failure indicating `ai-web-dev` is missing from `resumeVariantById`, `orderedResumeVariantIds`, or `resumePdfVariants`.

2. Update runtime/data/rendering/docs and rerun targeted tests:

       node --experimental-strip-types --test scripts/lib/resume-variant-ai-web-dev.test.mjs
       node --experimental-strip-types --test scripts/lib/resume-variant-ai-agentic.test.mjs
       node --test scripts/lib/resume-layout-baseline.test.mjs

3. Run the resume gate in the required order:

       npm run build
       npm run calibrate:resume-layout
       npm run verify:resume-layout
       npm run validate-resume-pdfs

4. Manual checks:

       npm run dev

   Then open `/resume`, `/resume?variant=ai-agentic`, and confirm the new default and summary behavior.

## Validation and Acceptance

Acceptance is behavioral. The work is complete when:

1. `node --experimental-strip-types --test scripts/lib/resume-variant-ai-web-dev.test.mjs` passes and proves the new variant is the default, has the expected section mix, and registers the new PDF.
2. `node --experimental-strip-types --test scripts/lib/resume-variant-ai-agentic.test.mjs` still passes after the default changes.
3. `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs` all exit successfully.
4. `public/resume/kevin-mok-resume-ai-web-dev.pdf` exists and stays on one US Letter page.
5. Visiting `/resume` shows `AI + Web Dev` as the selected default variant with a visible summary, while visiting `/resume?variant=ai-agentic` still shows the AI/Agentic resume without a visible summary.
6. The mobile/homepage resume CTA PDF link opens the new default PDF instead of the old `web-dev` file.

## Idempotence and Recovery

The edits are additive and safe to repeat. Re-running the targeted Node tests is harmless. If the new variant overflows or leaves too much whitespace, rerun `npm run calibrate:resume-layout` and keep any resulting CSS adjustments in the same change. If the new content still fails layout after calibration, trim in this order: reduce the Red Hat support block to one bullet, then remove one lower-priority bullet from `www.ntcharts.com` or `www.kevin-mok.com`. Do not drop `Kevin Mok's Chess Analytics` or `AI CLI Dotfiles` from the new variant.

If a build or validation command fails partway through, fix the specific source or CSS issue and rerun the same command. Avoid reverting unrelated dirty files.

## Artifacts and Notes

Key runtime files:

- `lib/resume-data.ts`
- `components/tiles/content/ResumeContent.tsx`
- `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx`
- `app/styles/13-resume-latex.css`
- `scripts/lib/resume-pdf-variants.mjs`
- `scripts/lib/resume-variant-ai-web-dev.test.mjs`
- `scripts/lib/resume-variant-ai-agentic.test.mjs`

Key documentation files:

- `docs/smoke-tests.md`
- `docs/resume/RESUME_VARIANT_POSITIONING.md`
- `docs/resume/README_RESUME.md`
- `docs/resume/RESUME_ARCHITECTURE.md`
- `docs/resume/RESUME_MAINTENANCE.md`
- `docs/resume/reference/RESUME_FEATURE_OVERVIEW.md`
- `docs/resume/reference/RESUME_FILE_STRUCTURE.md`
- `README.md`
- `prompts/ai-agentic-resume-variant.md`

Plan revision note: created this ExecPlan after the user approved implementation of the new default AI + Web Dev resume variant so the work can be executed in-repo under `.agent/PLANS.md` rules.
