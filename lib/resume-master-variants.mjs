// @ts-check
/** @typedef {import('./resume-data').ResumeVariantDefinition} ResumeVariantDefinition */

/** Draft copy from docs/resume/MASTER_DRAFTS.md; detailed evidence remains in the local master. */
/** @type {ResumeVariantDefinition[]} */
export const masterResumeVariants = [
  {
    id: "ai-web-dev", label: "AI + Web Dev", fileName: "kevin-mok-resume-ai-web-dev.pdf",
    showSummary: true, summary: "Developer combining TypeScript web applications, Python session analytics, and local Whisper transcription workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Built a typed Directus content provider, validating CMS posts and media against the application content model.",
            "Validated contact submissions with Zod, returning structured API responses with optional database persistence.",
            "Automated local Whisper transcription with dated output paths, skipping existing transcripts during repeated runs.",
          ],
        },
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Merged overlapping session intervals and subtracted recorded waits to avoid double-counting concurrent work.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
          ],
        },
      ],
      skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Python", "SQLite", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "web-dev", label: "Web Development", fileName: "kevin-mok-resume-web-dev.pdf",
    showSummary: true, summary: "Web developer building typed React interfaces, Next.js content integrations, and validated API workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Built a typed Directus content provider, validating CMS posts and media against the application content model.",
            "Validated contact submissions with Zod, returning structured API responses with optional database persistence.",
            "Added token-protected cache revalidation with validated payloads, allowing authorized API requests to invalidate selected Next.js cache entries.",
          ],
        },
        { name: "Portfolio and Resume Pipeline", url: "https://github.com/Kevin-Mok/nextjs-portfolio-showcase", languages: ["Next.js", "React", "TypeScript", "Node.js", "headless Chrome"], date: "Jan - Oct 2026",
          bullets: [
            "Implemented resume rendering from typed data and reusable React sections, applying document typography and print rules.",
            "Built an academic-record explorer with typed course data, filter controls, and sortable columns for subject and year views.",
            "Automated resume PDF generation with headless Chrome, constructing render URLs and waiting for the local Next.js server.",
          ],
        },
      ],
      skills: ["TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Zod", "Git", "Linux", "Docker"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "ai-agentic", label: "AI/Agentic", fileName: "kevin-mok-resume-ai-agentic.pdf",
    showSummary: true, summary: "Developer building local coding-session analytics and inspectable job-review workflows with persisted state and explicit human review.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "projects-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
            "Added token reports grouped by model, session, and directory, separating observed usage from estimated API-equivalent costs.",
          ],
        },
        { name: "OpenClaw Job Operations", url: "https://github.com/Kevin-Mok/openclaw", languages: ["TypeScript", "Node.js", "SQLite", "OpenClaw"], date: "Mar 2026",
          bullets: [
            "Built fixture-driven ingestion with normalized duplicate keys and SQLite upserts, retaining source and review information for job leads.",
            "Preserved manual approval and application states when duplicate job evidence arrived, preventing ingestion from resetting review decisions.",
            "Added resume-variant routing against a local catalog, recording candidate fit and evidence gaps for human review.",
          ],
        },
      ],
      skills: ["Python", "TypeScript", "Node.js", "SQLite", "JSONL", "OpenClaw", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "aws", label: "AWS/Cloud", fileName: "kevin-mok-resume-aws.pdf",
    showSummary: true, summary: "Developer with Kubernetes operator contributions, self-hosted service configuration, and AWS EC2/Terraform infrastructure practice.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Implemented Helm deployment templates and configuration for PostgreSQL, Kafka, and Prometheus integration.",
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "AWS Infrastructure Practice", url: "https://github.com/Kevin-Mok/terraform-deploys", languages: ["AWS EC2", "Terraform", "Docker", "Kubernetes"], date: "May - Jun 2024",
          bullets: [
            "Configured Terraform provisioning for an AWS EC2 t2.micro instance, including instance naming and IP/ID outputs.",
            "Organized declarative infrastructure configuration into provider settings, variables, and outputs to expose instance details after provisioning.",
          ],
        },
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Defined Nginx virtual hosts for personal sites and hosted services, mapping configured domains to service routes.",
            "Added Docker Compose configuration and matching Nginx routing for a blog hosted on a VPS.",
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
          ],
        },
      ],
      skills: ["AWS EC2 and Terraform (practice)", "Kubernetes", "Helm", "Docker", "Nginx", "Go", "Linux", "Bash", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "python", label: "Python", fileName: "kevin-mok-resume-python.pdf",
    showSummary: true, summary: "Python developer building incremental ingestion, session accounting, asynchronous workflows, and historical Django data import tools.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Implemented marketplace listing state transitions with invalid-transition rejection, separating lifecycle rules from Discord command presentation.",
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
            "Implemented customer, staff, and developer permission tiers, applying command checks and fallbacks for unconfigured role mappings.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Merged overlapping session intervals and subtracted recorded waits to avoid double-counting concurrent work.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
          ],
        },
        { name: "Spotify Library Dashboard", url: "https://github.com/Kevin-Mok/spotify-library-intelligence-dashboard", languages: ["Python", "Django", "PostgreSQL"], date: "Nov 2018",
          bullets: [
            "Implemented listening-history CSV upload and server-side import, converting exported play records into database-backed dashboard history.",
            "Added incremental listening-history ingestion after the latest stored event, avoiding repeated insertion of previously imported records.",
            "Added a Django management command that runs the existing history importer through a repeatable administrative entry point.",
          ],
        },
      ],
      skills: ["Python", "SQLite", "Django", "PostgreSQL", "asyncio", "JSONL", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "aws-web-dev", label: "AWS + Web Dev", fileName: "kevin-mok-resume-aws-web-dev.pdf",
    showSummary: true, summary: "Web developer combining TypeScript/Next.js delivery with Kubernetes contributions and AWS EC2/Terraform infrastructure practice.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Implemented Helm deployment templates and configuration for PostgreSQL, Kafka, and Prometheus integration.",
          ],
        },
      ],
      projects: [
        { name: "AWS Infrastructure Practice", url: "https://github.com/Kevin-Mok/terraform-deploys", languages: ["AWS EC2", "Terraform", "Docker", "Kubernetes"], date: "May - Jun 2024",
          bullets: [
            "Configured Terraform provisioning for an AWS EC2 t2.micro instance, including instance naming and IP/ID outputs.",
            "Organized declarative infrastructure configuration into provider settings, variables, and outputs to expose instance details after provisioning.",
          ],
        },
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Built a typed Directus content provider, validating CMS posts and media against the application content model.",
            "Validated contact submissions with Zod, returning structured API responses with optional database persistence.",
            "Added token-protected cache revalidation with validated payloads, allowing authorized API requests to invalidate selected Next.js cache entries.",
          ],
        },
      ],
      skills: ["TypeScript", "React", "Next.js", "Node.js", "AWS EC2 and Terraform (practice)", "Kubernetes", "Docker", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "aws-python", label: "AWS + Python", fileName: "kevin-mok-resume-aws-python.pdf",
    showSummary: true, summary: "Python developer combining incremental data tooling with Kubernetes engineering context and AWS EC2/Terraform infrastructure practice.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Implemented marketplace listing state transitions with invalid-transition rejection, separating lifecycle rules from Discord command presentation.",
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
          ],
        },
      ],
      projects: [
        { name: "AWS Infrastructure Practice", url: "https://github.com/Kevin-Mok/terraform-deploys", languages: ["AWS EC2", "Terraform", "Docker", "Kubernetes"], date: "May - Jun 2024",
          bullets: [
            "Configured Terraform provisioning for an AWS EC2 t2.micro instance, including instance naming and IP/ID outputs.",
            "Organized declarative infrastructure configuration into provider settings, variables, and outputs to expose instance details after provisioning.",
          ],
        },
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Merged overlapping session intervals and subtracted recorded waits to avoid double-counting concurrent work.",
            "Added a reconciliation scheduler that preserves unfinished ingestion across bounded scan cycles and notification-driven background updates.",
          ],
        },
      ],
      skills: ["Python", "SQLite", "AWS EC2 and Terraform (practice)", "Kubernetes", "Docker", "Linux", "Bash", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "web-dev-django", label: "Python + Django", fileName: "kevin-mok-resume-web-dev-django.pdf",
    showSummary: true, summary: "Python developer with Django ingestion and relational history modeling, plus recent asynchronous marketplace and session-analysis tooling.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Implemented marketplace listing state transitions with invalid-transition rejection, separating lifecycle rules from Discord command presentation.",
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
            "Implemented customer, staff, and developer permission tiers, applying command checks and fallbacks for unconfigured role mappings.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Spotify Library Dashboard", url: "https://github.com/Kevin-Mok/spotify-library-intelligence-dashboard", languages: ["Python", "Django", "PostgreSQL"], date: "Jun - Nov 2018",
          bullets: [
            "Separated Django login, API, and graph modules, preserving library scanning and authentication through dedicated URLs and views.",
            "Implemented listening-history CSV upload and server-side import, converting exported play records into database-backed dashboard history.",
            "Added incremental listening-history ingestion after the latest stored event, avoiding repeated insertion of previously imported records.",
            "Introduced relational history entries linking users, tracks, and play timestamps to retain structured listening events.",
          ],
        },
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Merged overlapping session intervals and subtracted recorded waits to avoid double-counting concurrent work.",
          ],
        },
      ],
      skills: ["Python", "Django", "PostgreSQL", "SQLite", "asyncio", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "python-nerdwallet", label: "Python · AI Automation Sample", fileName: "kevin-mok-resume-python-nerdwallet.pdf",
    showSummary: true, summary: "Python developer building ingestion, local usage analysis, and transcription automation with explicit validation and preserved processing state.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Implemented marketplace listing state transitions with invalid-transition rejection, separating lifecycle rules from Discord command presentation.",
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Merged overlapping session intervals and subtracted recorded waits to avoid double-counting concurrent work.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
          ],
        },
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Automated local Whisper transcription with dated output paths, skipping existing transcripts during repeated runs.",
            "Added transcript import with paired-audio ordering, content-derived filenames, and dry-run review before copying dated artifacts.",
            "Validated contact submissions with Zod, returning structured API responses with optional database persistence.",
          ],
        },
      ],
      skills: ["Python", "SQLite", "Django", "TypeScript", "Node.js", "Whisper", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "it-support", label: "IT Support", fileName: "kevin-mok-resume-it-support.pdf",
    showSummary: true, summary: "Technical candidate combining Linux service investigation, developer onboarding documentation, and customer-facing marketplace operations.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Digital Goods Marketplace", title: "Owner-Operator (Customer Support & Sales)", languages: [], date: "Jul 2025 - Present",
          bullets: [
            "Managed escrow for digital-goods transactions, with customer support and dispute handling forming part of marketplace operations.",
            "Ran end-to-end marketplace operations, including pricing, payment risk controls, and coordination of digital-goods fulfillment.",
            "Implemented middleman verification checks for marketplace transactions to address fraud exposure and chargeback risk.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Documented a Gitea latency incident with dated evidence, remediation guidance, and recovery steps for service operators.",
            "Added Termux SSH setup, hardening, and diagnostic scripts with a runbook for remote access to self-hosted services.",
          ],
        },
        { name: "Discord Message-Cap Bot", url: "https://github.com/Kevin-Mok/msg-cap-discord-bot", languages: ["Python", "discord.py", "SQLite", "asyncio"], date: "Oct 2026",
          bullets: [
            "Validated channel ownership and administrative permissions before applying server monitoring configuration, rejecting cross-guild channels and missing capabilities.",
            "Added restart reconciliation for stored message history, restoring tracking state through bounded asynchronous scans after monitoring resumes.",
          ],
        },
      ],
      skills: ["Linux", "service diagnostics", "troubleshooting documentation", "Bash", "Git", "Python", "customer communication"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "it-support-sql", label: "IT Support + SQL", fileName: "kevin-mok-resume-it-support-sql.pdf",
    showSummary: true, summary: "Technical candidate with relational data import workflows, Python diagnostics, Linux service investigation, and developer onboarding documentation.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Digital Goods Marketplace", title: "Owner-Operator (Customer Support & Sales)", languages: [], date: "Jul 2025 - Present",
          bullets: [
            "Managed escrow for digital-goods transactions, with customer support and dispute handling forming part of marketplace operations.",
            "Standardized profit-and-loss tracking and payment records, reconciling fulfillment logs with the corresponding financial documentation.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Spotify Library Dashboard", url: "https://github.com/Kevin-Mok/spotify-library-intelligence-dashboard", languages: ["Python", "Django", "PostgreSQL"], date: "Nov 2018 - Jun 2019",
          bullets: [
            "Implemented listening-history CSV upload and server-side import, converting exported play records into database-backed dashboard history.",
            "Introduced relational history entries linking users, tracks, and play timestamps to retain structured listening events.",
            "Handled duplicate track keys during ingestion, preserving existing relationships when previously stored library items reappear.",
          ],
        },
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Documented a Gitea latency incident with dated evidence, remediation guidance, and recovery steps for service operators.",
          ],
        },
      ],
      skills: ["Python", "Django ORM", "PostgreSQL", "SQLite", "Linux", "Bash", "data imports", "documentation"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "it-support-aws", label: "IT Support + AWS", fileName: "kevin-mok-resume-it-support-aws.pdf",
    showSummary: true, summary: "Technical candidate combining customer-facing operations, Linux service diagnostics, onboarding documentation, and AWS EC2/Terraform practice.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Digital Goods Marketplace", title: "Owner-Operator (Customer Support & Sales)", languages: [], date: "Jul 2025 - Present",
          bullets: [
            "Managed escrow for digital-goods transactions, with customer support and dispute handling forming part of marketplace operations.",
            "Ran end-to-end marketplace operations, including pricing, payment risk controls, and coordination of digital-goods fulfillment.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "AWS Infrastructure Practice", url: "https://github.com/Kevin-Mok/terraform-deploys", languages: ["AWS EC2", "Terraform", "Docker", "Kubernetes"], date: "May - Jun 2024",
          bullets: [
            "Configured Terraform provisioning for an AWS EC2 t2.micro instance, including instance naming and IP/ID outputs.",
            "Organized declarative infrastructure configuration into provider settings, variables, and outputs to expose instance details after provisioning.",
          ],
        },
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Documented a Gitea latency incident with dated evidence, remediation guidance, and recovery steps for service operators.",
            "Added Termux SSH setup, hardening, and diagnostic scripts with a runbook for remote access to self-hosted services.",
          ],
        },
      ],
      skills: ["AWS EC2 and Terraform (practice)", "Linux", "Bash", "Kubernetes", "Docker", "documentation", "customer communication"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "sales", label: "Sales", fileName: "kevin-mok-resume-sales.pdf",
    showSummary: true, summary: "Customer-facing marketplace operator with experience in pricing, payment records, transaction coordination, and digital-goods fulfillment.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Digital Goods Marketplace", title: "Owner-Operator (Customer Support & Sales)", languages: [], date: "Jul 2025 - Present",
          bullets: [
            "Managed escrow for digital-goods transactions, with customer support and dispute handling forming part of marketplace operations.",
            "Ran end-to-end marketplace operations, including pricing, payment risk controls, and coordination of digital-goods fulfillment.",
            "Used fair-value pricing and product bundles to focus marketplace sales activity on interested buyers.",
            "Implemented middleman verification checks for marketplace transactions to address fraud exposure and chargeback risk.",
            "Standardized profit-and-loss tracking and payment records, reconciling fulfillment logs with the corresponding financial documentation.",
          ],
        },
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
      ],
      skills: ["Customer communication", "pricing", "payment records", "transaction coordination", "written documentation"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "call-centre", label: "Call Centre", fileName: "kevin-mok-resume-call-centre.pdf",
    showSummary: true, summary: "Customer-facing operator with digital transaction coordination, payment recordkeeping, written communication, and technical documentation experience.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Digital Goods Marketplace", title: "Owner-Operator (Customer Support & Sales)", languages: [], date: "Jul 2025 - Present",
          bullets: [
            "Managed escrow for digital-goods transactions, with customer support and dispute handling forming part of marketplace operations.",
            "Ran end-to-end marketplace operations, including pricing, payment risk controls, and coordination of digital-goods fulfillment.",
            "Implemented middleman verification checks for marketplace transactions to address fraud exposure and chargeback risk.",
            "Standardized profit-and-loss tracking and payment records, reconciling fulfillment logs with the corresponding financial documentation.",
          ],
        },
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
      ],
      skills: ["Customer communication", "transaction coordination", "payment records", "documentation", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "backend-api", label: "Backend / API Engineering", fileName: "kevin-mok-resume-backend-api.pdf",
    showSummary: true, summary: "Backend developer building validated API handlers, explicit state transitions, permission checks, and resumable asynchronous workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Implemented marketplace listing state transitions with invalid-transition rejection, separating lifecycle rules from Discord command presentation.",
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
            "Implemented customer, staff, and developer permission tiers, applying command checks and fallbacks for unconfigured role mappings.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Built a typed Directus content provider, validating CMS posts and media against the application content model.",
            "Validated contact submissions with Zod, returning structured API responses with optional database persistence.",
            "Added token-protected cache revalidation with validated payloads, allowing authorized API requests to invalidate selected Next.js cache entries.",
          ],
        },
        { name: "Discord Message-Cap Bot", url: "https://github.com/Kevin-Mok/msg-cap-discord-bot", languages: ["Python", "discord.py", "SQLite", "asyncio"], date: "Oct 2026",
          bullets: [
            "Isolated configuration and cap controllers by Discord guild, preventing monitored channel selections from becoming shared server state.",
            "Validated channel ownership and administrative permissions before applying server monitoring configuration, rejecting cross-guild channels and missing capabilities.",
            "Added restart reconciliation for stored message history, restoring tracking state through bounded asynchronous scans after monitoring resumes.",
          ],
        },
      ],
      skills: ["Python", "TypeScript", "Node.js", "Next.js API routes", "SQLite", "Zod", "asyncio", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "developer-tools", label: "Developer Tools / Platform Engineering", fileName: "kevin-mok-resume-developer-tools.pdf",
    showSummary: true, summary: "Developer building local analysis tools, incremental ingestion, automated document generation, and measurable layout validation workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "projects-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
            "Added a reconciliation scheduler that preserves unfinished ingestion across bounded scan cycles and notification-driven background updates.",
          ],
        },
        { name: "Portfolio and Resume Pipeline", url: "https://github.com/Kevin-Mok/nextjs-portfolio-showcase", languages: ["Next.js", "React", "TypeScript", "Node.js", "headless Chrome"], date: "Feb 2026",
          bullets: [
            "Automated resume PDF generation with headless Chrome, constructing render URLs and waiting for the local Next.js server.",
            "Built bounded PDF layout calibration using measured geometry and whitespace targets, with explicit regeneration convergence checks.",
            "Added content fingerprints and a versioned PDF manifest, skipping unchanged variants while detecting source and styling changes.",
          ],
        },
      ],
      skills: ["Python", "TypeScript", "Node.js", "SQLite", "JSONL", "headless Chrome", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "automation-data", label: "Automation / Data Pipelines", fileName: "kevin-mok-resume-automation-data.pdf",
    showSummary: true, summary: "Developer building incremental ingestion, duplicate handling, source validation, and interrupted-run recovery for local data workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
            "Implemented recurring availability windows with IANA timezones and one-time overrides, calculating immutable scheduling snapshots for staff commands.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Codex Session Analytics", url: "https://github.com/Kevin-Mok/track-codex-sessions", languages: ["Python", "SQLite", "JSONL"], date: "Oct 2026",
          bullets: [
            "Implemented incremental JSONL ingestion with per-file checkpoints and boundary verification, resuming records without reparsing historical logs.",
            "Built a JSON parser retaining accounting metadata while skipping conversation bodies, avoiding storage of prompts and responses.",
            "Added a reconciliation scheduler that preserves unfinished ingestion across bounded scan cycles and notification-driven background updates.",
          ],
        },
        { name: "Hourly Forecast Scraper", url: "https://github.com/Kevin-Mok/scrape-weather-network", languages: ["Node.js", "Chrome DevTools", "systemd"], date: "Oct 2026",
          bullets: [
            "Added publication and local-save sequencing checks so failed publication does not silently replace previously saved forecast artifacts.",
            "Compared rendered hourly forecasts with structured page data before publication, rejecting disagreements between source representations.",
            "Recorded pending publication attempts and recovered interrupted-run evidence, leaving explicit failure records when a scraper terminates.",
          ],
        },
      ],
      skills: ["Python", "JavaScript", "Node.js", "SQLite", "JSONL", "systemd", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "cloud-native", label: "Cloud Native / Kubernetes", fileName: "kevin-mok-resume-cloud-native.pdf",
    showSummary: true, summary: "Developer with Kogito operator and Helm contributions, regression-focused configuration fixes, and self-hosted infrastructure tooling.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Implemented Helm deployment templates and configuration for PostgreSQL, Kafka, and Prometheus integration.",
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Defined Nginx virtual hosts for personal sites and hosted services, mapping configured domains to service routes.",
            "Added Docker Compose configuration and matching Nginx routing for a blog hosted on a VPS.",
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
          ],
        },
        { name: "Hourly Forecast Scraper", url: "https://github.com/Kevin-Mok/scrape-weather-network", languages: ["Node.js", "Chrome DevTools", "systemd"], date: "Oct 2026",
          bullets: [
            "Created systemd service and timer setup for recurring scraping, with tests checking generated execution and scheduling configuration.",
            "Recorded pending publication attempts and recovered interrupted-run evidence, leaving explicit failure records when a scraper terminates.",
          ],
        },
      ],
      skills: ["Kubernetes", "Helm", "Go", "Java", "Docker", "Nginx", "Linux", "Bash", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "frontend", label: "Frontend Engineering", fileName: "kevin-mok-resume-frontend.pdf",
    showSummary: true, summary: "Frontend developer building responsive React interfaces, validated browser state, adaptive layouts, and integrated stream controls.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Built Next.js membership pricing cards linking plan options to configured Discord and Whop signup destinations.",
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Twitch Multistream Workspace", url: "https://github.com/Kevin-Mok/twitch-grid", languages: ["React", "TypeScript", "Vite", "Twitch embeds"], date: "Oct 2026",
          bullets: [
            "Validated persisted workspace data before restoration, returning recovery errors for malformed saved JSON and imported backup structures.",
            "Calculated video-grid layouts from viewport dimensions, fitting stream tiles around the surrounding controls and chat panels.",
            "Corrected fitted-player visibility after viewport changes, keeping Twitch video surfaces rendered when workspace layouts recalculate.",
          ],
        },
        { name: "Portfolio and Resume Pipeline", url: "https://github.com/Kevin-Mok/nextjs-portfolio-showcase", languages: ["Next.js", "React", "TypeScript", "Node.js", "headless Chrome"], date: "Jan - Oct 2026",
          bullets: [
            "Implemented resume rendering from typed data and reusable React sections, applying document typography and print rules.",
            "Built an academic-record explorer with typed course data, filter controls, and sortable columns for subject and year views.",
            "Added content fingerprints and a versioned PDF manifest, skipping unchanged variants while detecting source and styling changes.",
          ],
        },
      ],
      skills: ["TypeScript", "JavaScript", "React", "Next.js", "Vite", "Tailwind CSS", "localStorage", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "applied-ai", label: "Applied AI / LLM Integration", fileName: "kevin-mok-resume-applied-ai.pdf",
    showSummary: true, summary: "Developer integrating local speech transcription into content workflows and building structured review tools with persisted state.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Toronto Zoo Blog", url: "https://github.com/Kevin-Mok/toronto-zoo-blog", languages: ["Next.js", "TypeScript", "Directus", "Zod", "Whisper"], date: "Mar 2026",
          bullets: [
            "Built a typed Directus content provider, validating CMS posts and media against the application content model.",
            "Automated local Whisper transcription with dated output paths, skipping existing transcripts during repeated runs.",
            "Added transcript import with paired-audio ordering, content-derived filenames, and dry-run review before copying dated artifacts.",
          ],
        },
        { name: "OpenClaw Job Operations", url: "https://github.com/Kevin-Mok/openclaw", languages: ["TypeScript", "Node.js", "SQLite", "OpenClaw"], date: "Mar 2026",
          bullets: [
            "Built fixture-driven ingestion with normalized duplicate keys and SQLite upserts, retaining source and review information for job leads.",
            "Preserved manual approval and application states when duplicate job evidence arrived, preventing ingestion from resetting review decisions.",
            "Added resume-variant routing against a local catalog, recording candidate fit and evidence gaps for human review.",
          ],
        },
      ],
      skills: ["Whisper", "TypeScript", "Next.js", "Node.js", "SQLite", "Python", "Bash", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "qa-automation", label: "QA / Test Automation", fileName: "kevin-mok-resume-qa-automation.pdf",
    showSummary: true, summary: "Developer with regression fixtures, authorization boundary checks, schema validation, and deterministic behavior checks across web applications.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Java Robotics Lesson", url: "https://github.com/Kevin-Mok/java-lesson-4", languages: ["Next.js", "React", "TypeScript", "Vitest"], date: "Aug 2026",
          bullets: [
            "Implemented answer checking with normalized aliases and evidence thresholds, returning matched concepts and missing ideas to learners.",
            "Validated versioned lesson progress from localStorage before restoring saved answers, feedback objects, and timer fields.",
            "Added regression fixtures for answer validation, persisted progress, and lesson structure alongside the interactive teaching interface.",
          ],
        },
        { name: "Twitch Following Extension", url: "https://github.com/Kevin-Mok/twitch-following-extension", languages: ["JavaScript", "Twitch Helix", "OAuth", "Chrome Extensions"], date: "Oct 2026",
          bullets: [
            "Validated OAuth callback origin, state, and identity scope before accepting extension credentials into authenticated requests.",
            "Restricted credential-management messages to extension setup pages, keeping arbitrary token fields outside content-script requests.",
            "Added authorization regression cases for callback mismatches, expired identities, and message-sender restrictions at extension boundaries.",
          ],
        },
      ],
      skills: ["TypeScript", "JavaScript", "Python", "Vitest", "node:test", "regression fixtures", "Git", "Linux"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "browser-extensions", label: "Browser Extension Development", fileName: "kevin-mok-resume-browser-extensions.pdf",
    showSummary: true, summary: "JavaScript developer building Chrome extensions with persisted preferences, OAuth validation, worker-managed credentials, and browser interface integration.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "projects-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Contributed Go and Java changes to Kogito Kubernetes operators, runtimes, deployment tooling, and container images.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Twitch Following Extension", url: "https://github.com/Kevin-Mok/twitch-following-extension", languages: ["JavaScript", "Twitch Helix", "OAuth", "Chrome Extensions"], date: "Oct 2026",
          bullets: [
            "Collected paginated Twitch streams, validating records and rejecting repeated cursors to prevent malformed pagination from looping.",
            "Validated OAuth callback origin, state, and identity scope before accepting extension credentials into authenticated requests.",
            "Restricted credential-management messages to extension setup pages, keeping arbitrary token fields outside content-script requests.",
            "Persisted Twitch authorization in the extension worker, validating account state and refreshing expired credentials before retrieving streams.",
          ],
        },
        { name: "Remembered-Page Refresh Extension", url: "https://github.com/Kevin-Mok/auto-refresh-extension", languages: ["JavaScript", "Chrome Manifest V3", "Python"], date: "Oct 2026",
          bullets: [
            "Implemented remembered per-page refresh intervals in a Manifest V3 extension, reusing saved timer rules for exact pages.",
            "Added a toolbar countdown badge showing remaining refresh time while a browser tab timer runs.",
            "Prepared extension release assets and a Python packaging script that collects files into a submission archive.",
          ],
        },
      ],
      skills: ["JavaScript", "Chrome Extensions", "Manifest V3", "OAuth", "Twitch Helix", "Python", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "linux-self-hosting", label: "Linux / Self-Hosted Infrastructure", fileName: "kevin-mok-resume-linux-self-hosting.pdf",
    showSummary: true, summary: "Developer configuring self-hosted services, collecting incident evidence, documenting recovery, and scheduling recurring browser-based data workflows.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "Fortnite Items Marketplace", title: "Freelance Python Engineer", companyUrl: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Added asynchronous listing expiry with bounded concurrent processing, refreshing market boards when scheduled listings become unavailable.",
            "Implemented customer, staff, and developer permission tiers, applying command checks and fallbacks for unconfigured role mappings.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Added Kubernetes startup probe support and corrected probe configuration for operator-managed Java services.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Defined Nginx virtual hosts for personal sites and hosted services, mapping configured domains to service routes.",
            "Added Docker Compose configuration and matching Nginx routing for a blog hosted on a VPS.",
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Added Termux SSH setup, hardening, and diagnostic scripts with a runbook for remote access to self-hosted services.",
          ],
        },
        { name: "Hourly Forecast Scraper", url: "https://github.com/Kevin-Mok/scrape-weather-network", languages: ["Node.js", "Chrome DevTools", "systemd"], date: "Oct 2026",
          bullets: [
            "Created systemd service and timer setup for recurring scraping, with tests checking generated execution and scheduling configuration.",
            "Recorded pending publication attempts and recovered interrupted-run evidence, leaving explicit failure records when a scraper terminates.",
          ],
        },
      ],
      skills: ["Linux", "Bash", "Nginx", "Docker Compose", "systemd", "SSH", "Python", "Node.js", "Git"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "support-automation", label: "Support Automation Engineering", fileName: "kevin-mok-resume-support-automation.pdf",
    showSummary: true, summary: "Developer building ticket-creation workflows, permission checks, operational diagnostics, and reusable onboarding documentation.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Implemented responsive header navigation with a mobile-menu toggle and scroll-aware presentation across screen sizes.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Fixed ConfigMap property parsing to preserve embedded equals signs, with regression tests for the corrected behavior.",
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Discord Marketplace Workflows", url: "https://github.com/Kevin-Mok/discord-marketplace-bot", languages: ["Python", "discord.py", "asyncio"], date: "Jan 2026",
          bullets: [
            "Connected purchase commands to Discord ticket creation, carrying selected listing details into dedicated buyer conversations.",
            "Implemented customer, staff, and developer permission tiers, applying command checks and fallbacks for unconfigured role mappings.",
            "Added fee-proof confirmation notifications that route buyer payment evidence to configured users and operations staff for manual review.",
          ],
        },
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Documented a Gitea latency incident with dated evidence, remediation guidance, and recovery steps for service operators.",
            "Added Termux SSH setup, hardening, and diagnostic scripts with a runbook for remote access to self-hosted services.",
          ],
        },
      ],
      skills: ["Python", "TypeScript", "asyncio", "Linux", "Bash", "Git", "diagnostic scripts", "documentation"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
  {
    id: "technical-documentation", label: "Developer Documentation / Technical Writing", fileName: "kevin-mok-resume-technical-documentation.pdf",
    showSummary: true, summary: "Developer producing onboarding guides, operational runbooks, incident records, and automated documentation from structured engineering sources.",
    sectionTitles: {"projects": "Projects", "experience": "Experience"},
    primarySectionOrder: "experience-first",
    resume: {
      contact: {"phone": "647-685-2500", "email": "me@kevin-mok.com", "linkedin": "linkedin.com/in/Kev-Mok", "github": "github.com/Kevin-Mok"},
      experience: [
        { company: "www.ntcharts.com", title: "Freelance Frontend Developer", companyUrl: "https://www.ntcharts.com/", languages: ["TypeScript", "React", "Next.js", "Tailwind CSS"], date: "Jan 2026 - Feb 2026",
          bullets: [
            "Centralized navigation, membership tiers, and legal links in typed configuration shared across React components.",
            "Generated branded Open Graph images with Next.js ImageResponse and local logo assets for website sharing previews.",
          ],
        },
        { company: "Red Hat", title: "Cloud/Software Engineer Intern", evidenceUrl: "https://gist.github.com/Kevin-Mok/1652af7a7574c36abaf0ff7509756234#file-red-hat-contributions-md", evidenceLabel: "Open-source contributions", languages: ["Kubernetes", "Go", "Java"], date: "May 2020 - Aug 2021",
          bullets: [
            "Authored a developer onboarding guide covering local setup, debugging, testing, and contribution workflows.",
          ],
        },
      ],
      projects: [
        { name: "Self-Hosted Infrastructure", url: "https://github.com/Kevin-Mok/self-hosted-infra-hardening", languages: ["Linux", "Bash", "Nginx", "Docker Compose"], date: "Mar 2026",
          bullets: [
            "Added shell scripts that capture Gitea service status and preserve incident evidence for operational investigation.",
            "Documented a Gitea latency incident with dated evidence, remediation guidance, and recovery steps for service operators.",
            "Added Termux SSH setup, hardening, and diagnostic scripts with a runbook for remote access to self-hosted services.",
          ],
        },
        { name: "Programming Practice Documentation", url: "https://github.com/Kevin-Mok/leetcode", languages: ["Python", "GraphQL", "Markdown"], date: "Apr 2026",
          bullets: [
            "Automated problem documentation from solution files and LeetCode metadata, grouping exercises and identifying available local harnesses.",
            "Added a GraphQL catalog downloader that normalizes problem identifiers and metadata into sorted JSON for local tooling.",
          ],
        },
      ],
      skills: ["Markdown", "Git", "Linux", "Python", "Bash", "TypeScript", "onboarding documentation", "operational runbooks"],
      education: [{"institution": "University of Toronto (St. George)", "date": "2019 - 2024", "degree": "Computer Science Specialist", "gpa": "3.84 GPA (CS). Graduated with High Distinction."}],
    },
  },
];
