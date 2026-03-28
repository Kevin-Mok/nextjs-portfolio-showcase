# Create Warp Agentic Resume Variant Prompt

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Add a reusable prompt artifact that tells ChatGPT how to create a first-class Warp-specific resume variant inside `portfolio-site`. After this change, a future AI-assisted resume update can add `warp-agentic` in a way that is consistent with the existing resume/PDF pipeline, uses only source-backed evidence from Red Hat plus the three requested projects, and preserves the repo’s one-page validation workflow.

## Progress

- [x] (2026-03-28 16:00Z) Reviewed the approved plan, existing resume prompt docs, and resume documentation indexes.
- [x] (2026-03-28 16:08Z) Added `prompts/warp-agentic-resume-variant.md` with a copy/paste prompt, attachment checklist, source rules, fixed variant naming, and validation commands.
- [x] (2026-03-28 16:08Z) Updated resume documentation indexes so they acknowledge prompt workflows in both `docs/prompts/` and the new root `prompts/` location and link to the Warp prompt.
- [x] (2026-03-28 16:10Z) Verified the edited files via `sed`, `rg`, and `git diff`.

## Surprises & Discoveries

- Observation: Repo-local instructions for prompt requests now prefer root-level `prompts/` artifacts, but the existing resume docs still described `docs/prompts/` as the only prompt location.
  Evidence: `docs/resume/README_RESUME.md` and `docs/resume/RESUME_DOCS_INDEX.md` both explicitly said resume prompt workflows live in `docs/prompts/`.
- Observation: The Warp-tailored project dates needed explicit guardrails because `linux-config` has a much older repo history than its current agentic-engineering positioning.
  Evidence: `linux-config` git history begins in 2017, but the relevant four-Codex / Graphiti / skills framing is documented in March 2026 README and plan updates.

## Decision Log

- Decision: Implement this as a new prompt doc in root `prompts/` instead of `docs/prompts/`.
  Rationale: Current repo instructions for prompt requests explicitly require writing prompts to `prompts/`.
  Date/Author: 2026-03-28 / Codex
- Decision: Update the resume documentation indexes in the same change.
  Rationale: Without those edits, the docs would incorrectly imply that all resume prompt workflows live only in `docs/prompts/`, making the new artifact harder to find.
  Date/Author: 2026-03-28 / Codex
- Decision: Keep the Warp prompt focused on adding a first-class `warp-agentic` variant instead of generating a one-off draft.
  Rationale: The approved plan and current resume system both favor reproducible, checked-in variants with PDF generation and validation support.
  Date/Author: 2026-03-28 / Codex

## Outcomes & Retrospective

Completed. The repo now has a reusable Warp-specific prompt artifact under `prompts/` plus matching resume documentation links that point future updates to the correct location. No runtime code paths or generated resume artifacts were changed in this task.

## Context and Orientation

Resume content in this repository is data-driven. `lib/resume-data.ts` stores the variant definitions, `scripts/lib/resume-pdf-variants.mjs` controls which PDFs generation/validation scripts expect, and `app/styles/13-resume-latex.css` exposes the per-variant print controls used when a resume needs layout tuning. Resume guidance and prompt workflows are indexed from `docs/resume/README_RESUME.md` and `docs/resume/RESUME_DOCS_INDEX.md`. Existing prompt workflows mostly live in `docs/prompts/`, but current repo instructions require new prompt-request artifacts to be created in root `prompts/`.

## Plan of Work

Create a new Markdown prompt document at `prompts/warp-agentic-resume-variant.md` using the repo’s established prompt shape: title, attachment checklist, copy/paste prompt block, and validation notes. Make the prompt decision-complete by fixing the new variant ID, label, PDF file name, edit scope, attached source files, project requirements, Red Hat evidence priority, date defaults, one-page fit policy, and validation commands.

Update `docs/resume/README_RESUME.md` and `docs/resume/RESUME_DOCS_INDEX.md` so they mention both `docs/prompts/` and `prompts/` where appropriate and link to the new Warp prompt in their AI prompt workflow sections. Keep the changes narrow: do not reorganize unrelated resume docs or rewrite older prompt guidance.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Create the root prompt directory if it does not exist:
   `mkdir -p prompts`
2. Add `prompts/warp-agentic-resume-variant.md`.
3. Update:
   - `docs/resume/README_RESUME.md`
   - `docs/resume/RESUME_DOCS_INDEX.md`
4. Verify with:
   - `sed -n '1,260p' prompts/warp-agentic-resume-variant.md`
   - `rg -n "warp-agentic|prompts/" docs/resume/README_RESUME.md docs/resume/RESUME_DOCS_INDEX.md prompts/warp-agentic-resume-variant.md`
   - `git diff -- prompts/warp-agentic-resume-variant.md docs/resume/README_RESUME.md docs/resume/RESUME_DOCS_INDEX.md plans/warp-agentic-resume-variant-prompt.md`

## Validation and Acceptance

Acceptance criteria:

1. `prompts/warp-agentic-resume-variant.md` exists and uses the repo’s standard prompt-doc structure.
2. The prompt fixes the new variant name as `warp-agentic` / `Warp / Agentic Devtools` / `kevin-mok-resume-warp-agentic.pdf`.
3. The prompt requires the exact three requested projects and the Red Hat contributions source.
4. The resume docs link to the new prompt and no longer imply that all prompt workflows live only in `docs/prompts/`.
5. Verification commands confirm the edited files contain the expected new references.

## Idempotence and Recovery

This change is documentation-only and safe to rerun. Reapplying the same patches should not alter runtime behavior. If any wording lands in the wrong doc section, update the Markdown in place and rerun the readback commands.

## Artifacts and Notes

Key decisions encoded in the prompt:

- Add a first-class `warp-agentic` variant instead of mutating `aws-web-dev` or another existing variant.
- Use `Mar 2026 — Present` for all three project dates.
- Treat `RED-HAT-CONTRIBUTIONS.md` as the primary Red Hat cloud/devtools evidence source.
- Require the full resume validation sequence (`build`, `calibrate`, `verify`, `validate`).

## Interfaces and Dependencies

No code interfaces or dependencies changed. This task only adds one prompt artifact and updates the resume documentation indexes that point users toward prompt workflows.

---

Revision notes:
- (2026-03-28) Initial ExecPlan created and completed for the Warp resume prompt artifact and linked resume docs updates.
