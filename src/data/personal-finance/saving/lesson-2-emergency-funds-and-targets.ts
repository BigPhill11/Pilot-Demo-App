import { Lesson } from '@/types/personal-finance';

export const lesson2EmergencyFundsAndTargets: Lesson = {
  id: 'emergency-funds-and-targets',
  title: 'Emergency Funds and Targets',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains what an emergency fund is, how large it should be at different stages, and why the goal is protection rather than perfection. You learn how to set a realistic target that fits your current income and how emergency funds prevent short-term problems from turning into long-term damage.

Completion unlocks emergency fund milestones and protection scaling in later lessons.`,

  realityHook: `Something goes wrong and it is not optional.
Your phone breaks. Your car needs work. Your hours get cut for a week.

The problem itself is manageable.
The timing is not.

You scramble. You borrow. You delay something else to cover the gap. The stress does not come from the cost alone. It comes from having no buffer between the problem and your life.

This raises a simple question.
Are emergencies rare events, or are they predictable moments you have not planned for yet?`,

  outcomePreview: 'Mastering this lesson unlocks emergency fund targets, milestone tracking, and protection upgrades.',

  microLesson: `An emergency fund exists for one reason. It creates distance between a problem and a bad decision. Emergencies are not unusual events. They are a normal part of life that arrive on an unpredictable schedule. What makes them damaging is not the cost itself, but the lack of preparation.

Many people avoid building an emergency fund because the recommended numbers feel overwhelming. Hearing targets like three to six months of expenses makes saving feel impossible, especially early on. This leads to inaction, which is worse than starting small.

Emergency funds work in stages. The first stage is not about covering everything. It is about stopping immediate damage. A few hundred dollars can prevent late fees, credit card balances, or missed obligations. As income grows, the fund expands and absorbs larger disruptions, such as temporary job loss or major repairs.

The correct emergency fund size depends on your situation. Stable income requires less buffer than unstable income. Fewer fixed expenses reduce required savings. More responsibility increases it. The goal is not perfection. The goal is enough protection for your current stage.

An emergency fund does not grow to impress anyone. It grows to quietly keep your life from unraveling when timing turns against you.`,

  flashcards: [
    {
      term: 'Emergency Fund',
      definition: 'An emergency fund is money reserved exclusively for unexpected, necessary expenses that disrupt normal life. Its purpose is to prevent borrowing, panic decisions, or long-term setbacks when problems appear without warning.',
      philsAnalogy: 'A safety net that catches you before damage spreads.',
    },
    {
      term: 'Starter Emergency Fund',
      definition: 'A starter emergency fund is a small initial buffer, often a few hundred dollars, designed to stop minor emergencies from becoming financial crises. It prioritizes speed and protection over completeness.',
      philsAnalogy: 'The first layer of armor, not the full suit.',
    },
    {
      term: 'Expense Baseline',
      definition: 'An expense baseline is the minimum amount of money required to keep your life running each month. It includes essential fixed and necessary variable costs.',
      philsAnalogy: 'The floor you stand on financially.',
    },
    {
      term: 'Income Stability',
      definition: 'Income stability refers to how predictable and reliable your income is over time. Less stable income requires a larger emergency buffer because gaps and volatility are more likely.',
      philsAnalogy: 'Solid ground versus shifting ground.',
    },
    {
      term: 'Emergency Misuse',
      definition: 'Emergency misuse happens when emergency funds are spent on non-essential or planned expenses. This weakens protection and increases vulnerability when real problems arise.',
      philsAnalogy: 'Using a fire extinguisher for decoration.',
    },
  ],

  simulatorGame: {
    title: 'Emergency Buffer Builder',
    description: 'Learn how different emergency fund sizes affect outcomes under real-life disruptions.',
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
        title: 'Set Your Target',
        description: 'You currently have $0 in emergency savings. Your monthly expenses are $800. What target will you aim for first?',
        choices: [
          {
            id: 'target-starter',
            label: 'Starter fund: $300 (covers small emergencies)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart starting point. $300 stops minor disasters from becoming debt. You can expand later once this is secured.',
            },
          },
          {
            id: 'target-month',
            label: 'One month: $800 (covers a full month)',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Ambitious but good. This provides real protection. The key is not waiting for perfection before starting.',
            },
          },
          {
            id: 'target-full',
            label: 'Three months: $2,400 (full recommended)',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Great long-term goal, but overwhelming as a first step. Many people give up before reaching distant targets.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'Building Progress',
        description: 'Two months pass. You have saved $200 toward your emergency fund. A minor unexpected expense appears: $75 for a prescription.',
        choices: [
          {
            id: 'use-fund',
            label: 'Use emergency fund to cover it',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'This is exactly what the fund is for. You absorbed the cost without stress, debt, or sacrificing other goals.',
            },
          },
          {
            id: 'use-credit',
            label: 'Put it on credit to preserve savings',
            outcome: {
              incomeChange: -10,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You protected savings but created debt. The fund exists for this exact purpose. Unused protection is wasted protection.',
            },
          },
          {
            id: 'skip-expense',
            label: 'Delay or skip the prescription',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You saved money but risked your health. Some emergencies cannot be delayed without serious consequences.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Bigger Test',
        description: 'Six months pass. Your emergency fund has grown to $500. Then your hours get cut for two weeks, reducing income by $400.',
        choices: [
          {
            id: 'use-buffer',
            label: 'Use emergency fund to cover the gap',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Your fund absorbed the shock. You paid bills on time and avoided late fees. This is protection working as designed.',
            },
          },
          {
            id: 'borrow-family',
            label: 'Borrow from family instead',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The gap is covered but you created a social debt. Your fund stayed intact—but was that the right priority?',
            },
          },
          {
            id: 'miss-bills',
            label: 'Miss some bills to preserve the fund',
            outcome: {
              incomeChange: -50,
              fatigueChange: 30,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Late fees and penalties now exceed what you "saved." The fund exists to prevent exactly this outcome.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Temptation to Misuse',
        description: 'A friend invites you on a trip. It costs $350. Your emergency fund has $600. Using it would be easy.',
        choices: [
          {
            id: 'misuse-fund',
            label: 'Use emergency fund for the trip',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The trip was fun. But your protection just dropped by 60%. The next emergency will hit harder.',
            },
          },
          {
            id: 'decline-trip',
            label: 'Decline the trip and keep the fund intact',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You protected your buffer. Missing one trip is not a tragedy. Missing protection during an emergency is.',
            },
          },
          {
            id: 'partial-use',
            label: 'Use $150 from the fund, save the rest',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'A compromise that still weakens protection. The fund is for emergencies, not planned fun.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 150,
      maxFatigue: 60,
    },
  },

  miniReflection: {
    question: 'Which type of emergency has cost you the most stress in the past year, and how large would your buffer have needed to be to handle it calmly?',
  },

  quiz: [
    {
      question: 'The main purpose of an emergency fund is to:',
      options: [
        'Earn interest',
        'Cover planned expenses',
        'Prevent bad decisions during disruptions',
        'Replace investing',
      ],
      correctIndex: 2,
      explanation: 'An emergency fund creates distance between problems and panic decisions, preventing small issues from becoming long-term damage.',
    },
    {
      question: 'Why is a starter emergency fund useful?',
      options: [
        'It replaces full savings',
        'It stops small problems from escalating',
        'It earns higher returns',
        'It reduces taxes',
      ],
      correctIndex: 1,
      explanation: 'A starter fund provides immediate protection against minor emergencies while you build toward a larger goal.',
    },
    {
      question: 'Who needs a larger emergency fund?',
      options: [
        'Someone with stable salary and low expenses',
        'Someone with no fixed costs',
        'Someone with variable income',
        'Someone with no debt',
      ],
      correctIndex: 2,
      explanation: 'Variable income creates more uncertainty, requiring a larger buffer to cover gaps and fluctuations.',
    },
    {
      question: 'Emergency fund misuse is harmful because it:',
      options: [
        'Reduces returns',
        'Increases taxes',
        'Removes protection when problems appear',
        'Slows spending',
      ],
      correctIndex: 2,
      explanation: 'Using emergency funds for non-emergencies leaves you vulnerable when real disruptions occur.',
    },
  ],

  powerMove: 'Build protection in stages. Do not wait for the perfect number before you start. Secure the next layer of safety that matches your current life, then expand it as your situation grows.',

  realLifeAction: 'Set a starter emergency fund target you can reach within the next 30 days. This amount should be large enough to handle one common disruption, such as a repair or short income gap. Save toward it consistently until it is complete, then keep the account untouched except for true emergencies.',
};



