# Create TrackRev Resume Prompt Document

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Create a reusable prompt document that generates a Track Revenue (Technical Support Engineer L1) targeted resume draft using `lib/resume-data.ts` as the source of truth and `/home/kevin/school/job-hunt/job-postings/track-rev.md` as the role target. The prompt must enforce the user-specified Red Hat bullet order, force a PostgreSQL + SQL-detailed project section, and preserve content density consistent with existing support resumes.

## Progress

- [x] (2026-03-05 16:37Z) Read repository instructions, job posting content, and `lib/resume-data.ts` support/project data.
- [x] (2026-03-05 16:39Z) Drafted `docs/prompts/TRACK_REV_RESUME_PROMPT.md` with strict bullet ordering, PostgreSQL/SQL project emphasis, and support-resume density targets.
- [x] (2026-03-05 16:40Z) Verified markdown content with `sed` + `rg` checks for exact required bullets and rules.

## Surprises & Discoveries

- Observation: The requested five bullets all exist in `redHatSupportExperience.bullets` but in a different source order than current variants.
  Evidence: `lib/resume-data.ts` lines 332-336 contain the exact requested strings with a different ordering.

## Decision Log

- Decision: Implement this as a new prompt markdown document rather than editing resume variants directly.
  Rationale: User explicitly asked for a "prompt doc for a new resume" and provided a target posting path plus ordering constraints.
  Date/Author: 2026-03-05 / Codex

## Outcomes & Retrospective

Completed. Added one reusable prompt doc that can generate a Track Revenue-targeted resume draft while enforcing the exact five-bullet sequence requested by the user, prioritizing PostgreSQL/SQL project detail, and preserving the same overall content density as existing support resumes. No runtime code paths were changed.

## Context and Orientation

Prompt docs for this repository live in `docs/prompts/` and follow a standard structure: title, attachment checklist, copy/paste prompt block, and validation notes. Resume source data lives in `lib/resume-data.ts`; the most relevant data for this task is in `redHatSupportExperience`, `digitalMarketplaceExperience`, `spotifyVisualizedProject`, and support variant section structures (`it-support`, `it-support-aws`, `call-centre`).

## Plan of Work

Create one new prompt doc at `docs/prompts/TRACK_REV_RESUME_PROMPT.md` that instructs ChatGPT to:

1. Use only facts already present in `lib/resume-data.ts`.
2. Tailor wording to the Track Revenue posting.
3. Preserve the exact five bullet strings in the exact order supplied by the user.
4. Use the strongest PostgreSQL project and emphasize concrete SQL usage from existing project bullets.
5. Keep section and bullet counts aligned with current support resume density.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Create `docs/prompts/TRACK_REV_RESUME_PROMPT.md`.
2. Run a quick markdown sanity read with:
   `sed -n '1,260p' docs/prompts/TRACK_REV_RESUME_PROMPT.md`
3. Confirm all requested constraints appear verbatim or as strict rules.

## Validation and Acceptance

Acceptance criteria:

1. New prompt file exists at `docs/prompts/TRACK_REV_RESUME_PROMPT.md`.
2. Prompt references both required source paths:
   - `/home/kevin/school/job-hunt/job-postings/track-rev.md`
   - `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
3. Prompt includes the five required bullets in the user-provided order.
4. Prompt explicitly requires a PostgreSQL project with SQL-detail emphasis.
5. Prompt explicitly defines resume content density targets matching existing support variants.

## Idempotence and Recovery

Edits are documentation-only and additive. If content is off-target, update the markdown file in place without side effects.

## Artifacts and Notes

Key source anchors used:

- `lib/resume-data.ts` lines 332-336 (required ordered support bullets)
- `lib/resume-data.ts` lines 191-200 (PostgreSQL project SQL/query evidence)
- `lib/resume-data.ts` lines 823-922 (support variant section and density patterns)

## Interfaces and Dependencies

No runtime interfaces or third-party dependencies are changed. This task only adds a prompt documentation artifact in `docs/prompts/`.

---

Revision notes:
- (2026-03-05) Initial ExecPlan created to guide implementation and verification for this task.
- (2026-03-05) Updated progress and retrospective after completing the prompt doc and validation pass.
