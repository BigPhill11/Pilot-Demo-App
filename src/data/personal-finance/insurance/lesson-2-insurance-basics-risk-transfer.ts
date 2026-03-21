import { Lesson } from '@/types/personal-finance';

export const lesson2InsuranceBasicsRiskTransfer: Lesson = {
  id: 'insurance-basics-risk-transfer',
  title: 'Insurance Basics and Risk Transfer',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains how insurance works and why people use it. You learn how insurance transfers risk, when insurance makes sense, and why paying a small amount regularly protects against large losses.',
  realityHook: 'You borrow a friend\'s car and get into a minor accident. The damage costs thousands of dollars, far more than you have saved. One decision suddenly creates a financial problem that could follow you for years. Insurance exists for moments exactly like this.',
  outcomePreview: 'You will understand how insurance transfers risk, why small costs protect against large losses, when insurance makes sense, and how coverage choices affect outcomes.',
  microLesson: `Insurance works by transferring risk from you to an insurance company. You pay a small, predictable amount called a premium. In return, the insurance company agrees to cover large unexpected losses.

Insurance does not prevent bad events. Insurance limits the financial damage when bad events happen. This makes losses manageable instead of life changing.

Not every risk needs insurance. Insurance works best for rare but expensive problems. Small predictable costs usually make more sense to pay yourself. Large unpredictable costs often require insurance protection.

Understanding insurance helps you make smarter choices. The goal is not to insure everything. The goal is to protect yourself from losses you cannot afford to handle alone.`,
  flashcards: [
    {
      term: 'Insurance',
      definition: 'Insurance is an agreement where you pay a regular cost to transfer financial risk to an insurance company. Insurance protects against large unexpected losses.',
      philsAnalogy: 'Paying a monthly premium so a medical emergency does not create massive debt.'
    },
    {
      term: 'Premium',
      definition: 'A premium is the amount you pay regularly to keep insurance coverage active. Premiums are predictable and planned costs.',
      philsAnalogy: 'Paying every month for car insurance even when nothing goes wrong.'
    },
    {
      term: 'Coverage',
      definition: 'Coverage is what the insurance policy agrees to pay for during a loss. Coverage limits determine how much protection you actually have.',
      philsAnalogy: 'An insurance plan that covers repairs up to a certain dollar amount.'
    },
    {
      term: 'Deductible',
      definition: 'A deductible is the amount you pay out of pocket before insurance starts paying. Higher deductibles usually lower premiums.',
      philsAnalogy: 'Paying the first portion of repair costs before insurance covers the rest.'
    },
    {
      term: 'Risk Transfer',
      definition: 'Risk transfer means shifting financial risk from yourself to another party. Insurance is one of the most common forms of risk transfer.',
      philsAnalogy: 'Letting an insurance company handle large accident costs instead of paying them personally.'
    }
  ],
  simulatorGame: {
    title: 'Insure or Self Pay',
    description: 'Face different risks with varying costs and probabilities. Decide when to buy insurance and when to self-insure.',
    initialState: {
      weeklyIncome: 1000,
      hourlyWage: 25,
      workHours: 40,
      fatigue: 15,
      freeTime: 35,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'health-insurance-choice',
        title: 'Health Insurance Decision',
        description: 'You can choose a health plan. Higher premium means lower deductible.',
        choices: [
          {
            id: 'high-premium-low-deductible',
            label: 'High premium, low deductible ($300/mo, $500 deductible)',
            outcome: {
              incomeChange: -300,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Higher monthly cost, but emergencies cost less out of pocket. Peace of mind.'
            }
          },
          {
            id: 'low-premium-high-deductible',
            label: 'Low premium, high deductible ($100/mo, $3000 deductible)',
            outcome: {
              incomeChange: -100,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Lower monthly cost, but you need savings to cover the high deductible if something happens.'
            }
          },
          {
            id: 'no-insurance',
            label: 'Skip health insurance',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: -10,
              feedback: 'Saved money now, but one medical event could create massive debt.'
            }
          }
        ]
      },
      {
        id: 'car-damage-event',
        title: 'Fender Bender',
        description: 'You backed into a pole. Repair cost: $800.',
        choices: [
          {
            id: 'file-claim',
            label: 'File an insurance claim',
            outcome: {
              incomeChange: -250,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 5,
              feedback: 'Paid your $250 deductible. Insurance covered the rest. Premiums might increase slightly.'
            }
          },
          {
            id: 'pay-out-of-pocket',
            label: 'Pay out of pocket',
            outcome: {
              incomeChange: -800,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Kept your insurance record clean but paid the full repair cost yourself.'
            }
          },
          {
            id: 'ignore-damage',
            label: 'Drive with the damage',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: -5,
              feedback: 'Saved money but the damage could get worse or affect resale value.'
            }
          }
        ]
      },
      {
        id: 'phone-insurance',
        title: 'Phone Protection Plan',
        description: 'Your new phone costs $1,000. Insurance is $12/month with a $100 deductible.',
        choices: [
          {
            id: 'get-phone-insurance',
            label: 'Buy the protection plan',
            outcome: {
              incomeChange: -12,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Protected against drops and damage. $144/year for peace of mind.'
            }
          },
          {
            id: 'skip-phone-insurance',
            label: 'Skip phone insurance',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Saved monthly cost. If you\'re careful, this might work out. If not, full replacement cost.'
            }
          },
          {
            id: 'buy-case-only',
            label: 'Just buy a protective case',
            outcome: {
              incomeChange: -30,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'One-time cost reduces damage risk but doesn\'t cover theft or major accidents.'
            }
          }
        ]
      },
      {
        id: 'major-medical-event',
        title: 'Emergency Surgery',
        description: 'You need an emergency appendectomy. Total cost: $35,000.',
        choices: [
          {
            id: 'use-insurance',
            label: 'Use health insurance',
            outcome: {
              incomeChange: -3000,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: 10,
              feedback: 'Paid your deductible and some co-insurance. Insurance covered the vast majority.'
            }
          },
          {
            id: 'no-insurance-payment-plan',
            label: 'No insurance - negotiate payment plan',
            outcome: {
              incomeChange: -500,
              fatigueChange: 30,
              freeTimeChange: -20,
              skillChange: -10,
              feedback: 'Reduced to $20,000 through negotiation. Still years of payments ahead.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 500,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: 'Which risk in your life would cause the most damage without insurance protection?',
    followUp: 'Is that risk currently covered?'
  },
  quiz: [
    {
      question: 'Insurance works best for risks that are:',
      options: ['Small and frequent', 'Large and rare', 'Predictable', 'Guaranteed'],
      correctIndex: 1,
      explanation: 'Insurance makes most sense for events that are unlikely but would be very expensive if they occurred.'
    },
    {
      question: 'A deductible affects:',
      options: ['Your premium cost', 'Coverage limits', 'Claim approval', 'Investment returns'],
      correctIndex: 0,
      explanation: 'Higher deductibles typically mean lower premiums because you\'re taking on more risk.'
    },
    {
      question: 'Risk transfer means:',
      options: ['Avoiding risk entirely', 'Sharing risk equally', 'Eliminating risk', 'Shifting risk to another party'],
      correctIndex: 3,
      explanation: 'Risk transfer shifts financial risk from you to the insurance company.'
    },
    {
      question: 'Higher deductibles usually lead to:',
      options: ['Higher premiums', 'Lower premiums', 'No change', 'More coverage'],
      correctIndex: 1,
      explanation: 'When you agree to pay more out of pocket (higher deductible), your monthly premium decreases.'
    },
    {
      question: 'Insurance decisions should focus on:',
      options: ['Popular opinion', 'Emotion', 'Affordability of potential loss', 'Always maximizing coverage'],
      correctIndex: 2,
      explanation: 'The key question is whether you could afford to pay for the loss yourself.'
    }
  ],
  powerMove: 'Review one type of insurance you currently have or expect to need and list what it covers.',
  realLifeAction: 'Ask an adult how they decide which risks to insure and which to handle themselves.'
};
