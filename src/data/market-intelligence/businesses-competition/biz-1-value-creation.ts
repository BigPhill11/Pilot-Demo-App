/**
 * Biz Unit 1 — Value Creation & Vision
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const biz1ValueCreation: EconomicsUnit = {
  id: 'biz-1',
  track: 'businesses-competition',
  title: 'Value Creation & Vision',
  description: 'Problem-solution fit, value proposition, mission vs vision, and stakeholder trade-offs.',
  icon: '💡',
  order: 1,
  coreEconomicsConcepts: ['Value proposition', 'Problem-solution fit', 'Mission statement', 'Stakeholder', 'Trade-off'],
  personalFinanceConnection: {
    description: 'Every good financial decision starts with knowing what you\'re trying to build. Companies with clear missions make better long-term investments than those chasing short-term revenue.',
    relatedPFModules: ['financial-planning'],
  },
  investingConnection: [
    'Companies with clear, differentiated value propositions command premium valuations',
    'Mission drift is a leading predictor of brand erosion and management instability',
    'Stakeholder capitalism vs. shareholder primacy debate affects ESG investing',
  ],
  careerExposure: [
    {
      title: 'Strategy Analyst',
      description: 'Defines and refines the company\'s value proposition and competitive position.',
      salaryRange: '$60,000 - $110,000',
      skills: ['Market analysis', 'Strategic frameworks', 'Storytelling'],
    },
    {
      title: 'Product Manager',
      description: 'Owns the problem-solution fit and defines what gets built and why.',
      salaryRange: '$90,000 - $160,000',
      skills: ['Customer research', 'Roadmapping', 'Cross-functional leadership'],
    },
  ],
  lessons: [
    buildStubLesson('biz-1-1', 'Problem → Solution Fit', ['Problem-solution fit', 'Customer pain', 'Solution validation', 'Iteration']),
    buildStubLesson('biz-1-2', 'Value Proposition', ['Value proposition', 'Unique value', 'Customer benefit', 'Competitive differentiation']),
    buildStubLesson('biz-1-3', 'Mission, Vision & Mandate', ['Mission statement', 'Vision', 'Strategic mandate', 'North star']),
    buildStubLesson('biz-1-4', 'Stakeholders & Trade-offs', ['Stakeholder', 'Shareholder', 'Trade-off', 'Stakeholder capitalism']),
  ],
  gamifiedActivity: {
    id: 'biz-1-tinder',
    title: 'Value Proposition Tinder',
    description: 'Swipe on companies and identify which ones have clear vs. fuzzy value propositions.',
    instructions: ['Read the company description', 'Identify the value proposition', 'Assess whether it is differentiated'],
    economicsConcept: 'Value proposition clarity',
    bambooReward: 20,
    xpReward: 4,
  },
};
