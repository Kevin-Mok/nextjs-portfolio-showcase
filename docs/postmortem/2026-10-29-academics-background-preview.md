# Academics background preview restrictions

This records tooling limits encountered while verifying the requested fixed U of T pattern. The implementation uses existing Next.js and CSS; preview tooling requires permissions outside the default sandbox.

## Symptom and evidence

Impeccable context exited 127 because its engine was absent and `/home/kevin/.impeccable/bin/0.1.14` could not be created. The default-sandbox Next listener reported EPERM at 127.0.0.1:3027. Initial browser navigation exceeded its 10-second deadline while Next compiled the route. A browser evaluation before selection reported no selected page. A local Playwright probe found no installed package; no dependency was added. A download in the restricted sandbox produced no file; the permitted download succeeded.

## Lookup and applicability

Canonical postmortem helper search for `impeccable` returned no matching learning. Its installed version does not support the skill-documented `--compact` flag, so lookup used the plain search command. These are environment/tooling limitations, not academic data failures.

## Resolution and status

Read existing source and design guidance directly; do not install the optional design engine. Started Next with permitted execution on port 3027, preserving other listeners. Use the existing Chrome wrapper for runtime verification after compilation. The public U of T signature preview was downloaded with permitted execution and stored locally. Canonical learning ledger updates are outside this worktree's writable roots and remain outstanding; installed skill copies were not modified.

## Single-logo follow-up

On the next user turn the browser still displayed the old rendered page, but reloading returned ERR_CONNECTION_REFUSED: the previous turn's preview process was no longer listening on port 3027. Initial computed CSS therefore described the stale page, not the changed files. Restart the scoped Next preview using the already permitted invocation, reload, and recheck before claiming the new design is verified. Canonical helper lookup for `preview connection refused` returned unrelated fzf/tmux findings; their applicability is rejected because this is a stopped local Next listener, with ERR_CONNECTION_REFUSED as direct evidence.

The permitted preview restart succeeded and the refreshed `/academics` returned HTTP 200. Fresh browser verification confirms the changed CSS, a single SVG logo on white and fixed positioning at desktop/mobile sizes. Typecheck, lint and academic regression checks pass. No new product defect was found. Canonical learning review for this changed report remains outstanding in `/home/kevin/linux-config/dot_agents/skills/postmortem-memory/`, outside the permitted worktree; the existing learning records were left untouched.

## Crest-above-name preview follow-up

The prior preview was still listening when a new start was attempted; Next returned EADDRINUSE on port 3027. The existing listener was preserved and reused for this follow-up rather than stopped. This is the existing preview lifecycle issue described above; no app code or dev-script change is needed. The default-sandbox socket inventory was unavailable (`Cannot open netlink socket: Operation not permitted`), so verify through the actual browser preview. Canonical ledger review remains outstanding at the previously recorded path.
