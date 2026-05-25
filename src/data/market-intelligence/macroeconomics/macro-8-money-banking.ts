/**
 * Macro Unit 8 — Money & Banking
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const macro8MoneyBanking: EconomicsUnit = {
  id: 'macro-8',
  track: 'macroeconomics',
  title: 'Money & Banking',
  description: 'What money really is, how banks create money through lending, the Fed in plain English, and digital money realities.',
  icon: '🏦',
  order: 8,
  coreEconomicsConcepts: ['Money functions', 'Fractional reserves', 'Money multiplier', 'Federal Reserve', 'Dual mandate', 'Cryptocurrency'],
  personalFinanceConnection: {
    description: 'Understanding how banks create money explains why your savings account earns interest, how your mortgage funds show up in your account, and why inflation and Fed policy affect your purchasing power.',
    relatedPFModules: ['saving', 'credit-debt'],
  },
  investingConnection: [
    'Bank stocks are highly sensitive to interest rate spreads (net interest margin)',
    'The Fed\'s money supply decisions flow directly into equity and bond valuations',
    'CBDCs (Central Bank Digital Currencies) may reshape the financial system over the next decade',
  ],
  careerExposure: [
    {
      title: 'Bank Examiner',
      description: 'Ensures banks maintain adequate reserves and follow lending regulations.',
      salaryRange: '$55,000 - $90,000',
      skills: ['Regulatory compliance', 'Financial analysis', 'Risk assessment'],
    },
    {
      title: 'Monetary Economist',
      description: 'Researches money supply, inflation, and central bank policy at research institutions.',
      salaryRange: '$70,000 - $150,000',
      skills: ['Econometrics', 'Monetary theory', 'Policy analysis'],
    },
  ],
  lessons: [
    buildStubLesson('macro-8-1', 'What Money Actually Is', ['Medium of exchange', 'Store of value', 'Unit of account', 'Fiat money']),
    buildStubLesson('macro-8-2', 'How Banks Create Money', ['Fractional reserves', 'Money multiplier', 'Reserve ratio', 'Deposit']),
    buildStubLesson('macro-8-3', 'The Fed in Plain English', ['Federal Reserve', 'Dual mandate', 'FOMC', 'Open-market operations']),
    buildStubLesson('macro-8-4', 'Crypto vs. Cash vs. Credit', ['Cryptocurrency', 'Stablecoin', 'CBDC', 'Settlement']),
  ],
  gamifiedActivity: {
    id: 'macro-8-sim',
    title: 'Money Multiplier Model',
    description: 'See how a single deposit gets multiplied through the banking system.',
    instructions: ['Set the reserve ratio', 'Deposit $1,000', 'Watch the banking system multiply it into credit'],
    economicsConcept: 'Fractional reserve banking',
    bambooReward: 25,
    xpReward: 5,
  },
};
