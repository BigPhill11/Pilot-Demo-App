import { Lesson } from '@/types/personal-finance';

export const lesson1UnderstandingTaxes: Lesson = {
  id: 'understanding-taxes',
  title: 'Understanding Taxes and Why They Exist',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains what taxes are and why they exist. You learn how taxes affect income, spending, and investing, and why understanding taxes helps you keep more of what you earn legally.',
  realityHook: "You land your first job at the rec center, $12 an hour, 15 hours a week, so you expect $180 in your account Friday. When the deposit hits, it's $152. Nobody shorted you; taxes did their job before the money ever reached your phone. Understanding taxes changes how you read every paycheck after this one.",
  outcomePreview: 'You will understand that taxes fund public systems, taxes reduce take home pay, different income types face different taxes, and awareness improves planning.',
  microLesson: `Taxes are required payments collected by governments to fund shared services. These services include schools, roads, public safety, and national programs. Taxes support systems that individuals cannot easily fund alone.

Taxes reduce how much money you keep from income. The number you earn is not the number you take home. Planning without considering taxes leads to surprises and poor decisions.

Not all money is taxed the same way. Income from jobs, investments, and businesses can face different tax rules. Understanding these differences helps you choose smarter ways to earn and save.

Taxes are not punishment. Taxes are a cost of participating in an organized economy. People who understand taxes plan better and protect more of their progress.`,
  flashcards: [
    {
      term: 'Tax',
      definition: 'A tax is a required payment to a government used to fund public services and programs. Taxes apply to income, purchases, and ownership.',
      philsAnalogy: 'A tax is like everyone chipping in for a cookout. You pay in so the whole thing happens, and the food, the space, and the cleanup are covered even for the parts you personally never touch.'
    },
    {
      term: 'Income Tax',
      definition: 'Income tax is a tax placed on money earned from work, businesses, or investments. Income tax reduces take home pay.',
      philsAnalogy: 'Income tax is a slice taken off the top of the money you earn before it ever reaches your hand. You earned the whole amount, but part is removed on the way to you.'
    },
    {
      term: 'Take Home Pay',
      definition: 'Take home pay is the money you receive after taxes and deductions. Take home pay determines spending ability.',
      philsAnalogy: 'Take home pay is the final score, not the halftime score. Gross pay is the number at the break; take home is what is on the board after taxes and deductions finish coming out.'
    },
    {
      term: 'Public Services',
      definition: 'Public services are programs funded by taxes that benefit society as a whole. These services support daily life and safety.',
      philsAnalogy: 'Public services are like the lights and Wi-Fi at the rec center. Everyone chips in through taxes so they are on and working the moment any one person needs them.'
    },
    {
      term: 'Tax Planning',
      definition: 'Tax planning is arranging finances in legal ways to reduce tax impact. Planning focuses on timing, structure, and awareness.',
      philsAnalogy: 'Tax planning is like knowing which routes have tolls before you leave. Same destination, all legal, but paying attention to the rules keeps more money in your pocket.'
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
    { question: "Your check comes in $28 lower than the $180 you expected. What's the most accurate reason?", options: ['The rec center miscounted your hours', 'Part of your pay funds public services before it reaches you', 'You worked fewer hours than scheduled', 'Direct deposit fees ate the difference'], correctIndex: 1, explanation: 'Taxes are withheld before the money reaches you, which is why gross pay and take-home pay are different numbers.' },
    { question: "You tutor a neighbor's kid for cash and also get a paycheck from your retail job. Which one does income tax apply to?", options: ['Only the paycheck', 'Only the tutoring cash', 'Both, any way you earn money', "Neither, since you're a minor"], correctIndex: 2, explanation: 'Income tax applies to money you earn, no matter the source, including cash from tutoring or side work.' },
    { question: "Before you take a job offer of '$15/hour,' knowing about taxes helps you:", options: ['Negotiate a tax-free deal', 'Estimate what will actually land in your account', 'Avoid paying taxes legally', 'Get paid in cash instead'], correctIndex: 1, explanation: 'Understanding taxes lets you plan around take-home pay instead of being surprised by it.' },
    { question: 'Your rec center stays open, the streetlights work, and your school has textbooks. Who mostly pays for that?', options: ['Local businesses donate it all', 'Everyone who pays taxes, including working teens', 'The federal government prints the money for it', 'Ticket sales from games'], correctIndex: 1, explanation: 'Public services are funded by taxes paid by individuals and businesses, including part-time workers.' },
    { question: "You start a small resale side hustle. What's the smartest tax move before you spend the profit?", options: ['Ignore it until next year', 'Set some aside and learn the legal ways to reduce what you owe', 'Ask a friend to hold the cash', 'Report only half the income'], correctIndex: 1, explanation: 'Tax planning means legally preparing for and reducing what you owe, not avoiding or hiding income.' }
  ],
  powerMove: 'Review a sample paycheck and identify where taxes reduce earnings.',
  realLifeAction: 'Ask an adult to explain one tax they pay and what service it supports.'
};
