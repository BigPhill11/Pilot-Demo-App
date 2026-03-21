import { InteractiveLessonContent } from '../investment-banking-lessons';

export interface SecondariesDivisionTerm {
  term: string;
  definition: string;
  analogy: string;
  level: number;
  category: 'secondaries_basics' | 'block_trading' | 'derivatives' | 'market_making' | 'electronic_trading';
}

// Secondaries Division Terms
export const secondariesDivisionTerms: Record<string, SecondariesDivisionTerm> = {
  // Level 1 - Secondaries Fundamentals
  secondary_markets: {
    term: 'Secondary Markets',
    definition: 'Markets where previously issued securities are traded between investors',
    analogy: 'Like a used car lot where people buy and sell cars that have already been owned',
    level: 1,
    category: 'secondaries_basics'
  },
  market_making: {
    term: 'Market Making',
    definition: 'Providing liquidity by being ready to buy or sell securities at quoted prices',
    analogy: 'Like a currency exchange booth that\'s always ready to trade dollars for euros at posted rates',
    level: 1,
    category: 'market_making'
  },
  bid_ask_spread: {
    term: 'Bid-Ask Spread',
    definition: 'The difference between the price someone will pay (bid) and the price someone will sell (ask)',
    analogy: 'Like the difference between what a pawn shop will pay for your guitar vs. what they\'ll sell it for',
    level: 1,
    category: 'market_making'
  },
  block_trade: {
    term: 'Block Trade',
    definition: 'A large transaction typically involving institutional investors',
    analogy: 'Like buying a whole case of soda instead of one bottle at a time',
    level: 1,
    category: 'block_trading'
  },
  liquidity: {
    term: 'Liquidity',
    definition: 'How easily and quickly an asset can be bought or sold without affecting its price',
    analogy: 'Like how easy it is to find someone to buy your phone - popular phones sell quickly, rare ones take time',
    level: 1,
    category: 'secondaries_basics'
  },

  // Level 2 - Trading & Execution
  institutional_sales: {
    term: 'Institutional Sales',
    definition: 'Selling securities and providing market insights to large institutional investors',
    analogy: 'Like being a specialized sales person who only works with big corporate customers',
    level: 2,
    category: 'secondaries_basics'
  },
  algorithmic_trading: {
    term: 'Algorithmic Trading',
    definition: 'Using computer programs to execute trades automatically based on predetermined criteria',
    analogy: 'Like having a smart thermostat that automatically adjusts temperature based on the weather',
    level: 2,
    category: 'electronic_trading'
  },
  dark_pools: {
    term: 'Dark Pools',
    definition: 'Private trading venues where large orders can be executed without revealing information to the market',
    analogy: 'Like a private poker game where you can\'t see other players\' cards or betting patterns',
    level: 2,
    category: 'electronic_trading'
  },
  program_trading: {
    term: 'Program Trading',
    definition: 'Simultaneously trading a basket of stocks, often to implement investment strategies',
    analogy: 'Like buying a complete outfit instead of shopping for each piece of clothing separately',
    level: 2,
    category: 'electronic_trading'
  },
  prime_brokerage: {
    term: 'Prime Brokerage',
    definition: 'Comprehensive services provided to hedge funds and institutional clients',
    analogy: 'Like a luxury concierge service that handles all your financial needs in one place',
    level: 2,
    category: 'secondaries_basics'
  },
  execution_quality: {
    term: 'Execution Quality',
    definition: 'How well trades are executed in terms of price, speed, and market impact',
    analogy: 'Like rating how well a delivery service performs - did they deliver quickly, safely, and cheaply?',
    level: 2,
    category: 'electronic_trading'
  },

  // Level 3 - Advanced Secondaries & Innovation
  high_frequency_trading: {
    term: 'High Frequency Trading (HFT)',
    definition: 'Ultra-fast computer trading that profits from tiny price differences over very short periods',
    analogy: 'Like a super-fast cashier who can handle thousands of transactions per second',
    level: 3,
    category: 'electronic_trading'
  },
  smart_order_routing: {
    term: 'Smart Order Routing',
    definition: 'Technology that automatically finds the best venues and prices for executing trades',
    analogy: 'Like GPS for trading that finds the fastest, cheapest route to complete your transaction',
    level: 3,
    category: 'electronic_trading'
  },
  market_fragmentation: {
    term: 'Market Fragmentation',
    definition: 'When trading for the same security occurs across multiple venues and platforms',
    analogy: 'Like having the same book sold at many different stores with slightly different prices',
    level: 3,
    category: 'electronic_trading'
  },
  latency_arbitrage: {
    term: 'Latency Arbitrage',
    definition: 'Profiting from speed advantages in receiving and acting on market information',
    analogy: 'Like being the first to know about a flash sale and buying before others find out',
    level: 3,
    category: 'electronic_trading'
  },
  cross_asset_trading: {
    term: 'Cross-Asset Trading',
    definition: 'Trading strategies that span multiple asset classes like stocks, bonds, and derivatives',
    analogy: 'Like a chef who can cook with any type of ingredient to create the perfect meal',
    level: 3,
    category: 'derivatives'
  }
};

// Secondaries Division Lessons
export const secondariesDivisionLessons: InteractiveLessonContent[] = [
  {
    level: 1,
    title: "Secondary Markets Fundamentals: The Trading Floor Revolution",
    description: "Master the basics of secondary markets and how securities trade after initial issuance",
    theme: "Secondaries Foundation",
    objectives: [
      "Understand the role of secondary markets in the financial system",
      "Learn how market making provides liquidity to investors",
      "Master bid-ask spreads and trading mechanics",
      "Explore block trading and institutional market dynamics"
    ],
    terminology: ['secondary_markets', 'market_making', 'bid_ask_spread', 'block_trade', 'liquidity'],
    keyTerms: ['secondary_markets', 'market_making', 'bid_ask_spread', 'block_trade', 'liquidity'],
    keyQuestions: [
      "Why are secondary markets essential for capital formation?",
      "How do market makers provide liquidity?",
      "What determines bid-ask spreads?",
      "Why do institutions prefer block trading?"
    ],
    miniGames: [
      {
        id: 'market-maker-simulator',
        name: 'Market Making Master',
        description: 'Provide liquidity and manage inventory while making bid-ask spreads',
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        id: 'block-trade-facilitator',
        name: 'Block Trading Coordinator',
        description: 'Execute large institutional trades while minimizing market impact',
        xpReward: 75,
        difficulty: 'beginner'
      }
    ],
    realWorldExamples: [
      {
        id: 'berkshire-block-sale-2022',
        title: "Warren Buffett's $4 Billion BYD Block Trade (2022)",
        company: "Berkshire Hathaway & BYD",
        year: 2022,
        description: "Warren Buffett's sale of BYD shares in 2022 demonstrated sophisticated block trading execution in international markets. Berkshire Hathaway needed to sell approximately $4 billion worth of BYD shares (about 20% of their position) without causing significant market disruption. Goldman Sachs and JPMorgan coordinated the complex cross-border block trade, which required careful execution across Hong Kong and other Asian markets. The banks used multiple techniques: breaking the large sale into smaller blocks over several weeks, utilizing dark pools to hide order information, and timing trades to coincide with natural market volumes. Market makers provided crucial liquidity by being ready to absorb large quantities of shares at competitive prices. The execution quality was measured by minimal market impact - BYD's stock price remained relatively stable despite the massive selling pressure. The banks' institutional sales teams worked closely with Asian hedge funds, sovereign wealth funds, and pension funds to find natural buyers for the shares. This case showcased how sophisticated secondary market infrastructure allows even massive transactions to be executed efficiently without disrupting market stability.",
        keyLearning: "Successful block trading requires sophisticated coordination between market makers, institutional sales teams, and multiple execution venues to minimize market impact while achieving best execution.",
        difficulty: 'beginner'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'secondary-market-purpose',
          question: "What is the primary economic function of secondary markets?",
          options: [
            "To help companies raise new capital",
            "To provide liquidity and price discovery for existing securities",
            "To regulate financial institutions",
            "To collect taxes on trading"
          ],
          correctAnswer: 1,
          explanation: "Secondary markets provide liquidity (ability to buy/sell easily) and price discovery, which makes investors more willing to buy securities in primary markets, ultimately helping capital formation.",
          difficulty: 'beginner'
        },
        {
          id: 'block-trade-advantage',
          question: "Why did Berkshire Hathaway use block trading techniques instead of selling all BYD shares at once?",
          options: [
            "To pay lower fees",
            "To comply with regulations",
            "To minimize market impact and get better execution prices",
            "To hide the transaction from competitors"
          ],
          correctAnswer: 2,
          explanation: "Block trading techniques help minimize market impact - selling $4 billion at once would have crashed the stock price, while sophisticated execution preserved value for Berkshire.",
          difficulty: 'beginner'
        }
      ]
    },
    practicalActivity: {
      name: "Design a Market Making Strategy",
      description: "Create a market making strategy for a popular technology stock.",
      steps: [
        "Stock: TechGiant Corp - Average daily volume 10M shares, current price $150",
        "Set bid-ask spread: Start with $149.95 bid / $150.05 ask (10 cent spread)",
        "Inventory management: Target neutral position, maximum 50,000 share long/short",
        "Risk controls: Widen spreads if volatility increases, reduce size in uncertain markets",
        "Profit calculation: 10 cents spread x 100,000 shares daily = $10,000 gross profit",
        "Monitor execution: Adjust quotes based on order flow and market conditions"
      ],
      deliverable: "A market making strategy document including spread targets, inventory limits, risk controls, and expected profitability analysis."
    }
  },
  {
    level: 2,
    title: "Electronic Trading & Execution: The Digital Revolution",
    description: "Navigate the world of algorithmic trading, dark pools, and electronic execution platforms",
    theme: "Electronic Trading",
    objectives: [
      "Master algorithmic trading strategies and their applications",
      "Understand dark pools and alternative trading systems",
      "Learn about program trading and institutional services",
      "Explore execution quality and best execution requirements"
    ],
    terminology: ['institutional_sales', 'algorithmic_trading', 'dark_pools', 'program_trading', 'prime_brokerage', 'execution_quality'],
    keyTerms: ['algorithmic_trading', 'dark_pools', 'program_trading', 'execution_quality'],
    keyQuestions: [
      "How do algorithmic trading strategies improve execution?",
      "What advantages do dark pools provide for large trades?",
      "When is program trading most effective?",
      "How is execution quality measured and optimized?"
    ],
    miniGames: [
      {
        id: 'algo-trading-optimizer',
        name: 'Algorithm Trading Designer',
        description: 'Design algorithmic trading strategies to optimize execution across multiple venues',
        xpReward: 85,
        difficulty: 'intermediate'
      },
      {
        id: 'dark-pool-strategist',
        name: 'Dark Pool Navigator',
        description: 'Execute large orders using dark pools while minimizing information leakage',
        xpReward: 90,
        difficulty: 'intermediate'
      }
    ],
    realWorldExamples: [
      {
        id: 'blackrock-algo-trading-2023',
        title: "BlackRock's $50 Billion Algorithmic Rebalancing (2023)",
        company: "BlackRock Inc.",
        year: 2023,
        description: "BlackRock's quarterly index fund rebalancing in March 2023 showcased the power of sophisticated algorithmic trading at institutional scale. As the world's largest asset manager, BlackRock needed to rebalance approximately $50 billion across hundreds of index funds to match changing index weights. The execution required coordinating trades in thousands of stocks across global markets within tight timeframes. BlackRock's Aladdin trading system employed multiple algorithmic strategies: TWAP (Time-Weighted Average Price) algorithms spread trades over several hours to minimize market impact, VWAP (Volume-Weighted Average Price) algorithms matched trading patterns to historical volumes, and implementation shortfall algorithms balanced market impact against timing risk. The execution utilized dozens of dark pools including Liquidnet, ITG Posit, and proprietary bank pools to hide large orders from the market. Smart order routing technology automatically found the best prices across 50+ trading venues. Prime brokerage relationships with Goldman Sachs, Morgan Stanley, and JPMorgan provided additional liquidity and financing. The result was exceptional execution quality: trades executed within 2 basis points of benchmark prices while generating minimal market impact despite the massive volumes.",
        keyLearning: "Large-scale institutional trading requires sophisticated algorithmic strategies, multiple execution venues, and advanced technology to achieve optimal execution quality while minimizing market impact.",
        difficulty: 'intermediate'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'dark-pool-benefit',
          question: "What was the main benefit of using dark pools in BlackRock's rebalancing?",
          options: [
            "Lower trading fees",
            "Faster execution speed",
            "Hiding large orders to prevent adverse price movement",
            "Access to more stocks"
          ],
          correctAnswer: 2,
          explanation: "Dark pools allow large institutional orders to be executed without revealing information to the market, preventing other traders from front-running or moving prices adversely.",
          difficulty: 'intermediate'
        },
        {
          id: 'execution-quality-measure',
          question: "How was BlackRock's execution quality measured at 2 basis points?",
          options: [
            "The difference between their trades and closing prices",
            "The difference between their execution prices and benchmark prices",
            "The time it took to complete all trades",
            "The number of venues used"
          ],
          correctAnswer: 1,
          explanation: "Execution quality is typically measured by comparing actual trade prices to benchmark prices (like VWAP or arrival price) - 2 basis points means trades were within 0.02% of benchmarks.",
          difficulty: 'intermediate'
        }
      ]
    },
    practicalActivity: {
      name: "Design an Algorithmic Trading Strategy",
      description: "Create a comprehensive algorithmic trading strategy for a large institutional order.",
      steps: [
        "Order: Sell 2 million shares of TechStock ($200/share, $400M total value)",
        "Market conditions: Average daily volume 5M shares, current volatility 25%",
        "Algorithm selection: Use TWAP over 4 hours to spread market impact",
        "Venue strategy: 40% dark pools, 35% primary exchange, 25% electronic networks",
        "Risk controls: Pause if stock moves >2%, maximum 20% of volume participation",
        "Execution schedule: 500K shares per hour, adjust based on market volumes"
      ],
      deliverable: "A detailed algorithmic trading plan including strategy selection, venue allocation, risk controls, and expected execution timeline."
    }
  },
  {
    level: 3,
    title: "Advanced Trading Technology: High-Frequency & Cross-Asset Strategies",
    description: "Master cutting-edge trading technology and sophisticated cross-asset execution strategies",
    theme: "Advanced Trading Tech",
    objectives: [
      "Understand high-frequency trading and its market impact",
      "Master smart order routing and venue optimization",
      "Navigate market fragmentation and liquidity provision",
      "Explore cross-asset trading and arbitrage strategies"
    ],
    terminology: ['high_frequency_trading', 'smart_order_routing', 'market_fragmentation', 'latency_arbitrage', 'cross_asset_trading'],
    keyTerms: ['high_frequency_trading', 'smart_order_routing', 'market_fragmentation', 'latency_arbitrage'],
    keyQuestions: [
      "How does high-frequency trading provide market liquidity?",
      "What challenges does market fragmentation create?",
      "How do smart order routing systems optimize execution?",
      "What role does latency play in modern trading?"
    ],
    miniGames: [
      {
        id: 'hft-strategy-builder',
        name: 'High-Frequency Trading Engineer',
        description: 'Build HFT strategies that provide liquidity while managing risk across microseconds',
        xpReward: 100,
        difficulty: 'advanced'
      },
      {
        id: 'cross-asset-arbitrageur',
        name: 'Cross-Asset Arbitrage Master',
        description: 'Identify and execute arbitrage opportunities across stocks, bonds, and derivatives',
        xpReward: 95,
        difficulty: 'advanced'
      }
    ],
    realWorldExamples: [
      {
        id: 'citadel-securities-hft-2023',
        title: "Citadel Securities: Dominant Market Making in the HFT Era (2023)",
        company: "Citadel Securities",
        year: 2023,
        description: "Citadel Securities' 2023 performance exemplified how high-frequency trading has transformed market making and liquidity provision. The firm handled approximately 27% of all U.S. equity trading volume, processing over 50 billion shares worth $1.5 trillion annually. Their HFT systems operate with latency measured in microseconds, using co-located servers at exchanges to minimize speed disadvantages. The technology stack includes custom hardware, optimized software, and direct market data feeds that process millions of price updates per second. Smart order routing algorithms simultaneously evaluate prices across 50+ trading venues, automatically directing orders to the best available liquidity. Market fragmentation across exchanges, dark pools, and alternative trading systems requires sophisticated technology to maintain competitive quotes. Citadel's cross-asset capabilities allow them to provide liquidity in stocks, options, ETFs, and fixed income simultaneously, using correlations between assets to manage risk. The firm's success demonstrates how HFT can provide valuable market liquidity - tighter spreads, faster execution, and consistent availability of quotes. However, critics argue that HFT advantages create an arms race in trading speed and may disadvantage traditional investors.",
        keyLearning: "High-frequency trading requires massive technology investments but can provide significant market liquidity benefits, though it raises questions about market fairness and the value of speed advantages.",
        difficulty: 'advanced'
      }
    ],
    interactiveQuiz: {
      questions: [
        {
          id: 'hft-market-benefit',
          question: "How does Citadel Securities' HFT activity benefit regular investors?",
          options: [
            "It guarantees higher stock prices",
            "It provides tighter bid-ask spreads and better liquidity",
            "It eliminates market volatility",
            "It only benefits institutional investors"
          ],
          correctAnswer: 1,
          explanation: "HFT market makers like Citadel provide continuous liquidity with tight spreads, meaning regular investors can buy and sell at better prices with less market impact.",
          difficulty: 'advanced'
        },
        {
          id: 'market-fragmentation-challenge',
          question: "What challenge does market fragmentation create for traders?",
          options: [
            "Too few trading venues available",
            "Orders must be split across multiple venues to find the best prices",
            "All venues have identical prices",
            "Fragmentation eliminates the need for smart order routing"
          ],
          correctAnswer: 1,
          explanation: "Market fragmentation means the same stock trades at slightly different prices across many venues, requiring sophisticated technology to find and access the best available liquidity.",
          difficulty: 'advanced'
        }
      ]
    },
    practicalActivity: {
      name: "Build a Smart Order Routing Algorithm",
      description: "Design an intelligent order routing system that optimizes execution across fragmented markets.",
      steps: [
        "Challenge: Execute 100,000 share order across 12 trading venues with different characteristics",
        "Venue analysis: Exchange A (tight spreads, low volume), Dark Pool B (large size, hidden), ECN C (fast execution)",
        "Routing logic: Check best prices, consider hidden liquidity, factor in fees and speed",
        "Dynamic adjustment: Reroute if venues become unavailable or prices change",
        "Performance metrics: Measure price improvement, fill rates, and execution speed",
        "Risk controls: Avoid concentration risk, monitor for venue outages"
      ],
      deliverable: "A comprehensive smart order routing algorithm specification including venue prioritization logic, performance monitoring, and risk management controls."
    }
  }
];