export interface CourseRecord {
  id: string;
  code: string;
  title: string;
  year: number;
  term: 'Winter' | 'Summer' | 'Fall';
  credits: number;
  mark: number | null;
  grade: string;
  status: string | null;
  languages: readonly string[];
  languageStatus: 'verified' | 'unverified' | 'not-applicable';
  languageSource?: { url: string; label: string };
}

export interface CourseFilters {
  prefix: string;
  year: string;
  language: string;
}

export type SortKey = 'code' | 'title' | 'year' | 'credits' | 'mark' | 'grade' | 'languages';
export type SortDirection = 'asc' | 'desc';

export const DEFAULT_FILTERS: Readonly<CourseFilters> = { prefix: 'CSC', year: 'all', language: 'all' };

export function filterCourses(courses: readonly CourseRecord[], filters: CourseFilters): CourseRecord[] {
  return courses.filter(course =>
    (filters.prefix === 'all' || course.code.startsWith(filters.prefix)) &&
    (filters.year === 'all' || String(course.year) === filters.year) &&
    (filters.language === 'all' || (course.languageStatus === 'verified' && course.languages.includes(filters.language)))
  );
}

const gradeOrder = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
const termOrder = { Winter: 0, Summer: 1, Fall: 2 };

function sortValue(course: CourseRecord, key: SortKey): string | number | null {
  if (key === 'year') return course.year * 3 + termOrder[course.term];
  if (key === 'grade') {
    const rank = gradeOrder.indexOf(course.grade);
    return rank === -1 ? null : rank;
  }
  if (key === 'languages') return course.languages.length ? course.languages.join(', ') : null;
  return course[key];
}

export function sortCourses(courses: readonly CourseRecord[], key: SortKey, direction: SortDirection): CourseRecord[] {
  return [...courses].sort((a, b) => {
    const left = sortValue(a, key);
    const right = sortValue(b, key);
    if (left === null && right !== null) return 1;
    if (right === null && left !== null) return -1;
    const comparison = typeof left === 'number' && typeof right === 'number'
      ? left - right
      : String(left ?? '').localeCompare(String(right ?? ''));
    return comparison * (direction === 'asc' ? 1 : -1) || a.id.localeCompare(b.id);
  });
}

// Lower bounds also handle fractional averages without rounding across a grade boundary.
const gpaThresholds = [[85, 4], [80, 3.7], [77, 3.3], [73, 3], [70, 2.7], [67, 2.3], [63, 2], [60, 1.7], [57, 1.3], [53, 1], [50, 0.7]] as const;

export function getGpaEquivalent(percentage: number): number {
  return gpaThresholds.find(([minimum]) => percentage >= minimum)?.[1] ?? 0;
}

export function summarizeCourses(courses: readonly CourseRecord[]): {
  gradedCount: number;
  credits: number;
  percentage: number | null;
  gpaEquivalent: number | null;
} {
  let gradedCount = 0;
  let credits = 0;
  let weightedMarks = 0;
  for (const course of courses) {
    if (course.mark === null || course.credits <= 0) continue;
    gradedCount++;
    credits += course.credits;
    weightedMarks += course.mark * course.credits;
  }
  const percentage = credits > 0 ? weightedMarks / credits : null;
  return { gradedCount, credits, percentage, gpaEquivalent: percentage === null ? null : getGpaEquivalent(percentage) };
}

export function getMarkHue(mark: number): number {
  return (Math.min(100, Math.max(50, mark)) - 50) * 2.4;
}
