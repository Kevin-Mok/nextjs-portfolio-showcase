# Smoke Tests

## Resume

- Action: Open `/resume` and confirm the selected dropdown label is `AI + Web Dev`.
  Expected: The page defaults to the hybrid resume, shows an `Intro` heading plus the visible two-line summary under the contact header, renders `Web Dev Work Experience`, `Web Dev Projects`, `Agentic Engineering`, and `Additional Engineering Experience` in that order, and includes `www.ntcharts.com`, `Kevin Mok's Chess Analytics`, `www.kevin-mok.com`, an `AI CLI Dotfiles` bullet about concurrent workflows plus automatic regression tests, and one Red Hat cloud/SWE entry.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-ai-web-dev.pdf`.
  Expected: The AI + Web Dev PDF exists, stays on one US Letter page, matches the `/resume` default section order and summary visibility, and opens from the homepage/mobile resume CTA PDF link.

- Action: Open `/resume?variant=ai-agentic` and confirm the selected dropdown label is `AI/Agentic`.
  Expected: The page renders `Agentic / Devtools Projects` before `Work Experience`, with the Linux/Codex, OpenClaw, and local chess workflow projects, one Red Hat SWE entry, `Toronto location policy` wording in the OpenClaw bullet, and no visible summary block above the PDF controls.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-ai-agentic.pdf`.
  Expected: The AI/Agentic PDF exists, stays on one US Letter page, preserves the same variant label and project mix shown on `/resume?variant=ai-agentic`, and keeps bottom whitespace at or below the variant-specific `15pt` cap.
