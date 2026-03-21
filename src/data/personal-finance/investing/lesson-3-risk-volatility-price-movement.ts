import { Lesson } from '@/types/personal-finance';

export const lesson3RiskVolatilityPriceMovement: Lesson = {
  id: 'risk-volatility-price-movement',
  title: 'Risk, Volatility, and Why Prices Move',
  estimatedMinutes: 12,

  moduleOverview: `This lesson explains why prices move so often and why movement does not always mean danger. You learn the difference between volatility and real risk, and why time matters more than daily price changes.

Understanding this distinction helps you stay calm during market turbulence.`,

  realityHook: `You wake up and check the market before school. Prices are down and social media feels panicked. Nothing about the companies you own changed overnight, but fear spreads quickly when numbers fall. Many people sell during moments like this without understanding what actually happened.`,

  outcomePreview: 'Mastering this lesson helps you distinguish between normal price movement and actual risk to your investments.',

  microLesson: `Prices move because people react emotionally. News, rumors, fear, and excitement cause buying and selling every day. This constant movement is called volatility.

Volatility feels scary because losses show up fast on screens. Real risk is different. Real risk means losing money permanently, usually because a business fails or money is needed too soon.

Time changes how risk behaves. Over short periods, volatility controls outcomes and emotions run high. Over long periods, business performance matters more than daily price movement.

Understanding volatility helps investors stay calm. Calm decisions lead to better long-term results.`,

  flashcards: [
    {
      term: 'Volatility',
      definition: 'Volatility describes how much prices move over short periods of time. It reflects uncertainty and emotion, not business strength.',
      philsAnalogy: 'A stock price dropping after a negative headline even though the company still sells the same products.',
    },
    {
      term: 'Risk',
      definition: 'Risk is the chance of permanent loss of money. Risk increases when investments are rushed or time horizons are short.',
      philsAnalogy: 'Investing money needed next month versus money not needed for twenty years.',
    },
    {
      term: 'Market Sentiment',
      definition: 'Market sentiment describes how investors feel emotionally, such as fear or excitement. Sentiment moves prices quickly.',
      philsAnalogy: 'Prices rising because everyone feels optimistic before earnings.',
    },
    {
      term: 'Drawdown',
      definition: 'A drawdown is a drop in value from a previous high point. Drawdowns happen often in long-term investing.',
      philsAnalogy: 'A portfolio falling during a recession before recovering later.',
    },
    {
      term: 'Time Horizon',
      definition: 'Time horizon is how long money stays invested before it is needed. Longer time horizons reduce stress and improve outcomes.',
      philsAnalogy: 'Money invested for adulthood or retirement.',
    },
  ],

  simulatorGame: {
    title: 'Volatility Simulator',
    description: 'You own a stable business while the market sets a new price every round. See how reacting to volatility affects outcomes.',
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
        title: 'Monday Morning Drop',
        description: 'Your portfolio is down 8% when you wake up. Social media is full of panic. The business fundamentals haven\'t changed.',
        choices: [
          {
            id: 'panic-sell',
            label: 'Sell everything immediately',
            outcome: {
              incomeChange: -800,
              fatigueChange: 30,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You locked in an 8% loss. The market recovered the next week. Panic selling is expensive.',
            },
          },
          {
            id: 'hold-steady',
            label: 'Hold and don\'t check the app',
            outcome: {
              incomeChange: 200,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'A week later, prices recovered. Your discipline paid off. Volatility is noise.',
            },
          },
          {
            id: 'buy-more',
            label: 'Buy more at lower prices',
            outcome: {
              incomeChange: 500,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'You bought the dip. When prices recovered, you made even more. Fear creates opportunity.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Headline Scare',
        description: 'A scary economic headline appears. Your investments drop 3% in an hour. Experts on TV say it could get worse.',
        choices: [
          {
            id: 'follow-experts',
            label: 'Sell because experts say to',
            outcome: {
              incomeChange: -300,
              fatigueChange: 20,
              freeTimeChange: -3,
              skillChange: 0,
              feedback: 'The "experts" were wrong. Markets recovered. Headlines are designed to create fear.',
            },
          },
          {
            id: 'ignore-noise',
            label: 'Ignore the headline noise',
            outcome: {
              incomeChange: 100,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'A month later, no one remembers the headline. Your investments grew. News is entertainment.',
            },
          },
          {
            id: 'research-headline',
            label: 'Research what actually changed',
            outcome: {
              incomeChange: 50,
              fatigueChange: 15,
              freeTimeChange: -3,
              skillChange: 2,
              feedback: 'Nothing fundamental changed. You learned to separate news from actual business impact.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Long Drawdown',
        description: 'Markets have been down for 6 months. Your portfolio is 20% below its peak. Friends have sold and moved to cash.',
        choices: [
          {
            id: 'give-up',
            label: 'Give up and sell everything',
            outcome: {
              incomeChange: -2000,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You sold at the bottom. Markets recovered 40% the next year. Giving up is the real risk.',
            },
          },
          {
            id: 'stay-invested',
            label: 'Stay invested and wait',
            outcome: {
              incomeChange: 1500,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Patience rewarded. The recovery came and you participated. Time heals volatility.',
            },
          },
          {
            id: 'keep-investing',
            label: 'Keep investing monthly regardless',
            outcome: {
              incomeChange: 2500,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 3,
              feedback: 'You bought throughout the downturn. When recovery came, your gains were amplified.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Money Needed Soon',
        description: 'You need to withdraw money for something important in 3 months. The market is volatile.',
        choices: [
          {
            id: 'leave-invested',
            label: 'Leave it invested and hope',
            outcome: {
              incomeChange: -200,
              fatigueChange: 30,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Markets dropped right before you needed the money. Short time horizons are risky.',
            },
          },
          {
            id: 'move-to-cash',
            label: 'Move to cash now for safety',
            outcome: {
              incomeChange: -50,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'You protected money you needed soon. Smart. Time horizon should determine risk level.',
            },
          },
          {
            id: 'partial-move',
            label: 'Move only what you need to cash',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'You protected the needed amount while keeping long-term money invested. Good balance.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 11000,
      maxFatigue: 60,
    },
  },

  miniReflection: {
    question: 'How do price drops make you feel emotionally?',
    followUp: 'Does that emotion lead to good decisions?',
  },

  quiz: [
    {
      question: 'Volatility refers to',
      options: [
        'Permanent loss',
        'Business failure',
        'Price movement',
        'Market collapse',
      ],
      correctIndex: 2,
      explanation: 'Volatility is simply how much prices move. It\'s not the same as permanent loss or failure.',
    },
    {
      question: 'Real investment risk usually comes from',
      options: [
        'Headlines',
        'Daily swings',
        'Weak businesses',
        'Patience',
      ],
      correctIndex: 2,
      explanation: 'Real risk is permanent loss, which usually comes from owning failing businesses or needing money at the wrong time.',
    },
    {
      question: 'Drawdowns are',
      options: [
        'Rare events',
        'Signs of failure',
        'Normal experiences',
        'Avoidable mistakes',
      ],
      correctIndex: 2,
      explanation: 'Drawdowns happen regularly in investing. They\'re normal parts of the journey, not signs of failure.',
    },
    {
      question: 'Market sentiment affects',
      options: [
        'Cash flow',
        'Product quality',
        'Prices',
        'Business strategy',
      ],
      correctIndex: 2,
      explanation: 'Sentiment drives short-term prices but doesn\'t change what a business actually does or earns.',
    },
    {
      question: 'Long-term investors focus on',
      options: [
        'Price screens',
        'Headlines',
        'Business strength',
        'Daily charts',
      ],
      correctIndex: 2,
      explanation: 'Long-term investors focus on how well businesses perform, not daily price movements or headlines.',
    },
  ],

  powerMove: 'Write your time horizon before making any investing decision.',

  realLifeAction: 'Look at a long-term market chart and mark major drops and recoveries.',
};
