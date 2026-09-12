const KEY_PREFIX = 'phils_teacher_dashboard_tour_v1:';

export function hasCompletedTeacherTour(userId: string | undefined): boolean {
  if (!userId) return false;
  try {
    return localStorage.getItem(`${KEY_PREFIX}${userId}`) === 'true';
  } catch {
    return false;
  }
}

export function markTeacherTourCompleted(userId: string | undefined): void {
  if (!userId) return;
  try {
    localStorage.setItem(`${KEY_PREFIX}${userId}`, 'true');
  } catch {
    // The profile flag remains the cross-device source of truth.
  }
}
