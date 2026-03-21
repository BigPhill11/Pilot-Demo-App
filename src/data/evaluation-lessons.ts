export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ModuleQuiz {
  questions: QuizQuestion[];
  passingScore: number;
}

export interface InteractiveElement {
  type: 'calculator' | 'comparison' | 'game' | 'analyzer' | 'simulator';
  component: string;
  title: string;
  description: string;
}

export interface CompanyExample {
  companyName: string;
  scenario: string;
  metrics?: Record<string, string | number>;
  outcome: string;
  lesson: string;
}

export interface ContentSection {
  heading: string;
  content: string;
  bulletPoints?: string[];
  analogy?: string;
}

export interface EvaluationModule {
  id: string;
  moduleNumber: string;
  title: string;
  description: string;
  estimatedTime: string;
  objectives: string[];
  content: {
    introduction: string;
    sections: ContentSection[];
    examples: CompanyExample[];
    interactiveElement: InteractiveElement;
  };
  quiz: ModuleQuiz;
  keyTakeaways: string[];
}

export interface EvaluationLesson {
  id: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  estimatedTime: string;
  badge: {
    name: string;
    emoji: string;
    description: string;
  };
  modules: EvaluationModule[];
}

export const evaluationLessons: EvaluationLesson[] = [
  {
    id: 'lesson-1-performance',
    lessonNumber: 1,
    title: 'Reading Company Performance',
    subtitle: 'The Numbers',
    description: 'Learn to read financial metrics like revenue, profit margins, and valuation ratios to understand a company\'s health.',
    icon: 'TrendingUp',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Numbers Ninja',
      emoji: '🥷',
      description: 'Master of financial metrics and company performance analysis'
    },
    modules: [
      {
        id: 'module-1-1',
        moduleNumber: '1.1',
        title: 'Revenue & Growth Metrics',
        description: 'Understand what revenue means and why growth matters for investors',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand the difference between revenue and profit',
          'Calculate year-over-year growth rates',
          'Identify healthy vs concerning growth patterns',
          'Learn why investors care about revenue growth'
        ],
        content: {
          introduction: 'Revenue is the total money a company makes from selling its products or services - think of it as the "top line" before any expenses are paid. It\'s like counting all the money coming into a lemonade stand before buying lemons, sugar, and cups.',
          sections: [
            {
              heading: 'Revenue vs Profit: The Lemonade Stand',
              content: 'Imagine you run a lemonade stand. If you sell 100 cups at $2 each, your revenue is $200. But you spent $80 on supplies, so your profit is only $120. Revenue is ALL the money coming in, profit is what\'s left after expenses.',
              analogy: '🍋 Revenue = All sales ($200) | Profit = Sales - Expenses ($120)',
              bulletPoints: [
                'Revenue: Total money from sales (the "top line")',
                'Profit: Money left after paying all costs (the "bottom line")',
                'Companies can have high revenue but low profit if expenses are too high',
                'Both numbers matter, but they tell different stories'
              ]
            },
            {
              heading: 'Why Growth Matters',
              content: 'Investors love growth because it shows the company is expanding and attracting more customers. A company growing 30% per year is doubling in size every 2-3 years!',
              bulletPoints: [
                'Growth shows demand for the company\'s products',
                'Fast growth = more customers = more value',
                'Consistent growth is better than one-time spikes',
                'Compare growth to competitors in the same industry'
              ]
            },
            {
              heading: 'Calculating Year-Over-Year Growth',
              content: 'The formula is simple: ((This Year - Last Year) / Last Year) × 100. If a company made $100M last year and $130M this year, that\'s 30% growth.',
              bulletPoints: [
                'Growth Rate = (New Revenue - Old Revenue) / Old Revenue × 100',
                '10-20% growth is solid for most companies',
                '30%+ growth is exceptional (but check if sustainable)',
                'Negative growth (shrinking) is a red flag'
              ]
            },
            {
              heading: 'Red Flags vs Green Flags',
              content: 'Not all revenue is created equal. Watch for warning signs and positive indicators.',
              bulletPoints: [
                '🚩 RED FLAG: Declining revenue (shrinking)',
                '🚩 RED FLAG: Revenue depends on 1-2 big customers',
                '🚩 RED FLAG: Growth slowing dramatically',
                '✅ GREEN FLAG: Steady, consistent growth',
                '✅ GREEN FLAG: Growth faster than competitors',
                '✅ GREEN FLAG: Diverse revenue sources'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Tesla',
              scenario: 'Tesla\'s revenue grew from $31.5B in 2020 to $81.5B in 2022',
              metrics: {
                '2020 Revenue': '$31.5B',
                '2022 Revenue': '$81.5B',
                'Growth Rate': '159%'
              },
              outcome: 'This massive growth showed Tesla was scaling production and meeting demand',
              lesson: 'Strong revenue growth attracted investors and drove stock price up'
            },
            {
              companyName: 'Netflix',
              scenario: 'Netflix revenue grew steadily at 10-20% annually for years',
              metrics: {
                'Growth Pattern': 'Consistent 10-20%',
                'Revenue Model': 'Subscriptions'
              },
              outcome: 'Consistent growth showed reliable business model',
              lesson: 'Steady growth can be more valuable than erratic spikes'
            }
          ],
          interactiveElement: {
            type: 'calculator',
            component: 'RevenueGrowthCalculator',
            title: 'Revenue Growth Calculator',
            description: 'Practice calculating growth rates with real company examples'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-1-1',
              question: 'A company made $50M last year and $65M this year. What\'s the growth rate?',
              options: ['15%', '20%', '30%', '25%'],
              correctAnswer: 2,
              explanation: '($65M - $50M) / $50M = $15M / $50M = 0.30 = 30% growth'
            },
            {
              id: 'q1-1-2',
              question: 'What\'s the difference between revenue and profit?',
              options: [
                'They mean the same thing',
                'Revenue is total sales, profit is what\'s left after expenses',
                'Profit is always higher than revenue',
                'Revenue only counts cash payments'
              ],
              correctAnswer: 1,
              explanation: 'Revenue is the total money coming in from sales, while profit is what remains after paying all expenses.'
            },
            {
              id: 'q1-1-3',
              question: 'Which growth pattern is BEST for a company?',
              options: [
                'Huge spike one year, then negative growth',
                'Declining revenue every year',
                'Steady 15-20% growth year after year',
                'No growth but high profit'
              ],
              correctAnswer: 2,
              explanation: 'Consistent, steady growth shows a healthy, sustainable business model that investors can rely on.'
            },
            {
              id: 'q1-1-4',
              question: 'Why do investors care about revenue growth?',
              options: [
                'It shows the company is paying dividends',
                'It shows increasing demand and market expansion',
                'It means the stock price will always go up',
                'It doesn\'t matter, only profit matters'
              ],
              correctAnswer: 1,
              explanation: 'Revenue growth indicates the company is attracting more customers and expanding its market presence, which suggests future value.'
            },
            {
              id: 'q1-1-5',
              question: 'What\'s a RED FLAG for revenue?',
              options: [
                'Growing 25% per year',
                'Depends on many small customers',
                'Declining revenue for 3 years straight',
                'Revenue matches competitor growth'
              ],
              correctAnswer: 2,
              explanation: 'Consistently declining revenue means the company is shrinking and losing market share - a major warning sign.'
            }
          ]
        },
        keyTakeaways: [
          'Revenue = total sales, Profit = sales minus expenses',
          'Growth shows whether the company is expanding or shrinking',
          'Calculate growth: (This Year - Last Year) / Last Year × 100',
          'Consistent growth (10-20%+) is ideal',
          'Watch for red flags: declining revenue, slowing growth, dependency on few customers'
        ]
      },
      {
        id: 'module-1-2',
        moduleNumber: '1.2',
        title: 'Profitability & Margins',
        description: 'Learn how to evaluate if a company is actually making money efficiently',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand profit margins and why they matter',
          'Differentiate between gross, operating, and net margins',
          'Identify healthy vs unhealthy margin trends',
          'Compare profitability across companies and industries'
        ],
        content: {
          introduction: 'Making money is great, but keeping money is even better. Profit margins tell you how efficiently a company converts revenue into actual profit - it\'s the difference between a successful business and one that\'s just treading water.',
          sections: [
            {
              heading: 'The Pizza Shop Analogy',
              content: 'Imagine two pizza shops both making $100,000 in revenue. Shop A keeps $20,000 profit (20% margin), Shop B keeps only $5,000 (5% margin). Shop A is much more efficient at making money!',
              analogy: '🍕 Shop A: $100k revenue → $20k profit (20% margin) | Shop B: $100k revenue → $5k profit (5% margin)',
              bulletPoints: [
                'Profit Margin = (Profit / Revenue) × 100',
                'Higher margins = more efficient business',
                'Shows how much of each dollar in sales becomes profit',
                'Compare margins to industry averages'
              ]
            },
            {
              heading: 'Three Types of Margins',
              content: 'Companies report different types of margins, each telling a different story about profitability.',
              bulletPoints: [
                'Gross Margin: Profit after ONLY production costs (shows product pricing power)',
                'Operating Margin: Profit after operating expenses (shows business efficiency)',
                'Net Margin: Final profit after ALL expenses and taxes (the bottom line)',
                'Tech companies often have 60-80% gross margins (software is cheap to produce)',
                'Retailers have 20-40% gross margins (physical goods cost more)'
              ]
            },
            {
              heading: 'What\'s a Good Margin?',
              content: 'It depends on the industry! Software companies should have high margins (60%+), while grocery stores typically have low margins (2-3%).',
              bulletPoints: [
                'Software/Tech: 60-80% gross margin is normal',
                'Retail: 20-40% gross margin is typical',
                'Restaurants: 10-15% net margin is good',
                'Groceries: 2-3% net margin is standard',
                'Always compare to industry peers, not across industries'
              ]
            },
            {
              heading: 'Margin Trends Matter More Than Single Numbers',
              content: 'A company with improving margins is getting more efficient. Declining margins suggest problems like rising costs or price competition.',
              bulletPoints: [
                '📈 GOOD: Margins improving over time (getting more efficient)',
                '📉 BAD: Margins declining consistently (losing pricing power)',
                '🚩 RED FLAG: Negative margins (losing money on each sale)',
                '✅ GREEN FLAG: Margins above industry average',
                '⚠️ WARNING: Margins far below competitors'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Apple',
              scenario: 'Apple maintains a ~40% gross margin on iPhones',
              metrics: {
                'Gross Margin': '40%',
                'Operating Margin': '30%',
                'Net Margin': '25%'
              },
              outcome: 'High margins show strong brand pricing power',
              lesson: 'Premium products can command premium margins if customers see value'
            },
            {
              companyName: 'Amazon',
              scenario: 'Amazon has low margins (3-6% net) but massive revenue',
              metrics: {
                'Net Margin': '3-6%',
                'Strategy': 'High volume, low margin'
              },
              outcome: 'Makes money through scale, not high prices',
              lesson: 'Low margins can work with huge revenue volumes'
            },
            {
              companyName: 'Shopify',
              scenario: 'Shopify went from negative to positive margins in 2 years',
              metrics: {
                '2020': 'Negative margins',
                '2022': 'Positive margins'
              },
              outcome: 'Improved efficiency and cost control',
              lesson: 'Improving margins show the company is maturing and optimizing'
            }
          ],
          interactiveElement: {
            type: 'comparison',
            component: 'MarginComparisonTool',
            title: 'Margin Comparison Tool',
            description: 'Compare profit margins across different companies and industries'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-2-1',
              question: 'A company has $100M revenue and $20M profit. What\'s the profit margin?',
              options: ['10%', '20%', '30%', '5%'],
              correctAnswer: 1,
              explanation: 'Profit Margin = ($20M / $100M) × 100 = 20%'
            },
            {
              id: 'q1-2-2',
              question: 'Which type of margin shows the final "bottom line" profit?',
              options: ['Gross margin', 'Operating margin', 'Net margin', 'Revenue margin'],
              correctAnswer: 2,
              explanation: 'Net margin is the final profit after all expenses, taxes, and costs are paid - the true bottom line.'
            },
            {
              id: 'q1-2-3',
              question: 'Company A: 5% margin, $1B revenue. Company B: 25% margin, $200M revenue. Who makes more profit?',
              options: [
                'Company A makes $50M profit',
                'Company B makes $50M profit',
                'They make the same profit',
                'Both A and B are correct'
              ],
              correctAnswer: 3,
              explanation: 'Company A: 5% of $1B = $50M. Company B: 25% of $200M = $50M. Same profit, different strategies!'
            },
            {
              id: 'q1-2-4',
              question: 'What does DECLINING profit margins usually indicate?',
              options: [
                'The company is growing efficiently',
                'Rising costs or increased competition',
                'The stock will definitely go up',
                'Higher revenue next quarter'
              ],
              correctAnswer: 1,
              explanation: 'Declining margins suggest the company is facing pressure from rising costs, price competition, or losing efficiency.'
            },
            {
              id: 'q1-2-5',
              question: 'Why do software companies typically have higher margins than grocery stores?',
              options: [
                'Software is more expensive to produce',
                'Software has low production costs once built',
                'Grocery stores have higher revenue',
                'Software companies pay less taxes'
              ],
              correctAnswer: 1,
              explanation: 'After initial development, software can be copied/distributed at almost no cost, while groceries have ongoing inventory and logistics expenses.'
            }
          ]
        },
        keyTakeaways: [
          'Profit Margin = (Profit / Revenue) × 100 - shows efficiency',
          'Gross, Operating, and Net margins tell different profitability stories',
          'Compare margins to industry peers, not across different industries',
          'Improving margins = getting more efficient (good sign)',
          'Declining margins = losing pricing power or rising costs (red flag)'
        ]
      },
      {
        id: 'module-1-3',
        moduleNumber: '1.3',
        title: 'Valuation Ratios',
        description: 'Learn if a company\'s stock price is reasonable compared to its earnings and size',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand the P/E ratio and what it reveals',
          'Learn what market cap tells you about company size',
          'Evaluate debt levels using the debt-to-equity ratio',
          'Determine if a stock is overvalued or undervalued'
        ],
        content: {
          introduction: 'Just because a company is successful doesn\'t mean its stock is a good buy. Valuation ratios help you determine if you\'re paying a fair price - like checking if a $5 coffee is worth it compared to a $2 coffee.',
          sections: [
            {
              heading: 'P/E Ratio: The "Price Tag" of Stocks',
              content: 'The Price-to-Earnings (P/E) ratio compares the stock price to the company\'s earnings per share. It tells you how many years of earnings you\'re paying for.',
              analogy: '💰 If a stock trades at $100 and earns $5/share annually, P/E = 20 (you\'re paying 20x annual earnings)',
              bulletPoints: [
                'P/E Ratio = Stock Price / Earnings Per Share',
                'P/E of 15-25 is typical for most companies',
                'High P/E (30+) = investors expect high future growth',
                'Low P/E (under 15) = might be undervalued OR has problems',
                'Always compare P/E to industry average'
              ]
            },
            {
              heading: 'What Does P/E Really Mean?',
              content: 'A P/E of 20 means you\'re paying $20 for every $1 of annual earnings. It\'s like paying 20 years of profit upfront.',
              bulletPoints: [
                'Low P/E might mean the stock is cheap (bargain!) or risky',
                'High P/E means investors expect fast growth',
                'Tech companies often have P/E of 30-50+',
                'Banks and utilities typically have P/E of 10-15',
                'Compare P/E to the company\'s growth rate'
              ]
            },
            {
              heading: 'Market Cap: Company Size',
              content: 'Market capitalization is the total value of all shares. It tells you if a company is small, medium, or huge.',
              bulletPoints: [
                'Market Cap = Share Price × Total Shares Outstanding',
                'Small-cap: Under $2B (higher risk, higher growth potential)',
                'Mid-cap: $2B-$10B (balanced risk/reward)',
                'Large-cap: $10B-$200B (stable, slower growth)',
                'Mega-cap: $200B+ (Apple, Microsoft, Google)'
              ]
            },
            {
              heading: 'Debt-to-Equity Ratio: Borrowing Wisely',
              content: 'This ratio shows how much debt a company has compared to shareholder equity. Too much debt is dangerous!',
              analogy: '🏠 Like a mortgage: Some debt is fine, but too much means you\'re overleveraged',
              bulletPoints: [
                'Debt-to-Equity = Total Debt / Shareholder Equity',
                'Below 1.0 is generally safe (debt less than equity)',
                '1.0-2.0 is moderate (keep an eye on it)',
                'Above 2.0 is high (red flag, especially in downturns)',
                'Some industries (utilities, real estate) naturally have higher debt'
              ]
            },
            {
              heading: 'Putting Valuation Together',
              content: 'Use multiple ratios together for a complete picture. Don\'t rely on just one metric!',
              bulletPoints: [
                '✅ Low P/E + High growth = Potential bargain',
                '⚠️ High P/E + Slowing growth = Overvalued risk',
                '🚩 High debt + Declining revenue = Danger zone',
                '✅ Large market cap + Low debt = Stable investment',
                'Always compare to industry peers'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Amazon (2010)',
              scenario: 'Amazon had a P/E of 50+ when most retailers had P/E of 15',
              metrics: {
                'P/E Ratio': '50+',
                'Industry Average': '15'
              },
              outcome: 'High P/E reflected massive growth expectations',
              lesson: 'High P/E can be justified if growth is exceptional'
            },
            {
              companyName: 'Ford vs Tesla',
              scenario: 'Ford: P/E of 6, Tesla: P/E of 50 (as of certain periods)',
              metrics: {
                'Ford P/E': '6 (mature, slow growth)',
                'Tesla P/E': '50 (high growth expectations)'
              },
              outcome: 'P/E reflects growth expectations, not just current earnings',
              lesson: 'Different P/E ratios make sense for different growth stages'
            },
            {
              companyName: 'WeWork',
              scenario: 'Had massive debt and negative earnings before collapse',
              metrics: {
                'Debt': 'Very high',
                'Profitability': 'Negative'
              },
              outcome: 'High debt without profits led to failure',
              lesson: 'Watch debt levels carefully, especially if the company isn\'t profitable'
            }
          ],
          interactiveElement: {
            type: 'comparison',
            component: 'CompanyComparisonMatrix',
            title: 'Company Valuation Comparison',
            description: 'Compare P/E ratios, market caps, and debt levels across companies'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q1-3-1',
              question: 'A stock price is $50, and earnings per share is $2. What\'s the P/E ratio?',
              options: ['20', '25', '30', '10'],
              correctAnswer: 1,
              explanation: 'P/E Ratio = $50 / $2 = 25'
            },
            {
              id: 'q1-3-2',
              question: 'What does a P/E ratio of 30 usually indicate?',
              options: [
                'The company is losing money',
                'Investors expect high future growth',
                'The stock is definitely overpriced',
                'The company has high debt'
              ],
              correctAnswer: 1,
              explanation: 'A high P/E ratio (like 30) typically means investors are willing to pay more because they expect strong growth in the future.'
            },
            {
              id: 'q1-3-3',
              question: 'A company has $100B market cap. What category is it?',
              options: ['Small-cap', 'Mid-cap', 'Large-cap', 'Micro-cap'],
              correctAnswer: 2,
              explanation: 'At $100B market cap, this is a Large-cap company ($10B-$200B range).'
            },
            {
              id: 'q1-3-4',
              question: 'Company has $50M debt and $25M equity. What\'s the debt-to-equity ratio?',
              options: ['0.5', '1.0', '2.0', '3.0'],
              correctAnswer: 2,
              explanation: 'Debt-to-Equity = $50M / $25M = 2.0 (this is moderately high and worth watching)'
            },
            {
              id: 'q1-3-5',
              question: 'What\'s a RED FLAG when looking at valuation?',
              options: [
                'P/E ratio similar to industry average',
                'Large market cap with low debt',
                'High debt-to-equity ratio (3.0+) with declining revenue',
                'P/E ratio of 20 for a growing company'
              ],
              correctAnswer: 2,
              explanation: 'High debt combined with declining revenue is a dangerous situation - the company may struggle to pay back loans.'
            }
          ]
        },
        keyTakeaways: [
          'P/E Ratio = Stock Price / Earnings - shows if stock is expensive or cheap',
          'P/E of 15-25 is typical; compare to industry peers',
          'Market Cap shows company size: small, mid, large, or mega',
          'Debt-to-Equity below 1.0 is safe, above 2.0 is risky',
          'Use multiple ratios together - never rely on just one metric'
        ]
      }
    ]
  },
  {
    id: 'lesson-2-sentiment',
    lessonNumber: 2,
    title: 'Understanding Market Sentiment',
    subtitle: 'The Vibes',
    description: 'Discover how news, analyst opinions, and social media affect stock prices and investor behavior.',
    icon: 'TrendingUp',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Sentiment Detective',
      emoji: '🕵️',
      description: 'Expert at reading market sentiment and investor psychology'
    },
    modules: [
      {
        id: 'module-2-1',
        moduleNumber: '2.1',
        title: 'News Impact & Media Influence',
        description: 'Learn how news events and media coverage affect stock prices',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand how news moves stock prices',
          'Distinguish between temporary and permanent impacts',
          'Identify positive vs negative catalysts',
          'Learn to filter signal from noise'
        ],
        content: {
          introduction: 'Stock prices don\'t just move based on numbers - they react to news, rumors, and media coverage. A single tweet or earnings miss can send a stock soaring or crashing. Understanding media impact is crucial.',
          sections: [
            {
              heading: 'How News Moves Markets',
              content: 'News creates immediate reactions as investors adjust their expectations. Good news = buying pressure, bad news = selling pressure.',
              bulletPoints: [
                'Stock prices reflect future expectations, not just current performance',
                'News changes expectations, which moves prices',
                'Markets can overreact to headlines (opportunities!)',
                'Major news: earnings reports, product launches, CEO changes',
                'Unexpected news has bigger impact than anticipated events'
              ]
            },
            {
              heading: 'Positive vs Negative Catalysts',
              content: 'Catalysts are events that trigger price movements. Recognizing them helps you anticipate market reactions.',
              bulletPoints: [
                '✅ Positive: Beat earnings, new product success, acquisition',
                '✅ Positive: Partnership announcement, FDA approval',
                '🚩 Negative: Miss earnings, product recall, lawsuit',
                '🚩 Negative: CEO scandal, regulatory issues, guidance cut',
                'Magnitude matters: "Beat by 5%" > "Beat by 1%"'
              ]
            },
            {
              heading: 'Temporary vs Permanent Impact',
              content: 'Not all news has lasting effects. Some events are noise, others fundamentally change the company.',
              analogy: '⏱️ Temporary: Coffee spill on your shirt (wash it off). Permanent: Getting fired from your job (major change).',
              bulletPoints: [
                'Temporary: Supply chain hiccup, one bad quarter, temporary scandal',
                'Permanent: Losing major customer, technological disruption, industry decline',
                'Stock might overreact short-term to temporary news (opportunity)',
                'Permanent changes require re-evaluating the company',
                'Ask: "Will this matter in 6 months?"'
              ]
            },
            {
              heading: 'Media Hype vs Reality',
              content: 'Media loves drama and clicks. Learn to separate sensationalism from facts.',
              bulletPoints: [
                'Clickbait headlines exaggerate for attention',
                'Check multiple sources, not just one article',
                'Look at actual numbers, not just narrative',
                'CNBC/Bloomberg more reliable than random blogs',
                'Social media amplifies both hype and fear'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Tesla',
              scenario: 'Elon Musk tweets move Tesla stock 10%+ in minutes',
              metrics: {
                'Tweet Impact': '±10% price move',
                'Duration': 'Often temporary'
              },
              outcome: 'Volatile but often reverses',
              lesson: 'Social media can cause overreactions - don\'t panic buy/sell'
            },
            {
              companyName: 'Johnson & Johnson',
              scenario: 'Talc powder lawsuit news caused temporary sell-off',
              metrics: {
                'Initial Drop': '-10%',
                'Recovery': 'Full recovery in months'
              },
              outcome: 'Temporary impact, company fundamentals unchanged',
              lesson: 'Don\'t panic on temporary bad news for solid companies'
            }
          ],
          interactiveElement: {
            type: 'game',
            component: 'NewsSentimentAnalyzer',
            title: 'News Sentiment Analyzer Game',
            description: 'Categorize news headlines as positive, negative, or neutral'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q2-1-1',
              question: 'Company beats earnings expectations by 20%. What\'s the likely impact?',
              options: [
                'Stock price will drop',
                'Stock price will likely rise (positive catalyst)',
                'No impact on stock price',
                'Stock will be delisted'
              ],
              correctAnswer: 1,
              explanation: 'Beating earnings expectations significantly is a positive catalyst that typically drives the stock price up as investors become more optimistic.'
            },
            {
              id: 'q2-1-2',
              question: 'Which news is likely to have PERMANENT impact?',
              options: [
                'CEO caught in minor scandal',
                'One quarter of missed earnings',
                'Company loses its largest customer (50% of revenue)',
                'Supply chain delay of 2 weeks'
              ],
              correctAnswer: 2,
              explanation: 'Losing a customer representing 50% of revenue fundamentally changes the company\'s business and future prospects - this is a permanent, structural change.'
            },
            {
              id: 'q2-1-3',
              question: 'Stock drops 15% on negative news. What should you do FIRST?',
              options: [
                'Immediately sell everything',
                'Immediately buy more (it\'s cheap!)',
                'Research if the impact is temporary or permanent',
                'Ignore it completely'
              ],
              correctAnswer: 2,
              explanation: 'Before making any decision, assess whether the news represents a temporary setback or a permanent change to the company\'s prospects.'
            },
            {
              id: 'q2-1-4',
              question: 'Which is the MOST reliable news source for investing?',
              options: [
                'Random Twitter account',
                'Sensational blog post',
                'Bloomberg or company press release',
                'Friend\'s tip at a party'
              ],
              correctAnswer: 2,
              explanation: 'Established financial news sources like Bloomberg or official company press releases provide verified, factual information compared to unverified social media or rumors.'
            },
            {
              id: 'q2-1-5',
              question: 'What\'s a "catalyst" in investing?',
              options: [
                'A type of chemical reaction',
                'An event that triggers a significant price movement',
                'A person who invests in stocks',
                'A trading strategy'
              ],
              correctAnswer: 1,
              explanation: 'A catalyst is any event or news that triggers a significant change in investor expectations and thus causes a notable price movement.'
            }
          ]
        },
        keyTakeaways: [
          'News drives stock prices by changing investor expectations',
          'Positive catalysts (beats, launches) drive prices up',
          'Distinguish temporary news (overreactions) from permanent changes',
          'Verify news from reliable sources, ignore hype and clickbait',
          'Ask "Will this matter in 6 months?" before reacting'
        ]
      },
      {
        id: 'module-2-2',
        moduleNumber: '2.2',
        title: 'Analyst Ratings & Price Targets',
        description: 'Understand what analyst opinions mean and how to use them',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Learn what analyst ratings mean (buy/hold/sell)',
          'Understand price targets and their reliability',
          'Know why analysts sometimes disagree',
          'Use analyst opinions as one data point, not the only one'
        ],
        content: {
          introduction: 'Professional analysts spend their careers studying companies and making recommendations. But they\'re not always right! Learn how to interpret their opinions wisely.',
          sections: [
            {
              heading: 'What Are Analyst Ratings?',
              content: 'Analysts work for banks and research firms, providing recommendations to help investors make decisions.',
              bulletPoints: [
                'BUY/STRONG BUY: Analyst expects stock to go up',
                'HOLD: Analyst thinks stock is fairly priced',
                'SELL/STRONG SELL: Analyst expects stock to go down',
                'OUTPERFORM: Should do better than market average',
                'UNDERPERFORM: Should do worse than market average'
              ]
            },
            {
              heading: 'Price Targets Explained',
              content: 'Price targets are the analyst\'s prediction of where the stock will be in 12 months.',
              analogy: '🎯 Like predicting a sports score: educated guess based on data, but not guaranteed.',
              bulletPoints: [
                'Price Target = Analyst\'s 12-month price estimate',
                'Based on valuation models and future projections',
                'Compare target to current price for "upside/downside"',
                'If stock is $50 and target is $70, that\'s 40% upside',
                'Targets get updated as new info emerges'
              ]
            },
            {
              heading: 'Why Analysts Disagree',
              content: 'Different analysts can have completely opposite opinions on the same stock. Here\'s why:',
              bulletPoints: [
                'Different assumptions about growth rates',
                'Different valuation methods (P/E vs DCF)',
                'Different time horizons (short vs long term)',
                'Some are more optimistic/pessimistic by nature',
                'Access to different information or interpretations'
              ]
            },
            {
              heading: 'How to Use Analyst Opinions',
              content: 'Analyst ratings are valuable but should never be your only source of information.',
              bulletPoints: [
                '✅ DO: Look at consensus (average of all analysts)',
                '✅ DO: Read the reasoning behind the rating',
                '✅ DO: Notice when ratings change (upgrades/downgrades)',
                '❌ DON\'T: Blindly follow one analyst',
                '❌ DON\'T: Trade immediately on every rating change',
                'Use ratings as one input in your own analysis'
              ]
            },
            {
              heading: 'Red Flags with Analysts',
              content: 'Sometimes analyst opinions can be biased or conflicted.',
              bulletPoints: [
                '🚩 Analyst works for bank that does business with the company',
                '🚩 Consistently wrong predictions on the same stock',
                '🚩 Sudden rating change without explanation',
                '✅ Independent research firms tend to be more objective',
                '✅ Track record matters: some analysts are more accurate'
              ]
            }
          ],
          examples: [
            {
              companyName: 'NVIDIA',
              scenario: 'Analysts had price targets from $400 to $800 (huge range!)',
              metrics: {
                'Low Target': '$400',
                'High Target': '$800',
                'Consensus': '$600'
              },
              outcome: 'Different views on AI growth potential',
              lesson: 'Wide target range = high uncertainty about future'
            },
            {
              companyName: 'Meta (Facebook)',
              scenario: 'Multiple downgrades in 2022, upgrades in 2023',
              metrics: {
                '2022': 'Many SELL ratings',
                '2023': 'Many BUY ratings'
              },
              outcome: 'Sentiment shifted as business improved',
              lesson: 'Analyst consensus can change quickly with new information'
            }
          ],
          interactiveElement: {
            type: 'analyzer',
            component: 'AnalystRatingDecoder',
            title: 'Analyst Rating Decoder',
            description: 'Learn to interpret analyst ratings and price targets'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q2-2-1',
              question: 'What does a "BUY" rating mean?',
              options: [
                'You must buy the stock immediately',
                'Analyst expects the stock price to increase',
                'The stock is guaranteed to go up',
                'The stock is currently cheap'
              ],
              correctAnswer: 1,
              explanation: 'A BUY rating means the analyst expects the stock to increase in value, typically over the next 12 months. It\'s an opinion, not a guarantee.'
            },
            {
              id: 'q2-2-2',
              question: 'Stock is $50. Analyst price target is $75. What\'s the implied upside?',
              options: ['25%', '50%', '75%', '33%'],
              correctAnswer: 1,
              explanation: 'Upside = ($75 - $50) / $50 = $25 / $50 = 50% potential gain according to the analyst\'s target.'
            },
            {
              id: 'q2-2-3',
              question: 'Why might two analysts have opposite ratings on the same stock?',
              options: [
                'One is definitely wrong',
                'They have different assumptions about future growth',
                'One didn\'t do their research',
                'It never happens'
              ],
              correctAnswer: 1,
              explanation: 'Analysts can reach different conclusions based on different assumptions about growth, competitive dynamics, or valuation methods - both could have valid reasoning.'
            },
            {
              id: 'q2-2-4',
              question: 'What\'s the BEST way to use analyst ratings?',
              options: [
                'Follow one favorite analyst exclusively',
                'Ignore all analyst ratings completely',
                'Look at consensus and use as one factor in your analysis',
                'Trade immediately on every rating change'
              ],
              correctAnswer: 2,
              explanation: 'Analyst consensus provides useful perspective, but should be combined with your own research and analysis - treat it as one input, not the final word.'
            },
            {
              id: 'q2-2-5',
              question: 'What\'s a potential conflict of interest for analysts?',
              options: [
                'They get paid for their research',
                'They work for a bank that has business with the company',
                'They publish their opinions publicly',
                'They study multiple companies'
              ],
              correctAnswer: 1,
              explanation: 'If an analyst\'s employer has a business relationship with the company being covered, there may be pressure to issue favorable ratings - this is a conflict of interest.'
            }
          ]
        },
        keyTakeaways: [
          'Analyst ratings: BUY (expect up), HOLD (fairly priced), SELL (expect down)',
          'Price targets predict where stock will be in 12 months',
          'Analysts can disagree due to different assumptions and methods',
          'Use analyst consensus as ONE factor, not your only source',
          'Watch for conflicts of interest and track record of accuracy'
        ]
      },
      {
        id: 'module-2-3',
        moduleNumber: '2.3',
        title: 'Social Sentiment & Trends',
        description: 'Navigate social media hype and distinguish FOMO from real opportunities',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand how social media influences stock prices',
          'Recognize FOMO (Fear of Missing Out) vs rational investing',
          'Learn to filter signal from noise in social feeds',
          'Identify meme stock dynamics and risks'
        ],
        content: {
          introduction: 'Social media has democratized investing, but it\'s also created echo chambers and hype cycles. Platforms like Reddit, Twitter, and TikTok can move stocks dramatically - sometimes for good reasons, often not.',
          sections: [
            {
              heading: 'The Power of Social Media',
              content: 'Millions of retail investors coordinate on social platforms, creating real market impact.',
              bulletPoints: [
                'WallStreetBets (Reddit): 14M+ members discussing stocks',
                'Twitter/X: CEOs, influencers, and traders share ideas',
                'TikTok/Instagram: Financial education (and misinformation)',
                'Discord: Private investment communities',
                'Social hype can create short-term volatility'
              ]
            },
            {
              heading: 'FOMO vs Rational Investing',
              content: 'Fear of Missing Out drives irrational decisions. Don\'t let emotion override analysis.',
              analogy: '🎢 FOMO is like jumping on a roller coaster that\'s already at the peak - exciting but risky!',
              bulletPoints: [
                'FOMO: "Everyone is buying, I need to get in NOW!"',
                'Rational: "Let me analyze if this makes sense"',
                'FOMO leads to buying high, panic selling low',
                'Viral stocks often crash after the hype fades',
                'If you heard about it late, you\'re probably late'
              ]
            },
            {
              heading: 'Meme Stocks Explained',
              content: 'Meme stocks get massive retail attention, often disconnected from fundamentals.',
              bulletPoints: [
                'Examples: GameStop, AMC, Bed Bath & Beyond',
                'Driven by social sentiment, not earnings/value',
                'Can have explosive gains (and losses)',
                'Short squeezes amplify volatility',
                'High risk: hype can disappear overnight',
                'Not for long-term investing strategies'
              ]
            },
            {
              heading: 'Spotting Pump and Dumps',
              content: 'Coordinated schemes to artificially inflate stock prices, then sell for profit.',
              bulletPoints: [
                '🚩 Red Flag: Unknown account hyping penny stock',
                '🚩 Red Flag: "Get in now before it explodes!"',
                '🚩 Red Flag: Promises of guaranteed returns',
                '🚩 Red Flag: Pressure to buy immediately',
                '✅ Green Flag: Balanced discussion of risks/rewards',
                'If it sounds too good to be true, it probably is'
              ]
            },
            {
              heading: 'How to Use Social Media Wisely',
              content: 'Social platforms can provide value if used correctly with critical thinking.',
              bulletPoints: [
                '✅ DO: Follow credible accounts with track records',
                '✅ DO: Use social media for ideas, verify independently',
                '✅ DO: Diversify information sources',
                '❌ DON\'T: YOLO based on one Reddit post',
                '❌ DON\'T: Trust anonymous tips',
                'Learn from community, but make your own decisions'
              ]
            }
          ],
          examples: [
            {
              companyName: 'GameStop (2021)',
              scenario: 'Reddit\'s WallStreetBets drove GME from $20 to $483 in weeks',
              metrics: {
                'Starting Price': '$20',
                'Peak Price': '$483',
                'Current': 'Much lower'
              },
              outcome: 'Massive gains for early investors, huge losses for latecomers',
              lesson: 'Social hype can create opportunities but also extreme risk'
            },
            {
              companyName: 'Hertz (2020)',
              scenario: 'Bankrupt company\'s stock surged on Robinhood trading frenzy',
              metrics: {
                'Status': 'Bankruptcy',
                'Social Hype': 'Massive buy volume'
              },
              outcome: 'Stock eventually went to zero',
              lesson: 'Fundamentals matter: hype can\'t save a fundamentally broken company'
            }
          ],
          interactiveElement: {
            type: 'game',
            component: 'SocialSentimentMeter',
            title: 'Social Sentiment Meter',
            description: 'Gauge whether social media hype is opportunity or danger'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q2-3-1',
              question: 'What is FOMO in investing?',
              options: [
                'A type of stock order',
                'Fear of Missing Out - emotional urge to buy hyped stocks',
                'A financial analysis method',
                'A trading platform'
              ],
              correctAnswer: 1,
              explanation: 'FOMO (Fear of Missing Out) is the emotional pressure to buy a stock because everyone else is, often leading to irrational decisions and buying at peaks.'
            },
            {
              id: 'q2-3-2',
              question: 'Which is a RED FLAG for a potential pump-and-dump scheme?',
              options: [
                'Balanced discussion of pros and cons',
                'Long-term investment thesis',
                'Anonymous account promising "guaranteed 1000% gains"',
                'References to company fundamentals'
              ],
              correctAnswer: 2,
              explanation: 'Promises of guaranteed huge returns from anonymous sources is a classic pump-and-dump warning sign - legitimate investments never guarantee returns.'
            },
            {
              id: 'q2-3-3',
              question: 'A penny stock is trending on Twitter with 10,000 mentions. What should you do?',
              options: [
                'Buy immediately before price goes up',
                'Research the company fundamentals before considering',
                'Buy with your entire portfolio',
                'Tell all your friends to buy'
              ],
              correctAnswer: 1,
              explanation: 'Social media buzz should prompt research, not immediate action. Verify if there\'s a legitimate reason for the attention or if it\'s just hype.'
            },
            {
              id: 'q2-3-4',
              question: 'What characterizes a "meme stock"?',
              options: [
                'Driven by social sentiment more than fundamentals',
                'Always goes up',
                'Guaranteed safe investment',
                'Only tech companies'
              ],
              correctAnswer: 0,
              explanation: 'Meme stocks are driven primarily by social media sentiment and retail coordination rather than traditional fundamental analysis.'
            },
            {
              id: 'q2-3-5',
              question: 'Best way to use social media for investing?',
              options: [
                'Blindly follow every tip you see',
                'Never use social media at all',
                'Use for ideas, then verify with your own research',
                'Only trust anonymous accounts'
              ],
              correctAnswer: 2,
              explanation: 'Social media can surface interesting investment ideas, but you should always verify claims and conduct your own analysis before investing.'
            }
          ]
        },
        keyTakeaways: [
          'Social media can move stocks through coordinated retail trading',
          'FOMO (Fear of Missing Out) drives irrational decisions - stay disciplined',
          'Meme stocks are high-risk, sentiment-driven, not long-term plays',
          'Watch for pump-and-dump red flags: anonymous tips, guaranteed returns',
          'Use social media for ideas, but always verify independently'
        ]
      }
    ]
  },
  {
    id: 'lesson-3-decision',
    lessonNumber: 3,
    title: 'Putting It All Together',
    subtitle: 'The Decision',
    description: 'Combine performance data and market sentiment to make informed investment decisions.',
    icon: 'Target',
    estimatedTime: '25-30 minutes',
    badge: {
      name: 'Investment Guru',
      emoji: '🧙',
      description: 'Master decision-maker who combines analysis and judgment'
    },
    modules: [
      {
        id: 'module-3-1',
        moduleNumber: '3.1',
        title: 'Creating Your Investment Checklist',
        description: 'Build a personalized framework for evaluating any company',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Combine numbers and sentiment into one framework',
          'Create must-have criteria for investment decisions',
          'Identify deal-breakers and red flags',
          'Build a repeatable evaluation process'
        ],
        content: {
          introduction: 'Professional investors use checklists to ensure consistency and avoid emotional decisions. Now you\'ll create your own personalized investment checklist combining everything you\'ve learned.',
          sections: [
            {
              heading: 'Why Checklists Matter',
              content: 'Checklists prevent emotional investing and ensure you evaluate every opportunity consistently.',
              analogy: '✈️ Like pilots using pre-flight checklists: even experts need systematic processes to avoid mistakes.',
              bulletPoints: [
                'Removes emotion from decision-making',
                'Ensures you don\'t skip important analysis',
                'Creates discipline and consistency',
                'Prevents FOMO-driven purchases',
                'Makes you accountable to your own standards'
              ]
            },
            {
              heading: 'Must-Have Criteria (The Numbers)',
              content: 'These are non-negotiable financial metrics every investment should pass.',
              bulletPoints: [
                '✅ Revenue growth: At least 10-15% annually',
                '✅ Profit margins: Above industry average',
                '✅ P/E ratio: Reasonable relative to growth (not 100+)',
                '✅ Debt-to-equity: Below 2.0 (manageable debt)',
                '✅ Positive earnings: Actually making money',
                'Set your own thresholds based on risk tolerance'
              ]
            },
            {
              heading: 'Sentiment Check (The Vibes)',
              content: 'Numbers aren\'t everything - sentiment and momentum matter too.',
              bulletPoints: [
                '✅ News: More positive catalysts than negative',
                '✅ Analyst consensus: Majority BUY or HOLD ratings',
                '✅ Social sentiment: Positive but not meme-level hype',
                '⚖️ Balance: Not ignoring risks, but seeing opportunity',
                'Ask: "What could go wrong?" before investing'
              ]
            },
            {
              heading: 'Deal-Breakers and Red Flags',
              content: 'Some issues are automatic "no" - walk away immediately.',
              bulletPoints: [
                '🚨 STOP: Consistently declining revenue (3+ years)',
                '🚨 STOP: Massive debt (5x+ equity) with negative margins',
                '🚨 STOP: CEO scandal or fraud allegations',
                '🚨 STOP: Outdated business model (e.g., Blockbuster)',
                '🚨 STOP: Too good to be true (pump-and-dump schemes)',
                'When red flags appear, don\'t rationalize - move on'
              ]
            },
            {
              heading: 'Putting Your Checklist Together',
              content: 'Combine quantitative metrics and qualitative factors into one decision framework.',
              bulletPoints: [
                'STEP 1: Financial health (revenue, margins, debt)',
                'STEP 2: Valuation (P/E, market cap, vs peers)',
                'STEP 3: News and sentiment (positive momentum?)',
                'STEP 4: Risk assessment (what could go wrong?)',
                'STEP 5: Final decision (pass ALL checks? invest)',
                'If even one major red flag appears, skip the stock'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Microsoft',
              scenario: 'Let\'s run Microsoft through a checklist',
              metrics: {
                'Revenue Growth': '✅ 12% annually',
                'Margins': '✅ 35%+ net margin',
                'P/E Ratio': '✅ 30 (reasonable for tech)',
                'Debt': '✅ Low debt-to-equity',
                'Sentiment': '✅ Positive AI momentum'
              },
              outcome: 'PASS - Strong fundamentals + positive sentiment',
              lesson: 'Solid companies check multiple boxes'
            },
            {
              companyName: 'Peloton (2022)',
              scenario: 'Running through checklist reveals issues',
              metrics: {
                'Revenue Growth': '🚨 Declining',
                'Margins': '🚨 Negative',
                'Debt': '⚠️ High',
                'Sentiment': '🚨 Very negative'
              },
              outcome: 'FAIL - Multiple red flags, walk away',
              lesson: 'When several criteria fail, avoid the stock'
            }
          ],
          interactiveElement: {
            type: 'simulator',
            component: 'ChecklistBuilderTool',
            title: 'Build Your Checklist',
            description: 'Create and prioritize your personalized investment criteria'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q3-1-1',
              question: 'Why should you use an investment checklist?',
              options: [
                'To make investing more complicated',
                'To prevent emotional decisions and ensure consistency',
                'Because everyone else does',
                'It guarantees profits'
              ],
              correctAnswer: 1,
              explanation: 'Checklists remove emotion and create discipline, ensuring you evaluate every opportunity with the same rigorous criteria.'
            },
            {
              id: 'q3-1-2',
              question: 'Which is a reasonable "must-have" criterion for your checklist?',
              options: [
                'Stock must double in 1 month',
                'CEO must be famous',
                'Profit margins above industry average',
                'Stock price under $10'
              ],
              correctAnswer: 2,
              explanation: 'Profit margins above industry average indicates a competitive advantage and efficient operations - a solid fundamental criterion.'
            },
            {
              id: 'q3-1-3',
              question: 'What should you do if a stock fails ONE major criterion on your checklist?',
              options: [
                'Buy immediately anyway',
                'Reconsider - investigate if it\'s truly disqualifying',
                'Change your checklist to make it pass',
                'Ignore checklists completely'
              ],
              correctAnswer: 1,
              explanation: 'One failed criterion warrants further investigation - if it\'s a major red flag (like fraud), walk away; if minor, consider context.'
            },
            {
              id: 'q3-1-4',
              question: 'Which is an automatic DEAL-BREAKER?',
              options: [
                'P/E ratio slightly above industry average',
                'CEO involved in fraud scandal',
                'Stock price down 5% this week',
                'Analyst disagreement on rating'
              ],
              correctAnswer: 1,
              explanation: 'CEO fraud is a fundamental breach of trust and typically signals deep company problems - this is an automatic disqualification.'
            },
            {
              id: 'q3-1-5',
              question: 'Your checklist should combine which two elements?',
              options: [
                'Only numbers, sentiment doesn\'t matter',
                'Only sentiment, numbers don\'t matter',
                'Financial metrics (numbers) AND market sentiment (vibes)',
                'Only what your friends recommend'
              ],
              correctAnswer: 2,
              explanation: 'Effective investment analysis combines quantitative data (financials) with qualitative factors (sentiment, news) for a complete picture.'
            }
          ]
        },
        keyTakeaways: [
          'Checklists create discipline and prevent emotional investing',
          'Must-have criteria: strong revenue growth, healthy margins, reasonable valuation',
          'Deal-breakers: declining revenue, massive debt, fraud scandals',
          'Combine financial metrics with sentiment analysis',
          'If major red flags appear, walk away - plenty of other opportunities'
        ]
      },
      {
        id: 'module-3-2',
        moduleNumber: '3.2',
        title: 'Risk Assessment Framework',
        description: 'Learn to identify and evaluate investment risks',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Understand different types of investment risk',
          'Learn to spot warning signs before problems emerge',
          'Apply risk assessment to real companies',
          'Balance risk vs reward in investment decisions'
        ],
        content: {
          introduction: 'Every investment has risk - the key is understanding and managing it. Great investors don\'t avoid risk; they take calculated risks while protecting themselves from catastrophic losses.',
          sections: [
            {
              heading: 'Types of Investment Risk',
              content: 'Not all risks are created equal. Recognize different risk categories.',
              bulletPoints: [
                '📉 Market Risk: Overall market crash affects all stocks',
                '🏢 Company Risk: Business-specific problems',
                '🌍 Industry Risk: Sector-wide challenges',
                '💵 Liquidity Risk: Can\'t sell when you want',
                '🌐 Economic Risk: Recession, inflation, interest rates',
                'You can\'t eliminate risk, but you can understand it'
              ]
            },
            {
              heading: 'Warning Signs to Watch For',
              content: 'These red flags often precede major problems.',
              bulletPoints: [
                '🚩 Declining revenue for 2+ consecutive quarters',
                '🚩 CEO or CFO suddenly leaving',
                '🚩 Missing earnings guidance repeatedly',
                '🚩 Increasing debt while profits shrink',
                '🚩 Accounting irregularities or restatements',
                '🚩 Major customer defection',
                '🚩 Disruptive technology threatening business model'
              ]
            },
            {
              heading: 'Risk vs Reward Trade-Off',
              content: 'Higher potential returns come with higher risk. Your job is finding the right balance.',
              analogy: '🎰 Like casino odds: higher risk = higher potential reward, but also higher chance of loss.',
              bulletPoints: [
                'Startups: High risk, high potential reward',
                'Blue chips: Lower risk, moderate steady returns',
                'Penny stocks: Extreme risk, lottery-like odds',
                'Bonds: Low risk, low returns',
                'Match risk level to your goals and timeline',
                'Never risk money you can\'t afford to lose'
              ]
            },
            {
              heading: 'Diversification: Risk Management 101',
              content: 'Don\'t put all eggs in one basket - spread risk across multiple investments.',
              bulletPoints: [
                'Own 10-20 different stocks minimum',
                'Spread across different industries',
                'Mix company sizes (large, mid, small cap)',
                'Consider different asset types (stocks, bonds)',
                'If one investment fails, others protect you',
                '"Diversification is the only free lunch in investing"'
              ]
            },
            {
              heading: 'Risk Assessment Checklist',
              content: 'Use this framework to evaluate risk before investing.',
              bulletPoints: [
                'What could go wrong? (list specific scenarios)',
                'How likely is each risk? (probability)',
                'How bad would it be? (impact)',
                'Can the company survive worst-case scenario?',
                'Am I comfortable with this level of uncertainty?',
                'Is the potential reward worth the risk?'
              ]
            }
          ],
          examples: [
            {
              companyName: 'Zoom (2020-2022)',
              scenario: 'Pandemic boom followed by return-to-office decline',
              metrics: {
                'Peak Risk': 'Overvalued at $550/share',
                'Warning Sign': 'Revenue growth slowing as offices reopened'
              },
              outcome: 'Stock dropped 90% from peak',
              lesson: 'Identify when growth is temporary vs sustainable'
            },
            {
              companyName: 'Enron',
              scenario: 'Accounting fraud hidden until collapse',
              metrics: {
                'Warning Signs': 'Complex finances, aggressive accounting',
                'Red Flag': 'CFO selling shares'
              },
              outcome: 'Complete bankruptcy',
              lesson: 'When something seems too good to be true, investigate deeper'
            },
            {
              companyName: 'Apple',
              scenario: 'Navigated risks by diversifying products',
              metrics: {
                'Strategy': 'iPhone + Services + Wearables',
                'Risk Management': 'Not reliant on one product'
              },
              outcome: 'Reduced company-specific risk',
              lesson: 'Companies that manage risk well are safer investments'
            }
          ],
          interactiveElement: {
            type: 'game',
            component: 'RiskRadarGame',
            title: 'Risk Radar',
            description: 'Spot warning signs and red flags in company profiles'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q3-2-1',
              question: 'What is "company risk"?',
              options: [
                'Risk that the entire market crashes',
                'Risk specific to one business (management, products, competition)',
                'Risk of interest rates rising',
                'Risk of your computer breaking'
              ],
              correctAnswer: 1,
              explanation: 'Company risk refers to problems specific to a particular business, like poor management, product failures, or losing competitive advantage.'
            },
            {
              id: 'q3-2-2',
              question: 'Which is a major WARNING SIGN?',
              options: [
                'Company beats earnings slightly',
                'CEO suddenly resigns with no explanation',
                'Stock price fluctuates 2%',
                'Analyst changes rating from Strong Buy to Buy'
              ],
              correctAnswer: 1,
              explanation: 'Sudden, unexplained CEO departure is a red flag that often signals internal problems investors should investigate immediately.'
            },
            {
              id: 'q3-2-3',
              question: 'What is diversification?',
              options: [
                'Buying one stock with your entire portfolio',
                'Spreading investments across multiple companies/sectors',
                'Only buying tech stocks',
                'Trading frequently'
              ],
              correctAnswer: 1,
              explanation: 'Diversification means spreading your money across different investments to reduce the impact if any single one fails.'
            },
            {
              id: 'q3-2-4',
              question: 'A startup offers 10x potential return but has 90% chance of failure. What\'s the risk profile?',
              options: [
                'Low risk, low reward',
                'High risk, high reward',
                'No risk involved',
                'Guaranteed profit'
              ],
              correctAnswer: 1,
              explanation: 'This is classic high risk/high reward: massive upside potential but very high probability of loss - appropriate only for risk-tolerant investors.'
            },
            {
              id: 'q3-2-5',
              question: 'Before investing, you should ask:',
              options: [
                'How much profit am I guaranteed?',
                'What could go wrong and can I handle that outcome?',
                'Will this definitely go up?',
                'What will my friends think?'
              ],
              correctAnswer: 1,
              explanation: 'Risk assessment requires honestly considering potential downsides and whether you can financially and emotionally handle them.'
            }
          ]
        },
        keyTakeaways: [
          'All investments have risk: market, company, industry, economic',
          'Warning signs: declining revenue, CEO departures, rising debt',
          'Higher risk = higher potential reward (but also higher loss potential)',
          'Diversification spreads risk - don\'t put all money in one stock',
          'Before investing, ask: "What could go wrong and can I handle it?"'
        ]
      },
      {
        id: 'module-3-3',
        moduleNumber: '3.3',
        title: 'Making the Final Decision',
        description: 'Apply everything you\'ve learned to make investment decisions',
        estimatedTime: '8-10 minutes',
        objectives: [
          'Synthesize financial and sentiment analysis',
          'Practice making like/dislike decisions',
          'Learn when to say yes and when to walk away',
          'Build confidence in your evaluation skills'
        ],
        content: {
          introduction: 'This is it - the moment of truth. You\'ve learned to analyze numbers, read sentiment, assess risk, and create checklists. Now it\'s time to make the final call: invest or pass?',
          sections: [
            {
              heading: 'The Decision Framework',
              content: 'Follow this systematic approach for every investment decision.',
              bulletPoints: [
                'STEP 1: Financial Health Check (revenue, margins, debt)',
                'STEP 2: Valuation Analysis (P/E, market cap, vs competitors)',
                'STEP 3: Sentiment Review (news, analysts, social)',
                'STEP 4: Risk Assessment (warning signs, downside scenarios)',
                'STEP 5: Checklist Validation (pass all criteria?)',
                'STEP 6: Final Decision (yes/no/watch list)'
              ]
            },
            {
              heading: 'When to Say YES (Like)',
              content: 'These are the qualities of investable companies.',
              bulletPoints: [
                '✅ Strong financial fundamentals (all green)',
                '✅ Reasonable valuation (not overpriced)',
                '✅ Positive sentiment momentum',
                '✅ Clear competitive advantage',
                '✅ Passes your personal checklist',
                '✅ Risk level matches your comfort zone',
                'Remember: You don\'t need to invest in everything!'
              ]
            },
            {
              heading: 'When to Say NO (Pass)',
              content: 'Walking away is sometimes the best decision.',
              bulletPoints: [
                '❌ Multiple red flags present',
                '❌ Valuation seems too high (FOMO territory)',
                '❌ Business model you don\'t understand',
                '❌ Declining fundamentals',
                '❌ Excessive debt or cash flow problems',
                '❌ Something "feels off" (trust your gut)',
                'Saying no is not failure - it\'s discipline'
              ]
            },
            {
              heading: 'The Watch List Strategy',
              content: 'Not everything is clear-cut. Some stocks need more time.',
              bulletPoints: [
                '👀 WATCH LIST: Interesting but missing key data',
                '👀 WATCH LIST: Good company but overvalued today',
                '👀 WATCH LIST: Positive thesis but major risk present',
                'Set alerts for price targets or news updates',
                'Revisit watch list monthly',
                'Many great investments start on the watch list'
              ]
            },
            {
              heading: 'Building Decision Confidence',
              content: 'Every decision is a learning experience. Track and reflect.',
              bulletPoints: [
                'Keep a decision journal (why you liked/passed)',
                'Review past decisions: what went right/wrong?',
                'Learn from mistakes without fear',
                'Confidence comes from repetition and experience',
                'Even experts get it wrong sometimes',
                'Focus on process, not just outcomes'
              ]
            },
            {
              heading: 'Final Wisdom',
              content: 'Principles to remember as you start your investment journey.',
              bulletPoints: [
                '🧠 Do your own research - don\'t just follow others',
                '⏰ Be patient - good opportunities come to those who wait',
                '📊 Prioritize fundamentals over hype',
                '🎯 Stick to your checklist and risk tolerance',
                '🌱 Start small, learn, then scale up',
                '❤️ Only invest in companies you understand and believe in'
              ]
            }
          ],
          examples: [
            {
              companyName: 'NVIDIA (Early 2023)',
              scenario: 'AI boom created investment opportunity',
              metrics: {
                'Fundamentals': '✅ Strong revenue growth',
                'Valuation': '⚠️ High but justified by AI',
                'Sentiment': '✅ Extremely positive',
                'Risk': '⚠️ Volatility risk'
              },
              outcome: 'DECISION: YES (despite high P/E, AI thesis justified)',
              lesson: 'Sometimes high valuation is warranted by exceptional growth'
            },
            {
              companyName: 'Spirit Airlines (2023)',
              scenario: 'Airline with declining margins and high debt',
              metrics: {
                'Fundamentals': '❌ Declining revenue',
                'Valuation': '❌ Debt concerns',
                'Sentiment': '❌ Very negative',
                'Risk': '🚨 Bankruptcy risk'
              },
              outcome: 'DECISION: NO (too many red flags)',
              lesson: 'Multiple red flags = walk away, no matter how "cheap" it looks'
            },
            {
              companyName: 'Shopify (Mid 2022)',
              scenario: 'Good company but overvalued after correction',
              metrics: {
                'Fundamentals': '✅ Good business',
                'Valuation': '⚠️ Still expensive',
                'Sentiment': '⚖️ Mixed',
                'Risk': '⚠️ Market volatility'
              },
              outcome: 'DECISION: WATCH LIST (wait for better entry point)',
              lesson: 'Good companies can be bad investments at wrong price'
            }
          ],
          interactiveElement: {
            type: 'simulator',
            component: 'InvestmentDecisionSimulator',
            title: 'Investment Decision Simulator',
            description: 'Practice making real investment decisions with full company profiles'
          }
        },
        quiz: {
          passingScore: 3,
          questions: [
            {
              id: 'q3-3-1',
              question: 'What should you do BEFORE making any investment decision?',
              options: [
                'Buy immediately if friends recommend it',
                'Follow systematic framework: analyze fundamentals, valuation, sentiment, risk',
                'Check only the stock price',
                'Trust your gut feeling alone'
              ],
              correctAnswer: 1,
              explanation: 'Disciplined investing requires following a systematic process that evaluates multiple factors before making a decision.'
            },
            {
              id: 'q3-3-2',
              question: 'When should you say YES to an investment?',
              options: [
                'Whenever a stock is trending on social media',
                'When fundamentals, valuation, and sentiment all align positively',
                'Only when guaranteed to make profit',
                'Never - investing is too risky'
              ],
              correctAnswer: 1,
              explanation: 'Invest when multiple factors align: strong fundamentals, reasonable valuation, positive sentiment, and acceptable risk - this is proper due diligence.'
            },
            {
              id: 'q3-3-3',
              question: 'A stock has great fundamentals but valuation seems very high. What should you do?',
              options: [
                'Buy immediately - great companies are always worth it',
                'Add to watch list - wait for better price entry point',
                'Panic sell',
                'Ignore valuation completely'
              ],
              correctAnswer: 1,
              explanation: 'Good companies can be bad investments at the wrong price. Watch list allows you to monitor for better entry points.'
            },
            {
              id: 'q3-3-4',
              question: 'What does it mean to "say NO" in investing?',
              options: [
                'You failed as an investor',
                'You\'re being disciplined and protecting your capital',
                'You\'ll miss out forever',
                'You should never pass on opportunities'
              ],
              correctAnswer: 1,
              explanation: 'Saying no demonstrates discipline - not every opportunity is right for you, and protecting capital by avoiding bad investments is crucial.'
            },
            {
              id: 'q3-3-5',
              question: 'How should you build investment confidence?',
              options: [
                'Never review past decisions',
                'Only remember wins, forget losses',
                'Keep decision journal, learn from experience, focus on process',
                'Follow others blindly'
              ],
              correctAnswer: 2,
              explanation: 'Confidence grows through deliberate practice: documenting decisions, learning from both wins and losses, and focusing on improving your process.'
            }
          ]
        },
        keyTakeaways: [
          'Follow systematic framework: fundamentals → valuation → sentiment → risk → decision',
          'Say YES when: strong fundamentals, fair valuation, positive sentiment, acceptable risk',
          'Say NO when: multiple red flags, don\'t understand business, too risky',
          'Use WATCH LIST for interesting companies at wrong price or needing more research',
          'Build confidence through practice, reflection, and learning from every decision'
        ]
      }
    ]
  }
];
