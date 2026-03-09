# ChatGPT Prompt: Build a Track Revenue Resume (L1 Technical Support Engineer)

Use this prompt to generate a new resume draft tailored to the Track Revenue posting at:
`/home/kevin/school/job-hunt/job-postings/track-rev.md`

## Attach These Files First

Required:
- `/home/kevin/school/job-hunt/job-postings/track-rev.md`
- `/home/kevin/coding/portfolio-site/lib/resume-data.ts`

Optional:
- `/home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md`

## Copy/Paste Prompt

```text
You are creating a targeted resume draft for this role:
- Technical Support Engineer (L1), Track Revenue Inc. (Markham, ON)

Attached files:
- /home/kevin/school/job-hunt/job-postings/track-rev.md
- /home/kevin/coding/portfolio-site/lib/resume-data.ts
- (optional) /home/kevin/coding/portfolio-site/docs/resume/RESUME_VARIANT_POSITIONING.md

Goal:
Produce one ATS-friendly, recruiter-readable resume draft using ONLY facts already present in lib/resume-data.ts, aligned to the Track Revenue posting (SQL + support + troubleshooting + documentation + escalation).

Primary source rule (strict):
1) Use lib/resume-data.ts as source of truth for claims, technologies, dates, companies, and metrics.
2) Do not invent or import new metrics, tools, responsibilities, timelines, or achievements.

Hard ordering rule (strict):
Under Red Hat Technical Support Engineer Intern experience, include these 5 bullets EXACTLY as written and in this exact order:

1. '<strong>Resolved critical system issues for Fortune 500 clients, improving overall service reliability by 40%</strong> and <strong>preventing recurring technical glitches</strong> for high-priority accounts through proactive root-cause analysis.',
2. '<strong>Managed a high volume of 50+ service requests</strong> across 10 different product areas, demonstrating the <strong>ability to multitask</strong> and <strong>meet tight deadlines</strong> in a fast-paced environment.',
3. '<strong>Standardized setup procedures to eliminate 80% of common user errors</strong>, leading to a smoother first-time experience and a <strong>40% faster successful startup rate</strong>.',
4. '<strong>Streamlined service workflows to reduce wait times by 66%</strong>, successfully <strong>cutting process completion from 45 minutes down to 15 minutes</strong> for a more efficient user experience.',
5. '<strong>Authored a 500+ line comprehensive training manual</strong> and onboarding guide that <strong>reduced the need for manual troubleshooting support by 60%</strong>, enabling new users to resolve issues independently.',

PostgreSQL + SQL project rule (strict):
1) Pick the strongest PostgreSQL project from lib/resume-data.ts for this role.
2) Default to Spotify Visualized unless another PostgreSQL project has clearly stronger SQL evidence in the source.
3) In that project section, make SQL usage explicit using only source-supported details (for example: query optimization, ORM filtering/model indexing, PostgreSQL schema design, many-to-many relationships, query latency improvements).
4) Keep this project as the most prominent project in the resume.

Content-density rule (match existing support resumes):
- Resume summary: 2 lines max.
- Skills: 4 lines max (support + communication + programming + web/cloud style).
- Projects: 1 project, 3 bullets.
- Experience: 2 entries total.
  - Red Hat support entry with the 5 required bullets above.
  - One additional support/sales-adjacent entry with 2 strongest role-relevant bullets.
- Education: 1 entry.
- Target total bullet count across project + experience: 10 bullets (3 + 5 + 2).

Keyword alignment rule:
Naturally cover these posting themes when source-backed: SQL/MySQL, troubleshooting, logs/internal tools, ticket triage, proactive support, escalation quality, documentation updates, issue follow-through, multitasking.

Output format (strict):
1) Professional Summary
2) Skills
3) Projects
4) Work Experience
5) Education
6) Coverage Check: map each major job requirement to the exact bullet(s) that support it
7) Source Integrity Check: list any claims you intentionally excluded because they were not in lib/resume-data.ts

Final self-check before output:
- Confirm the 5 required Red Hat bullets are unchanged and in exact order.
- Confirm PostgreSQL/SQL project is the most prominent project.
- Confirm content density matches the target counts.
- Confirm no invented claims.
```

## Validation Checklist

- Prompt references both required source files.
- Prompt enforces the exact 5-bullet ordering requested.
- Prompt enforces PostgreSQL + SQL-detail project emphasis.
- Prompt enforces content density comparable to existing support resumes.
