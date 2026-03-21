import { InteractiveLessonContent } from '../investment-banking-lessons';

export interface LevFinDivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'levfin_basics' | 'loan_types' | 'levfin_process' | 'credit_analysis' | 'syndication';
}

// Leveraged Finance Division Terms
export const levFinDivisionTerms: Record<string, LevFinDivisionTerm> = {
  // Level 1 - Leveraged Finance Fundamentals
  leveraged_finance: {
    term: 'Leveraged Finance',
    definition: 'Debt financing for companies that already have significant debt or are considered higher risk',
    analogy: 'Like giving a loan to someone who already has several credit cards - you charge higher rates for the extra risk',
    level: 1,
    category: 'levfin_basics'
  },
  leveraged_buyout: {
    term: 'Leveraged Buyout (LBO)',
    definition: 'Acquiring a company using mostly borrowed money, with the target company\'s assets as collateral',
    analogy: 'Like buying a rental property with a big mortgage, using the rental income to pay back the loan',
    level: 1,
    category: 'levfin_basics'
  },
  senior_debt: {
    term: 'Senior Debt',
    definition: 'Debt that gets paid back first if a company goes bankrupt',
    analogy: 'Like being first in line at a buffet - you get served before everyone else',
    level: 1,
    category: 'loan_types'
  },
  subordinated_debt: {
    term: 'Subordinated Debt',
    definition: 'Debt that gets paid back after senior debt in case of bankruptcy',
    analogy: 'Like being second in line at a buffet - you wait for the first group to finish',
    level: 1,
    category: 'loan_types'
  },
  covenant: {
    term: 'Covenant',
    definition: 'Rules that borrowers must follow, like maintaining certain financial ratios',
    analogy: 'Like house rules your parents set when you borrow their car',
    level: 1,
    category: 'credit_analysis'
  },

  // Level 2 - Loan Structures & Process
  term_loan: {
    term: 'Term Loan',
    definition: 'A loan with a fixed amount that\'s paid back over a specific time period',
    analogy: 'Like a car loan where you borrow a set amount and make regular payments until it\'s paid off',
    level: 2,
    category: 'loan_types'
  },
  revolving_credit: {
    term: 'Revolving Credit',
    definition: 'A flexible credit line that companies can borrow from and repay as needed',
    analogy: 'Like a credit card with a limit that you can use and pay down repeatedly',
    level: 2,
    category: 'loan_types'
  },
  syndicated_loan: {
    term: 'Syndicated Loan',
    definition: 'A large loan provided by a group of lenders to spread the risk',
    analogy: 'Like a group of friends pooling money to lend to someone who needs a big loan',
    level: 2,
    category: 'syndication'
  },
  credit_agreement: {
    term: 'Credit Agreement',
    definition: 'The detailed legal contract that governs the terms and conditions of a loan',
    analogy: 'Like a detailed lease agreement that spells out all the rules for renting an apartment',
    level: 2,
    category: 'levfin_process'
  },
  pricing_grid: {
    term: 'Pricing Grid',
    definition: 'A structure where interest rates change based on the borrower\'s financial performance',
    analogy: 'Like car insurance rates that go up or down based on your driving record',
    level: 2,
    category: 'credit_analysis'
  },
  financial_covenants: {
    term: 'Financial Covenants',
    definition: 'Requirements to maintain specific financial ratios, like debt-to-earnings limits',
    analogy: 'Like promising to keep your credit card balance below a certain percentage of your income',
    level: 2,
    category: 'credit_analysis'
  },

  // Level 3 - Advanced Leveraged Finance
  pik_interest: {
    term: 'PIK Interest',
    definition: 'Payment-in-kind interest that gets added to the loan balance instead of being paid in cash',
    analogy: 'Like a loan where instead of paying interest, the amount you owe just keeps growing',
    level: 3,
    category: 'loan_types'
  },
  covenant_lite: {
    term: 'Covenant-Lite',
    definition: 'Loans with fewer restrictive covenants, giving borrowers more flexibility',
    analogy: 'Like borrowing your friend\'s car with fewer rules about where you can drive it',
    level: 3,
    category: 'credit_analysis'
  },
  second_lien: {
    term: 'Second Lien',
    definition: 'Debt that ranks below first lien debt but above unsecured debt in bankruptcy',
    analogy: 'Like being second in line for the bathroom - not first, but better than being last',
    level: 3,
    category: 'loan_types'
  },
  unitranche: {
    term: 'Unitranche',
    definition: 'A single loan that combines features of senior and subordinated debt',
    analogy: 'Like a combination meal that gives you multiple items for one price',
    level: 3,
    category: 'loan_types'
  },
  portability: {
    term: 'Portability',
    definition: 'The ability to transfer debt from one company to another in certain transactions',
    analogy: 'Like being able to transfer your phone contract when you move to a different address',
    level: 3,
    category: 'levfin_process'
  }
};

// Leveraged Finance Division Lessons
export const levFinDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Leveraged Finance Fundamentals: High-Risk, High-Reward Lending",
    description: "Master the basics of leveraged finance and how banks lend to highly leveraged companies",
    theme: "LevFin Foundation",
    objectives: [
      "Understand what leveraged finance is and why it exists",
      "Learn about leveraged buyouts and their financing structures",
      "Distinguish between senior and subordinated debt",
      "Explore loan covenants and their protective role"
    ],
    terminology: ['leveraged_finance', 'leveraged_buyout', 'senior_debt', 'subordinated_debt', 'covenant'],
    keyTerms: ['leveraged_finance', 'leveraged_buyout', 'senior_debt', 'subordinated_debt', 'covenant'],
    keyQuestions: [
      "What makes leveraged finance different from regular corporate lending?",
      "How do leveraged buyouts work?",
      "Why do lenders use senior and subordinated structures?",
      "What purpose do loan covenants serve?"
    ],
    miniGames: [
      {
        id: 'lbo-structure-builder',
        name: 'LBO Structure Master',
        description: 'Build the optimal debt structure for a leveraged buyout transaction',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'covenant-designer',
        name: 'Covenant Protection Planner',
        description: 'Design appropriate covenants to protect lenders in leveraged deals',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'rjr-nabisco-lbo-1989',
        title: "RJR Nabisco: The Legendary $25 Billion LBO (1989)",
        company: "RJR Nabisco",
        year: 1989,
        description: "The RJR Nabisco leveraged buyout remains one of the most famous LBO transactions in history, demonstrating the power and complexity of leveraged finance. KKR's winning $25 billion bid (worth about $55 billion today) used approximately $23 billion in debt financing and only $1.5 billion in equity. The complex debt structure included: $12 billion in bank loans, $5 billion in high-yield bonds, and $6 billion in various subordinated securities. Drexel Burnham Lambert, led by Michael Milken, provided much of the high-yield financing, while multiple banks syndicated the senior loans. The transaction showcased key leveraged finance principles: using the target company's cash flows to support massive debt loads, creating a waterfall of debt seniority, and using covenants to protect lenders. The deal required extensive financial modeling to ensure RJR's tobacco and food businesses could generate sufficient cash flow to service the debt. Post-transaction, KKR had to actively manage the company's operations and asset sales to meet debt obligations. While controversial, the deal ultimately proved successful, with KKR generating strong returns for its investors through operational improvements and strategic asset sales.",
        keyLearning: "LBOs demonstrate how leveraged finance can fund large acquisitions using the target company's assets and cash flows, but require careful structuring and active management to service high debt levels.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'leveraged-finance-definition',
          question: "What distinguishes leveraged finance from traditional corporate lending?",
          options: [
            "Leveraged finance involves smaller loan amounts",
            "Leveraged finance serves companies with high debt levels or credit risk",
            "Leveraged finance only funds real estate purchases",
            "Leveraged finance doesn't require collateral"
          ],
          correctAnswer: 1,
          explanation: "Leveraged finance specifically serves highly leveraged companies or higher-risk borrowers, requiring specialized structuring and pricing to compensate lenders for the additional risk.",
          difficulty: 'beginner'
        },
        {
          id: 'senior-vs-subordinated',
          question: "In the RJR Nabisco LBO, why was the debt structured with both senior and subordinated layers?",
          options: [
            "To confuse competitors",
            "To meet regulatory requirements",
            "To attract different types of investors and optimize the cost of capital",
            "To avoid paying taxes"
          ],
          correctAnswer: 2,
          explanation: "Layered debt structures allow companies to access different investor bases - senior debt appeals to conservative lenders while subordinated debt attracts investors seeking higher returns for higher risk.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "Design an LBO Capital Structure",
      description: "Structure the debt financing for a leveraged buyout of a stable manufacturing company.",
      steps: [
        "Target: ManufacturingCorp - $500M revenue, $75M EBITDA, stable cash flows",
        "Purchase price: $600M (8x EBITDA multiple)",
        "Equity contribution: $120M (20%) from private equity sponsor",
        "Debt needed: $480M across multiple tranches",
        "Senior bank debt: $300M term loan + $50M revolver (4.5x leverage)",
        "Subordinated debt: $130M second lien or mezzanine (higher cost, less restrictive)"
      ],
      deliverable: "A complete LBO capital structure with debt terms, pricing, and covenant package appropriate for the company's risk profile."
    }
  },
  {
    level: 2,
    title: "Loan Structures & Syndication: Building and Distributing Credit",
    description: "Navigate the complex world of loan structuring, syndication, and credit management",
    theme: "LevFin Process",
    objectives: [
      "Master different types of loan structures and their applications",
      "Understand the syndicated loan market and bank roles",
      "Learn about pricing grids and performance-based terms",
      "Explore covenant structures and monitoring processes"
    ],
    terminology: ['term_loan', 'revolving_credit', 'syndicated_loan', 'credit_agreement', 'pricing_grid', 'financial_covenants'],
    keyTerms: ['term_loan', 'revolving_credit', 'syndicated_loan', 'pricing_grid'],
    keyQuestions: [
      "When are term loans versus revolving credit facilities most appropriate?",
      "How does loan syndication benefit both borrowers and lenders?",
      "How do pricing grids align borrower and lender interests?",
      "What financial covenants are most important in leveraged deals?"
    ],
    miniGames: [
      {
        id: 'loan-syndication-manager',
        name: 'Syndication Coordinator',
        description: 'Organize a loan syndication and allocate participations among banks',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'credit-structure-optimizer',
        name: 'Credit Structure Designer',
        description: 'Design optimal loan structures mixing term loans and revolvers',
        xpReward: 90,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'dell-lbo-refinancing-2016',
        title: "Dell's $15 Billion LBO Refinancing: Managing Massive Debt Loads (2016)",
        company: "Dell Technologies",
        year: 2016,
        description: "Dell's 2016 leveraged loan refinancing showcased sophisticated credit management in one of the largest LBO transactions ever. Following the $25 billion Dell-EMC merger (itself funded largely with debt), Dell needed to refinance approximately $15 billion in existing leveraged loans to optimize terms and extend maturities. JPMorgan Chase, Bank of America, and Credit Suisse led the massive syndication effort. The refinancing included multiple tranches: a $10 billion term loan B, $3 billion term loan A, and $2 billion revolving credit facility. The deal featured a sophisticated pricing grid where spreads would decrease as Dell's leverage ratios improved, incentivizing deleveraging. Financial covenants were carefully structured to provide Dell operational flexibility while protecting lenders - including maximum leverage ratios that stepped down over time and minimum interest coverage requirements. The syndication was successfully distributed to over 100 institutional lenders worldwide, demonstrating the global appetite for well-structured leveraged credit. Dell's strong operational performance post-merger allowed the company to steadily pay down debt and benefit from the pricing grid's lower spreads.",
        keyLearning: "Large leveraged loan refinancings require sophisticated structuring, global syndication capabilities, and performance-based pricing to align interests between highly leveraged borrowers and institutional lenders.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'term-loan-vs-revolver',
          question: "What is the main difference between a term loan and a revolving credit facility?",
          options: [
            "Term loans are always more expensive",
            "Revolvers can be drawn and repaid repeatedly, term loans are typically fully drawn",
            "Only term loans require covenants",
            "Revolvers don't charge interest"
          ],
          correctAnswer: 1,
          explanation: "Revolving credit facilities provide flexibility to borrow and repay as needed (like a credit card), while term loans are typically drawn in full and amortized over time.",
          difficulty: 'intermediate'
        },
        {
          id: 'pricing-grid-benefit',
          question: "How did Dell's pricing grid structure benefit both Dell and its lenders?",
          options: [
            "It guaranteed fixed interest rates",
            "It eliminated the need for financial covenants",
            "It provided Dell incentives to reduce leverage while protecting lenders",
            "It allowed Dell to borrow unlimited amounts"
          ],
          correctAnswer: 2,
          explanation: "Pricing grids create win-win scenarios: borrowers get lower rates as they improve their credit profile, while lenders get protection through automatic rate increases if credit deteriorates.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Structure a Syndicated Loan Package",
      description: "Design a complete syndicated loan package for a large acquisition financing.",
      steps: [
        "Borrower: TechAcquirer Inc. buying SoftwareCorp for $2B",
        "Financing need: $1.5B debt + $500M equity from sponsor",
        "Structure: $1B Term Loan B (7-year), $300M Term Loan A (5-year), $200M Revolver",
        "Pricing grid: Spreads from LIBOR+275bps to +450bps based on leverage",
        "Covenants: Maximum 6.0x leverage stepping down to 5.0x, minimum 3.0x interest coverage",
        "Syndication: Target 50+ lenders, allocate by relationship and appetite"
      ],
      deliverable: "A comprehensive credit proposal including structure, pricing, covenants, and syndication strategy with specific bank allocations."
    }
  },
  {
    level: 3,
    title: "Advanced Leveraged Finance: Complex Structures & Market Innovation",
    description: "Master sophisticated leveraged finance products and cutting-edge market developments",
    theme: "Advanced LevFin",
    objectives: [
      "Navigate complex debt structures like PIK interest and unitranche",
      "Understand covenant-lite trends and their market implications",
      "Master second lien and alternative debt structures",
      "Explore portability and modern LBO financing innovations"
    ],
    terminology: ['pik_interest', 'covenant_lite', 'second_lien', 'unitranche', 'portability'],
    keyTerms: ['pik_interest', 'covenant_lite', 'unitranche', 'portability'],
    keyQuestions: [
      "When is PIK interest appropriate in leveraged financings?",
      "What are the risks and benefits of covenant-lite structures?",
      "How do unitranche facilities simplify complex debt structures?",
      "What role does debt portability play in modern LBOs?"
    ],
    miniGames: [
      {
        id: 'advanced-debt-architect',
        name: 'Complex Structure Designer',
        description: 'Design sophisticated debt structures using PIK, second lien, and unitranche features',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'covenant-risk-analyzer',
        name: 'Covenant Risk Assessment',
        description: 'Analyze the risk-return trade-offs in covenant-lite versus traditional structures',
        xpReward: 95,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'envision-healthcare-2018',
        title: "Envision Healthcare's Complex Debt Restructuring: When Leverage Goes Wrong (2018-2020)",
        company: "Envision Healthcare",
        year: 2020,
        description: "Envision Healthcare's journey from leveraged buyout to bankruptcy demonstrates both the power and perils of complex leveraged finance structures. Originally taken private by KKR in 2018 for $9.9 billion using significant leverage, Envision's debt structure included multiple layers: first lien loans, second lien debt, and various subordinated securities. The deal featured covenant-lite terms that gave the company significant operational flexibility. However, the COVID-19 pandemic severely impacted Envision's physician staffing and ambulatory surgery businesses, causing dramatic revenue declines. The company's complex debt structure, which initially provided flexibility, became a liability during distress. With over $7 billion in debt and declining cash flows, Envision couldn't service its obligations. The various debt tranches had different rights and recovery expectations, complicating restructuring negotiations. First lien lenders had the strongest position, while subordinated debt holders faced potential total losses. In December 2020, Envision filed for bankruptcy, with first lien lenders ultimately taking control of the reorganized company. The case highlighted how covenant-lite structures that benefit borrowers in good times can accelerate problems during distress, and how complex debt structures can complicate workout negotiations.",
        keyLearning: "Complex leveraged finance structures can provide flexibility during good times but may complicate restructuring efforts during distress, highlighting the importance of appropriate covenant structures and conservative leverage levels.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'pik-interest-risk',
          question: "What is the main risk of PIK (payment-in-kind) interest for borrowers?",
          options: [
            "PIK interest is always more expensive",
            "PIK interest compounds, increasing total debt outstanding over time",
            "PIK interest requires immediate cash payments",
            "PIK interest cannot be refinanced"
          ],
          correctAnswer: 1,
          explanation: "PIK interest gets added to the principal balance rather than paid in cash, causing the total debt amount to grow over time and potentially creating a larger refinancing challenge.",
          difficulty: 'advanced'
        },
        {
          id: 'covenant-lite-risk',
          question: "How did covenant-lite structures contribute to Envision Healthcare's problems?",
          options: [
            "They prevented the company from borrowing money",
            "They provided insufficient early warning signals and lender protections during distress",
            "They required immediate debt repayment",
            "They only applied to certain types of debt"
          ],
          correctAnswer: 1,
          explanation: "Covenant-lite structures reduce lenders' ability to intervene early when companies face difficulties, potentially allowing problems to worsen before stakeholders can address them.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Design a Complex Debt Restructuring Solution",
      description: "Structure a comprehensive debt solution for a distressed leveraged company.",
      steps: [
        "Situation: RetailCorp - $2B revenue (down 30%), $1.5B debt across multiple tranches",
        "Current structure: $800M first lien, $400M second lien, $300M subordinated debt",
        "Challenge: Cash flow insufficient to service debt, covenant breaches likely",
        "Solution options: Amendment and extension, debt-for-equity swap, new money injection",
        "Proposed structure: Reduce total debt to $1B, extend maturities, add PIK interest option",
        "Stakeholder analysis: First lien gets paid in full, junior debt takes equity/recovery"
      ],
      deliverable: "A detailed restructuring proposal showing new debt terms, stakeholder treatment, and implementation timeline for returning the company to financial health."
    }
  }
];