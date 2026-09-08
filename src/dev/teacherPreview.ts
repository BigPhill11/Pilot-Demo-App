/**
 * Dev-only preview data for the teacher dashboard.
 *
 * The dashboard needs three things that a fresh clone does not have: the
 * classroom migrations applied, an account holding the teacher role, and a
 * classroom with students in it. That makes `/teach` impossible to look at
 * locally without first mutating a real database.
 *
 * Visiting `/teach?preview=1` on a dev server swaps the teacher RPC layer for
 * the fixtures below and skips the role check, so the UI can be reviewed
 * without a backend. It is gated on `import.meta.env.DEV`, so the flag does
 * nothing in a production build even if someone appends the query param.
 */

import type {
  ActivityEntry,
  ClassInsights,
  ModuleMatrixCell,
  OptionPicker,
  QuestionBreakdown,
  RosterEntry,
  StudentDetail,
  StudentResponse,
  TeachBackOverview,
  TeacherClassroomSummary,
} from '@/integrations/supabase/teacherTypes';

export function isTeacherPreview(): boolean {
  if (!import.meta.env.DEV) return false;
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('preview');
}

const PRIMARY_ID = 'preview-classroom-1';
const SECOND_ID = 'preview-classroom-2';

const STUDENTS = [
  'ada_l', 'ben_okafor', 'cleo_v', 'darius_p', 'elena_m', 'finn_ruiz',
  'grace_nb', 'hugo_tan', 'imani_w', 'jonas_k', 'kira_s', 'luis_ortega',
];

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

function dateDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

const CLASSROOMS: TeacherClassroomSummary[] = [
  {
    id: PRIMARY_ID,
    name: 'Period 3 Personal Finance',
    join_code: 'CLASS-XS83',
    school_name: 'Sample High',
    term: 'Fall 2026',
    is_active: true,
    created_at: isoDaysAgo(70),
    student_count: STUDENTS.length,
    active_last_7: 8,
  },
  {
    id: SECOND_ID,
    name: 'Period 5 Economics',
    join_code: 'CLASS-V8BR',
    school_name: 'Sample High',
    term: 'Fall 2026',
    is_active: true,
    created_at: isoDaysAgo(64),
    student_count: 5,
    active_last_7: 3,
  },
];

// A spread of engagement patterns, so every roster status and heatmap shape
// shows up in the preview rather than a uniform wall of green.
function buildRoster(classroomId: string): RosterEntry[] {
  const names = classroomId === PRIMARY_ID ? STUDENTS : STUDENTS.slice(0, 5);
  return names.map((username, i) => {
    const lapsed = i % 4 === 3;
    return {
      student_id: `${classroomId}-student-${i}`,
      username,
      joined_at: isoDaysAgo(60),
      last_login_date: lapsed ? dateDaysAgo(21) : dateDaysAgo(i % 4),
      current_streak: lapsed ? 0 : Math.max(0, 12 - i),
      longest_streak: Math.max(1, 18 - i),
      total_points: Math.max(200, 4800 - i * 340),
      modules_completed: Math.max(0, 6 - i),
      modules_in_progress: i % 3,
      avg_progress: Math.max(8, 92 - i * 7),
      career_levels_completed: Math.max(0, 4 - (i % 5)),
      teach_backs_completed: Math.max(0, 5 - (i % 6)),
      days_active_30: lapsed ? 1 : Math.max(2, 26 - i * 2),
    };
  });
}

const PF = ['income', 'financial-planning', 'saving', 'investing', 'insurance', 'taxes', 'credit-debt', 'career-income', 'wealth-fundamentals'];
const MI = ['business-economics', 'ownership', 'language-finance', 'markets-headlines', 'business-foundations'];
const CR = ['interviewing', 'email-etiquette', 'business-etiquette', 'networking', 'professional-habits', 'personal-brand'];

function buildMatrix(classroomId: string): ModuleMatrixCell[] {
  const cells: ModuleMatrixCell[] = [];

  const push = (studentId: string, moduleId: string, moduleType: string, percent: number) => {
    if (percent <= 0) return;
    cells.push({
      student_id: studentId,
      module_id: moduleId,
      module_type: moduleType,
      progress_percentage: percent,
      completed_at: percent >= 100 ? isoDaysAgo(2) : null,
      last_accessed: isoDaysAgo(1),
    });
  };

  buildRoster(classroomId).forEach((student, i) => {
    PF.forEach((id, m) => {
      push(student.student_id, id, 'personal-finance', m < 6 - i ? 100 : m === 6 - i ? 40 + ((i * 7) % 45) : 0);
    });
    MI.forEach((id, m) => {
      const edge = 3 - (i % 4);
      push(student.student_id, id, 'market-intelligence', m < edge ? 100 : m === edge ? 25 + ((i * 11) % 55) : 0);
    });
    CR.forEach((id, m) => {
      push(student.student_id, id, 'career-readiness', m < 2 - (i % 3) ? 100 : 0);
    });
  });

  return cells;
}

function buildActivity(classroomId: string, days: number): ActivityEntry[] {
  const out: ActivityEntry[] = [];
  buildRoster(classroomId).forEach((student, i) => {
    const classDaysOnly = i % 3 === 1;
    const lapsed = i % 4 === 3;
    for (let d = 0; d < days; d += 1) {
      const weekday = new Date(Date.now() - d * 86_400_000).getDay();
      if (lapsed && d > 2) continue;
      if (classDaysOnly && ![1, 3, 5].includes(weekday)) continue;
      if (!classDaysOnly && (d + i) % 5 === 0) continue;
      out.push({ student_id: student.student_id, login_date: dateDaysAgo(d) });
    }
  });
  return out;
}

const INSIGHTS: ClassInsights = {
  modules: [
    { module_id: 'taxes', module_type: 'personal-finance', students_started: 9, students_completed: 1, avg_progress: 22, avg_post_test_score: 58 },
    { module_id: 'insurance', module_type: 'personal-finance', students_started: 7, students_completed: 1, avg_progress: 31, avg_post_test_score: 61 },
    { module_id: 'investing', module_type: 'personal-finance', students_started: 11, students_completed: 4, avg_progress: 42, avg_post_test_score: 72 },
    { module_id: 'language-finance', module_type: 'market-intelligence', students_started: 8, students_completed: 2, avg_progress: 51, avg_post_test_score: null },
    { module_id: 'networking', module_type: 'career-readiness', students_started: 6, students_completed: 3, avg_progress: 63, avg_post_test_score: null },
    { module_id: 'ownership', module_type: 'market-intelligence', students_started: 10, students_completed: 6, avg_progress: 71, avg_post_test_score: null },
    { module_id: 'saving', module_type: 'personal-finance', students_started: 12, students_completed: 9, avg_progress: 86, avg_post_test_score: 84 },
    { module_id: 'income', module_type: 'personal-finance', students_started: 12, students_completed: 11, avg_progress: 96, avg_post_test_score: 89 },
  ],
  concept_gaps: [
    { fact: 'Difference between gross and net pay', miss_count: 14, student_count: 8 },
    { fact: 'How marginal tax brackets actually work', miss_count: 11, student_count: 7 },
    { fact: 'Why a deductible lowers your premium', miss_count: 9, student_count: 6 },
    { fact: 'Compound interest over long horizons', miss_count: 6, student_count: 4 },
    { fact: 'What a balance sheet records', miss_count: 4, student_count: 3 },
  ],
};

function buildStudentDetail(classroomId: string, studentId: string): StudentDetail {
  const roster = buildRoster(classroomId);
  const student = roster.find((r) => r.student_id === studentId) ?? roster[0];
  const cells = buildMatrix(classroomId).filter((c) => c.student_id === student.student_id);

  return {
    profile: {
      student_id: student.student_id,
      username: student.username,
      email: `${student.username}@example.edu`,
      joined_at: student.joined_at,
      created_at: student.joined_at,
      last_login_date: student.last_login_date,
      current_streak: student.current_streak,
      longest_streak: student.longest_streak,
      total_points: student.total_points,
      engagement_score: 74,
      teach_backs_completed: student.teach_backs_completed,
    },
    modules: cells.map((c) => ({
      module_id: c.module_id,
      module_type: c.module_type,
      course_id: null,
      progress_percentage: c.progress_percentage,
      time_spent_minutes: 24,
      pre_test_score: null,
      post_test_score: c.progress_percentage >= 100 ? 86 : null,
      last_accessed: c.last_accessed,
      completed_at: c.completed_at,
    })),
    careers: [
      { career_id: 'investment-banking', levels_completed: 4, last_completed_at: isoDaysAgo(3) },
      { career_id: 'private-equity', levels_completed: 2, last_completed_at: isoDaysAgo(9) },
    ],
    recent_xp: [
      { xp_amount: 250, source: 'lesson_complete', created_at: isoDaysAgo(0) },
      { xp_amount: 100, source: 'daily_login', created_at: isoDaysAgo(0) },
      { xp_amount: 400, source: 'boss_challenge', created_at: isoDaysAgo(1) },
      { xp_amount: 150, source: 'teach_back', created_at: isoDaysAgo(2) },
    ],
    teach_backs: [
      {
        lesson_id: 'income-1',
        difficulty_tier: 'teen',
        final_understanding_score: 62,
        passed: false,
        key_facts_missing: [
          'Difference between gross and net pay',
          'How marginal tax brackets actually work',
        ],
        created_at: isoDaysAgo(1),
      },
      {
        lesson_id: 'saving-2',
        difficulty_tier: 'cub',
        final_understanding_score: 91,
        passed: true,
        key_facts_missing: [],
        created_at: isoDaysAgo(4),
      },
    ],
    activity: [],
  };
}

/** Named students so the option chips read like a real roster. */
function pickers(names: string[]): OptionPicker[] {
  return names.map((username) => ({ student_id: `preview-${username}`, username }));
}

const QUESTION_BREAKDOWN: QuestionBreakdown[] = [
  {
    module_type: 'personal-finance',
    module_id: 'income',
    lesson_id: 'active-income-basics',
    item_id: 'active-income-basics#0',
    prompt:
      'Your first paycheck from your rec-center job is $118, not the $150 you expected. What most likely explains the difference?',
    correct_label: 'Payroll taxes and deductions came out before you got paid',
    response_count: 12,
    correct_count: 3,
    options: [
      {
        label: 'The employer made a mistake on your hours',
        is_correct: false,
        count: 6,
        students: pickers(['ben_okafor', 'darius_p', 'hugo_tan', 'jonas_k', 'kira_s', 'luis_ortega']),
      },
      {
        label: 'Payroll taxes and deductions came out before you got paid',
        is_correct: true,
        count: 3,
        students: pickers(['ada_l', 'elena_m', 'imani_w']),
      },
      {
        label: 'Taxes only apply once you turn 18',
        is_correct: false,
        count: 3,
        students: pickers(['cleo_v', 'finn_ruiz', 'grace_nb']),
      },
    ],
  },
  {
    module_type: 'personal-finance',
    module_id: 'taxes',
    lesson_id: 'taxes-2',
    item_id: 'taxes-2#1',
    prompt:
      'You get a raise that moves you into the next tax bracket. What happens to the money you were already earning?',
    correct_label: 'It is still taxed at the old, lower rate',
    response_count: 9,
    correct_count: 2,
    options: [
      {
        label: 'All of your income is now taxed at the higher rate',
        is_correct: false,
        count: 5,
        students: pickers(['ben_okafor', 'cleo_v', 'darius_p', 'grace_nb', 'kira_s']),
      },
      {
        label: 'It is still taxed at the old, lower rate',
        is_correct: true,
        count: 2,
        students: pickers(['ada_l', 'imani_w']),
      },
      {
        label: 'You take home less than before the raise',
        is_correct: false,
        count: 2,
        students: pickers(['finn_ruiz', 'hugo_tan']),
      },
    ],
  },
  {
    module_type: 'market-intelligence',
    module_id: 'ownership',
    lesson_id: 'own-2-price-vs-value',
    item_id: 'q2',
    prompt: 'A stock you own drops 14% in a week on no company news. What is the sound move?',
    correct_label: 'Hold, and check whether anything about the business actually changed',
    response_count: 10,
    correct_count: 6,
    options: [
      {
        label: 'Hold, and check whether anything about the business actually changed',
        is_correct: true,
        count: 6,
        students: pickers(['ada_l', 'cleo_v', 'elena_m', 'finn_ruiz', 'grace_nb', 'imani_w']),
      },
      {
        label: 'Sell immediately to stop the loss',
        is_correct: false,
        count: 4,
        students: pickers(['ben_okafor', 'darius_p', 'jonas_k', 'luis_ortega']),
      },
    ],
  },
  {
    module_type: 'personal-finance',
    module_id: 'saving',
    lesson_id: 'saving-1',
    item_id: 'saving-1#0',
    prompt: 'What does "pay yourself first" mean in practice?',
    correct_label: 'Move money to savings automatically on payday, before spending',
    response_count: 12,
    correct_count: 11,
    options: [
      {
        label: 'Move money to savings automatically on payday, before spending',
        is_correct: true,
        count: 11,
        students: pickers([
          'ada_l', 'ben_okafor', 'cleo_v', 'elena_m', 'finn_ruiz', 'grace_nb',
          'hugo_tan', 'imani_w', 'jonas_k', 'kira_s', 'luis_ortega',
        ]),
      },
      {
        label: 'Save whatever is left at the end of the month',
        is_correct: false,
        count: 1,
        students: pickers(['darius_p']),
      },
    ],
  },
];

const TEACHBACK: TeachBackOverview = {
  summary: { sessions: 31, students_attempted: 10, avg_score: 68, pass_rate: 55 },
  students: [
    { student_id: 'preview-ada_l', username: 'ada_l', sessions: 6, passed_sessions: 5, avg_score: 88, best_score: 96, lessons_attempted: 5, last_at: isoDaysAgo(0), top_missed: ['How marginal tax brackets actually work'] },
    { student_id: 'preview-imani_w', username: 'imani_w', sessions: 5, passed_sessions: 4, avg_score: 82, best_score: 93, lessons_attempted: 4, last_at: isoDaysAgo(1), top_missed: ['Why a deductible lowers your premium'] },
    { student_id: 'preview-elena_m', username: 'elena_m', sessions: 4, passed_sessions: 2, avg_score: 71, best_score: 84, lessons_attempted: 4, last_at: isoDaysAgo(2), top_missed: ['Difference between gross and net pay', 'Compound interest over long horizons'] },
    { student_id: 'preview-finn_ruiz', username: 'finn_ruiz', sessions: 4, passed_sessions: 2, avg_score: 66, best_score: 78, lessons_attempted: 3, last_at: isoDaysAgo(2), top_missed: ['How marginal tax brackets actually work', 'What a balance sheet records'] },
    { student_id: 'preview-cleo_v', username: 'cleo_v', sessions: 3, passed_sessions: 1, avg_score: 61, best_score: 72, lessons_attempted: 3, last_at: isoDaysAgo(4), top_missed: ['Difference between gross and net pay'] },
    { student_id: 'preview-ben_okafor', username: 'ben_okafor', sessions: 3, passed_sessions: 1, avg_score: 54, best_score: 70, lessons_attempted: 2, last_at: isoDaysAgo(5), top_missed: ['Difference between gross and net pay', 'How marginal tax brackets actually work'] },
    { student_id: 'preview-grace_nb', username: 'grace_nb', sessions: 2, passed_sessions: 1, avg_score: 69, best_score: 75, lessons_attempted: 2, last_at: isoDaysAgo(6), top_missed: ['Compound interest over long horizons'] },
    { student_id: 'preview-kira_s', username: 'kira_s', sessions: 2, passed_sessions: 0, avg_score: 44, best_score: 51, lessons_attempted: 2, last_at: isoDaysAgo(8), top_missed: ['Difference between gross and net pay', 'Why a deductible lowers your premium'] },
    { student_id: 'preview-darius_p', username: 'darius_p', sessions: 1, passed_sessions: 0, avg_score: 38, best_score: 38, lessons_attempted: 1, last_at: isoDaysAgo(12), top_missed: ['Difference between gross and net pay'] },
    { student_id: 'preview-jonas_k', username: 'jonas_k', sessions: 1, passed_sessions: 1, avg_score: 74, best_score: 74, lessons_attempted: 1, last_at: isoDaysAgo(9), top_missed: [] },
    { student_id: 'preview-hugo_tan', username: 'hugo_tan', sessions: 0, passed_sessions: 0, avg_score: 0, best_score: 0, lessons_attempted: 0, last_at: null, top_missed: [] },
    { student_id: 'preview-luis_ortega', username: 'luis_ortega', sessions: 0, passed_sessions: 0, avg_score: 0, best_score: 0, lessons_attempted: 0, last_at: null, top_missed: [] },
  ],
  lessons: [
    {
      lesson_id: 'taxes-2',
      sessions: 7,
      student_count: 6,
      avg_score: 49,
      pass_rate: 14,
      top_missed: [
        { fact: 'How marginal tax brackets actually work', count: 6 },
        { fact: 'A refund means you overpaid during the year', count: 3 },
      ],
    },
    {
      lesson_id: 'active-income-basics',
      sessions: 9,
      student_count: 8,
      avg_score: 62,
      pass_rate: 44,
      top_missed: [
        { fact: 'Difference between gross and net pay', count: 7 },
        { fact: 'What FICA pays for', count: 2 },
      ],
    },
    {
      lesson_id: 'own-2-price-vs-value',
      sessions: 6,
      student_count: 5,
      avg_score: 73,
      pass_rate: 67,
      top_missed: [{ fact: 'Price and value are not the same thing', count: 3 }],
    },
    {
      lesson_id: 'saving-1',
      sessions: 9,
      student_count: 9,
      avg_score: 86,
      pass_rate: 89,
      top_missed: [{ fact: 'An emergency fund covers three months of costs', count: 2 }],
    },
  ],
};

const STUDENT_RESPONSES: StudentResponse[] = [
  {
    module_type: 'personal-finance',
    lesson_id: 'active-income-basics',
    item_id: 'active-income-basics#0',
    prompt: 'Your first paycheck is $118, not the $150 you expected. What most likely explains it?',
    selected_label: 'The employer made a mistake on your hours',
    correct_label: 'Payroll taxes and deductions came out before you got paid',
    is_correct: false,
    created_at: isoDaysAgo(1),
  },
  {
    module_type: 'personal-finance',
    lesson_id: 'taxes-2',
    item_id: 'taxes-2#1',
    prompt: 'A raise moves you into the next bracket. What happens to income you already earned?',
    selected_label: 'All of your income is now taxed at the higher rate',
    correct_label: 'It is still taxed at the old, lower rate',
    is_correct: false,
    created_at: isoDaysAgo(3),
  },
  {
    module_type: 'personal-finance',
    lesson_id: 'saving-1',
    item_id: 'saving-1#0',
    prompt: 'What does "pay yourself first" mean in practice?',
    selected_label: 'Move money to savings automatically on payday, before spending',
    correct_label: 'Move money to savings automatically on payday, before spending',
    is_correct: true,
    created_at: isoDaysAgo(6),
  },
];

export const teacherPreview = {
  listClassrooms: async (): Promise<TeacherClassroomSummary[]> => CLASSROOMS,
  getRoster: async (classroomId: string): Promise<RosterEntry[]> => buildRoster(classroomId),
  getModuleMatrix: async (classroomId: string): Promise<ModuleMatrixCell[]> =>
    buildMatrix(classroomId),
  getActivity: async (classroomId: string, days: number): Promise<ActivityEntry[]> =>
    buildActivity(classroomId, days),
  getClassInsights: async (): Promise<ClassInsights> => INSIGHTS,
  getStudentDetail: async (classroomId: string, studentId: string): Promise<StudentDetail> =>
    buildStudentDetail(classroomId, studentId),
  getQuestionBreakdown: async (moduleType?: string): Promise<QuestionBreakdown[]> =>
    moduleType ? QUESTION_BREAKDOWN.filter((q) => q.module_type === moduleType) : QUESTION_BREAKDOWN,
  getTeachBackOverview: async (): Promise<TeachBackOverview> => TEACHBACK,
  getStudentResponses: async (_studentId: string): Promise<StudentResponse[]> =>
    STUDENT_RESPONSES,
};
