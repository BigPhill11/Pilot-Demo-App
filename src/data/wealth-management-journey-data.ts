export interface WealthLevel {
  id: number;
  title: string;
  overview: string;
  flashcards: Array<{
    term: string;
    definition: string;
  }>;
  realLifeExample: string;
  miniGames: Array<{
    name: string;
    howItWorks: string;
    learningGoal: string;
    completionSystem: string;
    keyTerms: string;
  }>;
  quiz: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswerIndex: number;
      explanation: string;
    }>;
  };
  activities: Array<{
    title: string;
    instructions: string[];
    reflection?: string;
    bonus?: string;
  }>;
}

export const wealthManagementJourneyData: WealthLevel[] = [
  {
    id: 1,
    title: "Introduction to Wealth Management",
    overview: "Wealth management is the business of helping individuals and families grow, protect, and transfer their wealth. Unlike asset management, which focuses mainly on investing money, wealth management is holistic — covering investments, taxes, retirement, estate planning, and even philanthropy. Wealth managers aim to understand a client's life goals and tailor strategies around them. This level introduces the basics of the profession and why it matters.",
    flashcards: [
      {
        term: "Wealth Management",
        definition: "Wealth management is a financial advisory service that helps clients manage investments, taxes, and estate planning. Its goal is to align financial decisions with long-term life goals."
      },
      {
        term: "Financial Plan",
        definition: "A financial plan is a roadmap for how a client will save, invest, and spend. It includes short-term and long-term goals like buying a house or retiring comfortably."
      },
      {
        term: "Holistic Advice",
        definition: "Holistic advice means looking beyond investments to include taxes, insurance, estate planning, and cash flow. Wealth managers focus on the full picture, not just returns."
      },
      {
        term: "Client Relationship",
        definition: "Wealth managers build deep relationships with clients, often spanning decades. Trust and communication are the foundation of these partnerships."
      },
      {
        term: "Personalized Strategy",
        definition: "Every client's needs are different, so strategies must be tailored. For example, a young entrepreneur will have a very different plan than a retired teacher."
      }
    ],
    realLifeExample: "Imagine a doctor who earns a high salary but is unsure how to manage her finances. She hires a wealth manager who helps her invest for retirement, create a tax-efficient plan, and buy life insurance to protect her family. The manager also works with her to set up a college fund for her children. Instead of only investing her money, the wealth manager helps create a strategy that addresses all aspects of her financial life.",
    miniGames: [
      {
        name: "Match the Service",
        howItWorks: "Players match client needs (\"I want to lower my taxes\") with the right wealth management service (tax planning, retirement planning, etc.).",
        learningGoal: "Understand the breadth of wealth management services.",
        completionSystem: "Earn stars for correct matches.",
        keyTerms: "Financial plan, holistic advice, client relationship."
      },
      {
        name: "Scenario Builder",
        howItWorks: "Players are given a fictional client profile and must choose 3 priority services (investment, insurance, estate, etc.).",
        learningGoal: "Learn how wealth management is tailored.",
        completionSystem: "Bronze = 1 correct, Silver = 2, Gold = all 3 aligned with best practice.",
        keyTerms: "Personalized strategy, holistic advice."
      }
    ],
    quiz: {
      questions: [
        {
          question: "What makes wealth management different from asset management?",
          options: [
            "Wealth management only focuses on investments, while asset management includes planning",
            "Wealth management is holistic, covering investments, taxes, estate planning, and life goals",
            "Asset management is for individuals, wealth management is for institutions", 
            "There is no difference between the two"
          ],
          correctAnswerIndex: 1,
          explanation: "Wealth management takes a comprehensive approach to all aspects of a client's financial life, not just investments."
        },
        {
          question: "In the Match the Service game, what wealth management service matches \"I want to protect my family if something happens to me\"?",
          options: [
            "Investment Planning",
            "Tax Planning", 
            "Insurance and Estate Planning",
            "Retirement Planning"
          ],
          correctAnswerIndex: 2,
          explanation: "Insurance and estate planning are designed to protect and provide for family members in case of unexpected events."
        },
        {
          question: "Why is trust important in wealth management client relationships?",
          options: [
            "Trust is not important in financial relationships",
            "Trust ensures clients will follow advice and maintain long-term relationships",
            "Trust is only needed for large accounts",
            "Trust helps reduce fees"
          ],
          correctAnswerIndex: 1,
          explanation: "Trust is the foundation of wealth management - without it, clients won't follow advice or stay long-term with an advisor."
        },
        {
          question: "In the doctor example, how did the wealth manager go beyond just investments?",
          options: [
            "Only recommended mutual funds",
            "Created a comprehensive plan including retirement, taxes, insurance, and college funding",
            "Focused solely on tax reduction",
            "Only provided investment advice"
          ],
          correctAnswerIndex: 1,
          explanation: "The wealth manager created a holistic strategy addressing multiple aspects of the doctor's financial life, not just investments."
        }
      ]
    },
    activities: [
      {
        title: "Life Goals Mapping",
        instructions: [
          "Write down 3 big goals you'd like to achieve in life (college, first car, retirement, starting a business).",
          "Next to each goal, list how much you think it might cost and when you'll need the money."
        ],
        reflection: "Which of these goals would a wealth manager help you plan for?"
      }
    ]
  },
  {
    id: 2,
    title: "Financial Planning Foundations",
    overview: "Financial planning is the foundation of wealth management. It involves creating a structured plan for saving, investing, spending, and protecting wealth. Wealth managers help clients define goals, assess resources, and design a roadmap. Good planning prevents short-term decisions from derailing long-term success.",
    flashcards: [
      {
        term: "Budgeting",
        definition: "Budgeting is the process of tracking income and expenses. It ensures clients spend wisely and save enough for goals."
      },
      {
        term: "Emergency Fund",
        definition: "An emergency fund is cash set aside for unexpected events like job loss or medical bills. It prevents clients from dipping into investments too early."
      },
      {
        term: "Retirement Planning",
        definition: "Retirement planning prepares clients to live comfortably after they stop working. It includes savings, investments, and withdrawal strategies."
      },
      {
        term: "Insurance Planning",
        definition: "Insurance planning ensures clients have coverage for risks like health issues, disability, or property loss. It protects wealth from sudden shocks."
      },
      {
        term: "Estate Planning",
        definition: "Estate planning is deciding how assets will be transferred after death. Wills, trusts, and beneficiaries are key tools."
      }
    ],
    realLifeExample: "A young couple hires a wealth manager to help them plan for their first home. Together, they create a budget, build an emergency fund, and start saving for a down payment. They also begin investing for retirement, even though it feels far away. By sticking to this financial plan, they balance short-term goals (buying a house) with long-term security (retirement).",
    miniGames: [
      {
        name: "Goal Sorter",
        howItWorks: "Players drag financial goals (house, retirement, emergency fund) into \"short-term\" or \"long-term\" buckets.",
        learningGoal: "Distinguish between time horizons.",
        completionSystem: "Score based on correct sorting.",
        keyTerms: "Budgeting, emergency fund, retirement planning."
      },
      {
        name: "Plan Builder",
        howItWorks: "Players receive a fictional client profile with income, expenses, and goals. They must build a financial plan by allocating percentages to different needs.",
        learningGoal: "Learn trade-offs in financial planning.",
        completionSystem: "Bronze = basic needs covered, Silver = 2 goals met, Gold = balanced plan.",
        keyTerms: "Insurance planning, estate planning, financial plan."
      }
    ],
    quiz: {
      questions: [
        {
          question: "Why is budgeting important in financial planning?",
          options: [
            "Budgeting is not necessary for wealthy people",
            "It ensures clients spend wisely and save enough for their goals",
            "Budgeting only matters for businesses",
            "It's only useful for tracking expenses"
          ],
          correctAnswerIndex: 1,
          explanation: "Budgeting helps clients balance spending with savings to achieve their financial goals."
        },
        {
          question: "In Goal Sorter, why is an emergency fund considered a short-term priority?",
          options: [
            "Because it's meant for long-term growth",
            "Emergency funds aren't actually important",
            "Because it needs to be accessible for unexpected expenses that could happen anytime",
            "It's only for wealthy individuals"
          ],
          correctAnswerIndex: 2,
          explanation: "Emergency funds must be readily accessible to cover unexpected expenses, making them a short-term liquidity priority."
        },
        {
          question: "What's the difference between retirement planning and estate planning?",
          options: [
            "There is no difference",
            "Retirement planning is for living expenses after work; estate planning is for transferring wealth after death",
            "Estate planning is only for retirement",
            "Retirement planning only involves investments"
          ],
          correctAnswerIndex: 1,
          explanation: "Retirement planning focuses on having enough to live on after stopping work, while estate planning addresses wealth transfer after death."
        },
        {
          question: "In the young couple example, how did the wealth manager balance short-term and long-term goals?",
          options: [
            "Focused only on long-term retirement savings",
            "Only helped with buying a house",
            "Created a plan that addressed both home buying (short-term) and retirement savings (long-term)",
            "Ignored short-term goals entirely"
          ],
          correctAnswerIndex: 2,
          explanation: "The wealth manager helped them save for their immediate goal (house) while also starting retirement savings for the future."
        }
      ]
    },
    activities: [
      {
        title: "Create a Mini Financial Plan",
        instructions: [
          "Track your income (allowance, job, side hustle) and expenses for one week.",
          "Split your spending into categories: Needs (food, transport), Wants (clothes, entertainment), Savings (future goals).",
          "Using the \"50/30/20 rule\" (50% needs, 30% wants, 20% savings), check how your week compares.",
          "Adjust one expense you could cut to boost your savings."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Risk Management in Wealth Management",
    overview: "Risk management in wealth management goes beyond choosing safe investments. Clients face risks such as market downturns, unexpected medical bills, job loss, or inflation eroding savings. Wealth managers help clients prepare by using insurance, diversification, and emergency funds. By anticipating potential challenges, they protect clients from financial shocks that could derail long-term plans.",
    flashcards: [
      {
        term: "Market Risk",
        definition: "Market risk is the possibility that investments lose value due to economic downturns. It affects nearly every investor."
      },
      {
        term: "Inflation Risk",
        definition: "Inflation risk is the danger that rising prices reduce purchasing power. It makes today's money worth less in the future."
      },
      {
        term: "Longevity Risk",
        definition: "Longevity risk is the chance of outliving your money in retirement. Planning for long life expectancy reduces this risk."
      },
      {
        term: "Insurance",
        definition: "Insurance transfers financial risk from a client to an insurer. Examples include health, life, disability, and property insurance."
      },
      {
        term: "Emergency Fund",
        definition: "An emergency fund is a cash reserve to cover unexpected expenses. It ensures clients don't disrupt investments during a crisis."
      }
    ],
    realLifeExample: "A 50-year-old executive worries about both market downturns and rising healthcare costs. Her wealth manager reviews her investments, confirming diversification across stocks and bonds. To protect against unexpected medical bills, they add health and disability insurance. They also ensure she keeps six months of living expenses in an emergency fund. With this plan, the executive can withstand both economic and personal shocks while staying on track for retirement.",
    miniGames: [
      {
        name: "Risk Identifier",
        howItWorks: "Players are given scenarios like \"retiree outliving savings\" or \"stocks falling in a recession.\" They must match each scenario with the correct type of risk.",
        learningGoal: "Recognize different types of risks faced by clients.",
        completionSystem: "Points awarded for each correct match; Gold = perfect round.",
        keyTerms: "Market risk, inflation risk, longevity risk."
      },
      {
        name: "Protect the Plan",
        howItWorks: "Players receive a client profile and potential risks. They must select protective strategies like insurance, diversification, or emergency funds.",
        learningGoal: "Learn how risk tools prevent wealth loss.",
        completionSystem: "Bronze = 1 correct, Silver = 2 correct, Gold = all correct.",
        keyTerms: "Insurance, emergency fund, diversification."
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is longevity risk, and why is it important in retirement planning?",
          options: [
            "The risk of not living long enough",
            "The risk of outliving your money in retirement",
            "The risk of inflation",
            "The risk of market crashes"
          ],
          correctAnswerIndex: 1,
          explanation: "Longevity risk is the possibility of outliving your savings, which requires careful retirement planning for longer life expectancy."
        },
        {
          question: "In the Risk Identifier game, what type of risk is \"rising prices eroding savings\"?",
          options: [
            "Market risk",
            "Credit risk",
            "Inflation risk",
            "Liquidity risk"
          ],
          correctAnswerIndex: 2,
          explanation: "Rising prices that erode purchasing power over time is the definition of inflation risk."
        },
        {
          question: "Why should clients keep an emergency fund?",
          options: [
            "To invest in high-risk opportunities",
            "To cover unexpected expenses without disrupting long-term investments",
            "Emergency funds aren't necessary",
            "Only for entertainment expenses"
          ],
          correctAnswerIndex: 1,
          explanation: "Emergency funds provide a cash buffer for unexpected expenses, protecting long-term investment strategies from disruption."
        },
        {
          question: "In the executive example, how did the wealth manager balance market and healthcare risks?",
          options: [
            "Only focused on investments",
            "Used diversification for market risk and insurance for healthcare risk",
            "Ignored healthcare risks",
            "Put everything in cash"
          ],
          correctAnswerIndex: 1,
          explanation: "The wealth manager used diversified investments to manage market risk and health/disability insurance to protect against healthcare costs."
        }
      ]
    },
    activities: [
      {
        title: "Identify Your Risks",
        instructions: [
          "List 3 financial risks you or your family could face (job loss, medical expenses, inflation).",
          "For each risk, write down 1 way to prepare (emergency fund, insurance, diversification)."
        ],
        bonus: "Ask a parent or mentor what financial risks they prepare for."
      }
    ]
  },
  {
    id: 5,
    title: "Client Communication & Relationship Building",
    overview: "Wealth management is deeply personal, so strong client relationships are critical. Wealth managers need to listen carefully, explain strategies clearly, and build trust over time. Transparent reporting, honest answers, and personalized communication keep clients engaged. Relationships often last decades, making communication as important as financial expertise.",
    flashcards: [
      {
        term: "Client Trust",
        definition: "Trust is the foundation of wealth management. Without it, clients won't follow advice or stay long-term."
      },
      {
        term: "Transparency",
        definition: "Transparency means being clear about risks, fees, and performance. It builds credibility."
      },
      {
        term: "Reporting",
        definition: "Reporting provides updates on how the portfolio and plan are doing. It usually includes charts, numbers, and explanations."
      },
      {
        term: "Active Listening",
        definition: "Active listening means paying full attention to client concerns and reflecting them back. It helps tailor strategies."
      },
      {
        term: "Long-Term Relationship",
        definition: "Wealth managers often work with the same families for decades. Understanding values across generations ensures continuity."
      }
    ],
    realLifeExample: "A wealth manager meets quarterly with a family business owner who wants both growth and legacy planning. In one meeting, the client expresses concerns about fees. The wealth manager openly explains the fee structure, shows the performance relative to benchmarks, and emphasizes the long-term value of the plan. By listening and addressing concerns directly, the manager strengthens trust and retains the client relationship.",
    miniGames: [
      {
        name: "Trust Builder",
        howItWorks: "Players role-play answering tough client questions like \"Why are fees so high?\" or \"Why did my investments fall this quarter?\" They choose responses, some transparent and some evasive.",
        learningGoal: "Reinforce the value of honesty and clear communication.",
        completionSystem: "Trust Points awarded for honest, clear responses.",
        keyTerms: "Transparency, client trust, active listening."
      },
      {
        name: "Client Match",
        howItWorks: "Players match communication strategies with client types (young professional, retiree, family business owner).",
        learningGoal: "Practice tailoring messages to different client needs.",
        completionSystem: "Bronze = 1 correct, Silver = 2, Gold = all correct.",
        keyTerms: "Long-term relationship, reporting, personalized strategy."
      }
    ],
    quiz: {
      questions: [
        {
          question: "Why is transparency important in wealth management?",
          options: [
            "It's not important for client relationships",
            "It builds trust and credibility with clients",
            "Only for legal reasons",
            "To justify higher fees"
          ],
          correctAnswerIndex: 1,
          explanation: "Transparency about risks, fees, and performance builds trust and credibility, which are essential for long-term client relationships."
        },
        {
          question: "What does active listening mean, and why is it useful?",
          options: [
            "Listening to music while working",
            "Paying full attention to client concerns and reflecting them back to tailor strategies",
            "Only hearing what you want to hear",
            "Listening without responding"
          ],
          correctAnswerIndex: 1,
          explanation: "Active listening involves full attention to client concerns and reflecting them back, helping to create personalized strategies."
        },
        {
          question: "In the Client Match game, what communication approach would fit a retiree?",
          options: [
            "Focus on aggressive growth strategies",
            "Emphasize stability, income, and capital preservation",
            "Only discuss high-risk investments",
            "Avoid discussing their portfolio"
          ],
          correctAnswerIndex: 1,
          explanation: "Retirees typically prioritize stability, steady income, and preserving their capital rather than aggressive growth."
        },
        {
          question: "In the family business owner example, how did the wealth manager build trust?",
          options: [
            "By avoiding difficult questions",
            "By openly explaining fees, showing performance, and addressing concerns directly",
            "By promising unrealistic returns",
            "By hiding performance information"
          ],
          correctAnswerIndex: 1,
          explanation: "The wealth manager built trust through transparency about fees, honest performance reporting, and directly addressing client concerns."
        }
      ]
    },
    activities: [
      {
        title: "Practice Explaining",
        instructions: [
          "Pick a financial term (budget, diversification, retirement account).",
          "Pretend you're explaining it to a 10-year-old sibling or friend.",
          "Write out your explanation in simple, everyday words.",
          "Share it with a peer and see if they understood. Adjust if not."
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Tax & Estate Planning",
    overview: "Taxes and estate planning are critical parts of wealth management, ensuring clients keep more of their money and pass it on efficiently. Tax planning reduces the amount lost to income and capital gains taxes, while estate planning organizes how wealth is transferred after death. Tools include wills, trusts, charitable giving, and tax-efficient investment strategies. Together, these ensure clients' legacies are preserved.",
    flashcards: [
      {
        term: "Tax Planning",
        definition: "Tax planning arranges finances to minimize taxes owed. Examples include retirement accounts and tax-efficient funds."
      },
      {
        term: "Capital Gains",
        definition: "Capital gains are profits from selling an investment. They are subject to taxes, which vary by holding period."
      },
      {
        term: "Estate Planning",
        definition: "Estate planning ensures wealth is distributed after death according to the client's wishes. It uses wills and trusts."
      },
      {
        term: "Trusts",
        definition: "A trust is a legal arrangement that holds assets for beneficiaries. It helps reduce taxes and avoid probate."
      },
      {
        term: "Charitable Giving",
        definition: "Charitable giving can reduce taxes while supporting causes clients care about. Donor-advised funds are one tool."
      }
    ],
    realLifeExample: "A retired couple wants to leave money to their children and a local university. Their wealth manager recommends setting up a trust to manage the children's inheritance while avoiding probate. They also establish a donor-advised fund to support the university, which provides both tax benefits and personal satisfaction. By planning ahead, the couple protects their wealth and ensures their legacy supports both family and community.",
    miniGames: [
      {
        name: "Tax Smart",
        howItWorks: "Players sort income sources (salary, dividends, long-term capital gains) into tax brackets.",
        learningGoal: "Understand how different incomes are taxed.",
        completionSystem: "Bronze = some correct, Silver = most correct, Gold = all correct.",
        keyTerms: "Tax planning, capital gains."
      },
      {
        name: "Estate Planner",
        howItWorks: "Players receive a scenario (client with assets and heirs) and must choose estate tools (will, trust, charitable giving).",
        learningGoal: "Learn how estate tools protect wealth transfer.",
        completionSystem: "Points for choosing the best tools; Gold = optimal plan.",
        keyTerms: "Estate planning, trusts, charitable giving."
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is tax planning, and why is it important?",
          options: [
            "Tax planning is illegal",
            "Arranging finances to minimize taxes owed while staying within the law",
            "Tax planning only benefits the wealthy",
            "It's the same as tax evasion"
          ],
          correctAnswerIndex: 1,
          explanation: "Tax planning legally arranges finances to minimize tax liability, helping clients keep more of their wealth."
        },
        {
          question: "In Tax Smart, what income source is taxed at a lower rate if held long-term?",
          options: [
            "Salary income",
            "Short-term capital gains",
            "Long-term capital gains",
            "Interest income"
          ],
          correctAnswerIndex: 2,
          explanation: "Long-term capital gains (held over one year) typically have lower tax rates than ordinary income or short-term gains."
        },
        {
          question: "Why do clients use trusts in estate planning?",
          options: [
            "Trusts are not useful",
            "To help reduce taxes, avoid probate, and control asset distribution",
            "Only for tax evasion",
            "Trusts are only for the ultra-wealthy"
          ],
          correctAnswerIndex: 1,
          explanation: "Trusts can help reduce estate taxes, avoid probate court, and provide control over how and when assets are distributed to beneficiaries."
        },
        {
          question: "In the retired couple example, how did charitable giving support both legacy and taxes?",
          options: [
            "It didn't help with taxes",
            "Provided tax deductions while supporting causes they cared about",
            "Only helped with legacy, not taxes",
            "Charitable giving increases taxes"
          ],
          correctAnswerIndex: 1,
          explanation: "Charitable giving through donor-advised funds provided tax benefits while allowing the couple to support causes important to them."
        }
      ]
    },
    activities: [
      {
        title: "Tax-Efficient Choices",
        instructions: [
          "Research: What is the difference between a regular savings account and a tax-advantaged retirement account (like a Roth IRA)?",
          "Imagine you're saving $100/month for 10 years. Compare what happens in each account."
        ],
        reflection: "Why might a wealth manager suggest tax-advantaged accounts early in life?"
      }
    ]
  },
  {
    id: 7,
    title: "Technology & Industry Trends in Wealth Management",
    overview: "Wealth management is evolving with technology and global trends. Robo-advisors, mobile apps, and AI tools make advice more accessible. ESG (Environmental, Social, Governance) investing grows as younger clients want their money to reflect their values. Globalization and new fintech disrupt traditional models. Wealth managers must adapt to stay relevant.",
    flashcards: [
      {
        term: "Robo-Advisor",
        definition: "A robo-advisor is a digital platform that uses algorithms to manage portfolios. It offers low-cost, automated advice."
      },
      {
        term: "ESG Investing",
        definition: "ESG investing considers environmental, social, and governance factors in choosing investments. It aligns money with values."
      },
      {
        term: "FinTech",
        definition: "FinTech refers to technology that improves financial services. Mobile investing apps are examples."
      },
      {
        term: "Globalization",
        definition: "Globalization expands investment opportunities across countries. It brings both growth and risk."
      },
      {
        term: "Disruption",
        definition: "Disruption occurs when new technologies change traditional wealth management. Robo-advisors are one form of disruption."
      }
    ],
    realLifeExample: "A millennial investor prefers a robo-advisor for low fees and 24/7 mobile access. However, she also values ESG investments, choosing portfolios that exclude fossil fuel companies. Her wealth manager blends the robo-advisor's efficiency with personal advice, ensuring her investments align with her values. This hybrid model reflects the future of wealth management — combining technology with human relationships.",
    miniGames: [
      {
        name: "Trend Tracker",
        howItWorks: "Players classify innovations like robo-advisors, ESG investing, and pensions as Growing, Declining, or Emerging.",
        learningGoal: "Recognize industry trends.",
        completionSystem: "Bronze = 70% correct, Silver = 85%, Gold = perfect.",
        keyTerms: "ESG, robo-advisor, disruption."
      },
      {
        name: "Future or Past",
        howItWorks: "Players drag tools into \"Old School\" (pensions, mutual funds) or \"New School\" (apps, robo-advisors).",
        learningGoal: "Differentiate traditional vs modern tools.",
        completionSystem: "Score tracked with leaderboard.",
        keyTerms: "Disruption, globalization, fintech."
      }
    ],
    quiz: {
      questions: [
        {
          question: "What is a robo-advisor, and why is it appealing to younger investors?",
          options: [
            "A human advisor who works remotely",
            "A digital platform using algorithms for low-cost, automated portfolio management",
            "A type of investment fund",
            "A trading robot"
          ],
          correctAnswerIndex: 1,
          explanation: "Robo-advisors are digital platforms that use algorithms to provide automated, low-cost investment management, appealing to younger investors for convenience and affordability."
        },
        {
          question: "In Trend Tracker, how would you classify ESG investing?",
          options: [
            "Declining",
            "Stable",
            "Growing",
            "Irrelevant"
          ],
          correctAnswerIndex: 2,
          explanation: "ESG investing is a growing trend, especially among younger investors who want their investments to align with their values."
        },
        {
          question: "What does ESG stand for, and how does it affect investment choices?",
          options: [
            "Earnings, Sales, Growth - focuses only on financial returns",
            "Environmental, Social, Governance - considers sustainability and values alongside returns",
            "Exchange, Securities, Guidelines - regulatory framework",
            "ESG has no impact on investments"
          ],
          correctAnswerIndex: 1,
          explanation: "ESG stands for Environmental, Social, and Governance factors, allowing investors to align their money with their values while pursuing returns."
        },
        {
          question: "In the millennial example, how did the wealth manager combine technology and values?",
          options: [
            "Used only traditional methods",
            "Ignored client values entirely",
            "Blended robo-advisor efficiency with personal advice for ESG investments",
            "Only focused on returns"
          ],
          correctAnswerIndex: 2,
          explanation: "The wealth manager created a hybrid model combining the efficiency of robo-advisors with personal guidance for ESG investing that aligned with the client's values."
        }
      ]
    },
    activities: [
      {
        title: "Compare Old vs New Tools",
        instructions: [
          "Make two lists:",
          "Traditional tools (mutual funds, pensions, in-person financial advisors).",
          "New tools (robo-advisors, Robinhood, Betterment, ESG funds).",
          "Research: Pick one from each list and note how they work."
        ],
        reflection: "Which tool would you personally prefer, and why?"
      }
    ]
  },
  {
    id: 3,
    title: "Investment Basics in Wealth Management",
    overview: "Investing is a critical part of wealth management, but it's tied to client goals, not just performance. Wealth managers balance risk and return to ensure clients meet milestones like retirement or education funding. They use diversification and asset allocation to protect against losses.",
    flashcards: [
      {
        term: "Asset Allocation",
        definition: "Asset allocation is dividing money among stocks, bonds, and cash. It balances risk and return."
      },
      {
        term: "Diversification",
        definition: "Diversification means spreading investments across assets to reduce risk. It prevents one loss from wiping out a portfolio."
      },
      {
        term: "Risk Tolerance",
        definition: "Risk tolerance is how comfortable a client is with losses. Younger clients usually accept more risk; retirees accept less."
      },
      {
        term: "Time Horizon",
        definition: "Time horizon is the length of time before money is needed. Longer horizons allow for more risk."
      },
      {
        term: "Rebalancing",
        definition: "Rebalancing is adjusting a portfolio back to target allocations after market changes. It ensures the portfolio stays aligned with goals."
      }
    ],
    realLifeExample: "A wealth manager helps a 25-year-old client invest for retirement. Because the client has a 40-year horizon, the manager recommends a higher allocation to stocks for growth. As the client ages, the portfolio will shift gradually toward bonds for stability. This approach balances long-term growth with eventual safety.",
    miniGames: [
      {
        name: "Build a Portfolio",
        howItWorks: "Players allocate tokens across stocks, bonds, and cash. A risk/return meter shows the trade-off.",
        learningGoal: "Understand how allocation changes risk.",
        completionSystem: "Bronze = poor balance, Silver = decent balance, Gold = optimized.",
        keyTerms: "Asset allocation, diversification, risk tolerance."
      },
      {
        name: "Risk Match",
        howItWorks: "Players match client profiles (young professional, retiree) with risk levels and time horizons.",
        learningGoal: "Connect portfolios to client needs.",
        completionSystem: "Score points per correct match.",
        keyTerms: "Risk tolerance, time horizon."
      }
    ],
    quiz: {
      questions: [
        {
          question: "Why is asset allocation important in wealth management?",
          options: [
            "It's only important for large portfolios",
            "It balances risk and return by spreading money across different asset types",
            "Asset allocation doesn't matter",
            "It's only used by professional investors"
          ],
          correctAnswerIndex: 1,
          explanation: "Asset allocation helps balance risk and return by diversifying investments across stocks, bonds, and other assets."
        },
        {
          question: "In Build a Portfolio, what happens if you put everything into stocks?",
          options: [
            "You get guaranteed returns",
            "Nothing happens",
            "You increase risk significantly and reduce diversification",
            "You eliminate all risk"
          ],
          correctAnswerIndex: 2,
          explanation: "Putting everything in stocks increases risk and eliminates the benefits of diversification across asset classes."
        },
        {
          question: "What is risk tolerance, and how does it change over time?",
          options: [
            "Risk tolerance never changes",
            "It's how comfortable someone is with losses; typically decreases as people age",
            "Only young people have risk tolerance",
            "Risk tolerance is the same for everyone"
          ],
          correctAnswerIndex: 1,
          explanation: "Risk tolerance reflects comfort with potential losses and typically decreases with age as people have less time to recover from losses."
        },
        {
          question: "In the 25-year-old example, why did the wealth manager recommend more stocks?",
          options: [
            "Stocks are always the best investment",
            "Because they had a long time horizon (40 years) allowing for growth despite volatility",
            "Because bonds are too risky",
            "To avoid taxes"
          ],
          correctAnswerIndex: 1,
          explanation: "A 40-year time horizon allows for higher stock allocation because there's time to ride out market volatility for long-term growth."
        }
      ]
    },
    activities: [
      {
        title: "Build a Sample Portfolio",
        instructions: [
          "Pick three companies or funds you know (Apple, Nike, S&P 500 ETF).",
          "Assign fake money ($1,000 total) across them.",
          "Research: Which is riskier? Which is more stable?",
          "Decide your allocation based on your age and time horizon (younger = more growth, older = more stability)."
        ],
        reflection: "How would you rebalance this in 5 years?"
      }
    ]
  }
];

export const getWealthManagementProgress = () => {
  const progress = localStorage.getItem('wealthManagementProgress');
  if (progress) {
    try {
      return JSON.parse(progress);
    } catch {
      return { completed: false, levelsCompleted: 0, totalLevels: wealthManagementJourneyData.length };
    }
  }
  return { completed: false, levelsCompleted: 0, totalLevels: wealthManagementJourneyData.length };
};