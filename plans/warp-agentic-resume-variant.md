# Implement Warp Agentic Resume Variant

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Add a first-class `warp-agentic` resume variant to the checked-in `portfolio-site` resume system. After this change, `/resume?variant=warp-agentic` should render a Warp-targeted version of the resume, the PDF pipeline should generate `public/resume/kevin-mok-resume-warp-agentic.pdf`, and the canonical resume docs should reflect the new active variant count and manual verification path.

## Progress

- [x] (2026-03-28 16:57Z) Read the Warp prompt spec, current resume variant wiring, layout controls, and resume documentation surfaces.
- [x] (2026-03-28 17:03Z) Confirmed there are no stricter nested `AGENTS.md` files in the directories touched by this task.
- [x] (2026-03-28 17:11Z) Added `scripts/lib/resume-variant-warp-agentic.test.mjs`, fixed the initial regex mistake in the test itself, and confirmed the targeted red state before implementation.
- [x] (2026-03-28 17:15Z) Implemented `warp-agentic` in `lib/resume-data.ts`, registered it in `scripts/lib/resume-pdf-variants.mjs`, and extended the Red Hat mapping assertion to allow this single mixed-entry variant.
- [x] (2026-03-28 17:18Z) Updated `docs/resume/RESUME_VARIANT_POSITIONING.md`, corrected stale resume-variant counts in `README.md`, and added shared manual checks to `docs/smoke-tests.md`.
- [x] (2026-03-28 21:07Z) Ran `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, `npm run validate-resume-pdfs`, re-ran the targeted variant test, and confirmed `/resume?variant=warp-agentic` content on a local `next start` server.
- [x] (2026-03-28 21:16Z) Applied follow-up corrections: removed the Red Hat support entry from `warp-agentic`, added the canonical chess repo URL, and added a repo rule in `AGENTS.repo.md` forbidding mixed SWE/support experience in the same resume variant.
- [x] (2026-03-28 21:24Z) Re-ran the targeted Warp test plus `build`, `calibrate:resume-layout`, `verify:resume-layout`, and `validate-resume-pdfs` after the chess repo-link correction and AGENTS-rule update.
- [x] (2026-03-28 21:40Z) Added the screenshot-requested Warp bullets/order changes, genericized the OpenClaw postal-code text, added a Warp-only bottom-whitespace ceiling, and re-verified the generated PDF at `14.176pt` bottom whitespace on one page.

## Surprises & Discoveries

- Observation: The root `README.md` still says the site auto-generates and validates `10` resume variants even though the current codebase already has `11`.
  Evidence: `README.md` contains multiple `10 resume variants` strings while `docs/resume/RESUME_VARIANT_POSITIONING.md` says `Canonical active variants: 11`.
- Observation: `lib/resume-data.ts` already has runtime assertions that every variant maps to exactly one Red Hat section (`cloud` or `support`), so adding `warp-agentic` requires updating both the union type and the Red Hat mapping table.
  Evidence: `assertRedHatVariantMapping(resumeVariants)` throws if a variant is missing or mixes Red Hat sections.
- Observation: The repo has no existing resume-data unit test; the lightest regression path is `node:test` plus `node --experimental-strip-types` against `lib/resume-data.ts`.
  Evidence: `rg --files -g '*test.*' scripts lib app docs` returned only `scripts/lib/resume-calibration-solver.test.mjs`, and `node --experimental-strip-types -e "import('./lib/resume-data.ts')..."` succeeds on Node `v23.6.0`.
- Observation: The first successful Warp PDF spill did not come from one oversized bullet block; page two contained only the education section after the rest of the resume rendered on page one.
  Evidence: `pdftotext public/resume/kevin-mok-resume-warp-agentic.pdf -` showed page one ending after the skills section and page two containing only `Education`.
- Observation: `npm run calibrate:resume-layout` can rewrite unrelated variant print settings during a successful pass, so those diffs need review and selective rollback before finalizing a narrow resume change.
  Evidence: One calibration pass altered `.resume-variant-sales` and `.resume-variant-call-centre` even though this task only targeted Warp.
- Observation: Removing the Red Hat support entry left the Warp PDF with much more bottom whitespace, but it still passed the repo's enforced minimums and single-page validation without additional CSS changes.
  Evidence: `npm run verify:resume-layout` reported `kevin-mok-resume-warp-agentic.pdf` bottom whitespace at `159.043pt`, and `npm run validate-resume-pdfs` still reported `pages=1 size=Letter fonts=CMUSerif`.
- Observation: Adding the missing chess repo URL changed only the Warp variant artifact fingerprint; the generator regenerated that single PDF and skipped the other 11 variants.
  Evidence: `npm run build` ended with `Generated 1 resume PDFs and skipped 11 unchanged variants`.
- Observation: A global `20px` bottom-whitespace cap would fail several existing resume variants, not just `warp-agentic`.
  Evidence: `npm run verify:resume-layout -- --json` showed current bottoms like `30.793pt` (`web-dev`), `36.793pt` (`aws`), `41.218pt` (`it-support`), and `159.043pt` (`warp-agentic`).
- Observation: The Warp-only calibration logic was correct, but the automated `npm run calibrate:resume-layout -- --variant warp-agentic` loop hit intermittent Next build filesystem errors before convergence.
  Evidence: The command failed twice with transient `.next` `ENOENT` errors (`500.html` rename, then `pages-manifest.json`), so the final Warp tuning was completed with a single manual CSS adjustment plus a clean rebuild.

## Decision Log

- Decision: Treat `prompts/warp-agentic-resume-variant.md` as the approved implementation spec and execute it directly.
  Rationale: The prompt is already decision-complete about file scope, source policy, ordering, dates, validation, and one-page fit rules.
  Date/Author: 2026-03-28 / Codex
- Decision: Add a narrow regression test that checks variant wiring instead of trying to unit test rendered PDF content.
  Rationale: Resume correctness here is mostly data selection plus the existing build/layout validation pipeline; a wiring test catches duplication, ordering, and file-name regressions cheaply.
  Date/Author: 2026-03-28 / Codex
- Decision: Treat stale README and smoke-test guidance as in-scope if the new variant changes public repo behavior or exposes a concrete manual check.
  Rationale: Repo instructions make README/docs truthfulness part of the operating surface and require smoke-test updates when manual verification becomes concrete.
  Date/Author: 2026-03-28 / Codex
- Decision: Keep the Warp variant at the default `1.14` print scale and solve the one-page spill with tighter Warp-specific spacing/leading instead of a permanent lower scale floor exception.
  Rationale: After shortening bullet copy and tightening only the Warp print variables, the variant fit on one page without changing the shared calibration floor logic.
  Date/Author: 2026-03-28 / Codex
- Decision: Revert unrelated `sales` and `call-centre` calibration edits before final verification.
  Rationale: Those diffs were side effects of the calibration command, not part of the Warp feature itself, and leaving them would violate the repo’s minimal-diff rule.
  Date/Author: 2026-03-28 / Codex
- Decision: Add a repo-level instruction that resume variants cannot mix SWE/cloud and tech-support experience.
  Rationale: The user explicitly corrected the Warp variant to keep only the Red Hat SWE entry and asked for the constraint to live in the repo's AGENTS layer for future resume work.
  Date/Author: 2026-03-28 / Codex
- Decision: Treat the user-provided chess repo URL as canonical and enforce it in the Warp regression test.
  Rationale: The project already existed in the variant, but leaving it unlinked was an avoidable data-quality miss once the canonical public repo was known.
  Date/Author: 2026-03-28 / Codex
- Decision: Enforce the new bottom-whitespace ceiling only on `warp-agentic` instead of making `20px` a global gate immediately.
  Rationale: The current repo baseline allows several other variants to exceed that ceiling, so a global change would force unrelated recalibration churn. A variant-specific cap fixes the reported regression without broad collateral edits.
  Date/Author: 2026-03-28 / Codex
- Decision: Make the Warp section order data-driven with `primarySectionOrder: 'projects-first'` instead of hard-coding the variant id in the React component.
  Rationale: The user asked for a different primary section order only on Warp; keeping that preference in resume data preserves the existing order for every other variant and avoids embedding company-specific behavior in the renderer.
  Date/Author: 2026-03-28 / Codex

## Outcomes & Retrospective

Completed. The repo now contains a first-class `warp-agentic` resume variant wired through the runtime data model, PDF generation list, layout CSS, and positioning docs. The final Warp PDF is generated at `public/resume/kevin-mok-resume-warp-agentic.pdf`, stays on one US Letter page, renders projects before `Work Experience`, uses only the Red Hat SWE/cloud entry, links the chess project to `https://github.com/Kevin-Mok/ai-chess-coach-llm`, replaces the specific postal code with generic wording, and enforces a Warp-only `15pt` bottom-whitespace ceiling so large blank space can no longer pass layout verification.

## Context and Orientation

Resume variants live in `lib/resume-data.ts`. That file defines the `ResumeVariantId` TypeScript union, shared project and work-experience templates, the ordered `resumeVariants` array, a `resumeVariantById` lookup, and the `orderedResumeVariantIds` list that powers the variant dropdown. The PDF generation and validation scripts do not infer variants from TypeScript; they read the canonical JavaScript list in `scripts/lib/resume-pdf-variants.mjs`. Layout tuning for single-page US Letter output lives in `app/styles/13-resume-latex.css`, where each variant can define print-only custom properties such as `--resume-print-scale`, `--resume-print-leading`, and `--resume-print-top-offset`.

The Warp prompt requires source-backed content only. The authoritative sources outside this repo are `/home/kevin/coding/red-hat-contributions/RED-HAT-CONTRIBUTIONS.md` for Red Hat cloud/devtools evidence, `/home/kevin/linux-config/README.md` plus `/home/kevin/linux-config/docs/graphiti-mcp-codex.md` for the Linux/Codex/Graphiti workflow project, `/home/kevin/Documents/chess/README.md` plus `/home/kevin/Documents/chess/docs/LOCAL_AI_SETUP.md` for the local-first chess analysis project, and `/home/kevin/coding/openclaw/README.md` plus `/home/kevin/coding/openclaw/docs/openclaw-architecture.md` for the agentic job-ops project. The prompt also locks all three project dates to `Mar 2026 — Present`, requires `web-dev` to remain the default variant, and requires exactly one new variant with id `warp-agentic`, label `Warp / Agentic Devtools`, and file name `kevin-mok-resume-warp-agentic.pdf`.

Several docs already describe the resume system. `docs/resume/RESUME_VARIANT_POSITIONING.md` is the minimum required doc update because it enumerates the canonical active variant count and positioning matrix. `docs/resume/README_RESUME.md`, `docs/resume/RESUME_DOCS_INDEX.md`, and the root `README.md` also contain variant-count or prompt workflow language that can become stale. If a manual verification step becomes explicit during this work, `docs/smoke-tests.md` should capture it in `Action` / `Expected` form.

## Plan of Work

First, add a small test file under `scripts/lib/` that imports `lib/resume-data.ts` through Node’s experimental type stripping and asserts the future `warp-agentic` variant contract: the ID exists in `ResumeVariantId`-backed runtime data, `web-dev` remains the default variant, `warp-agentic` appears in `orderedResumeVariantIds` without moving `web-dev` out of the leading slot, the PDF file name is correct, the variant includes exactly the three required projects, and the selected Red Hat experience does not mix support and cloud entries. Run this test before any implementation so it fails for the expected reason: the variant does not exist yet.

Next, extend `lib/resume-data.ts` surgically. Add `warp-agentic` to the `ResumeVariantId` union, create the minimum new shared project templates needed for the Warp story, and select only source-backed bullets from the external evidence. Keep the new variant recruiter-readable and one-page friendly by using three projects with five or six bullets total, a short summary, up to four skills lines, and two Red Hat entries totaling about five bullets. Update the Red Hat mapping record and `orderedResumeVariantIds` so runtime assertions still pass and the default ordering remains `web-dev` first. Then add the matching `{ id, fileName }` entry to `scripts/lib/resume-pdf-variants.mjs`.

After the data wiring exists, update docs that are now stale. At minimum, revise `docs/resume/RESUME_VARIANT_POSITIONING.md` to count `12` active variants and describe the Warp positioning. If `docs/resume/README_RESUME.md`, `docs/resume/RESUME_DOCS_INDEX.md`, `README.md`, or `docs/smoke-tests.md` now make false statements about variant counts or omit the obvious manual verification path, patch only the affected sections without unrelated doc cleanup.

Finally, verify end-to-end. Run the new targeted test, then the full resume gate in the repo-prescribed order: `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs`. If the new variant fails one-page constraints, first trim bullet density or skill density per the prompt; only then add or tune `.resume-variant-warp-agentic` print controls in `app/styles/13-resume-latex.css`. Once the automated commands pass, confirm `/resume?variant=warp-agentic` renders and that `public/resume/kevin-mok-resume-warp-agentic.pdf` exists and remains one page.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Add the test file:
   `scripts/lib/resume-variant-warp-agentic.test.mjs`
2. Run the red test:
   `node --experimental-strip-types --test scripts/lib/resume-variant-warp-agentic.test.mjs`
   Expected before implementation: the test fails because `resumeVariantById['warp-agentic']` is missing or ordering/file-name assertions fail.
3. Update:
   - `lib/resume-data.ts`
   - `scripts/lib/resume-pdf-variants.mjs`
   - `docs/resume/RESUME_VARIANT_POSITIONING.md`
   - `app/styles/13-resume-latex.css` only if layout tuning is still required after content trimming
   - `docs/resume/README_RESUME.md`, `docs/resume/RESUME_DOCS_INDEX.md`, `README.md`, and `docs/smoke-tests.md` only where the new variant makes existing statements false or incomplete
4. Re-run the targeted test:
   `node --experimental-strip-types --test scripts/lib/resume-variant-warp-agentic.test.mjs`
5. Run the full resume gate:
   - `npm run build`
   - `npm run calibrate:resume-layout`
   - `npm run verify:resume-layout`
   - `npm run validate-resume-pdfs`
6. Perform manual checks:
   - open `/resume?variant=warp-agentic`
   - confirm `public/resume/kevin-mok-resume-warp-agentic.pdf` exists
   - confirm the generated PDF is exactly one page

## Validation and Acceptance

Acceptance is met when all of the following are true:

1. `node --experimental-strip-types --test scripts/lib/resume-variant-warp-agentic.test.mjs` passes and proves the new variant is wired into the runtime data, ordering, and required-project selection without changing the default `web-dev` variant.
2. `npm run build` completes and generates `public/resume/kevin-mok-resume-warp-agentic.pdf`.
3. `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs` all exit successfully with the new PDF in scope.
4. `/resume?variant=warp-agentic` renders the new variant in the browser and the generated PDF remains one US Letter page.
5. `docs/resume/RESUME_VARIANT_POSITIONING.md` and any other touched docs now describe the updated active variant count and Warp positioning truthfully.

## Idempotence and Recovery

This work is additive and safe to repeat. The targeted test can be re-run at any point to confirm the wiring contract. If the PDF layout fails, prefer reducing bullet density or skill density in `lib/resume-data.ts` before touching CSS; if CSS tuning is required, only change the `.resume-variant-warp-agentic` print variables so other variants stay stable. If a doc count proves inconsistent after edits, search for `resume variants`, `10 resume variants`, `11`, `12`, and `warp-agentic` in the touched docs and correct only the stale statements.

## Artifacts and Notes

Expected red-test command:

    node --experimental-strip-types --test scripts/lib/resume-variant-warp-agentic.test.mjs

Expected validation command sequence:

    npm run build
    npm run calibrate:resume-layout
    npm run verify:resume-layout
    npm run validate-resume-pdfs

Warp-specific content constraints from the spec that must remain true:

- Exactly one new variant: `warp-agentic`
- Label: `Warp / Agentic Devtools`
- File name: `kevin-mok-resume-warp-agentic.pdf`
- Required projects: `linux-config`, `Documents/chess`, and `openclaw`
- Fixed project dates: `Mar 2026 — Present`
- Default variant remains `web-dev`

## Interfaces and Dependencies

The runtime interface added by this task is a new `ResumeVariantId` member named `warp-agentic` plus a corresponding `ResumeVariantDefinition` object inside `resumeVariants`. `scripts/lib/resume-pdf-variants.mjs` must expose a matching `{ id: 'warp-agentic', fileName: 'kevin-mok-resume-warp-agentic.pdf' }` object so generation and validation scripts include the new PDF. If layout tuning is required, `app/styles/13-resume-latex.css` must define `.resume-variant-warp-agentic` with only the existing print custom properties. The new test file should import `resumeVariantById`, `orderedResumeVariantIds`, and `DEFAULT_RESUME_VARIANT_ID` from `lib/resume-data.ts` and assert the contract described above.

---

Revision notes:
- (2026-03-28) Initial ExecPlan created for implementing the `warp-agentic` resume variant from the checked-in prompt spec.
