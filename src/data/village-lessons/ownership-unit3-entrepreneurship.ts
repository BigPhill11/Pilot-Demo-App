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
        body: 'A Minimum Viable Product (MVP) is the smallest, cheapest version of your idea that real customers can actually try — a landing page, a hand-made batch, a weekend prototype. The point isn\'t to impress anyone; it\'s to answer the only question that matters: will strangers pay for this? Launching rough and learning from real feedback beats spending a year and your savings polishing something nobody wants. Build small, measure what customers do (not what they say), improve, and repeat. Perfection before feedback is just expensive guessing.',
        realWorldExample:
          'Dropbox started with a demo video before the full product existed. They validated interest cheaply.',
      },
      {
        id: 'upsides',
        emoji: '🚀',
        title: 'Upsides of Entrepreneurship',
        body: 'Entrepreneurship offers something no salary can: uncapped upside. An employee\'s income is limited by their wage; a founder\'s wealth is limited only by how valuable the business becomes. You also get full strategic control — what to build, who to hire, when to pivot — and every hour of work builds equity in an asset YOU own rather than someone else\'s. If the business wins, you don\'t just earn income, you own something sellable, inheritable, and capable of producing income without you. That ownership difference is why most large fortunes trace back to founding or owning businesses.',
        realWorldExample:
          'Founders of successful brands can sell companies for millions or go public, something rare in hourly wage paths alone.',
      },
      {
        id: 'downsides',
        emoji: '⚠️',
        title: 'Downsides and Failure Rates',
        body: 'The honest statistics: most startups fail, and the graveyard is full of smart founders with good ideas. The risks stack up fast — running out of cash before finding paying customers, personal liability if the business isn\'t structured properly, months of irregular or zero income while friends collect steady paychecks, and the emotional weight of every problem landing on your desk. None of this means don\'t start; it means start with eyes open. Smart founders size their bets so a failure bruises them without breaking them: savings runway, legal structure, and a plan B.',
        realWorldExample:
          'Restaurants have high failure rates in year one. Many close before breaking even on fixed costs.',
      },
      {
        id: 'validation',
        emoji: '📊',
        title: 'Market Validation',
        body: 'Validation is the discipline of proving demand before spending big. Talk to real potential customers — not friends who\'ll be polite — and watch what they do, not what they say. Test actual price points: "would you buy this?" means little, but "here\'s the checkout link" tells the truth. Measure repeat purchases, because one sale is curiosity while a second sale is a business. Only after those signals are strong should you commit serious money to inventory, equipment, or ads. The founder\'s hardest skill is letting data overrule ego when the market says "not this."',
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
