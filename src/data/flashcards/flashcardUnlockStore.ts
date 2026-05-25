/**
 * Unified flashcard unlock store.
 *
 * Keys:
 *  - `mi_unlocked_flashcard_ids`      (pre-existing MI key — kept for backward compat)
 *  - `careers_unlocked_flashcard_ids` (new Careers key)
 *  - `pf_completed_lesson_ids`        (PF lesson completion tracking)
 *
 * Personal Finance cards are always available (no gating).
 * Markets and Careers decks unlock card-by-card when the user completes
 * the corresponding lesson/module.
 */

import type { UnifiedFlashcard } from '@/data/unified-flashcards';
import type { MILesson } from '@/types/mi-lesson';
import { miLessonToUnifiedFlashcards } from '@/data/market-intelligence/mi-flashcard-unlocks';

// ── Storage keys ──────────────────────────────────────────────────────────────
const MI_KEY = 'mi_unlocked_flashcard_ids';
const CAREERS_KEY = 'careers_unlocked_flashcard_ids';
const PF_KEY = 'pf_completed_lesson_ids';

// ── Helpers ───────────────────────────────────────────────────────────────────
function readIds(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

function writeIds(key: string, ids: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

// ── MI unlock ─────────────────────────────────────────────────────────────────
export function unlockMILessonFlashcards(lesson: MILesson): void {
  const ids = readIds(MI_KEY);
  const cards = miLessonToUnifiedFlashcards(lesson);
  cards.forEach((c) => ids.add(c.id));
  writeIds(MI_KEY, ids);
}

export function getUnlockedMIFlashcardIds(): Set<string> {
  return readIds(MI_KEY);
}

// ── Careers unlock ────────────────────────────────────────────────────────────
export function unlockCareersFlashcards(cardIds: string[]): void {
  const ids = readIds(CAREERS_KEY);
  cardIds.forEach((id) => ids.add(id));
  writeIds(CAREERS_KEY, ids);
}

export function getUnlockedCareersFlashcardIds(): Set<string> {
  return readIds(CAREERS_KEY);
}

/**
 * Call when a Careers lesson is completed.
 * `lessonTitle` must match the `sourceLesson` field on Careers cards.
 */
export function unlockCareersLessonFlashcards(
  lessonTitle: string,
  allCareersCards: UnifiedFlashcard[]
): void {
  const ids = allCareersCards
    .filter((c) => c.sourceLesson === lessonTitle)
    .map((c) => c.id);
  unlockCareersFlashcards(ids);
}

// ── PF completion tracking ────────────────────────────────────────────────────
export function markPFLessonComplete(lessonId: string): void {
  const ids = readIds(PF_KEY);
  ids.add(lessonId);
  writeIds(PF_KEY, ids);
}

export function getCompletedPFLessonIds(): Set<string> {
  return readIds(PF_KEY);
}

// ── Main filter ───────────────────────────────────────────────────────────────
/**
 * Returns all cards the user currently has access to study.
 *  - 'personal-finance': all cards (always unlocked)
 *  - 'market-intelligence': only those whose id appears in MI unlock set
 *  - 'careers': only those whose id appears in Careers unlock set
 */
export function getAvailableFlashcards(
  section: 'personal-finance' | 'market-intelligence' | 'careers',
  allCards: UnifiedFlashcard[]
): UnifiedFlashcard[] {
  const sectionCards = allCards.filter((c) => c.sourceModule === section);
  if (section === 'personal-finance') return sectionCards;

  const unlocked =
    section === 'market-intelligence'
      ? getUnlockedMIFlashcardIds()
      : getUnlockedCareersFlashcardIds();

  return sectionCards.filter((c) => unlocked.has(c.id));
}

/**
 * Returns cards grouped by subcategory with a locked/unlocked flag.
 * Locked subcategories show "Complete [lesson] to unlock" prompts.
 */
export interface SubcategoryUnlockStatus {
  subcategory: string;
  cards: UnifiedFlashcard[];
  unlocked: boolean;
  /** Human-readable label for the CTA when locked */
  unlockCta: string;
}

export function getSubcategoryUnlockStatus(
  section: 'market-intelligence' | 'careers',
  allCards: UnifiedFlashcard[]
): SubcategoryUnlockStatus[] {
  const unlockedIds =
    section === 'market-intelligence'
      ? getUnlockedMIFlashcardIds()
      : getUnlockedCareersFlashcardIds();

  const sectionCards = allCards.filter((c) => c.sourceModule === section);

  // Group by subcategory (which corresponds to lesson title)
  const map = new Map<string, UnifiedFlashcard[]>();
  sectionCards.forEach((c) => {
    const key = c.subcategory ?? c.category;
    const arr = map.get(key) ?? [];
    arr.push(c);
    map.set(key, arr);
  });

  return [...map.entries()].map(([sub, cards]) => {
    const anyUnlocked = cards.some((c) => unlockedIds.has(c.id));
    return {
      subcategory: sub,
      cards,
      unlocked: anyUnlocked,
      unlockCta: `Complete "${sub}" to unlock`,
    };
  });
}
