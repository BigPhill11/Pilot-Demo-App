import { Lesson } from '@/types/personal-finance';

export const lesson3AutomatingAndMaintainingSavings: Lesson = {
  id: 'automating-and-maintaining-savings',
  title: 'Automating and Maintaining Savings',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson explains how saving becomes reliable only when it runs automatically and how maintenance prevents savings from quietly disappearing over time. You learn how automation removes friction, why consistency matters more than intensity, and how to protect savings habits as life changes.

Completion unlocks long-term saving stability and system durability upgrades.`,

  realityHook: `You start saving with good intentions.
You tell yourself you will transfer money later.

A busy week passes. Then another.
You forget once. Then again.

Nothing went wrong, but nothing grew either. The problem was not discipline. The problem was relying on memory and motivation to do repetitive work.

This raises a question.
Should saving depend on willpower, or should it run without asking you every time?`,

  outcomePreview: 'Mastering this lesson unlocks saving automation, habit protection, and long-term consistency mechanics.',

  microLesson: `Saving works best when it requires as little effort as possible. Any system that depends on remembering, deciding, or feeling motivated will eventually fail, especially when life becomes busy or stressful. Automation removes these weak points by making saving happen without ongoing input.

Automating savings means setting up a process where money moves on a schedule or trigger you choose, such as every paycheck or once a week. The amount does not need to be large to be effective. What matters is that the action happens consistently, regardless of mood, timing, or distractions.

Maintenance matters because life does not stay the same. Expenses shift, income changes, and priorities evolve. A saving system that is never reviewed can slowly break without you noticing. Maintenance is not about constant tweaking. It is about occasional check-ins to confirm the system still fits your situation.

People often stop saving not because they chose to, but because friction returned. Transfers became manual. Accounts were hard to access. The system relied on effort again. Automation protects against this by keeping saving in motion even when attention is elsewhere.

Strong saving habits feel boring. That is a sign the system is working. When saving runs quietly in the background, your energy stays focused on higher-level decisions instead of routine ones.`,

  flashcards: [
    {
      term: 'Automation',
      definition: 'Automation is the process of setting up saving so money moves without requiring repeated decisions or reminders. It reduces friction and removes reliance on motivation, making saving more reliable over time.',
      philsAnalogy: 'Putting savings on autopilot instead of steering every mile.',
    },
    {
      term: 'Trigger-Based Saving',
      definition: 'Trigger-based saving occurs when money is saved automatically in response to a specific event, such as receiving a paycheck. This ties saving directly to income instead of leftover cash.',
      philsAnalogy: 'A door that closes automatically when you leave.',
    },
    {
      term: 'Friction',
      definition: 'Friction refers to any obstacle that makes saving harder to do, such as manual transfers, complicated apps, or unclear rules. High friction increases the chance that saving stops.',
      philsAnalogy: 'Resistance that slows motion until it stops.',
    },
    {
      term: 'Maintenance',
      definition: 'Maintenance is the process of reviewing and adjusting your saving system as income, expenses, or goals change. It keeps the system functional rather than letting it quietly break.',
      philsAnalogy: 'Routine checkups that prevent breakdowns.',
    },
    {
      term: 'Consistency',
      definition: 'Consistency means saving regularly over time, even when amounts are small or conditions are imperfect. Long-term results come from repeated action, not occasional effort.',
      philsAnalogy: 'Stacking bricks instead of throwing stones.',
    },
  ],

  simulatorGame: {
    title: 'Savings System Builder',
    description: 'Design a saving system that continues working as conditions change.',
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
        title: 'Choose Your Method',
        description: 'You want to save $50 per paycheck. How will you make it happen?',
        choices: [
          {
            id: 'manual-transfer',
            label: 'Manual transfer after each paycheck',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'This works when you remember. But busy weeks, stress, and distractions will create gaps. Manual systems fail under pressure.',
            },
          },
          {
            id: 'auto-transfer',
            label: 'Automatic transfer on payday',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Set it once, forget it forever. The money moves before you see it, before you can spend it. This is how saving scales.',
            },
          },
          {
            id: 'round-up',
            label: 'Round-up app that saves spare change',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Low friction, low effort. Good supplemental saving, but not enough on its own for serious goals.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Busy Month',
        description: 'Work gets intense. You barely have time to eat, let alone manage finances. Three weeks pass.',
        choices: [
          {
            id: 'auto-worked',
            label: 'Check savings—automation kept running',
            outcome: {
              incomeChange: 50,
              fatigueChange: -20,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Three weeks of saving happened without you lifting a finger. This is the power of automation during chaos.',
            },
          },
          {
            id: 'manual-forgot',
            label: 'Check savings—forgot to transfer',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Three weeks of progress lost. Not because you decided against saving, but because the system required attention you did not have.',
            },
          },
          {
            id: 'mixed-results',
            label: 'Check savings—transferred once, missed twice',
            outcome: {
              incomeChange: 17,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Partial success. Better than nothing, but inconsistency reduces long-term impact. Systems should not depend on perfect weeks.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'Life Changes',
        description: 'Six months later, your income increases by $200/month. Your automated savings amount is still set at $50.',
        choices: [
          {
            id: 'increase-auto',
            label: 'Increase automated savings to $100',
            outcome: {
              incomeChange: 50,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Smart adjustment. You captured some of the raise before lifestyle inflation absorbed it. Maintenance keeps progress aligned with reality.',
            },
          },
          {
            id: 'keep-same',
            label: 'Keep savings at $50, spend the rest',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Saving continues but opportunity was missed. Extra income disappeared into spending without you noticing.',
            },
          },
          {
            id: 'pause-review',
            label: 'Pause savings to enjoy the raise first',
            outcome: {
              incomeChange: -50,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You paused for "a little while." Two months later, the raise is gone and saving feels harder than before.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Friction Test',
        description: 'Your bank app updates and makes transfers more complicated. Three extra steps now required.',
        choices: [
          {
            id: 'find-workaround',
            label: 'Find a simpler method or new account',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You identified friction and removed it. The system stays strong because you protected its simplicity.',
            },
          },
          {
            id: 'push-through',
            label: 'Push through the extra steps each time',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Effort works for a while. But every extra step increases the chance of quitting later. Friction accumulates.',
            },
          },
          {
            id: 'stop-saving',
            label: 'Stop saving until they fix the app',
            outcome: {
              incomeChange: -100,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Months pass. The app never gets easier. Your savings habit is now broken. Waiting for external fixes rarely works.',
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
    question: 'Where does friction show up most often in your saving habits right now?',
  },

  quiz: [
    {
      question: 'Automation helps saving because it:',
      options: [
        'Increases income',
        'Removes decision-making',
        'Raises interest rates',
        'Limits spending',
      ],
      correctIndex: 1,
      explanation: 'Automation removes the need to decide each time, eliminating opportunities for procrastination or forgetfulness.',
    },
    {
      question: 'Trigger-based saving works best when it is linked to:',
      options: [
        'Leftover money',
        'Monthly goals',
        'Income arrival',
        'Spending limits',
      ],
      correctIndex: 2,
      explanation: 'Linking saving to income arrival ensures money is saved before it can be spent.',
    },
    {
      question: 'Friction is dangerous because it:',
      options: [
        'Slows growth slightly',
        'Makes saving harder to repeat',
        'Lowers returns',
        'Increases taxes',
      ],
      correctIndex: 1,
      explanation: 'Friction makes each saving action harder, increasing the likelihood of abandoning the habit over time.',
    },
    {
      question: 'Why does maintenance matter?',
      options: [
        'Systems never change',
        'Life conditions stay fixed',
        'Saving systems can quietly fail',
        'Automation replaces review',
      ],
      correctIndex: 2,
      explanation: 'Without periodic review, saving systems can become misaligned with changing income, expenses, or goals.',
    },
  ],

  powerMove: 'Design your saving system to work on your worst weeks, not your best ones. If saving only succeeds when life is calm, it is not built to last.',

  realLifeAction: 'Set up one automated saving trigger tied directly to income, even if the amount is small. Schedule a monthly check-in to review whether the amount and timing still fit your life. Do not change the system unless your income or expenses have clearly shifted.',
};



