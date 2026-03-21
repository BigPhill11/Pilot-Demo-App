export interface ManagementConsultingLevel {
  id: number;
  title: string;
  overview: string;
  philsAnalogy: {
    title: string;
    content: string;
  };
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  realLifeExample: {
    title: string;
    content: string;
  };
  miniGames: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    gameData: any;
  }>;
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  takeHomeActivity: string;
}

export const managementConsultingLevels: ManagementConsultingLevel[] = [
  {
    id: 1,
    title: "Introduction to Management Consulting",
    overview: "Management consulting is the business of helping organizations solve problems and improve performance. Companies hire consultants when they need fresh perspectives, specialized expertise, or help making tough decisions. Consulting firms work across industries like healthcare, retail, finance, and technology. Consultants gather data, analyze trends, and recommend solutions in clear, actionable ways. Their work is project-based and often involves tight deadlines. This level introduces what consulting is, who consultants serve, and why consulting exists.",
    philsAnalogy: {
      title: "The Doctor for Businesses",
      content: "Think of management consultants like doctors, but for businesses instead of people. When you're sick, you go to a doctor who examines you, runs tests, and figures out what's wrong. The doctor then gives you a treatment plan to get better. Similarly, when a company has problems - like losing customers or making less money - they call in management consultants. These 'business doctors' examine the company, look at their data (like financial records and employee feedback), diagnose the problem, and prescribe solutions. Just like how doctors specialize in different areas (heart, brain, etc.), consultants specialize in different business areas (strategy, operations, technology). And just like you trust a doctor's expertise because they've seen many patients, companies trust consultants because they've helped many other businesses with similar problems."
    },
    flashcards: [
      {
        term: "Management Consulting",
        definition: "Management consulting is the practice of advising organizations on how to solve problems and grow. It focuses on providing strategies to improve performance and efficiency."
      },
      {
        term: "Client",
        definition: "A client is the organization that hires consultants to address a specific challenge. Clients pay consulting firms for advice, analysis, and recommendations."
      },
      {
        term: "Engagement",
        definition: "An engagement is the consulting project or assignment with a client. It can last from a few weeks to several months depending on scope."
      },
      {
        term: "Deliverable",
        definition: "A deliverable is the final product consultants give to clients, such as a presentation or report. It communicates findings and recommendations clearly."
      },
      {
        term: "Consulting Firm",
        definition: "A consulting firm employs consultants and takes on projects across industries. Examples include McKinsey, Bain, and Boston Consulting Group (BCG)."
      }
    ],
    realLifeExample: {
      title: "Clothing Retailer Turnaround",
      content: "A clothing retailer sees profits falling and hires a consulting firm to investigate. Consultants collect sales data, interview store managers, and review supply chain costs. They discover that inventory management is inefficient, leading to too much unsold stock. The consultants recommend a new tracking system, which helps the retailer reduce waste and increase profits."
    },
    miniGames: [
      {
        id: "consultant-or-not",
        title: "Consultant or Not?",
        description: "Identify which job descriptions represent management consultants.",
        type: "classification",
        gameData: {
          items: [
            { text: "Helps companies solve business problems", correct: true },
            { text: "Performs surgery on patients", correct: false },
            { text: "Provides strategic advice to organizations", correct: true },
            { text: "Teaches children in elementary school", correct: false },
            { text: "Analyzes data to improve company performance", correct: true },
            { text: "Designs buildings and architecture", correct: false },
            { text: "Advises on operational improvements", correct: true }
          ]
        }
      },
      {
        id: "client-match",
        title: "Client Match",
        description: "Match industries with appropriate consulting projects.",
        type: "matching",
        gameData: {
          pairs: [
            { left: "Healthcare", right: "Reduce patient wait times" },
            { left: "Retail", right: "Improve inventory management" },
            { left: "Technology", right: "Digital transformation strategy" },
            { left: "Manufacturing", right: "Optimize production processes" },
            { left: "Finance", right: "Risk management framework" }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is management consulting?",
        options: [
          "The practice of advising organizations on solving problems and growth",
          "A type of financial investment strategy",
          "The process of managing employee salaries",
          "A method of accounting for business expenses"
        ],
        correctAnswer: 0,
        explanation: "Management consulting is the practice of advising organizations on how to solve problems and grow, focusing on strategies to improve performance and efficiency."
      },
      {
        question: "Who is the 'client' in a consulting engagement?",
        options: [
          "The consulting firm's employees",
          "The organization that hires consultants",
          "The government regulatory body",
          "The company's competitors"
        ],
        correctAnswer: 1,
        explanation: "A client is the organization that hires consultants to address a specific challenge and pays for advice, analysis, and recommendations."
      },
      {
        question: "What is a deliverable?",
        options: [
          "The payment consultants receive",
          "The time spent on a project",
          "The final product given to clients",
          "The initial meeting with clients"
        ],
        correctAnswer: 2,
        explanation: "A deliverable is the final product consultants give to clients, such as a presentation or report that communicates findings and recommendations clearly."
      },
      {
        question: "In the clothing retailer example, what problem did consultants solve?",
        options: [
          "Poor customer service",
          "Inefficient inventory management",
          "High employee turnover",
          "Outdated store design"
        ],
        correctAnswer: 1,
        explanation: "Consultants discovered that inventory management was inefficient, leading to too much unsold stock, and recommended a new tracking system."
      },
      {
        question: "What is an engagement?",
        options: [
          "A consulting firm's annual revenue",
          "The consulting project or assignment with a client",
          "A type of business contract",
          "The consultant's educational background"
        ],
        correctAnswer: 1,
        explanation: "An engagement is the consulting project or assignment with a client that can last from a few weeks to several months depending on scope."
      }
    ],
    takeHomeActivity: "Think of a challenge in your school or community (e.g., long lunch lines, low event turnout). Write 5–6 sentences describing how you would act as a consultant to analyze and solve it."
  },
  {
    id: 2,
    title: "The Role of a Consultant",
    overview: "Consultants play multiple roles within a project, often switching between analyst, researcher, strategist, and communicator. They must quickly learn about the client's industry, even if they have never worked in it before. Much of the work involves breaking down complex problems into smaller parts. Consultants then test hypotheses using data and evidence to see if they are correct. They also prepare presentations and meet directly with client executives. This level explores the daily responsibilities of consultants.",
    philsAnalogy: {
      title: "The Detective Solving Business Mysteries",
      content: "Think of consultants like detectives solving business mysteries. When a crime happens, detectives don't know who did it or how - they have to investigate. They start with a hypothesis (like 'I think the butler did it'), then gather clues (fingerprints, witness statements, security footage) to test if they're right. If the evidence doesn't support their first guess, they form a new hypothesis and test again. Similarly, when a business has a problem (like 'Why are we losing customers?'), consultants start with educated guesses (hypotheses) like 'Maybe the service is too slow' or 'Maybe competitors have better prices.' Then they gather 'business clues' - sales data, customer surveys, competitor analysis - to test their theories. Just like detectives present their findings to a judge and jury, consultants present their discoveries to company executives in clear, organized presentations that show exactly what they found and what should be done about it."
    },
    flashcards: [
      {
        term: "Problem-Solving",
        definition: "Problem-solving is breaking complex issues into smaller, manageable pieces. Consultants use structured methods to reach clear recommendations."
      },
      {
        term: "Hypothesis",
        definition: "A hypothesis is an educated guess about the root of a client's problem. Consultants test it with data and adjust based on findings."
      },
      {
        term: "Client Interaction",
        definition: "Client interaction is the communication between consultants and client staff. It includes interviews, meetings, and presentations."
      },
      {
        term: "Slide Deck",
        definition: "A slide deck is a visual presentation that consultants prepare for clients. It explains findings, analysis, and recommendations."
      },
      {
        term: "Workstream",
        definition: "A workstream is a smaller piece of a larger project handled by a team. Each workstream focuses on one aspect of the client's problem."
      }
    ],
    realLifeExample: {
      title: "Hospital Emergency Room Efficiency",
      content: "A hospital hires consultants to reduce patient wait times in its emergency room. The consulting team creates a hypothesis that scheduling and staffing are causing delays. They analyze data, review shift schedules, and interview nurses. Their analysis confirms the problem and leads to a new staffing plan. Within months, patient wait times drop significantly."
    },
    miniGames: [
      {
        id: "hypothesis-tester",
        title: "Hypothesis Tester",
        description: "Form logical hypotheses about business problems.",
        type: "hypothesis",
        gameData: {
          scenarios: [
            {
              problem: "A restaurant's sales are declining",
              hypotheses: [
                "The food quality has decreased",
                "Competitors opened nearby",
                "Service is too slow",
                "Prices are too high"
              ],
              correctHypotheses: [1, 2, 3]
            },
            {
              problem: "Employee turnover is increasing",
              hypotheses: [
                "Salaries are below market rate",
                "Management style is poor",
                "Work environment is stressful",
                "The office building is old"
              ],
              correctHypotheses: [0, 1, 2]
            }
          ]
        }
      },
      {
        id: "deck-builder",
        title: "Deck Builder",
        description: "Arrange presentation slides in the correct order.",
        type: "ordering",
        gameData: {
          slides: [
            "Executive Summary",
            "Problem Statement",
            "Analysis and Findings",
            "Recommendations",
            "Implementation Plan",
            "Conclusion"
          ],
          correctOrder: [1, 2, 3, 4, 0, 5]
        }
      }
    ],
    quiz: [
      {
        question: "What is problem-solving in consulting?",
        options: [
          "Guessing the answer quickly",
          "Breaking complex issues into smaller, manageable pieces",
          "Avoiding difficult questions",
          "Asking clients to solve their own problems"
        ],
        correctAnswer: 1,
        explanation: "Problem-solving in consulting means breaking complex issues into smaller, manageable pieces using structured methods to reach clear recommendations."
      },
      {
        question: "What is a hypothesis?",
        options: [
          "A final recommendation",
          "An educated guess about the root of a problem",
          "A type of data analysis",
          "A client presentation"
        ],
        correctAnswer: 1,
        explanation: "A hypothesis is an educated guess about the root of a client's problem that consultants test with data and adjust based on findings."
      },
      {
        question: "What is client interaction?",
        options: [
          "Only formal presentations",
          "Communication between consultants and client staff",
          "Financial transactions",
          "Marketing activities"
        ],
        correctAnswer: 1,
        explanation: "Client interaction is the communication between consultants and client staff, including interviews, meetings, and presentations."
      },
      {
        question: "In the hospital example, what problem did the consultants solve?",
        options: [
          "Medical equipment failures",
          "Patient wait times in emergency room",
          "Hospital billing issues",
          "Doctor shortages"
        ],
        correctAnswer: 1,
        explanation: "Consultants helped reduce patient wait times in the emergency room by analyzing scheduling and staffing issues and implementing a new staffing plan."
      },
      {
        question: "What is a slide deck?",
        options: [
          "A type of office furniture",
          "A visual presentation that explains findings and recommendations",
          "A data collection method",
          "A project timeline"
        ],
        correctAnswer: 1,
        explanation: "A slide deck is a visual presentation that consultants prepare for clients to explain findings, analysis, and recommendations."
      }
    ],
    takeHomeActivity: "Write 5–6 sentences about a time you solved a problem (school, sports, personal life). Explain how you formed a hypothesis, tested it, and made a recommendation."
  },
  {
    id: 3,
    title: "Consulting Frameworks",
    overview: "Consultants often use structured frameworks to analyze problems. Frameworks are step-by-step tools that provide structure for thinking about complex business challenges. They help consultants avoid missing key areas and make sure analysis is comprehensive. Common frameworks include SWOT (Strengths, Weaknesses, Opportunities, Threats), the 3Cs (Company, Customers, Competitors), and Porter's Five Forces. These tools are not rigid rules but guides to help consultants organize their thinking. This level introduces frameworks and how they apply to real client problems.",
    philsAnalogy: {
      title: "The Recipe for Business Analysis",
      content: "Think of consulting frameworks like recipes for cooking. When you want to bake a cake, you don't just throw random ingredients together - you follow a recipe that tells you exactly what to add and in what order. The recipe ensures you don't forget important ingredients like eggs or baking powder. Similarly, when consultants analyze business problems, they use 'recipes' called frameworks to make sure they don't miss anything important. For example, SWOT analysis is like a recipe that says: 'First, look at the company's strengths (what they do well), then weaknesses (what they struggle with), then opportunities (what good things could happen), then threats (what bad things could happen).' Just like following a recipe helps you make a delicious cake every time, following frameworks helps consultants create thorough, useful analysis every time. And just like there are different recipes for different dishes (cake, soup, pizza), there are different frameworks for different business situations."
    },
    flashcards: [
      {
        term: "Framework",
        definition: "A framework is a structured tool consultants use to break down problems. It ensures important factors are not overlooked."
      },
      {
        term: "SWOT Analysis",
        definition: "SWOT looks at strengths, weaknesses, opportunities, and threats. It helps companies see where they stand internally and externally."
      },
      {
        term: "3Cs Framework",
        definition: "The 3Cs examine the company, its customers, and its competitors. This helps firms understand their market position."
      },
      {
        term: "Porter's Five Forces",
        definition: "Porter's model analyzes competition using five forces: rivalry, suppliers, buyers, substitutes, and new entrants."
      },
      {
        term: "Structured Thinking",
        definition: "Structured thinking means approaching problems in an organized way. Frameworks help consultants practice this skill."
      }
    ],
    realLifeExample: {
      title: "Food Delivery Competition Analysis",
      content: "A food delivery company asks consultants how to compete against new rivals. The team uses the 3Cs framework: examining the company's delivery system, customer satisfaction, and competitor pricing. The analysis shows customers value speed more than variety. The consultants recommend investing in faster delivery, which helps the company win back market share."
    },
    miniGames: [
      {
        id: "framework-finder",
        title: "Framework Finder",
        description: "Choose the best framework for different business scenarios.",
        type: "selection",
        gameData: {
          scenarios: [
            {
              situation: "A company wants to understand its competitive position",
              frameworks: ["SWOT", "3Cs", "Porter's Five Forces"],
              correctFramework: 1,
              explanation: "3Cs framework examines company, customers, and competitors - perfect for understanding competitive position"
            },
            {
              situation: "A startup needs to assess internal capabilities and market threats",
              frameworks: ["3Cs", "SWOT", "Porter's Five Forces"],
              correctFramework: 1,
              explanation: "SWOT analysis looks at internal strengths/weaknesses and external opportunities/threats"
            },
            {
              situation: "A business wants to analyze industry competition intensity",
              frameworks: ["SWOT", "3Cs", "Porter's Five Forces"],
              correctFramework: 2,
              explanation: "Porter's Five Forces specifically analyzes competitive forces within an industry"
            }
          ]
        }
      },
      {
        id: "swot-builder",
        title: "SWOT Builder",
        description: "Classify business factors into SWOT categories.",
        type: "classification",
        gameData: {
          items: [
            { text: "Strong brand reputation", category: "Strengths" },
            { text: "High employee turnover", category: "Weaknesses" },
            { text: "Growing market demand", category: "Opportunities" },
            { text: "New competitor entering market", category: "Threats" },
            { text: "Advanced technology systems", category: "Strengths" },
            { text: "Limited financial resources", category: "Weaknesses" },
            { text: "Economic recession", category: "Threats" },
            { text: "Potential partnership opportunity", category: "Opportunities" }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is a framework?",
        options: [
          "A type of business contract",
          "A structured tool to break down problems",
          "A financial analysis method",
          "A marketing strategy"
        ],
        correctAnswer: 1,
        explanation: "A framework is a structured tool consultants use to break down problems, ensuring important factors are not overlooked."
      },
      {
        question: "What does SWOT stand for?",
        options: [
          "Systems, Workflows, Operations, Technology",
          "Strengths, Weaknesses, Opportunities, Threats",
          "Sales, Workforce, Objectives, Targets",
          "Strategy, Work, Organization, Training"
        ],
        correctAnswer: 1,
        explanation: "SWOT stands for Strengths, Weaknesses, Opportunities, and Threats - it helps companies see where they stand internally and externally."
      },
      {
        question: "What are the 3Cs?",
        options: [
          "Cost, Competition, Customers",
          "Company, Customers, Competitors",
          "Culture, Communication, Coordination",
          "Capital, Capacity, Capability"
        ],
        correctAnswer: 1,
        explanation: "The 3Cs examine the Company, its Customers, and its Competitors to help firms understand their market position."
      },
      {
        question: "In the food delivery example, what mattered most to customers?",
        options: [
          "Variety of restaurants",
          "Speed of delivery",
          "Price of food",
          "Customer service"
        ],
        correctAnswer: 1,
        explanation: "The 3Cs analysis showed that customers valued speed more than variety, leading to the recommendation to invest in faster delivery."
      },
      {
        question: "What are Porter's Five Forces used for?",
        options: [
          "Analyzing employee satisfaction",
          "Measuring financial performance",
          "Analyzing competition using five forces",
          "Evaluating customer preferences"
        ],
        correctAnswer: 2,
        explanation: "Porter's Five Forces analyzes competition using five forces: rivalry, suppliers, buyers, substitutes, and new entrants."
      }
    ],
    takeHomeActivity: "Choose a company you know well (like Nike, Apple, or Netflix). Write a short SWOT analysis with at least one strength, one weakness, one opportunity, and one threat."
  },
  {
    id: 4,
    title: "Data and Analysis",
    overview: "Consultants rely heavily on data to make recommendations. They collect information from client records, surveys, interviews, and market research. The goal is to turn raw data into insights that explain what is really happening. Consultants often use spreadsheets, charts, and models to analyze trends. Strong analysis is what separates consulting from simple guesswork. This level explains how consultants use data to uncover problems and opportunities.",
    philsAnalogy: {
      title: "The CSI Team for Business",
      content: "Think of consultants doing data analysis like a CSI (Crime Scene Investigation) team solving a case. When detectives arrive at a crime scene, they don't just guess what happened - they collect evidence: fingerprints, DNA, witness statements, security camera footage. Then they analyze all this evidence in the lab, looking for patterns and connections. They might discover that the fingerprints match a known criminal, or that the timing of events tells a story. Similarly, when consultants work on business problems, they collect 'business evidence': sales numbers, customer surveys, employee feedback, competitor information. Then they analyze this data using charts and graphs (their 'lab tools') to find patterns - like discovering that sales always drop on rainy days, or that customers complain most about wait times. Just like CSI teams use their analysis to solve crimes, consultants use their data analysis to solve business mysteries and recommend actions based on solid evidence, not guesses."
    },
    flashcards: [
      {
        term: "Data Collection",
        definition: "Gathering information from sources like sales records, surveys, and market reports. Data provides the foundation for consulting analysis."
      },
      {
        term: "Benchmarking",
        definition: "Comparing a company's performance against competitors or industry standards. This shows where the client is doing well or falling behind."
      },
      {
        term: "Key Performance Indicators (KPIs)",
        definition: "KPIs are measurable values that track progress toward goals. Examples include profit margin, market share, or customer satisfaction."
      },
      {
        term: "Root Cause Analysis",
        definition: "A method used to find the underlying reason for a problem. It prevents fixing only surface-level symptoms."
      },
      {
        term: "Visualization",
        definition: "Turning data into charts and graphs to make it easier to understand. Good visuals help clients quickly see trends and insights."
      }
    ],
    realLifeExample: {
      title: "Restaurant Chain Customer Loss Investigation",
      content: "A restaurant chain is losing customers and hires consultants to investigate. The team collects customer surveys, sales data, and competitor menus. They discover that long wait times are the root cause of lost sales, not food quality. Consultants present this insight with charts showing how sales decline as wait times rise. The company invests in faster service systems, which improves customer satisfaction and sales."
    },
    miniGames: [
      {
        id: "data-detective",
        title: "Data Detective",
        description: "Identify key insights from business data.",
        type: "analysis",
        gameData: {
          datasets: [
            {
              scenario: "Online retail sales data",
              data: {
                months: ["Jan", "Feb", "Mar", "Apr", "May"],
                sales: [100, 95, 85, 80, 75],
                customerComplaints: [5, 8, 12, 15, 20],
                pageLoadTime: [2, 2.5, 3, 3.5, 4]
              },
              insights: [
                "Sales are declining over time",
                "Customer complaints are increasing",
                "Page load time is getting slower",
                "There's a correlation between slow pages and declining sales"
              ],
              correctInsight: 3
            },
            {
              scenario: "Restaurant customer satisfaction",
              data: {
                branches: ["Downtown", "Mall", "Airport", "Suburb"],
                satisfaction: [4.2, 3.8, 3.2, 4.5],
                waitTime: [15, 20, 35, 12],
                revenue: [85000, 72000, 58000, 92000]
              },
              insights: [
                "Airport branch has longest wait times and lowest satisfaction",
                "Suburb branch performs best overall",
                "Wait time correlates with satisfaction and revenue",
                "All branches need improvement"
              ],
              correctInsight: 2
            }
          ]
        }
      },
      {
        id: "chart-builder",
        title: "Chart Builder",
        description: "Choose the right chart type to visualize data effectively.",
        type: "chartSelection",
        gameData: {
          dataTypes: [
            {
              description: "Showing sales trends over 12 months",
              options: ["Line Chart", "Pie Chart", "Bar Chart"],
              correct: 0,
              explanation: "Line charts are best for showing trends over time"
            },
            {
              description: "Comparing market share of 5 competitors",
              options: ["Line Chart", "Pie Chart", "Scatter Plot"],
              correct: 1,
              explanation: "Pie charts effectively show how a whole is divided into parts"
            },
            {
              description: "Comparing revenue of different product categories",
              options: ["Bar Chart", "Line Chart", "Pie Chart"],
              correct: 0,
              explanation: "Bar charts are ideal for comparing values across categories"
            }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is benchmarking?",
        options: [
          "Setting financial targets",
          "Comparing performance against competitors or industry standards",
          "Creating business plans",
          "Training employees"
        ],
        correctAnswer: 1,
        explanation: "Benchmarking is comparing a company's performance against competitors or industry standards to see where the client is doing well or falling behind."
      },
      {
        question: "What are KPIs?",
        options: [
          "Key Performance Indicators - measurable values tracking progress",
          "Key Planning Initiatives for strategy",
          "Key Personnel Information systems",
          "Key Product Innovations for growth"
        ],
        correctAnswer: 0,
        explanation: "KPIs are Key Performance Indicators - measurable values that track progress toward goals, such as profit margin, market share, or customer satisfaction."
      },
      {
        question: "What is the goal of root cause analysis?",
        options: [
          "To increase sales quickly",
          "To find the underlying reason for a problem",
          "To reduce costs immediately",
          "To hire new employees"
        ],
        correctAnswer: 1,
        explanation: "Root cause analysis is used to find the underlying reason for a problem, preventing the mistake of fixing only surface-level symptoms."
      },
      {
        question: "In the restaurant example, what caused customer loss?",
        options: [
          "Poor food quality",
          "High prices",
          "Long wait times",
          "Bad location"
        ],
        correctAnswer: 2,
        explanation: "The consultants discovered that long wait times were the root cause of lost sales, not food quality, which they showed through data analysis."
      },
      {
        question: "Why is visualization important in consulting?",
        options: [
          "It makes presentations look professional",
          "It helps clients quickly see trends and insights",
          "It reduces the amount of data needed",
          "It replaces the need for analysis"
        ],
        correctAnswer: 1,
        explanation: "Visualization turns data into charts and graphs to make it easier to understand, helping clients quickly see trends and insights."
      }
    ],
    takeHomeActivity: "Pick a business you know (school cafeteria, local shop). Write 5–6 sentences describing what data you would collect to improve it, and how you would present that data."
  },
  {
    id: 5,
    title: "Strategy Recommendations",
    overview: "After analyzing data, consultants must create strategies for the client. Recommendations need to be practical, realistic, and backed by evidence. They often include multiple options, with pros and cons for each. Consultants then present these ideas to the client, usually in a slide deck or report. Strong recommendations balance short-term improvements with long-term growth. This level focuses on how consultants move from analysis to strategy.",
    philsAnalogy: {
      title: "The GPS for Business Decisions",
      content: "Think of consultants creating strategy recommendations like a GPS helping you get somewhere. When you want to go to a new place, you don't just start driving randomly - you enter your destination in GPS, and it gives you route options. GPS might show you three different paths: the fastest route (25 minutes), the scenic route (35 minutes but prettier), or the route that avoids tolls (30 minutes, saves money). Each option has pros and cons, and GPS explains them so you can choose what matters most to you. Similarly, when companies need to reach business goals (like 'increase profits by 20%'), consultants act like business GPS. They analyze where the company is now, where they want to go, and then provide multiple strategic 'routes' to get there. Maybe Route A is 'cut costs' (fast results but might hurt quality), Route B is 'expand to new markets' (takes longer but bigger potential), or Route C is 'improve existing products' (balanced approach). Just like GPS, consultants explain the pros, cons, and time/cost for each option, then let the client choose their preferred path."
    },
    flashcards: [
      {
        term: "Recommendation",
        definition: "A proposed action based on data and analysis. Recommendations must be clear, realistic, and achievable."
      },
      {
        term: "Strategic Option",
        definition: "An alternative path a company could take. Consultants usually provide several options for comparison."
      },
      {
        term: "Cost-Benefit Analysis",
        definition: "A method of weighing the financial costs against the expected benefits of a strategy. It helps determine if the plan is worth pursuing."
      },
      {
        term: "Prioritization",
        definition: "Ranking strategies by importance and impact. Clients focus on the ideas that provide the most value."
      },
      {
        term: "Executive Summary",
        definition: "A short overview of the consulting findings and recommendations. Busy executives use it to understand the key points quickly."
      }
    ],
    realLifeExample: {
      title: "Tech Startup Growth Strategy",
      content: "A tech startup wants to grow but has limited funds. Consultants recommend three strategies: expand to new cities, launch a premium product, or partner with larger firms. After cost-benefit analysis, the team prioritizes the partnership option because it requires less capital and provides faster results. The client accepts the recommendation and secures a major partnership."
    },
    miniGames: [
      {
        id: "option-picker",
        title: "Option Picker",
        description: "Choose the best strategic option for different business scenarios.",
        type: "decision",
        gameData: {
          scenarios: [
            {
              situation: "A small restaurant wants to increase revenue but has limited budget",
              options: [
                {
                  name: "Open second location",
                  pros: ["Double capacity", "New customer base"],
                  cons: ["High upfront cost", "Split management attention"],
                  cost: "High",
                  timeToResults: "Long"
                },
                {
                  name: "Extend hours to include breakfast",
                  pros: ["Use existing space", "Low additional cost"],
                  cons: ["Staff scheduling complexity", "Unknown demand"],
                  cost: "Low",
                  timeToResults: "Medium"
                },
                {
                  name: "Add delivery service",
                  pros: ["Reach more customers", "Trending demand"],
                  cons: ["Delivery platform fees", "Food quality concerns"],
                  cost: "Medium",
                  timeToResults: "Short"
                }
              ],
              bestChoice: 1,
              explanation: "Given limited budget, extending hours provides revenue growth with minimal investment and manageable risk"
            }
          ]
        }
      },
      {
        id: "cost-benefit-challenge",
        title: "Cost-Benefit Challenge",
        description: "Calculate whether strategies are financially sound.",
        type: "calculation",
        gameData: {
          scenarios: [
            {
              strategy: "Implement new customer service system",
              cost: 50000,
              benefits: [
                { description: "Reduced call handling time", value: 30000 },
                { description: "Improved customer satisfaction", value: 25000 },
                { description: "Lower staff turnover", value: 15000 }
              ],
              timeframe: "per year"
            },
            {
              strategy: "Launch mobile app",
              cost: 80000,
              benefits: [
                { description: "Increased online sales", value: 60000 },
                { description: "Better customer data", value: 20000 },
                { description: "Reduced support calls", value: 10000 }
              ],
              timeframe: "per year"
            }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is a recommendation in consulting?",
        options: [
          "A client's initial request",
          "A proposed action based on data and analysis",
          "A type of consulting fee",
          "A project timeline"
        ],
        correctAnswer: 1,
        explanation: "A recommendation is a proposed action based on data and analysis that must be clear, realistic, and achievable."
      },
      {
        question: "What is a strategic option?",
        options: [
          "A consulting methodology",
          "An alternative path a company could take",
          "A data analysis technique",
          "A type of business contract"
        ],
        correctAnswer: 1,
        explanation: "A strategic option is an alternative path a company could take. Consultants usually provide several options for comparison."
      },
      {
        question: "What does cost-benefit analysis compare?",
        options: [
          "Different consulting firms",
          "Financial costs against expected benefits",
          "Employee salaries",
          "Market competitors"
        ],
        correctAnswer: 1,
        explanation: "Cost-benefit analysis weighs the financial costs against the expected benefits of a strategy to help determine if the plan is worth pursuing."
      },
      {
        question: "In the startup example, why was partnership chosen?",
        options: [
          "It had the highest potential revenue",
          "It required less capital and provided faster results",
          "It was the easiest to implement",
          "It eliminated all competition"
        ],
        correctAnswer: 1,
        explanation: "The partnership option was prioritized because it required less capital and provided faster results, which suited the startup's limited funds."
      },
      {
        question: "What is the purpose of an executive summary?",
        options: [
          "To provide detailed technical analysis",
          "To help busy executives understand key points quickly",
          "To list all project costs",
          "To schedule follow-up meetings"
        ],
        correctAnswer: 1,
        explanation: "An executive summary is a short overview of consulting findings and recommendations that helps busy executives understand the key points quickly."
      }
    ],
    takeHomeActivity: "Think of a decision your school or community might face (like hosting an event or expanding a program). Write 5–6 sentences outlining two options, their pros and cons, and which you would recommend."
  },
  {
    id: 6,
    title: "Implementation and Change Management",
    overview: "Consultants don't just create strategies—they often help clients put them into action. Implementation is the process of turning recommendations into real changes. This requires planning, training employees, and managing resistance to change. Change management is important because people often hesitate to adopt new systems or processes. Consultants provide roadmaps, timelines, and support to guide clients through transitions. This level covers how strategies move from paper to reality.",
    philsAnalogy: {
      title: "The Moving Day Coordinator",
      content: "Think of consultants helping with implementation like professional moving coordinators helping a family move to a new house. When you move, you can't just throw everything in boxes randomly and hope for the best - you need a plan. A moving coordinator creates a detailed roadmap: what to pack first, which rooms to start with, how to label boxes, when to schedule utilities at the new house. They also help manage people's emotions, because moving is stressful and family members might resist ('I don't want to leave my old room!'). The coordinator explains why the move is happening, helps everyone understand their role, and provides step-by-step guidance. Similarly, when companies need to implement new strategies (like moving from old business processes to new ones), consultants act as 'business moving coordinators.' They create detailed implementation roadmaps, help train employees on new systems, and manage resistance from workers who might be afraid of change. Just like a good moving coordinator makes sure nothing gets lost and everyone ends up happy in their new home, consultants make sure business changes happen smoothly and successfully."
    },
    flashcards: [
      {
        term: "Implementation",
        definition: "The process of carrying out recommendations and strategies. It involves turning plans into actions."
      },
      {
        term: "Change Management",
        definition: "Helping organizations and employees adjust to new processes. It reduces resistance and increases success."
      },
      {
        term: "Roadmap",
        definition: "A timeline showing how and when strategies will be implemented. It keeps everyone aligned."
      },
      {
        term: "Stakeholders",
        definition: "People affected by the project, such as employees, managers, and customers. Stakeholder support is key to success."
      },
      {
        term: "Pilot Program",
        definition: "A small test run of a new system before full rollout. It reduces risk by catching problems early."
      }
    ],
    realLifeExample: {
      title: "Bank Digital Transformation",
      content: "A bank hires consultants to digitize customer service. The consultants create a roadmap with stages: pilot mobile app, train employees, and fully launch. Some employees resist the change, worried about job security. With proper change management, including training and communication, the bank successfully implements the new system."
    },
    miniGames: [
      {
        id: "roadmap-builder",
        title: "Roadmap Builder",
        description: "Arrange implementation steps in the correct order.",
        type: "sequencing",
        gameData: {
          projects: [
            {
              name: "New CRM System Implementation",
              steps: [
                "Define requirements and select vendor",
                "Install and configure system",
                "Train pilot group of users",
                "Gather feedback and make adjustments",
                "Train all employees",
                "Full system rollout",
                "Monitor and optimize"
              ],
              correctOrder: [0, 1, 2, 3, 4, 5, 6]
            },
            {
              name: "Remote Work Policy Implementation",
              steps: [
                "Survey employees about remote work preferences",
                "Develop remote work policy and guidelines",
                "Provide technology and equipment",
                "Train managers on remote team management",
                "Launch pilot program with select teams",
                "Gather feedback and refine policy",
                "Roll out to entire organization"
              ],
              correctOrder: [0, 1, 2, 3, 4, 5, 6]
            }
          ]
        }
      },
      {
        id: "stakeholder-challenge",
        title: "Stakeholder Challenge",
        description: "Address concerns from different stakeholders effectively.",
        type: "stakeholderManagement",
        gameData: {
          scenarios: [
            {
              change: "Implementing new time-tracking software",
              stakeholders: [
                {
                  group: "Employees",
                  concern: "Feeling micromanaged and loss of trust",
                  solutions: [
                    "Emphasize efficiency benefits, not surveillance",
                    "Involve employees in selecting the software",
                    "Provide clear privacy policies",
                    "Threaten job loss if they don't comply"
                  ],
                  correctSolutions: [0, 1, 2]
                },
                {
                  group: "Managers",
                  concern: "Learning new system while managing teams",
                  solutions: [
                    "Provide comprehensive training sessions",
                    "Assign dedicated support during transition",
                    "Start with simplified features first",
                    "Tell them to figure it out themselves"
                  ],
                  correctSolutions: [0, 1, 2]
                }
              ]
            }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is implementation?",
        options: [
          "Creating initial strategy recommendations",
          "The process of carrying out recommendations and turning plans into actions",
          "Analyzing client data",
          "Writing final reports"
        ],
        correctAnswer: 1,
        explanation: "Implementation is the process of carrying out recommendations and strategies, involving turning plans into real actions."
      },
      {
        question: "What is change management?",
        options: [
          "Managing financial budgets",
          "Helping organizations and employees adjust to new processes",
          "Changing consulting fees",
          "Modifying project timelines"
        ],
        correctAnswer: 1,
        explanation: "Change management is helping organizations and employees adjust to new processes, reducing resistance and increasing success."
      },
      {
        question: "What does a roadmap show?",
        options: [
          "Geographic locations of offices",
          "A timeline showing how and when strategies will be implemented",
          "Competitor analysis results",
          "Financial projections"
        ],
        correctAnswer: 1,
        explanation: "A roadmap is a timeline showing how and when strategies will be implemented, keeping everyone aligned throughout the process."
      },
      {
        question: "In the bank example, what challenge did employees face?",
        options: [
          "Learning new software",
          "Worrying about job security",
          "Dealing with angry customers",
          "Working longer hours"
        ],
        correctAnswer: 1,
        explanation: "Some employees resisted the digital transformation because they were worried about job security, which required proper change management to address."
      },
      {
        question: "What is a pilot program?",
        options: [
          "A training course for airline pilots",
          "A small test run of a new system before full rollout",
          "A leadership development program",
          "A customer feedback survey"
        ],
        correctAnswer: 1,
        explanation: "A pilot program is a small test run of a new system before full rollout, reducing risk by catching problems early."
      }
    ],
    takeHomeActivity: "Think of a change you've seen at school (like new software or rules). Write 5–6 sentences describing how it was implemented and whether change management was handled well."
  },
  {
    id: 7,
    title: "The Future of Consulting",
    overview: "Management consulting is changing with technology and global trends. Firms now use artificial intelligence and big data to analyze problems faster. Clients expect consultants to provide not only strategies but also tools for long-term sustainability. There is also growing focus on areas like diversity, sustainability, and digital transformation. The consulting industry must adapt to remain valuable in a world where information is widely available. This level explores where consulting is headed next.",
    philsAnalogy: {
      title: "The Evolution from Horse-Drawn Carriages to Self-Driving Cars",
      content: "Think about how transportation evolved from horse-drawn carriages to modern cars, and now to self-driving vehicles. A hundred years ago, if you wanted to travel, you hired a carriage driver who knew the roads, had experience with horses, and could get you safely to your destination. The driver's value was in knowing the routes and handling the horses. As cars were invented, some carriage drivers adapted by learning to drive cars and becoming chauffeurs, while others who didn't adapt became obsolete. Now, with GPS and self-driving cars, even traditional drivers need to evolve - maybe becoming 'mobility consultants' who help plan complex trips or manage fleets. Similarly, consulting has evolved from being 'business carriage drivers' who just knew business routes, to using 'business cars' (computers and data analysis), and now we're entering the era of 'self-driving business solutions' with AI and big data. Future consultants won't just analyze data manually - they'll use AI to do that faster. Instead, they'll focus on uniquely human skills: understanding emotions, managing change, thinking creatively about problems that AI can't solve, and helping companies navigate the ethical and social aspects of business decisions. The consultants who adapt will thrive; those who don't may become obsolete."
    },
    flashcards: [
      {
        term: "Digital Transformation",
        definition: "Helping companies shift to using more technology in their operations. Consultants guide digital upgrades."
      },
      {
        term: "Big Data",
        definition: "Large sets of data analyzed to find trends and insights. Consulting firms use it to advise clients more accurately."
      },
      {
        term: "Sustainability Consulting",
        definition: "Advising companies on environmentally and socially responsible practices. This is a growing focus in consulting."
      },
      {
        term: "AI in Consulting",
        definition: "Using artificial intelligence to analyze data and model outcomes. AI makes recommendations faster and more precise."
      },
      {
        term: "Future Skills",
        definition: "Consultants need skills in technology, communication, and adaptability to succeed in the future."
      }
    ],
    realLifeExample: {
      title: "Manufacturing Sustainability Transformation",
      content: "A manufacturing company hires consultants to make operations more sustainable. The consulting team uses big data to track energy use and AI to model improvements. They recommend new systems that reduce waste and lower costs. The company saves millions while also meeting environmental goals."
    },
    miniGames: [
      {
        id: "trend-tracker",
        title: "Trend Tracker",
        description: "Classify consulting practices as future trends or past practices.",
        type: "classification",
        gameData: {
          items: [
            { text: "AI-powered data analysis", category: "Future", isCorrect: true },
            { text: "Manual spreadsheet calculations", category: "Past", isCorrect: true },
            { text: "Sustainability consulting", category: "Future", isCorrect: true },
            { text: "Virtual reality training programs", category: "Future", isCorrect: true },
            { text: "Paper-based presentations", category: "Past", isCorrect: true },
            { text: "Diversity and inclusion strategies", category: "Future", isCorrect: true },
            { text: "Fax machine communications", category: "Past", isCorrect: true },
            { text: "Digital transformation projects", category: "Future", isCorrect: true }
          ]
        }
      },
      {
        id: "future-skills-builder",
        title: "Future Skills Builder",
        description: "Build a consultant's skill profile for the future.",
        type: "skillBuilding",
        gameData: {
          skillCategories: [
            {
              name: "Technical Skills",
              skills: [
                { name: "Data Analysis", importance: "High", future: true },
                { name: "AI/Machine Learning", importance: "High", future: true },
                { name: "Digital Tools", importance: "Medium", future: true },
                { name: "Traditional Accounting", importance: "Low", future: false }
              ]
            },
            {
              name: "Human Skills",
              skills: [
                { name: "Emotional Intelligence", importance: "High", future: true },
                { name: "Change Management", importance: "High", future: true },
                { name: "Creative Problem-Solving", importance: "High", future: true },
                { name: "Routine Task Management", importance: "Low", future: false }
              ]
            },
            {
              name: "Business Skills",
              skills: [
                { name: "Sustainability Strategy", importance: "High", future: true },
                { name: "Digital Strategy", importance: "High", future: true },
                { name: "Cross-Cultural Communication", importance: "Medium", future: true },
                { name: "Traditional Industry Knowledge", importance: "Medium", future: false }
              ]
            }
          ]
        }
      }
    ],
    quiz: [
      {
        question: "What is digital transformation?",
        options: [
          "Converting paper documents to digital files",
          "Helping companies shift to using more technology in operations",
          "Training employees on computers",
          "Building new websites"
        ],
        correctAnswer: 1,
        explanation: "Digital transformation is helping companies shift to using more technology in their operations, with consultants guiding these digital upgrades."
      },
      {
        question: "What is big data used for in consulting?",
        options: [
          "Storing large files",
          "Analyzing large sets of data to find trends and insights",
          "Creating bigger presentations",
          "Managing employee databases"
        ],
        correctAnswer: 1,
        explanation: "Big data involves analyzing large sets of data to find trends and insights, which consulting firms use to advise clients more accurately."
      },
      {
        question: "What is sustainability consulting?",
        options: [
          "Helping companies last longer in business",
          "Advising on environmentally and socially responsible practices",
          "Consulting that lasts for many years",
          "Creating long-term contracts"
        ],
        correctAnswer: 1,
        explanation: "Sustainability consulting involves advising companies on environmentally and socially responsible practices, which is a growing focus in consulting."
      },
      {
        question: "How does AI help consulting firms?",
        options: [
          "It replaces all human consultants",
          "It analyzes data and models outcomes faster and more precisely",
          "It writes all client presentations",
          "It eliminates the need for client meetings"
        ],
        correctAnswer: 1,
        explanation: "AI helps consulting firms by analyzing data and modeling outcomes faster and more precisely, making recommendations more efficient."
      },
      {
        question: "In the manufacturing example, what did consultants recommend?",
        options: [
          "Hiring more employees",
          "New systems that reduce waste and lower costs",
          "Moving production overseas",
          "Increasing prices"
        ],
        correctAnswer: 1,
        explanation: "The consultants recommended new systems that reduce waste and lower costs, helping the company save millions while meeting environmental goals."
      }
    ],
    takeHomeActivity: "Write 6–7 sentences predicting how management consulting will look in 20 years. Will technology replace consultants, or will human problem-solving remain most important? Explain your reasoning."
  }
];

export const managementConsultingJourneyTitle = "Management Consulting Journey";
export const managementConsultingJourneyDescription = "Master the fundamentals of management consulting through 7 comprehensive levels covering everything from basic concepts to future trends.";