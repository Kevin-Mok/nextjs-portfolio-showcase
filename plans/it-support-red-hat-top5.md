# Align IT Support Red Hat Bullets To SQL Order

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Update the `it-support` resume variant so its Red Hat support section uses the same leading five bullets already chosen for `it-support-sql`, in the same order. After this change, the standard IT support PDF will present the stronger Red Hat support narrative without changing the SQL-focused variant itself.

## Progress

- [x] (2026-03-09 14:18Z) Read `AGENTS.repo.md`, `.agent/PLANS.md`, and the relevant resume docs and source data in `lib/resume-data.ts`.
- [x] (2026-03-09 14:19Z) Confirmed `it-support-sql` already contains the target Red Hat bullet ordering and `it-support` currently uses a different, shorter subset.
- [x] (2026-03-09 14:19Z) Patched `lib/resume-data.ts` so `it-support` now uses the first five Red Hat support bullets from `it-support-sql` in the same order.
- [x] (2026-03-09 14:24Z) Ran `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs`; all commands passed.

## Surprises & Discoveries

- Observation: The repo already has an `it-support-sql` variant with the requested Red Hat sequence, so the safest implementation is to reuse that selection logic in `it-support` rather than invent a new ranking.
  Evidence: `lib/resume-data.ts` defines `it-support-sql` with Red Hat support bullets `[1, 4, 3, 2, 0, 5]`, while `it-support` still uses `[0, 2, 3, 4]`.
- Observation: Adding the fifth Red Hat bullet caused the first calibration pass to overflow `it-support` onto page 2.
  Evidence: Initial calibration reported `FAIL kevin-mok-resume-it-support.pdf pages=2 ... reason=page-overflow`, after which the calibrator reduced `.resume-variant-it-support` print scale, top offset, and leading until the PDF returned to one page.
- Observation: Direct browser-style route verification was blocked by unrelated local services on ports `3000` and `3001`, so final rendered-order proof came from the generated PDF text instead.
  Evidence: `curl http://localhost:3000/resume?variant=it-support` returned an unrelated placeholder frontend, `curl http://localhost:3001/resume?variant=it-support` returned HTTP 500, and `pdftotext public/resume/kevin-mok-resume-it-support.pdf -` showed the five requested bullets in order.

## Decision Log

- Decision: Only change the `it-support` variant and leave `it-support-sql` unchanged.
  Rationale: The user asked to make `it-support` match the top five Red Hat points from the SQL support variant in the same order, not to rework the SQL variant itself.
  Date/Author: 2026-03-09 / Codex

## Outcomes & Retrospective

Completed. `it-support` now presents the same leading five Red Hat support bullets as `it-support-sql`, in the same order. Validation also required an updated `.resume-variant-it-support` print calibration in `app/styles/13-resume-latex.css`; after that adjustment, build, calibration, layout verification, and PDF validation all passed.

## Context and Orientation

Resume content is managed in `lib/resume-data.ts`. Each entry inside `resumeVariants` defines one downloadable PDF variant. The `it-support` and `it-support-sql` variants both reuse `redHatSupportExperience`, but each variant selects a different subset and order of bullets from that shared source. Generated PDFs live in `public/resume/`, and resume copy changes must be validated with the build, calibration, layout verification, and PDF validation commands listed in `AGENTS.repo.md`.

## Plan of Work

Edit the `it-support` variant in `lib/resume-data.ts` so its `experience[0].bullets` array matches the first five Red Hat support bullets already used by `it-support-sql`, preserving that exact order. Then run the required resume validation flow and inspect whether any generated PDFs or layout calibration values changed as a result of the new bullet count and ordering.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Update `lib/resume-data.ts` in the `it-support` variant.
2. Run `npm run build`.
3. Run `npm run calibrate:resume-layout`.
4. Run `npm run verify:resume-layout`.
5. Run `npm run validate-resume-pdfs`.
6. Review `git diff -- lib/resume-data.ts app/styles/13-resume-latex.css public/resume`.

## Validation and Acceptance

Acceptance criteria:

1. `it-support` contains five Red Hat support bullets.
2. Those five bullets appear in the same order as the first five bullets in `it-support-sql`.
3. Resume validation commands complete successfully, or any failure is captured with the exact command and reason.
4. No unrelated runtime behavior changes are introduced.

## Idempotence and Recovery

This change is safe to reapply because it only reorders and adds existing bullet references in `lib/resume-data.ts`. If validation changes layout unexpectedly, rerun calibration and keep any resulting CSS or PDF updates in the same task so source data and artifacts stay aligned.

## Artifacts and Notes

Key source anchors:

- `lib/resume-data.ts` `it-support` variant block
- `lib/resume-data.ts` `it-support-sql` variant block
- `lib/resume-data.ts` `redHatSupportExperience.bullets`
- `public/resume/kevin-mok-resume-it-support.pdf` text extraction confirming rendered bullet order

## Interfaces and Dependencies

No new interfaces or dependencies are required. This task only changes resume variant data and potentially regenerated PDF artifacts produced by existing npm scripts.

---

Revision notes:
- (2026-03-09) Initial ExecPlan created after reading repo instructions and resume source data.
- (2026-03-09) Updated after implementation and validation to capture the required `it-support` calibration change and passing resume gate results.
- (2026-03-09) Added final artifact-verification note documenting PDF text extraction as the rendered-order proof because local ports were occupied by unrelated services.
