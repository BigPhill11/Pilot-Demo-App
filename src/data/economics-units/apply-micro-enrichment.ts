import type { EconomicsLesson, EconomicsUnit } from '@/types/economics-curriculum';
import { econImg } from '@/data/economics-lesson-helpers';
import { registerStatic } from '@/data/economics-visual-registry';
import { MICRO_CONCEPT_CHARTS, MICRO_LESSON_ENRICHMENTS } from './micro-enrichments';

const EXTRA_CONCEPT_VISUALS: Record<string, Record<number, ReturnType<typeof econImg>>> = {
  'micro-1-lesson-1': {
    2: (() => {
      const v = econImg('micro-1', 'micro-1-lesson-1', 'marketplace', 'Buyers and sellers in a market');
      registerStatic('micro-1-lesson-1', 'concept-marketplace', v.src);
      return v;
    })(),
  },
};

export function applyMicroEnrichment(lesson: EconomicsLesson): EconomicsLesson {
  const patch = MICRO_LESSON_ENRICHMENTS[lesson.id];
  const charts = MICRO_CONCEPT_CHARTS[lesson.id];

  if (!patch && !charts) {
    return lesson;
  }

  const extraVisuals = EXTRA_CONCEPT_VISUALS[lesson.id];

  const coreConcepts = lesson.coreConcepts.map((concept, i) => {
    const chart = charts?.[i];
    const visualPatch = patch?.coreConcepts?.[i];
    const extraVisual = extraVisuals?.[i];
    return {
      ...concept,
      ...(visualPatch?.visual ? { visual: visualPatch.visual } : {}),
      ...(extraVisual ? { visual: extraVisual } : {}),
      ...(visualPatch?.chart ? { chart: visualPatch.chart } : {}),
      ...(chart ? { chart } : {}),
    };
  });

  return {
    ...lesson,
    intro: {
      ...lesson.intro,
      ...(patch?.intro?.heroImage ? { heroImage: patch.intro.heroImage } : {}),
      hook: patch?.intro?.hook ?? lesson.intro.hook,
      philMessage: patch?.intro?.philMessage ?? lesson.intro.philMessage,
    },
    coreConcepts,
    ...(patch?.tryActivity ? { tryActivity: patch.tryActivity } : {}),
    ...(patch?.connect ? { connect: patch.connect } : {}),
    ...(patch?.rewards ? { rewards: patch.rewards } : {}),
  };
}

export function enrichMicroeconomicsUnits(units: EconomicsUnit[]): EconomicsUnit[] {
  return units.map((unit) => {
    if (unit.track !== 'microeconomics') {
      return unit;
    }
    return {
      ...unit,
      lessons: unit.lessons.map(applyMicroEnrichment),
    };
  });
}
