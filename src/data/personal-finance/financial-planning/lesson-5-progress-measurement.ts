import { Lesson } from '@/types/personal-finance';

export const lesson5ProgressMeasurement: Lesson = {
  id: 'measuring-progress',
  title: 'Measuring Progress Without Comparison',
  estimatedMinutes: 12,
  
  moduleOverview: `This lesson teaches how to evaluate progress using personal goals instead of other people's outcomes. You learn why comparison distorts decision-making and how goal-based measurement builds confidence, consistency, and long-term follow-through.

Completion unlocks the Progress Tracker, which measures alignment and momentum instead of raw dollar amounts.`,

  realityHook: `Panda Phil scrolls through Bamboo City updates.

Another panda bought a bigger hut.
Another panda travels more.
Another panda earns more bamboo coins.

Phil feels behind, even though his plan is working.

You decide whether progress is measured by noise or by direction.`,

  outcomePreview: 'Mastering this lesson unlocks the Progress Tracker, allowing success to be measured against goals instead of external benchmarks.',

  microLesson: `Comparison creates false signals. When you judge progress based on other people's outcomes, you lose context about their goals, timelines, and tradeoffs. This leads to frustration even when your own plan is working as intended.

Goal-based measurement replaces comparison with clarity. Instead of asking whether you are ahead or behind others, you ask whether your actions move you closer to what you decided matters. This keeps decisions grounded in purpose rather than emotion.

Progress also looks different at different stages. Early phases often feel slow because foundations are being built. Comparing early-stage effort to someone else's later-stage outcome creates pressure to abandon good plans prematurely.

Measuring progress against your own goals protects consistency. Consistency compounds. Comparison interrupts it.`,

  flashcards: [
    {
      term: 'Comparison Trap',
      definition: 'The comparison trap occurs when you evaluate your progress using other people\'s outcomes instead of your own goals and timelines.',
      philsAnalogy: 'The comparison trap is racing someone running a different course.',
    },
    {
      term: 'Goal-based Measurement',
      definition: 'Goal-based measurement tracks progress by how well actions align with personal goals rather than external benchmarks.',
      philsAnalogy: 'Goal-based measurement is checking your map instead of watching other hikers.',
    },
    {
      term: 'Progress Signal',
      definition: 'A progress signal is feedback that shows whether actions are moving you closer to your intended outcome.',
      philsAnalogy: 'A progress signal is a trail marker confirming you are still on the right path.',
    },
    {
      term: 'Alignment Score',
      definition: 'An alignment score reflects how consistently decisions support stated goals over time.',
      philsAnalogy: 'An alignment score is how straight your path has been, not how fast you ran.',
    },
    {
      term: 'Consistency',
      definition: 'Consistency is the repeated execution of aligned decisions over time, even when progress feels slow.',
      philsAnalogy: 'Consistency is taking one step every day instead of sprinting once.',
    },
  ],

  simulatorGame: {
    title: 'Panda Progress Tracker',
    description: 'Learn how different measurement systems affect confidence and decision quality when external comparisons appear.',
    initialState: {
      weeklyIncome: 200,
      hourlyWage: 15,
      workHours: 13,
      fatigue: 20,
      freeTime: 40,
      skillLevel: 1,
    },
    scenarios: [
      {
        id: 'scenario-1',
        title: 'The Social Media Scroll',
        description: 'You open your phone. Three friends posted financial wins. You\'re 3 months into a 12-month goal. What do you measure?',
        choices: [
          {
            id: 'compare-others',
            label: 'Compare your progress to theirs',
            outcome: {
              incomeChange: 0,
              fatigueChange: 25,
              freeTimeChange: -5,
              skillChange: 0,
              feedback: 'You don\'t know their starting point, timeline, or tradeoffs. You only saw highlights. Now you feel behind on YOUR plan.',
            },
          },
          {
            id: 'check-alignment',
            label: 'Check your alignment score instead',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Your alignment is 85%! You\'re on track for YOUR goal. Their wins don\'t change your path.',
            },
          },
          {
            id: 'close-app',
            label: 'Close app and move on',
            outcome: {
              incomeChange: 0,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Smart avoidance. You protected your mental energy. But learning to measure correctly is more powerful.',
            },
          },
        ],
      },
      {
        id: 'scenario-2',
        title: 'The Slow Month',
        description: 'This month felt slow. You only moved 5% closer to your goal. Last month was 12%. How do you evaluate?',
        choices: [
          {
            id: 'feel-failure',
            label: 'This month was a failure',
            outcome: {
              incomeChange: 0,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: '5% is still forward progress. Labeling it "failure" creates shame that makes next month harder.',
            },
          },
          {
            id: 'check-trend',
            label: 'Zoom out: check 3-month trend',
            outcome: {
              incomeChange: 20,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: '3-month average: 8% per month! You\'re ahead of schedule. Single months vary. Trends tell truth.',
            },
          },
          {
            id: 'push-harder',
            label: 'Push harder next month to compensate',
            outcome: {
              incomeChange: 30,
              fatigueChange: 30,
              freeTimeChange: -10,
              skillChange: 0,
              feedback: 'Overcompensation leads to burnout. One slow month doesn\'t require punishment. Consistency beats intensity.',
            },
          },
        ],
      },
      {
        id: 'scenario-3',
        title: 'The Family Question',
        description: '"How\'s your savings going?" your parent asks. A cousin just bought a house. How do you answer?',
        choices: [
          {
            id: 'compare-cousin',
            label: '"Not as good as cousin—they bought a house"',
            outcome: {
              incomeChange: 0,
              fatigueChange: 15,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Your cousin has different goals, income, timeline, and maybe debt you don\'t see. Comparison is incomplete data.',
            },
          },
          {
            id: 'share-progress',
            label: '"I\'m 40% toward my goal, on schedule"',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'You measured yourself by your plan. Confidence is contagious. Your parent might even ask about your system.',
            },
          },
          {
            id: 'deflect',
            label: '"Fine, I guess" (deflect the question)',
            outcome: {
              incomeChange: 0,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You avoided comparison but missed a chance to reinforce your own progress story.',
            },
          },
        ],
      },
      {
        id: 'scenario-4',
        title: 'The Temptation to Switch',
        description: 'A friend\'s investment doubled in 6 months. Your steady plan gained 8%. What do you do?',
        choices: [
          {
            id: 'switch-strategy',
            label: 'Switch to their strategy—it\'s working better',
            outcome: {
              incomeChange: -50,
              fatigueChange: 25,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'You don\'t know their risk, timing, or luck factor. You abandoned a working plan for someone else\'s highlight reel.',
            },
          },
          {
            id: 'stay-course',
            label: 'Stay the course—your plan fits your goals',
            outcome: {
              incomeChange: 50,
              fatigueChange: -15,
              freeTimeChange: 0,
              skillChange: 1,
              feedback: 'Their strategy might not match your timeline, risk tolerance, or goal. Consistency with YOUR plan compounds.',
            },
          },
          {
            id: 'research-both',
            label: 'Research their approach before deciding',
            outcome: {
              incomeChange: 0,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 1,
              feedback: 'Good instinct to gather data. But beware analysis paralysis. Most "better" strategies look good in hindsight.',
            },
          },
        ],
      },
    ],
    winCondition: {
      minIncome: 250,
      maxFatigue: 50,
    },
  },

  miniReflection: {
    question: 'Which comparison made you question a plan that was already working?',
    followUp: 'What would help you trust your own progress more?',
  },

  quiz: [
    {
      question: 'Why does comparison often lead to poor decisions?',
      options: [
        'Other people earn more',
        'Context and timelines differ',
        'Goals are unrealistic',
        'Discipline weakens',
      ],
      correctIndex: 1,
      explanation: 'You see others\' outcomes without knowing their starting points, goals, risks, or tradeoffs—making comparison unfair and misleading.',
    },
    {
      question: 'Goal-based measurement focuses on:',
      options: [
        'Speed',
        'Status',
        'Alignment',
        'Income only',
      ],
      correctIndex: 2,
      explanation: 'Goal-based measurement asks whether your actions move you closer to YOUR defined outcome, not someone else\'s.',
    },
    {
      question: 'Consistency matters because:',
      options: [
        'It feels productive',
        'Motivation lasts forever',
        'Aligned actions compound',
        'Comparison disappears',
      ],
      correctIndex: 2,
      explanation: 'Consistent aligned actions build on each other over time, creating momentum that accelerates toward goals.',
    },
  ],

  powerMove: 'If you measure yourself by other people\'s outcomes, you will abandon your own plan too early.',

  realLifeAction: 'Write one metric you will use to measure progress that is based on your goals, not someone else\'s results.',
};
