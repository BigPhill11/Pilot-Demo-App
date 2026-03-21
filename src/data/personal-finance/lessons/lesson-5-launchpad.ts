import { Lesson } from '@/types/personal-finance';

export const lesson5Launchpad: Lesson = {
  id: 'active-income-lesson-5',
  title: 'Using Active Income as a Launchpad',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson teaches how early income choices either expand future options or lock you into place. You learn why higher pay alone does not create progress and how to use active income to buy time, skills, and flexibility that unlock higher-level income paths.',
  realityHook: `Your paycheck increases.
Your spending increases with it.

You feel busier, not freer.
Nothing about your future changed.

You decide whether to upgrade comfort or upgrade options.`,
  outcomePreview: 'Mastering this lesson unlocks reinvestment mechanics and future income transition opportunities.',
  microLesson: `Active income gives you choice. The mistake many people make is using every increase in income to increase comfort. When spending rises at the same speed as earnings, progress stalls even though life feels fuller. Motion replaces momentum.

Using active income as a launchpad means directing early earnings toward things that expand future earning power. That includes learning skills, buying time, and creating flexibility. Small sacrifices early often create large advantages later because they reduce pressure and increase options.

Wealth builders treat early income like fuel, not a reward. Fuel goes into the engine so the system can move faster and farther. When income is reinvested instead of consumed, it creates runway. Runway allows experimentation, learning, and smarter risk.

The question that matters is not how much you earn today. The question is what today's income makes possible tomorrow.`,
  flashcards: [
    {
      term: 'Lifestyle inflation',
      definition: 'Lifestyle inflation happens when spending rises alongside income, preventing savings, flexibility, and progress despite higher pay.',
      philsAnalogy: 'Lifestyle inflation is running faster on a treadmill without moving forward.'
    },
    {
      term: 'Optionality',
      definition: 'Optionality is the ability to choose between multiple paths because you have time, money, or skills available.',
      philsAnalogy: 'Optionality is having more than one exit door open.'
    },
    {
      term: 'Reinvestment',
      definition: 'Reinvestment is using income to increase future earning power rather than immediate comfort.',
      philsAnalogy: 'Reinvestment is planting seeds instead of eating the harvest.'
    },
    {
      term: 'Runway',
      definition: 'Runway is the amount of time your savings or income buffer gives you to learn, experiment, or change direction safely.',
      philsAnalogy: 'Runway is fuel before takeoff.'
    },
    {
      term: 'Transition point',
      definition: 'A transition point is when active income enables movement into new income types or opportunities.',
      philsAnalogy: 'A transition point is leaving the on-ramp and merging onto the highway.'
    }
  ],
  simulatorGame: {
    title: 'Launchpad Allocator',
    description: 'Decide how to use income increases to shape future options.',
    initialState: {
      weeklyIncome: 520,
      hourlyWage: 13,
      workHours: 40,
      fatigue: 25,
      freeTime: 25,
      skillLevel: 40
    },
    scenarios: [
      {
        id: 'first-raise',
        title: 'Your First Raise',
        description: 'You just got a $100/month raise. How do you use it?',
        choices: [
          {
            id: 'upgrade-lifestyle',
            label: 'Upgrade your phone and subscriptions',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Comfort increased, but nothing changed about your future. Lifestyle inflation absorbed the raise.'
            }
          },
          {
            id: 'save-half',
            label: 'Save half, spend half',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Balanced choice. You enjoy some benefit while building a small runway for future options.'
            }
          },
          {
            id: 'reinvest-all',
            label: 'Put it all toward learning or savings',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'Full reinvestment. Short-term sacrifice creates long-term optionality. Your runway is growing.'
            }
          }
        ]
      },
      {
        id: 'opportunity-appears',
        title: 'A New Path Opens',
        description: 'A certification course could unlock a higher-paying role. It costs money and time. Do you have the runway?',
        choices: [
          {
            id: 'take-course',
            label: 'Invest in the certification',
            outcome: {
              incomeChange: 60,
              fatigueChange: 15,
              freeTimeChange: -20,
              skillChange: 25,
              feedback: 'Your reinvestment paid off. The certification opened a transition point to higher income.'
            }
          },
          {
            id: 'cant-afford',
            label: 'Can\'t afford it right now',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Without runway, opportunities pass by. This is why reinvestment creates future options.'
            }
          }
        ]
      },
      {
        id: 'comfort-trap',
        title: 'The Comfort Trap',
        description: 'Friends suggest moving to a nicer apartment now that you earn more. Your current place is fine.',
        choices: [
          {
            id: 'upgrade-apartment',
            label: 'Move to the nicer place',
            outcome: {
              incomeChange: -80,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Comfort rose, but runway shrunk. Future flexibility decreased. You feel richer but aren\'t.'
            }
          },
          {
            id: 'stay-put',
            label: 'Stay and save the difference',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'You preserved optionality. The saved money becomes runway for future transitions.'
            }
          }
        ]
      },
      {
        id: 'final-choice',
        title: 'Transition Ready',
        description: 'After months of reinvestment, you have enough runway to take a risk. A side opportunity appears that could change your income type.',
        choices: [
          {
            id: 'take-leap',
            label: 'Use your runway to pursue it',
            outcome: {
              incomeChange: 100,
              fatigueChange: 20,
              freeTimeChange: -15,
              skillChange: 30,
              feedback: 'Transition successful. Your early reinvestment created the runway to take this leap. Income path unlocked.'
            }
          },
          {
            id: 'play-safe',
            label: 'Keep the runway for later',
            outcome: {
              incomeChange: 20,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 5,
              feedback: 'Conservative choice. Runway preserved, but the opportunity window closed. Timing matters.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 620,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: 'Which choice felt harder to delay, comfort now or options later?'
  },
  quiz: [
    {
      question: 'Lifestyle inflation prevents progress because',
      options: ['Income drops', 'Spending rises with income', 'Taxes increase', 'Work disappears'],
      correctIndex: 1,
      explanation: 'When spending matches every raise, you never build runway or optionality despite earning more.'
    },
    {
      question: 'Reinvestment mainly creates',
      options: ['Short-term comfort', 'Long-term options', 'More hours', 'Less income'],
      correctIndex: 1,
      explanation: 'Reinvestment trades today\'s comfort for tomorrow\'s flexibility and earning potential.'
    },
    {
      question: 'Runway matters because it provides',
      options: ['Status', 'Time and flexibility', 'Titles', 'Stability only'],
      correctIndex: 1,
      explanation: 'Runway gives you the time and safety to learn, experiment, and transition to better paths.'
    }
  ],
  powerMove: 'Do not use your income to look richer. Use it to become freer.',
  realLifeAction: 'Before your next purchase, ask whether it increases comfort or expands options.'
};
