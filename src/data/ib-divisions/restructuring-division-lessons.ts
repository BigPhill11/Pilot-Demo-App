import { InteractiveLessonContent } from '../investment-banking-lessons';

export interface RestructuringDivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'restructuring_basics' | 'bankruptcy_process' | 'debt_workouts' | 'valuation_recovery' | 'stakeholder_management';
}

// Restructuring Division Terms
export const restructuringDivisionTerms: Record<string, RestructuringDivisionTerm> = {
  // Level 1 - Restructuring Fundamentals
  financial_restructuring: {
    term: 'Financial Restructuring',
    definition: 'Reorganizing a company\'s debt and financial structure to avoid bankruptcy or improve operations',
    analogy: 'Like renegotiating your bills and expenses when you\'re struggling to pay them',
    level: 1,
    category: 'restructuring_basics'
  },
  distressed_company: {
    term: 'Distressed Company',
    definition: 'A company facing serious financial difficulties that may lead to bankruptcy',
    analogy: 'Like a person who can\'t pay their rent and is at risk of eviction',
    level: 1,
    category: 'restructuring_basics'
  },
  workout: {
    term: 'Workout',
    definition: 'An out-of-court agreement between a company and its creditors to restructure debt',
    analogy: 'Like working out a payment plan with your credit card company instead of going to court',
    level: 1,
    category: 'debt_workouts'
  },
  debtor_in_possession: {
    term: 'Debtor-in-Possession (DIP)',
    definition: 'A company that continues operating under bankruptcy court protection while reorganizing',
    analogy: 'Like staying in your house while working out a deal with the bank to avoid foreclosure',
    level: 1,
    category: 'bankruptcy_process'
  },
  creditor: {
    term: 'Creditor',
    definition: 'Someone who is owed money by the distressed company',
    analogy: 'Like all the people you owe money to - credit card companies, landlord, etc.',
    level: 1,
    category: 'restructuring_basics'
  },

  // Level 2 - Bankruptcy Process & Stakeholder Management
  chapter_11: {
    term: 'Chapter 11',
    definition: 'A U.S. bankruptcy process that allows companies to reorganize while protected from creditors',
    analogy: 'Like getting a timeout to reorganize your finances while creditors can\'t demand immediate payment',
    level: 2,
    category: 'bankruptcy_process'
  },
  automatic_stay: {
    term: 'Automatic Stay',
    definition: 'Legal protection that stops all collection actions when a company files for bankruptcy',
    analogy: 'Like a legal force field that stops bill collectors from bothering you while you reorganize',
    level: 2,
    category: 'bankruptcy_process'
  },
  plan_of_reorganization: {
    term: 'Plan of Reorganization',
    definition: 'A detailed proposal for how a bankrupt company will emerge and pay creditors',
    analogy: 'Like a detailed plan for how you\'ll get back on your feet and pay everyone back',
    level: 2,
    category: 'bankruptcy_process'
  },
  cramdown: {
    term: 'Cramdown',
    definition: 'Court approval of a reorganization plan even when some creditor classes vote against it',
    analogy: 'Like a judge forcing a settlement on parties who can\'t agree',
    level: 2,
    category: 'bankruptcy_process'
  },
  stalking_horse_bid: {
    term: 'Stalking Horse Bid',
    definition: 'An initial bid for a bankrupt company\'s assets that sets a floor for an auction',
    analogy: 'Like the first bid at an estate sale that gets the auction started',
    level: 2,
    category: 'valuation_recovery'
  },
  debtor_financing: {
    term: 'Debtor-in-Possession (DIP) Financing',
    definition: 'New money lent to a company during bankruptcy to fund operations',
    analogy: 'Like getting a short-term loan to pay your bills while you sort out your finances',
    level: 2,
    category: 'debt_workouts'
  },

  // Level 3 - Advanced Restructuring & Complex Situations
  '363_sale': {
    term: '363 Sale',
    definition: 'A bankruptcy court-approved sale of assets free and clear of most liens and claims',
    analogy: 'Like a court-supervised garage sale where items are sold without any strings attached',
    level: 3,
    category: 'bankruptcy_process'
  },
  absolute_priority_rule: {
    term: 'Absolute Priority Rule',
    definition: 'Bankruptcy principle that senior creditors must be paid in full before junior creditors receive anything',
    analogy: 'Like a line at a buffet where people in front must get completely served before people behind get anything',
    level: 3,
    category: 'stakeholder_management'
  },
  liquidation_analysis: {
    term: 'Liquidation Analysis',
    definition: 'Valuation of what creditors would receive if the company were sold for parts',
    analogy: 'Like figuring out how much money you\'d get if you sold all your possessions individually',
    level: 3,
    category: 'valuation_recovery'
  },
  preference_payment: {
    term: 'Preference Payment',
    definition: 'Payments made to creditors before bankruptcy that can be recovered by the estate',
    analogy: 'Like having to return money you paid to one friend if it meant you couldn\'t pay other friends',
    level: 3,
    category: 'bankruptcy_process'
  },
  make_whole_provision: {
    term: 'Make-Whole Provision',
    definition: 'A clause requiring payment of future interest if debt is repaid early',
    analogy: 'Like a penalty for paying off a loan early because the lender loses expected interest',
    level: 3,
    category: 'debt_workouts'
  }
};

// Restructuring Division Lessons
export const restructuringDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Financial Restructuring Fundamentals: When Companies Face Crisis",
    description: "Master the basics of financial restructuring and how companies navigate distress",
    theme: "Restructuring Foundation",
    objectives: [
      "Understand what drives companies into financial distress",
      "Learn the difference between workouts and bankruptcy",
      "Master the roles of different stakeholders in restructuring",
      "Explore how debtor-in-possession status works"
    ],
    terminology: ['financial_restructuring', 'distressed_company', 'workout', 'debtor_in_possession', 'creditor'],
    keyTerms: ['financial_restructuring', 'distressed_company', 'workout', 'debtor_in_possession', 'creditor'],
    keyQuestions: [
      "What causes companies to become financially distressed?",
      "How do workouts differ from bankruptcy proceedings?",
      "Who are the key stakeholders in a restructuring?",
      "What advantages does debtor-in-possession status provide?"
    ],
    miniGames: [
      {
        id: 'distress-identifier',
        name: 'Financial Distress Detective',
        description: 'Identify early warning signs of financial distress in company financials',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'stakeholder-mapper',
        name: 'Restructuring Stakeholder Organizer',
        description: 'Map out creditor priorities and organize stakeholder interests',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'bed-bath-beyond-bankruptcy-2023',
        title: "Bed Bath & Beyond's Rapid Decline to Bankruptcy (2023)",
        company: "Bed Bath & Beyond",
        year: 2023,
        description: "Bed Bath & Beyond's 2023 bankruptcy filing demonstrated how quickly retail companies can spiral from distress to liquidation. The home goods retailer, once a dominant force with over 1,000 stores, faced mounting challenges from e-commerce competition, poor inventory management, and failed turnaround strategies. By early 2023, the company was burning through cash rapidly, unable to pay suppliers, and facing inventory shortages that created a vicious cycle of declining sales. Management initially attempted an out-of-court workout, negotiating with suppliers for extended payment terms and seeking new financing. However, the company's liquidity crisis accelerated when key suppliers demanded cash-on-delivery terms, further restricting inventory. In April 2023, Bed Bath & Beyond filed for Chapter 11 bankruptcy with Kirkland & Ellis as restructuring counsel. Unlike traditional restructuring cases focused on reorganization, this became a liquidation-focused bankruptcy. The company immediately began closing stores and liquidating inventory through going-out-of-business sales. Investment banks evaluated potential buyers for the company's intellectual property, customer data, and remaining real estate assets, but found limited interest due to the deteriorated brand value.",
        keyLearning: "Retail restructuring cases often move quickly from distress to liquidation when customer confidence erodes and suppliers lose faith, making early intervention and decisive action critical.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'workout-vs-bankruptcy',
          question: "What is the main advantage of an out-of-court workout over bankruptcy?",
          options: [
            "Workouts always result in better recovery for creditors",
            "Workouts avoid the costs, time, and public scrutiny of bankruptcy court",
            "Workouts provide stronger legal protections",
            "Workouts eliminate all debt obligations"
          ],
          correctAnswer: 1,
          explanation: "Out-of-court workouts can be faster, less expensive, and more private than bankruptcy proceedings, though they lack the legal protections that bankruptcy provides.",
          difficulty: 'beginner'
        },
        {
          id: 'dip-status-benefit',
          question: "What was the key benefit of debtor-in-possession status for Bed Bath & Beyond?",
          options: [
            "It eliminated all debt immediately",
            "It allowed continued operations while protected from creditor collection actions",
            "It guaranteed the company would survive",
            "It prevented any store closures"
          ],
          correctAnswer: 1,
          explanation: "Debtor-in-possession status provides an automatic stay that prevents creditors from demanding immediate payment, allowing the company to continue operating while restructuring.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "Analyze Financial Distress Warning Signs",
      description: "Evaluate a company's financial health and identify restructuring triggers.",
      steps: [
        "Company: RetailChain Inc. - $2B revenue, declining 15% annually",
        "Warning signs: Negative cash flow, covenant violations, supplier payment delays",
        "Liquidity analysis: $50M cash, $200M revolver 90% drawn, $500M debt maturity in 6 months",
        "Stakeholder mapping: Senior lenders, suppliers, landlords, employees, customers",
        "Options assessment: Asset sales, supplier negotiations, debt amendment, or Chapter 11",
        "Recommendation: Immediate liquidity solutions and stakeholder engagement strategy"
      ],
      deliverable: "A distress analysis report identifying warning signs, stakeholder priorities, and recommended immediate actions to address the situation."
    }
  },
  {
    level: 2,
    title: "Bankruptcy Process & Stakeholder Management: Navigating Chapter 11",
    description: "Navigate the complex Chapter 11 process and manage competing stakeholder interests",
    theme: "Bankruptcy Process",
    objectives: [
      "Master the Chapter 11 bankruptcy process and timeline",
      "Understand automatic stay protections and their implications",
      "Learn how reorganization plans are developed and approved",
      "Explore debtor-in-possession financing and stalking horse bids"
    ],
    terminology: ['chapter_11', 'automatic_stay', 'plan_of_reorganization', 'cramdown', 'stalking_horse_bid', 'debtor_financing'],
    keyTerms: ['chapter_11', 'automatic_stay', 'plan_of_reorganization', 'cramdown'],
    keyQuestions: [
      "How does the Chapter 11 process protect distressed companies?",
      "What role does the automatic stay play in bankruptcy?",
      "How are reorganization plans negotiated and approved?",
      "When do courts use cramdown powers?"
    ],
    miniGames: [
      {
        id: 'chapter11-timeline-manager',
        name: 'Bankruptcy Process Navigator',
        description: 'Manage the complex timeline and milestones of a Chapter 11 case',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'reorganization-plan-builder',
        name: 'Plan of Reorganization Architect',
        description: 'Design a reorganization plan that balances competing stakeholder interests',
        xpReward: 90,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'hertz-bankruptcy-reorganization-2020',
        title: "Hertz's Unprecedented Stock Rally During Bankruptcy (2020-2021)",
        company: "Hertz Global Holdings",
        year: 2021,
        description: "Hertz's Chapter 11 bankruptcy and subsequent reorganization became one of the most unusual cases in restructuring history due to unprecedented retail investor activity. Hertz filed for bankruptcy in May 2020 as COVID-19 devastated the rental car industry, facing over $18 billion in debt and collapsed revenue. The company's stock continued trading on over-the-counter markets, typically worthless in bankruptcy. However, retail investors on platforms like Robinhood began buying Hertz shares, driving the stock from under $1 to over $5, creating a $6 billion market capitalization for a bankrupt company. This unprecedented situation allowed Hertz to propose selling new shares to fund its reorganization - normally impossible in bankruptcy since existing equity holders are last in line. The bankruptcy court initially approved this novel approach, but the SEC intervened with concerns about retail investors not understanding bankruptcy risks. Centerview Partners and PJT Partners advised Hertz on strategic alternatives. Ultimately, improving used car prices and recovering travel demand allowed Hertz to emerge from bankruptcy in June 2021 without liquidating, with equity holders receiving some recovery - extremely rare in large corporate bankruptcies.",
        keyLearning: "The Hertz case demonstrated how market dynamics and retail investor behavior can create unprecedented situations in bankruptcy, requiring creative solutions while protecting unsophisticated investors.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'automatic-stay-protection',
          question: "How did the automatic stay help Hertz during its bankruptcy?",
          options: [
            "It prevented the stock from trading",
            "It stopped creditors from seizing assets or demanding immediate payment",
            "It guaranteed Hertz would survive",
            "It eliminated all debt obligations"
          ],
          correctAnswer: 1,
          explanation: "The automatic stay provides crucial breathing room by preventing creditors from taking collection actions, allowing the debtor to stabilize operations and develop a reorganization plan.",
          difficulty: 'intermediate'
        },
        {
          id: 'equity-recovery-rarity',
          question: "Why was equity holder recovery in Hertz's bankruptcy so unusual?",
          options: [
            "Equity holders normally get paid first",
            "The company had no debt",
            "Equity holders typically receive nothing in large corporate bankruptcies",
            "It was required by law"
          ],
          correctAnswer: 2,
          explanation: "Under the absolute priority rule, equity holders are last in line and typically receive nothing when a company has significant debt, making Hertz's equity recovery extremely rare.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Design a Chapter 11 Reorganization Plan",
      description: "Create a comprehensive reorganization plan for a distressed airline company.",
      steps: [
        "Debtor: SkyLine Airlines - $8B debt, $2B annual revenue (down 60% from pre-COVID)",
        "Stakeholder classes: Secured lenders ($4B), unsecured bondholders ($3B), trade creditors ($1B)",
        "Asset valuation: Going-concern value $5B, liquidation value $2B",
        "Plan structure: Secured lenders get new equity + cash, unsecured get recovery notes",
        "Operational restructuring: Fleet reduction, route optimization, cost cuts",
        "Exit financing: $1B in new financing to fund emergence and working capital"
      ],
      deliverable: "A detailed reorganization plan including stakeholder treatment, operational changes, financial projections, and implementation timeline."
    }
  },
  {
    level: 3,
    title: "Advanced Restructuring: Complex Transactions & Recovery Optimization",
    description: "Master sophisticated restructuring techniques and complex distressed transactions",
    theme: "Advanced Restructuring",
    objectives: [
      "Navigate 363 sales and asset acquisition strategies",
      "Understand absolute priority rules and creditor recoveries",
      "Master liquidation analysis and recovery optimization",
      "Explore preference payments and make-whole provisions"
    ],
    terminology: ['363_sale', 'absolute_priority_rule', 'liquidation_analysis', 'preference_payment', 'make_whole_provision'],
    keyTerms: ['363_sale', 'absolute_priority_rule', 'liquidation_analysis', 'preference_payment'],
    keyQuestions: [
      "When are 363 sales most effective in restructuring?",
      "How does the absolute priority rule affect creditor recoveries?",
      "What factors drive liquidation versus reorganization analysis?",
      "How do preference payments affect pre-bankruptcy transactions?"
    ],
    miniGames: [
      {
        id: 'asset-sale-optimizer',
        name: '363 Sale Strategist',
        description: 'Structure and execute strategic asset sales to maximize creditor recoveries',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'recovery-maximizer',
        name: 'Creditor Recovery Optimizer',
        description: 'Analyze complex capital structures and optimize recovery strategies',
        xpReward: 95,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'toys-r-us-liquidation-2018',
        title: "Toys R Us: When Reorganization Becomes Liquidation (2018)",
        company: "Toys R Us",
        year: 2018,
        description: "Toys R Us's 2018 liquidation demonstrated how changing market conditions can force even reorganization-focused bankruptcies into liquidation scenarios. The toy retailer filed for Chapter 11 in September 2017 with plans to reorganize and emerge as a smaller, more focused company. Lazard and Kirkland & Ellis advised the company on restructuring alternatives. Initially, the plan involved closing unprofitable stores while maintaining the core business and valuable international operations. However, the critical 2017 holiday season performed worse than projected, with suppliers becoming increasingly reluctant to ship merchandise due to payment concerns. This created a liquidity crisis that forced management to consider more drastic alternatives. In March 2018, unable to find a buyer for the entire business as a going concern, Toys R Us announced it would liquidate all U.S. operations through a series of 363 sales. The company's valuable real estate portfolio, international operations, and intellectual property were sold separately to different buyers. KKR, Bain Capital, and Vornado - the private equity sponsors from the 2005 LBO - lost their entire investment. The case highlighted how seasonal businesses face unique restructuring challenges and how quickly reorganization cases can shift to liquidation when operational performance deteriorates.",
        keyLearning: "Retail restructurings are particularly challenging due to supplier confidence issues and seasonal cash flow patterns, requiring careful timing and stakeholder management to avoid liquidation spirals.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: '363-sale-advantage',
          question: "What was the main advantage of using 363 sales for Toys\"R\"Us assets?",
          options: [
            "It guaranteed higher prices",
            "It allowed assets to be sold free and clear of most liens and claims",
            "It eliminated bankruptcy court oversight",
            "It prevented any asset sales"
          ],
          correctAnswer: 1,
          explanation: "363 sales allow assets to be sold 'free and clear' of most liens and claims, making them more attractive to buyers and potentially achieving higher values than in traditional asset sales.",
          difficulty: 'advanced'
        },
        {
          id: 'liquidation-vs-reorganization',
          question: "What factor ultimately drove Toys R Us from reorganization to liquidation?",
          options: [
            "Court requirements",
            "Creditor demands",
            "Poor holiday performance and supplier confidence loss creating a liquidity crisis",
            "Management decisions only"
          ],
          correctAnswer: 2,
          explanation: "The poor 2017 holiday season combined with supplier reluctance to ship goods created a liquidity crisis that made reorganization impossible, forcing liquidation as the only viable option.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Structure a Complex Asset Sale Strategy",
      description: "Design a comprehensive asset sale strategy for a distressed retail conglomerate.",
      steps: [
        "Company: MegaRetail Corp - 5 different retail brands, $10B total debt, declining operations",
        "Asset portfolio: Premium brand ($2B value), Core brands ($3B), Real estate ($1.5B), E-commerce platform ($500M)",
        "Sale structure: Premium brand - going concern 363 sale, Core brands - liquidation sales",
        "Buyer strategy: Strategic buyers for premium, liquidators for core, REITs for real estate",
        "Timing optimization: Premium sale first to maximize value, coordinate other sales",
        "Recovery analysis: Estimate $4B total proceeds vs. $2.5B liquidation value"
      ],
      deliverable: "A comprehensive asset sale strategy including sale sequencing, buyer identification, valuation analysis, and creditor recovery projections."
    }
  }
];