import { Lesson } from '@/types/personal-finance';

export const lesson2MarketValue: Lesson = {
  id: 'career-income-2',
  title: 'Understanding Your Market Value',
  estimatedMinutes: 12,
  moduleOverview: "Most people have no idea what they're worth. They accept whatever they're offered and hope for the best.",
  realityHook: "Two people with identical skills can earn 40% different salaries simply because one knows their market value and the other doesn't.",
  outcomePreview: "You'll learn how to research, calculate, and communicate your true market value.",
  microLesson: `Your salary isn't based on what you deserve—it's based on what the market will pay.

**The Market Value Equation**
Your worth = (Demand for your skills × Scarcity of those skills) ÷ Supply of people with those skills

**How to Research Your Value**
1. **Salary websites**: Glassdoor, Levels.fyi, Payscale, LinkedIn Salary
2. **Job postings**: Look at salary ranges for roles you could get
3. **Recruiters**: They know exactly what companies pay
4. **Network**: Ask peers (yes, it's awkward but valuable)

**The Value Stack**
Your total compensation includes:
- Base salary
- Bonuses (signing, performance, retention)
- Equity (RSUs, options, shares)
- Benefits (health, 401k match, PTO)
- Perks (remote work, flexibility, learning budget)

**Why Most People Are Underpaid**
- They don't research market rates
- They accept the first offer
- They don't negotiate
- They stay too long without raises
- They undervalue their unique skills

**The 10% Rule**
If you're not getting 10%+ raises every 2-3 years, you're likely falling behind market rate.`,
  flashcards: [
    {
      term: 'Market Rate',
      definition: 'The typical compensation paid for a specific role, skill set, and experience level in a particular location and industry.',
      philsAnalogy: "It's like the going price for bamboo in the market. If everyone's selling for $50, you can't charge $200—but you also shouldn't accept $20."
    },
    {
      term: 'Total Compensation',
      definition: 'The complete value of your employment package including salary, bonuses, equity, benefits, and perks.',
      philsAnalogy: "Don't just count the cash. A job paying $90K with $20K in equity and great benefits might beat a $100K job with nothing else."
    },
    {
      term: 'Salary Compression',
      definition: 'When new hires are paid close to or more than existing employees due to rising market rates.',
      philsAnalogy: "You've been loyal for 5 years and make $70K. A new hire with the same skills starts at $75K. That's compression—and it's your wake-up call."
    },
    {
      term: 'Comp Benchmarking',
      definition: 'The process of comparing your compensation to market rates for similar roles.',
      philsAnalogy: "Athletes check their stats against others constantly. You should check your salary against the market at least once a year."
    }
  ],
  simulatorGame: {
    title: 'The Value Detective',
    description: 'Research and discover your true market value.',
    initialState: {
      weeklyIncome: 1000,
      hourlyWage: 25,
      workHours: 40,
      fatigue: 25,
      freeTime: 45,
      skillLevel: 40
    },
    scenarios: [
      {
        id: 'research-method',
        title: 'Research Strategy',
        description: "You want to know your market value. How do you research it?",
        choices: [
          {
            id: 'multiple-sources',
            label: 'Use 4+ sources: salary sites, job postings, recruiters, peers',
            outcome: {
              incomeChange: 150,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'Comprehensive research gives you confidence and leverage. You discover you\'re 15% underpaid.'
            }
          },
          {
            id: 'one-source',
            label: 'Just check Glassdoor quickly',
            outcome: {
              incomeChange: 30,
              fatigueChange: 5,
              freeTimeChange: -5,
              skillChange: 5,
              feedback: 'One source gives incomplete data. Glassdoor can be outdated or skewed.'
            }
          }
        ]
      },
      {
        id: 'recruiter-call',
        title: 'Recruiter Reaches Out',
        description: "A recruiter messages you about a role. You're happy at your job. What do you do?",
        choices: [
          {
            id: 'take-call',
            label: 'Take the call to learn market rates',
            outcome: {
              incomeChange: 100,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 10,
              feedback: 'Smart! Even if not interested, you learn what companies are paying and what skills are hot.'
            }
          },
          {
            id: 'ignore',
            label: 'Ignore it—you\'re not looking',
            outcome: {
              incomeChange: 0,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 0,
              feedback: 'You miss valuable market intelligence. Staying informed doesn\'t mean being disloyal.'
            }
          }
        ]
      },
      {
        id: 'discover-underpaid',
        title: 'The Discovery',
        description: "You discover you're paid $12K below market rate. What's your move?",
        choices: [
          {
            id: 'present-data',
            label: 'Present data to manager and request adjustment',
            outcome: {
              incomeChange: 200,
              fatigueChange: 20,
              freeTimeChange: -5,
              skillChange: 10,
              feedback: 'You present objective data professionally. Manager gets you a 10% adjustment.'
            }
          },
          {
            id: 'stay-quiet',
            label: 'Stay quiet and hope they notice',
            outcome: {
              incomeChange: 20,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 0,
              feedback: 'They won\'t notice. Companies don\'t voluntarily give you more money.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1400,
      maxFatigue: 65
    }
  },
  miniReflection: {
    question: "When was the last time you researched what your skills are worth in the current market?",
    followUp: "What's stopping you from doing that research this week?"
  },
  quiz: [
    {
      question: "What primarily determines your market value?",
      options: [
        "How hard you work",
        "How long you've been at your company",
        "The demand for and scarcity of your skills",
        "Your educational credentials"
      ],
      correctIndex: 2,
      explanation: "Market value is driven by supply and demand—how much employers need your skills and how few people have them."
    },
    {
      question: "Which is the BEST way to research your market value?",
      options: [
        "Ask your manager what others make",
        "Use multiple sources: salary sites, job postings, recruiters, and peers",
        "Trust that your company pays fairly",
        "Look at one salary website"
      ],
      correctIndex: 1,
      explanation: "Multiple sources give you accurate, comprehensive data. Single sources can be outdated or biased."
    },
    {
      question: "What is salary compression?",
      options: [
        "When salaries go down during a recession",
        "When new hires are paid close to or more than long-tenured employees",
        "When you take a pay cut for a better title",
        "When taxes reduce your take-home pay"
      ],
      correctIndex: 1,
      explanation: "Compression happens when market rates rise faster than internal raises, leaving loyal employees underpaid."
    },
    {
      question: "Why should you talk to recruiters even when you're happy at your job?",
      options: [
        "To be disloyal to your employer",
        "To threaten your boss with leaving",
        "To gather market intelligence about rates and in-demand skills",
        "To make your coworkers jealous"
      ],
      correctIndex: 2,
      explanation: "Recruiters provide valuable information about market rates and what skills companies are seeking."
    },
    {
      question: "The '10% Rule' suggests that every 2-3 years you should:",
      options: [
        "Save 10% more of your income",
        "Work 10% fewer hours",
        "Be getting 10%+ raises or you're falling behind market rate",
        "Apply to 10 new jobs"
      ],
      correctIndex: 2,
      explanation: "Markets move. If your pay isn't keeping up, you're effectively taking a pay cut against inflation and market rates."
    }
  ],
  powerMove: "Set up job alerts for your target roles. Not to leave, but to track what skills are hot and what companies are paying.",
  realLifeAction: "This week, use 3 different methods to research your market value. Write down the range you discover."
};
