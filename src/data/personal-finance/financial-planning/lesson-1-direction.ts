import { Lesson } from '@/types/personal-finance';

export const lesson1DirectionBeforeSpeed: Lesson = {
  id: 'direction-before-speed',
  title: 'Direction Before Speed',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains why earning, saving, and investing without clear goals leads to confusion and frustration. You learn that progress requires direction first, and that goals act as decision filters for every financial action that follows.

Completion unlocks the Goal Compass and alignment-based decision logic across future modules.`,

  realityHook: `Two pandas earn the same amount of bamboo coins.
Both save consistently.
Both invest responsibly.

One feels steady and in control.
The other feels behind and stressed.

Their money behavior looks identical.
Their direction is not.

You decide whether to move faster or move with purpose.`,

  outcomePreview: 'Mastering this lesson unlocks the Goal Compass, allowing future choices to be evaluated by alignment instead of impulse.',

  microLesson: `Money without direction creates confusion, not progress. You can increase income, save regularly, and even make smart investments, yet still feel stuck because those actions are not connected to a specific outcome. Activity replaces advancement when there is no clear endpoint guiding decisions.

Financial goals are not aspirations or vague intentions. They are concrete decisions about what your money is supposed to accomplish and within what timeframe. When goals are defined clearly, they introduce constraints that narrow your choices. Fewer choices reduce mental friction and improve consistency, because decisions no longer require constant judgment calls.

Goals also change how progress is evaluated. Instead of measuring success by external benchmarks or other people's outcomes, you measure whether your actions move you closer to what you personally decided matters. This removes emotional noise from financial decisions and replaces it with practical feedback.

Before improving tactics like earning, saving, or investing, direction must be set. Otherwise, better tactics simply move you faster in an undefined direction.`,

  flashcards: [
    {
      term: 'Financial Goal',
      definition: 'A financial goal is a specific outcome you decide your money should support within a defined time frame. It provides direction for decisions rather than motivation alone.',
      philsAnalogy: 'A financial goal is a destination in a navigation app. Speed matters only after the destination is set.',
    },
    {
      term: 'Direction',
      definition: 'Direction is clarity about where you want your financial decisions to lead, independent of how fast progress occurs.',
      philsAnalogy: 'Direction is choosing the trail before starting the hike.',
    },
    {
      term: 'Constraint',
      definition: 'A constraint is a deliberate limit that removes unnecessary options and focuses effort on what matters most.',
      philsAnalogy: 'A constraint is guardrails on a road. They prevent drifting off course.',
    },
    {
      term: 'Alignment',
      definition: 'Alignment measures how well your financial actions support the goals you chose.',
      philsAnalogy: 'Alignment is rowing in the same direction as the current.',
    },
    {
      term: 'Comparison Trap',
      definition: 'The comparison trap occurs when progress is judged against other people instead of personal goals.',
      philsAnalogy: 'The comparison trap is racing someone headed to a different destination.',
    },
  ],

  simulatorGame: {
    title: 'Panda Goal Compass',
    description: 'Experience how goals simplify decisions and reduce stress by choosing your direction first.',
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
        title: 'Choose Your Primary Goal',
        description: 'Panda Phil sees three possible future paths. Each leads to a different outcome, but income and effort are identical across paths. Which direction calls to you?',
        choices: [
          {
            id: 'goal-freedom',
            label: 'Financial Freedom in 5 years',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Goal Compass activated! Your decisions will now filter through "Does this bring me closer to freedom?" Clarity reduces stress.',
            },
          },
          {
            id: 'goal-security',
            label: 'Build an Emergency Safety Net',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Goal Compass activated! Every choice now asks "Does this strengthen my safety net?" Direction brings peace of mind.',
            },
          },
          {
            id: 'goal-experience',
            label: 'Fund a Major Life Experience',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Goal Compass activated! Decisions now filter through "Does this bring my experience closer?" Purpose creates momentum.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Impulse Purchase',
        description: 'A new gadget catches your eye. It costs $150 and looks amazing. Your goal compass flashes.',
        choices: [
          {
            id: 'buy-impulse',
            label: 'Buy it—you deserve it',
            outcome: {
              incomeChange: -150,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The gadget was fun for a week. Now it sits unused. Your goal moved further away. Misalignment costs money AND momentum.',
            },
          },
          {
            id: 'check-alignment',
            label: 'Check goal alignment first',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You asked "Does this serve my goal?" The answer was no. Decision made in seconds. Clarity is power.',
            },
          },
          {
            id: 'delay-purchase',
            label: 'Add to "Maybe Later" list',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Smart delay. 80% of "Maybe Later" items become "Don\'t Actually Want" over time. Your goal stays on track.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Comparison Moment',
        description: 'You see a friend showing off their new car. You feel behind. Your compass pulses with a reminder.',
        choices: [
          {
            id: 'feel-behind',
            label: 'Compare yourself to them',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You spent hours worrying. Their goal isn\'t your goal. Their timeline isn\'t your timeline. Comparison stole your focus.',
            },
          },
          {
            id: 'check-own-progress',
            label: 'Check YOUR progress instead',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You checked your own compass. You\'re 15% closer to your goal than last month. That\'s what matters.',
            },
          },
          {
            id: 'ignore-completely',
            label: 'Scroll past without reacting',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Clean mental break. What others have says nothing about your path. You protected your focus.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Lock Your Constraint',
        description: 'To strengthen your compass, you must remove one option permanently. Which constraint will focus your path?',
        choices: [
          {
            id: 'no-debt',
            label: 'No new debt for non-essentials',
            outcome: {
              incomeChange: 50,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Constraint locked. Future temptations automatically filtered out. Your decision load dropped dramatically.',
            },
          },
          {
            id: 'auto-save',
            label: 'Auto-save 20% before spending',
            outcome: {
              incomeChange: 40,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Constraint locked. You can\'t spend what you never see. Your goal gets funded first, every time.',
            },
          },
          {
            id: 'no-comparison-apps',
            label: 'Limit comparison-triggering apps',
            outcome: {
              incomeChange: 20,
              fatigueChange: -25,
              freeTimeChange: 5,
              skillChange: 1,
              feedback: 'Constraint locked. Mental energy preserved. Fewer comparisons mean clearer focus on your own path.',
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
    question: 'Which option felt hardest to remove once you committed to a goal?',
    followUp: 'Why do you think letting go of that felt difficult?',
  },

  quiz: [
    {
      question: 'Why do clear goals reduce stress?',
      options: [
        'They increase income',
        'They remove unnecessary choices',
        'They guarantee success',
        'They increase motivation',
      ],
      correctIndex: 1,
      explanation: 'Clear goals act as decision filters, eliminating options that don\'t align and reducing the mental burden of constant evaluation.',
    },
    {
      question: 'Direction matters more than speed because:',
      options: [
        'Speed always comes later',
        'Effort is unlimited',
        'Movement without direction wastes energy',
        'Goals create money',
      ],
      correctIndex: 2,
      explanation: 'Moving fast in the wrong direction gets you further from your goal. Direction ensures every effort counts.',
    },
    {
      question: 'Alignment measures:',
      options: [
        'How much you earn',
        'How fast you save',
        'How well actions match goals',
        'How others are doing',
      ],
      correctIndex: 2,
      explanation: 'Alignment tracks whether your financial decisions support the specific outcomes you chose to pursue.',
    },
  ],

  powerMove: 'If you do not decide what your money is for, every decision becomes harder than it needs to be.',

  realLifeAction: 'Write one sentence describing what you want your money to make easier over the next three years.',
};
