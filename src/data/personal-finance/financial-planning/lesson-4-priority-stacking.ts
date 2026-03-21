import { Lesson } from '@/types/personal-finance';

export const lesson4PriorityStacking: Lesson = {
  id: 'priority-stacking-focus',
  title: 'Priority Stacking and Focus',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson teaches why trying to make progress on too many goals at once slows everything down. You learn how to rank goals intentionally, focus resources, and create momentum instead of spreading money thin.

Completion unlocks goal ranking mechanics and focus-based progress boosts across future modules.`,

  realityHook: `Panda Phil has five goals.
Each one matters.
He gives a little money to each.

Months pass.
Nothing feels finished.
Everything feels unfinished.

You decide whether to spread effort or concentrate it.`,

  outcomePreview: 'Mastering this lesson unlocks Priority Stacking, allowing one goal to accelerate while others pause without guilt.',

  microLesson: `Most people do not fail because they lack goals. They fail because they pursue too many at the same time. When money is spread evenly across multiple priorities, progress slows everywhere, creating the feeling that nothing works even when effort is high.

Priority stacking means choosing which goal matters most right now and allowing others to wait. This is not neglect. It is sequencing. Goals do not disappear when they are paused. They become clearer and easier to fund later once momentum exists.

Focus creates visible progress, and visible progress builds confidence. Confidence reduces friction and makes follow-through easier. Without focus, every decision feels heavy because everything competes at once.

The goal is not to abandon important goals. The goal is to decide the order in which they deserve attention.`,

  flashcards: [
    {
      term: 'Priority Stacking',
      definition: 'Priority stacking is the practice of ranking goals so one receives primary focus while others intentionally wait.',
      philsAnalogy: 'Priority stacking is carrying one bamboo bundle at a time instead of dropping all of them.',
    },
    {
      term: 'Focus',
      definition: 'Focus is directing limited resources toward one outcome to create measurable progress.',
      philsAnalogy: 'Focus is aiming the flashlight instead of lighting the whole room dimly.',
    },
    {
      term: 'Goal Dilution',
      definition: 'Goal dilution happens when progress slows because resources are spread too thin across multiple goals.',
      philsAnalogy: 'Goal dilution is watering every plant too lightly for any to grow.',
    },
    {
      term: 'Sequencing',
      definition: 'Sequencing is deciding the order in which goals are pursued over time.',
      philsAnalogy: 'Sequencing is lining up dominos so they fall cleanly.',
    },
    {
      term: 'Momentum',
      definition: 'Momentum is the acceleration that comes from visible progress toward a goal.',
      philsAnalogy: 'Momentum is a snowball that grows as it rolls.',
    },
  ],

  simulatorGame: {
    title: 'Panda Priority Stack',
    description: 'Experience how focus accelerates progress while spreading resources thin slows everything down.',
    initialState: {
      weeklyIncome: 200,
      hourlyWage: 15,
      workHours: 13,
      fatigue: 25,
      freeTime: 35,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'Five Goals, One Income',
        description: 'Phil has 5 active goals and $200/month to allocate. He\'s been giving $40 to each. Nothing is progressing. What\'s the fix?',
        choices: [
          {
            id: 'keep-equal',
            label: 'Keep splitting equally—fairness matters',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Three months later: every goal is 20% funded. None are complete. The fairness feels hollow.',
            },
          },
          {
            id: 'pick-one',
            label: 'Pick #1 goal, give it 70% of funds',
            outcome: {
              incomeChange: 50,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'One month later: Goal #1 is 70% complete! Visible progress creates momentum and motivation.',
            },
          },
          {
            id: 'pick-two',
            label: 'Pick top 2 goals, split 50/50',
            outcome: {
              incomeChange: 25,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Compromise approach. Better than 5-way split, but neither goal completes quickly. Momentum is weak.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Guilt of Pausing',
        description: 'You ranked goals. #4 is "save for a family gift." Your family expects it. But it\'s not #1.',
        choices: [
          {
            id: 'promote-gift',
            label: 'Move gift to #1—family is important',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Your ranking now reflects others\' expectations, not your priorities. Is this your stack or theirs?',
            },
          },
          {
            id: 'keep-rank',
            label: 'Keep ranking—explain timeline to family',
            outcome: {
              incomeChange: 30,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Honest communication. Family understands. Your #1 goal stays focused. Boundaries protect progress.',
            },
          },
          {
            id: 'side-fund',
            label: 'Create a small side fund for it',
            outcome: {
              incomeChange: 10,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Token gesture. It eases guilt but slows your primary goal. Every leak adds up.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'Momentum Breakthrough',
        description: 'Goal #1 just hit 90%! You can finish it this month or start building momentum on #2 early.',
        choices: [
          {
            id: 'finish-first',
            label: 'Finish #1 completely first',
            outcome: {
              incomeChange: 50,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'GOAL COMPLETE! The feeling of finishing compounds. You now attack #2 with proven confidence.',
            },
          },
          {
            id: 'split-early',
            label: 'Start #2 while finishing #1',
            outcome: {
              incomeChange: 30,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You got antsy. #1 takes 2 extra months. #2 has a tiny start. Neither feels like a win.',
            },
          },
          {
            id: 'celebrate-pause',
            label: 'Almost done—take a break month',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Rest is valid. But you broke momentum 10% from the finish line. Starting again will feel harder.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The New Shiny Goal',
        description: 'A new opportunity appears! It\'s exciting and feels urgent. Your current #1 is 60% complete.',
        choices: [
          {
            id: 'switch-goals',
            label: 'Switch to the new goal immediately',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Goal ADHD. Your previous progress sits at 60% forever. New goal starts from 0. Nothing completes.',
            },
          },
          {
            id: 'add-to-queue',
            label: 'Add to queue as #2, finish #1 first',
            outcome: {
              incomeChange: 40,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart sequencing! New goal is captured, not forgotten. #1 gets its momentum. Both will complete.',
            },
          },
          {
            id: 'evaluate-swap',
            label: 'Genuinely evaluate: is new goal actually #1?',
            outcome: {
              incomeChange: 20,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Thoughtful! Sometimes priorities genuinely change. The key is intentional re-ranking, not reactive chasing.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 300,
      maxFatigue: 50,
    },
  },

  miniReflection: {
    question: 'Which goal felt hardest to pause, even temporarily?',
    followUp: 'What would make pausing that goal feel okay?',
  },

  quiz: [
    {
      question: 'Why does spreading money across many goals slow progress?',
      options: [
        'Goals lose importance',
        'Resources are diluted',
        'Income decreases',
        'Discipline fails',
      ],
      correctIndex: 1,
      explanation: 'Limited resources spread thin create minimal progress everywhere, robbing you of the momentum that comes from visible wins.',
    },
    {
      question: 'Priority stacking means:',
      options: [
        'Ignoring less important goals',
        'Funding all goals equally',
        'Choosing one goal to focus on first',
        'Removing goals',
      ],
      correctIndex: 2,
      explanation: 'Priority stacking sequences goals—the top goal gets focus while others wait their turn intentionally.',
    },
    {
      question: 'Sequencing goals helps because:',
      options: [
        'It increases income',
        'It removes all tradeoffs',
        'Progress compounds one goal at a time',
        'Goals become easier',
      ],
      correctIndex: 2,
      explanation: 'Completing goals in order creates momentum and confidence that makes each subsequent goal feel more achievable.',
    },
  ],

  powerMove: 'Trying to do everything at once guarantees nothing finishes.',

  realLifeAction: 'Write down your top three financial goals and circle the one that should receive focus right now.',
};
