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
        body: 'Scarcity is the first law of economics: human wants are unlimited, but resources — money, time, attention, energy — are not. You cannot buy everything, be everywhere, or master every skill at once, so every person, business, and government is forced to choose. Notice that scarcity is not the same as poverty: a billionaire still has only 24 hours in a day, and even the richest company must choose which projects to fund. Economics is literally the study of how people make these forced choices — which makes it a study of you, every single day.',
        realWorldExample:
          'A first paycheck splits between rent, transit, and phone — not because you are bad with money, but because income is scarce. Wealth gaps mean some families face harsher scarcity from day one.',
      },
      {
        id: 'tradeoffs',
        emoji: '⚖️',
        title: 'Trade-offs: Picking One Path',
        body: 'Because resources are scarce, every choice is secretly a trade — you give up one thing to get another, whether you notice or not. Working extra shifts earns money but costs study time and sleep, which might cost grades, which might cost scholarship money. Saving aggressively today means less fun now; spending freely now means less freedom later. There is no option without a trade-off — only trade-offs you\'ve examined and trade-offs that ambush you later. Rational planners name the full trade before committing: "If I say yes to this, what exactly am I saying no to?"',
        realWorldExample:
          'Skipping a paid gig to study for a certification is a trade-off: short-term cash vs. long-term earning power. Career planners and budget analysts help people map these trade-offs professionally.',
      },
      {
        id: 'opportunity-cost',
        emoji: '🎯',
        title: 'Opportunity Cost: The Road Not Taken',
        body: 'Opportunity cost sharpens trade-off thinking into a precise tool: it\'s the value of the single next-best alternative you sacrifice when you choose. Spend $50 a month on streaming, and the opportunity cost isn\'t "everything else $50 could buy" — it\'s the best thing it could have done, maybe $50 monthly into an index fund, which could be tens of thousands of dollars by retirement. The sneaky part is that opportunity cost is invisible: the price tag shows what you pay, never what you give up. Emotional spending ignores this hidden cost; wealthy habits are built by people who see it.',
        realWorldExample:
          'Holding cash in a checking account feels safe, but opportunity cost is missing market growth over decades. Choosing debt for a want has opportunity cost: future payments that could have funded goals.',
      },
      {
        id: 'rational-emotional',
        emoji: '🧠',
        title: 'Rational vs. Emotional Decisions',
        body: 'Every financial decision comes from one of two operating systems. Rational mode compares costs and benefits against clear goals: "Does this purchase move me toward what I actually want?" Emotional mode reacts — to stress, boredom, social pressure, or FOMO — and rationalizes afterward. Neither mode is shameful; both are permanently installed in every human brain, and marketers spend billions targeting the emotional one. The winning skill isn\'t deleting emotion (impossible) — it\'s inserting a pause between impulse and action to ask two questions: what\'s the opportunity cost, and does this match my plan?',
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
        body: 'Demand is how much of something people are willing and able to buy at each possible price — and it follows a reliable pattern called the Law of Demand: when price falls, quantity demanded rises, and when price climbs, buyers back away. You already live this law. A 50%-off sale pulls you into a store you\'d normally skip. When gas spikes, people carpool, take transit, or postpone road trips. When rent jumps, people find roommates or move farther out. Businesses obsess over demand because it answers their most important question: at what price will customers actually show up?',
        realWorldExample:
          'When rent jumps in your city, you might commute farther or get a roommate — demand for housing did not disappear, but quantity demanded at that price dropped for you.',
      },
      {
        id: 'supply',
        emoji: '🏭',
        title: 'Supply: What Sellers Offer',
        body: 'Supply is the mirror image of demand: how much of something producers are willing to make and sell at each price. The logic runs opposite to buyers\' — higher prices make production more profitable, which pulls more supply into the market. When sneaker resale prices explode, more people start flipping sneakers. When a harvest fails and prices spike, farmers plant more next season. This is how shortages fix themselves: rising prices simultaneously attract new producers and push some consumers away, squeezing the gap from both sides until the market finds balance again.',
        realWorldExample:
          'Chip shortages raised car prices — supply fell while demand stayed strong. Grocery prices swing when weather or fuel costs hit farms and trucking.',
      },
      {
        id: 'equilibrium',
        emoji: '⚖️',
        title: 'Equilibrium & Price Signals',
        body: 'Equilibrium is the price where supply and demand shake hands — where the amount producers want to sell exactly matches what buyers want to purchase, so the market "clears." When price sits below equilibrium, buyers want more than exists: shelves empty, lines form, scalpers appear. When price sits above it, products pile up unsold until sellers cut prices. This is why prices are information, not just costs: a rising price broadcasts "we need more of this made," pulling workers, factories, and investment toward what society wants most — all without anyone in charge.',
        realWorldExample:
          'Negotiating pay uses demand for your skills vs. supply of workers. A hot job market (high demand, tight supply) pushes wages up — same logic as sneaker resale.',
      },
      {
        id: 'investing',
        emoji: '📉',
        title: 'Supply, Demand & Markets',
        body: 'The stock market is supply and demand running at maximum speed. A share\'s price is simply where sellers and buyers currently agree — and demand for shares moves on expectations about future profits, not just today\'s reality. That creates a special hazard: hype. When a story goes viral, demand for shares can spike far beyond anything the company\'s actual earnings justify, and the price follows. But fundamentals are gravity. When reality catches up — earnings disappoint, growth slows — demand evaporates and the price corrects, often violently. Same law as sneakers and gas, just faster and with your savings attached.',
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
        body: 'Your paycheck is a price, and it\'s set by the same forces as everything else. Workers supply labor; employers demand it; wages settle where the two meet. Scarce skills that many employers want command high wages — that\'s why specialized nurses and software engineers out-earn jobs anyone can do on day one. But labor markets have friction that goods markets don\'t: location matters (the same skill pays differently by city), industries boom and fade, and barriers like professional licensing, personal networks, and discrimination shape who even gets to compete for which jobs. Understanding this market is step one to navigating it.',
        realWorldExample:
          'Summer job markets flood with students — supply rises, wages may flatline. Skilled trades with few graduates see the opposite.',
      },
      {
        id: 'human-capital',
        emoji: '🎓',
        title: 'Human Capital',
        body: 'Human capital is everything you carry into the labor market: knowledge, skills, health, habits, and experience. It\'s called capital deliberately, because it behaves like an investment asset — education and training cost time and money now in exchange for higher productivity and earnings for decades. A certification, a language, or a technical skill can raise every future paycheck you ever collect, which makes skill-building one of the highest-return investments available to a teenager. Unlike stocks, nobody can crash it, tax it away, or steal it: your human capital travels with you for life.',
        realWorldExample:
          'A finance certificate may cost $500 but raise internship odds. That ROI beats buying gear that does not increase earnings.',
      },
      {
        id: 'productivity',
        emoji: '⚡',
        title: 'Productivity & Pay',
        body: 'Productivity — the value you create per hour — is the economic engine underneath wages. Employers don\'t pay for effort or time in the abstract; they pay for output, so workers who create more value per hour can command more money. Technology is the great amplifier here: one accountant with software now does what a whole room of clerks once did, and one creator with a phone can reach millions. That\'s the real reason to learn powerful tools — every tool you master multiplies what an hour of your work produces, and over a career, that multiplier is worth far more than any single raise.',
        realWorldExample:
          'Hourly vs. salary: salary can hide overtime — read the offer. Pay stubs show taxes and benefits; understanding them is personal finance basics.',
      },
      {
        id: 'negotiate',
        emoji: '🤝',
        title: 'Invest in Yourself vs. Assets',
        body: 'Every dollar and hour you control can be invested in two directions: financial assets (stocks, funds) or human capital (skills, credentials, health). Both compound, but on different schedules. Early in life, skills usually win — a certification that raises your income by $10,000 a year beats what a teenager\'s savings could earn in the market, and higher income then funds bigger investing later. Once income stabilizes, financial assets take over as the main wealth engine. Be honest about the playing field too: systemic gaps in school quality, family wealth, and networks limit access to both — which is exactly what scholarships, community programs, and policy fights are trying to fix.',
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
        body: 'Interest is the price of money itself: what you pay to borrow it, or what you earn for lending it. The universal price tag is APR — annual percentage rate — which tells you the true yearly cost of a card or loan and makes offers comparable. Rates aren\'t random: lenders price risk. A borrower with a strong repayment history looks safe and gets cheap money; a shaky history means higher rates to compensate the lender for possible loss. That\'s the deep rule of all finance showing up in your wallet: risk and return always travel together.',
        realWorldExample:
          '18% APR on a $1,000 balance grows fast if you pay minimums. Savers earn interest too — but often less than card rates, which hurts wealth building.',
      },
      {
        id: 'good-bad-debt',
        emoji: '🏠',
        title: 'Good vs. Bad Debt',
        body: 'Debt is a tool, and like any tool it builds or destroys depending on what you point it at. Good debt funds things that grow your income or wealth: affordable education that raises earning power, a reasonable mortgage on an appreciating home. Bad debt funds depreciating wants at brutal rates — financing sneakers at 27% APR means paying extra for something losing value daily. Your credit score is the permanent record of how you\'ve handled it all, and it gates far more than loans: landlords check it for apartments, and some employers check it for jobs. Borrow like the future you is watching, because they are.',
        realWorldExample:
          'Predatory lending in underserved neighborhoods is a systemic barrier — higher rates for the same risk profile elsewhere.',
      },
      {
        id: 'compound',
        emoji: '📈',
        title: 'Compound Interest',
        body: 'Compound interest is the same force wearing two faces. For savers and investors, it\'s magic: your returns earn returns, the snowball grows, and time multiplies everything — which is why starting small at 16 routinely beats starting big at 30. For debtors, the identical math runs in reverse: unpaid credit card interest gets added to your balance, and next month you pay interest on the interest. A $1,000 balance at 24% APR, paid minimally, can take years to escape and cost multiples of the original. One force, two directions — the entire game of personal finance is getting compounding to work FOR you instead of against you.',
        realWorldExample:
          'Bond investors lend to governments/companies for steady interest. Credit analysts grade how likely borrowers are to default.',
      },
      {
        id: 'risk-return',
        emoji: '⚠️',
        title: 'Risk, Return & Investing',
        body: 'There is no honest promise of high return with low risk — that combination is the calling card of scams. Markets pay you extra return specifically for accepting extra uncertainty: stocks out-earn bonds over decades because stockholders endure gut-wrenching swings that bondholders don\'t. The same trade-off runs the lending world from the other side — loan officers and risk managers set higher rates for riskier borrowers because some of those loans won\'t come back. Once you internalize this law, you gain a superpower: any pitch offering "guaranteed 20% returns, zero risk" instantly reveals itself as either a lie or a trap.',
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
        body: 'If you want to predict behavior, look at incentives — the rewards and punishments, real or perceived, attached to each choice. People respond to them reliably, often without noticing. Cash-back cards nudge you to swipe more. "Free shipping over $35" conjures purchases you never planned. Referral bonuses turn customers into salespeople. None of this is accidental: companies employ teams to engineer these nudges, and governments play the same game at scale with taxes (discouraging things) and subsidies (encouraging them). The defense is a habit: whenever an offer feels generous, ask "what behavior is this designed to produce in me?"',
        realWorldExample:
          'Free trial → auto-bill is an incentive trap. Employers offer 401(k) match — an incentive to save that beats most nudges.',
      },
      {
        id: 'biases',
        emoji: '🧠',
        title: 'Biases: Loss Aversion & Overconfidence',
        body: 'Your brain ships with predictable bugs that cost money. Loss aversion: losses hurt roughly twice as much as equal gains feel good, so investors cling to losing stocks (selling would make the loss "real") while selling winners too early. Overconfidence: most people rate themselves above-average drivers, and most traders believe they can time the market — the data says almost none can. Anchoring: the first number you see rewires your sense of "fair," which is why stores show a fake $200 "original price" next to the $89 sale tag. You can\'t uninstall these biases, but naming them in the moment breaks most of their power.',
        realWorldExample:
          'Panic selling in a crash realizes losses. Overconfidence leads to concentrated bets on one stock.',
      },
      {
        id: 'marketing',
        emoji: '📱',
        title: 'Marketing Psychology',
        body: 'Modern shopping apps are behavioral-science laboratories aimed at your wallet. "Only 2 left in stock" weaponizes scarcity. "Trending now" and five-star badges deploy social proof — if everyone\'s buying, it must be good. Countdown timers ("sale ends tonight!") manufacture urgency so you decide before thinking. Then friction-removal finishes the job: one-click checkout and buy-now-pay-later erase every natural pause where second thoughts used to live, which measurably raises spending. Once you can name each trick as it fires, the spell weakens — the countdown timer becomes a tell that someone needs you to not think this through.',
        realWorldExample:
          'Influencer ads target teens where regulation is lighter — equity issue when communities already face wealth gaps.',
      },
      {
        id: 'markets',
        emoji: '🎢',
        title: 'Emotional Investing',
        body: 'Individual biases become dangerous when they synchronize across millions of people. Market bubbles form when everyone buys because prices rose — not because value did — and each new buyer\'s FOMO recruits the next, until price and reality lose contact entirely. Crashes run the same circuit in reverse, except fear spreads even faster than greed. These aren\'t freak events; they\'re what happens when human psychology meets a scoreboard, and they\'ve repeated from Dutch tulips in 1637 to meme stocks in 2021. Behavioral economists map these patterns, and some UX researchers now design apps to trigger them less — or, at worse companies, more.',
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
