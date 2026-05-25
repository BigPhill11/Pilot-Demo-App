/**
 * MI-style enrichments for macro lessons (test run: GDP unit lesson 1).
 */

import type { EconomicsLesson } from '@/types/economics-curriculum';
import { econImg } from '@/data/economics-lesson-helpers';
import { registerStatic } from '@/data/economics-visual-registry';

const U1 = 'macro-1';

function hero(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'hero', alt, undefined, 'svg');
  registerStatic(lessonId, 'hero', v.src);
  return v;
}

function connectPf(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'connect-pf', alt, undefined, 'svg');
  registerStatic(lessonId, 'connect-pf', v.src);
  return v;
}

function connectCareer(unit: string, lessonId: string, alt: string) {
  const v = econImg(unit, lessonId, 'connect-career', alt, undefined, 'svg');
  registerStatic(lessonId, 'connect-career', v.src);
  return v;
}

function conceptVisual(unit: string, lessonId: string, name: string, alt: string, caption?: string) {
  const v = econImg(unit, lessonId, name, alt, caption, 'svg');
  registerStatic(lessonId, `concept-${name}`, v.src);
  return v;
}

type PartialLesson = Pick<
  EconomicsLesson,
  'intro' | 'coreConcepts' | 'tryActivity' | 'connect' | 'rewards'
>;

export const MACRO_LESSON_ENRICHMENTS: Record<string, PartialLesson> = {
  'macro-1-lesson-1': {
    intro: {
      hook:
        'GDP is the usual answer to “how big is the economy?”—the market value of final goods and services produced inside a country in a period.',
      philMessage: 'We’ll use C + I + G + NX so you can read headlines with confidence.',
      heroImage: hero(U1, 'macro-1-lesson-1', 'Green panda measuring total economic output'),
    },
    coreConcepts: [
      {
        title: 'Gross Domestic Product Defined',
        explanation:
          'GDP sums the market value of final output produced within borders in a quarter or year. It is the standard gauge of total economic activity.',
        example:
          'US GDP in the trillions is all finished goods and services produced domestically in that year.',
        visual: conceptVisual(
          U1,
          'macro-1-lesson-1',
          'concept-defined',
          'Green panda weighing total domestic output',
          'GDP = everything made inside the country'
        ),
      },
      {
        title: 'What Counts in GDP',
        explanation:
          'Count final goods once, current production, market activity, and domestic production. Exclude used goods (already counted), most home production, and intermediate goods (embedded in final prices).',
        example:
          'New car yes; steel sold to the plant no (in the car); used couch no; Toyota in Kentucky yes for US GDP.',
        visual: conceptVisual(
          U1,
          'macro-1-lesson-1',
          'concept-counts',
          'Green panda showing new goods count and used goods do not',
          'Final goods only — no double counting'
        ),
      },
      {
        title: 'C + I + G + NX',
        explanation:
          'Expenditure GDP = Consumption + Investment + Government purchases + Net exports (exports − imports). Imports subtract because they are not produced here.',
        example:
          'In the US, C is the largest share; NX is often negative when imports exceed exports.',
        visual: conceptVisual(
          U1,
          'macro-1-lesson-1',
          'concept-cignx',
          'GDP spending formula C plus I plus G plus NX',
          'Four spending buckets add up to GDP'
        ),
      },
    ],
    tryActivity: {
      type: 'term-classify',
      title: 'Does it count in GDP?',
      description: 'Sort each transaction — only final, current, domestic production counts.',
      categories: [
        { id: 'counts', label: 'Counts in GDP' },
        { id: 'skip', label: 'Does not count' },
      ],
      terms: [
        { id: 't1', label: 'New car built in Detroit', correctCategory: 'counts' },
        { id: 't2', label: 'Used textbook resold on campus', correctCategory: 'skip' },
        { id: 't3', label: 'Haircut at a local salon', correctCategory: 'counts' },
        { id: 't4', label: 'Steel sold to an auto factory', correctCategory: 'skip' },
      ],
    },
    connect: {
      personalFinance: {
        title: 'Your money',
        description:
          'Weak or negative GDP growth often means tougher jobs and markets; strong growth usually means the opposite.',
        scenario:
          'In 2008, shrinking GDP lined up with layoffs and wealth hits. Recoveries usually bring rising GDP and hiring back.',
        visual: connectPf(U1, 'macro-1-lesson-1', 'Green panda linking GDP growth to job opportunities'),
      },
      career: {
        title: 'On the job',
        description:
          'Macroeconomists and research analysts track GDP to forecast trends for governments, banks, and investors.',
        role: 'Macroeconomist',
        skills: ['Forecasting', 'Data analysis', 'Economic theory'],
        visual: connectCareer(U1, 'macro-1-lesson-1', 'Green panda macroeconomist reading GDP charts'),
      },
    },
    rewards: { bamboo: 12, xp: 3 },
  },
};
