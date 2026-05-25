/**
 * Biz Unit 4 — Innovation, Ethics & Stakeholders
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const biz4InnovationEthics: EconomicsUnit = {
  id: 'biz-4',
  track: 'businesses-competition',
  title: 'Innovation, Ethics & Stakeholders',
  description: 'From idea to MVP, business ethics in action, org forms (LLC, C-Corp, B-Corp), and supply chain risk & ESG.',
  icon: '🌱',
  order: 4,
  coreEconomicsConcepts: ['MVP', 'Business ethics', 'Organizational form', 'ESG', 'Supply chain risk'],
  personalFinanceConnection: {
    description: 'Understanding different business structures matters when you launch a side hustle (LLC vs sole prop) and when choosing ETFs — ESG funds screen for ethics and sustainability.',
    relatedPFModules: ['financial-planning', 'income'],
  },
  investingConnection: [
    'ESG factors increasingly affect institutional capital allocation and index inclusion',
    'Supply chain concentration risk can cause catastrophic earnings misses',
    'B-Corp certification signals stakeholder focus that some investors see as long-term value driver',
  ],
  careerExposure: [
    {
      title: 'ESG Analyst',
      description: 'Evaluates environmental, social, and governance factors for investment portfolios.',
      salaryRange: '$65,000 - $110,000',
      skills: ['ESG frameworks', 'Company analysis', 'Sustainability reporting'],
    },
    {
      title: 'Entrepreneur / Founder',
      description: 'Builds new ventures by solving problems, validating ideas, and building teams.',
      salaryRange: 'Variable',
      skills: ['Customer discovery', 'Product development', 'Fundraising'],
    },
  ],
  lessons: [
    buildStubLesson('biz-4-1', 'From Idea to MVP', ['Minimum viable product', 'Prototype', 'User testing', 'Iteration']),
    buildStubLesson('biz-4-2', 'Business Ethics in Action', ['Fiduciary duty', 'Conflict of interest', 'Ethical framework', 'Whistleblowing']),
    buildStubLesson('biz-4-3', 'Org Forms: LLC, C-Corp, B-Corp', ['LLC', 'C-Corporation', 'B-Corporation', 'Liability protection']),
    buildStubLesson('biz-4-4', 'Supply-Chain Risk & ESG', ['ESG', 'Supply chain risk', 'Vendor concentration', 'Resilience']),
  ],
  gamifiedActivity: {
    id: 'biz-4-tinder',
    title: 'Business Ethics Swipe',
    description: 'Swipe on business scenarios and decide: ethical, unethical, or legally grey?',
    instructions: ['Read the business scenario', 'Decide ethical, unethical, or grey area', 'Explain your reasoning'],
    economicsConcept: 'Business ethics frameworks',
    bambooReward: 20,
    xpReward: 4,
  },
};
