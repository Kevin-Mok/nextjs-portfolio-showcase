# Match the resume page to PDF width

Constrain the on-screen `/resume` document to a centered US Letter page width, while preserving mobile reflow and PDF printing. This plan follows `.agent/PLANS.md`.

## Purpose / Big Picture

The user clarified that `/resume` should match PDF width. US Letter is 8.5 inches wide, equivalent to 816 CSS pixels. The current screen document is capped at 1180px and appears wider than the PDF. The new screen cap should be 816px, shrinking within existing page gutters on smaller screens.

## Progress

- [x] Capture current Git status and inspect the standalone wrapper, shared styles and PDF generation.
- [x] Clarify requested width as PDF width; observe a defining browser assertion fail with expected 816px, actual 1180px.
- [x] Constrain the existing page wrapper to 8.5in for screen media.
- [x] Verify desktop width/centering, mobile fit, controls and print isolation; update smoke documentation.

## Context and Orientation

`app/resume/page.tsx` wraps shared `ResumeContent` in an 1180px container and an inner `.resume-page-surface`. `app/styles/13-resume-latex.css` defines that surface and separate print rules using Letter size. The screen uses utility classes whose auto margins are overridden by the global reset, so the screen surface needs an explicit CSS margin. The homepage résumé tile and other shared résumé styling must remain unchanged.

## Plan of Work and Milestone

Keep the existing outer page gutters and wrapper structure. Add a `resume-page-container` class to the existing 1180px wrapper and an `@media screen` rule setting its maximum width to 8.5in and inline margins to auto. Preserve its existing utility classes so print media retains exactly the same wrapper behavior. Extend the existing responsive résumé smoke check with the width and centering criteria.

## Concrete Steps and Acceptance

From `/home/kevin/coding/portfolio-site`, use Chrome on `http://localhost:3001/resume`. At 1440px viewport width the `.resume-latex` bounding rectangle must be 816px wide, with equal left and right margins. At 390px and 768px widths the page must fit without horizontal overflow, and the selector and download control must remain visible. Inspect the desktop and mobile screenshots. Confirm print CSS contains no added width constraint, and compare the current print bounding rectangle with the pre-change baseline if a print emulator is available. Delegate `npm run typecheck` and focused legacy ESLint on `app/resume/page.tsx` to the tests agent. Inspect `git diff --check` and the scoped diff.

## Surprises & Discoveries

The Impeccable context launcher could not run because engine 0.1.14 is absent and the sandbox cannot create its home cache directory. Existing PRODUCT.md and DESIGN.md are absent. Use incumbent source styles and live Chrome instead; do not install an engine for this width change. A guessed base stylesheet path was missing; the actual file inventory identifies `app/styles/05-base.css`.

The tests agent captured a print-media baseline with installed system Chrome after the bundled Playwright browser was found absent. At viewport 816px, the résumé is x=24px and 768px wide; at viewport 1440px, it is x=24px and 1180px wide. Both use zero surface margins/padding. Recheck the same measurements after this screen-only change.

## Decision Log

Match the entire PDF sheet's US Letter width rather than its printable inner area. Apply the cap only to screen media and only to the standalone container; shared homepage and print layouts retain their behavior. Preserve wrapper markup to make print isolation exact rather than simplify a structure used by PDF generation.

## Validation, Risks and Recovery

Fresh browser evidence and automated results will be recorded below. No résumé copy or print calibration is intentionally changed. To roll back, remove only the new container class and its screen-only rule; retain unrelated pending work. No configuration, dependencies, persisted state, commit or deployment is required.

## Interfaces and Dependencies

Retain `ResumePage`, its `searchParams` interface, `ResumeContent` props, variant resolution and existing CSS imports. Add no dependencies or test framework.

## Outcomes & Retrospective

The desktop browser assertion changed from RED (expected 816px, actual 1180px) to GREEN: at 1440px the résumé is 816px wide with equal 312px left and right margins. Tablet width 768px yields a 720px document; mobile width 390px yields 342px. Both have 24px gutters and no horizontal overflow. The selector and Applied AI PDF download remain present. Desktop and mobile screenshots at `/tmp/portfolio-resume-width-desktop.png` and `/tmp/portfolio-resume-width-mobile.png` were visually inspected.

The tests agent compared actual print-media layout before and after in system Chrome: at viewport 816px the document stayed x=24px,width=768px; at 1440px it stayed x=24px,width=1180px. Print screenshots were saved as `/tmp/resume-width-print-before.png` and `/tmp/resume-width-print-after.png`. `npm run typecheck` exited 0, and `ESLINT_USE_FLAT_CONFIG=false node_modules/.bin/eslint app/resume/page.tsx` exited 0 with no lint diagnostics, only the existing ESLintRC deprecation warning. PDF generation, calibration and production build were skipped because no print rules or résumé copy changed and live print dimensions remained identical. No commit, push or deployment performed. Suggested commit: `fix: match resume screen width to Letter PDF`.

Independent evidence-reviewer source review found no concrete defects: the selector is used only by the standalone page, screen rules override the layered utilities, the existing fluid width allows mobile shrinking, and print declarations are isolated. The review's pending-verification note was resolved by the fresh runtime and command results recorded above. The reviewer did not independently rerun those checks.

## Cursor Handoff

Check `/resume` at 1440px, 768px and 390px: the desktop document is centered and at most 816px wide, mobile fits, and variants/downloads remain usable. Review only `app/resume/page.tsx`, the new screen surface rule in `app/styles/13-resume-latex.css` and the matching smoke check; preserve other résumé work and print calibration.

Created before implementation after the user's PDF-width clarification. Before editing, revised the wrapper approach to preserve all print markup and dimensions.

Updated after implementation with desktop, tablet, mobile and unchanged-print evidence, screenshot inspection and focused automated results.

## Session Delivery Milestone

The user subsequently invoked `commit-session`, authorizing a focused commit and push to `origin/main`. Deliver navigation and screen-width changes together under `fix: open resume links on a Letter-width page`, including their plans, tooling reports and separable README/smoke documentation hunks. The scope helper found no writes because the session tools are wrapped; use the directly observed patches and original pre-write Git status for attribution. Exclude unrelated résumé copy, gallery, dependency, prompt and configuration edits, plus canonical memory updates in the separate linux-config repository.

README gate: the candidate retains committed repository URLs and documents the verified navigation and width. The recruiter summary and stack rationale precede setup; setup, daily use and command options are covered. Correct the candidate's unsupported Node 18.0 prerequisite to the supported 20+ line using installed Next.js engine evidence, while preserving the other session's separate working-tree Node 22.3 edit. Clarify the résumé quick-access navigation. These are separable gate repairs. Validate the exact candidate in `.worktrees/resume-ui-delivery`, isolating other dirty work. Mandatory build, calibration, layout verification, PDF validation and privacy gate are pending; no commit or push has occurred.

Precommit evidence for this milestone: the isolated candidate's `CHROME_BIN=/usr/bin/google-chrome RESUME_PDF_PORT=41993 npm run build` exited 0 and generated 25 PDFs. `npm run calibrate:resume-layout`, `npm run verify:resume-layout` and `npm run validate-resume-pdfs` each exited 0; all 25 PDFs are one-page Letter documents with CMUSerif fonts, and calibration needed no CSS changes. Candidate type checking and focused legacy-config lint also exited 0. Build and gate logs are `/tmp/resume-ui-delivery-*.log`. Production-preview measurements in `/tmp/resume-ui-delivery-runtime.json` confirm the 816px centered desktop document, 342px mobile document and no overflow. The temporary preview was stopped without affecting other listeners. Its missing placeholder image warning is inherited from the default preview configuration.

README gate coverage repairs now document Chrome/Chromium, `CHROME_BIN`, Poppler utilities and the actual calibration/measurement/verification options, independently checked against their parsers. A privacy-blocked email-shaped README example was replaced with descriptive verified-sender guidance; the scoped canonical privacy gate then exited 0. Inherited README hierarchy warnings remain: repeated recruiter bullets and a nonterminal License section. Their broader mixed edits are excluded from this focused change. The helper was rerun after repairs and still cannot detect wrapped writes, so direct-write fallback remains authoritative.

Commit scope is 11 paths: the two navigation components, standalone page, screen stylesheet, root README, résumé quick-access README, smoke checklist, both task plans and both tooling reports. Only reviewed session/gate-repair hunks enter mixed documentation. Excluded work includes `.aws`, `.gitignore`, `AGENTS.repo.md`, `package.json`, résumé copy and master sources, existing résumé-test edits, gallery routes/tests/configuration, prompt packets, other plans/reports and unrelated README/smoke/documentation hunks. The separate linux-config memory ledger is outside this repository's commit. Next step is the focused commit followed by one upstream push with the active pre-push gate; no history rewrite or hook bypass is authorized.

Before commit, the tree-equality guard detected the independent gallery commit `e19b217` advancing main from `f0941c1`. It prevented an old README/smoke snapshot from removing that new documentation. Refresh the isolated candidate to the current committed source and reapply only our 11 paths. Preserve its gallery implementation, README command reference, Node 22.3 prerequisite and privacy-safe sender description; the earlier candidate-only Node 20 repair is superseded and must not be committed. All four integrated résumé gates must be rerun before the focused commit. This integrates source trees without a rebase, reset or history rewrite.

Integrated verification completed on `e19b217` plus the 11 session paths: build (dedicated PDF port 43924), calibration, layout verification, PDF validation, type checking and focused legacy lint all exited 0. The production build includes the committed gallery, all 25 PDFs pass as one-page Letter documents with CMUSerif fonts, and calibration made no changes. Exact logs are `/tmp/resume-ui-integrated-*.log`. Earlier browser assertions cover both actual desktop controls, browser Back, 816px centered desktop width and mobile fit; all four relevant UI source files are byte-identical across integration. Candidate documentation now adds only our navigation/PDF-prerequisite/options text and smoke expectations to the gallery's committed documentation. The final commit milestone is ready, with the upstream push remaining and no task blocker. Scoping used direct-write fallback for thread `01a1ad5b-cbf8-7102-a0de-7411ecfca808`.
