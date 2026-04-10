# Resume Feature Overview

## Summary

A complete LaTeX-styled resume system was added to the portfolio site. The resume displays professionally with:
- Computer Modern Serif font (authentic LaTeX aesthetic)
- White background with black text (recruiter-friendly)
- Multiple PDF variants for different job applications
- Variant-specific summary and section controls for targeted recruiter narratives
- Prominent navigation placement (sidebar + polybar)
- Full-page route with SEO optimization
- 40+ downloadable PDF variants

## Quick Access Points

- **Homepage tile**: Click "Resume" in sidebar navigation or "resume" in polybar
- **Full page**: Visit `/resume` directly
- **PDF downloads**: Select variant from dropdown and download

## Key Files

### Core Implementation (8 new files)
- `lib/resume-data.ts` - Single source of truth for resume content
- `components/tiles/content/ResumeContent.tsx` - Main component
- `components/tiles/content/resume/ResumeHeader.tsx` - Contact info header
- `components/tiles/content/resume/ResumeSection.tsx` - Section wrapper
- `components/tiles/content/resume/ProjectEntry.tsx` - Project display
- `components/tiles/content/resume/WorkEntry.tsx` - Work experience display
- `components/tiles/content/resume/EducationEntry.tsx` - Education display
- `app/resume/page.tsx` - Full-page route with SEO metadata

### Styling
- `app/styles/13-resume-latex.css` - LaTeX-inspired typography and layout

### Assets
- `public/resume/*.pdf` - All 40+ PDF variants
- `public/icons/resume/*.svg` - Contact info icons (phone, email, LinkedIn, GitHub)

### Modified Files (6 files)
- `contexts/FocusContext.tsx` - Added resume to ContentType union
- `components/layout/Polybar.tsx` - Added resume workspace
- `components/tiles/NavigationTile.tsx` - Added resume menu item
- `components/tiles/ContentViewer.tsx` - Added resume rendering
- `app/layout.tsx` - Added Computer Modern font CDN link
- `app/globals.css` - Imported resume CSS module

## Content Structure

### Resume Sections

1. **Contact Header**
   - Name: Kevin Mok
   - Title: Software Engineer
   - Phone: 647-685-2500
   - Email: me@kevin-mok.com
   - LinkedIn: linkedin.com/in/Kev-Mok
   - GitHub: github.com/Kevin-Mok

2. **Visible Summary** (variant-specific)
   - Optional recruiter-facing intro block directly under the contact header

3. **Primary Resume Sections** (default `ai-web-dev` example)
   - Web Dev Work Experience: `www.ntcharts.com`
   - Web Dev Projects: `Kevin Mok's Chess Analytics`, `www.kevin-mok.com`
   - Agentic Engineering: `AI CLI Dotfiles`
   - Additional Engineering Experience: Red Hat cloud/software-engineering bullets

4. **Skills**
   - Either inline skills or grouped `skillsHtmlLines` / `skillsLines`, depending on the variant

5. **Education**
   - University of Toronto (St. George)
   - Computer Science Specialist
   - 3.84 GPA
   - 2019 — 2024

## PDF Variants Available

### Primary Resumes
- `kevin-mok-resume-ai-web-dev.pdf` - AI + Web Dev focused (default)
- `kevin-mok-resume-web-dev.pdf` - Web Development focused

### Specialized Variants
- `kevin-mok-resume-aws.pdf` - AWS/Cloud focused
- `kevin-mok-resume-python.pdf` - Python focused
- `kevin-mok-resume-aws-web-dev.pdf` - AWS + Web Dev
- `kevin-mok-resume-aws-python.pdf` - AWS + Python
- `kevin-mok-resume-web-dev-django.pdf` - Web Dev + Django
- `kevin-mok-resume-it-support.pdf` - IT Support focused
- `kevin-mok-resume-it-support-aws.pdf` - IT Support + AWS
- `kevin-mok-resume-sales.pdf` - Sales focused
- `kevin-mok-resume-call-centre.pdf` - Call Centre focused

Plus additional variants for specific companies/positions.

## Technology Stack

- **Frontend**: React (TypeScript)
- **Font**: Computer Modern Serif (CDN)
- **Styling**: CSS (modular architecture)
- **State Management**: React Context (FocusContext)
- **Navigation**: Next.js 15 App Router
- **Components**: Modular sub-component structure
- **Data**: Static TypeScript data structure

## Design Decisions

### Static Component (Not MDX)
Resume is structured data, not prose. Using TypeScript interfaces provides:
- Better type safety
- Easier maintenance
- Simpler data structure than MDX frontmatter
- Direct TypeScript references in components

### Automated Build-Time PDF Generation
Resume PDFs are generated during `npm run build` and written to `/public/resume/`:
- Keeps existing recruiter-facing download URLs stable
- Ensures PDFs stay in sync with current variant data in `lib/resume-data.ts`
- Uses headless Chrome print output from the real `/resume` UI for LaTeX-style fidelity
- Supports multiple typed variants without manual browser export

### Theme Override
Resume always displays white background with black text:
- Professional, recruiter-friendly appearance
- Matches PDF download styling
- Consistent across all site themes (Tokyo Night, Nord, Solarized)
- Ensures visibility and readability

### Prominent Navigation
Resume accessible from:
- Sidebar file tree (after About)
- Polybar workspace buttons
- Full-page route `/resume`
- Download button on both tile and full-page views

## SEO Optimization

### Metadata
- Title: "Resume - Kevin Mok | Software Engineer"
- Description: Professional summary with tech keywords
- Keywords: Resume, CV, TypeScript, React, Node.js, Python, AWS, etc.

### Open Graph
- Type: profile
- Includes title, description, URL
- Twitter card support for social sharing

### Static Generation
- ISR (Incremental Static Regeneration) enabled
- 1-hour revalidation for updates
- Optimized for search engine indexing

## Navigation Flow

### Tiled Mode (Homepage)
```
User → Polybar/Sidebar "Resume" → FocusContext → ContentViewer → ResumeContent
```

### Full-Page Mode
```
User → Direct URL /resume → App Router → ResumePage → ResumeContent
```

Both modes render the same `ResumeContent` component.

## Mobile Responsiveness

- Responsive font scaling: `clamp(15px, 2.5vw, 17px)`
- Contact header stacks vertically on <640px
- PDF button full width on mobile
- Touch targets ≥44x44px
- Optimized bullet point indentation for narrow screens

## Accessibility

- Semantic HTML structure (section, h1, h2, ul, li)
- Keyboard navigation support (Tab, Enter, Esc)
- Visible focus indicators on interactive elements
- Link underlines on hover
- ARIA labels on download functionality

## Performance Considerations

- Component memoization with `React.memo()`
- CSS modular architecture (13-resume-latex.css)
- CDN font loading (Computer Modern)
- No additional dependencies
- Lightweight sub-component structure

## Future Enhancements

Possible additions (not currently implemented):
- Dynamic PDF generation from web version using Puppeteer
- Resume builder UI to customize sections
- Visitor analytics for resume page views
- Print-optimized stylesheet
- Multiple language versions
- Version history tracking
