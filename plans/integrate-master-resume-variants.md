# Integrate master résumé variants

This plan follows `.agent/PLANS.md`. Convert the 25 complete drafts in `lib/resume-master-all-variants.md` into selectable website résumés and calibrated, downloadable one-page US Letter PDFs. Reuse the existing Next.js renderer and Computer Modern styling.

## Progress

- [x] Read master, existing feature documentation, local rules, and working-tree status; preserve pre-existing changes.
- [x] Add and observe failing tests for complete master-to-catalog parity and PDF registration.
- [x] Integrate typed content, preserve existing IDs/download names/default, and register eleven additional variants.
- [x] Generate PDFs, calibrate every variant, verify one-page/font/whitespace constraints, and inspect screen/PDF samples.
- [x] Update feature and smoke documentation and record verification/review evidence.

## Context and Orientation

`lib/resume-data.ts` defines types and the live catalog, selector order and ID resolution. `components/tiles/content/ResumeContent.tsx` serves both the homepage tile and `/resume?variant=ID`. `scripts/lib/resume-pdf-variants.mjs` lists generation/validation targets. `app/styles/13-resume-latex.css` holds print controls. The master has 14 matching IDs plus eleven new ones. Its fenced résumé blocks alone become recruiter-facing content; source maps and scope warnings remain in the reference document.

## Decision Log

- Decision: Replace matching content with the requested master drafts and add all remaining IDs, preserving default and existing PDF filenames. Rationale: the user wants to view these drafts on site and as calibrated PDFs. Date: 2026-11-05.
- Decision: Reuse typed data and the existing renderer, with a separate content module if necessary to avoid growing the oversized data file. No runtime Markdown parser or new dependencies. Date: 2026-11-05.
- Decision: Keep the existing engineering/support non-mixing rule while following each draft's selected Red Hat role; do not silently correct unresolved source facts. Date: 2026-11-05.

## Plan of Work

First add a parity regression that reads the master blocks and verifies the live IDs, summaries, bullet order, education and PDF registry. Observe the missing variants/content before implementation. Convert the draft content into typed data, retaining verified repository links from the existing data/source registry. Add the eleven generator entries and suitable CSS selectors. Update obsolete content-specific tests to the new requested drafts while preserving routing/default/privacy regressions.

Run the build before calibration, then `npm run calibrate:resume-layout`, `npm run verify:resume-layout` and `npm run validate-resume-pdfs` in that order. Inspect representative desktop/mobile résumés and PDF pages, including short service drafts and new technical categories. Update README résumé guidance, positioning and smoke checks with the new 25-variant workflow.

## Validation and Acceptance

From `/home/kevin/coding/portfolio-site`, run Node tests with `--experimental-strip-types` for TypeScript imports, then `npm run typecheck` and the mandatory build/calibrate/verify/validate sequence. All 25 IDs must resolve by ID and filename, appear in the existing selector, have matching downloadable PDFs, preserve the master content and contain no source-map metadata. Each PDF must pass the existing page size, embedded font, bold and whitespace checks. Verify `/resume?variant=developer-tools`, a legacy variant and the homepage résumé tile in Chrome. No new public claim auditing is implied.

## Idempotence and Recovery

Generation and calibration can be rerun. Keep existing filenames and query IDs stable. Preserve all pre-existing dirty files and unrelated changes; no commit or push is requested. Restore only session changes from the captured baseline if rollback is needed, without resetting the working tree.

## Surprises & Discoveries

An exploratory read guessed a nonexistent `resume-layout-config.mjs`; the actual registry/baseline modules are already identified. No product impact. See `docs/postmortem/2026-11-05-resume-module-lookup.md`.

## Outcomes & Retrospective

Complete in the local working tree. All 25 drafts render through the existing site and have calibrated one-page US Letter PDFs. Existing IDs, filenames and default are preserved. No commit, push or production deployment was requested or performed. Generated PDFs remain Git-ignored and are reproduced by the build. The master’s unresolved factual caveats and unestablished ATS performance remain unchanged.

## Interfaces and Dependencies

Retain `ResumeVariantDefinition`, `ResumeVariantId`, `resumeVariants`, `orderedResumeVariantIds`, `resumeVariantById` and `resolveResumeVariantId`. Existing React sections and Chrome/Poppler tooling provide rendering and measurement. No dependency changes are needed.

## Artifacts and Notes

Baseline `git status --short` was captured before modifications. Existing changes include resume data, CSS, docs, generator registry and tests; new session work must build on them without discarding them.

## Verification evidence

The defining parity test failed before implementation with `14 !== 25` and a mismatched summary. After implementation it passes 2/2. Seven existing/new test files pass and type checking exits 0. Host-access `npm run build` exits 0 and generates 25 PDFs. Independent review also compared every contact, skill list, entry title/date/technology and education item against the master, and checked project URLs against each draft’s selected source map; no mismatches were found. PDF calibration and browser checks are still in progress.

## Cursor handoff prompt

Review the 25 master-derived résumé variants exported from lib/resume-data.ts and defined in lib/resume-master-variants.mjs. Preserve all IDs, existing filenames/default and the Computer Modern design. Read plans/integrate-master-resume-variants.md, retain unrelated working-tree edits, run the parity and regression tests, then build, calibrate, verify and validate all PDFs before changing or delivering copy.

Suggested commit: `feat(resume): integrate 25 master drafts and calibrated PDFs`. No commit/push requested in this session. PDF outputs are intentionally Git-ignored and regenerated by the build.

Revision 2026-11-05: Recorded RED/GREEN evidence, independent review and successful host-access build. Separate calibration from preview startup because calibration replaces the build directory.

Calibration review: the first full calibration completed successfully after seven iterations, resolving AI/Agentic and AWS page overflow plus AWS + Python bottom-margin deficit. Rendered Web Development and Developer Tools samples showed complete readable content and black print text. Five shorter drafts (IT Support + SQL, Sales, Call Centre, Cloud Native and Technical Documentation) received modest scale/leading adjustments to reduce avoidable whitespace; a final calibration run is checking those settings without altering copy.

Final evidence (2026-11-05): final `npm run calibrate:resume-layout` exited 0; all 25 passed in one iteration after shorter-draft spacing adjustments. `npm run verify:resume-layout` and `npm run validate-resume-pdfs` each exited 0 for all 25. PDF extraction independently confirmed every master bullet and education dates in every generated artifact. The final calibration rebuild passed compilation, lint and type checks. All seven scripts/lib test files passed in this turn; `npm run typecheck` passed separately. `git diff --check` passed.

Chrome runtime checks: selected all 25 options and fetched each selected download; every response was HTTP 200 with application/pdf. At 390px the longest-label variant had scrollWidth=390 and no horizontal overflow; its screenshot was visually inspected. Desktop homepage résumé tile exposed all 25 options, selected ai-web-dev by default and linked its preserved PDF. Mobile homepage CTA linked /resume and the same default PDF. Rendered final AI/Agentic and Call Centre PDF pages, plus Web Development and Developer Tools samples, were inspected for complete readable text and clipping. Not every PDF received individual visual inspection; all received automated content/page/font/whitespace checks.

Usage: production preview is running at http://127.0.0.1:4327/resume . Select a draft and use Download PDF. To recreate after stopping it, run `npm run start -- --hostname 127.0.0.1 --port 4327` from the repository after building; no sudo. To roll back, restore only this session’s catalog/renderer/registry/CSS/docs edits against the captured preexisting working tree and regenerate PDFs; do not reset unrelated work.

Revision 2026-11-05: Completed calibration, artifact-content checks, independent review, browser interaction/download checks and final documentation. No implementation gaps remain; source fact review and production publication remain outside this task.

## Category ordering follow-up

User requested the supplied 25-category ranking with salaries omitted. Change only selector ordering, preserving category labels, default AI + Web Dev, content and PDF filenames. Add a defining order regression (observed RED against the former order), update obsolete first-option assertions and the positioning/smoke documentation. Rebuild and run the existing calibration/verification/validation gates, then check browser option order and default. No salary data is added. Verified: defining order regression observed RED then GREEN; all seven test files passed (19 cases). Fresh build exited 0 and regenerated 25 PDFs. Calibration with --skip-build-first, layout verification and PDF validation all exited 0. Chrome confirmed all 25 option labels in the exact supplied order, default ai-web-dev, and hasSalary=false. Preview restarted on port 4327. No commit or deployment performed.

## Session commit milestone

Commit-session requested. Scope helper could not read this harness’s tool-call history, so direct conversation evidence and the initial dirty baseline define scope. Stage session-only versions against HEAD, preserving pre-existing legacy source edits and later Applied AI default work in the working tree. The original untracked evidence master stays local; docs/resume/MASTER_DRAFTS.md is the copy-only reference needed to reproduce the committed parity regression. Include this plan with the implementation. README gate reviewed against manifest, scripts and candidate docs; preserve unrelated README edits. Candidate verification is pending. Suggested subject: feat(resume): integrate and rank 25 calibrated drafts.

Commit milestone ready: `feat(resume): integrate and rank 25 calibrated drafts`. Exact isolated candidate passes 16 tests, typecheck, production build, calibration and both 25-PDF gates. README gate result: update_in_same_change; corrected 25-variant workflow, current manifest badge, origin-based clone/issues paths and stale stylesheet-size claims. Public email hashes reviewed via the mandatory gate’s documented mechanism; no installed privacy-hook snapshots exist here. Preserve unrelated working-tree changes and later Applied AI default edits. Completed: catalog, rank order, calibrated output, reference copy, docs and tests. Remaining: final privacy check, commit and push to origin/main. No implementation blockers.

## Delivery milestone

Implementation committed as 805ec43 (`feat(resume): integrate and rank 25 calibrated drafts`) and pushed successfully to configured origin/main. The configured GitHub repository redirects to Kevin-Mok/nextjs-portfolio-showcase. The initial shared-tree hook refused a concurrently changing gallery/navigation worktree; an isolated exact-commit retry passed the unchanged full hook and pushed successfully. All 25 PDFs pass; candidate tests16/16, type checking and privacy checks pass. No Vercel project configuration is present; no separate deployment was attempted.

Scope used direct-write evidence from conversation 01a1ad17-f991-77a1-875f-b219fda4bcb5 because the helper could not parse this harness’s write history. Included session catalog/order, calibrated CSS, renderer guard, PDF registry, reference copy, regression tests, docs, plan and session incidents. Excluded pre-existing .gitignore/AGENTS policy, old legacy résumé edits, original evidence master/prompt packets, and later Applied AI default/gallery/navigation work. Worktree deliberately remains dirty.

Documentation milestone: `docs: record resume session delivery and push recovery`. Completed: final evidence and incident resolution recorded; remaining: commit/push this documentation update only. No implementation blockers.
