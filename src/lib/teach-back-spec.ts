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

/**
 * A concept body condensed to a teachable fact. The TeachPhil Edge Function
 * caps each key fact at 300 chars, so pack in as much of the actual lesson
 * content as fits — grading must be grounded in what was taught, not the
 * lesson title.
 */
const FACT_MAX_CHARS = 280;

function condense(text: string, budget: number): string {
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= budget) return clean;
  // Cut at the last sentence end that fits; fall back to a hard trim
  const slice = clean.slice(0, budget);
  const lastStop = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
  return lastStop > budget * 0.5 ? slice.slice(0, lastStop + 1) : slice;
}

export function getTeachBackSpec(lesson: VillageLesson): TeachBackSpec {
  if (lesson.teachBack) return lesson.teachBack;

  const keyFacts = lesson.concepts.slice(0, 5).map((c) => {
    const label = `${c.title}: `;
    return label + condense(c.body, FACT_MAX_CHARS - label.length);
  });

  // The simulator's lesson is part of what was taught — include its takeaway
  // as a fact when there is room (server accepts up to 6)
  const simulatorTakeaway = lesson.simulator?.endMessage;
  if (keyFacts.length < 6 && simulatorTakeaway) {
    keyFacts.push('From the simulator: ' + condense(simulatorTakeaway, FACT_MAX_CHARS - 20));
  }

  return {
    conceptName: lesson.title,
    keyFacts,
    misconceptions: [],
  };
}
