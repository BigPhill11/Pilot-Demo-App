
export interface InteractiveLessonContent {
  level: number;
  title: string;
  description: string;
  theme: string;
  objectives: string[];
  terminology: string[];
  keyTerms: string[];
  keyQuestions: string[];
  miniGames: MiniGameConfig[];
  realWorldExamples: RealWorldExampleConfig[];
  interactiveQuiz: InteractiveQuizConfig;
  practicalActivity: PracticalActivityConfig;
}

export interface MiniGameConfig {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface RealWorldExampleConfig {
  id: string;
  title: string;
  company: string;
  year: number;
  description: string;
  keyLearning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface InteractiveQuizConfig {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticalActivityConfig {
  name: string;
  description: string;
  steps: string[];
  deliverable: string;
}

const level1Lesson: InteractiveLessonContent = {
  level: 1,
  title: "Welcome to Wall Street",
  description: "Your first step into the exciting world of investment banking - learn the basics that every Wall Street professional knows",
  theme: "Foundation Building",
  objectives: [
    "Understand what investment banks do and why they matter",
    "Learn key terminology used in investment banking",
    "Recognize different types of financial deals",
    "Practice explaining investment banking concepts to others"
  ],
  terminology: ['investment_bank', 'ipo', 'merger', 'financing', 'client', 'underwriting', 'stock', 'capital'],
  keyTerms: ['investment_bank', 'ipo', 'merger', 'financing', 'client'],
  keyQuestions: [
    "What do investment banks do?",
    "What is an IPO?",
    "What is a merger?",
    "What is financing?"
  ],
  miniGames: [
    {
      id: 'ib-basics-matching',
      name: 'Wall Street Word Match',
      description: 'Match key investment banking terms with their definitions',
      xpReward: 50,
      difficulty: 'beginner'
    },
    {
      id: 'deal-type-sorter',
      name: 'Deal Type Detective',
      description: 'Identify different types of investment banking deals',
      xpReward: 75,
      difficulty: 'beginner'
    }
  ],
  realWorldExamples: [
    {
      id: 'facebook-ipo-2012',
      title: "Facebook's Historic IPO Journey (2012)",
      company: "Facebook (Meta)",
      year: 2012,
      description: "Facebook's IPO was one of the most anticipated public offerings in tech history. The social media giant raised $16 billion, making it the largest tech IPO at the time. Morgan Stanley, JPMorgan Chase, and Goldman Sachs served as the lead underwriters. The IPO was priced at $38 per share, valuing Facebook at $104 billion. However, the launch faced technical glitches on NASDAQ, and the stock initially struggled, dropping below the IPO price. This case shows how investment banks help companies go public, the complexities involved, and how market conditions can affect even the biggest deals. Despite initial challenges, Facebook's stock eventually soared, validating the long-term value that investment bankers saw in the company.",
      keyLearning: "IPOs are complex processes where investment banks help companies raise money from public investors, but success depends on proper pricing, market conditions, and flawless execution.",
      difficulty: 'beginner'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'what-is-ib',
        question: "What is the primary role of an investment bank?",
        options: [
          "Managing personal savings accounts like a regular bank",
          "Helping companies raise money and providing financial advice",
          "Selling insurance policies to businesses",
          "Operating retail stores and restaurants"
        ],
        correctAnswer: 1,
        explanation: "Investment banks are like financial advisors for big companies - they help them raise money, buy other companies, and make important financial decisions. Think of them as the financial coaches for the business world!",
        difficulty: 'beginner'
      },
      {
        id: 'what-is-ipo',
        question: "What does IPO stand for?",
        options: [
          "Initial Public Offering",
          "Investment Portfolio Option",
          "Income Property Opportunity",
          "Individual Pension Obligation"
        ],
        correctAnswer: 0,
        explanation: "IPO stands for Initial Public Offering - it's when a private company sells shares to regular people for the first time, like when your favorite private company becomes available for anyone to buy stock in!",
        difficulty: 'beginner'
      },
      {
        id: 'facebook-ipo-lesson',
        question: "What made Facebook's 2012 IPO particularly significant?",
        options: [
          "It was the smallest tech IPO ever",
          "It was the largest tech IPO at the time, raising $16 billion",
          "Facebook decided not to go public after all",
          "Only investment banks could buy the shares"
        ],
        correctAnswer: 1,
        explanation: "Facebook's IPO was huge! It raised $16 billion and was the largest tech company to go public at that time. Even though it had some early challenges, it showed how investment banks help big companies reach everyday investors.",
        difficulty: 'beginner'
      }
    ]
  },
  practicalActivity: {
    name: "Your Investment Banking Elevator Pitch",
    description: "Create a 30-second elevator pitch explaining what investment banking is to someone who has never heard of it. Imagine you're in an elevator with a curious friend!",
    steps: [
      "Start with a friendly hook: 'You know how companies sometimes need help with big financial decisions?'",
      "Explain the core job: 'Investment banks are like financial advisors for big companies - they help them raise money and make smart business moves.'",
      "Give a relatable example: 'Like when Facebook went public so anyone could buy their stock, or when Disney bought other companies to grow bigger.'",
      "End with enthusiasm: 'It's basically helping shape how the business world works - pretty cool, right?'"
    ],
    deliverable: "A written 30-second elevator pitch that you could actually say to a friend, plus practice saying it out loud!"
  }
};

const level2Lesson: InteractiveLessonContent = {
  level: 2,
  title: "The Deal Factory: How Investment Banks Work",
  description: "Discover the inner workings of investment banks, their different divisions, and the key players who make Wall Street deals happen",
  theme: "Operations & Structure",
  objectives: [
    "Understand how investment banks are organized and structured",
    "Learn about underwriting and why it's crucial for capital markets",
    "Explore how investment banks work together in syndicates",
    "Master the key documents and processes in investment banking deals"
  ],
  terminology: ['underwriting', 'syndicate', 'prospectus', 'due_diligence', 'pitch_book', 'mandates', 'roadshow', 'bookrunner'],
  keyTerms: ['underwriting', 'syndicate', 'prospectus', 'due_diligence', 'pitch_book', 'mandates'],
  keyQuestions: [
    "What is underwriting and why is it important?",
    "How do investment banks form syndicates?",
    "What information goes into a prospectus?",
    "Why is due diligence critical for deals?"
  ],
  miniGames: [
    {
      id: 'ib-divisions-match',
      name: 'Division Detective',
      description: 'Match different investment banking divisions with their responsibilities',
      xpReward: 60,
      difficulty: 'beginner'
    },
    {
      id: 'underwriting-simulator',
      name: 'Underwriting Challenge',
      description: 'Help structure and price a new stock offering for a growing company',
      xpReward: 80,
      difficulty: 'intermediate'
    }
  ],
  realWorldExamples: [
    {
      id: 'spotify-ipo-2018',
      title: "Spotify's Revolutionary Direct Listing (2018)",
      company: "Spotify",
      year: 2018,
      description: "In April 2018, Spotify disrupted the traditional IPO process by choosing a direct listing on the NYSE instead of a conventional IPO. Unlike traditional IPOs where investment banks underwrite and sell new shares, Spotify allowed existing shareholders to sell their shares directly to the public without creating new shares or raising capital. This groundbreaking approach saved millions in underwriting fees and avoided the typical 'pop' that new IPOs experience. Goldman Sachs, Morgan Stanley, and Allen & Company served as financial advisors (not underwriters) to guide the process. The company's shares opened at $165.90, giving it a market value of about $29.5 billion. This direct listing method challenged the traditional investment banking model and paved the way for other companies like Slack and Palantir to follow suit. The success demonstrated that companies with strong brand recognition and sufficient liquidity could bypass traditional IPO constraints.",
      keyLearning: "Direct listings show how companies can innovate around traditional investment banking services, though they require strong market presence and don't raise new capital for the company.",
      difficulty: 'beginner'
    },
    {
      id: 'aramco-ipo-2019',
      title: "Saudi Aramco's Record-Breaking IPO (2019)",
      company: "Saudi Aramco",
      year: 2019,
      description: "Saudi Aramco's IPO in December 2019 became the world's largest public offering, raising $25.6 billion and valuing the oil giant at $1.7 trillion. The deal showcased the massive coordination required for mega-IPOs. A syndicate of 27 global investment banks worked together, with JPMorgan Chase, Morgan Stanley, and HSBC as lead underwriters. The process involved extensive due diligence across the company's vast oil operations, geopolitical risk assessments, and regulatory compliance across multiple jurisdictions. The prospectus exceeded 600 pages, detailing everything from oil reserves to environmental risks. The underwriting syndicate had to price the shares carefully - initially targeting $8.53 per share but settling at the top of the range. The deal required coordination between Saudi regulators, international exchanges, and global investor roadshows. This IPO demonstrated how investment banks manage enormous complexity, regulatory requirements, and market timing for transformational deals.",
      keyLearning: "Mega-IPOs require extensive syndicate coordination, thorough due diligence, and careful pricing to balance company objectives with market conditions.",
      difficulty: 'intermediate'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'underwriting-definition',
        question: "What is the primary role of underwriting in investment banking?",
        options: [
          "Buying shares from companies and reselling them to investors",
          "Providing loans to companies for expansion",
          "Managing company bank accounts",
          "Filing tax returns for corporations"
        ],
        correctAnswer: 0,
        explanation: "Underwriting means the investment bank buys shares from the company and takes on the risk of selling them to investors, like a middleman who guarantees the company gets paid.",
        difficulty: 'beginner'
      },
      {
        id: 'syndicate-purpose',
        question: "Why do investment banks form syndicates for large deals?",
        options: [
          "To reduce competition between banks",
          "To share risk and bring more expertise and investor networks",
          "To increase fees charged to companies",
          "To comply with government regulations"
        ],
        correctAnswer: 1,
        explanation: "Syndicates allow banks to share the financial risk of large deals and combine their expertise and investor relationships to ensure successful completion.",
        difficulty: 'beginner'
      },
      {
        id: 'spotify-innovation',
        question: "How did Spotify's 2018 direct listing differ from traditional IPOs?",
        options: [
          "It raised more money than typical IPOs",
          "It used more investment banks as underwriters",
          "It allowed existing shareholders to sell directly without creating new shares",
          "It was only available to institutional investors"
        ],
        correctAnswer: 2,
        explanation: "Spotify's direct listing bypassed traditional underwriting by letting existing shareholders sell directly to the public, without the company issuing new shares or raising capital.",
        difficulty: 'intermediate'
      },
      {
        id: 'aramco-complexity',
        question: "What made Saudi Aramco's IPO particularly complex for the underwriting syndicate?",
        options: [
          "The company was too small for a public offering",
          "No investors were interested in oil companies",
          "It required coordination across 27 banks, multiple jurisdictions, and extensive due diligence",
          "The Saudi government refused to cooperate"
        ],
        correctAnswer: 2,
        explanation: "Aramco's massive scale required unprecedented coordination between 27 global banks, compliance across multiple countries, and extensive due diligence on the world's largest oil company.",
        difficulty: 'intermediate'
      }
    ]
  },
  practicalActivity: {
    name: "Build Your Investment Bank Pitch",
    description: "Create a pitch presentation for a fictional company seeking investment banking services. You'll act as an investment banker pitching your services to TechGrow Inc., a successful software company considering going public.",
    steps: [
      "Research TechGrow Inc.'s business model: cloud-based project management software with 50,000 customers",
      "Identify 3 key reasons why TechGrow should go public now (growth funding, employee stock options, market visibility)",
      "Create a simple pitch outline covering: company overview, IPO benefits, your bank's qualifications, timeline, and next steps",
      "Calculate basic IPO math: if TechGrow wants to raise $100M at a $1B valuation, how many shares should they sell?",
      "Prepare answers to likely client questions: 'How long will the process take?' and 'What are the main risks?'"
    ],
    deliverable: "A 5-slide pitch presentation outline with speaker notes explaining your recommendations for TechGrow's IPO strategy."
  }
};

const level3Lesson: InteractiveLessonContent = {
  level: 3,
  title: "Mergers & Acquisitions: The Art of Corporate Deals",
  description: "Explore how companies buy, sell, and merge with each other, and the investment bankers who make it happen",
  theme: "M&A Mastery",
  objectives: [
    "Distinguish between mergers, acquisitions, and other deal types",
    "Understand how investment bankers value companies in M&A deals",
    "Learn about synergies and why they drive M&A decisions",
    "Explore hostile takeovers and defensive strategies"
  ],
  terminology: ['merger', 'acquisition', 'hostile_takeover', 'due_diligence', 'synergies', 'valuation', 'premium', 'accretion'],
  keyTerms: ['merger', 'acquisition', 'hostile_takeover', 'due_diligence', 'synergies', 'valuation'],
  keyQuestions: [
    "What's the difference between a merger and an acquisition?",
    "How do investment bankers value companies in M&A deals?",
    "What are synergies and why do they matter?",
    "How do hostile takeovers work?"
  ],
  miniGames: [
    {
      id: 'ma-deal-builder',
      name: 'M&A Deal Architect',
      description: 'Structure a merger between two companies by identifying synergies and negotiating terms',
      xpReward: 75,
      difficulty: 'intermediate'
    },
    {
      id: 'valuation-challenge',
      name: 'Company Valuation Master',
      description: 'Use different methods to value companies and see which price makes sense',
      xpReward: 85,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'disney-fox-2019',
      title: "Disney's $71 Billion Acquisition of 21st Century Fox (2019)",
      company: "Disney & 21st Century Fox",
      year: 2019,
      description: "Disney's acquisition of 21st Century Fox entertainment assets was one of the largest media deals in history, showcasing complex M&A strategy and execution. The deal took nearly two years to complete, involving intense negotiations, regulatory approvals across multiple countries, and a bidding war with Comcast. Goldman Sachs and JPMorgan advised Disney, while Centerview Partners and Guggenheim Securities advised Fox. The transaction included Fox's movie studio, TV production companies, cable networks like FX, and international properties like Star India. Disney's strategic rationale centered on content synergies for its streaming service Disney+ and international expansion. The investment banks had to navigate complex regulatory reviews, including antitrust concerns about Disney's growing media dominance. The deal structure included both cash and stock, requiring careful valuation work as both companies' share prices fluctuated during the lengthy process. Due diligence involved analyzing thousands of content assets, international operations, and potential regulatory outcomes.",
      keyLearning: "Large M&A deals require extensive regulatory navigation, multiple valuation approaches, and strategic vision to identify and execute on synergies across different business lines.",
      difficulty: 'intermediate'
    },
    {
      id: 'broadcom-qualcomm-failed',
      title: "Broadcom's Failed $117 Billion Hostile Takeover of Qualcomm (2018)",
      company: "Broadcom & Qualcomm",
      year: 2018,
      description: "Broadcom's attempted hostile takeover of Qualcomm demonstrated the complexities and risks of unsolicited M&A deals. Broadcom, advised by Citi and JPMorgan, offered $117 billion for Qualcomm, which was advised by Goldman Sachs and Evercore. The deal became hostile when Qualcomm's board rejected multiple offers, forcing Broadcom to attempt a proxy fight to replace Qualcomm's directors. The transaction faced multiple obstacles: national security concerns over foreign ownership of critical U.S. semiconductor technology, regulatory scrutiny from multiple countries, and Qualcomm's own pending acquisition of NXP Semiconductors. Investment bankers had to navigate geopolitical risks, technology transfer concerns, and complex semiconductor industry dynamics. The deal ultimately collapsed when the U.S. Treasury's CFIUS (Committee on Foreign Investment) blocked it due to national security concerns, despite Broadcom's promise to move its headquarters to the U.S. This case highlighted how geopolitical factors can override financial logic in major M&A transactions.",
      keyLearning: "Hostile takeovers face additional complexities including proxy battles, regulatory risks, and geopolitical considerations that can derail even well-financed deals.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'merger-vs-acquisition',
        question: "What's the key difference between a merger and an acquisition?",
        options: [
          "Mergers are always larger than acquisitions",
          "In mergers, companies combine as equals; in acquisitions, one company buys another",
          "Mergers only happen between competitors",
          "Acquisitions require more regulatory approval"
        ],
        correctAnswer: 1,
        explanation: "In a merger, two companies combine to form a new entity as relative equals. In an acquisition, one company (acquirer) buys and absorbs another company (target).",
        difficulty: 'beginner'
      },
      {
        id: 'synergies-meaning',
        question: "What are synergies in M&A deals?",
        options: [
          "The total value of both companies combined",
          "Legal fees paid to investment banks",
          "Benefits created when two companies work better together than separately",
          "The premium paid above market price"
        ],
        correctAnswer: 2,
        explanation: "Synergies are the additional value created when two companies combine - like cost savings from eliminating duplicate departments or increased revenue from cross-selling products.",
        difficulty: 'beginner'
      },
      {
        id: 'disney-fox-strategy',
        question: "What was Disney's main strategic rationale for acquiring Fox's entertainment assets?",
        options: [
          "To eliminate a competitor from the market",
          "To gain content and international assets for Disney+ streaming service",
          "To reduce operating costs through layoffs",
          "To diversify into news and sports broadcasting"
        ],
        correctAnswer: 1,
        explanation: "Disney acquired Fox primarily to gain valuable content for its Disney+ streaming service and expand internationally, especially with assets like Star India.",
        difficulty: 'intermediate'
      },
      {
        id: 'hostile-takeover-challenges',
        question: "Why did Broadcom's hostile takeover of Qualcomm fail?",
        options: [
          "Broadcom couldn't raise enough financing",
          "Qualcomm's stock price was too high",
          "U.S. government blocked it due to national security concerns",
          "Shareholders rejected the deal"
        ],
        correctAnswer: 2,
        explanation: "The U.S. Treasury's CFIUS blocked the deal due to national security concerns about foreign control of critical U.S. semiconductor technology, showing how geopolitical factors can override financial considerations.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "M&A Deal Analysis Project",
    description: "Analyze a potential merger between two fictional companies and create a recommendation memo. You're advising GreenTech Energy (solar panel manufacturer) on whether to acquire CleanCar Motors (electric vehicle startup).",
    steps: [
      "Analyze both companies: GreenTech has $500M revenue, strong manufacturing; CleanCar has $50M revenue, innovative battery technology",
      "Identify potential synergies: shared battery technology, combined clean energy ecosystem, cost savings from shared R&D",
      "Calculate basic valuation: If GreenTech trades at 3x revenue and CleanCar at 5x revenue, what would be fair acquisition prices?",
      "Assess risks: integration challenges, technology compatibility, market competition from Tesla",
      "Make recommendation: Should GreenTech pursue this acquisition? What price range makes sense?"
    ],
    deliverable: "A 2-page executive memo with your analysis and recommendation, including financial calculations and risk assessment."
  }
};

const level4Lesson: InteractiveLessonContent = {
  level: 4,
  title: "Financial Modeling & Valuation Mastery",
  description: "Master the technical skills that investment bankers use daily - from building financial models to valuing companies",
  theme: "Technical Mastery",
  objectives: [
    "Build comprehensive financial models for companies and deals",
    "Master the three core valuation methodologies used on Wall Street",
    "Understand how to present financial analysis to clients and stakeholders",
    "Learn to assess financial risk and create scenario analyses"
  ],
  terminology: ['dcf_model', 'comparable_companies', 'precedent_transactions', 'lbo_model', 'accretion_dilution', 'beta', 'wacc', 'terminal_value', 'sensitivity_analysis', 'monte_carlo', 'irr', 'npv', 'financial_modeling'],
  keyTerms: ['dcf_model', 'comparable_companies', 'precedent_transactions', 'lbo_model', 'accretion_dilution'],
  keyQuestions: [
    "How do you build a DCF model and what are its key components?",
    "When would you use comparable company analysis vs precedent transactions?",
    "What makes an LBO model different from other valuation methods?",
    "How do you determine if an acquisition is accretive or dilutive to earnings?"
  ],
  miniGames: [
    {
      id: 'dcf-builder-game',
      name: 'DCF Model Builder',
      description: 'Build a complete discounted cash flow model by selecting the right components and assumptions',
      xpReward: 100,
      difficulty: 'advanced'
    },
    {
      id: 'valuation-battle',
      name: 'Valuation Battle Arena',
      description: 'Race against time to value companies using different methods and see which gives the best result',
      xpReward: 120,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'tesla-going-private-2018',
      title: "Tesla's 'Going Private' Valuation Challenge (2018)",
      company: "Tesla",
      year: 2018,
      description: "When Elon Musk announced his intention to take Tesla private at $420 per share, investment banks had to quickly assess whether this valuation was reasonable. Goldman Sachs and Morgan Stanley worked with Tesla's board to evaluate the proposal. The process involved building complex DCF models for an electric vehicle company with volatile cash flows, comparing Tesla to both traditional automakers and technology companies, and analyzing precedent transactions in the automotive sector. The banks had to consider Tesla's unique position as a luxury EV manufacturer, its manufacturing ramp challenges, and its potential in autonomous driving. The valuation exercise revealed the challenges of modeling high-growth, capital-intensive businesses where traditional metrics might not apply. Ultimately, the deal fell through due to financing and regulatory concerns, but it highlighted how investment banks must adapt their modeling techniques for revolutionary companies that don't fit traditional industry patterns.",
      keyLearning: "Valuing disruptive companies requires innovative modeling approaches and careful consideration of multiple scenarios, as traditional industry comparables may not capture the full picture.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'dcf-components',
        question: "What are the three main components of a DCF (Discounted Cash Flow) model?",
        options: [
          "Revenue, expenses, and profit",
          "Cash flows, discount rate, and terminal value",
          "Assets, liabilities, and equity",
          "Price, earnings, and growth rate"
        ],
        correctAnswer: 1,
        explanation: "A DCF model values a company based on its projected future cash flows, discounted back to present value using an appropriate discount rate, plus a terminal value representing cash flows beyond the projection period.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Build Your First Investment Banking Model",
    description: "Create a simplified but realistic financial model for a company considering an acquisition.",
    steps: [
      "Choose a real public company as your target and download their latest annual report",
      "Build a 3-year revenue and expense projection based on their historical growth",
      "Calculate free cash flow for each year (Operating Cash Flow - Capital Expenditures)",
      "Determine an appropriate discount rate (start with 10% for simplicity)",
      "Calculate the present value of your projected cash flows and add a terminal value",
      "Compare your DCF valuation to the company's current market value"
    ],
    deliverable: "A working financial model in spreadsheet format with your valuation conclusion and key assumptions."
  }
};

const level5Lesson: InteractiveLessonContent = {
  level: 5,
  title: "Deal Execution & Project Management",
  description: "Learn how investment bankers manage complex deals from start to finish, coordinating multiple parties and navigating challenges",
  theme: "Deal Leadership",
  objectives: [
    "Understand the complete deal timeline and critical milestones",
    "Learn how to coordinate multiple stakeholders in complex transactions",
    "Master the documentation and regulatory requirements for different deal types",
    "Develop project management skills for high-stakes financial transactions"
  ],
  terminology: ['deal_timeline', 'closing_conditions', 'regulatory_approvals', 'fairness_opinion', 'comfort_letters', 'due_diligence_reports', 'material_adverse_change', 'escrow_account', 'representations_warranties'],
  keyTerms: ['deal_timeline', 'closing_conditions', 'regulatory_approvals', 'fairness_opinion', 'comfort_letters'],
  keyQuestions: [
    "What are the typical phases of an investment banking deal from mandate to closing?",
    "How do investment banks coordinate with lawyers, accountants, and regulators?",
    "What can cause deals to fail and how do bankers mitigate these risks?",
    "What documentation is required for different types of transactions?"
  ],
  miniGames: [
    {
      id: 'deal-coordinator-game',
      name: 'Deal Coordination Master',
      description: 'Manage a complex M&A transaction by coordinating timelines, approvals, and stakeholder requirements in real-time',
      xpReward: 110,
      difficulty: 'advanced'
    },
    {
      id: 'crisis-manager-game',
      name: 'Deal Crisis Manager',
      description: 'Navigate unexpected challenges that threaten to derail your transaction and find creative solutions',
      xpReward: 130,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'comcast-sky-2018',
      title: "The Three-Way Battle for Sky: Complex Deal Execution (2018)",
      company: "Sky, Comcast, Fox, Disney",
      year: 2018,
      description: "The acquisition of UK broadcaster Sky became one of the most complex deal execution challenges, involving three major companies and multiple investment banks navigating overlapping transactions and regulatory jurisdictions.",
      keyLearning: "Complex multi-party transactions require exceptional coordination skills, regulatory expertise, and the ability to adapt strategies in real-time.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'deal-phases',
        question: "What typically happens immediately after a company accepts an investment bank's mandate?",
        options: [
          "The deal is announced to the public",
          "Due diligence begins and initial buyer list is developed",
          "The transaction closes",
          "Regulatory approvals are obtained"
        ],
        correctAnswer: 1,
        explanation: "After winning a mandate, investment banks typically begin due diligence preparation and develop a target buyer list before making public announcements.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Deal Timeline & Risk Management Plan",
    description: "Create a comprehensive project plan for managing a major acquisition.",
    steps: [
      "Design a 6-month timeline for a hypothetical $5 billion acquisition",
      "Identify all key stakeholders and map their roles",
      "List 5 major risks that could derail the transaction",
      "Create a communication plan for different parties",
      "Design contingency plans for major scenarios"
    ],
    deliverable: "A professional project management document with timeline, stakeholder matrix, and risk register."
  }
};

const level6Lesson: InteractiveLessonContent = {
  level: 6,
  title: "Industry Specialization & Sector Expertise",
  description: "Develop deep industry knowledge and understand how investment banking differs across sectors",
  theme: "Sector Mastery",
  objectives: [
    "Understand how investment banking approaches vary by industry sector",
    "Learn sector-specific valuation metrics and deal considerations",
    "Master industry jargon and key performance indicators for major sectors",
    "Develop expertise in regulatory environments affecting different industries"
  ],
  terminology: ['sector_coverage', 'industry_multiples', 'regulatory_landscape', 'sector_cyclicality', 'technology_valuations'],
  keyTerms: ['sector_coverage', 'industry_multiples', 'regulatory_landscape', 'sector_cyclicality'],
  keyQuestions: [
    "How do valuation approaches differ between technology and traditional companies?",
    "What unique regulatory considerations affect healthcare and energy deals?",
    "How do sector specialists add value beyond generalist bankers?",
    "What industry-specific metrics do investors focus on?"
  ],
  miniGames: [
    {
      id: 'sector-specialist-game',
      name: 'Industry Expert Challenge',
      description: 'Match companies to their sectors and identify the right valuation metrics for each industry',
      xpReward: 120,
      difficulty: 'advanced'
    },
    {
      id: 'sector-detective-game',
      name: 'Sector Detective',
      description: 'Analyze deal announcements and predict which sector specialist would handle each transaction',
      xpReward: 140,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'broadcom-vmware-2022',
      title: "Broadcom's $61 Billion VMware Acquisition: Tech Sector Complexity (2022)",
      company: "Broadcom & VMware",
      year: 2022,
      description: "This massive technology deal demonstrated the unique challenges of tech sector investment banking, requiring deep understanding of enterprise software markets and complex regulatory navigation.",
      keyLearning: "Technology sector deals require specialized knowledge of software business models and unique valuation metrics.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'tech-vs-traditional',
        question: "How do technology company valuations typically differ from traditional manufacturing?",
        options: [
          "Technology companies always trade at lower multiples",
          "Technology companies often trade on revenue multiples due to growth investment",
          "Technology companies never use DCF models",
          "Manufacturing companies are always more valuable"
        ],
        correctAnswer: 1,
        explanation: "High-growth tech companies often trade on revenue multiples because they reinvest heavily in growth, making current earnings less relevant.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Become a Sector Specialist",
    description: "Choose an industry sector and develop deep expertise by analyzing its characteristics and recent deals.",
    steps: [
      "Select a sector that interests you (tech, healthcare, energy, etc.)",
      "Research 3-5 major transactions in your sector from the past 2 years",
      "Identify 5-7 key metrics that investors focus on in your sector",
      "Map the major players including potential acquirers and targets",
      "Research current trends and challenges facing your sector"
    ],
    deliverable: "A comprehensive sector overview report demonstrating specialized knowledge needed to advise clients."
  }
};

const level7Lesson: InteractiveLessonContent = {
  level: 7,
  title: "Advanced Topics & Future of Investment Banking",
  description: "Explore cutting-edge developments shaping the future of investment banking",
  theme: "Innovation & Future",
  objectives: [
    "Understand how technology is transforming investment banking operations",
    "Learn about ESG considerations and sustainable finance trends",
    "Explore the impact of cryptocurrency and blockchain on financial services",
    "Develop insights into future career opportunities in investment banking"
  ],
  terminology: ['fintech_disruption', 'esg_investing', 'blockchain_finance', 'automated_trading', 'digital_assets', 'sustainable_finance', 'quantum_computing', 'regtech', 'cryptoassets'],
  keyTerms: ['fintech_disruption', 'esg_investing', 'blockchain_finance', 'sustainable_finance'],
  keyQuestions: [
    "How is technology changing the traditional investment banking model?",
    "What role does ESG play in modern investment banking decisions?",
    "How are cryptocurrencies affecting financial services?",
    "What new career paths are emerging in investment banking?"
  ],
  miniGames: [
    {
      id: 'future-banker-game',
      name: 'Future Investment Banker',
      description: 'Navigate the evolving landscape by adapting to new technologies and market trends',
      xpReward: 150,
      difficulty: 'advanced'
    },
    {
      id: 'esg-investment-challenge',
      name: 'ESG Investment Challenge',
      description: 'Balance financial returns with environmental and social impact in your investment decisions',
      xpReward: 160,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'coinbase-ipo-2021',
      title: "Coinbase's Landmark Cryptocurrency Exchange IPO (2021)",
      company: "Coinbase",
      year: 2021,
      description: "Coinbase's direct listing marked a watershed moment for cryptocurrency's integration into traditional finance, requiring banks to navigate uncharted territory in valuing and marketing a pure-play crypto business.",
      keyLearning: "Emerging technologies require investment banks to develop new expertise and adapt valuation methods for revolutionary business models.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'fintech-impact',
        question: "How is fintech most significantly changing traditional investment banking?",
        options: [
          "Fintech is eliminating all investment banking jobs",
          "Fintech is automating routine tasks and enabling focus on complex advisory work",
          "Fintech only affects retail banking",
          "Fintech has no impact on investment banking"
        ],
        correctAnswer: 1,
        explanation: "Fintech is automating routine tasks while enabling bankers to focus more on high-value advisory work and complex problem-solving.",
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Design the Future of Investment Banking",
    description: "Create a vision for how investment banking will evolve over the next decade.",
    steps: [
      "Research current trends in fintech, AI, and blockchain impacting investment banking",
      "Analyze how ESG investing is changing client demands",
      "Interview or research perspectives from current professionals",
      "Identify 3-5 specific ways operations or career paths might change",
      "Propose how aspiring bankers should prepare for these changes"
    ],
    deliverable: "A comprehensive report on the future of investment banking with trend analysis and career recommendations."
  }
};

export const investmentBankingLessons: InteractiveLessonContent[] = [
  level1Lesson,
  level2Lesson,
  level3Lesson,
  level4Lesson,
  level5Lesson,
  level6Lesson,
  level7Lesson
];
