import { Lesson } from '@/types/personal-finance';

export const lesson2TimeHorizons: Lesson = {
  id: 'time-horizons-tradeoffs',
  title: 'Time Horizons and Tradeoffs',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson teaches how time changes the meaning of a goal. You learn why short-term and long-term goals compete for the same money, how unclear timelines cause frustration, and how assigning time horizons improves decision quality.

Completion unlocks time-based goal tiers and horizon-aware decision filters across future modules.`,

  realityHook: `Panda Phil wants three things.
A new bamboo bike this year.
Freedom to travel in five years.
Security later in life.

He tries to fund all three at once.
Nothing moves fast.
Everything feels tight.

You decide how Panda Phil should use time, not effort.`,

  outcomePreview: 'Mastering this lesson unlocks the Goal Timeline and allows future choices to be evaluated by short-term versus long-term impact.',

  microLesson: `Every financial goal lives on a timeline. Some goals demand money soon, while others benefit from patience. When timelines are unclear, goals compete silently for the same dollars, creating tension and frustration even when income is sufficient.

Short-term goals prioritize certainty and accessibility. They require money to be available when needed. Long-term goals prioritize growth and flexibility. They can tolerate waiting and short-term volatility. Treating both the same leads to poor decisions, either taking too much risk early or being too conservative for the future.

Clear time horizons force tradeoffs. Money used for a near-term goal cannot simultaneously serve a long-term one. This is not a failure of discipline. It is a reality of limited resources. Assigning timelines makes these tradeoffs explicit and manageable.

Progress improves when goals are grouped by when they matter, not just by how important they feel. Time creates structure, and structure improves follow-through.`,

  flashcards: [
    {
      term: 'Time Horizon',
      definition: 'A time horizon is the length of time before a financial goal needs to be achieved, which determines how money should be used toward it.',
      philsAnalogy: 'A time horizon is knowing whether a trip is tomorrow or next year before packing.',
    },
    {
      term: 'Short-term Goal',
      definition: 'A short-term goal is a financial target expected to be met soon and requires stability and access to cash.',
      philsAnalogy: 'A short-term goal is food you plan to eat today, not store for later.',
    },
    {
      term: 'Long-term Goal',
      definition: 'A long-term goal is a financial target that benefits from patience and allows money to grow over time.',
      philsAnalogy: 'A long-term goal is planting bamboo that grows stronger over seasons.',
    },
    {
      term: 'Tradeoff',
      definition: 'A tradeoff occurs when choosing one use of money limits or prevents another.',
      philsAnalogy: 'A tradeoff is choosing which path to take when the road splits.',
    },
    {
      term: 'Opportunity Cost',
      definition: 'Opportunity cost is the value of the best alternative you give up when making a decision.',
      philsAnalogy: 'Opportunity cost is the path you do not walk after choosing a direction.',
    },
  ],

  simulatorGame: {
    title: 'Panda Goal Timeline',
    description: 'Learn how assigning timelines clarifies priorities and reduces conflict between competing goals.',
    initialState: {
      weeklyIncome: 200,
      hourlyWage: 15,
      workHours: 13,
      fatigue: 30,
      freeTime: 35,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Assign Goal Timelines',
        description: 'Phil has three goals competing for the same income. No timelines are assigned yet. Where does each goal belong?',
        choices: [
          {
            id: 'bike-short',
            label: 'Bamboo bike = 6 months (Short-term)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Timeline assigned! Short-term goals need accessible, stable funds. You know exactly when this money is needed.',
            },
          },
          {
            id: 'travel-medium',
            label: 'Travel fund = 3 years (Medium-term)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Timeline assigned! Medium-term goals can tolerate some growth strategies while staying relatively accessible.',
            },
          },
          {
            id: 'security-long',
            label: 'Life security = 10+ years (Long-term)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Timeline assigned! Long-term goals benefit most from compound growth. Time is their greatest ally.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Emergency Fund Question',
        description: 'You have $500 to allocate. Your short-term bike goal is 60% funded. Your long-term security has nothing yet.',
        choices: [
          {
            id: 'finish-bike',
            label: 'Finish funding the bike first',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You completed one goal! But the long-term goal lost 6 months of potential growth. Tradeoffs are real.',
            },
          },
          {
            id: 'split-funds',
            label: 'Split 50/50 between both',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Neither goal made significant progress. Splitting resources often means slower progress everywhere.',
            },
          },
          {
            id: 'prioritize-long',
            label: 'Start the long-term fund now',
            outcome: {
              incomeChange: 20,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart sequencing! The bike can wait 2 more months. But those 6 months of compound growth? You can\'t get those back.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'Timeline Conflict',
        description: 'A friend invites you on a trip next month. It would deplete your short-term bike fund entirely.',
        choices: [
          {
            id: 'take-trip',
            label: 'Take the trip—experiences matter',
            outcome: {
              incomeChange: -200,
              fatigueChange: -20,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Great memories! But your bike goal resets to zero. Timeline conflicts create real consequences.',
            },
          },
          {
            id: 'decline-trip',
            label: 'Decline—the bike comes first',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You stayed on track. The bike goal timeline holds. But you missed a meaningful experience.',
            },
          },
          {
            id: 'negotiate-trip',
            label: 'Propose a cheaper alternative',
            outcome: {
              incomeChange: -50,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Creative solution! You joined for part of the trip, kept most of your fund, and maintained relationships.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Reallocate With New Information',
        description: 'Your company announces potential layoffs in 8 months. Your goals suddenly need re-evaluation.',
        choices: [
          {
            id: 'pause-bike',
            label: 'Pause bike, accelerate emergency fund',
            outcome: {
              incomeChange: 100,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Timeline updated! When circumstances change, timelines should too. Security before extras.',
            },
          },
          {
            id: 'stay-course',
            label: 'Stay the course—probably fine',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Optimism is nice, but ignoring timeline threats creates stress. The uncertainty weighs on you.',
            },
          },
          {
            id: 'accelerate-all',
            label: 'Try to accelerate everything',
            outcome: {
              incomeChange: 50,
              fatigueChange: 35,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'Burnout incoming. You can\'t sprint on every goal simultaneously. Timelines force prioritization.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 250,
      maxFatigue: 60,
    },
  },

  miniReflection: {
    question: 'Which goal felt hardest to delay once you saw the full timeline?',
    followUp: 'What made that delay feel difficult?',
  },

  quiz: [
    {
      question: 'Why do unclear timelines create stress?',
      options: [
        'Income is too low',
        'Goals silently compete for the same money',
        'Goals are unrealistic',
        'Saving is difficult',
      ],
      correctIndex: 1,
      explanation: 'Without clear timelines, every goal feels equally urgent, creating invisible competition for limited resources.',
    },
    {
      question: 'Short-term goals usually require:',
      options: [
        'Maximum growth',
        'High risk',
        'Accessibility and stability',
        'Long holding periods',
      ],
      correctIndex: 2,
      explanation: 'Money needed soon must be available and stable—you can\'t afford volatility when the timeline is short.',
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'Taxes paid',
        'Time spent',
        'The best alternative given up',
        'Extra effort required',
      ],
      correctIndex: 2,
      explanation: 'Every choice has a cost: the value of what you didn\'t choose. Understanding this improves decision quality.',
    },
  ],

  powerMove: 'If you do not assign time to your goals, your money will argue with itself.',

  realLifeAction: 'List one financial goal and write when it actually needs to be achieved, not when you want it to happen.',
};
