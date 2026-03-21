import { Lesson } from '@/types/personal-finance';

export const lesson3RiskLifeStages: Lesson = {
  id: 'wealth-fundamentals-3',
  title: 'Risk Across Life Stages',
  estimatedMinutes: 12,
  moduleOverview: 'How risk changes as you age, and why smart risk-taking evolves through different life stages.',
  realityHook: "You make different choices at different ages. In high school, mistakes feel small and recoverable. Later in life, the same mistakes feel heavier because responsibilities increase. Wealth decisions follow the same pattern across life stages.",
  outcomePreview: "You'll understand why younger investors can take more risk, why stability matters later, and how to adjust risk intelligently over time.",
  microLesson: `Risk means uncertainty about outcomes, including the chance of loss. The impact of risk depends on when it happens in your life. Early losses usually hurt less because time allows recovery. Later losses hurt more because fewer earning years remain.

**Your Biggest Asset is Time**
When people are young, their biggest asset is time. Time allows mistakes to heal and investments to recover. Taking calculated risks early helps build growth and experience. Avoiding all risk early often leads to missed opportunities.

**Life Stage Changes Everything**
As people age, priorities shift. Income supports families, housing, and responsibilities. Risk still exists, but risk control becomes more important. The goal moves from aggressive growth to stability and protection.

**Risk Capacity vs Risk Tolerance**
Risk capacity is how much risk you CAN handle based on your situation. Risk tolerance is how much risk you WANT to take emotionally. Both matter, but capacity should guide decisions more than tolerance.

**The Adjustment Principle**
Smart investors adjust risk as life changes. They don't use one strategy forever. They match risk to age, goals, and responsibilities. A 25-year-old and a 55-year-old shouldn't have the same portfolio.`,
  flashcards: [
    {
      term: 'Life Stage',
      definition: 'A phase of life defined by age, responsibilities, and goals that requires different financial strategies.',
      philsAnalogy: "Life stages are like seasons for bamboo. Spring (youth) is for aggressive growth. Summer is for strengthening. Fall is for harvesting. Winter is for protection."
    },
    {
      term: 'Recovery Time',
      definition: 'How long it takes to rebuild after a financial loss. Longer recovery time reduces the damage of mistakes.',
      philsAnalogy: "If a storm knocks down young bamboo, there's time to grow new stalks. Old bamboo has no time to regrow before harvest."
    },
    {
      term: 'Risk Capacity',
      definition: 'How much risk someone can handle without damaging their future plans, based on their situation.',
      philsAnalogy: "A bamboo forest can lose some stalks without dying. A single bamboo plant can't. Your capacity depends on your 'forest size.'"
    },
    {
      term: 'Growth Phase',
      definition: 'The early career period focused on building assets and increasing wealth, allowing higher risk for higher potential growth.',
      philsAnalogy: "This is when bamboo sends shoots everywhere—some fail, but the ones that succeed create the foundation."
    },
    {
      term: 'Preservation Phase',
      definition: 'The later career period focused on protecting wealth and reducing large losses, where stability matters more than speed.',
      philsAnalogy: "Now you're protecting the forest you built. You prune carefully instead of planting wildly."
    }
  ],
  simulatorGame: {
    title: 'Risk Through Time',
    description: 'Navigate from youth to retirement, adjusting risk as responsibilities and time change.',
    initialState: {
      weeklyIncome: 850,
      hourlyWage: 21,
      workHours: 40,
      fatigue: 20,
      freeTime: 50,
      skillLevel: 25
    },
    scenarios: [
      {
        id: 'early-career',
        title: 'Early Career (Age 25)',
        description: "You have 40 years until retirement. How do you invest?",
        choices: [
          {
            id: 'aggressive',
            label: 'Go aggressive: 90% stocks, 10% bonds',
            outcome: {
              incomeChange: 100,
              fatigueChange: 15,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'High volatility but maximum growth potential. Time heals any crashes.'
            }
          },
          {
            id: 'conservative-early',
            label: 'Play it safe: 50% stocks, 50% bonds',
            outcome: {
              incomeChange: 40,
              fatigueChange: 5,
              freeTimeChange: 5,
              skillChange: 5,
              feedback: 'Less stress but potentially hundreds of thousands less at retirement.'
            }
          }
        ]
      },
      {
        id: 'mid-career',
        title: 'Mid Career (Age 40)',
        description: "You now have a family, mortgage, and 25 years until retirement. Adjust your approach?",
        choices: [
          {
            id: 'moderate',
            label: 'Shift to moderate: 70% stocks, 30% bonds',
            outcome: {
              incomeChange: 60,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 10,
              feedback: 'Balanced approach protects gains while still growing. Smart adjustment.'
            }
          },
          {
            id: 'no-change',
            label: 'Keep the same aggressive allocation',
            outcome: {
              incomeChange: 80,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'Higher potential returns but a crash now could delay retirement significantly.'
            }
          }
        ]
      },
      {
        id: 'pre-retirement',
        title: 'Pre-Retirement (Age 55)',
        description: "10 years until retirement. Your nest egg is substantial. Final adjustments?",
        choices: [
          {
            id: 'preserve',
            label: 'Shift to preservation: 50% stocks, 50% bonds',
            outcome: {
              incomeChange: 30,
              fatigueChange: -10,
              freeTimeChange: 10,
              skillChange: 5,
              feedback: 'Protection mode activated. You can weather market storms and retire on time.'
            }
          },
          {
            id: 'gamble',
            label: 'Stay aggressive to maximize final growth',
            outcome: {
              incomeChange: 60,
              fatigueChange: 25,
              freeTimeChange: -15,
              skillChange: 0,
              feedback: 'Risky. A 30% crash now means working 5+ more years or reducing lifestyle.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1100,
      maxFatigue: 50
    }
  },
  miniReflection: {
    question: "How should your risk change as your life responsibilities grow?",
    followUp: "What life changes would trigger you to adjust your investment approach?"
  },
  quiz: [
    {
      question: "Risk should change over time because",
      options: ["Markets become less volatile as you age", "Your emotions about money change", "Life stages bring different responsibilities and time horizons", "Tax rules change for older investors"],
      correctIndex: 2,
      explanation: "Risk tolerance and capacity change as life stages bring different responsibilities and time horizons."
    },
    {
      question: "Early investing risk works best when",
      options: ["Time until you need the money is limited", "You have decades of recovery time ahead", "Your responsibilities are at their highest", "Your income is fixed and predictable"],
      correctIndex: 1,
      explanation: "Early risk works because recovery time exists to rebuild from any losses."
    },
    {
      question: "Later stage investing focuses more on",
      options: ["Maximum speed of growth", "Exciting high-risk opportunities", "Preservation and protection of existing wealth", "Experimenting with new strategies"],
      correctIndex: 2,
      explanation: "Later stages focus on preservation to protect wealth already accumulated."
    },
    {
      question: "Risk capacity decreases when",
      options: ["You have more time until retirement", "Your investment portfolio grows larger", "Family and financial responsibilities increase", "You gain more investing experience"],
      correctIndex: 2,
      explanation: "Higher responsibilities reduce risk capacity because losses have greater impact on dependents."
    },
    {
      question: "Smart investors adjust risk by",
      options: ["Predicting which way markets will move", "Copying whatever successful people do", "Matching their approach to their current life stage", "Avoiding all decisions until they're older"],
      correctIndex: 2,
      explanation: "Smart investors match their risk level to their current life stage, goals, and responsibilities."
    }
  ],
  powerMove: "Write your current life stage and choose a risk level that fits your responsibilities. Revisit this annually.",
  realLifeAction: "Talk with an older adult about how their financial priorities changed over time. Ask what they wish they'd done differently at each stage."
};
