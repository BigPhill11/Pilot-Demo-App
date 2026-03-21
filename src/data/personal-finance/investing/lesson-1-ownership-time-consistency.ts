import { Lesson } from '@/types/personal-finance';

export const lesson1OwnershipTimeConsistency: Lesson = {
  id: 'ownership-time-consistency',
  title: 'Ownership, Time, and Consistency',
  estimatedMinutes: 12,

  moduleOverview: `This module teaches how investing actually works beyond the noise of daily price movements. You learn that investing means ownership, time drives growth, and consistency beats timing. The goal is not to pick winners. The goal is to understand how ownership, time, and discipline create long-term wealth.

Completion unlocks advanced portfolio concepts and compound growth tracking.`,

  realityHook: `Imagine two students who both save money from part-time jobs. One student saves everything in cash because it feels safe and predictable. The other student slowly invests some money into companies they recognize and use every day. Ten years later, both students worked hard, but their outcomes look very different. The difference comes from ownership, time, and consistency, not effort or intelligence.`,

  outcomePreview: 'Mastering this lesson unlocks understanding of ownership principles and the power of time in building wealth.',

  microLesson: `Investing means ownership. When you invest, you purchase a claim on the future earnings of a system that produces value. That system might be a company, a group of companies, or the broader economy. Instead of trading hours for income, you allow capital to participate in long-term value creation.

Time does most of the work. Short periods feel loud because prices change quickly and emotions dominate. Long periods feel quiet because business growth compounds slowly. Over extended horizons, earnings, reinvestment, and scale matter more than daily movement. This is why investing money needed soon creates stress and poor decisions.

Consistency matters more than timing. Waiting for perfect conditions feels logical, but missed time reduces compounding. Consistent investing removes emotion from the process. You invest during optimism and fear alike. This discipline matters more than predicting news or trends.

Risk does not disappear. Risk changes shape. Short-term risk appears as volatility. Long-term risk appears as lost ownership and missed growth. Cash feels stable, but stability without growth becomes its own form of risk over time.

Wealth builds when ownership combines with time and consistency. Systems reward patience and discipline.`,

  flashcards: [
    {
      term: 'Investing',
      definition: 'Investing is the allocation of capital into assets expected to generate future economic value, such as earnings, cash flow, or appreciation. It involves accepting uncertainty in exchange for long-term growth.',
      philsAnalogy: 'Owning part of a company that continues selling products, expanding operations, and generating profit even while you are not actively working.',
    },
    {
      term: 'Ownership',
      definition: 'Ownership represents a legal or economic claim on an asset\'s future cash flows and outcomes. Owners benefit directly from growth and bear risk when performance declines.',
      philsAnalogy: 'Employees receive fixed pay. Owners benefit when the business grows and suffer when it struggles.',
    },
    {
      term: 'Time Horizon',
      definition: 'Time horizon is the length of time an investment is expected to remain invested before the capital is needed. Longer horizons reduce the impact of short-term volatility.',
      philsAnalogy: 'Money for rent stays liquid. Money for retirement stays invested for decades.',
    },
    {
      term: 'Risk',
      definition: 'Risk is the probability that actual outcomes differ from expected outcomes, including the possibility of permanent loss of capital. Risk increases when time is limited or information is weak.',
      philsAnalogy: 'Investing money needed next month versus money not needed for twenty years.',
    },
    {
      term: 'Consistency',
      definition: 'Consistency is the practice of investing at regular intervals regardless of market conditions. It reduces behavioral mistakes and timing errors.',
      philsAnalogy: 'Investing the same amount every month without reacting to headlines.',
    },
  ],

  simulatorGame: {
    title: 'Ownership vs Waiting',
    description: 'You receive income each round. Decide how much to hold as cash and how much to invest in a growing business. See how ownership and time affect outcomes.',
    initialState: {
      weeklyIncome: 200,
      hourlyWage: 0,
      workHours: 0,
      fatigue: 0,
      freeTime: 100,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'First Paycheck Decision',
        description: 'You receive your first significant paycheck of $500. You could save it all in cash, invest some, or invest all.',
        choices: [
          {
            id: 'save-cash',
            label: 'Keep it all in cash',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Your money is safe but not growing. Cash loses purchasing power over time to inflation.',
            },
          },
          {
            id: 'invest-half',
            label: 'Invest half, save half',
            outcome: {
              incomeChange: 25,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Balanced approach! You have both security and growth. Your invested portion starts compounding.',
            },
          },
          {
            id: 'invest-all',
            label: 'Invest everything',
            outcome: {
              incomeChange: 50,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Maximum growth potential! But you have no cash cushion. Good if you don\'t need the money soon.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'Market Drops 10%',
        description: 'Headlines scream disaster. Your investments dropped 10% this week. Friends are panicking and selling.',
        choices: [
          {
            id: 'sell-everything',
            label: 'Sell everything and go to cash',
            outcome: {
              incomeChange: -50,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You locked in your losses. Now you need to time when to get back in. Most people get this wrong.',
            },
          },
          {
            id: 'hold-steady',
            label: 'Hold and do nothing',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Discipline pays off. Markets have always recovered over time. You stayed the course.',
            },
          },
          {
            id: 'buy-more',
            label: 'Invest more at lower prices',
            outcome: {
              incomeChange: 30,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Buying when others panic! If you don\'t need the money soon, this is when wealth is built.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'Consistent Investing Choice',
        description: 'You can set up automatic monthly investing of $100 or wait for the "right time" to invest larger amounts.',
        choices: [
          {
            id: 'automatic-investing',
            label: 'Set up automatic monthly investing',
            outcome: {
              incomeChange: 40,
              fatigueChange: -10,
              freeTimeChange: 10,
              skillChange: 2,
              feedback: 'Excellent! You removed emotion from the equation. Consistency beats timing almost every time.',
            },
          },
          {
            id: 'wait-timing',
            label: 'Wait for the perfect entry point',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You\'re still waiting. Meanwhile, markets moved and you missed growth. Timing is nearly impossible.',
            },
          },
          {
            id: 'sporadic',
            label: 'Invest when you feel like it',
            outcome: {
              incomeChange: 20,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Some growth, but emotions still drive decisions. You\'ll likely buy high when excited and miss lows when scared.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Ten Years Later',
        description: 'A decade has passed. Your consistent investing has grown significantly. You could cash out or keep compounding.',
        choices: [
          {
            id: 'cash-out',
            label: 'Cash out and celebrate',
            outcome: {
              incomeChange: 100,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You took profits! But you also stopped the compounding machine. Was it needed for a goal?',
            },
          },
          {
            id: 'keep-compounding',
            label: 'Keep investing for another decade',
            outcome: {
              incomeChange: 200,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Compound growth accelerates over time. The next decade will likely grow even more than the first.',
            },
          },
          {
            id: 'partial-withdraw',
            label: 'Withdraw some, keep most invested',
            outcome: {
              incomeChange: 150,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 1,
              feedback: 'Balance of enjoying gains and continuing growth. A reasonable approach for most goals.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 300,
      maxFatigue: 60,
    },
  },

  miniReflection: {
    question: 'What feels riskier to you: short-term losses or missing long-term growth?',
    followUp: 'Why do you think that is?',
  },

  quiz: [
    {
      question: 'Investing is best described as',
      options: [
        'Betting on prices',
        'Buying ownership in value creation',
        'Saving with risk',
        'Fast money',
      ],
      correctIndex: 1,
      explanation: 'Investing means purchasing ownership in systems that create value over time, not gambling on short-term price movements.',
    },
    {
      question: 'A longer time horizon does what to risk?',
      options: [
        'Increases it',
        'Removes it',
        'Changes its shape',
        'Makes losses impossible',
      ],
      correctIndex: 2,
      explanation: 'Risk doesn\'t disappear with time, but it changes form. Short-term risk is volatility; long-term risk is missed growth.',
    },
    {
      question: 'Consistency matters because',
      options: [
        'Markets reward effort',
        'Timing is easy',
        'Emotion hurts decisions',
        'Cash loses value instantly',
      ],
      correctIndex: 2,
      explanation: 'Consistent investing removes emotional decision-making, which typically leads to buying high and selling low.',
    },
    {
      question: 'Owners earn mainly through',
      options: [
        'Wages',
        'Tips',
        'Control',
        'Growth',
      ],
      correctIndex: 3,
      explanation: 'Owners benefit from the growth of the business they own, not from hourly wages or tips.',
    },
    {
      question: 'The biggest hidden cost of staying in cash is',
      options: [
        'Fees',
        'Taxes',
        'Missed growth',
        'Volatility',
      ],
      correctIndex: 2,
      explanation: 'While cash feels safe, it loses purchasing power to inflation and misses the growth that invested money can achieve.',
    },
  ],

  powerMove: 'Set an automatic investing rule. Same amount. Same day. No exceptions.',

  realLifeAction: 'Pick one company you use daily. Write how it makes money and why customers keep paying.',
};
