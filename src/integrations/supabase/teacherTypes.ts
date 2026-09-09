/**
 * Hand-written types for the classroom / teacher-dashboard schema.
 *
 * `types.ts` in this folder is generated from the database and is already stale
 * (it predates access_codes, user_roles, daily_logins and more), which is why so
 * much of the app reaches for `as any`. Rather than add to that pile, the
 * teacher dashboard declares its own row and RPC shapes here and funnels every
 * query through the small typed helper in `src/lib/teacherApi.ts`.
 *
 * These shapes must stay in step with:
 *   supabase/migrations/20260801000100_classrooms.sql
 *   supabase/migrations/20260801000200_teacher_rpcs.sql
 *   supabase/migrations/20260802000200_assessment_responses.sql
 *   supabase/migrations/20260802000300_teacher_teachback.sql
 */

export type AppRole = 'admin' | 'user' | 'teacher';

export interface ClassroomRow {
  id: string;
  teacher_id: string | null;
  name: string;
  join_code: string;
  school_name: string | null;
  term: string | null;
  is_active: boolean;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClassroomMemberRow {
  id: string;
  classroom_id: string;
  student_id: string;
  status: 'active' | 'removed';
  joined_at: string;
}

/** Row shape returned by `teacher_list_classrooms()`. */
export interface TeacherClassroomSummary {
  id: string;
  name: string;
  join_code: string;
  school_name: string | null;
  term: string | null;
  is_active: boolean;
  created_at: string;
  student_count: number;
  active_last_7: number;
}

/** Row shape returned by `teacher_get_roster(classroom)`. */
export interface RosterEntry {
  student_id: string;
  username: string | null;
  joined_at: string;
  last_login_date: string | null;
  current_streak: number;
  longest_streak: number;
  total_points: number;
  modules_completed: number;
  modules_in_progress: number;
  avg_progress: number;
  career_levels_completed: number;
  teach_backs_completed: number;
  days_active_30: number;
}

/** Row shape returned by `teacher_get_module_matrix(classroom)`. */
export interface ModuleMatrixCell {
  student_id: string;
  module_id: string;
  module_type: string;
  progress_percentage: number;
  completed_at: string | null;
  last_accessed: string | null;
}

/** Row shape returned by `teacher_get_activity(classroom, days)`. */
export interface ActivityEntry {
  student_id: string;
  login_date: string;
}

/** Row shape returned by `teacher_get_class_insights(classroom)`. */
export interface ModuleInsight {
  module_id: string;
  module_type: string;
  students_started: number;
  students_completed: number;
  avg_progress: number;
  avg_post_test_score: number | null;
}

export interface ConceptGap {
  fact: string;
  miss_count: number;
  student_count: number;
}

export interface ClassInsights {
  modules: ModuleInsight[];
  concept_gaps: ConceptGap[];
}

/** Payload returned by `teacher_get_student_detail(classroom, student)`. */
export interface StudentDetail {
  profile: {
    student_id: string;
    username: string | null;
    email: string | null;
    joined_at: string | null;
    created_at: string | null;
    last_login_date: string | null;
    current_streak: number;
    longest_streak: number;
    total_points: number;
    engagement_score: number;
    teach_backs_completed: number;
  };
  modules: Array<{
    module_id: string;
    module_type: string;
    course_id: string | null;
    progress_percentage: number;
    time_spent_minutes: number;
    pre_test_score: number | null;
    post_test_score: number | null;
    last_accessed: string | null;
    completed_at: string | null;
  }>;
  careers: Array<{
    career_id: string;
    levels_completed: number;
    last_completed_at: string | null;
  }>;
  recent_xp: Array<{
    xp_amount: number;
    source: string | null;
    created_at: string;
  }>;
  teach_backs: Array<{
    lesson_id: string;
    difficulty_tier: string;
    final_understanding_score: number;
    passed: boolean;
    key_facts_missing: string[];
    created_at: string;
  }>;
  activity: string[];
}

/** One student who picked a given option. */
export interface OptionPicker {
  student_id: string;
  username: string;
}

/** A distinct answer to a scenario, and who chose it. */
export interface QuestionOption {
  label: string;
  is_correct: boolean;
  count: number;
  students: OptionPicker[];
}

/** Row shape returned by `teacher_get_question_breakdown(classroom, module_type)`. */
export interface QuestionBreakdown {
  module_type: string;
  module_id: string | null;
  lesson_id: string;
  item_id: string;
  prompt: string | null;
  correct_label: string | null;
  response_count: number;
  correct_count: number;
  options: QuestionOption[];
}

/** Row shape returned by `teacher_get_student_responses(classroom, student)`. */
export interface StudentResponse {
  module_type: string;
  lesson_id: string;
  item_id: string;
  prompt: string | null;
  selected_label: string | null;
  correct_label: string | null;
  is_correct: boolean;
  created_at: string;
}

/** Payload returned by `teacher_get_teachback_overview(classroom)`. */
export interface TeachBackStudent {
  student_id: string;
  username: string;
  sessions: number;
  passed_sessions: number;
  avg_score: number;
  best_score: number;
  lessons_attempted: number;
  last_at: string | null;
  top_missed: string[];
}

export interface TeachBackLesson {
  lesson_id: string;
  sessions: number;
  student_count: number;
  avg_score: number;
  pass_rate: number;
  top_missed: Array<{ fact: string; count: number }>;
}

export interface TeachBackOverview {
  summary: {
    sessions: number;
    students_attempted: number;
    avg_score: number;
    pass_rate: number;
  };
  students: TeachBackStudent[];
  lessons: TeachBackLesson[];
}
