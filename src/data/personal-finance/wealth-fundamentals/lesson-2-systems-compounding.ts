import { Lesson } from '@/types/personal-finance';

export const lesson2SystemsCompounding: Lesson = {
  id: 'wealth-fundamentals-2',
  title: 'Systems Thinking and Compounding Habits',
  estimatedMinutes: 12,
  moduleOverview: 'How systems build wealth more reliably than motivation, and why small habits compound into massive results.',
  realityHook: "You notice one student always seems prepared and calm. They turn in work on time and handle stress better than others. They're not smarter or working nonstop. They follow simple routines every day that make life easier over time. Wealth works the same way through systems.",
  outcomePreview: "You'll understand how systems guide behavior automatically and why consistency beats motivation every time.",
  microLesson: `A system is a set of rules or routines that guide behavior without constant decision making. Systems reduce reliance on motivation, which rises and falls every day. When systems exist, progress continues even during low energy periods.

**Compounding Habits**
Small actions repeated consistently grow into large outcomes over time. Saving small amounts, investing regularly, and controlling spending may feel slow at first, but results build quietly.

**Why Systems Beat Motivation**
Motivation is unreliable—it comes and goes based on mood, stress, and circumstances. Systems run regardless of how you feel. Automatic saving, planned investing, and spending limits remove emotion from decisions.

**The Power of Automation**
People who rely only on motivation often stop when things feel hard. People with systems continue without thinking. Automation removes friction and ensures progress happens.

**Feedback Loops**
Positive feedback loops reinforce good habits. Seeing savings grow motivates continued saving. Early wins create momentum.

If you want long-term results, design systems that work even when you feel distracted, tired, or emotional.`,
  flashcards: [
    {
      term: 'System',
      definition: 'A structured process or routine that guides actions consistently over time without constant decision-making.',
      philsAnalogy: "A system is like bamboo's root structure—once established, it grows automatically underground, preparing for explosive growth above."
    },
    {
      term: 'Compounding',
      definition: 'The process where small gains build on previous gains over time, accelerating growth through repetition.',
      philsAnalogy: "Bamboo grows inches daily, but over years it becomes a forest. Each day's growth becomes the foundation for tomorrow's."
    },
    {
      term: 'Habit',
      definition: 'A repeated behavior that happens with little conscious effort, shaping outcomes more than one-time decisions.',
      philsAnalogy: "Watering your bamboo daily is a habit. You don't think about it—you just do it. That consistency creates the forest."
    },
    {
      term: 'Automation',
      definition: 'Removing manual effort by letting systems run on their own, improving consistency and reducing mistakes.',
      philsAnalogy: "Automation is like installing an irrigation system. Your bamboo gets watered whether you remember or not."
    },
    {
      term: 'Feedback Loop',
      definition: 'A system where outcomes influence future behavior, with positive loops reinforcing good habits.',
      philsAnalogy: "Seeing your bamboo grow taller makes you want to water it more. Success breeds motivation to continue."
    }
  ],
  simulatorGame: {
    title: 'Build the System',
    description: 'Design financial systems that run automatically while motivation fades unpredictably.',
    initialState: {
      weeklyIncome: 900,
      hourlyWage: 22,
      workHours: 40,
      fatigue: 25,
      freeTime: 45,
      skillLevel: 35
    },
    scenarios: [
      {
        id: 'saving-approach',
        title: 'How Will You Save?',
        description: "You want to save 15% of your income. How do you make it happen?",
        choices: [
          {
            id: 'automate',
            label: 'Set up automatic transfer on payday',
            outcome: {
              incomeChange: 60,
              fatigueChange: -5,
              freeTimeChange: 5,
              skillChange: 10,
              feedback: 'Money moves before you can spend it. Savings grow consistently without willpower.'
            }
          },
          {
            id: 'manual',
            label: 'Transfer manually when you remember',
            outcome: {
              incomeChange: 20,
              fatigueChange: 10,
              freeTimeChange: -5,
              skillChange: 5,
              feedback: 'Some months you forget or "need" the money. Savings are inconsistent.'
            }
          }
        ]
      },
      {
        id: 'investing-system',
        title: 'Investment Decisions',
        description: "How do you handle investing your savings?",
        choices: [
          {
            id: 'systematic',
            label: 'Auto-invest same amount every month',
            outcome: {
              incomeChange: 80,
              fatigueChange: -5,
              freeTimeChange: 10,
              skillChange: 15,
              feedback: 'Dollar-cost averaging removes timing decisions. You invest in all market conditions.'
            }
          },
          {
            id: 'timing',
            label: 'Wait for the "right time" to invest',
            outcome: {
              incomeChange: 10,
              fatigueChange: 15,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'You keep waiting. Cash sits uninvested. Opportunities pass.'
            }
          }
        ]
      },
      {
        id: 'spending-control',
        title: 'Spending Controls',
        description: "How do you manage your spending?",
        choices: [
          {
            id: 'system-limits',
            label: 'Set spending limits and track weekly',
            outcome: {
              incomeChange: 50,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'Regular check-ins catch problems early. Spending stays controlled.'
            }
          },
          {
            id: 'hope-best',
            label: 'Check balance only when worried',
            outcome: {
              incomeChange: -30,
              fatigueChange: 20,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'Problems compound unseen. Stress spikes when you finally check.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1100,
      maxFatigue: 55
    }
  },
  miniReflection: {
    question: "Which system would improve your life the most if it ran automatically?",
    followUp: "What's stopping you from setting it up today?"
  },
  quiz: [
    {
      question: "Systems matter because",
      options: ["They remove all financial risk", "They replace the need for any discipline", "They guide behavior automatically without constant decisions", "They increase income instantly"],
      correctIndex: 2,
      explanation: "Systems automate good behavior so progress continues without constant decision-making."
    },
    {
      question: "Compounding fails when",
      options: ["Actions are repeated consistently", "Habits stay strong over time", "Systems break or stop running", "More time passes"],
      correctIndex: 2,
      explanation: "Compounding requires consistency—when systems break, the chain of small gains stops."
    },
    {
      question: "Automation helps because",
      options: ["It makes finances more exciting", "It removes the need to think about money", "It ensures actions happen consistently regardless of mood", "It predicts market movements"],
      correctIndex: 2,
      explanation: "Automation ensures actions happen consistently regardless of mood or circumstances."
    },
    {
      question: "Habits matter most because",
      options: ["They feel productive in the moment", "They look impressive to others", "They shape daily behavior which compounds over time", "They require significant effort"],
      correctIndex: 2,
      explanation: "Habits shape outcomes through daily repeated behavior, which compounds over time."
    },
    {
      question: "Feedback loops help by",
      options: ["Creating pressure to perform", "Increasing your spending power", "Showing results that reinforce continued good behavior", "Reducing the time needed to build wealth"],
      correctIndex: 2,
      explanation: "Positive feedback loops reinforce good habits by showing results that motivate continued action."
    }
  ],
  powerMove: "Automate one financial habit this week—saving, investing, or bill payment—and commit to leaving it untouched for 6 months.",
  realLifeAction: "Identify one habit that causes money stress and design a simple system to replace it. Write down the trigger, routine, and expected outcome."
};
