import React from 'react';
import { 
  Landmark, 
  Briefcase, 
  CreditCard, 
  Handshake, 
  Users, 
  Home, 
  TrendingUp, 
  Building2, 
  DollarSign,
  Rocket,
  BarChart3,
  Shield,
  PieChart,
  Target
} from 'lucide-react';

export interface CareerLevel {
  id: number;
  title: string;
  description: string;
  points: string[];
  isCompleted?: boolean;
  isActive?: boolean;
}

export interface CareerVideo {
  id: string;
  title: string;
  speaker: 'intern' | 'professional' | 'professor';
  duration: string;
  description: string;
  thumbnailUrl?: string;
}

export interface FinanceCareerData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  levels: CareerLevel[];
  videos: CareerVideo[];
  category: 'sell-side' | 'buy-side' | 'advisory' | 'corporate';
  kidFriendlyDescription: string;
}

export const financeCareerData: FinanceCareerData[] = [
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    description: 'Help companies raise capital and execute strategic transactions',
    kidFriendlyDescription: 'Help companies get money and make big business deals happen! 💼',
    category: 'sell-side',
    icon: Building2,
    color: 'from-blue-500 to-indigo-600',
    levels: [
      {
        id: 1,
        title: 'What is Investment Banking?',
        description: 'Understanding the fundamentals of investment banking',
        points: [
          'Definition and role in financial markets',
          'Key services: M&A, underwriting, trading',
          'Major investment banks and their specialties',
          'Career paths and progression'
        ]
      },
      {
        id: 2,
        title: 'Investment Banking Process',
        description: 'How investment banks operate and serve clients',
        points: [
          'Deal flow and client relationships',
          'Pitching and proposal development',
          'Due diligence and valuation methods',
          'Transaction execution and closing'
        ]
      },
      {
        id: 3,
        title: 'Financial Modeling & Analysis',
        description: 'Core technical skills for investment banking',
        points: [
          'Excel modeling fundamentals',
          'Valuation methodologies (DCF, Comps)',
          'LBO and M&A models',
          'Presentation and communication skills'
        ]
      },
      {
        id: 4,
        title: 'Deal Types & Structures',
        description: 'Different types of investment banking transactions',
        points: [
          'Mergers and acquisitions',
          'Equity and debt underwriting',
          'Restructuring and special situations',
          'Strategic advisory services'
        ]
      },
      {
        id: 5,
        title: 'Industry Sectors & Specialization',
        description: 'Sector coverage and industry expertise',
        points: [
          'Technology, healthcare, financial services',
          'Energy, industrials, consumer goods',
          'Cross-border and emerging markets',
          'Regulatory considerations'
        ]
      },
      {
        id: 6,
        title: 'Career Development',
        description: 'Building a successful investment banking career',
        points: [
          'Analyst to associate progression',
          'Exit opportunities and transitions',
          'Networking and relationship building',
          'Work-life balance and compensation'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics',
        description: 'Cutting-edge developments in investment banking',
        points: [
          'Fintech and digital transformation',
          'ESG and sustainable finance',
          'Cryptocurrency and blockchain',
          'Market trends and future outlook'
        ]
      }
    ],
    videos: [
      {
        id: 'ib-intern-overview',
        speaker: 'intern',
        title: 'Life as an Investment Banking Intern',
        description: 'Day-to-day experience of a summer analyst at a bulge bracket bank',
        duration: '8:30'
      },
      {
        id: 'ib-associate-deals',
        speaker: 'professional', 
        title: 'Managing Director Insights',
        description: 'Career progression, client relationships, and deal leadership',
        duration: '12:15'
      },
      {
        id: 'ib-professor-industry',
        speaker: 'professor',
        title: 'The Evolution of Investment Banking',
        description: 'Academic perspective on industry changes and future trends',
        duration: '15:45'
      }
    ]
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    description: 'Invest in and transform private companies to generate superior returns',
    kidFriendlyDescription: 'Buy companies, make them better, and sell them for profit! 📈',
    category: 'buy-side',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-600',
    levels: [
      {
        id: 1,
        title: 'Introduction to Private Equity',
        description: 'Understanding the fundamentals of private equity and how it differs from public markets',
        points: [
          'What is private equity and how it works',
          'General Partners vs Limited Partners',
          'Fund structure and committed capital',
          'Basic investment strategies and timeline'
        ]
      },
      {
        id: 2,
        title: 'Investment Strategies & Deal Types',
        description: 'Exploring different private equity investment strategies and transaction structures',
        points: [
          'Leveraged buyouts (LBOs) and their mechanics',
          'Growth equity vs venture capital',
          'Management buyouts and add-on acquisitions',
          'Platform companies and roll-up strategies'
        ]
      },
      {
        id: 3,
        title: 'Due Diligence & Valuation',
        description: 'Master the due diligence process and valuation methodologies used in private equity',
        points: [
          'Comprehensive due diligence process',
          'DCF and comparable company analysis',
          'Quality of earnings assessments',
          'Management team evaluation and risk assessment'
        ]
      },
      {
        id: 4,
        title: 'Value Creation & Portfolio Management',
        description: 'Learn how private equity firms create value and manage their portfolio companies',
        points: [
          'Operational improvements and efficiency gains',
          'Strategic initiatives and market expansion',
          'Board governance and portfolio monitoring',
          'Key performance indicators and reporting'
        ]
      },
      {
        id: 5,
        title: 'Exit Strategies & Returns',
        description: 'Understanding how private equity firms exit investments and generate returns',
        points: [
          'IPO process and public market exits',
          'Strategic sales to corporate buyers',
          'Secondary buyouts to other PE firms',
          'IRR calculations and performance metrics'
        ]
      },
      {
        id: 6,
        title: 'Fund Management & Investor Relations',
        description: 'Learn about private equity fund operations and managing investor relationships',
        points: [
          'Fund lifecycle and capital deployment',
          'Limited partner relations and reporting',
          'Capital calls and distribution timing',
          'Fund performance and benchmark comparison'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics & Future Trends',
        description: 'Explore cutting-edge topics and future trends in private equity',
        points: [
          'ESG investing and impact considerations',
          'Technology disruption in PE operations',
          'Global markets and emerging opportunities',
          'Regulatory changes and market evolution'
        ]
      }
    ],
    videos: [
      {
        id: 'pe-intern-overview',
        speaker: 'intern',
        title: 'My Summer as a Private Equity Intern',
        description: 'A recent intern shares their experience working at a mid-market PE fund',
        duration: '8:30'
      },
      {
        id: 'pe-associate-deals',
        speaker: 'professional',
        title: 'Deal Execution: From LOI to Close',
        description: 'An associate walks through the complete deal process',
        duration: '12:15'
      },
      {
        id: 'pe-vp-value-creation',
        speaker: 'professional',
        title: 'Value Creation Strategies That Work',
        description: 'A VP discusses successful portfolio company transformations',
        duration: '15:20'
      },
      {
        id: 'pe-professor-industry',
        speaker: 'professor',
        title: 'The Evolution of Private Equity',
        description: 'Academic perspective on how the industry has changed and future trends',
        duration: '18:45'
      }
    ]
  },
  {
    id: 'management-consulting',
    name: 'Management Consulting',
    description: 'Advise executives on strategy, operations, and organizational transformation',
    kidFriendlyDescription: 'Be a business detective and help companies solve their biggest problems! 🔍',
    category: 'advisory',
    icon: Users,
    color: 'from-purple-500 to-violet-600',
    levels: [
      {
        id: 1,
        title: 'Consulting Foundations',
        description: 'Discover the world of management consulting and learn how consultants help businesses solve their biggest challenges',
        points: [
          'What management consultants do and client types',
          'Top-tier firms: McKinsey, BCG, Bain and others',
          'Service lines: strategy, operations, technology',
          'Career progression from analyst to partner'
        ]
      },
      {
        id: 2,
        title: 'Problem-Solving Fundamentals',
        description: 'Master the structured thinking and problem-solving frameworks that form the backbone of effective consulting',
        points: [
          'MECE principle and issue trees',
          'Business case frameworks and applications',
          'Data gathering and hypothesis testing',
          'Recommendation development and storytelling'
        ]
      },
      {
        id: 3,
        title: 'Strategic Analysis',
        description: 'Learn powerful strategic frameworks used by top consulting firms to analyze competitive environments and develop winning strategies',
        points: [
          'Porter\'s Five Forces and industry analysis',
          'BCG Matrix for portfolio management',
          'Value chain analysis for competitive advantage',
          'SWOT analysis and market sizing'
        ]
      },
      {
        id: 4,
        title: 'Operations Excellence',
        description: 'Learn how to optimize business processes, reduce costs, and improve operational efficiency using proven consulting methodologies',
        points: [
          'Process optimization and lean methodology',
          'KPI design and performance management',
          'Cost reduction strategies that maintain quality',
          'Benchmarking techniques for improvement'
        ]
      },
      {
        id: 5,
        title: 'Digital Transformation',
        description: 'Navigate the complexities of digital transformation and help organizations adapt to the digital age through technology and cultural change',
        points: [
          'Digital transformation strategy and implementation',
          'Agile methodology principles for change',
          'Automation opportunities and approaches',
          'Data analytics for business insights'
        ]
      },
      {
        id: 6,
        title: 'Change Management',
        description: 'Master the art of organizational change and learn how to successfully guide companies through complex transformations',
        points: [
          'Change management strategies and implementation',
          'Stakeholder analysis and engagement',
          'Organizational design principles',
          'Culture transformation initiatives'
        ]
      },
      {
        id: 7,
        title: 'Strategic Leadership',
        description: 'Develop senior-level consulting skills to advise executives and boards on transformational strategy and leadership challenges',
        points: [
          'Strategic planning for competitive advantage',
          'Scenario planning for uncertain futures',
          'Executive presence and thought leadership',
          'Board-level advisory and governance'
        ]
      }
    ],
    videos: [
      {
        id: 'mc-intern-overview',
        speaker: 'intern',
        title: 'Summer at McKinsey: An Intern\'s Journey',
        description: 'Real experience of a summer intern at a top consulting firm',
        duration: '9:15'
      },
      {
        id: 'mc-consultant-cases',
        speaker: 'professional',
        title: 'Leading Complex Client Engagements',
        description: 'Senior consultant shares insights on managing large projects',
        duration: '13:30'
      },
      {
        id: 'mc-partner-strategy',
        speaker: 'professional',
        title: 'Building a Consulting Practice',
        description: 'Partner discusses client development and firm leadership',
        duration: '16:45'
      }
    ]
  },
  {
    id: 'hedge-funds',
    name: 'Hedge Funds',
    description: 'Generate absolute returns through sophisticated investment strategies',
    kidFriendlyDescription: 'Use smart strategies to make money in any market condition! 🎯',
    category: 'buy-side',
    icon: TrendingUp,
    color: 'from-red-500 to-rose-600',
    levels: [
      {
        id: 1,
        title: 'Hedge Fund Fundamentals',
        description: 'Understanding hedge fund structure and objectives',
        points: [
          'Fund structure and fee arrangements (2 and 20)',
          'Absolute vs relative return strategies',
          'Investor types and capital requirements',
          'Regulatory environment and compliance'
        ]
      },
      {
        id: 2,
        title: 'Investment Strategies',
        description: 'Core hedge fund investment approaches',
        points: [
          'Long/short equity and market neutral',
          'Event-driven and merger arbitrage',
          'Macro and currency trading strategies',
          'Quantitative and algorithmic trading'
        ]
      },
      {
        id: 3,
        title: 'Research & Analysis',
        description: 'Investment research and idea generation',
        points: [
          'Fundamental analysis and financial modeling',
          'Technical analysis and market timing',
          'Alternative data sources and insights',
          'Thesis development and conviction building'
        ]
      },
      {
        id: 4,
        title: 'Risk Management',
        description: 'Portfolio risk control and management',
        points: [
          'Position sizing and concentration limits',
          'Hedging strategies and correlation analysis',
          'Stress testing and scenario analysis',
          'Real-time risk monitoring systems'
        ]
      },
      {
        id: 5,
        title: 'Trading & Execution',
        description: 'Trade execution and market operations',
        points: [
          'Order management and execution algorithms',
          'Prime brokerage relationships',
          'Market microstructure and liquidity',
          'Cost analysis and transaction optimization'
        ]
      },
      {
        id: 6,
        title: 'Performance & Operations',
        description: 'Fund operations and performance measurement',
        points: [
          'NAV calculation and fund accounting',
          'Performance attribution and analytics',
          'Investor reporting and transparency',
          'Operational due diligence requirements'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics',
        description: 'Emerging trends and sophisticated strategies',
        points: [
          'Machine learning and AI in trading',
          'ESG integration and impact investing',
          'Cryptocurrency and digital assets',
          'Regulatory changes and market evolution'
        ]
      }
    ],
    videos: [
      {
        id: 'hf-analyst-research',
        speaker: 'professional',
        title: 'Equity Research at a Long/Short Fund',
        description: 'Analyst explains the research process and idea generation',
        duration: '11:20'
      },
      {
        id: 'hf-pm-strategy',
        speaker: 'professional',
        title: 'Portfolio Management Insights',
        description: 'Portfolio manager discusses strategy and risk management',
        duration: '14:15'
      },
      {
        id: 'hf-founder-journey',
        speaker: 'professional',
        title: 'Starting a Hedge Fund',
        description: 'Fund founder shares the entrepreneurial journey',
        duration: '18:30'
      }
    ]
  },
  {
    id: 'venture-capital',
    name: 'Venture Capital',
    description: 'Fund and guide early-stage companies with high growth potential',
    kidFriendlyDescription: 'Find and support the next big startup that could change the world! 🚀',
    category: 'buy-side',
    icon: Rocket,
    color: 'from-green-500 to-teal-600',
    levels: [
      {
        id: 1,
        title: 'Venture Capital Ecosystem',
        description: 'Understanding the startup funding landscape',
        points: [
          'VC fund structure and investment timeline',
          'Startup lifecycle: seed to exit',
          'Angel investors, accelerators, and corporate VC',
          'Geographic hubs and sector focus areas'
        ]
      },
      {
        id: 2,
        title: 'Deal Sourcing & Evaluation',
        description: 'Finding and assessing investment opportunities',
        points: [
          'Network building and relationship development',
          'Pitch deck evaluation and initial screening',
          'Market sizing and competitive analysis',
          'Technology and business model assessment'
        ]
      },
      {
        id: 3,
        title: 'Due Diligence Process',
        description: 'Comprehensive startup evaluation methodology',
        points: [
          'Management team assessment and references',
          'Financial analysis and unit economics',
          'Technical and product due diligence',
          'Legal structure and intellectual property'
        ]
      },
      {
        id: 4,
        title: 'Investment Decision Making',
        description: 'Structuring deals and investment terms',
        points: [
          'Valuation methods for early-stage companies',
          'Term sheet negotiation and key provisions',
          'Board composition and governance rights',
          'Anti-dilution and liquidation preferences'
        ]
      },
      {
        id: 5,
        title: 'Portfolio Support & Value Add',
        description: 'Supporting portfolio companies post-investment',
        points: [
          'Strategic guidance and mentorship',
          'Talent recruitment and team building',
          'Customer and partnership introductions',
          'Operational support and best practices'
        ]
      },
      {
        id: 6,
        title: 'Exit Strategies & Returns',
        description: 'Achieving successful portfolio company exits',
        points: [
          'IPO readiness and public market preparation',
          'Strategic acquisition processes',
          'Secondary sales and liquidity events',
          'Portfolio construction and return optimization'
        ]
      },
      {
        id: 7,
        title: 'Industry Trends & Future',
        description: 'Emerging sectors and investment themes',
        points: [
          'Deep tech, biotech, and frontier technologies',
          'Fintech, healthtech, and vertical SaaS',
          'Climate tech and sustainability investing',
          'Global expansion and emerging markets'
        ]
      }
    ],
    videos: [
      {
        id: 'vc-associate-sourcing',
        speaker: 'professional',
        title: 'Deal Sourcing and Evaluation',
        description: 'Associate explains how VCs find and assess startups',
        duration: '10:45'
      },
      {
        id: 'vc-principal-diligence',
        speaker: 'professional',
        title: 'Deep Dive: Due Diligence Process',
        description: 'Principal walks through a real investment decision',
        duration: '15:20'
      },
      {
        id: 'vc-partner-portfolio',
        speaker: 'professional',
        title: 'Building Billion-Dollar Companies',
        description: 'Partner shares insights on portfolio company growth',
        duration: '17:10'
      }
    ]
  },
  {
    id: 'commercial-banking',
    name: 'Commercial Banking',
    description: 'Provide financial services to businesses and institutional clients',
    kidFriendlyDescription: 'Help businesses manage their money and grow! 🏦',
    category: 'sell-side',
    icon: Landmark,
    color: 'from-blue-500 to-cyan-600',
    levels: [
      {
        id: 1,
        title: 'Commercial Banking Overview',
        description: 'Understanding commercial banking services and clients',
        points: [
          'Commercial vs retail banking differences',
          'Client segments: SME, mid-market, large corporate',
          'Core products: lending, deposits, treasury services',
          'Regulatory environment and compliance requirements'
        ]
      },
      {
        id: 2,
        title: 'Credit Analysis & Underwriting',
        description: 'Evaluating creditworthiness and loan structures',
        points: [
          'Financial statement analysis and ratios',
          'Cash flow modeling and debt capacity',
          'Collateral evaluation and security structures',
          'Industry and business risk assessment'
        ]
      },
      {
        id: 3,
        title: 'Relationship Management',
        description: 'Building and maintaining client relationships',
        points: [
          'Client needs assessment and solution development',
          'Cross-selling and revenue optimization',
          'Regular client reviews and covenant monitoring',
          'Problem loan workout and restructuring'
        ]
      },
      {
        id: 4,
        title: 'Treasury & Cash Management',
        description: 'Corporate treasury and payment solutions',
        points: [
          'Working capital and liquidity management',
          'International trade and foreign exchange',
          'Payment systems and digital banking',
          'Interest rate and currency risk hedging'
        ]
      },
      {
        id: 5,
        title: 'Specialized Lending',
        description: 'Asset-based and specialized credit products',
        points: [
          'Asset-based lending and inventory financing',
          'Equipment financing and leasing',
          'Real estate and construction lending',
          'SBA and government-backed programs'
        ]
      },
      {
        id: 6,
        title: 'Risk Management & Compliance',
        description: 'Managing credit and operational risks',
        points: [
          'Portfolio risk monitoring and reporting',
          'Regulatory compliance (Basel III, Dodd-Frank)',
          'Anti-money laundering and KYC requirements',
          'Stress testing and capital allocation'
        ]
      },
      {
        id: 7,
        title: 'Digital Innovation & Future',
        description: 'Technology transformation in commercial banking',
        points: [
          'Digital banking platforms and APIs',
          'Fintech partnerships and competition',
          'Data analytics and AI applications',
          'Open banking and embedded finance'
        ]
      }
    ],
    videos: [
      {
        id: 'cb-rm-overview',
        speaker: 'professional',
        title: 'Life as a Relationship Manager',
        description: 'Day-to-day responsibilities of managing commercial clients',
        duration: '9:30'
      },
      {
        id: 'cb-credit-analysis',
        speaker: 'professional',
        title: 'Credit Decision Process',
        description: 'Credit officer explains loan evaluation and approval',
        duration: '12:45'
      },
      {
        id: 'cb-director-strategy',
        speaker: 'professional',
        title: 'Commercial Banking Strategy',
        description: 'Senior director discusses market trends and competition',
        duration: '14:20'
      }
    ]
  },
  {
    id: 'corporate-finance',
    name: 'Corporate Finance',
    description: 'Manage company finances, investments, and strategic financial decisions',
    kidFriendlyDescription: 'Be the money expert inside a company making smart financial choices! 💰',
    category: 'corporate',
    icon: Building2,
    color: 'from-indigo-500 to-purple-600',
    levels: [
      {
        id: 1,
        title: 'Corporate Finance Fundamentals',
        description: 'Core principles of corporate financial management',
        points: [
          'Financial planning and budgeting processes',
          'Capital structure and cost of capital',
          'Working capital and cash flow management',
          'Financial reporting and analysis'
        ]
      },
      {
        id: 2,
        title: 'Financial Planning & Analysis',
        description: 'Strategic financial planning and performance analysis',
        points: [
          'Annual budgeting and long-range planning',
          'Variance analysis and performance reporting',
          'Financial modeling and scenario planning',
          'Business unit support and decision analysis'
        ]
      },
      {
        id: 3,
        title: 'Capital Allocation & Investment',
        description: 'Investment decision making and capital deployment',
        points: [
          'Capital expenditure evaluation and approval',
          'NPV, IRR, and other investment metrics',
          'Portfolio optimization and resource allocation',
          'Investment committee and governance processes'
        ]
      },
      {
        id: 4,
        title: 'Treasury Management',
        description: 'Managing corporate liquidity and financial risks',
        points: [
          'Cash management and banking relationships',
          'Debt financing and capital markets access',
          'Foreign exchange and interest rate hedging',
          'Credit facilities and debt covenant management'
        ]
      },
      {
        id: 5,
        title: 'M&A and Strategic Finance',
        description: 'Corporate development and strategic transactions',
        points: [
          'Merger and acquisition analysis',
          'Due diligence and integration planning',
          'Joint ventures and strategic partnerships',
          'Divestitures and portfolio optimization'
        ]
      },
      {
        id: 6,
        title: 'Risk Management & Controls',
        description: 'Financial risk identification and mitigation',
        points: [
          'Financial risk assessment and monitoring',
          'Internal controls and SOX compliance',
          'Insurance and risk transfer strategies',
          'Business continuity and contingency planning'
        ]
      },
      {
        id: 7,
        title: 'Advanced Topics & Leadership',
        description: 'Strategic finance leadership and innovation',
        points: [
          'ESG reporting and sustainable finance',
          'Digital transformation and automation',
          'Stakeholder communication and investor relations',
          'Finance organization design and talent development'
        ]
      }
    ],
    videos: [
      {
        id: 'cf-analyst-fp&a',
        speaker: 'professional',
        title: 'FP&A Career Path',
        description: 'Financial analyst explains planning and analysis role',
        duration: '8:45'
      },
      {
        id: 'cf-manager-treasury',
        speaker: 'professional',
        title: 'Corporate Treasury Operations',
        description: 'Treasury manager discusses cash and risk management',
        duration: '11:30'
      },
      {
        id: 'cf-cfo-strategy',
        speaker: 'professional',
        title: 'Strategic Finance Leadership',
        description: 'CFO shares insights on finance strategy and decision making',
        duration: '16:15'
      }
    ]
  },
  {
    id: 'sales-trading',
    name: 'Sales & Trading',
    description: 'Execute trades and provide market insights to institutional clients',
    kidFriendlyDescription: 'Buy and sell stocks super fast and help clients make smart trades! ⚡',
    category: 'sell-side',
    icon: BarChart3,
    color: 'from-orange-500 to-red-600',
    levels: [
      {
        id: 1,
        title: 'Sales & Trading Overview',
        description: 'Understanding the sales and trading division',
        points: [
          'Role of sales and trading in investment banks',
          'Client types: hedge funds, asset managers, corporates',
          'Product coverage: equities, fixed income, commodities',
          'Market making vs agency trading models'
        ]
      },
      {
        id: 2,
        title: 'Market Structure & Operations',
        description: 'How financial markets operate and function',
        points: [
          'Exchange vs OTC trading mechanisms',
          'Order types and execution algorithms',
          'Market microstructure and liquidity provision',
          'Regulatory environment and compliance'
        ]
      },
      {
        id: 3,
        title: 'Trading Strategies & Risk',
        description: 'Core trading approaches and risk management',
        points: [
          'Directional vs relative value trading',
          'Statistical arbitrage and pairs trading',
          'Volatility trading and options strategies',
          'Real-time risk monitoring and limits'
        ]
      },
      {
        id: 4,
        title: 'Client Sales & Coverage',
        description: 'Building relationships and serving institutional clients',
        points: [
          'Client relationship development and management',
          'Trade ideas generation and market insights',
          'Prime brokerage and financing services',
          'Electronic trading and algorithmic solutions'
        ]
      },
      {
        id: 5,
        title: 'Derivatives & Structured Products',
        description: 'Complex financial instruments and structuring',
        points: [
          'Options, futures, and swaps trading',
          'Exotic derivatives and structured notes',
          'Pricing models and Greeks management',
          'Credit derivatives and fixed income trading'
        ]
      },
      {
        id: 6,
        title: 'Technology & Analytics',
        description: 'Trading technology and quantitative analysis',
        points: [
          'Electronic trading platforms and APIs',
          'High-frequency trading and latency optimization',
          'Data analytics and alternative data sources',
          'Machine learning applications in trading'
        ]
      },
      {
        id: 7,
        title: 'Career Development & Future',
        description: 'Building a career in sales and trading',
        points: [
          'Skill development and specialization paths',
          'Compensation structures and performance metrics',
          'Industry evolution and fintech disruption',
          'Transition opportunities to buy-side and fintech'
        ]
      }
    ],
    videos: [
      {
        id: 'st-trader-day',
        speaker: 'professional',
        title: 'A Day in the Life of an Equity Trader',
        description: 'Trader explains daily responsibilities and market dynamics',
        duration: '10:20'
      },
      {
        id: 'st-sales-client',
        speaker: 'professional',
        title: 'Institutional Sales and Client Coverage',
        description: 'Sales professional discusses client relationships',
        duration: '12:10'
      },
      {
        id: 'st-md-division',
        speaker: 'professional',
        title: 'Leading a Trading Desk',
        description: 'Managing director shares leadership insights',
        duration: '15:30'
      }
    ]
  },
  {
    id: 'wealth-management',
    name: 'Wealth Management',
    description: 'Provide comprehensive financial planning and investment services to high-net-worth clients',
    kidFriendlyDescription: 'Help wealthy families protect and grow their money for generations! 🛡️',
    category: 'buy-side',
    icon: Shield,
    color: 'from-emerald-500 to-green-600',
    levels: [
      {
        id: 1,
        title: 'Wealth Management Fundamentals',
        description: 'Understanding wealth management services and clients',
        points: [
          'High-net-worth and ultra-high-net-worth clients',
          'Comprehensive wealth planning approach',
          'Fee structures and service models',
          'Regulatory environment and fiduciary responsibility'
        ]
      },
      {
        id: 2,
        title: 'Financial Planning Process',
        description: 'Holistic financial planning and goal setting',
        points: [
          'Client discovery and needs assessment',
          'Goal setting and priority establishment',
          'Asset allocation and investment policy',
          'Regular planning reviews and adjustments'
        ]
      },
      {
        id: 3,
        title: 'Investment Management',
        description: 'Portfolio construction and investment strategy',
        points: [
          'Modern portfolio theory and diversification',
          'Asset class selection and allocation',
          'Active vs passive investment strategies',
          'Alternative investments and private markets'
        ]
      },
      {
        id: 4,
        title: 'Tax & Estate Planning',
        description: 'Tax optimization and wealth transfer strategies',
        points: [
          'Tax-efficient investment strategies',
          'Estate planning and wealth transfer',
          'Trust structures and generation-skipping',
          'Charitable giving and philanthropic planning'
        ]
      },
      {
        id: 5,
        title: 'Risk Management & Protection',
        description: 'Insurance and risk mitigation strategies',
        points: [
          'Life and disability insurance planning',
          'Property and liability protection',
          'Business succession and key person insurance',
          'Long-term care and health planning'
        ]
      },
      {
        id: 6,
        title: 'Family Dynamics & Governance',
        description: 'Multi-generational wealth management',
        points: [
          'Family governance and communication',
          'Next generation education and preparation',
          'Family office structures and services',
          'Conflict resolution and decision making'
        ]
      },
      {
        id: 7,
        title: 'Advanced Strategies & Trends',
        description: 'Sophisticated planning and emerging trends',
        points: [
          'ESG and impact investing integration',
          'Digital wealth management and robo-advisors',
          'Cryptocurrency and alternative assets',
          'Regulatory changes and industry evolution'
        ]
      }
    ],
    videos: [
      {
        id: 'wm-advisor-client',
        speaker: 'professional',
        title: 'Building Client Relationships',
        description: 'Wealth advisor discusses client service and planning',
        duration: '10:15'
      },
      {
        id: 'wm-pm-portfolio',
        speaker: 'professional',
        title: 'Portfolio Management for HNW Clients',
        description: 'Portfolio manager explains investment approach',
        duration: '13:40'
      },
      {
        id: 'wm-director-practice',
        speaker: 'professional',
        title: 'Building a Wealth Management Practice',
        description: 'Practice director shares business development insights',
        duration: '16:25'
      }
    ]
  },
  {
    id: 'asset-management',
    name: 'Asset Management',
    description: 'Manage investment portfolios and funds for institutional and retail clients',
    kidFriendlyDescription: 'Invest money wisely for lots of different people and organizations! 💼',
    category: 'buy-side',
    icon: PieChart,
    color: 'from-cyan-500 to-blue-600',
    levels: [
      {
        id: 1,
        title: 'Asset Management Industry',
        description: 'Understanding the asset management landscape',
        points: [
          'Active vs passive management strategies',
          'Institutional vs retail client segments',
          'Fee structures and business models',
          'Regulatory environment and fiduciary duty'
        ]
      },
      {
        id: 2,
        title: 'Investment Research & Analysis',
        description: 'Fundamental research and security selection',
        points: [
          'Equity research and company analysis',
          'Fixed income and credit analysis',
          'Quantitative research and factor modeling',
          'ESG integration and sustainable investing'
        ]
      },
      {
        id: 3,
        title: 'Portfolio Construction',
        description: 'Building and managing investment portfolios',
        points: [
          'Asset allocation and strategic positioning',
          'Risk budgeting and portfolio optimization',
          'Benchmark selection and tracking error',
          'Performance attribution and analysis'
        ]
      },
      {
        id: 4,
        title: 'Risk Management',
        description: 'Investment risk monitoring and control',
        points: [
          'Market, credit, and liquidity risk assessment',
          'Stress testing and scenario analysis',
          'Derivatives and hedging strategies',
          'Compliance and investment guidelines'
        ]
      },
      {
        id: 5,
        title: 'Client Relations & Sales',
        description: 'Managing relationships with institutional clients',
        points: [
          'Institutional consultant and client management',
          'Investment presentations and due diligence',
          'Performance reporting and transparency',
          'Business development and asset gathering'
        ]
      },
      {
        id: 6,
        title: 'Operations & Technology',
        description: 'Fund operations and technology systems',
        points: [
          'Trade execution and settlement processes',
          'Fund accounting and NAV calculation',
          'Compliance monitoring and reporting',
          'Technology platforms and data management'
        ]
      },
      {
        id: 7,
        title: 'Industry Evolution & Trends',
        description: 'Future of asset management',
        points: [
          'Passive investing and fee compression',
          'Alternative investments and private markets',
          'Technology disruption and robo-advisors',
          'Regulatory changes and market structure'
        ]
      }
    ],
    videos: [
      {
        id: 'am-analyst-research',
        speaker: 'professional',
        title: 'Equity Research and Analysis',
        description: 'Research analyst explains the investment process',
        duration: '11:10'
      },
      {
        id: 'am-pm-strategy',
        speaker: 'professional',
        title: 'Portfolio Management Insights',
        description: 'Portfolio manager discusses strategy and decision making',
        duration: '14:30'
      },
      {
        id: 'am-cio-outlook',
        speaker: 'professional',
        title: 'Investment Outlook and Strategy',
        description: 'CIO shares market views and investment themes',
        duration: '17:45'
      }
    ]
  }
];

export interface InteractiveCareerData {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  levels: number;
  isInteractive: boolean;
}

export const interactiveFinanceCareers: InteractiveCareerData[] = [
  {
    id: "investment-banking",
    title: "Investment Banking",
    description: "Learn about investment banking through hands-on deal analysis, financial modeling, and client advisory simulations.",
    icon: Building2,
    levels: 7,
    isInteractive: true
  },
  {
    id: "management-consulting",
    title: "Management Consulting",
    description: "Master consulting frameworks, problem-solving methodologies, and strategic thinking through interactive case studies.",
    icon: Users,
    levels: 7,
    isInteractive: true
  },
  {
    id: "private-equity",
    title: "Private Equity",
    description: "Learn about private equity investing, including leveraged buyouts, growth capital, and portfolio company management through hands-on learning modules.",
    icon: TrendingUp,
    levels: 7,
    isInteractive: true
  },
  {
    id: "venture-capital",
    title: "Venture Capital",
    description: "Master venture capital fundamentals, from deal sourcing and due diligence to portfolio management and fund operations through interactive lessons and real-world case studies.",
    icon: Rocket,
    levels: 7,
    isInteractive: true
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Master asset management through interactive lessons covering portfolio construction, risk management, and client relations with hands-on games and quizzes.",
    icon: PieChart,
    levels: 7,
    isInteractive: true
  }
];