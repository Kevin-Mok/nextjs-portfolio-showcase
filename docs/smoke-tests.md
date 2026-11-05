# Smoke Tests

Use these checks after résumé changes to confirm selection, downloads, track separation and readable one-page output. Run the documented generation gates first, then inspect the rendered site and PDFs.

## Resume

- Action: Open `/resume` and confirm the selected dropdown label is `AI + Web Dev`.
  Expected: The default draft shows its web development/session analytics/transcription intro, ntcharts and Red Hat experience, Toronto Zoo Blog and Codex Session Analytics projects, and the existing AI + Web Dev PDF filename.

- Action: Open the homepage résumé tile and mobile résumé CTA, then follow their PDF links.
  Expected: Both use the default AI + Web Dev résumé and open the correct generated PDF without changing the selected default.

- Action: Select each technical variant, including Python, Python + Django, AWS, AWS + Python, AWS + Web Dev, Web Development and AI/Agentic.
  Expected: Projects, bullets and skill ordering fit the selected role; historical dates reflect contribution history; Python + Django includes Django implementation evidence; cloud variants describe supported infrastructure work without unmeasured uptime or scale claims. Technical variants use cloud/software experience rather than support experience.

- Action: Open `/resume?variant=python-nerdwallet`, then select its PDF download and reload using the PDF filename as the variant query value.
  Expected: The additional Python AI automation sample resolves through both selection forms, has its own download filename, and does not replace any existing variant or default.

- Action: Inspect every refreshed PDF alongside extracted text and the final automated validation results.
  Expected: Each is exactly one US Letter page, with Computer Modern typography, white background, black print text, readable bold emphasis, complete text and balanced section spacing. No clipping, overlap, isolated wrapped words or large avoidable blank block. The AI/Agentic variant retains its existing 15pt bottom-whitespace ceiling.

- Action: Select the support, sales and call-centre variants and inspect their PDFs after shared generation or layout changes.
  Expected: Their master-derived copy renders, existing filenames remain stable, and the selected Red Hat role is Cloud/Software Engineer Intern without a second support role. Marketplace entries show no empty technology brackets. Page/font/layout validation passes.

- Action: At desktop and mobile widths, tab through résumé controls, change variants and download a PDF.
  Expected: Controls remain visible and keyboard accessible, the chosen variant renders without horizontal clipping, and the downloaded filename matches the selected variant.

- Action: Open `/resume?variant=developer-tools`, `/resume?variant=browser-extensions` and `/resume?variant=call-centre`, change the selector, and download each PDF.
  Expected: The selector offers 25 drafts in the requested ranking: Applied AI first, AI/Agentic second, Developer Tools third, Sales next-to-last and Call Centre last; no salary figures appear. Direct IDs and PDF-filename query values resolve correctly. Projects lead in developer-tools and browser-extensions; Experience leads in call-centre. Each download contains the selected draft with no source IDs or audit notes.
