export interface AssetManagementFlashcard {
  term: string;
  definition: string;
}

export interface AssetManagementDragDropActivity {
  title: string;
  description: string;
  items: Array<{
    id: string;
    content: string;
    category: string;
  }>;
  categories: Array<{
    id: string;
    title: string;
    description: string;
  }>;
}

export interface AssetManagementMiniGame {
  title: string;
  description: string;
  type: 'role-match' | 'quiz-showdown' | 'stock-detective' | 'valuation-battle' | 'portfolio-builder' | 'risk-radar' | 'hedge-game';
  gameData: any;
}

export interface AssetManagementLevel {
  id: number;
  title: string;
  description: string;
  overview: string;
  realLifeExample: string;
  flashcards: AssetManagementFlashcard[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  miniGames: AssetManagementMiniGame[];
  activity?: AssetManagementDragDropActivity;
}

export const assetManagementJourneyData: AssetManagementLevel[] = [
  {
    id: 1,
    title: "The Asset Management Industry",
    description: "Learn the foundations of asset management and its key players",
    overview: "Asset management is the business of managing money for others. Think of it like a coach who decides strategies for a team — only here the 'team' is made of investments like stocks, bonds, or real estate. Asset managers invest money to help clients reach goals such as retirement, education savings, or growing company funds. To ensure trust, managers follow rules from regulators and uphold fiduciary duty, which means acting in the best interest of clients, not themselves. This level introduces the industry, its purpose, and its main players.",
    realLifeExample: "Imagine you're a firefighter saving for retirement through your pension plan. Each month, part of your paycheck goes into the plan, which then hires an asset management firm like Vanguard or BlackRock to invest it. The firm pools your money with thousands of others and invests in stocks, bonds, and real estate so it grows steadily over decades. The asset manager must follow strict rules and uphold fiduciary duty, meaning they are legally required to act in your best interest — not their own. Thanks to this system, when you retire, your savings will have grown into a reliable income stream without you having to track markets every day.",
    flashcards: [
      {
        term: "Asset Management",
        definition: "Asset management is the professional service of investing money on behalf of individuals or institutions. The goal is to grow wealth and manage risks so clients can achieve financial goals like retirement or education savings."
      },
      {
        term: "Asset Manager",
        definition: "An asset manager is a person or firm that makes investment decisions for clients. They decide how to allocate money across stocks, bonds, and other assets to balance safety and growth."
      },
      {
        term: "Fiduciary Duty",
        definition: "Fiduciary duty is the legal responsibility to always act in the best interest of clients. For example, an asset manager cannot recommend an investment just because it earns them higher fees."
      },
      {
        term: "Regulation",
        definition: "Regulation refers to the laws and rules that keep financial markets fair, transparent, and safe. Regulators like the SEC in the U.S. monitor firms to prevent fraud and protect investors."
      },
      {
        term: "Active vs. Passive Management",
        definition: "Active management means an investor or manager chooses investments individually to try to beat the market. Passive management simply follows a market index, like the S&P 500, to match market returns at low cost."
      },
      {
        term: "Clients",
        definition: "Clients are the people or institutions who provide money for asset managers to invest. Examples include teachers with retirement accounts, corporations with extra cash, or governments managing pension funds."
      }
    ],
    quiz: [
      {
        question: "What does fiduciary duty mean, and why is it critical for asset managers?",
        options: [
          "The duty to maximize profits at any cost",
          "The legal responsibility to always act in the best interest of clients",
          "The requirement to follow market trends",
          "The obligation to guarantee returns"
        ],
        correctAnswer: 1,
        explanation: "Fiduciary duty requires asset managers to always act in their clients' best interests, not their own. This legal responsibility ensures trust and prevents conflicts of interest."
      },
      {
        question: "In the Role Match Simulator mini game, which role ensures laws are followed?",
        options: [
          "Asset Manager",
          "Regulator",
          "Investor",
          "Client"
        ],
        correctAnswer: 1,
        explanation: "Regulators like the SEC ensure that laws and rules are followed in financial markets to protect investors and maintain fair trading."
      },
      {
        question: "Explain the difference between active and passive management using an example.",
        options: [
          "Active tries to beat the market, passive follows an index",
          "Active is cheaper, passive is more expensive",
          "Active uses bonds, passive uses stocks",
          "There is no difference between them"
        ],
        correctAnswer: 0,
        explanation: "Active management involves picking individual investments to try to beat the market, while passive management follows a market index like the S&P 500 to match market returns."
      },
      {
        question: "In the firefighter pension example, why is regulation important for protecting their retirement savings?",
        options: [
          "It guarantees profits",
          "It prevents fraud and ensures fiduciary duty",
          "It eliminates all investment risks",
          "It allows unlimited returns"
        ],
        correctAnswer: 1,
        explanation: "Regulation prevents fraud and ensures asset managers follow fiduciary duty, protecting workers' retirement savings from mismanagement or conflicts of interest."
      },
      {
        question: "In the Industry Quiz Showdown, which is true about asset managers?",
        options: [
          "Asset managers invest only their own money",
          "Asset managers invest clients' money",
          "Asset managers never face regulations",
          "Asset managers guarantee returns"
        ],
        correctAnswer: 1,
        explanation: "Asset managers invest money on behalf of their clients, not their own money. They manage portfolios for individuals, institutions, and organizations."
      }
    ],
    miniGames: [
      {
        title: "Role Match Simulator",
        description: "Match roles to their correct responsibilities in the asset management industry",
        type: "role-match",
        gameData: {
          roles: [
            { id: "investor", name: "Investor", description: "Provides money to be invested" },
            { id: "regulator", name: "Regulator", description: "Ensures laws are followed" },
            { id: "asset-manager", name: "Asset Manager", description: "Makes investment decisions" },
            { id: "fiduciary", name: "Fiduciary", description: "Acts in client's best interest" }
          ],
          scenarios: [
            { id: "retirement", description: "Ensures retirement funds are invested responsibly", correctRole: "fiduciary" },
            { id: "oversight", description: "Monitors firms to prevent fraud", correctRole: "regulator" },
            { id: "capital", description: "Provides capital for investment", correctRole: "investor" },
            { id: "decisions", description: "Chooses which stocks and bonds to buy", correctRole: "asset-manager" }
          ]
        }
      },
      {
        title: "Industry Quiz Showdown",
        description: "Rapid-fire questions about asset management fundamentals",
        type: "quiz-showdown",
        gameData: {
          questions: [
            {
              question: "Active vs Passive investing — which aims to beat the market?",
              options: ["Active", "Passive", "Both", "Neither"],
              correctAnswer: 0,
              timeLimit: 10
            },
            {
              question: "Who has fiduciary duty to clients?",
              options: ["Clients", "Asset Managers", "Market", "Government"],
              correctAnswer: 1,
              timeLimit: 10
            },
            {
              question: "What does the SEC regulate?",
              options: ["Only banks", "Financial markets", "Only stocks", "Only bonds"],
              correctAnswer: 1,
              timeLimit: 10
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Investment Research & Analysis",
    description: "Master the art of analyzing companies and making investment decisions",
    overview: "Before asset managers invest, they research companies, industries, and the economy. This process — called fundamental analysis — looks at financial statements, management quality, and industry trends. They also use valuation models to decide if a stock is overpriced or a bargain. Research isn't just about making money; many investors also care about sustainability, asking whether a company supports the environment or society.",
    realLifeExample: "Suppose an analyst is researching Tesla to decide if it belongs in a client's portfolio. They start by reviewing Tesla's financial statements, looking at revenue growth from car sales, profit margins, and debt levels. Next, they analyze the broader electric vehicle industry, noting rising competition from companies like Rivian and BYD. They also consider ESG factors such as Tesla's environmental impact and labor practices. Based on valuation methods like comparing Tesla's stock price to earnings, the analyst might recommend buying if the stock looks cheap relative to its future growth — or avoiding it if it seems overpriced and risky.",
    flashcards: [
      {
        term: "Equity",
        definition: "Equity represents ownership in a company, usually in the form of stocks. Shareholders benefit from a company's success through rising stock prices or dividends."
      },
      {
        term: "Debt",
        definition: "Debt is money that a company borrows and must repay, often with interest. For example, when a business issues bonds, investors buy them and expect repayment over time."
      },
      {
        term: "Financial Statements",
        definition: "Financial statements are formal reports that show how a company is performing. They include the income statement, balance sheet, and cash flow statement."
      },
      {
        term: "Valuation",
        definition: "Valuation is the process of estimating what a company is worth. Analysts use tools like price-to-earnings ratios or discounted cash flow models to decide if a stock is cheap or expensive."
      },
      {
        term: "ESG (Environmental, Social, Governance)",
        definition: "ESG investing considers a company's environmental practices, treatment of people, and quality of governance. Investors may avoid companies that pollute heavily and prefer those that promote sustainability."
      },
      {
        term: "Analyst",
        definition: "An analyst is a financial professional who studies industries, markets, and companies. Their research helps asset managers decide which investments to buy, hold, or sell."
      }
    ],
    quiz: [
      {
        question: "What is valuation, and how do analysts decide if a stock like Tesla is overpriced?",
        options: [
          "Valuation compares stock price to company fundamentals",
          "Valuation only looks at stock price history",
          "Valuation guarantees future returns",
          "Valuation is not important for investing"
        ],
        correctAnswer: 0,
        explanation: "Valuation estimates a company's worth by comparing its stock price to fundamentals like earnings, growth prospects, and industry metrics to determine if it's fairly priced."
      },
      {
        question: "In the Stock Detective game, which financial statement helps you measure profits?",
        options: [
          "Balance Sheet",
          "Income Statement",
          "Cash Flow Statement",
          "Statement of Equity"
        ],
        correctAnswer: 1,
        explanation: "The income statement shows a company's revenues, expenses, and profits over a specific period, making it the primary tool for measuring profitability."
      },
      {
        question: "Give an example of ESG investing and explain why it matters to investors.",
        options: [
          "ESG focuses only on profits",
          "ESG considers environmental, social, and governance factors",
          "ESG is irrelevant to returns",
          "ESG only applies to tech companies"
        ],
        correctAnswer: 1,
        explanation: "ESG investing considers environmental practices, social responsibility, and governance quality because these factors can affect long-term company performance and align with investor values."
      },
      {
        question: "In the Valuation Tug of War game, what happens when a company has too much debt?",
        options: [
          "Stock value increases",
          "Stock value decreases",
          "No effect on valuation",
          "Debt doesn't matter"
        ],
        correctAnswer: 1,
        explanation: "Excessive debt increases financial risk and can burden a company with interest payments, typically leading to lower stock valuations due to increased risk."
      },
      {
        question: "In the Tesla example, what non-financial factors might influence whether to invest?",
        options: [
          "Only financial metrics matter",
          "ESG factors like environmental impact",
          "Stock price history only",
          "Company logo design"
        ],
        correctAnswer: 1,
        explanation: "Non-financial factors like ESG considerations (environmental impact, labor practices, governance quality) increasingly influence investment decisions and can affect long-term performance."
      }
    ],
    miniGames: [
      {
        title: "Stock Detective",
        description: "Analyze financial statements to determine company health",
        type: "stock-detective",
        gameData: {
          companies: [
            {
              name: "TechCorp",
              revenue: 100,
              expenses: 80,
              debt: 20,
              scenario: "Strong profits, low debt",
              correct: "financially-strong"
            },
            {
              name: "RetailCo",
              revenue: 50,
              expenses: 60,
              debt: 40,
              scenario: "Losing money, high debt",
              correct: "struggling"
            }
          ]
        }
      },
      {
        title: "Valuation Tug of War",
        description: "Balance positive and negative factors to reach fair value",
        type: "valuation-battle",
        gameData: {
          factors: [
            { name: "Strong Profits", impact: 10, type: "positive" },
            { name: "High Debt", impact: -8, type: "negative" },
            { name: "Growing Market", impact: 6, type: "positive" },
            { name: "Intense Competition", impact: -5, type: "negative" }
          ],
          targetValue: 3
        }
      }
    ]
  },
  {
    id: 3,
    title: "Portfolio Construction",
    description: "Learn to build balanced portfolios that optimize risk and return",
    overview: "Investors rarely put all their money in one place. Instead, they build portfolios — baskets of investments. A portfolio balances risk and reward by spreading money across different assets like stocks, bonds, and real estate. Asset managers measure performance against benchmarks like the S&P 500 and analyze what caused results (performance attribution).",
    realLifeExample: "Think of a college endowment fund managing billions of dollars to pay for scholarships, buildings, and research. The fund managers know they can't just put everything into one stock or even one type of asset. Instead, they construct a portfolio: 50% stocks for growth, 30% bonds for safety, 10% real estate for stability, and 10% alternative assets like private equity for higher returns. By diversifying, they protect the school's money from big losses if one area of the market struggles. For example, if stocks fall during a recession, the bonds and real estate holdings may hold steady, ensuring the university can still fund scholarships.",
    flashcards: [
      {
        term: "Diversification",
        definition: "Diversification means spreading investments across many assets to reduce risk. If one stock falls, gains in another can help balance the portfolio."
      },
      {
        term: "Asset Allocation",
        definition: "Asset allocation is deciding how much money goes into categories like stocks, bonds, or cash. A conservative investor might hold more bonds, while a younger investor might favor stocks."
      },
      {
        term: "Benchmark",
        definition: "A benchmark is a standard that measures how well a portfolio is doing, such as the S&P 500. Asset managers compare their results to benchmarks to prove they add value."
      },
      {
        term: "Risk vs. Return",
        definition: "Risk vs. return is the trade-off between potential reward and the chance of loss. Higher-risk assets like stocks may yield greater profits but also larger declines."
      },
      {
        term: "Performance Attribution",
        definition: "Performance attribution analyzes which parts of a portfolio contributed most to gains or losses. For example, technology stocks may explain why a portfolio outperformed in a given year."
      }
    ],
    quiz: [
      {
        question: "What is diversification, and why is it important for portfolios?",
        options: [
          "Putting all money in one asset",
          "Spreading investments across many assets to reduce risk",
          "Only investing in stocks",
          "Avoiding all investments"
        ],
        correctAnswer: 1,
        explanation: "Diversification spreads investments across different assets, sectors, or regions to reduce the risk that any single investment's poor performance will significantly hurt the overall portfolio."
      },
      {
        question: "In the Build Your Basket game, what happens if all money is put into stocks?",
        options: [
          "Portfolio becomes very safe",
          "Portfolio becomes high risk, high reward",
          "No effect on portfolio",
          "Portfolio guarantees returns"
        ],
        correctAnswer: 1,
        explanation: "Putting all money into stocks creates a high-risk, high-reward portfolio that could experience significant volatility and potential losses during market downturns."
      },
      {
        question: "Why do managers use benchmarks like the S&P 500?",
        options: [
          "To guarantee returns",
          "To measure and compare portfolio performance",
          "To eliminate risk",
          "To avoid regulations"
        ],
        correctAnswer: 1,
        explanation: "Benchmarks provide a standard for measuring portfolio performance, allowing managers and clients to see if the portfolio is adding value compared to simply investing in the market index."
      },
      {
        question: "In the Beat the Benchmark game, why is constant over-adjustment risky?",
        options: [
          "It's not risky at all",
          "It increases transaction costs and may hurt performance",
          "It guarantees better returns",
          "It eliminates all risk"
        ],
        correctAnswer: 1,
        explanation: "Constant portfolio adjustments increase transaction costs and may lead to poor timing decisions, potentially hurting long-term performance compared to a more disciplined approach."
      },
      {
        question: "In the college endowment example, how did diversification protect scholarships?",
        options: [
          "By guaranteeing profits",
          "By spreading risk across different asset types",
          "By avoiding all investments",
          "By only investing in bonds"
        ],
        correctAnswer: 1,
        explanation: "Diversification across stocks, bonds, real estate, and alternatives meant that even if one asset class declined, others could maintain value, protecting the endowment's ability to fund scholarships."
      }
    ],
    miniGames: [
      {
        title: "Build Your Basket",
        description: "Allocate investments across different asset classes",
        type: "portfolio-builder",
        gameData: {
          assets: [
            { name: "Stocks", risk: 8, return: 9, allocation: 0 },
            { name: "Bonds", risk: 3, return: 4, allocation: 0 },
            { name: "Real Estate", risk: 5, return: 6, allocation: 0 },
            { name: "Cash", risk: 1, return: 2, allocation: 0 }
          ],
          totalAmount: 100
        }
      },
      {
        title: "Beat the Benchmark",
        description: "Compare your portfolio to the S&P 500 benchmark",
        type: "quiz-showdown",
        gameData: {
          benchmark: "S&P 500",
          marketEvents: [
            { name: "Bull Market", effect: "stocks up", impact: { stocks: 15, bonds: 2 } },
            { name: "Recession", effect: "stocks down", impact: { stocks: -20, bonds: 5 } },
            { name: "Inflation", effect: "bonds down", impact: { stocks: -5, bonds: -10 } }
          ]
        }
      }
    ],
    activity: {
      title: "Portfolio Asset Allocation",
      description: "Drag different investments into the appropriate allocation buckets for different investor types:",
      items: [
        { id: "growth-stocks", content: "Growth Stocks", category: "aggressive" },
        { id: "government-bonds", content: "Government Bonds", category: "conservative" },
        { id: "dividend-stocks", content: "Dividend Stocks", category: "moderate" },
        { id: "cash", content: "Cash & Cash Equivalents", category: "conservative" },
        { id: "emerging-markets", content: "Emerging Market Stocks", category: "aggressive" },
        { id: "corporate-bonds", content: "Corporate Bonds", category: "moderate" }
      ],
      categories: [
        { id: "conservative", title: "Conservative Portfolio", description: "Low risk, stable returns" },
        { id: "moderate", title: "Moderate Portfolio", description: "Balanced risk and return" },
        { id: "aggressive", title: "Aggressive Portfolio", description: "High risk, high potential return" }
      ]
    }
  },
  {
    id: 4,
    title: "Risk Management",
    description: "Understand and manage investment risks to protect client assets",
    overview: "Every investment carries risk. Asset managers use risk management to protect clients' money. They monitor market, credit, and liquidity risks and use strategies like hedging with derivatives or diversification. Risk management ensures losses don't wipe out gains.",
    realLifeExample: "Consider how Southwest Airlines manages the risk of fluctuating fuel prices, which can be one of its largest costs. If oil prices suddenly spike, the airline could lose millions of dollars overnight. To prevent this, Southwest uses hedging contracts that lock in fuel prices at a set level for months or even years. That way, even if oil prices rise in the market, Southwest still pays the lower contracted price. This strategy doesn't eliminate all risks, but it helps the airline maintain stable ticket prices and predictable profits, proving how critical risk management is in protecting business performance.",
    flashcards: [
      {
        term: "Market Risk",
        definition: "Market risk comes from broad economic changes, like recessions or interest rate hikes, that affect most investments. It cannot be eliminated, but diversification can reduce its impact."
      },
      {
        term: "Credit Risk",
        definition: "Credit risk is the chance that a borrower will fail to repay a loan or bond. Investors face this when companies or governments default on their obligations."
      },
      {
        term: "Liquidity",
        definition: "Liquidity is how easily an asset can be converted to cash without losing value. For instance, stocks are liquid, while real estate may take months to sell."
      },
      {
        term: "Derivatives",
        definition: "Derivatives are financial contracts whose value comes from an underlying asset like oil or stocks. They are often used to hedge risks or make speculative bets."
      },
      {
        term: "Hedging",
        definition: "Hedging is using strategies or contracts to protect against losses. For example, airlines hedge fuel prices to avoid being hurt by sudden price spikes."
      }
    ],
    quiz: [
      {
        question: "What is liquidity risk, and why is it important in portfolios?",
        options: [
          "The risk that assets can't be sold quickly without loss",
          "The risk of too much cash",
          "The risk of market volatility",
          "The risk of high returns"
        ],
        correctAnswer: 0,
        explanation: "Liquidity risk is the danger that you can't convert investments to cash quickly when needed, or that you'll have to sell at a significant discount to market value."
      },
      {
        question: "In the Risk Radar game, how would you classify a borrower defaulting?",
        options: [
          "Market Risk",
          "Credit Risk",
          "Liquidity Risk",
          "Operational Risk"
        ],
        correctAnswer: 1,
        explanation: "A borrower defaulting (failing to repay a loan or bond) is classified as credit risk, which is the risk that a counterparty won't meet their obligations."
      },
      {
        question: "What are derivatives, and how can they hedge risks?",
        options: [
          "Complex investments that only increase risk",
          "Financial contracts that can protect against price movements",
          "Only used for speculation",
          "Always guarantee profits"
        ],
        correctAnswer: 1,
        explanation: "Derivatives are financial contracts whose value depends on underlying assets. They can hedge risks by allowing investors to lock in prices or protect against adverse price movements."
      },
      {
        question: "In the Hedge It! game, what strategy protects against fuel price spikes?",
        options: [
          "Buying more fuel",
          "Using futures contracts to lock in prices",
          "Avoiding fuel altogether",
          "Hoping prices stay low"
        ],
        correctAnswer: 1,
        explanation: "Futures contracts allow companies to lock in fuel prices at current levels, protecting against future price increases but also preventing benefits from price decreases."
      },
      {
        question: "In the Southwest Airlines example, how do hedging contracts stabilize profits?",
        options: [
          "They guarantee maximum profits",
          "They lock in fuel costs to reduce uncertainty",
          "They eliminate all business risks",
          "They increase fuel prices"
        ],
        correctAnswer: 1,
        explanation: "Hedging contracts lock in fuel costs at predetermined prices, reducing uncertainty and helping Southwest maintain stable operations and predictable profits despite oil price volatility."
      }
    ],
    miniGames: [
      {
        title: "Risk Radar",
        description: "Identify and categorize different types of investment risks",
        type: "risk-radar",
        gameData: {
          risks: [
            { name: "Stock Market Crash", type: "market", description: "Broad market decline affects most stocks" },
            { name: "Company Bankruptcy", type: "credit", description: "Company defaults on its bonds" },
            { name: "Real Estate Illiquidity", type: "liquidity", description: "Can't sell property quickly" },
            { name: "Interest Rate Hike", type: "market", description: "Central bank raises rates" },
            { name: "Bond Default", type: "credit", description: "Government fails to repay debt" }
          ],
          categories: ["Market", "Credit", "Liquidity"]
        }
      },
      {
        title: "Hedge It!",
        description: "Protect your portfolio from various risks using hedging strategies",
        type: "hedge-game",
        gameData: {
          scenarios: [
            {
              risk: "Oil price spike",
              strategies: ["Futures contract", "Diversify away from oil", "Buy oil stocks", "Do nothing"],
              correct: 0,
              explanation: "Futures contracts lock in current oil prices"
            },
            {
              risk: "Interest rate increase",
              strategies: ["Buy more bonds", "Sell bonds", "Interest rate swap", "Ignore it"],
              correct: 2,
              explanation: "Interest rate swaps can protect against rate changes"
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Client Relations & Sales",
    description: "Build trust with clients through transparency, clear communication, and strong presentation skills.",
    overview: "Asset management isn't just about numbers — it's about relationships. Managers must build trust with clients by being transparent, explaining performance clearly, and showing accountability during both good and bad markets. Sales and client relations are also crucial for attracting new investors, which helps firms grow and serve more clients.",
    realLifeExample: "Picture a pension board for city workers meeting with an asset manager to review how their money has been invested. The manager prepares a presentation showing charts of returns compared to benchmarks, explaining how diversification helped limit losses during a market downturn. They are transparent about the risks the portfolio still faces and outline steps to manage them going forward. Board members ask tough questions — like why one fund underperformed — and the manager answers honestly, reinforcing trust. Because the manager communicates clearly and openly, the pension board decides to keep the firm as their partner for another contract term.",
    flashcards: [
      {
        term: "Client",
        definition: "A client is the individual or institution who hires an asset manager to handle investments. Clients rely on managers for expertise, transparency, and trust."
      },
      {
        term: "Presentation",
        definition: "A presentation is a structured meeting where managers explain their strategies and results to clients. Strong presentations highlight performance, risks, and the path forward."
      },
      {
        term: "Transparency",
        definition: "Transparency means being open and honest about fees, risks, and results. Asset managers who hide information risk losing client trust."
      },
      {
        term: "Business Development",
        definition: "Business development is the process of finding and winning new clients. For example, managers might pitch their services to a pension board to secure a contract."
      },
      {
        term: "Reporting",
        definition: "Reporting provides clients with written updates on performance and strategy. These documents include charts, numbers, and explanations about how the portfolio is doing."
      }
    ],
    quiz: [
      {
        question: "Why is transparency key in asset management client relationships?",
        options: [
          "It's legally required by all regulators",
          "It builds trust and helps clients make informed decisions",
          "It guarantees higher returns for clients",
          "It reduces management fees automatically"
        ],
        correctAnswer: 1,
        explanation: "Transparency builds trust between asset managers and clients, allowing clients to make informed decisions about their investments."
      },
      {
        question: "In the Pitch Practice game, what factors make a pitch effective?",
        options: [
          "Using complex financial jargon",
          "Promising guaranteed returns",
          "Clarity, trust, and accuracy",
          "Focusing only on past performance"
        ],
        correctAnswer: 2,
        explanation: "Effective pitches demonstrate clarity in communication, build trust with clients, and provide accurate information about strategies and risks."
      },
      {
        question: "What does 'business development' mean in asset management?",
        options: [
          "Developing new investment products only",
          "The process of finding and winning new clients",
          "Managing existing client portfolios",
          "Regulatory compliance activities"
        ],
        correctAnswer: 1,
        explanation: "Business development in asset management involves finding and winning new clients to grow the firm's assets under management."
      },
      {
        question: "In the Build Trust game, what happens if you give unclear or dishonest answers?",
        options: [
          "Clients increase their investments",
          "Trust Points are reduced",
          "Fees are automatically lowered",
          "Performance improves"
        ],
        correctAnswer: 1,
        explanation: "Unclear or dishonest communication reduces Trust Points in the game, reflecting how poor communication damages client relationships in real life."
      },
      {
        question: "In the pension board example, what helped the manager retain the client's business?",
        options: [
          "Promising higher returns next quarter",
          "Hiding the portfolio's weaknesses",
          "Clear communication and honest answers about performance",
          "Reducing fees significantly"
        ],
        correctAnswer: 2,
        explanation: "The manager retained the client by being transparent about performance, explaining risks honestly, and communicating clearly about the portfolio strategy."
      }
    ],
    miniGames: [
      {
        title: "Pitch Practice",
        description: "Build effective client presentations by selecting key talking points",
        type: "role-match",
        gameData: {
          scenarios: [
            "Teacher pension wants stable income",
            "Young professional seeks growth",
            "Retiree needs preservation of capital",
            "Corporation has excess cash to invest"
          ],
          roles: [
            "Conservative bond strategy",
            "Aggressive growth portfolio",
            "Capital preservation focus",
            "Short-term liquid investments"
          ]
        }
      },
      {
        title: "Build Trust",
        description: "Respond to tough client questions while maintaining trust",
        type: "quiz-showdown",
        gameData: {
          questions: [
            {
              question: "Why did our portfolio underperform last quarter?",
              options: [
                "Market conditions were unusually challenging for our strategy",
                "It's not our fault, markets are unpredictable",
                "Our strategy was perfect, this is just temporary",
                "Every portfolio has bad quarters"
              ],
              correctAnswer: 0,
              timeLimit: 15
            }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "Operations & Technology",
    description: "Master the operational backbone that makes asset management possible, from trade execution to compliance.",
    overview: "Behind every investment is a backbone of operations and technology. Operations ensure trades are executed properly, data is managed, and regulations are followed. Technology boosts efficiency, provides real-time information, and prevents costly errors. Without strong operations and tech, asset managers would struggle to function.",
    realLifeExample: "Imagine a hedge fund trader placing an order to buy millions of dollars' worth of Apple stock. Behind the scenes, sophisticated systems handle trade execution, ensuring the order is processed quickly and at the best available price. Compliance software simultaneously checks whether the trade violates any laws or policies. Data management systems record the trade for reports to regulators and clients. Technology tools like Bloomberg Terminals give the firm real-time updates to track performance. Without this infrastructure, errors could cost millions, delay trades, or even cause legal trouble.",
    flashcards: [
      {
        term: "Trade Execution",
        definition: "Trade execution is the process of completing a buy or sell order in the market. It requires speed and accuracy to ensure clients' money is invested correctly."
      },
      {
        term: "Compliance",
        definition: "Compliance is following all financial laws, internal rules, and ethical standards. Firms must ensure employees act legally to avoid penalties or reputational damage."
      },
      {
        term: "Data Management",
        definition: "Data management involves storing, organizing, and analyzing investment data. Strong systems allow managers to make informed decisions quickly."
      },
      {
        term: "Reporting",
        definition: "Reporting in operations ensures accurate, transparent communication to both regulators and clients. Errors in reporting can harm a firm's reputation and break the law."
      },
      {
        term: "FinTech",
        definition: "FinTech refers to financial technology innovations that improve efficiency in investing. Examples include robo-advisors, mobile trading apps, and blockchain tools."
      }
    ],
    quiz: [
      {
        question: "Why is trade execution critical in asset management?",
        options: [
          "It determines which stocks to buy",
          "It ensures orders are completed quickly and accurately",
          "It calculates portfolio performance",
          "It manages client relationships"
        ],
        correctAnswer: 1,
        explanation: "Trade execution is critical because it ensures buy and sell orders are completed quickly and accurately, protecting clients' investments from errors and delays."
      },
      {
        question: "In the Trade Tracker game, what must you check after placing a buy order?",
        options: [
          "Only the stock price",
          "Price, timing, and settlement accuracy",
          "Just the company's financial statements",
          "Only regulatory compliance"
        ],
        correctAnswer: 1,
        explanation: "After placing a buy order, you must verify the price is correct, timing is appropriate, and settlement will occur properly to ensure the trade is executed as intended."
      },
      {
        question: "Why is compliance important, and what risks occur if it's ignored?",
        options: [
          "It only affects internal policies",
          "It prevents legal penalties and reputational damage",
          "It's just a suggestion for best practices",
          "It only matters for large firms"
        ],
        correctAnswer: 1,
        explanation: "Compliance is essential because ignoring financial laws and regulations can result in severe legal penalties, fines, and lasting reputational damage to the firm."
      },
      {
        question: "In the Spot the Violation game, what rule is broken if a trader buys before a client order?",
        options: [
          "Market timing rules",
          "Front-running violation",
          "Pricing regulations",
          "Reporting requirements"
        ],
        correctAnswer: 1,
        explanation: "When a trader buys stock before executing a client's order, it's called front-running, which is illegal because it prioritizes the trader's profit over the client's interests."
      },
      {
        question: "In the hedge fund Apple trade example, how do Bloomberg Terminals support managers?",
        options: [
          "They execute all trades automatically",
          "They provide real-time market data and analytics",
          "They replace the need for compliance",
          "They guarantee profitable trades"
        ],
        correctAnswer: 1,
        explanation: "Bloomberg Terminals provide real-time market data, news, analytics, and trading tools that help managers make informed investment decisions quickly."
      }
    ],
    miniGames: [
      {
        title: "Trade Tracker",
        description: "Follow trades through execution and spot potential errors",
        type: "role-match",
        gameData: {
          scenarios: [
            "Order placed",
            "Price verification",
            "Execution confirmed",
            "Settlement processing"
          ],
          roles: [
            "Check timing",
            "Verify accuracy",
            "Confirm completion",
            "Record transaction"
          ]
        }
      },
      {
        title: "Spot the Violation",
        description: "Identify compliance violations in trading scenarios",
        type: "quiz-showdown",
        gameData: {
          questions: [
            {
              question: "Trader buys stock before executing client order",
              options: [
                "This is acceptable",
                "This is front-running violation",
                "This depends on the stock",
                "This is only wrong if caught"
              ],
              correctAnswer: 1,
              timeLimit: 15
            }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: "Industry Evolution & Trends",
    description: "Explore how technology, ESG investing, and globalization are reshaping asset management.",
    overview: "The asset management industry is constantly evolving. New products like ETFs make investing easier, robo-advisors automate portfolios, ESG investing emphasizes sustainability, and globalization broadens access to worldwide markets. Disruptive technologies like blockchain and AI continue to reshape how managers work, challenging traditional practices.",
    realLifeExample: "Think about how robo-advisors like Betterment and Wealthfront have changed investing. In the past, most people needed to call a financial advisor or meet with an asset manager to build a portfolio. Now, anyone with a smartphone can answer a few questions about their goals, and algorithms automatically create and rebalance a personalized portfolio. These tools charge low fees, making investing affordable for younger generations. While traditional managers still play a role, robo-advisors highlight how technology is disrupting the industry and making investing more accessible.",
    flashcards: [
      {
        term: "ETF (Exchange-Traded Fund)",
        definition: "An Exchange-Traded Fund (ETF) is an investment fund that bundles a group of assets and trades on an exchange like a stock. Investors value ETFs for diversification, liquidity, and affordability."
      },
      {
        term: "Robo-Advisor",
        definition: "A robo-advisor is a digital platform that uses algorithms to build and manage portfolios with little human involvement. They appeal to beginners because they provide low-cost, personalized investment strategies."
      },
      {
        term: "ESG (Environmental, Social, Governance)",
        definition: "ESG investing considers not only returns but also a company's broader impact on the planet and society. Investors might avoid polluters and support renewable energy firms."
      },
      {
        term: "Globalization",
        definition: "Globalization in investing means spreading money across different countries. It creates new opportunities but also adds risks like currency fluctuations and political instability."
      },
      {
        term: "Disruption",
        definition: "Disruption describes how new technologies or business models change traditional asset management. Blockchain, AI, and decentralized finance are reshaping how money is invested and managed."
      }
    ],
    quiz: [
      {
        question: "What is an ETF, and why might an investor choose it over buying individual stocks?",
        options: [
          "ETFs only invest in bonds",
          "ETFs provide instant diversification and liquidity at low cost",
          "ETFs guarantee higher returns than stocks",
          "ETFs are only for institutional investors"
        ],
        correctAnswer: 1,
        explanation: "ETFs bundle multiple assets together, providing instant diversification, trade like stocks for liquidity, and typically have lower costs than buying individual stocks separately."
      },
      {
        question: "In the Trend Tracker game, how would you classify robo-advisors today?",
        options: [
          "Declining trend",
          "Growing trend",
          "Stable/mature trend",
          "Emerging trend"
        ],
        correctAnswer: 1,
        explanation: "Robo-advisors are classified as a growing trend because they continue to gain market share and attract new users, especially younger investors."
      },
      {
        question: "What does ESG stand for, and how does it influence investment choices?",
        options: [
          "Economic, Social, Global factors that focus only on returns",
          "Environmental, Social, Governance factors that consider sustainability",
          "Equity, Stocks, Growth factors for portfolio construction",
          "Exchange, Securities, Government factors for regulation"
        ],
        correctAnswer: 1,
        explanation: "ESG stands for Environmental, Social, and Governance factors. It influences investment choices by considering a company's sustainability and social impact, not just financial returns."
      },
      {
        question: "In the Future or Past game, where would you place pensions and blockchain tools?",
        options: [
          "Both are Old School",
          "Both are New School",
          "Pensions are Old School, blockchain is New School",
          "Pensions are New School, blockchain is Old School"
        ],
        correctAnswer: 2,
        explanation: "Pensions are traditional (Old School) investment vehicles, while blockchain represents new, disruptive technology (New School) in asset management."
      },
      {
        question: "In the robo-advisor example, why are these platforms especially attractive to young investors?",
        options: [
          "They guarantee higher returns",
          "They offer low fees and easy smartphone access",
          "They only invest in technology stocks",
          "They don't require any money to start"
        ],
        correctAnswer: 1,
        explanation: "Robo-advisors attract young investors because they offer low fees, making investing affordable, and provide easy access through smartphone apps that fit younger generations' digital preferences."
      }
    ],
    miniGames: [
      {
        title: "Trend Tracker",
        description: "Classify financial trends as Growing, Declining, or Emerging",
        type: "role-match",
        gameData: {
          scenarios: [
            "ETFs",
            "Robo-advisors",
            "Traditional pensions",
            "ESG investing"
          ],
          roles: [
            "Growing",
            "Growing", 
            "Declining",
            "Emerging"
          ]
        }
      },
      {
        title: "Future or Past",
        description: "Sort investment tools into Old School vs New School categories",
        type: "role-match",
        gameData: {
          scenarios: [
            "Mutual funds",
            "Blockchain investing",
            "Robo-advisors",
            "Pension funds"
          ],
          roles: [
            "Old School",
            "New School",
            "New School",
            "Old School"
          ]
        }
      }
    ]
  }
];

export const assetManagementMiniGameData: AssetManagementMiniGame = {
  title: "Portfolio Master Challenge",
  description: "Put your asset management skills to the test in this comprehensive portfolio simulation",
  type: "portfolio-builder",
  gameData: {
    scenario: "You're managing a $10 million university endowment. Build a portfolio that balances growth, safety, and liquidity while considering ESG factors.",
    constraints: {
      minCash: 5,
      maxSingleAsset: 40,
      esgRequirement: 30
    },
    assets: [
      { name: "US Stocks", risk: 7, return: 8, esg: 60, liquidity: 90 },
      { name: "Government Bonds", risk: 2, return: 3, esg: 80, liquidity: 95 },
      { name: "Real Estate", risk: 5, return: 6, esg: 70, liquidity: 30 },
      { name: "ESG Funds", risk: 6, return: 7, esg: 95, liquidity: 85 },
      { name: "Commodities", risk: 9, return: 9, esg: 40, liquidity: 60 },
      { name: "Cash", risk: 1, return: 1, esg: 100, liquidity: 100 }
    ]
  }
};