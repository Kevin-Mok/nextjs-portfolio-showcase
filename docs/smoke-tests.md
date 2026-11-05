# Smoke Tests

Use these checks after résumé changes to confirm selection, downloads, track separation and readable one-page output. Run the documented generation gates first, then inspect the rendered site and PDFs.

## Resume

- Action: Open `/resume-gallery` directly at desktop and phone widths. Scroll through every thumbnail, then activate a thumbnail or its name using mouse, Enter and Space.
  Expected: All active `pdfVariants` appear in metadata order with the existing labels underneath actual first-page previews. The dark `#0d1117` surface covers the portfolio background. The gallery has no public navigation or sitemap link and its HTML carries `noindex, nofollow`; it is unlisted, without authentication.

- Action: Use “Invert PDF colors” in the gallery header and expanded viewer with mouse and Space, then zoom, close and open another resume. Reload afterward.
  Expected: Inversion starts enabled, mapping PDF paper to `#0d1117` and dark text to `#f0f6fc`. Turning it off restores original PDF colors while the shell stays dark. Both controls share the same state across thumbnails, zoom and document changes. Reload resets inversion to enabled; direct PDF files retain their original colors.

- Action: Use Prev and Next in the viewer, including the first and last resumes, after zooming and toggling PDF colors.
  Expected: Navigation follows gallery order without returning to the grid. Prev is disabled at the first resume and Next at the last. Each resume opens fitted, retains the color setting and uses the matching direct PDF link. Closing restores focus to the card that initially opened the viewer. All controls fit on phones.

- Action: In a gallery preview, use Zoom in/out to both limits, Fit page, resize, Tab/Shift+Tab, Escape and Close; reopen another resume. At 250%, scroll to the right and bottom edges.
  Expected: The toolbar stays visible; the percentage matches sharp PDF rendering, moving 25 percentage points per click between 25% and 250%. Fit responds to resize, each opened resume starts fitted, all document edges are reachable, focus stays inside the modal, background scrolling is blocked and closing restores focus to the activated card. Phones use the full viewport and all controls remain reachable.

- Action: Use browser request blocking to block one `/resume/*.pdf`, reload the gallery and open that resume. Remove the block and select Retry; open a different card afterward.
  Expected: The failed thumbnail and viewer show clear recovery controls and a direct PDF link. Retry renders the restored file and other cards still work. Automated repeat: `npx playwright test --config playwright.gallery.config.ts` against the server configured by `GALLERY_TEST_URL` (default `http://127.0.0.1:3217`). Chrome must be installed. Screenshots and failure artifacts stay under `.local/resume-gallery/`.

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
