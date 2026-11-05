# Résumé commit blocked by email privacy checks

The session-only résumé commit passed its build and PDF checks, but the mandatory staged privacy gate found five email findings. Nothing was committed or pushed. Inspect the supported allowlist/sanitization path and retain the public résumé contact behavior.

Evidence: canonical privacy gate exited 1 with five email location hashes. The findings do not expose their values in output. Root cause and resolution are under investigation; do not bypass hooks or the gate.

Root cause: modified public-contact blobs no longer matched the gate’s existing exact-content review hashes. Read the canonical privacy-gate documentation; its supported public-portfolio-contact review mechanism applies. Compared every flagged email with existing HEAD public contact/README data, without exposing values in diagnostics. Registered five exact-path/content-hash email reviews in the canonical approval ledger. No scanner/hook bypass, no credential exemption and no sanitization applied. There are no installed privacy-gate hook snapshots in this repository to refresh.

Knowledge lookup: privacy gate email returned local-gate-public-metadata-defaults and unrelated browser/token findings. Existing documented public-contact exact-byte review covers this incident; no new general scanner guidance. Candidate build, 16 tests, typecheck, calibration, layout verification and all 25 PDF validations pass. Final privacy check and commit/push are next.

Final result: the exact staged privacy check passed, commit 805ec43 was created, and its full pre-push résumé gate passed in isolation. The commit was pushed successfully to configured origin/main. Public email review hashes remain exact-content/category-specific; no private scanner rules were weakened. Status: resolved.
