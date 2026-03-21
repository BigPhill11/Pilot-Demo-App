import { Lesson } from '@/types/personal-finance';

export const lesson5WhenToIncreaseSavings: Lesson = {
  id: 'when-to-increase-savings',
  title: 'When to Increase Savings and When to Pause',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains how saving needs change as life changes and why increasing savings too early or too aggressively can backfire. You learn how to recognize when to push saving harder, when to hold steady, and when pausing is the smarter move to protect stability and momentum.

Completion unlocks adaptive saving strategies and progression triggers for later modules.`,

  realityHook: `You decide to save more because it feels like the responsible move.
Your account balance grows, but daily life feels tighter.

Bills feel heavier. Small expenses feel stressful. You start dipping back into savings just to stay afloat. The problem was not saving itself. The problem was saving at the wrong time or in the wrong way.

This raises an important question.
How do you know when saving more is helping and when it is quietly hurting?`,

  outcomePreview: 'Mastering this lesson unlocks adaptive saving controls and progression-based saving increases.',

  microLesson: `Saving is not a one-direction decision. There are moments when increasing savings accelerates progress, and moments when holding steady or pausing protects stability. Treating saving as something that must always increase can create pressure that undermines the entire system.

The right time to increase savings is when your core expenses feel manageable and your emergency fund covers common disruptions. At this stage, extra savings do not create stress because the basics are already protected. Increasing savings then strengthens flexibility and speeds future options without destabilizing daily life.

There are also times when saving more is not the best move. During income changes, rising fixed costs, or unstable periods, forcing higher savings can lead to burnout, anxiety, or repeated withdrawals. These withdrawals break confidence and weaken the habit. Pausing or holding steady preserves consistency, which matters more than temporary increases.

Smart saving adjusts to reality. Progress comes from matching saving intensity to your current capacity, not from pushing blindly. Long-term success depends on staying in motion without snapping the system under pressure.

Saving is strongest when it responds to conditions instead of ignoring them.`,

  flashcards: [
    {
      term: 'Saving Capacity',
      definition: 'Saving capacity is the amount of money you can save consistently without creating stress or instability. It changes as income, expenses, and responsibilities shift.',
      philsAnalogy: 'The weight you can lift repeatedly, not once.',
    },
    {
      term: 'Savings Increase Trigger',
      definition: 'A savings increase trigger is a signal that it is safe to raise your saving amount, such as higher income or reduced expenses. Triggers prevent random or emotional changes.',
      philsAnalogy: 'A green light, not a guess.',
    },
    {
      term: 'Hold-Steady Phase',
      definition: 'A hold-steady phase is a period where maintaining current savings is more effective than increasing it. This phase protects consistency during transitions or uncertainty.',
      philsAnalogy: 'Cruising speed instead of accelerating.',
    },
    {
      term: 'Savings Pause',
      definition: 'A savings pause is a temporary stop or reduction in saving to stabilize cash flow or recover from disruption. It is strategic, not a failure.',
      philsAnalogy: 'Letting the engine cool so it keeps running.',
    },
    {
      term: 'Withdrawal Cycle',
      definition: 'A withdrawal cycle occurs when saving too aggressively forces repeated use of savings for normal expenses. This undermines confidence and habit strength.',
      philsAnalogy: 'Filling and emptying the same bucket.',
    },
  ],

  simulatorGame: {
    title: 'Adaptive Savings Planner',
    description: 'Learn how adjusting savings at the right time preserves progress.',
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
        title: 'The Good Month',
        description: 'Things are stable. Bills are paid, emergency fund is healthy, and you have $100 extra after expenses. Your current saving rule is $50/month.',
        choices: [
          {
            id: 'increase-savings',
            label: 'Increase savings to $100/month',
            outcome: {
              incomeChange: 50,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Good timing. You increased savings when capacity was high. This accelerates progress without stress.',
            },
          },
          {
            id: 'keep-same',
            label: 'Keep savings at $50, enjoy the extra',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Not wrong, but a missed opportunity. Lifestyle inflation often absorbs extra money quietly.',
            },
          },
          {
            id: 'aggressive-increase',
            label: 'Jump to $150/month to accelerate',
            outcome: {
              incomeChange: 100,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Ambitious. But if next month is different, you may need to withdraw. Aggressive increases can backfire.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Tight Month',
        description: 'Expenses rose unexpectedly. Your $100/month saving rule now feels painful. You are tempted to dip into savings just to make it through.',
        choices: [
          {
            id: 'reduce-temporarily',
            label: 'Reduce savings to $50 for one month',
            outcome: {
              incomeChange: -50,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart adaptation. You protected cash flow without breaking the habit entirely. Resume when stable.',
            },
          },
          {
            id: 'push-through',
            label: 'Push through and save $100 anyway',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You saved, but stress spiked. If this repeats, you will burn out or start withdrawing repeatedly.',
            },
          },
          {
            id: 'pause-completely',
            label: 'Pause saving entirely this month',
            outcome: {
              incomeChange: -100,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The pause helped short-term, but zero momentum is hard to restart. Small amounts beat full stops.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Withdrawal Trap',
        description: 'You kept your aggressive saving rule through two tight months. Now you have withdrawn from savings three times to cover regular bills.',
        choices: [
          {
            id: 'recognize-pattern',
            label: 'Recognize the pattern and reduce saving',
            outcome: {
              incomeChange: 0,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You spotted the withdrawal cycle. Reducing now protects the habit. Consistency beats intensity.',
            },
          },
          {
            id: 'blame-expenses',
            label: 'Blame expenses and keep trying',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'The pattern continues. Blame does not fix a mismatched system. Adaptation does.',
            },
          },
          {
            id: 'give-up',
            label: 'Give up on saving for now',
            outcome: {
              incomeChange: -100,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You stopped entirely. The habit is broken. Starting again will be harder than adjusting would have been.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Income Increase',
        description: 'You get a raise—$300 more per month. Your current saving is $50. What do you do?',
        choices: [
          {
            id: 'capture-half',
            label: 'Increase savings by $150 (half the raise)',
            outcome: {
              incomeChange: 150,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Perfect trigger. You captured growth before lifestyle inflation and still improved quality of life.',
            },
          },
          {
            id: 'keep-same-enjoy',
            label: 'Keep savings at $50, enjoy the full raise',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Lifestyle expanded. In six months, the raise will feel normal and saving will seem harder than ever.',
            },
          },
          {
            id: 'save-entire-raise',
            label: 'Save the entire $300 raise',
            outcome: {
              incomeChange: 300,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Maximum acceleration. But be careful—extreme moves can create pressure if life shifts again.',
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
    question: 'When has pushing yourself too hard financially made things harder instead of better?',
  },

  quiz: [
    {
      question: 'Increasing savings works best when:',
      options: [
        'Income feels tight',
        'Emergencies are covered and cash flow is stable',
        'Motivation is high',
        'Expenses are rising',
      ],
      correctIndex: 1,
      explanation: 'The best time to increase savings is when your foundation is secure and extra savings will not create stress.',
    },
    {
      question: 'A savings pause is:',
      options: [
        'A failure',
        'Permanent',
        'Strategic during instability',
        'Avoidable always',
      ],
      correctIndex: 2,
      explanation: 'A savings pause is a strategic choice to protect cash flow during difficult periods, not a sign of failure.',
    },
    {
      question: 'Why are withdrawal cycles harmful?',
      options: [
        'They reduce interest',
        'They break consistency and confidence',
        'They increase taxes',
        'They lower income',
      ],
      correctIndex: 1,
      explanation: 'Repeatedly withdrawing savings undermines the habit and erodes confidence in your ability to save.',
    },
    {
      question: 'Saving capacity depends on:',
      options: [
        'Discipline only',
        'Income alone',
        'Current life conditions',
        'Bank rules',
      ],
      correctIndex: 2,
      explanation: 'Saving capacity is determined by your current income, expenses, obligations, and stability—not just willpower.',
    },
  ],

  powerMove: 'Adjust savings based on reality, not pressure. Progress comes from staying consistent through change, not from forcing growth at the wrong time.',

  realLifeAction: 'Review your current saving rule and ask whether it feels sustainable for the next two months. If life feels stable, plan a small increase tied to a clear trigger. If life feels tight, hold steady or reduce temporarily with the intention to resume when conditions improve.',
};



