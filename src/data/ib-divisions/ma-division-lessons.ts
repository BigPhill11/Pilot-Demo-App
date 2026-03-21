import { InteractiveLessonContent, MiniGameConfig, RealWorldExampleConfig, QuizQuestion } from '../investment-banking-lessons';

export interface MADivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'ma_basics' | 'ma_process' | 'ma_valuation' | 'ma_strategy' | 'ma_execution';
}

// M&A Division Terms
export const maDivisionTerms: Record<string, MADivisionTerm> = {
  // Level 1 - M&A Fundamentals
  strategic_buyer: {
    term: 'Strategic Buyer',
    definition: 'A company that acquires another business to achieve synergies and strategic goals',
    analogy: 'Like a pizza shop buying a delivery company to improve their business',
    level: 1,
    category: 'ma_basics'
  },
  financial_buyer: {
    term: 'Financial Buyer',
    definition: 'An investor (like private equity) that buys companies primarily for financial returns',
    analogy: 'Like buying a rental property just to make money from rent',
    level: 1,
    category: 'ma_basics'
  },
  target_company: {
    term: 'Target Company',
    definition: 'The company being acquired in an M&A transaction',
    analogy: 'Like the house you want to buy in a real estate deal',
    level: 1,
    category: 'ma_basics'
  },
  acquirer: {
    term: 'Acquirer',
    definition: 'The company or entity purchasing the target company',
    analogy: 'Like the person buying a house in a real estate deal',
    level: 1,
    category: 'ma_basics'
  },
  takeover_premium: {
    term: 'Takeover Premium',
    definition: 'The extra amount paid above the target\'s market price to convince shareholders to sell',
    analogy: 'Like paying extra for a popular toy to get it before someone else does',
    level: 1,
    category: 'ma_basics'
  },

  // Level 2 - M&A Process & Strategy
  stalking_horse_bid: {
    term: 'Stalking Horse Bid',
    definition: 'An initial bid that sets a floor price and terms for an auction process',
    analogy: 'Like being the first person to bid at an auction to get things started',
    level: 2,
    category: 'ma_process'
  },
  auction_process: {
    term: 'Auction Process',
    definition: 'A competitive bidding process where multiple buyers compete for a target company',
    analogy: 'Like an eBay auction where multiple people bid against each other',
    level: 2,
    category: 'ma_process'
  },
  management_presentation: {
    term: 'Management Presentation',
    definition: 'A detailed presentation by the target company\'s management to potential buyers',
    analogy: 'Like a home seller giving potential buyers a detailed tour',
    level: 2,
    category: 'ma_process'
  },
  data_room: {
    term: 'Data Room',
    definition: 'A secure virtual space where confidential company information is shared with buyers',
    analogy: 'Like a locked filing cabinet where you keep all your important documents',
    level: 2,
    category: 'ma_process'
  },
  go_shop_provision: {
    term: 'Go-Shop Provision',
    definition: 'A clause allowing the target to seek better offers for a specified period after signing',
    analogy: 'Like being able to keep looking for a better apartment for 30 days after signing a lease',
    level: 2,
    category: 'ma_process'
  },
  break_up_fee: {
    term: 'Break-up Fee',
    definition: 'A penalty paid if the deal falls through under certain circumstances',
    analogy: 'Like a cancellation fee if you back out of a wedding venue booking',
    level: 2,
    category: 'ma_process'
  },

  // Level 3 - Advanced M&A & Complex Situations  
  collar_structure: {
    term: 'Collar Structure',
    definition: 'A mechanism that limits the fluctuation in exchange ratio in stock deals',
    analogy: 'Like price protection when buying something with a gift card that might change value',
    level: 3,
    category: 'ma_execution'
  },
  reverse_breakup_fee: {
    term: 'Reverse Break-up Fee',
    definition: 'A penalty the buyer pays to the target if the buyer terminates the deal',
    analogy: 'Like paying a fine if you back out of buying a house after the seller removed it from market',
    level: 3,
    category: 'ma_execution'
  },
  voting_agreement: {
    term: 'Voting Agreement',
    definition: 'A contract where major shareholders agree to vote in favor of the transaction',
    analogy: 'Like getting your family to promise they\'ll vote for your choice in a family decision',
    level: 3,
    category: 'ma_execution'
  },
  material_adverse_effect: {
    term: 'Material Adverse Effect',
    definition: 'A significant negative change that allows a buyer to walk away from a deal',
    analogy: 'Like finding out your dream house has serious foundation problems',
    level: 3,
    category: 'ma_execution'
  },
  crown_jewel_defense: {
    term: 'Crown Jewel Defense',
    definition: 'Selling the most valuable assets to make the company less attractive to hostile bidders',
    analogy: 'Like selling your best jewelry to make yourself less appealing to a gold digger',
    level: 3,
    category: 'ma_strategy'
  }
};

// M&A Division Lessons
export const maDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "M&A Fundamentals: The Art of Corporate Combinations",
    description: "Master the basics of mergers and acquisitions - from strategic buyers to takeover premiums",
    theme: "M&A Foundation",
    objectives: [
      "Distinguish between strategic and financial buyers",
      "Understand different types of M&A transactions", 
      "Learn how takeover premiums work",
      "Recognize the key players in M&A deals"
    ],
    terminology: ['strategic_buyer', 'financial_buyer', 'target_company', 'acquirer', 'takeover_premium'],
    keyTerms: ['strategic_buyer', 'financial_buyer', 'target_company', 'acquirer', 'takeover_premium'],
    keyQuestions: [
      "What's the difference between strategic and financial buyers?",
      "Who are the key players in an M&A transaction?",
      "Why do buyers pay takeover premiums?",
      "What motivates companies to sell themselves?"
    ],
    miniGames: [
      {
        id: 'ma-buyer-identifier',
        name: 'M&A Buyer Detective',
        description: 'Identify whether buyers are strategic or financial based on their motivations',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'premium-calculator',
        name: 'Premium Price Master',
        description: 'Calculate takeover premiums and understand their impact',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'microsoft-activision-2023',
        title: "Microsoft's $69 Billion Acquisition of Activision Blizzard (2023)",
        company: "Microsoft & Activision Blizzard",
        year: 2023,
        description: "Microsoft's acquisition of Activision Blizzard was the largest gaming deal in history, showcasing strategic M&A rationale. Microsoft, a strategic buyer, paid $95 per share (a 45% premium) to acquire the gaming giant behind Call of Duty and World of Warcraft. The strategic rationale centered on expanding Microsoft's gaming ecosystem, boosting Game Pass subscriptions, and competing with Sony's PlayStation. The deal faced intense regulatory scrutiny from the FTC and European regulators concerned about gaming market concentration. Goldman Sachs and JPMorgan advised Microsoft, while Allen & Company advised Activision. The transaction required extensive antitrust analysis and regulatory filings across multiple jurisdictions. After 20 months of regulatory reviews and legal battles, the deal closed in October 2023, demonstrating how strategic buyers pursue long-term synergies despite regulatory challenges.",
        keyLearning: "Strategic buyers like Microsoft pursue acquisitions for long-term business synergies, often paying significant premiums to achieve strategic goals despite regulatory hurdles.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'strategic-vs-financial',
          question: "What primarily motivates a strategic buyer in an M&A transaction?",
          options: [
            "Quick financial returns through cost cutting",
            "Business synergies and strategic advantages", 
            "Reselling the company for a profit",
            "Tax benefits and deductions"
          ],
          correctAnswer: 1,
          explanation: "Strategic buyers like Microsoft acquire companies to achieve business synergies - combining operations, expanding market reach, or gaining new capabilities that enhance their existing business.",
          difficulty: 'beginner'
        },
        {
          id: 'takeover-premium-purpose',
          question: "Why do acquirers typically pay a takeover premium?",
          options: [
            "To show off their wealth to competitors",
            "Because regulations require it",
            "To convince shareholders to sell and account for control value",
            "To avoid paying taxes on the transaction"
          ],
          correctAnswer: 2,
          explanation: "Takeover premiums compensate shareholders for giving up their shares and reflect the additional value that comes from controlling the entire company rather than just owning individual shares.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "M&A Deal Analysis: Strategic vs Financial Buyer",
      description: "Analyze a real M&A scenario and determine whether the buyer is strategic or financial, and evaluate the premium paid.",
      steps: [
        "Review the case: TechCorp (software company) buying DataFlow (analytics firm) for $2B vs DataFlow's $1.5B market value",
        "Identify the buyer type: TechCorp wants to integrate DataFlow's analytics into their software platform",
        "Calculate the premium: ($2B - $1.5B) / $1.5B = 33% premium",
        "Analyze the rationale: Strategic buyer seeking product synergies and cross-selling opportunities",
        "Compare to alternative: What would a financial buyer (private equity) have done differently?"
      ],
      deliverable: "A one-page analysis identifying the buyer type, premium calculation, strategic rationale, and potential risks."
    }
  },
  {
    level: 2,
    title: "M&A Process Mastery: From Auction to Closing",
    description: "Navigate the complex world of M&A processes, auctions, and deal execution",
    theme: "M&A Process",
    objectives: [
      "Master the M&A auction process and competitive dynamics",
      "Understand data rooms and due diligence procedures",
      "Learn about key deal protection mechanisms",
      "Navigate management presentations and buyer negotiations"
    ],
    terminology: ['stalking_horse_bid', 'auction_process', 'management_presentation', 'data_room', 'go_shop_provision', 'break_up_fee'],
    keyTerms: ['stalking_horse_bid', 'auction_process', 'data_room', 'break_up_fee'],
    keyQuestions: [
      "How does the M&A auction process work?",
      "What happens in a data room during due diligence?",
      "Why are break-up fees important in M&A deals?",
      "How do stalking horse bids set auction dynamics?"
    ],
    miniGames: [
      {
        id: 'ma-auction-simulator',
        name: 'M&A Auction Master',
        description: 'Run a competitive auction process and optimize bidding strategies',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'data-room-organizer',
        name: 'Data Room Detective',
        description: 'Organize and analyze information in a virtual data room',
        xpReward: 75,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'twitter-musk-2022',
        title: "Elon Musk's $44 Billion Twitter Acquisition (2022)",
        company: "Elon Musk & Twitter",
        year: 2022,
        description: "Elon Musk's acquisition of Twitter demonstrated unconventional M&A tactics and deal protection mechanisms. Unlike typical auction processes, Musk made an unsolicited $54.20 per share offer, bypassing traditional M&A protocols. The deal included a $1 billion break-up fee payable by both parties under specific circumstances. Twitter's board initially resisted but accepted after Musk secured financing commitments. The merger agreement included specific performance clauses, meaning Musk couldn't simply walk away by paying the break-up fee. When Musk attempted to terminate the deal citing alleged misrepresentations about bot accounts, Twitter sued in Delaware Chancery Court to force completion. The case highlighted the importance of Material Adverse Effect (MAE) clauses and specific performance provisions. After months of legal battles and depositions, Musk ultimately completed the acquisition, demonstrating how deal protection mechanisms work in practice and the power of specific performance in M&A agreements.",
        keyLearning: "Deal protection mechanisms like break-up fees and specific performance clauses are crucial for ensuring deal completion, especially in volatile situations with unconventional buyers.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'auction-benefits',
          question: "What is the primary benefit of running an auction process for sellers?",
          options: [
            "It guarantees the deal will close faster",
            "It creates competition among buyers and potentially higher prices",
            "It reduces legal fees and transaction costs",
            "It eliminates the need for due diligence"
          ],
          correctAnswer: 1,
          explanation: "Auction processes create competitive tension among multiple bidders, often leading to higher offers and better terms for sellers as buyers compete against each other.",
          difficulty: 'intermediate'
        },
        {
          id: 'breakup-fee-purpose',
          question: "Why was the $1 billion break-up fee important in the Twitter-Musk deal?",
          options: [
            "It was just a symbolic gesture",
            "It provided deal protection and consequences for walking away",
            "It covered Twitter's legal expenses",
            "It was required by SEC regulations"
          ],
          correctAnswer: 1,
          explanation: "Break-up fees provide deal certainty by creating financial consequences for parties who terminate deals improperly, though in complex situations like Twitter-Musk, additional mechanisms like specific performance may be needed.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Design an M&A Auction Process",
      description: "Create a competitive auction process for selling a mid-size technology company.",
      steps: [
        "Define the target: CloudTech Inc. - $500M revenue, profitable SaaS company",
        "Identify potential bidders: 3 strategic buyers (tech companies) + 2 financial buyers (PE firms)",
        "Design auction timeline: 8-week process from initial outreach to final bids",
        "Create data room structure: financial, legal, commercial, and technical diligence folders",
        "Set deal protections: $25M break-up fee, 45-day go-shop period, management carve-out provisions",
        "Plan management presentations: 3-hour sessions with CEO, CFO, and key executives"
      ],
      deliverable: "A detailed auction process memo outlining timeline, bidder strategy, data room contents, and deal protection mechanisms."
    }
  },
  {
    level: 3,
    title: "Advanced M&A: Complex Deals & Defense Strategies",
    description: "Master complex M&A structures, hostile takeovers, and sophisticated defense mechanisms",
    theme: "Advanced M&A",
    objectives: [
      "Navigate complex deal structures and collar mechanisms",
      "Understand hostile takeover tactics and defenses",
      "Master voting agreements and shareholder dynamics", 
      "Analyze material adverse effect provisions and MAC clauses"
    ],
    terminology: ['collar_structure', 'reverse_breakup_fee', 'voting_agreement', 'material_adverse_effect', 'crown_jewel_defense'],
    keyTerms: ['collar_structure', 'material_adverse_effect', 'crown_jewel_defense', 'voting_agreement'],
    keyQuestions: [
      "How do collar structures protect both buyers and sellers?",
      "What constitutes a material adverse effect?",
      "When are crown jewel defenses most effective?",
      "How do voting agreements influence deal outcomes?"
    ],
    miniGames: [
      {
        id: 'hostile-defense-strategist',
        name: 'Hostile Takeover Defense',
        description: 'Deploy various defense strategies against hostile takeover attempts',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'collar-structure-builder',
        name: 'Deal Structure Master',
        description: 'Design collar structures to manage deal risk in volatile markets',
        xpReward: 90,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'xerox-hp-2020',
        title: "Xerox's Failed Hostile Takeover of HP Inc. (2020)",
        company: "Xerox & HP Inc.",
        year: 2020,
        description: "Xerox's attempted hostile takeover of HP Inc. showcased modern takeover tactics and defense strategies. Xerox, much smaller than HP, proposed a $35 billion all-cash and stock offer, arguing for cost synergies in the declining printing industry. HP's board rejected multiple offers, citing undervaluation and execution risks. Xerox then initiated a proxy contest to replace HP's directors with Xerox nominees. HP deployed several defense tactics: questioning Xerox's financing capability, highlighting integration risks, and emphasizing that the deal would primarily benefit Xerox shareholders at HP's expense. The COVID-19 pandemic provided HP with additional arguments about material adverse changes affecting both companies' businesses. HP also pointed to Xerox's own struggles and debt levels. Ultimately, Xerox abandoned the takeover attempt in April 2020, citing market volatility from COVID-19. The case demonstrated how target companies can successfully defend against hostile takeovers using multiple strategies: board resistance, shareholder communication, financial analysis, and external market conditions.",
        keyLearning: "Successful hostile takeover defenses require multiple coordinated strategies: financial arguments, operational concerns, market timing, and effective shareholder communication.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'crown-jewel-strategy',
          question: "When is a crown jewel defense most effective against hostile takeovers?",
          options: [
            "When the target has many valuable assets",
            "When the bidder wants specific valuable assets more than the whole company",
            "When the target company is very large",
            "When the stock price is high"
          ],
          correctAnswer: 1,
          explanation: "Crown jewel defenses work best when hostile bidders are primarily interested in specific valuable assets - threatening to sell those assets makes the takeover less attractive.",
          difficulty: 'advanced'
        },
        {
          id: 'material-adverse-effect',
          question: "What made COVID-19 a potential 'material adverse effect' in the Xerox-HP situation?",
          options: [
            "It was mentioned in the news",
            "It significantly disrupted both companies' business operations and market conditions",
            "It happened during the deal process",
            "It affected the stock market generally"
          ],
          correctAnswer: 1,
          explanation: "Material adverse effects must significantly impact the target's business, operations, or financial condition - COVID-19's massive disruption to business operations qualified as a potential MAE.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Hostile Takeover Defense Strategy",
      description: "Develop a comprehensive defense strategy for a company facing a hostile takeover attempt.",
      steps: [
        "Scenario: RetailCorp ($10B market cap) facing hostile bid from PrivateCorp ($15B market cap)",
        "Analyze the threat: PrivateCorp offering $12B (20% premium) for retail synergies",
        "Develop financial defense: Show the bid undervalues RetailCorp's growth prospects and digital transformation",
        "Design tactical defenses: Consider poison pill, crown jewel (sell e-commerce division), white knight options",
        "Plan shareholder communication: Emphasize standalone value, execution risks, and better alternatives",
        "Evaluate legal strategies: Review bylaws, staggered board provisions, and state law protections"
      ],
      deliverable: "A comprehensive defense playbook including financial analysis, tactical options, communication strategy, and legal review."
    }
  }
];