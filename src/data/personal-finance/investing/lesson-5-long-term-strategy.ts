import { Lesson } from '@/types/personal-finance';

export const lesson5LongTermStrategy: Lesson = {
  id: 'long-term-strategy',
  title: 'Long-term Strategy and Staying Invested',
  estimatedMinutes: 12,

  moduleOverview: `This lesson explains how long-term investing actually works in real life. You learn why strategy, rules, and discipline matter more than reacting to short-term market moves.

Understanding long-term strategy helps you build wealth through patience and consistency.`,

  realityHook: `You train for a sport over many seasons. Some weeks feel great and other weeks feel frustrating. Progress comes from following a plan even when results feel slow. Investing works the same way over long periods.`,

  outcomePreview: 'Mastering this lesson helps you develop the discipline to stay invested through market cycles.',

  microLesson: `A long-term strategy is a simple plan you follow across different market conditions. Markets move up and down, but a strategy stays steady. Without a plan, emotions control decisions.

Staying invested matters because growth happens over time inside the market. Missing a few strong periods can reduce long-term results more than avoiding short-term losses helps. Leaving the market feels safe, but getting back in is difficult.

Good strategies stay simple. They define what you invest in, how often you invest, how much risk you accept, and when you rebalance. Simple rules increase consistency and reduce mistakes.

The hardest part of investing is doing nothing during stressful moments. Discipline turns volatility into background noise. Strategy turns uncertainty into progress.`,

  flashcards: [
    {
      term: 'Strategy',
      definition: 'Strategy is a long-term plan made of rules that guide investing decisions over time. Strategy helps investors stay consistent during emotional moments.',
      philsAnalogy: 'Following the same investing plan every month instead of reacting to headlines.',
    },
    {
      term: 'Staying Invested',
      definition: 'Staying invested means keeping money in the market through ups and downs to allow long-term growth. It avoids the damage caused by frequent exits.',
      philsAnalogy: 'Holding investments during market drops instead of selling out of fear.',
    },
    {
      term: 'Rebalancing',
      definition: 'Rebalancing means adjusting investments back to planned levels over time. It controls risk as markets change.',
      philsAnalogy: 'Selling some gains and adding to areas that fell behind.',
    },
    {
      term: 'Discipline',
      definition: 'Discipline is the ability to follow rules even when emotions push against them. Discipline protects long-term outcomes.',
      philsAnalogy: 'Not panic selling during a market downturn.',
    },
    {
      term: 'Long-Term Plan',
      definition: 'A long-term plan connects goals, time horizon, and risk tolerance into one system. It provides direction through uncertainty.',
      philsAnalogy: 'Investing for adulthood or retirement with a clear timeline.',
    },
  ],

  simulatorGame: {
    title: 'Stay or React',
    description: 'Manage a long-term portfolio while random market events test your patience. See how staying invested versus reacting affects results.',
    initialState: {
      weeklyIncome: 10000,
      hourlyWage: 0,
      workHours: 0,
      fatigue: 20,
      freeTime: 50,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Year One: The Slow Start',
        description: 'Your investments are flat after a year. Friends who picked individual stocks are up 30%. You question your strategy.',
        choices: [
          {
            id: 'abandon-strategy',
            label: 'Abandon strategy and copy friends',
            outcome: {
              incomeChange: -1000,
              fatigueChange: 25,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You switched right before their stocks crashed. Chasing recent winners rarely works.',
            },
          },
          {
            id: 'stick-to-plan',
            label: 'Stick to your strategy',
            outcome: {
              incomeChange: 500,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'Year two your strategy caught up. Their stocks crashed. Discipline paid off.',
            },
          },
          {
            id: 'review-strategy',
            label: 'Review but don\'t change strategy',
            outcome: {
              incomeChange: 400,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'You confirmed your strategy was sound. Reviewing is smart; reacting impulsively is not.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Big Drop',
        description: 'Markets crash 35%. Headlines predict more pain. Your portfolio is way down. The urge to sell is overwhelming.',
        choices: [
          {
            id: 'sell-everything',
            label: 'Sell everything and wait',
            outcome: {
              incomeChange: -3500,
              fatigueChange: 35,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'Markets recovered 50% the next year. You missed it. The biggest cost of leaving is missing the rebound.',
            },
          },
          {
            id: 'hold-and-wait',
            label: 'Hold and stop checking',
            outcome: {
              incomeChange: 2000,
              fatigueChange: 10,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'You rode the recovery. Your portfolio is now higher than before the crash. Discipline wins.',
            },
          },
          {
            id: 'rebalance',
            label: 'Rebalance to your target allocation',
            outcome: {
              incomeChange: 2500,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 3,
              feedback: 'You bought more of what dropped. The recovery boosted those investments extra. Rebalancing works.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Hot Trend',
        description: 'A new investment trend is everywhere. People are getting rich fast. Your strategy doesn\'t include it.',
        choices: [
          {
            id: 'chase-trend',
            label: 'Add the trend to your portfolio',
            outcome: {
              incomeChange: -1500,
              fatigueChange: 25,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You bought at the peak. The trend collapsed. Chasing trends breaks strategy.',
            },
          },
          {
            id: 'ignore-trend',
            label: 'Ignore the trend completely',
            outcome: {
              incomeChange: 600,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'The trend crashed. Your boring strategy kept growing. Boring is beautiful.',
            },
          },
          {
            id: 'small-allocation',
            label: 'Allow 5% for speculation',
            outcome: {
              incomeChange: 300,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Small loss on the trend. Core strategy stayed intact. If you speculate, keep it small.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Ten Years Later',
        description: 'A decade of investing is complete. You\'ve weathered crashes, trends, and boring years. It\'s time to assess.',
        choices: [
          {
            id: 'regret-choices',
            label: 'Wish you had done more trading',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Studies show most active traders underperform. Your discipline likely beat most traders.',
            },
          },
          {
            id: 'appreciate-discipline',
            label: 'Appreciate the power of discipline',
            outcome: {
              incomeChange: 1500,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: 3,
              feedback: 'Your portfolio grew significantly. Strategy + time + discipline = wealth.',
            },
          },
          {
            id: 'plan-next-decade',
            label: 'Plan for the next ten years',
            outcome: {
              incomeChange: 1200,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 3,
              feedback: 'Compounding accelerates with time. The next decade will likely grow even more.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 12000,
      maxFatigue: 50,
    },
  },

  miniReflection: {
    question: 'Which rule would feel hardest to follow during a market downturn?',
    followUp: 'How can you prepare yourself to follow it anyway?',
  },

  quiz: [
    {
      question: 'The biggest cost of leaving the market is',
      options: [
        'Taxes',
        'Fees',
        'Missed growth periods',
        'Stress',
      ],
      correctIndex: 2,
      explanation: 'Missing the best recovery days dramatically reduces long-term returns.',
    },
    {
      question: 'Rebalancing helps by',
      options: [
        'Increasing returns',
        'Eliminating risk',
        'Controlling exposure',
        'Predicting markets',
      ],
      correctIndex: 2,
      explanation: 'Rebalancing keeps your portfolio aligned with your target risk level.',
    },
    {
      question: 'Long-term strategies should be',
      options: [
        'Complex',
        'Flexible daily',
        'Rule-based',
        'Reaction-driven',
      ],
      correctIndex: 2,
      explanation: 'Simple, rule-based strategies reduce emotional decision-making.',
    },
    {
      question: 'Discipline matters most during',
      options: [
        'Market highs',
        'Quiet periods',
        'Emotional swings',
        'Planning stages',
      ],
      correctIndex: 2,
      explanation: 'Discipline is tested during fear and excitement - that\'s when it matters most.',
    },
    {
      question: 'Staying invested works because',
      options: [
        'Markets never fall',
        'Volatility disappears',
        'Time compounds growth',
        'Rules guarantee profits',
      ],
      correctIndex: 2,
      explanation: 'Growth happens over time inside the market. Missing time reduces compounding.',
    },
  ],

  powerMove: 'Write three investing rules and commit to following them for one full year.',

  realLifeAction: 'Review a long-term market chart and identify periods when patience paid off.',
};
