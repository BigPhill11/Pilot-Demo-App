import { InteractiveLessonContent } from '../investment-banking-lessons';

export interface ECMDivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'ecm_basics' | 'ipo_process' | 'follow_on' | 'ecm_execution' | 'ecm_pricing';
}

// Equity Capital Markets Division Terms
export const ecmDivisionTerms: Record<string, ECMDivisionTerm> = {
  // Level 1 - ECM Fundamentals
  equity_capital_markets: {
    term: 'Equity Capital Markets',
    definition: 'The division that helps companies raise money by selling shares to public investors',
    analogy: 'Like a real estate agent who helps you sell pieces of your house to multiple buyers',
    level: 1,
    category: 'ecm_basics'
  },
  primary_offering: {
    term: 'Primary Offering',
    definition: 'When a company issues new shares to raise fresh capital',
    analogy: 'Like a bakery making new cookies to sell - creates new product and brings in money',
    level: 1,
    category: 'ecm_basics'
  },
  secondary_offering: {
    term: 'Secondary Offering',
    definition: 'When existing shareholders sell their shares to new investors',
    analogy: 'Like selling your used car to someone else - no new cars created, just ownership changes',
    level: 1,
    category: 'ecm_basics'
  },
  offering_price: {
    term: 'Offering Price',
    definition: 'The price at which new shares are sold to investors in a public offering',
    analogy: 'Like the sticker price on a new car at the dealership',
    level: 1,
    category: 'ecm_pricing'
  },
  allocation: {
    term: 'Allocation',
    definition: 'How shares in an oversubscribed offering are distributed among different investors',
    analogy: 'Like deciding how to divide up concert tickets when more people want them than available',
    level: 1,
    category: 'ecm_execution'
  },

  // Level 2 - IPO Process & Follow-on Offerings
  red_herring: {
    term: 'Red Herring',
    definition: 'A preliminary prospectus that doesn\'t include the final offering price or number of shares',
    analogy: 'Like a movie preview that shows you what\'s coming but doesn\'t tell you the ticket price yet',
    level: 2,
    category: 'ipo_process'
  },
  lock_up_period: {
    term: 'Lock-up Period',
    definition: 'A time after an IPO when insiders and early investors cannot sell their shares',
    analogy: 'Like a waiting period after joining a gym before you can cancel your membership',
    level: 2,
    category: 'ipo_process'
  },
  follow_on_offering: {
    term: 'Follow-on Offering',
    definition: 'Additional shares issued by a company that\'s already public',
    analogy: 'Like a popular restaurant opening a second location after the first one succeeds',
    level: 2,
    category: 'follow_on'
  },
  accelerated_bookbuild: {
    term: 'Accelerated Bookbuild',
    definition: 'A rapid process for selling large blocks of shares, usually completed overnight',
    analogy: 'Like a flash sale where everything needs to be sold very quickly',
    level: 2,
    category: 'ecm_execution'
  },
  block_trade: {
    term: 'Block Trade',
    definition: 'A large transaction of shares, typically involving institutional investors',
    analogy: 'Like selling your entire comic book collection to one serious collector instead of piece by piece',
    level: 2,
    category: 'ecm_execution'
  },
  greenshoe_option: {
    term: 'Greenshoe Option',
    definition: 'An option that allows underwriters to sell additional shares if demand is strong',
    analogy: 'Like having extra concert tickets in reserve in case the show sells out',
    level: 2,
    category: 'ecm_execution'
  },

  // Level 3 - Advanced ECM & Complex Transactions
  spac: {
    term: 'SPAC',
    definition: 'Special Purpose Acquisition Company: a shell company that raises money to acquire another business',
    analogy: 'Like raising money for a mystery box - investors trust you to buy something good later',
    level: 3,
    category: 'ecm_basics'
  },
  direct_listing: {
    term: 'Direct Listing',
    definition: 'Going public without issuing new shares or using traditional underwriters',
    analogy: 'Like starting to sell your homemade crafts online without using a marketplace',
    level: 3,
    category: 'ipo_process'
  },
  at_the_market_offering: {
    term: 'At-the-Market Offering',
    definition: 'A method to sell shares gradually into the existing trading market at prevailing prices',
    analogy: 'Like slowly selling your baseball cards at market prices rather than all at once',
    level: 3,
    category: 'follow_on'
  },
  rights_offering: {
    term: 'Rights Offering',
    definition: 'Giving existing shareholders the right to buy additional shares at a discount',
    analogy: 'Like giving your current customers first dibs on buying more at a special price',
    level: 3,
    category: 'follow_on'
  },
  equity_linked_securities: {
    term: 'Equity-Linked Securities',
    definition: 'Financial instruments whose value is tied to the performance of underlying stocks',
    analogy: 'Like a gift card that\'s worth more or less depending on how well a company does',
    level: 3,
    category: 'ecm_basics'
  }
};

// ECM Division Lessons
export const ecmDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Equity Capital Markets Fundamentals: Raising Money Through Stock Sales",
    description: "Master the basics of how companies raise money by selling shares to public investors",
    theme: "ECM Foundation", 
    objectives: [
      "Understand the role of equity capital markets in corporate finance",
      "Distinguish between primary and secondary offerings",
      "Learn how offering prices are determined and shares allocated",
      "Explore the basic mechanics of share issuance"
    ],
    terminology: ['equity_capital_markets', 'primary_offering', 'secondary_offering', 'offering_price', 'allocation'],
    keyTerms: ['equity_capital_markets', 'primary_offering', 'secondary_offering', 'offering_price', 'allocation'],
    keyQuestions: [
      "What is the purpose of equity capital markets?",
      "How do primary offerings differ from secondary offerings?",
      "How are offering prices determined?",
      "Why is share allocation important in oversubscribed deals?"
    ],
    miniGames: [
      {
        id: 'ecm-basics-sorter',
        name: 'ECM Transaction Sorter', 
        description: 'Classify different types of equity offerings and understand their purposes',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'allocation-optimizer',
        name: 'Share Allocation Master',
        description: 'Allocate oversubscribed shares among different types of investors',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'rivian-ipo-2021',
        title: "Rivian's $12 Billion IPO: EV Dreams Meet Market Reality (2021)",
        company: "Rivian Automotive",
        year: 2021,
        description: "Rivian's November 2021 IPO became one of the largest in U.S. history, raising $12 billion and showcasing both the potential and risks of high-growth equity offerings. The electric vehicle startup, backed by Amazon, priced 153 million shares at $78 each, well above the initial $57-$62 range due to massive investor demand. Goldman Sachs, JPMorgan, and Morgan Stanley led the underwriting syndicate. The offering was massively oversubscribed, with demand exceeding 20x the available shares. Rivian's allocation strategy prioritized long-term institutional investors over retail traders. The stock opened at $106.75 on the first day, giving early investors immediate gains but also highlighting pricing challenges. However, the euphoria was short-lived - the stock fell 50% within weeks as investors questioned the $100+ billion valuation for a company with minimal revenue. The case demonstrated key ECM principles: how hot sectors can drive massive demand, the importance of proper pricing and allocation, and how market sentiment can quickly shift even for successfully executed offerings.",
        keyLearning: "Even successfully executed IPOs with strong initial demand can face significant price volatility if market sentiment shifts or valuations appear disconnected from fundamentals.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'primary-vs-secondary',
          question: "In a primary offering, who receives the money from share sales?",
          options: [
            "The existing shareholders who are selling",
            "The company issuing new shares",
            "The investment bank underwriters",
            "The stock exchange where it's listed"
          ],
          correctAnswer: 1,
          explanation: "In primary offerings, the company issues new shares and receives the proceeds to fund business operations, expansion, or other corporate purposes.",
          difficulty: 'beginner'
        },
        {
          id: 'allocation-importance',
          question: "Why was allocation strategy important in Rivian's oversubscribed IPO?",
          options: [
            "To maximize the offering price",
            "To comply with government regulations",
            "To prioritize long-term investors over short-term traders",
            "To reduce underwriting fees"
          ],
          correctAnswer: 2,
          explanation: "Proper allocation helps ensure shares go to investors likely to hold them longer-term rather than flip them immediately, supporting more stable post-IPO trading.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "Equity Offering Analysis: Primary vs Secondary Impact",
      description: "Analyze how primary and secondary offerings affect companies and shareholders differently.",
      steps: [
        "Scenario: TechCorp needs $500M and insiders want to sell $300M of existing shares",
        "Structure mixed offering: $500M primary (new shares) + $300M secondary (insider sales)",
        "Calculate share impact: 20M new shares (primary) + 12M existing shares (secondary) at $25/share",
        "Analyze use of proceeds: Primary funds go to TechCorp for R&D, secondary funds go to selling shareholders",
        "Consider market perception: Large insider selling might signal lack of confidence vs. normal liquidity needs"
      ],
      deliverable: "A comparative analysis showing how primary and secondary components serve different purposes and affect stakeholders differently."
    }
  },
  {
    level: 2,
    title: "IPO Process & Follow-on Offerings: From Private to Public Markets",
    description: "Navigate the complex journey from IPO launch through follow-on offerings and ongoing capital raises",
    theme: "ECM Process",
    objectives: [
      "Master the IPO process from red herring to trading debut",
      "Understand lock-up periods and their market impact",
      "Learn about follow-on offerings and timing considerations", 
      "Explore accelerated execution methods like overnight bookbuilds"
    ],
    terminology: ['red_herring', 'lock_up_period', 'follow_on_offering', 'accelerated_bookbuild', 'block_trade', 'greenshoe_option'],
    keyTerms: ['red_herring', 'lock_up_period', 'follow_on_offering', 'accelerated_bookbuild'],
    keyQuestions: [
      "What information is included in a red herring prospectus?",
      "Why do companies have lock-up periods after IPOs?",
      "When do companies typically do follow-on offerings?",
      "How do accelerated bookbuilds work?"
    ],
    miniGames: [
      {
        id: 'ipo-timeline-builder',
        name: 'IPO Process Master',
        description: 'Navigate the complete IPO timeline from filing to first day of trading',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'bookbuild-accelerator',
        name: 'Overnight Deal Executor',
        description: 'Execute an accelerated bookbuild to sell a large block of shares rapidly',
        xpReward: 90,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'coinbase-direct-listing-2021',
        title: "Coinbase's Direct Listing: Bypassing Traditional IPO (2021)",
        company: "Coinbase Global",
        year: 2021,
        description: "Coinbase's April 2021 direct listing marked a significant departure from traditional IPO processes, demonstrating alternative paths to public markets. Unlike traditional IPOs, Coinbase didn't issue new shares or use underwriters to set a price. Instead, existing shares traded directly on NASDAQ based on market demand. Goldman Sachs, JPMorgan, and Allen & Company served as financial advisors (not underwriters) to provide guidance and facilitate the listing. No lock-up period existed since no new shares were issued. Trading began with a reference price of $250, but the stock opened at $381 based on actual supply and demand, valuing Coinbase at nearly $100 billion. The direct listing allowed Coinbase to avoid dilution from new share issuance and eliminated traditional underwriting fees (saving an estimated $300+ million). However, without price discovery through a traditional bookbuilding process, the stock experienced significant volatility. The success demonstrated that well-known companies with sufficient liquidity could bypass traditional IPO mechanics, though this approach requires strong brand recognition and natural trading demand.",
        keyLearning: "Direct listings offer an alternative to traditional IPOs for well-known companies, avoiding dilution and underwriting fees but requiring sufficient market awareness and trading demand.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'red-herring-purpose',
          question: "What is the main purpose of a red herring prospectus?",
          options: [
            "To confuse investors about the offering",
            "To provide company information while the final price is being determined", 
            "To guarantee the offering will be successful",
            "To list all the risks of investing"
          ],
          correctAnswer: 1,
          explanation: "Red herring prospectuses allow companies to start marketing to investors and gather demand feedback while still finalizing the offering price and share count.",
          difficulty: 'intermediate'
        },
        {
          id: 'direct-listing-advantage',
          question: "What was Coinbase's main advantage from choosing a direct listing?",
          options: [
            "It guaranteed a higher stock price",
            "It avoided dilution and saved underwriting fees",
            "It attracted more investors",
            "It reduced regulatory requirements"
          ],
          correctAnswer: 1,
          explanation: "Direct listings allow companies to go public without issuing new shares (avoiding dilution) and without paying traditional underwriting fees, saving significant costs.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Design an IPO vs Follow-on Strategy", 
      description: "Compare IPO timing with follow-on offering strategies for a growing company.",
      steps: [
        "Company profile: GreenTech Inc. - Profitable renewable energy company, $200M revenue",
        "Capital need: $400M for expansion over next 2 years",
        "IPO option: Raise full $400M now, price at 15-20x revenue multiple",
        "Follow-on strategy: IPO for $200M now, follow-on in 12-18 months for additional $200M",
        "Analyze pros/cons: Full raise provides certainty but potential dilution; staged approach allows price appreciation",
        "Consider market timing: Current high valuations vs. potential market volatility"
      ],
      deliverable: "A strategic comparison of IPO sizing options with detailed pros/cons analysis and market timing considerations."
    }
  },
  {
    level: 3,
    title: "Advanced ECM: SPACs, Direct Listings & Complex Structures",
    description: "Master sophisticated equity capital markets products and alternative public market entry strategies",
    theme: "Advanced ECM",
    objectives: [
      "Navigate the SPAC ecosystem and de-SPAC transactions",
      "Understand alternative listing methods and their trade-offs",
      "Master complex equity structures and linked securities",
      "Explore innovative capital raising mechanisms"
    ],
    terminology: ['spac', 'direct_listing', 'at_the_market_offering', 'rights_offering', 'equity_linked_securities'],
    keyTerms: ['spac', 'direct_listing', 'at_the_market_offering', 'rights_offering'],
    keyQuestions: [
      "How do SPACs provide an alternative path to public markets?",
      "What are the advantages and disadvantages of direct listings?",
      "When are at-the-market offerings most effective?",
      "How do rights offerings protect existing shareholders?"
    ],
    miniGames: [
      {
        id: 'spac-deal-architect',
        name: 'SPAC Transaction Master',
        description: 'Structure SPAC formations and de-SPAC business combinations',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'ecm-product-selector',
        name: 'ECM Structure Optimizer',
        description: 'Choose optimal equity capital markets structures for different company situations',
        xpReward: 95,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'lucid-spac-merger-2021',
        title: "Lucid Motors' $24 Billion SPAC Deal: EV Dreams Via Alternative Route (2021)",
        company: "Lucid Motors & Churchill Capital Corp IV",
        year: 2021,
        description: "Lucid Motors' merger with Churchill Capital Corp IV in July 2021 exemplified the SPAC boom and the complex dynamics of de-SPAC transactions. Churchill Capital IV, led by veteran investor Michael Klein, raised $2.1 billion in its IPO and then announced a business combination with Lucid Motors, valuing the EV startup at $24 billion. The transaction provided Lucid with approximately $4.4 billion in cash (including PIPE investment) to fund production of its luxury Air sedan. Goldman Sachs and Citigroup advised Lucid, while Credit Suisse advised Churchill. The deal structure was complex: existing Lucid shareholders received the majority of pro forma shares, Churchill SPAC shareholders got ~16%, and PIPE investors received additional shares at $15 each. Unlike traditional IPOs, the SPAC process allowed Lucid to provide forward-looking projections about future sales and production targets. However, like many SPAC deals during this period, the stock declined significantly post-merger as investors questioned the high valuation relative to Lucid's limited production and revenue. The case highlighted both the flexibility SPACs provide for growth companies and the valuation risks in hot markets.",
        keyLearning: "SPACs offer private companies access to public markets with more flexibility on projections and timing, but success depends on realistic valuations and execution of business plans.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'spac-advantage',
          question: "What key advantage did the SPAC process provide Lucid Motors over a traditional IPO?",
          options: [
            "Lower transaction costs",
            "Ability to provide forward-looking financial projections",
            "Guaranteed stock price performance",
            "No regulatory approval required"
          ],
          correctAnswer: 1,
          explanation: "SPACs allow target companies to share forward-looking projections about future business performance, which is restricted in traditional IPO processes.",
          difficulty: 'advanced'
        },
        {
          id: 'atm-offering-benefit',
          question: "What is the main benefit of at-the-market offerings compared to traditional follow-on offerings?",
          options: [
            "They raise more money",
            "They have lower fees",
            "They allow gradual share sales without significant market impact",
            "They don't require SEC approval"
          ],
          correctAnswer: 2,
          explanation: "At-the-market offerings allow companies to sell shares gradually into existing trading volume, minimizing market disruption compared to large traditional offerings.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Compare Alternative Public Market Strategies",
      description: "Evaluate different public market entry strategies for a high-growth technology company.",
      steps: [
        "Company: CloudAI Corp - $100M revenue, 200% growth, pre-revenue 18 months ago",
        "Strategy 1: Traditional IPO - Institutional roadshow, $300M raise, strong price discovery",
        "Strategy 2: Direct listing - No new capital, existing shareholders get liquidity, saves fees",
        "Strategy 3: SPAC merger - Faster timeline, forward projections allowed, PIPE funding available",
        "Analyze factors: Capital needs, market conditions, company readiness, shareholder objectives",
        "Recommendation: Consider company-specific factors like cash needs, market timing, growth stage"
      ],
      deliverable: "A comprehensive strategy memo comparing all three approaches with specific recommendations based on company characteristics and market conditions."
    }
  }
];