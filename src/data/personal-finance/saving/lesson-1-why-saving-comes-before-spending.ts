import { Lesson } from '@/types/personal-finance';

export const lesson1WhySavingComesBeforeSpending: Lesson = {
  id: 'why-saving-comes-before-spending',
  title: 'Why Saving Comes Before Spending',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains why saving must happen before spending to create stability and protect future choices. You learn how saving first reduces stress, prevents small problems from turning into debt, and keeps progress intact even when income is limited.

Completion unlocks emergency fund mechanics and saving automation in later lessons.`,

  realityHook: `At the start of the month, you tell yourself that this time will be different.
You will spend carefully.
You will save whatever is left.

A few days pass. Small purchases do not feel like a problem. Food costs a little more than expected. A plan comes up that you do not want to miss. None of these decisions feel irresponsible on their own.

Then something unexpected happens. A repair. A fee. A missed shift. You look at your account and realize the saving you planned never actually started. The money was already assigned without you noticing.

This moment forces a question.
Is saving something you do only if life cooperates, or is it something that runs regardless of what happens?`,

  outcomePreview: 'Mastering this lesson unlocks first-line financial protection and saving system upgrades.',

  microLesson: `Saving breaks down for most people because it is treated as an afterthought. The plan is usually to spend first and save whatever remains, but spending rarely stays contained. Needs blend into wants, small purchases stack up, and unexpected costs appear. By the time saving becomes the priority, the money is already gone.

Saving works differently when it happens at the start. When money arrives and a portion is moved immediately, the rest of your choices adjust around what is left. This removes constant decision-making and replaces it with a simple rule. You are no longer asking yourself whether you should save. That choice has already been made.

The main function of saving is protection. It protects you from turning small problems into financial setbacks. A broken phone, a higher bill, or a missed shift feels manageable when savings exist. Without savings, those same events often lead to borrowing, stress, or pulling money away from more important goals.

Saving first does not immediately improve your lifestyle. What it improves is your position. You gain time, breathing room, and the ability to respond instead of react. Over time, this changes how you handle money decisions because fewer choices are made under pressure.

Saving is not controlled by income alone. It is controlled by priority. When saving happens first, spending naturally reorganizes around it, and progress becomes more consistent instead of accidental.`,

  flashcards: [
    {
      term: 'Pay Yourself First',
      definition: 'Pay yourself first means saving a portion of your income immediately when it arrives, before any spending decisions are made. This turns saving into a rule instead of a choice and removes the temptation to delay it until the end of the month.',
      philsAnalogy: 'Setting the rules before the game begins so outcomes are predictable.',
    },
    {
      term: 'Emergency Fund',
      definition: 'An emergency fund is money set aside only for unexpected problems that disrupt normal life, such as repairs, medical costs, or temporary income gaps. It exists to absorb shocks so small issues do not force debt or derail other goals.',
      philsAnalogy: 'A buffer that absorbs impact before damage spreads.',
    },
    {
      term: 'Liquidity',
      definition: 'Liquidity describes how quickly you can access money without losing value or paying penalties. Highly liquid money keeps problems small because it is available exactly when timing matters most.',
      philsAnalogy: 'Access without penalty or delay.',
    },
    {
      term: 'Fixed Expense',
      definition: 'A fixed expense is a cost that stays relatively stable from month to month and is difficult to change quickly. These expenses shape your baseline and limit how flexible your budget can be.',
      philsAnalogy: 'Costs you plan around rather than react to.',
    },
    {
      term: 'Variable Expense',
      definition: 'A variable expense is a cost that changes based on behavior, choices, and timing. These expenses are where most day-to-day financial control actually exists.',
      philsAnalogy: 'Costs that respond directly to your decisions.',
    },
  ],

  simulatorGame: {
    title: 'Saving Order Simulator',
    description: 'Understand how the timing of saving changes outcomes under the same income.',
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
        title: 'Paycheck Arrives',
        description: 'You receive your paycheck of $200. Fixed expenses total $120. How will you handle saving?',
        choices: [
          {
            id: 'save-first',
            label: 'Save $40 immediately, then spend from the rest',
            outcome: {
              incomeChange: -40,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart move! You now have $40 protected and $40 for variable spending. Saving happened before temptation could interfere.',
            },
          },
          {
            id: 'save-last',
            label: 'Spend first, save what remains at month end',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'This feels flexible, but history shows the "remaining" money usually disappears. Saving gets pushed aside by small decisions.',
            },
          },
          {
            id: 'no-save',
            label: 'Skip saving this month—expenses are high',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You have more spending freedom now, but zero protection if anything goes wrong. Every month without saving increases vulnerability.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Small Temptations',
        description: 'A week passes. Small purchases appear: food with friends ($25), a streaming subscription ($15), impulse snack runs ($20). Your remaining budget shrinks.',
        choices: [
          {
            id: 'stick-budget',
            label: 'Stick to your original plan',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You said no to some temptations. The money you protected earlier is still protected. Discipline compounds.',
            },
          },
          {
            id: 'small-splurge',
            label: 'Allow some but not all temptations',
            outcome: {
              incomeChange: -25,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You spent $25 more than planned. If you saved first, this came from variable spending. If not, saving just got harder.',
            },
          },
          {
            id: 'all-temptations',
            label: 'Say yes to most—you deserve it',
            outcome: {
              incomeChange: -60,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You spent $60 on small things. Each felt harmless. Together, they eliminated any chance of saving this month.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Surprise Expense',
        description: 'Near the end of the month, an unexpected expense hits: your phone screen cracks. Repair costs $75.',
        choices: [
          {
            id: 'use-savings',
            label: 'Use savings to cover the repair',
            outcome: {
              incomeChange: 0,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Your earlier saving decision paid off. The emergency was absorbed without stress, debt, or stealing from other goals.',
            },
          },
          {
            id: 'use-credit',
            label: 'Put it on a credit card',
            outcome: {
              incomeChange: -10,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The repair is done, but now you owe more than $75 once interest kicks in. One problem created another problem.',
            },
          },
          {
            id: 'delay-repair',
            label: 'Delay the repair and use a damaged phone',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You avoided immediate cost but now live with daily frustration. Small cracks often spread. Delay has hidden costs.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Month Ends',
        description: 'It is the last day of the month. Time to review what happened to your saving goal.',
        choices: [
          {
            id: 'review-saved-first',
            label: 'Review: I saved first and protected my goal',
            outcome: {
              incomeChange: 40,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You have savings intact. The surprise was handled. Next month starts from a stronger position. This is how momentum builds.',
            },
          },
          {
            id: 'review-tried',
            label: 'Review: I tried but spending ate everything',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Good intentions met reality. The lesson is clear: saving last rarely works because spending fills every gap.',
            },
          },
          {
            id: 'review-debt',
            label: 'Review: I ended up in worse shape than I started',
            outcome: {
              incomeChange: -20,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The surprise became debt. Next month starts behind. This is the cycle that saving first is designed to prevent.',
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
    question: 'Which spending choice would you change if you knew a surprise was guaranteed to happen later?',
  },

  quiz: [
    {
      question: 'Saving usually fails because:',
      options: [
        'Income is too low',
        'Saving waits until the end',
        'Banks limit access',
        'Investing comes first',
      ],
      correctIndex: 1,
      explanation: 'When saving is delayed until after spending, there is rarely anything left. Spending naturally expands to fill available money.',
    },
    {
      question: 'Paying yourself first means:',
      options: [
        'Saving after bills',
        'Saving when stressed',
        'Saving monthly',
        'Saving immediately when paid',
      ],
      correctIndex: 3,
      explanation: 'Paying yourself first means moving money to savings the moment income arrives, before any spending decisions are made.',
    },
    {
      question: 'The primary purpose of saving early is:',
      options: [
        'Growth',
        'Comfort',
        'Protection',
        'Status',
      ],
      correctIndex: 2,
      explanation: 'Saving early protects you from turning small problems into financial setbacks. Protection comes before growth.',
    },
    {
      question: 'Liquidity matters because it affects:',
      options: [
        'Income size',
        'Access speed',
        'Job choice',
        'Spending habits',
      ],
      correctIndex: 1,
      explanation: 'Liquidity determines how quickly you can access money when needed. High liquidity means fast access without penalties.',
    },
  ],

  powerMove: 'Turn saving into a decision you make once, not one you negotiate repeatedly. Choose your saving amount before money arrives so spending never gets first claim on your income.',

  realLifeAction: 'Before your next paycheck, choose a fixed saving amount that feels realistic but slightly uncomfortable. Move it immediately when the money hits your account. Pay attention to how your remaining spending adjusts without forcing extra discipline.',
};



