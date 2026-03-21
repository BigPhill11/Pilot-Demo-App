import { Lesson } from '@/types/personal-finance';

export const lesson4PayingDownDebt: Lesson = {
  id: 'credit-debt-4',
  title: 'Paying Down Debt and Avoiding Traps',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains practical strategies for paying down debt and avoiding common traps. You learn how interest works against you, how payoff order matters, and how structure creates momentum.',
  realityHook: 'You check your balance and feel stuck. Payments go out every month, but the total barely moves. Interest keeps adding pressure, and motivation drops. A clear payoff plan turns confusion into progress.',
  outcomePreview: 'Interest accelerates debt growth • Payoff order changes outcomes • Structure builds momentum • Traps slow progress',
  microLesson: `Debt shrinks only when payments exceed interest. When interest is high, balances grow faster than expected. Understanding this math helps you choose smarter strategies.

Payoff order matters. Targeting high interest balances first reduces total cost. Targeting small balances first can increase motivation. Both approaches work when used consistently.

Traps appear when minimum payments feel safe. Minimums keep accounts current but extend debt for years. Fees, missed payments, and new borrowing slow progress further.

Structure turns effort into results. A written plan, automatic payments, and clear goals reduce stress and speed payoff.`,
  flashcards: [
    {
      term: 'Interest Accrual',
      definition: 'Interest accrual is the process of interest adding to a balance over time. Higher rates increase total cost.',
      philsAnalogy: 'A balance growing even while minimum payments are made.',
    },
    {
      term: 'Minimum Payment',
      definition: 'A minimum payment is the smallest amount required to keep an account current. Paying only minimums extends payoff time.',
      philsAnalogy: 'Paying the required amount but seeing little balance change.',
    },
    {
      term: 'Avalanche Method',
      definition: 'The avalanche method prioritizes paying highest interest debt first. This reduces total interest paid.',
      philsAnalogy: 'Focusing extra payments on the highest rate card.',
    },
    {
      term: 'Snowball Method',
      definition: 'The snowball method prioritizes paying the smallest balance first. This builds motivation through quick wins.',
      philsAnalogy: 'Eliminating a small balance to gain momentum.',
    },
    {
      term: 'Debt Trap',
      definition: 'A debt trap occurs when fees, interest, and new borrowing prevent progress. Traps keep balances from shrinking.',
      philsAnalogy: 'Using one card to pay another card.',
    },
  ],
  simulatorGame: {
    title: 'Escape the Balance',
    description: 'You manage multiple debts with different balances and interest rates.',
    initialState: {
      weeklyIncome: 650,
      hourlyWage: 19,
      workHours: 34,
      fatigue: 35,
      freeTime: 30,
      skillLevel: 55,
    },
    scenarios: [
      {
        id: 'debt-strategy',
        title: 'Choose Your Payoff Strategy',
        description: 'You have a $500 card at 22% and a $2,000 card at 15%. You have $200 extra this month.',
        choices: [
          {
            id: 'avalanche-approach',
            label: 'Put $200 extra toward the 22% card (Avalanche)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 20,
              feedback: 'Targeting highest interest first saves the most money over time. Smart financial decision.',
            },
          },
          {
            id: 'snowball-approach',
            label: 'Put $200 extra toward the $500 card (Snowball)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 5,
              skillChange: 15,
              feedback: 'Quick win incoming! Paying off a card completely feels great and builds momentum.',
            },
          },
          {
            id: 'split-payment',
            label: 'Split the extra $200 between both cards',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Spreading payments works but takes longer and costs more in interest overall.',
            },
          },
        ],
      },
      {
        id: 'minimum-trap',
        title: 'The Minimum Payment Temptation',
        description: 'Money is tight this month. You can pay minimums and spend the rest, or tighten up and pay more.',
        choices: [
          {
            id: 'pay-more-than-min',
            label: 'Cut discretionary spending and pay extra',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'Short-term sacrifice for long-term gain. Balance drops faster and interest shrinks.',
            },
          },
          {
            id: 'pay-minimum-only',
            label: 'Pay minimums and relax this month',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 10,
              skillChange: -5,
              feedback: 'Account stays current but interest eats most of your payment. Progress stalls.',
            },
          },
          {
            id: 'skip-one-payment',
            label: 'Skip one payment to catch a break',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: -15,
              skillChange: -25,
              feedback: 'Late fee added. Interest compounds. Credit score damaged. Break becomes expensive.',
            },
          },
        ],
      },
      {
        id: 'new-debt-temptation',
        title: 'The New Purchase Trap',
        description: 'A sale offers 0% financing on new furniture while you still have credit card debt.',
        choices: [
          {
            id: 'decline-new-debt',
            label: 'Pass on the sale and focus on current debt',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 25,
              feedback: 'Discipline wins. Adding new debt while paying old debt slows everything down.',
            },
          },
          {
            id: 'small-purchase',
            label: 'Buy just one small item on 0% financing',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Small addition but new payment added. If 0% period ends, rate jumps high.',
            },
          },
          {
            id: 'full-purchase',
            label: 'Furnish the whole room on 0% financing',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: -15,
              feedback: 'Debt trap activated. Multiple payments compete for limited money. Progress stops.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 650,
      maxFatigue: 55,
    },
  },
  miniReflection: {
    question: 'Which payoff method would keep you consistent during hard months?',
    followUp: 'What trap would be hardest for you to avoid?',
  },
  quiz: [
    {
      question: 'The avalanche method helps by:',
      options: ['Increasing motivation only', 'Reducing total interest', 'Paying smallest balances', 'Avoiding planning'],
      correctIndex: 1,
      explanation: 'The avalanche method helps by reducing total interest paid by targeting highest-rate debt first.',
    },
    {
      question: 'The snowball method helps by:',
      options: ['Lowering rates', 'Removing fees', 'Ending interest', 'Building momentum'],
      correctIndex: 3,
      explanation: 'The snowball method helps by building momentum through quick wins on smaller balances.',
    },
    {
      question: 'Debt traps often include:',
      options: ['New borrowing', 'Automatic payments', 'Clear plans', 'Low balances'],
      correctIndex: 0,
      explanation: 'Debt traps often include new borrowing that prevents progress on existing debt.',
    },
    {
      question: 'Paying more than the minimum:',
      options: ['Slows payoff', 'Extends timelines', 'Reduces total cost', 'Increases fees'],
      correctIndex: 2,
      explanation: 'Paying more than the minimum reduces total cost by lowering the balance that accrues interest.',
    },
    {
      question: 'Structure helps most because:',
      options: ['Motivation increases forever', 'Decisions reduce daily stress', 'Income rises instantly', 'Interest disappears'],
      correctIndex: 1,
      explanation: 'Structure helps most because having a plan reduces daily decision stress and builds consistency.',
    },
  ],
  powerMove: 'Choose one payoff method and write a simple monthly plan.',
  realLifeAction: 'List your debts and note interest rates and balances clearly.',
};
