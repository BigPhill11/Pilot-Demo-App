import type { VillageLesson } from '@/types/village-lesson';

export const businessEconomicsMicroLessons: VillageLesson[] = [
  {
    id: 'be-micro-1-scarcity-choice',
    moduleId: 'business-economics',
    section: 'Microeconomics',
    unitLabel: 'Unit 1: Scarcity & Choice',
    title: 'Scarcity, Choice, and Opportunity Cost',
    estimatedMinutes: 9,
    hook: {
      question: 'You have $200 this month. New sneakers, saving for a car, or helping family with groceries — you cannot do all three. What are you really giving up?',
      philMessage:
        'Every dollar and every hour has a trade-off. Microeconomics starts here: scarcity forces choices, and the best choice is the one you understand.',
    },
    concepts: [
      {
        id: 'scarcity',
        emoji: '⏳',
        title: 'Scarcity: Never Enough',
        body: 'Scarcity means wants exceed resources — money, time, attention. You cannot buy everything, be everywhere, or learn every skill at once. Scarcity is not poverty alone; even wealthy people face limits. Economics is the study of how people allocate scarce resources.',
        realWorldExample:
          'A first paycheck splits between rent, transit, and phone — not because you are bad with money, but because income is scarce. Wealth gaps mean some families face harsher scarcity from day one.',
      },
      {
        id: 'tradeoffs',
        emoji: '⚖️',
        title: 'Trade-offs: Picking One Path',
        body: 'A trade-off is giving up one thing to get another. Working extra shifts earns money but costs study time and sleep. Saving more today means less spending now. Rational planning names the trade-off before you commit.',
        realWorldExample:
          'Skipping a paid gig to study for a certification is a trade-off: short-term cash vs. long-term earning power. Career planners and budget analysts help people map these trade-offs professionally.',
      },
      {
        id: 'opportunity-cost',
        emoji: '🎯',
        title: 'Opportunity Cost: The Road Not Taken',
        body: 'Opportunity cost is the value of your next-best alternative — what you sacrifice when you choose. If you spend $50 on streaming, the opportunity cost might be $50 toward an emergency fund or investing. Emotional choices ignore opportunity cost; smart ones weigh it.',
        realWorldExample:
          'Holding cash in a checking account feels safe, but opportunity cost is missing market growth over decades. Choosing debt for a want has opportunity cost: future payments that could have funded goals.',
      },
      {
        id: 'rational-emotional',
        emoji: '🧠',
        title: 'Rational vs. Emotional Decisions',
        body: 'Rational decision-making compares costs and benefits with clear goals. Emotional decisions react to stress, social pressure, or FOMO. Both are human — the skill is pausing to ask: what is the opportunity cost, and does this match my plan?',
        realWorldExample:
          'Buy-now-pay-later on impulse has high emotional pull; a budget analyst would ask what that payment replaces next month. Wealth advisors coach clients to separate panic from plan.',
      },
    ],
    simulator: {
      title: 'Life Budget Simulator',
      intro: 'You earn $1,200 this month after tax. Allocate money across needs, goals, and fun — then see what you gave up.',
      scenario:
        'Fixed costs: $450 rent share, $120 transit. You must cover food. Everything else is your call. Missed savings and investing show up as opportunity cost.',
      meters: [
        { id: 'essentials', label: 'Essentials Covered', emoji: '🏠', initial: 40, color: 'blue' },
        { id: 'future', label: 'Future You', emoji: '🌱', initial: 30, color: 'green' },
        { id: 'stress', label: 'Money Stress', emoji: '😰', initial: 50, color: 'red' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Week 1: $300 left after rent and transit. How do you split it?',
          choices: [
            {
              id: 'save-heavy',
              label: '$150 food, $100 savings, $50 fun',
              description: 'Prioritize future you.',
              effects: { essentials: +20, future: +25, stress: -15 },
              feedback:
                'Tight month socially, but you built a buffer. Opportunity cost: fewer outings — but lower panic if something breaks.',
            },
            {
              id: 'balanced',
              label: '$130 food, $50 savings, $120 fun & clothes',
              description: 'Balance now and later.',
              effects: { essentials: +15, future: +10, stress: -5 },
              feedback:
                'Livable now with modest progress. Opportunity cost: slower emergency fund — common when income is stretched.',
            },
            {
              id: 'fun-heavy',
              label: '$100 food, $0 savings, $200 wants',
              description: 'Max enjoyment this month.',
              effects: { essentials: -10, future: -20, stress: +20 },
              feedback:
                'Fun now, but one surprise bill spikes stress. Opportunity cost: savings and any investing you could have started.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Your cousin needs $80 for groceries. You planned that money for investing in an index fund.',
          choices: [
            {
              id: 'help',
              label: 'Help family — skip investing this month',
              description: 'Community and care first.',
              effects: { essentials: +10, future: -5, stress: -10 },
              feedback:
                'Opportunity cost: one month of market growth — but trust and stability matter. Systemic barriers often make family support non-optional.',
            },
            {
              id: 'split',
              label: 'Give $40, invest $40',
              description: 'Split the difference.',
              effects: { essentials: +5, future: +5, stress: -5 },
              feedback:
                'Both goals partially met. Financial planners often call this "good enough" when income is scarce.',
            },
            {
              id: 'invest',
              label: 'Keep the plan — invest full $80',
              description: 'Stick to long-term goal.',
              effects: { essentials: -5, future: +15, stress: +15 },
              feedback:
                'Portfolio grows, but tension at home rises. Opportunity cost is relational — not just dollars.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'Side hustle offer: 10 hours at $15/hr during finals week.',
          choices: [
            {
              id: 'work',
              label: 'Take the hustle — $150 extra',
              description: 'Cash now.',
              effects: { essentials: +10, future: +5, stress: +10 },
              feedback:
                'Opportunity cost: study time and sleep. Short-term win; grades or health may pay later.',
            },
            {
              id: 'study',
              label: 'Decline — protect grades',
              description: 'Human capital first.',
              effects: { essentials: 0, future: +20, stress: -10 },
              feedback:
                'Opportunity cost: $150 today. Possible ROI: better college or job options — investing in yourself is microeconomics too.',
            },
            {
              id: 'partial',
              label: 'Work 4 hours only',
              description: 'Partial trade-off.',
              effects: { essentials: +5, future: +10, stress: 0 },
              feedback:
                'Classic compromise. Budget analysts build "good enough" plans like this for clients with limited time.',
            },
          ],
        },
      ],
      endMessage:
        'Every allocation is a choice with opportunity cost. Naming trade-offs is how you turn economics into a life skill — not just a textbook.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Scarcity means:',
        options: [
          { id: 'a', text: 'Only poor people lack resources' },
          { id: 'b', text: 'Wants exceed available resources' },
          { id: 'c', text: 'The government controls all goods' },
          { id: 'd', text: 'Prices never change' },
        ],
        correctId: 'b',
        explanation: 'Scarcity applies to everyone — limited money, time, and options force choices.',
      },
      {
        id: 'q2',
        question: 'Opportunity cost is:',
        options: [
          { id: 'a', text: 'The price tag on a item' },
          { id: 'b', text: 'Your credit card APR' },
          { id: 'c', text: 'The value of your next-best alternative' },
          { id: 'd', text: 'Taxes on a paycheck' },
        ],
        correctId: 'c',
        explanation: 'What you give up by choosing one path — the road not taken, in dollar or time terms.',
      },
      {
        id: 'q3',
        question: 'Saving instead of impulse spending mainly reduces opportunity cost related to:',
        options: [
          { id: 'a', text: 'Future goals and financial safety' },
          { id: 'b', text: 'GDP growth' },
          { id: 'c', text: 'Monopoly power' },
          { id: 'd', text: 'Exchange rates' },
        ],
        correctId: 'a',
        explanation: 'Saving trades present fun for future options — emergency funds and investing.',
      },
      {
        id: 'q4',
        question: 'A financial planner helps clients mostly by:',
        options: [
          { id: 'a', text: 'Printing money' },
          { id: 'b', text: 'Mapping trade-offs and long-term goals' },
          { id: 'c', text: 'Setting stock prices' },
          { id: 'd', text: 'Eliminating scarcity entirely' },
        ],
        correctId: 'b',
        explanation: 'Planners clarify trade-offs and opportunity costs — core micro + personal finance skills.',
      },
      {
        id: 'q5',
        question: 'Choosing debt for a want (not a need) has opportunity cost because:',
        options: [
          { id: 'a', text: 'Interest means future money cannot fund other goals' },
          { id: 'b', text: 'Debt always improves credit score' },
          { id: 'c', text: 'Banks pay you to borrow' },
          { id: 'd', text: 'It has no trade-off' },
        ],
        correctId: 'a',
        explanation: 'Payments tomorrow could have been savings, investing, or needs — that is opportunity cost.',
      },
    ],
    rewards: { xp: 120, bamboo: 15 },
  },

  {
    id: 'be-1-supply-demand',
    moduleId: 'business-economics',
    section: 'Microeconomics',
    unitLabel: 'Unit 2: Supply & Demand',
    title: 'Supply, Demand, and Prices',
    estimatedMinutes: 8,
    hook: {
      question: "Why did your favorite sneakers suddenly cost $50 more — even though they're made in the same factory?",
      philMessage:
        "Prices aren't random. They're signals from millions of buyers and sellers. Decode them and you negotiate pay, rent, and investing smarter.",
    },
    concepts: [
      {
        id: 'demand',
        emoji: '📈',
        title: 'Demand: What Buyers Want',
        body: 'Demand is how much people want to buy at a given price. When price falls, quantity demanded usually rises — the Law of Demand. Sales, gas spikes, and rent hikes all show demand shifting in real life.',
        realWorldExample:
          'When rent jumps in your city, you might commute farther or get a roommate — demand for housing did not disappear, but quantity demanded at that price dropped for you.',
      },
      {
        id: 'supply',
        emoji: '🏭',
        title: 'Supply: What Sellers Offer',
        body: 'Supply is how much producers will sell at a price. Higher prices encourage more production; shortages push prices up until supply responds or consumers adjust.',
        realWorldExample:
          'Chip shortages raised car prices — supply fell while demand stayed strong. Grocery prices swing when weather or fuel costs hit farms and trucking.',
      },
      {
        id: 'equilibrium',
        emoji: '⚖️',
        title: 'Equilibrium & Price Signals',
        body: 'Equilibrium is where supply and demand meet — the market-clearing price. Shortages mean price is too low; surpluses mean too high. Prices signal where resources should flow.',
        realWorldExample:
          'Negotiating pay uses demand for your skills vs. supply of workers. A hot job market (high demand, tight supply) pushes wages up — same logic as sneaker resale.',
      },
      {
        id: 'investing',
        emoji: '📉',
        title: 'Supply, Demand & Markets',
        body: 'Stock prices move with expected future supply and demand for profits. Hype can spike demand for shares beyond fundamentals; when reality catches up, prices correct.',
        realWorldExample:
          'Market research analysts study demand trends for products; sales & trading desks react when supply shocks hit commodities. Product pricing analysts set prices using the same curves.',
      },
    ],
    simulator: {
      title: 'Market Builder Game',
      intro: 'You run a virtual sneaker drop. Set prices as demand shifts — balance revenue, sell-through, and reputation.',
      scenario:
        '100 pairs landed. Cost $120 each. Resale market near $350. Your choices teach price signals and shortages.',
      meters: [
        { id: 'revenue', label: 'Revenue', emoji: '💰', initial: 50, color: 'green' },
        { id: 'sold', label: 'Inventory Sold', emoji: '📦', initial: 0, color: 'blue' },
        { id: 'hype', label: 'Customer Hype', emoji: '🔥', initial: 50, color: 'yellow' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Launch day: resale apps show $340. Your cost is $120. Launch price?',
          choices: [
            {
              id: 'low',
              label: '$140 — build loyalty',
              description: 'Undercut resale slightly.',
              effects: { revenue: -10, sold: +30, hype: +20 },
              feedback:
                'Sold out fast; scalpers still won on some pairs. Low price signaled "fair" but left money on the table — opportunity cost of margin.',
            },
            {
              id: 'mid',
              label: '$250 — middle ground',
              description: 'Match willingness to pay partly.',
              effects: { revenue: +15, sold: +20, hype: +10 },
              feedback:
                'Steady sell-through. Price signal balanced demand and supply — classic equilibrium thinking.',
            },
            {
              id: 'high',
              label: '$330 — near resale',
              description: 'Maximize per pair.',
              effects: { revenue: +20, sold: +5, hype: -15 },
              feedback:
                'Surplus at that price — units sat. High price signaled greed; demand quantity fell.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Rival store opens. Traffic splits. Demand for your store drops 20%.',
          choices: [
            {
              id: 'cut',
              label: '15% price cut',
              description: 'Price war.',
              effects: { revenue: -10, sold: +15, hype: +5 },
              feedback:
                'More units moved but margin fell. Both stores may lose — competition hurts when only price changes.',
            },
            {
              id: 'exclusive',
              label: 'Exclusive color only you have',
              description: 'Shift supply differentiation.',
              effects: { revenue: +15, sold: +10, hype: +20 },
              feedback:
                'You changed supply (unique product), not just price — demand curve shifts back toward you.',
            },
            {
              id: 'hold',
              label: 'Hold price, wait',
              description: 'No reaction.',
              effects: { revenue: -5, sold: -10, hype: -10 },
              feedback:
                'Inventory surplus grew. Ignoring a demand shift is how businesses get stuck with stock.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'Holiday demand spikes 40%. Only 50 pairs left; restock takes 6 weeks.',
          choices: [
            {
              id: 'raise',
              label: 'Raise price to clear shortage',
              description: 'Let price ration scarcity.',
              effects: { revenue: +25, sold: +10, hype: -5 },
              feedback:
                'Shortage → higher price until quantity demanded matches supply. Same logic as surge pricing.',
            },
            {
              id: 'hold',
              label: 'Keep price, first-come-first-served',
              description: 'Line out the door.',
              effects: { revenue: +10, sold: +20, hype: +15 },
              feedback:
                'Sold out at old price — left revenue on table but built loyalty. Non-price rationing (lines) instead of price.',
            },
            {
              id: 'waitlist',
              label: 'Waitlist + deposit',
              description: 'Capture future demand.',
              effects: { revenue: +15, sold: +10, hype: +10 },
              feedback:
                'Demand exceeded supply; deposit signals seriousness and funds cash flow.',
            },
          ],
        },
      ],
      endMessage:
        'Prices tell stories about supply and demand. Read them for sneakers, rent, paychecks, and stock hype.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'When price rises, quantity demanded typically:',
        options: [
          { id: 'a', text: 'Increases' },
          { id: 'b', text: 'Decreases' },
          { id: 'c', text: 'Stays fixed forever' },
          { id: 'd', text: 'Doubles' },
        ],
        correctId: 'b',
        explanation: 'Law of Demand: higher price → fewer buyers, all else equal.',
      },
      {
        id: 'q2',
        question: 'A shortage means:',
        options: [
          { id: 'a', text: 'Price is below equilibrium' },
          { id: 'b', text: 'Supply exceeds demand' },
          { id: 'c', text: 'Government banned sales' },
          { id: 'd', text: 'Demand is zero' },
        ],
        correctId: 'a',
        explanation: 'At too-low prices, quantity demanded exceeds quantity supplied.',
      },
      {
        id: 'q3',
        question: 'Stock hype without profit growth is often:',
        options: [
          { id: 'a', text: 'Demand exceeding fundamentals temporarily' },
          { id: 'b', text: 'A supply shortage of shares only' },
          { id: 'c', text: 'Permanent fair value' },
          { id: 'd', text: 'Unrelated to microeconomics' },
        ],
        correctId: 'a',
        explanation: 'Investor demand can outrun real supply of earnings — prices can correct later.',
      },
      {
        id: 'q4',
        question: 'Negotiating a raise uses microeconomics because:',
        options: [
          { id: 'a', text: 'Wages respond to labor supply and demand' },
          { id: 'b', text: 'The Fed sets your salary' },
          { id: 'c', text: 'Prices are random' },
          { id: 'd', text: 'Only CEOs have demand curves' },
        ],
        correctId: 'a',
        explanation: 'Your skills vs. how many workers employers can hire — a labor market price signal.',
      },
      {
        id: 'q5',
        question: 'A product pricing analyst mainly:',
        options: [
          { id: 'a', text: 'Sets prices using demand and cost signals' },
          { id: 'b', text: 'Prints currency' },
          { id: 'c', text: 'Only designs logos' },
          { id: 'd', text: 'Avoids all data' },
        ],
        correctId: 'a',
        explanation: 'Pricing roles use supply, demand, and elasticity — applied microeconomics.',
      },
    ],
    rewards: { xp: 120, bamboo: 15 },
  },

  {
    id: 'be-micro-3-income-wages',
    moduleId: 'business-economics',
    section: 'Microeconomics',
    unitLabel: 'Unit 3: Income & Wages',
    title: 'Income, Wages, and Human Capital',
    estimatedMinutes: 9,
    hook: {
      question: 'Why does the coder earn more than the cashier when both work just as hard?',
      philMessage:
        'Labor markets price skills, productivity, and scarcity — not just effort. Understanding wages helps you invest in yourself and negotiate.',
    },
    concepts: [
      {
        id: 'labor-market',
        emoji: '👥',
        title: 'Labor Markets',
        body: 'Workers supply labor; employers demand it. Wages adjust where supply and demand meet. Location, industry, and barriers (networks, discrimination, licensing) shift who gets which jobs.',
        realWorldExample:
          'Summer job markets flood with students — supply rises, wages may flatline. Skilled trades with few graduates see the opposite.',
      },
      {
        id: 'human-capital',
        emoji: '🎓',
        title: 'Human Capital',
        body: 'Human capital is the knowledge, skills, health, and experience you bring to work. Education and training are investments — they cost time and money now for higher productivity later.',
        realWorldExample:
          'A finance certificate may cost $500 but raise internship odds. That ROI beats buying gear that does not increase earnings.',
      },
      {
        id: 'productivity',
        emoji: '⚡',
        title: 'Productivity & Pay',
        body: 'Productivity is output per hour. Employers pay more when workers create more value. Technology and tools amplify productivity — why one worker with software can serve hundreds of customers.',
        realWorldExample:
          'Hourly vs. salary: salary can hide overtime — read the offer. Pay stubs show taxes and benefits; understanding them is personal finance basics.',
      },
      {
        id: 'negotiate',
        emoji: '🤝',
        title: 'Invest in Yourself vs. Assets',
        body: 'You can invest dollars in stocks or in skills. Both compound differently. Skills often beat raw cash early in life; assets matter more once income stabilizes. Systemic gaps can limit access to both — policy and community programs try to close that gap.',
        realWorldExample:
          'HR and compensation analysts benchmark wages using productivity data. Economists study whether minimum wage changes help or hurt different groups.',
      },
    ],
    simulator: {
      title: 'Career Skill Tree',
      intro: 'You have 100 skill points to spend before age 22. Watch long-run income paths change.',
      scenario:
        'Choose coding, finance literacy, communication, or trade skills. Each path has costs, time, and income outcomes.',
      meters: [
        { id: 'income', label: 'Income Potential', emoji: '💵', initial: 40, color: 'green' },
        { id: 'options', label: 'Career Options', emoji: '🚪', initial: 40, color: 'blue' },
        { id: 'debt', label: 'Education Debt', emoji: '📚', initial: 30, color: 'red' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Allocate 40 points across skills (shown as bundles).',
          choices: [
            {
              id: 'tech',
              label: '40 → Coding + projects',
              description: 'High tech human capital.',
              effects: { income: +25, options: +15, debt: +5 },
              feedback:
                'Strong tech path; bootcamps or self-study can avoid heavy debt. Opportunity cost: less time for other hobbies now.',
            },
            {
              id: 'finance',
              label: '40 → Finance + Excel + networking',
              description: 'Finance-ready skills.',
              effects: { income: +20, options: +20, debt: +10 },
              feedback:
                'Opens analyst, banking, planner paths. Investing in yourself with certifications can ROI like stocks.',
            },
            {
              id: 'soft',
              label: '40 → Communication + leadership',
              description: 'Portable soft skills.',
              effects: { income: +15, options: +25, debt: 0 },
              feedback:
                'Works in any industry — sales, management, UX research. Lower starting pay sometimes, higher ceiling later.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Community college offer: $8k/year vs. $40k private program. Same field.',
          choices: [
            {
              id: 'cc',
              label: 'Community college path',
              description: 'Lower debt, slower brand.',
              effects: { income: +10, options: +10, debt: -20 },
              feedback:
                'ROI often wins when debt is slashed — wealth gaps make debt load a systemic barrier.',
            },
            {
              id: 'private',
              label: 'Private program',
              description: 'Network + name, high debt.',
              effects: { income: +15, options: +15, debt: +25 },
              feedback:
                'May open doors, but loan payments are opportunity cost for years — compensation analysts track debt-to-income.',
            },
            {
              id: 'work',
              label: 'Skip — work + online certs',
              description: 'Earn while learning.',
              effects: { income: +5, options: +5, debt: -10 },
              feedback:
                'Valid for some fields; harder in licensed careers. Human capital can grow without traditional college.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'First job offer: $18/hr no benefits vs. $42k salary with health insurance.',
          choices: [
            {
              id: 'hourly',
              label: 'Take hourly — flexibility',
              description: 'Watch overtime rules.',
              effects: { income: +5, options: +10, debt: 0 },
              feedback:
                'Compare total comp: benefits matter. Negotiate when supply of your skill is tight.',
            },
            {
              id: 'salary',
              label: 'Take salary — stability',
              description: 'Benefits + predictability.',
              effects: { income: +15, options: +5, debt: 0 },
              feedback:
                'Salary jobs often include training — employer investing in your human capital.',
            },
            {
              id: 'negotiate',
              label: 'Negotiate salary + $2k signing',
              description: 'Ask using market data.',
              effects: { income: +20, options: +10, debt: 0 },
              feedback:
                'Labor demand for your skill gave leverage — same as pricing a product.',
            },
          ],
        },
      ],
      endMessage:
        'Wages follow productivity and scarcity of skills. Your best early investment is often human capital — with eyes open on debt and barriers.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Human capital is:',
        options: [
          { id: 'a', text: 'Only money in a 401(k)' },
          { id: 'b', text: 'Skills, knowledge, and experience that raise productivity' },
          { id: 'c', text: 'A type of cryptocurrency' },
          { id: 'd', text: 'Government debt' },
        ],
        correctId: 'b',
        explanation: 'Education and training build human capital — an investment in future earnings.',
      },
      {
        id: 'q2',
        question: 'Wages tend to rise when:',
        options: [
          { id: 'a', text: 'Demand for a skill is high and supply of workers is low' },
          { id: 'b', text: 'Everyone has identical skills' },
          { id: 'c', text: 'Productivity does not matter' },
          { id: 'd', text: 'Employers ignore value' },
        ],
        correctId: 'a',
        explanation: 'Labor market supply and demand — scarce, high-value skills command higher pay.',
      },
      {
        id: 'q3',
        question: 'Investing in yourself early often means:',
        options: [
          { id: 'a', text: 'Trade time and money now for higher future income' },
          { id: 'b', text: 'Avoid all learning' },
          { id: 'c', text: 'Only buying meme stocks' },
          { id: 'd', text: 'Ignoring opportunity cost' },
        ],
        correctId: 'a',
        explanation: 'ROI on education and skills can beat financial assets when you are young.',
      },
      {
        id: 'q4',
        question: 'A compensation analyst primarily:',
        options: [
          { id: 'a', text: 'Benchmarks pay using market and productivity data' },
          { id: 'b', text: 'Sets Federal Reserve rates' },
          { id: 'c', text: 'Designs sneakers' },
          { id: 'd', text: 'Only files taxes' },
        ],
        correctId: 'a',
        explanation: 'HR/comp roles apply labor economics to real paychecks.',
      },
      {
        id: 'q5',
        question: 'Wealth gaps can affect labor markets by:',
        options: [
          { id: 'a', text: 'Limiting access to education, networks, and safe work' },
          { id: 'b', text: 'Eliminating scarcity' },
          { id: 'c', text: 'Making all wages identical' },
          { id: 'd', text: 'Removing the need for skills' },
        ],
        correctId: 'a',
        explanation: 'Systemic barriers shape who can build human capital — economics plus equity lens.',
      },
    ],
    rewards: { xp: 130, bamboo: 18 },
  },

  {
    id: 'be-micro-4-credit-debt',
    moduleId: 'business-economics',
    section: 'Microeconomics',
    unitLabel: 'Unit 4: Credit & Debt',
    title: 'Credit, Debt, and Interest Rates',
    estimatedMinutes: 9,
    hook: {
      question: 'A $30 pizza paid with a credit card you only make minimum payments on — what does that pizza really cost?',
      philMessage:
        'Interest turns small buys into long debts. Microeconomics meets your wallet: borrowing, risk, and compound growth.',
    },
    concepts: [
      {
        id: 'interest',
        emoji: '📊',
        title: 'Interest: Price of Money',
        body: 'Interest is the cost of borrowing or the reward for lending. APR on cards and loans tells you yearly cost. Higher risk borrowers pay higher rates — risk and return move together.',
        realWorldExample:
          '18% APR on a $1,000 balance grows fast if you pay minimums. Savers earn interest too — but often less than card rates, which hurts wealth building.',
      },
      {
        id: 'good-bad-debt',
        emoji: '🏠',
        title: 'Good vs. Bad Debt',
        body: 'Good debt may fund assets or skills that grow income (affordable education, reasonable mortgage). Bad debt funds depreciating wants with high rates. Credit scores track repayment — gates apartments and jobs in some markets.',
        realWorldExample:
          'Predatory lending in underserved neighborhoods is a systemic barrier — higher rates for the same risk profile elsewhere.',
      },
      {
        id: 'compound',
        emoji: '📈',
        title: 'Compound Interest',
        body: 'Compound interest earns interest on interest — magic for savers and investors, painful for debtors. Time is the multiplier. Starting early on investing beats starting big later.',
        realWorldExample:
          'Bond investors lend to governments/companies for steady interest. Credit analysts grade how likely borrowers are to default.',
      },
      {
        id: 'risk-return',
        emoji: '⚠️',
        title: 'Risk, Return & Investing',
        body: 'Higher expected returns usually mean higher risk. Stocks vs. bonds trade off volatility and yield. Loan officers and risk managers price the same trade-off on the lending side.',
        realWorldExample:
          'Skipping emergency savings to chase crypto is risk-heavy. Paying cards first is often a guaranteed "return" equal to the APR.',
      },
    ],
    simulator: {
      title: 'Debt Escape Challenge',
      intro: 'You have $2,400 card debt at 22% APR and a $5k student loan at 5%. Minimize interest paid over 12 simulated months.',
      scenario:
        'Monthly budget: $350 for debt payments only. Choose payoff order and habits.',
      meters: [
        { id: 'interest_paid', label: 'Interest Paid', emoji: '🔥', initial: 70, color: 'red' },
        { id: 'debt_left', label: 'Debt Remaining', emoji: '💳', initial: 80, color: 'blue' },
        { id: 'score', label: 'Credit Health', emoji: '✅', initial: 55, color: 'green' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Month 1–4: $350/month. Which debt gets priority?',
          choices: [
            {
              id: 'avalanche',
              label: 'Pay card first (highest APR)',
              description: 'Mathematically cheapest.',
              effects: { interest_paid: -20, debt_left: -15, score: +10 },
              feedback:
                'Avalanche saves the most interest — what credit analysts recommend for pure math.',
            },
            {
              id: 'snowball',
              label: 'Pay smallest balance first',
              description: 'Quick wins psychologically.',
              effects: { interest_paid: -10, debt_left: -10, score: +15 },
              feedback:
                'Snowball costs a bit more interest but builds habits — behavioral economics in action.',
            },
            {
              id: 'split',
              label: 'Split 50/50',
              description: 'Slow on both.',
              effects: { interest_paid: -5, debt_left: -8, score: +5 },
              feedback:
                'More interest than avalanche — opportunity cost of not attacking the 22% APR.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Store offers 0% BNPL for 6 months on new headphones ($280). You still have card debt.',
          choices: [
            {
              id: 'decline',
              label: 'Decline — finish card debt',
              description: 'No new traps.',
              effects: { interest_paid: -10, debt_left: -10, score: +10 },
              feedback:
                'BNPL can still hurt discipline; missed payments often hit credit hard.',
            },
            {
              id: 'accept',
              label: 'Accept BNPL — keep paying cards',
              description: 'Add payment mental load.',
              effects: { interest_paid: +5, debt_left: +5, score: -5 },
              feedback:
                'More bills to track — behavioral trap when income is tight.',
            },
            {
              id: 'cash',
              label: 'Buy used for $80 cash',
              description: 'Lower want cost.',
              effects: { interest_paid: -5, debt_left: -5, score: +5 },
              feedback:
                'Opportunity cost of status vs. debt freedom — consumer choice in real life.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'You get a $500 tax refund. Card still at $1,100.',
          choices: [
            {
              id: 'lump',
              label: 'Lump sum to card',
              description: 'Cut principal.',
              effects: { interest_paid: -15, debt_left: -20, score: +15 },
              feedback:
                'Compound interest works in reverse on debt — lump sums slash future interest.',
            },
            {
              id: 'invest',
              label: 'Invest refund in stocks',
              description: 'Hope market beats 22%.',
              effects: { interest_paid: +10, debt_left: 0, score: -5 },
              feedback:
                'Paying 22% debt is a guaranteed save; market returns are uncertain — risk/return mismatch.',
            },
            {
              id: 'spend',
              label: 'Spend on trip',
              description: 'Yolo.',
              effects: { interest_paid: +5, debt_left: 0, score: -15 },
              feedback:
                'Emotional choice; opportunity cost is months of interest and stress.',
            },
          ],
        },
      ],
      endMessage:
        'Interest is a price — pay it on purpose, not by accident. Escape high-APR debt before chasing risky returns.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'APR on a credit card tells you:',
        options: [
          { id: 'a', text: 'Annual cost of carrying a balance' },
          { id: 'b', text: 'Your credit limit only' },
          { id: 'c', text: 'Stock dividend yield' },
          { id: 'd', text: 'GDP growth' },
        ],
        correctId: 'a',
        explanation: 'Annual Percentage Rate — yearly borrowing cost on unpaid balances.',
      },
      {
        id: 'q2',
        question: 'Paying high-interest debt first is smart because:',
        options: [
          { id: 'a', text: 'It saves more than typical investing returns' },
          { id: 'b', text: 'Banks reward debt' },
          { id: 'c', text: 'Interest never compounds' },
          { id: 'd', text: 'Credit scores do not matter' },
        ],
        correctId: 'a',
        explanation: 'Eliminating 22% APR is like earning 22% risk-free — hard to beat in markets.',
      },
      {
        id: 'q3',
        question: 'Compound interest hurts most when:',
        options: [
          { id: 'a', text: 'You owe money and pay slowly' },
          { id: 'b', text: 'You have zero debt' },
          { id: 'c', text: 'You use cash only' },
          { id: 'd', text: 'Rates are 0%' },
        ],
        correctId: 'a',
        explanation: 'Interest on interest grows debt snowballs — the Debt Escape fight.',
      },
      {
        id: 'q4',
        question: 'A credit analyst job involves:',
        options: [
          { id: 'a', text: 'Judging borrower default risk' },
          { id: 'b', text: 'Designing sneakers' },
          { id: 'c', text: 'Setting minimum wage' },
          { id: 'd', text: 'Only marketing apps' },
        ],
        correctId: 'a',
        explanation: 'Credit roles price risk — same risk/return logic as investing.',
      },
      {
        id: 'q5',
        question: 'Bond investing is mainly:',
        options: [
          { id: 'a', text: 'Lending money for interest payments' },
          { id: 'b', text: 'Owning a sports team' },
          { id: 'c', text: 'Avoiding all risk' },
          { id: 'd', text: 'The same as payday loans' },
        ],
        correctId: 'a',
        explanation: 'Bonds are IOUs — lenders earn interest; issuers pay for capital.',
      },
    ],
    rewards: { xp: 130, bamboo: 18 },
  },

  {
    id: 'be-micro-5-consumer-behavior',
    moduleId: 'business-economics',
    section: 'Microeconomics',
    unitLabel: 'Unit 5: Consumer Behavior',
    title: 'Consumer Behavior & Behavioral Economics',
    estimatedMinutes: 9,
    hook: {
      question: 'Why do you click "buy" at midnight after three TikTok ads, then regret it at breakfast?',
      philMessage:
        'Incentives and biases shape spending and investing. Learn the tricks marketers use — and the ones your brain plays on you.',
    },
    concepts: [
      {
        id: 'incentives',
        emoji: '🎯',
        title: 'Incentives',
        body: 'People respond to incentives — rewards and punishments, real or perceived. Cash-back, free shipping thresholds, and referral bonuses nudge behavior. Firms design incentives; governments tax or subsidize.',
        realWorldExample:
          'Free trial → auto-bill is an incentive trap. Employers offer 401(k) match — an incentive to save that beats most nudges.',
      },
      {
        id: 'biases',
        emoji: '🧠',
        title: 'Biases: Loss Aversion & Overconfidence',
        body: 'Loss aversion: losses hurt more than equal gains feel good — so we hold losers too long in investing. Overconfidence: we think we predict markets or can time purchases. Anchoring: first price you see shapes "fair."',
        realWorldExample:
          'Panic selling in a crash realizes losses. Overconfidence leads to concentrated bets on one stock.',
      },
      {
        id: 'marketing',
        emoji: '📱',
        title: 'Marketing Psychology',
        body: 'Scarcity ("only 2 left"), social proof ("trending"), and urgency ("ends tonight") push impulse buys. BNPL and one-click checkout remove friction — raising spending.',
        realWorldExample:
          'Influencer ads target teens where regulation is lighter — equity issue when communities already face wealth gaps.',
      },
      {
        id: 'markets',
        emoji: '🎢',
        title: 'Emotional Investing',
        body: 'Market bubbles form when everyone buys because prices rose — not because value did. Fear spreads faster in downturns. Behavioral economists study these patterns; UX researchers design calmer apps.',
        realWorldExample:
          'Marketing analysts A/B test buttons; behavioral economists advise pensions to auto-enroll savers — fight inertia with design.',
      },
    ],
    simulator: {
      title: 'Emotion vs Logic Game',
      intro: 'Three high-pressure money moments. Pick fast — then see outcomes.',
      scenario:
        'Stock dip, flash sale, and viral coin hype. Can you stick to a plan under stress?',
      meters: [
        { id: 'wealth', label: 'Long-term Wealth', emoji: '🌱', initial: 50, color: 'green' },
        { id: 'stress', label: 'Stress', emoji: '😰', initial: 40, color: 'red' },
        { id: 'discipline', label: 'Discipline Score', emoji: '🎯', initial: 50, color: 'blue' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Your index fund drops 8% on bad news. Group chat says "sell everything."',
          choices: [
            {
              id: 'panic',
              label: 'Sell all — stop the pain',
              description: 'Loss aversion wins.',
              effects: { wealth: -20, stress: -10, discipline: -20 },
              feedback:
                'Locked in losses; missed rebound. Panic selling is classic behavioral trap.',
            },
            {
              id: 'hold',
              label: 'Hold — stick to plan',
              description: 'Logic path.',
              effects: { wealth: +10, stress: +5, discipline: +20 },
              feedback:
                'Volatile short term; discipline preserved. Matches long-term investing research.',
            },
            {
              id: 'buy',
              label: 'Buy a little more',
              description: 'If emergency fund is solid.',
              effects: { wealth: +15, stress: +10, discipline: +10 },
              feedback:
                'Only works with cash reserves — opportunity cost if you needed that money for rent.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Flash sale: 70% off sneakers — 15 minutes left. You did not budget for this.',
          choices: [
            {
              id: 'buy',
              label: 'Buy now — deal too good',
              description: 'Scarcity + urgency.',
              effects: { wealth: -10, stress: -5, discipline: -15 },
              feedback:
                'Anchoring on "70% off" ignored full price hit — marketing psychology beat the budget.',
            },
            {
              id: 'wait',
              label: '24-hour rule — wait until tomorrow',
              description: 'Cooling off.',
              effects: { wealth: +5, stress: 0, discipline: +15 },
              feedback:
                'Many impulses fade — behavioral trick that works for impulse control.',
            },
            {
              id: 'skip',
              label: 'Close app — fund savings instead',
              description: 'Transfer $80 to savings.',
              effects: { wealth: +10, stress: -5, discipline: +20 },
              feedback:
                'Inverted incentive: reward yourself for not spending.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'Friend made 300% on a meme coin. Invites you to put $200 in tonight.',
          choices: [
            {
              id: 'fomo',
              label: 'Yolo $200',
              description: 'Overconfidence + FOMO.',
              effects: { wealth: -15, stress: +15, discipline: -20 },
              feedback:
                'Bubble risk — price can crash faster than it rose. Emotional investing.',
            },
            {
              id: 'research',
              label: 'Pass — research first',
              description: 'Slow down.',
              effects: { wealth: +5, stress: 0, discipline: +15 },
              feedback:
                'Most hype assets do not survive fundamentals test — marketing analyst mindset.',
            },
            {
              id: 'index',
              label: 'Put $200 in diversified index fund instead',
              description: 'Channel energy to plan.',
              effects: { wealth: +15, stress: -5, discipline: +15 },
              feedback:
                'Same excitement need, lower concentration risk — risk/return aligned.',
            },
          ],
        },
      ],
      endMessage:
        'Markets and marketers exploit biases. Pause, name the incentive, and choose the move your future self would thank you for.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Loss aversion means:',
        options: [
          { id: 'a', text: 'Losses feel worse than equal gains feel good' },
          { id: 'b', text: 'People love losing money' },
          { id: 'c', text: 'Prices never fall' },
          { id: 'd', text: 'Only banks feel losses' },
        ],
        correctId: 'a',
        explanation: 'We overweight losses — drives panic selling and risk avoidance.',
      },
      {
        id: 'q2',
        question: 'A "limited time" banner mainly uses:',
        options: [
          { id: 'a', text: 'Urgency and scarcity' },
          { id: 'b', text: 'GDP data' },
          { id: 'c', text: 'Labor productivity' },
          { id: 'd', text: 'Compound interest formulas' },
        ],
        correctId: 'a',
        explanation: 'Marketing psychology — push you to act before thinking.',
      },
      {
        id: 'q3',
        question: 'Market bubbles often involve:',
        options: [
          { id: 'a', text: 'Buying because prices rose, not fundamentals' },
          { id: 'b', text: 'Everyone using index funds' },
          { id: 'c', text: 'Zero emotion' },
          { id: 'd', text: 'Only government spending' },
        ],
        correctId: 'a',
        explanation: 'Herd behavior and overconfidence inflate prices beyond value.',
      },
      {
        id: 'q4',
        question: 'A behavioral economist studies:',
        options: [
          { id: 'a', text: 'How real people deviate from perfect rationality' },
          { id: 'b', text: 'Only ancient history' },
          { id: 'c', text: 'How to print currency' },
          { id: 'd', text: 'Only corporate logos' },
        ],
        correctId: 'a',
        explanation: 'Psychology + economics — applies to spending and investing.',
      },
      {
        id: 'q5',
        question: 'The 24-hour rule before a big purchase helps by:',
        options: [
          { id: 'a', text: 'Reducing impulse driven by emotion' },
          { id: 'b', text: 'Increasing APR' },
          { id: 'c', text: 'Eliminating scarcity' },
          { id: 'd', text: 'Guaranteeing stock gains' },
        ],
        correctId: 'a',
        explanation: 'Cooling off fights marketing urgency — logic over midnight clicks.',
      },
    ],
    rewards: { xp: 140, bamboo: 20 },
  },
];
