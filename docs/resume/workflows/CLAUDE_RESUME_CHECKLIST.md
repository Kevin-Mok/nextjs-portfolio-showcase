# Claude Agent Resume Feature Checklist

**Use this checklist before making ANY changes to the resume feature.**

## Pre-Work Checklist

Before starting work on resume:

- [ ] Read `CLAUDE.md` → "LaTeX-Styled Resume" section (2 min)
- [ ] Read `docs/resume/README_RESUME.md` for context (5 min)
- [ ] Identify which documentation applies to your task:
  - Updating content? → `RESUME_MAINTENANCE.md`
  - Understanding code? → `RESUME_ARCHITECTURE.md`
  - Finding files? → `reference/RESUME_FILE_STRUCTURE.md`
  - Understanding migration? → `reference/RESUME_MIGRATION.md`
  - Need overview? → `reference/RESUME_FEATURE_OVERVIEW.md`

## Single Source of Truth

**Remember**: All resume content is in ONE file:

```
lib/resume-data.ts
```

Any changes here automatically appear on:
- Homepage resume tile
- `/resume` full page
- Every PDF variant

## Common Tasks

### Updating Resume Content

```
1. Open: lib/resume-data.ts
2. Edit: target entry inside resumeVariants
   - contact: phone, email, LinkedIn, GitHub
   - projects: array of project entries
   - agenticEngineering: optional dedicated AI/devtools project array
   - experience: array of work experience
   - skills: array of technologies (order matters!)
   - education: array of education entries
3. Test: http://localhost:3000 (click "Resume" in sidebar)
4. Test: http://localhost:3000/resume (full page)
5. Commit: "feat: update resume with [what changed]"
```

### Regenerating PDFs

```
1. Navigate to: /resume
2. Press: Cmd+P (Mac) or Ctrl+P (Windows)
3. Click: "Save as PDF"
4. Save with correct filename (e.g., kevin-mok-resume-web-dev.pdf)
5. Replace: public/resume/old-filename.pdf
6. Commit: "chore: regenerate resume PDFs from updated content"
```

### Adding New PDF Variant

```
1. Create/generate PDF
2. Save to: public/resume/new-name.pdf
3. Edit: lib/resume-data.ts
4. Register the PDF in: scripts/lib/resume-pdf-variants.mjs
5. Test: /resume dropdown shows new variant
6. Test: Download works
7. Commit: "feat: add [variant] resume variant"
```

### Changing Resume Styling

```
1. Open: app/styles/13-resume-latex.css
2. Edit only in this file (don't add inline styles!)
3. Test: npm run dev
4. Test: Desktop view
5. Test: Mobile view (responsive)
6. Test: All themes (Tokyo Night, Nord, Solarized)
7. Remember: Don't change font or white/black colors without discussing!
```

### Adding New Resume Section

```
1. Open: lib/resume-data.ts
2. Add interface if needed
3. Add data to the target resumeVariants entry
4. Create component: components/tiles/content/resume/SectionEntry.tsx
5. Open: components/tiles/content/ResumeContent.tsx
6. Add <ResumeSection> with new component
7. Test: /resume page shows new section
8. Commit: "feat: add [section] to resume"
```

## Code Rules

### DO
- Keep `lib/resume-data.ts` as single source of truth
- Put all styling in `app/styles/13-resume-latex.css`
- Use `.resume-latex` class for styling scope
- Test responsive design (desktop + mobile)
- Update PDFs when content changes
- Test on `/resume` page
- Reference `/docs/` when uncertain

### DON'T
- Add inline styles (use CSS module)
- Change Computer Modern Serif font
- Change white background / black text
- Hardcode colors (use CSS variables)
- Break navigation integration
- Forget to regenerate PDFs after content updates
- Add resume-specific code outside of resume files

## Testing Before Commit

Run this checklist before committing ANY resume changes:

```
□ Content updated in lib/resume-data.ts
□ Homepage resume tile shows updated content
□ /resume full page shows updated content
□ Mobile view responsive (check <640px, <768px, >1024px)
□ All themes work (Tokyo Night, Nord, Solarized Light)
□ Resume always white background + black text
□ Computer Modern Serif font loads
□ PDF download works with default variant
□ PDF dropdown has correct variants
□ No TypeScript errors (npm run typecheck)
□ No linting errors (npm run lint)
```

## Git Commit Message Format

Use conventional commits:

```
feat: update resume with Red Hat experience
feat: add new project to resume
fix: correct resume styling on mobile
chore: regenerate all resume PDFs
docs: update resume documentation
```

## Files That Interact With Resume

Be careful when editing these - they affect resume:

1. **contexts/FocusContext.tsx** - Content type routing
2. **components/tiles/NavigationTile.tsx** - Sidebar menu
3. **components/layout/Polybar.tsx** - Top navigation
4. **components/tiles/ContentViewer.tsx** - Content renderer
5. **app/layout.tsx** - Computer Modern font link
6. **app/globals.css** - CSS module imports

If you edit any of these, ensure resume still works.

## Red Flags

Don't do these:

❌ Edit resume without reading relevant /docs/
❌ Add inline styles to resume components
❌ Change Computer Modern Serif font
❌ Change white/black color scheme
❌ Commit code without testing responsive design
❌ Update content without regenerating PDFs
❌ Break FocusContext navigation integration
❌ Move resume files without updating imports
❌ Add new features without updating documentation

## Documentation Links

Keep these docs handy:

- **Quick start**: `docs/resume/README_RESUME.md`
- **Overview**: `docs/resume/reference/RESUME_FEATURE_OVERVIEW.md`
- **Architecture**: `docs/resume/RESUME_ARCHITECTURE.md`
- **How to update**: `docs/resume/RESUME_MAINTENANCE.md`
- **Migration details**: `docs/resume/reference/RESUME_MIGRATION.md`
- **File locations**: `docs/resume/reference/RESUME_FILE_STRUCTURE.md`
- **Doc index**: `docs/resume/RESUME_DOCS_INDEX.md`

## Getting Help

If you're stuck:

1. Check the relevant doc from above
2. Look at similar components for patterns
3. Check `AGENTS.md` Section 7 for quick reference
4. Check `CLAUDE.md` "LaTeX-Styled Resume" section

## Summary

**Golden Rules**:

1. All content → `lib/resume-data.ts`
2. All styling → `app/styles/13-resume-latex.css`
3. All docs → `/docs/` folder
4. Always test: desktop + mobile + all themes
5. Regenerate PDFs after content changes
6. Read relevant docs before making changes

---

**Last Updated**: January 11, 2026
**Status**: Complete & documented
