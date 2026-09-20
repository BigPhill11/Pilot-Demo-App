import { Lesson } from '@/types/personal-finance';

export const lesson2IncomeTypesTaxation: Lesson = {
  id: 'income-types-taxation',
  title: 'How Different Income Types Get Taxed',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains how different types of income are taxed. You learn why wages, business income, and investment income face different rules, and how those rules affect planning.',
  realityHook: "You clock hours at your retail job, resell a pair of sneakers for profit on the side, and just put $50 into your first brokerage app. At tax time, each of those three dollars gets treated differently, even though it all spends the same at checkout. Knowing the difference now means fewer surprises later.",
  outcomePreview: 'You will understand that income types face different taxes, wages are taxed regularly, investment income follows special rules, and structure affects take home results.',
  microLesson: `Not all income is taxed the same way. Money earned from a job usually faces income tax and payroll taxes. These taxes come out automatically before you receive your paycheck.

Business and side hustle income work differently. Taxes are often not withheld automatically. This means you must plan ahead and set money aside. Failing to plan creates stress later.

Investment income follows its own rules. Some investments are taxed when you sell them. Some are taxed when they pay income. Timing matters, and holding longer often reduces tax impact.

Understanding income types helps you plan smarter. Structure affects how much you keep, not just how much you earn.`,
  flashcards: [
    { term: 'Wages', definition: 'Wages are income earned from working for an employer. Wages usually have taxes withheld automatically.', philsAnalogy: 'Receiving a paycheck with taxes already taken out.' },
    { term: 'Payroll Taxes', definition: 'Payroll taxes fund programs like social security and medicare. These taxes apply to earned income from jobs.', philsAnalogy: 'Seeing deductions labeled social security on a paycheck.' },
    { term: 'Self Employment Income', definition: 'Self employment income comes from running a business or side hustle. Taxes are not automatically withheld.', philsAnalogy: 'Earning money from tutoring or selling products online.' },
    { term: 'Investment Income', definition: 'Investment income comes from owning assets like stocks or funds. Taxes depend on timing and type.', philsAnalogy: 'Making money from selling investments or receiving dividends.' },
    { term: 'Capital Gains', definition: 'Capital gains are profits from selling an investment for more than you paid. Gains can be taxed differently based on how long you hold the asset.', philsAnalogy: 'Selling a stock after several years for a profit.' }
  ],
  simulatorGame: {
    title: 'Tax the Income',
    description: 'Earn money from different income sources across several rounds and manage your taxes.',
    initialState: { weeklyIncome: 800, hourlyWage: 20, workHours: 40, fatigue: 20, freeTime: 30, skillLevel: 50 },
    scenarios: [
      {
        id: 'side-hustle-taxes',
        title: 'Side Hustle Earnings',
        description: 'You earned $500 from a side hustle. No taxes were withheld.',
        choices: [
          { id: 'set-aside', label: 'Set aside 30% for taxes', outcome: { incomeChange: 350, fatigueChange: 0, freeTimeChange: 0, skillChange: 15, feedback: 'Smart! You planned for the tax bill and avoided surprises.' } },
          { id: 'spend-all', label: 'Spend it all now', outcome: { incomeChange: 500, fatigueChange: 5, freeTimeChange: 5, skillChange: -15, feedback: 'You spent the money but will owe taxes later with nothing set aside.' } },
          { id: 'invest-all', label: 'Invest it all immediately', outcome: { incomeChange: 0, fatigueChange: 5, freeTimeChange: 0, skillChange: 5, feedback: 'Good investing, but you may need to sell to pay taxes.' } }
        ]
      }
    ],
    winCondition: { minIncome: 600, maxFatigue: 60 }
  },
  miniReflection: { question: 'Which income type would require the most planning for you right now?', followUp: 'List your current income sources and note how each one would be taxed.' },
  quiz: [
    { question: 'You get $200 from your retail shift and $200 from reselling sneakers. Which one already had taxes taken out before you got paid?', options: ['The retail paycheck', 'The sneaker resale cash', 'Both equally', 'Neither'], correctIndex: 0, explanation: 'Wages from an employer are taxed through automatic withholding; self-employment income is not.' },
    { question: "You made $300 reselling shoes this month and nothing was withheld. What should you actually do?", options: ["Nothing, it's under the radar", 'Wait for the IRS to tell you', 'Set aside part of it for taxes yourself', 'Ask the buyer to pay the tax'], correctIndex: 2, explanation: 'Self-employment income requires you to plan ahead and set money aside since nothing is withheld automatically.' },
    { question: 'You buy $50 of stock in your brokerage app. Whether that counts toward your taxes this year depends mostly on:', options: ['How much you originally deposited', 'Whether you actually sell it, and when', 'Which app you used', 'Your age'], correctIndex: 1, explanation: 'Investment income is taxed based on timing, such as when you sell an asset or receive a payout.' },
    { question: 'Every retail paycheck has a line for Social Security and Medicare. What is that money actually for?', options: ['Company profit', 'Funding retirement and healthcare programs', 'Store maintenance', "Your manager's bonus"], correctIndex: 1, explanation: 'Payroll taxes fund Social Security and Medicare, not the business itself.' },
    { question: 'You bought a stock for $50 and later sell it for $70. That $20 profit is called a capital gain, and it gets taxed:', options: ['The moment you sell it', 'Every year you hold it', "Only if you're over 18", 'Never, since it started as $50'], correctIndex: 0, explanation: 'Capital gains are taxed when you sell an asset for more than you paid for it.' }
  ],
  powerMove: 'List your current income sources and note how each one would be taxed.',
  realLifeAction: 'Ask someone with a side hustle how they plan for taxes during the year.'
};
