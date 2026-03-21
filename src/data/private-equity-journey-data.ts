export const privateEquityJourneyData = {
  name: "Private Equity",
  title: "Private Equity Journey",
  description: "Master how PE firms buy, improve, and sell businesses for profit. Learn the fundamentals that drive value creation and returns.",
  levels: [
    {
      id: 1,
      title: "Introduction to Private Equity",
      description: "Learn the fundamentals of how businesses make money decisions",
      focus: "PE Basics",
      topics: ["Private Equity Fundamentals", "Firms vs Portfolio Companies", "Investment Process"],
      content: {
        overview: "Private equity (PE) is investing in private companies that are not listed on stock markets. PE firms raise money from wealthy investors and institutions, then use that money to buy, improve, and eventually sell businesses for a profit. These firms often target companies they believe have growth potential or need restructuring. Unlike hedge funds, PE firms usually hold companies for years rather than trading frequently. The work combines investing, strategy, and hands-on management. This level introduces what private equity is and why it exists.",
        philsAnalogy: "Think of private equity like house flipping, but for businesses! A PE firm is like a house flipper who spots a rundown house in a good neighborhood. They buy it with some of their own money and a big loan from the bank. Then they renovate the kitchen, fix the plumbing, and paint everything nice. After a few years, they sell it for way more than they paid. The difference is profit! PE firms do the same thing with companies - they buy businesses that need work, improve them (maybe new management, better systems, expansion to new markets), and then sell them for a profit. Just like house flippers need to know which houses are worth buying, PE firms need to spot which businesses have hidden potential.",
        flashcards: [
          {
            term: "Private Equity (PE)",
            definition: "Private equity is money invested in private companies to improve them and earn profits. Firms buy businesses, make changes, and later sell them."
          },
          {
            term: "Firm",
            definition: "A private equity firm is the company that raises money, manages investments, and oversees portfolio businesses."
          },
          {
            term: "Portfolio Company",
            definition: "A portfolio company is a business owned by a private equity firm. It becomes part of the firm's investment portfolio."
          },
          {
            term: "Exit",
            definition: "An exit is when a private equity firm sells a company it owns to make a return. Exits often happen through IPOs or sales to other firms."
          },
          {
            term: "Institutional Investor",
            definition: "Large organizations like pension funds or endowments that provide money to private equity firms."
          }
        ],
        realLifeExample: "A private equity firm buys a family-owned restaurant chain with outdated systems. Over several years, it upgrades technology, improves marketing, and expands to new cities. Once profits grow, the firm sells the business to a larger company at a much higher value. Investors in the fund make strong returns.",
        miniGames: [
          {
            name: "PE or Not?",
            description: "Players see different investments (public stock, startup venture, private business buyout) and decide which qualify as private equity.",
            goal: "Differentiate PE from other investments.",
            completion: "Bronze = 2 correct, Silver = 3–4, Gold = all correct."
          },
          {
            name: "Exit Path",
            description: "Players choose the best way for a PE firm to exit a company: IPO, sale, or merger.",
            goal: "Understand exits in private equity.",
            completion: "Points for best exit choice."
          }
        ],
        quiz: [
          {
            question: "What is private equity?",
            options: ["Investing in public stocks", "Investing in private companies to improve them", "Government bonds", "Bank savings"],
            correct: 1
          },
          {
            question: "What is a portfolio company?",
            options: ["A company that invests in PE", "A business owned by a PE firm", "A public company", "A bank"],
            correct: 1
          },
          {
            question: "Who are institutional investors?",
            options: ["Individual people", "Large organizations like pension funds", "Small businesses", "Government agencies"],
            correct: 1
          },
          {
            question: "In the restaurant example, what changes improved the business?",
            options: ["Lower prices", "Technology upgrades and expansion", "Firing employees", "Closing locations"],
            correct: 1
          },
          {
            question: "What is an exit?",
            options: ["Buying a company", "Selling a company for profit", "Hiring new staff", "Opening new offices"],
            correct: 1
          }
        ],
        takeHomeActivity: "Write 5–6 sentences explaining a company you think a PE firm might buy. Describe why it could be improved and how a sale might create profit."
      }
    },
    {
      id: 2,
      title: "How Private Equity Firms Work",
      description: "Understand how PE firms raise money and structure deals",
      focus: "Fund Structure",
      topics: ["Fund Raising", "LPs vs GPs", "Fee Structures"],
      content: {
        overview: "Private equity firms raise money from investors, pool it into a fund, and use that fund to buy companies. Each fund usually lasts 8–12 years, with the first few years spent buying and the rest focused on improving and selling. Firms earn money both from fees and from sharing profits with investors. The process requires careful selection of companies, because not all businesses grow successfully. This level explains the structure of PE funds and firms.",
        philsAnalogy: "Imagine you want to start a house flipping business, but you need millions of dollars to buy houses. You can't afford that alone! So you create a 'house flipping fund' and ask rich friends, your wealthy uncle, and some pension funds to invest money with you. They become your 'Limited Partners' (LPs) - they give you money but don't flip houses themselves. You become the 'General Partner' (GP) - you do all the work of finding, buying, fixing, and selling houses. In return, you charge them a small management fee (like 2%) each year to cover your salary and office costs. When you sell houses for a profit, you keep 20% of the profits as your reward for doing all the hard work, and give 80% back to your investors. That's exactly how PE firms work - they raise money from investors and split the profits when they successfully 'flip' businesses!",
        flashcards: [
          {
            term: "Fund",
            definition: "A fund is the pool of money raised by a private equity firm from investors. It is used to buy and grow companies."
          },
          {
            term: "Limited Partner (LP)",
            definition: "LPs are the investors who put money into private equity funds. They include pension funds, endowments, and wealthy individuals."
          },
          {
            term: "General Partner (GP)",
            definition: "GPs are the managers who run the private equity firm. They make decisions and manage portfolio companies."
          },
          {
            term: "Management Fee",
            definition: "A fee (usually 2%) paid to the firm by investors to cover operating costs."
          },
          {
            term: "Carried Interest (\"Carry\")",
            definition: "A share of profits (usually 20%) that GPs earn if investments succeed."
          }
        ],
        realLifeExample: "A university endowment invests $50 million as a limited partner in a private equity fund. The PE firm (general partner) uses this money and others' contributions to buy several businesses. Over ten years, the firm improves and sells the companies, returning profits to the endowment plus a share for itself. This allows the university to fund scholarships and programs.",
        miniGames: [
          {
            name: "Fund Builder",
            description: "Players drag LPs (pension funds, individuals, endowments) into a fund pool.",
            goal: "Understand how funds are created.",
            completion: "Bronze = some correct, Silver = most correct, Gold = all correct."
          },
          {
            name: "GP vs LP",
            description: "Players classify roles (invest money, manage companies, collect fees) as GP or LP.",
            goal: "Differentiate between investors and managers.",
            completion: "Points for correct roles."
          }
        ],
        quiz: [
          {
            question: "What is a fund?",
            options: ["A PE firm", "A pool of money for investments", "A portfolio company", "A management team"],
            correct: 1
          },
          {
            question: "Who are LPs?",
            options: ["Fund managers", "Investors who provide money", "Portfolio companies", "Consultants"],
            correct: 1
          },
          {
            question: "Who are GPs?",
            options: ["Investors", "Managers who run the PE firm", "Portfolio companies", "Banks"],
            correct: 1
          },
          {
            question: "What is a management fee?",
            options: ["Profit sharing", "Fee to cover operating costs", "Investment return", "Company dividend"],
            correct: 1
          },
          {
            question: "In the endowment example, what was the money used for?",
            options: ["Personal expenses", "Buying and improving businesses", "Bank deposits", "Real estate"],
            correct: 1
          }
        ],
        takeHomeActivity: "Write 5–6 sentences describing how you would explain the roles of LP and GP to a high school classmate."
      }
    },
    {
      id: 3,
      title: "Types of Private Equity Deals",
      description: "Explore different investment strategies and deal structures",
      focus: "Deal Types",
      topics: ["Leveraged Buyouts", "Growth Equity", "Venture Capital"],
      content: {
        overview: "Private equity firms invest in companies in several ways. The most common type is the leveraged buyout (LBO), where firms borrow money to buy a business. Growth equity involves investing in companies that are expanding but need capital. Venture capital, often considered a cousin to private equity, focuses on startups. Distressed investing targets struggling companies that can be turned around. Each deal type has its own risk and reward profile.",
        philsAnalogy: "Think of PE deal types like different ways to make money with real estate. An LBO is like buying a rental property mostly with a mortgage - you put down some of your own money and borrow the rest, then use the rent to pay off the loan. Growth equity is like investing in a successful restaurant that wants to open more locations - you give them money to expand, and they give you a share of the bigger profits. Venture capital is like funding your friend's crazy new app idea - super risky, but if it becomes the next Instagram, you'll make a fortune! Distressed investing is like buying a foreclosed house that needs major repairs - you get it cheap, fix it up, and hopefully sell it for much more than what you spent.",
        flashcards: [
          {
            term: "Leveraged Buyout (LBO)",
            definition: "Buying a company using a mix of debt and equity. Profits come from improving and later selling the business."
          },
          {
            term: "Growth Equity",
            definition: "Investing in companies that are already successful but need money to expand. It is less risky than startups."
          },
          {
            term: "Venture Capital (VC)",
            definition: "Providing money to startups with high growth potential. Returns can be huge but very risky."
          },
          {
            term: "Distressed Investing",
            definition: "Buying struggling companies at low prices with plans to fix or restructure them. Success depends on turnaround."
          },
          {
            term: "Buyout",
            definition: "A buyout is when a PE firm purchases most or all of a company's ownership. It gives the firm control."
          }
        ],
        realLifeExample: "A PE firm completes an LBO of a manufacturing company using $200 million of its own money and $800 million in debt. The firm improves operations, reduces costs, and grows sales. After five years, it sells the company for $1.5 billion, paying off the debt and earning big profits. This is a classic private equity buyout story.",
        miniGames: [
          {
            name: "Deal Sorter",
            description: "Players match scenarios (startup, turnaround, expansion) to deal types.",
            goal: "Identify PE deal structures.",
            completion: "Bronze = some correct, Silver = most correct, Gold = all correct."
          },
          {
            name: "LBO Simulator",
            description: "Players choose debt and equity levels for a buyout and see results.",
            goal: "Learn how leverage impacts outcomes.",
            completion: "Points for balanced decisions."
          }
        ],
        quiz: [
          {
            question: "What is an LBO?",
            options: ["Investing in startups", "Buying with borrowed money", "Selling companies", "Public trading"],
            correct: 1
          },
          {
            question: "What is growth equity?",
            options: ["Startup investing", "Distressed company investing", "Investing in expanding companies", "Public stock buying"],
            correct: 2
          },
          {
            question: "What is venture capital?",
            options: ["Funding startups", "Buying mature companies", "Distressed investing", "Real estate"],
            correct: 0
          },
          {
            question: "In the example, how did the PE firm profit?",
            options: ["Dividends", "Selling for more than invested", "Management fees", "Interest payments"],
            correct: 1
          },
          {
            question: "What is distressed investing?",
            options: ["Buying successful companies", "Buying struggling companies", "IPO investments", "Bond trading"],
            correct: 1
          }
        ],
        takeHomeActivity: "Choose one deal type (LBO, growth equity, VC, or distressed). Write 5–6 sentences explaining why a PE firm might choose it."
      }
    },
    {
      id: 4,
      title: "Valuation and Due Diligence",
      description: "Learn how PE firms evaluate and analyze potential investments",
      focus: "Deal Analysis",
      topics: ["Company Valuation", "EBITDA Analysis", "Risk Assessment"],
      content: {
        overview: "Before buying a company, private equity firms must carefully study it. This process is called due diligence, and it involves analyzing finances, operations, and risks. Firms also perform valuations to estimate how much the business is worth. Valuation combines tools like EBITDA multiples, discounted cash flow, and comparisons to similar companies. Mistakes at this stage can lead to big losses. This level explains how firms decide if a deal is a good one.",
        philsAnalogy: "Due diligence is like being a super thorough home inspector before buying a house. You wouldn't just look at the pretty kitchen and say 'I'll take it!' You'd check the foundation, plumbing, electrical, roof, and neighborhood. You'd compare prices of similar houses nearby. You'd calculate if the monthly mortgage payments make sense with your income. PE firms do the same thing with companies - they look 'under the hood' to check the finances, management, competition, and legal issues. They compare the company to similar businesses to see if the price is fair. Just like a home inspector might find hidden problems (leaky roof, bad wiring), PE firms might discover red flags like declining sales or pending lawsuits. Finding these issues early helps them avoid overpaying or walking away from a bad deal!",
        flashcards: [
          {
            term: "Valuation",
            definition: "Valuation is the process of estimating how much a company is worth. PE firms use it to decide what price to pay."
          },
          {
            term: "Due Diligence",
            definition: "Due diligence is a detailed investigation of a company before buying it. It reduces surprises and hidden risks."
          },
          {
            term: "EBITDA",
            definition: "EBITDA stands for earnings before interest, taxes, depreciation, and amortization. It shows how much money a company makes from its core business."
          },
          {
            term: "Comparable Companies (\"Comps\")",
            definition: "Comps compare a company to similar businesses to estimate value. It helps set a fair price."
          },
          {
            term: "Red Flag",
            definition: "A red flag is a warning sign uncovered during due diligence. Examples include lawsuits, declining sales, or hidden debt."
          }
        ],
        realLifeExample: "A PE firm considers buying a software company. During due diligence, they find the company inflates revenue numbers by counting unpaid invoices. This red flag lowers the valuation, and the firm negotiates a better price. By catching the issue early, the firm avoids overpaying.",
        miniGames: [
          {
            name: "Valuation Match",
            description: "Players match valuation tools (EBITDA, comps, cash flow) to their purpose.",
            goal: "Learn how companies are valued.",
            completion: "Bronze = 50% correct, Silver = 75%, Gold = 100%."
          },
          {
            name: "Red Flag Hunt",
            description: "Players read company profiles and identify warning signs.",
            goal: "Practice spotting problems during due diligence.",
            completion: "Points for correct red flag choices."
          }
        ],
        quiz: [
          {
            question: "What is valuation?",
            options: ["Buying a company", "Estimating company worth", "Selling shares", "Managing operations"],
            correct: 1
          },
          {
            question: "What is due diligence?",
            options: ["Quick decision making", "Detailed investigation before buying", "Selling process", "Marketing strategy"],
            correct: 1
          },
          {
            question: "What does EBITDA measure?",
            options: ["Stock price", "Core business earnings", "Debt levels", "Employee count"],
            correct: 1
          },
          {
            question: "In the software example, what red flag was discovered?",
            options: ["High prices", "Inflated revenue numbers", "Too many employees", "Old technology"],
            correct: 1
          },
          {
            question: "Why are comps useful?",
            options: ["They show industry trends", "They help set fair prices", "They predict the future", "They reduce costs"],
            correct: 1
          }
        ],
        takeHomeActivity: "Pick a company you know (like Apple or Starbucks). Write 5–6 sentences about what information you would check before investing in it."
      }
    },
    {
      id: 5,
      title: "Operations and Value Creation",
      description: "Discover how PE firms improve portfolio companies",
      focus: "Value Enhancement",
      topics: ["Operational Improvements", "Cost Management", "Growth Strategies"],
      content: {
        overview: "Private equity firms don't just buy companies—they actively work to make them more valuable. This process is called value creation. Firms often improve operations, cut unnecessary costs, grow sales, and modernize management practices. Consultants and industry experts may be brought in to support changes. Success depends on transforming the company so it is worth more when sold. This level shows how PE firms create value inside portfolio companies.",
        philsAnalogy: "Value creation is like taking a fixer-upper house and turning it into a dream home. After you buy the house, the real work begins! You might renovate the kitchen to make it more modern, fix the plumbing so it works better, add a deck to increase living space, and hire a professional to landscape the yard. You're not just maintaining the house - you're actively making it more valuable. PE firms do the same with companies. They might bring in a new CEO (like hiring a great contractor), upgrade the computer systems (like renovating the kitchen), expand to new markets (like adding a deck), and streamline operations (like fixing the plumbing). Every improvement makes the company worth more when it's time to sell, just like home improvements increase a house's selling price!",
        flashcards: [
          {
            term: "Value Creation",
            definition: "Value creation means making a company more profitable and efficient. It increases the firm's selling price later."
          },
          {
            term: "Operational Improvements",
            definition: "These are changes like better supply chains, new technology, or staff training. They reduce costs and boost profits."
          },
          {
            term: "Revenue Growth",
            definition: "PE firms help portfolio companies sell more products or expand into new markets. Growth increases company value."
          },
          {
            term: "Cost Cutting",
            definition: "Reducing waste and inefficiency to save money. Examples include renegotiating supplier contracts."
          },
          {
            term: "Professionalization",
            definition: "Bringing in stronger management, systems, or governance to improve how the company runs."
          }
        ],
        realLifeExample: "A PE firm buys a struggling furniture manufacturer. It hires a new CEO, upgrades equipment, and finds cheaper suppliers. Within three years, the company becomes profitable and more competitive. The firm later sells it for a large gain, thanks to value creation.",
        miniGames: [
          {
            name: "Value Builder",
            description: "Players choose strategies (cut costs, expand sales, hire new leaders) to improve a company.",
            goal: "Learn different ways firms add value.",
            completion: "Bronze = some impact, Silver = good impact, Gold = high impact."
          },
          {
            name: "Fix or Forget",
            description: "Players decide whether a portfolio company problem (outdated tech, loyal customers, poor branding) should be fixed or ignored.",
            goal: "Understand which changes matter most.",
            completion: "Points for choosing impactful fixes."
          }
        ],
        quiz: [
          {
            question: "What is value creation?",
            options: ["Buying companies", "Making companies more valuable", "Selling companies", "Reducing prices"],
            correct: 1
          },
          {
            question: "What are operational improvements?",
            options: ["Financial changes only", "Changes to make operations better", "Marketing campaigns", "Stock buybacks"],
            correct: 1
          },
          {
            question: "What does professionalization mean in PE?",
            options: ["Hiring celebrities", "Bringing in stronger management", "Reducing staff", "Going public"],
            correct: 1
          },
          {
            question: "In the furniture example, what changes improved the business?",
            options: ["Lower prices only", "New CEO and upgrades", "More advertising", "Smaller product line"],
            correct: 1
          },
          {
            question: "Why is cost cutting important?",
            options: ["It increases revenue", "It reduces waste and saves money", "It attracts customers", "It improves quality"],
            correct: 1
          }
        ],
        takeHomeActivity: "Think of a company in your town. Write 5–6 sentences on what changes could make it more successful if a PE firm owned it."
      }
    },
    {
      id: 6,
      title: "Exits and Returns",
      description: "Understand how PE firms realize profits and measure success",
      focus: "Exit Strategies",
      topics: ["IPO Process", "Strategic Sales", "Return Calculations"],
      content: {
        overview: "The ultimate goal of private equity is to sell companies for a profit. This process is called an exit. Common exit paths include selling to another company, selling to another PE firm, or taking the company public through an IPO. Returns are measured by how much profit the firm made for investors compared to what was invested. Timing and market conditions often determine success. This level explains how exits work and how PE firms calculate results.",
        philsAnalogy: "An exit is like finally selling your renovated house after years of improvements. You have several options: you could sell to a regular family who wants to live there (like selling to another company), sell to another house flipper who wants to renovate it further (like selling to another PE firm), or turn it into a publicly-traded real estate investment where many people can buy shares (like an IPO). The key is timing - you want to sell when the market is hot and your house looks its best. If you bought the house for $300,000, spent $100,000 fixing it up, and sell it for $600,000, you made a $200,000 profit on your $400,000 investment - that's a 50% return! PE firms calculate returns the same way, measuring how much profit they made compared to what they invested.",
        flashcards: [
          {
            term: "Exit",
            definition: "An exit is when a PE firm sells a portfolio company to realize profits. It is the final stage of ownership."
          },
          {
            term: "IPO (Initial Public Offering)",
            definition: "When a company sells shares to the public on the stock market. It allows the PE firm to sell its stake."
          },
          {
            term: "Secondary Sale",
            definition: "Selling a company to another PE firm or investor. It provides liquidity without going public."
          },
          {
            term: "Strategic Sale",
            definition: "Selling a company to a larger corporation that wants to expand. The buyer values synergies and growth potential."
          },
          {
            term: "Return on Investment (ROI)",
            definition: "A measure of how much profit was made compared to the money invested."
          }
        ],
        realLifeExample: "A PE firm invests $200 million in a healthcare company. After improving operations, it sells the company through an IPO for $600 million. Investors triple their money, and the PE firm earns carried interest. This shows how successful exits drive strong returns.",
        miniGames: [
          {
            name: "Exit Picker",
            description: "Players are given scenarios and choose the best exit: IPO, secondary sale, or strategic sale.",
            goal: "Understand exit strategies.",
            completion: "Points for best matches."
          },
          {
            name: "ROI Calculator",
            description: "Players input investment and exit numbers to calculate return percentages.",
            goal: "Learn how to measure profits in PE.",
            completion: "Bronze = some correct, Silver = most correct, Gold = all correct."
          }
        ],
        quiz: [
          {
            question: "What is an exit?",
            options: ["Buying a company", "Selling a company for profit", "Hiring management", "Expanding operations"],
            correct: 1
          },
          {
            question: "What is an IPO?",
            options: ["Private sale", "Selling shares to the public", "Management buyout", "Asset sale"],
            correct: 1
          },
          {
            question: "What is a strategic sale?",
            options: ["Sale to employees", "Sale to a larger corporation", "Public offering", "Asset liquidation"],
            correct: 1
          },
          {
            question: "In the healthcare example, how much was the company sold for?",
            options: ["$200 million", "$400 million", "$600 million", "$800 million"],
            correct: 2
          },
          {
            question: "What does ROI measure?",
            options: ["Company size", "Profit vs investment", "Employee count", "Market share"],
            correct: 1
          }
        ],
        takeHomeActivity: "Write 5–6 sentences describing which exit strategy (IPO, sale to another firm, or sale to a corporation) you think is best and why."
      }
    },
    {
      id: 7,
      title: "The Future of Private Equity",
      description: "Explore emerging trends and evolving practices in PE",
      focus: "Industry Evolution",
      topics: ["Sustainable Investing", "Technology Impact", "Global Expansion"],
      content: {
        overview: "Private equity is evolving as markets, technology, and society change. Firms now focus more on sustainable investing, diversity, and long-term growth. Technology like artificial intelligence helps firms analyze deals faster and spot trends. Competition has grown as more money flows into private markets, raising valuations and reducing easy profits. Future success will depend on adapting to global changes while continuing to deliver strong returns. This level explores where private equity is headed.",
        philsAnalogy: "The future of PE is like how house flipping has evolved over the decades. In the old days, flippers just bought cheap houses, slapped on some paint, and sold quickly. Now, successful flippers use apps to analyze neighborhood trends, focus on energy-efficient upgrades that help the environment, and consider what modern families actually need (like home offices for remote work). They also face more competition because everyone watched those house-flipping TV shows! PE firms are evolving the same way - they use AI to analyze deals faster, invest in companies that care about sustainability (like solar energy), and compete globally rather than just locally. The firms that adapt to these changes will thrive, while those stuck in old ways might struggle. Just like modern house flippers need to understand smart home technology, modern PE firms need to understand ESG investing and digital transformation!",
        flashcards: [
          {
            term: "Sustainable Investing",
            definition: "Investing with focus on environmental and social impact, not just profits. It is becoming more important in PE."
          },
          {
            term: "Technology in PE",
            definition: "Using AI and data tools to evaluate deals and improve companies faster."
          },
          {
            term: "Global Expansion",
            definition: "PE firms increasingly invest in emerging markets worldwide. Growth opportunities extend beyond the U.S. and Europe."
          },
          {
            term: "Competition",
            definition: "As more investors enter PE, deals become more expensive. Firms must work harder to earn strong returns."
          },
          {
            term: "Future Trends",
            definition: "Trends like ESG, digital tools, and global reach will shape private equity. Successful firms will adapt quickly."
          }
        ],
        realLifeExample: "A PE firm invests in renewable energy companies, betting on the global shift to clean energy. Using AI, it identifies which businesses have the best technology. The investment grows as demand for renewable power increases, creating profits and positive social impact. This shows how the future of PE ties financial success to broader global needs.",
        miniGames: [
          {
            name: "Trend Tracker",
            description: "Players sort examples (renewable energy, traditional oil, AI tools, manual processes) into 'future' or 'past.'",
            goal: "Recognize modern PE trends.",
            completion: "Bronze = some correct, Silver = most correct, Gold = all correct."
          },
          {
            name: "Survival Strategy",
            description: "Players choose strategies (use AI, expand globally, ignore ESG) and see if the PE firm thrives.",
            goal: "Learn what keeps firms competitive in the future.",
            completion: "Points for picking future-focused strategies."
          }
        ],
        quiz: [
          {
            question: "What is sustainable investing?",
            options: ["Quick profits only", "Investing with environmental and social focus", "Traditional investing", "Government bonds"],
            correct: 1
          },
          {
            question: "How can technology help PE firms?",
            options: ["Replace all humans", "Analyze deals faster", "Eliminate risk", "Guarantee profits"],
            correct: 1
          },
          {
            question: "What is global expansion in PE?",
            options: ["Only US investments", "Investing worldwide", "Avoiding foreign markets", "Currency trading"],
            correct: 1
          },
          {
            question: "Why is competition increasing in private equity?",
            options: ["Fewer investors", "More money entering PE", "Government restrictions", "Lower returns"],
            correct: 1
          },
          {
            question: "In the renewable energy example, what drove success?",
            options: ["Government subsidies", "Growing demand for clean energy", "Lower costs only", "Marketing campaigns"],
            correct: 1
          }
        ],
        takeHomeActivity: "Write 6–7 sentences predicting what private equity will look like in 20 years. Will ESG, AI, and global markets make it stronger, or will competition reduce profits?"
      }
    }
  ]
};