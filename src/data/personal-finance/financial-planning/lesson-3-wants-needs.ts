import { Lesson } from '@/types/personal-finance';

export const lesson3WantsNeedsTargets: Lesson = {
  id: 'wants-needs-targets',
  title: 'Wants, Needs, and Targets',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson teaches how to separate emotional spending from goal-driven spending. You learn why confusion between wants, needs, and targets causes financial drift, and how clear categorization improves follow-through without relying on discipline.

Completion unlocks spending labels and goal-linked spending filters across future modules.`,

  realityHook: `Panda Phil gets paid.

He buys better bamboo snacks.
He upgrades his hut.
He feels good for a moment.

At the end of the month, nothing moved closer to his goals.

You decide whether money supports comfort or progress.`,

  outcomePreview: 'Mastering this lesson unlocks the Spending Lens, allowing purchases to be evaluated by purpose instead of impulse.',

  microLesson: `Most financial frustration does not come from spending itself. It comes from spending that conflicts with goals. When wants, needs, and targets are mixed together, money leaks quietly and progress feels slower than expected, even with good income.

Needs are expenses required to function. Wants improve comfort or enjoyment. Targets are intentional uses of money tied directly to goals. The mistake is treating wants like needs or assuming targets will happen automatically if money is left over. Leftover money rarely exists without intention.

Clear separation reduces guilt and friction. Wants are allowed when chosen deliberately. Needs are funded first without debate. Targets receive priority because they move you closer to outcomes you already decided matter.

Discipline becomes less necessary when categories are clear. Decisions become easier because money already has a job before temptation appears.`,

  flashcards: [
    {
      term: 'Needs',
      definition: 'Needs are essential expenses required to function and maintain stability, such as housing, food, and transportation.',
      philsAnalogy: 'Needs are the bamboo that keeps the panda alive.',
    },
    {
      term: 'Wants',
      definition: 'Wants are non-essential expenses that improve comfort, enjoyment, or status but are not required for stability.',
      philsAnalogy: 'Wants are flavored bamboo treats. Nice to have, not required.',
    },
    {
      term: 'Targets',
      definition: 'Targets are intentional uses of money tied directly to specific financial goals.',
      philsAnalogy: 'Targets are bamboo planted for future harvest.',
    },
    {
      term: 'Spending Drift',
      definition: 'Spending drift occurs when money consistently flows toward comfort instead of priorities.',
      philsAnalogy: 'Spending drift is slowly floating off course without noticing.',
    },
    {
      term: 'Intentional Spending',
      definition: 'Intentional spending means assigning money to a purpose before it is spent.',
      philsAnalogy: 'Intentional spending is packing your bag before leaving, not grabbing items randomly.',
    },
  ],

  simulatorGame: {
    title: 'Panda Spending Sorter',
    description: 'Practice separating spending into needs, wants, and targets to see how categorization affects goal progress.',
    initialState: {
      weeklyIncome: 300,
      hourlyWage: 15,
      workHours: 20,
      fatigue: 20,
      freeTime: 40,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'The Grocery Run',
        description: 'You\'re at the store. Basic groceries: $60. You see gourmet snacks for $25 and fancy drinks for $15. How do you categorize?',
        choices: [
          {
            id: 'basics-only',
            label: 'Buy basics only (Need: $60)',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Clean separation! $40 stays available for targets. Needs met, no drift.',
            },
          },
          {
            id: 'add-snacks',
            label: 'Basics + snacks (Need: $60, Want: $25)',
            outcome: {
              incomeChange: -25,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Honest labeling! You chose comfort deliberately. No guilt—but the $25 won\'t reach your target.',
            },
          },
          {
            id: 'call-it-need',
            label: 'Buy everything, call it all "groceries"',
            outcome: {
              incomeChange: -40,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Spending drift detected. By calling wants "needs," you hid $40 of discretionary spending from yourself.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Subscription Audit',
        description: 'You have 5 subscriptions totaling $75/month. Time to sort them.',
        choices: [
          {
            id: 'keep-all',
            label: 'Keep all—they\'re necessary',
            outcome: {
              incomeChange: -75,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Are they all necessary? Rarely. "Necessary" often means "I don\'t want to cancel." Honest labeling matters.',
            },
          },
          {
            id: 'sort-honestly',
            label: 'Sort: 2 needs, 2 wants, 1 target-blocker',
            outcome: {
              incomeChange: -45,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Clear categories! You kept what matters, identified what\'s comfort, and found one that actively hurt goals.',
            },
          },
          {
            id: 'cancel-most',
            label: 'Cancel all but true needs',
            outcome: {
              incomeChange: -20,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Aggressive cut! $55 now available for targets. But total deprivation often triggers rebound spending.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Friend Hangout',
        description: 'Friends invite you to dinner. It\'ll cost $50. Your target fund needs $100 more this month.',
        choices: [
          {
            id: 'skip-dinner',
            label: 'Skip it—target comes first',
            outcome: {
              incomeChange: 50,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Target protected! But isolation has costs too. Balance matters for sustainability.',
            },
          },
          {
            id: 'go-budget',
            label: 'Go but set a $25 limit',
            outcome: {
              incomeChange: 25,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart compromise! You honored the want, protected half for your target, and stayed connected.',
            },
          },
          {
            id: 'go-full',
            label: 'Go and enjoy fully',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Fun night! But your target timeline just extended. Wants aren\'t bad—just be honest about the tradeoff.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'Payday Decision',
        description: 'Payday arrives. You have $300. Needs: $150. No targets pre-assigned. What\'s your move?',
        choices: [
          {
            id: 'spend-then-save',
            label: 'Pay needs, spend freely, save what\'s left',
            outcome: {
              incomeChange: 20,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Leftover money is usually $0. Targets get funded last, which means rarely. This is the drift pattern.',
            },
          },
          {
            id: 'target-first',
            label: 'Pay needs, fund target, then spend remainder',
            outcome: {
              incomeChange: 100,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Target-first thinking! Needs: $150. Target: $100. Wants: $50. Everything has a job. Progress guaranteed.',
            },
          },
          {
            id: 'all-needs',
            label: 'Call everything a "need" for now',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Mislabeling creates invisible leaks. When everything is a need, nothing is prioritized.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 400,
      maxFatigue: 45,
    },
  },

  miniReflection: {
    question: 'Which expense was hardest to label honestly, and why?',
    followUp: 'What made you want to call it something different?',
  },

  quiz: [
    {
      question: 'Why do goals stall when wants are treated like needs?',
      options: [
        'Income is too low',
        'Money leaks before targets are funded',
        'Wants are unnecessary',
        'Saving is impossible',
      ],
      correctIndex: 1,
      explanation: 'When wants are mislabeled as needs, they get funded first—leaving nothing for intentional goals.',
    },
    {
      question: 'What makes targets different from wants?',
      options: [
        'Targets feel boring',
        'Targets are more expensive',
        'Targets support specific goals',
        'Targets are mandatory',
      ],
      correctIndex: 2,
      explanation: 'Targets are directly tied to outcomes you\'ve decided matter. Wants provide comfort but don\'t advance goals.',
    },
    {
      question: 'Intentional spending means:',
      options: [
        'Spending less',
        'Avoiding wants',
        'Assigning money before spending',
        'Following strict rules',
      ],
      correctIndex: 2,
      explanation: 'Intentional spending gives every dollar a job before temptation arrives, reducing decision fatigue.',
    },
  ],

  powerMove: 'If money is not assigned a purpose, it will choose comfort by default.',

  realLifeAction: 'Label your next purchase as a need, want, or target before you pay.',
};
