export interface PrivateEquityLessonContent {
  id: string;
  level: number;
  title: string;
  description: string;
  objectives: string[];
  keyTerms: string[];
  miniGames: MiniGameConfig[];
  realWorldExamples: RealWorldExample[];
  interactiveQuiz: {
    questions: QuizQuestion[];
  };
  practicalActivity: PracticalActivity;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MiniGameConfig {
  id: string;
  name: string;
  description: string;
  type: 'matching' | 'scenario' | 'sorting' | 'calculation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
}

export interface RealWorldExample {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  keyLearning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticalActivity {
  name: string;
  description: string;
  steps: string[];
  deliverable: string;
}

export const privateEquityLessons: PrivateEquityLessonContent[] = [
  {
    id: 'pe-level-1',
    level: 1,
    title: 'Introduction to Private Equity',
    description: 'Understanding the fundamentals of private equity and how it differs from public markets',
    objectives: [
      'Define private equity and understand its role in the financial ecosystem',
      'Distinguish between private equity and other investment types',
      'Identify the key players in the private equity industry',
      'Understand the basic structure of private equity funds'
    ],
    keyTerms: [
      'private_equity',
      'general_partner',
      'limited_partner',
      'fund_structure',
      'committed_capital',
      'dry_powder'
    ],
    miniGames: [
      {
        id: 'pe-basics-matching',
        name: 'Private Equity Fundamentals Match',
        description: 'Match private equity terms with their correct definitions to build your foundation knowledge',
        type: 'matching',
        difficulty: 'beginner',
        xpReward: 50
      },
      {
        id: 'fund-structure-builder',
        name: 'Build a PE Fund Structure',
        description: 'Interactive game where you build a complete private equity fund structure by placing the right components',
        type: 'scenario',
        difficulty: 'beginner',
        xpReward: 75
      }
    ],
    realWorldExamples: [
      {
        id: 'blackstone-formation',
        title: 'The Formation of Blackstone',
        company: 'Blackstone Group',
        year: '1985',
        description: 'Stephen Schwarzman and Peter Peterson founded Blackstone with $400,000 of their own money. They started by focusing on mergers and acquisitions advisory before expanding into private equity. Today, Blackstone manages over $1 trillion in assets.',
        keyLearning: 'Private equity firms often start small but can grow significantly by building strong track records and investor relationships.',
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'pe-definition',
          question: 'What is the primary characteristic that distinguishes private equity from public equity?',
          options: [
            'Private equity involves publicly traded companies only',
            'Private equity investments are made in private companies or public companies taken private',
            'Private equity is only for individual investors',
            'Private equity has no risk involved'
          ],
          correctAnswer: 1,
          explanation: 'Private equity involves investing in private companies or taking public companies private, unlike public equity which trades on public markets.',
          difficulty: 'beginner'
        },
        {
          id: 'gp-lp-roles',
          question: 'In a private equity fund structure, what is the role of the General Partner (GP)?',
          options: [
            'Provides all the capital for investments',
            'Makes investment decisions and manages the fund',
            'Only invests in public companies',
            'Guarantees returns to investors'
          ],
          correctAnswer: 1,
          explanation: 'The General Partner makes investment decisions, manages the fund operations, and is responsible for the day-to-day management of investments.',
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: 'Private Equity Fund Research',
      description: 'Research and analyze a real private equity fund to understand its structure and investment strategy',
      steps: [
        'Choose a well-known private equity firm (e.g., KKR, Blackstone, Apollo)',
        'Research their latest fund: size, target investments, and strategy',
        'Identify the key team members and their backgrounds',
        'Find information about their investment process and criteria',
        'Look up one recent deal they completed and analyze the rationale'
      ],
      deliverable: 'A one-page summary of the PE firm, their fund structure, and investment approach with one example deal'
    },
    estimatedTime: '45 minutes',
    difficulty: 'beginner'
  },
  {
    id: 'pe-level-2',
    level: 2,
    title: 'Investment Strategies & Deal Types',
    description: 'Exploring different private equity investment strategies and transaction structures',
    objectives: [
      'Understand the main types of private equity strategies (buyout, growth, venture)',
      'Learn about different deal structures and their applications',
      'Analyze the risk-return profiles of various PE strategies',
      'Identify how PE firms create value in their investments'
    ],
    keyTerms: [
      'leveraged_buyout',
      'growth_equity',
      'venture_capital',
      'management_buyout',
      'add_on_acquisition',
      'platform_company'
    ],
    miniGames: [
      {
        id: 'strategy-selector',
        name: 'PE Strategy Detective',
        description: 'Analyze company profiles and determine the best private equity strategy for each situation',
        type: 'scenario',
        difficulty: 'intermediate',
        xpReward: 75
      },
      {
        id: 'deal-structure-puzzle',
        name: 'Deal Structure Puzzle',
        description: 'Build the optimal deal structure by arranging debt, equity, and management components',
        type: 'sorting',
        difficulty: 'intermediate',
        xpReward: 100
      }
    ],
    realWorldExamples: [
      {
        id: 'kkr-rjr-nabisco',
        title: 'KKR\'s RJR Nabisco Buyout',
        company: 'RJR Nabisco',
        year: '1989',
        description: 'KKR completed the largest leveraged buyout in history at the time, acquiring RJR Nabisco for $31.1 billion. The deal used significant leverage and became famous through the book "Barbarians at the Gate."',
        keyLearning: 'Large leveraged buyouts can create significant value but also carry substantial risk due to high debt levels.',
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'lbo-definition',
          question: 'What is the key characteristic of a leveraged buyout (LBO)?',
          options: [
            'No debt is used in the transaction',
            'The acquisition is financed primarily with debt',
            'Only management can participate',
            'The company must be public'
          ],
          correctAnswer: 1,
          explanation: 'A leveraged buyout uses significant amounts of debt (leverage) to finance the acquisition of a company.',
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: 'Deal Strategy Analysis',
      description: 'Analyze a real private equity deal and determine the strategy and value creation plan',
      steps: [
        'Find a recent private equity transaction announcement',
        'Identify the PE strategy used (buyout, growth, etc.)',
        'Research the target company\'s characteristics',
        'Analyze the deal rationale and value creation thesis',
        'Assess the potential risks and opportunities'
      ],
      deliverable: 'A strategic analysis presentation outlining the deal rationale, strategy, and value creation plan'
    },
    estimatedTime: '60 minutes',
    difficulty: 'intermediate'
  },
  {
    id: 'pe-level-3',
    level: 3,
    title: 'Due Diligence & Valuation',
    description: 'Master the due diligence process and valuation methodologies used in private equity',
    objectives: [
      'Understand the comprehensive due diligence process',
      'Learn key valuation methodologies for private companies',
      'Identify critical risk factors and red flags',
      'Analyze management teams and operational capabilities'
    ],
    keyTerms: [
      'due_diligence',
      'dcf_valuation',
      'comparable_company_analysis',
      'management_presentation',
      'quality_of_earnings',
      'synergies'
    ],
    miniGames: [
      {
        id: 'dd-checklist',
        name: 'Due Diligence Detective',
        description: 'Navigate through a virtual due diligence process, identifying key issues and opportunities',
        type: 'scenario',
        difficulty: 'advanced',
        xpReward: 100
      },
      {
        id: 'valuation-calculator',
        name: 'Valuation Master',
        description: 'Calculate company valuations using different methodologies and compare results',
        type: 'calculation',
        difficulty: 'advanced',
        xpReward: 125
      }
    ],
    realWorldExamples: [
      {
        id: 'apollo-intel-deal',
        title: 'Apollo\'s Intel Mobileye Acquisition',
        company: 'Mobileye',
        year: '2022',
        description: 'Apollo Global Management led the acquisition of Mobileye from Intel for $15.3 billion. The deal required extensive due diligence on autonomous driving technology and market potential.',
        keyLearning: 'Technology deals require specialized due diligence focusing on intellectual property, market position, and future development capabilities.',
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'dd-process',
          question: 'What is the primary purpose of due diligence in private equity?',
          options: [
            'To negotiate the lowest price possible',
            'To verify information and identify risks and opportunities',
            'To replace management immediately',
            'To prepare for an immediate exit'
          ],
          correctAnswer: 1,
          explanation: 'Due diligence helps verify information provided by the seller and identify potential risks and value creation opportunities.',
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: 'Company Valuation Exercise',
      description: 'Perform a comprehensive valuation of a target company using multiple methodologies',
      steps: [
        'Select a private company or recent PE target',
        'Gather financial statements and market data',
        'Build a DCF model with assumptions',
        'Perform comparable company analysis',
        'Identify key value drivers and risks',
        'Present valuation range and investment thesis'
      ],
      deliverable: 'Complete valuation model with executive summary and investment recommendation'
    },
    estimatedTime: '90 minutes',
    difficulty: 'advanced'
  },
  {
    id: 'pe-level-4',
    level: 4,
    title: 'Value Creation & Portfolio Management',
    description: 'Learn how private equity firms create value and manage their portfolio companies',
    objectives: [
      'Understand the levers of value creation in private equity',
      'Learn about operational improvements and strategic initiatives',
      'Analyze the role of management in value creation',
      'Explore portfolio monitoring and governance practices'
    ],
    keyTerms: [
      'value_creation',
      'operational_improvements',
      'strategic_initiatives',
      'portfolio_monitoring',
      'board_governance',
      'key_performance_indicators'
    ],
    miniGames: [
      {
        id: 'value-creation-simulator',
        name: 'Value Creation Simulator',
        description: 'Manage a portfolio company and implement various value creation strategies to maximize returns',
        type: 'scenario',
        difficulty: 'advanced',
        xpReward: 150
      }
    ],
    realWorldExamples: [
      {
        id: 'bain-dominos',
        title: 'Bain Capital\'s Domino\'s Transformation',
        company: 'Domino\'s Pizza',
        year: '1998-2004',
        description: 'Bain Capital acquired Domino\'s and implemented significant operational improvements including technology upgrades, supply chain optimization, and international expansion.',
        keyLearning: 'Operational improvements and strategic initiatives can dramatically transform a company\'s performance and value.',
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'value-creation-levers',
          question: 'Which of the following is NOT typically a primary value creation lever in private equity?',
          options: [
            'Operational improvements',
            'Strategic initiatives',
            'Financial engineering',
            'Immediate dividend recaps'
          ],
          correctAnswer: 3,
          explanation: 'While financial engineering is used, sustainable value creation focuses more on operational improvements and strategic initiatives rather than immediate dividend recaps.',
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: 'Value Creation Plan Development',
      description: 'Develop a comprehensive 100-day value creation plan for a portfolio company',
      steps: [
        'Analyze current company performance and challenges',
        'Identify 3-5 key value creation opportunities',
        'Develop implementation timeline and milestones',
        'Define success metrics and KPIs',
        'Create governance and monitoring framework'
      ],
      deliverable: '100-day value creation plan with clear initiatives, timelines, and success metrics'
    },
    estimatedTime: '75 minutes',
    difficulty: 'advanced'
  },
  {
    id: 'pe-level-5',
    level: 5,
    title: 'Exit Strategies & Returns',
    description: 'Understanding how private equity firms exit investments and generate returns',
    objectives: [
      'Learn about different exit strategies and their timing',
      'Understand how to prepare companies for exit',
      'Analyze return metrics and performance measurement',
      'Explore the factors that drive successful exits'
    ],
    keyTerms: [
      'exit_strategy',
      'ipo_process',
      'strategic_sale',
      'secondary_buyout',
      'irr_calculation',
      'multiple_of_money'
    ],
    miniGames: [
      {
        id: 'exit-timing-game',
        name: 'Exit Timing Master',
        description: 'Decide the optimal timing and method for exiting various portfolio investments',
        type: 'scenario',
        difficulty: 'advanced',
        xpReward: 125
      }
    ],
    realWorldExamples: [
      {
        id: 'kkr-dollar-general',
        title: 'KKR\'s Dollar General Exit',
        company: 'Dollar General',
        year: '2013',
        description: 'KKR sold its stake in Dollar General through a combination of IPO and secondary offerings, generating over $1 billion in profits on a $1.3 billion investment.',
        keyLearning: 'Successful exits require careful timing, market conditions analysis, and proper company preparation.',
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'exit-strategies',
          question: 'What is typically the most common exit strategy for private equity investments?',
          options: [
            'Initial Public Offering (IPO)',
            'Strategic sale to corporate buyer',
            'Secondary buyout to another PE firm',
            'Management buyback'
          ],
          correctAnswer: 1,
          explanation: 'Strategic sales to corporate buyers are typically the most common exit route, often providing the highest valuations.',
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: 'Exit Strategy Analysis',
      description: 'Analyze different exit options for a portfolio company and recommend the optimal path',
      steps: [
        'Assess company readiness for exit',
        'Evaluate market conditions and timing',
        'Compare IPO vs strategic sale vs secondary buyout',
        'Identify potential buyers or public market comparables',
        'Calculate expected returns under each scenario'
      ],
      deliverable: 'Exit strategy recommendation with financial projections and risk analysis'
    },
    estimatedTime: '60 minutes',
    difficulty: 'advanced'
  },
  {
    id: 'pe-level-6',
    level: 6,
    title: 'Fund Management & Investor Relations',
    description: 'Learn about private equity fund operations and managing investor relationships',
    objectives: [
      'Understand fund lifecycle and management processes',
      'Learn about investor relations and reporting requirements',
      'Explore fund performance measurement and benchmarking',
      'Analyze the regulatory environment and compliance'
    ],
    keyTerms: [
      'fund_lifecycle',
      'investor_relations',
      'capital_calls',
      'distributions',
      'fund_performance',
      'benchmark_comparison'
    ],
    miniGames: [
      {
        id: 'fund-manager-sim',
        name: 'Fund Manager Simulator',
        description: 'Manage a complete fund lifecycle from fundraising through distributions',
        type: 'scenario',
        difficulty: 'advanced',
        xpReward: 150
      }
    ],
    realWorldExamples: [
      {
        id: 'carlyle-fundraising',
        title: 'Carlyle\'s Record Fundraising',
        company: 'Carlyle Group',
        year: '2021',
        description: 'Carlyle raised $27 billion across multiple funds in 2021, demonstrating strong investor confidence and effective investor relations.',
        keyLearning: 'Strong fund performance and investor relations are crucial for successful fundraising and long-term success.',
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'fund-lifecycle',
          question: 'During which phase of the fund lifecycle do private equity firms typically make most of their investments?',
          options: [
            'Fundraising phase',
            'Investment phase',
            'Harvesting phase',
            'Distribution phase'
          ],
          correctAnswer: 1,
          explanation: 'The investment phase is when PE firms deploy capital and make most of their investments, typically in the first 3-5 years of the fund.',
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: 'Investor Presentation Development',
      description: 'Create a quarterly investor presentation for a private equity fund',
      steps: [
        'Analyze fund performance metrics and benchmarks',
        'Summarize portfolio company updates and value creation',
        'Present recent investments and exits',
        'Discuss market outlook and strategy updates',
        'Prepare responses to common investor questions'
      ],
      deliverable: 'Professional investor presentation with performance summary and portfolio updates'
    },
    estimatedTime: '75 minutes',
    difficulty: 'advanced'
  },
  {
    id: 'pe-level-7',
    level: 7,
    title: 'Advanced Topics & Future Trends',
    description: 'Explore cutting-edge topics and future trends in private equity',
    objectives: [
      'Understand emerging trends in private equity',
      'Learn about ESG considerations and impact investing',
      'Explore technology\'s role in modern PE operations',
      'Analyze global private equity markets and opportunities'
    ],
    keyTerms: [
      'esg_investing',
      'impact_investing',
      'technology_disruption',
      'global_pe_markets',
      'regulatory_changes',
      'market_evolution'
    ],
    miniGames: [
      {
        id: 'future-trends-analyzer',
        name: 'PE Future Trends Analyzer',
        description: 'Analyze emerging trends and their potential impact on private equity strategies',
        type: 'scenario',
        difficulty: 'advanced',
        xpReward: 200
      }
    ],
    realWorldExamples: [
      {
        id: 'tpg-esg-focus',
        title: 'TPG\'s ESG Integration',
        company: 'TPG Inc.',
        year: '2022',
        description: 'TPG became one of the first major PE firms to go public with a strong focus on ESG integration across all investments, raising over $1 billion for impact investing.',
        keyLearning: 'ESG considerations are becoming central to private equity investment decisions and value creation strategies.',
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'esg-importance',
          question: 'Why are ESG (Environmental, Social, Governance) factors becoming increasingly important in private equity?',
          options: [
            'They are required by law in all jurisdictions',
            'They can drive long-term value creation and risk mitigation',
            'They only matter for public companies',
            'They are just a marketing trend'
          ],
          correctAnswer: 1,
          explanation: 'ESG factors are increasingly recognized as drivers of long-term value creation and important for risk management in investments.',
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: 'Future of PE Strategy Paper',
      description: 'Write a strategic analysis of how private equity will evolve over the next decade',
      steps: [
        'Research current trends affecting the PE industry',
        'Analyze regulatory and market changes',
        'Identify technology impacts and opportunities',
        'Assess ESG and impact investing growth',
        'Develop predictions for industry evolution'
      ],
      deliverable: 'Strategic white paper on the future of private equity with actionable insights'
    },
    estimatedTime: '90 minutes',
    difficulty: 'advanced'
  }
];