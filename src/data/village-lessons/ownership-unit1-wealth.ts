import type { VillageLesson } from '@/types/village-lesson';
import { ownershipSimulator } from './ownership-lesson-helpers';

export const ownershipUnit1Lessons: VillageLesson[] = [
  {
    id: 'own-u1-net-worth',
    moduleId: 'ownership',
    section: 'Philosophy of Wealth',
    unitLabel: 'Unit 1.1',
    title: 'Net Worth vs. Illusions of Riches',
    estimatedMinutes: 9,
    simulatorType: 'net-worth-elasticity',
    hook: {
      question:
        'Your friend drives a new car and posts luxury vacations. Does that prove they are wealthy?',
      philMessage:
        'Wealth is not what you flash. It is what you own minus what you owe. Let us separate real equity from lifestyle theater.',
    },
    concepts: [
      {
        id: 'wealth_equation',
        emoji: '🧮',
        title: 'The Wealth Equation',
        body: 'Net worth equals total assets minus total liabilities. Assets include cash, investments, and things that hold or grow value. Liabilities are debts and obligations. A high salary does not automatically mean high net worth.',
        realWorldExample:
          'Someone earning $120k with $80k in student loans, a leased luxury SUV, and no investments might have lower net worth than a teacher who invests steadily and owns their home.',
      },
      {
        id: 'consumption_trap',
        emoji: '🪤',
        title: 'Consumption Traps',
        body: 'Buy-now-pay-later plans, maxed cards, and status spending can keep net worth negative even with strong income. The trap is confusing cash flow with wealth building.',
        realWorldExample:
          'Influencers promoting "looks rich" lifestyles often rent the image. Their balance sheet may tell a very different story than their feed.',
      },
      {
        id: 'depreciating',
        emoji: '📉',
        title: 'Depreciating vs. Appreciating',
        body: 'Cars and gadgets often lose value the moment you buy them. Investments and income-producing assets can compound over time. Wealth builders prioritize appreciating buckets.',
        realWorldExample:
          'A $40k car might be worth $28k two years later. The same $40k in a diversified fund could grow if left invested for a decade (with normal market risk).',
      },
      {
        id: 'pf_link',
        emoji: '🎋',
        title: 'Personal Balance Sheet Habits',
        body: 'Track assets and liabilities quarterly. Pay down high-interest debt, automate investing, and cap lifestyle inflation when income rises. That is how paychecks turn into ownership.',
        realWorldExample:
          'Apps that show net worth over time help teens see progress. A small investment habit at 16 can matter more than a flashy purchase at 22.',
      },
    ],
    simulator: ownershipSimulator(
      'Net Worth Lab',
      'Adjust spending vs. investing and test one big purchase decision.',
      'See how liabilities and depreciating assets change real equity.',
      'Wealth is the balance sheet, not the highlight reel.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Net worth is calculated as:',
        options: [
          { id: 'a', text: 'Monthly income minus rent' },
          { id: 'b', text: 'Total assets minus total liabilities' },
          { id: 'c', text: 'Credit score times income' },
          { id: 'd', text: 'Cash in wallet only' },
        ],
        correctId: 'b',
        explanation: 'Net worth is assets minus liabilities, the core measure of financial position.',
      },
      {
        id: 'q2',
        question: 'A high income can still mean low net worth if:',
        options: [
          { id: 'a', text: 'The person invests in index funds' },
          { id: 'b', text: 'Spending and debt grow faster than assets' },
          { id: 'c', text: 'They use a budget app' },
          { id: 'd', text: 'They own appreciating land' },
        ],
        correctId: 'b',
        explanation: 'Lifestyle inflation and debt can absorb income without building assets.',
      },
      {
        id: 'q3',
        question: 'Which is usually a depreciating asset for consumers?',
        options: [
          { id: 'a', text: 'New car' },
          { id: 'b', text: 'Broad stock index fund' },
          { id: 'c', text: 'Rental property (can vary)' },
          { id: 'd', text: 'High-yield savings' },
        ],
        correctId: 'a',
        explanation: 'Most vehicles lose value quickly; investments depend on risk and time horizon.',
      },
      {
        id: 'q4',
        question: 'Wealth is best described as:',
        options: [
          { id: 'a', text: 'What you spend on brands' },
          { id: 'b', text: 'What you own minus what you owe' },
          { id: 'c', text: 'Your follower count' },
          { id: 'd', text: 'Weekly allowance' },
        ],
        correctId: 'b',
        explanation: 'Ownership minus obligations defines wealth, not consumption.',
      },
      {
        id: 'q5',
        question: 'Building wealth early often starts with:',
        options: [
          { id: 'a', text: 'Ignoring liabilities' },
          { id: 'b', text: 'Tracking net worth and investing consistently' },
          { id: 'c', text: 'Maxing lifestyle spending' },
          { id: 'd', text: 'Avoiding all risk forever' },
        ],
        correctId: 'b',
        explanation: 'Measurement plus habits (save, invest, limit debt) convert income into equity.',
      },
    ],
    rewards: { xp: 120, bamboo: 15 },
  },
];
