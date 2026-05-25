/**
 * Businesses & Competition — lesson curriculum for Business Economics track.
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from './lesson-stub-helpers';
import { biz1ValueCreation } from './businesses-competition/biz-1-value-creation';
import { biz2CompetitiveStrategy } from './businesses-competition/biz-2-competitive-strategy';
import { biz3IndustryForces } from './businesses-competition/biz-3-industry-forces';
import { biz4InnovationEthics } from './businesses-competition/biz-4-innovation-ethics';

export const businessCompetitionUnits: EconomicsUnit[] = [
  {
    id: 'biz-comp-1',
    track: 'businesses-competition',
    title: 'Businesses, Competition & New Ideas',
    description:
      'How businesses create value, compete in markets, and navigate ethics, structure, and supply chains.',
    icon: '🏢',
    order: 1,
    coreEconomicsConcepts: [
      'Value Creation',
      'Competitive Advantage',
      'PESTEL Analysis',
      'MVP Validation',
      'Business Ethics',
      'Organizational Structure',
      'Supply Chain Risk',
    ],
    personalFinanceConnection: {
      description:
        'Every side hustle, job offer, and purchase decision sits inside a competitive market — understanding business basics sharpens your choices.',
      relatedPFModules: ['income', 'career-income', 'financial-planning'],
    },
    investingConnection: [
      'Moats and differentiation drive long-term stock performance',
      'PESTEL shifts reprice entire sectors',
      'Ethics scandals can destroy shareholder value overnight',
    ],
    careerExposure: [
      {
        title: 'Strategy Analyst',
        description: 'Evaluates how companies compete and where advantage comes from.',
        salaryRange: '$60,000 - $110,000',
        skills: ['Market Analysis', 'Frameworks', 'Presentation'],
      },
      {
        title: 'Entrepreneur / Founder',
        description: 'Builds new ventures by solving problems and validating ideas before scaling.',
        salaryRange: 'Variable',
        skills: ['Customer Discovery', 'Financial Modeling', 'Leadership'],
      },
    ],
    lessons: [
      buildStubLesson('biz-1-1', 'Value Creation & Vision', [
        'Problem–Solution Fit',
        'Value Proposition',
        'Mission & Vision',
      ]),
      buildStubLesson('biz-1-2', 'Markets & Competitive Advantage', [
        'Market Price',
        'Cost Leadership',
        'Differentiation',
      ]),
      buildStubLesson('biz-1-3', 'PESTEL & the Business Environment', [
        'Political Factors',
        'Economic Factors',
        'Social & Technological Forces',
      ]),
      buildStubLesson('biz-1-4', 'MVP, Ethics & Org Structure', [
        'Minimum Viable Product',
        'Stakeholder Ethics',
        'Org Forms & Supply Chains',
      ]),
    ],
    gamifiedActivity: {
      id: 'biz-comp-tinder',
      title: 'Company Tinder: Competitive Lens',
      description:
        'Practice spotting competitive strategy and lifecycle stage while swiping on real companies.',
      instructions: [
        'Open Company Tinder from Market Intelligence',
        'Note the product lifecycle badge on each card',
        'Swipe based on whether the strategy fits the scenario',
      ],
      rewards: { bamboo: 40, xp: 80 },
    },
    rewards: { bamboo: 50, xp: 100 },
    unlockRequirements: {},
  },
  biz1ValueCreation,
  biz2CompetitiveStrategy,
  biz3IndustryForces,
  biz4InnovationEthics,
];
