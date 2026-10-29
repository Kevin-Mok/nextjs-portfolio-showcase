# Academic record inspection path lookups

This report records read-only inspection failures during academic-page planning and their recovery, so later work can use discovered paths instead of guesses.

## Symptom and impact

On 2026-10-28, planning commands tried nonexistent `personal_context.py`, an incorrect installed Ponytail skill path, and a guessed resume test filename. No product files changed during these failed reads. During implementation the optional Impeccable launcher could not find its engine and could not create a cache outside writable roots; existing theme/source guidance remained available.

## Evidence and lookup

Commands reported missing files for the guessed paths. Inventory showed the actual personal-context helper is `scripts/context_store.py`, Ponytail is installed under its plugin cache, and existing tests include `scripts/lib/resume-variant-ai-web-dev.test.mjs`. The canonical postmortem helper was searched for `personal context helper missing file path`; reference `local-discover-paths-before-reads` applies because its recorded symptom and remedy match these guessed read paths. The reference was read before the corrected reads.

## Root cause and resolution

The inspection assumed filenames rather than discovering them. Using `rg --files` and then reading the actual paths resolved the reads. The optional design engine failure was handled by its documented fallback to the project's existing theme and craft references. No engine installation or cache permission change was attempted.

## Verification and status

Resolved read-only workflow issue: the correct context helper and test files were read successfully. This is not evidence of product runtime behavior. Planning-mode restrictions deferred the report until implementation was requested. The canonical learning ledger records an explicit no-new-learning decision: this repeats existing discovered-path guidance and adds no new engineering remedy. Later guessed diagnostic log names were also resolved by inventorying `/tmp/academics-checks` before reading the actual final logs.

## Follow-up

Use discovered paths before reads. Retain the current project's existing theme context when optional design engines are unavailable. The reviewed report hash is registered in the canonical learning ledger; its targeted coverage check is required before handoff.
