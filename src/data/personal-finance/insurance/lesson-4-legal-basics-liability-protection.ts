import { Lesson } from '@/types/personal-finance';

export const lesson4LegalBasicsLiabilityProtection: Lesson = {
  id: 'legal-basics-liability-protection',
  title: 'Legal Basics and Liability Protection',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains basic legal risk and liability in everyday life. You learn how responsibility works, why liability protection matters, and how simple choices reduce legal exposure.',
  realityHook: 'You help organize an event with friends. Someone gets hurt and blames the group. A simple situation turns into a legal problem that costs time, money, and stress. Liability protection determines whether mistakes become manageable or overwhelming.',
  outcomePreview: 'You will understand how liability creates financial risk, how legal responsibility follows actions, how protection limits damage, and how planning reduces conflict.',
  microLesson: `Liability means being responsible for harm or damage caused to others. Legal responsibility can come from accidents, mistakes, or misunderstandings. Even small incidents can lead to large costs without protection.

Liability protection limits how much damage a claim can cause. Insurance, clear agreements, and cautious behavior reduce exposure. Protection does not remove responsibility, but it controls consequences.

Many people ignore legal risk because problems feel unlikely. Risk feels invisible until something happens. Planning ahead prevents small issues from becoming long-term problems.

Understanding liability helps you make safer decisions. Protection allows you to take opportunities without risking everything you own.`,
  flashcards: [
    {
      term: 'Liability',
      definition: 'Liability is legal responsibility for injury, damage, or loss caused to others. Liability can result in financial claims or legal action.',
      philsAnalogy: 'Being responsible for damages after causing an accident at an event.'
    },
    {
      term: 'Legal Risk',
      definition: 'Legal risk is the chance of facing lawsuits or claims because of actions taken. Legal risk increases with responsibility and exposure.',
      philsAnalogy: 'Hosting activities where others could get hurt.'
    },
    {
      term: 'Liability Insurance',
      definition: 'Liability insurance helps cover costs if you are legally responsible for harm. It protects assets from large claims.',
      philsAnalogy: 'Insurance covering damages after an accident involving property or people.'
    },
    {
      term: 'Negligence',
      definition: 'Negligence means failing to act with reasonable care. Negligence increases liability when harm occurs.',
      philsAnalogy: 'Ignoring safety rules that lead to someone getting injured.'
    },
    {
      term: 'Contract',
      definition: 'A contract is a legal agreement that defines responsibilities and expectations. Clear contracts reduce disputes.',
      philsAnalogy: 'A written agreement outlining responsibilities for a shared project.'
    }
  ],
  simulatorGame: {
    title: 'Risk and Responsibility',
    description: 'Make decisions that increase opportunity and legal exposure. Learn to balance growth with protection.',
    initialState: {
      weeklyIncome: 850,
      hourlyWage: 21,
      workHours: 40,
      fatigue: 20,
      freeTime: 30,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'side-business',
        title: 'Starting a Side Business',
        description: 'You want to start tutoring students on the side. How do you structure it?',
        choices: [
          {
            id: 'informal-cash',
            label: 'Keep it informal, cash only',
            outcome: {
              incomeChange: 200,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'Quick start, but no protection if a parent claims you harmed their child\'s education.'
            }
          },
          {
            id: 'formal-with-contract',
            label: 'Create a simple contract and liability waiver',
            outcome: {
              incomeChange: 180,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'Takes more setup, but clear expectations protect everyone.'
            }
          },
          {
            id: 'full-business-setup',
            label: 'Form an LLC and get business insurance',
            outcome: {
              incomeChange: 100,
              fatigueChange: 20,
              freeTimeChange: -20,
              skillChange: 20,
              feedback: 'Most protection but higher costs. Personal assets are separated from business liability.'
            }
          }
        ]
      },
      {
        id: 'event-planning',
        title: 'Organizing a Community Event',
        description: 'Friends ask you to help plan a charity 5K run. You\'ll be listed as an organizer.',
        choices: [
          {
            id: 'just-help-out',
            label: 'Help out without formal role',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'Less visible, but if something goes wrong, you might still be included in any claims.'
            }
          },
          {
            id: 'require-waivers',
            label: 'Insist on liability waivers for all participants',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'Waivers reduce risk. Participants acknowledge potential dangers.'
            }
          },
          {
            id: 'get-event-insurance',
            label: 'Push for event liability insurance',
            outcome: {
              incomeChange: -50,
              fatigueChange: 20,
              freeTimeChange: -20,
              skillChange: 20,
              feedback: 'Best protection. Insurance covers injuries or property damage claims.'
            }
          }
        ]
      },
      {
        id: 'car-accident',
        title: 'Minor Traffic Accident',
        description: 'You accidentally back into another car in a parking lot. Small dent, no injuries.',
        choices: [
          {
            id: 'leave-scene',
            label: 'Drive away, no one saw',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: -20,
              feedback: 'Illegal. If caught later, penalties are much worse than handling it properly.'
            }
          },
          {
            id: 'leave-note',
            label: 'Leave a note with your information',
            outcome: {
              incomeChange: -200,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Right thing to do. Your insurance handles most of the cost.'
            }
          },
          {
            id: 'wait-for-owner',
            label: 'Wait for the owner and exchange information',
            outcome: {
              incomeChange: -200,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: 15,
              feedback: 'Best approach. Clear communication prevents disputes later.'
            }
          }
        ]
      },
      {
        id: 'roommate-agreement',
        title: 'Roommate Situation',
        description: 'You\'re moving in with roommates. How do you handle the lease and responsibilities?',
        choices: [
          {
            id: 'verbal-agreement',
            label: 'Just trust each other, no formal agreement',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: -5,
              feedback: 'Easy now, but if someone doesn\'t pay rent, you\'re all liable to the landlord.'
            }
          },
          {
            id: 'written-agreement',
            label: 'Create a written roommate agreement',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'Clear expectations reduce conflicts. Everyone knows their responsibilities.'
            }
          },
          {
            id: 'separate-leases',
            label: 'Ask landlord for separate lease sections',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'Most protection. Each person is only responsible for their portion.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 600,
      maxFatigue: 65
    }
  },
  miniReflection: {
    question: 'Which responsibility in your life carries the most legal risk?',
    followUp: 'What protection, if any, do you have for it?'
  },
  quiz: [
    {
      question: 'Legal liability increases when:',
      options: ['Responsibility grows', 'Income rises', 'Time passes', 'Markets fall'],
      correctIndex: 0,
      explanation: 'More responsibilities create more situations where you could be held accountable.'
    },
    {
      question: 'Negligence means:',
      options: ['Bad luck', 'Intentional harm', 'Lack of reasonable care', 'Legal immunity'],
      correctIndex: 2,
      explanation: 'Negligence is failing to act with the care a reasonable person would use.'
    },
    {
      question: 'Liability insurance helps by:',
      options: ['Covering claims against you', 'Preventing accidents', 'Increasing profits', 'Removing all responsibility'],
      correctIndex: 0,
      explanation: 'Liability insurance pays for claims when you\'re found responsible for harm.'
    },
    {
      question: 'Contracts help because:',
      options: ['They increase trust', 'They eliminate risk', 'They guarantee outcomes', 'They clarify expectations'],
      correctIndex: 3,
      explanation: 'Written contracts make responsibilities clear, reducing misunderstandings.'
    },
    {
      question: 'Legal risk matters because:',
      options: ['Laws change often', 'Costs can escalate quickly', 'Insurance always fails', 'Growth stops'],
      correctIndex: 1,
      explanation: 'Small legal issues can become very expensive if not handled properly.'
    }
  ],
  powerMove: 'Identify one situation where liability exists and add one layer of protection.',
  realLifeAction: 'Ask an adult how they protect themselves from legal or liability risk.'
};
