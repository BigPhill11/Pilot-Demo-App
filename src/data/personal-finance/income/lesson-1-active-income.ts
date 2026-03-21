import { Lesson } from '@/types/personal-finance';

export const activeIncomeBasicsLesson: Lesson = {
  id: 'active-income-basics',
  title: 'Active Income Basics',
  estimatedMinutes: 12,
  
  moduleOverview: `This module teaches how income is created at the most basic level. You learn how time, pay, and skills interact, why most people hit income ceilings early, and how to think about work as a system instead of a grind. The goal is not to glorify working more. The goal is to help you understand the levers you control and how to use active income as a foundation for wealth, not a trap.

Completion unlocks base cash flow tracking and future income paths.`,

  realityHook: `You work 12 hours a week at $12 per hour.
Your friend works 8 hours a week at $18 per hour.

You both want the same shoes.
You both have school.
You both feel busy.

You must decide how to earn more money next month.`,

  outcomePreview: 'Mastering this lesson increases your base cash flow score and unlocks skill-based income paths in later levels.',

  microLesson: `Active income is money you earn by showing up and doing work. You trade your time and effort for pay, and when the work stops, the income stops too. This is the first type of income most people ever earn, and it plays an important role early on because it builds discipline, reliability, and a baseline level of cash flow.

Active income depends on two levers only. The number of hours you work, and how much you earn per hour. Most people try to earn more by adding hours because that feels straightforward. The problem is that hours hit limits quickly. School schedules, energy levels, and burnout cap how much time you can trade.

The more powerful lever is your hourly value. When your skills improve, your pay improves without adding hours. Two people can work the same amount of time, but the one solving a more valuable problem earns more. That difference is not effort. That difference is skill.

Active income is not bad. It funds your life and your next steps. The mistake is relying on it forever instead of using it as a launch point for smarter income decisions.`,

  flashcards: [
    {
      term: 'Active Income',
      definition: 'Active income is money earned by directly trading your time and effort for pay. You must show up and perform work to get paid, and income stops the moment the work stops. This income forms the foundation of most people\'s financial lives early on.',
      philsAnalogy: 'Active income is like pedaling a bike. When you stop pedaling, the bike slows down and eventually stops moving.',
    },
    {
      term: 'Hourly Wage',
      definition: 'An hourly wage is the amount of money you earn for each hour worked. Total income increases either by working more hours or increasing the value of each hour.',
      philsAnalogy: 'Your hourly wage is how far one pedal stroke moves you. Pedaling longer helps, but pedaling stronger moves you farther.',
    },
    {
      term: 'Overtime',
      definition: 'Overtime is extra pay earned for working beyond standard hours. It increases income in the short term but relies entirely on additional time and energy.',
      philsAnalogy: 'Overtime is sprinting on the bike. You move faster briefly, but you cannot sprint forever.',
    },
    {
      term: 'Skill Premium',
      definition: 'A skill premium is higher pay earned because your skills solve a more valuable or harder problem. Skill premiums raise income without increasing hours.',
      philsAnalogy: 'A skill premium is upgrading your bike gears so each pedal produces more movement.',
    },
    {
      term: 'Schedule Constraint',
      definition: 'Schedule constraints are limits on when and how long you can work. Fixed schedules reduce flexibility and block other income opportunities.',
      philsAnalogy: 'A schedule constraint is being allowed to ride only at certain times, even when the road is open later.',
    },
  ],

  simulatorGame: {
    title: 'Time vs Value Simulator',
    description: 'Understand how hours and hourly value affect income, free time, and fatigue. Make decisions and see the outcomes.',
    initialState: {
      weeklyIncome: 144, // 12 hours * $12
      hourlyWage: 12,
      workHours: 12,
      fatigue: 20,
      freeTime: 40,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'The Extra Shift',
        description: 'Your manager offers you an extra 8-hour shift this week. The overtime pays 1.5x your normal rate ($18/hr).',
        choices: [
          {
            id: 'take-shift',
            label: 'Take the extra shift',
            outcome: {
              incomeChange: 144, // 8 * 18
              fatigueChange: 35,
              freeTimeChange: -8,
              skillChange: 0,
              feedback: 'You earned $144 extra this week! But your fatigue spiked significantly. This works short-term, but can you sustain it?',
            },
          },
          {
            id: 'decline-shift',
            label: 'Decline and rest',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You kept your energy levels stable. No extra money, but you\'re not burning out either.',
            },
          },
          {
            id: 'half-shift',
            label: 'Take half the shift (4 hours)',
            outcome: {
              incomeChange: 72, // 4 * 18
              fatigueChange: 15,
              freeTimeChange: -4,
              skillChange: 0,
              feedback: 'A balanced choice. $72 extra with moderate fatigue increase. Sometimes compromise is smart.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Skill Workshop',
        description: 'A local community college offers a free 6-hour workshop on Excel skills. It\'s during your usual free time.',
        choices: [
          {
            id: 'attend-workshop',
            label: 'Attend the workshop',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -6,
              skillChange: 1,
              feedback: 'You invested in yourself! Your skill level increased. This could lead to a higher wage in the future.',
            },
          },
          {
            id: 'skip-workshop',
            label: 'Skip it and relax',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You recharged your energy. Sometimes rest is valuable too, but the skill opportunity is gone.',
            },
          },
          {
            id: 'work-instead',
            label: 'Work those hours instead',
            outcome: {
              incomeChange: 72, // 6 * 12
              fatigueChange: 20,
              freeTimeChange: -6,
              skillChange: 0,
              feedback: 'You earned $72 now, but missed a chance to increase your future earning potential.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Raise Request',
        description: 'You\'ve been at your job for 6 months. You could ask for a raise, but it feels risky.',
        choices: [
          {
            id: 'ask-raise',
            label: 'Ask for a $2/hour raise',
            outcome: {
              incomeChange: 24, // 12 * 2 (if approved, ongoing)
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You asked and got a $1/hour raise! Not the full $2, but that\'s $12 more every week forever without extra hours.',
            },
          },
          {
            id: 'wait-longer',
            label: 'Wait until you have more experience',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Playing it safe. But remember: you don\'t get what you don\'t ask for.',
            },
          },
          {
            id: 'ask-after-skill',
            label: 'Develop a new skill first, then ask',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -4,
              skillChange: 1,
              feedback: 'Smart strategy! You\'re building leverage for a bigger raise later. Skill + negotiation = power.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Side Gig',
        description: 'A neighbor offers to pay you $20/hour for tutoring their kid in math for 3 hours per week.',
        choices: [
          {
            id: 'take-tutoring',
            label: 'Take the tutoring gig',
            outcome: {
              incomeChange: 60,
              fatigueChange: 15,
              freeTimeChange: -3,
              skillChange: 1,
              feedback: 'Higher hourly rate AND skill development! Teaching reinforces your own knowledge. This is a value lever.',
            },
          },
          {
            id: 'decline-tutoring',
            label: 'Decline - too busy already',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You protected your time. Valid if you\'re near burnout, but you passed on a $20/hr opportunity.',
            },
          },
          {
            id: 'negotiate-tutoring',
            label: 'Counter-offer: 2 hours at $25/hour',
            outcome: {
              incomeChange: 50,
              fatigueChange: 10,
              freeTimeChange: -2,
              skillChange: 1,
              feedback: 'They agreed! You valued your time higher and they respected it. Negotiation is a skill.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 250, // Need to reach $250/week
      maxFatigue: 70, // Can't exceed 70% fatigue
    },
  },

  miniReflection: {
    question: 'Which felt harder to increase, your hours or your value?',
    followUp: 'Why do you think that is?',
  },

  quiz: [
    {
      question: 'Which change increases income without adding more hours?',
      options: [
        'Raising your hourly wage',
        'Taking more shifts',
        'Working longer days',
        'Adding overtime',
      ],
      correctIndex: 0,
      explanation: 'Raising your hourly wage increases your income for every hour you already work, without requiring additional time.',
    },
    {
      question: 'Why do hours hit limits faster than wage?',
      options: [
        'Pay rates are fixed forever',
        'Time and energy are limited',
        'Skills do not matter',
        'Overtime never works',
      ],
      correctIndex: 1,
      explanation: 'There are only 24 hours in a day and your energy has limits. Time is finite, but skill development can continuously raise your wage.',
    },
    {
      question: 'What usually creates a skill premium?',
      options: [
        'Age',
        'Effort',
        'Solving harder problems',
        'Working longer',
      ],
      correctIndex: 2,
      explanation: 'A skill premium comes from being able to solve more valuable or difficult problems that others cannot, not just from working hard or long.',
    },
  ],

  powerMove: 'If you want more income, stop asking how long you can work and start asking how valuable your time is.',

  realLifeAction: 'Notice one task you do this week. Ask yourself whether improving that skill would raise your value or only your hours.',
};
