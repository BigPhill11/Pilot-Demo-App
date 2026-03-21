import { Lesson } from '@/types/personal-finance';

export const lesson2TypesOfDebt: Lesson = {
  id: 'credit-debt-2',
  title: 'Types of Debt and How to Use Them Wisely',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains that not all debt works the same way. You learn the difference between productive debt and consumptive debt, and how choosing the wrong type creates long-term stress.',
  realityHook: 'Two people borrow the same amount of money. One uses it to gain skills and increase future income. The other uses it for short-term spending that loses value quickly. Years later, their outcomes look very different. The difference comes from the type of debt chosen.',
  outcomePreview: 'Debt types matter more than debt amount • Some debt supports future growth • Some debt creates long-term pressure • Intent determines outcomes',
  microLesson: `Debt becomes powerful or harmful based on how it is used. Productive debt supports future value. It helps increase income, skills, or opportunities over time. Consumptive debt pays for things that lose value quickly and do not improve future earning ability.

Productive debt often has a long-term payoff. Education, tools, or training can increase income for years. This type of debt still requires discipline, but it usually creates something valuable in return.

Consumptive debt feels easier in the moment. Credit cards and high-interest loans often fund convenience or status. These purchases disappear quickly, but the payments remain. This creates pressure without long-term benefit.

Smart debt decisions focus on future impact. Asking how debt improves your life later helps avoid regret and stress.`,
  flashcards: [
    {
      term: 'Productive Debt',
      definition: 'Productive debt is borrowing used to create future value or opportunity. This debt supports long-term growth when managed responsibly.',
      philsAnalogy: 'Taking a loan to gain skills that increase future income.',
    },
    {
      term: 'Consumptive Debt',
      definition: 'Consumptive debt is borrowing used for short-term spending that loses value quickly. This debt creates obligations without future benefit.',
      philsAnalogy: 'Using a credit card for expensive items that do not last.',
    },
    {
      term: 'High Interest Debt',
      definition: 'High interest debt has borrowing costs that grow quickly over time. High interest increases total repayment significantly.',
      philsAnalogy: 'Credit card balances that grow faster than payments.',
    },
    {
      term: 'Low Interest Debt',
      definition: 'Low interest debt has lower borrowing costs and grows more slowly. Lower interest reduces long-term pressure.',
      philsAnalogy: 'A student loan with a lower interest rate.',
    },
    {
      term: 'Opportunity Cost',
      definition: 'Opportunity cost is what you give up by choosing one option over another. Debt choices affect future options.',
      philsAnalogy: 'Paying interest instead of saving or investing money.',
    },
  ],
  simulatorGame: {
    title: 'Choose the Debt',
    description: 'You face borrowing options tied to different future outcomes.',
    initialState: {
      weeklyIncome: 600,
      hourlyWage: 18,
      workHours: 33,
      fatigue: 25,
      freeTime: 35,
      skillLevel: 55,
    },
    scenarios: [
      {
        id: 'new-phone-decision',
        title: 'New Phone Decision',
        description: 'Your phone still works but a new model looks amazing. You can finance the $1,200 phone or keep your current one.',
        choices: [
          {
            id: 'finance-new-phone',
            label: 'Finance the new phone at 24% interest',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'Consumptive debt created. The phone loses value immediately while payments continue for months with high interest.',
            },
          },
          {
            id: 'keep-current',
            label: 'Keep current phone and save the payment amount',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 10,
              feedback: 'No debt created. Money saved can be used for productive purposes or emergencies.',
            },
          },
          {
            id: 'buy-refurbished',
            label: 'Buy a refurbished phone with cash',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Smart compromise. No debt, lower cost, still get an upgrade.',
            },
          },
        ],
      },
      {
        id: 'education-opportunity',
        title: 'Certification Course',
        description: 'A professional certification costs $3,000 and could increase your salary by $8,000 per year. You can take a student loan at 6% interest.',
        choices: [
          {
            id: 'take-loan-for-cert',
            label: 'Take the loan and complete the certification',
            outcome: {
              incomeChange: 150,
              fatigueChange: 10,
              freeTimeChange: -15,
              skillChange: 35,
              feedback: 'Productive debt with clear ROI. The salary increase far exceeds the loan cost over time.',
            },
          },
          {
            id: 'wait-and-save',
            label: 'Save up for a year and pay cash',
            outcome: {
              incomeChange: 75,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 20,
              feedback: 'No debt but delayed benefit. One year of higher income lost while saving.',
            },
          },
          {
            id: 'skip-certification',
            label: 'Skip the certification entirely',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: 0,
              feedback: 'No debt but no growth. Income stays the same while others advance.',
            },
          },
        ],
      },
      {
        id: 'vacation-temptation',
        title: 'Dream Vacation',
        description: 'Friends invite you on a $2,500 vacation. You can put it on a credit card at 22% interest.',
        choices: [
          {
            id: 'charge-vacation',
            label: 'Charge the vacation and pay it off over time',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: -5,
              feedback: 'Consumptive debt for an experience. Memories fade but payments and interest continue.',
            },
          },
          {
            id: 'smaller-trip',
            label: 'Plan a smaller trip you can afford with cash',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 5,
              feedback: 'Still enjoy time with friends without the financial stress. Balance maintained.',
            },
          },
          {
            id: 'skip-this-time',
            label: 'Skip this trip and save for the next one',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'Temporary disappointment but financial position strengthened for future opportunities.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 700,
      maxFatigue: 55,
    },
  },
  miniReflection: {
    question: 'How could choosing the wrong type of debt limit your future options?',
    followUp: 'What question would you ask before borrowing money?',
  },
  quiz: [
    {
      question: 'Productive debt helps most when it:',
      options: ['Feels exciting', 'Builds future value', 'Avoids payments', 'Looks impressive'],
      correctIndex: 1,
      explanation: 'Productive debt helps most when it builds future value through skills, education, or opportunities.',
    },
    {
      question: 'High interest debt is dangerous because:',
      options: ['It grows quickly over time', 'It lowers credit scores instantly', 'It removes income', 'It guarantees loss'],
      correctIndex: 0,
      explanation: 'High interest debt grows quickly over time, making the total cost much higher than the original amount.',
    },
    {
      question: 'Consumptive debt often creates:',
      options: ['Long-term growth', 'Future income', 'Ongoing pressure', 'Immediate assets'],
      correctIndex: 2,
      explanation: 'Consumptive debt creates ongoing pressure because payments continue after the item loses value.',
    },
    {
      question: 'Opportunity cost matters because:',
      options: ['Choices disappear', 'Money multiplies', 'Interest stops', 'One option replaces another'],
      correctIndex: 3,
      explanation: 'Opportunity cost matters because choosing one option means giving up another potential use of that money.',
    },
    {
      question: 'Smart debt decisions focus on:',
      options: ['Future impact', 'Short-term comfort', 'Popular opinion', 'Immediate approval'],
      correctIndex: 0,
      explanation: 'Smart debt decisions focus on future impact, asking how the debt will affect your life later.',
    },
  ],
  powerMove: 'Before borrowing, write one sentence explaining how the debt helps your future.',
  realLifeAction: 'List one example of productive debt and one example of consumptive debt in real life.',
};
