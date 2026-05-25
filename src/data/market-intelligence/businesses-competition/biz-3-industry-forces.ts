/**
 * Biz Unit 3 — Industry Forces
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const biz3IndustryForces: EconomicsUnit = {
  id: 'biz-3',
  track: 'businesses-competition',
  title: 'Industry Forces',
  description: 'PESTEL, Porter\'s Five Forces, industry life cycle, and disruption patterns — frameworks for understanding any industry.',
  icon: '⚡',
  order: 3,
  coreEconomicsConcepts: ['PESTEL', 'Porter\'s Five Forces', 'Industry life cycle', 'Disruption', 'Barriers to entry'],
  personalFinanceConnection: {
    description: 'Understanding industry forces helps you evaluate whether the sector you\'re investing in is growing or dying, and whether new entrants can easily steal market share from companies you own.',
    relatedPFModules: ['financial-planning'],
  },
  investingConnection: [
    'Porter\'s Five Forces determines long-term industry profitability and thus valuation multiples',
    'PESTEL shifts (regulation, technology) can reprice entire sectors virtually overnight',
    'Disruption patterns predict where incumbents face existential risk',
  ],
  careerExposure: [
    {
      title: 'Industry Analyst',
      description: 'Tracks macroeconomic and competitive forces that affect an industry\'s long-term outlook.',
      salaryRange: '$60,000 - $100,000',
      skills: ['Industry research', 'Trend analysis', 'Report writing'],
    },
    {
      title: 'Management Consultant',
      description: 'Applies structured frameworks (PESTEL, Five Forces) to solve client business problems.',
      salaryRange: '$90,000 - $180,000',
      skills: ['Frameworks', 'Client management', 'Slide decks'],
    },
  ],
  lessons: [
    buildStubLesson('biz-3-1', 'PESTEL Walkthrough', ['Political factor', 'Economic factor', 'Social factor', 'Technology factor']),
    buildStubLesson('biz-3-2', 'Porter\'s Five Forces', ['Supplier power', 'Buyer power', 'New entrants', 'Substitutes']),
    buildStubLesson('biz-3-3', 'Industry Life Cycle', ['Introduction stage', 'Growth stage', 'Maturity', 'Decline']),
    buildStubLesson('biz-3-4', 'Disruption Patterns', ['Disruptive innovation', 'Incumbent inertia', 'Low-end disruption', 'New-market disruption']),
  ],
  gamifiedActivity: {
    id: 'biz-3-tinder',
    title: 'Industry Force Detector',
    description: 'Given a company and its industry, identify the most powerful force threatening it today.',
    instructions: ['Read the company card', 'Apply Porter\'s Five Forces', 'Identify the biggest current threat'],
    economicsConcept: 'Five Forces analysis',
    bambooReward: 20,
    xpReward: 4,
  },
};
