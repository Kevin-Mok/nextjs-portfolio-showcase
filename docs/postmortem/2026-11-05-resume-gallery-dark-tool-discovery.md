# Resume gallery follow-up tool discovery

This report records brief tooling failures while adding dark PDF previews. Use inventoried skill paths and start the local preview before browser checks; no application data was lost.

The first read attempted a nonexistent `~/.agents/skills/ponytail/SKILL.md`, while the available skill is under `~/.codex/plugins/cache/ponytail/ponytail/5.3.3/skills/ponytail/SKILL.md`. A file-existence check confirmed the catalog path. The postmortem lookup `optional missing skill helper path` returned `ext-optional-path-discovery`; it applies directly. No new learning beyond that existing finding.

The initial focused browser test received `ERR_CONNECTION_REFUSED` because the previous turn's preview was no longer running. Restarting the isolated production snapshot on port 3217 succeeded. The test then reached its intentional RED assertion: the requested inversion toggle was absent. The snapshot avoids the previously documented shared `.next` collision and does not alter another session's listener.

Status: verified workarounds for tooling prerequisites. The missing-toggle RED is intentional test-first evidence, not an incident. Further application checks belong in `plans/resume-gallery.md`.

## Pixel-check sampling boundary

The first focused GREEN run passed Prev/Next navigation but the inversion test sampled RGB `(48,54,61)` at screenshot pixel `(0,0)` instead of white with colors disabled. That value exactly matches the page outline `#30363d`. Visual inspection of the captured failure shows a correctly white original PDF; fractional screenshot clipping included the outline at the outermost pixel. Move the sample four pixels into blank paper, keeping the exact requested colors asserted. No application behavior changed for this test correction. Further pixel verification pending.

## Tablet title wrapping

The focused pair then passed with exact requested background and text pixels. Independent review suggested intermediate-width layout risk; the 650px screenshot showed a one-character-wide resume title consuming most of the modal height. Button nonoverlap alone did not detect this. The navigation group had `flex: 1` (zero flex basis), shrinking its heading to almost zero width next to the controls. Add a heading-height regression at 650px, then give the navigation group a 300px flex basis so the toolbar wraps to separate rows when needed. Verification pending.

## Source snapshot drift

After the dev suite passed, an exact source comparison failed before production verification. Inspect differing paths and preserve unrelated live changes before deciding what to copy; do not treat a tested snapshot as proof for different source bytes. No production acceptance claim is made for the changed source.

The sole difference was another session's new screen-only `.resume-page-container { max-width: 8.5in; margin-inline: auto; }` rule in `app/styles/13-resume-latex.css`. Preserve the live change and copy it into the isolated verification snapshot before building. This task does not edit that source file. Production checks will cover the combined current source.

## Verified development result

The tablet heading regression failed with 436.5px height before the flex-basis fix. With `flex: 1 1 300px`, the full eight-test dev suite passed, including the heading bound, nonoverlapping controls, exact rendered PDF background `(13,17,23)`, matching text `(240,246,252)`, toggle restoration and Prev/Next behavior. Typecheck, lint and gallery metadata/PDF coverage passed. Source review found no remaining important defect. The corrected 650px screenshot was visually inspected. Production gates and the final production run remain pending.

## Completed command polled as a running session

Production build, calibration and layout verification returned exit 0, then the test agent's orchestration attempted to poll session ID 0 although verification had already completed. The tool rejected that nonexistent session. This is a wrapper error, not an application gate failure. Preserve those passing results and continue with PDF validation; poll only when the command actually returns a valid running-session ID.

## Final result and learning

All four production gates passed. Build regenerated 25 PDFs; calibration made no CSS changes; all 25 PDFs passed validation. The final production suite passed 8/8 in 57.9 seconds, including exact remapped paper/text pixels, restored original colors, all 25 previews, Prev/Next, fit/zoom, focus restoration and phone/tablet controls. Typecheck/lint and gallery coverage passed. Source parity includes the other session's preserved screen-only CSS change. No PDF worker error appeared.

Status: verified fix for the tablet layout and verified workaround for the screenshot sampling boundary; Chrome runtime scope. Local lesson: assert title height as well as control bounds around responsive breakpoints, use a nonzero flex basis for toolbar title groups, and measure PDF color inside the paper rather than at an outlined fractional edge. The canonical learning record should cover this visual verification lesson. Missing-path, stopped-preview, snapshot drift and completed-session polling are already-understood tooling prerequisites and add no separate reusable finding.

Lookup `PDF screenshot pixel outline toolbar heading flex` found no directly applicable title-collapse/pixel-boundary guidance; the previous React PDF dialog finding addressed focus/scale state instead. Keep real-device and other browser behavior explicitly unverified.
