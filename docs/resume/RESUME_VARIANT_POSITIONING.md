# Resume Variant Positioning

This document maps each active resume variant to its intended positioning.

Source of truth:
- `lib/resume-data.ts` (`resumeVariants`)
- `scripts/lib/resume-pdf-variants.mjs` (`resumePdfVariants`)

Canonical active variants: 13

## Positioning Matrix

| Variant ID | Dropdown Label | PDF File | Purpose | What it is trying to sell |
|---|---|---|---|---|
| `ai-web-dev` | AI + Web Dev | `kevin-mok-resume-ai-web-dev.pdf` | Hybrid recruiter-facing full-stack web resume | High-output full-stack web developer who combines product-ready Next.js delivery with agentic-engineering leverage and Linux-based workflow automation. |
| `web-dev` | Web Development | `kevin-mok-resume-web-dev.pdf` | Frontend/full-stack applications | TypeScript/React/Node developer who can build and ship web features quickly. |
| `ai-agentic` | AI/Agentic | `kevin-mok-resume-ai-agentic.pdf` | Devtools and agentic engineering roles | Product-minded engineer for terminal-native workflows, Linux/devtools automation, local AI tooling, and human-in-the-loop agent systems. |
| `aws` | AWS/Cloud | `kevin-mok-resume-aws.pdf` | Infrastructure and cloud operations | Cloud/platform engineer focused on AWS, Kubernetes, Terraform, uptime, and deployment reliability. |
| `python` | Python | `kevin-mok-resume-python.pdf` | Python-centric backend work | Python/Django engineer with backend architecture and data-heavy app experience. |
| `aws-web-dev` | AWS + Web Dev | `kevin-mok-resume-aws-web-dev.pdf` | Cross-functional cloud + web role | Engineer who bridges infrastructure ownership with web product delivery. |
| `aws-python` | AWS + Python | `kevin-mok-resume-aws-python.pdf` | Cloud automation with Python backend depth | Engineer who combines Python backend execution with AWS/Kubernetes operations. |
| `web-dev-django` | Python + Django | `kevin-mok-resume-web-dev-django.pdf` | Django-oriented web/backend positions | Python web engineer with Django strength plus production-facing development history. |
| `it-support` | IT Support | `kevin-mok-resume-it-support.pdf` | Technical support and incident handling | Tier 1/2 support profile focused on triage, troubleshooting, KB writing, and user communication. |
| `it-support-sql` | IT Support + SQL | `kevin-mok-resume-it-support-sql.pdf` | SQL-forward support and troubleshooting roles | Tier 1/2 support engineer with PostgreSQL-backed query optimization and documentation-heavy troubleshooting outcomes. |
| `it-support-aws` | IT Support + AWS | `kevin-mok-resume-it-support-aws.pdf` | Support roles touching cloud systems | Support engineer who can troubleshoot user issues and operate in AWS/cloud environments. |
| `sales` | Sales | `kevin-mok-resume-sales.pdf` | Customer-facing sales and support operations | Revenue-aware operator with negotiation, dispute handling, and measurable marketplace outcomes. |
| `call-centre` | Call Centre | `kevin-mok-resume-call-centre.pdf` | High-volume call/chat/email support | Call centre candidate with de-escalation, SLA awareness, queue handling, and clear customer communication. |

## Notes

- Default variant in the app is `ai-web-dev` (default recruiter-facing hybrid web + agentic engineering focus).
- `web-dev` remains the narrower web-only option when a job application should downplay the agentic-engineering story.
- `ai-agentic` remains the focused devtools/agentic platform variant and is intentionally separate from the default hybrid resume.
- Recruiter one-liner (HR-safe, short format):
  `Ex-Cloud Engineer Intern @ Red Hat. Full-stack + cloud engineer (TypeScript/React, AWS/Kubernetes). Linux/FOSS advocate. CS @ UofT.`
- `sales` and `call-centre` share similar support language but differ in emphasis:
  - `sales`: sales/owner-operator outcomes first.
  - `call-centre`: support workflow and service operations first.
