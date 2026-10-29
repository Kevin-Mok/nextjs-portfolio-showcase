Integrate a public Academic Record explorer into /home/kevin/coding/portfolio-site.

Goal
Build a dedicated /academics page and link to it from the existing landing page on both desktop and mobile. Do not add an inline transcript table or a new homepage section.

Confirmed requirements
These come from session 01a184e1-6d78-74d0-8f9b-d63fd40e0de0 and the current conversation:
- Public portfolio audience; retain the name Kevin Mok.
- Default to CSC courses.
- Filter by programming language, year, and course prefix.
- Sort table columns, including marks highest to lowest.
- Color numeric marks along a red → yellow → green scale, with 50 red and 100 green.
- Show a percentage average for the currently filtered records and its GPA equivalent.
- Use this existing portfolio’s stack and visual language.

Sources and integration
Read applicable repository instructions and maintain an ExecPlan under plans/ according to .agent/PLANS.md.
Use /home/kevin/school/official-transcript.pdf as the authoritative course source. Inspect its page layout when extracting records: it contains multiple columns, repeat attempts, nonnumeric outcomes, and EXT annotations.

Add “Academic Record” as a Next.js link alongside “View Resume” in components/tiles/content/AboutContent.tsx. Add the same link within the mobile landing bio in components/layout/parallax/sections/ParallaxBioSection.tsx.

Create app/academics/page.tsx with page metadata and a focused client explorer component. Reuse FramedPageLayout with autoFocus={false}, existing theme variables, and transparent/glass styling. Include a visible link back home. Register the route in the sitemap. No new API, database, upload flow, or dependency is needed.

Data and calculations
Create one typed, sanitized course dataset. Keep each attempt distinct using a stable identifier; retain course code, title, term/year, credit weight, numeric mark or null, letter grade, and relevant status annotations.
Publish only Kevin Mok’s name and the course information needed by the explorer. Keep the original PDF, identifiers, document verification details, and raw extraction artifacts outside public assets and tracked output.

Programming-language tags are curated metadata, not transcript facts. Verify them against relevant official course materials, preferably for the actual offering. Retain provenance and leave unsupported mappings untagged; distinguish unknown language metadata from a course that used no programming language.

The default view includes all CSC attempts, including graded EXT attempts. Preserve their annotations and explain that this is an exploratory average of displayed marks, not the university’s official GPA calculation.
Calculate:
  filtered percentage = sum(mark × credit weight) / sum(eligible credit weights)
Eligible records have numeric marks and positive credit weights. Include numeric failing marks. Exclude nonnumeric outcomes and zero-weight records; never substitute zero for a missing mark.
The source extraction found 22 numeric CSC attempts totaling 11.0 credits and averaging 86.681818…%. Reconcile the curated dataset against the PDF before treating this as a final fixture.

Display the average to two decimal places. Convert the unrounded average using U of T grade thresholds, and label the result “GPA equivalent” with an adjacent explanation that it converts the percentage average and is not official cumulative GPA or averaged course grade points.
Reference https://artsci.calendar.utoronto.ca/academic-record.
The default numeric result should be 86.68% and 4.0/4.0 after source reconciliation. Do not hard-code either result.

Interaction
Use labeled single-select filters with All options; combine the three filters with AND. Default prefix to CSC, other filters to All, and marks to descending.
Show course code, title, term/year, credits, mark, grade/status, and language tags. Support ascending/descending sorting through accessible column-header buttons; keep missing marks last and ties deterministic.
Recalculate summaries whenever filters change; sorting must not alter summaries. Provide a reset to defaults and a clear empty state. Show “—” for averages without eligible marks.

Use numeric text as well as mark color. Clamp only the color scale below 50 and above 100; preserve actual numeric marks. Keep table overflow inside its container on narrow screens. Ensure keyboard operation, visible focus, readable contrast, and usable touch targets.
Filter and sort state may remain local and reset on reload.

Verification and documentation
Write defining tests first using the existing node:test and node:assert/strict conventions. Keep calculation/filter/sort logic independently testable without React or browser dependencies.
Run the new tests with:
  node --experimental-strip-types --test scripts/lib/academics.test.mjs
Then run the relevant existing tests, npm run typecheck, npm run lint, and npm run build. Read package scripts before running them: the build also regenerates resume PDFs. Preserve unrelated generated changes and report any blocked check accurately.

Test weighted averages, combined filters, duplicate attempts, EXT inclusion, numeric failures, nonnumeric/zero-weight exclusions, empty results, sorting, color endpoints, and GPA boundaries. In particular, 84.999 must not become a 4.0 through display rounding.

Check the real app at desktop and mobile widths: landing link, direct page load, filters, both sort directions, reset, keyboard access, back navigation, and all supported themes. Confirm existing landing and resume behavior remains usable.

Update README usage, docs/smoke-tests.md, and the ExecPlan with actual verification evidence. Keep changes focused. Do not commit, push, or deploy solely because this prompt was executed; follow any separate delivery authorization.

Return a concise implementation summary, observed verification results, and remaining limitations.
