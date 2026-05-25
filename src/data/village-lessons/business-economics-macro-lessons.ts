import type { VillageLesson } from '@/types/village-lesson';

/** Units 6-10: Macroeconomics & Financial Systems */
export const businessEconomicsMacroLessons: VillageLesson[] = [
  {
    id: 'be-macro-6',
    moduleId: 'business-economics',
    section: 'Macroeconomics',
    title: 'What Is the Economy?',
    estimatedMinutes: 9,
    hook: {
      question: 'When the news says the economy grew 2%, what are they actually measuring?',
      philMessage:
        'The economy is not one number. It is millions of people working, spending, saving, and investing. GDP is how we keep score. Let us learn what that score really means.',
    },
    concepts: [
      {
        id: 'gdp',
        emoji: '📊',
        title: 'GDP: The Economy Scoreboard',
        body:
          'Gross Domestic Product (GDP) is the total value of goods and services produced in a country in a year. Think of it as the size of the economic pie. GDP = consumer spending + business investment + government spending + (exports minus imports). When GDP rises, the pie is growing. When it shrinks two quarters in a row, we call that a recession.',
        realWorldExample:
          'US GDP is around $27 trillion. A normal year might add 2-3% growth. In 2020 GDP fell fast during COVID, then bounced back when spending returned.',
      },
      {
        id: 'growth',
        emoji: '🚀',
        title: 'Economic Growth',
        body:
          'Growth means the economy produces more over time. That usually means more jobs, higher wages, and better living standards. Long-run growth comes from more workers, more capital (machines, buildings), and higher productivity (getting more output from the same inputs). Tech and education are huge drivers of productivity.',
        realWorldExample:
          'After World War II the US economy grew for decades. China grew about 10% per year for years by adding factories and workers. Slow growth feels like a stuck elevator: harder to get raises and new jobs.',
      },
      {
        id: 'circular_flow',
        emoji: '🔄',
        title: 'Circular Flow of Income',
        body:
          'Money moves in a loop. Households earn income from firms (wages, salaries). They spend on goods and services. Firms use that revenue to pay workers and buy inputs. Government and banks sit in the middle: taxes, spending, loans, and savings all redirect the flow. When one part slows down, the whole loop can weaken.',
        realWorldExample:
          'When you get a paycheck and buy groceries, you complete one lap of the circle. If thousands of people lose jobs and cut spending, stores sell less, firms hire less, and the circle spins slower. That is how a slowdown spreads.',
      },
      {
        id: 'connections',
        emoji: '💼',
        title: 'Jobs, Markets, and Careers',
        body:
          'Strong GDP growth usually means lower unemployment and more hiring. Weak growth or recession hits families first: layoffs, fewer hours, harder to negotiate pay. Investors watch cycles: growth phases often favor growth stocks (fast-expanding companies). Slowdowns can favor value stocks (cheaper, stable names). Careers tied to this world include economist, policy analyst, and investment strategist.',
        realWorldExample:
          'In 2008 GDP collapsed and unemployment hit 10%. Families cut back on everything. Investors who understood the cycle shifted toward safer assets until growth returned.',
      },
    ],
    simulator: {
      title: 'Build an Economy',
      intro:
        'You are advising a small country. Adjust spending, taxes, and investment to grow GDP without breaking the budget.',
      scenario:
        'Your country starts with moderate growth, 5% unemployment, and a balanced budget. Each choice shifts GDP, jobs, and public trust.',
      meters: [
        { id: 'gdp', label: 'GDP Growth', emoji: '📈', initial: 55, color: 'green' },
        { id: 'jobs', label: 'Employment', emoji: '👷', initial: 60, color: 'blue' },
        { id: 'budget', label: 'Budget Health', emoji: '💰', initial: 50, color: 'yellow' },
      ],
      rounds: [
        {
          id: 'r1',
          situation:
            'Congress wants a stimulus package. You can cut taxes, boost government spending, or stay neutral.',
          choices: [
            {
              id: 'tax_cut',
              label: 'Cut income taxes for households',
              description: 'More money in pockets to spend.',
              effects: { gdp: +15, jobs: +10, budget: -15 },
              feedback:
                'Spending jumped and GDP rose. The budget deficit widened. Works short term if growth eventually fills tax coffers again.',
            },
            {
              id: 'spend',
              label: 'Fund infrastructure and schools',
              description: 'Government spending on projects.',
              effects: { gdp: +12, jobs: +18, budget: -12 },
              feedback:
                'Construction jobs picked up. Roads and schools improve long-run productivity. Debt rises unless growth pays it back.',
            },
            {
              id: 'neutral',
              label: 'Hold steady, no new stimulus',
              description: 'Keep the budget balanced.',
              effects: { gdp: -5, jobs: -5, budget: +10 },
              feedback:
                'The budget looks safe but growth stalls. Unemployment ticks up. Sometimes inaction has a cost too.',
            },
          ],
        },
        {
          id: 'r2',
          situation:
            'Businesses are not investing in new equipment. How do you encourage investment?',
          choices: [
            {
              id: 'credits',
              label: 'Tax credits for business investment',
              description: 'Reward firms that build and hire.',
              effects: { gdp: +18, jobs: +12, budget: -8 },
              feedback:
                'Factories and tech upgrades boost productivity. GDP growth strengthens. A smart long-run play even if tax revenue dips first.',
            },
            {
              id: 'rates',
              label: 'Lower interest rates via the central bank',
              description: 'Cheaper loans for everyone.',
              effects: { gdp: +10, jobs: +8, budget: -3 },
              feedback:
                'Borrowing picks up. Housing and business spending rise. You need the central bank on board, but it often works.',
            },
            {
              id: 'wait',
              label: 'Let the market sort it out',
              description: 'No new incentives.',
              effects: { gdp: -8, jobs: -10, budget: +5 },
              feedback:
                'Investment stays weak. GDP growth fades. Balanced budgets do not help much if the economy stops growing.',
            },
          ],
        },
        {
          id: 'r3',
          situation:
            'GDP is growing but inequality is rising. Low-income families say they are left behind.',
          choices: [
            {
              id: 'transfer',
              label: 'Expand job training and child tax credits',
              description: 'Target help to workers and families.',
              effects: { gdp: +5, jobs: +15, budget: -10 },
              feedback:
                'More people join the workforce with better skills. Growth becomes broader. Spending on people can pay off in GDP and stability.',
            },
            {
              id: 'tax_rich',
              label: 'Raise top tax rates to fund services',
              description: 'Redistribute through government.',
              effects: { gdp: +0, jobs: +5, budget: +8 },
              feedback:
                'Public services improve. Some high earners invest less. Growth stays okay if spending is efficient.',
            },
            {
              id: 'ignore',
              label: 'Focus only on total GDP, not distribution',
              description: 'Growth is growth.',
              effects: { gdp: +8, jobs: -5, budget: +5 },
              feedback:
                'Headline GDP looks fine but social tension rises. Consumer spending from the bottom half of earners may lag, which can hurt growth later.',
            },
          ],
        },
      ],
      endMessage:
        'Growing GDP is a team sport: households spend, businesses invest, government sets rules and fills gaps. Your job is to balance growth, jobs, and a budget that can survive the next downturn.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'GDP measures:',
        options: [
          { id: 'a', text: 'The stock market value of all companies' },
          { id: 'b', text: 'Total goods and services produced in a country' },
          { id: 'c', text: 'Government debt only' },
          { id: 'd', text: 'Average household savings' },
        ],
        correctId: 'b',
        explanation:
          'GDP counts production in the economy: what consumers, businesses, government, and net exports add up to in a period.',
      },
      {
        id: 'q2',
        question: 'A common rule of thumb for recession is:',
        options: [
          { id: 'a', text: 'One month of slow hiring' },
          { id: 'b', text: 'Two straight quarters of falling GDP' },
          { id: 'c', text: 'Any week the stock market drops' },
          { id: 'd', text: 'Inflation above 3%' },
        ],
        correctId: 'b',
        explanation:
          'Two consecutive quarters of negative GDP growth is the widely used recession shorthand (official calls also use other data).',
      },
      {
        id: 'q3',
        question: 'In the circular flow, when households spend less, firms often:',
        options: [
          { id: 'a', text: 'Automatically earn more profit' },
          { id: 'b', text: 'Sell less and may cut jobs or output' },
          { id: 'c', text: 'Stop paying taxes' },
          { id: 'd', text: 'Export more with no change' },
        ],
        correctId: 'b',
        explanation:
          'Less spending means less revenue for firms, which can lead to layoffs and lower production, feeding back to households.',
      },
      {
        id: 'q4',
        question: 'Growth investing often focuses on companies that:',
        options: [
          { id: 'a', text: 'Pay the highest dividends only' },
          { id: 'b', text: 'Are expected to grow earnings faster than average' },
          { id: 'c', text: 'Never change price' },
          { id: 'd', text: 'Only operate in recessions' },
        ],
        correctId: 'b',
        explanation:
          'Growth investors bet on fast-expanding earnings. Value investors look for cheaper stocks relative to fundamentals. Cycles influence which style works better.',
      },
      {
        id: 'q5',
        question: 'Which job most directly studies GDP and national policy?',
        options: [
          { id: 'a', text: 'Graphic designer' },
          { id: 'b', text: 'Economist or policy analyst' },
          { id: 'c', text: 'Athletic trainer' },
          { id: 'd', text: 'Restaurant server only' },
        ],
        correctId: 'b',
        explanation:
          'Economists and policy analysts model growth, unemployment, and tradeoffs to advise governments and institutions.',
      },
    ],
    rewards: { xp: 125, bamboo: 16 },
  },

  {
    id: 'be-macro-7',
    moduleId: 'business-economics',
    section: 'Macroeconomics',
    title: 'Inflation and Your Money',
    estimatedMinutes: 9,
    hook: {
      question: 'Why does the same $20 bill buy less at the store than it did five years ago?',
      philMessage:
        'Prices creep up over time. That is inflation. It changes what your paycheck is worth, what you should save, and how investors protect their money.',
    },
    concepts: [
      {
        id: 'inflation',
        emoji: '💸',
        title: 'Inflation',
        body:
          'Inflation is a general rise in prices across the economy. A little inflation (around 2% per year) is normal and can keep spending and hiring moving. High inflation hurts savers and fixed incomes because each dollar buys less. Hyperinflation (very fast price rises) can wreck trust in money.',
        realWorldExample:
          'US inflation hit about 9% in 2022. Groceries, rent, and gas jumped. The Fed raised rates to cool prices. In the 1970s high inflation lasted years and changed how families budgeted.',
      },
      {
        id: 'purchasing_power',
        emoji: '🛒',
        title: 'Purchasing Power',
        body:
          'Purchasing power is what your money can actually buy. If prices rise 5% but your wage rises 2%, you lost purchasing power. Raises, side income, and investing can help you stay ahead. Sitting in cash with no interest while prices rise means you are going backward in real terms.',
        realWorldExample:
          'A $15/hour wage in 2019 might need $17+ in 2024 just to buy the same basket of goods. If your pay did not keep up, you feel poorer even with the same number on your check.',
      },
      {
        id: 'cpi',
        emoji: '📋',
        title: 'CPI: How We Measure It',
        body:
          'The Consumer Price Index (CPI) tracks prices for a basket of everyday goods and services (food, housing, transport, medical care). Statisticians update the basket over time. CPI is the headline number in news stories. Core CPI excludes volatile food and energy to show underlying trends.',
        realWorldExample:
          'Social Security cost-of-living adjustments often tie to CPI. Landlords and unions also watch CPI when negotiating rents or wages.',
      },
      {
        id: 'investing_inflation',
        emoji: '📈',
        title: 'Inflation Hedges and Careers',
        body:
          'Some assets hold up better when prices rise. Stocks of companies that can raise prices may help. Real assets like real estate sometimes keep pace. Bonds usually suffer when inflation is high because fixed payments buy less. Cash loses unless savings rates beat inflation. Careers: inflation analyst, central bank researcher. Personal finance: ask for raises that match CPI, invest instead of hoarding cash, diversify.',
        realWorldExample:
          'In high inflation, Series I savings bonds and TIPS (inflation-linked Treasuries) got popular. Long-term bond funds fell in 2022 when rates jumped to fight inflation.',
      },
    ],
    simulator: {
      title: 'Inflation Survival Mode',
      intro:
        'Run a household budget as prices rise each round. Keep food, rent, and savings stable without going broke.',
      scenario:
        'You earn $3,200/month after tax. You start with $400 in savings. Inflation will hit groceries, rent, and gas each round.',
      meters: [
        { id: 'budget', label: 'Budget Balance', emoji: '💵', initial: 60, color: 'green' },
        { id: 'savings', label: 'Savings', emoji: '🏦', initial: 45, color: 'blue' },
        { id: 'stress', label: 'Financial Stress', emoji: '😰', initial: 30, color: 'red' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Groceries and gas jump 8% this month. Your rent is fixed for now.',
          choices: [
            {
              id: 'cut_discretionary',
              label: 'Cut streaming, eating out, and extras',
              description: 'Protect essentials first.',
              effects: { budget: +10, savings: +5, stress: -10 },
              feedback:
                'Tight but workable. You kept food and rent paid. Small lifestyle cuts are the first line of defense when prices spike.',
            },
            {
              id: 'same_spend',
              label: 'Keep spending the same everywhere',
              description: 'Hope prices ease soon.',
              effects: { budget: -15, savings: -15, stress: +20 },
              feedback:
                'Your card balance grew. Savings dropped. Waiting for inflation to pass without changing habits rarely works.',
            },
            {
              id: 'side_gig',
              label: 'Pick up a weekend shift for extra cash',
              description: 'Earn more instead of only cutting.',
              effects: { budget: +15, savings: +10, stress: +5 },
              feedback:
                'Extra income offset higher prices. Raises and side income are how many families keep purchasing power when CPI runs hot.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Your landlord raises rent 10%. Your employer offers a 3% raise.',
          choices: [
            {
              id: 'negotiate',
              label: 'Ask for a raise closer to inflation (6%+)',
              description: 'Make the case with CPI data.',
              effects: { budget: +12, savings: +8, stress: -5 },
              feedback:
                'You got 5%. Not perfect but better than 3%. Knowing CPI gives you evidence in salary talks.',
            },
            {
              id: 'accept',
              label: 'Accept the 3% raise silently',
              description: 'Take what they offer.',
              effects: { budget: -10, savings: -10, stress: +15 },
              feedback:
                'Rent ate the raise. Real income fell. In inflationary times, staying quiet on pay often means a pay cut in purchasing power.',
            },
            {
              id: 'roommate',
              label: 'Get a roommate to split rent',
              description: 'Lower housing cost share.',
              effects: { budget: +18, savings: +5, stress: +10 },
              feedback:
                'Housing cost per person fell. Not everyone can do this, but housing is the biggest lever for many budgets.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'You have $500 left after bills. Inflation is still running at 5%.',
          choices: [
            {
              id: 'invest',
              label: 'Put $300 into a diversified stock index fund',
              description: 'Seek growth above inflation long term.',
              effects: { budget: -5, savings: +15, stress: -5 },
              feedback:
                'Markets fluctuate short term but historically beat cash over decades. Investing is one way to protect purchasing power.',
            },
            {
              id: 'cash',
              label: 'Keep all $500 in a checking account',
              description: 'Feel safe with cash.',
              effects: { budget: +5, savings: -10, stress: -10 },
              feedback:
                'Feels safe today but cash loses buying power at 5% inflation. High-yield savings or I bonds are middle steps many use.',
            },
            {
              id: 'bonds',
              label: 'Buy long-term bonds for steady interest',
              description: 'Fixed income sounds stable.',
              effects: { budget: 0, savings: -5, stress: +10 },
              feedback:
                'When inflation is high, new bonds pay more but old bond prices fall. Fixed payments buy less. Stocks vs cash vs bonds depends on the inflation regime.',
            },
          ],
        },
      ],
      endMessage:
        'Inflation is a tax on idle cash and stagnant wages. Track CPI, fight for real raises, trim where you must, and put long-term money where it can grow faster than prices.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Inflation means:',
        options: [
          { id: 'a', text: 'Only stock prices rise' },
          { id: 'b', text: 'General rise in prices over time' },
          { id: 'c', text: 'Wages always fall' },
          { id: 'd', text: 'Government shuts down' },
        ],
        correctId: 'b',
        explanation: 'Inflation is broad price increases, not a single product or asset.',
      },
      {
        id: 'q2',
        question: 'CPI is used to:',
        options: [
          { id: 'a', text: 'Track average price changes in a consumer basket' },
          { id: 'b', text: 'Measure company profit only' },
          { id: 'c', text: 'Set individual credit scores' },
          { id: 'd', text: 'Count how many stocks exist' },
        ],
        correctId: 'a',
        explanation: 'CPI measures price changes for typical household purchases.',
      },
      {
        id: 'q3',
        question: 'If inflation is 6% and your raise is 2%, your purchasing power:',
        options: [
          { id: 'a', text: 'Went up a lot' },
          { id: 'b', text: 'Stayed exactly the same' },
          { id: 'c', text: 'Fell in real terms' },
          { id: 'd', text: 'Doubled' },
        ],
        correctId: 'c',
        explanation: 'Your pay grew slower than prices, so you can buy less with each dollar.',
      },
      {
        id: 'q4',
        question: 'Which asset often struggles most when inflation and rates spike suddenly?',
        options: [
          { id: 'a', text: 'Long-term bonds with fixed payments' },
          { id: 'b', text: 'Physical cash in a vault' },
          { id: 'c', text: 'Both can suffer, but long bonds often fall in price' },
          { id: 'd', text: 'Neither is ever affected' },
        ],
        correctId: 'c',
        explanation:
          'Cash loses purchasing power. Existing long bonds fall when new bonds offer higher yields. Context matters for stocks.',
      },
      {
        id: 'q5',
        question: 'An inflation analyst might work for:',
        options: [
          { id: 'a', text: 'A central bank or research firm forecasting prices' },
          { id: 'b', text: 'A pizza shop only' },
          { id: 'c', text: 'A movie theater only' },
          { id: 'd', text: 'No organization uses inflation data' },
        ],
        correctId: 'a',
        explanation:
          'Banks, governments, and funds hire analysts to track CPI, wages, and policy impacts on prices.',
      },
    ],
    rewards: { xp: 130, bamboo: 17 },
  },

  {
    id: 'be-macro-8',
    moduleId: 'business-economics',
    section: 'Macroeconomics',
    title: 'Unemployment and Recessions',
    estimatedMinutes: 9,
    hook: {
      question: 'Why do layoffs spread across totally different industries at the same time?',
      philMessage:
        'Recessions are not random bad luck. They are part of business cycles. When the economy slows, jobs disappear in waves. Let us see how to prepare and how markets react.',
    },
    concepts: [
      {
        id: 'unemployment_types',
        emoji: '👔',
        title: 'Types of Unemployment',
        body:
          'Frictional: between jobs, short and normal. Structural: skills or location mismatch (factory closes, workers need retraining). Cyclical: tied to the business cycle, rises in recessions when demand falls. Economists watch the unemployment rate and job openings together to see how tight the labor market is.',
        realWorldExample:
          'Tech layoffs in 2023 were partly structural (over-hiring) and cyclical (slower ad spending). Retail workers in a recession face cyclical job loss when consumers cut back.',
      },
      {
        id: 'business_cycles',
        emoji: '🔄',
        title: 'Business Cycles',
        body:
          'Economies move through expansion, peak, contraction (recession), and trough. Expansions bring hiring and wage pressure. Peaks can overheat with inflation. Contractions mean falling output and rising unemployment. Troughs are the bottom before recovery. Cycles vary in length; policy and shocks can shorten or deepen them.',
        realWorldExample:
          'The 2008 recession lasted 18 months. COVID caused a sharp drop then a fast rebound with massive stimulus. Each cycle teaches different lessons for families and investors.',
      },
      {
        id: 'shocks',
        emoji: '⚡',
        title: 'Economic Shocks',
        body:
          'Shocks are sudden hits: pandemics, wars, oil spikes, banking crises. Supply shocks raise costs. Demand shocks cut spending. Shocks can trigger or worsen recessions. Policy makers and households respond with emergency plans, stimulus, or rate cuts depending on the shock type.',
        realWorldExample:
          'Oil price spikes in the 1970s hurt growth and raised inflation. COVID shut down travel and restaurants overnight. The 2023 banking stress was a financial shock that needed quick policy response.',
      },
      {
        id: 'pf_invest_career',
        emoji: '🛡️',
        title: 'Prepare, Invest, and Work',
        body:
          'Personal finance: build an emergency fund (often 3-6 months of expenses), plan for job loss, develop side income skills. Investing: defensive sectors (utilities, staples) and quality balance sheets sometimes hold up better in downturns; market crashes can wipe paper wealth but also create long-term entry points. Careers: labor economist, workforce development specialist help match workers to jobs and study unemployment data.',
        realWorldExample:
          'Families with savings weathered 2008 better than those living paycheck to paycheck. Investors who stayed diversified and did not panic-sell recovered as markets rebounded over the following decade.',
      },
    ],
    simulator: {
      title: 'Recession Simulator',
      intro:
        'A recession just started. Adapt your household budget and investment mix for three tough quarters.',
      scenario:
        'You lose 10% of income. Stocks are down 25%. You have $2,000 in emergency savings and monthly bills of $2,800.',
      meters: [
        { id: 'cash', label: 'Cash Runway', emoji: '💵', initial: 50, color: 'green' },
        { id: 'portfolio', label: 'Portfolio', emoji: '📉', initial: 40, color: 'blue' },
        { id: 'peace', label: 'Peace of Mind', emoji: '🧘', initial: 45, color: 'yellow' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Your hours are cut 20%. Unemployment in your city is rising.',
          choices: [
            {
              id: 'emergency',
              label: 'Switch to bare-bones budget and pause extras',
              description: 'Protect the emergency fund.',
              effects: { cash: +15, portfolio: 0, peace: +10 },
              feedback:
                'You stretched savings further. Emergency funds exist for exactly this moment. Cutting fast beats running out of cash later.',
            },
            {
              id: 'debt',
              label: 'Use credit cards to keep lifestyle the same',
              description: 'Borrow through the slump.',
              effects: { cash: -10, portfolio: 0, peace: -15 },
              feedback:
                'Stress rose with card balances. High interest makes recovery harder. Debt is a last resort, not a plan.',
            },
            {
              id: 'side',
              label: 'Start freelancing or gig work nights',
              description: 'Replace lost hours with side income.',
              effects: { cash: +20, portfolio: 0, peace: +5 },
              feedback:
                'Side income bridged the gap. Skills you build in a recession can help even after the main job returns.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Your 401(k) is down 25%. Headlines scream market crash.',
          choices: [
            {
              id: 'sell',
              label: 'Sell stocks and move everything to cash',
              description: 'Stop the bleeding.',
              effects: { cash: +5, portfolio: -20, peace: -10 },
              feedback:
                'You locked in losses. Many who sold in 2008 missed the rebound. Defensive does not always mean exit the market entirely.',
            },
            {
              id: 'hold',
              label: 'Hold course, keep contributing if you can',
              description: 'Stay diversified long term.',
              effects: { cash: 0, portfolio: +10, peace: +15 },
              feedback:
                'Scary but disciplined. Young investors with decades ahead often benefit from buying through downturns when they can afford to.',
            },
            {
              id: 'defensive',
              label: 'Shift some money to defensive stocks and bonds',
              description: 'Reduce risk moderately.',
              effects: { cash: -5, portfolio: +5, peace: +10 },
              feedback:
                'A middle path. Defensive investing means steadier companies and balance, not necessarily abandoning growth entirely.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'A layoff notice arrives. You have 8 weeks of savings left at current burn rate.',
          choices: [
            {
              id: 'network',
              label: 'Job hunt full time, tap network, file for unemployment',
              description: 'Use all official and social resources.',
              effects: { cash: +10, portfolio: 0, peace: +10 },
              feedback:
                'Unemployment insurance and referrals speed re-entry. Workforce programs help with resumes and training.',
            },
            {
              id: 'retreat',
              label: 'Stop looking until the economy recovers',
              description: 'Wait it out at home.',
              effects: { cash: -25, portfolio: 0, peace: -20 },
              feedback:
                'Savings ran down fast. Long unemployment spells hurt lifetime earnings. Active search matters even in bad cycles.',
            },
            {
              id: 'retrain',
              label: 'Enroll in a short certification program',
              description: 'Invest in skills for new roles.',
              effects: { cash: -10, portfolio: 0, peace: +15 },
              feedback:
                'Short-term cost but structural unemployment often needs new skills. Workforce development specialists design programs like this.',
            },
          ],
        },
      ],
      endMessage:
        'Recessions test cash reserves, nerves, and skills. Cyclical unemployment fades when growth returns. Your job is to survive the trough without wrecking long-term finances.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Cyclical unemployment rises mainly when:',
        options: [
          { id: 'a', text: 'The economy enters a downturn and demand falls' },
          { id: 'b', text: 'Everyone quits on the same day for fun' },
          { id: 'c', text: 'Summer jobs end only' },
          { id: 'd', text: 'Prices fall to zero' },
        ],
        correctId: 'a',
        explanation: 'Cyclical unemployment is tied to the business cycle and weak demand.',
      },
      {
        id: 'q2',
        question: 'A typical emergency fund target is:',
        options: [
          { id: 'a', text: 'One hour of pay' },
          { id: 'b', text: 'Often several months of essential expenses' },
          { id: 'c', text: 'Only lottery winnings' },
          { id: 'd', text: 'No savings ever needed' },
        ],
        correctId: 'b',
        explanation: 'Many planners suggest 3-6 months of core expenses, more if income is unstable.',
      },
      {
        id: 'q3',
        question: 'A demand shock during a pandemic might include:',
        options: [
          { id: 'a', text: 'People stop traveling and dining out suddenly' },
          { id: 'b', text: 'Oil becomes free forever' },
          { id: 'c', text: 'All prices freeze by law' },
          { id: 'd', text: 'Unemployment goes to zero' },
        ],
        correctId: 'a',
        explanation: 'Lockdowns cut spending on services, a classic demand shock with job losses in those sectors.',
      },
      {
        id: 'q4',
        question: 'Defensive investing in a recession often means:',
        options: [
          { id: 'a', text: 'Only betting on meme stocks' },
          { id: 'b', text: 'Favoring steadier companies and balanced risk' },
          { id: 'c', text: 'Ignoring all diversification' },
          { id: 'd', text: 'Guaranteeing no losses' },
        ],
        correctId: 'b',
        explanation:
          'Defensive strategies seek lower volatility sectors and quality balance sheets; nothing is risk-free.',
      },
      {
        id: 'q5',
        question: 'A labor economist studies:',
        options: [
          { id: 'a', text: 'Wages, hiring, unemployment, and policy effects on workers' },
          { id: 'b', text: 'Only sports salaries' },
          { id: 'c', text: 'Movie scripts' },
          { id: 'd', text: 'Gardening tips' },
        ],
        correctId: 'a',
        explanation:
          'Labor economists analyze job markets, unemployment types, and programs to improve employment.',
      },
    ],
    rewards: { xp: 135, bamboo: 18 },
  },

  {
    id: 'be-macro-9',
    moduleId: 'business-economics',
    section: 'Macroeconomics',
    title: 'Government, Taxes, and You',
    estimatedMinutes: 9,
    hook: {
      question: 'Where does the money from your paycheck taxes actually go?',
      philMessage:
        'Taxes are not just a bill. They fund schools, roads, and safety nets. Fiscal policy is how government steers the economy. Let us decode your paystub and a city budget.',
    },
    concepts: [
      {
        id: 'fiscal_policy',
        emoji: '🏛️',
        title: 'Fiscal Policy',
        body:
          'Fiscal policy is how government uses spending and taxes to influence the economy. In a recession, lawmakers may cut taxes or spend more on projects to boost demand. When inflation is hot, they may spend less or raise taxes to cool things down. Deficits happen when spending exceeds tax revenue in a year.',
        realWorldExample:
          'Stimulus checks in 2020 and 2021 boosted consumer spending. Infrastructure bills add long-run spending on bridges and broadband. Debates over deficits happen in every election cycle.',
      },
      {
        id: 'taxes_redistribution',
        emoji: '🧾',
        title: 'Taxes and Redistribution',
        body:
          'Taxes fund public goods (national defense, courts, parks) and services (schools, Medicaid, roads). Progressive taxes take a higher share from higher incomes. Regressive taxes take a larger share from lower incomes (some sales taxes). Redistribution moves resources through programs like food assistance or earned income credits.',
        realWorldExample:
          'Your W-2 shows federal income tax, Social Security, and Medicare withheld. State tax may fund public universities. Property tax often pays for local schools.',
      },
      {
        id: 'public_goods',
        emoji: '🌉',
        title: 'Public Goods',
        body:
          'Public goods are things everyone can use and one person using them does not block others (streetlights, national defense). They are hard for private markets to provide alone, so government steps in. Infrastructure and education raise productivity for the whole economy over time.',
        realWorldExample:
          'GPS started as a government project. Public highways let trucks move goods cheaply. Good schools raise future workers skills and wages.',
      },
      {
        id: 'tax_invest_career',
        emoji: '💡',
        title: 'Your Taxes, Your Portfolio, Your Career',
        body:
          'Read your paystub: gross pay, withholdings, net pay. Tax-advantaged accounts (401(k), IRA, HSA) reduce taxable income now or later and reward saving. Policy changes (tax cuts, tariffs, regulation) move stock sectors differently. Careers: public finance analyst tracks government budgets; government economist advises on fiscal tradeoffs.',
        realWorldExample:
          'A worker putting 6% in a 401(k) with a match builds retirement savings and lowers taxable income today. When corporate tax rules change, company earnings forecasts update and stocks react.',
      },
    ],
    simulator: {
      title: 'Tax and Budget Balancer',
      intro:
        'You are mayor for a year. Set tax rates and spending priorities. Watch schools, safety, and voter satisfaction.',
      scenario:
        'City budget: $100M. You need better schools, fixed roads, and a rainy-day fund. Property and sales taxes are your main levers.',
      meters: [
        { id: 'schools', label: 'School Quality', emoji: '🏫', initial: 50, color: 'blue' },
        { id: 'infra', label: 'Infrastructure', emoji: '🛣️', initial: 45, color: 'green' },
        { id: 'approval', label: 'Public Approval', emoji: '👍', initial: 55, color: 'yellow' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Schools are overcrowded. Parents demand smaller class sizes.',
          choices: [
            {
              id: 'school_tax',
              label: 'Raise property tax 1% for education only',
              description: 'Dedicated school funding.',
              effects: { schools: +25, infra: 0, approval: -5 },
              feedback:
                'Class sizes improved. Some homeowners grumbled but parents rallied. Dedicated taxes show where money goes.',
            },
            {
              id: 'cut_police',
              label: 'Shift money from police to schools',
              description: 'Zero sum inside the budget.',
              effects: { schools: +15, infra: 0, approval: -15 },
              feedback:
                'Schools gained but safety debates exploded. Tradeoffs are visible in every city hall meeting.',
            },
            {
              id: 'grant',
              label: 'Apply for state grants, keep taxes flat',
              description: 'Outside funding.',
              effects: { schools: +10, infra: 0, approval: +10 },
              feedback:
                'Grants helped but are not guaranteed every year. Fiscal policy at state and federal level matters to cities too.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'Bridges are rated poor. Trucks are damaging roads faster.',
          choices: [
            {
              id: 'infra_bond',
              label: 'Issue bonds to fix roads now, pay later',
              description: 'Borrow for infrastructure.',
              effects: { schools: 0, infra: +30, approval: +5 },
              feedback:
                'Roads improved fast. Debt rose. Public investment often uses bonds so benefits arrive before taxes fully pay.',
            },
            {
              id: 'sales_tax',
              label: 'Add 0.5% sales tax for transit and roads',
              description: 'User-linked revenue.',
              effects: { schools: 0, infra: +20, approval: -8 },
              feedback:
                'Sales taxes are easy to collect but hit lower-income shoppers harder (regressive). Infrastructure got a steady fund.',
            },
            {
              id: 'delay',
              label: 'Patch roads only, defer big projects',
              description: 'Save cash short term.',
              effects: { schools: 0, infra: -10, approval: -12 },
              feedback:
                'Small fixes failed as potholes returned. Deferring maintenance often costs more later. Public goods need upkeep.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'A recession hits. Tax revenue falls 12%. Federal aid is uncertain.',
          choices: [
            {
              id: 'stimulus_spend',
              label: 'Keep spending with a small deficit to protect jobs',
              description: 'Counter-cyclical fiscal policy.',
              effects: { schools: +5, infra: +5, approval: +10 },
              feedback:
                'City workers stayed employed. Services held steady. Short deficits in downturns mirror national fiscal stimulus logic.',
            },
            {
              id: 'austerity',
              label: 'Cut all departments 10% immediately',
              description: 'Balance the budget fast.',
              effects: { schools: -15, infra: -15, approval: -20 },
              feedback:
                'Budget balanced on paper but layoffs hurt families. Austerity during a slump can deepen local recessions.',
            },
            {
              id: 'tax_hike',
              label: 'Temporary tax surcharge on high-value properties',
              description: 'Targeted revenue.',
              effects: { schools: +10, infra: +10, approval: -5 },
              feedback:
                'Progressive-style targeting raised revenue without hitting every resident equally. Policy design shapes fairness and approval.',
            },
          ],
        },
      ],
      endMessage:
        'Taxes are the price of shared services. Good fiscal policy balances today needs, long-run infrastructure, and what happens when the economy slows.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Fiscal policy involves:',
        options: [
          { id: 'a', text: 'Government spending and taxation' },
          { id: 'b', text: 'Only the stock exchange hours' },
          { id: 'c', text: 'Fashion trends' },
          { id: 'd', text: 'Private gym memberships' },
        ],
        correctId: 'a',
        explanation: 'Fiscal policy is spending and tax decisions by government, unlike monetary policy (interest rates).',
      },
      {
        id: 'q2',
        question: 'On a paystub, net pay is:',
        options: [
          { id: 'a', text: 'Gross pay plus bonuses only' },
          { id: 'b', text: 'Take-home pay after withholdings' },
          { id: 'c', text: 'Employer profit' },
          { id: 'd', text: 'City population' },
        ],
        correctId: 'b',
        explanation: 'Net pay is what hits your bank after taxes and other deductions.',
      },
      {
        id: 'q3',
        question: 'A 401(k) contribution can help because:',
        options: [
          { id: 'a', text: 'It often grows tax-deferred and may reduce taxable income now' },
          { id: 'b', text: 'It eliminates all taxes forever' },
          { id: 'c', text: 'It replaces Social Security automatically' },
          { id: 'd', text: 'It is the same as cash under a mattress' },
        ],
        correctId: 'a',
        explanation:
          'Tax-advantaged retirement accounts reward long-term saving with deferred or different tax treatment.',
      },
      {
        id: 'q4',
        question: 'Public goods include:',
        options: [
          { id: 'a', text: 'National defense and public roads' },
          { id: 'b', text: 'Your personal phone' },
          { id: 'c', text: 'A single-owned yacht' },
          { id: 'd', text: 'Secret diary entries' },
        ],
        correctId: 'a',
        explanation: 'Public goods are non-excludable and benefit many people; government often provides them.',
      },
      {
        id: 'q5',
        question: 'A public finance analyst might:',
        options: [
          { id: 'a', text: 'Model city budgets and bond repayment' },
          { id: 'b', text: 'Design video game characters only' },
          { id: 'c', text: 'Fly passenger jets only' },
          { id: 'd', text: 'Ignore all government data' },
        ],
        correctId: 'a',
        explanation:
          'Public finance analysts track revenue, spending, and debt for governments and investors in municipal bonds.',
      },
    ],
    rewards: { xp: 140, bamboo: 19 },
  },

  {
    id: 'be-macro-10',
    moduleId: 'business-economics',
    section: 'Macroeconomics',
    title: 'The Fed and Interest Rates',
    estimatedMinutes: 10,
    hook: {
      question: 'Why did your savings account rate jump while your dream car loan got more expensive?',
      philMessage:
        'The Federal Reserve sets the tone for interest rates across the economy. When the Fed moves, banks, markets, and your wallet all react. Time to play Fed Chair.',
    },
    concepts: [
      {
        id: 'money_supply',
        emoji: '💵',
        title: 'Money Supply',
        body:
          'Money supply is how much money circulates in the economy (cash, checking deposits, and broader measures). The Fed influences it through bank reserves, lending to banks, and buying or selling securities. More liquidity can boost spending; less can cool inflation.',
        realWorldExample:
          'During COVID the Fed added liquidity to keep credit flowing. In 2022-2023 it shrank its balance sheet to tighten conditions and fight inflation.',
      },
      {
        id: 'central_banks',
        emoji: '🏦',
        title: 'Central Banks',
        body:
          'The Federal Reserve is the US central bank. It supervises banks, lends in crises, and runs monetary policy. It is independent from day-to-day politics so it can focus on stable prices and maximum employment. Other countries have their own central banks (ECB, Bank of Japan).',
        realWorldExample:
          'When Silicon Valley Bank failed in 2023, the Fed acted quickly to protect deposits and calm markets. Central banks are lenders of last resort in panics.',
      },
      {
        id: 'interest_rates',
        emoji: '📉',
        title: 'Interest Rates',
        body:
          'The Fed sets a target range for the federal funds rate (what banks charge each other overnight). That rate ripples out to savings accounts, mortgages, car loans, and corporate borrowing costs. Lower rates stimulate borrowing and spending. Higher rates slow the economy to fight inflation.',
        realWorldExample:
          'Mortgage rates near 7% in 2023 cooled housing compared to 3% loans in 2021. Credit card APRs rose with Fed hikes, hurting borrowers who carry balances.',
      },
      {
        id: 'markets_careers',
        emoji: '📊',
        title: 'Markets, Savings, and Fed Careers',
        body:
          'Fed decisions move stock and bond markets. Bonds are especially sensitive: when rates rise, existing bond prices usually fall. Stocks react to growth and inflation expectations. For you: shop savings rates when the Fed hikes, lock in loan terms carefully, and understand why bond funds wobble. Careers: central bank analyst, banking operations specialist track policy and implement rules.',
        realWorldExample:
          'Investors watch every Fed press conference. A single sentence about "higher for longer" rates can move the S&P 500 billions of dollars in minutes.',
      },
    ],
    simulator: {
      title: 'Fed Chair Challenge',
      intro:
        'Set interest rate policy through three meetings. Balance inflation near 2% with strong employment.',
      scenario:
        'Inflation is 4.5%, unemployment 3.8%, growth slowing. Markets watch your every word.',
      meters: [
        { id: 'inflation', label: 'Inflation', emoji: '🔥', initial: 70, color: 'red' },
        { id: 'employment', label: 'Employment', emoji: '👷', initial: 75, color: 'blue' },
        { id: 'confidence', label: 'Market Confidence', emoji: '🎯', initial: 55, color: 'yellow' },
      ],
      rounds: [
        {
          id: 'r1',
          situation: 'Inflation is stuck above 4%. Job market still hot. First decision of the year.',
          choices: [
            {
              id: 'hike_big',
              label: 'Raise rates 0.75% now',
              description: 'Send a strong anti-inflation signal.',
              effects: { inflation: -20, employment: -15, confidence: -10 },
              feedback:
                'Inflation cooled faster but hiring slowed and stocks wobbled. Big moves show commitment but risk recession.',
            },
            {
              id: 'hike_small',
              label: 'Raise rates 0.25% and signal more if needed',
              description: 'Gradual tightening.',
              effects: { inflation: -10, employment: -5, confidence: +10 },
              feedback:
                'Markets liked the steady approach. Inflation eased slowly. The Fed often prefers gradual paths to avoid shocks.',
            },
            {
              id: 'hold',
              label: 'Hold rates steady, wait for data',
              description: 'Do not rock markets.',
              effects: { inflation: +10, employment: +5, confidence: -15 },
              feedback:
                'Inflation expectations crept up. You may need bigger hikes later. Waiting too long can lose credibility.',
            },
          ],
        },
        {
          id: 'r2',
          situation: 'A regional bank fails. Credit is tightening. Inflation still 3.5%.',
          choices: [
            {
              id: 'lend',
              label: 'Open emergency lending to stable banks',
              description: 'Liquidity without cutting rates yet.',
              effects: { inflation: +5, employment: +10, confidence: +15 },
              feedback:
                'Classic central bank crisis tool. You stabilized the system without declaring victory on inflation.',
            },
            {
              id: 'cut',
              label: 'Cut rates immediately to calm markets',
              description: 'Ease financial conditions.',
              effects: { inflation: +15, employment: +10, confidence: +5 },
              feedback:
                'Markets rallied short term but inflation risk rose. Cutting during high inflation is a tough tradeoff.',
            },
            {
              id: 'hike_more',
              label: 'Keep hiking rates despite the bank stress',
              description: 'Inflation is still priority one.',
              effects: { inflation: -15, employment: -20, confidence: -20 },
              feedback:
                'Inflation fell but unemployment jumped and confidence crashed. Sometimes financial stability fights the inflation mandate.',
            },
          ],
        },
        {
          id: 'r3',
          situation: 'Inflation hits 2.2%. Unemployment rises to 5%. Election year noise is loud.',
          choices: [
            {
              id: 'cut_start',
              label: 'Cut rates 0.5% to support jobs',
              description: 'Pivot to growth.',
              effects: { inflation: +10, employment: +20, confidence: +10 },
              feedback:
                'Hiring picked up. Watch inflation re-accelerate. The Fed often cuts when the job side of the mandate weakens.',
            },
            {
              id: 'hold_high',
              label: 'Hold rates high until inflation is clearly at 2%',
              description: 'Stay hawkish.',
              effects: { inflation: -10, employment: -10, confidence: -5 },
              feedback:
                'Inflation anchored near target. Pain on households with variable debt. Bond investors may prefer stable policy.',
            },
            {
              id: 'guidance',
              label: 'Hold rates but signal cuts coming if data improve',
              description: 'Forward guidance tool.',
              effects: { inflation: -5, employment: +10, confidence: +15 },
              feedback:
                'Words matter as much as actions. Forward guidance shapes loan rates before you even move the dial.',
            },
          ],
        },
      ],
      endMessage:
        'The Fed walks a tightrope: cool inflation without breaking jobs, calm banks without fueling bubbles. Rates touch every dollar you borrow or save.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'The Federal Reserve\'s main monetary tools include:',
        options: [
          { id: 'a', text: 'Setting interest rate targets and influencing bank liquidity' },
          { id: 'b', text: 'Writing corporate earnings reports' },
          { id: 'c', text: 'Setting individual credit scores' },
          { id: 'd', text: 'Printing student IDs' },
        ],
        correctId: 'a',
        explanation: 'The Fed runs monetary policy via rates and liquidity, not fiscal spending (Congress).',
      },
      {
        id: 'q2',
        question: 'When the Fed raises rates, borrowing usually:',
        options: [
          { id: 'a', text: 'Gets cheaper for everyone' },
          { id: 'b', text: 'Gets more expensive, slowing spending' },
          { id: 'c', text: 'Stops existing entirely' },
          { id: 'd', text: 'Only affects foreign countries' },
        ],
        correctId: 'b',
        explanation: 'Higher rates pass through to loans and mortgages, cooling demand to fight inflation.',
      },
      {
        id: 'q3',
        question: 'Why do existing bond prices often fall when rates rise?',
        options: [
          { id: 'a', text: 'New bonds pay more interest, so older bonds are less attractive' },
          { id: 'b', text: 'Bonds are not traded' },
          { id: 'c', text: 'The Fed bans bonds' },
          { id: 'd', text: 'Inflation always goes to zero' },
        ],
        correctId: 'a',
        explanation: 'Investors demand higher yields on new bonds, so prices on older lower-yield bonds drop.',
      },
      {
        id: 'q4',
        question: 'Higher Fed rates can help savers by:',
        options: [
          { id: 'a', text: 'Raising yields on savings accounts and new CDs over time' },
          { id: 'b', text: 'Eliminating all bank fees' },
          { id: 'c', text: 'Making cash illegal' },
          { id: 'd', text: 'Lowering grocery prices instantly' },
        ],
        correctId: 'a',
        explanation: 'Banks often pass higher policy rates to deposit products, though spreads vary.',
      },
      {
        id: 'q5',
        question: 'A central bank analyst might:',
        options: [
          { id: 'a', text: 'Forecast inflation and advise on rate decisions' },
          { id: 'b', text: 'Coach youth soccer only' },
          { id: 'c', text: 'Design clothing lines only' },
          { id: 'd', text: 'Ignore all economic data' },
        ],
        correctId: 'a',
        explanation:
          'Fed and bank research teams model inflation, employment, and financial stability for policy meetings.',
      },
    ],
    rewards: { xp: 145, bamboo: 20 },
  },
];
