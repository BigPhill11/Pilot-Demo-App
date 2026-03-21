import { Lesson } from '@/types/personal-finance';

export const lesson5BuildingCreditResponsibly: Lesson = {
  id: 'credit-debt-5',
  title: 'Building Credit Responsibly Over Time',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains how to build credit responsibly and keep it strong long term. You learn simple rules that protect your score and increase access as life changes.',
  realityHook: 'You need approval for housing, transportation, or a future opportunity. One path leads to low costs and easy approval. Another path leads to deposits, higher rates, or rejection. The difference comes from how credit was built over time, not from last-minute effort.',
  outcomePreview: 'Credit builds through consistency • Small habits protect scores • Time strengthens results • Discipline lowers future costs',
  microLesson: `Credit grows through repeated reliable behavior. Paying on time, keeping balances low, and avoiding unnecessary applications build trust steadily. There is no shortcut that replaces time and consistency.

Responsible credit use focuses on control, not spending. Using a small portion of available credit shows discipline. Paying balances regularly prevents interest from erasing progress.

Time strengthens credit because history matters. Older accounts show long-term reliability. Closing accounts too quickly or constantly opening new ones resets progress and adds risk.

Strong credit reduces stress later. Lower interest, easier approval, and more options come from habits built early and maintained consistently.`,
  flashcards: [
    {
      term: 'Credit Building',
      definition: 'Credit building is the process of improving credit through consistent responsible behavior over time. Building focuses on habits rather than quick fixes.',
      philsAnalogy: 'Using a card lightly and paying the balance every month.',
    },
    {
      term: 'On-Time Payment',
      definition: 'An on-time payment is a payment made by the due date. On-time payments protect and improve credit scores.',
      philsAnalogy: 'Scheduling automatic payments before deadlines.',
    },
    {
      term: 'Credit Limit',
      definition: 'A credit limit is the maximum amount you can borrow on an account. Limits affect utilization and risk signals.',
      philsAnalogy: 'Having a limit much higher than monthly spending.',
    },
    {
      term: 'Account Age',
      definition: 'Account age measures how long credit accounts have been open. Longer history supports stronger scores.',
      philsAnalogy: 'Keeping an early account open even with low usage.',
    },
    {
      term: 'Responsible Use',
      definition: 'Responsible use means borrowing small amounts and repaying them consistently. Responsible use builds trust.',
      philsAnalogy: 'Charging a small recurring bill and paying it off monthly.',
    },
  ],
  simulatorGame: {
    title: 'Build the Trust',
    description: 'You manage one credit account over many months while opportunities appear.',
    initialState: {
      weeklyIncome: 600,
      hourlyWage: 18,
      workHours: 33,
      fatigue: 15,
      freeTime: 45,
      skillLevel: 65,
    },
    scenarios: [
      {
        id: 'first-year-habits',
        title: 'First Year Strategy',
        description: 'You just got your first credit card. How do you use it for the first year?',
        choices: [
          {
            id: 'small-recurring',
            label: 'Set up one small recurring bill and autopay',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 10,
              skillChange: 25,
              feedback: 'Perfect strategy. Low utilization, guaranteed on-time payments, building history automatically.',
            },
          },
          {
            id: 'regular-spending',
            label: 'Use it for all purchases and pay monthly',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Good if you pay in full, but higher utilization and more room for missed payments.',
            },
          },
          {
            id: 'dont-use',
            label: 'Get the card but never use it',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Account open but no activity reported. Credit builds very slowly without usage.',
            },
          },
        ],
      },
      {
        id: 'account-closure',
        title: 'Old Account Decision',
        description: 'Your oldest credit card has an annual fee. Should you close it?',
        choices: [
          {
            id: 'keep-old-account',
            label: 'Keep it open and pay the fee',
            outcome: {
              incomeChange: -10,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 20,
              feedback: 'Account age preserved. This history supports your score for years to come.',
            },
          },
          {
            id: 'downgrade-account',
            label: 'Call and ask to downgrade to no-fee version',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: -5,
              skillChange: 25,
              feedback: 'Smart move! History preserved, fee eliminated. Best of both worlds.',
            },
          },
          {
            id: 'close-account',
            label: 'Close the account to avoid the fee',
            outcome: {
              incomeChange: 10,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: -15,
              feedback: 'Fee saved but oldest account closed. Average account age drops, score may decline.',
            },
          },
        ],
      },
      {
        id: 'credit-limit-increase',
        title: 'Credit Limit Opportunity',
        description: 'Your bank offers to increase your limit from $1,000 to $3,000. Do you accept?',
        choices: [
          {
            id: 'accept-increase',
            label: 'Accept the increase but keep spending the same',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 20,
              feedback: 'Utilization drops from 30% to 10% with same spending. Score improves without behavior change.',
            },
          },
          {
            id: 'accept-spend-more',
            label: 'Accept and increase your spending',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: -10,
              feedback: 'More credit becomes more debt. Utilization stays high or increases. No benefit gained.',
            },
          },
          {
            id: 'decline-increase',
            label: 'Decline the increase',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'No change. Opportunity to lower utilization missed, but no risk added either.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 590,
      maxFatigue: 40,
    },
  },
  miniReflection: {
    question: 'Which habit would be easiest to maintain consistently?',
    followUp: 'How would strong credit change your options in five years?',
  },
  quiz: [
    {
      question: 'Responsible credit use means:',
      options: ['Spending often', 'Borrowing maximum amounts', 'Paying late occasionally', 'Using credit lightly'],
      correctIndex: 3,
      explanation: 'Responsible credit use means using credit lightly and repaying consistently.',
    },
    {
      question: 'Keeping balances low helps because:',
      options: ['Utilization decreases', 'Interest increases', 'Limits shrink', 'Scores freeze'],
      correctIndex: 0,
      explanation: 'Keeping balances low helps because it decreases utilization, which improves credit scores.',
    },
    {
      question: 'Closing old accounts can hurt because:',
      options: ['Fees increase', 'History shortens', 'Limits disappear', 'Payments reset'],
      correctIndex: 1,
      explanation: 'Closing old accounts can hurt because it shortens your credit history.',
    },
    {
      question: 'Automatic payments help by:',
      options: ['Removing deadlines', 'Increasing spending', 'Raising limits', 'Preventing missed payments'],
      correctIndex: 3,
      explanation: 'Automatic payments help by preventing missed payments, which protects your credit score.',
    },
    {
      question: 'Building credit works best when you:',
      options: ['Rush decisions', 'Chase rewards', 'Follow simple rules', 'Avoid planning'],
      correctIndex: 2,
      explanation: 'Building credit works best when you follow simple rules consistently over time.',
    },
  ],
  powerMove: 'Set automatic payments for every account you are responsible for.',
  realLifeAction: 'Identify one habit that would most improve your credit over the next year.',
};
