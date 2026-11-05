# Resume gallery tool discovery failures

Tool discovery briefly delayed gallery implementation. Inventory the current file paths before using a catalog's shortened symbol names as filenames; continue with the existing source files.

## Symptom and impact

Initial read-only commands tried `hooks/useFocusTrap.ts`, `hooks/useFocusOnMount.ts` and `personal-context/scripts/personal_context.py`, which do not exist. No application files or user data changed. A later optional CSS wildcard also had no match.

## Evidence and lookup

The commands reported ENOENT. Inventory shows the hooks live together in `hooks/useFocus.ts`, and the skill helper is `scripts/context_store.py`. Searching postmortem memory for `No such file skill helper path` returned `ext-optional-path-discovery` in `references/paths-ownership.md`; its requirement to inventory actual paths applies directly.

## Resolution and verification

Read the actual hook module and ran `context_store.py brief --project portfolio-site` successfully. Root cause: treating a symbol catalog as a file listing and guessing a helper filename. Status: verified workaround. No new learning beyond `ext-optional-path-discovery`; source ledger update remains subject to workspace permissions outside this repository.

## Next steps

Use the inventoried paths. Record any subsequent unrelated environment failures here with their evidence; do not change unrelated application behavior to work around tooling.

## Dependency and browser discovery

The sandboxed `npm view` failed with EAI_AGAIN for registry.npmjs.org. This is a restricted-network failure; retry using normal network approval rather than changing dependencies speculatively. A guessed `chrome-devtools-axi list` command returned a validation error; inspect its help for actual commands. Neither failure changed application state.

The Chrome CLI bridge did not start within 30 seconds in the sandbox. The initial Playwright run failed before navigation because Chrome crashpad socket creation was denied (`setsockopt: Operation not permitted`, SIGTRAP). Run browser validation with normal sandbox escalation. The first failure does not establish the intended missing-route RED result. Dependency lookup and installation succeeded with network access; PDF.js 5.4.296 supports the installed Node 22.15.

## Concurrent build output collision

The elevated browser run stalled because the dev server lost `.next/server/middleware-manifest.json` and temporary `_buildManifest.js` files. Git HEAD also changed to `805ec43` during this task, confirming concurrent repository work. Root cause: the shared Next output directory was being rebuilt by another session. Stop only this task's dev/test processes, restore its temporarily moved route, and verify from an isolated source snapshot with its own `.next`. This prevents further interference with the other session. Until that run passes, no browser interaction is claimed as verified.

The attempted dependency hardlink copy to `/tmp` failed because it is on a different filesystem. Use an ordinary copy; do not repeat hardlinks across mount boundaries. No source dependency files changed.

## Gallery interaction findings

The isolated suite reached actual PDFs: recovery and mobile/unlisted tests passed, while two interaction checks failed. Escape did not return focus to the card because React removed the dialog before its effect cleanup closed it; native dialog tabbing also allowed focus to leave toward browser chrome. Close the native dialog synchronously before unmount/restoration and explicitly cycle enabled controls on Tab/Shift+Tab. Re-run the existing defining tests before claiming resolution.

Independent review also found that the percentage updated before the previous canvas was replaced. The focused `zoom never displays a canvas from the previous scale while rendering` test observes actual DOM mutations to distinguish a visible stale canvas from a loading replacement. Verification pending.

The dedicated stale-scale RED test observed one mismatch. Keying the canvas host by scale removes it synchronously on zoom. With the focus fixes and this change, all five browser tests passed (47.5 seconds), eight Node test files passed, and typecheck/lint passed in the isolated snapshot. Mobile visual inspection also found theme-colored headings had insufficient contrast; route-local heading/link color declarations restore neutral contrast. The gallery console itself had no runtime warnings/errors. Homepage navigation checks logged a pre-existing missing `/images/profile/placeholder.webp`; gallery rendering is unaffected and that unrelated asset was not changed.

An optional post-calibration `git diff` inspection in the snapshot reported “Not a git repository”; the snapshot intentionally excludes `.git`. Compare its CSS bytes against the primary source instead. All gallery sources, test/config and resume metadata/CSS matched the snapshot immediately before the production gates, establishing the comparison baseline.

## Initial production verification

All production gates passed sequentially: build generated 25 PDFs; calibration, layout verification and PDF validation exited 0 without changing CSS. The first production browser suite passed 5/5 (40.3 seconds), and gallery metadata/PDF coverage passed again. The same-origin matching PDF.js worker loaded from `/_next/static/media/pdf.worker.min.b67f3282.mjs`. The source snapshot comparison was identical. Runtime focus and zoom fixes are verified in Chrome; real phones and other browser engines remain untested. Development environment workarounds are verified in the isolated snapshot and did not change the other session's listeners or source.

Postmortem lookup for `dialog focus restoration canvas zoom percentage` had no applicable prior dialog/canvas finding; the new reusable lesson is to close native dialogs before React unmount and to commit canvas scale with its percentage. The repository lesson is appended to `tasks/lessons.md`; canonical learning registration is recorded through the tracked postmortem-memory ledger.

## Additional activation edge

A final production check opened a card using its native `button.click()` without focusing it first. Escape closed the modal but focusedCard was null, because the invoker was recorded from `document.activeElement` (the body), rather than the activated button. Mouse and keyboard tests had focused the card and did not expose this assumption. The defining sixth browser case failed against that build. The fix records `event.currentTarget` as the invoker for reliable restoration; this is distinct from native dialog close ordering. Fresh typecheck/lint and all four sequential resume gates passed after the fix; the final production suite passed 6/6 in 40.6 seconds, including the new activation case. Status: verified fix in Chrome. Other browser engines remain untested.
