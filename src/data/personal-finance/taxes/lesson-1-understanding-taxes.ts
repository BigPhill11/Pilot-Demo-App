import { Lesson } from '@/types/personal-finance';

export const lesson1UnderstandingTaxes: Lesson = {
  id: 'understanding-taxes',
  title: 'Understanding Taxes and Why They Exist',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains what taxes are and why they exist. You learn how taxes affect income, spending, and investing, and why understanding taxes helps you keep more of what you earn legally.',
  realityHook: 'You earn money from a job or side hustle and notice part of it disappears before you receive it. You worked the same hours, but your paycheck feels smaller than expected. That missing portion is taxes, and understanding them changes how you plan money decisions.',
  outcomePreview: 'You will understand that taxes fund public systems, taxes reduce take home pay, different income types face different taxes, and awareness improves planning.',
  microLesson: `Taxes are required payments collected by governments to fund shared services. These services include schools, roads, public safety, and national programs. Taxes support systems that individuals cannot easily fund alone.

Taxes reduce how much money you keep from income. The number you earn is not the number you take home. Planning without considering taxes leads to surprises and poor decisions.

Not all money is taxed the same way. Income from jobs, investments, and businesses can face different tax rules. Understanding these differences helps you choose smarter ways to earn and save.

Taxes are not punishment. Taxes are a cost of participating in an organized economy. People who understand taxes plan better and protect more of their progress.`,
  flashcards: [
    {
      term: 'Tax',
      definition: 'A tax is a required payment to a government used to fund public services and programs. Taxes apply to income, purchases, and ownership.',
      philsAnalogy: 'A tax is like everyone on the team chipping in for the same field, refs, and lights. No single player could pay for all of it, so everyone puts in a share to keep the game running for everybody.'
    },
    {
      term: 'Income Tax',
      definition: 'Income tax is a tax placed on money earned from work, businesses, or investments. Income tax reduces take home pay.',
      philsAnalogy: 'Income tax is like the school taking a cut of every fundraiser you run. Sell candy, wash cars, or DJ a party, and a set share still goes to the front office. Where the money came from changes, but the cut still comes out.'
    },
    {
      term: 'Take Home Pay',
      definition: 'Take home pay is the money you receive after taxes and deductions. Take home pay determines spending ability.',
      philsAnalogy: 'Take-home pay is the slice of pizza left after everyone at the table grabs theirs first. Your check says one number, but what actually lands on your plate is what is left after taxes come out.'
    },
    {
      term: 'Public Services',
      definition: 'Public services are programs funded by taxes that benefit society as a whole. These services support daily life and safety.',
      philsAnalogy: 'Public services are like the shared Wi-Fi at the rec center. Nobody there paid for the whole router, but everyone\'s small share keeps it on for all of them.'
    },
    {
      term: 'Tax Planning',
      definition: 'Tax planning is arranging finances in legal ways to reduce tax impact. Planning focuses on timing, structure, and awareness.',
      philsAnalogy: 'Tax planning is like knowing the dress code before you get dressed. You follow the rules on purpose so you never get sent home, and you keep more of what is yours the legal way.'
    }
  ],
  simulatorGame: {
    title: 'Where Did It Go',
    description: 'Earn income from different sources and see how taxes are applied before you can spend.',
    initialState: { weeklyIncome: 1000, hourlyWage: 25, workHours: 40, fatigue: 20, freeTime: 30, skillLevel: 50 },
    scenarios: [
      {
        id: 'first-paycheck',
        title: 'Your First Paycheck',
        description: 'You earned $1,000 gross pay. How do you plan your spending?',
        choices: [
          { id: 'plan-net', label: 'Plan based on take-home pay (~$750)', outcome: { incomeChange: 0, fatigueChange: -5, freeTimeChange: 0, skillChange: 15, feedback: 'Smart! You accounted for taxes and avoided overspending.' } },
          { id: 'plan-gross', label: 'Plan based on $1,000 gross', outcome: { incomeChange: -100, fatigueChange: 10, freeTimeChange: -5, skillChange: -10, feedback: 'You overspent because you forgot about taxes taken out.' } },
          { id: 'dont-plan', label: 'Spend without planning', outcome: { incomeChange: -200, fatigueChange: 15, freeTimeChange: -10, skillChange: -15, feedback: 'No plan led to stress when money ran out before month end.' } }
        ]
      }
    ],
    winCondition: { minIncome: 600, maxFatigue: 60 }
  },
  miniReflection: {
    question: 'How would your choices change if you planned using take-home pay instead of gross income?',
    followUp: 'Review a sample paycheck and identify where taxes reduce earnings.'
  },
  quiz: [
    { question: 'Taxes reduce income because:', options: ['Governments waste money', 'Services need funding', 'Earnings disappear', 'Markets fail'], correctIndex: 1, explanation: 'Taxes fund public services that benefit everyone.' },
    { question: 'Income tax applies to:', options: ['Only purchases', 'Only investments', 'Gifts only', 'Money earned'], correctIndex: 3, explanation: 'Income tax is charged on money you earn from various sources.' },
    { question: 'Understanding taxes helps because:', options: ['It removes taxes', 'It improves planning', 'It increases income', 'It avoids work'], correctIndex: 1, explanation: 'Understanding taxes helps you plan better and avoid surprises.' },
    { question: 'Public services are funded by:', options: ['Taxes', 'Donations', 'Businesses only', 'Banks'], correctIndex: 0, explanation: 'Taxes are the primary funding source for public services.' },
    { question: 'Tax planning focuses on:', options: ['Breaking rules', 'Avoiding income', 'Legal reduction', 'Spending less'], correctIndex: 2, explanation: 'Tax planning uses legal strategies to reduce tax impact.' }
  ],
  powerMove: 'Review a sample paycheck and identify where taxes reduce earnings.',
  realLifeAction: 'Ask an adult to explain one tax they pay and what service it supports.'
};
