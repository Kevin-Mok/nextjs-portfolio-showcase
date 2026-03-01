# ChatGPT Prompt: Generate GitHub Bio + Status + Repo About/Topics

Use this prompt to generate recruiter-facing GitHub profile copy for this repository in one pass.

## Copy/Paste Prompt

```text
You are writing GitHub profile and repository copy for a junior candidate's personal portfolio repo.

Repository context:
- Repo: portfolio-site
- Stack: Next.js 15, React, TypeScript, Tailwind CSS, Node.js
- Positioning: Junior Web Developer candidate, production-minded frontend engineering
- Credibility signals to preserve: Ex-Cloud Engineer Intern @ Red Hat, Linux/FOSS focus, CS @ UofT

Goals:
1) Write a GitHub bio with an immediate hiring hook for Junior Web Developer roles.
2) Add emoji while keeping it professional.
3) Add an 80-character status line with emoji.
4) Provide repo About and Topics copy for this portfolio project.

Output format (exact sections):

## Objective
- 3-4 concise bullets.

## Final Outputs
Bio:
<single line>

Status (80-char target):
<single line>

Repo About:
<single line>

Repo Topics:
<comma-separated list>

## Rationale (short)
- Why first words are job-search focused.
- Why Red Hat + Linux/FOSS + CS @ UofT are kept.
- Why emoji use is minimal and intentional.

## Reusable Templates
Alternate bios:
- 3 options, same positioning, different wording.

Alternate status lines (near 80 chars):
- 3 options, each with emoji.

Alternate repo About lines:
- 3 options.

Alternate repo Topics sets:
- 3 comma-separated sets.

Hard constraints:
- Keep everything concise, recruiter-facing, and copy-paste ready.
- Keep tone professional, not casual.
- Do not invent claims, employers, or achievements.
- Mention this repo directly in at least one final output line (bio, status, or about).
- Keep topics relevant to this repo (no generic buzzword spam).
```

## Optional Refinement Prompt

```text
Tighten all lines by 10-15% while preserving meaning. Keep the hiring hook first and avoid adding new claims.
```
