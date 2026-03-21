import { Lesson } from '@/types/personal-finance';

export const lesson1ManagingDebtUnderstandingCredit: Lesson = {
  id: 'credit-debt-1',
  title: 'Managing Debt and Understanding Credit',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains what debt and credit actually are and how they affect future opportunities. You learn why some debt helps growth, why some debt causes stress, and why credit history matters early.',
  realityHook: 'You want to buy something important, like a phone or help with future housing. One person gets approved easily and pays less over time. Another person gets denied or pays much more. The difference is not intelligence or effort. The difference is how debt and credit were handled earlier.',
  outcomePreview: 'Debt creates future obligations • Credit measures repayment behavior • Some debt supports growth • Early habits affect future access',
  microLesson: `Debt is money you borrow with an agreement to repay it later. Every debt comes with rules, including interest and deadlines. Debt itself is not good or bad. How debt is used and managed determines its impact.

Credit reflects trust built over time. Lenders look at your credit history to see if you follow agreements. Strong credit lowers costs and increases access. Weak credit makes borrowing harder and more expensive.

Some debt supports long-term progress. Education or tools that increase earning ability often fall into this category. Other debt funds short-term spending and loses value quickly. That type of debt creates pressure without future benefit.

Understanding debt early gives you control. Credit rewards consistent behavior, not last-minute effort.`,
  flashcards: [
    {
      term: 'Debt',
      definition: 'Debt is money borrowed under an agreement to repay it with interest or fees. Debt creates future obligations that affect cash flow.',
      philsAnalogy: 'Borrowing money for school and repaying it over time with interest.',
    },
    {
      term: 'Credit',
      definition: 'Credit is the ability to borrow based on trust built through past repayment behavior. Credit reflects reliability, not income size.',
      philsAnalogy: 'Getting approved for a loan because previous payments were always on time.',
    },
    {
      term: 'Interest',
      definition: 'Interest is the cost charged for borrowing money. Interest increases the total amount repaid beyond the original loan.',
      philsAnalogy: 'Paying more than the original purchase price because of borrowing costs.',
    },
    {
      term: 'Credit History',
      definition: 'Credit history is a record of how borrowed money has been managed over time. This history influences future approval and pricing.',
      philsAnalogy: 'A report showing on-time payments and low balances.',
    },
    {
      term: 'Productive Debt',
      definition: 'Productive debt is borrowing that supports long-term growth or opportunity. This debt usually has lasting value.',
      philsAnalogy: 'Taking a loan to gain skills that increase future income.',
    },
  ],
  simulatorGame: {
    title: 'Borrow or Build',
    description: 'You face choices to borrow money or delay purchases while future opportunities appear.',
    initialState: {
      weeklyIncome: 500,
      hourlyWage: 15,
      workHours: 33,
      fatigue: 20,
      freeTime: 40,
      skillLevel: 50,
    },
    scenarios: [
      {
        id: 'first-credit-decision',
        title: 'First Credit Opportunity',
        description: 'A store offers you a credit card with a $500 limit. Do you accept and use it carefully, or avoid credit for now?',
        choices: [
          {
            id: 'accept-use-wisely',
            label: 'Accept and use for small purchases only',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'You start building credit history with small, manageable purchases. On-time payments begin building your credit score.',
            },
          },
          {
            id: 'accept-max-out',
            label: 'Accept and buy something expensive immediately',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: -10,
              feedback: 'High balance creates stress. Interest charges add up quickly, making repayment harder.',
            },
          },
          {
            id: 'decline-wait',
            label: 'Decline and wait until later',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'No credit history builds. Future opportunities may require credit history you don\'t have.',
            },
          },
        ],
      },
      {
        id: 'payment-due',
        title: 'Payment Due Date',
        description: 'Your first credit card payment is due. You have the money but also want to buy concert tickets.',
        choices: [
          {
            id: 'pay-on-time',
            label: 'Pay the full balance on time',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 20,
              feedback: 'On-time payment recorded. Credit score improves. Trust builds with the lender.',
            },
          },
          {
            id: 'pay-minimum',
            label: 'Pay only the minimum',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Account stays current but interest accrues on remaining balance. Total cost increases.',
            },
          },
          {
            id: 'skip-payment',
            label: 'Skip payment for concert tickets',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: -15,
              skillChange: -25,
              feedback: 'Late payment reported. Credit score drops significantly. Late fee added to balance.',
            },
          },
        ],
      },
      {
        id: 'productive-debt-choice',
        title: 'Opportunity to Invest in Skills',
        description: 'A certification course costs $1,000 and could increase your earning potential. You can borrow or save.',
        choices: [
          {
            id: 'borrow-for-skills',
            label: 'Borrow at low interest for the course',
            outcome: {
              incomeChange: 100,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 30,
              feedback: 'Productive debt creates future value. Higher skills lead to higher income that exceeds the loan cost.',
            },
          },
          {
            id: 'save-then-pay',
            label: 'Save up and pay cash later',
            outcome: {
              incomeChange: 50,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'No debt created, but opportunity delayed. Income growth comes later.',
            },
          },
          {
            id: 'skip-course',
            label: 'Skip the course entirely',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: 0,
              feedback: 'No debt, but no skill growth either. Future earning potential unchanged.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 550,
      maxFatigue: 60,
    },
  },
  miniReflection: {
    question: 'How could borrowing choices today affect your future freedom?',
    followUp: 'What rule would you follow before borrowing any amount of money?',
  },
  quiz: [
    {
      question: 'Debt becomes harmful when:',
      options: ['It is borrowed', 'It supports growth', 'It is unmanaged', 'It is short term'],
      correctIndex: 2,
      explanation: 'Debt becomes harmful when it is unmanaged, leading to growing interest and stress.',
    },
    {
      question: 'Interest affects borrowing by:',
      options: ['Lowering prices', 'Increasing total cost', 'Improving credit', 'Reducing risk'],
      correctIndex: 1,
      explanation: 'Interest increases the total amount you repay beyond the original loan.',
    },
    {
      question: 'Credit history matters because:',
      options: ['It tracks repayment behavior', 'It measures intelligence', 'It predicts income growth', 'It replaces savings'],
      correctIndex: 0,
      explanation: 'Credit history tracks how reliably you repay borrowed money over time.',
    },
    {
      question: 'Productive debt usually helps by:',
      options: ['Increasing comfort', 'Funding impulse spending', 'Reducing responsibility', 'Supporting long-term growth'],
      correctIndex: 3,
      explanation: 'Productive debt supports long-term growth by funding things that increase future earning ability.',
    },
    {
      question: 'Managing debt early helps by:',
      options: ['Avoiding work', 'Removing taxes', 'Increasing stress', 'Building trust'],
      correctIndex: 3,
      explanation: 'Managing debt early builds trust with lenders, leading to better terms and more opportunities.',
    },
  ],
  powerMove: 'Write one rule you would follow before borrowing any amount of money.',
  realLifeAction: 'Ask an adult how their credit history affected a major decision in their life.',
};
