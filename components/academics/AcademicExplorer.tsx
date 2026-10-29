'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { courses } from '@/lib/academic-data';
import {
  DEFAULT_FILTERS,
  filterCourses,
  getMarkHue,
  sortCourses,
  summarizeCourses,
  type CourseFilters,
  type SortDirection,
  type SortKey,
} from '@/lib/academics';

const columns: { key: SortKey; label: string }[] = [
  { key: 'code', label: 'Course code' },
  { key: 'title', label: 'Course title' },
  { key: 'year', label: 'Year / term' },
  { key: 'credits', label: 'Credits' },
  { key: 'mark', label: 'Mark' },
  { key: 'grade', label: 'Grade' },
  { key: 'languages', label: 'Languages' },
];

const prefixes = [...new Set(courses.map(course => course.code.slice(0, 3)))].sort();
const years = [...new Set(courses.map(course => course.year))].sort((a, b) => b - a);
const languages = [...new Set(courses.flatMap(course => [...course.languages]))].sort();
const attemptCounts = new Map<string, number>();
for (const course of courses) {
  attemptCounts.set(course.code, (attemptCounts.get(course.code) ?? 0) + 1);
}

export function AcademicExplorer() {
  const [filters, setFilters] = useState<CourseFilters>({ ...DEFAULT_FILTERS });
  const [sortKey, setSortKey] = useState<SortKey>('mark');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const filteredCourses = filterCourses(courses, filters);
  const visibleCourses = sortCourses(filteredCourses, sortKey, sortDirection);
  const summary = summarizeCourses(filteredCourses);

  function updateFilter(key: keyof CourseFilters, value: string) {
    setFilters(current => ({ ...current, [key]: value }));
  }

  function changeSort(key: SortKey) {
    setSortDirection(key === sortKey && sortDirection === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  }

  function reset() {
    setFilters({ ...DEFAULT_FILTERS });
    setSortKey('mark');
    setSortDirection('desc');
  }

  return (
    <div className="academics-page">
      <Link href="/" className="academics-back">Back to portfolio</Link>

      <header className="academics-header">
        <h1>Academic Record</h1>
        <p>Kevin Mok · University of Toronto</p>
        <p>Explore my coursework by subject, year, and programming language.</p>
      </header>

      <dl className="academics-summary" aria-live="polite" aria-atomic="true">
        <div>
          <dt>Filtered percentage average</dt>
          <dd>{summary.percentage === null ? '—' : `${summary.percentage.toFixed(2)}%`}</dd>
        </div>
        <div>
          <dt>GPA equivalent</dt>
          <dd>{summary.gpaEquivalent === null ? '—' : <>{summary.gpaEquivalent.toFixed(1)} <small>/ 4.0</small></>}</dd>
        </div>
        <div>
          <dt>Marks included</dt>
          <dd>{summary.gradedCount} <small>across {summary.credits.toFixed(1)} credits</small></dd>
        </div>
      </dl>
      <p className="academics-method">
        The percentage average is credit-weighted across the visible numeric marks, including repeat and EXT attempts.
        {' '}GPA equivalent converts that average using the{' '}
        <a href="https://artsci.calendar.utoronto.ca/academic-record">U of T grade scale</a>;
        it is not my official cumulative GPA or an average of course grade points.
        Nonnumeric outcomes and zero-credit courses are excluded.
      </p>

      <div className="academics-filters" role="group" aria-label="Filter courses">
        <label>
          Course prefix
          <select name="prefix" value={filters.prefix} onChange={event => updateFilter('prefix', event.target.value)}>
            <option value="all">All subjects</option>
            {prefixes.map(prefix => <option key={prefix} value={prefix}>{prefix}</option>)}
          </select>
        </label>
        <label>
          Year
          <select name="year" value={filters.year} onChange={event => updateFilter('year', event.target.value)}>
            <option value="all">All years</option>
            {years.map(year => <option key={year} value={String(year)}>{year}</option>)}
          </select>
        </label>
        <label>
          Programming language
          <select name="language" value={filters.language} onChange={event => updateFilter('language', event.target.value)}>
            <option value="all">All languages</option>
            {languages.map(language => <option key={language} value={language}>{language}</option>)}
          </select>
        </label>
        <button type="button" className="academics-reset" onClick={reset}>Reset to CSC</button>
      </div>

      <p className="academics-result-count">
        Showing {visibleCourses.length} of {courses.length} course records. Select a column heading to sort.
      </p>
      <div className="academics-table-region" role="region" aria-label="Course records, scroll horizontally for all columns" tabIndex={0}>
        <table className="academics-table">
          <caption className="sr-only">Kevin Mok’s course attempts and marks. Repeat attempts remain separate records.</caption>
          <thead>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={sortKey === column.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button type="button" onClick={() => changeSort(column.key)}>
                    {column.label}
                    {sortKey === column.key && (
                      <svg className="academics-sort-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d={sortDirection === 'asc' ? 'M8 13V3M4 7l4-4 4 4' : 'M8 3v10M4 9l4 4 4-4'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleCourses.map(course => (
              <tr key={course.id}>
                <td>
                  <span className="academics-course-code">{course.code}</span>
                  {(attemptCounts.get(course.code) ?? 0) > 1 && <span className="academics-term">Repeated course</span>}
                </td>
                <td className="academics-course-title">{course.title}</td>
                <td className="academics-number">{course.year}<span className="academics-term">{course.term}</span></td>
                <td className="academics-number">{course.credits.toFixed(2)}</td>
                <td className="academics-number">
                  {course.mark === null ? '—' : (
                    <span className="academics-mark">
                      <span
                        className="academics-mark-dot"
                        style={{ '--mark-color': `hsl(${getMarkHue(course.mark)} 65% 45%)` } as CSSProperties}
                        aria-hidden="true"
                      />
                      {course.mark}%
                    </span>
                  )}
                </td>
                <td>{course.grade}{course.status && <span className="academics-term">{course.status}</span>}</td>
                <td>
                  {course.languages.length > 0 ? (
                    <div className="academics-tags">
                      {course.languages.map(language => course.languageSource ? (
                        <a key={language} className="academics-tag" href={course.languageSource.url} title={course.languageSource.label}>{language}</a>
                      ) : <span key={language} className="academics-tag">{language}</span>)}
                    </div>
                  ) : <span className="academics-unknown">{course.languageStatus === 'not-applicable' ? 'Not applicable' : 'Not verified'}</span>}
                </td>
              </tr>
            ))}
            {visibleCourses.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="academics-empty">
                  <strong>No courses match these filters.</strong>
                  Choose another year or language, or reset to CSC to start again.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="academics-source-note">
        Marks run from red at 50% to green at 100%; lower marks remain red.
        {' '}CR = credit, LWD = late withdrawal, IPR = in progress, and EXT = extra course.
        {' '}Language tags link to supporting course materials when verified. “Not verified” means no language claim is made.
      </p>
    </div>
  );
}
