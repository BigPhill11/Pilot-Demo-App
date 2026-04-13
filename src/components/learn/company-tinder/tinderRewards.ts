/**
 * Company Tinder → Bamboo Empire rewards (single source of truth).
 * Base swipe rewards; mode bonuses are added in CompanyTinderGame.
 */

import type { SwipeAction } from './hooks/useTinderSwipe';

export const SUPER_LIKES_PER_DAY = 5;

const STORAGE_SUPER_LIKES = 'tinderSuperLikesDay';
const STORAGE_SWIPE_STATS = 'tinderGameStats';

export function getBaseSwipeRewards(action: SwipeAction): { bamboo: number; xp: number } {
  switch (action) {
    case 'like':
      return { bamboo: 10, xp: 0 };
    case 'super_like':
      return { bamboo: 0, xp: 25 };
    case 'pass':
      return { bamboo: 0, xp: 5 };
    case 'skip':
    case 'never':
    default:
      return { bamboo: 0, xp: 0 };
  }
}

export function readSuperLikesRemaining(): number {
  const today = new Date().toDateString();
  try {
    const raw = localStorage.getItem(STORAGE_SUPER_LIKES);
    if (!raw) return SUPER_LIKES_PER_DAY;
    const parsed = JSON.parse(raw) as { date?: string; remaining?: number };
    if (parsed.date !== today) return SUPER_LIKES_PER_DAY;
    return Math.max(0, Number(parsed.remaining) ?? 0);
  } catch {
    return SUPER_LIKES_PER_DAY;
  }
}

export function consumeSuperLike(): void {
  const today = new Date().toDateString();
  const rem = readSuperLikesRemaining();
  if (rem <= 0) return;
  localStorage.setItem(
    STORAGE_SUPER_LIKES,
    JSON.stringify({ date: today, remaining: rem - 1 })
  );
}

/** Keeps dashboard Company Discovery path in sync (weighted tinder progress). */
export function incrementTinderSwipeCountInStorage(): void {
  try {
    const raw = localStorage.getItem(STORAGE_SWIPE_STATS);
    const data = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    const swipeCount = (typeof data.swipeCount === 'number' ? data.swipeCount : 0) + 1;
    localStorage.setItem(STORAGE_SWIPE_STATS, JSON.stringify({ ...data, swipeCount }));
  } catch {
    /* ignore */
  }
}
