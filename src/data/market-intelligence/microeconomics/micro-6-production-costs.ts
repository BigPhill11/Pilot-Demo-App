/**
 * Micro Unit 6 — Production & Costs
 * New unit adding fixed vs variable costs, marginal analysis, economies of scale, and productivity.
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const micro6ProductionCosts: EconomicsUnit = {
  id: 'micro-6',
  track: 'microeconomics',
  title: 'Production & Costs',
  description: 'Fixed vs. variable costs, marginal analysis, economies of scale, and how productivity drives profitability.',
  icon: '🏭',
  order: 6,
  coreEconomicsConcepts: ['Fixed cost', 'Variable cost', 'Marginal cost', 'Marginal revenue', 'Economies of scale', 'Productivity'],
  personalFinanceConnection: {
    description: 'Every side hustle and job has fixed costs (phone plan, workspace) and variable costs (supplies, commute). Knowing the difference helps you price your time and products correctly.',
    relatedPFModules: ['income', 'career-income'],
  },
  investingConnection: [
    'High fixed costs amplify both gains and losses with revenue changes (operating leverage)',
    'Economies of scale are a source of competitive moat for large manufacturers',
    'Productivity growth is the long-run driver of real GDP and corporate earnings',
  ],
  careerExposure: [
    {
      title: 'Operations Analyst',
      description: 'Tracks production costs and identifies efficiency improvements.',
      salaryRange: '$55,000 - $85,000',
      skills: ['Cost analysis', 'Process mapping', 'Data analytics'],
    },
    {
      title: 'Industrial Engineer',
      description: 'Designs systems to maximize productivity and minimize cost.',
      salaryRange: '$65,000 - $105,000',
      skills: ['Lean manufacturing', 'Systems design', 'Quantitative modeling'],
    },
  ],
  lessons: [
    buildStubLesson('micro-6-1', 'Fixed vs. Variable Costs', ['Fixed cost', 'Variable cost', 'Total cost', 'Average cost']),
    buildStubLesson('micro-6-2', 'Marginal Cost & Marginal Revenue', ['Marginal cost', 'Marginal revenue', 'Profit-max rule', 'Break-even']),
    buildStubLesson('micro-6-3', 'Economies of Scale', ['Economies of scale', 'Diseconomies of scale', 'Scale curve', 'Unit cost']),
    buildStubLesson('micro-6-4', 'Productivity & Output', ['Productivity', 'Diminishing returns', 'Capital', 'Output']),
  ],
  gamifiedActivity: {
    id: 'micro-6-sim',
    title: 'Production Cost Simulator',
    description: 'Run a virtual factory and find the output level that maximizes profit.',
    instructions: ['Adjust production volume', 'Watch fixed and variable costs change', 'Find the marginal cost = marginal revenue crossover'],
    economicsConcept: 'Marginal analysis',
    bambooReward: 25,
    xpReward: 5,
  },
};
