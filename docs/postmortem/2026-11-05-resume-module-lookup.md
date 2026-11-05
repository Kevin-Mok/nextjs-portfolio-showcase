# Résumé module lookup used an unverified filename

An exploratory read named a nonexistent layout module. Use the known registry and baseline modules to continue; no application files or running services were affected.

- Symptom/evidence: `sed: can't read scripts/lib/resume-layout-config.mjs: No such file or directory` during read-only exploration.
- Impact: one irrelevant read failed; no product impact or data changes.
- Root cause: guessed a module filename before checking its existence.
- Resolution: use `scripts/lib/resume-pdf-variants.mjs` and the modules imported by `scripts/calibrate-resume-layout.mjs`.
- Verification: the calibration source imports the existing registry, baseline, metrics and solver modules.
- Status: resolved; no retry needed. Follow-up: use exact imported paths. This is an existing general lesson, with no new reusable guidance.

Knowledge lookup: searched `nonexistent module filename`; returned runtime/import findings do not apply to a read-only missing-path lookup. Existing exact-path discovery guidance covers the incident; no new reusable learning.
