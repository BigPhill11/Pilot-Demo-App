import { Lesson } from '@/types/personal-finance';

export const lesson5MultipleIncomeStreams: Lesson = {
  id: 'career-income-5',
  title: 'Building Multiple Income Streams',
  estimatedMinutes: 12,
  moduleOverview: "The wealthy don't rely on one income source. Financial freedom comes from building multiple streams that work together.",
  realityHook: "The average millionaire has 7 income streams. But here's the secret: they usually built them one at a time, starting with their primary career.",
  outcomePreview: "You'll understand different income types and create a roadmap to diversify your income over time.",
  microLesson: `One income source = one point of failure. Multiple streams = financial resilience and freedom.

**The Income Stream Hierarchy**
Build in this order (most people get this wrong):

1. **Active Income (Your Job)**: Maximize this first. It funds everything else.
2. **Active Side Income**: Skills-based freelancing, consulting, gig work
3. **Portfolio Income**: Dividends, interest, capital gains
4. **Passive Business Income**: Businesses that run without you
5. **Royalty/Licensing Income**: Content, products, intellectual property

**Active vs. Passive: The Reality**
- Active: Trade time for money (jobs, freelancing)
- Passive: Systems generate money (investments, automated businesses)

The myth: Passive income is easy.
The reality: Passive income requires massive upfront investment of time, money, or both.

**The Income Ladder Strategy**
1. Get great at your job (maximize active income)
2. Use excess to invest (build portfolio income)
3. Use skills to freelance (active side income)
4. Productize your skills (scalable income)
5. Build systems that work without you (true passive)

**Warning Signs of Income Stream Scams**
- "Make $10K/month with no work!"
- Requires big upfront investment to "unlock" the opportunity
- Success depends on recruiting others
- No clear value being created

**Financial Freedom Formula**
Financial Freedom = Passive Income > Expenses

When your investments and systems generate more than you spend, work becomes optional.`,
  flashcards: [
    {
      term: 'Active Income',
      definition: 'Money earned by trading your time and labor, such as salaries, hourly wages, or freelancing.',
      philsAnalogy: "You show up, you get paid. You stop showing up, the money stops. It's the foundation, but don't stop here."
    },
    {
      term: 'Passive Income',
      definition: 'Money earned from assets or systems that generate revenue with minimal ongoing effort.',
      philsAnalogy: "Like planting a bamboo forest. Years of work upfront, then it grows and produces without you. But it takes years, not weeks."
    },
    {
      term: 'Portfolio Income',
      definition: 'Income generated from investments including dividends, interest, and capital gains.',
      philsAnalogy: "Your money working while you sleep. But first you need money to invest—that's why career income comes first."
    },
    {
      term: 'Productized Service',
      definition: 'Taking a skill you do as a service and packaging it into a scalable product.',
      philsAnalogy: "Instead of writing reports one by one, create a template and sell it 1,000 times. Same expertise, unlimited customers."
    }
  ],
  simulatorGame: {
    title: 'The Income Architect',
    description: 'Build multiple income streams strategically over time.',
    initialState: {
      weeklyIncome: 1200,
      hourlyWage: 30,
      workHours: 40,
      fatigue: 25,
      freeTime: 40,
      skillLevel: 50
    },
    scenarios: [
      {
        id: 'first-side-income',
        title: 'First Side Hustle',
        description: "You have some extra time. How do you start building additional income?",
        choices: [
          {
            id: 'skill-freelance',
            label: 'Freelance using your existing professional skills',
            outcome: {
              incomeChange: 150,
              fatigueChange: 20,
              freeTimeChange: -25,
              skillChange: 15,
              feedback: 'Smart start! You\'re leveraging skills you already have. Income builds on your expertise.'
            }
          },
          {
            id: 'random-gig',
            label: 'Try random gig work (delivery, rideshare)',
            outcome: {
              incomeChange: 60,
              fatigueChange: 25,
              freeTimeChange: -30,
              skillChange: 0,
              feedback: 'Income is income, but this doesn\'t build toward anything. Time traded at low rates.'
            }
          },
          {
            id: 'mlm',
            label: 'Join a "business opportunity" that promises passive income',
            outcome: {
              incomeChange: -30,
              fatigueChange: 20,
              freeTimeChange: -20,
              skillChange: 0,
              feedback: 'Scam alert! You lost money and time. If income seems too easy, it\'s not real.'
            }
          }
        ]
      },
      {
        id: 'invest-or-hustle',
        title: 'Extra $500/Month',
        description: "Your side hustle is generating an extra $500/month. What do you do with it?",
        choices: [
          {
            id: 'invest',
            label: 'Invest it to build portfolio income',
            outcome: {
              incomeChange: 100,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: 10,
              feedback: 'Building the next income stream! In 10 years, this could generate significant passive income.'
            }
          },
          {
            id: 'lifestyle',
            label: 'Upgrade your lifestyle',
            outcome: {
              incomeChange: 0,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'Feels good now, but you\'re not building toward freedom. Lifestyle creep is a trap.'
            }
          }
        ]
      },
      {
        id: 'productize',
        title: 'Scale Decision',
        description: "You're great at freelancing but hitting a time ceiling. What's your next move?",
        choices: [
          {
            id: 'productize-skill',
            label: 'Create a digital product or course from your expertise',
            outcome: {
              incomeChange: 250,
              fatigueChange: 30,
              freeTimeChange: -30,
              skillChange: 25,
              feedback: 'Productizing! Upfront work but now you can sell unlimited copies. This is how you scale.'
            }
          },
          {
            id: 'work-more',
            label: 'Just take on more clients',
            outcome: {
              incomeChange: 100,
              fatigueChange: 35,
              freeTimeChange: -35,
              skillChange: 5,
              feedback: 'More income but you\'re burning out. Time-for-money has a ceiling.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1700,
      maxFatigue: 75
    }
  },
  miniReflection: {
    question: "What skill or asset do you have that could potentially generate income beyond your main job?",
    followUp: "What's the smallest first step you could take to test that idea?"
  },
  quiz: [
    {
      question: "Why should you maximize your primary career income BEFORE building side income streams?",
      options: [
        "Side income is always a waste of time",
        "Your career funds investments and provides skills to leverage elsewhere",
        "Employers don't allow side income",
        "You can only have one income source legally"
      ],
      correctIndex: 1,
      explanation: "Your career is the foundation. It provides capital to invest and skills to monetize in other ways."
    },
    {
      question: "What's the biggest myth about passive income?",
      options: [
        "It doesn't exist at all",
        "It's only for rich people",
        "It requires little to no upfront work",
        "It's taxed differently"
      ],
      correctIndex: 2,
      explanation: "Passive income requires massive upfront investment of time, money, or both. It's 'passive' later, not now."
    },
    {
      question: "What is a 'productized service'?",
      options: [
        "Selling physical products",
        "Working for a product company",
        "Packaging a skill you do as a service into a scalable product",
        "Getting paid in products instead of cash"
      ],
      correctIndex: 2,
      explanation: "Instead of selling your time, you create something once and sell it many times."
    },
    {
      question: "Which is a warning sign of an income stream scam?",
      options: [
        "It takes years to become profitable",
        "It requires developing real skills",
        "Success depends on recruiting others to join",
        "It starts small and grows slowly"
      ],
      correctIndex: 2,
      explanation: "If your income depends on recruiting rather than creating value, it's likely a pyramid scheme."
    },
    {
      question: "Financial freedom is achieved when:",
      options: [
        "You earn $1 million per year",
        "You have zero debt",
        "Your passive income exceeds your expenses",
        "You retire at 65"
      ],
      correctIndex: 2,
      explanation: "Financial freedom = when your investments and systems generate more than you spend, making work optional."
    }
  ],
  powerMove: "Calculate your 'financial freedom number': annual expenses ÷ 4% (the safe withdrawal rate). That's your target investment portfolio.",
  realLifeAction: "List 3 ways you could use your existing skills to generate income outside your job. Pick the easiest one to test."
};
