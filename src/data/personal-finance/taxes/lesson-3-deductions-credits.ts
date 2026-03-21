import { Lesson } from '@/types/personal-finance';

export const lesson3DeductionsCredits: Lesson = {
  id: 'deductions-credits',
  title: 'Deductions, Credits, and Keeping More Legally',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains how deductions and credits reduce taxes legally. You learn the difference between lowering taxable income and lowering taxes owed, and why understanding this keeps more money in your control.',
  realityHook: 'Two people earn the same amount of money in one year. One person pays much more in taxes than the other. The difference is not luck or cheating. The difference comes from understanding deductions, credits, and how the tax system rewards certain behaviors.',
  outcomePreview: 'You will understand that deductions reduce taxable income, credits reduce taxes owed, not all reductions work the same, and legal strategies matter.',
  microLesson: `Taxes are calculated in steps. First, the government looks at your income. Then deductions may reduce how much of that income gets taxed. Credits may reduce the final tax bill after it is calculated.

Deductions lower taxable income. This means part of your income is not taxed at all. The value of a deduction depends on your tax rate. Higher rates make deductions more valuable.

Credits reduce taxes directly. A credit lowers the final amount you owe dollar for dollar. Credits often reward behaviors like education, saving, or supporting family members.

Understanding the difference matters. People who confuse deductions and credits miss opportunities to reduce taxes legally. Knowledge allows planning instead of guessing.`,
  flashcards: [
    { term: 'Tax Deduction', definition: 'A tax deduction reduces the amount of income that is subject to tax. Deductions lower taxable income before taxes are calculated.', philsAnalogy: 'Reducing taxable income because of education or retirement contributions.' },
    { term: 'Tax Credit', definition: 'A tax credit reduces the total tax owed after it is calculated. Credits provide dollar for dollar reductions.', philsAnalogy: 'Receiving a credit that lowers taxes owed by a fixed amount.' },
    { term: 'Taxable Income', definition: 'Taxable income is the portion of income that is subject to tax after deductions. Taxable income determines the tax calculation.', philsAnalogy: 'Earning money but paying tax only on part of it.' },
    { term: 'Adjusted Gross Income', definition: 'Adjusted gross income is income after certain deductions are applied. Many tax benefits depend on this number.', philsAnalogy: 'A lower adjusted income unlocking additional credits.' },
    { term: 'Eligibility', definition: 'Eligibility determines who qualifies for deductions or credits. Rules control access to tax benefits.', philsAnalogy: 'Only students qualifying for certain education credits.' }
  ],
  simulatorGame: {
    title: 'Reduce the Bill',
    description: 'Earn income and qualify for different deductions and credits.',
    initialState: { weeklyIncome: 1200, hourlyWage: 30, workHours: 40, fatigue: 20, freeTime: 30, skillLevel: 50 },
    scenarios: [
      {
        id: 'deduction-vs-credit',
        title: 'Tax Reduction Choice',
        description: 'You can claim a $1,000 deduction OR a $200 credit. Your tax rate is 22%.',
        choices: [
          { id: 'take-credit', label: 'Take the $200 credit', outcome: { incomeChange: 200, fatigueChange: 0, freeTimeChange: 0, skillChange: 15, feedback: 'Smart! The credit saves you $200 directly, while the deduction only saves $220.' } },
          { id: 'take-deduction', label: 'Take the $1,000 deduction', outcome: { incomeChange: 220, fatigueChange: 0, freeTimeChange: 0, skillChange: 10, feedback: 'Good choice! At 22% rate, this saves $220 - slightly more than the credit.' } },
          { id: 'take-neither', label: 'Skip both - too complicated', outcome: { incomeChange: 0, fatigueChange: 5, freeTimeChange: 5, skillChange: -15, feedback: 'You left money on the table by not claiming either benefit.' } }
        ]
      }
    ],
    winCondition: { minIncome: 800, maxFatigue: 60 }
  },
  miniReflection: { question: 'Which reduction would help you the most as your income grows?', followUp: 'Look up one deduction or credit you might qualify for in the future.' },
  quiz: [
    { question: 'Deductions matter most when:', options: ['Tax rates are higher', 'Income is zero', 'Credits exist', 'Spending increases'], correctIndex: 0, explanation: 'Higher tax rates mean deductions save more money.' },
    { question: 'Credits are powerful because:', options: ['They reduce income', 'They change rates', 'They avoid filing', 'They reduce taxes directly'], correctIndex: 3, explanation: 'Credits reduce your tax bill dollar-for-dollar.' },
    { question: 'Taxable income determines:', options: ['Spending limits', 'Tax calculation', 'Credit amounts', 'Refund timing'], correctIndex: 1, explanation: 'Your tax bill is calculated based on taxable income.' },
    { question: 'Eligibility exists to:', options: ['Control access', 'Make taxes confusing', 'Increase penalties', 'Reduce income'], correctIndex: 0, explanation: 'Eligibility rules determine who qualifies for tax benefits.' },
    { question: 'Legal tax reduction focuses on:', options: ['Hiding income', 'Guessing rules', 'Using allowed benefits', 'Avoiding work'], correctIndex: 2, explanation: 'Legal tax reduction means using benefits the tax code allows.' }
  ],
  powerMove: 'Look up one deduction or credit you might qualify for in the future.',
  realLifeAction: 'Ask an adult how a deduction or credit helped them lower taxes.'
};
