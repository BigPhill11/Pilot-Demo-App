export interface ConsultingLessonContent {
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

const level1Lesson: ConsultingLessonContent = {
  level: 1,
  title: "Consulting Foundations",
  description: "Discover the world of management consulting and learn how consultants help businesses solve their biggest challenges",
  theme: "Foundation Building",
  objectives: [
    "Understand what management consulting is and why companies hire consultants",
    "Learn key consulting terminology and concepts",
    "Practice forming hypotheses and gathering insights",
    "Build your first consulting deliverable"
  ],
  terminology: ['management_consulting', 'client', 'engagement', 'hypothesis', 'insights', 'deliverable'],
  keyTerms: ['management_consulting', 'client', 'engagement', 'hypothesis', 'insights'],
  keyQuestions: [
    "What is management consulting?",
    "Why do companies hire consultants?",
    "What is a hypothesis in consulting?",
    "What are insights and why are they important?"
  ],
  miniGames: [
    {
      id: 'consulting-basics-match',
      name: 'Consulting Fundamentals Match',
      description: 'Match consulting terms with their definitions to build your vocabulary',
      xpReward: 50,
      difficulty: 'beginner'
    },
    {
      id: 'client-problem-identifier',
      name: 'Client Problem Identifier',
      description: 'Practice identifying different types of business problems clients bring to consultants',
      xpReward: 75,
      difficulty: 'beginner'
    }
  ],
  realWorldExamples: [
    {
      id: 'mckinsey-digital-transformation-2020',
      title: "McKinsey's Digital Transformation for Retail Giant (2020)",
      company: "Major Retail Chain",
      year: 2020,
      description: "During the COVID-19 pandemic, a major retail chain was struggling with declining in-store sales and needed to rapidly accelerate their digital capabilities. McKinsey & Company was hired to help the client develop a comprehensive digital transformation strategy. The consulting team conducted extensive analysis of customer behavior, evaluated the client's current technology infrastructure, and benchmarked against digital-native competitors. The hypothesis was that the client needed to shift from a store-centric to an omnichannel model. Key insights included the need for improved e-commerce capabilities, better inventory management systems, and enhanced customer data analytics. The final deliverable was a 6-month transformation roadmap that helped the client increase online sales by 300% and successfully navigate the pandemic challenges.",
      keyLearning: "Consultants help companies solve complex problems by forming hypotheses, gathering insights through analysis, and delivering actionable recommendations that drive real business results.",
      difficulty: 'beginner'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-consulting-definition',
        question: 'What is the primary role of management consultants?',
        options: [
          'To run day-to-day operations for companies',
          'To help organizations improve performance through analysis and recommendations',
          'To provide financial loans to businesses',
          'To replace existing company management'
        ],
        correctAnswer: 1,
        explanation: 'Management consultants are external advisors who help organizations improve their performance by analyzing problems and providing strategic recommendations.',
        difficulty: 'beginner'
      },
      {
        id: 'q2-client-relationship',
        question: 'In consulting, what is a "client"?',
        options: [
          'A consulting firm employee',
          'A competitor company',
          'The organization that hires consultants to solve business problems',
          'A software application'
        ],
        correctAnswer: 2,
        explanation: 'A client is the organization that hires consulting services to help solve their business challenges and improve performance.',
        difficulty: 'beginner'
      },
      {
        id: 'q3-hypothesis-purpose',
        question: 'Why do consultants form hypotheses at the beginning of projects?',
        options: [
          'To impress the client with their knowledge',
          'To provide structure and direction for their analysis',
          'To avoid doing detailed research',
          'To guarantee project success'
        ],
        correctAnswer: 1,
        explanation: 'Hypotheses provide a structured starting point for analysis, helping consultants focus their research and testing on the most likely solutions.',
        difficulty: 'beginner'
      },
      {
        id: 'q4-insights-value',
        question: 'What makes an insight valuable in consulting?',
        options: [
          'It contains complex technical jargon',
          'It leads to actionable recommendations that solve client problems',
          'It is based on personal opinions',
          'It confirms what the client already knows'
        ],
        correctAnswer: 1,
        explanation: 'Valuable insights lead to actionable recommendations that help clients solve their problems and improve their business performance.',
        difficulty: 'beginner'
      },
      {
        id: 'q5-deliverable-importance',
        question: 'What is the purpose of a consulting deliverable?',
        options: [
          'To show how much work was done',
          'To provide the client with final outputs and recommendations from the engagement',
          'To create documentation for the consulting firm',
          'To justify the consulting fees'
        ],
        correctAnswer: 1,
        explanation: 'Deliverables are the final work products that provide clients with the insights, recommendations, and tools they need to implement solutions.',
        difficulty: 'beginner'
      }
    ]
  },
  practicalActivity: {
    name: "Your First Client Challenge",
    description: "Practice the consulting approach by working through a simple business problem",
    steps: [
      "Read the client scenario: A local coffee shop is losing customers to a new competitor",
      "Form 2-3 hypotheses about why customers are leaving",
      "List 3 types of information you would gather to test your hypotheses",
      "Draft one key insight based on the scenario",
      "Create a simple one-page recommendation summary"
    ],
    deliverable: "A one-page consulting brief with your hypotheses, information gathering plan, insights, and recommendations"
  }
};

const level2Lesson: ConsultingLessonContent = {
  level: 2,
  title: "Problem-Solving Fundamentals",
  description: "Master the structured thinking and problem-solving frameworks that form the backbone of effective consulting",
  theme: "Analytical Thinking",
  objectives: [
    "Learn to break down complex problems using issue trees",
    "Apply the MECE principle to organize analysis",
    "Practice root cause identification techniques",
    "Understand case interview methodology and frameworks"
  ],
  terminology: ['issue_tree', 'mece', 'root_cause', 'case_interview', 'framework'],
  keyTerms: ['issue_tree', 'mece', 'root_cause', 'framework'],
  keyQuestions: [
    "How do you structure complex business problems?",
    "What is the MECE principle and why is it important?",
    "How do you identify root causes vs. symptoms?",
    "What are consulting frameworks and when do you use them?"
  ],
  miniGames: [
    {
      id: 'issue-tree-builder',
      name: 'Issue Tree Architect',
      description: 'Build comprehensive issue trees by breaking down complex business problems into structured components',
      xpReward: 75,
      difficulty: 'beginner'
    },
    {
      id: 'mece-sorter',
      name: 'MECE Master',
      description: 'Practice organizing information using the MECE principle - Mutually Exclusive, Collectively Exhaustive',
      xpReward: 100,
      difficulty: 'beginner'
    }
  ],
  realWorldExamples: [
    {
      id: 'bcg-cost-reduction-2019',
      title: "BCG's Manufacturing Cost Reduction Project (2019)",
      company: "Global Manufacturing Company",
      year: 2019,
      description: "A global manufacturing company was facing declining margins and needed to reduce costs by 15% within 18 months. BCG was engaged to identify cost reduction opportunities across the organization. The consulting team started by building a comprehensive issue tree that broke down costs into material costs, labor costs, overhead costs, and operational inefficiencies. Using the MECE principle, they ensured each cost category was mutually exclusive with no overlaps. Through detailed analysis, they identified that the root cause wasn't just high costs, but inefficient processes that led to waste. The team used multiple frameworks including value chain analysis and benchmarking to structure their approach. They discovered that 60% of cost savings could come from process optimization rather than just cutting expenses. The final recommendations included lean manufacturing implementation, supplier consolidation, and automation opportunities that achieved 18% cost reduction.",
      keyLearning: "Structured problem-solving using issue trees and MECE principles helps identify root causes and leads to more effective solutions than surface-level analysis.",
      difficulty: 'beginner'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-issue-tree-purpose',
        question: 'What is the primary purpose of an issue tree in consulting?',
        options: [
          'To impress clients with complex diagrams',
          'To break down complex problems into manageable, structured components',
          'To show all possible solutions to a problem',
          'To create visual presentations'
        ],
        correctAnswer: 1,
        explanation: 'Issue trees help consultants systematically break down complex problems into smaller, more manageable parts that can be analyzed individually.',
        difficulty: 'beginner'
      },
      {
        id: 'q2-mece-definition',
        question: 'What does MECE stand for in consulting?',
        options: [
          'Most Effective Consulting Elements',
          'Mutually Exclusive, Collectively Exhaustive',
          'Management Excellence and Client Engagement',
          'Multiple Evaluation Criteria Examination'
        ],
        correctAnswer: 1,
        explanation: 'MECE stands for Mutually Exclusive, Collectively Exhaustive - a principle ensuring no overlaps and no gaps in analysis.',
        difficulty: 'beginner'
      },
      {
        id: 'q3-root-cause-vs-symptom',
        question: 'What\'s the difference between a root cause and a symptom?',
        options: [
          'Root causes are more expensive to fix',
          'Symptoms are the fundamental problems, root causes are the effects',
          'Root causes are the fundamental reasons, symptoms are the visible effects',
          'There is no difference between them'
        ],
        correctAnswer: 2,
        explanation: 'Root causes are the fundamental underlying reasons for problems, while symptoms are the visible effects or manifestations of those problems.',
        difficulty: 'beginner'
      },
      {
        id: 'q4-framework-benefits',
        question: 'Why are frameworks valuable in consulting?',
        options: [
          'They guarantee the right answer',
          'They provide structured approaches to analyze problems consistently',
          'They make consultants look more professional',
          'They reduce the time needed for analysis'
        ],
        correctAnswer: 1,
        explanation: 'Frameworks provide structured, proven approaches that help consultants analyze problems systematically and consistently across different situations.',
        difficulty: 'beginner'
      },
      {
        id: 'q5-case-interview-purpose',
        question: 'What is the main purpose of case interviews in consulting?',
        options: [
          'To test memorization of business facts',
          'To evaluate problem-solving skills and structured thinking under pressure',
          'To assess presentation abilities only',
          'To determine technical expertise'
        ],
        correctAnswer: 1,
        explanation: 'Case interviews evaluate a candidate\'s ability to think structurally, solve problems logically, and communicate effectively under pressure.',
        difficulty: 'beginner'
      }
    ]
  },
  practicalActivity: {
    name: "Build Your First Issue Tree",
    description: "Create a comprehensive issue tree for a real business problem using MECE principles",
    steps: [
      "Choose the problem: A restaurant chain has declining customer satisfaction scores",
      "Create the main problem statement at the top of your issue tree",
      "Break down the problem into 3-4 major MECE categories (e.g., food quality, service, atmosphere, value)",
      "Further break down each major category into specific sub-issues",
      "Review your tree to ensure it follows MECE principles - no overlaps, no gaps",
      "Identify which branches you think are most likely root causes vs. symptoms"
    ],
    deliverable: "A well-structured issue tree diagram with clear MECE categories and identification of potential root causes"
  }
};

const level3Lesson: ConsultingLessonContent = {
  level: 3,
  title: "Strategic Analysis",
  description: "Learn powerful strategic frameworks used by top consulting firms to analyze competitive environments and develop winning strategies",
  theme: "Strategic Thinking",
  objectives: [
    "Master Porter's Five Forces for industry analysis",
    "Apply the BCG Matrix for portfolio management",
    "Understand value chain analysis for competitive advantage",
    "Conduct comprehensive SWOT analysis and market sizing"
  ],
  terminology: ['five_forces', 'bcg_matrix', 'value_chain', 'swot_analysis', 'market_sizing', 'competitive_advantage'],
  keyTerms: ['five_forces', 'bcg_matrix', 'value_chain', 'swot_analysis', 'market_sizing'],
  keyQuestions: [
    "How do you analyze industry attractiveness and competitive dynamics?",
    "When should you use the BCG Matrix vs. other portfolio tools?",
    "How does value chain analysis reveal competitive advantages?",
    "What makes market sizing estimates credible and useful?"
  ],
  miniGames: [
    {
      id: 'five-forces-analyzer',
      name: 'Five Forces Detective',
      description: 'Analyze industry attractiveness by evaluating all five competitive forces that shape profitability',
      xpReward: 100,
      difficulty: 'intermediate'
    },
    {
      id: 'bcg-portfolio-manager',
      name: 'Portfolio Strategy Master',
      description: 'Use the BCG Matrix to categorize business units and develop strategic recommendations',
      xpReward: 125,
      difficulty: 'intermediate'
    }
  ],
  realWorldExamples: [
    {
      id: 'bain-retail-strategy-2021',
      title: "Bain's Retail Strategy Transformation (2021)",
      company: "Global Fashion Retailer",
      year: 2021,
      description: "A global fashion retailer was losing market share to fast-fashion competitors and needed a comprehensive strategy review. Bain & Company conducted a thorough strategic analysis starting with Porter's Five Forces to understand the competitive landscape. They found high supplier power due to limited premium fabric sources, intense rivalry from both traditional and digital-native brands, high threat of substitutes from rental and second-hand markets, moderate buyer power, and low barriers to entry for online brands. Using the BCG Matrix, they analyzed the client's brand portfolio and identified several 'Cash Cows' in mature markets, 'Question Marks' in emerging markets, and 'Dogs' that needed divestiture. Value chain analysis revealed that the client's strength was in design and brand building, but weaknesses in supply chain speed and digital marketing. SWOT analysis confirmed strong brand heritage and customer loyalty as strengths, but highlighted slow adaptation to digital trends as a critical weakness. Market sizing showed the sustainable fashion segment growing at 15% annually. The strategic recommendations included divesting underperforming brands, investing heavily in sustainable materials and production, and accelerating digital transformation.",
      keyLearning: "Strategic frameworks work best when used together to create a comprehensive view of competitive dynamics, internal capabilities, and market opportunities.",
      difficulty: 'intermediate'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-five-forces-components',
        question: 'Which of the following is NOT one of Porter\'s Five Forces?',
        options: [
          'Threat of new entrants',
          'Bargaining power of suppliers',
          'Government regulation',
          'Threat of substitute products'
        ],
        correctAnswer: 2,
        explanation: 'Porter\'s Five Forces include: threat of new entrants, bargaining power of suppliers, bargaining power of buyers, threat of substitutes, and competitive rivalry. Government regulation is an external factor but not one of the five forces.',
        difficulty: 'intermediate'
      },
      {
        id: 'q2-bcg-matrix-quadrants',
        question: 'In the BCG Matrix, what characterizes a "Star" business unit?',
        options: [
          'Low market share, low market growth',
          'High market share, low market growth',
          'High market share, high market growth',
          'Low market share, high market growth'
        ],
        correctAnswer: 2,
        explanation: 'Stars have high market share in high-growth markets. They typically require investment to maintain their position but have strong potential for future cash generation.',
        difficulty: 'intermediate'
      },
      {
        id: 'q3-value-chain-purpose',
        question: 'What is the primary purpose of value chain analysis?',
        options: [
          'To calculate the total cost of products',
          'To identify activities that create competitive advantage and customer value',
          'To map organizational reporting structures',
          'To analyze financial performance'
        ],
        correctAnswer: 1,
        explanation: 'Value chain analysis examines each activity in the business to identify where value is created and where competitive advantages can be developed or strengthened.',
        difficulty: 'intermediate'
      },
      {
        id: 'q4-swot-strategic-use',
        question: 'How should SWOT analysis results be used strategically?',
        options: [
          'Only focus on eliminating weaknesses',
          'Match strengths with opportunities and address weaknesses that threaten key opportunities',
          'Ignore threats if strengths are strong enough',
          'Use it only for internal assessment'
        ],
        correctAnswer: 1,
        explanation: 'Effective SWOT analysis involves matching internal strengths with external opportunities while addressing weaknesses that could prevent capitalizing on opportunities or defending against threats.',
        difficulty: 'intermediate'
      },
      {
        id: 'q5-market-sizing-credibility',
        question: 'What makes a market sizing estimate credible in consulting?',
        options: [
          'Using the most optimistic assumptions',
          'Relying on a single data source',
          'Using logical assumptions and triangulating with multiple approaches',
          'Making round number estimates'
        ],
        correctAnswer: 2,
        explanation: 'Credible market sizing uses logical, defensible assumptions and validates estimates through multiple approaches (top-down, bottom-up, analogies) to increase confidence.',
        difficulty: 'intermediate'
      }
    ]
  },
  practicalActivity: {
    name: "Complete Strategic Analysis",
    description: "Conduct a comprehensive strategic analysis for a company entering a new market",
    steps: [
      "Choose a company and new market scenario (e.g., Netflix entering gaming, Starbucks entering India)",
      "Conduct a Five Forces analysis of the target market",
      "If applicable, use BCG Matrix to analyze the company's current portfolio",
      "Perform SWOT analysis focusing on the new market entry",
      "Estimate the market size using both top-down and bottom-up approaches",
      "Synthesize findings into strategic recommendations"
    ],
    deliverable: "A strategic analysis report with framework applications, market sizing, and entry strategy recommendations"
  }
};

const level4Lesson: ConsultingLessonContent = {
  level: 4,
  title: "Operations Excellence",
  description: "Learn how to optimize business processes, reduce costs, and improve operational efficiency using proven consulting methodologies",
  theme: "Operational Optimization",
  objectives: [
    "Master process optimization and lean methodology principles",
    "Design and implement KPI systems for performance measurement",
    "Develop cost reduction strategies that maintain quality",
    "Apply benchmarking techniques for performance improvement"
  ],
  terminology: ['process_optimization', 'lean_methodology', 'kpi', 'cost_reduction', 'benchmarking'],
  keyTerms: ['process_optimization', 'lean_methodology', 'kpi', 'cost_reduction', 'benchmarking'],
  keyQuestions: [
    "How do you identify and eliminate waste in business processes?",
    "What makes a KPI effective for driving performance?",
    "How can you reduce costs without compromising quality?",
    "When is benchmarking most valuable and what are its limitations?"
  ],
  miniGames: [
    {
      id: 'process-optimizer',
      name: 'Process Flow Optimizer',
      description: 'Redesign business processes to eliminate waste and improve efficiency using lean principles',
      xpReward: 125,
      difficulty: 'intermediate'
    },
    {
      id: 'kpi-dashboard-designer',
      name: 'KPI Dashboard Designer',
      description: 'Create balanced scorecards and KPI dashboards that drive the right behaviors and outcomes',
      xpReward: 150,
      difficulty: 'intermediate'
    }
  ],
  realWorldExamples: [
    {
      id: 'deloitte-manufacturing-optimization-2022',
      title: "Deloitte's Manufacturing Operations Overhaul (2022)",
      company: "Automotive Parts Manufacturer",
      year: 2022,
      description: "A major automotive parts manufacturer was struggling with rising costs, quality issues, and delivery delays. Deloitte was engaged to optimize their operations across three manufacturing facilities. The team began with comprehensive process mapping and identified significant waste in material handling, excessive inventory, and redundant quality checks. Using lean methodology principles, they implemented value stream mapping and found that only 30% of activities actually added value. The team designed new KPIs including Overall Equipment Effectiveness (OEE), First Pass Yield, and Cost Per Unit, replacing the previous focus on just volume metrics. For cost reduction, they identified opportunities in supplier consolidation, energy efficiency, and workforce optimization that could save 12% without layoffs. Benchmarking against industry leaders revealed the client was underperforming in automation and predictive maintenance. The transformation included implementing just-in-time inventory, standardizing processes across facilities, and introducing continuous improvement culture. Results included 15% cost reduction, 40% improvement in on-time delivery, and 25% reduction in quality defects.",
      keyLearning: "Operations excellence requires systematic process optimization, meaningful KPIs, and a culture of continuous improvement rather than just cost cutting.",
      difficulty: 'intermediate'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-lean-waste-types',
        question: 'In lean methodology, which of the following is considered a type of waste?',
        options: [
          'Employee training',
          'Quality control measures',
          'Excessive inventory sitting unused',
          'Customer feedback collection'
        ],
        correctAnswer: 2,
        explanation: 'Excessive inventory is one of the seven wastes in lean methodology. It ties up capital, takes up space, and can hide other problems in the process.',
        difficulty: 'intermediate'
      },
      {
        id: 'q2-effective-kpi-characteristics',
        question: 'What makes a KPI truly effective?',
        options: [
          'It measures everything possible',
          'It is specific, measurable, actionable, and tied to business outcomes',
          'It shows only positive trends',
          'It is easy to manipulate'
        ],
        correctAnswer: 1,
        explanation: 'Effective KPIs are specific, measurable, actionable, relevant, and time-bound (SMART), and directly connect to business outcomes and behaviors you want to drive.',
        difficulty: 'intermediate'
      },
      {
        id: 'q3-cost-reduction-approach',
        question: 'What is the most sustainable approach to cost reduction?',
        options: [
          'Across-the-board percentage cuts',
          'Eliminating all non-essential activities',
          'Improving efficiency and eliminating waste while maintaining value',
          'Reducing headcount first'
        ],
        correctAnswer: 2,
        explanation: 'Sustainable cost reduction focuses on improving efficiency and eliminating waste while maintaining or enhancing value delivery to customers.',
        difficulty: 'intermediate'
      },
      {
        id: 'q4-benchmarking-value',
        question: 'When is benchmarking most valuable?',
        options: [
          'When you want to copy exactly what competitors do',
          'When you need to understand performance gaps and identify improvement opportunities',
          'Only for financial metrics',
          'When you are already the industry leader'
        ],
        correctAnswer: 1,
        explanation: 'Benchmarking is most valuable for understanding performance gaps, identifying best practices, and discovering improvement opportunities across various dimensions.',
        difficulty: 'intermediate'
      },
      {
        id: 'q5-process-optimization-priority',
        question: 'When optimizing processes, what should be the first priority?',
        options: [
          'Automating everything possible',
          'Understanding current state and identifying value-added vs. non-value-added activities',
          'Reducing the number of people involved',
          'Speeding up all activities'
        ],
        correctAnswer: 1,
        explanation: 'Before making changes, you must understand the current state and distinguish between value-added activities (that customers care about) and waste.',
        difficulty: 'intermediate'
      }
    ]
  },
  practicalActivity: {
    name: "Operations Improvement Project",
    description: "Design a comprehensive operations improvement plan for a business process",
    steps: [
      "Select a process to optimize (e.g., customer service, order fulfillment, hiring)",
      "Map the current state process from start to finish",
      "Identify value-added vs. non-value-added activities",
      "Apply lean principles to design an improved future state",
      "Define 3-5 KPIs to measure success of the improved process",
      "Calculate potential cost savings and efficiency gains",
      "Create an implementation roadmap with timelines"
    ],
    deliverable: "Operations improvement plan with current/future state maps, KPI definitions, cost-benefit analysis, and implementation roadmap"
  }
};

const level5Lesson: ConsultingLessonContent = {
  level: 5,
  title: "Digital Transformation",
  description: "Navigate the complexities of digital transformation and help organizations adapt to the digital age through technology and cultural change",
  theme: "Digital Innovation",
  objectives: [
    "Understand digital transformation strategy and implementation",
    "Apply agile methodology principles to drive change",
    "Identify automation opportunities and implementation approaches",
    "Use data analytics to drive business insights and decisions",
    "Design customer journeys and improve customer experience"
  ],
  terminology: ['digital_transformation', 'agile_methodology', 'automation', 'data_analytics', 'customer_journey', 'scalability'],
  keyTerms: ['digital_transformation', 'agile_methodology', 'automation', 'data_analytics', 'customer_journey'],
  keyQuestions: [
    "What does successful digital transformation look like beyond just technology?",
    "How do agile principles apply to large-scale organizational change?",
    "Which processes should be automated first and why?",
    "How can data analytics create competitive advantage?"
  ],
  miniGames: [
    {
      id: 'digital-roadmap-builder',
      name: 'Digital Transformation Architect',
      description: 'Design comprehensive digital transformation roadmaps balancing technology, process, and cultural changes',
      xpReward: 150,
      difficulty: 'advanced'
    },
    {
      id: 'customer-journey-optimizer',
      name: 'Customer Experience Designer',
      description: 'Map and optimize customer journeys across digital and physical touchpoints',
      xpReward: 175,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'accenture-bank-digital-transformation-2021',
      title: "Accenture's Bank Digital Transformation (2021)",
      company: "Regional Banking Institution",
      year: 2021,
      description: "A traditional regional bank was losing customers to digital-first competitors and needed comprehensive digital transformation. Accenture led a 24-month transformation covering technology, processes, and culture. The digital transformation strategy focused on three pillars: customer experience, operational efficiency, and new business models. They implemented agile methodology across the organization, moving from waterfall to sprint-based development and creating cross-functional teams. Automation was prioritized for routine transactions, loan processing, and compliance reporting, reducing processing time by 60%. Data analytics capabilities were built to enable personalized customer experiences, real-time risk assessment, and predictive maintenance. The customer journey was redesigned across all touchpoints - mobile app, website, branch, and call center - creating seamless omnichannel experiences. Scalability was built into all new systems to handle growth without proportional cost increases. The transformation required extensive change management, retraining 80% of employees, and shifting to a digital-first culture. Results included 40% increase in digital adoption, 25% improvement in customer satisfaction, 30% reduction in operational costs, and successful launch of new digital banking products.",
      keyLearning: "Digital transformation succeeds when technology changes are coupled with process redesign, cultural transformation, and comprehensive change management.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-digital-transformation-scope',
        question: 'What defines successful digital transformation?',
        options: [
          'Implementing the latest technology tools',
          'Digitizing all existing processes',
          'Fundamentally changing how the business creates and delivers value using digital capabilities',
          'Reducing headcount through automation'
        ],
        correctAnswer: 2,
        explanation: 'Digital transformation involves fundamentally changing business models, processes, and culture to leverage digital capabilities for competitive advantage, not just digitizing existing processes.',
        difficulty: 'advanced'
      },
      {
        id: 'q2-agile-principles-consulting',
        question: 'How do agile principles benefit consulting engagements?',
        options: [
          'They eliminate the need for detailed planning',
          'They enable iterative delivery, faster feedback, and adaptation to changing requirements',
          'They only work for software development projects',
          'They reduce project costs automatically'
        ],
        correctAnswer: 1,
        explanation: 'Agile principles enable consultants to deliver value iteratively, get faster client feedback, and adapt to changing business needs throughout the engagement.',
        difficulty: 'advanced'
      },
      {
        id: 'q3-automation-prioritization',
        question: 'Which processes should typically be automated first?',
        options: [
          'The most complex and strategic processes',
          'High-volume, rule-based, repetitive processes with clear inputs and outputs',
          'Processes that require human creativity',
          'All customer-facing processes'
        ],
        correctAnswer: 1,
        explanation: 'High-volume, rule-based, repetitive processes with clear inputs and outputs offer the best ROI for automation and lowest implementation risk.',
        difficulty: 'advanced'
      },
      {
        id: 'q4-data-analytics-value',
        question: 'How does data analytics create competitive advantage?',
        options: [
          'By collecting more data than competitors',
          'By generating insights that improve decision-making, customer experience, and operational efficiency',
          'By replacing human judgment entirely',
          'By focusing only on historical reporting'
        ],
        correctAnswer: 1,
        explanation: 'Data analytics creates competitive advantage by generating actionable insights that improve decision-making, enhance customer experiences, and optimize operations.',
        difficulty: 'advanced'
      },
      {
        id: 'q5-customer-journey-importance',
        question: 'Why is customer journey mapping critical in digital transformation?',
        options: [
          'It shows all the technology systems used',
          'It identifies pain points and opportunities to improve customer experience across all touchpoints',
          'It focuses only on digital interactions',
          'It replaces the need for customer feedback'
        ],
        correctAnswer: 1,
        explanation: 'Customer journey mapping identifies pain points, moments of truth, and opportunities to create seamless, valuable experiences across all customer touchpoints.',
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Digital Transformation Strategy",
    description: "Develop a comprehensive digital transformation strategy for a traditional business",
    steps: [
      "Choose a traditional industry/company (e.g., insurance, healthcare, manufacturing)",
      "Assess current digital maturity across technology, data, processes, and culture",
      "Map current customer journey and identify digital enhancement opportunities",
      "Prioritize automation opportunities using effort vs. impact analysis",
      "Design data analytics capabilities needed for competitive advantage",
      "Create an agile implementation roadmap with 3 phases over 18 months",
      "Address change management and capability building requirements"
    ],
    deliverable: "Digital transformation strategy with current state assessment, target vision, prioritized initiatives, implementation roadmap, and change management plan"
  }
};

const level6Lesson: ConsultingLessonContent = {
  level: 6,
  title: "Change Management",
  description: "Master the art of organizational change and learn how to successfully guide companies through complex transformations",
  theme: "Transformation Leadership",
  objectives: [
    "Design and implement comprehensive change management strategies",
    "Master stakeholder analysis and engagement techniques",
    "Understand organizational design principles for optimal performance",
    "Drive culture transformation initiatives",
    "Develop effective communication strategies for change"
  ],
  terminology: ['change_management', 'stakeholder_management', 'organizational_design', 'culture_transformation', 'communication_strategy'],
  keyTerms: ['change_management', 'stakeholder_management', 'organizational_design', 'culture_transformation', 'communication_strategy'],
  keyQuestions: [
    "What makes change management initiatives succeed or fail?",
    "How do you identify and manage different stakeholder groups effectively?",
    "How should organizational structure support business strategy?",
    "What drives sustainable culture transformation?"
  ],
  miniGames: [
    {
      id: 'change-navigator',
      name: 'Change Management Navigator',
      description: 'Navigate complex organizational transformations by managing resistance, building coalitions, and driving adoption',
      xpReward: 175,
      difficulty: 'advanced'
    },
    {
      id: 'stakeholder-orchestrator',
      name: 'Stakeholder Influence Mapper',
      description: 'Map stakeholder influence networks and develop targeted engagement strategies for transformation success',
      xpReward: 200,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'kpmg-culture-transformation-2020',
      title: "KPMG's Healthcare Culture Transformation (2020)",
      company: "Large Healthcare System",
      year: 2020,
      description: "A large healthcare system needed to transform from a traditional hierarchical culture to a patient-centric, collaborative culture to improve outcomes and employee satisfaction. KPMG led a comprehensive change management initiative spanning 18 months across 15 hospitals and 25,000 employees. The change management strategy used Kotter's 8-step process, starting with creating urgency around patient satisfaction scores and employee turnover. Stakeholder management was critical, involving physicians, nurses, administrators, union representatives, and board members - each with different concerns and influence levels. Organizational design was restructured from functional silos to patient care teams with shared accountability. Culture transformation focused on shifting from 'individual heroics' to 'collaborative care' through new values, behaviors, and recognition systems. The communication strategy included town halls, digital platforms, storytelling campaigns, and peer champions to reinforce new behaviors. Key interventions included leadership development, team-building workshops, new performance metrics tied to collaboration, and celebration of culture change wins. The transformation faced significant resistance initially, particularly from senior physicians, but was overcome through targeted engagement and demonstrating early wins. Results included 30% improvement in patient satisfaction, 25% reduction in staff turnover, and 20% improvement in clinical outcomes.",
      keyLearning: "Successful change management requires addressing both rational and emotional aspects of change while engaging all stakeholder groups with tailored strategies.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-change-management-success-factors',
        question: 'What is the most critical factor for change management success?',
        options: [
          'Having the best technology solutions',
          'Strong leadership commitment and visible sponsorship throughout the organization',
          'Detailed project plans and timelines',
          'Hiring external consultants'
        ],
        correctAnswer: 1,
        explanation: 'Strong, visible leadership commitment is essential because leaders model the change, allocate resources, and signal to the organization that the change is a priority.',
        difficulty: 'advanced'
      },
      {
        id: 'q2-stakeholder-management-approach',
        question: 'How should you approach stakeholders with high influence but low support for change?',
        options: [
          'Ignore them and focus on supporters',
          'Invest heavily in understanding their concerns and developing targeted engagement strategies',
          'Remove them from their positions',
          'Publicly challenge their resistance'
        ],
        correctAnswer: 1,
        explanation: 'High-influence, low-support stakeholders can derail change initiatives. They require careful engagement to understand concerns and convert them into supporters or at least neutrals.',
        difficulty: 'advanced'
      },
      {
        id: 'q3-organizational-design-principles',
        question: 'What should drive organizational design decisions?',
        options: [
          'Industry best practices only',
          'Reducing the number of management layers',
          'Business strategy, customer needs, and desired capabilities',
          'Cost reduction objectives'
        ],
        correctAnswer: 2,
        explanation: 'Organizational design should be driven by business strategy, customer needs, and the capabilities required to deliver value, not just by cost or copying others.',
        difficulty: 'advanced'
      },
      {
        id: 'q4-culture-transformation-timeline',
        question: 'Why do culture transformations typically take 3-5 years?',
        options: [
          'Because consultants want longer engagements',
          'Because culture change involves deeply ingrained behaviors, beliefs, and systems that take time to shift',
          'Because employees resist all changes',
          'Because technology implementations are slow'
        ],
        correctAnswer: 1,
        explanation: 'Culture involves deeply embedded behaviors, beliefs, and systems that have developed over years. Changing these requires sustained effort and time for new behaviors to become habits.',
        difficulty: 'advanced'
      },
      {
        id: 'q5-communication-strategy-effectiveness',
        question: 'What makes a change communication strategy effective?',
        options: [
          'Sending frequent emails to all employees',
          'Using multiple channels, tailored messages for different audiences, and two-way dialogue',
          'Only communicating when there are major updates',
          'Focusing only on positive aspects of change'
        ],
        correctAnswer: 1,
        explanation: 'Effective change communication uses multiple channels, tailors messages to different audiences, enables two-way dialogue, and addresses both benefits and concerns honestly.',
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Change Management Strategy Design",
    description: "Design a comprehensive change management strategy for a major organizational transformation",
    steps: [
      "Define the transformation scenario (e.g., merger, digital transformation, restructuring)",
      "Conduct stakeholder analysis mapping influence vs. support levels",
      "Design organizational structure to support the future state",
      "Develop culture transformation approach including values, behaviors, and systems",
      "Create multi-channel communication strategy with key messages for different audiences",
      "Plan change management activities including training, engagement, and reinforcement",
      "Develop success metrics and feedback mechanisms"
    ],
    deliverable: "Comprehensive change management strategy with stakeholder analysis, organizational design, culture plan, communication strategy, and implementation roadmap"
  }
};

const level7Lesson: ConsultingLessonContent = {
  level: 7,
  title: "Strategic Leadership",
  description: "Develop senior-level consulting skills to advise executives and boards on transformational strategy and leadership challenges",
  theme: "Executive Advisory",
  objectives: [
    "Master strategic planning for long-term competitive advantage",
    "Apply scenario planning to prepare for uncertain futures",
    "Develop executive presence and thought leadership capabilities",
    "Provide board-level advisory and governance guidance",
    "Build deep industry expertise and market insights"
  ],
  terminology: ['strategic_planning', 'scenario_planning', 'executive_presence', 'thought_leadership', 'board_advisory', 'industry_expertise'],
  keyTerms: ['strategic_planning', 'scenario_planning', 'executive_presence', 'thought_leadership', 'board_advisory'],
  keyQuestions: [
    "How do you develop strategies that create sustainable competitive advantage?",
    "When is scenario planning most valuable and how do you make it actionable?",
    "What builds trust and credibility with C-suite executives?",
    "How do you develop thought leadership that influences industry direction?"
  ],
  miniGames: [
    {
      id: 'strategic-scenario-planner',
      name: 'Strategic Scenario Architect',
      description: 'Develop multiple strategic scenarios and contingency plans for complex business environments',
      xpReward: 200,
      difficulty: 'advanced'
    },
    {
      id: 'board-advisor-simulator',
      name: 'Board Advisory Simulator',
      description: 'Navigate complex board dynamics while providing strategic guidance on critical business decisions',
      xpReward: 250,
      difficulty: 'advanced'
    }
  ],
  realWorldExamples: [
    {
      id: 'mckinsey-ceo-strategic-planning-2022',
      title: "McKinsey's CEO Strategic Planning Initiative (2022)",
      company: "Fortune 500 Technology Company",
      year: 2022,
      description: "A Fortune 500 technology company's new CEO engaged McKinsey to develop a comprehensive 5-year strategic plan amid industry disruption from AI, cloud computing, and changing customer expectations. The strategic planning process involved extensive industry analysis, competitive positioning review, and internal capability assessment. Scenario planning was used to model four different futures: accelerated AI adoption, economic recession, regulatory changes, and new competitor emergence. Each scenario required different strategic responses and investment priorities. The McKinsey team demonstrated executive presence by facilitating board discussions, presenting complex analysis clearly, and building consensus among diverse stakeholder groups. Thought leadership was established through publishing industry perspectives on AI transformation and speaking at major conferences. Board advisory included governance recommendations for AI ethics, risk management frameworks, and board composition for digital expertise. The team developed deep industry expertise by interviewing 50+ industry leaders, analyzing 200+ companies, and identifying emerging trends. The final strategic plan included portfolio optimization, capability building roadmap, partnership strategies, and innovation investment priorities. Implementation included establishing new governance structures, performance metrics, and regular strategy reviews. The plan successfully positioned the company as an AI leader while maintaining core business performance.",
      keyLearning: "Senior-level consulting requires combining analytical rigor with executive communication skills, deep industry insight, and the ability to navigate complex stakeholder dynamics.",
      difficulty: 'advanced'
    }
  ],
  interactiveQuiz: {
    questions: [
      {
        id: 'q1-strategic-planning-horizon',
        question: 'What distinguishes strategic planning from operational planning?',
        options: [
          'Strategic planning is more detailed',
          'Strategic planning focuses on long-term competitive positioning and fundamental business direction',
          'Strategic planning is only done by consultants',
          'Strategic planning costs more money'
        ],
        correctAnswer: 1,
        explanation: 'Strategic planning focuses on long-term competitive positioning, fundamental business direction, and creating sustainable competitive advantages, while operational planning focuses on short-term execution.',
        difficulty: 'advanced'
      },
      {
        id: 'q2-scenario-planning-value',
        question: 'When is scenario planning most valuable for organizations?',
        options: [
          'When the future is predictable',
          'During times of high uncertainty with multiple possible futures that could significantly impact the business',
          'Only during economic downturns',
          'When competitors are using it'
        ],
        correctAnswer: 1,
        explanation: 'Scenario planning is most valuable during high uncertainty when multiple plausible futures could significantly impact business strategy and require different responses.',
        difficulty: 'advanced'
      },
      {
        id: 'q3-executive-presence-components',
        question: 'What are the key components of executive presence?',
        options: [
          'Speaking loudly and confidently',
          'Authenticity, gravitas, communication skills, and emotional intelligence',
          'Wearing expensive clothing',
          'Having an MBA degree'
        ],
        correctAnswer: 1,
        explanation: 'Executive presence combines authenticity, gravitas (substance and weight), excellent communication skills, and emotional intelligence to inspire confidence and influence.',
        difficulty: 'advanced'
      },
      {
        id: 'q4-thought-leadership-development',
        question: 'How do you develop meaningful thought leadership in consulting?',
        options: [
          'By writing about popular topics',
          'By developing unique insights based on deep expertise and sharing them through multiple channels',
          'By copying ideas from successful leaders',
          'By speaking at as many events as possible'
        ],
        correctAnswer: 1,
        explanation: 'Meaningful thought leadership requires developing unique, valuable insights based on deep expertise and sharing them consistently through multiple channels to influence industry thinking.',
        difficulty: 'advanced'
      },
      {
        id: 'q5-board-advisory-role',
        question: 'What is the primary value consultants provide in board advisory roles?',
        options: [
          'Making decisions for the board',
          'Providing independent perspective, deep expertise, and strategic frameworks to enhance board decision-making',
          'Reducing board meeting time',
          'Implementing board decisions'
        ],
        correctAnswer: 1,
        explanation: 'Consultants provide independent perspective, deep expertise, strategic frameworks, and analytical rigor to help boards make better-informed strategic decisions.',
        difficulty: 'advanced'
      }
    ]
  },
  practicalActivity: {
    name: "Executive Strategic Advisory Project",
    description: "Develop a comprehensive strategic advisory presentation for a CEO and board of directors",
    steps: [
      "Choose a complex business situation (e.g., industry disruption, major acquisition, new market entry)",
      "Develop 3-4 strategic scenarios with different assumptions and implications",
      "Create strategic recommendations with clear rationale and implementation priorities",
      "Design executive-level presentation with key insights and decision frameworks",
      "Prepare for tough questions and stakeholder concerns",
      "Include governance recommendations and risk mitigation strategies",
      "Develop thought leadership perspective on broader industry implications"
    ],
    deliverable: "Executive strategic advisory presentation with scenario analysis, strategic recommendations, implementation roadmap, and thought leadership perspective suitable for CEO and board review"
  }
};

export const managementConsultingLessons: ConsultingLessonContent[] = [
  level1Lesson,
  level2Lesson,
  level3Lesson,
  level4Lesson,
  level5Lesson,
  level6Lesson,
  level7Lesson
];

export const getConsultingLessonByLevel = (level: number): ConsultingLessonContent | undefined => {
  return managementConsultingLessons.find(lesson => lesson.level === level);
};