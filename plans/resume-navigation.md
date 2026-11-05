# Route Resume navigation to /resume

Make the desktop Resume workspace and Contents entry open the existing standalone résumé page. Follow `.agent/PLANS.md`; preserve existing résumé content and unrelated working-tree changes.

## Purpose / Big Picture

Clicking Resume should change the current URL to `/resume`, where the existing full-page résumé and its controls render. About continues to use the homepage tiles. The mobile résumé CTA already links to `/resume`.

## Progress

- [x] Inspect both desktop handlers, their callers and the existing route.
- [x] Observe Resume clicks remaining at `/` before implementation; both browser assertions failed with expected `/resume`, actual `/`.
- [x] Add the existing router navigation to both Resume handlers and update documentation.
- [x] Verify both clicks, browser Back, direct route access, type checking and focused lint.

## Context and Orientation

`components/tiles/NavigationTile.tsx` handles the Contents Resume entry in `handleSelect`. `components/layout/LayoutManager.tsx` handles the top workspace button in `handlePolybarNavigate`. Both already use Next.js `router.push` for other standalone pages. `app/resume/page.tsx` already implements the requested page. `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx` already links there on mobile.

## Plan of Work

Observe the current behavior in Chrome on the running development server. Add an early Resume branch calling `router.push('/resume')` to each existing handler. Update the README's feature description and the existing smoke checklist without replacing prior edits. No résumé content, PDF, CSS, dependency or configuration changes are needed.

## Milestone and Concrete Steps

From `/home/kevin/coding/portfolio-site`, use `chrome-devtools-axi` to open the homepage at desktop width, click each Resume control independently and inspect `location.pathname`. Before implementation it remains `/`; afterward it must be `/resume`. Browser Back must return to `/`, where About still selects homepage content. Open `/resume` directly and at mobile width to confirm the page remains available. Delegate `npm run typecheck` and focused ESLint on the two modified components to the tests agent.

## Validation and Acceptance

Both desktop Resume controls must reach `/resume` and display the standalone page without the homepage tile frame. Returning with browser Back must work. Existing mobile CTA behavior must remain intact. Record the exact observed results below. No commit or deployment was requested.

## Surprises & Discoveries

No frontend test framework is installed; use the actual browser as the executable before/after reproducer. The working tree already contains unrelated résumé data, layout and documentation edits, which must be preserved. Default-sandbox local networking is restricted; approved Chrome commands can reach the existing session.

## Decision Log

Use the existing routing pattern in the two UI handlers rather than changing shared FocusContext semantics, which could affect unrelated tile navigation. Keep this task in the current checkout to verify against the user's current résumé work.

## Idempotence and Recovery

Repeat the read-only UI checks freely. To roll back, remove only the two new Resume route branches and this task's documentation additions; preserve all prior dirty hunks. No data migration or persisted navigation preference is introduced.

## Interfaces and Dependencies

Keep both handler signatures and all component props unchanged. Reuse `useRouter` from `next/navigation`, already imported by both components. Add no dependencies or test framework.

## Outcomes & Retrospective

Both actual desktop controls were checked before and after the change in Chrome at `http://localhost:3001`: before, assertions reported expected `/resume`, actual `/`; after, both reached `/resume`, displayed the `Kevin Mok` heading and had no homepage tile navigation. Browser Back returned to `/`, and About retained the homepage heading. At 390px width, the existing mobile Open Resume link also reached `/resume`. Directly reopening `/resume` retained the selector and `/resume/kevin-mok-resume-applied-ai.pdf` download link with no horizontal overflow.

`npm run typecheck` exited 0. `ESLINT_USE_FLAT_CONFIG=false node_modules/.bin/eslint components/tiles/NavigationTile.tsx components/layout/LayoutManager.tsx` exited 0 with no lint diagnostics and the existing ESLintRC deprecation warning. The initial direct ESLint invocation could not discover the legacy config; no configuration change was needed. No npm test command exists. Build, PDF generation and calibration were intentionally skipped: this change only affects homepage navigation and those commands would rebuild artifacts for unrelated pending résumé edits. No commit, push or deployment performed. Suggested commit: `fix: route resume navigation to standalone page`.

Independent evidence-reviewer source review found no concrete defects: both UI callers reach the new route branches, About's fallback is unchanged, mobile still links to `/resume`, and the new documentation matches. The reviewer did not rerun browser or automated checks; those results are the parent browser observations and tests-agent output described above. The tooling postmortem was registered in the canonical ledger, and its targeted coverage check exited 0 with no errors, changed hashes or unregistered aliases.

## Cursor Handoff

Verify that the homepage top Resume button and Contents Resume entry each navigate to `/resume`; check Back, About and the existing mobile CTA. Preserve unrelated résumé edits. Use the checks and file scope above; avoid PDF regeneration for this routing-only change.

Plan created before implementation from the user's explicit `/resume` navigation request.

Updated after implementation with executable browser RED/GREEN evidence, mobile and Back checks, and automated verification results.

## Session Delivery Milestone

The user later invoked `commit-session`. This navigation change will ship with the follow-up PDF-width layout and matching documentation in `fix: open resume links on a Letter-width page`. See `plans/resume-page-width.md` for attribution, isolated-candidate gates and delivery status. Retain all unrelated dirty work. The résumé quick-access documentation now describes opening `/resume` rather than displaying a homepage tile.

The combined candidate passed production build, all 25 PDF generation/calibration/layout/validation checks, type checking and focused lint in an isolated worktree. Source review found no implementation defects. README coverage was repaired and privacy scanning passed after replacing its email-shaped example. Remaining inherited README hierarchy warnings and excluded work are documented in the matching width plan. The code and documentation are ready for the authorized focused commit; the upstream push is the remaining delivery step.

After the independent gallery commit advanced main, refreshed only the session documentation hunks on top of `e19b217` and reran all four résumé gates, type checking and focused lint successfully. No gallery implementation or documentation is removed. The two actual desktop controls were verified in the candidate's production preview; the integration leaves their source unchanged. Full evidence and scope remain in the matching width plan.
