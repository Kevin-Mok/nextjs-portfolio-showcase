# Résumé push hook encountered a shared build failure

The résumé commit is local and intact. Its mandatory pre-push hook encountered webpack errors while calibration rebuilt the shared working tree, which has ongoing unrelated default/gallery/navigation changes. The exact session-only candidate already passed its isolated build and all PDF gates.

Current status: hook is performing its configured retry. Inspect diagnostic evidence, preserve all live work, and if needed rerun the same active hook from the isolated exact-commit checkout instead of rebuilding a shared `.next` directory. Do not bypass hooks or reset user work.

## Resolution and verification

The hook’s first retry eventually calibrated successfully but refused the push because its complete working-tree status changed during concurrent unrelated work. Logs explicitly named the missing gallery route during compilation and later reported the status change. This is a shared working-tree race, not a failure of the committed résumé content.

Used an archive of exact commit 805ec43 in `/tmp/resume-session-verify` with the real Git directory and an explicit isolated GIT_WORK_TREE. Retried the exact commit refspec through the unchanged configured `.githooks/pre-push`. Both builds, calibration, whitespace checks and all 25 PDF validations passed; the hook printed `Resume gate passed`. Push exited 0 and advanced configured origin/main from b51faa9 to 805ec43. GitHub redirects that remote to Kevin-Mok/nextjs-portfolio-showcase. No hooks were disabled and no live source files were reset.

Status: resolved by isolated execution. Concurrent edits remain local. Reuse the existing isolated-checkout and sequential-build principles; no new general guidance beyond the recorded repository sequencing lesson. Prior lookup/report `2026-11-05-resume-pdf-sandbox-startup.md` established that shared builds replace generated state; this incident independently demonstrates that concurrent source/status changes can also invalidate a pre-push gate.
