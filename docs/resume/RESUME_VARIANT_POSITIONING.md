# Resume Variant Positioning

Choose a résumé by the role you are applying for, then review its scope notes and generated PDF before submitting. All 25 master drafts are available through the existing website selector and PDF workflow.

The live typed catalog is exported by `lib/resume-data.ts`, with master-derived copy in `lib/resume-master-variants.mjs`. PDF generation and validation use `scripts/lib/resume-pdf-variants.mjs`. The [master reference](./MASTER_DRAFTS.md) retains the integrated copy and factual caveats; those notes are excluded from recruiter-facing output.

## Positioning Matrix

| Variant ID | Dropdown label | Evidence fit | Intended role |
|---|---|---|---|
| `applied-ai` | Applied AI / LLM Integration | Limited applied-AI fit | Web/automation roles integrating transcription or assisting an AI-focused team. |
| `ai-agentic` | AI/Agentic | Narrow AI scope | Junior developer-tools roles around coding agents and review workflows. |
| `developer-tools` | Developer Tools / Platform Engineering | Strong fit | Junior CLI, developer productivity, and platform tooling roles. |
| `cloud-native` | Cloud Native / Kubernetes | Reference-led specialty | Junior cloud-native engineering roles involving Go operators and Helm. |
| `aws` | AWS/Cloud | Review AWS practice | Junior cloud/infrastructure roles with room for hands-on learning. |
| `aws-python` | AWS + Python | Review AWS practice | Junior Python/cloud automation roles. |
| `backend-api` | Backend / API Engineering | Strong fit | Junior Python/TypeScript backend and API roles. |
| `aws-web-dev` | AWS + Web Dev | Review AWS practice | Junior web roles with infrastructure responsibilities. |
| `ai-web-dev` | AI + Web Dev | Narrow AI scope | Junior full-stack roles that value AI workflow tooling. |
| `automation-data` | Automation / Data Pipelines | Strong fit | Junior automation, ingestion, and data-tooling roles. |
| `python` | Python | Strong fit | Junior Python backend and automation roles. |
| `web-dev-django` | Python + Django | Historical framework evidence | Junior Django/backend roles accepting historical project evidence. |
| `python-nerdwallet` | Python · AI Automation Sample | Existing tailored sample | Preserved employer-specific sample; re-tailor against a supplied posting. |
| `support-automation` | Support Automation Engineering | Adjacent junior fit | Technical support tooling and workflow automation roles. |
| `frontend` | Frontend Engineering | Strong fit | Junior React/TypeScript interface roles. |
| `web-dev` | Web Development | Strong fit | Junior frontend/full-stack application roles. |
| `browser-extensions` | Browser Extension Development | Focused project fit | Junior JavaScript/browser integration roles or extension contracts. |
| `qa-automation` | QA / Test Automation | Adjacent junior fit | Junior quality engineering roles emphasizing validation and regression fixtures. |
| `linux-self-hosting` | Linux / Self-Hosted Infrastructure | Focused project fit | Junior Linux operations, hosting, and automation roles. |
| `technical-documentation` | Developer Documentation / Technical Writing | Adjacent junior fit | Junior developer documentation and technical enablement roles. |
| `it-support-aws` | IT Support + AWS | Review AWS and support scope | Junior cloud-support roles accepting practice-based AWS exposure. |
| `it-support-sql` | IT Support + SQL | Transferable support fit | Application support roles involving relational data and import troubleshooting. |
| `it-support` | IT Support | Transferable support fit | Technical support roles valuing Linux, documentation, and service investigation. |
| `sales` | Sales | Transferable sales fit | Customer-facing digital-goods sales and entry-level sales operations. |
| `call-centre` | Call Centre | Transferable service fit | Entry-level customer service roles with training on phone and queue systems. |

The selector follows the user-requested category ranking, starting with Applied AI / LLM Integration. Salary estimates are not displayed. The default remains AI + Web Dev independently of its position in the list.

## Selection and downloads

Open `/resume?variant=developer-tools` or choose any variant in the selector. Downloads use `kevin-mok-resume-<variant-id>.pdf` under `/resume/`. The existing fourteen IDs and filenames remain stable; `ai-web-dev` remains the default. Projects lead for AI/Agentic, Developer Tools and Browser Extension Development; the remaining drafts lead with Experience.

All master drafts retain the Cloud/Software Engineer Intern Red Hat entry. Support and service variants emphasize transferable evidence rather than asserting a separate support employment history. AWS practice, employment/education dates and current marketplace status retain the master’s stated verification limits. Applied AI covers transcription and workflow tooling, without claiming RAG, model training or LLM integration expertise.

For future changes edit the live typed copy, update matching source references when evidence changes, regenerate PDFs, calibrate, and run both layout gates. The Markdown master is a reference snapshot, not a runtime input. Its parity regression intentionally detects divergence so copy changes require an explicit reference update or reviewed migration of that test.
