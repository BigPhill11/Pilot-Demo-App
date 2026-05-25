/**
 * Micro Unit 8 — Game Theory & Strategy
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const micro8GameTheory: EconomicsUnit = {
  id: 'micro-8',
  track: 'microeconomics',
  title: 'Game Theory & Strategy',
  description: 'Prisoner\'s dilemma, Nash equilibrium, price wars, and signaling — the strategic logic behind business competition.',
  icon: '♟️',
  order: 8,
  coreEconomicsConcepts: ['Game theory', 'Nash equilibrium', 'Dominant strategy', 'Tit-for-tat', 'Signal', 'Reputation'],
  personalFinanceConnection: {
    description: 'Game theory shows up everywhere: negotiating a salary, choosing whether to split costs with roommates, or deciding if you should cooperate in a group project when others might free-ride.',
    relatedPFModules: ['career-income', 'financial-planning'],
  },
  investingConnection: [
    'Oligopoly pricing games explain airline, telecom, and streaming wars',
    'Signaling theory explains why companies pay dividends and why CEOs buy their own stock',
    'Nash equilibrium explains why cartels are unstable even when profitable',
  ],
  careerExposure: [
    {
      title: 'Strategy Consultant',
      description: 'Uses game-theoretic frameworks to advise companies on competitive strategy.',
      salaryRange: '$90,000 - $180,000',
      skills: ['Competitive analysis', 'Frameworks', 'Modeling'],
    },
    {
      title: 'Behavioral Economist',
      description: 'Studies how real people deviate from rational game-theoretic predictions.',
      salaryRange: '$70,000 - $130,000',
      skills: ['Experiment design', 'Behavioral data analysis', 'Policy application'],
    },
  ],
  lessons: [
    buildStubLesson('micro-8-1', 'The Prisoner\'s Dilemma', ['Game theory', 'Dominant strategy', 'Nash equilibrium', 'Defection']),
    buildStubLesson('micro-8-2', 'Nash Equilibrium in Real Life', ['Nash equilibrium', 'Best response', 'Coordination', 'Mixed strategy']),
    buildStubLesson('micro-8-3', 'Price Wars & Oligopoly Games', ['Price war', 'Tit-for-tat', 'Tacit collusion', 'Cartel']),
    buildStubLesson('micro-8-4', 'Signaling & Reputation', ['Signal', 'Reputation', 'Credible commitment', 'Sunk cost']),
  ],
  gamifiedActivity: {
    id: 'micro-8-sim',
    title: 'Strategic Pricing Game',
    description: 'Compete against an AI firm in a repeated pricing game. Cooperate or undercut?',
    instructions: ['Set your price each round', 'Watch how your competitor responds', 'Learn why tit-for-tat often wins repeated games'],
    economicsConcept: 'Repeated game strategy',
    bambooReward: 25,
    xpReward: 5,
  },
};
