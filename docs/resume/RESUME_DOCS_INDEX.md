# Resume Feature Documentation Index

## Complete Resume Documentation Package

This directory contains the core resume feature documentation. Related AI prompt workflows live in `docs/prompts/` and `prompts/` and are linked from this index.

## Folder Organization

- `docs/resume/` contains core, long-lived resume documentation.
- `docs/resume/workflows/` contains checklists/source lists used during update workflows.
- `docs/resume/reviews/` contains point-in-time change review snapshots.
- `docs/prompts/` contains long-lived AI prompt workflows for resume-related generation tasks.
- `prompts/` contains repo-level prompt artifacts created directly for prompt requests.

## Documentation Files

### 📖 README_RESUME.md
**The starting point for all resume documentation**

- Quick start guide
- Documentation index with recommendations
- Common tasks quick links
- File locations reference
- Architecture overview
- Key features summary
- Technology stack
- Troubleshooting tips

**Read this first** for orientation and navigation to other docs.

---

### 🎯 reference/RESUME_FEATURE_OVERVIEW.md
**High-level overview of what was built**

- Feature summary and quick access points
- Key files and their purposes
- Content structure (contact, projects, experience, skills, education)
- PDF variants available (40+ files)
- Technology stack
- Design decisions and rationale
- Navigation integration
- Mobile responsiveness
- Accessibility features
- Performance considerations
- Future enhancement ideas

**Best for**: Getting a complete picture of the feature without technical details.

---

### 🏗️ RESUME_ARCHITECTURE.md
**Technical architecture and design patterns**

- Component hierarchy and diagrams
- Content flow and data flow
- Data structure and TypeScript interfaces
- Styling system and CSS modules
- Theme override strategy
- Color palette and typography
- Navigation integration details
- Font system and performance
- PDF management system
- Rendering strategy
- Responsive design approach
- Performance optimizations
- Styling specificity and layout
- Extensibility patterns

**Best for**: Developers, architects, and contributors understanding the technical implementation.

---

### ✏️ RESUME_MAINTENANCE.md
**Practical guide for updating and maintaining the resume**

- How to update resume content (single source of truth)
- Updating contact information
- Adding new projects, jobs, skills, education
- Regenerating PDFs
  - Browser print dialog method
  - Programmatic generation (future)
  - Manual PDF creation
- Managing PDF variants (add, remove, rename)
- Styling customization
  - Changing colors
  - Adjusting fonts
  - Mobile optimizations
- Icon management
- Testing changes
- Common tasks (update job, emphasize skills, seasonal updates)
- Version control and git workflow
- Troubleshooting guide
- Performance monitoring

**Best for**: Resume owner performing updates and maintenance tasks.

---

### 📦 reference/RESUME_MIGRATION.md
**Documentation of migration from old Hugo site**

- Overview of migration scope
- Source files and locations
- Content migration details
  - Projects (3 total)
  - Work experience (1 position)
  - Skills (22 technologies)
  - Education (1 degree)
  - Contact information
- Asset migration
  - PDFs (40+ files)
  - Icons (4 SVG files)
- Styling migration
  - LaTeX font preservation
  - Color palette mapping
  - Typography preservation
  - Layout transformation
- Format conversions (Markdown → HTML)
- Date format preservation
- Navigation integration changes
- Data transformation details
- Features preserved vs. enhanced
- Features not migrated
- Data integrity verification checklist
- Migration testing results
- Rollback plan

**Best for**: Understanding what was brought over, transformation process, and validation.

---

### 📁 reference/RESUME_FILE_STRUCTURE.md
**Complete file organization and structure**

- Full directory tree with all 1000+ files
- File breakdown by category
- Component hierarchy
- Data organization
- Styling organization
- Asset organization
- Import dependencies
- Directory tree by purpose
- Navigation map
- Routing structure
- Data flow diagram
- Size breakdown (code, assets, docs)
- Maintenance access points
- Quick reference for common tasks
- Files to edit for specific tasks

**Best for**: Finding files, understanding structure, quick lookups for editing locations.

---

### 🎯 RESUME_VARIANT_POSITIONING.md
**Resume variant selection and targeting guide**

- Canonical list of all active resume variants
- Per-variant purpose and employer-facing angle
- "What it is trying to sell" positioning statements
- Side-by-side comparison for similar variants
- Quick guidance for selecting the best version before applying

**Best for**: Picking the right resume variant for a specific job posting.

---

### 📏 resume-generation-spec.md
**Canonical PDF generation and layout constraints**

- Legacy baseline and whitespace lock rules
- Typography/spacing constraints and tolerances
- Measurement and verification command workflow
- Calibration guidance for per-variant print controls

**Best for**: Any resume PDF generation or print-layout change.

---

### ✅ workflows/CLAUDE_RESUME_CHECKLIST.md
**Operational checklist for assistant-driven resume updates**

- Pre-flight checks before resume edits
- Verification steps and command reminders
- Common pitfalls and guardrails

**Best for**: Repeatable, low-miss execution during resume updates.

---

### 📋 workflows/RESUME-READMES.md
**Tracking list of source README/MD files used for resume bullet workflows**

- Tracks WIP, to-do, and completed source documents
- Used by prompt workflows that refresh variants from source bullets

**Best for**: Keeping multi-repo source coverage organized during resume refresh cycles.

---

### 📝 reviews/RESUME_COMMIT_497f9c8_CHANGELOG.md
**Point-in-time review snapshot for commit `497f9c8`**

- Per-variant bullet selection deltas
- Exact added/removed text references
- Variant-specific print layout variable changes

**Best for**: Auditing and revisiting the specific changes made in that commit.

---

### 🤖 docs/prompts/README_RESUME_POINTS_PROMPT.md
**ChatGPT prompt for variant-aware README bullet generation**

- Exact attachment checklist across target repos
- Copy/paste prompt with deterministic output rules
- One-sentence and word-count constraints for bullets
- Aggressive-but-defensible claim guidelines
- Missing-README fallback instructions (`nomar-stocks`)

**Best for**: Generating recruiter-ready README bullets aligned to resume variant positioning.

---

### 🧩 docs/prompts/RESUME_VARIANT_RESTRUCTURE_PROMPT.md
**ChatGPT prompt for rebuilding resume variants from README variant points**

- Single-pass attachment checklist including all README sources in `UPDATED_README_PATHS.md`
- Deterministic selection rubric for strongest role-relevant bullets
- One-page fit workflow: select strongest bullets, reduce counts, then tune print variables only if needed
- Strict edit boundaries for `lib/resume-data.ts` and optional last-resort changes in `app/styles/13-resume-latex.css`
- Required validation command sequence before finalizing changes

**Best for**: AI-assisted resume variant restructuring with one-page enforcement.

---

### 🚀 prompts/warp-agentic-resume-variant.md
**ChatGPT prompt for adding a Warp-specific agentic/devtools resume variant**

- Attachment checklist spanning `portfolio-site`, Red Hat contributions, `linux-config`, chess, and `openclaw`
- Fixed `warp-agentic` variant ID, label, and PDF file name
- Strict rules for project selection, Red Hat evidence priority, and fixed `Mar 2026 — Present` project dates
- Required resume validation commands and one-page PDF acceptance checks

**Best for**: Adding a company-specific Warp resume variant to the checked-in resume system.

---

## Quick Navigation Guide

### Based on Your Task:

| Task | Start Here |
|------|-----------|
| First time reading? | README_RESUME.md |
| Want overview? | reference/RESUME_FEATURE_OVERVIEW.md |
| Understand architecture? | RESUME_ARCHITECTURE.md |
| Update resume content? | RESUME_MAINTENANCE.md |
| Find a file? | reference/RESUME_FILE_STRUCTURE.md |
| Understand migration? | reference/RESUME_MIGRATION.md |
| Need PDF layout rules? | resume-generation-spec.md |
| Choose the right variant? | RESUME_VARIANT_POSITIONING.md |
| Generate README bullets with AI? | docs/prompts/README_RESUME_POINTS_PROMPT.md |
| Rebuild resume variants from README points with AI? | docs/prompts/RESUME_VARIANT_RESTRUCTURE_PROMPT.md |
| Add a Warp-specific resume variant with AI? | prompts/warp-agentic-resume-variant.md |

### Based on Your Role:

| Role | Start Here |
|------|-----------|
| Resume owner (updating content) | RESUME_MAINTENANCE.md |
| Developer (contributing) | RESUME_ARCHITECTURE.md |
| Architect (understanding design) | RESUME_ARCHITECTURE.md |
| New contributor (learning) | README_RESUME.md |
| Project manager (overview) | reference/RESUME_FEATURE_OVERVIEW.md |
| Job applicant (targeting roles) | RESUME_VARIANT_POSITIONING.md |
| AI-assisted documentation editor | docs/prompts/README_RESUME_POINTS_PROMPT.md |
| AI-assisted resume restructuring | docs/prompts/RESUME_VARIANT_RESTRUCTURE_PROMPT.md |
| AI-assisted company-specific variant author | prompts/warp-agentic-resume-variant.md |

## Documentation Statistics

### Total Documentation
- **12 markdown files** under `docs/resume/` (9 core + 3 auxiliary)
- **3,536 lines** of documentation
- **~132 KB** of documentation
- **~50+ diagrams** and code examples

### Coverage

- ✅ Complete feature overview
- ✅ Full technical architecture
- ✅ Step-by-step maintenance guide
- ✅ Complete migration documentation
- ✅ File structure and navigation
- ✅ Resume variant positioning guide
- ✅ PDF generation/layout specification
- ✅ AI README prompt workflow
- ✅ Common tasks quick reference
- ✅ Troubleshooting guide
- ✅ Code examples and snippets
- ✅ Process diagrams
- ✅ Best practices

## Key Information Captured

### Knowledge Documented

#### Planning
- High-level feature design decisions
- Architecture approach rationale
- Component structure planning
- Data structure design
- Navigation integration strategy
- PDF management approach
- Styling strategy
- SEO optimization approach

#### Implementation
- All 9 new files created
- All 6 files modified
- All 44+ assets copied
- All integrations completed
- All styling implemented
- All features working

#### Maintenance
- Single source of truth (lib/resume-data.ts)
- Update procedures for all sections
- PDF regeneration process
- Styling customization guide
- Testing procedures
- Troubleshooting solutions
- Version control workflow
- Performance monitoring

#### Migration
- Source data transformation
- Asset migration process
- Styling preservation
- Feature enhancement details
- Verification checklist
- Rollback plan

## Document Cross-References

Every document links to related documentation:

```
README_RESUME.md
├─ links to all other docs
├─ reference/RESUME_FEATURE_OVERVIEW.md
│  └─ links to RESUME_MAINTENANCE.md for updates
├─ RESUME_ARCHITECTURE.md
│  └─ links to RESUME_MAINTENANCE.md for customization
├─ RESUME_MAINTENANCE.md
│  └─ links to other docs for specific tasks
├─ reference/RESUME_MIGRATION.md
│  └─ links to RESUME_ARCHITECTURE.md for technical details
├─ reference/RESUME_FILE_STRUCTURE.md
│  └─ links to RESUME_MAINTENANCE.md for common tasks
├─ RESUME_VARIANT_POSITIONING.md
│  └─ links to `lib/resume-data.ts` variant source of truth
├─ resume-generation-spec.md
│  └─ links to layout verification and calibration workflow
├─ docs/prompts/README_RESUME_POINTS_PROMPT.md
│  └─ links to target project README attachment requirements
└─ ../../prompts/warp-agentic-resume-variant.md
   └─ links to Warp-specific source evidence and variant wiring rules
```

## How to Use This Documentation

### For Quick Reference
→ Use **reference/RESUME_FILE_STRUCTURE.md** quick reference tables

### For Variant Selection
→ Use **RESUME_VARIANT_POSITIONING.md** before applying to role-specific jobs

### For Layout Rules
→ Use **resume-generation-spec.md** for baseline/tolerance requirements

### For AI-Assisted README Updates
→ Use **docs/prompts/README_RESUME_POINTS_PROMPT.md** to generate variant-aware resume bullets

### For AI-Assisted Warp Variant Creation
→ Use **prompts/warp-agentic-resume-variant.md** to add the `warp-agentic` company-specific variant safely

### For Learning
→ Start with **README_RESUME.md**, then read **reference/RESUME_FEATURE_OVERVIEW.md**

### For Development
→ Read **RESUME_ARCHITECTURE.md** for technical details

### For Maintenance
→ Keep **RESUME_MAINTENANCE.md** handy for common updates

### For Understanding Decisions
→ See **RESUME_ARCHITECTURE.md** (Design Decisions section) and **reference/RESUME_FEATURE_OVERVIEW.md** (Design Decisions section)

### For Problem Solving
→ See **RESUME_MAINTENANCE.md** (Troubleshooting section) and **README_RESUME.md** (Troubleshooting section)

## What's NOT in This Documentation

❌ Repository setup (see main README)
❌ General portfolio architecture (see portfolio docs)
❌ Next.js fundamentals (see Next.js docs)
❌ CSS basics (see CSS docs)
❌ React fundamentals (see React docs)

These are assumed or documented elsewhere.

## Updating This Documentation

When making changes to the resume feature:

1. **Update content**: Edit `lib/resume-data.ts`, then update RESUME_MAINTENANCE.md if instructions changed
2. **Update styling**: Edit `app/styles/13-resume-latex.css`, then update RESUME_ARCHITECTURE.md and RESUME_MAINTENANCE.md
3. **Add files**: Update reference/RESUME_FILE_STRUCTURE.md with new files
4. **Major changes**: Update reference/RESUME_FEATURE_OVERVIEW.md and RESUME_ARCHITECTURE.md

## Document Maintenance

### Last Updated
- Created: January 11, 2026
- Implementation: Complete
- All docs: Current

### Version
- Feature Version: 1.0 (Complete implementation)
- Documentation Version: 1.0 (Complete coverage)

### Future Updates
When you update the resume, consider also updating:
- RESUME_MAINTENANCE.md (if new sections added)
- reference/RESUME_FEATURE_OVERVIEW.md (if content changes significantly)
- reference/RESUME_FILE_STRUCTURE.md (if file structure changes)
- RESUME_VARIANT_POSITIONING.md (if variants are added/removed/repositioned)
- resume-generation-spec.md (if layout rules/tolerances change)
- docs/prompts/README_RESUME_POINTS_PROMPT.md (if variants, repos, or claim policy changes)
- ../../prompts/warp-agentic-resume-variant.md (if Warp-specific source evidence, naming, or validation rules change)

## Summary

This documentation package provides **complete coverage** of the resume feature:

✅ What was built
✅ Why it was built that way
✅ How it works technically
✅ How to maintain and update it
✅ Where all the files are
✅ Which variant to send for which role
✅ How to enforce PDF layout standards
✅ How to generate AI-assisted README bullets safely
✅ How to add a Warp-specific variant safely
✅ How it was migrated
✅ How to troubleshoot issues
✅ How to extend it

You have everything you need to understand, maintain, and enhance the resume feature for years to come.

---

**Start with**: [README_RESUME.md](./README_RESUME.md)
