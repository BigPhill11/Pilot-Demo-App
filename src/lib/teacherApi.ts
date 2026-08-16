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
import type {
  ActivityEntry,
  ClassInsights,
  ModuleMatrixCell,
  RosterEntry,
  StudentDetail,
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
  const rows = await callRpc<ModuleMatrixCell[]>('teacher_get_module_matrix', {
    p_classroom_id: classroomId,
  });
  return (rows ?? []).map((r) => ({ ...r, progress_percentage: num(r.progress_percentage) }));
}

export async function getActivity(classroomId: string, days = 30): Promise<ActivityEntry[]> {
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
  return callRpc('teacher_get_student_detail', {
    p_classroom_id: classroomId,
    p_student_id: studentId,
  });
}

export async function getClassInsights(classroomId: string): Promise<ClassInsights> {
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
