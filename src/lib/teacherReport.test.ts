import { describe, expect, it } from 'vitest';
import { buildClassReport, type ReportInput } from '@/lib/teacherReport';
import type {
  ActivityEntry,
  QuestionBreakdown,
  RosterEntry,
  TeachBackOverview,
  TeacherClassroomSummary,
} from '@/integrations/supabase/teacherTypes';

// Real clock, not a frozen one: student staleness runs through
// teacherMetrics, which reads Date.now() directly, so a fixed `now` here would
// only agree with half the report.
const NOW = new Date();

function daysAgo(days: number): string {
  const d = new Date(NOW);
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

const CLASSROOM: TeacherClassroomSummary = {
  id: 'c1',
  name: 'Period 3 Personal Finance',
  join_code: 'PF-2026',
  school_name: 'Grady High',
  term: 'Spring 2026',
  is_active: true,
  created_at: daysAgo(60),
  student_count: 3,
  active_last_7: 2,
};

function student(overrides: Partial<RosterEntry> & { student_id: string }): RosterEntry {
  return {
    username: overrides.student_id,
    joined_at: daysAgo(50),
    last_login_date: daysAgo(1),
    current_streak: 3,
    longest_streak: 5,
    total_points: 400,
    modules_completed: 2,
    modules_in_progress: 1,
    avg_progress: 60,
    career_levels_completed: 0,
    teach_backs_completed: 1,
    days_active_30: 10,
    ...overrides,
  };
}

const ROSTER: RosterEntry[] = [
  student({ student_id: 'ada', modules_completed: 4, days_active_30: 14 }),
  student({ student_id: 'ben', last_login_date: daysAgo(3), modules_completed: 1 }),
  // Dormant: no sign-in for well over a fortnight.
  student({ student_id: 'cleo', last_login_date: daysAgo(21), modules_completed: 0, avg_progress: 5 }),
];

// Two sign-ins last week, five this week: a clear upward trend.
const ACTIVITY: ActivityEntry[] = [
  { student_id: 'ada', login_date: daysAgo(1) },
  { student_id: 'ada', login_date: daysAgo(2) },
  { student_id: 'ada', login_date: daysAgo(4) },
  { student_id: 'ben', login_date: daysAgo(3) },
  { student_id: 'ben', login_date: daysAgo(5) },
  { student_id: 'ada', login_date: daysAgo(9) },
  { student_id: 'ben', login_date: daysAgo(11) },
];

const QUESTIONS: QuestionBreakdown[] = [
  {
    module_type: 'personal-finance',
    module_id: 'income',
    lesson_id: 'income-basics',
    item_id: 'income-basics#1',
    prompt: 'Which figure should your budget be built on?',
    correct_label: 'Net pay, after taxes',
    response_count: 6,
    correct_count: 2,
    options: [
      { label: 'Gross pay', is_correct: false, count: 4, students: [] },
      { label: 'Net pay, after taxes', is_correct: true, count: 2, students: [] },
    ],
  },
  {
    module_type: 'personal-finance',
    module_id: 'saving',
    lesson_id: 'saving-basics',
    item_id: 'saving-basics#1',
    prompt: 'What is an emergency fund for?',
    correct_label: 'Unexpected costs',
    response_count: 6,
    correct_count: 6,
    options: [{ label: 'Unexpected costs', is_correct: true, count: 6, students: [] }],
  },
  // Below the response floor: must not reach the report either way.
  {
    module_type: 'economics',
    module_id: 'micro',
    lesson_id: 'supply',
    item_id: 'supply#1',
    prompt: 'Rarely answered question',
    correct_label: 'Something',
    response_count: 1,
    correct_count: 0,
    options: [{ label: 'Wrong', is_correct: false, count: 1, students: [] }],
  },
];

const TEACHBACK: TeachBackOverview = {
  summary: { sessions: 8, students_attempted: 3, avg_score: 64, pass_rate: 50 },
  students: [
    {
      student_id: 'ada',
      username: 'ada',
      sessions: 4,
      passed_sessions: 3,
      avg_score: 70,
      best_score: 88,
      lessons_attempted: 3,
      last_at: daysAgo(2),
      top_missed: ['Compounding needs time'],
    },
  ],
  lessons: [
    {
      lesson_id: 'income-basics',
      sessions: 4,
      student_count: 3,
      avg_score: 55,
      pass_rate: 25,
      top_missed: [{ fact: 'Taxes come out first', count: 3 }],
    },
  ],
};

const INPUT: ReportInput = {
  classroom: CLASSROOM,
  roster: ROSTER,
  activity: ACTIVITY,
  momentum: {
    metric_name: 'Learning Momentum',
    minimum_paired_students: 3,
    current_score: 72,
    paired_students: 3,
    week_over_week_change: 5.5,
    weeks: [
      { starts_on: daysAgo(13), ends_on: daysAgo(7), score: 66.5, students: 3, assessment_items: 14, teachbacks: 2 },
      { starts_on: daysAgo(6), ends_on: daysAgo(0), score: 72, students: 3, assessment_items: 18, teachbacks: 3 },
    ],
  },
  insights: {
    modules: [
      {
        module_id: 'income',
        module_type: 'personal-finance',
        students_started: 3,
        students_completed: 0,
        avg_progress: 22,
        avg_post_test_score: null,
      },
      {
        module_id: 'saving',
        module_type: 'personal-finance',
        students_started: 3,
        students_completed: 2,
        avg_progress: 88,
        avg_post_test_score: null,
      },
    ],
    concept_gaps: [{ fact: 'Taxes come out first', miss_count: 5, student_count: 3 }],
  },
  questions: QUESTIONS,
  teachBack: TEACHBACK,
};

describe('buildClassReport', () => {
  it('weighs scenario accuracy by answers, not by question', () => {
    const report = buildClassReport(INPUT);
    // 2 + 6 + 0 correct out of 6 + 6 + 1 answers = 61%, not the 44% an
    // average-of-averages would give.
    expect(report.mastery.scenarioAccuracy).toBe(62);
    expect(report.mastery.answersRecorded).toBe(13);
  });

  it('only reports questions enough students have answered', () => {
    const report = buildClassReport(INPUT);
    const prompts = report.struggles.questions.map((q) => q.prompt);
    expect(prompts).toContain('Which figure should your budget be built on?');
    expect(prompts).not.toContain('Rarely answered question');
  });

  it('names the wrong answer most students chose', () => {
    const report = buildClassReport(INPUT);
    expect(report.struggles.questions[0].topWrong).toEqual({ label: 'Gross pay', count: 4 });
  });

  it('flags students who have stopped signing in', () => {
    const report = buildClassReport(INPUT);
    expect(report.usage.dormant.map((d) => d.name)).toEqual(['cleo']);
  });

  it('reads the week-over-week direction from sign-ins', () => {
    const report = buildClassReport(INPUT);
    expect(report.usage.trend).toBe('up');
    expect(report.usage.weeks.at(-1)?.signIns).toBe(5);
  });

  it('reports paired learning improvement separately from usage', () => {
    const report = buildClassReport(INPUT);
    expect(report.learning.trend).toBe('improving');
    expect(report.learning.weekOverWeekChange).toBe(5.5);
    expect(report.learning.summary).toContain('same 3 students');
  });

  it('turns the weakest question into a specific action', () => {
    const report = buildClassReport(INPUT);
    const first = report.actions[0];
    expect(first.detail).toContain('Gross pay');
    expect(first.detail).toContain('4 of 6');
  });

  it('tells a teacher to chase the dormant student by name', () => {
    const report = buildClassReport(INPUT);
    const chase = report.actions.find((a) => a.title.includes('stopped'));
    expect(chase?.detail).toContain('cleo');
  });

  it('credits what is working', () => {
    const report = buildClassReport(INPUT);
    expect(report.strengths.questions.map((q) => q.prompt)).toContain(
      'What is an emergency fund for?'
    );
    expect(report.strengths.notes.join(' ')).toContain('Saving');
  });

  it('says so plainly when there is no class yet', () => {
    const report = buildClassReport({
      ...INPUT,
      roster: [],
      activity: [],
      questions: [],
      teachBack: null,
      insights: { modules: [], concept_gaps: [] },
    });
    expect(report.synopsis).toContain('No students have joined');
    expect(report.mastery.scenarioAccuracy).toBeNull();
    expect(report.usage.trend).toBe('unknown');
  });
});
