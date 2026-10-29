# Integrate the academic record explorer

This living ExecPlan follows `.agent/PLANS.md`. It implements the approved prompt from the conversation and keeps source verification, decisions and observed results together.

## Purpose / Big Picture

Visitors can follow an Academic Record link from the desktop or mobile landing bio to `/academics`, explore Kevin Mok's course records, and see a percentage average and clearly labeled GPA equivalent for the currently visible records. The full table lives only on the dedicated page.

## Progress

- [x] (2026-10-28) Inspected clean initial working tree, actual landing components, source session, transcript text and rendered pages.
- [x] (2026-10-28) Defined shared course/filter/sort/summary interface and wrote regression tests before calculation implementation.
- [x] (2026-10-28) Observed defining RED (new modules absent), then confirmed all 11 academic regression tests GREEN with curated dataset and pure functions.
- [x] (2026-10-28) Finished dedicated framed page, desktop/mobile landing links and sitemap.
- [x] (2026-10-28) Ran all Node tests, typecheck, lint, production build and browser scenarios; independent reviewer found no substantive product bug. The broader suite retains one confirmed pre-existing resume assertion failure.
- [x] (2026-10-28) Saved compiled prompt, updated README and shared smoke checklist, and recorded final evidence and limitations.

## Surprises & Discoveries

The transcript has two columns and course/session continuation across pages. The 49 course records include 23 CSC attempts: 22 numeric marks and one withdrawal. The source's two graded EXT attempts are included in the requested exploratory average but excluded from official university GPA calculations. The default weighted percentage is 86.6818181818, not a hard-coded UI statistic.

Earlier read-only planning lookups guessed nonexistent helper/test paths. These were recovered through actual file inventories without product changes; the incident is recorded in `docs/postmortem/2026-10-28-academics-inspection-paths.md`. The UI worker also found the optional Impeccable engine unavailable and used existing source theme context.

## Decision Log

2026-10-28: Use a standalone `/academics` route with landing links only, matching the user's explicit choice. Reuse FramedPageLayout with automatic focus disabled and existing theme variables. No new homepage section or content-viewer state is required.

2026-10-28: Keep all distinct attempts including EXT and nonnumeric outcomes visible. Weight only numeric marks with positive credit weights. Convert the unrounded average using the university's lower thresholds (85 maps to 4.0; 84.999 maps to 3.7). Explain that the result is a GPA equivalent, not official cumulative GPA.

2026-10-28: Verify language tags against the actual offering when possible. Unverified records remain untagged; language filters do not infer tags from titles. Confirmed sources initially cover Winter 2014 CSC148 Python and Winter 2018 CSC209 C/shell. Other mappings require dated evidence before publication.

2026-10-28: Execute the approved work in the clean existing checkout and leave changes uncommitted: the approved prompt explicitly withheld commit/push/deployment authorization. Root handles data, math and docs; a worker handles UI/integration; a docs agent checks language evidence. No dependencies or dev script changes are planned.

## Outcomes & Retrospective

The requested page, both landing links, sanitized dataset, calculations and tests are implemented. Final checks: all 11 academic tests pass; typecheck and lint exit 0; full build exits 0 with `/academics` statically generated and all 13 unchanged resume PDF variants skipped. The broader suite passes five files and fails the unchanged resume test at line 56 (expected old `AI CLI Dotfiles` while HEAD source uses `AI Command Line Dotfiles`). This baseline issue was reproduced directly and is outside scope.

Real-browser checks at 1440×1000 and 390×844 confirmed the default 23 rows/86.68%/4.0 result, CSC+2018+C gives CSC209H1/83.00%/3.7, incompatible MAT+C gives empty rows/dash summaries, reset restores defaults, marks sort both ways with LWD last, and sorting preserves summaries. Landing links work in both layouts; back navigation works. Mobile document width stays 390px while the table scrolls within its 342px container (940px content). Keyboard ArrowDown changes CSC to ENT and updates the result to 90.00%. Nord, Solarized Light and Tokyo Night colors were checked, including rendered desktop/mobile/light screenshots under `/tmp`. The default `/resume` remains `ai-web-dev` with the expected section order. No browser console errors were found.

The final accessibility probe confirms zero nested main landmarks and zero unnamed selects after an observed before/after correction. The independent reviewer verified data/math, real offering language sources, privacy, integration and tests; remaining runtime/doc items were resolved by the final evidence. Review evidence lives in this plan and `/tmp/academics-checks/final-*.log`. At implementation handoff, no commit, push or deployment had occurred; the subsequent authorized delivery milestone is recorded below.

Final independent evidence review: 14 claims verified, zero incorrect, zero unresolved; screenshots and runtime records were reviewed without independently repeating browser interactions. Both incident hashes were registered with explicit no-new-learning decisions in the canonical ledger and each targeted helper check returned no errors, missing sources or unregistered aliases. The README sync pass included the academic feature, defaults, evidence limits, reset behavior, data location, test command and its Node requirement while preserving the existing recruiter-first order.

## Context and Orientation

The Next.js App Router homepage uses separate desktop (`components/tiles/content/AboutContent.tsx`) and mobile (`components/layout/parallax/sections/ParallaxBioSection.tsx`) bio components. Add a Next Link in each. `components/layout/FramedPageLayout.tsx` is the existing theme-aware standalone route shell. `app/sitemap.ts` lists public routes.

The authoritative private input is `/home/kevin/school/official-transcript.pdf`; never publish that PDF, identifying headers, or extraction intermediates. The public dataset includes only course code/title, term/year, weight, mark/grade/status and curated language metadata. The public name is Kevin Mok.

## Plan of Work

First write Node regression tests in `scripts/lib/academics.test.mjs`. Implement `lib/academics.ts` for pure filter/sort/summary/color calculations and `lib/academic-data.ts` for the validated static course records. Reconcile all 49 records against the original two rendered source pages, preserving the split research project rows and repeat attempts.

Then build `app/academics/page.tsx` and `components/academics/AcademicExplorer.tsx` with a scoped stylesheet. The page has a title, home link, three labeled select filters, reset button, live summaries and sortable semantic table. Default prefix is CSC, language/year are All and mark order is descending. Missing marks sort last in either direction. Constrain horizontal scrolling to the table on phones and preserve keyboard and theme contrast.

Finally update README, docs/smoke-tests.md and the saved prompt. Run focused and broader verification and request an independent evidence review before completion.

## Concrete Steps

From `/home/kevin/coding/portfolio-site`, run `node --experimental-strip-types --test scripts/lib/academics.test.mjs`. Before implementation it must fail because the new modules are absent; after implementation it must pass. Run all existing tests with `node --experimental-strip-types --test scripts/lib/*.test.mjs`, followed by `npm run typecheck`, `npm run lint`, and `npm run build`. Capture each exit status; never describe a failed existing gate as passing.

Read package scripts before starting: `npm run build` regenerates ignored resume PDFs; `npm run dev` runs an existing cleanup helper. Preserve existing listeners by launching Next directly on an available port for browser checks if cleanup would affect them. Do not change unrelated scripts.

## Validation and Acceptance

Default `/academics` displays 23 CSC rows, 22 graded attempts, 11.0 graded credits, 86.68% and 4.0/4.0 GPA equivalent. Filter CSC + 2018 + C: only CSC209H1 remains, showing 83% and 3.7 equivalent. Filter incompatible language/prefix: zero rows, dash summaries and reset. Sorting must not change the summary; mark/grade null values stay last. The 2014 MAT136 numeric failing mark remains 43, with red clamped display color.

Test weighted synthetic records, zero credit/nonnumeric records, GPA boundaries, both sort directions, stable ties and nonmutating input arrays. Browser-check landing links, direct route, filter/reset, table overflow, back navigation, focus, supported themes, and existing resume at desktop and mobile widths. Confirm delivered assets contain no transcript identifiers or PDF.

## Idempotence and Recovery

No database migrations, runtime persistence or dependencies are introduced. Reload resets local filters. Restore only the task's modified files and remove its new route/data/components to roll back; preserve any unrelated changes. Ignored build outputs are not delivery artifacts.

## Artifacts and Notes

The approved compiled prompt is saved at `prompts/integrate-academic-record.md` without surrounding report text. Private source rendering remains under `/tmp/academics-source-review-*`, outside the repository. Browser screenshots contain only the sanitized public UI and remain under `/tmp/academics-desktop.png`, `/tmp/academics-mobile.png` and `/tmp/academics-light.png`.

## Delivery milestone: feat: add academic record explorer

The user subsequently invoked `$commit-session`, authorizing one focused commit and push to configured upstream `origin/main` at `https://github.com/Kevin-Mok/portfolio-site.git`. This supersedes the earlier local-only delivery decision while preserving the original implementation record. The scope helper ran for session `01a184f6-15d9-7083-8b25-133bfae45f40` but returned `unsafe` because it detected no successful writing actions. The direct-write fallback covers all 15 reviewed files: the new academic route/component/style, dataset and helpers, tests, both landing link edits, sitemap, README/smoke docs, two incident reports, saved prompt and this plan. The original pre-write Git status was clean; every included edit is directly evidenced by this conversation or its assigned UI worker. No pre-existing staged or unrelated portfolio changes were found. The mixed canonical learning ledger in the separate linux-config repository is excluded from this repository's commit.

Fresh commit checks pass: 11/11 academic tests, typecheck and lint, with command/exit evidence in `/tmp/academics-checks/commit-*.log`. The prior full build and desktop/mobile browser checks remain valid because implementation source has not changed. The baseline resume name assertion remains a disclosed warning. The README sync pass repaired its stale clone/issue URLs, directory name, installed Next version badge and Node engine minimum using the configured Git remote and installed Next manifest. No Vercel project link or config exists; the repository uses Railway configuration, so no Vercel deployment is applicable.

The exact staged paths and their bytes were inspected; every staged blob matched its reviewed working file and no file requires LFS. The canonical privacy gate then blocked the commit on 14 email/IP findings. The same gate also failed on unchanged HEAD with 13 findings, proving a baseline blocker. The two session-owned documentation findings were repaired without policy changes; the gate now reports 12 findings solely in unchanged baseline files, including existing resume/contact data and public image/audio assets. The scoped candidate now has 16 files: the 15 directly evidenced feature/docs/test files plus `docs/postmortem/2026-10-28-academics-commit-privacy.md`. These remain staged; no commit or push was attempted and existing hooks are intact. Resolve the baseline privacy gate under a separately approved scope extension before retrying delivery. Planned commit subject remains `feat: add academic record explorer`; implementation verification is complete, while commit/push is blocked by the required safety gate.

## Worktree delivery update on 2026-10-29

The user authorized the public-portfolio policy and gate repair, requested an academics worktree, and explicitly requested commit/push. The new checkout is `/home/kevin/coding/portfolio-site/.worktrees/academics` on `feat/academics`, based on the original main HEAD. The 16 staged feature files were transferred by binary Git patch and verified; original checkout bytes remain untouched until the transferred work is safely committed. `AGENTS.repo.md` and README now explain the intended public portfolio content and exact-hash review policy. The shared gate fix is a separate prerequisite change in the canonical `ai-cli-workflow` repository: one accepted-category validation line, regression tests and 12 individual reviewed approvals. Its own plan is `plans/public-portfolio-privacy.md` in that repository.

The actual shared privacy gate now passes the academics candidate. New worktree verification logs at `/tmp/academics-checks/worktree-*.log` confirm 11 academic tests, typecheck, lint and full build exit 0; all 13 ignored resume PDFs were generated. The existing stale resume test remains outside this change. Shared gate validation confirms five targeted checks, 59 privacy tests and one frozen-tree integration pass, with no broad exemption or hook bypass. Remaining delivery steps are prerequisite/feature commits, ordinary pushes to their respective configured origins (the new feature branch will track `origin/feat/academics`), verification of remote commit IDs, and removing only the verified transferred session changes from the original checkout. No merge into main or history rewrite is requested.

The shared prerequisite was committed as `72b1d33` (`fix(privacy): support reviewed public portfolio content`) using an isolated index: only the gate source, tests, reviewed approvals, its plan and the new canonical README paragraph were included. Both the explicit gate and the preserved installed hook passed. refresh-config completed and the canonical hook snapshot is current. The feature candidate comprises 17 reviewed files including the public-portfolio instruction, and its exact staged privacy check passes. This milestone is identified by `feat: add public academic record explorer`; verification is complete and commit/push receipts follow in Codex output.

## Interfaces and Dependencies

`CourseRecord` has id, code, title, year, term, credits, nullable mark, grade, nullable status, language strings and language verification/source metadata. `CourseFilters` holds string prefix/year/language selectors, using `all` as the unrestricted value. `filterCourses` returns matching rows; `sortCourses` returns a sorted copy; `summarizeCourses` returns gradedCount, credits, nullable percentage and nullable gpaEquivalent; `getGpaEquivalent` and `getMarkHue` implement the published scale. Existing React, Next.js, Zod and Node built-in test facilities are sufficient.

Revision note: Created from the approved plan when execution was requested. Defaults and interface were made concrete for independent data and UI implementation.

Revision note: Completed the implementation and final verification record. Restricted-sandbox startup was worked around through permitted execution; the baseline resume test mismatch is reported rather than silently changed. Browser inspection prompted a minimal landmark/select-name correction, then final type/lint/build and browser checks were repeated.

## Fixed U of T background follow-up on 2026-10-29

The user requested a repeating U of T logo background that stays still while scrolling. Replace the shared animated wallpaper only on `/academics`, using a route-scoped fixed decorative layer and a locally served signature from https://spacesandexperiences.utoronto.ca/logos-and-brand-identity/ (public preview asset `brand-UofT-300x300.jpg`). The image remains unmodified; CSS blends it into the existing theme. Preserve content, filters, the frame and other routes. Rollback restores the route/CSS changes and removes the new asset.

- [x] Inspect the page, shared layout and available assets; confirm no U of T background exists.
- [x] Add the repeating fixed layer and desktop/mobile smoke check.
- [x] Verify actual scrolling, mobile rendering and type checking.

Fresh verification: `/academics` returns HTTP 200; Chrome computed the background as fixed with repeat in both axes and pointer-events none. Desktop scroll changed to 398px while background top remained 0; at 390px phone width scroll changed to 500px while background top remained 0 and document width stayed 390px. Screenshots: `/tmp/academics-uoft-desktop.png`, `/tmp/academics-uoft-mobile.png`, `/tmp/academics-uoft-light.png`. Typecheck, academic tests, lint and diff whitespace check passed. Full production build was skipped for this route/CSS-only change. The optional context launcher and restricted preview limitations are documented in `docs/postmortem/2026-10-29-academics-background-preview.md`.

No commit or push requested. Existing dirty navigation, smoke documentation, plan and lesson changes are preserved.

## Single-logo refinement on 2026-10-29

The latest user request supersedes the tiled background: show one large U of T crest and name surrounded by white, still fixed while scrolling. Use the unchanged official SVG from https://www.utoronto.ca/themes/custom/bootstrap_uoft/logo.svg as a CSS mask, colored navy and faint enough for the table to remain legible. Its transparent geometry allows a pure white surround without editing the image. Size the whole signature within 90vw, capped at 1120px, preserving its aspect ratio and full crest/name. Scope white backgrounds and dark text to academics so all site themes remain readable. Remove only the superseded session-created JPEG; preserve unrelated dirty work.

Atomic plan:
- [x] Confirm the previous repeating/nonwhite background does not meet the new request (browser `singleLogo:false`, `whiteSurround:false`).
- [x] Replace it with one crisp fixed vector logo on white and update the smoke check and local lesson.
- [x] Verify desktop/mobile layout, fixed scroll position, light/dark theme readability and regression checks.

Fresh evidence: Chrome reports a pure white background, one mask with `no-repeat`, 1120px logo width at 1440px desktop width and 351px at 390px phone width. The background top stays 0 after scrolling 400px/500px respectively; phone document width equals its 390px viewport. All three theme classes compute white surroundings and navy (`rgb(0, 42, 92)`) text. Screenshots `/tmp/academics-single-logo-desktop.png` and `/tmp/academics-single-logo-mobile.png` were visually inspected. The official SVG parses without scripts, foreign objects or linked images. Fresh typecheck, lint, academic tests and `git diff --check` all exit 0. Full production build was skipped for this CSS/asset-only refinement.

Manual verification, from this worktree with no sudo and the preview running on port 3027: `chrome-devtools-axi open http://127.0.0.1:3027/academics`, `chrome-devtools-axi scroll down`, then `chrome-devtools-axi resize 390 844`. Expect one complete crest/name on white; content moves while logo stays still; mobile shows the full signature without document overflow.

Cursor prompt: “Review `/academics` at desktop and phone widths: confirm one large fixed U of T vector crest/name on white, navy text in all themes, working filters, and no page overflow. Preserve unrelated changes.”

Suggested commit: `style(academics): use one fixed UofT logo on white`.

Review: the existing fixed decorative layer suffices; no new components, hooks or dependencies are needed. Smoke docs and the local lesson match the latest direction. The optional preview restart incident is resolved; canonical incident-ledger review remains outstanding outside this worktree's writable roots.

Rollback: restore the prior background rules and JPEG if the tiled design is wanted again. No shared layout, data, filters or dependencies change. No commit or push requested.

## Crest-above-name refinement on 2026-10-29

The latest user request places the crest above the university name. Preserve the pure white surround, navy watermark treatment and fixed scrolling behavior. Reposition the existing official vector path groups in `public/images/academics/uoft-signature.svg`: center the crest above the unmodified wordmark paths, using translations and uniform crest scaling. Expand the SVG viewBox to fit the vertical composition. Use `contain` inside a viewport-inset mask so neither the crest nor the name is cropped on phones or short desktop viewports. No new component, dependency, data or filter changes are needed.

Atomic plan:
- [x] Inspect the horizontal asset: crest x≈5–72/y≈8–156, wordmark x≈90–425/y≈56–137; neither has a layout transform.
- [x] Stack the original vector groups and fit the entire logo to the viewport; update smoke docs and the local layout lesson.
- [x] Verify desktop/mobile composition, scroll attachment and regression checks.

Fresh verification: Chrome rendered the SVG paths and measured crest bottom 187.29 versus wordmark top 226.47, with horizontal centers within 5px. Desktop scroll changed to 450px while background top remained 0. At 390px phone width, the complete vertical logo uses `contain`, no repetition, and document width remains 390px. Visually inspected screenshots: `/tmp/academics-stacked-logo-desktop.png` and `/tmp/academics-stacked-logo-mobile.png`. White surroundings and navy text remain. XML parses safely; all original crest/lettering path data is unchanged. Fresh typecheck and academic tests pass; `git diff --check` passes. No full build or repeated lint for this CSS/SVG-only layout refinement.

Manual test plan: from this worktree, no sudo needed, open `http://127.0.0.1:3027/academics` using `chrome-devtools-axi open`, scroll down with `chrome-devtools-axi scroll down`, and resize using `chrome-devtools-axi resize 390 844`. Expect the crest centered above the name, a fixed background during scroll, and full uncropped phone rendering. The prior preview listener was reused after EADDRINUSE, without stopping other processes.

Cursor prompt: “Verify `/academics` shows one fixed U of T crest centered above the university name on white, at desktop and phone widths. Preserve the official vector paths and unrelated changes.”

Suggested commit: `style(academics): stack UofT crest above wordmark`.

Review: two transforms and a contained mask are sufficient. Smoke docs describe the final vertical arrangement. Canonical incident-ledger review remains outstanding outside this worktree as previously recorded.

Rollback: remove the two SVG group transforms, restore the original horizontal viewBox and mask sizing. Preserve unrelated dirty files. No commit or push requested.

## Delivery milestone: style(academics): stack UofT crest above wordmark

The user invoked `$commit-session`, authorizing one focused commit and push to `origin/feat/academics`. Session ID: `01a188ca-f10b-7a22-8ef4-be943aacb56d`. The scope helper ran before staging and after README repairs but returned `unsafe` because it did not recognize successful writes. Direct-write fallback uses the captured pre-write status and observed edits in this conversation. The eight eligible paths are the academics route, academics CSS, stacked SVG, background preview postmortem, background-only smoke/lesson/plan additions, and the required README repairs. Exclude the pre-existing NavigationTile edit, Contents-navigation smoke check, Contents-link plan follow-up, worktree-discovery lesson and link-verification postmortem. Construct the staged versions of the three mixed files separately; preserve their working copies and unrelated hunks.

Completed: the single fixed logo is centered with crest above name, a pure white surround and readable navy text. Fresh typecheck, lint and academic tests all exited 0; full logs are under `/tmp/academics-session-commit-checks/`. README gate reports `pass_no_change` after source-grounded section, CSS-count, installed-version, repository-name, contact/anchor and license-order repairs. The independent evidence review verified all five claims with no actionable findings. Desktop/mobile browser evidence from the implementation turns remains valid; no app code changed in this delivery turn. Full production build and cross-browser testing were skipped for this CSS/SVG/docs change.

The existing active hooks stay intact. Run the canonical privacy gate against the exact staged candidate immediately before the commit, inspect staged content, then make the authorized upstream push. No Vercel project is configured: the repository uses `railway.toml`; a manual README example does not establish a Vercel deployment target. Local implementation has no unresolved product blocker; production rollout is not independently verified. Canonical incident-ledger review remains outstanding outside this worktree at `/home/kevin/linux-config/dot_agents/skills/postmortem-memory/`. Commit/push receipts belong in the Codex output for this subject.
