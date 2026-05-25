/**
 * Macro Unit 6 — Business Cycles & Recessions
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const macro6BusinessCycles: EconomicsUnit = {
  id: 'macro-6',
  track: 'macroeconomics',
  title: 'Business Cycles & Recessions',
  description: 'The 4 stages of the economic cycle, leading vs. lagging indicators, causes of recessions, and how to invest across the cycle.',
  icon: '🔄',
  order: 6,
  coreEconomicsConcepts: ['Expansion', 'Recession', 'Leading indicator', 'Lagging indicator', 'Demand shock', 'Cyclical vs defensive'],
  personalFinanceConnection: {
    description: 'Knowing where you are in the cycle helps you anticipate job market conditions, interest rate trends, and whether to be more conservative or growth-oriented with your savings.',
    relatedPFModules: ['financial-planning', 'saving'],
  },
  investingConnection: [
    'Sector rotation strategies depend on identifying cycle stage',
    'Leading indicators like the yield curve have signaled every post-WWII recession',
    'Defensive stocks (staples, utilities) tend to outperform in contraction; cyclicals outperform in expansion',
  ],
  careerExposure: [
    {
      title: 'Macro Strategist',
      description: 'Advises portfolio managers on asset allocation based on cycle positioning.',
      salaryRange: '$100,000 - $200,000+',
      skills: ['Economic modeling', 'Indicator analysis', 'Portfolio strategy'],
    },
    {
      title: 'Economist (Government/Research)',
      description: 'Studies business cycle dynamics and advises on policy responses.',
      salaryRange: '$65,000 - $130,000',
      skills: ['Econometrics', 'Data analysis', 'Policy writing'],
    },
  ],
  lessons: [
    buildStubLesson('macro-6-1', 'The 4 Stages of the Cycle', ['Expansion', 'Peak', 'Recession', 'Trough']),
    buildStubLesson('macro-6-2', 'Leading vs. Lagging Indicators', ['Leading indicator', 'Lagging indicator', 'Coincident indicator', 'Yield curve']),
    buildStubLesson('macro-6-3', 'What Causes Recessions', ['Demand shock', 'Supply shock', 'Bubble', 'Policy error']),
    buildStubLesson('macro-6-4', 'Investing Across the Cycle', ['Cyclical', 'Defensive', 'Sector rotation', 'Recession-proof']),
  ],
  gamifiedActivity: {
    id: 'macro-6-sim',
    title: 'Cycle Navigator',
    description: 'Identify the cycle stage from indicator data and choose the right sector rotation.',
    instructions: ['Read the economic indicators', 'Identify the cycle stage', 'Choose defensive vs cyclical allocation'],
    economicsConcept: 'Business cycle analysis',
    bambooReward: 25,
    xpReward: 5,
  },
};
