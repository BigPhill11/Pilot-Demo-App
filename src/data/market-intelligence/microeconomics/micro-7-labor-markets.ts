/**
 * Micro Unit 7 — Labor Markets & Wages
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const micro7LaborMarkets: EconomicsUnit = {
  id: 'micro-7',
  track: 'microeconomics',
  title: 'Labor Markets & Wages',
  description: 'How wages get set, the economics of minimum wage, the skills premium, and labor power in the gig economy.',
  icon: '👷',
  order: 7,
  coreEconomicsConcepts: ['Labor supply', 'Labor demand', 'Equilibrium wage', 'Minimum wage', 'Marginal product of labor', 'Skills premium'],
  personalFinanceConnection: {
    description: 'Your wage is determined by your marginal product of labor — what value you add to an employer. Understanding this helps you negotiate, upskill strategically, and choose careers with strong wage growth.',
    relatedPFModules: ['career-income', 'income'],
  },
  investingConnection: [
    'Wage growth drives inflation expectations and Fed policy',
    'Labor market tightness affects corporate profit margins',
    'Automation and AI are compressing the labor demand curve for routine tasks',
  ],
  careerExposure: [
    {
      title: 'HR Compensation Analyst',
      description: 'Sets compensation structures based on market data and marginal productivity.',
      salaryRange: '$50,000 - $80,000',
      skills: ['Compensation benchmarking', 'Data analysis', 'HR systems'],
    },
    {
      title: 'Labor Economist',
      description: 'Studies wage trends, labor market policy, and employment dynamics.',
      salaryRange: '$65,000 - $120,000',
      skills: ['Econometrics', 'Policy analysis', 'Data modeling'],
    },
  ],
  lessons: [
    buildStubLesson('micro-7-1', 'How Wages Get Set', ['Wage', 'Labor supply', 'Labor demand', 'Equilibrium wage']),
    buildStubLesson('micro-7-2', 'Minimum Wage Economics', ['Minimum wage', 'Price floor', 'Unemployment effect', 'Living wage']),
    buildStubLesson('micro-7-3', 'Productivity → Pay', ['Marginal product of labor', 'Skills premium', 'Human capital', 'Real wage']),
    buildStubLesson('micro-7-4', 'Unions, Gigs & Power', ['Union', 'Collective bargaining', 'Gig worker', 'Non-compete']),
  ],
  gamifiedActivity: {
    id: 'micro-7-sim',
    title: 'Wage Negotiation Simulator',
    description: 'Practice understanding your market wage and negotiating based on productivity.',
    instructions: ['Review your marginal product', 'See the market wage', 'Negotiate based on skills premium'],
    economicsConcept: 'Labor market equilibrium',
    bambooReward: 25,
    xpReward: 5,
  },
};
