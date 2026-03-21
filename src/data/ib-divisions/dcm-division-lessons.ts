import { InteractiveLessonContent } from '../investment-banking-lessons';

export interface DCMDivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'dcm_basics' | 'bond_types' | 'dcm_process' | 'dcm_pricing' | 'dcm_execution';
}

// Debt Capital Markets Division Terms
export const dcmDivisionTerms: Record<string, DCMDivisionTerm> = {
  // Level 1 - DCM Fundamentals
  debt_capital_markets: {
    term: 'Debt Capital Markets',
    definition: 'The division that helps companies and governments raise money by issuing bonds and other debt securities',
    analogy: 'Like a loan officer who helps arrange very large, complex loans for big organizations',
    level: 1,
    category: 'dcm_basics'
  },
  corporate_bond: {
    term: 'Corporate Bond',
    definition: 'A debt security issued by a company to raise money, promising to pay interest and repay principal',
    analogy: 'Like an IOU from a company that pays you interest until they pay you back',
    level: 1,
    category: 'bond_types'
  },
  credit_rating: {
    term: 'Credit Rating',
    definition: 'A grade that shows how likely a borrower is to repay their debt',
    analogy: 'Like a report card that shows how good someone is at paying back loans',
    level: 1,
    category: 'dcm_basics'
  },
  yield: {
    term: 'Yield',
    definition: 'The annual return an investor gets from a bond, expressed as a percentage',
    analogy: 'Like the interest rate you earn on a savings account',
    level: 1,
    category: 'dcm_basics'
  },
  maturity: {
    term: 'Maturity',
    definition: 'The date when a bond expires and the borrower must repay the principal amount',
    analogy: 'Like the due date for paying back a loan in full',
    level: 1,
    category: 'dcm_basics'
  },

  // Level 2 - DCM Process & Bond Types
  high_yield_bonds: {
    term: 'High Yield Bonds',
    definition: 'Bonds with lower credit ratings that pay higher interest rates due to increased risk',
    analogy: 'Like lending money to a friend who\'s not great with money - you charge higher interest for the risk',
    level: 2,
    category: 'bond_types'
  },
  investment_grade: {
    term: 'Investment Grade',
    definition: 'Bonds with high credit ratings (BBB- or higher) considered safer investments',
    analogy: 'Like lending money to your most responsible friend who always pays back',
    level: 2,
    category: 'bond_types'
  },
  bond_syndicate: {
    term: 'Bond Syndicate',
    definition: 'A group of investment banks working together to underwrite and sell a large bond offering',
    analogy: 'Like a team of real estate agents working together to sell a very expensive mansion',
    level: 2,
    category: 'dcm_process'
  },
  book_building: {
    term: 'Book Building',
    definition: 'The process of collecting and organizing investor orders for a new bond issue',
    analogy: 'Like taking reservations for a popular restaurant opening - you see how much demand there is',
    level: 2,
    category: 'dcm_process'
  },
  credit_spread: {
    term: 'Credit Spread',
    definition: 'The difference in yield between a corporate bond and a government bond of similar maturity',
    analogy: 'Like the extra interest you charge above a \"safe\" rate when lending to someone riskier',
    level: 2,
    category: 'dcm_pricing'
  },
  callable_bond: {
    term: 'Callable Bond',
    definition: 'A bond that the issuer can repay early before the maturity date',
    analogy: 'Like a loan where the borrower can pay you back early if they want to',
    level: 2,
    category: 'bond_types'
  },

  // Level 3 - Advanced DCM & Complex Structures
  convertible_bond: {
    term: 'Convertible Bond',
    definition: 'A bond that can be converted into a predetermined number of company shares',
    analogy: 'Like a loan that can turn into ownership in the company if you choose',
    level: 3,
    category: 'bond_types'
  },
  euro_bond: {
    term: 'Eurobond',
    definition: 'A bond issued in a currency different from the currency of the country where it\'s issued',
    analogy: 'Like an American company issuing bonds in Japan but denominated in US dollars',
    level: 3,
    category: 'bond_types'
  },
  green_bonds: {
    term: 'Green Bonds',
    definition: 'Bonds specifically earmarked to raise money for climate and environmental projects',
    analogy: 'Like a loan specifically for buying solar panels or electric cars',
    level: 3,
    category: 'bond_types'
  },
  covenant: {
    term: 'Covenant',
    definition: 'Rules and restrictions that borrowers must follow while their bonds are outstanding',
    analogy: 'Like rules your parents set when they lend you money for a car',
    level: 3,
    category: 'dcm_execution'
  },
  indenture: {
    term: 'Indenture',
    definition: 'The legal contract that specifies the terms and conditions of a bond issue',
    analogy: 'Like a detailed rental lease that spells out all the rules and obligations',
    level: 3,
    category: 'dcm_execution'
  }
};

// DCM Division Lessons
export const dcmDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Debt Capital Markets Fundamentals: The World of Corporate Bonds",
    description: "Master the basics of debt capital markets and how companies raise money through bonds",
    theme: "DCM Foundation",
    objectives: [
      "Understand what debt capital markets do and why they matter",
      "Learn the key components of corporate bonds",
      "Master credit ratings and their impact on pricing",
      "Explore yield calculations and bond basics"
    ],
    terminology: ['debt_capital_markets', 'corporate_bond', 'credit_rating', 'yield', 'maturity'],
    keyTerms: ['debt_capital_markets', 'corporate_bond', 'credit_rating', 'yield', 'maturity'],
    keyQuestions: [
      "What is the role of debt capital markets?",
      "How do corporate bonds work?", 
      "Why are credit ratings important?",
      "What determines bond yields?"
    ],
    miniGames: [
      {
        id: 'bond-basics-match',
        name: 'Bond Component Master',
        description: 'Match bond terms with their definitions and understand key relationships',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'yield-calculator',
        name: 'Yield Detective',
        description: 'Calculate bond yields and understand how credit ratings affect pricing',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'apple-bonds-2023',
        title: "Apple's $5.5 Billion Bond Offering (2023)",
        company: "Apple Inc.",
        year: 2023,
        description: "Apple's multi-tranche bond offering in February 2023 showcased how top-tier companies access debt capital markets. Despite having over $100 billion in cash, Apple issued bonds across multiple maturities (3, 5, 10, and 30 years) to take advantage of relatively attractive interest rates and maintain financial flexibility. Goldman Sachs, JPMorgan, and BofA Securities served as lead underwriters. The bonds were priced at yields ranging from 4.0% (3-year) to 4.8% (30-year), reflecting Apple's AAA credit rating - one of only two U.S. companies with this top rating. The offering attracted massive investor demand, with orders exceeding $25 billion (5x oversubscribed). Apple's strong credit profile allowed it to price bonds at minimal spreads above Treasury securities. The company planned to use proceeds for general corporate purposes, including share buybacks and dividends. This deal demonstrated how investment-grade companies with strong credit ratings can efficiently access capital markets even when they don't strictly need the money.",
        keyLearning: "Companies with strong credit ratings like Apple can issue bonds at very low yields, and bond offerings often get oversubscribed when investors trust the issuer's creditworthiness.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'dcm-role',
          question: "What is the primary role of debt capital markets?",
          options: [
            "Help companies buy and sell stocks",
            "Help companies and governments raise money by issuing bonds",
            "Manage company bank accounts",
            "Provide insurance for corporate risks"
          ],
          correctAnswer: 1,
          explanation: "Debt capital markets help organizations raise money by issuing bonds and other debt securities to investors, essentially facilitating large-scale borrowing.",
          difficulty: 'beginner'
        },
        {
          id: 'credit-rating-impact',
          question: "How do credit ratings affect bond yields?",
          options: [
            "Higher ratings mean higher yields",
            "Credit ratings don't affect yields",
            "Lower ratings mean higher yields due to increased risk", 
            "Only government bonds have credit ratings"
          ],
          correctAnswer: 2,
          explanation: "Lower credit ratings indicate higher risk, so investors demand higher yields (interest rates) to compensate for that additional risk - like charging higher interest to riskier borrowers.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "Corporate Bond Analysis: Rating Impact on Pricing",
      description: "Analyze how credit ratings affect bond pricing using real market examples.",
      steps: [
        "Compare two similar companies: Microsoft (AAA rated) vs. Ford (BB+ rated)",
        "Look at their 10-year bond yields: Microsoft ~4.0% vs Ford ~6.5%",
        "Calculate the credit spread: 6.5% - 4.0% = 2.5% difference",
        "Analyze the risk factors: Microsoft's stable software revenues vs Ford's cyclical auto business",
        "Calculate the extra cost: On a $1B bond, Ford pays $25M more per year in interest than Microsoft"
      ],
      deliverable: "A one-page comparison showing how credit ratings translate to real borrowing costs for companies."
    }
  },
  {
    level: 2,
    title: "DCM Process Mastery: From Syndication to Book Building",  
    description: "Navigate the complex process of bringing bonds to market through syndication and investor management",
    theme: "DCM Process",
    objectives: [
      "Master the bond syndication process and bank roles",
      "Understand book building and investor outreach",
      "Learn about different bond types and structures",
      "Explore credit spreads and pricing mechanisms"
    ],
    terminology: ['high_yield_bonds', 'investment_grade', 'bond_syndicate', 'book_building', 'credit_spread', 'callable_bond'],
    keyTerms: ['bond_syndicate', 'book_building', 'credit_spread', 'high_yield_bonds'],
    keyQuestions: [
      "How does bond syndication work?",
      "What happens during the book building process?",
      "How are credit spreads determined?",
      "What's the difference between investment grade and high yield bonds?"
    ],
    miniGames: [
      {
        id: 'bond-syndicate-builder',
        name: 'Syndicate Manager',
        description: 'Organize a bond syndicate and allocate roles among different banks',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'book-building-simulator',
        name: 'Bond Book Builder',
        description: 'Collect investor orders and optimize bond pricing and allocation',
        xpReward: 90,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'tesla-junk-to-investment-2021',
        title: "Tesla's Journey from Junk to Investment Grade (2021)",
        company: "Tesla Inc.",
        year: 2021,
        description: "Tesla's credit rating upgrade from junk (B-) to investment grade (BBB-) in 2021 demonstrated the dramatic impact of credit quality on bond markets. In 2017, Tesla issued $1.8 billion in high-yield bonds at 5.3% yield when the company was burning cash and struggling with Model 3 production. Rating agencies like S&P and Moody's had Tesla rated as junk due to execution risks and cash concerns. By 2021, Tesla's fundamentals had transformed: consistent profitability, strong cash generation, and dominant EV market position. When S&P upgraded Tesla to BBB- in October 2021, it triggered massive changes in Tesla's bond trading. The existing bonds rallied from ~104 cents to ~108 cents on the dollar as they became eligible for investment-grade bond funds. Tesla could now issue new debt at significantly lower yields - approximately 200-300 basis points lower than as a high-yield issuer. This upgrade opened Tesla to a much larger investor base, as many institutional investors can only buy investment-grade bonds. The case showed how credit rating changes can dramatically impact a company's borrowing costs and investor access.",
        keyLearning: "Credit rating upgrades can significantly reduce borrowing costs and expand the investor base, while downgrades have the opposite effect - making credit quality crucial for corporate finance.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'syndicate-purpose',
          question: "Why do investment banks form syndicates for large bond offerings?",
          options: [
            "To increase fees charged to issuers",
            "To share risk and combine distribution capabilities",
            "To comply with government regulations",
            "To reduce competition among banks"
          ],
          correctAnswer: 1,
          explanation: "Bond syndicates allow banks to share the underwriting risk of large offerings and combine their investor relationships to ensure successful distribution to a broad investor base.",
          difficulty: 'intermediate'
        },
        {
          id: 'investment-grade-benefit',
          question: "What was the main benefit of Tesla's upgrade to investment grade?",
          options: [
            "Tesla could issue more stock",
            "Tesla got free publicity",
            "Tesla could borrow at lower interest rates and access more investors",
            "Tesla didn't have to pay taxes"
          ],
          correctAnswer: 2,
          explanation: "Investment grade ratings allow companies to borrow at lower yields and access institutional investors who are restricted from buying high-yield bonds, dramatically expanding the potential investor base.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Design a Bond Syndicate and Pricing Strategy",
      description: "Structure a $2 billion corporate bond offering including syndicate formation and pricing.",
      steps: [
        "Setup: TechGrowth Corp needs $2B for acquisition financing, currently rated BBB",
        "Form syndicate: Lead managers (Goldman, JPM), co-managers (BofA, Citi), regional banks",
        "Structure offering: $1B 5-year notes, $1B 10-year notes to diversify maturity profile",
        "Analyze comparables: Similar BBB tech companies trading at Treasury + 150-200bps",
        "Plan book building: 2-week roadshow, target institutional investors, aim for 3x oversubscription",
        "Set initial price guidance: 5-year at T+175bps, 10-year at T+200bps"
      ],
      deliverable: "A comprehensive bond offering memorandum including syndicate structure, pricing analysis, and distribution strategy."
    }
  },
  {
    level: 3,
    title: "Advanced DCM: Complex Structures & Specialized Markets",
    description: "Master sophisticated bond structures, emerging markets, and specialized DCM products",
    theme: "Advanced DCM",
    objectives: [
      "Navigate complex bond structures like convertibles and green bonds",
      "Understand international bond markets and Eurobonds",
      "Master bond covenants and legal documentation",
      "Explore emerging trends in sustainable finance"
    ],
    terminology: ['convertible_bond', 'euro_bond', 'green_bonds', 'covenant', 'indenture'],
    keyTerms: ['convertible_bond', 'green_bonds', 'covenant', 'indenture'],
    keyQuestions: [
      "How do convertible bonds provide flexibility for both issuers and investors?",
      "What makes green bonds different from regular corporate bonds?",
      "Why are bond covenants important for protecting investors?",
      "How do Eurobonds work in international markets?"
    ],
    miniGames: [
      {
        id: 'convertible-pricing-master',
        name: 'Convertible Bond Strategist',
        description: 'Price convertible bonds and analyze conversion scenarios',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'covenant-designer',
        name: 'Bond Covenant Architect',
        description: 'Design protective covenants for different types of bond offerings',
        xpReward: 95,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'nextgen-green-bonds-2023',
        title: "NextEra Energy's $2.9 Billion Green Bond Program (2023)",
        company: "NextEra Energy",
        year: 2023,
        description: "NextEra Energy's green bond issuance in 2023 exemplified the growing sustainable finance market and investor appetite for ESG-linked debt. NextEra, one of the largest renewable energy companies in the US, issued $2.9 billion across multiple green bond tranches to fund wind, solar, and battery storage projects. BofA Securities, JPMorgan, and Goldman Sachs led the offering. The bonds were structured with specific use-of-proceeds requirements: funds could only be used for eligible green projects as defined by NextEra's Green Financing Framework, which aligned with international Green Bond Principles. The company committed to annual impact reporting, detailing environmental benefits like CO2 emissions avoided and renewable energy capacity added. Investor demand was exceptional - the offering was 4x oversubscribed, allowing NextEra to price the bonds at yields 10-15 basis points below comparable traditional corporate bonds. This 'greenium' reflected strong ESG investor demand. The success demonstrated how companies with credible sustainability strategies can access capital at preferential rates while meeting growing investor demand for climate-aligned investments.",
        keyLearning: "Green bonds can provide both cost-of-capital benefits through strong ESG investor demand and enhance a company's sustainability credentials, but require rigorous use-of-proceeds frameworks and ongoing reporting.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'convertible-advantage',
          question: "What is the main advantage of convertible bonds for growth companies?",
          options: [
            "They never have to be repaid",
            "They have the lowest interest rates",
            "They offer lower current interest costs with potential upside if the stock performs well",
            "They can only be bought by institutional investors"
          ],
          correctAnswer: 2,
          explanation: "Convertible bonds typically offer lower interest rates than regular bonds because investors get potential upside through the conversion feature - if the stock does well, they can convert to shares.",
          difficulty: 'advanced'
        },
        {
          id: 'green-bond-greenium',
          question: "What was the 'greenium' in NextEra's green bond offering?",
          options: [
            "A fee paid to environmental consultants",
            "The 10-15 basis points lower yield compared to regular bonds",
            "The extra interest paid for green projects",
            "A penalty for not meeting environmental targets"
          ],
          correctAnswer: 1,
          explanation: "The 'greenium' refers to the yield advantage (lower borrowing cost) that issuers can achieve with green bonds due to strong ESG investor demand - in NextEra's case, 10-15bps below regular bonds.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Structure a Convertible Bond for a Growth Company",
      description: "Design a convertible bond offering for a fast-growing technology company.",
      steps: [
        "Company profile: CloudSoft Inc. - $500M revenue, growing 40% annually, stock at $50",
        "Financing need: $300M for international expansion and R&D investment",
        "Structure convertible: 5-year maturity, 2.5% coupon (vs 5.5% for straight debt)",
        "Set conversion terms: Conversion price at $60 (20% premium to current stock price)",
        "Add protective features: Anti-dilution provisions, call protection for 3 years",
        "Analyze scenarios: Stock stays flat (bondholders keep bonds), stock hits $80 (profitable conversion)"
      ],
      deliverable: "A convertible bond term sheet with complete structure, pricing analysis, and scenario modeling for different stock price outcomes."
    }
  }
];