# Smoke Tests

## Resume

- Action: Open `/resume?variant=ai-agentic` and confirm the selected dropdown label is `AI/Agentic`.
  Expected: The page renders `Agentic / Devtools Projects` before `Work Experience`, with the Linux/Codex, OpenClaw, and local chess workflow projects, one Red Hat SWE entry, and `Toronto location policy` wording in the OpenClaw bullet.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-ai-agentic.pdf`.
  Expected: The AI/Agentic PDF exists, stays on one US Letter page, preserves the same variant label and project mix shown on `/resume?variant=ai-agentic`, and keeps bottom whitespace at or below the variant-specific `15pt` cap.
