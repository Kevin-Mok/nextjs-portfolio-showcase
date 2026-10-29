# Smoke Tests

Use these checks to verify the site's public pages after changes. Exercise the relevant flow on desktop and mobile, then compare the visible results with each expected outcome.

## Academic Record

- Action: Open the landing page at desktop and mobile widths and follow **Academic Record** from the bio. Reload `/academics` directly.
  Expected: Both links reach the framed Academic Record page for Kevin Mok. The default CSC view contains 23 records, with 22 numeric marks across 11.0 credits, a percentage average of 86.68%, and a clearly labeled 4.0/4.0 GPA equivalent. Its explanation distinguishes this from official GPA.

- Action: Choose prefix CSC, year 2018, and language C. Sort Mark ascending and descending, then choose prefix MAT while keeping those filters.
  Expected: CSC209H1 is initially the sole result, with 83% and 3.7 equivalent regardless of sort order. MAT yields a clear empty state with dash summaries. **Reset to CSC** restores the initial filters, marks descending, and summaries.

- Action: Choose All subjects and All years/languages; inspect the 2014 MAT136H1 mark and repeated CSC148H1 records. Sort Mark and Grade in both directions.
  Expected: The failing mark stays 43%, nonnumeric outcomes show dashes rather than zero, repeat/EXT annotations remain visible, and missing marks stay last in either direction. Each numeric mark keeps readable text alongside its color dot.

- Action: At a narrow phone width, operate filters and sorts by keyboard and touch, scroll the table horizontally, and follow **Back to portfolio**. Repeat the page check in Tokyo Night, Nord, and Solarized Light.
  Expected: Focus remains visible, controls have clear labels, horizontal overflow stays inside the table, and the page and marks remain readable across themes. Back navigation reaches the landing page without adding a new mobile scroll section.

## Resume

- Action: Open `/resume` and confirm the selected dropdown label is `AI + Web Dev`.
  Expected: The page defaults to the hybrid resume, shows an `Intro` heading plus the visible two-line summary under the contact header, renders `Web Dev Work Experience`, `Web Dev Projects`, `Agentic Engineering`, and `Additional Engineering Experience` in that order, and includes `www.ntcharts.com`, `Kevin Mok's Chess Analytics`, `www.kevin-mok.com`, an `AI CLI Dotfiles` bullet about concurrent workflows plus automatic regression tests, and one Red Hat cloud/SWE entry.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-ai-web-dev.pdf`.
  Expected: The AI + Web Dev PDF exists, stays on one US Letter page, matches the `/resume` default section order and summary visibility, and opens from the homepage/mobile resume CTA PDF link.

- Action: Open `/resume?variant=ai-agentic` and confirm the selected dropdown label is `AI/Agentic`.
  Expected: The page renders `Agentic / Devtools Projects` before `Work Experience`, with the Linux/Codex, OpenClaw, and local chess workflow projects, one Red Hat SWE entry, `Toronto location policy` wording in the OpenClaw bullet, and no visible summary block above the PDF controls.

- Action: Generate PDFs and inspect `public/resume/kevin-mok-resume-ai-agentic.pdf`.
  Expected: The AI/Agentic PDF exists, stays on one US Letter page, preserves the same variant label and project mix shown on `/resume?variant=ai-agentic`, and keeps bottom whitespace at or below the variant-specific `15pt` cap.
