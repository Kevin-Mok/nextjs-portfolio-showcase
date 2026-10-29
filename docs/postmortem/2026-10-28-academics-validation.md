# Academic record validation failures

This living report tracks unexpected validation failures while adding the academic page. It separates application compilation from the existing resume tests and PDF tooling so a partial check is not reported as a complete build.

## Symptom and impact

On 2026-10-28, the new academics tests passed, but the broader Node test command reported `resume-variant-ai-web-dev.test.mjs` failing with exit 1 and no test-level diagnostics. The Next.js production compilation, type check and static page generation succeeded, including `/academics`; the subsequent resume PDF generator exited because its Next.js child server exited early with code 1 and no diagnostics. No resume source files or test expectations were changed by this task. The full build subsequently passed outside the restrictive sandbox; the unrelated baseline test assertion remains unchanged.

## Evidence

Logs are under `/tmp/academics-checks/`: `focused.log`, `all-node-tests.log`, `resume-web-dev.log`, `typecheck.log`, `lint.log` and `build.log`. Typecheck exited 0 and lint exited 0 with Next's deprecation notice. The build produced 27 pages and then printed `Next.js server exited early with code 1`. The broad test wrapper reported five files passed and one failed.

## Lookup and current status

The canonical postmortem search for `node child process early exit no diagnostics` returned process memory accounting and backup findings that do not apply to server startup or assertions. A direct production startup on unused localhost port 4318 exposed `listen EPERM: operation not permitted`, confirming the sandbox disallows binding. The full build subsequently exited 0 with permitted execution; this verifies an environment workaround rather than a product fix.

The memory skill reference documented a `--compact` flag absent from the canonical installed helper; its invocation failed and the lookup was rerun without that flag, parsing only the relevant matches. This was an inspection-only failure and did not change application state.

## Resolution and verification

Running the resume test directly exposed the assertion at line 56: expected `AI CLI Dotfiles`, actual `AI Command Line Dotfiles`. Both the test and resume data match HEAD, confirming a pre-existing stale expectation. It was left unchanged because resume content and its historical test are outside the academic-page change.

Final evidence is captured with command and exit status in `/tmp/academics-checks/final-academics.log`, `final-typecheck.log`, `final-lint.log` and `final-build.log`: 11 academic tests pass, typecheck and lint exit 0, and the full build exits 0, generates `/academics`, and skips all 13 unchanged resume PDFs. The broader suite remains five passing files and one baseline failing file. Browser checks confirmed default/filter/empty/reset/sort behavior, desktop/mobile landing links, theme colors, keyboard selection, mobile table containment, and the unchanged default resume.

Browser inspection also found one nested main landmark and three unnamed selects in the new page. Root layout already provides the main landmark; the page wrapper was changed to a div and each select received a name. A final-build browser probe confirmed zero nested main landmarks and zero unnamed selects. No browser console errors were reported. A patch hunk used a partial paragraph as a whole line and was rejected without changing files; reading the complete paragraph and applying a whole-line replacement resolved it.

## Follow-up and learning

Keep the unrelated stale resume assertion visible in the handoff. No new reusable remedy was learned: restricted localhost binding and discovered-path/whole-line patch checks already have established guidance. The reviewed hashes and explicit no-new-learning decisions are registered in the canonical learning ledger; run its targeted checks for this report and the inspection-path report.
