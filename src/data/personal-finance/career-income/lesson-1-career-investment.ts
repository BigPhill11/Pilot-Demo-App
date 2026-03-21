import { Lesson } from '@/types/personal-finance';

export const lesson1CareerInvestment: Lesson = {
  id: 'career-income-1',
  title: 'Your Career is Your Biggest Investment',
  estimatedMinutes: 12,
  moduleOverview: 'Most people obsess over stock returns while ignoring their biggest asset: their ability to earn income.',
  realityHook: "You'll earn $2-3 million over your lifetime. A 10% increase in your earning power is worth $200-300K. That's more than most people's entire investment portfolio.",
  outcomePreview: "You'll understand why career decisions are financial decisions and how to think about your human capital.",
  microLesson: `Your career isn't just a job—it's an investment that compounds over decades.

**Human Capital = Your Future Earning Power**
Think of yourself as a stock. Your skills, knowledge, and reputation are your fundamentals. Every career decision either increases or decreases your "share price."

**The Career Compounding Effect**
A $5,000 raise at 25 isn't just $5,000. It's:
- The base for all future raises
- Higher 401(k) matches
- Better negotiating position
- $200,000+ over your career

**Career ROI Thinking**
Smart investors ask: "What's the return?" Smart careerists ask the same:
- That certification: Will it increase my earning power by more than it costs?
- That job hop: Does the risk justify the potential upside?
- That skill: Is the market paying a premium for it?

**The Wealth Formula**
Wealth = Income × Savings Rate × Time × Investment Returns

Notice income comes FIRST. You can't save or invest what you don't earn.`,
  flashcards: [
    {
      term: 'Human Capital',
      definition: 'The present value of all your future earnings potential based on your skills, knowledge, and experience.',
      philsAnalogy: "Think of yourself as a bamboo plant. Your human capital is how tall and strong you can grow. Every skill you learn adds another segment to your stalk."
    },
    {
      term: 'Career Compounding',
      definition: 'The way early career decisions multiply over time, with raises building on raises and opportunities building on opportunities.',
      philsAnalogy: "It's like compound interest, but for your paycheck. A $3,000 raise at 25 becomes $150,000+ by retirement because every future raise builds on top of it."
    },
    {
      term: 'Opportunity Cost',
      definition: 'What you give up by choosing one career path over another.',
      philsAnalogy: "Every time you say yes to one job, you're saying no to thousands of others. Make sure your 'yes' is worth all those 'nos.'"
    },
    {
      term: 'Career ROI',
      definition: 'The return on investment for career decisions like education, certifications, or job changes.',
      philsAnalogy: "Before spending $50K on a degree, ask: Will this increase my lifetime earnings by more than $50K? If not, find another path."
    }
  ],
  simulatorGame: {
    title: 'The Career Investor',
    description: 'Make strategic career decisions to maximize your lifetime earnings.',
    initialState: {
      weeklyIncome: 800,
      hourlyWage: 20,
      workHours: 40,
      fatigue: 20,
      freeTime: 50,
      skillLevel: 30
    },
    scenarios: [
      {
        id: 'first-job',
        title: 'First Job Offer',
        description: "You have two job offers: Company A offers $45K with great mentorship. Company B offers $52K but limited growth.",
        choices: [
          {
            id: 'mentorship',
            label: 'Take Company A ($45K + mentorship)',
            outcome: {
              incomeChange: -50,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 25,
              feedback: 'Less money now, but mentorship accelerates your growth. Your skills jump significantly.'
            }
          },
          {
            id: 'higher-pay',
            label: 'Take Company B ($52K)',
            outcome: {
              incomeChange: 80,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 5,
              feedback: 'More money now, but slower skill development. You might plateau earlier.'
            }
          }
        ]
      },
      {
        id: 'certification',
        title: 'Certification Opportunity',
        description: "A $3,000 certification could boost your marketability. It requires 6 months of evening study.",
        choices: [
          {
            id: 'get-cert',
            label: 'Invest in the certification',
            outcome: {
              incomeChange: 100,
              fatigueChange: 15,
              freeTimeChange: -20,
              skillChange: 20,
              feedback: 'Short-term sacrifice, long-term gain. The certification opens new doors.'
            }
          },
          {
            id: 'skip-cert',
            label: 'Skip it and focus on current job',
            outcome: {
              incomeChange: 20,
              fatigueChange: -5,
              freeTimeChange: 10,
              skillChange: 5,
              feedback: 'You stay comfortable but miss a growth opportunity.'
            }
          }
        ]
      },
      {
        id: 'job-hop',
        title: 'Job Hopping Decision',
        description: "After 2 years, a recruiter offers 25% more at a new company. Your current job is stable.",
        choices: [
          {
            id: 'stay',
            label: 'Stay for stability and relationships',
            outcome: {
              incomeChange: 30,
              fatigueChange: -10,
              freeTimeChange: 5,
              skillChange: 10,
              feedback: 'Stability has value, but you may have left money on the table.'
            }
          },
          {
            id: 'jump',
            label: 'Take the 25% raise',
            outcome: {
              incomeChange: 200,
              fatigueChange: 20,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'Strategic job hopping early in career can dramatically boost lifetime earnings.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1200,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: "What's one career decision you've made (or are considering) that you now see as an investment decision?",
    followUp: "How would you calculate the ROI on that decision?"
  },
  quiz: [
    {
      question: "Why is human capital often more valuable than financial capital early in your career?",
      options: [
        "Because jobs are more stable than investments",
        "Because your earning potential spans decades and compounds over time",
        "Because stocks are too risky for young people",
        "Because human capital is tax-free"
      ],
      correctIndex: 1,
      explanation: "Your ability to earn spans 40+ years. A 10% increase in earning power dwarfs most investment returns."
    },
    {
      question: "What is career compounding?",
      options: [
        "Getting compound interest on your 401(k)",
        "Working at multiple companies simultaneously",
        "How early career gains multiply over time through raises building on raises",
        "Investing your salary in index funds"
      ],
      correctIndex: 2,
      explanation: "Each raise becomes the new base for future raises, multiplying the impact of early career growth."
    },
    {
      question: "When evaluating a $10,000 certification, what should you primarily consider?",
      options: [
        "Whether your employer will pay for it",
        "How impressive it looks on LinkedIn",
        "Whether it will increase your lifetime earnings by more than $10,000",
        "How long the classes take"
      ],
      correctIndex: 2,
      explanation: "Career ROI thinking means evaluating whether the investment will return more than its cost."
    },
    {
      question: "In the wealth formula (Income × Savings Rate × Time × Returns), why does income come first?",
      options: [
        "You can't save or invest money you don't earn",
        "Income is the easiest to control",
        "The other factors don't matter",
        "It's alphabetically first"
      ],
      correctIndex: 0,
      explanation: "Income is the foundation—you need to earn before you can save, invest, or compound."
    },
    {
      question: "What's the opportunity cost of staying in a comfortable but low-growth job?",
      options: [
        "Nothing, stability is always good",
        "Just the stress of job searching",
        "The higher earnings and faster skill development you could have gained elsewhere",
        "Having to learn new systems"
      ],
      correctIndex: 2,
      explanation: "Opportunity cost includes all the potential earnings and growth you sacrifice by not pursuing better options."
    }
  ],
  powerMove: "Calculate your 'career hourly rate': total comp ÷ total hours worked (including commute, prep, stress). Is it what you're worth?",
  realLifeAction: "Write down 3 skills that would make you 20% more valuable in your field. Research what it would take to develop each one."
};
