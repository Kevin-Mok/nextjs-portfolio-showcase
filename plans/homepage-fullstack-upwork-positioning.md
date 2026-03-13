```md
# Homepage Full-Stack Job Search + Upwork Positioning

This ExecPlan follows `.agent/PLANS.md` and must be kept up to date as work proceeds.

## Purpose / Big Picture

The homepage currently presents Kevin as a general software engineer, and the Google snippet is pulling older homepage intro copy that does not clearly say he is looking for a full-stack role. After this change, the home page should explicitly say Kevin is open to full-stack work, provide direct resume and Upwork paths, and show `Upwork: kevinmok` in the neofetch tile. A reviewer can verify success by loading `/`, checking the home metadata, confirming the new CTAs, and seeing the Upwork row in the terminal-style card.

## Progress

- [x] (2026-03-13 18:55Z) Identified the active homepage metadata and copy sources in `app/layout.tsx`, `config/portfolio.config.ts`, `.env.local`, `components/tiles/content/AboutContent.tsx`, `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx`, and `components/tiles/NeofetchTile.tsx`.
- [x] (2026-03-13 16:51Z) Implemented tracked homepage metadata override in `app/page.tsx`, added desktop resume/Upwork CTAs, and updated the mobile resume CTA copy/actions.
- [x] (2026-03-13 16:51Z) Added typed `system.upwork` support, documented new Upwork env vars, and updated local env values to match the new hook.
- [x] (2026-03-13 16:51Z) Ran `npm run typecheck` and `npm run build`, then confirmed the built homepage output contains the new metadata and copy strings.

## Surprises & Discoveries

- Observation: The Google-style snippet text in the user screenshot matches the homepage intro text from `.env.local`, not the current site-wide SEO description.
  Evidence: `.env.local` contains the University of Toronto / Red Hat intro string, while `config/portfolio.config.ts` has a different SEO description.
- Observation: `.env.local` is gitignored, so changing only local env would not create a durable repo change.
  Evidence: `.gitignore` includes `.env.local`.

## Decision Log

- Decision: Add page-level metadata in `app/page.tsx` instead of changing global layout metadata.
  Rationale: Only the homepage needs the job-search-specific title and description; blog and projects can continue using the broader site defaults.
  Date/Author: 2026-03-13 / Codex
- Decision: Add Upwork under `config.system` rather than the unused `social` array.
  Rationale: The neofetch tile already reads `system`, and changing `social` would not affect the requested surface.
  Date/Author: 2026-03-13 / Codex
- Decision: Update both tracked config defaults and `.env.local` for the homepage hook.
  Rationale: `.env.local` controls the active local build, but the tracked fallback ensures the behavior is versioned and survives environments without custom `NEXT_PUBLIC_BIO_*` overrides.
  Date/Author: 2026-03-13 / Codex

## Outcomes & Retrospective

Completed. The homepage now has explicit `/` metadata for the full-stack job search message, the desktop about panel exposes resume and Upwork CTAs, the mobile resume section links to Upwork, and the neofetch tile shows `Upwork: kevinmok`. The remaining non-code dependency is deployment: if Railway or Vercel still serves older `NEXT_PUBLIC_BIO_*` values, that environment must be updated before Google can see the new hook.

## Context and Orientation

`app/page.tsx` is the Next.js App Router page for `/`. It currently renders the homepage layout but defines no homepage-specific metadata. `app/layout.tsx` provides the site-wide metadata defaults. `config/portfolio.config.ts` builds the portfolio config, including the greeting, homepage bio copy, and the `system` links rendered by `components/tiles/NeofetchTile.tsx`. `components/tiles/content/AboutContent.tsx` renders the desktop homepage "About" panel. `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx` renders the mobile resume CTA card. `.env.local` is the active local environment file, and `.env.example` documents supported public variables.

## Plan of Work

Update `app/page.tsx` to export homepage metadata with the new "open to work" title and description. Update `config/portfolio.config.ts` fallback greeting and intro text so the repo carries the new hook even without local env overrides. Update `.env.local` to apply the same new hook immediately in local development. Add `upwork?: SocialInfo` to `config/types.ts`, add the corresponding `system.upwork` config entry in `config/portfolio.config.ts`, and document the new env vars in `.env.example` and `README.md`. Add a compact CTA row in `components/tiles/content/AboutContent.tsx`, add an Upwork link to `components/layout/parallax/sections/ParallaxResumeCtaSection.tsx`, and render the Upwork row in `components/tiles/NeofetchTile.tsx`. Finally, run typecheck and build, then record the results here.

## Concrete Steps

From the repository root `/home/kevin/coding/portfolio-site`, run:

    npm run typecheck
    npm run build

Expected results:

    > kmok-portfolio@0.1.0 typecheck
    > tsc --noEmit

    > kmok-portfolio@0.1.0 build
    > next build && npm run generate-resume-pdfs

Observed results:

    > kmok-portfolio@0.1.0 typecheck
    > tsc --noEmit

    > kmok-portfolio@0.1.0 build
    > next build && npm run generate-resume-pdfs

    ✓ Compiled successfully
    ✓ Generating static pages (26/26)
    Generated 11 resume PDFs and skipped 0 unchanged variants in /home/kevin/coding/portfolio-site/public/resume

## Validation and Acceptance

Acceptance criteria:

- Visiting `/` shows a visible "open to work" hook instead of the old UofT/Red Hat intro.
- The desktop homepage shows `View Resume` and `Upwork` links near the intro.
- The mobile resume card shows `Open Resume`, `PDF`, and `Upwork`.
- The neofetch tile shows `Upwork: kevinmok`.
- The homepage HTML metadata exposes the new title and description.
- `npm run typecheck` and `npm run build` both pass.

Additional verification completed:

- `.next/server/app/index.rsc` contains the new homepage title and description.
- `.next/static/chunks/app/page-*.js` contains the updated greeting, intro copy, and `kevinmok`.

## Idempotence and Recovery

These edits are safe to repeat. If the env-backed copy does not change after code edits, verify that `.env.local` or the deployment provider still contains older `NEXT_PUBLIC_BIO_*` values and replace them with the new strings. No schema migration or destructive rollback is required; reverting the touched files restores the prior behavior.

## Artifacts and Notes

Important local source files:

    app/page.tsx
    config/portfolio.config.ts
    config/types.ts
    components/tiles/content/AboutContent.tsx
    components/layout/parallax/sections/ParallaxResumeCtaSection.tsx
    components/tiles/NeofetchTile.tsx
    .env.local
    .env.example
    README.md

## Interfaces and Dependencies

The `SystemInfo` interface in `config/types.ts` must include:

    upwork?: SocialInfo;

The homepage page module must export:

    export const metadata: Metadata = { ... };

`config/portfolio.config.ts` must expose `system.upwork` with platform, username, and URL so both the neofetch tile and homepage CTA code can read one consistent source of truth.

Revision note: Updated after implementation to record the successful build, output verification, and the deployment-env follow-up required for live Google snippet changes.
```
