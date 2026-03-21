export interface CategorizedFlashcard {
  id: string;
  term: string;
  definition: string;
  philExample?: string;
  realWorldExample?: string;
  level: 'beginner' | 'intermediate' | 'pro';
  masteryLevel?: 'new' | 'unsure' | 'learning' | 'mastered';
  timesShown?: number;
  lastShown?: string;
}

export interface FlashcardSubsection {
  id: string;
  title: string;
  description: string;
  icon: string;
  cards: CategorizedFlashcard[];
}

export interface FlashcardSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  subsections: FlashcardSubsection[];
}

export interface FlashcardCategorySystem {
  personalFinance: FlashcardSection;
  careersInFinance: FlashcardSection;
  companyKnowledge: FlashcardSection;
}

// Personal Finance Section
export const personalFinanceSection: FlashcardSection = {
  id: 'personal-finance',
  title: 'Personal Finance',
  description: 'Master the fundamentals of managing your money',
  icon: '💰',
  subsections: [
    {
      id: 'budgeting-spending',
      title: 'Budgeting & Spending',
      description: 'Learn to track and control your expenses',
      icon: '📊',
      cards: [
        {
          id: 'budget-1',
          term: 'Budget',
          definition: 'A plan for how to spend and save your money',
          philExample: 'Like planning how to spend your allowance on games, snacks, and savings!',
          realWorldExample: 'Creating a monthly budget helps you track where your money goes.',
          level: 'beginner'
        },
        {
          id: 'budget-2',
          term: 'Emergency Fund',
          definition: 'Money saved for unexpected expenses or emergencies',
          philExample: 'Like keeping extra snacks in your backpack for when you get hungry!',
          realWorldExample: 'Financial experts recommend saving 3-6 months of expenses in an emergency fund.',
          level: 'beginner'
        },
        {
          id: 'budget-3',
          term: 'Fixed Expenses',
          definition: 'Regular costs that stay the same each month',
          philExample: 'Like your monthly subscription to a streaming service - always the same price!',
          realWorldExample: 'Rent, car payments, and insurance are fixed expenses that don\'t change month to month.',
          level: 'intermediate'
        },
        {
          id: 'budget-4',
          term: 'Variable Expenses',
          definition: 'Costs that change from month to month',
          philExample: 'Like your snack budget - some months you buy more, some months less!',
          realWorldExample: 'Groceries, entertainment, and gas are variable expenses that fluctuate.',
          level: 'intermediate'
        }
      ]
    },
    {
      id: 'credit-debt',
      title: 'Credit & Debt Management',
      description: 'Understand borrowing and building credit',
      icon: '💳',
      cards: [
        {
          id: 'credit-1',
          term: 'Credit Score',
          definition: 'A number that shows how reliable you are at paying back money',
          philExample: 'Like a report card for how responsible you are with borrowing money!',
          realWorldExample: 'A good credit score (700+) helps you get better rates on loans and credit cards.',
          level: 'beginner'
        },
        {
          id: 'credit-2',
          term: 'APR',
          definition: 'Annual Percentage Rate: the yearly cost of borrowing money',
          philExample: 'Like the total price tag on borrowing money for a whole year!',
          realWorldExample: 'A credit card with 20% APR means you pay $200 in interest on a $1,000 balance over a year.',
          level: 'intermediate'
        },
        {
          id: 'credit-3',
          term: 'Credit Utilization',
          definition: 'The percentage of available credit you\'re using',
          philExample: 'Like using 3 slices of a 10-slice pizza - you\'re using 30% of what\'s available!',
          realWorldExample: 'Keeping credit utilization below 30% helps maintain a good credit score.',
          level: 'intermediate'
        },
        {
          id: 'credit-4',
          term: 'Debt Consolidation',
          definition: 'Combining multiple debts into one loan with better terms',
          philExample: 'Like putting all your homework into one big folder instead of many small ones!',
          realWorldExample: 'Consolidating high-interest credit card debt into a lower-rate personal loan can save money.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'big-purchases',
      title: 'Big Purchases & Planning',
      description: 'Plan for major life expenses',
      icon: '🏠',
      cards: [
        {
          id: 'purchase-1',
          term: 'Down Payment',
          definition: 'Initial upfront payment when buying something expensive',
          philExample: 'Like paying part of the cost of a new bike now, and the rest later!',
          realWorldExample: 'Most homes require a 20% down payment to avoid extra insurance costs.',
          level: 'beginner'
        },
        {
          id: 'purchase-2',
          term: 'Mortgage',
          definition: 'A loan to buy a house that you pay back over many years',
          philExample: 'Like borrowing money to buy a really expensive toy, but paying it back little by little!',
          realWorldExample: 'A 30-year mortgage spreads home payments over three decades with interest.',
          level: 'intermediate'
        },
        {
          id: 'purchase-3',
          term: 'Depreciation',
          definition: 'When something loses value over time',
          philExample: 'Like how a new toy is worth less after you\'ve played with it for a year!',
          realWorldExample: 'A new car loses 20-30% of its value as soon as you drive it off the lot.',
          level: 'intermediate'
        },
        {
          id: 'purchase-4',
          term: 'Lease vs Buy',
          definition: 'Renting something vs owning it outright',
          philExample: 'Like renting a video game vs buying it to keep forever!',
          realWorldExample: 'Leasing a car means lower monthly payments but you don\'t own it at the end.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'earning-income',
      title: 'Earning & Income Streams',
      description: 'Maximize your earning potential',
      icon: '💵',
      cards: [
        {
          id: 'income-1',
          term: 'Active Income',
          definition: 'Money earned from working a job',
          philExample: 'Like getting paid for mowing lawns - you work, you get money!',
          realWorldExample: 'Your salary or hourly wages from your job is active income.',
          level: 'beginner'
        },
        {
          id: 'income-2',
          term: 'Passive Income',
          definition: 'Money earned without actively working',
          philExample: 'Like getting money from a lemonade stand that runs itself!',
          realWorldExample: 'Rental property income or dividend payments are forms of passive income.',
          level: 'intermediate'
        },
        {
          id: 'income-3',
          term: 'Side Hustle',
          definition: 'Extra work done outside your main job to earn more money',
          philExample: 'Like selling crafts after school while still doing your regular homework!',
          realWorldExample: 'Freelancing, consulting, or driving for Uber are popular side hustles.',
          level: 'intermediate'
        },
        {
          id: 'income-4',
          term: 'Gross vs Net Income',
          definition: 'Total earnings before vs after taxes and deductions',
          philExample: 'Like earning $10 but only keeping $8 after your parents take out chore deductions!',
          realWorldExample: 'If you earn $60,000 gross, your net income after taxes might be $45,000.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'financial-safety',
      title: 'Financial Safety & Security',
      description: 'Protect yourself from financial risks',
      icon: '🛡️',
      cards: [
        {
          id: 'safety-1',
          term: 'Phishing',
          definition: 'Fake emails or messages that trick you into giving personal information',
          philExample: 'Like someone pretending to be your friend to get your lunch money!',
          realWorldExample: 'Scammers send emails that look like your bank asking for your password.',
          level: 'beginner'
        },
        {
          id: 'safety-2',
          term: 'Two-Factor Authentication',
          definition: 'Extra security requiring two verification methods to log in',
          philExample: 'Like needing both a key and a secret code to open a treasure chest!',
          realWorldExample: 'Your bank sends a text code after you enter your password for extra security.',
          level: 'beginner'
        },
        {
          id: 'safety-3',
          term: 'Insurance Premium',
          definition: 'The amount you pay monthly or yearly for insurance coverage',
          philExample: 'Like a membership fee to be part of a safety club!',
          realWorldExample: 'You pay a car insurance premium every month to be protected if you get in an accident.',
          level: 'beginner'
        },
        {
          id: 'safety-4',
          term: 'Deductible',
          definition: 'Amount you pay before insurance covers the rest',
          philExample: 'Like having to pay the first $5 of a video game before your parents cover the rest!',
          realWorldExample: 'If your deductible is $500, you pay the first $500 of medical bills before insurance kicks in.',
          level: 'beginner'
        }
      ]
    },
    {
      id: 'future-planning',
      title: 'Future Planning & Retirement',
      description: 'Build wealth for the long term',
      icon: '🌟',
      cards: [
        {
          id: 'future-1',
          term: 'Compound Interest',
          definition: 'Interest earned on both the principal amount and previous interest',
          philExample: 'Like a snowball rolling downhill - it gets bigger and bigger as it picks up more snow!',
          realWorldExample: 'If you invest $1,000 at 8% compound interest, you earn interest on your interest each year.',
          level: 'beginner'
        },
        {
          id: 'future-2',
          term: '401(k)',
          definition: 'An employer-sponsored retirement savings plan',
          philExample: 'Like a piggy bank your employer helps you fill up for when you\'re older!',
          realWorldExample: 'Many companies match your 401(k) contributions up to 6% of your salary.',
          level: 'intermediate'
        },
        {
          id: 'future-3',
          term: 'Roth IRA',
          definition: 'A retirement account where you pay taxes now but withdrawals are tax-free later',
          philExample: 'Like paying for a movie ticket now so you can watch unlimited movies later for free!',
          realWorldExample: 'You can contribute up to $6,500/year to a Roth IRA and all growth is tax-free.',
          level: 'intermediate'
        },
        {
          id: 'future-4',
          term: 'Asset Allocation',
          definition: 'Deciding how to distribute investments across different asset types',
          philExample: 'Like not putting all your Halloween candy in one basket - spread it out!',
          realWorldExample: 'A balanced portfolio might be 60% stocks, 30% bonds, and 10% cash.',
          level: 'intermediate'
        }
      ]
    },
    {
      id: 'taxes',
      title: 'Taxes & Compliance',
      description: 'Navigate tax requirements',
      icon: '📋',
      cards: [
        {
          id: 'tax-1',
          term: 'Tax Bracket',
          definition: 'Income ranges that determine your tax rate',
          philExample: 'Like different price levels at an arcade - the more you play, the higher the cost per game!',
          realWorldExample: 'The US has seven tax brackets ranging from 10% to 37% based on income.',
          level: 'intermediate'
        },
        {
          id: 'tax-2',
          term: 'Tax Deduction',
          definition: 'Expenses that reduce your taxable income',
          philExample: 'Like getting a discount on homework based on how many chores you did!',
          realWorldExample: 'Mortgage interest and charitable donations are common tax deductions.',
          level: 'intermediate'
        },
        {
          id: 'tax-3',
          term: 'W-2 Form',
          definition: 'Document showing your annual earnings and taxes withheld',
          philExample: 'Like a report card for your earnings that shows what you made and what was taken out!',
          realWorldExample: 'Your employer sends a W-2 form each January for filing your taxes.',
          level: 'intermediate'
        },
        {
          id: 'tax-4',
          term: 'Capital Gains Tax',
          definition: 'Tax on profit from selling investments',
          philExample: 'Like paying a fee when you sell your trading cards for more than you bought them!',
          realWorldExample: 'If you buy stock for $1,000 and sell for $1,500, you pay tax on the $500 gain.',
          level: 'pro'
        }
      ]
    }
  ]
};

// Careers in Finance Section
export const careersInFinanceSection: FlashcardSection = {
  id: 'careers-finance',
  title: 'Careers in Finance',
  description: 'Explore different career paths in the finance industry',
  icon: '💼',
  subsections: [
    {
      id: 'investment-banking',
      title: 'Investment Banking',
      description: 'Help companies raise capital and execute deals',
      icon: '🏦',
      cards: [
        {
          id: 'ib-1',
          term: 'Investment Bank',
          definition: 'A financial institution that helps companies raise money and provides advice on deals',
          philExample: 'Like a real estate agent who helps people buy and sell houses, but for companies!',
          realWorldExample: 'Goldman Sachs is an investment bank that helped companies like Facebook go public.',
          level: 'beginner'
        },
        {
          id: 'ib-2',
          term: 'IPO',
          definition: 'Initial Public Offering: When a company sells shares to the public for the first time',
          philExample: 'Like a lemonade stand going from neighborhood-only to stores everywhere!',
          realWorldExample: 'When Airbnb had its IPO in 2020, anyone could buy shares of the company.',
          level: 'beginner'
        },
        {
          id: 'ib-3',
          term: 'Underwriting',
          definition: 'When investment banks buy securities from companies and sell them to investors',
          philExample: 'Like a store buying products from manufacturers to sell to customers - the store takes the risk!',
          realWorldExample: 'Investment banks underwrote Spotify\'s IPO, buying shares to resell to investors.',
          level: 'intermediate'
        },
        {
          id: 'ib-4',
          term: 'Pitch Book',
          definition: 'A presentation to pitch investment banking services to clients',
          philExample: 'Like a portfolio showing your best work when applying for a job!',
          realWorldExample: 'Investment banks create pitch books with analysis and recommendations for potential clients.',
          level: 'intermediate'
        },
        {
          id: 'ib-5',
          term: 'Due Diligence',
          definition: 'Thorough investigation of a company before a deal',
          philExample: 'Like a detective investigating a crime scene to find all the clues!',
          realWorldExample: 'Before acquiring WhatsApp, Facebook did due diligence on user data and technology.',
          level: 'intermediate'
        },
        {
          id: 'ib-6',
          term: 'Bulge Bracket',
          definition: 'The largest and most prestigious investment banks',
          philExample: 'Like the top-tier teams in sports - everyone wants to play for them!',
          realWorldExample: 'Goldman Sachs, JPMorgan, and Morgan Stanley are bulge bracket banks.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'asset-management',
      title: 'Asset Management',
      description: 'Manage investments for clients',
      icon: '📈',
      cards: [
        {
          id: 'am-1',
          term: 'Asset Manager',
          definition: 'Professional who invests money on behalf of clients',
          philExample: 'Like hiring someone to pick the best toys for your collection!',
          realWorldExample: 'BlackRock is the world\'s largest asset manager, managing trillions in investments.',
          level: 'beginner'
        },
        {
          id: 'am-2',
          term: 'Portfolio Manager',
          definition: 'Person responsible for making investment decisions for a fund',
          philExample: 'Like the captain of a team who decides which players to use!',
          realWorldExample: 'Portfolio managers at Fidelity decide which stocks and bonds to buy for their funds.',
          level: 'intermediate'
        },
        {
          id: 'am-3',
          term: 'Index Fund',
          definition: 'A fund that tracks a market index like the S&P 500',
          philExample: 'Like buying a sampler platter instead of ordering just one dish!',
          realWorldExample: 'An S&P 500 index fund owns a piece of all 500 largest US companies.',
          level: 'intermediate'
        },
        {
          id: 'am-4',
          term: 'Active vs Passive Management',
          definition: 'Trying to beat the market vs matching market returns',
          philExample: 'Like trying to win first place vs just running with the pack!',
          realWorldExample: 'Active managers charge higher fees to pick stocks; passive managers track indexes.',
          level: 'pro'
        },
        {
          id: 'am-5',
          term: 'AUM',
          definition: 'Assets Under Management: total value of investments managed',
          philExample: 'Like the total value of all collectibles you\'re helping friends manage!',
          realWorldExample: 'Vanguard has over $7 trillion in AUM across its various funds.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'private-equity',
      title: 'Private Equity',
      description: 'Invest in and improve private companies',
      icon: '🔐',
      cards: [
        {
          id: 'pe-1',
          term: 'Private Equity',
          definition: 'Investment in private companies not traded on stock exchanges',
          philExample: 'Like buying and fixing up a house to sell for more money later!',
          realWorldExample: 'KKR and Blackstone are major private equity firms that buy and improve companies.',
          level: 'intermediate'
        },
        {
          id: 'pe-2',
          term: 'LBO Model',
          definition: 'Leveraged Buyout: acquiring a company using significant debt',
          philExample: 'Like buying a rental property with a big mortgage and using rent to pay it off!',
          realWorldExample: 'Private equity firms used LBOs to acquire companies like Toys R Us.',
          level: 'pro'
        },
        {
          id: 'pe-3',
          term: 'Portfolio Company',
          definition: 'A company owned by a private equity firm',
          philExample: 'Like a project you\'re working on to improve and make more valuable!',
          realWorldExample: 'Burger King is a portfolio company owned by Restaurant Brands International.',
          level: 'pro'
        },
        {
          id: 'pe-4',
          term: 'IRR',
          definition: 'Internal Rate of Return: annual growth rate an investment generates',
          philExample: 'Like the interest rate your savings would need to match investment returns!',
          realWorldExample: 'Private equity firms target 20%+ IRR on investments.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'venture-capital',
      title: 'Venture Capital',
      description: 'Fund high-growth startups',
      icon: '🚀',
      cards: [
        {
          id: 'vc-1',
          term: 'Venture Capital',
          definition: 'Investment in early-stage startups with high growth potential',
          philExample: 'Like giving someone money to start their lemonade stand in exchange for part ownership!',
          realWorldExample: 'Sequoia Capital invested in Google, Apple, and Airbnb when they were startups.',
          level: 'intermediate'
        },
        {
          id: 'vc-2',
          term: 'Series A, B, C Funding',
          definition: 'Progressive rounds of startup funding as companies grow',
          philExample: 'Like leveling up in a game - each level gets harder but the rewards are bigger!',
          realWorldExample: 'Uber raised Series A through Series H funding before going public.',
          level: 'intermediate'
        },
        {
          id: 'vc-3',
          term: 'Unicorn',
          definition: 'Private startup valued at over $1 billion',
          philExample: 'Like finding a super rare Pokemon - very valuable and hard to find!',
          realWorldExample: 'Stripe, SpaceX, and Databricks are unicorn companies worth billions.',
          level: 'pro'
        },
        {
          id: 'vc-4',
          term: 'Term Sheet',
          definition: 'Document outlining key terms of an investment deal',
          philExample: 'Like a contract for trading cards that says what each person gets!',
          realWorldExample: 'VCs provide term sheets detailing valuation, equity stake, and board seats.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'hedge-funds',
      title: 'Hedge Funds',
      description: 'Use advanced strategies for wealthy investors',
      icon: '📊',
      cards: [
        {
          id: 'hf-1',
          term: 'Hedge Fund',
          definition: 'Investment fund using diverse strategies to generate returns',
          philExample: 'Like a master chess player using all kinds of moves to win!',
          realWorldExample: 'Bridgewater Associates is the world\'s largest hedge fund managing over $100 billion.',
          level: 'intermediate'
        },
        {
          id: 'hf-2',
          term: 'Long/Short Strategy',
          definition: 'Buying stocks expected to rise and selling those expected to fall',
          philExample: 'Like betting some teams will win and others will lose!',
          realWorldExample: 'Hedge funds go long on undervalued stocks and short overvalued ones.',
          level: 'pro'
        },
        {
          id: 'hf-3',
          term: 'Alpha',
          definition: 'Investment returns above the market benchmark',
          philExample: 'Like scoring more points than everyone expected you to!',
          realWorldExample: 'A hedge fund generating 15% returns when the market returned 10% has 5% alpha.',
          level: 'pro'
        },
        {
          id: 'hf-4',
          term: '2 and 20',
          definition: 'Standard hedge fund fee: 2% management fee plus 20% of profits',
          philExample: 'Like paying a small monthly fee plus a big bonus if your team wins!',
          realWorldExample: 'Most hedge funds charge 2% annually plus 20% of any profits generated.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Management Consulting',
      description: 'Advise companies on strategy and operations',
      icon: '💡',
      cards: [
        {
          id: 'mc-1',
          term: 'Management Consulting',
          definition: 'Providing expert advice to improve business performance',
          philExample: 'Like a coach who helps teams get better at their sport!',
          realWorldExample: 'McKinsey, BCG, and Bain help Fortune 500 companies solve complex problems.',
          level: 'intermediate'
        },
        {
          id: 'mc-2',
          term: 'Strategy Consulting',
          definition: 'High-level advice on company direction and growth',
          philExample: 'Like helping plan the route for a long road trip!',
          realWorldExample: 'Strategy consultants help companies decide which markets to enter or products to launch.',
          level: 'intermediate'
        },
        {
          id: 'mc-3',
          term: 'Case Study',
          definition: 'Business problem used in consulting interviews',
          philExample: 'Like a puzzle you need to solve to show how smart you are!',
          realWorldExample: 'Market sizing and profitability cases are common in consulting interviews.',
          level: 'pro'
        },
        {
          id: 'mc-4',
          term: 'MBB',
          definition: 'McKinsey, BCG, and Bain - the top three consulting firms',
          philExample: 'Like the final three teams in a championship!',
          realWorldExample: 'Getting a job at MBB is extremely competitive and prestigious.',
          level: 'pro'
        }
      ]
    }
  ]
};

// Company Knowledge Section
export const companyKnowledgeSection: FlashcardSection = {
  id: 'company-knowledge',
  title: 'Company Knowledge',
  description: 'Learn about major companies and industries',
  icon: '🏢',
  subsections: [
    {
      id: 'tech-companies',
      title: 'Tech Companies',
      description: 'Major technology companies',
      icon: '💻',
      cards: [
        {
          id: 'tech-1',
          term: 'FAANG',
          definition: 'Facebook (Meta), Apple, Amazon, Netflix, Google - top tech companies',
          philExample: 'Like the Avengers of technology - the biggest superheroes in tech!',
          realWorldExample: 'FAANG stocks have been among the best performing investments of the past decade.',
          level: 'beginner'
        },
        {
          id: 'tech-2',
          term: 'Market Cap',
          definition: 'Total value of a company\'s shares',
          philExample: 'If a company were a house, market cap would be its total asking price!',
          realWorldExample: 'Apple\'s market cap of $3 trillion makes it one of the world\'s most valuable companies.',
          level: 'intermediate'
        },
        {
          id: 'tech-3',
          term: 'Unicorn Startup',
          definition: 'Private company valued at over $1 billion',
          philExample: 'Like finding a mythical creature in business - rare and magical!',
          realWorldExample: 'SpaceX, Stripe, and Epic Games are unicorn companies.',
          level: 'intermediate'
        },
        {
          id: 'tech-4',
          term: 'Cloud Computing',
          definition: 'Delivering computing services over the internet',
          philExample: 'Like storing your toys in a magic cloud that you can access from anywhere!',
          realWorldExample: 'AWS, Microsoft Azure, and Google Cloud dominate the cloud computing market.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'financial-services',
      title: 'Financial Services',
      description: 'Banks and financial institutions',
      icon: '🏦',
      cards: [
        {
          id: 'fin-1',
          term: 'Bulge Bracket Banks',
          definition: 'The largest and most prestigious investment banks',
          philExample: 'Like the premier league of banking - the top teams!',
          realWorldExample: 'Goldman Sachs, JPMorgan, Morgan Stanley, and Bank of America are bulge bracket banks.',
          level: 'intermediate'
        },
        {
          id: 'fin-2',
          term: 'Commercial vs Investment Banking',
          definition: 'Retail banking services vs corporate finance advisory',
          philExample: 'Like a local shop vs a business consultant!',
          realWorldExample: 'Chase offers commercial banking; its parent JPMorgan does investment banking.',
          level: 'intermediate'
        },
        {
          id: 'fin-3',
          term: 'FinTech Disruption',
          definition: 'Technology companies changing traditional financial services',
          philExample: 'Like how streaming services changed how we watch movies!',
          realWorldExample: 'Companies like Robinhood disrupted traditional stock brokerages with no-fee trading.',
          level: 'pro'
        },
        {
          id: 'fin-4',
          term: 'Payment Processors',
          definition: 'Companies that handle electronic payment transactions',
          philExample: 'Like the mailman for money - they make sure payments get where they need to go!',
          realWorldExample: 'Visa, Mastercard, and Stripe process trillions in payments annually.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'consumer-goods',
      title: 'Consumer Goods',
      description: 'Companies selling products to consumers',
      icon: '🛍️',
      cards: [
        {
          id: 'consumer-1',
          term: 'Brand Value',
          definition: 'The worth of a brand beyond physical assets',
          philExample: 'Like how a Nike shoe costs more than a no-name shoe because of the swoosh!',
          realWorldExample: 'Apple and Coca-Cola have some of the highest brand values in the world.',
          level: 'intermediate'
        },
        {
          id: 'consumer-2',
          term: 'Consumer Staples',
          definition: 'Essential products people buy regardless of economy',
          philExample: 'Like food and toothpaste - you need them no matter what!',
          realWorldExample: 'Procter & Gamble makes consumer staples like Tide and Crest.',
          level: 'intermediate'
        },
        {
          id: 'consumer-3',
          term: 'Direct-to-Consumer (DTC)',
          definition: 'Selling products directly to customers without retailers',
          philExample: 'Like a lemonade stand instead of selling through a store!',
          realWorldExample: 'Warby Parker and Casper disrupted industries by selling directly online.',
          level: 'pro'
        },
        {
          id: 'consumer-4',
          term: 'Fast Fashion',
          definition: 'Quickly producing trendy clothing at low prices',
          philExample: 'Like making costumes super fast for Halloween!',
          realWorldExample: 'Zara and H&M can design, produce, and sell new styles in weeks.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'healthcare-pharma',
      title: 'Healthcare & Pharma',
      description: 'Medical and pharmaceutical companies',
      icon: '⚕️',
      cards: [
        {
          id: 'health-1',
          term: 'Big Pharma',
          definition: 'The largest pharmaceutical companies',
          philExample: 'Like the biggest hospitals that make the most medicine!',
          realWorldExample: 'Pfizer, Johnson & Johnson, and Merck are major pharmaceutical companies.',
          level: 'intermediate'
        },
        {
          id: 'health-2',
          term: 'FDA Approval',
          definition: 'US regulatory approval for drugs and medical devices',
          philExample: 'Like getting a teacher\'s permission slip before going on a field trip!',
          realWorldExample: 'New drugs must pass FDA trials proving safety and effectiveness.',
          level: 'intermediate'
        },
        {
          id: 'health-3',
          term: 'Biotech',
          definition: 'Companies using biology and technology to develop treatments',
          philExample: 'Like using science experiments to create new medicines!',
          realWorldExample: 'Moderna used biotech to develop COVID-19 vaccines using mRNA technology.',
          level: 'pro'
        },
        {
          id: 'health-4',
          term: 'Generic Drugs',
          definition: 'Lower-cost alternatives to brand-name medications',
          philExample: 'Like store-brand cereal instead of the fancy box!',
          realWorldExample: 'When patents expire, generic versions can save patients 80-85% on costs.',
          level: 'pro'
        }
      ]
    },
    {
      id: 'energy-utilities',
      title: 'Energy & Utilities',
      description: 'Companies providing power and resources',
      icon: '⚡',
      cards: [
        {
          id: 'energy-1',
          term: 'Renewable Energy',
          definition: 'Power from sources that naturally replenish',
          philExample: 'Like using sunlight and wind that never run out!',
          realWorldExample: 'Tesla and NextEra Energy lead in solar and wind power generation.',
          level: 'intermediate'
        },
        {
          id: 'energy-2',
          term: 'Oil Majors',
          definition: 'The largest oil and gas companies',
          philExample: 'Like the biggest gas stations in the world!',
          realWorldExample: 'ExxonMobil, Chevron, and Shell are major oil companies.',
          level: 'intermediate'
        },
        {
          id: 'energy-3',
          term: 'ESG Investing',
          definition: 'Environmental, Social, and Governance factors in investment decisions',
          philExample: 'Like choosing stores that treat workers well and protect the environment!',
          realWorldExample: 'ESG funds avoid companies with poor environmental records or labor practices.',
          level: 'pro'
        },
        {
          id: 'energy-4',
          term: 'Electric Grid',
          definition: 'Network delivering electricity from producers to consumers',
          philExample: 'Like the road system for electricity!',
          realWorldExample: 'Utility companies maintain the grid infrastructure powering homes and businesses.',
          level: 'pro'
        }
      ]
    }
  ]
};

// Complete categorized flashcard system
export const flashcardCategorySystem: FlashcardCategorySystem = {
  personalFinance: personalFinanceSection,
  careersInFinance: careersInFinanceSection,
  companyKnowledge: companyKnowledgeSection
};

// Helper functions
export const getAllCategories = (): FlashcardSection[] => {
  return [
    flashcardCategorySystem.personalFinance,
    flashcardCategorySystem.careersInFinance,
    flashcardCategorySystem.companyKnowledge
  ];
};

export const getCategoryById = (categoryId: string): FlashcardSection | undefined => {
  return getAllCategories().find(cat => cat.id === categoryId);
};

export const getSubsectionById = (categoryId: string, subsectionId: string): FlashcardSubsection | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subsections.find(sub => sub.id === subsectionId);
};

export const getAllFlashcards = (): CategorizedFlashcard[] => {
  const allCards: CategorizedFlashcard[] = [];
  getAllCategories().forEach(category => {
    category.subsections.forEach(subsection => {
      allCards.push(...subsection.cards);
    });
  });
  return allCards;
};

export const getFlashcardsByLevel = (level: 'beginner' | 'intermediate' | 'pro'): CategorizedFlashcard[] => {
  return getAllFlashcards().filter(card => card.level === level);
};

export const getFlashcardsByCategory = (categoryId: string): CategorizedFlashcard[] => {
  const category = getCategoryById(categoryId);
  if (!category) return [];
  
  const allCards: CategorizedFlashcard[] = [];
  category.subsections.forEach(subsection => {
    allCards.push(...subsection.cards);
  });
  return allCards;
};

export const getFlashcardsBySubsection = (categoryId: string, subsectionId: string): CategorizedFlashcard[] => {
  const subsection = getSubsectionById(categoryId, subsectionId);
  return subsection?.cards || [];
};

export const getTotalCardCount = (): number => {
  return getAllFlashcards().length;
};

export const getCategoryCardCount = (categoryId: string): number => {
  return getFlashcardsByCategory(categoryId).length;
};

export const getSubsectionCardCount = (categoryId: string, subsectionId: string): number => {
  return getFlashcardsBySubsection(categoryId, subsectionId).length;
};
