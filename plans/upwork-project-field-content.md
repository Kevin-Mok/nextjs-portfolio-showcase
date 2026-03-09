# Populate Upwork Project Field Content in Profile Doc

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md`.

## Purpose / Big Picture

Populate each project block in `docs/upwork-web-app-profile.md` with Upwork form-ready content so the user can copy each section directly into the Upwork project editor fields shown in the UI (Project title, Your role, Project description, Add content, Skills and deliverables). After this change, each portfolio project has complete, source-backed values and no manual drafting is needed before submission.

## Progress

- [x] (2026-03-05 22:34Z) Reviewed repository instructions (`AGENTS.md`, `AGENTS.repo.md`) and existing profile content.
- [x] (2026-03-05 22:35Z) Confirmed target project sections in `docs/upwork-web-app-profile.md` and gathered source-backed facts from `lib/resume-data.ts`.
- [x] (2026-03-05 22:37Z) Replaced all project `Tech/Links` blocks with Upwork field blocks for 8 projects.
- [x] (2026-03-05 22:39Z) Validated field coverage, project count, and max-length constraints for title/role/description.

## Surprises & Discoveries

- Observation: The existing project repo links in `docs/upwork-web-app-profile.md` differ from links in `docs/prompts/UPWORK_WEB_APP_PROFILE_PROMPT.md` for Nomar, Kanban, and Spotify projects.
  Evidence: Side-by-side inspection of both files shows different repository URLs for those three projects.
- Observation: The profile doc included source-backed metrics and claims suitable for concise Upwork project descriptions without needing external files.
  Evidence: `docs/upwork-web-app-profile.md` intro/employment sections already contain project-level outcomes and technologies.

## Decision Log

- Decision: Keep existing project URLs in `docs/upwork-web-app-profile.md` as canonical for this task.
  Rationale: The user requested filling form fields for each existing project entry, not reconciling link inventories across docs.
  Date/Author: 2026-03-05 / Codex
- Decision: Represent `Add content` as both concrete links and upload suggestions.
  Rationale: The user explicitly requested both URLs and suggestions for the Upwork Add Content field.
  Date/Author: 2026-03-05 / Codex
- Decision: Limit edits to project sections only and leave intro/employment/education untouched.
  Rationale: Minimizes diff and matches requested scope.
  Date/Author: 2026-03-05 / Codex

## Outcomes & Retrospective

Completed. All eight projects now include copy-ready field values aligned to the Upwork form UI: title, role, description, add-content inputs, and five skills/deliverables. The result is operationally ready for direct paste into Upwork project forms while preserving existing non-project profile content and links.

## Context and Orientation

The target file is `docs/upwork-web-app-profile.md`. It contains profile-wide copy plus project subsections marked by `###` headings. Before this change, each project only had `Tech` and `Links` lines. The required output shape mirrors Upwork's project form fields shown in the provided screenshots, including strict max lengths for title (70), role (100), and description (600), plus up to five skills.

## Plan of Work

Replace each project section's `Tech/Links` block with a field-first block that starts with `Project title`, then `Your role`, `Project description`, `Add content`, and `Skills and deliverables`. Use concise, source-backed language and preserve existing project names and links. Under `Add content`, include both direct URLs and practical upload suggestions (screenshots, clips, diagrams) to match user preference.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`:

1. Edit `docs/upwork-web-app-profile.md` and convert all 8 project sections to the Upwork field format.
2. Run:
   - `rg -n "^### " docs/upwork-web-app-profile.md`
   - `rg -c "^Project title:" docs/upwork-web-app-profile.md`
   - `rg -c "^Your role:" docs/upwork-web-app-profile.md`
   - `rg -c "^Project description:" docs/upwork-web-app-profile.md`
   - `rg -c "^Add content:" docs/upwork-web-app-profile.md`
   - `rg -c "^Skills and deliverables:" docs/upwork-web-app-profile.md`
3. Run length checks for field limits using a small shell parser that counts characters for every title/role/description line.

## Validation and Acceptance

Acceptance criteria:

1. There are still exactly 8 project headers (`### ...`).
2. Each project has all 5 fields in the required order.
3. Every `Project title` value is `<= 70` characters.
4. Every `Your role` value is `<= 100` characters.
5. Every `Project description` value is `<= 600` characters.
6. `Skills and deliverables` contains exactly five items per project.
7. Non-project sections remain unchanged.

## Idempotence and Recovery

This task is markdown-only and idempotent. Reapplying edits and rerunning checks is safe. If any field exceeds limits, reduce wording in that specific line and re-run the length checker until all limits pass.

## Artifacts and Notes

Validation commands used:

- `rg -n "^### " docs/upwork-web-app-profile.md`
- `rg -c "^Project title:" docs/upwork-web-app-profile.md`
- `rg -c "^Your role:" docs/upwork-web-app-profile.md`
- `rg -c "^Project description:" docs/upwork-web-app-profile.md`
- `rg -c "^Add content:" docs/upwork-web-app-profile.md`
- `rg -c "^Skills and deliverables:" docs/upwork-web-app-profile.md`
- `awk` length checks for title/role/description

## Interfaces and Dependencies

No runtime interfaces or dependencies changed. This is a documentation/content update only.

---

Revision notes:
- (2026-03-05) Initial ExecPlan created and completed for project field population in `docs/upwork-web-app-profile.md`.
