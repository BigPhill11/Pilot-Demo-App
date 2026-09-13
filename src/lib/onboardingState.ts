// Per-account onboarding completion marker, stored in localStorage keyed by the
// user's id.
//
// This is a resilient backup to the profile.app_tour_completed DB flag: even if
// the database write fails (e.g. a missing column on an un-migrated database, or
// a transient RLS/constraint error), a returning account on the same device is
// never forced through onboarding again.
//
// Crucially it is namespaced PER ACCOUNT, so:
//   • a returning account that already finished onboarding skips it, and
//   • a brand-new account signing in on the same device still gets onboarding.
//
// It is intentionally NOT cleared on sign-out — it is cleared only when the user
// explicitly restarts onboarding.

const KEY_PREFIX = 'phils_onboarding_done_v2:';

export const onboardingDoneKey = (userId: string): string => `${KEY_PREFIX}${userId}`;

export const isOnboardingDoneLocally = (userId: string | undefined | null): boolean => {
  if (!userId) return false;
  try {
    return localStorage.getItem(onboardingDoneKey(userId)) === 'true';
  } catch {
    return false;
  }
};

export const markOnboardingDoneLocally = (userId: string | undefined | null): void => {
  if (!userId) return;
  try {
    localStorage.setItem(onboardingDoneKey(userId), 'true');
  } catch {
    /* localStorage unavailable — DB flag remains the source of truth */
  }
};

export const clearOnboardingDoneLocally = (userId: string | undefined | null): void => {
  if (!userId) return;
  try {
    localStorage.removeItem(onboardingDoneKey(userId));
  } catch {
    /* ignore */
  }
};

// ── Teacher dashboard tour ───────────────────────────────────────────────────
// Same per-account localStorage pattern as above, but for the Phil-guided tour
// of the teacher dashboard. Kept separate from the student tour flag because
// existing teacher accounts were backfilled with app_tour_completed=true, which
// would otherwise hide the teacher tour from everyone who signed up before it
// shipped.

const TEACHER_TOUR_PREFIX = 'phils_teacher_tour_done_v1:';

export const isTeacherTourDone = (userId: string | undefined | null): boolean => {
  if (!userId) return false;
  try {
    return localStorage.getItem(`${TEACHER_TOUR_PREFIX}${userId}`) === 'true';
  } catch {
    return false;
  }
};

export const markTeacherTourDone = (userId: string | undefined | null): void => {
  if (!userId) return;
  try {
    localStorage.setItem(`${TEACHER_TOUR_PREFIX}${userId}`, 'true');
  } catch {
    /* localStorage unavailable — the tour will simply show again next launch */
  }
};
