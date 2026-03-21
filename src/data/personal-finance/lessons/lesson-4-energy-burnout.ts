import { Lesson } from '@/types/personal-finance';

export const lesson4EnergyBurnout: Lesson = {
  id: 'active-income-lesson-4',
  title: 'Energy, Burnout, and Sustainable Work',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains why working more hours often backfires and how energy, focus, and recovery determine income quality. You learn how fatigue quietly lowers value and why protecting energy leads to higher pay and better opportunities over time.',
  realityHook: `You take extra shifts for several weeks.
Your income rises at first.
Your performance starts slipping.

You feel tired, distracted, and behind.
Your pay stops moving.

You decide whether more work is helping or hurting.`,
  outcomePreview: 'Mastering this lesson protects your income engine and improves long-term earning capacity.',
  microLesson: `More hours increase income only up to a point. After that point, fatigue reduces focus, speed, and judgment. Mistakes increase. Learning slows. Reliability drops. Even if your hours stay high, your value quietly falls. Many people confuse exhaustion with progress and do not realize their income growth has stalled.

Energy is a resource. It affects how well you perform, how quickly you learn, and how others perceive your reliability. High energy allows you to take on harder tasks, build skills faster, and earn trust. Low energy locks you into basic work because there is no capacity left to grow.

Sustainable income comes from balancing effort and recovery. Short bursts of intensity help when used intentionally. Long periods of overwork reduce output quality and limit future options. People who manage energy well stay consistent, improve faster, and remain valuable over time.

Protecting energy is not laziness. It is maintenance for your earning ability.`,
  flashcards: [
    {
      term: 'Burnout',
      definition: 'Burnout is a state where prolonged fatigue reduces performance, focus, and motivation, lowering your value even if you work more hours.',
      philsAnalogy: 'Burnout is running an engine without oil. The engine still moves, but damage builds quietly.'
    },
    {
      term: 'Energy budget',
      definition: 'An energy budget is the limited amount of focused effort you can spend before performance begins to decline.',
      philsAnalogy: 'Your energy budget is a battery, not a wall outlet.'
    },
    {
      term: 'Diminishing returns',
      definition: 'Diminishing returns occur when each additional hour worked produces less useful output than the hour before.',
      philsAnalogy: 'Diminishing returns are pouring water into a glass that is already full.'
    },
    {
      term: 'Recovery',
      definition: 'Recovery is the process of restoring energy so performance, learning, and focus return to high levels.',
      philsAnalogy: 'Recovery is sharpening the blade instead of forcing a dull cut.'
    },
    {
      term: 'Sustainability',
      definition: 'Sustainability means maintaining performance and income growth without physical or mental breakdown.',
      philsAnalogy: 'Sustainability is pacing a long race instead of sprinting the opening stretch.'
    }
  ],
  simulatorGame: {
    title: 'Energy Management Simulator',
    description: 'Learn how energy management affects income quality and growth.',
    initialState: {
      weeklyIncome: 480,
      hourlyWage: 12,
      workHours: 40,
      fatigue: 30,
      freeTime: 20,
      skillLevel: 30
    },
    scenarios: [
      {
        id: 'overtime-offer',
        title: 'Overtime Opportunity',
        description: 'Extra shifts are available this month. The pay is good, but you\'re already feeling tired from a busy week.',
        choices: [
          {
            id: 'take-overtime',
            label: 'Take all available overtime',
            outcome: {
              incomeChange: 80,
              fatigueChange: 40,
              freeTimeChange: -25,
              skillChange: -5,
              feedback: 'Income spiked, but fatigue is building. Your performance quality is starting to slip without you noticing.'
            }
          },
          {
            id: 'selective-overtime',
            label: 'Take one extra shift only',
            outcome: {
              incomeChange: 30,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'Balanced approach. Extra income without draining your energy reserves. You can still learn and grow.'
            }
          },
          {
            id: 'skip-overtime',
            label: 'Skip overtime and recover',
            outcome: {
              incomeChange: 0,
              fatigueChange: -15,
              freeTimeChange: 10,
              skillChange: 10,
              feedback: 'You invested in recovery. Next week you\'ll perform better and have capacity for skill growth.'
            }
          }
        ]
      },
      {
        id: 'fatigue-warning',
        title: 'Signs of Burnout',
        description: 'You\'ve been pushing hard for weeks. Mistakes are creeping in, and you missed an important detail yesterday.',
        choices: [
          {
            id: 'push-through',
            label: 'Push through—you need the money',
            outcome: {
              incomeChange: 20,
              fatigueChange: 35,
              freeTimeChange: -10,
              skillChange: -15,
              feedback: 'Diminishing returns hit hard. Your output quality dropped, and your manager noticed. Wage growth stalled.'
            }
          },
          {
            id: 'reduce-hours',
            label: 'Reduce hours temporarily',
            outcome: {
              incomeChange: -20,
              fatigueChange: -30,
              freeTimeChange: 20,
              skillChange: 10,
              feedback: 'Smart recovery. Lower income this week, but you restored your earning engine for the long run.'
            }
          }
        ]
      },
      {
        id: 'weekend-choice',
        title: 'Weekend Decision',
        description: 'You have the weekend off. How do you spend it?',
        choices: [
          {
            id: 'work-weekend',
            label: 'Pick up a weekend shift',
            outcome: {
              incomeChange: 40,
              fatigueChange: 25,
              freeTimeChange: -20,
              skillChange: 0,
              feedback: 'More money, but no recovery. Monday will feel harder, and the cycle continues.'
            }
          },
          {
            id: 'rest-weekend',
            label: 'Rest and recharge',
            outcome: {
              incomeChange: 0,
              fatigueChange: -25,
              freeTimeChange: 15,
              skillChange: 5,
              feedback: 'Recovery complete. You\'ll start Monday with high energy and better performance quality.'
            }
          },
          {
            id: 'skill-weekend',
            label: 'Learn something new',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'Investment in future value. The skill you learned will compound into higher earnings over time.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 520,
      maxFatigue: 60
    }
  },
  miniReflection: {
    question: 'At what point did working more stop helping and start hurting?'
  },
  quiz: [
    {
      question: 'Why does burnout reduce income growth?',
      options: ['Employers dislike overtime', 'Fatigue lowers performance quality', 'Hours stop counting', 'Skills disappear'],
      correctIndex: 1,
      explanation: 'Burnout degrades your output quality, learning speed, and reliability—all factors that determine wage growth.'
    },
    {
      question: 'Energy affects income because it influences',
      options: ['Motivation only', 'Luck', 'Performance and learning', 'Job titles'],
      correctIndex: 2,
      explanation: 'Energy determines how well you perform and how quickly you learn—both directly impact your earning potential.'
    },
    {
      question: 'Sustainable work means',
      options: ['Working fewer hours always', 'Avoiding effort', 'Balancing effort and recovery', 'Ignoring deadlines'],
      correctIndex: 2,
      explanation: 'Sustainability is about maintaining high performance over time by balancing output with recovery.'
    }
  ],
  powerMove: 'Protect your energy the same way you protect your money. Both fund your future.',
  realLifeAction: 'Notice one moment this week when rest would improve your performance more than extra effort.'
};
