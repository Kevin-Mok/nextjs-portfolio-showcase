# Resume Feature File Structure

## Complete File Organization

```
portfolio-site/
├── app/
│   ├── layout.tsx                           ← Added Computer Modern font link
│   ├── globals.css                          ← Added import for 13-resume-latex.css
│   ├── resume/
│   │   └── page.tsx                         ← NEW: Full-page resume route
│   └── styles/
│       ├── 01-theme-variables.css           (existing)
│       ├── 02-theme-effects.css             (existing)
│       ├── 03-fonts.css                     (existing)
│       ├── 04-terminal-theme.css            (existing)
│       ├── 05-base.css                      (existing)
│       ├── 06-typography.css                (existing)
│       ├── 07-terminal-ui.css               (existing)
│       ├── 08-animations.css                (existing)
│       ├── 09-utilities.css                 (existing)
│       ├── 10-mobile.css                    (existing)
│       ├── 11-glass-effects.css             (existing)
│       ├── 12-blog-content.css              (existing)
│       └── 13-resume-latex.css              ← NEW: Resume styling
│
├── components/
│   ├── layout/
│   │   ├── LayoutManager.tsx                (existing)
│   │   ├── Polybar.tsx                      ← MODIFIED: Added resume workspace
│   │   └── Background.tsx                   (existing)
│   ├── tiles/
│   │   ├── ContentViewer.tsx                ← MODIFIED: Added resume case handler
│   │   ├── NavigationTile.tsx               ← MODIFIED: Added resume menu item
│   │   └── content/
│   │       ├── AboutContent.tsx             (existing)
│   │       ├── ResumeContent.tsx            ← NEW: Main resume component
│   │       ├── BlogDetailContent.tsx        (existing)
│   │       ├── ContactContent.tsx           (existing)
│   │       ├── ProjectsOverviewContent.tsx  (existing)
│   │       ├── BlogOverviewContent.tsx      (existing)
│   │       └── resume/                      ← NEW: Sub-components directory
│   │           ├── ResumeHeader.tsx         ← NEW: Contact info header
│   │           ├── ResumeSection.tsx        ← NEW: Section wrapper
│   │           ├── ProjectEntry.tsx         ← NEW: Project display
│   │           ├── WorkEntry.tsx            ← NEW: Work experience display
│   │           └── EducationEntry.tsx       ← NEW: Education display
│   └── (other components...)
│
├── contexts/
│   ├── FocusContext.tsx                     ← MODIFIED: Added resume to ContentType
│   └── ViewContext.tsx                      (existing)
│
├── lib/
│   └── resume-data.ts                       ← NEW: Resume data structure
│
├── public/
│   ├── resume/                              ← NEW: PDF directory
│   │   ├── kevin-mok-resume-ai-web-dev.pdf  (default, hybrid web + agentic)
│   │   ├── kevin-mok-resume-web-dev.pdf     (web dev focused)
│   │   ├── kevin-mok-resume-aws.pdf         (AWS focused)
│   │   ├── kevin-mok-resume-python.pdf      (Python focused)
│   │   ├── kevin-mok-resume-aws-web-dev.pdf (AWS + Web Dev)
│   │   ├── kevin-mok-resume-aws-python.pdf  (AWS + Python)
│   │   ├── kevin-mok-resume-web-dev-django.pdf (Django)
│   │   ├── kevin-mok-resume-it-support.pdf  (IT Support)
│   │   ├── kevin-mok-resume-it-support-aws.pdf (IT + AWS)
│   │   ├── kevin-mok-resume-sales.pdf       (Sales)
│   │   ├── kevin-mok-resume-call-centre.pdf (Call Centre)
│   │   ├── kevin-mok-resume-canonical-openstack.pdf
│   │   ├── kevin-mok-resume-digital-ocean.pdf
│   │   ├── kevin-mok-resume-c.pdf
│   │   ├── kevin-mok-resume-colored.pdf
│   │   ├── kevin-mok-resume-verisk.pdf
│   │   ├── kevin-mok-resume-rbc-aml.pdf
│   │   ├── 1pg-sm.pdf
│   │   ├── 1pg-lg.pdf
│   │   └── (and more PDF variants...)
│   │
│   ├── icons/
│   │   └── resume/                          ← NEW: Icon directory
│   │       ├── smartphone.svg               (phone icon)
│   │       ├── envelope.svg                 (email icon)
│   │       ├── linkedin.svg                 (LinkedIn icon)
│   │       └── github.svg                   (GitHub icon)
│   │
│   └── (other assets...)
│
├── docs/                                    ← NEW: Documentation directory
│   ├── RESUME_FEATURE_OVERVIEW.md           ← This folder
│   ├── RESUME_ARCHITECTURE.md
│   ├── RESUME_MAINTENANCE.md
│   ├── RESUME_MIGRATION.md
│   └── RESUME_FILE_STRUCTURE.md
│   ├── workflows/
│   │   ├── CLAUDE_RESUME_CHECKLIST.md
│   │   └── RESUME-READMES.md
│   └── reviews/
│       └── RESUME_COMMIT_497f9c8_CHANGELOG.md
│
└── (other root files...)
```

## File Breakdown by Category

### New Files (9 files created)

#### Core Components
- `components/tiles/content/ResumeContent.tsx` - Main resume component (283 lines)
- `components/tiles/content/resume/ResumeHeader.tsx` - Contact info header (44 lines)
- `components/tiles/content/resume/ResumeSection.tsx` - Section wrapper (10 lines)
- `components/tiles/content/resume/ProjectEntry.tsx` - Project display (32 lines)
- `components/tiles/content/resume/WorkEntry.tsx` - Work experience (32 lines)
- `components/tiles/content/resume/EducationEntry.tsx` - Education display (19 lines)

#### Data & Config
- `lib/resume-data.ts` - TypeScript resume data (140 lines)

#### Styling
- `app/styles/13-resume-latex.css` - Resume styles (380 lines)

#### Routing
- `app/resume/page.tsx` - Full-page resume route (47 lines)

**Total new code**: ~987 lines

### Modified Files (6 files updated)

1. **contexts/FocusContext.tsx**
   - Added `{ type: 'resume' }` to ContentType union
   - Added 'resume' to validContent array
   - Added case 'resume' to handlePolybarNavigation()
   - Lines changed: ~4 additions

2. **components/layout/Polybar.tsx**
   - Added resume workspace to workspaces array
   - Added resume check to isActive() function
   - Lines changed: ~2 additions

3. **components/tiles/NavigationTile.tsx**
   - Added Resume menu item HTML block
   - Lines changed: ~19 additions

4. **components/tiles/ContentViewer.tsx**
   - Added ResumeContent import
   - Added case 'resume' handler
   - Lines changed: ~2 additions

5. **app/layout.tsx**
   - Added Computer Modern font CDN link
   - Lines changed: ~4 additions

6. **app/globals.css**
   - Added import for 13-resume-latex.css
   - Lines changed: 1 addition

**Total modifications**: ~32 additions

### Assets (44+ files)

#### PDFs (~30-40 files)
- `public/resume/*.pdf` - Various PDF variants
- Total size: ~5.0 MB

#### Icons (4 files)
- `public/icons/resume/smartphone.svg` (2.1 KB)
- `public/icons/resume/envelope.svg` (1.2 KB)
- `public/icons/resume/linkedin.svg` (1.5 KB)
- `public/icons/resume/github.svg` (2.9 KB)
- Total size: ~7.7 KB

### Documentation (5 files)

1. **docs/resume/reference/RESUME_FEATURE_OVERVIEW.md** - High-level overview
2. **docs/resume/RESUME_ARCHITECTURE.md** - Technical architecture
3. **docs/resume/RESUME_MAINTENANCE.md** - Maintenance guide
4. **docs/resume/reference/RESUME_MIGRATION.md** - Migration details
5. **docs/resume/reference/RESUME_FILE_STRUCTURE.md** - This file

## Import Dependencies

### ResumeContent Component

```typescript
// External
import React, { useState } from 'react';

// Internal - Data
import { pdfVariants, resumeVariantById } from '@/lib/resume-data';

// Internal - Components
import { ResumeHeader } from './resume/ResumeHeader';
import { ResumeSection } from './resume/ResumeSection';
import { ProjectEntry } from './resume/ProjectEntry';
import { WorkEntry } from './resume/WorkEntry';
import { EducationEntry } from './resume/EducationEntry';
```

### ResumeHeader Component

```typescript
import React from 'react';
import Image from 'next/image';
import type { ContactInfo } from '@/lib/resume-data';
```

### app/resume/page.tsx

```typescript
import React from 'react';
import type { Metadata } from 'next';
import { FramedPageLayout } from '@/components/layout/FramedPageLayout';
import { ResumeContent } from '@/components/tiles/content/ResumeContent';
```

## Directory Tree by Purpose

### Component Hierarchy

```
components/tiles/content/
├── ResumeContent.tsx                 (orchestrator)
└── resume/                           (sub-components)
    ├── ResumeHeader.tsx              (presentation)
    ├── ResumeSection.tsx             (wrapper)
    ├── ProjectEntry.tsx              (presentation)
    ├── WorkEntry.tsx                 (presentation)
    └── EducationEntry.tsx            (presentation)
```

**Pattern**: Single main component with focused sub-components.

### Data Organization

```
lib/resume-data.ts
├── TypeScript interfaces
│   ├── ContactInfo
│   ├── ResumeProject
│   ├── WorkExperience
│   ├── Education
│   └── Resume
└── variant exports
    ├── DEFAULT_RESUME_VARIANT_ID
    ├── resumeVariants array
    ├── resumeVariantById map
    └── pdfVariants list
```

**Pattern**: Data structure matches component structure.

### Styling Organization

```
app/styles/
├── 01-12 (existing modules)
└── 13-resume-latex.css (new module)
    ├── .resume-latex (root class)
    ├── .resume-header (section)
    ├── .resume-entry (component)
    ├── .resume-section (component)
    ├── .resume-bullets (element)
    └── @media queries
        ├── @media (max-width: 768px)
        └── @media (max-width: 640px)
```

**Pattern**: Single CSS file with nested selectors.

### Asset Organization

```
public/
├── resume/                           (PDFs)
│   ├── kevin-mok-resume-ai-web-dev.pdf  (default)
│   ├── kevin-mok-resume-*.pdf        (variants)
│   └── (40+ files total)
└── icons/resume/                     (SVG icons)
    ├── smartphone.svg
    ├── envelope.svg
    ├── linkedin.svg
    └── github.svg
```

**Pattern**: Organized by content type, referenced by name.

## Navigation Map

### Navigation Integration Points

```
FocusContext.tsx
├── ContentType union        (defines 'resume' type)
├── transitionRules          (validation)
└── handlePolybarNavigation  (route handler)
    ├── Polybar.tsx          (triggers navigation)
    └── NavigationTile.tsx   (triggers navigation)

ContentViewer.tsx
├── Switch statement         (routes by content type)
└── case 'resume'           (renders ResumeContent)
    └── ResumeContent.tsx   (main component)
```

## Routing Structure

```
App Router Routes
├── / (homepage)
│   └── ContentViewer renders ResumeContent when focused
├── /resume (full-page view)
│   └── ResumePage.tsx
│       └── FramedPageLayout
│           └── ResumeContent
├── /blog (existing)
└── /projects (existing)
```

## Data Flow Diagram

```
User Action (click sidebar/polybar)
    ↓
Navigation Handler
    ├─ NavigationTile.onClick()
    └─ Polybar.onNavigate()
    ↓
FocusContext Update
    ├─ handleContentNavigation({ type: 'resume' })
    └─ handlePolybarNavigation('resume')
    ↓
FocusState Broadcast
    ├─ focusState.activeContent = { type: 'resume' }
    └─ Components re-render
    ↓
ContentViewer Router
    ├─ switch(content.type)
    └─ case 'resume': return <ResumeContent />
    ↓
ResumeContent Renders
    ├─ resolves selected variant from lib/resume-data.ts
    ├─ renders ResumeHeader with contact info
    ├─ optionally renders a summary block
    ├─ renders ResumeSection blocks for work, projects, optional agentic engineering, skills, education, and optional supporting experience
    ├─ renders sub-components with data
    └─ applies classes from 13-resume-latex.css
    ↓
Browser Displays Resume
```

## Size Breakdown

### Code Size

| File | Lines | Size |
|------|-------|------|
| ResumeContent.tsx | 83 | 2.8 KB |
| ResumeHeader.tsx | 44 | 1.4 KB |
| ProjectEntry.tsx | 32 | 1.0 KB |
| WorkEntry.tsx | 32 | 0.9 KB |
| EducationEntry.tsx | 19 | 0.6 KB |
| ResumeSection.tsx | 10 | 0.3 KB |
| resume-data.ts | 140 | 4.2 KB |
| 13-resume-latex.css | 380 | 8.5 KB |
| app/resume/page.tsx | 47 | 1.6 KB |
| **Total Code** | **787** | **20.3 KB** |

### Asset Size

| Type | Count | Size |
|------|-------|------|
| PDFs | 40+ | ~5.0 MB |
| Icons | 4 | 7.7 KB |
| CSS | 1 | 8.5 KB |
| **Total Assets** | **44+** | **~5.0 MB** |

### Total Implementation

- **Code**: 20.3 KB (987 lines)
- **Assets**: ~5.0 MB (mostly PDFs)
- **Documentation**: ~200 KB (5 markdown files)
- **Total**: ~5.2 MB

## Maintenance Access Points

### To Update Content
→ `lib/resume-data.ts`

### To Update Styling
→ `app/styles/13-resume-latex.css`

### To Update Icons
→ `public/icons/resume/`

### To Update PDFs
→ `public/resume/`

### To Update Navigation
→ `contexts/FocusContext.tsx`
→ `components/tiles/NavigationTile.tsx`
→ `components/layout/Polybar.tsx`

### To Update Routes
→ `app/resume/page.tsx`
→ `components/tiles/ContentViewer.tsx`

## Quick Reference

### Files to Edit for Common Tasks

| Task | File(s) |
|------|---------|
| Update resume content | `lib/resume-data.ts` |
| Change resume colors | `app/styles/13-resume-latex.css` |
| Add new PDF variant | `components/tiles/content/ResumeContent.tsx` + `public/resume/` |
| Change navigation labels | `components/tiles/NavigationTile.tsx` + `components/layout/Polybar.tsx` |
| Update SEO metadata | `app/resume/page.tsx` |
| Replace contact icons | `public/icons/resume/*.svg` |
| Modify responsive design | `app/styles/13-resume-latex.css` (media queries) |

## Related Documentation

- [RESUME_FEATURE_OVERVIEW.md](./RESUME_FEATURE_OVERVIEW.md) - Feature overview
- [RESUME_ARCHITECTURE.md](../RESUME_ARCHITECTURE.md) - Technical architecture
- [RESUME_MAINTENANCE.md](../RESUME_MAINTENANCE.md) - How to maintain
- [RESUME_MIGRATION.md](./RESUME_MIGRATION.md) - Migration from old site
