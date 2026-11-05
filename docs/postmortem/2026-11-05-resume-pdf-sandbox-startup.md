# Résumé PDF server could not start in the sandbox

The Next.js compilation succeeded, but the build's PDF stage could not start its local server. Retry the existing generation workflow with scoped host access; preserve existing listeners.

## Evidence and impact

`npm run build` compiled successfully and passed its lint/type phase. The PDF generator exited 1 with `Next.js server exited early with code 1` and empty child diagnostics. A read-only socket inventory also reported `Cannot open netlink socket: Operation not permitted`. No new PDF output was accepted as verified.

## Investigation

Read the postmortem-memory skill and searched `Next.js server exited early localhost sandbox`. Container ownership and unrelated runtime findings did not fit this symptom. Host-access retry will distinguish sandbox restrictions from a product startup defect. Root cause is provisional until that succeeds.

## Status and next steps

Host-access `npm run build` exited 0 and generated all 25 PDFs. This supports sandbox startup restrictions as the initial cause; no product startup change was needed. Calibration is running with the same scoped access.

A concurrent preview launch then failed with Next.js’s explicit missing-production-build error because calibration had already begun rebuilding `.next`. This is a separate, confirmed sequencing issue: wait until calibration finishes before starting the preview. Do not run `next start` against a build directory being replaced.

Resolved: final calibration and both validation gates exited 0 for all 25 PDFs. After calibration completed, `npm run start -- --hostname 127.0.0.1 --port 4327` started successfully. Chrome verified the selector and all 25 downloads (HTTP 200, application/pdf), plus mobile layout and homepage entry points.

Learning: a narrower lookup of `ext-sandbox-loopback` confirmed its existing scoped-host-access workaround applies; default sandbox startup itself was not repaired. Concurrent preview/build sequencing is recorded in `tasks/lessons.md`. No new general guidance beyond those existing environment and sequential-build principles.
