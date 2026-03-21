import { Lesson } from '@/types/personal-finance';

export const lesson2ControllingPay: Lesson = {
  id: 'active-income-lesson-2',
  title: 'Controlling Your Pay, Not Just Your Hours',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson teaches why two people working similar jobs earn different pay and how control over pay is created. You learn the difference between replaceable work and valuable work, why leverage inside active income matters, and how early choices shape future income ceilings.',
  realityHook: `You and another student work the same number of hours.
You both work hard.
After six months, they earn more per hour than you.

Nothing about your effort changed.
Something about your position did.

You decide what to change next.`,
  outcomePreview: 'Mastering this lesson increases your wage growth rate and unlocks negotiation and skill-path choices later.',
  microLesson: `Not all active income is equal. Even when two people trade time for money, the amount they earn per hour depends on how replaceable their work is. Jobs that many people can do tend to pay less because supply is high. Jobs that require specific skills, training, or trust pay more because fewer people can step in.

Pay increases rarely come from effort alone. They come from leverage within active income. Leverage shows up when your work affects outcomes beyond your individual task. Someone who only follows instructions is easier to replace than someone who solves problems, improves systems, or reduces risk for others.

Control over pay grows when you become harder to substitute. That usually means learning skills that stack together, gaining experience that others lack, or taking on responsibility that impacts results. These moves often feel uncomfortable because they add pressure before they add pay.

The key insight is that even inside active income, you are not stuck. You either remain interchangeable, or you slowly position yourself to earn more per hour without working more hours.`,
  flashcards: [
    {
      term: 'Replaceable work',
      definition: 'Replaceable work consists of tasks that many people can perform with little training. Pay stays low because employers can easily find substitutes.',
      philsAnalogy: 'Replaceable work is like being one of many identical parts in a machine. If one part breaks, it gets swapped instantly.'
    },
    {
      term: 'Leverage within labor',
      definition: 'Leverage within labor happens when your actions influence outcomes beyond your own task, such as improving efficiency, quality, or results.',
      philsAnalogy: 'Labor leverage is steering the ship instead of rowing. One action affects the whole direction.'
    },
    {
      term: 'Pay ceiling',
      definition: 'A pay ceiling is the maximum hourly rate a role can reach without changing responsibilities or skills.',
      philsAnalogy: 'A pay ceiling is the height limit sign on a road. No matter how fast you go, you cannot pass it.'
    },
    {
      term: 'Skill positioning',
      definition: 'Skill positioning is choosing skills that are scarce, valuable, and hard to replace, increasing hourly value over time.',
      philsAnalogy: 'Skill positioning is standing where demand is high and supply is low.'
    },
    {
      term: 'Responsibility premium',
      definition: 'A responsibility premium is higher pay earned by taking ownership over outcomes, not just tasks.',
      philsAnalogy: 'Responsibility is carrying the keys, not just opening doors.'
    }
  ],
  simulatorGame: {
    title: 'Replaceability Simulator',
    description: 'Understand how task choice affects hourly pay and job security.',
    initialState: {
      weeklyIncome: 400,
      hourlyWage: 10,
      workHours: 40,
      fatigue: 20,
      freeTime: 30,
      skillLevel: 10
    },
    scenarios: [
      {
        id: 'task-choice-1',
        title: 'New Task Available',
        description: 'Your manager asks if anyone wants to learn the inventory system. It requires extra training but fewer people know how to do it.',
        choices: [
          {
            id: 'learn-inventory',
            label: 'Volunteer to learn',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'You invested time learning a specialized skill. Short-term effort, but you\'re becoming harder to replace.'
            }
          },
          {
            id: 'stay-current',
            label: 'Stick with current tasks',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Comfortable, but you remain as replaceable as before. Your wage ceiling stays the same.'
            }
          }
        ]
      },
      {
        id: 'responsibility-offer',
        title: 'Responsibility Opportunity',
        description: 'A coworker is leaving. Their role included training new hires. Your manager asks if you\'d take this on.',
        choices: [
          {
            id: 'take-training',
            label: 'Accept training responsibility',
            outcome: {
              incomeChange: 25,
              fatigueChange: 20,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'You now impact team performance, not just your own output. This creates a responsibility premium.'
            }
          },
          {
            id: 'decline-training',
            label: 'Decline the offer',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Less pressure, but the opportunity went to someone else. They\'re now harder to replace than you.'
            }
          }
        ]
      },
      {
        id: 'skill-stacking',
        title: 'Cross-Training Option',
        description: 'You can learn a second department\'s workflow. People who know both are rare.',
        choices: [
          {
            id: 'cross-train',
            label: 'Learn the second workflow',
            outcome: {
              incomeChange: 40,
              fatigueChange: 25,
              freeTimeChange: -20,
              skillChange: 30,
              feedback: 'Skill stacking complete. You now fill gaps others can\'t. Your hourly value increased significantly.'
            }
          },
          {
            id: 'specialize-only',
            label: 'Focus on current area only',
            outcome: {
              incomeChange: 10,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'You got slightly better at your current role, but remain easily substitutable.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 500,
      maxFatigue: 80
    }
  },
  miniReflection: {
    question: 'Which task felt riskier to take on, and what held you back from choosing it?'
  },
  quiz: [
    {
      question: 'Why do replaceable jobs usually pay less?',
      options: ['Workers try less', 'Supply of workers is high', 'Employers do not value skills', 'Hours are shorter'],
      correctIndex: 1,
      explanation: 'When many people can do the same work, employers have options. High supply of workers keeps wages low.'
    },
    {
      question: 'What most often raises hourly pay inside active income?',
      options: ['Working longer', 'Taking overtime', 'Reducing replaceability', 'Waiting longer'],
      correctIndex: 2,
      explanation: 'Becoming harder to replace gives you leverage. Effort alone doesn\'t increase pay—positioning does.'
    },
    {
      question: 'Responsibility premiums come from',
      options: ['Titles', 'Time worked', 'Ownership over outcomes', 'Age'],
      correctIndex: 2,
      explanation: 'When you own outcomes rather than just tasks, your impact expands and so does your value.'
    }
  ],
  powerMove: 'If many people can replace you tomorrow, your pay stays capped today.',
  realLifeAction: 'Identify one task you do regularly. Ask whether learning a harder version of it would make you less replaceable.'
};
