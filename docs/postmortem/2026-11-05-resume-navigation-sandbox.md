# Local navigation verification sandbox restriction

This report records a local diagnostic restriction encountered while checking Resume navigation. Use the approved Chrome command route to inspect the existing server; no application or host network changes are required.

## Symptom and impact

The sandboxed `ss -ltnp '( sport = :3001 or sport = :3000 or sport = :9224 )'` diagnostic printed `Cannot open netlink socket: Operation not permitted`. It could not report listening processes. A sandboxed Chrome snapshot also remained pending without output. Application files and existing listeners were unchanged.

## Evidence and prior lookup

Searched postmortem memory for `Cannot open netlink socket Operation not permitted chrome bridge sandbox`. The `ext-sandbox-loopback` finding in `references/execution-environments.md` describes restricted local socket diagnostics and approved scoped execution. Its applicability is the permission boundary, not an application routing failure.

## Cause, resolution and verification

The default sandbox restricts socket inspection. An approved `chrome-devtools-axi snapshot` completed with exit status 0 and inspected the existing `http://127.0.0.1:4327/resume` page. Continue browser verification using that approved route. No host permission or network configuration was changed. The default sandbox limitation remains.

A subsequent click using a cached snapshot reference was rejected as `STALE_REF` (generation 223 versus current 325). Replacing it with a fresh DOM lookup exercised both actual Resume controls; each deliberately failed the expected `/resume` assertion because the current URL stayed `/`. Snapshot references must be refreshed before reuse when another command updates the browser generation.

The first focused ESLint invocation exited 2 because ESLint 9 defaults to flat configuration while this repo uses `.eslintrc.json`. A memory lookup for `ESLint 9 eslint.config ESLINT_USE_FLAT_CONFIG` found no applicable incident. Rerunning the same two-component lint with `ESLINT_USE_FLAT_CONFIG=false` exited 0, with no lint diagnostics and the expected legacy-config deprecation warning. No config migration was needed for this routing task. Type checking also exited 0. Both desktop route assertions passed after implementation, and browser Back, About, mobile CTA and direct `/resume` access were verified.

## Learning and next steps

These are tooling restrictions with verified scoped workarounds; no application failure remains. Record this report's reviewed hash as no-new-learning in the canonical postmortem ledger and run the helper's targeted check. Preserve unrelated dirty reports in this directory. ESLint configuration migration remains outside this change.

During delivery inspection, an optional read of `.githooks/pre-commit` found no file. Listing hooks confirmed only `.githooks/pre-push` exists. Preserve that gate and run the canonical privacy scanner explicitly. The scope helper returned `unsafe` with no detected wrapped writes; its documented direct-write fallback establishes session scope.

A README patch expected the earlier Node 18.0 prerequisite but was rejected because another active session had changed that line to 22.3. The rejected patch changed no files. Re-read the current source before patching, preserve that working-tree edit and prepare the separable candidate README repair from HEAD. No user work was overwritten.

The isolated-candidate preparer initially asserted that `.resume-latex {` occurred only once, although the stylesheet also has print/mobile declarations. It stopped before writing any candidate files. Use the already reviewed complete session-only source files and exact documentation replacements, then inspect the isolated diff. The main index and working files were unchanged by this failed preparation.

The isolated candidate's first canonical privacy scan exited 1 with one `email` finding. Do not bypass the gate. Inspect only redacted location details, exclude or repair the affected candidate while preserving unrelated working-tree content, and rerun the same gate before committing. Other eligible session work remains deliverable.

Redacted inspection located the finding in the README's `RESEND_FROM_EMAIL` example. Replaced that email-shaped example with descriptive verified-sender guidance in both the candidate and working README. The scanner's sanitize command was used only in dry-run mode; its broad repository suggestions were not applied. The next staged scan must pass before commit.

The repaired isolated candidate passed the canonical privacy check with exit status 0. Its production build generated 25 PDFs; calibration, layout verification, PDF validation, type checking and focused lint all passed. No print recalibration edits were needed. Keep the original default sandbox and optional-tool limitations as documented; all delivery preparation failures have scoped workarounds. Register this report's updated hash with an explicit no-new-learning decision before commit.

The final tree-equality guard stopped before invoking `git commit` because another session advanced main from `f0941c1` to `e19b217` (`feat(resume): add dark PDF gallery`) during validation. The staged old-base README/smoke blobs would have removed the newly committed gallery documentation. Preserve that commit and rebuild only the session hunks on its current HEAD; rerun the integrated candidate gates. A subsequent diagnostic attempted `git write-tree` through the default sandbox and was denied an index lock; rerun Git index operations only through approved scoped execution. No commit, history rewrite or working-tree rollback occurred during these protected failures.

An attempted follow-up README sender-line patch was also rejected because the concurrent edit already supplied the privacy-safe description. Treat that as already resolved, leave the working README alone, and construct the candidate from current HEAD plus the session's additive documentation hunks. No files changed in the rejected patch.

Resolution: refreshed the isolated source and index to committed `e19b217` plus only the session's 11 paths. Preserved the gallery code/docs, Node 22.3 requirement and safe sender wording. All four integrated résumé gates, type checking and focused lint exited 0; all 25 PDFs validated and calibration changed nothing. The final candidate diff no longer removes gallery documentation. The protected commit attempt created no commit; continue with a fresh exact-candidate privacy check and the authorized normal commit/push, preserving active hooks.
