export interface PETerm {
  term: string;
  definition: string;
  analogy: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const privateEquityTerms: Record<string, PETerm> = {
  // Level 1 Terms - Introduction to Private Equity
  private_equity: {
    term: 'Private Equity',
    definition: 'Investment strategy that involves buying companies that are not publicly traded, or taking public companies private to restructure them.',
    analogy: "Think of it like buying a house to renovate and sell - PE firms buy companies to improve them and eventually sell for a profit. It's like being a house flipper, but with entire businesses!",
    category: 'fundamentals',
    difficulty: 'beginner'
  },
  general_partner: {
    term: 'General Partner (GP)',
    definition: 'The investment management team that makes investment decisions, manages the fund, and is responsible for day-to-day operations.',
    analogy: "Like the chef in a restaurant - they decide what's on the menu (which companies to buy), how to prepare the dishes (improve the companies), and run the kitchen (manage the fund).",
    category: 'fund_structure',
    difficulty: 'beginner'
  },
  limited_partner: {
    term: 'Limited Partner (LP)',
    definition: 'Investors who provide capital to the fund but have limited involvement in investment decisions, such as pension funds, endowments, and wealthy individuals.',
    analogy: "Like diners at a restaurant - they pay for the meal (invest money) and trust the chef (GP) to deliver great food (returns), but they don't cook themselves.",
    category: 'fund_structure',
    difficulty: 'beginner'
  },
  fund_structure: {
    term: 'Fund Structure',
    definition: 'The legal and organizational framework of a private equity fund, typically structured as a limited partnership.',
    analogy: "Like the blueprint of a house - it shows who has what role, who lives where (GPs vs LPs), and how everything works together.",
    category: 'fund_structure',
    difficulty: 'beginner'
  },
  committed_capital: {
    term: 'Committed Capital',
    definition: 'The total amount of money that investors have pledged to contribute to a private equity fund.',
    analogy: "Like having friends promise to chip in for a group vacation - they've committed to pay their share when it's time to book flights and hotels (make investments).",
    category: 'fund_structure',
    difficulty: 'beginner'
  },
  dry_powder: {
    term: 'Dry Powder',
    definition: 'The amount of committed capital that has not yet been invested or called from limited partners.',
    analogy: "Like having ammunition ready to use in battle - it's the 'dry gunpowder' (unused money) ready to deploy when the right opportunity comes along.",
    category: 'fund_structure',
    difficulty: 'beginner'
  },

  // Level 2 Terms - Investment Strategies & Deal Types
  leveraged_buyout: {
    term: 'Leveraged Buyout (LBO)',
    definition: 'The acquisition of a company using a significant amount of borrowed money to meet the cost of acquisition, with company assets often used as collateral.',
    analogy: "Like buying a rental property with a big mortgage - you use the property itself as collateral and plan to use rental income (company cash flow) to pay off the loan.",
    category: 'deal_types',
    difficulty: 'intermediate'
  },
  growth_equity: {
    term: 'Growth Equity',
    definition: 'Investment in mature companies that need capital to expand or restructure operations, enter new markets, or finance acquisitions.',
    analogy: "Like giving money to a successful food truck owner to open their first restaurant - they're already profitable but need capital to reach the next level.",
    category: 'strategies',
    difficulty: 'intermediate'
  },
  venture_capital: {
    term: 'Venture Capital',
    definition: 'Investment in early-stage companies with high growth potential, typically involving higher risk and potentially higher returns.',
    analogy: "Like investing in a friend's startup idea in their garage - high risk because it might fail, but huge potential if they become the next Apple!",
    category: 'strategies',
    difficulty: 'intermediate'
  },
  management_buyout: {
    term: 'Management Buyout (MBO)',
    definition: 'A transaction where a company\'s management team purchases the assets and operations of the business they manage.',
    analogy: "Like restaurant managers pooling money to buy the restaurant from the owner - they already know the business inside and out.",
    category: 'deal_types',
    difficulty: 'intermediate'
  },
  add_on_acquisition: {
    term: 'Add-on Acquisition',
    definition: 'A smaller acquisition made by a portfolio company to complement its existing business and create synergies.',
    analogy: "Like buying a neighboring house to expand your property - it adds value to what you already own and creates a bigger, more valuable asset.",
    category: 'deal_types',
    difficulty: 'intermediate'
  },
  platform_company: {
    term: 'Platform Company',
    definition: 'The initial, typically larger acquisition that serves as the foundation for additional add-on acquisitions in the same industry.',
    analogy: "Like buying a main house that you'll later expand with additions - it's the strong foundation you build upon with smaller acquisitions.",
    category: 'deal_types',
    difficulty: 'intermediate'
  },

  // Level 3 Terms - Due Diligence & Valuation
  due_diligence: {
    term: 'Due Diligence',
    definition: 'The comprehensive investigation and analysis of a potential investment opportunity to verify information and identify risks.',
    analogy: "Like getting a thorough home inspection before buying a house - you check the foundation, plumbing, electrical, and everything else to make sure there are no hidden problems.",
    category: 'process',
    difficulty: 'advanced'
  },
  dcf_valuation: {
    term: 'DCF Valuation',
    definition: 'Discounted Cash Flow analysis that values a company based on projected future cash flows discounted back to present value.',
    analogy: "Like calculating how much a fruit tree is worth by estimating all the fruit it will produce over its lifetime, then figuring out what that's worth in today's money.",
    category: 'valuation',
    difficulty: 'advanced'
  },
  comparable_company_analysis: {
    term: 'Comparable Company Analysis',
    definition: 'Valuation method that estimates a company\'s value by comparing it to similar companies in the same industry.',
    analogy: "Like pricing your house by looking at what similar houses in your neighborhood sold for recently - if comparable houses sold for $500K, yours is probably worth around that too.",
    category: 'valuation',
    difficulty: 'advanced'
  },
  management_presentation: {
    term: 'Management Presentation',
    definition: 'A formal presentation by company management to potential investors outlining the business strategy, financials, and growth prospects.',
    analogy: "Like a job interview where the company's management team pitches themselves and their business plan to convince investors they're worth backing.",
    category: 'process',
    difficulty: 'advanced'
  },
  quality_of_earnings: {
    term: 'Quality of Earnings',
    definition: 'Analysis that examines the sustainability and accuracy of a company\'s reported earnings and cash flows.',
    analogy: "Like checking if someone's high salary is from a stable job or just a one-time lottery win - you want to know if the earnings are sustainable and real.",
    category: 'due_diligence',
    difficulty: 'advanced'
  },
  synergies: {
    term: 'Synergies',
    definition: 'Additional value created when two companies are combined that exceeds the sum of their individual values.',
    analogy: "Like when two puzzle pieces fit together perfectly - the combined picture is more valuable than the two separate pieces sitting alone.",
    category: 'value_creation',
    difficulty: 'advanced'
  },

  // Level 4 Terms - Value Creation & Portfolio Management
  value_creation: {
    term: 'Value Creation',
    definition: 'The process of improving a portfolio company\'s operations, strategy, or financial structure to increase its value.',
    analogy: "Like renovating a house to increase its value - you might update the kitchen, add a bathroom, or improve the landscaping to make it worth more.",
    category: 'value_creation',
    difficulty: 'advanced'
  },
  operational_improvements: {
    term: 'Operational Improvements',
    definition: 'Changes to business processes, systems, or operations to increase efficiency, reduce costs, or improve performance.',
    analogy: "Like optimizing your daily routine to be more productive - maybe using apps to automate tasks or reorganizing your workspace for efficiency.",
    category: 'value_creation',
    difficulty: 'advanced'
  },
  strategic_initiatives: {
    term: 'Strategic Initiatives',
    definition: 'Major projects or changes implemented to achieve long-term business objectives and competitive advantages.',
    analogy: "Like a chess player thinking several moves ahead - strategic initiatives are the big moves you make now to set yourself up for success later.",
    category: 'value_creation',
    difficulty: 'advanced'
  },
  portfolio_monitoring: {
    term: 'Portfolio Monitoring',
    definition: 'The ongoing tracking and analysis of portfolio company performance against targets and benchmarks.',
    analogy: "Like regularly checking your health with doctor visits and fitness tracking - you monitor key metrics to make sure everything is on track.",
    category: 'portfolio_management',
    difficulty: 'advanced'
  },
  board_governance: {
    term: 'Board Governance',
    definition: 'The framework of rules, relationships, systems, and processes by which a company is controlled and directed.',
    analogy: "Like the rules and structure of a sports team - there are coaches (board members), plays to follow (governance), and regular team meetings to stay coordinated.",
    category: 'portfolio_management',
    difficulty: 'advanced'
  },
  key_performance_indicators: {
    term: 'Key Performance Indicators (KPIs)',
    definition: 'Measurable values that demonstrate how effectively a company is achieving key business objectives.',
    analogy: "Like vital signs for a business - just as doctors check your heart rate and blood pressure, investors track KPIs to see if the business is healthy.",
    category: 'portfolio_management',
    difficulty: 'advanced'
  },

  // Level 5 Terms - Exit Strategies & Returns
  exit_strategy: {
    term: 'Exit Strategy',
    definition: 'The planned method for liquidating an investment in a portfolio company to realize returns.',
    analogy: "Like planning how to sell your renovated house - you might sell to another family, rent it out, or sell to a developer. Each option has different timing and profit potential.",
    category: 'exits',
    difficulty: 'advanced'
  },
  ipo_process: {
    term: 'IPO Process',
    definition: 'Initial Public Offering - the process of taking a private company public by selling shares on a stock exchange.',
    analogy: "Like taking your private club public - suddenly anyone can buy membership (shares) and trade them with others on the open market.",
    category: 'exits',
    difficulty: 'advanced'
  },
  strategic_sale: {
    term: 'Strategic Sale',
    definition: 'Selling a portfolio company to another company that can achieve synergies or strategic benefits from the acquisition.',
    analogy: "Like selling your food truck to McDonald's - they might pay extra because they can use your recipes in all their restaurants, creating value beyond just your truck.",
    category: 'exits',
    difficulty: 'advanced'
  },
  secondary_buyout: {
    term: 'Secondary Buyout',
    definition: 'The sale of a portfolio company to another private equity firm rather than to a strategic buyer or through an IPO.',
    analogy: "Like selling your renovated house to another house flipper instead of a family - they see potential for further improvements and profits.",
    category: 'exits',
    difficulty: 'advanced'
  },
  irr_calculation: {
    term: 'IRR (Internal Rate of Return)',
    definition: 'A metric used to calculate the profitability of an investment, representing the annual rate of return that makes NPV equal to zero.',
    analogy: "Like calculating the annual interest rate you effectively earned on a savings account - but for complex investments with money going in and coming out at different times.",
    category: 'performance',
    difficulty: 'advanced'
  },
  multiple_of_money: {
    term: 'Multiple of Money (MoM)',
    definition: 'A return metric that shows how many times the original investment amount was returned to investors.',
    analogy: "Like saying 'I got back 3x my money' - if you invested $100 and got back $300, that's a 3x multiple. Simple math showing total return.",
    category: 'performance',
    difficulty: 'advanced'
  },

  // Level 6 Terms - Fund Management & Investor Relations
  fund_lifecycle: {
    term: 'Fund Lifecycle',
    definition: 'The typical 10-year journey of a private equity fund from fundraising through investment period to harvesting and distribution.',
    analogy: "Like the lifecycle of growing a garden - first you prepare and plant (fundraise and invest), then you tend and nurture (manage), finally you harvest and enjoy the fruits (exit and distribute).",
    category: 'fund_management',
    difficulty: 'advanced'
  },
  investor_relations: {
    term: 'Investor Relations',
    definition: 'The ongoing communication and relationship management between the fund managers and their limited partner investors.',
    analogy: "Like maintaining friendships - you regularly update friends on your life (fund performance), listen to their concerns, and keep them engaged so they'll want to stay friends (invest again).",
    category: 'fund_management',
    difficulty: 'advanced'
  },
  capital_calls: {
    term: 'Capital Calls',
    definition: 'Requests from the general partner to limited partners to contribute a portion of their committed capital for specific investments.',
    analogy: "Like your friend calling to collect on their promise to split dinner costs - they committed to pay, and now it's time to actually send the money for a specific deal.",
    category: 'fund_management',
    difficulty: 'advanced'
  },
  distributions: {
    term: 'Distributions',
    definition: 'Cash payments made to limited partners from the proceeds of portfolio company exits or other fund income.',
    analogy: "Like getting your share of lottery winnings from a group ticket - when the fund makes money from selling companies, they distribute your portion back to you.",
    category: 'fund_management',
    difficulty: 'advanced'
  },
  fund_performance: {
    term: 'Fund Performance',
    definition: 'Measurement of how well a fund has performed relative to expectations, benchmarks, and other comparable funds.',
    analogy: "Like your report card showing how you performed compared to other students - it measures your grades (returns) against the class average (benchmarks).",
    category: 'performance',
    difficulty: 'advanced'
  },
  benchmark_comparison: {
    term: 'Benchmark Comparison',
    definition: 'Evaluating fund performance against relevant market indices or peer group performance standards.',
    analogy: "Like comparing your running time to other people your age and fitness level - benchmarks help you understand if your performance is good, average, or needs improvement.",
    category: 'performance',
    difficulty: 'advanced'
  },

  // Level 7 Terms - Advanced Topics & Future Trends
  esg_investing: {
    term: 'ESG Investing',
    definition: 'Investment approach that considers Environmental, Social, and Governance factors alongside financial returns.',
    analogy: "Like choosing to shop at stores that align with your values - you still want good products (returns) but also care about how the store treats workers and the environment.",
    category: 'trends',
    difficulty: 'advanced'
  },
  impact_investing: {
    term: 'Impact Investing',
    definition: 'Investments made with the intention to generate positive, measurable social and environmental impact alongside financial return.',
    analogy: "Like investing in a solar panel company not just to make money, but also to help the environment - you're aiming for both profit and positive change.",
    category: 'trends',
    difficulty: 'advanced'
  },
  technology_disruption: {
    term: 'Technology Disruption',
    definition: 'The process by which new technologies fundamentally change or replace existing business models, markets, or industries.',
    analogy: "Like how smartphones disrupted cameras, maps, and music players - new technology completely changes how entire industries work.",
    category: 'trends',
    difficulty: 'advanced'
  },
  global_pe_markets: {
    term: 'Global PE Markets',
    definition: 'The worldwide private equity landscape including emerging markets, cross-border investments, and regional differences.',
    analogy: "Like exploring restaurants in different countries - each region has its own flavors (investment opportunities), local customs (regulations), and varying levels of development.",
    category: 'markets',
    difficulty: 'advanced'
  },
  regulatory_changes: {
    term: 'Regulatory Changes',
    definition: 'Modifications to laws, rules, and regulations that affect how private equity firms operate and invest.',
    analogy: "Like when the rules of your favorite sport change - players need to adapt their strategies to stay competitive under the new rulebook.",
    category: 'trends',
    difficulty: 'advanced'
  },
  market_evolution: {
    term: 'Market Evolution',
    definition: 'The ongoing changes in private equity markets driven by competition, technology, investor demands, and economic conditions.',
    analogy: "Like how fashion constantly evolves - what was trendy yesterday might be outdated today, so you need to stay current with changing styles and preferences.",
    category: 'trends',
    difficulty: 'advanced'
  }
};

export const getPETermsForLevel = (userLevel: string): Record<string, PETerm> => {
  const filteredTerms: Record<string, PETerm> = {};
  
  Object.entries(privateEquityTerms).forEach(([key, term]) => {
    if (userLevel === 'beginner' && term.difficulty === 'beginner') {
      filteredTerms[key] = term;
    } else if (userLevel === 'intermediate' && ['beginner', 'intermediate'].includes(term.difficulty)) {
      filteredTerms[key] = term;
    } else if (userLevel === 'advanced') {
      filteredTerms[key] = term;
    }
  });
  
  return filteredTerms;
};