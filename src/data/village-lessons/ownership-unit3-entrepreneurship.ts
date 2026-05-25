import type { VillageLesson } from '@/types/village-lesson';
import { ownershipSimulator } from './ownership-lesson-helpers';

export const ownershipUnit3Lessons: VillageLesson[] = [
  {
    id: 'own-u3-mvp-risk',
    moduleId: 'ownership',
    section: 'Entrepreneurship',
    unitLabel: 'Unit 3.1',
    title: 'MVP Protocol and Enterprise Risk',
    estimatedMinutes: 10,
    simulatorType: 'mvp-risk',
    hook: {
      question:
        'Is it smarter to rent a storefront first, or sell 50 test products from your garage?',
      philMessage:
        'Entrepreneurship is ownership at maximum intensity: you keep the upside and swallow the risk. Validation before scale is how survivors play.',
    },
    concepts: [
      {
        id: 'mvp',
        emoji: '🧪',
        title: 'Minimum Viable Product',
        body: 'An MVP is the simplest version that lets you test real customer demand with minimal cash. Learn fast, iterate, then scale. Perfection before feedback is expensive guessing.',
        realWorldExample:
          'Dropbox started with a demo video before the full product existed. They validated interest cheaply.',
      },
      {
        id: 'upsides',
        emoji: '🚀',
        title: 'Upsides of Entrepreneurship',
        body: 'Unlimited upside, full strategic control, and direct wealth creation if the business wins. You build equity in your own asset, not just a paycheck.',
        realWorldExample:
          'Founders of successful brands can sell companies for millions or go public, something rare in hourly wage paths alone.',
      },
      {
        id: 'downsides',
        emoji: '⚠️',
        title: 'Downsides and Failure Rates',
        body: 'Most startups fail. Risks include running out of cash, personal liability (in some structures), irregular income, and emotional stress. Enterprise risk is real.',
        realWorldExample:
          'Restaurants have high failure rates in year one. Many close before breaking even on fixed costs.',
      },
      {
        id: 'validation',
        emoji: '📊',
        title: 'Market Validation',
        body: 'Talk to customers, test price points, and measure repeat purchases before big capex. Data beats ego.',
        realWorldExample:
          'Food trucks test menus before signing long leases on brick-and-mortar locations.',
      },
    ],
    simulator: ownershipSimulator(
      'Startup Runway',
      'Make three strategic calls on capital, validation, and risk.',
      'Choose MVP discipline vs. overspending before demand is proven.',
      'Build like an owner: prove it small, then scale what works.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'An MVP is designed to:',
        options: [
          { id: 'a', text: 'Test demand with minimal resources' },
          { id: 'b', text: 'Build the final factory first' },
          { id: 'c', text: 'Avoid all customers' },
          { id: 'd', text: 'Maximize debt on day one' },
        ],
        correctId: 'a',
        explanation: 'MVPs validate learning quickly and cheaply.',
      },
      {
        id: 'q2',
        question: 'A major downside of entrepreneurship is:',
        options: [
          { id: 'a', text: 'Guaranteed government salary' },
          { id: 'b', text: 'High failure rates and cash flow risk' },
          { id: 'c', text: 'No decision-making power' },
          { id: 'd', text: 'Automatic diversification' },
        ],
        correctId: 'b',
        explanation: 'Failure risk and unstable cash are core enterprise hazards.',
      },
      {
        id: 'q3',
        question: 'Scaling before validation often leads to:',
        options: [
          { id: 'a', text: 'Burning cash on unproven demand' },
          { id: 'b', text: 'Free unlimited profit' },
          { id: 'c', text: 'Lower risk' },
          { id: 'd', text: 'No competition' },
        ],
        correctId: 'a',
        explanation: 'Fixed costs without sales is a classic startup killer.',
      },
      {
        id: 'q4',
        question: 'Entrepreneurship ownership means:',
        options: [
          { id: 'a', text: 'You may own equity in the business you build' },
          { id: 'b', text: 'You never face losses' },
          { id: 'c', text: 'You cannot raise capital' },
          { id: 'd', text: 'You only earn wages' },
        ],
        correctId: 'a',
        explanation: 'Founders hold business equity, not just a salary slot.',
      },
      {
        id: 'q5',
        question: 'Customer feedback loops help entrepreneurs:',
        options: [
          { id: 'a', text: 'Measure willingness to pay before scaling' },
          { id: 'b', text: 'Eliminate all taxes' },
          { id: 'c', text: 'Ignore product quality' },
          { id: 'd', text: 'Avoid innovation' },
        ],
        correctId: 'a',
        explanation: 'Validation reduces guesswork on price and demand.',
      },
    ],
    rewards: { xp: 135, bamboo: 18 },
  },
];
