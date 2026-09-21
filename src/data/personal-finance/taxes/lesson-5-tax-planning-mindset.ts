import { Lesson } from '@/types/personal-finance';

export const lesson5TaxPlanningMindset: Lesson = {
  id: 'tax-planning-mindset',
  title: 'Tax Planning Mindset and Long-Term Impact',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains tax planning as a long-term mindset, not a one time task. You learn how small planning decisions compound over time and why early awareness creates lasting advantages.',
  realityHook: 'You earn more money over time and feel successful, but taxes take a larger share each year. Another person earns a similar amount but keeps more because they plan ahead. The difference is not income level. The difference is long-term tax awareness.',
  outcomePreview: 'You will understand that taxes affect long-term outcomes, planning works better than reacting, small decisions compound, and awareness protects growth.',
  microLesson: `Tax planning is the habit of thinking ahead about how decisions affect taxes. It is not about avoiding taxes. It is about reducing unnecessary impact while following the rules.

Small decisions made early create large differences later. Choosing how income is earned, where money is saved, and when assets are sold all affect long-term results. These choices compound just like investments do.

People who ignore taxes often react under pressure. People who plan stay calm and flexible. Planning turns taxes from a surprise into a known cost.

A tax aware mindset protects growth over time. Understanding taxes helps you keep more of what you build and use money more intentionally.

One thing that trips people up: tax brackets do not tax your whole paycheck at one rate. The system is progressive, meaning your income is taxed in stacked layers, and each layer has its own rate. Only the slice of income inside a higher bracket gets taxed at that bracket's rate; every dollar below it stays taxed at the lower rates it already passed through. That is why a raise or a good year never lowers your take-home pay, even though people sometimes worry a raise will "push them into a higher bracket" and cost them money overall.`,
  flashcards: [
    { term: 'Tax Planning', definition: 'Tax planning is the ongoing process of arranging finances to reduce tax impact legally. Planning focuses on structure, timing, and awareness.', philsAnalogy: 'Choosing savings and investment options with tax benefits before income increases.' },
    { term: 'Effective Tax Rate', definition: 'The effective tax rate is the percentage of total income paid in taxes. This rate reflects real tax impact.', philsAnalogy: 'Paying less overall tax because of smart deductions and account choices.' },
    { term: 'Tax Bracket', definition: 'A tax bracket is a range of income taxed at a specific rate under a progressive system. Higher brackets apply only to the income earned within that range, not to all income.', philsAnalogy: 'Filling stacked cups with water: once the bottom cup is full, extra water spills into the next cup at a new rate, but the water already in the bottom cup stays right where it is.' },
    { term: 'Timing Strategy', definition: 'A timing strategy involves choosing when income is received or assets are sold to manage taxes. Timing affects how much tax is owed.', philsAnalogy: 'Holding investments longer to reduce taxes on gains.' },
    { term: 'Long-Term Impact', definition: 'Long-term impact describes how decisions affect outcomes over many years. Small differences grow larger over time.', philsAnalogy: 'Early tax planning leading to much higher after-tax savings years later.' },
    { term: 'Tax Awareness', definition: 'Tax awareness is understanding how taxes affect financial decisions. Awareness reduces mistakes and stress.', philsAnalogy: 'Knowing how a raise changes take-home pay before spending it.' }
  ],
  simulatorGame: {
    title: 'Plan or React',
    description: 'Earn income over multiple years and face changing tax rules and choices.',
    initialState: { weeklyIncome: 1500, hourlyWage: 37, workHours: 40, fatigue: 20, freeTime: 30, skillLevel: 50 },
    scenarios: [
      {
        id: 'annual-review',
        title: 'Year-End Tax Review',
        description: 'The year is ending. How do you approach taxes?',
        choices: [
          { id: 'proactive-plan', label: 'Review strategy and optimize', outcome: { incomeChange: 500, fatigueChange: 5, freeTimeChange: -5, skillChange: 20, feedback: 'Excellent! Your proactive approach found savings and set you up for next year.' } },
          { id: 'basic-filing', label: 'Just file when required', outcome: { incomeChange: 0, fatigueChange: 0, freeTimeChange: 0, skillChange: 0, feedback: 'You met requirements but missed optimization opportunities.' } },
          { id: 'ignore-until-april', label: 'Ignore until deadline', outcome: { incomeChange: -200, fatigueChange: 15, freeTimeChange: -10, skillChange: -10, feedback: 'Rushing led to stress and missed deductions.' } }
        ]
      }
    ],
    winCondition: { minIncome: 800, maxFatigue: 60 }
  },
  miniReflection: { question: 'How would thinking about taxes earlier change your future choices?', followUp: 'Write one future decision where tax planning could change the outcome.' },
  quiz: [
    { question: 'Tax planning focuses on:', options: ['Legal structure', 'Breaking rules', 'Avoiding income', 'Guessing rates'], correctIndex: 0, explanation: 'Tax planning uses legal structures to minimize tax impact.' },
    { question: 'Effective tax rate matters because:', options: ['It looks impressive', 'It predicts markets', 'It removes taxes', 'It shows real cost'], correctIndex: 3, explanation: 'Effective tax rate shows what you actually pay as a percentage.' },
    { question: 'Timing strategies help because:', options: ['Markets change', 'Taxes apply at moments', 'Income disappears', 'Accounts close'], correctIndex: 1, explanation: 'When you take actions affects the tax consequences.' },
    { question: 'Long-term impact grows because:', options: ['Time compounds decisions', 'Income rises', 'Taxes vanish', 'Spending stops'], correctIndex: 0, explanation: 'Small decisions compound into big differences over time.' },
    { question: 'Tax awareness helps by:', options: ['Increasing fear', 'Reducing planning', 'Improving decisions', 'Eliminating work'], correctIndex: 2, explanation: 'Understanding taxes leads to better financial decisions.' },
    { question: 'You are offered a raise that would put part of your income into a higher tax bracket. What actually happens to your take-home pay?', options: ['It goes up, because only the new, higher slice of income is taxed at the higher rate', 'It goes down, because your whole paycheck jumps to the higher rate', 'It stays exactly the same no matter what', 'It goes up first, then drops back down at year-end'], correctIndex: 0, explanation: 'Brackets are progressive: only the income inside the new bracket is taxed at the higher rate. The income below it keeps its lower rate, so take-home pay always rises with a raise.' }
  ],
  powerMove: 'Write one future decision where tax planning could change the outcome.',
  realLifeAction: 'Ask an adult how planning ahead helped them keep more of their income.'
};
