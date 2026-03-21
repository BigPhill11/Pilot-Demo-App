import { Lesson } from '@/types/personal-finance';

export const lesson4NegotiationAdvancement: Lesson = {
  id: 'career-income-4',
  title: 'Negotiation and Career Advancement',
  estimatedMinutes: 12,
  moduleOverview: "The difference between people who advance quickly and those who don't often isn't talent—it's knowing how to ask.",
  realityHook: "Failing to negotiate your starting salary can cost you $500,000+ over your career. Yet 57% of workers never negotiate at all.",
  outcomePreview: "You'll master the art of negotiation and learn how to strategically advance your career.",
  microLesson: `Negotiation isn't confrontational—it's collaborative problem-solving.

**The Negotiation Mindset Shift**
You're not asking for a favor. You're having a business conversation about fair value exchange.

**The 5 Rules of Salary Negotiation**
1. **Never give the first number**: Let them anchor first
2. **Always negotiate**: Even 10% compounds massively
3. **Use data**: "Based on market research..." not "I need..."
4. **Negotiate the whole package**: Base, bonus, equity, title, flexibility
5. **Get it in writing**: Verbal promises mean nothing

**The Power of Alternatives**
Your negotiating power = Your alternatives. The person with more options wins.
- BATNA: Best Alternative To Negotiated Agreement
- Always have a Plan B, even if you don't use it

**Visibility > Ability**
Hard truth: Great work in the dark doesn't get rewarded. You need:
- **Documentation**: Track your wins and impact
- **Visibility**: Make sure decision-makers know your value
- **Advocates**: People who speak up for you when you're not in the room

**The Advancement Formula**
1. Do excellent work (baseline)
2. Document your impact with numbers
3. Build relationships with decision-makers
4. Ask explicitly for what you want
5. Make it easy for them to say yes`,
  flashcards: [
    {
      term: 'BATNA',
      definition: 'Best Alternative To Negotiated Agreement—your backup option if the current negotiation fails.',
      philsAnalogy: "Never negotiate without a Plan B. If they know you have nowhere else to go, they have all the power."
    },
    {
      term: 'Anchoring',
      definition: 'The first number mentioned in a negotiation sets the psychological reference point for the entire discussion.',
      philsAnalogy: "If they say $50K first, you're negotiating from $50K. If you wanted $70K, you've already lost $20K of room."
    },
    {
      term: 'Total Package Negotiation',
      definition: 'Negotiating the complete compensation including salary, bonus, equity, benefits, title, and flexibility—not just base pay.',
      philsAnalogy: "They won't budge on salary? Negotiate signing bonus, extra PTO, remote days, or equity. There's always more than one door."
    },
    {
      term: 'Visibility',
      definition: 'Ensuring decision-makers are aware of your contributions and value.',
      philsAnalogy: "The best bamboo in a dark forest still gets overlooked. Make sure the gardeners see how tall you've grown."
    }
  ],
  simulatorGame: {
    title: 'The Negotiation Game',
    description: 'Navigate negotiations and career advancement decisions.',
    initialState: {
      weeklyIncome: 1100,
      hourlyWage: 27,
      workHours: 40,
      fatigue: 30,
      freeTime: 40,
      skillLevel: 45
    },
    scenarios: [
      {
        id: 'job-offer',
        title: 'New Job Offer',
        description: "You receive an offer for $85K. The recruiter asks: 'Does this work for your expectations?'",
        choices: [
          {
            id: 'negotiate',
            label: '"Based on my research, the market range is $90-100K. Can we discuss?"',
            outcome: {
              incomeChange: 150,
              fatigueChange: 15,
              freeTimeChange: -5,
              skillChange: 15,
              feedback: 'They come back with $92K. Never accepting the first offer just made you $7K+ per year.'
            }
          },
          {
            id: 'accept',
            label: '"Yes, that works for me!"',
            outcome: {
              incomeChange: 80,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'You left money on the table. That $7K/year compounds to $350K+ over your career.'
            }
          }
        ]
      },
      {
        id: 'visibility-choice',
        title: 'The Big Project',
        description: "You just completed a project that saved the company $200K. What do you do?",
        choices: [
          {
            id: 'document-share',
            label: 'Document the impact and share with leadership',
            outcome: {
              incomeChange: 120,
              fatigueChange: 10,
              freeTimeChange: -10,
              skillChange: 15,
              feedback: 'Leadership notices. This becomes part of your promotion case. Visibility matters.'
            }
          },
          {
            id: 'stay-humble',
            label: 'Stay humble—good work speaks for itself',
            outcome: {
              incomeChange: 20,
              fatigueChange: 0,
              freeTimeChange: 5,
              skillChange: 5,
              feedback: 'Three months later, no one remembers. Good work in the dark doesn\'t get rewarded.'
            }
          }
        ]
      },
      {
        id: 'promotion-ask',
        title: 'Promotion Time',
        description: "You've been doing senior-level work for 6 months. How do you approach the promotion conversation?",
        choices: [
          {
            id: 'prepared-ask',
            label: 'Schedule a meeting with documented achievements and a specific ask',
            outcome: {
              incomeChange: 200,
              fatigueChange: 20,
              freeTimeChange: -10,
              skillChange: 20,
              feedback: 'You made it easy for your manager to advocate for you. Promotion approved.'
            }
          },
          {
            id: 'wait',
            label: 'Wait for your manager to bring it up',
            outcome: {
              incomeChange: 30,
              fatigueChange: 5,
              freeTimeChange: 0,
              skillChange: 5,
              feedback: 'They\'re busy with their own problems. If you don\'t ask, you don\'t get.'
            }
          }
        ]
      }
    ],
    winCondition: {
      minIncome: 1500,
      maxFatigue: 70
    }
  },
  miniReflection: {
    question: "When was the last time you asked for something you wanted in your career? What happened?",
    followUp: "What's one thing you should be asking for right now but haven't?"
  },
  quiz: [
    {
      question: "Why should you 'never give the first number' in salary negotiation?",
      options: [
        "It's considered rude",
        "The first number sets the anchor point for the entire negotiation",
        "It makes you look desperate",
        "Employers prefer to guess"
      ],
      correctIndex: 1,
      explanation: "Anchoring is powerful. Whoever sets the first number controls the range of the conversation."
    },
    {
      question: "What does BATNA stand for and why does it matter?",
      options: [
        "Best Alternative To Negotiated Agreement—it's your leverage if this deal fails",
        "Business And Technical Negotiation Approach—a negotiation framework",
        "Baseline Annual Target Negotiation Amount—your target salary",
        "Benefits And Total Net Amount—total compensation"
      ],
      correctIndex: 0,
      explanation: "Having alternatives gives you power. If they know you have other options, they'll try harder to keep you."
    },
    {
      question: "What's the problem with 'good work speaks for itself'?",
      options: [
        "Nothing, it's the best approach",
        "Decision-makers are busy and often don't see your contributions",
        "It only works in small companies",
        "It makes coworkers jealous"
      ],
      correctIndex: 1,
      explanation: "Leaders have a hundred things competing for attention. If you don't create visibility, your work gets forgotten."
    },
    {
      question: "When negotiating a job offer, if they won't budge on salary, you should:",
      options: [
        "Accept whatever they offer",
        "Walk away immediately",
        "Negotiate other elements: signing bonus, equity, PTO, title, flexibility",
        "Threaten to take another offer"
      ],
      correctIndex: 2,
      explanation: "Total package negotiation opens many doors. There's often flexibility in elements beyond base salary."
    },
    {
      question: "What's the most important thing to bring to a promotion conversation?",
      options: [
        "Threats about leaving",
        "Documented achievements with specific impact and a clear ask",
        "Complaints about being underpaid",
        "A list of personal financial needs"
      ],
      correctIndex: 1,
      explanation: "Make it easy for them to say yes. Data and specifics are far more persuasive than emotions."
    }
  ],
  powerMove: "Start a 'brag document'—a running list of your achievements with specific numbers and impact. Update it monthly.",
  realLifeAction: "Practice your negotiation pitch out loud. Record yourself and listen back. Confidence comes from preparation."
};
