# Resume width tooling fallback

This report records unavailable optional tooling while matching the résumé screen width to its PDF page. Continue with the existing project source and live Chrome; no tool installation is required.

## Symptom, evidence and impact

The Impeccable context launcher exited 127: engine 0.1.14 was not installed and it could not create `/home/kevin/.impeccable/bin/0.1.14` in the sandbox. No repository files were changed. A later source read referenced nonexistent `app/styles/00-base.css`; the observed file inventory identifies `app/styles/05-base.css` instead. These diagnostics did not affect the app.

A print-baseline probe using installed Playwright could not launch its default Chromium because the expected bundled headless-shell binary was absent. No baseline screenshot was created by that attempt. Use an already installed system Chrome executable, if available, without installing another browser or altering the user's existing session.

System Chrome at `/usr/bin/google-chrome` was available. Its first sandboxed launch was blocked by `setsockopt: Operation not permitted`; approved scoped execution launched it successfully. A print-media baseline and `/tmp/resume-width-print-before.png` were then captured from the live server with HTTP 200. Postmortem memory lookup `Playwright chromium executable missing system Chrome` returned no applicable missing-browser finding; the existing local-socket limitation applies to the separate sandbox launch failure.

## Lookup and applicability

Postmortem memory search `impeccable engine not installed cache directory` returned no applicable engine-install finding. The `ext-optional-path-discovery` guidance supports using observed paths instead of inherited assumptions. Existing PRODUCT.md and DESIGN.md are absent, so incumbent styles and the running `/resume` page provide the design context.

## Cause, resolution and current status

The optional launcher requires an uninstalled engine and an unwritable home cache. Its documented manual-context fallback was used rather than installing a tool for a small CSS change. The actual stylesheet was read after listing the directory. Live Chrome measured the original résumé at 1180px; the deliberate new-width assertion correctly failed against the requested 816px US Letter width. After the screen-only change, the same assertion passed with width 816px and equal desktop margins. Mobile and tablet fit without overflow. System Chrome confirmed identical print dimensions before and after. Type checking and focused legacy-config lint exited 0. No tool, browser or host configuration was installed or modified.

## Next steps and learning

Verification is complete; optional launcher provisioning, bundled Playwright-browser installation and host sandbox repair remain outside this task. Register this report's final hash as no-new-learning in the canonical postmortem ledger and run its targeted check. Existing environment and path-discovery guidance covers the workarounds; no shared skill instructions need changes.
