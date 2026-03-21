import { Lesson } from '@/types/personal-finance';

export const lesson3Negotiation: Lesson = {
  id: 'active-income-lesson-3',
  title: 'Negotiation and Pay Movement',
  estimatedMinutes: 12,
  moduleOverview: 'This lesson explains why pay changes actually happen and why many people never see them. You learn that negotiation is not about confidence or confrontation. It is about timing, proof, and leverage. The goal is to understand when pay moves and how to position yourself so asking makes sense.',
  realityHook: `You and a coworker started at the same pay.
You work the same hours.
Six months later, they earn more per hour.

They did not work longer.
They did not threaten to quit.

They asked at the right moment.

You decide whether to do nothing or speak up.`,
  outcomePreview: 'Mastering this lesson increases your negotiation success rate and unlocks wage adjustment opportunities later.',
  microLesson: `Pay does not increase just because time passes. It increases when your contribution changes in a way that others can feel. Most people avoid negotiation because they believe asking is awkward or risky. In reality, asking without preparation is what creates discomfort, not the conversation itself.

Negotiation works best after value is already visible. That value shows up through results, reliability, or responsibility. When your work reduces problems, improves outcomes, or saves time for others, replacement becomes harder. At that point, pay that stays flat feels misaligned.

Timing matters because leverage changes over time. Asking before value is proven feels premature. Asking long after value is obvious feels overdue. The strongest moment is when your contribution is clear and fresh. Evidence anchors the conversation and removes emotion.

Negotiation is not a demand. It is a recalibration. You are aligning pay with impact. When that alignment makes sense, negotiation feels less like risk and more like maintenance.`,
  flashcards: [
    {
      term: 'Negotiation',
      definition: 'Negotiation is a structured conversation that aligns pay with contribution and impact, not effort or time worked.',
      philsAnalogy: 'Negotiation is adjusting the thermostat after the room temperature has already changed.'
    },
    {
      term: 'Leverage point',
      definition: 'A leverage point is a moment when your value is visible and replacing you would be costly or disruptive.',
      philsAnalogy: 'A leverage point is asking for a seat when every chair is already taken.'
    },
    {
      term: 'Value evidence',
      definition: 'Value evidence is clear proof that your work improves outcomes, reduces risk, or saves time for others.',
      philsAnalogy: 'Value evidence is showing receipts instead of telling stories.'
    },
    {
      term: 'Timing',
      definition: 'Timing is choosing the moment when your contribution is fresh, visible, and hardest to ignore.',
      philsAnalogy: 'Timing is pushing when the door is already swinging open.'
    },
    {
      term: 'Pay adjustment',
      definition: 'A pay adjustment is a change in compensation that reflects increased responsibility, results, or scope.',
      philsAnalogy: 'A pay adjustment is recalibrating a scale after the weight changes.'
    }
  ],
  simulatorGame: {
    title: 'Negotiation Timing Simulator',
    description: 'Learn when asking for higher pay works and when it backfires.',
    initialState: {
      weeklyIncome: 450,
      hourlyWage: 11.25,
      workHours: 40,
      fatigue: 25,
      freeTime: 25,
      skillLevel: 25
    },
    scenarios: [
      {
        id: 'early-ask',
        title: 'First Month on the Job',
        description: 'You just started and feel you deserve more based on your experience. Your manager seems friendly.',
        choices: [
          {
            id: 'ask-now',
            label: 'Ask for a raise now',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Too early. You have no proven value here yet. The request felt presumptuous and created awkwardness.'
            }
          },
          {
            id: 'wait-build',
            label: 'Wait and build value first',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'Smart timing. You\'re building evidence before making a case. Leverage comes from proof, not hope.'
            }
          }
        ]
      },
      {
        id: 'project-success',
        title: 'After a Big Win',
        description: 'You just solved a major problem that saved the team hours of work. Everyone noticed, including your manager.',
        choices: [
          {
            id: 'strike-now',
            label: 'Request a raise meeting',
            outcome: {
              incomeChange: 50,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'Perfect timing. Your value is fresh and visible. The evidence anchored the conversation. Raise granted.'
            }
          },
          {
            id: 'wait-more',
            label: 'Wait for performance review',
            outcome: {
              incomeChange: 20,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'By review time, the impact faded from memory. You got a standard increase, not what you deserved.'
            }
          }
        ]
      },
      {
        id: 'evidence-choice',
        title: 'Preparing Your Case',
        description: 'You\'re ready to negotiate. How do you approach the conversation?',
        choices: [
          {
            id: 'show-receipts',
            label: 'Present specific results and outcomes',
            outcome: {
              incomeChange: 40,
              fatigueChange: 0,
              freeTimeChange: 0,
              skillChange: 10,
              feedback: 'Value evidence removes emotion. Your manager saw clear impact and the adjustment felt logical.'
            }
          },
          {
            id: 'mention-effort',
            label: 'Emphasize how hard you\'ve worked',
            outcome: {
              incomeChange: 10,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Effort alone isn\'t compelling. Everyone works hard. Results are what create leverage.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 550,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: 'What made the moment you chose to ask feel right or wrong?'
  },
  quiz: [
    {
      question: 'Negotiation works best when',
      options: ['You feel underpaid', 'You worked long hours', 'Your value is visible', 'You are frustrated'],
      correctIndex: 2,
      explanation: 'Feelings don\'t create leverage—visible results do. Negotiate when your impact is clear and fresh.'
    },
    {
      question: 'Why does timing matter in negotiation?',
      options: ['Managers dislike conversations', 'Replacement cost changes over time', 'Effort fades quickly', 'Titles expire'],
      correctIndex: 1,
      explanation: 'Your leverage depends on how costly it would be to replace you at that moment. Timing affects leverage.'
    },
    {
      question: 'Value evidence refers to',
      options: ['Time spent working', 'Personal effort', 'Measurable results', 'Seniority'],
      correctIndex: 2,
      explanation: 'Evidence means proof of outcomes—things others can see and measure, not just your internal effort.'
    }
  ],
  powerMove: 'Do not ask to be paid more until you are already harder to replace.',
  realLifeAction: 'Write down one outcome this week that someone else relied on because of your work.'
};
