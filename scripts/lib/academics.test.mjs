import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_FILTERS, filterCourses, sortCourses, summarizeCourses, getGpaEquivalent, getMarkHue } from '../../lib/academics.ts';
import { courses } from '../../lib/academic-data.ts';

const record = (overrides = {}) => ({
  id: 'CSC100H1-2020-Winter', code: 'CSC100H1', title: 'Example course', year: 2020,
  term: 'Winter', credits: 0.5, mark: 80, grade: 'A-', status: null,
  languages: [], languageStatus: 'unverified', ...overrides,
});

test('default CSC view preserves repeated and EXT attempts without counting withdrawals as zero', () => {
  const selected = filterCourses(courses, DEFAULT_FILTERS);
  assert.equal(selected.length, 23);
  assert.equal(selected.filter(c => c.status === 'EXT').length, 2);
  assert.equal(selected.filter(c => c.code === 'CSC148H1').length, 2);
  const summary = summarizeCourses(selected);
  assert.equal(summary.gradedCount, 22);
  assert.equal(summary.credits, 11);
  assert.equal(summary.percentage.toFixed(2), '86.68');
  assert.equal(summary.gpaEquivalent, 4);
});

test('filters combine prefix, calendar year and verified language with AND', () => {
  const selected = filterCourses(courses, { prefix: 'CSC', year: '2018', language: 'C' });
  assert.deepEqual(selected.map(c => c.code), ['CSC209H1']);
  assert.equal(summarizeCourses(selected).percentage, 83);
  assert.equal(summarizeCourses(selected).gpaEquivalent, 3.7);
  assert.equal(filterCourses(courses, { prefix: 'MAT', year: '2018', language: 'C' }).length, 0);
  assert.equal(filterCourses(courses, { prefix: 'all', year: 'all', language: 'all' }).length, 49);
});

test('averages weight marks by credits, include failures and exclude null and zero credits', () => {
  const summary = summarizeCourses([
    record({ mark: 50 }), record({ mark: 100, credits: 1 }),
    record({ mark: null, grade: 'CR', credits: 5 }), record({ mark: 0, credits: 0 }),
  ]);
  assert.equal(summary.percentage, 250 / 3);
  assert.equal(summary.credits, 1.5);
  assert.equal(summary.gradedCount, 2);
  assert.equal(summary.gpaEquivalent, 3.7);
  assert.equal(summarizeCourses([record({ mark: 43, grade: 'F' })]).percentage, 43);
});

test('empty or ungraded views have no fabricated percentage or GPA', () => {
  for (const selected of [[], [record({ mark: null })], [record({ credits: 0 })]]) {
    assert.deepEqual(summarizeCourses(selected), { gradedCount: 0, credits: 0, percentage: null, gpaEquivalent: null });
  }
});

test('GPA equivalents use unrounded thresholds, including just below 85', () => {
  for (const [mark, expected] of [[0, 0], [49.99, 0], [50, 0.7], [53, 1], [57, 1.3], [60, 1.7], [63, 2], [67, 2.3], [70, 2.7], [73, 3], [77, 3.3], [80, 3.7], [84.999, 3.7], [85, 4], [100, 4]]) {
    assert.equal(getGpaEquivalent(mark), expected, `GPA equivalent at ${mark}`);
  }
  const summary = summarizeCourses([record({ mark: 84.999 })]);
  assert.equal(summary.percentage.toFixed(2), '85.00');
  assert.equal(summary.gpaEquivalent, 3.7);
});

test('mark colors clamp the display scale without changing marks', () => {
  for (const [mark, hue] of [[0, 0], [43, 0], [50, 0], [75, 60], [100, 120], [110, 120]]) {
    assert.equal(getMarkHue(mark), hue);
  }
});

test('mark sorting is numeric, puts missing marks last in both directions and leaves input untouched', () => {
  const input = [record({ id: 'low', mark: 9 }), record({ id: 'missing', mark: null }), record({ id: 'high', mark: 100 })];
  assert.deepEqual(sortCourses(input, 'mark', 'desc').map(c => c.id), ['high', 'low', 'missing']);
  assert.deepEqual(sortCourses(input, 'mark', 'asc').map(c => c.id), ['low', 'high', 'missing']);
  assert.deepEqual(input.map(c => c.id), ['low', 'missing', 'high']);
});

test('year sorts chronologically by term and equal marks have a deterministic tie break', () => {
  const input = [record({ id: 'b', term: 'Fall' }), record({ id: 'a', term: 'Winter' }), record({ id: 'c', term: 'Summer' })];
  assert.deepEqual(sortCourses(input, 'year', 'asc').map(c => c.id), ['a', 'c', 'b']);
  assert.deepEqual(sortCourses(input, 'year', 'desc').map(c => c.id), ['b', 'c', 'a']);
  assert.deepEqual(sortCourses(input, 'mark', 'desc').map(c => c.id), ['a', 'b', 'c']);
});

test('grade sorting follows academic order and puts nonnumeric outcomes last', () => {
  const input = [record({ id: 'minus', grade: 'A-' }), record({ id: 'plus', grade: 'A+' }), record({ id: 'withdrawal', grade: 'LWD', mark: null }), record({ id: 'a', grade: 'A' })];
  assert.deepEqual(sortCourses(input, 'grade', 'desc').map(c => c.id), ['plus', 'a', 'minus', 'withdrawal']);
  assert.deepEqual(sortCourses(input, 'grade', 'asc').map(c => c.id), ['minus', 'a', 'plus', 'withdrawal']);
});

test('language and text sorting is deterministic and untagged courses stay last', () => {
  const input = [record({ id: 'python', languages: ['Python'], code: 'CSC200H1', title: 'Zebra' }), record({ id: 'none', code: 'CSC300H1', title: 'Middle' }), record({ id: 'c', languages: ['C'], code: 'CSC100H1', title: 'Alpha' })];
  assert.deepEqual(sortCourses(input, 'languages', 'desc').map(c => c.id), ['python', 'c', 'none']);
  assert.deepEqual(sortCourses(input, 'languages', 'asc').map(c => c.id), ['c', 'python', 'none']);
  assert.deepEqual(sortCourses(input, 'code', 'asc').map(c => c.id), ['c', 'python', 'none']);
  assert.deepEqual(sortCourses(input, 'title', 'asc').map(c => c.id), ['c', 'none', 'python']);
});

test('curated records retain all source years, valid numeric values and unique attempt IDs', () => {
  assert.equal(new Set(courses.map(c => c.id)).size, courses.length);
  assert.equal(courses.find(c => c.code === 'CSC207H1').year, 2017);
  assert.equal(courses.find(c => c.code === 'CSC207H1').term, 'Fall');
  assert.equal(courses.find(c => c.code === 'CSC494H1').mark, 95);
  assert.equal(courses.find(c => c.code === 'CSC495H1').mark, 95);
  assert.equal(courses.find(c => c.code === 'MAT136H1' && c.year === 2014).mark, 43);
  for (const course of courses) {
    assert.ok(course.mark === null || (Number.isFinite(course.mark) && course.mark >= 0 && course.mark <= 100));
    assert.ok(course.credits >= 0);
    if (course.languages.length) {
      assert.equal(course.languageStatus, 'verified');
      assert.match(course.languageSource.url, /^https:\/\/(www\.)?(teach\.)?cs\.toronto\.edu\//);
    }
  }
});
