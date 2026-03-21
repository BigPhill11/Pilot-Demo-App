import { Lesson } from '@/types/personal-finance';

export const lesson4TaxAdvantagedAccounts: Lesson = {
  id: 'tax-advantaged-accounts',
  title: 'Tax Advantaged Accounts and Timing Strategies',
  estimatedMinutes: 10,
  moduleOverview: 'This lesson explains how certain accounts and timing choices reduce taxes legally. You learn why where money goes matters as much as how much you earn.',
  realityHook: 'You earn money and decide where to save or invest it. Two people earn the same amount, but one keeps more after taxes because of where and when they save. The difference comes from using tax advantaged accounts and timing decisions correctly.',
  outcomePreview: 'You will understand that account choice affects taxes, timing changes tax impact, delaying taxes helps growth, and planning increases take home results.',
  microLesson: `Tax advantaged accounts are designed to encourage saving and investing. These accounts offer benefits like tax free growth or delayed taxes. Using them correctly keeps more money working for you over time.

Timing matters because taxes often apply when money moves. Selling investments, withdrawing savings, or earning income at certain times can change how much you owe. Waiting longer or choosing the right moment can lower taxes.

Some accounts delay taxes until later. Others remove taxes entirely if rules are followed. The benefit grows as money compounds over time without being reduced by taxes each year.

Understanding accounts and timing turns taxes from a surprise into a planning tool. Planning does not remove taxes, but it reduces their impact legally.`,
  flashcards: [
    { term: 'Tax Advantaged Account', definition: 'A tax advantaged account is a savings or investment account that offers tax benefits. These benefits include tax free growth or delayed taxes.', philsAnalogy: 'Saving money in an account where investment gains are not taxed every year.' },
    { term: 'Tax Deferral', definition: 'Tax deferral means delaying taxes until a later time. Delaying taxes allows money to grow before being taxed.', philsAnalogy: 'Paying taxes when withdrawing money instead of when earning it.' },
    { term: 'Tax Free Growth', definition: 'Tax free growth means investment gains are not taxed if rules are followed. This allows faster long-term growth.', philsAnalogy: 'Investments growing without yearly tax bills reducing returns.' },
    { term: 'Contribution', definition: 'A contribution is money added to a specific account. Contributions often have limits and rules.', philsAnalogy: 'Adding money regularly to a long-term savings account.' },
    { term: 'Withdrawal', definition: 'A withdrawal is money taken out of an account. Withdrawals can trigger taxes if taken at the wrong time.', philsAnalogy: 'Taking money out early and owing taxes or penalties.' }
  ],
  simulatorGame: {
    title: 'Where and When',
    description: 'Earn income and choose where to save and when to withdraw.',
    initialState: { weeklyIncome: 1000, hourlyWage: 25, workHours: 40, fatigue: 20, freeTime: 30, skillLevel: 50 },
    scenarios: [
      {
        id: 'account-choice',
        title: 'Saving for Retirement',
        description: 'You have $500 to save. Where do you put it?',
        choices: [
          { id: 'tax-advantaged', label: 'Tax-advantaged retirement account', outcome: { incomeChange: 0, fatigueChange: 0, freeTimeChange: 0, skillChange: 20, feedback: 'Excellent! Your money grows tax-deferred, compounding faster over time.' } },
          { id: 'regular-account', label: 'Regular savings account', outcome: { incomeChange: 0, fatigueChange: 0, freeTimeChange: 0, skillChange: 5, feedback: 'Safe choice, but you will pay taxes on any interest earned each year.' } },
          { id: 'spend-it', label: 'Keep it for spending', outcome: { incomeChange: 500, fatigueChange: -5, freeTimeChange: 5, skillChange: -10, feedback: 'You have flexibility now, but missed the tax benefits of saving.' } }
        ]
      }
    ],
    winCondition: { minIncome: 600, maxFatigue: 60 }
  },
  miniReflection: { question: 'How would choosing the right account change your long-term results?', followUp: 'Research one tax advantaged account you could use in the future and note its main benefit.' },
  quiz: [
    { question: 'Tax deferral helps because:', options: ['Taxes disappear', 'Growth increases before taxes', 'Rates drop', 'Income rises'], correctIndex: 1, explanation: 'Deferring taxes lets your money compound without annual tax drag.' },
    { question: 'Tax free growth works when:', options: ['Rules are followed', 'Money is hidden', 'Income is low', 'Timing is random'], correctIndex: 0, explanation: 'Tax-free accounts require following specific rules to get the benefit.' },
    { question: 'Contributions matter because:', options: ['They remove limits', 'They eliminate taxes', 'They prevent withdrawals', 'They create growth base'], correctIndex: 3, explanation: 'What you contribute becomes the base for future growth.' },
    { question: 'Withdrawals affect taxes because:', options: ['Money moves', 'Rates change', 'Income stops', 'Accounts close'], correctIndex: 0, explanation: 'Taxes often apply when money moves out of accounts.' },
    { question: 'Account choice impacts:', options: ['Emotions only', 'Spending habits', 'Long-term results', 'Short-term income'], correctIndex: 2, explanation: 'The right account choice significantly affects long-term wealth.' }
  ],
  powerMove: 'Research one tax advantaged account you could use in the future and note its main benefit.',
  realLifeAction: 'Ask an adult which account helped them reduce taxes over time.'
};
