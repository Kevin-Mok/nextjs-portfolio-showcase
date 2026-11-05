# Build an unlisted resume gallery

This plan implements the supplied resume-gallery specification. Maintain it according to `.agent/PLANS.md`. The gallery lets Kevin compare all active generated resumes and inspect the actual PDFs with accessible keyboard controls and sharp zoom.

## Purpose / Big Picture

Visit `/resume-gallery` to see paper previews with the existing resume names. Activate a card to open the actual PDF in a nearly full-screen modal, zoom between 25% and 250%, fit the page, and close back to the same card. The route is unlisted, without authentication.

## Progress

- [x] Session delivery preparation: direct-write scope fallback, isolated mixed hunks, scoped README/privacy repair and exact-candidate verification; guarded commit and configured upstream push are the delivery workflow.

- [x] Follow-up: sampled screenshot colors; observed missing inversion/navigation RED tests; implemented shared default-on PDF remapping and Prev/Next controls; fixed tablet title wrapping after a defining RED. Dev browser suite passed 8/8, typecheck/lint and gallery coverage passed.
- [x] Follow-up: repeat all four sequential production/resume gates, final production browser verification (8/8), source review/parity, learning and delivery evidence.

- [x] (2026-11-05) Read instructions, preserve initial dirty status, inspect data, manifest, focus helpers, build and styling.
- [x] (2026-11-05) Write coverage and browser interaction tests and observe the missing gallery fail (HTTP 404, expected Preview card absent).
- [x] (2026-11-05) Implement route, local PDF.js worker, lazy thumbnails, modal rendering and recovery.
- [x] (2026-11-05) Run five browser tests in dev and production, eight Node test files, typecheck, lint/build and all sequential resume gates.
- [x] (2026-11-05) Review final changes; update smoke checks, prompt and verification evidence.
- [x] (2026-11-05) Final additional activation edge: record the clicked card directly when activation did not focus it; observed focused RED/GREEN and reran final production verification (six browser tests passed).

## Context and Orientation

`lib/resume-data.ts` exports ordered `pdfVariants` with `id`, `label`, `value`. `scripts/lib/resume-pdf-variants.mjs` lists 25 generated PDFs, in a different order. Compare by ID and filename while displaying the metadata order. PDFs in `public/resume/` are ignored generated artifacts; other archived files must not enter the gallery. Existing `/resume`, resume data, generation, navigation and sitemap remain unchanged. `hooks/useFocus.ts` has a custom focus trap that includes disabled controls; a native HTML dialog supplies focus containment and background inertness more reliably for this route.

## Plan of Work

First add Node coverage tests for metadata/manifest parity and existing PDF files and browser tests for the new route. Then add `app/resume-gallery/page.tsx` for server metadata/data and route-local client components and CSS. Load PDF.js only in client effects. Use its matching locally bundled worker, cache document tasks for the mounted gallery, cancel obsolete renders, and destroy all tasks when leaving the route. Render near-viewport first-page thumbnails. Render every page of a selected PDF at device-pixel resolution, with readable document text available to assistive technology and an ordinary PDF link.

Use a native modal dialog to contain focus and restore focus to its invoker, lock document scrolling while open, and cancel stale render jobs. Compute fit from available viewport dimensions and actual page size. Manual zoom is in 25 percentage point increments, clamped to 25–250; round fit down to a whole percentage so the printed percentage equals the rendered scale. Fit responds to resize; manual zoom persists until Fit page or another document opens. On failure show Retry and direct access. Keep all styling under the route's CSS module with a neutral opaque surface.

Finally run automated Chrome interaction checks and inspect screenshots at desktop and narrow widths. Run `npm run typecheck`, the lint command appropriate to installed Next 15, `npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, and `npm run validate-resume-pdfs` sequentially. Build and calibration write `.next` and generated PDFs: stop the task's preview before them. Append smoke checks without overwriting existing edits.

## Milestones

The first milestone is executable coverage: tests must show the missing route cannot open a preview. The second milestone is the working route and actual PDF canvases, with loading/recovery and keyboard controls. The final milestone is verified production rendering and documentation, with each check recorded below.

## Validation and Acceptance

From `/home/kevin/coding/portfolio-site`, run the gallery browser suite against a locally running app. It must verify exact names/order/filenames, real nonblank canvases for all active PDFs, modal initial fit and resize, zoom scale and limits, scroll reachability, Escape/Close, focus restoration, scroll lock, retry after simulated 404, and mobile layout. Fetch `/resume-gallery` and inspect robots metadata; fetch `/sitemap.xml` and inspect homepage navigation to confirm it stays unlisted. Run the existing resume tests and required sequential gates. Record exact outputs in Artifacts and Notes.

## Idempotence and Recovery

Tests may be rerun; missing-PDF simulation intercepts requests in the browser and never deletes a PDF. Do not kill existing listeners. Keep pre-existing dirty files untouched except append-only smoke documentation. Remove only this task's new gallery files and dependency entries to roll back. No commit, push or deployment is requested.

## Interfaces and Dependencies

Add a pinned Node-compatible `pdfjs-dist` runtime dependency and a browser test runner as a development dependency. `page.tsx` passes `pdfVariants` to the client gallery using the inferred entry type. A gallery-scoped document cache owns PDF.js loading tasks, avoiding global retained documents after route navigation. Rendering uses cancellable tasks and a fresh canvas per scale to avoid simultaneous writes to the same canvas. Native dialog supplies modal semantics, Escape and focus containment.

## Decision Log

Session commit scope: the helper for thread `01a1ad5e-cb26-7bd0-8a90-2fa9a3b7f722` returned unsafe because wrapped tool edits were not recognized. The successful edits in this conversation and pre-write status establish direct-write ownership. Include the six gallery files, PDF.js/Playwright dependency additions, gallery tests/config, this plan/prompt, three task postmortems, gallery-only smoke/ignore/lesson hunks and the required README repairs. Keep unrelated resume data/default/content/width/navigation changes, prompt packets, their documentation and `.aws` excluded. HEAD already provides the matching 25 active metadata/manifest entries, so no dirty resume source prerequisite is needed.

Validate a fresh HEAD-plus-owned-hunks source candidate, rather than the combined working tree. The README gate passes after scoped heading/usage/Node requirement repairs and PDF.js rationale; preserve the other session's existing README edits. The candidate will retain active hooks and pass the canonical staged-byte privacy gate before a focused `feat(resume): add dark PDF gallery` commit and one `origin/main` push. No Vercel project configuration exists in the inspected repository; `railway.toml` configures Railway, while the Vercel README section is optional setup guidance.

Follow-up request: use the screenshot's sampled GitHub background `#0d1117` and text `#f0f6fc` for the shell and remapped PDFs. Keep one route-local boolean, default enabled, with the same accessible pressed-state control in the gallery header and modal. Use a local SVG filter in sRGB, grayscale first and descending component-transfer tables, mapping white to `(13,17,23)` and black to `(240,246,252)`. Filter only PDF canvases and preserve source bytes. Preference lasts while the gallery is mounted and resets to enabled on reload. Add Prev/Next in metadata order, disabled at the first/last entry; keyed modal document changes reset fitting, retain colors and return focus to the original invoking card when closed. This overrides the original light design/no-extra-settings scope only for the requested colors, toggle and navigation. No dependency or PDF generation changes.

Ruling: implement the supplied prompt, and save it at the explicitly requested `prompts/resume-gallery.md`. The user explicitly requests this location, overriding the repository's default `docs/prompts/` convention.

Ruling: use the current checkout because its uncommitted resume metadata is the raw material the request refers to. A clean worktree would omit those 25 current drafts. Preserve all unrelated changes; no history operations requested.

Ruling: verify using a source snapshot under `/tmp/portfolio-resume-gallery-check`, excluding Git, secrets and generated Next output, because another active session rebuilt the shared `.next` while this task's dev server was using it. Run dev/build/calibration sequentially within that snapshot, retaining the final source changes in the requested checkout. No application configuration change is needed for isolation.

Ruling: design context is already decision-complete in the supplied prompt: personal comparison tool, quiet neutral light surface, existing fonts, no decoration or extra settings. Do not add unrelated design configuration.

Ruling: store the activated button from `event.currentTarget` as the modal invoker. Do not infer it from `document.activeElement`: native programmatic activation (and browser-dependent pointer focus) may leave focus elsewhere. The sixth browser test defines this additional case; the first production run is retained as previous-run evidence, and all affected production checks are repeated for the final source.

## Surprises & Discoveries

The manifest order differs from gallery order, so parity uses ID/filename sets. PDF.js latest requires a newer Node than installed; pin a compatible release and verify worker behavior in both dev and production. Optional path discovery failures are documented in `docs/postmortem/2026-11-05-resume-gallery-tool-discovery.md`.

The first isolated browser run passed recovery and mobile checks and found three defects: native Tab could leave the dialog, React unmount preceded native focus restoration, and the previous canvas stayed visible under a new zoom label. Defining browser tests failed for all three. Close the dialog before unmount, explicitly wrap enabled focusable controls, and replace the canvas host synchronously when its scale changes. DOM MutationObserver regression observed one stale-scale frame before the fix.

## Artifacts and Notes

The isolated final dev run passed all five browser tests (47.5 seconds), eight Node test files, typecheck and lint (only Next's deprecation notice). It verifies all 25 thumbnail/PDF selections, full zoom bounds and sharp pixel dimensions, both focus directions, Space/Enter, Close/Escape restoration, fit/resize, missing-PDF Retry, narrow layout, noindex metadata and absent sitemap/navigation. The new stale-scale test observed one mismatched canvas before the keyed-host fix and zero after it. A real desktop gallery screenshot at 1440×1000 was visually checked; the gallery console had no warnings/errors. Browser artifacts remain under `/tmp/portfolio-resume-gallery-check/.local/resume-gallery/` and are not tracked; final screenshots and production test output are also copied to ignored `.local/resume-gallery/` in the primary checkout.

Production verification completed sequentially in `/tmp/portfolio-resume-gallery-check`, whose gallery code, dependencies, tests, resume data, resume page/content and CSS were byte-identical to the primary source:

    RESUME_PDF_PORT=3319 npm run build
    npm run calibrate:resume-layout
    npm run verify:resume-layout
    npm run validate-resume-pdfs

All exited 0. Build regenerated 25 PDFs. All PDFs passed one Letter page, CMUSerif and configured whitespace bounds; calibration changed no CSS. Logs: `/tmp/resume-gallery-build.log`, `/tmp/resume-gallery-calibrate.log`, `/tmp/resume-gallery-verify.log`, `/tmp/resume-gallery-validate.log`.

Canonical postmortem learning was registered as `ext-react-pdf-dialog-render-commit` in `/home/kevin/linux-config/dot_agents/skills/postmortem-memory/{sources.json,references/browser-integrations.md}` after capturing that repository's initial status. The targeted `check --postmortem /home/kevin/coding/portfolio-site/docs/postmortem/2026-11-05-resume-gallery-tool-discovery.md` exited 0 with no errors, missing sources or unregistered aliases. Existing canonical entries were preserved.

After the nonfocused activation update, the reviewed source hash was refreshed to `cf336e864582cf8434179866d93fdb97b91f78988f3a3a8601ae9cfe27b428dd` and the same targeted check passed again. The final delivered source comparison and `git diff --check` passed. The production preview remains running at `http://127.0.0.1:3217/resume-gallery`; no other session's listeners were stopped.

After those gates, start the production preview with `node_modules/.bin/next start --hostname 127.0.0.1 --port 3217` and run `node_modules/.bin/playwright test --config playwright.gallery.config.ts`. The first production suite passed 5/5 in 40.3 seconds against newly generated PDFs. After adding the nonfocused activation case, its defining test failed against that build; the minimal invoker fix was followed by fresh typecheck/lint, all four sequential gates and a final production run passing 6/6 in 40.6 seconds. The second build preserved all 25 unchanged PDFs. Gallery unit coverage passed again. The observed production worker URL was same-origin `/_next/static/media/pdf.worker.min.b67f3282.mjs`. Chrome showed 25 cards, near-viewport canvases, and `noindex, nofollow`. The independent reviewer found no remaining important source defect after both focused review passes. `git diff --check` passed.

For a fresh run in the repository, use `npm install`, start `node_modules/.bin/next dev --turbopack --hostname 127.0.0.1 --port 3217` in one terminal, and run `npx playwright test --config playwright.gallery.config.ts` in another. Use `GALLERY_TEST_URL` if a different port is selected; retain existing listeners. The Node regression command is `node --experimental-strip-types --test scripts/lib/*.test.mjs`. Manual checks are in `docs/smoke-tests.md`; the paste-ready Cursor prompt is `prompts/resume-gallery.md`.

## Outcomes & Retrospective

### Session delivery milestone: feat(resume): add dark PDF gallery

The shipping candidate contains 19 directly observed paths/hunks against HEAD `f0941c1`. It includes gallery code/dependencies/tests, matching plan/prompt/postmortems, only the gallery additions in shared smoke/ignore/lesson files, and minimal README gate repairs. Unrelated dirty resume/default/navigation/width, evidence prompts, documentation and `.aws` remain excluded. The scope helper could not recognize wrapped edits; the pre-write baseline and successful conversation writes supply direct attribution instead. No dirty resume source prerequisite is needed: HEAD already contains the matching 25 variants.

Fresh verification of the exact candidate passed: production build (25 PDFs), calibration, layout verification, PDF validation, typecheck, lint, eight production browser tests and gallery coverage. The clean archive's initial missing generated-type error cleared after build without a code change. README gate passes; a blocked legacy sender-email example was replaced with descriptive wording, with the mandatory staged-byte privacy check enforced immediately before commit. The candidate preview is `http://127.0.0.1:3347/resume-gallery`. Logs: `/tmp/gallery-commit-*.log`. The delivery is one Conventional Commit containing the related plan and documentation, pushed to `origin/main` with active hooks preserved; final hash and actual push status are recorded in the handoff. No Vercel project is configured and no deployment status is claimed.

### Follow-up: GitHub dark palette and document navigation

The live request replaced the original light palette with screenshot-sampled `#0d1117` paper/surround and `#f0f6fc` ink/text. One shared default-on toggle appears in the header and modal and restores original colors when disabled. Its SVG filter maps source pixels in sRGB without changing PDF bytes or resolution. Prev/Next follows gallery order, disables at its ends, resets Fit page, retains colors and preserves the original invoking card for focus restoration. The toolbar wraps at tablet widths instead of squeezing the title.

Defining missing-toggle and missing-navigation tests failed before implementation. A new 650px regression observed a 436.5px title before the nonzero flex-basis fix. The final dev suite passed 8/8, typecheck/lint passed and gallery coverage passed. Production build regenerated all 25 PDFs; calibration, layout verification and PDF validation passed sequentially with no calibration CSS changes. Another session's screen-only resume width rule was preserved and copied into verification, resolving a detected snapshot difference. Final production suite passed 8/8 in 57.9 seconds against the regenerated files; gallery coverage passed 1/1. Exact screenshot pixels verified paper `(13,17,23)` and ink `(240,246,252)`, plus original white paper when disabled. Desktop/tablet/phone viewport screenshots were inspected. No new runtime dependency was added.

Fresh commands in `/tmp/portfolio-resume-gallery-check`: `npm run typecheck`, `npm run lint`, `RESUME_PDF_PORT=3319 npm run build`, `npm run calibrate:resume-layout`, `npm run verify:resume-layout`, `npm run validate-resume-pdfs`, then start the production server and run `npx playwright test --config playwright.gallery.config.ts` and `node --experimental-strip-types --test scripts/lib/resume-gallery.test.mjs`. Build never ran concurrently with a preview. Evidence logs: `/tmp/resume-gallery-dark-{build,calibrate,verify,validate}.log` and `/tmp/resume-gallery-dark-production-tests.log`. Current sources match the production snapshot. Prompt and smoke documentation now describe the dark colors, toggle, navigation, persistence and manual checks. Suggested follow-up commit: `feat(resume): add dark PDF colors and viewer navigation`. No commit/push/deployment performed. Browser coverage remains Chrome with viewport emulation.

The canonical postmortem ledger and artifact-verification guidance now contain `ext-pdf-toolbar-color-measurement`, with reviewed report hash `afe15ee6116e0d2e7be8fc9f81b6dd46de5fd9d3b9fa176a0c3f8e86190a3f7a`. Its targeted check exited 0 with no errors, missing sources or unregistered aliases. Final screenshots and production results are copied into ignored `.local/resume-gallery/`. The final source comparison and `git diff --check` passed. The main-owned local production preview is running on port 3217.

Delivered the unlisted gallery, locally bundled PDF.js worker, cancellable sharp rendering, lazy previews, accessible modal controls, recovery, tests, reusable prompt and smoke documentation. The original resume route/data/generation logic were preserved. Verification used an isolated snapshot to avoid another session's build; its production preview remains available on port 3217. No commit, push or deployment was requested or performed. Suggested Conventional Commit: `feat(resume): add unlisted PDF gallery`.

No Firefox, Safari, real-phone or assistive-technology session was run; mobile coverage uses Chrome viewport emulation. PDF canvas text is exposed to assistive technology as extracted text and the direct PDF remains available, but visual text selection is not provided. Unlisted URLs do not authenticate visitors. Remove only this task's gallery files, dependency additions, tests/config and related documentation hunks to roll back, preserving other sessions' changes.

Revision: completed after verified dev/production browser runs and all resume gates; documented source snapshot parity, focus and canvas regression fixes, review, rollback and remaining platform coverage limits.
