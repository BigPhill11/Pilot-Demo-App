/**
 * Biz Unit 2 — Competitive Strategy & Moats
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const biz2CompetitiveStrategy: EconomicsUnit = {
  id: 'biz-2',
  track: 'businesses-competition',
  title: 'Competitive Strategy & Moats',
  description: 'Cost leadership, differentiation, network effects, and switching costs — the sources of durable competitive advantage.',
  icon: '🏰',
  order: 2,
  coreEconomicsConcepts: ['Cost leadership', 'Differentiation', 'Network effect', 'Switching cost', 'Economic moat'],
  personalFinanceConnection: {
    description: 'Companies with strong moats are better long-term investments. Recognizing moats helps you evaluate whether a premium stock price is justified by durable competitive advantage.',
    relatedPFModules: ['financial-planning'],
  },
  investingConnection: [
    'Warren Buffett\'s "economic moat" concept is the foundation of his investment framework',
    'Network effects explain the winner-take-all dynamics in social media and marketplaces',
    'Switching costs create predictable recurring revenue streams prized by investors',
  ],
  careerExposure: [
    {
      title: 'Competitive Intelligence Analyst',
      description: 'Monitors competitor moves and identifies threats to a company\'s moat.',
      salaryRange: '$55,000 - $90,000',
      skills: ['Competitive research', 'SWOT analysis', 'Market monitoring'],
    },
    {
      title: 'Corporate Strategy Director',
      description: 'Develops long-term plans to build and defend competitive advantages.',
      salaryRange: '$120,000 - $200,000',
      skills: ['Strategic planning', 'M&A analysis', 'Executive communication'],
    },
  ],
  lessons: [
    buildStubLesson('biz-2-1', 'Cost Leadership Strategy', ['Cost leadership', 'Scale advantage', 'Process efficiency', 'Price competition']),
    buildStubLesson('biz-2-2', 'Differentiation Strategy', ['Differentiation', 'Premium pricing', 'Brand equity', 'Product uniqueness']),
    buildStubLesson('biz-2-3', 'Network Effects', ['Network effect', 'Metcalfe\'s law', 'Platform', 'Winner-take-all']),
    buildStubLesson('biz-2-4', 'Switching Costs & Lock-In', ['Switching cost', 'Lock-in', 'Customer retention', 'Moat']),
  ],
  gamifiedActivity: {
    id: 'biz-2-tinder',
    title: 'Moat Identifier',
    description: 'For each company card, identify the primary source of competitive moat.',
    instructions: ['Read the company description', 'Choose: cost, differentiation, network, or switching-cost moat', 'Explain why'],
    economicsConcept: 'Competitive moat analysis',
    bambooReward: 20,
    xpReward: 4,
  },
};
