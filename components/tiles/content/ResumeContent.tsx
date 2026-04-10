'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  pdfVariants,
  resumeVariantById,
  resolveResumeVariantId,
  type ResumeVariantId,
} from '@/lib/resume-data';
import { ResumeHeader } from './resume/ResumeHeader';
import { ResumeSection } from './resume/ResumeSection';
import { ProjectEntry } from './resume/ProjectEntry';
import { WorkEntry } from './resume/WorkEntry';
import { EducationEntry } from './resume/EducationEntry';

interface ResumeContentProps {
  initialVariantId?: string;
  renderMode?: 'screen' | 'pdf';
}

const ResumeContentComponent: React.FC<ResumeContentProps> = ({
  initialVariantId,
  renderMode = 'screen',
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<ResumeVariantId>(() =>
    resolveResumeVariantId(initialVariantId)
  );

  useEffect(() => {
    setSelectedVariantId(resolveResumeVariantId(initialVariantId));
  }, [initialVariantId]);

  const selectedVariant = resumeVariantById[selectedVariantId];
  const sectionTitles = useMemo(
    () => ({
      projects: selectedVariant.sectionTitles?.projects ?? 'Web Dev Projects',
      experience:
        selectedVariant.sectionTitles?.experience ??
        (selectedVariant.otherExperience && selectedVariant.otherExperience.length > 0
          ? 'Relevant Work Experience'
          : 'Work Experience'),
      agenticEngineering:
        selectedVariant.sectionTitles?.agenticEngineering ?? 'Agentic Engineering',
      skills: selectedVariant.sectionTitles?.skills ?? 'Skills',
      education: selectedVariant.sectionTitles?.education ?? 'Education',
    }),
    [selectedVariant.otherExperience, selectedVariant.sectionTitles]
  );
  const otherExperienceTitle =
    selectedVariant.otherExperienceTitle ?? 'Other Work Experience';

  const resume = selectedVariant.resume;
  const boldSkills = useMemo(
    () => new Set(selectedVariant.skillsBold ?? resume.skills),
    [selectedVariant.skillsBold, resume.skills]
  );
  const experienceSection = (
    <ResumeSection key="experience" title={sectionTitles.experience}>
      {resume.experience.map((work) => (
        <WorkEntry key={`${work.company}-${work.date}-${work.title}`} work={work} />
      ))}
    </ResumeSection>
  );
  const projectsSection =
    resume.projects.length > 0 ? (
      <ResumeSection key="projects" title={sectionTitles.projects}>
        {resume.projects.map((project) => (
          <ProjectEntry key={`${project.name}-${project.date}`} project={project} />
        ))}
      </ResumeSection>
    ) : null;
  const agenticEngineeringSection =
    selectedVariant.agenticEngineering && selectedVariant.agenticEngineering.length > 0 ? (
      <ResumeSection key="agentic-engineering" title={sectionTitles.agenticEngineering}>
        {selectedVariant.agenticEngineering.map((project) => (
          <ProjectEntry key={`${project.name}-${project.date}`} project={project} />
        ))}
      </ResumeSection>
    ) : null;
  const primarySections =
    selectedVariant.primarySectionOrder === 'projects-first'
      ? [projectsSection, agenticEngineeringSection, experienceSection]
      : [experienceSection, projectsSection, agenticEngineeringSection];

  return (
    <div
      className={`resume-latex ${
        renderMode === 'pdf' ? 'resume-latex--pdf' : 'resume-latex--screen'
      } resume-variant-${selectedVariantId}`}
    >
      <ResumeHeader contact={resume.contact} />

      {selectedVariant.showSummary && selectedVariant.summary ? (
        <div className="resume-summary-block">
          <h2 className="resume-section-title resume-summary-title">Intro</h2>
          <p className="resume-summary">{selectedVariant.summary}</p>
        </div>
      ) : null}

      <div className="pdf-download-section">
        <a href={`/resume/${selectedVariant.fileName}`} download className="pdf-download-btn">
          Download PDF
        </a>

        <div className="pdf-variant-selector">
          <label htmlFor="pdf-variant">Resume variant:</label>
          <select
            id="pdf-variant"
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(resolveResumeVariantId(e.target.value))}
          >
            {pdfVariants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {primarySections}

      {selectedVariant.otherExperience && selectedVariant.otherExperience.length > 0 ? (
        <ResumeSection title={otherExperienceTitle}>
          {selectedVariant.otherExperience.map((work) => (
            <WorkEntry key={`${work.company}-${work.date}-${work.title}`} work={work} />
          ))}
        </ResumeSection>
      ) : null}

      <ResumeSection title={sectionTitles.skills}>
        {selectedVariant.skillsHtmlLines && selectedVariant.skillsHtmlLines.length > 0 ? (
          <div className="resume-skills-lines">
            {selectedVariant.skillsHtmlLines.map((line) => (
              <p
                key={line}
                className="resume-skill-line"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
        ) : selectedVariant.skillsLines && selectedVariant.skillsLines.length > 0 ? (
          <div className="resume-skills-lines">
            {selectedVariant.skillsLines.map((line) => (
              <p key={line} className="resume-skill-line">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="resume-skills-inline">
            {resume.skills.map((skill, index) => (
              <React.Fragment key={skill}>
                {boldSkills.has(skill) ? <strong>{skill}</strong> : skill}
                {index < resume.skills.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </p>
        )}
      </ResumeSection>

      <ResumeSection title={sectionTitles.education}>
        {resume.education.map((edu) => (
          <EducationEntry key={`${edu.institution}-${edu.date}`} education={edu} />
        ))}
      </ResumeSection>

      {selectedVariant.references && (
        <ResumeSection title="References">
          <p className="resume-references">{selectedVariant.references}</p>
        </ResumeSection>
      )}
    </div>
  );
};

export const ResumeContent = React.memo(ResumeContentComponent);
