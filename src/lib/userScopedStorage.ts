/**
 * Per-user localStorage key scoping and legacy migration.
 */

const ANON_SUFFIX = 'anon';

let activeUserId: string | null = null;

export function setActiveStorageUserId(userId: string | null | undefined): void {
  activeUserId = userId ?? null;
}

export function getActiveStorageUserId(): string | null {
  return activeUserId;
}

/** Build a user-scoped storage key from a base key. */
export function scopedStorageKey(baseKey: string, userId?: string | null): string {
  const uid = userId === undefined ? activeUserId : userId;
  const suffix = uid ?? ANON_SUFFIX;
  return `${baseKey}:${suffix}`;
}

/**
 * Migrate legacy (unscoped) value into scoped key if scoped is empty.
 */
export function migrateLegacyStorageKey(
  baseKey: string,
  userId?: string | null
): void {
  try {
    const scoped = scopedStorageKey(baseKey, userId);
    if (localStorage.getItem(scoped) != null) return;

    const legacy = localStorage.getItem(baseKey);
    if (legacy != null) {
      localStorage.setItem(scoped, legacy);
    }
  } catch {
    /* ignore quota errors */
  }
}

/** Migrate a set of known empire/progress keys for the active user. */
export function migrateAllLegacyStorageKeys(userId?: string | null): void {
  const keys = [
    'bamboo-empire-state',
    'bamboo-empire-layout',
    'bamboo-empire-credit',
    'bamboo-empire-improvements',
    'bamboo_empire_last_visit',
    'bamboo_empire_last_event_at',
    'bamboo_empire_tutorial_v2_completed',
    'village_lesson_progress_v1',
    'personal-finance-progress',
    'career_readiness_progress',
    'unified_streak',
    'daily_goals_progress',
    'lastTouched_pf',
    'lastTouched_cd',
    'lastTouched_cf',
  ];

  for (const key of keys) {
    migrateLegacyStorageKey(key, userId);
  }
}

/** Zustand-compatible storage adapter using scoped keys. */
export function createUserScopedPersistStorage() {
  return {
    getItem: (name: string): string | null => {
      try {
        return localStorage.getItem(scopedStorageKey(name));
      } catch {
        return null;
      }
    },
    setItem: (name: string, value: string): void => {
      try {
        localStorage.setItem(scopedStorageKey(name), value);
      } catch {
        /* ignore */
      }
    },
    removeItem: (name: string): void => {
      try {
        localStorage.removeItem(scopedStorageKey(name));
      } catch {
        /* ignore */
      }
    },
  };
}

export const PROGRESS_UPDATED_EVENT = 'pf-progress-updated';

export function notifyProgressUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PROGRESS_UPDATED_EVENT));
  }
}
