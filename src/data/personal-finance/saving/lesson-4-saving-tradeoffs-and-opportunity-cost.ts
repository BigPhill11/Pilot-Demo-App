import { Lesson } from '@/types/personal-finance';

export const lesson4SavingTradeoffsAndOpportunityCost: Lesson = {
  id: 'saving-tradeoffs-and-opportunity-cost',
  title: 'Saving Tradeoffs and Opportunity Cost',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains why saving always involves tradeoffs and how opportunity cost shapes every financial decision. You learn how to evaluate what you give up when you save or spend, and how intentional tradeoffs protect long-term progress without requiring extreme restriction.

Completion unlocks decision-awareness mechanics and smarter tradeoff evaluation in later modules.`,

  realityHook: `You see something you want and you can afford it.
Buying it would not cause a crisis.

You hesitate anyway. Not because you lack money, but because you know spending now changes what is possible later. The cost is not just the price. The cost is what that money can no longer do.

This raises a quiet question.
What are you giving up when you choose one option over another?`,

  outcomePreview: 'Mastering this lesson unlocks opportunity-cost awareness and tradeoff clarity in financial decisions.',

  microLesson: `Every financial choice involves a tradeoff, even when it does not feel like one. When you spend money, you are choosing the benefit of that purchase over every other use of those dollars. When you save money, you are choosing future flexibility over immediate comfort. The mistake many people make is ignoring the second option entirely.

Opportunity cost is the value of the next best alternative you give up when you make a decision. It does not appear on receipts or bank statements, but it shapes outcomes over time. Small spending choices often feel harmless because the opportunity cost is delayed, not visible.

Saving makes tradeoffs easier to see. When money is scarce, every decision feels painful. When savings exist, choices become clearer. You are no longer deciding between spending and survival. You are deciding between two reasonable options with different outcomes.

Tradeoffs do not mean denial. They mean alignment. Choosing to save for one goal often means spending less on something else, not on everything. Intentional tradeoffs reduce regret because the choice reflects priorities rather than impulse.

Learning to recognize opportunity cost helps you move from reactive spending to deliberate decision-making. You stop asking whether you can afford something and start asking what it costs you in terms of future options.`,

  flashcards: [
    {
      term: 'Tradeoff',
      definition: 'A tradeoff occurs when choosing one option requires giving up another. In money decisions, tradeoffs exist even when the cost is not immediately obvious.',
      philsAnalogy: 'Two doors where only one can stay open.',
    },
    {
      term: 'Opportunity Cost',
      definition: 'Opportunity cost is the value of the next best option you give up when making a decision. It represents what your money could have done instead.',
      philsAnalogy: 'The road not taken.',
    },
    {
      term: 'Delayed Cost',
      definition: 'A delayed cost is a consequence that appears later rather than immediately. Many financial mistakes feel harmless at first because their costs show up over time.',
      philsAnalogy: 'Interest that accumulates quietly.',
    },
    {
      term: 'Priority Alignment',
      definition: 'Priority alignment means directing money toward goals that matter most to you while reducing spending on lower-priority items. It turns restriction into choice.',
      philsAnalogy: 'Pointing resources in one direction.',
    },
    {
      term: 'Conscious Spending',
      definition: 'Conscious spending is making spending decisions with awareness of their tradeoffs and opportunity costs. It replaces impulse with intention.',
      philsAnalogy: 'Choosing with eyes open.',
    },
  ],

  simulatorGame: {
    title: 'Tradeoff Decision Lab',
    description: 'Practice identifying opportunity costs and choosing aligned tradeoffs.',
    initialState: {
      weeklyIncome: 200,
      hourlyWage: 0,
      workHours: 0,
      fatigue: 20,
      freeTime: 0,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'The Daily Coffee',
        description: 'You spend $5 per day on coffee. That is $150 per month. You could make coffee at home for $30. The difference is $120.',
        choices: [
          {
            id: 'keep-buying',
            label: 'Keep buying—it is worth it to you',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'A conscious choice. The tradeoff is clear and you accepted it. This is not a mistake if it aligns with your priorities.',
            },
          },
          {
            id: 'switch-home',
            label: 'Switch to home coffee, save $120/month',
            outcome: {
              incomeChange: 120,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You traded convenience for savings. $120/month is $1,440/year. That compounds into real options over time.',
            },
          },
          {
            id: 'reduce-frequency',
            label: 'Buy coffee twice a week, make the rest',
            outcome: {
              incomeChange: 80,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'A balanced tradeoff. You kept the treat without the full cost. Smart moderation often beats extreme choices.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Subscription Stack',
        description: 'You have four streaming services totaling $60/month. You only actively use two. The others run in the background.',
        choices: [
          {
            id: 'keep-all',
            label: 'Keep all—you might want them later',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You paid $30/month for "maybe." Over a year, that is $360 for content you did not watch. Delayed costs add up.',
            },
          },
          {
            id: 'cancel-unused',
            label: 'Cancel the two unused services',
            outcome: {
              incomeChange: 30,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You removed invisible spending. The money now serves goals instead of sitting unused in forgotten apps.',
            },
          },
          {
            id: 'rotate-monthly',
            label: 'Rotate services—one new one each month',
            outcome: {
              incomeChange: 45,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Creative solution. You get variety without stacking costs. Intentional rotation beats passive accumulation.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Upgrade Temptation',
        description: 'Your phone works fine but a new model is out. It costs $800. You could wait a year and save that money instead.',
        choices: [
          {
            id: 'upgrade-now',
            label: 'Upgrade now—you use it every day',
            outcome: {
              incomeChange: -800,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You chose immediate benefit. The opportunity cost is $800 plus whatever that money could have grown into. Worth it?',
            },
          },
          {
            id: 'wait-year',
            label: 'Wait a year, save the $800',
            outcome: {
              incomeChange: 800,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You chose future options. The phone still works. The savings now exist for emergencies or opportunities.',
            },
          },
          {
            id: 'buy-refurbished',
            label: 'Buy a refurbished model for $400',
            outcome: {
              incomeChange: -400,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'A compromise that captures most of the benefit at half the cost. Smart tradeoffs find the middle path.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Social Pressure',
        description: 'Friends invite you to dinner. The restaurant is expensive—$80 per person. You could suggest a cheaper spot or skip it.',
        choices: [
          {
            id: 'go-anyway',
            label: 'Go and pay $80—the experience matters',
            outcome: {
              incomeChange: -80,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You valued connection over savings. That is valid if it is intentional. Regret comes from ignoring the tradeoff, not from spending.',
            },
          },
          {
            id: 'suggest-cheaper',
            label: 'Suggest a cheaper spot',
            outcome: {
              incomeChange: -30,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You protected your goals without missing the experience. Good friends care about company, not price tags.',
            },
          },
          {
            id: 'skip-this-one',
            label: 'Skip this one and save the money',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You chose savings over experience. Sometimes that is right. But repeated isolation has its own cost.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 200,
      maxFatigue: 50,
    },
  },

  miniReflection: {
    question: 'Which recent purchase had a hidden opportunity cost you did not think about at the time?',
  },

  quiz: [
    {
      question: 'A tradeoff exists when:',
      options: [
        'Income increases',
        'Two choices conflict',
        'Prices rise',
        'Debt disappears',
      ],
      correctIndex: 1,
      explanation: 'A tradeoff occurs whenever choosing one option means giving up another. Every spending decision has an alternative use.',
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'Total price paid',
        'Future income',
        'The best alternative given up',
        'Interest earned',
      ],
      correctIndex: 2,
      explanation: 'Opportunity cost is the value of what you could have done with the money instead.',
    },
    {
      question: 'Why do small purchases often feel harmless?',
      options: [
        'They are affordable',
        'They are necessary',
        'Costs are delayed',
        'Income offsets them',
      ],
      correctIndex: 2,
      explanation: 'Small purchases feel harmless because their cumulative cost and opportunity cost are not immediately visible.',
    },
    {
      question: 'Conscious spending helps because it:',
      options: [
        'Eliminates spending',
        'Removes tradeoffs',
        'Aligns money with priorities',
        'Maximizes comfort',
      ],
      correctIndex: 2,
      explanation: 'Conscious spending ensures your money goes toward what matters most instead of disappearing into unexamined habits.',
    },
  ],

  powerMove: 'Before spending, ask what this money will not be able to do afterward. If the tradeoff feels acceptable, spend without guilt. If not, save with purpose.',

  realLifeAction: 'For one week, pause before non-essential purchases and name the opportunity cost out loud or in writing. Decide whether the tradeoff supports your priorities. Make the decision intentionally rather than automatically.',
};



