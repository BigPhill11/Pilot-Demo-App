/**
 * Wealth Management Career Simulation Configuration
 * 
 * 5-year career simulation with decisions, events, and outcomes.
 * Tracks salary, skills, work-life balance, productivity, and fatigue.
 * 
 * Module-Topic Alignment:
 * - Year 1 (Module 2): Financial Planning Foundations
 * - Year 2 (Module 3): Risk Management
 * - Year 3 (Module 4): Client Communication
 * - Year 4 (Module 5): Tax & Estate Planning
 * - Year 5 (Module 6): Technology & Industry Trends
 */

import { 
  WMYearConfig, 
  WMScenario, 
  WMSimEnding,
  WMSimState 
} from '@/types/wealth-management-sim';

export const WM_YEAR_CONFIGS: WMYearConfig[] = [
  {
    year: 1,
    title: 'Junior Advisor',
    salaryRange: { min: 65000, max: 75000 },
    openingNarrative: "Welcome to Green Bamboo Wealth Advisors! Your first year focuses on Financial Planning Foundations. You'll learn to create budgets, build emergency funds, and understand retirement planning. Your mentor Sarah will guide you through the basics.",
    decisions: [
      {
        id: 'y1-d1',
        title: 'Learning Approach',
        situation: "Your first week, and there's so much to learn! How do you want to approach your training?",
        options: [
          {
            id: 'y1-d1-a',
            label: 'Study Intensively',
            description: 'Spend extra hours studying for certifications and reading market reports',
            meterChanges: { investmentKnowledge: 15, technicalAnalysis: 10, fatigue: 15, workLifeBalance: -10 },
            feedback: 'You\'re building a strong knowledge foundation, but watch that fatigue!',
            philInsight: 'Knowledge is power, but burnout is real. Find sustainable learning habits.',
          },
          {
            id: 'y1-d1-b',
            label: 'Shadow Senior Advisors',
            description: 'Focus on observing client meetings and learning from experienced colleagues',
            meterChanges: { clientRelations: 15, investmentKnowledge: 5, productivity: 5 },
            feedback: 'Great choice! Learning from mentors accelerates your growth.',
            philInsight: 'The best lessons often come from watching experts in action.',
          },
          {
            id: 'y1-d1-c',
            label: 'Balanced Approach',
            description: 'Split time between self-study and shadowing, with regular breaks',
            meterChanges: { investmentKnowledge: 8, clientRelations: 8, workLifeBalance: 5 },
            feedback: 'A sustainable approach that builds multiple skills.',
            philInsight: 'Balance is key to a long, successful career.',
          },
        ],
      },
      {
        id: 'y1-d2',
        title: 'First Client Interaction',
        situation: "A senior advisor asks you to help prepare materials for a client meeting. The client has questions about bond yields.",
        options: [
          {
            id: 'y1-d2-a',
            label: 'Research Thoroughly',
            description: 'Spend the weekend researching to create comprehensive materials',
            meterChanges: { investmentKnowledge: 10, technicalAnalysis: 8, fatigue: 10, workLifeBalance: -8 },
            feedback: 'Your thorough research impressed the senior advisor!',
          },
          {
            id: 'y1-d2-b',
            label: 'Ask for Guidance',
            description: 'Ask your mentor for help understanding what the client really needs',
            meterChanges: { clientRelations: 8, investmentKnowledge: 5, productivity: 5 },
            feedback: 'Smart move - knowing when to ask for help is a strength.',
          },
          {
            id: 'y1-d2-c',
            label: 'Use Templates',
            description: 'Adapt existing firm templates to save time',
            meterChanges: { productivity: 10, technicalAnalysis: 3 },
            feedback: 'Efficient! But make sure you understand the content, not just copy it.',
          },
        ],
      },
    ],
    possibleEvents: [
      {
        id: 'y1-e1',
        title: 'Market Volatility',
        description: 'The market drops 5% in a week. Phones are ringing off the hook with worried clients.',
        meterChanges: { fatigue: 10, clientRelations: 5, investmentKnowledge: 5 },
        philComment: 'Market stress is a learning opportunity. Watch how senior advisors calm worried clients.',
      },
      {
        id: 'y1-e2',
        title: 'Team Outing',
        description: 'The team organizes a Friday happy hour. A chance to bond with colleagues!',
        meterChanges: { workLifeBalance: 10, clientRelations: 5, fatigue: -5 },
        philComment: 'Building relationships with colleagues is just as important as client relationships.',
      },
    ],
    yearEndReview: "Your first year is complete! You've learned the basics and started building your foundation. Time to see if you're ready for more responsibility.",
    promotionThreshold: {
      requiredSkillsAvg: 35,
      requiredProductivity: 55,
      maxFatigue: 60,
    },
  },
  {
    year: 2,
    title: 'Junior Advisor',
    salaryRange: { min: 70000, max: 85000 },
    openingNarrative: "Year two focuses on Risk Management. You'll learn to identify market risks, inflation risks, and longevity risks. Time to help clients protect their wealth from unexpected events while building your own book of business.",
    decisions: [
      {
        id: 'y2-d1',
        title: 'Client Acquisition',
        situation: "Your manager wants you to start bringing in new clients. How do you approach prospecting?",
        options: [
          {
            id: 'y2-d1-a',
            label: 'Network Aggressively',
            description: 'Attend every industry event, join clubs, and ask for referrals constantly',
            meterChanges: { clientRelations: 15, salary: 5000, fatigue: 15, workLifeBalance: -15 },
            feedback: 'You\'re building connections fast, but it\'s exhausting!',
          },
          {
            id: 'y2-d1-b',
            label: 'Focus on Referrals',
            description: 'Ask existing clients for introductions to friends and family',
            meterChanges: { clientRelations: 10, productivity: 8, salary: 3000 },
            feedback: 'Referrals are the best leads - they come with built-in trust.',
          },
          {
            id: 'y2-d1-c',
            label: 'Digital Presence',
            description: 'Build your LinkedIn profile and write educational content',
            meterChanges: { technicalAnalysis: 5, clientRelations: 8, investmentKnowledge: 5 },
            feedback: 'A modern approach that builds credibility over time.',
          },
        ],
      },
      {
        id: 'y2-d2',
        title: 'Certification Decision',
        situation: "You have the opportunity to pursue the CFP (Certified Financial Planner) designation. It requires significant study time.",
        options: [
          {
            id: 'y2-d2-a',
            label: 'Go All In',
            description: 'Dedicate evenings and weekends to studying for the CFP exam',
            meterChanges: { investmentKnowledge: 20, technicalAnalysis: 15, fatigue: 20, workLifeBalance: -20, salary: 8000 },
            feedback: 'The CFP opens doors, but the study grind is real.',
          },
          {
            id: 'y2-d2-b',
            label: 'Slow and Steady',
            description: 'Take the extended study program over 18 months instead of 6',
            meterChanges: { investmentKnowledge: 12, technicalAnalysis: 8, fatigue: 8, salary: 5000 },
            feedback: 'A sustainable pace that still gets you to the goal.',
          },
          {
            id: 'y2-d2-c',
            label: 'Delay for Now',
            description: 'Focus on practical experience first, pursue certification later',
            meterChanges: { clientRelations: 10, productivity: 10, workLifeBalance: 5 },
            feedback: 'Experience matters too. You can always get certified later.',
          },
        ],
      },
    ],
    possibleEvents: [
      {
        id: 'y2-e1',
        title: 'Big Client Opportunity',
        description: 'A wealthy business owner is looking for a new advisor. This could be your biggest client yet!',
        meterChanges: { salary: 10000, clientRelations: 10, fatigue: 10, productivity: 10 },
        philComment: 'Big opportunities often come with big responsibilities. Make sure you can deliver!',
      },
      {
        id: 'y2-e2',
        title: 'Family Event',
        description: 'Your sibling is getting married the same weekend as an important client event.',
        meterChanges: { workLifeBalance: -10, fatigue: 5 },
        philComment: 'Work-life balance means making tough choices sometimes. Family matters.',
      },
    ],
    yearEndReview: "Year two complete! You're developing your own style and starting to build a reputation. The question is: are you ready for the Associate level?",
    promotionThreshold: {
      requiredSkillsAvg: 45,
      requiredProductivity: 60,
      maxFatigue: 55,
    },
  },
  {
    year: 3,
    title: 'Associate Advisor',
    salaryRange: { min: 90000, max: 120000 },
    openingNarrative: "Congratulations on your promotion to Associate Advisor! Year three focuses on Client Communication & Relationship Building. You'll master active listening, transparency, and building trust. With your own clients now, communication skills are critical.",
    decisions: [
      {
        id: 'y3-d1',
        title: 'Client Portfolio Strategy',
        situation: "A client wants to put 80% of their retirement savings into cryptocurrency. How do you handle this?",
        options: [
          {
            id: 'y3-d1-a',
            label: 'Firmly Decline',
            description: 'Explain the risks and refuse to make such an allocation',
            meterChanges: { investmentKnowledge: 5, clientRelations: -5, productivity: -5 },
            feedback: 'You protected the client, but they\'re not happy about it.',
            philInsight: 'Sometimes the right advice isn\'t what clients want to hear.',
          },
          {
            id: 'y3-d1-b',
            label: 'Educate and Compromise',
            description: 'Explain risks thoroughly and suggest a smaller crypto allocation (10-15%)',
            meterChanges: { clientRelations: 10, investmentKnowledge: 8, productivity: 5 },
            feedback: 'Great balance of client wishes and professional judgment!',
            philInsight: 'Finding middle ground while educating is a key wealth management skill.',
          },
          {
            id: 'y3-d1-c',
            label: 'Follow Client Wishes',
            description: 'Document the risks and proceed with the client\'s request',
            meterChanges: { clientRelations: 5, productivity: 10, investmentKnowledge: -5 },
            feedback: 'The client is happy now, but this could backfire...',
            philInsight: 'Client autonomy matters, but so does your professional responsibility.',
          },
        ],
      },
      {
        id: 'y3-d2',
        title: 'Team Leadership',
        situation: "You're asked to mentor a new junior advisor. This will take time away from your clients.",
        options: [
          {
            id: 'y3-d2-a',
            label: 'Embrace Mentoring',
            description: 'Dedicate significant time to helping the new advisor succeed',
            meterChanges: { clientRelations: 5, productivity: -5, fatigue: 10, workLifeBalance: -5 },
            feedback: 'Leadership skills are developing, but your client work is suffering.',
          },
          {
            id: 'y3-d2-b',
            label: 'Structured Mentoring',
            description: 'Set specific times for mentoring and protect your client time',
            meterChanges: { clientRelations: 8, productivity: 5, technicalAnalysis: 5 },
            feedback: 'A balanced approach that helps everyone.',
          },
          {
            id: 'y3-d2-c',
            label: 'Decline Politely',
            description: 'Explain you\'re focused on growing your book right now',
            meterChanges: { productivity: 10, salary: 5000, clientRelations: -3 },
            feedback: 'Your numbers are great, but you missed a leadership opportunity.',
          },
        ],
      },
    ],
    possibleEvents: [
      {
        id: 'y3-e1',
        title: 'Market Crash',
        description: 'A major market correction hits. Clients are panicking and calling constantly.',
        meterChanges: { fatigue: 20, clientRelations: 10, investmentKnowledge: 10, workLifeBalance: -15 },
        philComment: 'Crisis moments define careers. Stay calm and be there for your clients.',
      },
      {
        id: 'y3-e2',
        title: 'Competitor Poaching',
        description: 'A competitor offers you 20% more salary to switch firms.',
        meterChanges: { salary: 15000 },
        philComment: 'Loyalty has value, but so does knowing your worth. Choose wisely.',
      },
    ],
    yearEndReview: "Year three was intense! You've proven you can handle real responsibility. Senior Advisor is within reach if you keep performing.",
    promotionThreshold: {
      requiredSkillsAvg: 55,
      requiredProductivity: 65,
      maxFatigue: 50,
    },
  },
  {
    year: 4,
    title: 'Senior Advisor',
    salaryRange: { min: 130000, max: 160000 },
    openingNarrative: "Senior Advisor! Year four focuses on Tax & Estate Planning. You'll master tax-efficient strategies, trusts, and charitable giving. Clients seek you out for your expertise in preserving and transferring wealth across generations.",
    decisions: [
      {
        id: 'y4-d1',
        title: 'Specialization Choice',
        situation: "The firm wants you to specialize. This could define your career trajectory.",
        options: [
          {
            id: 'y4-d1-a',
            label: 'High Net Worth Focus',
            description: 'Specialize in ultra-wealthy clients ($10M+ portfolios)',
            meterChanges: { salary: 20000, investmentKnowledge: 15, clientRelations: 10, fatigue: 15, workLifeBalance: -10 },
            feedback: 'The money is great, but these clients are demanding!',
          },
          {
            id: 'y4-d1-b',
            label: 'Family Wealth Planning',
            description: 'Focus on multi-generational wealth transfer and estate planning',
            meterChanges: { clientRelations: 15, technicalAnalysis: 10, salary: 10000, workLifeBalance: 5 },
            feedback: 'Meaningful work helping families plan for generations.',
          },
          {
            id: 'y4-d1-c',
            label: 'Stay Generalist',
            description: 'Keep a diverse client base and broad skill set',
            meterChanges: { investmentKnowledge: 8, clientRelations: 8, technicalAnalysis: 8, productivity: 8 },
            feedback: 'Flexibility has value. You can pivot as opportunities arise.',
          },
        ],
      },
      {
        id: 'y4-d2',
        title: 'Work-Life Crossroads',
        situation: "You're burning out. Something has to give. What do you prioritize?",
        options: [
          {
            id: 'y4-d2-a',
            label: 'Push Through',
            description: 'The finish line is close. Managing Director is within reach.',
            meterChanges: { salary: 15000, productivity: 15, fatigue: 25, workLifeBalance: -20 },
            feedback: 'You\'re on track for the top, but at what cost?',
          },
          {
            id: 'y4-d2-b',
            label: 'Set Boundaries',
            description: 'Establish clear work hours and protect personal time',
            meterChanges: { workLifeBalance: 20, fatigue: -15, productivity: -5, salary: -5000 },
            feedback: 'You feel human again. Some colleagues don\'t understand.',
          },
          {
            id: 'y4-d2-c',
            label: 'Delegate More',
            description: 'Build a team to handle routine work while you focus on key clients',
            meterChanges: { productivity: 10, fatigue: -10, clientRelations: 5, technicalAnalysis: -5 },
            feedback: 'Smart leverage. You\'re working smarter, not harder.',
          },
        ],
      },
    ],
    possibleEvents: [
      {
        id: 'y4-e1',
        title: 'Health Scare',
        description: 'A routine checkup reveals stress-related health issues. The doctor recommends lifestyle changes.',
        meterChanges: { fatigue: -10, workLifeBalance: 15, productivity: -10 },
        philComment: 'Your health is your most important asset. No career is worth sacrificing it.',
      },
      {
        id: 'y4-e2',
        title: 'Industry Recognition',
        description: 'You\'re nominated for "Rising Star" in a wealth management publication.',
        meterChanges: { clientRelations: 15, salary: 10000, productivity: 5 },
        philComment: 'Recognition feels great! Use this momentum wisely.',
      },
    ],
    yearEndReview: "Year four was transformative. You've reached a crossroads: push for the top, or find your sustainable path?",
    promotionThreshold: {
      requiredSkillsAvg: 65,
      requiredProductivity: 70,
      maxFatigue: 45,
    },
  },
  {
    year: 5,
    title: 'Senior Advisor',
    salaryRange: { min: 150000, max: 200000 },
    openingNarrative: "Year five focuses on Technology & Industry Trends. You'll navigate robo-advisors, ESG investing, and fintech disruption. Your choices have shaped who you've become - now embrace innovation to define your ultimate path.",
    decisions: [
      {
        id: 'y5-d1',
        title: 'The Big Decision',
        situation: "Two paths lie before you. Which future do you choose?",
        options: [
          {
            id: 'y5-d1-a',
            label: 'Managing Director Track',
            description: 'Go all-in for the top leadership position',
            meterChanges: { salary: 40000, productivity: 20, fatigue: 20, workLifeBalance: -25, investmentKnowledge: 10 },
            feedback: 'The corner office awaits... if you can handle the pressure.',
          },
          {
            id: 'y5-d1-b',
            label: 'Work-Life Champion',
            description: 'Optimize for sustainable success and personal fulfillment',
            meterChanges: { workLifeBalance: 30, fatigue: -20, clientRelations: 10, salary: 5000 },
            feedback: 'You\'ve found your balance. Success isn\'t just about money.',
          },
          {
            id: 'y5-d1-c',
            label: 'Entrepreneurial Path',
            description: 'Start planning to launch your own advisory firm',
            meterChanges: { investmentKnowledge: 15, technicalAnalysis: 15, fatigue: 15, productivity: 10 },
            feedback: 'The ultimate risk and reward. Are you ready to be your own boss?',
          },
        ],
      },
      {
        id: 'y5-d2',
        title: 'Legacy Building',
        situation: "How do you want to be remembered in your career?",
        options: [
          {
            id: 'y5-d2-a',
            label: 'Client Champion',
            description: 'Focus on delivering exceptional outcomes for every client',
            meterChanges: { clientRelations: 20, productivity: 10, salary: 10000 },
            feedback: 'Your clients will remember you for generations.',
          },
          {
            id: 'y5-d2-b',
            label: 'Industry Leader',
            description: 'Publish research, speak at conferences, shape the profession',
            meterChanges: { investmentKnowledge: 15, technicalAnalysis: 15, fatigue: 10, salary: 15000 },
            feedback: 'You\'re becoming a thought leader in wealth management.',
          },
          {
            id: 'y5-d2-c',
            label: 'Mentor and Teacher',
            description: 'Dedicate time to developing the next generation of advisors',
            meterChanges: { clientRelations: 10, workLifeBalance: 10, fatigue: -5 },
            feedback: 'The best legacy is the people you help along the way.',
          },
        ],
      },
    ],
    possibleEvents: [
      {
        id: 'y5-e1',
        title: 'Economic Boom',
        description: 'A bull market lifts all boats. Client portfolios are soaring!',
        meterChanges: { salary: 20000, clientRelations: 10, productivity: 10 },
        philComment: 'Good times don\'t last forever. Help clients stay grounded.',
      },
      {
        id: 'y5-e2',
        title: 'Life Milestone',
        description: 'A major personal milestone (marriage, child, home purchase) shifts your priorities.',
        meterChanges: { workLifeBalance: 15, fatigue: -10, productivity: -5 },
        philComment: 'Life happens. The best careers make room for what matters most.',
      },
    ],
    yearEndReview: "Five years complete! You've grown from a nervous junior advisor to a seasoned professional. Your journey has shaped your unique path in wealth management.",
  },
];

export const WM_SCENARIOS: WMScenario[] = [
  {
    id: 'scenario-angry-client',
    category: 'client',
    title: 'The Angry Client',
    situation: 'A client calls furious because their portfolio dropped 8% last month while "the market" was up.',
    context: 'Their portfolio is more conservative than the S&P 500 by design, matching their risk tolerance.',
    options: [
      {
        id: 'angry-a',
        label: 'Defend the Strategy',
        description: 'Explain why their conservative allocation is appropriate',
        meterChanges: { clientRelations: -5, investmentKnowledge: 5 },
        feedback: 'You\'re right, but the client feels dismissed.',
      },
      {
        id: 'angry-b',
        label: 'Empathize First',
        description: 'Acknowledge their frustration before explaining the strategy',
        meterChanges: { clientRelations: 10, productivity: 5 },
        feedback: 'The client feels heard and is now open to understanding.',
        philInsight: 'Always lead with empathy. Facts come after feelings.',
      },
      {
        id: 'angry-c',
        label: 'Offer to Review',
        description: 'Schedule a meeting to review their risk tolerance and goals',
        meterChanges: { clientRelations: 8, fatigue: 5, productivity: -5 },
        feedback: 'Good service, but this takes time from other clients.',
      },
    ],
    learningPoint: 'Client communication is about emotional intelligence as much as financial knowledge.',
  },
  {
    id: 'scenario-ethical-dilemma',
    category: 'client',
    title: 'The Ethical Dilemma',
    situation: 'A wealthy client wants to hide assets from their spouse during a divorce proceeding.',
    context: 'This would be illegal and could cost you your license.',
    options: [
      {
        id: 'ethical-a',
        label: 'Refuse Firmly',
        description: 'Explain this is illegal and you cannot participate',
        meterChanges: { clientRelations: -15, investmentKnowledge: 5, productivity: -10 },
        feedback: 'You lose the client but keep your integrity and license.',
        philInsight: 'Your reputation is worth more than any single client.',
      },
      {
        id: 'ethical-b',
        label: 'Suggest Legal Alternatives',
        description: 'Recommend they speak with a divorce attorney about legal options',
        meterChanges: { clientRelations: 5, technicalAnalysis: 5 },
        feedback: 'You helped redirect them appropriately.',
      },
      {
        id: 'ethical-c',
        label: 'Report to Compliance',
        description: 'Document the request and report to your firm\'s compliance department',
        meterChanges: { clientRelations: -20, productivity: 5, investmentKnowledge: 5 },
        feedback: 'The right call. Compliance will handle it from here.',
      },
    ],
    learningPoint: 'Ethics are non-negotiable in wealth management. Your license and reputation depend on it.',
  },
  {
    id: 'scenario-market-crash',
    category: 'market',
    title: 'Market Meltdown',
    situation: 'Markets drop 20% in a week. Your phone is ringing constantly with panicked clients.',
    context: 'History shows that selling during crashes locks in losses.',
    options: [
      {
        id: 'crash-a',
        label: 'Proactive Outreach',
        description: 'Call every client before they call you with a calming message',
        meterChanges: { clientRelations: 20, fatigue: 25, workLifeBalance: -15, productivity: 15 },
        feedback: 'Exhausting but effective. Clients feel cared for.',
        philInsight: 'In a crisis, the advisor who reaches out first wins trust.',
      },
      {
        id: 'crash-b',
        label: 'Triage by Priority',
        description: 'Focus on clients most likely to panic-sell first',
        meterChanges: { clientRelations: 10, fatigue: 15, productivity: 10 },
        feedback: 'Efficient use of limited time during chaos.',
      },
      {
        id: 'crash-c',
        label: 'Send Mass Communication',
        description: 'Email all clients with market perspective and reassurance',
        meterChanges: { productivity: 15, clientRelations: 5, fatigue: 5 },
        feedback: 'Scalable but impersonal. Some clients need more.',
      },
    ],
    learningPoint: 'Crisis management separates good advisors from great ones.',
  },
  {
    id: 'scenario-job-offer',
    category: 'career',
    title: 'The Competitor\'s Offer',
    situation: 'A rival firm offers you 30% more salary to join them.',
    context: 'You\'d have to leave your clients and start building relationships from scratch.',
    options: [
      {
        id: 'offer-a',
        label: 'Take the Offer',
        description: 'Accept the higher salary and new opportunity',
        meterChanges: { salary: 30000, clientRelations: -20, fatigue: 15, productivity: -10 },
        feedback: 'More money, but you\'re starting over with clients.',
      },
      {
        id: 'offer-b',
        label: 'Negotiate with Current Firm',
        description: 'Use the offer as leverage for a raise and promotion',
        meterChanges: { salary: 15000, clientRelations: 5, productivity: 5 },
        feedback: 'Smart negotiation. Your firm values you more now.',
        philInsight: 'Knowing your market value is powerful, even if you stay.',
      },
      {
        id: 'offer-c',
        label: 'Decline Gracefully',
        description: 'Thank them but commit to your current path',
        meterChanges: { clientRelations: 10, workLifeBalance: 5 },
        feedback: 'Loyalty has value. Your clients appreciate your stability.',
      },
    ],
    learningPoint: 'Career decisions involve more than just salary. Consider relationships, growth, and fit.',
  },
  {
    id: 'scenario-burnout',
    category: 'worklife',
    title: 'Burnout Warning Signs',
    situation: 'You\'re working 70-hour weeks and haven\'t taken a vacation in 18 months. You\'re exhausted.',
    context: 'Your performance metrics are great, but you\'re running on fumes.',
    options: [
      {
        id: 'burnout-a',
        label: 'Take a Break',
        description: 'Schedule a two-week vacation and delegate your clients',
        meterChanges: { fatigue: -30, workLifeBalance: 25, productivity: -10, clientRelations: -5 },
        feedback: 'You come back refreshed and more effective.',
        philInsight: 'Rest is productive. You can\'t pour from an empty cup.',
      },
      {
        id: 'burnout-b',
        label: 'Reduce Client Load',
        description: 'Transfer some clients to colleagues and focus on your best relationships',
        meterChanges: { fatigue: -15, workLifeBalance: 15, salary: -5000, clientRelations: 5 },
        feedback: 'Less volume, but higher quality service.',
      },
      {
        id: 'burnout-c',
        label: 'Push Through',
        description: 'The year-end bonus is coming. Just a few more months...',
        meterChanges: { fatigue: 20, salary: 10000, workLifeBalance: -15, productivity: -5 },
        feedback: 'You got the bonus, but at what cost to your health?',
      },
    ],
    learningPoint: 'Sustainable success requires managing your energy, not just your time.',
  },
];

export const WM_ENDINGS: WMSimEnding[] = [
  {
    id: 'ending-md',
    title: 'Managing Director',
    description: 'You reached the pinnacle of wealth management. Corner office, big salary, industry respect. But the hours are brutal and the pressure never stops.',
    finalTitle: 'Managing Director',
    conditions: (state: WMSimState) => 
      state.meters.salary >= 180000 && 
      state.meters.productivity >= 75 &&
      (state.meters.investmentKnowledge + state.meters.clientRelations + state.meters.technicalAnalysis) / 3 >= 70,
    bambooReward: 500,
    xpReward: 1000,
  },
  {
    id: 'ending-balance',
    title: 'Work-Life Champion',
    description: 'You found the sweet spot: a successful career AND a fulfilling personal life. Your clients love you, and you still have time for what matters.',
    finalTitle: 'Work-Life Champion',
    conditions: (state: WMSimState) => 
      state.meters.workLifeBalance >= 70 && 
      state.meters.fatigue <= 30 &&
      state.meters.clientRelations >= 60,
    bambooReward: 400,
    xpReward: 800,
  },
  {
    id: 'ending-expert',
    title: 'Industry Expert',
    description: 'You became a recognized authority in wealth management. Your research is cited, your opinions sought. You shaped the profession.',
    finalTitle: 'Senior Advisor',
    conditions: (state: WMSimState) => 
      (state.meters.investmentKnowledge + state.meters.technicalAnalysis) / 2 >= 80,
    bambooReward: 450,
    xpReward: 900,
  },
  {
    id: 'ending-client-champion',
    title: 'Client Champion',
    description: 'Your clients adore you. Generations of families trust you with their wealth. Your book of business is the envy of the firm.',
    finalTitle: 'Senior Advisor',
    conditions: (state: WMSimState) => 
      state.meters.clientRelations >= 85,
    bambooReward: 450,
    xpReward: 900,
  },
  {
    id: 'ending-burnout',
    title: 'Burned Out',
    description: 'You pushed too hard for too long. Your health and relationships suffered. Time to reassess what really matters.',
    finalTitle: 'Senior Advisor',
    conditions: (state: WMSimState) => 
      state.meters.fatigue >= 80 || state.meters.workLifeBalance <= 20,
    bambooReward: 200,
    xpReward: 400,
  },
  {
    id: 'ending-solid',
    title: 'Solid Professional',
    description: 'You built a respectable career in wealth management. Not the top of the mountain, but a good life helping clients achieve their goals.',
    finalTitle: 'Senior Advisor',
    conditions: () => true,
    bambooReward: 300,
    xpReward: 600,
  },
];

export function getYearConfig(year: number): WMYearConfig | undefined {
  return WM_YEAR_CONFIGS.find(y => y.year === year);
}

export function getScenariosByCategory(category: WMScenario['category']): WMScenario[] {
  return WM_SCENARIOS.filter(s => s.category === category);
}

export function determineEnding(state: WMSimState): WMSimEnding {
  for (const ending of WM_ENDINGS) {
    if (ending.conditions(state)) {
      return ending;
    }
  }
  return WM_ENDINGS[WM_ENDINGS.length - 1];
}
