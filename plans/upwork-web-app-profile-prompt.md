# Create Upwork Web/App Profile Prompt Document

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Create a reusable prompt document that generates high-conversion Upwork profile copy for a web/app developer profile. After this change, the user can paste one prompt into ChatGPT and get title, intro, employment history, and education copy that stays within Upwork-style character limits and uses real project/work evidence with direct links.

## Progress

- [x] (2026-03-05 22:03Z) Gathered repository context, prompt-doc patterns, and resume source-of-truth data from `lib/resume-data.ts`.
- [x] (2026-03-05 22:05Z) Extracted UofT transcript facts from `/home/kevin/school/official-transcript.pdf` (degree status, course list, GPA/high-distinction context).
- [x] (2026-03-05 22:09Z) Drafted `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` with strict limits, required links, canonical source rules, and sample outputs.
- [x] (2026-03-05 22:10Z) Validated required sections, links, and constraints via `rg` checks.
- [x] (2026-03-05 22:11Z) Verified sample-output character counts for title/intro/employment fields remain under required limits.
- [x] (2026-03-05 22:12Z) Finalized ExecPlan with outcomes and command evidence.

## Surprises & Discoveries

- Observation: `lib/resume-data.ts` already stores multiple education variants including `3.84 GPA (CS). Graduated with High Distinction.`
  Evidence: `educationGeneral` and `educationSupport` entries in `lib/resume-data.ts`.
- Observation: Transcript PDF text extraction is possible with `pdftotext -layout` despite copy restrictions, so course data can be sourced without guessing.
  Evidence: `pdftotext -layout /home/kevin/school/official-transcript.pdf -` returned full course rows for CSC courses.

## Decision Log

- Decision: Create a dedicated prompt doc under `docs/prompts/` instead of editing resume data.
  Rationale: User requested a reusable "prompt doc" for Upwork copy generation, not runtime resume/UI changes.
  Date/Author: 2026-03-05 / Codex
- Decision: Use explicit hard self-check rules that require character counts in the model output.
  Rationale: The user provided strict max lengths for title, intro, and employment fields; explicit checks reduce over-limit outputs.
  Date/Author: 2026-03-05 / Codex

## Outcomes & Retrospective

Completed. Added one reusable prompt document at `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` that generates Upwork-ready profile copy with hard caps for title/intro/employment fields, explicit live+repo link requirements for Portfolio/Nomar/Kanban, additional GitHub evidence links, and transcript-backed UofT coursework guidance. Included copy-ready sample outputs to accelerate immediate use and embedded character-count/source-integrity self-check rules to reduce invalid or invented responses.

## Context and Orientation

This repository stores reusable AI prompt playbooks in `docs/prompts/`. Existing files follow a consistent structure: title, usage note, attachment checklist, copy/paste prompt block, and validation checklist. Candidate source facts for work and project claims live in `lib/resume-data.ts`; this includes live project URLs, GitHub links, Red Hat experience, freelance work, and education lines. The transcript PDF at `/home/kevin/school/official-transcript.pdf` is required for course-level specificity.

## Plan of Work

Add one prompt file at `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` that enforces Upwork-oriented constraints and outputs. The prompt will include strict character limits, required project links (especially web projects with live demos), two employment sections with per-field caps, and an education block that highlights UofT CS coursework plus `3.84 GPA` and `High Distinction`. Include copy-ready sample outputs so the user can immediately use the results even before re-running the prompt.

Then verify the file contains all required limits, links, and section headers using targeted `rg` checks.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Create `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` with:
   - Hard constraints
   - Source file/link inventory
   - Output format for title, intro, projects, employment, and education
   - Self-check requirements
   - Optional refinement prompt
2. Run:
   - `rg -n "70|5000|1000|High Distinction|3.84 GPA" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
   - `rg -n "github.com/Kevin-Mok|kevin-mok.com|ntcharts.com|kanban-calendar-lake.vercel.app|stb-mkt|spotify-lib-vis|rarity-surf|gobcog|gist.github.com/Kevin-Mok" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
   - `rg -n "Copy/Paste Prompt|Validation Checklist|Optional Refinement Prompt|Sample Outputs" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
3. Update this ExecPlan `Progress` and `Outcomes & Retrospective`.

## Validation and Acceptance

Acceptance criteria:

1. `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` exists.
2. Prompt includes strict hard caps:
   - Title `<= 70` chars
   - Intro `<= 5000` chars
   - Employment job title `<= 70` chars each
   - Employment description `<= 1000` chars each
3. Prompt explicitly includes core live web projects with repo links:
   - Portfolio, Nomar, Kanban
4. Prompt includes other strong dev evidence links:
   - STB, Spotify Visualized, Rarity Surf, Gobcog, Red Hat contributions gist
5. Prompt explicitly requires UofT CS-related courses and includes `3.84 GPA` + `High Distinction`.

## Idempotence and Recovery

This task is documentation-only and additive. Re-running the creation/validation steps is safe and does not alter runtime behavior.

## Artifacts and Notes

Command evidence captured during validation:

- Section/constraint presence:
  - `rg -n "70|5000|1000|High Distinction|3.84 GPA" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
- Link coverage:
  - `rg -n "github.com/Kevin-Mok|kevin-mok.com|ntcharts.com|kanban-calendar-lake.vercel.app|stb-mkt|spotify-lib-vis|rarity-surf|gobcog|gist.github.com/Kevin-Mok" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
- Required prompt structure:
  - `rg -n "Copy/Paste Prompt|Validation Checklist|Optional Refinement Prompt|Sample Outputs" docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md`
- Sample length verification (`wc -m`):
  - Title options: `57-62` chars
  - Employment job titles: `54-55` chars
  - Sample intro: `1232` chars (`<= 5000`)
  - Red Hat description: `501` chars (`<= 1000`)
  - Freelance description: `548` chars (`<= 1000`)

## Interfaces and Dependencies

No runtime interfaces, APIs, schemas, or dependencies change. This task only adds planning/prompt markdown files.

---

Revision notes:
- (2026-03-05) Initial ExecPlan created for the Upwork prompt-document task.
- (2026-03-05) Updated with completion status, validation evidence, and final retrospective after creating and verifying the prompt doc.
