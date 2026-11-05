import React from 'react';
import type { WorkExperience } from '@/lib/resume-data';

interface WorkEntryProps {
  work: WorkExperience;
}

export const WorkEntry: React.FC<WorkEntryProps> = ({ work }) => {
  const isNtchartsLink = work.companyUrl?.includes('ntcharts.com');

  return (
    <div className="resume-entry">
      <div className="resume-entry-header">
        <h3 className="entry-company">
          {work.companyUrl ? (
            <a
              href={work.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`entry-company-link${isNtchartsLink ? ' entry-link-ntcharts' : ''}`}
            >
              {work.company}
            </a>
          ) : (
            work.company
          )}
        </h3>
        <span className="entry-date">{work.date}</span>
      </div>

      <div className="entry-subtitle">
        {work.titleUrl ? (
          <a
            href={work.titleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="entry-position entry-position-link"
          >
            {work.title}
          </a>
        ) : (
          <span className="entry-position">{work.title}</span>
        )}
        {work.languages.length > 0 && (
          <span className="entry-tech-inline">&lt;{work.languages.join(', ')}&gt;</span>
        )}
        {work.evidenceUrl ? (
          <a
            href={work.evidenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="entry-evidence-link"
          >
            {work.evidenceLabel ?? 'Evidence'}
          </a>
        ) : null}
      </div>

      <ul className="resume-bullets">
        {work.bullets.map((bullet, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />
        ))}
      </ul>
    </div>
  );
};
