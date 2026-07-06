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
        body: 'Net worth is the single most honest measure of wealth: everything you own (assets) minus everything you owe (liabilities). Assets include cash, investments, and property that holds or grows value; liabilities are credit card balances, loans, and every other IOU with your name on it. Notice what\'s NOT in the formula: your salary. A doctor earning $300k who spends $310k has a shrinking net worth, while a teacher who invests steadily can quietly become a millionaire. Income is how fast money flows in; net worth is how much actually stays.',
        realWorldExample:
          'Someone earning $120k with $80k in student loans, a leased luxury SUV, and no investments might have lower net worth than a teacher who invests steadily and owns their home.',
      },
      {
        id: 'consumption_trap',
        emoji: '🪤',
        title: 'Consumption Traps',
        body: 'The high-earner-broke trap catches more people than you\'d think. Buy-now-pay-later plans, maxed credit cards, financed cars, and status spending create a lifestyle that consumes every dollar the moment it arrives — sometimes dollars that haven\'t arrived yet. From the outside it looks like success; on a balance sheet it\'s negative net worth wearing designer clothes. The root confusion is mistaking cash flow for wealth: a big paycheck only builds wealth if some of it is converted into assets before the lifestyle eats it.',
        realWorldExample:
          'Influencers promoting "looks rich" lifestyles often rent the image. Their balance sheet may tell a very different story than their feed.',
      },
      {
        id: 'depreciating',
        emoji: '📉',
        title: 'Depreciating vs. Appreciating',
        body: 'Every purchase lands in one of two buckets. Depreciating assets — cars, gadgets, sneakers — start losing value the moment you buy them; a new car can shed 20% of its value in the first year alone. Appreciating assets — index funds, businesses, education that raises your earning power — tend to grow and even compound over time. Both bucket types have a place in life, but wealth builders are ruthless about the ratio: they minimize money parked in melting assets and maximize money planted in growing ones. Before big purchases, ask: which bucket is this?',
        realWorldExample:
          'A $40k car might be worth $28k two years later. The same $40k in a diversified fund could grow if left invested for a decade (with normal market risk).',
      },
      {
        id: 'pf_link',
        emoji: '🎋',
        title: 'Personal Balance Sheet Habits',
        body: 'Building net worth isn\'t a mystery — it\'s a repeatable system with four moves. First, track your assets and liabilities every quarter so you actually know your number and whether it\'s rising. Second, attack high-interest debt, because a 24% credit card outgrows almost any investment you could make. Third, automate investing so wealth-building happens before you can spend the money. Fourth, when your income rises, cap lifestyle inflation — bank the raise instead of upgrading everything. Run that loop for a decade and paychecks steadily transform into ownership.',
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
