# ChatGPT Prompt: Add an AI/Agentic Resume Variant

Use this prompt when you want ChatGPT to add a first-class AI/agentic resume variant inside `portfolio-site`, using only source-backed evidence from your existing resume data, Red Hat contributions, and the three project repos you want emphasized.

## Attach These Files First

Required resume system context:
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
- `/home/kevin/coding/portfolio-site/scripts/lib/resume-pdf-variants.mjs`
- `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- `/home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md`

Required source evidence:
- `/home/kevin/coding/red-hat-contributions/RED-HAT-CONTRIBUTIONS.md`
- `/home/kevin/linux-config/README.md`
- `/home/kevin/linux-config/docs/graphiti-mcp-codex.md`
- `/home/kevin/Documents/chess/README.md`
- `/home/kevin/Documents/chess/docs/LOCAL_AI_SETUP.md`
- `/home/kevin/coding/openclaw/README.md`
- `/home/kevin/coding/openclaw/docs/openclaw-architecture.md`

Optional if you want ChatGPT to refresh summary/index docs when they become stale:
- `/home/kevin/coding/portfolio-site/docs/resume/README_RESUME.md`
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_DOCS_INDEX.md`

## Copy/Paste Prompt

```text
You are adding a new AI/agentic resume variant inside portfolio-site.

Attached files:
- /home/kevin/coding/portfolio-site/lib/resume-data.ts
- /home/kevin/coding/portfolio-site/scripts/lib/resume-pdf-variants.mjs
- /home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css
- /home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md
- /home/kevin/coding/portfolio-site/docs/resume/resume-generation-spec.md
- /home/kevin/coding/red-hat-contributions/RED-HAT-CONTRIBUTIONS.md
- /home/kevin/linux-config/README.md
- /home/kevin/linux-config/docs/graphiti-mcp-codex.md
- /home/kevin/Documents/chess/README.md
- /home/kevin/Documents/chess/docs/LOCAL_AI_SETUP.md
- /home/kevin/coding/openclaw/README.md
- /home/kevin/coding/openclaw/docs/openclaw-architecture.md
- optional: /home/kevin/coding/portfolio-site/docs/resume/README_RESUME.md
- optional: /home/kevin/coding/portfolio-site/docs/resume/RESUME_DOCS_INDEX.md

Goal:
Add one first-class AI/agentic resume variant that sells me as a product-minded engineer for an agentic development platform: terminal-native, Linux/devtools-heavy, automation-oriented, documentation-strong, and comfortable building human-in-the-loop AI workflows.

This should read like a devtools / agentic platform candidate, not a generic frontend SaaS candidate.

New variant requirements (strict):
1) Add exactly one new variant:
   - id: `ai-agentic`
   - label: `AI/Agentic`
   - fileName: `kevin-mok-resume-ai-agentic.pdf`
2) Keep all existing variant IDs and file names unchanged.
3) Keep the current recruiter-facing default variant unchanged; do not reorder the app so `ai-agentic` becomes default.
4) Update any canonical active-variant docs or counts that become stale after adding this variant. At minimum, update `docs/resume/RESUME_VARIANT_POSITIONING.md`.

Primary source policy (strict):
1) Use `lib/resume-data.ts` as the source of truth for resume structure, contact info, education, existing formatting patterns, and any reused existing work/project bullets.
2) Use `RED-HAT-CONTRIBUTIONS.md` as the authoritative source for Red Hat cloud/devtools/open-source contribution bullets and metrics.
3) Use the three attached project repos as the authoritative source for the new AI/agentic project bullets:
   - `linux-config`
   - `Documents/chess`
   - `openclaw`
4) Do not invent or import any claims, metrics, technologies, dates, employers, outcomes, or responsibilities that are not supported by the attached files.

Fixed date defaults for the three project entries (strict):
1) `linux-config` must use `Mar 2026 — Present`.
   - Do not use the repo’s older 2017 dotfiles origin; this variant should sell the current agentic-engineering chapter documented in the March 2026 README/plans.
2) `Documents/chess` must use `Mar 2026 — Present`.
3) `openclaw` must use `Mar 2026 — Present`.

Variant positioning rules:
1) Optimize for a broad AI/agentic Software Engineer story with Implementation Engineer overlap:
   - agentic development workflows
   - terminal/CLI depth
   - Linux/shell fluency
   - local/cloud AI tooling instincts
   - debugging, documentation, and developer empathy
   - automation with human-in-the-loop review
2) Do not over-index on generic UI polish, sales language, or traditional CRUD web-app framing.
3) Prefer evidence that shows I build tooling for developers and keep workflows reproducible, inspectable, and resilient.

Required project selection (strict):
1) Include all three of these projects in the new variant:
   - `/home/kevin/linux-config`
   - `/home/kevin/Documents/chess`
   - `/home/kevin/coding/openclaw`
2) Target 5-6 total project bullets:
   - `linux-config`: 2 bullets
   - `openclaw`: 2 bullets
   - `Documents/chess`: 1-2 bullets
3) If one-page fit gets tight, keep all three projects and reduce bullet count before dropping any project entirely.

Project content guidance (strict):
1) `linux-config` should emphasize:
   - the `four-Codex` operating environment
   - versioned AGENTS / Codex config / skills / plans
   - reproducible Linux + terminal-agent workflow
   - Graphiti MCP memory integration when helpful
   - concrete specifics such as `4` Codex roles, `40` local skills, `36` scripts, or `stdio + Neo4j` Graphiti setup only when they improve scanability
2) `Documents/chess` should emphasize:
   - local-first CLI analysis
   - Stockfish + Lc0 + Ollama / `llama-cli`
   - deterministic fallback behavior
   - contract tests / regression checks
   - human-coaching style output on top of forensic analysis
3) `openclaw` should emphasize:
   - fixture-first job-ops pipeline
   - terminal-first agent workspace
   - SQLite as canonical state
   - Discord reconstruction from DB state
   - browser-backed Indeed / X syncs with auth/block handling
   - test-backed ingest/sync metrics when they are concise and defensible

Red Hat experience policy (strict):
1) Keep both Red Hat entries in the variant unless one-page fit makes that impossible.
2) Prioritize cloud/devtools/open-source Red Hat bullets before support bullets.
3) Preferred Red Hat cloud evidence order:
   - `50+ merged PRs` across `10` repos and `7,000+` lines of production-ready code
   - founded the `kogito-helm-charts` repository
   - Kubernetes startup probes / deployment stability / operator improvements
   - `472-line` onboarding guide
   - cross-platform CLI or config automation support
4) Use Red Hat support bullets only as secondary proof for debugging, documentation, and user empathy. Strong candidates:
   - `500+ line` training manual
   - Fortune 500 troubleshooting / reliability improvement
   - cross-platform debugging for Windows, Linux, and macOS

Resume-shaping rules:
1) Summary: max 2 lines. Position me as a product-minded engineer building agentic workflows, local AI tools, and Linux/devtools automation for developer users.
2) Skills: max 4 lines. Lead with Linux, Bash/shell, Git, TypeScript/Node.js, Python, Go, Docker/Kubernetes, AI/agent tooling, documentation/debugging.
3) Projects: 3 projects, 5-6 bullets total.
4) Experience: target 2 Red Hat entries with about 5 total bullets combined.
5) Education: 1 entry.
6) Preserve the repo’s existing recruiter-readable style: concise, quantified when supported, strong ownership verbs, no hype without proof.

One-page fit workflow (strict order):
1) Add the new variant content in `lib/resume-data.ts`.
2) Register the new PDF variant in `scripts/lib/resume-pdf-variants.mjs`.
3) Reduce bullet counts and skill density until the new variant fits.
4) Only if content pruning is insufficient, add or tune variant-specific print controls in `app/styles/13-resume-latex.css`:
   - `--resume-print-scale`
   - `--resume-print-leading`
   - `--resume-print-top-offset`

Likely wiring points that must stay consistent:
- `ResumeVariantId`
- `resumeVariants`
- any ordered variant lists / active variant arrays
- Red Hat section mapping/assertion logic
- `resumePdfVariants`
- docs that enumerate canonical active variant count or the new variant’s positioning

Edit scope:
- Required:
  - `/home/kevin/coding/portfolio-site/lib/resume-data.ts`
  - `/home/kevin/coding/portfolio-site/scripts/lib/resume-pdf-variants.mjs`
  - `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`
- Optional, only if needed:
  - `/home/kevin/coding/portfolio-site/app/styles/13-resume-latex.css`
  - `/home/kevin/coding/portfolio-site/docs/resume/README_RESUME.md`
  - `/home/kevin/coding/portfolio-site/docs/resume/RESUME_DOCS_INDEX.md`
- Do not modify unrelated files.

Output requirements (strict):
1) Return unified diffs only.
2) Include diffs only for files you changed.
3) Before diffs, include:
   - the final project/experience selection summary for `ai-agentic`
   - bullet counts by section
   - any claims you softened or omitted because the evidence was too weak or too dense for one page

Acceptance checks to run and report:
- `npm run build`
- `npm run calibrate:resume-layout`
- `npm run verify:resume-layout`
- `npm run validate-resume-pdfs`

Manual checks to run and report:
- confirm `/resume?variant=ai-agentic` renders
- confirm the PDF exists at `public/resume/kevin-mok-resume-ai-agentic.pdf`
- confirm the new variant stays on one US Letter page

Failure handling:
If any validation step fails, update the diffs, rerun the full failing checks, and report the final passing state.
```

## Validation Checklist

- The prompt adds a new first-class `ai-agentic` variant instead of mutating an existing generic variant.
- The prompt requires all 3 requested projects: `linux-config`, `Documents/chess`, and `openclaw`.
- The prompt uses `RED-HAT-CONTRIBUTIONS.md` as the primary Red Hat cloud/devtools source and keeps support bullets secondary.
- The prompt locks the project date defaults to `Mar 2026 — Present`.
- The prompt preserves one-page PDF validation requirements and instructs ChatGPT to return unified diffs only.

## Notes

- This workflow is for adding a new company-specific resume variant inside the existing `portfolio-site` resume system.
- It intentionally favors an AI/agentic devtools platform story over a generic full-stack web story.
