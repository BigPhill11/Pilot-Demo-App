/**
 * Typed wrappers around the teacher_* RPCs.
 *
 * Every one of these is a SECURITY DEFINER function that authorizes the caller
 * against their own classroom before returning anything (see
 * supabase/migrations/20260801000200_teacher_rpcs.sql). Reading the underlying
 * tables directly will always come back empty — student rows are RLS-locked to
 * the student.
 */

import { supabase } from '@/integrations/supabase/client';
import { isTeacherPreview, teacherPreview } from '@/dev/teacherPreview';
import type {
  ActivityEntry,
  ClassGrowthTrend,
  ClassInsights,
  GrowthSummaryRow,
  ModuleMatrixCell,
  QuestionBreakdown,
  RosterEntry,
  StudentDetail,
  StudentResponse,
  TeachBackOverview,
  TeacherClassroomSummary,
} from '@/integrations/supabase/teacherTypes';

// The generated Database type predates these functions, so the RPC names don't
// typecheck against it. The return types above are the real contract.
const db = supabase as unknown as {
  rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }>;
};

async function callRpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await db.rpc(fn, args);
  if (error) throw new Error(error.message);
  return data as T;
}

/** Numeric columns arrive as strings from postgres bigint/numeric. */
function num(value: unknown): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function listClassrooms(): Promise<TeacherClassroomSummary[]> {
  if (isTeacherPreview()) return teacherPreview.listClassrooms();
  const rows = await callRpc<TeacherClassroomSummary[]>('teacher_list_classrooms');
  return (rows ?? []).map((r) => ({
    ...r,
    student_count: num(r.student_count),
    active_last_7: num(r.active_last_7),
  }));
}

export async function createClassroom(input: {
  name: string;
  schoolName?: string;
  term?: string;
}): Promise<{ id: string; join_code: string; name: string }> {
  return callRpc('teacher_create_classroom', {
    p_name: input.name,
    p_school_name: input.schoolName ?? null,
    p_term: input.term ?? null,
  });
}

export async function getRoster(classroomId: string): Promise<RosterEntry[]> {
  if (isTeacherPreview()) return teacherPreview.getRoster(classroomId);
  const rows = await callRpc<RosterEntry[]>('teacher_get_roster', { p_classroom_id: classroomId });
  return (rows ?? []).map((r) => ({
    ...r,
    current_streak: num(r.current_streak),
    longest_streak: num(r.longest_streak),
    total_points: num(r.total_points),
    modules_completed: num(r.modules_completed),
    modules_in_progress: num(r.modules_in_progress),
    avg_progress: num(r.avg_progress),
    career_levels_completed: num(r.career_levels_completed),
    teach_backs_completed: num(r.teach_backs_completed),
    days_active_30: num(r.days_active_30),
  }));
}

export async function getModuleMatrix(classroomId: string): Promise<ModuleMatrixCell[]> {
  if (isTeacherPreview()) return teacherPreview.getModuleMatrix(classroomId);
  const rows = await callRpc<ModuleMatrixCell[]>('teacher_get_module_matrix', {
    p_classroom_id: classroomId,
  });
  return (rows ?? []).map((r) => ({ ...r, progress_percentage: num(r.progress_percentage) }));
}

export async function getActivity(classroomId: string, days = 30): Promise<ActivityEntry[]> {
  if (isTeacherPreview()) return teacherPreview.getActivity(classroomId, days);
  const rows = await callRpc<ActivityEntry[]>('teacher_get_activity', {
    p_classroom_id: classroomId,
    p_days: days,
  });
  return rows ?? [];
}

export async function getStudentDetail(
  classroomId: string,
  studentId: string
): Promise<StudentDetail> {
  if (isTeacherPreview()) return teacherPreview.getStudentDetail(classroomId, studentId);
  return callRpc('teacher_get_student_detail', {
    p_classroom_id: classroomId,
    p_student_id: studentId,
  });
}

export async function getClassInsights(classroomId: string): Promise<ClassInsights> {
  if (isTeacherPreview()) return teacherPreview.getClassInsights();
  const data = await callRpc<ClassInsights>('teacher_get_class_insights', {
    p_classroom_id: classroomId,
  });
  return {
    modules: (data?.modules ?? []).map((m) => ({
      ...m,
      students_started: num(m.students_started),
      students_completed: num(m.students_completed),
      avg_progress: num(m.avg_progress),
      avg_post_test_score: m.avg_post_test_score === null ? null : num(m.avg_post_test_score),
    })),
    concept_gaps: (data?.concept_gaps ?? []).map((g) => ({
      ...g,
      miss_count: num(g.miss_count),
      student_count: num(g.student_count),
    })),
  };
}

export async function getGrowthSummary(classroomId: string): Promise<GrowthSummaryRow[]> {
  if (isTeacherPreview()) return teacherPreview.getGrowthSummary(classroomId);
  const rows = await callRpc<GrowthSummaryRow[]>('teacher_get_growth_summary', {
    p_classroom_id: classroomId,
  });
  return (rows ?? []).map((r) => ({
    ...r,
    knowledge_score_pre: r.knowledge_score_pre === null ? null : num(r.knowledge_score_pre),
    knowledge_score_post: r.knowledge_score_post === null ? null : num(r.knowledge_score_post),
    knowledge_score_delta: r.knowledge_score_delta === null ? null : num(r.knowledge_score_delta),
    decision_quality_pre: r.decision_quality_pre === null ? null : num(r.decision_quality_pre),
    decision_quality_post: r.decision_quality_post === null ? null : num(r.decision_quality_post),
    decision_quality_delta: r.decision_quality_delta === null ? null : num(r.decision_quality_delta),
    confidence_gap_pre: r.confidence_gap_pre === null ? null : num(r.confidence_gap_pre),
    confidence_gap_post: r.confidence_gap_post === null ? null : num(r.confidence_gap_post),
    confidence_gap_delta: r.confidence_gap_delta === null ? null : num(r.confidence_gap_delta),
  }));
}

export async function getClassGrowthTrend(classroomId: string): Promise<ClassGrowthTrend> {
  if (isTeacherPreview()) return teacherPreview.getClassGrowthTrend(classroomId);
  const data = await callRpc<ClassGrowthTrend>('teacher_get_class_growth_trend', {
    p_classroom_id: classroomId,
  });
  return {
    by_module: (data?.by_module ?? []).map((m) => ({
      ...m,
      students_with_growth_data: num(m.students_with_growth_data),
      avg_knowledge_pre: m.avg_knowledge_pre === null ? null : num(m.avg_knowledge_pre),
      avg_knowledge_post: m.avg_knowledge_post === null ? null : num(m.avg_knowledge_post),
      avg_knowledge_delta: m.avg_knowledge_delta === null ? null : num(m.avg_knowledge_delta),
      avg_decision_quality_pre:
        m.avg_decision_quality_pre === null ? null : num(m.avg_decision_quality_pre),
      avg_decision_quality_post:
        m.avg_decision_quality_post === null ? null : num(m.avg_decision_quality_post),
      avg_confidence_gap_pre:
        m.avg_confidence_gap_pre === null ? null : num(m.avg_confidence_gap_pre),
      avg_confidence_gap_post:
        m.avg_confidence_gap_post === null ? null : num(m.avg_confidence_gap_post),
    })),
  };
}

export async function getQuestionBreakdown(
  classroomId: string,
  moduleType?: string
): Promise<QuestionBreakdown[]> {
  const rows = await callRpc<QuestionBreakdown[]>('teacher_get_question_breakdown', {
    p_classroom_id: classroomId,
    p_module_type: moduleType ?? null,
  });
  return (rows ?? []).map((r) => ({
    ...r,
    response_count: num(r.response_count),
    correct_count: num(r.correct_count),
    options: (r.options ?? []).map((o) => ({ ...o, count: num(o.count) })),
  }));
}

export async function getStudentResponses(
  classroomId: string,
  studentId: string
): Promise<StudentResponse[]> {
  const rows = await callRpc<StudentResponse[]>('teacher_get_student_responses', {
    p_classroom_id: classroomId,
    p_student_id: studentId,
  });
  return rows ?? [];
}

export async function getTeachBackOverview(classroomId: string): Promise<TeachBackOverview> {
  const data = await callRpc<TeachBackOverview>('teacher_get_teachback_overview', {
    p_classroom_id: classroomId,
  });
  return {
    summary: {
      sessions: num(data?.summary?.sessions),
      students_attempted: num(data?.summary?.students_attempted),
      avg_score: num(data?.summary?.avg_score),
      pass_rate: num(data?.summary?.pass_rate),
    },
    students: (data?.students ?? []).map((s) => ({
      ...s,
      sessions: num(s.sessions),
      passed_sessions: num(s.passed_sessions),
      avg_score: num(s.avg_score),
      best_score: num(s.best_score),
      lessons_attempted: num(s.lessons_attempted),
      top_missed: s.top_missed ?? [],
    })),
    lessons: (data?.lessons ?? []).map((l) => ({
      ...l,
      sessions: num(l.sessions),
      student_count: num(l.student_count),
      avg_score: num(l.avg_score),
      pass_rate: num(l.pass_rate),
      top_missed: (l.top_missed ?? []).map((m) => ({ ...m, count: num(m.count) })),
    })),
  };
}

/** Roster edits go through RLS on classroom_members rather than an RPC. */
export async function setStudentStatus(
  classroomId: string,
  studentId: string,
  status: 'active' | 'removed'
): Promise<void> {
  const table = supabase as unknown as {
    from: (t: string) => {
      update: (v: Record<string, unknown>) => {
        eq: (c: string, v: string) => {
          eq: (c: string, v: string) => Promise<{ error: { message: string } | null }>;
        };
      };
    };
  };
  const { error } = await table
    .from('classroom_members')
    .update({ status })
    .eq('classroom_id', classroomId)
    .eq('student_id', studentId);
  if (error) throw new Error(error.message);
}

export async function updateClassroom(
  classroomId: string,
  changes: { name?: string; school_name?: string | null; term?: string | null; is_active?: boolean }
): Promise<void> {
  const table = supabase as unknown as {
    from: (t: string) => {
      update: (v: Record<string, unknown>) => {
        eq: (c: string, v: string) => Promise<{ error: { message: string } | null }>;
      };
    };
  };
  const { error } = await table.from('classrooms').update(changes).eq('id', classroomId);
  if (error) throw new Error(error.message);
}
