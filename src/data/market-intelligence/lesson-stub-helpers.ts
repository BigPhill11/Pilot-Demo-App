/**
 * Shared lesson stub builders for Market Intelligence curriculum templates.
 * Replace placeholder copy with final content — renderers work immediately.
 */

import type { EconomicsLesson, EconomicsQuizQuestion, EconomicsFlashcard } from '@/types/economics-curriculum';

export function buildStubLesson(
  id: string,
  title: string,
  conceptTitles: string[]
): EconomicsLesson {
  const coreConcepts = conceptTitles.map((conceptTitle) => ({
    title: conceptTitle,
    explanation: `Placeholder: core explanation for ${conceptTitle}. Replace with final lesson copy.`,
    example: `Placeholder: real-world example for ${conceptTitle}.`,
    keyTerms: [conceptTitle.split(' ')[0]],
    pfTip: 'Placeholder: personal finance connection tip.',
    careerTip: 'Placeholder: career application tip.',
  }));

  const flashcards: EconomicsFlashcard[] = conceptTitles.slice(0, 4).map((term) => ({
    term,
    definition: `Placeholder definition for ${term}.`,
    philsAnalogy: `Placeholder Phil analogy for ${term}.`,
  }));

  const quiz: EconomicsQuizQuestion[] = [
    {
      question: `Placeholder quiz: what best describes ${conceptTitles[0]}?`,
      options: [
        'Placeholder correct answer',
        'Placeholder distractor A',
        'Placeholder distractor B',
        'Placeholder distractor C',
      ],
      correctIndex: 0,
      explanation: 'Placeholder: replace with explanation after content review.',
    },
    {
      question: `Placeholder quiz: which example fits ${conceptTitles[1] ?? conceptTitles[0]}?`,
      options: [
        'Placeholder distractor',
        'Placeholder correct answer',
        'Placeholder distractor',
        'Placeholder distractor',
      ],
      correctIndex: 1,
      explanation: 'Placeholder: replace with explanation after content review.',
    },
  ];

  return {
    id,
    title,
    estimatedMinutes: 12,
    intro: {
      hook: `Placeholder hook for "${title}". Replace with an opening scenario students recognize.`,
      philMessage: `Placeholder Phil intro for "${title}". Replace with voice-aligned guidance.`,
    },
    coreConcepts,
    personalFinanceConnection: {
      description: `Placeholder: how ${title} connects to personal financial decisions.`,
      realWorldExample: 'Placeholder: concrete example from everyday money choices.',
    },
    flashcards,
    quiz,
  };
}
