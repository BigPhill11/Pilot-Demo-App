export interface ConsultingTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'basics' | 'frameworks' | 'problem_solving' | 'strategy' | 'operations' | 'digital' | 'leadership';
}

// Level 1: Consulting Foundations
const level1Terms: Record<string, ConsultingTerm> = {
  management_consulting: {
    term: 'Management Consulting',
    definition: 'Professional service that helps organizations improve performance through analysis and recommendations',
    analogy: 'Like a personal trainer for businesses - helping them get stronger and perform better!',
    level: 1,
    category: 'basics'
  },
  client: {
    term: 'Client',
    definition: 'The organization that hires consultants to solve their business problems',
    analogy: 'Like a friend who asks for advice on how to improve their life!',
    level: 1,
    category: 'basics'
  },
  engagement: {
    term: 'Engagement',
    definition: 'A consulting project or assignment with a specific client',
    analogy: 'Like a cooking lesson with a clear recipe and goal to make the perfect dish!',
    level: 1,
    category: 'basics'
  },
  hypothesis: {
    term: 'Hypothesis',
    definition: 'An educated guess about the solution to a business problem',
    analogy: 'Like making a prediction about who will win a game based on what you know!',
    level: 1,
    category: 'problem_solving'
  },
  insights: {
    term: 'Insights',
    definition: 'Key findings and understanding that lead to actionable recommendations',
    analogy: 'Like discovering the secret ingredient that makes a recipe amazing!',
    level: 1,
    category: 'problem_solving'
  },
  deliverable: {
    term: 'Deliverable',
    definition: 'The final output or work product that consultants provide to clients',
    analogy: 'Like the final project you turn in at school - your completed work!',
    level: 1,
    category: 'basics'
  }
};

// Level 2: Problem-Solving Fundamentals
const level2Terms: Record<string, ConsultingTerm> = {
  issue_tree: {
    term: 'Issue Tree',
    definition: 'A structured way to break down complex problems into smaller, manageable parts',
    analogy: 'Like organizing your closet by creating categories and subcategories!',
    level: 2,
    category: 'problem_solving'
  },
  mece: {
    term: 'MECE',
    definition: 'Mutually Exclusive, Collectively Exhaustive - a principle for organizing information without gaps or overlaps',
    analogy: 'Like making sure every piece of a puzzle fits in exactly one place!',
    level: 2,
    category: 'frameworks'
  },
  root_cause: {
    term: 'Root Cause',
    definition: 'The fundamental reason behind a problem, not just its symptoms',
    analogy: 'Like finding out why your phone battery dies quickly instead of just charging it more!',
    level: 2,
    category: 'problem_solving'
  },
  case_interview: {
    term: 'Case Interview',
    definition: 'A type of job interview where candidates solve business problems in real-time',
    analogy: 'Like a cooking competition where you have to create a dish with mystery ingredients!',
    level: 2,
    category: 'basics'
  },
  framework: {
    term: 'Framework',
    definition: 'A structured approach or template for analyzing business problems',
    analogy: 'Like a recipe template that helps you cook different dishes systematically!',
    level: 2,
    category: 'frameworks'
  }
};

// Level 3: Strategic Analysis
const level3Terms: Record<string, ConsultingTerm> = {
  five_forces: {
    term: 'Five Forces',
    definition: 'Porter\'s framework for analyzing industry competition and profitability',
    analogy: 'Like understanding all the players in a video game to develop the best strategy!',
    level: 3,
    category: 'frameworks'
  },
  bcg_matrix: {
    term: 'BCG Matrix',
    definition: 'Framework that categorizes business units based on market growth and market share',
    analogy: 'Like organizing your investments into categories based on their growth and performance!',
    level: 3,
    category: 'frameworks'
  },
  value_chain: {
    term: 'Value Chain',
    definition: 'The series of activities that create value in a business from inputs to final product',
    analogy: 'Like the assembly line process that turns raw materials into a finished car!',
    level: 3,
    category: 'strategy'
  },
  swot_analysis: {
    term: 'SWOT Analysis',
    definition: 'Framework examining Strengths, Weaknesses, Opportunities, and Threats',
    analogy: 'Like doing a health check-up to understand what\'s working well and what needs improvement!',
    level: 3,
    category: 'frameworks'
  },
  market_sizing: {
    term: 'Market Sizing',
    definition: 'Estimating the total addressable market for a product or service',
    analogy: 'Like estimating how many pizzas you could sell in your neighborhood!',
    level: 3,
    category: 'strategy'
  },
  competitive_advantage: {
    term: 'Competitive Advantage',
    definition: 'What makes a company better than its competitors in a sustainable way',
    analogy: 'Like having a secret superpower that helps you win consistently!',
    level: 3,
    category: 'strategy'
  }
};

// Level 4: Operations Excellence
const level4Terms: Record<string, ConsultingTerm> = {
  process_optimization: {
    term: 'Process Optimization',
    definition: 'Improving business processes to increase efficiency and reduce waste',
    analogy: 'Like finding the fastest route to school and eliminating unnecessary stops!',
    level: 4,
    category: 'operations'
  },
  lean_methodology: {
    term: 'Lean Methodology',
    definition: 'Approach focused on eliminating waste and maximizing value creation',
    analogy: 'Like decluttering your room to keep only what adds value and makes you happy!',
    level: 4,
    category: 'operations'
  },
  kpi: {
    term: 'KPI',
    definition: 'Key Performance Indicators - metrics that measure success toward objectives',
    analogy: 'Like tracking your grades to see how well you\'re doing in school!',
    level: 4,
    category: 'operations'
  },
  cost_reduction: {
    term: 'Cost Reduction',
    definition: 'Strategies to decrease expenses while maintaining quality and performance',
    analogy: 'Like finding ways to save money on groceries without eating less healthy food!',
    level: 4,
    category: 'operations'
  },
  benchmarking: {
    term: 'Benchmarking',
    definition: 'Comparing performance against industry standards or best-in-class companies',
    analogy: 'Like comparing your running time to other runners to see where you stand!',
    level: 4,
    category: 'operations'
  }
};

// Level 5: Digital Transformation
const level5Terms: Record<string, ConsultingTerm> = {
  digital_transformation: {
    term: 'Digital Transformation',
    definition: 'Integrating digital technology into all areas of business to improve operations and value',
    analogy: 'Like upgrading from handwritten notes to digital apps for everything you do!',
    level: 5,
    category: 'digital'
  },
  agile_methodology: {
    term: 'Agile Methodology',
    definition: 'Iterative approach to project management emphasizing flexibility and collaboration',
    analogy: 'Like building with LEGO blocks - you can quickly adjust and improve as you go!',
    level: 5,
    category: 'digital'
  },
  automation: {
    term: 'Automation',
    definition: 'Using technology to perform tasks with minimal human intervention',
    analogy: 'Like having a robot vacuum that cleans your room while you focus on other things!',
    level: 5,
    category: 'digital'
  },
  data_analytics: {
    term: 'Data Analytics',
    definition: 'Examining data to uncover insights and inform business decisions',
    analogy: 'Like being a detective who solves mysteries by examining clues and patterns!',
    level: 5,
    category: 'digital'
  },
  customer_journey: {
    term: 'Customer Journey',
    definition: 'The complete experience customers have when interacting with a company',
    analogy: 'Like mapping out every step of planning and going on a vacation!',
    level: 5,
    category: 'digital'
  },
  scalability: {
    term: 'Scalability',
    definition: 'The ability of a business to grow and handle increased demand efficiently',
    analogy: 'Like a restaurant that can serve more customers without compromising food quality!',
    level: 5,
    category: 'digital'
  }
};

// Level 6: Change Management
const level6Terms: Record<string, ConsultingTerm> = {
  change_management: {
    term: 'Change Management',
    definition: 'Structured approach to transitioning individuals and organizations to achieve desired outcomes',
    analogy: 'Like helping everyone adjust to a new school schedule smoothly and successfully!',
    level: 6,
    category: 'leadership'
  },
  stakeholder_management: {
    term: 'Stakeholder Management',
    definition: 'Identifying and managing relationships with all parties affected by a project',
    analogy: 'Like organizing a party and making sure everyone involved is happy and informed!',
    level: 6,
    category: 'leadership'
  },
  organizational_design: {
    term: 'Organizational Design',
    definition: 'Creating optimal structure, roles, and processes to achieve business objectives',
    analogy: 'Like designing the perfect team formation for a sports game to maximize performance!',
    level: 6,
    category: 'leadership'
  },
  culture_transformation: {
    term: 'Culture Transformation',
    definition: 'Changing the shared values, beliefs, and behaviors within an organization',
    analogy: 'Like changing the atmosphere and traditions of a club to make it more inclusive and fun!',
    level: 6,
    category: 'leadership'
  },
  communication_strategy: {
    term: 'Communication Strategy',
    definition: 'Planned approach to delivering key messages to target audiences effectively',
    analogy: 'Like planning how to announce important news to different groups in the best way!',
    level: 6,
    category: 'leadership'
  }
};

// Level 7: Strategic Leadership
const level7Terms: Record<string, ConsultingTerm> = {
  strategic_planning: {
    term: 'Strategic Planning',
    definition: 'Long-term organizational planning to achieve competitive advantage and sustainable growth',
    analogy: 'Like planning your entire high school career to get into your dream college!',
    level: 7,
    category: 'leadership'
  },
  scenario_planning: {
    term: 'Scenario Planning',
    definition: 'Creating multiple future scenarios to prepare for different possibilities',
    analogy: 'Like planning for different weather conditions before a camping trip!',
    level: 7,
    category: 'strategy'
  },
  executive_presence: {
    term: 'Executive Presence',
    definition: 'The ability to connect authentically with others to motivate and inspire action',
    analogy: 'Like being the kind of leader that people naturally want to follow and trust!',
    level: 7,
    category: 'leadership'
  },
  thought_leadership: {
    term: 'Thought Leadership',
    definition: 'Being recognized as an authority in a particular area through innovative ideas and insights',
    analogy: 'Like becoming the go-to person everyone asks for advice in your field of expertise!',
    level: 7,
    category: 'leadership'
  },
  board_advisory: {
    term: 'Board Advisory',
    definition: 'Providing strategic guidance and oversight to company boards of directors',
    analogy: 'Like being the wise mentor who helps guide important decisions for an entire organization!',
    level: 7,
    category: 'leadership'
  },
  industry_expertise: {
    term: 'Industry Expertise',
    definition: 'Deep knowledge and understanding of specific industry dynamics, trends, and challenges',
    analogy: 'Like becoming a master chef who knows everything about ingredients, techniques, and food trends!',
    level: 7,
    category: 'strategy'
  }
};

// Combine all terms
const allConsultingTerms = {
  ...level1Terms,
  ...level2Terms,
  ...level3Terms,
  ...level4Terms,
  ...level5Terms,
  ...level6Terms,
  ...level7Terms
};

export { allConsultingTerms as consultingTerms };

// Export terms by level for easy access
export const consultingTermsByLevel = {
  1: level1Terms,
  2: level2Terms,
  3: level3Terms,
  4: level4Terms,
  5: level5Terms,
  6: level6Terms,
  7: level7Terms
};