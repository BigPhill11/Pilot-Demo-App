import { Lesson } from '@/types/personal-finance';

export const lesson2WhatYouBuyWhenInvesting: Lesson = {
  id: 'what-you-buy-when-investing',
  title: 'What You Are Actually Buying When You Invest',
  estimatedMinutes: 12,

  moduleOverview: `This lesson explains what investing really means beneath the surface of moving numbers. You learn that stocks and funds represent ownership in real businesses, not random numbers on a screen.

Understanding this distinction changes how you view market movements and make investment decisions.`,

  realityHook: `You open an investing app and see numbers moving up and down quickly. It feels like a game where prices change constantly. Behind those numbers, real companies are selling products, paying workers, and making long-term decisions. Most people focus on the price and forget about the business underneath.`,

  outcomePreview: 'Mastering this lesson helps you see past price movements to understand the real value of what you own.',

  microLesson: `When you buy a stock, you buy ownership in a real company. That company sells products or services, earns money, and tries to grow over time. Your investment grows when the business performs well, not because the price moves randomly.

Prices change every day because people react to news, fear, and excitement. Businesses change slowly because growth takes time. Value comes from how much money a company earns and how strong it becomes over years, not days.

Funds work the same way but on a larger scale. When you buy a fund, you buy small pieces of many companies at once. This spreads risk and reduces the damage from one company failing.

Investing feels confusing when you watch prices constantly. Investing feels clearer when you focus on the businesses you own.`,

  flashcards: [
    {
      term: 'Stock',
      definition: 'A stock represents partial ownership in a company. Stock owners benefit when the company earns more money and grows over time.',
      philsAnalogy: 'Owning a small piece of a company that sells products people use every day, like food, phones, or clothing.',
    },
    {
      term: 'Price',
      definition: 'Price is the amount buyers and sellers agree on at a specific moment. Price moves quickly based on emotion and news.',
      philsAnalogy: 'A sneaker reselling price changes daily even though the shoe itself stays the same.',
    },
    {
      term: 'Value',
      definition: 'Value reflects how strong a business is and how much money it can earn in the future. Value changes slowly as businesses grow or struggle.',
      philsAnalogy: 'A popular restaurant stays valuable even during a slow week.',
    },
    {
      term: 'Cash Flow',
      definition: 'Cash flow is the money left after a business pays all its expenses. Cash flow allows businesses to grow and reward owners.',
      philsAnalogy: 'Profit used to open new stores, improve products, or hire more workers.',
    },
    {
      term: 'Diversification',
      definition: 'Diversification means owning many different companies instead of relying on one. This reduces the impact of any single failure.',
      philsAnalogy: 'Owning shares of many companies instead of betting everything on one brand.',
    },
  ],

  simulatorGame: {
    title: 'Price vs Business',
    description: 'Choose between companies based on price movement or business strength. See how your focus affects long-term outcomes.',
    initialState: {
      weeklyIncome: 1000,
      hourlyWage: 0,
      workHours: 0,
      fatigue: 20,
      freeTime: 50,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'The Hot Stock',
        description: 'A stock tripled last month. Everyone is talking about it. But the company has no profits and burns cash.',
        choices: [
          {
            id: 'buy-hot',
            label: 'Buy the hot stock',
            outcome: {
              incomeChange: -30,
              fatigueChange: 25,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'The hype faded. Price crashed 50% the next month. You bought excitement, not value.',
            },
          },
          {
            id: 'research-first',
            label: 'Research the business first',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -2,
              skillChange: 2,
              feedback: 'You discovered the company loses money every quarter. You passed on the hype and avoided the crash.',
            },
          },
          {
            id: 'buy-small',
            label: 'Buy a tiny amount to learn',
            outcome: {
              incomeChange: -5,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Small loss, but you learned an important lesson about hype vs fundamentals.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Boring Company',
        description: 'A company sells products everyone needs. It grows 5% per year steadily. The stock price barely moves day to day.',
        choices: [
          {
            id: 'skip-boring',
            label: 'Skip it - too boring',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You passed on steady growth. Sometimes boring is exactly what works.',
            },
          },
          {
            id: 'invest-boring',
            label: 'Invest in the steady grower',
            outcome: {
              incomeChange: 50,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Years later, your investment doubled. Slow and steady often wins the investing race.',
            },
          },
          {
            id: 'wait-dip',
            label: 'Wait for the price to drop',
            outcome: {
              incomeChange: 20,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 1,
              feedback: 'You waited months. The price never dropped much. You missed some growth waiting for perfection.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'Fund vs Single Stock',
        description: 'You can invest in one company you love or a fund that owns 500 companies.',
        choices: [
          {
            id: 'single-stock',
            label: 'All in on your favorite company',
            outcome: {
              incomeChange: 40,
              fatigueChange: 30,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'It worked this time! But you were one bad earnings report away from disaster.',
            },
          },
          {
            id: 'diversified-fund',
            label: 'Buy the diversified fund',
            outcome: {
              incomeChange: 30,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'Steady growth, lower stress. Some companies failed, but others succeeded. That\'s diversification.',
            },
          },
          {
            id: 'mix-both',
            label: 'Fund plus a small single stock position',
            outcome: {
              incomeChange: 35,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Core diversification with some individual picks. A balanced approach many investors use.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Understanding Cash Flow',
        description: 'Two companies: one has flashy products but loses money. Another has boring products but profits grow yearly.',
        choices: [
          {
            id: 'flashy-loser',
            label: 'Invest in the flashy money-loser',
            outcome: {
              incomeChange: -20,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The company ran out of money and the stock collapsed. Cash flow matters.',
            },
          },
          {
            id: 'boring-winner',
            label: 'Invest in the profitable grower',
            outcome: {
              incomeChange: 60,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Profits fund growth. The company expanded and your investment grew with it.',
            },
          },
          {
            id: 'wait-learn',
            label: 'Wait and study both companies',
            outcome: {
              incomeChange: 10,
              fatigueChange: 10,
              freeTimeChange: -3,
              skillChange: 2,
              feedback: 'You learned to read financial statements. Now you can spot cash flow strength yourself.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 1100,
      maxFatigue: 70,
    },
  },

  miniReflection: {
    question: 'Did you focus more on price movement or business strength today?',
    followUp: 'How might that affect your investing approach?',
  },

  quiz: [
    {
      question: 'Stock returns mainly come from',
      options: [
        'Headlines',
        'Trading speed',
        'Business performance',
        'Market timing',
      ],
      correctIndex: 2,
      explanation: 'Long-term stock returns are driven by how well the underlying business performs, not short-term news or trading.',
    },
    {
      question: 'Price differs from value because',
      options: [
        'Price reacts faster',
        'Value is fixed',
        'Price is fake',
        'Value follows price',
      ],
      correctIndex: 0,
      explanation: 'Price can swing wildly based on emotion, while value changes slowly based on actual business performance.',
    },
    {
      question: 'Funds help investors by',
      options: [
        'Removing thinking',
        'Predicting markets',
        'Owning many companies',
        'Locking profits',
      ],
      correctIndex: 2,
      explanation: 'Funds provide diversification by owning many companies, reducing the impact of any single company failing.',
    },
    {
      question: 'Cash flow matters because',
      options: [
        'It pays salaries',
        'It funds growth',
        'It predicts prices',
        'It stops volatility',
      ],
      correctIndex: 1,
      explanation: 'Cash flow is what allows companies to grow, invest, and reward shareholders over time.',
    },
    {
      question: 'Diversification reduces',
      options: [
        'Returns',
        'Ownership',
        'Failure impact',
        'Decision speed',
      ],
      correctIndex: 2,
      explanation: 'Diversification reduces how much any single failure can hurt your overall portfolio.',
    },
  ],

  powerMove: 'Before investing, write one sentence explaining how the company makes money.',

  realLifeAction: 'Pick one public company and explain what problem it solves for customers.',
};
