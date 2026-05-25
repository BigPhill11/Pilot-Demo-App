/**
 * Syncs completed MI lesson flashcards to localStorage for the Flashcards hub.
 */

import type { MILesson } from '@/types/mi-lesson';
import type { UnifiedFlashcard } from '@/data/unified-flashcards';

const STORAGE_KEY = 'mi_unlocked_flashcard_ids';

function getFlashcardPrefix(lesson: MILesson): string {
  switch (lesson.section) {
    case 'ownership': return 'mi-ownership';
    case 'markets-headlines': return 'mi-headlines';
    case 'business-foundations': return 'mi-bf';
    case 'businesses-competition': return 'mi-biz';
    default: return 'mi-lof';
  }
}

function getFlashcardCategory(lesson: MILesson): string {
  switch (lesson.section) {
    case 'ownership': return 'Ownership';
    case 'markets-headlines': return 'Markets & Headlines';
    case 'business-foundations': return 'Business Foundations';
    case 'businesses-competition': return 'Businesses & Competition';
    default: return 'Language of Finance';
  }
}

export function unlockLessonFlashcards(lesson: MILesson): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const ids: string[] = stored ? JSON.parse(stored) : [];
    const prefix = getFlashcardPrefix(lesson);
    const newIds = lesson.flashcards.map((_, i) => `${prefix}-${lesson.moduleId}-${i}`);
    const merged = [...new Set([...ids, ...newIds])];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.error('Failed to unlock MI flashcards', e);
  }
}

export function getUnlockedMiFlashcardIds(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored) as string[]);
  } catch {
    /* ignore */
  }
  return new Set();
}

export function miLessonToUnifiedFlashcards(lesson: MILesson): UnifiedFlashcard[] {
  const prefix = getFlashcardPrefix(lesson);
  const category = getFlashcardCategory(lesson);
  return lesson.flashcards.map((card, index) => ({
    id: `${prefix}-${lesson.moduleId}-${index}`,
    term: card.term,
    definition: card.definition,
    philExample: card.philsAnalogy,
    sourceModule: 'market-intelligence' as const,
    sourceLesson: lesson.title,
    category,
    subcategory: lesson.title,
    difficulty: 'intermediate' as const,
    tags: [category, lesson.title],
    icon: lesson.section === 'ownership' ? '🏛️' : '📖',
  }));
}
