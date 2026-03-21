import { Lesson } from '@/types/personal-finance';

export const lesson3SkillsThatPay: Lesson = {
  id: 'career-income-3',
  title: 'Building Skills That Pay',
  estimatedMinutes: 12,
  moduleOverview: 'Not all skills are created equal. Some skills multiply your earning power; others are commodities.',
  realityHook: "A graphic designer who learns sales can charge 3x more. A developer who learns communication becomes a tech lead. The most valuable skill is often the one you don't have yet.",
  outcomePreview: "You'll identify high-leverage skills and create a strategic skill-building plan.",
  microLesson: `Skills are investments. Some appreciate, some depreciate, some compound.

**The Skill Premium Pyramid**
1. **Commodity Skills** (Low premium): Basic computer skills, typing, filing
2. **Foundational Skills** (Medium premium): Industry knowledge, technical basics
3. **Specialized Skills** (High premium): Unique technical expertise, certifications
4. **Multiplier Skills** (Highest premium): Leadership, sales, communication, strategic thinking

**Skill Stacking: The Secret Weapon**
You don't need to be world-class at one thing. Being top 20% at 3 complementary skills makes you rare:
- Engineer + Communication = Tech Lead
- Designer + Business = Product Designer
- Analyst + Storytelling = Executive Presenter

**High-ROI Skills Across Industries**
1. **Sales**: Every company needs revenue. People who generate it get paid.
2. **Communication**: Writing, speaking, presenting—these multiply all other skills.
3. **Data Literacy**: Understanding numbers makes you strategic.
4. **Leadership**: Managing people and projects opens doors.
5. **Technical Fluency**: Even non-tech roles benefit from understanding technology.

**The Depreciation Trap**
Some skills lose value:
- Industry-specific tools that become obsolete
- Knowledge that AI can replace
- Skills tied to shrinking industries

**Build Skills That:**
- Transfer across companies and industries
- Compound with other skills
- Remain valuable as technology changes`,
  flashcards: [
    {
      term: 'Skill Stacking',
      definition: 'Combining multiple complementary skills to create a unique, valuable skill set that few others have.',
      philsAnalogy: "You don't need to be the best chef OR the best marketer. Be a good chef who can market, and you'll out-earn both."
    },
    {
      term: 'Multiplier Skills',
      definition: 'Skills like leadership, sales, and communication that increase the value of all your other skills.',
      philsAnalogy: "These are like fertilizer for your bamboo garden. They make everything else grow faster and taller."
    },
    {
      term: 'Skill Depreciation',
      definition: 'When a skill becomes less valuable over time due to technology changes, market shifts, or increased supply.',
      philsAnalogy: "Being great at fax machine repair was valuable once. Now? Not so much. Always ask: Will this skill matter in 10 years?"
    },
    {
      term: 'T-Shaped Skills',
      definition: 'Deep expertise in one area (the vertical bar) plus broad knowledge across multiple areas (the horizontal bar).',
      philsAnalogy: "Be a mile deep in one thing, but understand enough about adjacent areas to connect the dots others miss."
    }
  ],
  simulatorGame: {
    title: 'The Skill Investor',
    description: 'Build a strategic skill portfolio that maximizes your earning potential.',
    initialState: {
      weeklyIncome: 900,
      hourlyWage: 22,
      workHours: 40,
      fatigue: 30,
      freeTime: 40,
      skillLevel: 35
    },
    scenarios: [
      {
        id: 'skill-choice',
        title: 'Skill Investment Decision',
        description: "You have 10 hours/week to invest in learning. What do you focus on?",
        choices: [
          {
            id: 'multiplier',
            label: 'Public speaking and presentation skills',
            outcome: {
              incomeChange: 120,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 20,
              feedback: 'Multiplier skill! This enhances every other skill you have and opens leadership paths.'
            }
          },
          {
            id: 'technical',
            label: 'Advanced Excel and data analysis',
            outcome: {
              incomeChange: 80,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 15,
              feedback: 'Solid foundational skill. Valuable but many others have it too.'
            }
          },
          {
            id: 'niche',
            label: 'A very specific industry tool',
            outcome: {
              incomeChange: 40,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 10,
              feedback: 'Risky choice. If that tool becomes obsolete, so does your investment.'
            }
          }
        ]
      },
      {
        id: 'stack-opportunity',
        title: 'Skill Stacking Moment',
        description: "You're a good data analyst. What complementary skill would multiply your value most?",
        choices: [
          {
            id: 'storytelling',
            label: 'Data storytelling and visualization',
            outcome: {
              incomeChange: 150,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 25,
              feedback: 'Perfect stack! Analysts who can tell stories with data are 2-3x more valuable.'
            }
          },
          {
            id: 'more-technical',
            label: 'Even more advanced statistical methods',
            outcome: {
              incomeChange: 60,
              fatigueChange: 15,
              freeTimeChange: -15,
              skillChange: 15,
              feedback: 'Deeper technical skills help, but diminishing returns. You\'re already good at this.'
            }
          }
        ]
      },
      {
        id: 'obsolescence-warning',
        title: 'Industry Shift',
        description: "AI tools are starting to automate parts of your job. How do you respond?",
        choices: [
          {
            id: 'adapt',
            label: 'Learn to use AI tools and focus on skills AI can\'t replace',
            outcome: {
              incomeChange: 180,
              fatigueChange: 20,
              freeTimeChange: -20,
              skillChange: 30,
              feedback: 'Smart adaptation! You become the person who leverages AI rather than competes with it.'
            }
          },
          {
            id: 'ignore',
            label: 'Ignore it—AI is overhyped',
            outcome: {
              incomeChange: -50,
              fatigueChange: 0,
              freeTimeChange: 10,
              skillChange: -10,
              feedback: 'Dangerous complacency. Your skills are depreciating while others adapt.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1300,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: "What skill, if you developed it, would multiply the value of everything else you already know?",
    followUp: "Why haven't you started building that skill yet?"
  },
  quiz: [
    {
      question: "What makes 'multiplier skills' like communication and leadership so valuable?",
      options: [
        "They look good on a resume",
        "They're easy to learn",
        "They increase the value of all your other skills",
        "Every job requires them"
      ],
      correctIndex: 2,
      explanation: "Multiplier skills amplify everything else. A great engineer who can present well is worth more than a great engineer who can't."
    },
    {
      question: "What is skill stacking?",
      options: [
        "Learning as many skills as possible",
        "Combining complementary skills to create unique value",
        "Stacking certifications on your resume",
        "Teaching your skills to others"
      ],
      correctIndex: 1,
      explanation: "Skill stacking means being good at multiple complementary things, making you rare and valuable."
    },
    {
      question: "Which of these is MOST likely to be a depreciating skill?",
      options: [
        "Leadership and people management",
        "Strategic thinking and problem-solving",
        "Expertise in a specific software that might be replaced",
        "Written and verbal communication"
      ],
      correctIndex: 2,
      explanation: "Skills tied to specific tools are risky—when the tool changes, your skill loses value."
    },
    {
      question: "What does 'T-shaped skills' mean?",
      options: [
        "Skills that start with the letter T",
        "Deep expertise in one area plus broad knowledge across others",
        "Technical skills only",
        "Temporary skills for contract work"
      ],
      correctIndex: 1,
      explanation: "T-shaped means deep in one specialty (vertical) and broad across related areas (horizontal)."
    },
    {
      question: "When AI starts automating parts of your job, the best response is to:",
      options: [
        "Ignore it and hope it doesn't affect you",
        "Panic and switch careers entirely",
        "Learn to use AI tools and focus on skills AI can't replace",
        "Refuse to use AI on principle"
      ],
      correctIndex: 2,
      explanation: "Adapters thrive. Those who leverage new tools while building human-centric skills stay valuable."
    }
  ],
  powerMove: "Identify your 'skill stack'—3 skills that, combined, make you uniquely valuable. Write them down.",
  realLifeAction: "Ask 3 people in senior roles: 'What skill do you wish you'd developed earlier?' Notice the patterns."
};
