/**
 * React Query hooks for the teacher dashboard.
 *
 * Unlike the student-facing progress hooks (which own local state), everything
 * here is read-only server data, so it goes through React Query for caching and
 * refetch rather than hand-rolled useEffect fetching.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getActivity,
  getClassInsights,
  getModuleMatrix,
  getRoster,
  getStudentDetail,
  listClassrooms,
} from '@/lib/teacherApi';

const STALE_MS = 60_000;

export const teacherKeys = {
  classrooms: ['teacher', 'classrooms'] as const,
  roster: (id: string) => ['teacher', 'roster', id] as const,
  matrix: (id: string) => ['teacher', 'matrix', id] as const,
  activity: (id: string, days: number) => ['teacher', 'activity', id, days] as const,
  insights: (id: string) => ['teacher', 'insights', id] as const,
  student: (classroomId: string, studentId: string) =>
    ['teacher', 'student', classroomId, studentId] as const,
};

export function useClassrooms() {
  return useQuery({
    queryKey: teacherKeys.classrooms,
    queryFn: listClassrooms,
    staleTime: STALE_MS,
  });
}

export function useRoster(classroomId: string | undefined) {
  return useQuery({
    queryKey: teacherKeys.roster(classroomId ?? ''),
    queryFn: () => getRoster(classroomId as string),
    enabled: !!classroomId,
    staleTime: STALE_MS,
  });
}

export function useModuleMatrix(classroomId: string | undefined) {
  return useQuery({
    queryKey: teacherKeys.matrix(classroomId ?? ''),
    queryFn: () => getModuleMatrix(classroomId as string),
    enabled: !!classroomId,
    staleTime: STALE_MS,
  });
}

export function useActivity(classroomId: string | undefined, days = 30) {
  return useQuery({
    queryKey: teacherKeys.activity(classroomId ?? '', days),
    queryFn: () => getActivity(classroomId as string, days),
    enabled: !!classroomId,
    staleTime: STALE_MS,
  });
}

export function useClassInsights(classroomId: string | undefined) {
  return useQuery({
    queryKey: teacherKeys.insights(classroomId ?? ''),
    queryFn: () => getClassInsights(classroomId as string),
    enabled: !!classroomId,
    staleTime: STALE_MS,
  });
}

/** Only fetches once a student row is actually opened. */
export function useStudentDetail(classroomId: string | undefined, studentId: string | null) {
  return useQuery({
    queryKey: teacherKeys.student(classroomId ?? '', studentId ?? ''),
    queryFn: () => getStudentDetail(classroomId as string, studentId as string),
    enabled: !!classroomId && !!studentId,
    staleTime: STALE_MS,
  });
}

/** Invalidates every view for one classroom — used by the refresh button. */
export function useRefreshClassroom(classroomId: string | undefined) {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: teacherKeys.classrooms });
    if (!classroomId) return;
    queryClient.invalidateQueries({ queryKey: ['teacher', 'roster', classroomId] });
    queryClient.invalidateQueries({ queryKey: ['teacher', 'matrix', classroomId] });
    queryClient.invalidateQueries({ queryKey: ['teacher', 'insights', classroomId] });
    queryClient.invalidateQueries({ queryKey: ['teacher', 'activity', classroomId] });
  };
}
