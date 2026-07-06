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
import type { Lesson as PersonalFinanceLesson } from '@/types/personal-finance';
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

/* ─── Personal-finance lessons ─── */

/**
 * Persona tier per personal-finance module: early money-basics modules get
 * Cub Phil, mid-track modules Teen Phil, and the capstone wealth/career
 * modules Elder Phil.
 */
const PF_PHIL_AGE_BY_MODULE: Record<string, PhilAge> = {
  'income': 'cub',
  'financial-planning': 'cub',
  'saving': 'cub',
  'investing': 'teen',
  'insurance': 'teen',
  'taxes': 'teen',
  'credit-debt': 'teen',
  'career-income': 'elder',
  'wealth-fundamentals': 'elder',
  'market-literacy': 'elder',
};

export function getPersonalFinancePhilAge(moduleId?: string): PhilAge {
  return (moduleId && PF_PHIL_AGE_BY_MODULE[moduleId]) || 'teen';
}

/**
 * Teach-back spec for a personal-finance lesson, grounded in the lesson's
 * own flashcards (term + definition are exactly the facts a complete
 * explanation should cover) plus the micro-lesson takeaway.
 */
export function getPersonalFinanceTeachBackSpec(lesson: PersonalFinanceLesson): TeachBackSpec {
  const keyFacts = lesson.flashcards.slice(0, 5).map((card) => {
    const label = `${card.term}: `;
    return label + condense(card.definition, FACT_MAX_CHARS - label.length);
  });

  if (keyFacts.length < 6 && lesson.microLesson) {
    keyFacts.push('Big picture: ' + condense(lesson.microLesson, FACT_MAX_CHARS - 15));
  }

  return {
    conceptName: lesson.title,
    keyFacts,
    misconceptions: [],
  };
}
