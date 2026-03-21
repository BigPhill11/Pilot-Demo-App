import { Lesson } from '@/types/personal-finance';

export const lesson1ProtectingYourAssets: Lesson = {
  id: 'protecting-your-assets',
  title: 'Protecting Your Assets',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains why protecting what you own matters as much as building it. You learn how risks show up in real life and how simple protections prevent small problems from becoming life changing setbacks.',
  realityHook: 'You work hard to save money over several years. One unexpected event happens, like a medical bill or a stolen device. Without protection, years of progress disappear quickly. Protection determines whether setbacks stay small or become permanent.',
  outcomePreview: 'You will understand why assets need protection, how risk exists everywhere, how small safeguards prevent big losses, and how planning reduces stress.',
  microLesson: `Assets take time to build and little time to lose. Protection is about reducing the chance that one event destroys years of progress. Most losses come from surprises, not bad intentions.

Protection works by preparing before problems happen. Insurance, emergency savings, and smart boundaries reduce damage when life goes wrong. These tools do not remove risk, but they limit how much harm risk can cause.

Many people ignore protection because it feels boring or unnecessary. Problems feel distant until they happen. When protection exists, setbacks become manageable instead of overwhelming.

Building wealth without protection is fragile. Protecting assets allows long-term plans to survive short-term shocks.`,
  flashcards: [
    {
      term: 'Asset Protection',
      definition: 'Asset protection means using tools and strategies to reduce the risk of losing what you own. Protection focuses on limiting damage from unexpected events.',
      philsAnalogy: 'Keeping savings separate from spending money so emergencies do not force debt.'
    },
    {
      term: 'Insurance',
      definition: 'Insurance is a contract that transfers risk from you to a company in exchange for regular payments. Insurance protects against large unexpected losses.',
      philsAnalogy: 'Health insurance covering expensive medical bills after an accident.'
    },
    {
      term: 'Emergency Fund',
      definition: 'An emergency fund is cash set aside for unexpected expenses. Emergency funds prevent the need for high interest debt.',
      philsAnalogy: 'Savings that cover several months of basic expenses.'
    },
    {
      term: 'Liability',
      definition: 'Liability is legal or financial responsibility for damage or harm. Liability risk increases when others can make claims against you.',
      philsAnalogy: 'Being responsible for damages after causing a car accident.'
    },
    {
      term: 'Risk Exposure',
      definition: 'Risk exposure is how likely you are to face a loss and how large that loss could be. Higher exposure requires stronger protection.',
      philsAnalogy: 'Owning valuable items without insurance increases exposure.'
    }
  ],
  simulatorGame: {
    title: 'Protect or Risk',
    description: 'Manage your assets over time while random life events occur. Build protection layers or face the consequences of being unprepared.',
    initialState: {
      weeklyIncome: 800,
      hourlyWage: 20,
      workHours: 40,
      fatigue: 20,
      freeTime: 30,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'emergency-fund-choice',
        title: 'Building Your Safety Net',
        description: 'You have extra money this month. How do you handle it?',
        choices: [
          {
            id: 'build-emergency-fund',
            label: 'Start an emergency fund',
            outcome: {
              incomeChange: -100,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'You set aside money for emergencies. This creates a buffer against unexpected costs.'
            }
          },
          {
            id: 'spend-now',
            label: 'Spend it on wants',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: -5,
              feedback: 'You enjoyed the money now, but have no protection if something goes wrong.'
            }
          },
          {
            id: 'ignore-decision',
            label: 'Leave it in checking',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Money sits idle without purpose. Easy to spend accidentally.'
            }
          }
        ]
      },
      {
        id: 'unexpected-expense',
        title: 'Medical Emergency',
        description: 'You need an unexpected medical procedure that costs $500.',
        choices: [
          {
            id: 'use-emergency-fund',
            label: 'Use emergency savings',
            outcome: {
              incomeChange: -200,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Your emergency fund covered most of the cost. Recovery is manageable.'
            }
          },
          {
            id: 'use-credit',
            label: 'Put it on credit',
            outcome: {
              incomeChange: -50,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: -5,
              feedback: 'You borrowed the money. Interest charges will add up over time.'
            }
          },
          {
            id: 'delay-treatment',
            label: 'Delay the treatment',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: -15,
              skillChange: -10,
              feedback: 'The problem got worse. Now it costs more to fix.'
            }
          }
        ]
      },
      {
        id: 'insurance-decision',
        title: 'Insurance Opportunity',
        description: 'You can add renters insurance for $15/month. Is it worth it?',
        choices: [
          {
            id: 'get-insurance',
            label: 'Get the insurance',
            outcome: {
              incomeChange: -15,
              fatigueChange: -5,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'Small monthly cost protects thousands in belongings. Peace of mind added.'
            }
          },
          {
            id: 'skip-insurance',
            label: 'Skip it for now',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: -5,
              feedback: 'You saved $15/month but your belongings remain unprotected.'
            }
          }
        ]
      },
      {
        id: 'theft-event',
        title: 'Laptop Stolen',
        description: 'Your laptop was stolen from your bag. It was worth $1,200.',
        choices: [
          {
            id: 'file-claim',
            label: 'File insurance claim',
            outcome: {
              incomeChange: 800,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 5,
              feedback: 'Insurance covered most of the loss. You only paid the deductible.'
            }
          },
          {
            id: 'replace-out-of-pocket',
            label: 'Replace out of pocket',
            outcome: {
              incomeChange: -1200,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: -5,
              feedback: 'Without insurance, the full cost came from your savings.'
            }
          },
          {
            id: 'go-without',
            label: 'Go without a laptop',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -20,
              skillChange: -15,
              feedback: 'Your productivity dropped significantly without proper equipment.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 600,
      maxFatigue: 60
    }
  },
  miniReflection: {
    question: 'Which asset in your life would hurt most to lose unexpectedly?',
    followUp: 'What one step could you take to protect it?'
  },
  quiz: [
    {
      question: 'Asset protection mainly exists to:',
      options: ['Increase returns', 'Prevent all risk', 'Limit damage', 'Speed growth'],
      correctIndex: 2,
      explanation: 'Asset protection limits the damage from unexpected events, not eliminates risk entirely.'
    },
    {
      question: 'Emergency funds help because:',
      options: ['They increase income', 'They replace insurance', 'They cover surprises', 'They remove effort'],
      correctIndex: 2,
      explanation: 'Emergency funds provide cash for unexpected expenses without needing debt.'
    },
    {
      question: 'Liability risk increases when:',
      options: ['Income rises', 'Responsibilities grow', 'Time passes', 'Markets fall'],
      correctIndex: 1,
      explanation: 'More responsibilities mean more situations where you could be held accountable.'
    },
    {
      question: 'Risk exposure describes:',
      options: ['Market returns', 'Emotional stress', 'Investment timeline', 'Loss likelihood and size'],
      correctIndex: 3,
      explanation: 'Risk exposure measures how likely a loss is and how large it could be.'
    },
    {
      question: 'Protection matters because:',
      options: ['Setbacks stay manageable', 'Problems disappear', 'Wealth becomes fragile', 'Growth accelerates'],
      correctIndex: 0,
      explanation: 'Good protection keeps setbacks manageable instead of devastating.'
    }
  ],
  powerMove: 'Build one layer of protection this month, like emergency savings or basic insurance knowledge.',
  realLifeAction: 'List three risks you face today and write one protection step for each risk.'
};
