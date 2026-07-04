/**
 * Teach-back concept spec resolution.
 *
 * Every village lesson gets a Teach Phil step. Lessons with a hand-written
 * `teachBack` spec use it verbatim; the rest get a spec auto-derived from
 * their existing concepts array so the feature works across all content
 * without waiting on authoring. `philAge` defaults per module and can be
 * overridden per lesson.
 */

import type { VillageLesson, VillageModuleId } from '@/types/village-lesson';
import type { PhilAge, TeachBackSpec } from '@/types/teach-back';

const DEFAULT_PHIL_AGE_BY_MODULE: Record<VillageModuleId, PhilAge> = {
  'language-finance': 'cub',
  'business-foundations': 'cub',
  'business-economics': 'teen',
  'markets-headlines': 'teen',
  'ownership': 'elder',
  'company-tinder': 'cub', // swipe game — no lessons, value unused
};

export function getPhilAge(lesson: VillageLesson): PhilAge {
  return lesson.philAge ?? DEFAULT_PHIL_AGE_BY_MODULE[lesson.moduleId] ?? 'teen';
}

/** First sentence of a concept body, trimmed to a teachable fact */
function firstSentence(text: string): string {
  const match = text.trim().match(/^[^.!?]+[.!?]/);
  return (match ? match[0] : text.trim()).slice(0, 200);
}

export function getTeachBackSpec(lesson: VillageLesson): TeachBackSpec {
  if (lesson.teachBack) return lesson.teachBack;

  return {
    conceptName: lesson.title,
    keyFacts: lesson.concepts
      .slice(0, 4)
      .map((c) => `${c.title}: ${firstSentence(c.body)}`),
    misconceptions: [],
  };
}
