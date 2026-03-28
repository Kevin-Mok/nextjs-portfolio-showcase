# Smoke Tests

## Resume

- Action: Open `/resume?variant=warp-agentic` and confirm the selected dropdown label is `Warp / Agentic Devtools`.
  Expected: The page renders `Agentic / Devtools Projects` before `Work Experience`, with the Linux/Codex, OpenClaw, and local chess workflow projects, one Red Hat SWE entry, and generic postal-code wording in the OpenClaw bullet.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-warp-agentic.pdf`.
  Expected: The Warp PDF exists, stays on one US Letter page, preserves the same variant label and project mix shown on `/resume?variant=warp-agentic`, and keeps bottom whitespace at or below the Warp-specific `15pt` cap.
