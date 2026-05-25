import type { EconomicsLesson, EconomicsUnit } from '@/types/economics-curriculum';
import { MACRO_LESSON_ENRICHMENTS } from './macro-enrichments';

export function applyMacroEnrichment(lesson: EconomicsLesson): EconomicsLesson {
  const patch = MACRO_LESSON_ENRICHMENTS[lesson.id];
  if (!patch) {
    return lesson;
  }

  const coreConcepts = lesson.coreConcepts.map((concept, i) => {
    const visualPatch = patch.coreConcepts?.[i];
    return {
      ...concept,
      ...(visualPatch?.visual ? { visual: visualPatch.visual } : {}),
      title: visualPatch?.title ?? concept.title,
      explanation: visualPatch?.explanation ?? concept.explanation,
      example: visualPatch?.example ?? concept.example,
    };
  });

  return {
    ...lesson,
    intro: {
      ...lesson.intro,
      ...(patch.intro?.heroImage ? { heroImage: patch.intro.heroImage } : {}),
      hook: patch.intro?.hook ?? lesson.intro.hook,
      philMessage: patch.intro?.philMessage ?? lesson.intro.philMessage,
    },
    coreConcepts,
    ...(patch.tryActivity ? { tryActivity: patch.tryActivity } : {}),
    ...(patch.connect ? { connect: patch.connect } : {}),
    ...(patch.rewards ? { rewards: patch.rewards } : {}),
  };
}

export function enrichMacroeconomicsUnits(units: EconomicsUnit[]): EconomicsUnit[] {
  return units.map((unit) => {
    if (unit.track !== 'macroeconomics') {
      return unit;
    }
    return {
      ...unit,
      lessons: unit.lessons.map(applyMacroEnrichment),
    };
  });
}
