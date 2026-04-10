# Resume Maintenance Guide

## Overview

This guide covers how to update, maintain, and manage the resume feature.

## Updating Resume Content

### Single Source of Truth

**File**: `lib/resume-data.ts`

All resume content lives in this single TypeScript file. Update `resumeVariants` to change what appears on the homepage tile, `/resume` page, and generated PDF downloads.
The default resume shown at `/resume` is controlled by `DEFAULT_RESUME_VARIANT_ID`, which currently points to `ai-web-dev`.

### Updating Contact Information

**Location**: `resumeVariants[*].resume.contact` object

```typescript
export const resumeVariants = [
  {
    id: 'ai-web-dev',
    resume: {
      contact: {
        phone: '647-685-2500',
        email: 'me@kevin-mok.com',
        linkedin: 'linkedin.com/in/Kev-Mok',
        github: 'github.com/Kevin-Mok',
      },
    },
  },
];
```

**After updating**: Contact info updates on all views automatically.

### Adding a New Project

**Location**: `resumeVariants[*].resume.projects` array

Use `resume.projects` for the main web/project section and `agenticEngineering` when a variant needs a dedicated AI/devtools project section.

```typescript
projects: [
  {
    name: 'Project Name',
    url: 'https://github.com/your-url',  // Optional
    languages: ['TypeScript', 'React', 'Node.js'],
    date: 'Month YYYY',
    bullets: [
      'First bullet point describing achievement',
      '**Second bullet** with optional **bold** formatting',
      'Third point with [link text](https://example.com)',
    ],
  },
  // ... existing projects
];
```

**Format guidelines**:
- `name`: Project title
- `url`: Optional GitHub/demo link
- `languages`: Comma-separated tech stack
- `date`: "Month YYYY" or "Mar - Jun 2024"
- `bullets`: Array of achievement statements
  - Use `**text**` for bold
  - Use `[link](url)` for hyperlinks

### Updating Work Experience

**Location**: `resumeVariants[*].resume.experience` array

```typescript
experience: [
  {
    company: 'Company Name',
    title: 'Job Title',
    languages: ['Kubernetes', 'Go', 'Python'],
    date: 'May 2022 — Aug 2023',
    bullets: [
      'Quantified achievement with **metric**',
      'Specific responsibility with **technology**',
      'Impact statement with **percentage improvement**',
    ],
  },
];
```

**Best practices**:
- Include specific metrics: "reduced by 66%", "improved by 80%"
- Highlight technologies used: **bold** them
- Use achievement-oriented language
- Focus on impact, not just tasks

### Updating Skills

**Location**: `resumeVariants[*].resume.skills`, `skillsBold`, `skillsHtmlLines`, or `skillsLines`

```typescript
skills: [
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  // Add or remove skills here
  'NewTechnology',
],

skillsBold: ['TypeScript', 'JavaScript', 'React'],

skillsHtmlLines: [
  '<strong>Customer Support &amp; Call Centre:</strong> Active listening, ...',
  '<strong>Technical:</strong> <strong>Microsoft 365</strong>, VPN/log basics',
],
```

Skills are:
- `resume.skills`: ordered comma-separated list.
- `skillsBold`: optional subset to bold in `resume.skills`.
- `skillsHtmlLines`: optional rich-text lines for variant-specific emphasis.
- `skillsLines`: plain-text fallback for grouped lines.
- For parity-focused resumes, keep `skillsBold` / `skillsHtmlLines` aligned with the canonical PDF style.

### Updating Education

**Location**: `resumeVariants[*].resume.education` array

```typescript
education: [
  {
    institution: 'University of Toronto (St. George)',
    degree: 'Computer Science Specialist',
    gpa: '3.84 GPA',
    date: '2019 — 2024',
  },
  // Add additional degrees here if needed
];
```

Each education entry displays:
- Institution name (bold, large)
- Degree and credentials
- GPA (if applicable)
- Date range

## Regenerating PDFs

### Method 1: Build Pipeline (Recommended)

PDFs are generated automatically from `/resume` variants during build.

```bash
npm run build
```

This runs `next build` and then `npm run generate-resume-pdfs`, which:
- Starts the built app locally
- Renders each variant from `lib/resume-data.ts` and computes a per-variant HTML fingerprint
- Computes per-variant style fingerprints from `app/styles/13-resume-latex.css` (shared rules + variant block)
- Prints only changed/missing variants to `public/resume/*.pdf` using headless Chrome
- Preserves the existing download filenames
- Persists generation fingerprints in `.next/cache/resume-pdf-manifest.json`
- Must be followed by layout verification and validation:

```bash
npm run verify:resume-layout
```

```bash
npm run validate-resume-pdfs
```

### Method 2: Manual Generator Run

If you only changed resume content and want to regenerate quickly (and already have a current production build in `.next/`):

```bash
npm run generate-resume-pdfs
```

Then validate:

```bash
npm run verify:resume-layout
```

```bash
npm run validate-resume-pdfs
```

Optional automated calibration loop:

```bash
npm run calibrate:resume-layout
```

Target one variant during debugging:

```bash
npm run calibrate:resume-layout -- --variant web-dev
```

When calibration cannot converge within the iteration limit, the script now restores best-known settings for non-converged variants and prints iteration diagnostics (last vs best score/delta/settings).
Layout gates enforce minimum top/bottom whitespace floors derived from the current generated `web-dev` PDF (`public/resume/kevin-mok-resume-web-dev.pdf`), with a `1pt` deficit tolerance.

If layout verification still fails after calibration, tune per-variant print controls (`--resume-print-scale`, `--resume-print-leading`, `--resume-print-top-offset`) in `app/styles/13-resume-latex.css`, regenerate, and re-validate until all variants pass. For `web-dev`, fallback trimming order is: trim one project bullet first, then retry calibration.
If generation fails with `No Next.js production build found at .next/BUILD_ID`, run `npm run build` first.

### Prerequisites

- A Chrome/Chromium executable must be available in PATH (`google-chrome`, `google-chrome-stable`, `chromium`, or `chromium-browser`) or set `CHROME_BIN` to a valid executable path.
- If using Snap Chromium and generation fails with `is not a snap cgroup for tag snap.chromium.chromium`, switch to a non-Snap browser binary and point `CHROME_BIN` to it (for example `/usr/bin/google-chrome-stable`).
- `pdfinfo`, `pdffonts`, and `pdftotext` must be available in PATH for resume layout checks (`poppler-utils` on Ubuntu/Debian).
- Build requires localhost binding for temporary `next start` during generation.
- Local Computer Modern font files in `public/fonts/cmu/` must be present for deterministic PDF metrics.
- Baseline source and enforcement rules are defined in `docs/resume/resume-generation-spec.md` and `docs/resume/resume-layout-baseline.json`.

### Measuring Bottom Whitespace

Measure one PDF:

```bash
node scripts/measure-resume-bottom-whitespace.mjs --pdf /home/kevin/coding/mf-site/static/pdf/kevin-mok-resume-web-dev.pdf --json
```

Measure all generated resume PDFs:

```bash
npm run measure:resume-layout
```

Run auto-calibration:

```bash
npm run calibrate:resume-layout
```

## Managing PDF Variants

### Adding a New Variant

1. Add typed variant content to `lib/resume-data.ts` in `resumeVariants`.
2. Add matching entry in `scripts/lib/resume-pdf-variants.mjs` (`id` + `fileName`).
3. Run generator:

```bash
npm run generate-resume-pdfs
```

4. Test the download:
   - Visit `/resume`
   - Select new variant from dropdown
   - Verify download works

### Removing a Variant

1. Remove variant from `resumeVariants` in `lib/resume-data.ts`.
2. Remove it from `scripts/lib/resume-pdf-variants.mjs`.
3. Optionally delete old PDF from `public/resume/`.
4. Regenerate and test variant dropdown.

### Renaming a Variant

1. Update `label` and/or `fileName` in `lib/resume-data.ts`.
2. Update matching filename in `scripts/lib/resume-pdf-variants.mjs`.
3. Regenerate PDFs and verify download URLs.

## Styling Customization

### Resume-Specific Styles

**File**: `app/styles/13-resume-latex.css`

All resume styling lives in this single CSS module. Common customizations:

### Changing Colors

```css
.resume-latex {
  background-color: #ffffff;        /* Resume background */
  color: #000000;                   /* Body text */
}

.entry-title {
  color: #000000;                   /* Project titles */
}

.entry-company {
  color: #000000;                   /* Company names */
}

.entry-tech {
  color: #000000;                   /* Tech stack text */
}

.contact-item a {
  color: #1e4fa3;                   /* Links */
}
```

### Adjusting Font Size

```css
.resume-latex {
  font-size: clamp(15px, 2.5vw, 17px);  /* Responsive sizing */
  /* Or fixed size: */
  font-size: 16px;
}
```

### Changing Font Family

```css
.resume-latex {
  /* Current: */
  font-family: "Computer Modern Serif", Georgia, serif;

  /* Alternative options: */
  /* Times New Roman fallback: */
  font-family: "Computer Modern Serif", "Times New Roman", serif;

  /* Garamond: */
  font-family: "Computer Modern Serif", Garamond, serif;
}
```

### Section Header Styling

```css
.resume-section-title {
  font-size: 1.3em;              /* Header size */
  font-weight: bold;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
}
```

### Mobile Optimizations

Edit `@media` queries at bottom of CSS file:

```css
@media (max-width: 768px) {
  .resume-header-grid {
    grid-template-columns: 1fr;  /* Stack vertically on tablet */
  }
}

@media (max-width: 640px) {
  .resume-latex {
    font-size: 15px;             /* Smaller font on mobile */
  }
}
```

## Icon Management

### Replacing Contact Icons

Icons are SVG files in `public/icons/resume/`:

```
public/icons/resume/
├── smartphone.svg    (phone icon)
├── envelope.svg      (email icon)
├── linkedin.svg      (LinkedIn icon)
└── github.svg        (GitHub icon)
```

To replace an icon:
1. Create new SVG file
2. Save with same filename
3. SVG will update automatically (Next.js serves from public/)

### Icon Dimensions

Currently set to **20x20px** in `ResumeHeader.tsx`:

```tsx
<Image
  src={item.icon}
  alt={item.alt}
  width={20}    // Change here
  height={20}   // Change here
  className="contact-icon"
/>
```

To change size:
1. Edit width/height values
2. Update CSS if needed:

```css
.contact-icon {
  width: 24px;   /* Adjust here too */
  height: 24px;
}
```

## Testing Changes

### Local Testing

1. **Update content in** `lib/resume-data.ts`
2. **Run dev server**:
   ```bash
   npm run dev
   ```
3. **Test on homepage**:
   - Click "Resume" in sidebar
   - Verify changes appear in tile view
   - Click "resume" in polybar
   - Verify focus changes to resume

4. **Test full-page view**:
   - Navigate to `/resume`
   - Verify all sections render
   - Check styling (fonts, colors, spacing)
   - Test PDF download functionality

5. **Test PDF variants**:
   - Select each variant from dropdown
   - Click "Download PDF"
   - Verify correct file downloads
   - Run `npm run validate-resume-pdfs` and resolve all failures

6. **Test responsive design**:
   - Resize browser to mobile width (<640px)
   - Verify layout adjusts
   - Check font scaling
   - Verify touch targets are adequate

### Theme Testing

1. **Switch themes** in site settings (Tokyo Night, Nord, Solarized Light)
2. **Verify resume always has**:
   - White background (#ffffff)
   - Black text (#000000)
   - Sky blue project titles (#66cccc)
   - Professional appearance regardless of site theme

### Accessibility Testing

1. **Keyboard navigation**:
   - Tab through all interactive elements
   - Verify focus indicators visible
   - Test Enter key on navigation
   - Test Esc key to go back

2. **Screen reader** (if available):
   - Verify structure is semantic
   - Check heading hierarchy
   - Verify link text is descriptive

## Common Tasks

### Updating to New Job

1. **Remove old work experience** from the target variant's `resume.experience`
2. **Add new work experience** with:
   - Company name
   - Job title
   - Technologies used
   - Achievement bullets with metrics

3. **Generate new PDF** variant if needed:
   - Print to PDF from `/resume`
   - Save with company-specific name
   - Add to `pdfVariants` array

4. **Test thoroughly**:
   - Verify all sections render
   - Check PDF download
   - Test on mobile

### Emphasizing New Skills

1. **Move skill higher** in the target variant's `resume.skills` array
   - Order matters - most relevant first

2. **Update projects** to highlight new skill usage:
   - Add new projects showcasing skill
   - Update existing project descriptions
   - Bold skill usage with `**skill**`

3. **Update work experience** bullets:
   - Highlight use of new skills
   - Quantify impact where possible

### Seasonal Resume Updates

**Good times to update**:
- After completing new project
- After learning new technology
- After career milestone (promotion, new role)
- Quarterly review of bullets for impact

**Standard process**:
1. Edit `lib/resume-data.ts`
2. Regenerate PDFs with `npm run build` (or `npm run generate-resume-pdfs`)
3. Test all views
4. Commit changes

## Version Control

### Tracking Changes

Resume changes should be committed with clear messages:

```bash
git add lib/resume-data.ts
git add public/resume/kevin-mok-resume*.pdf
git commit -m "feat: update resume with new project and Red Hat experience"
```

### PDF Updates

PDFs are checked into git (reasonable file size ~100KB each). Bulk updates:

```bash
git add public/resume/
git commit -m "chore: regenerate all resume PDFs from updated content"
```

### Large Changes

For major resume restructuring:

1. Create feature branch:
   ```bash
   git checkout -b feature/resume-restructure
   ```

2. Update content and test
3. Regenerate PDFs
4. Commit and push
5. Create PR for review

## Troubleshooting

### Font Not Loading

**Issue**: Resume PDF does not embed `CMUSerif` (fallback serif appears)

**Solutions**:
- Verify local font files exist:
  - `public/fonts/cmu/cmunrm.woff`
  - `public/fonts/cmu/cmunbx.woff`
  - `public/fonts/cmu/cmunti.woff`
  - `public/fonts/cmu/cmunbi.woff`
- Verify `@font-face` declarations in `app/styles/03-fonts.css`
- Rebuild and regenerate PDFs: `npm run build`

**Fallback chain**: Computer Modern → Georgia → Generic serif

### PDF Download Not Working

**Issue**: Download button doesn't work

**Solutions**:
1. Verify PDF file exists: `ls public/resume/filename.pdf`
2. Check filename spelling in `pdfVariants` array
3. Verify `<a>` tag has `download` attribute
4. Try different browser or incognito mode

### Styling Issues

**Issue**: Resume doesn't look right

**Solutions**:
1. Check `.resume-latex` class is applied to root div
2. Verify `13-resume-latex.css` is imported in `globals.css`
3. Check CSS specificity - increase if needed
4. Clear Tailwind cache: `rm -rf .next`

### Navigation Not Working

**Issue**: Can't access resume from sidebar/polybar

**Solutions**:
1. Verify `FocusContext.tsx` has resume in `ContentType` union
2. Check `NavigationTile.tsx` has resume menu item
3. Check `Polybar.tsx` has resume workspace
4. Check `ContentViewer.tsx` has resume case handler
5. Restart dev server

## Performance Monitoring

### Metrics to Track

- Page load time for `/resume`
- PDF download success rate
- User engagement (views, time on page)
- Mobile vs desktop traffic

### Optimization Opportunities

- Consider image optimization if resume has images
- Monitor font CDN performance
- Check bundle size impact of new components
- Profile component render time

## Related Documentation

- [reference/RESUME_FEATURE_OVERVIEW.md](./reference/RESUME_FEATURE_OVERVIEW.md) - High-level overview
- [RESUME_ARCHITECTURE.md](./RESUME_ARCHITECTURE.md) - Technical architecture
- [reference/RESUME_MIGRATION.md](./reference/RESUME_MIGRATION.md) - Migration from old site
