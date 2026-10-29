# Academic record commit privacy check

This report tracks the staged privacy check during the session-only academic-page commit. It records categories and safe repair evidence without reproducing flagged values.

## Symptom and impact

On 2026-10-28 the required canonical privacy gate blocked the staged commit with 14 findings in the email and IP-address categories. No commit or push was attempted. The staged candidate contained the 15 directly evidenced academic feature, test, prompt and documentation files.

## Evidence and current status

The canonical staged-byte check exited 1 and reported both categories. Safe detailed hashes were mapped locally to Git paths. The gate scans the entire indexed tree, not only changed files. A diagnostic check of the unchanged HEAD tree also exited 1 with 13 findings. The original 14-finding candidate added one SSH-remote string that the heuristic interpreted as an email address. The source transcript PDF and identifying headers remain excluded from the candidate.

## Investigation and next steps

The canonical postmortem search for `privacy gate documentation email ip address examples` returned `local-privacy-reviewed-content-approvals`; that reference was read before repairs. Its exact-content review workflow applies, but existing approval categories cannot simply waive the remaining email/IP categories. No shared scanner, approval policy, hook or private rule was modified.

The session-owned README documentation example was replaced with plain instructions to use a verified sender address. The plan's public Git remote was expressed as its equivalent HTTPS repository URL. After restaging these safe text repairs, the same canonical gate reported 12 findings, all in unchanged baseline files: `app/projects/[slug]/page.tsx`, `components/layout/parallax/sections/ParallaxContactSection.tsx`, `components/tiles/NeofetchTile.tsx`, `content/blog/local-ai-prepping-2025/index.mdx`, three existing resume maintenance/reference documents, `docs/specs/CONTACT_FORM_SPEC.md`, `lib/resume-data.ts`, the existing blog audio asset, the profile JPEG and `public/window.svg`.

## Verification and blocked delivery

The feature's 11 tests, typecheck and lint passed freshly before staging. The repaired candidate contains only the 15 directly evidenced session files plus this required incident report. No commit or push has been attempted, because the skill requires findings and scanner errors to block committing. Changing unrelated contact/resume data or existing binary assets would violate the session-only scope; changing the shared privacy policy would require a separately reviewed scope extension. The prepared candidate remains staged, preserving all source work and existing hooks.

## Follow-up and learning

Request authorization for a scoped investigation and repair of these unchanged baseline privacy-gate findings, preserving intended public contact behavior and assets, then rerun the exact staged gate before any commit. No new reusable remedy is claimed: this repeats the existing exact-candidate privacy workflow, with unresolved findings explicitly retained. Register this reviewed report hash and its no-new-learning decision in the canonical ledger and run the targeted coverage check.

## Authorized resolution on 2026-10-29

The user clarified that this is an intentionally public self-promotional portfolio and authorized accounting for that purpose in the gate, creating an academics worktree, and completing commit/push. `AGENTS.repo.md` now records intended public identity, contact information, coursework and approved media while keeping secrets and raw transcript identifiers blocked.

Local review confirmed that email findings cover intended public contact information, a public article URL, and incidental compressed media bytes. IP findings are decimal SVG path coordinates rather than network addresses. The existing shared exact-path/full-content-hash/category approval mechanism was extended to accept reviewed email/IP categories; it received 12 reviewed entries rather than a blanket repository exemption. No baseline portfolio content was deleted or redacted. Explicit private literals, private paths, credentials, provider tokens and private keys retain their blocking checks.

The defining installed-hook test first rejected the newly supported approval categories. After the one-line schema extension, five targeted checks, the full 59-test privacy suite and the frozen-tree integration passed. Tests cover exact-byte approval, revocation after edits, private-policy priority, and continued blocking of secrets/private paths. A supplemental syntax check tried writing a cache outside writable roots; a no-write compile check verified syntax without altering source. The actual portfolio staged-byte gate now exits 0 in `.worktrees/academics` on branch `feat/academics`. Feature tests, typecheck, lint and full build also pass in that worktree; all 13 resume PDFs were generated as ignored artifacts. Commit and push will retain the active hooks and use ordinary fast-forward/new-branch publication.
