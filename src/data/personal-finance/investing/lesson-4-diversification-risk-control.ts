import { Lesson } from '@/types/personal-finance';

export const lesson4DiversificationRiskControl: Lesson = {
  id: 'diversification-risk-control',
  title: 'Diversification and Risk Control',
  estimatedMinutes: 12,

  moduleOverview: `This lesson explains how investors manage uncertainty without predicting the future. You learn why spreading investments matters and how risk control protects long-term progress.

Understanding diversification and risk control helps you build resilient portfolios.`,

  realityHook: `You put all your savings into one thing you believe will work. If it succeeds, you feel smart and confident. If it fails, everything takes a hit at once. Many people learn too late that relying on one outcome creates unnecessary damage.`,

  outcomePreview: 'Mastering this lesson helps you build portfolios that survive unexpected events and grow over time.',

  microLesson: `Diversification means spreading money across many investments instead of relying on one outcome. No matter how confident someone feels, unexpected events always happen. Diversification plans for uncertainty instead of pretending it does not exist.

Risk control focuses on survival. If one bad decision can wipe everything out, growth stops permanently. Investors who survive downturns allow time and consistency to work.

Concentration feels exciting because wins look bigger. Losses grow the same way. A single failure can erase years of progress. Diversification trades extreme upside for stability and endurance.

You do not diversify to win quickly. You diversify to stay in the game long enough for growth to matter.`,

  flashcards: [
    {
      term: 'Diversification',
      definition: 'Diversification is spreading investments across multiple assets to reduce the impact of any single failure. It lowers the chance that one mistake ruins everything.',
      philsAnalogy: 'Owning shares of many companies across different industries instead of relying on one favorite stock.',
    },
    {
      term: 'Concentration',
      definition: 'Concentration means placing a large amount of money into a small number of investments. This increases both potential gains and potential losses.',
      philsAnalogy: 'Putting most savings into one company you strongly believe in.',
    },
    {
      term: 'Risk Control',
      definition: 'Risk control is limiting how much damage a bad outcome can cause. It focuses on protecting long-term progress.',
      philsAnalogy: 'Never risking money needed for important life expenses.',
    },
    {
      term: 'Correlation',
      definition: 'Correlation describes how investments move compared to each other. Low correlation improves diversification because not everything falls together.',
      philsAnalogy: 'Technology stocks dropping while other industries remain stable.',
    },
    {
      term: 'Survival',
      definition: 'Survival means avoiding losses that permanently remove you from investing. Survival allows time and compounding to work.',
      philsAnalogy: 'Staying invested after a market drop instead of losing everything.',
    },
  ],

  simulatorGame: {
    title: 'Risk Control Builder',
    description: 'Allocate money across investments with different risk levels. See how diversification and risk control affect survival and growth.',
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
        title: 'The Sure Thing',
        description: 'A friend has an investment that "can\'t fail." They want you to put everything into it.',
        choices: [
          {
            id: 'all-in',
            label: 'Go all in on the "sure thing"',
            outcome: {
              incomeChange: -5000,
              fatigueChange: 40,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'It failed. There are no sure things. You lost half your savings in one decision.',
            },
          },
          {
            id: 'small-portion',
            label: 'Invest only 10% of your savings',
            outcome: {
              incomeChange: -500,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'It failed, but you only lost 10%. Risk control saved your portfolio.',
            },
          },
          {
            id: 'decline',
            label: 'Decline and stay diversified',
            outcome: {
              incomeChange: 500,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'You avoided the trap. Your diversified portfolio grew while theirs crashed.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'Industry Concentration',
        description: 'You love tech companies and own five different tech stocks. A tech recession hits.',
        choices: [
          {
            id: 'hold-tech',
            label: 'Hold all your tech stocks',
            outcome: {
              incomeChange: -3000,
              fatigueChange: 30,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'All five dropped together. Same industry = high correlation. Diversification means different industries too.',
            },
          },
          {
            id: 'add-other-sectors',
            label: 'Add investments in other sectors',
            outcome: {
              incomeChange: -1000,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Tech dropped but other sectors held. True diversification means low correlation.',
            },
          },
          {
            id: 'broad-fund',
            label: 'Switch to a broad market fund',
            outcome: {
              incomeChange: -500,
              fatigueChange: 10,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'The fund owned everything, so the tech drop was a smaller percentage. Simple diversification works.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Emergency Fund Question',
        description: 'You could invest your emergency fund for higher returns, but you\'d have no cash cushion.',
        choices: [
          {
            id: 'invest-emergency',
            label: 'Invest the emergency fund',
            outcome: {
              incomeChange: 500,
              fatigueChange: 30,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'An emergency hit during a market downturn. You had to sell at a loss. Risk control failed.',
            },
          },
          {
            id: 'keep-cash',
            label: 'Keep emergency fund in cash',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: 2,
              feedback: 'An emergency hit. You used cash and kept investments intact. Risk control worked.',
            },
          },
          {
            id: 'partial',
            label: 'Keep 6 months expenses in cash',
            outcome: {
              incomeChange: 200,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 2,
              feedback: 'Emergencies covered, extra money invested. Balance of safety and growth.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Maximum Loss Rule',
        description: 'You can set a rule: never risk more than X% of your portfolio on any single investment.',
        choices: [
          {
            id: 'no-rule',
            label: 'No rules - go with your gut',
            outcome: {
              incomeChange: -2000,
              fatigueChange: 35,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Gut feeling led to concentration. A single failure hurt badly. Rules protect from yourself.',
            },
          },
          {
            id: 'five-percent',
            label: 'Maximum 5% in any single investment',
            outcome: {
              incomeChange: 800,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 2,
              feedback: 'Some investments failed, but none hurt more than 5%. Your portfolio grew overall.',
            },
          },
          {
            id: 'ten-percent',
            label: 'Maximum 10% in any single investment',
            outcome: {
              incomeChange: 500,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Reasonable rule. One failure stung but didn\'t destroy. Rules create discipline.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 10500,
      maxFatigue: 60,
    },
  },

  miniReflection: {
    question: 'Would you rather win big once or stay invested for decades?',
    followUp: 'What does that say about your risk tolerance?',
  },

  quiz: [
    {
      question: 'Diversification is best described as',
      options: [
        'Avoiding risk',
        'Spreading exposure',
        'Chasing stability',
        'Limiting growth',
      ],
      correctIndex: 1,
      explanation: 'Diversification spreads your investments so no single failure can ruin your portfolio.',
    },
    {
      question: 'Risk control exists to',
      options: [
        'Increase returns',
        'Predict markets',
        'Avoid volatility',
        'Prevent ruin',
      ],
      correctIndex: 3,
      explanation: 'Risk control\'s main purpose is preventing catastrophic losses that would end your investing journey.',
    },
    {
      question: 'Correlation matters because',
      options: [
        'All assets move together',
        'It affects fees',
        'It changes diversification strength',
        'It predicts winners',
      ],
      correctIndex: 2,
      explanation: 'Low correlation means investments don\'t all fall at once, making diversification more effective.',
    },
    {
      question: 'Concentration is most dangerous when',
      options: [
        'Time is long',
        'Capital is small',
        'Confidence is high',
        'Losses are large',
      ],
      correctIndex: 3,
      explanation: 'Concentration amplifies losses. Large losses on a concentrated position can be devastating.',
    },
    {
      question: 'The main goal of risk control is',
      options: [
        'Speed',
        'Precision',
        'Survival',
        'Timing',
      ],
      correctIndex: 2,
      explanation: 'Risk control ensures you survive setbacks so you can continue investing long-term.',
    },
  ],

  powerMove: 'Set a maximum loss rule before investing and never change it mid-cycle.',

  realLifeAction: 'Compare owning one stock versus owning a diversified fund and note the differences.',
};
