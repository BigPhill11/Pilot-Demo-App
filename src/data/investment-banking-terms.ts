export interface IBTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'basics' | 'ib_services' | 'ib_process' | 'ib_documents' | 'ma' | 'capital_markets' | 'trading' | 'compliance' | 'technology';
}

// Level 1: Welcome to Wall Street - Foundation terms
const level1Terms: Record<string, IBTerm> = {
  investment_bank: {
    term: 'Investment Bank',
    definition: 'A financial institution that helps companies raise money and provides advice on deals',
    analogy: 'Like a real estate agent who helps people buy and sell houses, but for companies',
    level: 1,
    category: 'basics'
  },
  ipo: {
    term: 'IPO',
    definition: 'Initial Public Offering: When a company sells shares to the public for the first time',
    analogy: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
    level: 1,
    category: 'basics'
  },
  merger: {
    term: 'Merger',
    definition: 'Two companies combining to become one',
    analogy: 'Two friend groups becoming one big group!',
    level: 1,
    category: 'basics'
  },
  financing: {
    term: 'Financing',
    definition: 'The process of providing money to companies for their business needs',
    analogy: 'Like getting a loan from your parents to start a business!',
    level: 1,
    category: 'basics'
  },
  client: {
    term: 'Client',
    definition: 'Company asking for investment banking help',
    analogy: 'A friend asking for important advice!',
    level: 1,
    category: 'basics'
  },
  stock: {
    term: 'Stock',
    definition: 'A piece of ownership in a company',
    analogy: 'Like owning a slice of pizza!',
    level: 1,
    category: 'basics'
  },
  capital: {
    term: 'Capital',
    definition: 'Money used to start or grow a business',
    analogy: 'Like seed money to plant and grow a garden!',
    level: 1,
    category: 'basics'
  }
};

// Level 2: The Deal Factory - Operations & Structure
const level2Terms: Record<string, IBTerm> = {
  underwriting: {
    term: 'Underwriting',
    definition: 'When investment banks buy securities from companies and sell them to investors, taking on the risk',
    analogy: 'Like a store buying products from manufacturers to sell to customers - the store takes the risk that customers will buy',
    level: 2,
    category: 'ib_services'
  },
  syndicate: {
    term: 'Syndicate',
    definition: 'A group of investment banks working together on a large deal to share risk and expertise',
    analogy: 'Like a team of friends pooling money to buy something expensive together - everyone shares the cost and risk',
    level: 2,
    category: 'ib_process'
  },
  prospectus: {
    term: 'Prospectus',
    definition: 'A detailed document describing a company and its stock offering for potential investors',
    analogy: 'Like a detailed product manual that tells you everything about what you\'re buying before you buy it',
    level: 2,
    category: 'ib_documents'
  },
  due_diligence: {
    term: 'Due Diligence',
    definition: 'Thorough investigation and analysis of a company before a deal',
    analogy: 'Like a detective investigating a crime scene to find all the clues',
    level: 2,
    category: 'ib_process'
  },
  pitch_book: {
    term: 'Pitch Book',
    definition: 'A presentation investment bankers create to pitch their services to potential clients',
    analogy: 'Like a portfolio showing your best work when applying for a job - it showcases what you can do',
    level: 2,
    category: 'ib_documents'
  },
  mandates: {
    term: 'Mandates',
    definition: 'When a company officially hires an investment bank to work on a specific deal or project',
    analogy: 'Like hiring a contractor for a home renovation - you give them official permission to do the work',
    level: 2,
    category: 'ib_process'
  },
  roadshow: {
    term: 'Roadshow',
    definition: 'A series of presentations by company management to potential investors before an IPO',
    analogy: 'Like a band going on tour to promote their new album before it releases',
    level: 2,
    category: 'ib_process'
  },
  bookrunner: {
    term: 'Bookrunner',
    definition: 'The lead investment bank that manages the order book and coordinates the deal',
    analogy: 'Like the director of a play who coordinates all the actors and crew',
    level: 2,
    category: 'ib_services'
  }
};

// Level 3: Mergers & Acquisitions - M&A Mastery
const level3Terms: Record<string, IBTerm> = {
  acquisition: {
    term: 'Acquisition',
    definition: 'When one company buys another company, with the target company becoming part of the buyer',
    analogy: 'Like a big fish eating a smaller fish - the smaller one becomes part of the bigger one',
    level: 3,
    category: 'ma'
  },
  hostile_takeover: {
    term: 'Hostile Takeover',
    definition: 'When one company tries to buy another company even though the target doesn\'t want to be bought',
    analogy: 'Like trying to buy someone\'s house even though they don\'t want to sell it',
    level: 3,
    category: 'ma'
  },
  synergies: {
    term: 'Synergies',
    definition: 'Benefits created when two companies work together that wouldn\'t exist if they operated separately',
    analogy: 'Like when two musicians play together and create better music than either could make alone',
    level: 3,
    category: 'ma'
  },
  valuation: {
    term: 'Valuation',
    definition: 'Determining the economic worth of a company or asset',
    analogy: 'Like getting your house appraised to find out its market value',
    level: 3,
    category: 'basics'
  },
  premium: {
    term: 'Premium',
    definition: 'The extra amount paid above a company\'s current market price in an acquisition',
    analogy: 'Like paying extra for a popular toy during the holidays',
    level: 3,
    category: 'ma'
  },
  accretion: {
    term: 'Accretion',
    definition: 'When an acquisition increases the buyer\'s earnings per share',
    analogy: 'Like adding a profitable lemonade stand to your existing business and making more money per store',
    level: 3,
    category: 'ma'
  },
  poison_pill: {
    term: 'Poison Pill',
    definition: 'A defense strategy that makes a company less attractive to hostile takeovers',
    analogy: 'Like putting a security system on your house to discourage burglars',
    level: 3,
    category: 'ma'
  }
};

// Level 4: Financial Modeling & Valuation Mastery - Technical skills
const level4Terms: Record<string, IBTerm> = {
  dcf_model: {
    term: 'DCF Model',
    definition: 'Discounted Cash Flow model that values a company by projecting future cash flows and discounting them to present value',
    analogy: 'Like calculating how much future allowance money is worth today',
    level: 4,
    category: 'basics'
  },
  comparable_companies: {
    term: 'Comparable Companies',
    definition: 'Valuation method that compares a company to similar public companies using trading multiples',
    analogy: 'Like comparing house prices in the same neighborhood to estimate your home\'s value',
    level: 4,
    category: 'basics'
  },
  precedent_transactions: {
    term: 'Precedent Transactions',
    definition: 'Valuation method using prices paid in similar past M&A deals',
    analogy: 'Like looking at recent home sales to price your house',
    level: 4,
    category: 'basics'
  },
  lbo_model: {
    term: 'LBO Model',
    definition: 'Leveraged Buyout model that analyzes acquiring a company using significant debt financing',
    analogy: 'Like buying a rental property with a big mortgage and using rental income to pay it off',
    level: 4,
    category: 'basics'
  },
  accretion_dilution: {
    term: 'Accretion/Dilution',
    definition: 'Analysis of whether an acquisition increases or decreases the buyer\'s earnings per share',
    analogy: 'Like checking if adding a new store will increase or decrease your profit per location',
    level: 4,
    category: 'basics'
  },
  beta: {
    term: 'Beta',
    definition: 'A measure of how much a stock moves relative to the overall market',
    analogy: 'Like measuring how much your mood changes compared to the weather',
    level: 4,
    category: 'basics'
  },
  wacc: {
    term: 'WACC',
    definition: 'Weighted Average Cost of Capital: the average rate a company pays to finance its assets',
    analogy: 'Like the average interest rate you pay across all your credit cards and loans',
    level: 4,
    category: 'basics'
  },
  terminal_value: {
    term: 'Terminal Value',
    definition: 'The value of a company beyond the explicit forecast period in a DCF model',
    analogy: 'Like estimating how much a tree will be worth when it\'s fully grown',
    level: 4,
    category: 'basics'
  },
  sensitivity_analysis: {
    term: 'Sensitivity Analysis',
    definition: 'Testing how changes in key assumptions affect the valuation outcome',
    analogy: 'Like checking how much your pizza budget changes if gas prices go up or down',
    level: 4,
    category: 'basics'
  },
  monte_carlo: {
    term: 'Monte Carlo',
    definition: 'A mathematical technique that uses random sampling to model complex financial scenarios',
    analogy: 'Like running thousands of coin flips to predict probability outcomes',
    level: 4,
    category: 'basics'
  },
  irr: {
    term: 'IRR',
    definition: 'Internal Rate of Return: the annual rate of growth an investment is expected to generate',
    analogy: 'Like the interest rate your savings account would need to match your investment returns',
    level: 4,
    category: 'basics'
  },
  npv: {
    term: 'NPV',
    definition: 'Net Present Value: the value of future cash flows minus the initial investment, in today\'s dollars',
    analogy: 'Like calculating if a lemonade stand is worth starting after accounting for setup costs',
    level: 4,
    category: 'basics'
  },
  financial_modeling: {
    term: 'Financial Modeling',
    definition: 'Building mathematical representations of a company\'s financial performance and projections',
    analogy: 'Like creating a detailed blueprint that predicts how a business will perform',
    level: 4,
    category: 'basics'
  }
};

// Level 5: Deal Execution & Project Management - Deal Leadership  
const level5Terms: Record<string, IBTerm> = {
  deal_timeline: {
    term: 'Deal Timeline',
    definition: 'The sequence of activities and milestones from deal initiation to closing',
    analogy: 'Like a wedding planning timeline that tracks all the steps from engagement to the big day',
    level: 5,
    category: 'ib_process'
  },
  closing_conditions: {
    term: 'Closing Conditions',
    definition: 'Requirements that must be met before a transaction can be completed',
    analogy: 'Like a checklist of things that must be done before you can move into a new house',
    level: 5,
    category: 'ib_process'
  },
  regulatory_approvals: {
    term: 'Regulatory Approvals',
    definition: 'Permission from government agencies required for certain transactions',
    analogy: 'Like getting a permit from the city before you can renovate your house',
    level: 5,
    category: 'ib_process'
  },
  fairness_opinion: {
    term: 'Fairness Opinion',
    definition: 'An independent assessment of whether a transaction price is fair to shareholders',
    analogy: 'Like getting a second opinion from a doctor to make sure the diagnosis is correct',
    level: 5,
    category: 'ib_documents'
  },
  comfort_letters: {
    term: 'Comfort Letters',
    definition: 'Letters from auditors providing assurance about financial information in securities offerings',
    analogy: 'Like a teacher writing a reference letter confirming a student\'s grades are accurate',
    level: 5,
    category: 'ib_documents'
  },
  material_adverse_change: {
    term: 'Material Adverse Change',
    definition: 'A significant negative event that could affect the value or operations of a company',
    analogy: 'Like discovering your dream house has major foundation problems after signing the contract',
    level: 5,
    category: 'ib_process'
  },
  escrow_account: {
    term: 'Escrow Account',
    definition: 'A neutral third-party account that holds funds until certain conditions are met',
    analogy: 'Like having a trusted friend hold money until both parties complete their parts of a deal',
    level: 5,
    category: 'ib_process'
  },
  representations_warranties: {
    term: 'Representations & Warranties',
    definition: 'Statements about the company\'s condition that the seller guarantees to be true',
    analogy: 'Like a seller promising that a used car has no hidden problems and will work as described',
    level: 5,
    category: 'ib_process'
  }
};

// Level 6: Industry Specialization & Sector Expertise - Sector Mastery
const level6Terms: Record<string, IBTerm> = {
  sector_coverage: {
    term: 'Sector Coverage',
    definition: 'Investment banking groups that specialize in specific industries',
    analogy: 'Like doctors who specialize in different parts of the body - heart, brain, etc.',
    level: 6,
    category: 'ib_services'
  },
  industry_multiples: {
    term: 'Industry Multiples',
    definition: 'Valuation ratios specific to companies in the same industry',
    analogy: 'Like comparing prices per square foot for houses in the same neighborhood',
    level: 6,
    category: 'basics'
  },
  regulatory_landscape: {
    term: 'Regulatory Landscape',
    definition: 'The complex set of rules and regulations governing a specific industry',
    analogy: 'Like the different traffic rules for highways, city streets, and school zones',
    level: 6,
    category: 'compliance'
  },
  sector_cyclicality: {
    term: 'Sector Cyclicality',
    definition: 'How much an industry\'s performance varies with economic cycles',
    analogy: 'Like how ice cream sales go up in summer and down in winter',
    level: 6,
    category: 'basics'
  },
  technology_valuations: {
    term: 'Technology Valuations',
    definition: 'Specialized methods for valuing tech companies that may not have profits yet',
    analogy: 'Like valuing a promising athlete before they turn professional',
    level: 6,
    category: 'basics'
  },
  healthcare_regulations: {
    term: 'Healthcare Regulations',
    definition: 'Complex rules governing medical devices, drugs, and healthcare services',
    analogy: 'Like the strict safety rules for amusement park rides',
    level: 6,
    category: 'compliance'
  },
  energy_commodities: {
    term: 'Energy Commodities',
    definition: 'Raw materials like oil, gas, and electricity that drive energy company valuations',
    analogy: 'Like the ingredients that determine how much a restaurant can charge for meals',
    level: 6,
    category: 'basics'
  },
  financial_services_metrics: {
    term: 'Financial Services Metrics',
    definition: 'Special measures like return on equity and net interest margin used for banks',
    analogy: 'Like using different scorecards for baseball vs football players',
    level: 6,
    category: 'basics'
  },
  biotech_risks: {
    term: 'Biotech Risks',
    definition: 'Unique uncertainties in drug development including regulatory and clinical trial risks',
    analogy: 'Like the uncertainty of whether a science experiment will work',
    level: 6,
    category: 'basics'
  }
};

// Level 7: Advanced Topics & Future of Investment Banking - Innovation & Future
const level7Terms: Record<string, IBTerm> = {
  fintech_disruption: {
    term: 'FinTech Disruption',
    definition: 'How technology companies are changing traditional financial services',
    analogy: 'Like how streaming services changed how we watch movies',
    level: 7,
    category: 'technology'
  },
  esg_investing: {
    term: 'ESG Investing',
    definition: 'Environmental, Social, and Governance factors considered in investment decisions',
    analogy: 'Like choosing to shop at stores that treat workers well and protect the environment',
    level: 7,
    category: 'basics'
  },
  blockchain_finance: {
    term: 'Blockchain Finance',
    definition: 'Using distributed ledger technology for financial transactions and record-keeping',
    analogy: 'Like having a public ledger that everyone can see but no one can cheat',
    level: 7,
    category: 'technology'
  },
  automated_trading: {
    term: 'Automated Trading',
    definition: 'Computer programs that execute trades based on algorithms without human intervention',
    analogy: 'Like having a smart thermostat that adjusts temperature automatically',
    level: 7,
    category: 'technology'
  },
  digital_assets: {
    term: 'Digital Assets',
    definition: 'Cryptocurrencies, NFTs, and other blockchain-based financial instruments',
    analogy: 'Like digital baseball cards that exist only on computers but have real value',
    level: 7,
    category: 'technology'
  },
  sustainable_finance: {
    term: 'Sustainable Finance',
    definition: 'Financial services that consider environmental and social impact alongside profit',
    analogy: 'Like investing in companies that make money while also helping the planet',
    level: 7,
    category: 'basics'
  },
  quantum_computing: {
    term: 'Quantum Computing',
    definition: 'Advanced computing technology that could revolutionize financial modeling and risk analysis',
    analogy: 'Like having a super-computer that can solve puzzles millions of times faster',
    level: 7,
    category: 'technology'
  },
  regtech: {
    term: 'RegTech',
    definition: 'Technology solutions that help financial firms comply with regulations more efficiently',
    analogy: 'Like having a smart assistant that automatically files your taxes correctly',
    level: 7,
    category: 'technology'
  },
  cryptoassets: {
    term: 'Crypto Assets',
    definition: 'Digital currencies and tokens that use cryptography for security',
    analogy: 'Like digital money that uses secret codes to make sure it can\'t be counterfeited',
    level: 7,
    category: 'technology'
  }
};

// Combine all terms
const allTerms = {
  ...level1Terms,
  ...level2Terms,
  ...level3Terms,
  ...level4Terms,
  ...level5Terms,
  ...level6Terms,
  ...level7Terms
};

export const getIBTermsForLevel = (level: string | number): Record<string, IBTerm> => {
  const levelNum = typeof level === 'string' ? parseInt(level) : level;
  
  switch (levelNum) {
    case 1:
      return level1Terms;
    case 2:
      return { ...level1Terms, ...level2Terms };
    case 3:
      return { ...level1Terms, ...level2Terms, ...level3Terms };
    case 4:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms };
    case 5:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms, ...level5Terms };
    case 6:
      return { ...level1Terms, ...level2Terms, ...level3Terms, ...level4Terms, ...level5Terms, ...level6Terms };
    case 7:
      return allTerms;
    default:
      // For backward compatibility with old beginner/intermediate/advanced system
      if (level === 'beginner') return level1Terms;
      if (level === 'intermediate') return { ...level1Terms, ...level2Terms, ...level3Terms };
      if (level === 'advanced') return allTerms;
      return level1Terms;
  }
};

export { allTerms };