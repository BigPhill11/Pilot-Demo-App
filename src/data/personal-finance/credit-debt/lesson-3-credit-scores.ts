import { Lesson } from '@/types/personal-finance';

export const lesson3CreditScores: Lesson = {
  id: 'credit-debt-3',
  title: 'How Credit Scores Work and Why They Matter',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains what a credit score is and how it is calculated. You learn why scores affect approvals and costs, and how everyday behavior shapes results over time.',
  realityHook: 'Two people apply for the same apartment. One gets approved quickly with a low deposit. The other gets rejected or asked to pay much more upfront. The difference is not personality or effort. The difference is credit score history.',
  outcomePreview: 'Credit scores summarize trust • Scores affect access and cost • Behavior matters more than income • Small actions compound',
  microLesson: `A credit score is a number that summarizes how reliably you repay borrowed money. Lenders use this score to decide whether to approve you and how much to charge. Higher scores usually lead to lower costs and easier approval.

Credit scores are built from behavior, not promises. Paying on time matters most. Keeping balances low matters next. Applying for too much credit too quickly can hurt scores.

Scores affect more than loans. Housing applications, insurance pricing, and even some jobs look at credit history. A strong score opens doors. A weak score creates friction everywhere.

Credit scores change slowly through consistent habits. There is no shortcut. Small actions repeated over time build strong results.`,
  flashcards: [
    {
      term: 'Credit Score',
      definition: 'A credit score is a numerical summary of credit reliability based on past behavior. Lenders use scores to measure risk.',
      philsAnalogy: 'A higher score leading to lower interest on a car loan.',
    },
    {
      term: 'Payment History',
      definition: 'Payment history tracks whether payments are made on time. This factor has the largest impact on credit scores.',
      philsAnalogy: 'Always paying the minimum before the due date.',
    },
    {
      term: 'Credit Utilization',
      definition: 'Credit utilization measures how much available credit is being used. Lower utilization signals better control.',
      philsAnalogy: 'Using a small portion of a credit limit instead of maxing it out.',
    },
    {
      term: 'Credit Inquiry',
      definition: 'A credit inquiry occurs when a lender checks your credit. Too many inquiries in a short time can lower scores.',
      philsAnalogy: 'Applying for several cards within one month.',
    },
    {
      term: 'Credit Mix',
      definition: 'Credit mix refers to having different types of credit accounts. A healthy mix supports scores over time.',
      philsAnalogy: 'Having both a card and a small loan.',
    },
  ],
  simulatorGame: {
    title: 'Build the Score',
    description: 'You manage credit behavior over several months while opportunities appear.',
    initialState: {
      weeklyIncome: 550,
      hourlyWage: 16,
      workHours: 34,
      fatigue: 20,
      freeTime: 40,
      skillLevel: 60,
    },
    scenarios: [
      {
        id: 'first-card-usage',
        title: 'Credit Card Usage Pattern',
        description: 'You have a $1,000 credit limit. How do you use it this month?',
        choices: [
          {
            id: 'low-utilization',
            label: 'Keep spending under $300 (30% utilization)',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 20,
              feedback: 'Low utilization signals control. Credit score improves steadily.',
            },
          },
          {
            id: 'medium-utilization',
            label: 'Spend around $500 (50% utilization)',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Moderate utilization is acceptable but not optimal. Score stays steady.',
            },
          },
          {
            id: 'high-utilization',
            label: 'Max out the card at $1,000',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: -15,
              feedback: 'High utilization signals risk. Credit score drops even with on-time payments.',
            },
          },
        ],
      },
      {
        id: 'multiple-applications',
        title: 'Credit Application Frenzy',
        description: 'Three different stores offer you credit cards with sign-up bonuses. What do you do?',
        choices: [
          {
            id: 'apply-all',
            label: 'Apply for all three cards',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: -20,
              feedback: 'Multiple inquiries in a short period lower your score. Each application counts against you.',
            },
          },
          {
            id: 'apply-one',
            label: 'Apply for the one with the best terms',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'One application has minimal impact. Choose wisely and benefit from the best offer.',
            },
          },
          {
            id: 'apply-none',
            label: 'Decline all and focus on current accounts',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 10,
              feedback: 'No new inquiries. Focus on building history with existing accounts.',
            },
          },
        ],
      },
      {
        id: 'payment-timing',
        title: 'Busy Month',
        description: 'Work is overwhelming and your payment is due tomorrow. You have the money but forgot to set up autopay.',
        choices: [
          {
            id: 'pay-immediately',
            label: 'Stop everything and pay right now',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'On-time payment protected. Your payment history remains perfect.',
            },
          },
          {
            id: 'pay-tomorrow',
            label: 'Plan to pay tomorrow after work',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Risk of forgetting or technical issues. Cutting it close is stressful.',
            },
          },
          {
            id: 'forget-payment',
            label: 'Get too busy and miss the payment',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: -15,
              skillChange: -30,
              feedback: 'Late payment reported after 30 days. Major credit score damage that takes years to recover.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 550,
      maxFatigue: 50,
    },
  },
  miniReflection: {
    question: 'Which habit would most improve your credit score over time?',
    followUp: 'How does your credit score affect opportunities beyond loans?',
  },
  quiz: [
    {
      question: 'Credit scores affect:',
      options: ['Only banks', 'Only investments', 'Daily spending', 'Many life decisions'],
      correctIndex: 3,
      explanation: 'Credit scores affect many life decisions including housing, insurance, and sometimes employment.',
    },
    {
      question: 'High credit utilization usually:',
      options: ['Improves scores', 'Shows discipline', 'Increases risk signals', 'Has no effect'],
      correctIndex: 2,
      explanation: 'High credit utilization increases risk signals to lenders and can lower your credit score.',
    },
    {
      question: 'Applying for too much credit quickly:',
      options: ['Builds history', 'Can lower scores', 'Shows confidence', 'Removes limits'],
      correctIndex: 1,
      explanation: 'Applying for too much credit quickly can lower scores because each application creates an inquiry.',
    },
    {
      question: 'Payment history matters most because:',
      options: ['It shows consistency', 'It predicts income', 'It measures spending', 'It increases limits'],
      correctIndex: 0,
      explanation: 'Payment history matters most because it shows whether you consistently meet your obligations.',
    },
    {
      question: 'Credit scores improve mainly through:',
      options: ['One big action', 'Luck', 'Repeated habits', 'Fast approval'],
      correctIndex: 2,
      explanation: 'Credit scores improve mainly through repeated habits like paying on time and keeping balances low.',
    },
  ],
  powerMove: 'Set automatic reminders for every payment you are responsible for.',
  realLifeAction: 'Ask an adult how their credit score affected a major purchase decision.',
};
