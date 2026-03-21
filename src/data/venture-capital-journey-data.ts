export interface VCFlashcard {
  term: string;
  definition: string;
}

export interface VCMiniGame {
  id: string;
  name: string;
  howItWorks: string;
  learningGoal: string;
  completionSystem: string;
  keyTerms: string[];
}

export interface VCQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VCActivity {
  title: string;
  description: string;
}

export interface VCLevel {
  id: number;
  title: string;
  overview: string;
  flashcards: VCFlashcard[];
  realLifeExample: {
    title: string;
    description: string;
  };
  miniGames: VCMiniGame[];
  quiz: VCQuizQuestion[];
  activities: VCActivity[];
}

export const vcJourneyData: VCLevel[] = [
  {
    id: 1,
    title: "Introduction to Venture Capital",
    overview: "Venture capital (VC) is financing provided to early-stage startups with high growth potential. Unlike banks, which require collateral, VCs take equity (ownership) in exchange for funding. The goal is to help companies grow rapidly, with the hope of earning a big return when the company succeeds. This level introduces what VC is, how it differs from traditional finance, and why it powers innovation.",
    flashcards: [
      {
        term: "Venture Capital",
        definition: "Venture capital is funding for early-stage companies with high growth potential. It involves more risk than traditional lending."
      },
      {
        term: "Equity",
        definition: "Equity is ownership in a company. VCs receive shares in return for their investment."
      },
      {
        term: "Startup",
        definition: "A startup is a young company designed to scale quickly, often in technology or innovation-driven industries."
      },
      {
        term: "Return on Investment (ROI)",
        definition: "ROI measures how much profit an investor makes compared to the amount invested."
      },
      {
        term: "High Risk, High Reward",
        definition: "VC investments are risky because most startups fail. However, successful ones can return multiples of the original investment."
      }
    ],
    realLifeExample: {
      title: "Software Startup Success",
      description: "A small software startup builds an app but needs money to hire engineers and market it. A VC firm invests $1 million in exchange for 20% equity. If the app succeeds and the company grows to be worth $50 million, the VC's stake is now worth $10 million. This illustrates how VCs bet on high-growth companies and aim for outsized returns."
    },
    miniGames: [
      {
        id: "finance-match-up",
        name: "Finance Match-Up",
        howItWorks: "Players match funding sources (VC, bank loan, personal savings) to company types (startup, established business, personal project).",
        learningGoal: "Differentiate VC from other funding sources.",
        completionSystem: "Bronze = 2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Venture capital", "startup", "equity"]
      },
      {
        id: "risk-or-reward",
        name: "Risk or Reward?",
        howItWorks: "Players are given scenarios like 'startup with no revenue but high potential' or 'stable company with slow growth.' They decide if a VC would invest.",
        learningGoal: "Understand VC's appetite for risk.",
        completionSystem: "Earn points for correct choices; leaderboard available.",
        keyTerms: ["High risk", "high reward", "ROI"]
      }
    ],
    quiz: [
      {
        id: "vc-definition",
        question: "What is venture capital, and how is it different from a bank loan?",
        options: [
          "VC provides equity funding to high-growth startups, while bank loans require collateral and fixed repayment",
          "VC only lends money to established companies",
          "VC and bank loans are the same thing",
          "VC only invests in technology companies"
        ],
        correctAnswer: 0,
        explanation: "Venture capital provides equity funding to startups with high growth potential, taking ownership stakes rather than requiring collateral like traditional bank loans."
      },
      {
        id: "funding-source",
        question: "In Finance Match-Up, which funding source fits a high-growth startup?",
        options: [
          "Bank loan",
          "Personal savings",
          "Venture capital",
          "Credit card"
        ],
        correctAnswer: 2,
        explanation: "Venture capital is specifically designed for high-growth startups that need significant funding and expertise to scale rapidly."
      },
      {
        id: "equity-concept",
        question: "What is equity, and why do VCs want it?",
        options: [
          "Equity is debt that must be repaid with interest",
          "Equity is ownership in a company, allowing VCs to share in the company's success",
          "Equity is a type of insurance policy",
          "Equity is the same as a bank loan"
        ],
        correctAnswer: 1,
        explanation: "Equity represents ownership in a company. VCs want equity because it allows them to share in the potential upside if the company becomes very valuable."
      },
      {
        id: "investment-scenario",
        question: "In Risk or Reward, which scenario best fits VC investment?",
        options: [
          "A stable restaurant with steady profits",
          "A tech startup with no revenue but huge market potential",
          "A family business that's been profitable for 20 years",
          "A company seeking a small loan for equipment"
        ],
        correctAnswer: 1,
        explanation: "VCs look for high-growth potential even if there's no current revenue, as they're betting on future massive returns."
      },
      {
        id: "software-example",
        question: "In the software app example, how did the VC turn $1M into $10M?",
        options: [
          "The VC sold their shares back to the company",
          "The company's value grew from $5M to $50M, making the VC's 20% stake worth $10M",
          "The VC received $10M in dividends",
          "The VC lent additional money to the company"
        ],
        correctAnswer: 1,
        explanation: "The VC owned 20% equity, so when the company's value increased to $50M, their stake became worth $10M (20% of $50M)."
      }
    ],
    activities: [
      {
        title: "Company Research",
        description: "List 3 companies you know that started small (e.g., Uber, Spotify, Snapchat). Research: Did they use venture capital? Write a paragraph about why VC was (or wasn't) the right fit."
      }
    ]
  },
  {
    id: 2,
    title: "The VC Ecosystem",
    overview: "Venture capital involves many players — entrepreneurs, investors, limited partners, and accelerators. VC firms raise money from outside investors (called limited partners) and pool it into funds. They then use those funds to invest in startups. This ecosystem relies on relationships and shared goals between startups and investors.",
    flashcards: [
      {
        term: "Limited Partners (LPs)",
        definition: "LPs are institutions or wealthy individuals who invest in VC funds. They provide capital but don't make decisions."
      },
      {
        term: "General Partners (GPs)",
        definition: "GPs manage VC funds, choose startups, and work with founders."
      },
      {
        term: "Accelerator",
        definition: "An accelerator is a program that helps startups grow quickly with mentorship, funding, and networking."
      },
      {
        term: "Fund",
        definition: "A fund is a pool of money raised by a VC firm to invest in startups."
      },
      {
        term: "Entrepreneur",
        definition: "An entrepreneur is someone who starts and grows a business."
      }
    ],
    realLifeExample: {
      title: "VC Fund Money Flow",
      description: "A VC firm raises $100 million from LPs like pension funds and universities. The GPs decide to invest in 20 startups over the next 5 years. One of those startups goes public, making the fund a huge return, which is shared back with LPs after fees. This shows how money flows through the VC ecosystem."
    },
    miniGames: [
      {
        id: "ecosystem-builder",
        name: "Ecosystem Builder",
        howItWorks: "Players drag roles (LP, GP, entrepreneur, accelerator) into a diagram showing the VC ecosystem.",
        learningGoal: "Understand how players interact.",
        completionSystem: "Score based on correct placements.",
        keyTerms: ["LP", "GP", "fund", "entrepreneur"]
      },
      {
        id: "follow-the-money",
        name: "Follow the Money",
        howItWorks: "Players trace a dollar from LP → VC fund → startup → exit → returns back to LP.",
        learningGoal: "Visualize money flow in venture capital.",
        completionSystem: "Bronze = basic flow correct, Silver = mostly correct, Gold = perfect path.",
        keyTerms: ["LPs", "GPs", "fund"]
      }
    ],
    quiz: [
      {
        id: "lp-role",
        question: "Who provides money to VC funds: LPs or entrepreneurs?",
        options: [
          "Entrepreneurs",
          "Limited Partners (LPs)",
          "Government agencies",
          "Banks"
        ],
        correctAnswer: 1,
        explanation: "Limited Partners (LPs) such as pension funds, endowments, and wealthy individuals provide the capital that VC firms use to create their funds."
      },
      {
        id: "entrepreneur-placement",
        question: "In Ecosystem Builder, where do entrepreneurs fit?",
        options: [
          "They provide money to VC funds",
          "They manage VC funds",
          "They receive funding from VC funds for their startups",
          "They are the same as LPs"
        ],
        correctAnswer: 2,
        explanation: "Entrepreneurs are the founders who start companies and seek funding from VC funds to grow their businesses."
      },
      {
        id: "gp-role",
        question: "What is the role of general partners in VC?",
        options: [
          "They provide money to the fund",
          "They manage the fund and make investment decisions",
          "They start companies",
          "They only provide advice"
        ],
        correctAnswer: 1,
        explanation: "General Partners (GPs) are the active managers of VC funds who make investment decisions, work with portfolio companies, and are responsible for fund performance."
      },
      {
        id: "startup-exit",
        question: "In Follow the Money, what happens after a startup exits?",
        options: [
          "The money disappears",
          "Only the entrepreneurs get paid",
          "Returns flow back to the VC fund and then to LPs",
          "The government takes all the money"
        ],
        correctAnswer: 2,
        explanation: "When a startup exits successfully (through acquisition or IPO), the returns flow back to the VC fund, which then distributes profits to its Limited Partners."
      },
      {
        id: "lp-returns",
        question: "In the $100M example, how do LPs make money back?",
        options: [
          "Through fixed interest payments",
          "Through their share of profits when portfolio companies exit successfully",
          "Through management fees only",
          "They never make money back"
        ],
        correctAnswer: 1,
        explanation: "LPs make money when the VC fund's portfolio companies exit successfully, and the profits are distributed back to LPs according to their fund commitments."
      }
    ],
    activities: [
      {
        title: "VC Ecosystem Flowchart",
        description: "Draw a flowchart showing the VC ecosystem (LPs → GPs → startups → exit → LPs). Add one sentence under each step describing what happens."
      }
    ]
  },
  {
    id: 3,
    title: "Startup Evaluation",
    overview: "Before investing, VCs evaluate startups through due diligence. They look at the team, market, product, and potential growth. Since most startups fail, VCs must be selective, balancing gut instinct with data. This level explores how startups are judged.",
    flashcards: [
      {
        term: "Due Diligence",
        definition: "Due diligence is the research process VCs use to evaluate a startup."
      },
      {
        term: "Market Size (TAM)",
        definition: "TAM (Total Addressable Market) is how big the opportunity is. Bigger markets attract more VC interest."
      },
      {
        term: "Product-Market Fit",
        definition: "Product-market fit is when customers strongly want and use a product."
      },
      {
        term: "Competitive Advantage",
        definition: "A competitive advantage is what makes a startup better than rivals (technology, brand, network)."
      },
      {
        term: "Scalability",
        definition: "Scalability is the ability to grow quickly without costs rising equally fast."
      }
    ],
    realLifeExample: {
      title: "Food Delivery Startup Evaluation",
      description: "A VC evaluates a food delivery startup. The team is strong, the market for food delivery is huge, and the app has thousands of daily users (early product-market fit). But they worry about competition from Uber Eats. After considering the risks, they decide to invest because the startup's unique logistics technology could scale faster."
    },
    miniGames: [
      {
        id: "pitch-judge",
        name: "Pitch Judge",
        howItWorks: "Players listen to or read a fictional startup pitch and score team, market, and product.",
        learningGoal: "Practice evaluating startups.",
        completionSystem: "Points for correctly prioritizing strengths.",
        keyTerms: ["Due diligence", "market size", "scalability"]
      },
      {
        id: "fit-or-flop",
        name: "Fit or Flop?",
        howItWorks: "Players are given startup scenarios. They decide if each has product-market fit.",
        learningGoal: "Recognize product-market fit signals.",
        completionSystem: "Score increases with each correct decision.",
        keyTerms: ["Product-market fit", "competitive advantage"]
      }
    ],
    quiz: [
      {
        id: "due-diligence-meaning",
        question: "What does due diligence mean in VC?",
        options: [
          "The legal paperwork for investments",
          "The research process VCs use to evaluate a startup before investing",
          "The amount of money a VC invests",
          "The time it takes to make an investment"
        ],
        correctAnswer: 1,
        explanation: "Due diligence is the comprehensive research and evaluation process VCs conduct to assess a startup's potential before making an investment decision."
      },
      {
        id: "growth-potential-factor",
        question: "In Pitch Judge, which factor matters most for growth potential?",
        options: [
          "The age of the founders",
          "Market size and scalability",
          "The company's current office location",
          "How much money they're asking for"
        ],
        correctAnswer: 1,
        explanation: "Market size and scalability are crucial for growth potential because they determine how big the opportunity is and how quickly the company can expand."
      },
      {
        id: "product-market-fit-definition",
        question: "What is product-market fit?",
        options: [
          "When a product is the right size for the market",
          "When customers strongly want and use a product",
          "When a product costs the right amount",
          "When a product looks good"
        ],
        correctAnswer: 1,
        explanation: "Product-market fit occurs when customers strongly want and actively use a product, indicating genuine demand and market validation."
      },
      {
        id: "product-market-fit-signals",
        question: "In Fit or Flop, what signals product-market fit?",
        options: [
          "High customer acquisition costs",
          "Strong user engagement and organic growth",
          "Lots of competitors",
          "Low profit margins"
        ],
        correctAnswer: 1,
        explanation: "Strong user engagement, customer retention, and organic growth are key indicators that customers truly value the product."
      },
      {
        id: "competition-risk",
        question: "In the food delivery example, why did the VC take the risk despite competition?",
        options: [
          "They ignored the competition",
          "The startup had unique logistics technology that could scale faster",
          "Food delivery has no competition",
          "They wanted to lose money"
        ],
        correctAnswer: 1,
        explanation: "The VC believed the startup's unique logistics technology provided a competitive advantage that could help them scale faster than competitors."
      }
    ],
    activities: [
      {
        title: "Startup Evaluation",
        description: "Pick a startup idea (real or your own). Write a one-page 'evaluation' covering team, market, product, and risks."
      }
    ]
  },
  {
    id: 4,
    title: "Funding Rounds & Stages of Startups",
    overview: "Startups often need multiple rounds of funding as they grow. These are labeled Seed, Series A, B, C, and beyond, each representing a different stage of growth and risk. Early rounds focus on proving the idea, while later rounds fund scaling, marketing, and expansion. Understanding these stages helps VCs decide when to invest and how much risk to accept.",
    flashcards: [
      {
        term: "Seed Funding",
        definition: "Seed funding is the earliest money a startup raises to test its idea. It often comes from friends, family, or angel investors."
      },
      {
        term: "Series A",
        definition: "Series A is the first major VC round. It funds product-market fit and building the team."
      },
      {
        term: "Series B/C",
        definition: "Later rounds like Series B and C fund growth, scaling operations, and international expansion."
      },
      {
        term: "Valuation",
        definition: "Valuation is how much a startup is worth at each round. Higher valuations mean investors own less equity for the same money."
      },
      {
        term: "Dilution",
        definition: "Dilution happens when new shares are issued, reducing each existing owner's percentage of the company."
      }
    ],
    realLifeExample: {
      title: "Ride-Sharing Startup Growth",
      description: "A ride-sharing startup raises $500,000 in seed funding to build its first app. After proving demand, it raises $5 million in Series A to expand into one city. With rapid growth, the company secures $50 million in Series B to expand nationwide. Each round increases the company's valuation, but founders give up more equity as dilution occurs."
    },
    miniGames: [
      {
        id: "round-sorter",
        name: "Round Sorter",
        howItWorks: "Players drag funding rounds (Seed, Series A, Series B) into the correct order with matching goals.",
        learningGoal: "Understand the sequence of startup growth and funding.",
        completionSystem: "Bronze = some correct, Silver = mostly correct, Gold = perfect order.",
        keyTerms: ["Seed", "Series A", "Series B", "valuation"]
      },
      {
        id: "dilution-simulator",
        name: "Dilution Simulator",
        howItWorks: "Players allocate shares across founders and investors. New rounds introduce dilution, and they must calculate ownership percentages.",
        learningGoal: "See how equity changes with each funding round.",
        completionSystem: "Score based on accurate calculations.",
        keyTerms: ["Equity", "dilution", "valuation"]
      }
    ],
    quiz: [
      {
        id: "seed-funding-definition",
        question: "What is seed funding, and who often provides it?",
        options: [
          "The final round of funding from VCs",
          "The earliest money a startup raises, often from friends, family, or angel investors",
          "Government grants for startups",
          "Bank loans for established companies"
        ],
        correctAnswer: 1,
        explanation: "Seed funding is the earliest stage of startup funding, typically coming from personal networks and angel investors to test and validate the initial business idea."
      },
      {
        id: "round-sequence",
        question: "In Round Sorter, which round comes first: Series A or seed?",
        options: [
          "Series A",
          "Seed",
          "They happen at the same time",
          "It depends on the startup"
        ],
        correctAnswer: 1,
        explanation: "Seed funding always comes before Series A. Seed is for testing the idea, while Series A is the first major VC round for proven concepts."
      },
      {
        id: "valuation-meaning",
        question: "What does valuation mean in venture capital?",
        options: [
          "The amount of money invested",
          "How much a startup is worth at each funding round",
          "The number of employees in a company",
          "The profit a company makes"
        ],
        correctAnswer: 1,
        explanation: "Valuation is the estimated worth of a company at a specific point in time, which determines how much equity investors receive for their investment."
      },
      {
        id: "dilution-effect",
        question: "In Dilution Simulator, what happens to founder ownership when new shares are issued?",
        options: [
          "It increases",
          "It stays the same",
          "It decreases",
          "It doubles"
        ],
        correctAnswer: 2,
        explanation: "When new shares are issued to investors, existing shareholders (including founders) own a smaller percentage of the company, even though the absolute number of their shares remains the same."
      },
      {
        id: "dilution-example",
        question: "In the ride-sharing example, why did dilution increase at later rounds?",
        options: [
          "The company was failing",
          "More shares were issued to new investors in each round",
          "The founders sold their shares",
          "The company went public"
        ],
        correctAnswer: 1,
        explanation: "With each funding round, new shares are created and sold to investors, which dilutes the ownership percentage of existing shareholders, including founders."
      }
    ],
    activities: [
      {
        title: "Startup Funding Research",
        description: "Choose a startup you admire (e.g., Airbnb, Spotify). Research its funding history (Seed, A, B, etc.). Write a short summary of how its valuation and investors changed across rounds."
      }
    ]
  },
  {
    id: 5,
    title: "Term Sheets & Negotiation",
    overview: "A term sheet is the document that outlines the conditions of a VC investment. It covers ownership, valuation, voting rights, and protections. Negotiation between founders and investors determines the balance of control. Understanding term sheets is crucial for protecting both sides and setting up long-term success.",
    flashcards: [
      {
        term: "Term Sheet",
        definition: "A term sheet is a non-binding agreement that details the terms of a VC investment."
      },
      {
        term: "Liquidation Preference",
        definition: "Liquidation preference ensures investors get paid back first if a company is sold or goes bankrupt."
      },
      {
        term: "Board Seat",
        definition: "A board seat gives investors influence over the company's strategic direction."
      },
      {
        term: "Anti-Dilution Clause",
        definition: "Anti-dilution clauses protect investors if the company raises money at a lower valuation later."
      },
      {
        term: "Valuation Cap (Convertible Notes)",
        definition: "A valuation cap sets the maximum company value at which convertible debt turns into equity."
      }
    ],
    realLifeExample: {
      title: "Startup Term Sheet Negotiation",
      description: "A startup negotiates a $10 million investment at a $40 million valuation. The VC asks for a board seat and a 1x liquidation preference, ensuring they get their money back before founders if the company sells. The founders agree, balancing the need for funding with protecting their control. This illustrates how term sheets shape power and incentives."
    },
    miniGames: [
      {
        id: "clause-match-up",
        name: "Clause Match-Up",
        howItWorks: "Players match clauses (liquidation preference, anti-dilution, board seat) with what they protect.",
        learningGoal: "Learn the function of common VC clauses.",
        completionSystem: "Earn stars for correct matches.",
        keyTerms: ["Liquidation preference", "anti-dilution", "board seat"]
      },
      {
        id: "negotiation-simulator",
        name: "Negotiation Simulator",
        howItWorks: "Players role-play as founders or VCs negotiating terms. They choose between options (accept, counter, reject).",
        learningGoal: "Practice the give-and-take of negotiations.",
        completionSystem: "Bronze = poor deal, Silver = balanced deal, Gold = win-win deal.",
        keyTerms: ["Term sheet", "valuation cap", "ownership"]
      }
    ],
    quiz: [
      {
        id: "term-sheet-definition",
        question: "What is a term sheet?",
        options: [
          "A legal contract that binds investors and founders",
          "A non-binding agreement that details the terms of a VC investment",
          "A document that lists all employees",
          "A financial statement showing profits"
        ],
        correctAnswer: 1,
        explanation: "A term sheet is a non-binding document that outlines the key terms and conditions of a potential investment before final legal documents are created."
      },
      {
        id: "liquidation-preference-protection",
        question: "In Clause Match-Up, what does a liquidation preference protect?",
        options: [
          "Founder voting rights",
          "Investor recovery of investment in case of sale or bankruptcy",
          "Employee stock options",
          "Company intellectual property"
        ],
        correctAnswer: 1,
        explanation: "Liquidation preference ensures that investors get paid back their original investment (and sometimes more) before other shareholders when a company is sold or liquidated."
      },
      {
        id: "anti-dilution-purpose",
        question: "What is the purpose of anti-dilution clauses?",
        options: [
          "To prevent the company from hiring more employees",
          "To protect investors if the company raises money at a lower valuation later",
          "To stop founders from selling shares",
          "To guarantee company profits"
        ],
        correctAnswer: 1,
        explanation: "Anti-dilution clauses protect investors from having their ownership percentage reduced if the company raises funding at a lower valuation than their original investment."
      },
      {
        id: "negotiation-founder-demands",
        question: "In Negotiation Simulator, what happens if founders accept every investor demand?",
        options: [
          "They get more money",
          "They lose control and get a poor deal",
          "They keep full ownership",
          "The deal is automatically approved"
        ],
        correctAnswer: 1,
        explanation: "Accepting every investor demand typically results in founders giving up too much control and equity, leading to an unbalanced deal that favors investors."
      },
      {
        id: "board-seat-importance",
        question: "In the $10M example, why did the VC want a board seat?",
        options: [
          "To receive a salary from the company",
          "To have influence over strategic decisions and protect their investment",
          "To hire their friends",
          "To control daily operations"
        ],
        correctAnswer: 1,
        explanation: "VCs seek board seats to have oversight and influence on major strategic decisions that could affect the value and direction of their investment."
      }
    ],
    activities: [
      {
        title: "Term Sheet Analysis",
        description: "Find a sample VC term sheet online. Highlight 3 clauses you think would be most important for founders to understand. Write a paragraph explaining why."
      }
    ]
  },
  {
    id: 6,
    title: "Portfolio Management in Venture Capital",
    overview: "VCs don't invest in just one company — they build portfolios of many startups. Since most startups fail, VCs rely on a few 'home runs' to drive returns. Portfolio management involves diversifying across industries, stages, and risk levels. This strategy increases the chance of overall success.",
    flashcards: [
      {
        term: "Portfolio",
        definition: "A portfolio is the collection of all the startups a VC invests in."
      },
      {
        term: "Diversification",
        definition: "Diversification means spreading investments across industries and stages to reduce risk."
      },
      {
        term: "Follow-On Investment",
        definition: "A follow-on investment is when VCs reinvest in startups from earlier rounds."
      },
      {
        term: "Power Law",
        definition: "The power law states that most returns come from a small number of big winners."
      },
      {
        term: "Fund Strategy",
        definition: "A fund strategy defines how a VC allocates money across startups and sectors."
      }
    ],
    realLifeExample: {
      title: "VC Fund Portfolio Performance",
      description: "A VC fund invests in 25 startups. Over time, 15 fail, 7 return small profits, and 3 generate massive gains. One company becomes a unicorn worth $1 billion, making up for all the losses and providing high overall returns. This shows how VCs rely on portfolios, not single bets."
    },
    miniGames: [
      {
        id: "portfolio-builder",
        name: "Portfolio Builder",
        howItWorks: "Players choose how to allocate a $100M VC fund across 10 startups. They see how diversification affects outcomes.",
        learningGoal: "Understand the importance of spreading risk.",
        completionSystem: "Bronze = poor diversification, Silver = decent, Gold = strong balance.",
        keyTerms: ["Portfolio", "diversification", "fund strategy"]
      },
      {
        id: "power-law-challenge",
        name: "Power Law Challenge",
        howItWorks: "Players are shown results of a portfolio with multiple failures and a few successes. They must calculate overall ROI.",
        learningGoal: "See how a few winners drive returns.",
        completionSystem: "Points for accurate ROI.",
        keyTerms: ["Power law", "follow-on investments"]
      }
    ],
    quiz: [
      {
        id: "vc-portfolio-definition",
        question: "What is a VC portfolio?",
        options: [
          "A document showing company finances",
          "The collection of all startups a VC invests in",
          "A list of potential investors",
          "A legal agreement between VCs and startups"
        ],
        correctAnswer: 1,
        explanation: "A VC portfolio is the complete collection of all the startup companies that a venture capital firm has invested in across their fund."
      },
      {
        id: "diversification-importance",
        question: "In Portfolio Builder, why is diversification important?",
        options: [
          "It guarantees all investments will succeed",
          "It spreads risk across different industries and stages",
          "It reduces the amount of money needed",
          "It eliminates the need for due diligence"
        ],
        correctAnswer: 1,
        explanation: "Diversification helps reduce overall risk by spreading investments across different industries, stages, and business models, so that if one sector fails, others may still succeed."
      },
      {
        id: "follow-on-investment-meaning",
        question: "What is a follow-on investment?",
        options: [
          "The first investment in a startup",
          "When VCs reinvest in startups from earlier rounds",
          "An investment made by competitors",
          "Government funding for startups"
        ],
        correctAnswer: 1,
        explanation: "A follow-on investment occurs when a VC firm invests additional money in a portfolio company in subsequent funding rounds, often to maintain or increase their ownership stake."
      },
      {
        id: "power-law-returns",
        question: "In Power Law Challenge, what drives most VC fund returns?",
        options: [
          "Many small successes",
          "A few massive winners",
          "Government subsidies",
          "Interest from bank deposits"
        ],
        correctAnswer: 1,
        explanation: "The power law in VC means that a small number of highly successful investments (often just 1-3 companies) generate the majority of a fund's returns, offsetting many failures."
      },
      {
        id: "unicorn-portfolio-success",
        question: "In the unicorn example, how did one success offset many failures?",
        options: [
          "The successful company bought the failed ones",
          "The unicorn's massive valuation generated returns greater than all losses combined",
          "The government provided bailout funds",
          "The failures were actually profitable"
        ],
        correctAnswer: 1,
        explanation: "When one portfolio company becomes a unicorn (valued at $1B+), the massive returns from that single investment can exceed the total losses from all failed investments, making the entire portfolio profitable."
      }
    ],
    activities: [
      {
        title: "Mock VC Portfolio",
        description: "Create a 'fake' VC portfolio by choosing 5 startups from Crunchbase or AngelList. Pretend 3 fail, 1 breaks even, and 1 is a massive success. Calculate whether you made money overall."
      }
    ]
  },
  {
    id: 7,
    title: "Exits & Industry Trends",
    overview: "The ultimate goal of venture capital is the exit — when investors cash out. Exits include IPOs (initial public offerings), acquisitions, or secondary sales. Beyond exits, VC is shaped by trends like globalization, diversity in founders, and new technologies. This level explores how VCs realize returns and how the industry is evolving.",
    flashcards: [
      {
        term: "Exit",
        definition: "An exit is when investors sell their stake in a startup and realize returns."
      },
      {
        term: "IPO (Initial Public Offering)",
        definition: "An IPO is when a private company sells shares to the public for the first time."
      },
      {
        term: "Acquisition",
        definition: "An acquisition happens when a larger company buys a startup."
      },
      {
        term: "Secondary Sale",
        definition: "A secondary sale is when investors sell shares to other private investors before an IPO or acquisition."
      },
      {
        term: "Industry Trends",
        definition: "Current trends include globalization, ESG investing, and more diverse founders receiving funding."
      }
    ],
    realLifeExample: {
      title: "Biotech Startup Exit",
      description: "A biotech startup receives years of VC support. Eventually, a pharmaceutical company acquires it for $500 million. The VCs who invested $20 million now cash out with $100 million in returns. Meanwhile, newer trends show VCs paying more attention to sustainability-focused startups, shaping the next wave of innovation."
    },
    miniGames: [
      {
        id: "exit-picker",
        name: "Exit Picker",
        howItWorks: "Players are shown startup scenarios and must choose the most likely exit (IPO, acquisition, secondary sale).",
        learningGoal: "Recognize different exit paths.",
        completionSystem: "Bronze = 1–2 correct, Silver = 3–4, Gold = all correct.",
        keyTerms: ["Exit", "IPO", "acquisition"]
      },
      {
        id: "trend-tracker",
        name: "Trend Tracker",
        howItWorks: "Players classify VC trends (globalization, ESG, women-led startups) as Growing, Declining, or Emerging.",
        learningGoal: "Understand how VC adapts over time.",
        completionSystem: "Score tracked with leaderboard.",
        keyTerms: ["Industry trends", "disruption"]
      }
    ],
    quiz: [
      {
        id: "exit-definition",
        question: "What is an exit in venture capital?",
        options: [
          "When a startup shuts down",
          "When investors sell their stake and realize returns",
          "When founders leave the company",
          "When a company moves offices"
        ],
        correctAnswer: 1,
        explanation: "An exit is the process by which venture capital investors sell their ownership stake in a portfolio company to realize their returns on investment."
      },
      {
        id: "acquisition-exit-path",
        question: "In Exit Picker, what path fits a startup bought by a larger company?",
        options: [
          "IPO",
          "Acquisition",
          "Secondary sale",
          "Bankruptcy"
        ],
        correctAnswer: 1,
        explanation: "An acquisition occurs when a larger company purchases a startup, providing an exit opportunity for the startup's investors and founders."
      },
      {
        id: "ipo-definition",
        question: "What is an IPO?",
        options: [
          "A private funding round",
          "When a private company sells shares to the public for the first time",
          "When a company gets acquired",
          "When investors sell to other private investors"
        ],
        correctAnswer: 1,
        explanation: "An Initial Public Offering (IPO) is when a private company first sells shares to the general public on a stock exchange, becoming a publicly traded company."
      },
      {
        id: "esg-investing-meaning",
        question: "In Trend Tracker, what does ESG investing mean?",
        options: [
          "Investing only in technology companies",
          "Environmental, Social, and Governance factors in investment decisions",
          "Investing in European startups only",
          "Emergency funding for struggling companies"
        ],
        correctAnswer: 1,
        explanation: "ESG investing considers Environmental, Social, and Governance factors alongside financial returns, focusing on companies that operate sustainably and ethically."
      },
      {
        id: "biotech-exit-returns",
        question: "In the biotech acquisition example, how did VCs turn $20M into $100M?",
        options: [
          "The company went bankrupt and they lost money",
          "The acquisition price of $500M gave them a 5x return on their investment",
          "They received government grants",
          "They sold shares before the acquisition"
        ],
        correctAnswer: 1,
        explanation: "The VCs invested $20M and the company was acquired for $500M. Assuming they owned 20% of the company (20% of $500M = $100M), they achieved a 5x return on their investment."
      }
    ],
    activities: [
      {
        title: "Exit Story Research",
        description: "Pick a recent startup exit (IPO or acquisition). Research the company's valuation, how much was invested, and what the investors earned. Write a half-page summary of the exit story."
      }
    ]
  }
];

export const getVCLevelById = (id: number): VCLevel | undefined => {
  return vcJourneyData.find(level => level.id === id);
};

export const getAllVCLevels = (): VCLevel[] => {
  return vcJourneyData;
};