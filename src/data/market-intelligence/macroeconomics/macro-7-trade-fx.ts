/**
 * Macro Unit 7 — International Trade & FX
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';
import { buildStubLesson } from '../lesson-stub-helpers';

export const macro7TradeFX: EconomicsUnit = {
  id: 'macro-7',
  track: 'macroeconomics',
  title: 'International Trade & FX',
  description: 'Comparative advantage, exchange rates, trade deficits, tariffs, and global supply chain dynamics.',
  icon: '🌐',
  order: 7,
  coreEconomicsConcepts: ['Comparative advantage', 'Exchange rate', 'Trade deficit', 'Tariff', 'Supply chain', 'Reshoring'],
  personalFinanceConnection: {
    description: 'Exchange rates affect the cost of imported goods, travel, and if you hold international investments, your returns. Tariffs affect prices you pay for electronics, cars, and clothing.',
    relatedPFModules: ['financial-planning', 'saving'],
  },
  investingConnection: [
    'A strong dollar hurts US multinationals\' overseas revenues when translated back',
    'Trade policy shifts (tariffs, sanctions) reprice entire supply chains virtually overnight',
    'Reshoring trends create domestic industrial investment opportunities',
  ],
  careerExposure: [
    {
      title: 'Trade Policy Advisor',
      description: 'Advises companies and governments on tariffs, trade agreements, and geopolitical risk.',
      salaryRange: '$70,000 - $130,000',
      skills: ['Trade law', 'Geopolitical analysis', 'Policy modeling'],
    },
    {
      title: 'FX Trader',
      description: 'Trades currency pairs at banks and hedge funds based on macro analysis.',
      salaryRange: '$80,000 - $200,000+',
      skills: ['Macro analysis', 'Risk management', 'Market execution'],
    },
  ],
  lessons: [
    buildStubLesson('macro-7-1', 'Why Countries Trade', ['Comparative advantage', 'Specialization', 'Imports', 'Exports']),
    buildStubLesson('macro-7-2', 'Exchange Rates 101', ['Exchange rate', 'Floating rate', 'Appreciation', 'Depreciation']),
    buildStubLesson('macro-7-3', 'Trade Deficits, Tariffs & Sanctions', ['Trade deficit', 'Tariff', 'Sanction', 'Protectionism']),
    buildStubLesson('macro-7-4', 'Global Supply Chains', ['Supply chain', 'Just-in-time', 'Reshoring', 'Bottleneck']),
  ],
  gamifiedActivity: {
    id: 'macro-7-sim',
    title: 'Trade War Simulator',
    description: 'Experience how tariffs and counter-tariffs play out in a two-country trade model.',
    instructions: ['Set tariff rates', 'Watch trade volumes and prices shift', 'See who wins and who loses'],
    economicsConcept: 'Trade policy analysis',
    bambooReward: 25,
    xpReward: 5,
  },
};
