# Rename Resume Variant To AI/Agentic

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This document must be maintained in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

After this change, the checked-in resume system should expose the devtools resume variant as `AI/Agentic` instead of the older company-branded naming. The runtime variant id, generated PDF file name, CSS selector, tests, prompt artifact, and resume docs should all use the new `ai-agentic` naming so `/resume?variant=ai-agentic` and `public/resume/kevin-mok-resume-ai-agentic.pdf` become the canonical surfaces.

## Progress

- [x] (2026-03-30 12:47Z) Captured the pre-edit dirty state with `git status --short` and confirmed pre-existing unrelated changes in `lib/resume-data.ts` and `tasks/lessons.md`.
- [x] (2026-03-30 12:49Z) Loaded the required workflow skills and read `.agent/PLANS.md` in full before editing tracked files.
- [x] (2026-03-30 12:53Z) Audited tracked rename surfaces across runtime code, tests, prompts, docs, and plans to define the full hard-rename scope.
- [x] (2026-03-30 13:07Z) Renamed the targeted regression test file to `scripts/lib/resume-variant-ai-agentic.test.mjs`, updated the baseline whitespace test to expect `ai-agentic`, and confirmed the red state because `resumeVariantById['ai-agentic']` was missing and the layout caps still fell back to the default baseline.
- [x] (2026-03-30 13:18Z) Reconciled the renamed regression test with the current dirty `lib/resume-data.ts` content after discovering the chess/openclaw/Red Hat expectations had drifted from the older committed test.
- [x] (2026-03-30 13:22Z) Replaced runtime variant wiring so `ResumeVariantId`, file names, ordering, PDF generation, and CSS now use `ai-agentic` and the label `AI/Agentic`.
- [x] (2026-03-30 13:33Z) Renamed the prompt and historical plan filenames to `ai-agentic-*` paths and updated the user-facing resume docs and prompt content to remove the older branded language.
- [x] (2026-03-30 13:42Z) Updated this ExecPlan after review so it matches the current working tree, the active rename state, and the full validation command set including `validate-resume-pdfs`.
- [x] (2026-03-30 13:47Z) Re-ran the renamed focused tests, both of which passed.
- [x] (2026-03-30 13:50Z) Ran `npm run build`, regenerated `public/resume/kevin-mok-resume-ai-agentic.pdf`, and removed the stale legacy-named PDF artifact.
- [x] (2026-03-30 13:51Z) Ran `npm run verify:resume-layout` and `npm run validate-resume-pdfs`; both passed, with `kevin-mok-resume-ai-agentic.pdf` validating at `14.926pt` bottom whitespace against the `15pt` cap.
- [x] (2026-03-30 13:55Z) Confirmed there are no remaining legacy variant strings in tracked files under the repo root (excluding `.git` and `node_modules`) and checked that the root `README.md` does not mention this variant.
- [x] (2026-03-30 13:56Z) Added final evidence, outcomes, and recovery notes. Manual runtime route rendering remains unverified in-sandbox because the available local server on `:3000` is a different app and the sandbox denied binding a new local port for `next start`.

## Surprises & Discoveries

- Observation: The tracked rename spans more than runtime code. It includes one prompt artifact, multiple resume docs, two tests, CSS selectors, and two historical ExecPlans under `plans/`.
  Evidence: A repo-wide `rg` audit across `lib`, `scripts`, `docs`, `app`, `prompts`, and `plans` returned hits in every one of those areas before the rename sweep.

- Observation: The old targeted regression test was already stale against the current dirty `lib/resume-data.ts` before the rename completed.
  Evidence: `git diff -- lib/resume-data.ts` showed the chess project name had changed to `Local Chess Analytics CLI`, OpenClaw no longer mentioned a generic postal-code phrase, and the Red Hat/cloud bullet wording no longer matched the older test expectations.

- Observation: The automated verification gates all passed after the rename, and the renamed PDF stayed under the variant-specific bottom whitespace ceiling without extra layout tuning.
  Evidence: `npm run verify:resume-layout` reported `OK kevin-mok-resume-ai-agentic.pdf actual=14.926pt min=0.000pt max=15.000pt`, and `npm run validate-resume-pdfs` reported `pages=1 size=Letter fonts=CMUSerif`.

- Observation: A direct browser-style runtime check was blocked by the sandbox environment rather than by the app build itself.
  Evidence: `npm run start` failed on `:3000` with `EADDRINUSE`, `PORT=3001 npm run start` failed with `EPERM`, and `curl http://127.0.0.1:3000/` returned an unrelated placeholder app instead of this Next.js site.

## Decision Log

- Decision: Perform a hard rename with no compatibility alias from the legacy variant id to `ai-agentic`.
  Rationale: The user explicitly chose the hard-rename option and asked to remove the previous brand name rather than preserve old URLs or ids.
  Date/Author: 2026-03-30 / Codex

- Decision: Update the renamed regression test to the current working-tree content instead of forcing `lib/resume-data.ts` back to the older committed wording.
  Rationale: The dirty resume data changes predated this rename request, and rewriting that content would risk overwriting unrelated user work. The test should reflect the active source of truth that the rename now wraps.
  Date/Author: 2026-03-30 / Codex

- Decision: Keep the existing resume content mix and layout constraints intact unless verification proves the rename itself caused a regression.
  Rationale: This request is a branding rename, not a content rewrite. Minimal behavior change reduces risk to the one-page PDF pipeline.
  Date/Author: 2026-03-30 / Codex

## Outcomes & Retrospective

Completed. The checked-in resume variant now uses `ai-agentic` end to end across runtime data, PDF generation, CSS, tests, docs, prompt artifacts, and historical plan filenames. The renamed PDF `public/resume/kevin-mok-resume-ai-agentic.pdf` is generated successfully, remains one US Letter page, and passes both whitespace and full PDF validation checks.

The only unresolved gap is an in-sandbox manual route render check. The production build succeeded and the PDF generator exercised the renamed variant successfully, but the available local server in this environment was not this app and the sandbox would not allow binding a new port for `next start`. A human can still manually confirm `/resume?variant=ai-agentic` in a normal local session if desired.

## Context and Orientation

The portfolio site stores all resume variants in `lib/resume-data.ts`. Each resume variant has an id, a dropdown label, a PDF filename, and a set of projects and work experience. The scripts under `scripts/lib/` are the contract tests and the PDF generation source of truth that keep the on-screen variant list and generated PDF list aligned. The print stylesheet `app/styles/13-resume-latex.css` contains variant-specific CSS custom properties, including a selector for the devtools variant that now uses the `ai-agentic` id in its class name. Resume docs and prompt artifacts under `docs/resume/`, `docs/smoke-tests.md`, and `prompts/` describe the variant and its validation workflow. Historical plan files under `plans/` are tracked docs too, so a full tracked rename must update those references as well.

The current working tree now also includes rename-in-progress paths: the old test, prompt, and historical plan files appear as deletions while the new `ai-agentic` paths are untracked additions until Git stages them together as renames. This repository still has unrelated modifications in `lib/resume-data.ts` and `tasks/lessons.md`. Any edits in `lib/resume-data.ts` must therefore be surgical and preserve the user’s in-progress changes outside this rename.

## Plan of Work

First, the focused contract test has already been renamed to `scripts/lib/resume-variant-ai-agentic.test.mjs` and the whitespace-baseline test has already been updated to expect `ai-agentic`. Keep those tests as the source of truth while finishing the work. Their current expectations already account for the active dirty resume copy in `lib/resume-data.ts`.

Next, the runtime sources have already been updated. `lib/resume-data.ts` now uses `ai-agentic` in the `ResumeVariantId` union, variant definition, Red Hat mapping key, and ordered id list. `scripts/lib/resume-pdf-variants.mjs` now uses the renamed PDF entry, and `app/styles/13-resume-latex.css` now uses `.resume-variant-ai-agentic`. Verification now needs to prove that these changes are complete and that no stale old-brand strings remain in tracked files.

After runtime wiring, keep the tracked documentation aligned with the hard rename. The prompt artifact path is now `prompts/ai-agentic-resume-variant.md`, and the historical ExecPlans have also been renamed to `plans/ai-agentic-resume-variant.md` and `plans/ai-agentic-resume-variant-prompt.md`. Finish removing any remaining old-brand wording from those renamed files and from this ExecPlan itself.

Finally, verify behavior. Re-run the renamed targeted test, run the whitespace-baseline test, then run `npm run build`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs` so the generated PDF list still includes the renamed file and the one-page layout gate still passes. If any verification step shows a layout regression caused only by the new name length, trim only the affected strings or variant-specific CSS rather than editing unrelated resume variants.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`, use these commands as the implementation and verification checkpoints:

    git status --short
    node --experimental-strip-types --test scripts/lib/resume-variant-ai-agentic.test.mjs
    node --test scripts/lib/resume-layout-baseline.test.mjs
    npm run build
    npm run verify:resume-layout
    npm run validate-resume-pdfs

If the targeted test is still green before runtime edits, that means the test did not actually capture the rename and must be corrected before continuing. If `npm run build` regenerates the renamed PDF successfully, `public/resume/kevin-mok-resume-ai-agentic.pdf` should exist afterward.

## Validation and Acceptance

Acceptance is behavioral, not just textual. The rename is complete when `node --experimental-strip-types --test scripts/lib/resume-variant-ai-agentic.test.mjs` passes while asserting that `resumeVariantById['ai-agentic']` exists, the default variant remains `web-dev`, and the PDF generation list includes `kevin-mok-resume-ai-agentic.pdf` with the same whitespace cap. `node --test scripts/lib/resume-layout-baseline.test.mjs` must still prove that only this variant gets the `15pt` bottom-whitespace ceiling. After `npm run build`, the generated file `public/resume/kevin-mok-resume-ai-agentic.pdf` must exist. After `npm run verify:resume-layout`, the renamed variant must still pass the one-page whitespace gate. `npm run validate-resume-pdfs` must also pass so the renamed PDF set still satisfies the repo’s page-count, Letter-size, and font checks. If manual inspection becomes necessary, opening `/resume?variant=ai-agentic` should show the dropdown label `AI/Agentic` and the same project-first structure as before.

## Idempotence and Recovery

This rename is safe to repeat because every step is based on text replacement and the repo’s own validation commands. If a command fails mid-way, re-run the same command after fixing the relevant file. If the prompt artifact is renamed on disk, use `git diff --name-status` to confirm Git is tracking it as a rename rather than a delete plus unrelated new file. If the PDF build fails after the runtime rename, revert only the incomplete rename hunk in the affected file and re-run the targeted tests before retrying; do not disturb unrelated dirty changes in `lib/resume-data.ts`.

## Artifacts and Notes

Initial tracked-reference audit:

    lib/resume-data.ts
    scripts/lib/resume-variant-ai-agentic.test.mjs
    scripts/lib/resume-layout-baseline.test.mjs
    scripts/lib/resume-pdf-variants.mjs
    app/styles/13-resume-latex.css
    docs/smoke-tests.md
    docs/resume/README_RESUME.md
    docs/resume/RESUME_DOCS_INDEX.md
    docs/resume/RESUME_VARIANT_POSITIONING.md
    docs/resume/resume-generation-spec.md
    prompts/ai-agentic-resume-variant.md
    plans/ai-agentic-resume-variant.md
    plans/ai-agentic-resume-variant-prompt.md

Current `git status --short` snapshot after the in-progress rename:

     Modified tracked files: `app/styles/13-resume-latex.css`, `docs/resume/README_RESUME.md`, `docs/resume/RESUME_DOCS_INDEX.md`, `docs/resume/RESUME_VARIANT_POSITIONING.md`, `docs/resume/resume-generation-spec.md`, `docs/smoke-tests.md`, `lib/resume-data.ts`, `scripts/lib/resume-layout-baseline.test.mjs`, `scripts/lib/resume-pdf-variants.mjs`, and the pre-existing unrelated `tasks/lessons.md`.
     Deleted legacy-named tracked files: the old prompt path, both old historical plan paths, and the old targeted test path.
     Untracked replacement files: `plans/ai-agentic-resume-rename.md`, `plans/ai-agentic-resume-variant-prompt.md`, `plans/ai-agentic-resume-variant.md`, `prompts/ai-agentic-resume-variant.md`, and `scripts/lib/resume-variant-ai-agentic.test.mjs`.

## Interfaces and Dependencies

At the end of this work, `lib/resume-data.ts` must export a `ResumeVariantId` union that includes `ai-agentic` and no longer requires the legacy variant id. The `resumeVariants` array must contain a `ResumeVariantDefinition` with `id: 'ai-agentic'`, `label: 'AI/Agentic'`, `fileName: 'kevin-mok-resume-ai-agentic.pdf'`, and the same `primarySectionOrder: 'projects-first'`. `scripts/lib/resume-pdf-variants.mjs` must expose a matching `{ id: 'ai-agentic', fileName: 'kevin-mok-resume-ai-agentic.pdf', bottomWhitespaceMinPts: 0, bottomWhitespaceMaxPts: 15 }` entry so the build, layout, and PDF validation scripts continue to include this file. The variant-specific selector in `app/styles/13-resume-latex.css` must be `.resume-variant-ai-agentic` so print tuning still applies after the id rename.

Revision note: 2026-03-30. Initial ExecPlan created after the user approved a full tracked rename from the prior branding to AI/Agentic.
