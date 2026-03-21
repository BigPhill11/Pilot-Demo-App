import { Lesson } from '@/types/personal-finance';

export const lesson1WhatWealthIs: Lesson = {
  id: 'wealth-fundamentals-1',
  title: 'What Wealth Actually Is',
  estimatedMinutes: 12,
  moduleOverview: 'Understanding what wealth truly means and why it differs fundamentally from income.',
  realityHook: "You know someone who makes a lot of money but always feels stressed. Their paycheck looks big, but their savings stay small and their bills stay high. You also know someone who earns less but feels calm because they own assets and have a plan. The difference is not income size. The difference is what they own and how stable their system is.",
  outcomePreview: "You'll understand the difference between income and wealth, and why owning assets matters more than looking rich.",
  microLesson: `Wealth is what you own that keeps working even when you stop working. Income is money you receive for work you do, like a paycheck. Wealth usually comes from assets, like investments, businesses, or property. Assets can grow in value and can create cash flow.

**Income ≠ Wealth**
A person can earn a lot and still have low wealth. That happens when spending rises with income and assets never build. A person can earn less and still build wealth if they save, invest, and keep expenses controlled.

**Wealth = Ownership + Systems**
Wealth is not about showing status. Wealth is about building a system that creates stability and options. Your net worth (assets minus liabilities) is the true measure.

**Resilience is Part of Wealth**
Wealth also includes resilience—the ability to handle problems without panic. Savings help with emergencies. Investments help with long-term growth. Skills help with earning. Good planning connects all of these pieces.

If you understand wealth, you stop chasing appearances. You start building ownership, stability, and long-term freedom.`,
  flashcards: [
    {
      term: 'Wealth',
      definition: 'The total value of what you own minus what you owe, including assets that can grow or produce income over time.',
      philsAnalogy: "Wealth is like a bamboo forest you own—it keeps growing and producing even when you're not tending to it. Income is like harvesting one bamboo shoot at a time."
    },
    {
      term: 'Income',
      definition: 'Money you receive over a period of time, usually from working, running a business, or earning returns on assets.',
      philsAnalogy: "Income is the water flowing into your pond. Without a pond to hold it (assets), the water just flows right back out."
    },
    {
      term: 'Asset',
      definition: 'Something you own that has economic value and can increase in value or generate cash flow.',
      philsAnalogy: "Assets are like seeds that grow into trees. Each tree can produce fruit (income) and create more seeds (compound growth)."
    },
    {
      term: 'Liability',
      definition: 'Something you owe that reduces your net worth and requires future payments.',
      philsAnalogy: "Liabilities are like holes in your pond. The more holes, the harder it is to keep water (wealth) inside."
    },
    {
      term: 'Cash Flow',
      definition: 'Money that comes in and goes out over time. Positive cash flow means keeping money after expenses.',
      philsAnalogy: "Cash flow is the tide. Positive flow fills your pond higher each month. Negative flow drains it slowly."
    }
  ],
  simulatorGame: {
    title: 'Rich Look vs Wealth Build',
    description: 'Compete over multiple rounds to build the highest net worth while surviving emergencies.',
    initialState: {
      weeklyIncome: 1000,
      hourlyWage: 25,
      workHours: 40,
      fatigue: 20,
      freeTime: 50,
      skillLevel: 30
    },
    scenarios: [
      {
        id: 'first-paycheck',
        title: 'Your First Real Paycheck',
        description: "You just got your first substantial paycheck. Everyone's upgrading their lifestyle. What do you do?",
        choices: [
          {
            id: 'status-spend',
            label: 'Upgrade lifestyle to match peers',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Short-term happiness increases but no assets built. Net worth stays flat.'
            }
          },
          {
            id: 'build-assets',
            label: 'Keep lifestyle same, invest the difference',
            outcome: {
              incomeChange: 50,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Less flashy now, but your assets start compounding. Net worth grows.'
            }
          }
        ]
      },
      {
        id: 'car-decision',
        title: 'Car Upgrade Pressure',
        description: "Your car works fine but looks old. A friend suggests financing a new one to 'look successful.'",
        choices: [
          {
            id: 'new-car',
            label: 'Finance a new car for image',
            outcome: {
              incomeChange: -100,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Monthly payment creates liability. You look richer but are poorer.'
            }
          },
          {
            id: 'keep-car',
            label: 'Keep current car, invest payment amount',
            outcome: {
              incomeChange: 80,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 5,
              feedback: 'No status boost, but your investment account grows steadily.'
            }
          }
        ]
      },
      {
        id: 'emergency-test',
        title: 'Emergency Strikes',
        description: "Your car breaks down and you need $2,000 for repairs. How do you handle it?",
        choices: [
          {
            id: 'emergency-fund',
            label: 'Use emergency fund (if you built one)',
            outcome: {
              incomeChange: -20,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Small setback but you handle it calmly. This is resilience.'
            }
          },
          {
            id: 'credit-card',
            label: 'Put it on credit card',
            outcome: {
              incomeChange: -80,
              fatigueChange: 25,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'Interest compounds against you. Stress increases. Wealth decreases.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1200,
      maxFatigue: 60
    }
  },
  miniReflection: {
    question: "Do you think more about looking rich or becoming wealthy?",
    followUp: "What would need to change in your mindset or behavior to focus more on wealth?"
  },
  quiz: [
    {
      question: "Net worth equals",
      options: ["Income minus taxes", "Assets minus liabilities", "Spending minus saving", "Cash minus bills"],
      correctIndex: 1,
      explanation: "Net worth is calculated by subtracting what you owe (liabilities) from what you own (assets)."
    },
    {
      question: "A person can have high income and low wealth when",
      options: ["They invest consistently", "They avoid debt", "They raise lifestyle spending with each raise", "They keep expenses stable"],
      correctIndex: 2,
      explanation: "When spending rises with income and assets never build, wealth stays low despite high earnings."
    },
    {
      question: "Assets help create wealth because",
      options: ["They always guarantee profit", "They can grow in value and produce cash flow", "They remove all financial risk", "They eliminate the need to work"],
      correctIndex: 1,
      explanation: "Assets build wealth by growing in value over time and potentially producing income."
    },
    {
      question: "Liabilities reduce wealth because",
      options: ["They increase your income", "They remove taxes you owe", "They require future payments that reduce net worth", "They automatically increase your assets"],
      correctIndex: 2,
      explanation: "Liabilities are obligations that require future payments, reducing your net worth and limiting choices."
    },
    {
      question: "Positive cash flow helps because",
      options: ["It forces you to spend more", "It creates room to save and invest", "It prevents all emergencies", "It guarantees you'll become wealthy"],
      correctIndex: 1,
      explanation: "Positive cash flow means money left after expenses, which can be saved and invested to build wealth."
    }
  ],
  powerMove: "Track your net worth monthly by listing assets and liabilities in one simple note. Watch the trend, not the number.",
  realLifeAction: "List three assets you want to own by age twenty-five and write one step you can take this month toward each one."
};
