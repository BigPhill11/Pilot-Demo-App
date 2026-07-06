import type { VillageLesson } from '@/types/village-lesson';
import { ownershipSimulator } from './ownership-lesson-helpers';

export const ownershipUnit4Lessons: VillageLesson[] = [
  {
    id: 'own-u4-index-funds',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.1',
    title: 'Active vs. Index Funds',
    estimatedMinutes: 9,
    simulatorType: 'index-fee-allocator',
    hook: {
      question: 'Why do most professional stock pickers lose to a boring index fund?',
      philMessage:
        'Fees are silent wealth killers. Active sounds elite, but math and history favor low-cost indexing for most everyday owners.',
    },
    concepts: [
      {
        id: 'active',
        emoji: '🎯',
        title: 'Active Investing',
        body: 'Active managers try to beat the market by hand-picking stocks and timing when to buy and sell. To do that, they employ research teams, analysts, and trading desks — and you pay for all of it through higher expense ratios, often 1% or more per year. The pitch sounds great: pay experts to outperform. But every trade they make is against other smart professionals, so beating the market consistently is far harder than it sounds, and the fee is charged whether they win or lose.',
        realWorldExample:
          'A mutual fund charging 1.5% per year must beat the market by more than 1.5% just to match a cheap index after fees.',
      },
      {
        id: 'passive',
        emoji: '📊',
        title: 'Passive / Index Investing',
        body: 'Index funds skip the stock-picking contest entirely. Instead of betting on one manager\'s skill, they simply buy and hold every company in a market basket, like all 500 companies in the S&P 500. You own a small slice of the whole market, so your return is the market\'s return. Because there is no expensive research team to pay, fees are often under 0.10% per year — that means more of the growth stays in your pocket instead of leaking out to Wall Street.',
        realWorldExample:
          'Vanguard S&P 500 ETFs popularized "own America Inc." for retail investors at rock-bottom cost.',
      },
      {
        id: 'fees',
        emoji: '💸',
        title: 'Expense Ratio Cascades',
        body: 'Fees compound against you exactly the way returns compound for you. A 2% annual fee doesn\'t just take 2% once — it takes 2% of your growing balance every single year, which means it also destroys all the future growth that money would have produced. Over 30 or 40 years, the difference between a 2% fee and a 0.05% fee can quietly consume a third or more of your final wealth, even when the two funds earned identical returns before fees. Always check the expense ratio before you buy.',
        realWorldExample:
          'SEC illustrations often show how 1% extra fee can cost hundreds of thousands over a 40-year horizon.',
      },
      {
        id: 'underperformance',
        emoji: '📉',
        title: 'The Underperformance Reality',
        body: 'Here is the uncomfortable data: over long stretches, the large majority of active funds fail to beat the plain index they compete against once fees are counted. A manager might win one year, but winning year after year for decades is extraordinarily rare — and you can\'t know in advance which manager will be the rare one. That is why many professionals, including famous investors like Warren Buffett, recommend low-cost index funds for most everyday investors: you guarantee yourself the market\'s return instead of gambling on picking the right picker.',
        realWorldExample:
          'SPIVA reports regularly show majority of active funds trailing indexes over 10 and 20 years.',
      },
    ],
    simulator: ownershipSimulator(
      'Fee Drag Race',
      'Allocate $1,000 between an active fund and a market index for 10 years.',
      'Watch how fees compound into final net worth.',
      'For most owners, minimizing fee leakage protects bottom-line equity.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Index funds aim to:',
        options: [
          { id: 'a', text: 'Track a market basket' },
          { id: 'b', text: 'Guarantee no losses' },
          { id: 'c', text: 'Beat every stock picker every year' },
          { id: 'd', text: 'Avoid all regulation' },
        ],
        correctId: 'a',
        explanation: 'Indexes match a benchmark, not guarantee outperformance.',
      },
      {
        id: 'q2',
        question: 'Expense ratios measure:',
        options: [
          { id: 'a', text: 'Annual fund fees as a percent of assets' },
          { id: 'b', text: 'CEO age' },
          { id: 'c', text: 'Dividend tax rate only' },
          { id: 'd', text: 'Trading volume of one stock' },
        ],
        correctId: 'a',
        explanation: 'Expense ratio is the yearly fee drag on your investment.',
      },
      {
        id: 'q3',
        question: 'Over long horizons, most active managers:',
        options: [
          { id: 'a', text: 'Underperform indexes after fees' },
          { id: 'b', text: 'Always win' },
          { id: 'c', text: 'Charge zero fees' },
          { id: 'd', text: 'Hold no stocks' },
        ],
        correctId: 'a',
        explanation: 'Persistence of beating the market is rare; fees make it harder.',
      },
      {
        id: 'q4',
        question: 'A 2% fee vs. 0.05% fee matters because:',
        options: [
          { id: 'a', text: 'Fees compound against wealth over time' },
          { id: 'b', text: 'Fees only apply one day' },
          { id: 'c', text: 'Fees increase dividends automatically' },
          { id: 'd', text: 'Regulators pay fees for you' },
        ],
        correctId: 'a',
        explanation: 'Small annual differences become large over decades.',
      },
      {
        id: 'q5',
        question: 'For many beginners, indexing offers:',
        options: [
          { id: 'a', text: 'Broad diversification and low cost' },
          { id: 'b', text: 'No market risk' },
          { id: 'c', text: 'Daily stock picking required' },
          { id: 'd', text: 'Government insurance on gains' },
        ],
        correctId: 'a',
        explanation: 'Indexes spread risk and keep costs low; market risk remains.',
      },
    ],
    rewards: { xp: 125, bamboo: 16 },
  },
  {
    id: 'own-u4-diversification',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.2',
    title: 'Diversification and Risk',
    estimatedMinutes: 9,
    simulatorType: 'portfolio-stress-test',
    hook: {
      question: 'If one company collapses, should your entire future collapse with it?',
      philMessage:
        'Concentration is a gamble. Diversification is building watertight compartments so one leak does not sink the ship.',
    },
    concepts: [
      {
        id: 'idiosyncratic',
        emoji: '🎯',
        title: 'Idiosyncratic (Unsystemic) Risk',
        body: 'Idiosyncratic risk is danger that belongs to one specific company or industry: an accounting fraud, a failed product launch, a CEO scandal, or a new competitor eating its lunch. The good news is that this kind of risk is dilutable — if you own 500 companies instead of one, a disaster at any single firm barely dents your total. That is the core logic of diversification: you cannot predict which company will stumble, but you can build a portfolio where no single stumble can hurt you badly.',
        realWorldExample:
          'Employees with 90% net worth in company stock learned hard lessons when firms went bankrupt.',
      },
      {
        id: 'systemic',
        emoji: '🌊',
        title: 'Systemic Risk',
        body: 'Systemic risk is the kind you cannot diversify away because it hits nearly everything at once: recessions, global financial panics, pandemics, inflation spikes, or wars. When the whole economy catches a cold, owning 500 companies instead of one doesn\'t save you, because all 500 fall together. Diversification across different asset types — stocks plus bonds plus cash — cushions systemic shocks, but nothing erases them. Every investor accepts some systemic risk; that acceptance is exactly what the market pays you long-term returns for.',
        realWorldExample:
          '2008 hit most stocks; bonds and cash behaved differently, which is why multi-asset portfolios exist.',
      },
      {
        id: 'stacking',
        emoji: '🥚',
        title: 'Asset Stacking',
        body: 'Real diversification goes beyond owning many stocks — it means combining different asset types that don\'t all move together: stocks for growth, bonds for stability, cash for emergencies, and sometimes real assets like property. When these buckets have low correlation, a bad year for one is often a flat or good year for another, which smooths your overall ride and makes it easier to stay invested. The goal isn\'t to maximize return in the best year; it\'s to build a portfolio you can hold through the worst one.',
        realWorldExample:
          'When stocks fell in 2022, some bond funds also fell (unusual), reminding owners diversification is nuanced, not magic.',
      },
      {
        id: 'lazy_portfolio',
        emoji: '📦',
        title: 'Simple Diversified Templates',
        body: 'You don\'t need a complicated strategy to be well diversified. A classic three-fund portfolio — one US total stock market fund, one international stock fund, and one bond fund — covers thousands of companies across the globe plus fixed income, all at rock-bottom cost. Set your target percentages, add money automatically every month, and rebalance about once a year to pull the mix back to target. This "boring" template has quietly outperformed most complex, expensive strategies over long horizons.',
        realWorldExample:
          'Bogleheads communities teach set-and-rebalance approaches for long horizons.',
      },
    ],
    simulator: ownershipSimulator(
      'Portfolio Stress Test',
      'Pick concentrated vs. diversified, then survive a headline shock.',
      'See how one bad news event hits each portfolio type.',
      'Spread ownership so no single failure erases you.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Idiosyncratic risk is:',
        options: [
          { id: 'a', text: 'Risk specific to one company or sector' },
          { id: 'b', text: 'Risk that affects every country equally always' },
          { id: 'c', text: 'Risk eliminated by timing the market perfectly' },
          { id: 'd', text: 'Risk only in bonds' },
        ],
        correctId: 'a',
        explanation: 'Company-specific risk can be diversified away to a degree.',
      },
      {
        id: 'q2',
        question: 'Systemic risk refers to:',
        options: [
          { id: 'a', text: 'Economy-wide shocks affecting many assets' },
          { id: 'b', text: 'One store closing' },
          { id: 'c', text: 'A typo in a spreadsheet' },
          { id: 'd', text: 'Free lunch in markets' },
        ],
        correctId: 'a',
        explanation: 'Macro events move broad markets; diversification only cushions.',
      },
      {
        id: 'q3',
        question: 'Diversification primarily helps reduce:',
        options: [
          { id: 'a', text: 'Single-company blowups' },
          { id: 'b', text: 'All forms of risk completely' },
          { id: 'c', text: 'Taxes to zero' },
          { id: 'd', text: 'Need for any research' },
        ],
        correctId: 'a',
        explanation: 'Spreading holdings lowers reliance on one outcome.',
      },
      {
        id: 'q4',
        question: 'A 90% bet in one tech stock is:',
        options: [
          { id: 'a', text: 'Highly concentrated idiosyncratic risk' },
          { id: 'b', text: 'The same as a global index' },
          { id: 'c', text: 'Required for beginners' },
          { id: 'd', text: 'Impossible to lose money' },
        ],
        correctId: 'a',
        explanation: 'Concentration magnifies company-specific outcomes.',
      },
      {
        id: 'q5',
        question: 'Global diversification can:',
        options: [
          { id: 'a', text: 'Spread geographic and sector exposure' },
          { id: 'b', text: 'Guarantee profits' },
          { id: 'c', text: 'Remove market cycles' },
          { id: 'd', text: 'Eliminate fees' },
        ],
        correctId: 'a',
        explanation: 'Owning many regions and industries reduces single-basket risk.',
      },
    ],
    rewards: { xp: 130, bamboo: 17 },
  },
  {
    id: 'own-u4-compound-growth',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.3',
    title: 'Compound Growth Mechanics',
    estimatedMinutes: 10,
    simulatorType: 'compound-growth-sliders',
    hook: {
      question: 'Would you rather invest $100 a month at 16 or $300 a month at 30?',
      philMessage:
        'Time is the exponent. Compound growth turns patience into a financial superpower, especially when you start young.',
    },
    concepts: [
      {
        id: 'compound',
        emoji: '📈',
        title: 'The Exponential Engine',
        body: 'Compound growth means your returns start earning returns of their own. Year one, your money grows. Year two, you earn growth on the original money PLUS last year\'s gains — and that snowball keeps expanding every cycle. This is why compounding is exponential, not linear: a straight savings account adds the same amount each year, but a compounding investment adds a growing amount each year because the base keeps getting bigger. Given enough time, the growth on your growth ends up dwarfing everything you originally put in.',
        realWorldExample:
          'Legend says Einstein called compound interest the eighth wonder; whether true or not, the math is powerful.',
      },
      {
        id: 'formula',
        emoji: '🧮',
        title: 'Future Value Intuition',
        body: 'Three levers control your future value: how much you contribute, what return rate you earn, and how many years you let it run. Of the three, time is in the exponent — which is why it punches hardest. A handy shortcut is the Rule of 72: divide 72 by your return rate to estimate how many years your money takes to double. At 7%, money doubles roughly every 10 years, so $1,000 becomes $2,000, then $4,000, then $8,000. Small differences in rate or start date turn into enormous differences over decades.',
        realWorldExample:
          '7% average return doubles roughly every 10 years in the rule of 72 approximation.',
      },
      {
        id: 'time',
        emoji: '⏳',
        title: 'The Cost of Waiting',
        body: 'Every year you wait to start investing costs far more than the money you didn\'t deposit — it costs all the compounding that money would have done for the rest of your life. Starting at 16 instead of 30 gives you 14 extra years, and because time sits in the exponent of the growth formula, those early years are the most valuable ones you will ever have. A teenager investing $100 a month can realistically end up wealthier at 65 than someone who starts at 30 investing three times as much. Youth is a genuine financial asset; the sooner you use it, the less you\'ll need to save later.',
        realWorldExample:
          'Two siblings with the same fund but different start dates can end with wildly different balances at 65.',
      },
      {
        id: 'consistency',
        emoji: '🔁',
        title: 'Consistency Beats Timing',
        body: 'Trying to jump in and out of the market at the perfect moments sounds smart, but in practice it usually backfires — a huge share of the market\'s long-term gains come from a handful of its best days, and those often arrive right in the middle of scary stretches when timers are sitting out. Automating a fixed investment every month removes emotion from the decision entirely: you buy when prices are high, low, and everywhere between, which averages out your cost. For most people, boring consistency beats clever timing by a wide margin.',
        realWorldExample:
          '401(k) payroll deductions turn compound growth into a habit, not a willpower test.',
      },
    ],
    simulator: ownershipSimulator(
      'Time Multiplier Lab',
      'Slide start age and monthly savings to project terminal wealth.',
      'Compare teen starters vs. delayed high savers.',
      'Start early, stay consistent, let math do the heavy lifting.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Compound growth means:',
        options: [
          { id: 'a', text: 'Earning returns on prior returns' },
          { id: 'b', text: 'Only saving cash under a mattress' },
          { id: 'c', text: 'Linear addition only' },
          { id: 'd', text: 'Avoiding all investing' },
        ],
        correctId: 'a',
        explanation: 'Reinvested gains accelerate growth over time.',
      },
      {
        id: 'q2',
        question: 'The biggest advantage of starting at 16 is:',
        options: [
          { id: 'a', text: 'More years for compounding' },
          { id: 'b', text: 'No market risk' },
          { id: 'c', text: 'Higher Social Security' },
          { id: 'd', text: 'Guaranteed 20% returns' },
        ],
        correctId: 'a',
        explanation: 'Longer time horizon multiplies outcomes.',
      },
      {
        id: 'q3',
        question: 'Rule of 72 estimates:',
        options: [
          { id: 'a', text: 'Years to double money at a given return rate' },
          { id: 'b', text: 'Tax bracket' },
          { id: 'c', text: 'Inflation only' },
          { id: 'd', text: 'Bond legal fees' },
        ],
        correctId: 'a',
        explanation: '72 divided by return rate approximates doubling time.',
      },
      {
        id: 'q4',
        question: 'Automated monthly investing helps by:',
        options: [
          { id: 'a', text: 'Building consistency and reducing emotion' },
          { id: 'b', text: 'Eliminating down markets' },
          { id: 'c', text: 'Avoiding all fees' },
          { id: 'd', text: 'Timing every peak' },
        ],
        correctId: 'a',
        explanation: 'Discipline matters more than perfect timing for most owners.',
      },
      {
        id: 'q5',
        question: 'Future value rises when:',
        options: [
          { id: 'a', text: 'Time, contribution, or return increases (all else equal)' },
          { id: 'b', text: 'You stop contributing' },
          { id: 'c', text: 'Fees rise' },
          { id: 'd', text: 'Years shrink' },
        ],
        correctId: 'a',
        explanation: 'More years, money, or growth rate boosts terminal wealth.',
      },
    ],
    rewards: { xp: 140, bamboo: 18 },
  },
  {
    id: 'own-u4-dividends',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.4',
    title: 'Dividends and DRIP',
    estimatedMinutes: 9,
    simulatorType: 'dividend-drip',
    hook: {
      question: 'When a company pays you cash as an owner, should you spend it or buy more ownership?',
      philMessage:
        'Dividends are profit sharing. Reinvesting them turns one share into many without opening your wallet again.',
    },
    concepts: [
      {
        id: 'dividend',
        emoji: '💵',
        title: 'The Dividend Principle',
        body: 'When a mature company earns more cash than it needs to run and grow the business, it can hand the extra back to its owners — that payment is a dividend. As a shareholder, you receive a set amount of cash for every share you hold, usually every three months, simply for being an owner. Nothing has to be sold; the money arrives because the business you partly own is profitable. Dividends are the most direct, tangible proof that owning a stock means owning a real claim on real profits.',
        realWorldExample:
          'Johnson & Johnson has a long history of rising dividends, attracting income-focused owners.',
      },
      {
        id: 'drip',
        emoji: '🔁',
        title: 'DRIP Reinvestment',
        body: 'A Dividend Reinvestment Plan (DRIP) takes every dividend payment and automatically uses it to buy more shares — even tiny fractional slices — instead of leaving cash in your account. Those new shares then earn their own dividends, which buy even more shares, and the ownership snowball starts rolling without you lifting a finger or adding new money. Over decades, reinvested dividends have historically accounted for a huge portion of the stock market\'s total return, which is why long-term investors almost always switch DRIP on.',
        realWorldExample:
          'Broker DRIP settings let teens reinvest $12 payouts into 0.05 shares without trading fees in some plans.',
      },
      {
        id: 'consume',
        emoji: '🛍️',
        title: 'Cash Out vs. Reinvest',
        body: 'Every dividend forces a choice: cash it out to spend, or reinvest it to grow. Neither answer is wrong — it depends entirely on your life stage and goals. A retiree might live off dividend income, using it like a paycheck the portfolio writes them. A 17-year-old with decades ahead almost always benefits more from reinvesting, because each reinvested dollar has 40+ years to compound. The key is making the choice deliberately instead of letting payouts sit idle in cash where they earn nothing.',
        realWorldExample:
          'Retirees may live on dividends; accumulators in their 20s often reinvest for growth.',
      },
      {
        id: 'yield_trap',
        emoji: '⚠️',
        title: 'Yield Traps',
        body: 'A dividend yield is the annual dividend divided by the stock price — and that math hides a trap. When a company gets into trouble and its stock price crashes, the yield suddenly looks huge, not because the dividend grew but because the price collapsed. A 15% yield usually isn\'t a gift; it\'s the market signaling it expects the payout to be cut. Before chasing a high yield, check whether earnings comfortably cover the dividend. Sustainable and growing beats spectacular and doomed every time.',
        realWorldExample:
          'A stock yielding 15% might face a cut if earnings cannot support payouts.',
      },
    ],
    simulator: ownershipSimulator(
      'Quarterly Payout Choice',
      'Choose cash out or DRIP for three dividend events.',
      'Watch share count and income power shift.',
      'Reinvested dividends feed the compound engine.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'A dividend is:',
        options: [
          { id: 'a', text: 'Cash returned to shareholders from profits' },
          { id: 'b', text: 'A government fine' },
          { id: 'c', text: 'Mandatory stock sale' },
          { id: 'd', text: 'CEO salary' },
        ],
        correctId: 'a',
        explanation: 'Dividends distribute corporate cash to owners.',
      },
      {
        id: 'q2',
        question: 'DRIP stands for:',
        options: [
          { id: 'a', text: 'Dividend Reinvestment Plan' },
          { id: 'b', text: 'Daily Risk Insurance Policy' },
          { id: 'c', text: 'Debt Relief Incentive Program' },
          { id: 'd', text: 'Direct Retail IPO Process' },
        ],
        correctId: 'a',
        explanation: 'DRIPs reinvest payouts into more shares.',
      },
      {
        id: 'q3',
        question: 'Reinvesting dividends tends to:',
        options: [
          { id: 'a', text: 'Increase share count and future payouts' },
          { id: 'b', text: 'Eliminate taxes always' },
          { id: 'c', text: 'Reduce ownership' },
          { id: 'd', text: 'Stop compounding' },
        ],
        correctId: 'a',
        explanation: 'More shares mean larger future dividend checks if rates hold.',
      },
      {
        id: 'q4',
        question: 'A very high dividend yield might warn:',
        options: [
          { id: 'a', text: 'Possible distress or unsustainable payout' },
          { id: 'b', text: 'Guaranteed safety' },
          { id: 'c', text: 'No risk' },
          { id: 'd', text: 'Fed rate cut' },
        ],
        correctId: 'a',
        explanation: 'Yield = dividend/price; crashing price inflates yield.',
      },
      {
        id: 'q5',
        question: 'Growth companies often:',
        options: [
          { id: 'a', text: 'Reinvest profits instead of large dividends' },
          { id: 'b', text: 'Pay the highest dividends always' },
          { id: 'c', text: 'Avoid earnings' },
          { id: 'd', text: 'Ban shareholders' },
        ],
        correctId: 'a',
        explanation: 'Young firms often retain cash to fund expansion.',
      },
    ],
    rewards: { xp: 130, bamboo: 17 },
  },
  {
    id: 'own-u4-asset-classes',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.5',
    title: 'Asset Classes Periodic Table',
    estimatedMinutes: 10,
    simulatorType: 'asset-allocation-cycle',
    hook: {
      question: 'Should the same portfolio work in a boom and in a crash?',
      philMessage:
        'Stocks, bonds, and cash play different roles. Master allocators match buckets to timeline and macro weather.',
    },
    concepts: [
      {
        id: 'equities',
        emoji: '📈',
        title: 'Equities (Stocks)',
        body: 'Equities are shares of ownership in real businesses, which makes them the growth engine of most portfolios. Over long periods, stocks have historically delivered the highest returns of the major asset classes — but the price of that growth is volatility: drops of 20%, 30%, even 50% happen and are normal parts of the journey. Stocks reward investors who can hold through the storms, which is why the money you put in equities should be money you won\'t need for years.',
        realWorldExample:
          'S&P 500 historically rewarded patient owners over decades, with scary drawdowns along the way.',
      },
      {
        id: 'fixed_income',
        emoji: '📄',
        title: 'Fixed Income (Bonds)',
        body: 'Bonds flip the relationship: instead of owning a piece of a company, you become its lender. You hand over money, and the government or corporation promises to pay you regular interest and return your principal at a set date. Because those payments are contractual, bonds are usually far steadier than stocks — but they aren\'t risk-free. When interest rates rise, existing bonds paying old, lower rates become less attractive and their prices fall. In a portfolio, bonds are the shock absorber: they typically dampen the swings that stocks create.',
        realWorldExample:
          'Treasury bonds are classic "flight to safety" assets during some panics.',
      },
      {
        id: 'cash',
        emoji: '💰',
        title: 'Cash Equivalents',
        body: 'Cash equivalents — savings accounts, money market funds, short-term CDs — are the calmest corner of a portfolio. Their value barely moves, they\'re instantly available, and they\'re perfect for emergency funds and money you\'ll need soon. But calm has a hidden cost: inflation. If prices rise 3% a year and your cash earns 1%, you are quietly losing 2% of purchasing power annually. Cash is essential as a safety buffer and useless as a long-term growth strategy — hold enough to sleep well, but not so much that inflation eats your future.',
        realWorldExample:
          'High-yield savings in 2024 finally paid meaningful rates after years near zero.',
      },
      {
        id: 'tradeoff',
        emoji: '⚖️',
        title: 'Risk-Premium Tradeoff',
        body: 'Markets don\'t hand out extra return for free — higher expected growth always comes bundled with bigger swings along the way. That trade is called the risk premium, and it\'s why stocks out-earn bonds and bonds out-earn cash over time. The practical skill is matching each asset to when you need the money: cash for this year, bonds for the next few years, stocks for goals a decade or more away. Get the timeline right and volatility becomes background noise; get it wrong and you can be forced to sell your growth assets at the worst possible moment.',
        realWorldExample:
          'A 60/40 stock-bond mix is a classic moderate template for retirement savers.',
      },
    ],
    simulator: ownershipSimulator(
      'Macro Allocation Grid',
      'Set stock/bond/cash weights, then face boom or recession.',
      'Learn opportunity cost and crash protection tradeoffs.',
      'Allocation is choosing which risks you can afford.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Equities represent:',
        options: [
          { id: 'a', text: 'Ownership in companies' },
          { id: 'b', text: 'Loans to government only' },
          { id: 'c', text: 'Physical gold only' },
          { id: 'd', text: 'Insurance policies' },
        ],
        correctId: 'a',
        explanation: 'Stocks are equity ownership stakes.',
      },
      {
        id: 'q2',
        question: 'Bonds are primarily:',
        options: [
          { id: 'a', text: 'Debt instruments paying interest' },
          { id: 'b', text: 'Ownership in startups only' },
          { id: 'c', text: 'Cash under mattress' },
          { id: 'd', text: 'Derivatives only' },
        ],
        correctId: 'a',
        explanation: 'Bondholders are creditors, not owners.',
      },
      {
        id: 'q3',
        question: 'Cash sitting long term risks:',
        options: [
          { id: 'a', text: 'Inflation eroding purchasing power' },
          { id: 'b', text: 'Automatic doubling' },
          { id: 'c', text: 'Mandatory dividends' },
          { id: 'd', text: 'Higher volatility than stocks' },
        ],
        correctId: 'a',
        explanation: 'Idle cash can lose real value if inflation runs hot.',
      },
      {
        id: 'q4',
        question: '100% stocks before a recession often:',
        options: [
          { id: 'a', text: 'Increases drawdown pain' },
          { id: 'b', text: 'Eliminates all losses' },
          { id: 'c', text: 'Removes systemic risk' },
          { id: 'd', text: 'Guarantees yield' },
        ],
        correctId: 'a',
        explanation: 'Equity-heavy portfolios fall hard in downturns.',
      },
      {
        id: 'q5',
        question: 'Asset allocation should reflect:',
        options: [
          { id: 'a', text: 'Goals, timeline, and risk tolerance' },
          { id: 'b', text: 'Yesterday headline only' },
          { id: 'c', text: 'Random dice rolls' },
          { id: 'd', text: 'Only one company' },
        ],
        correctId: 'a',
        explanation: 'Personal finance goals drive the right mix of buckets.',
      },
    ],
    rewards: { xp: 145, bamboo: 19 },
  },
  {
    id: 'own-u4-patience',
    moduleId: 'ownership',
    section: 'Portfolio Allocation',
    unitLabel: 'Unit 4.6',
    title: 'Patience and Behavioral Defense',
    estimatedMinutes: 9,
    simulatorType: 'market-panic-hold',
    hook: {
      question: 'When the market drops 12% in a week, is your first instinct helping or hurting?',
      philMessage:
        'The math of investing is easy compared to the psychology. Patience is the edge that keeps paper losses from becoming permanent ones.',
    },
    concepts: [
      {
        id: 'noise',
        emoji: '📰',
        title: 'Ignore Daily Noise',
        body: 'On any given day, stock prices move because of headlines, algorithm trades, rumors, and pure crowd mood — almost none of which changes what the underlying businesses are actually worth. Long-term owners learn to separate signal from noise: the signal is earnings, products, and competitive position measured over years; the noise is everything screaming for your attention today. Checking your portfolio every hour doesn\'t give you more control, it just gives the noise more chances to shake you out of good positions. Time in the market beats reacting to the market.',
        realWorldExample:
          'Missing the 10 best days in a decade can slash returns for traders who jumped in and out.',
      },
      {
        id: 'loss_aversion',
        emoji: '🧠',
        title: 'Loss Aversion',
        body: 'Psychologists Kahneman and Tversky proved something brutal about human wiring: losing $100 feels roughly twice as painful as winning $100 feels good. This bias — loss aversion — is why watching your portfolio drop triggers a primal urge to sell everything and make the pain stop. The problem is that the urge peaks exactly when selling is most damaging: at the bottom, right before recoveries historically begin. Knowing the bias exists is your best defense. When you feel the panic, name it: that\'s loss aversion talking, not analysis.',
        realWorldExample:
          'Behavioral economists Kahneman and Tversky documented how pain drives irrational exits.',
      },
      {
        id: 'paper_loss',
        emoji: '📉',
        title: 'Paper vs. Real Loss',
        body: 'There is a crucial difference between your portfolio being down and you actually losing money. A drop on the screen is a paper loss — unrealized, temporary, and reversible if prices recover. The moment you sell, that paper loss becomes a real, permanent one. Investors who held diversified portfolios through 2008 and 2020 watched terrifying numbers on their screens, but those who didn\'t sell recovered and went on to new highs. Recovery is never guaranteed, but history\'s clearest pattern is that panic sellers convert temporary pain into permanent damage.',
        realWorldExample:
          '2020 crash recovered quickly for diversified owners who stayed the course.',
      },
      {
        id: 'discount',
        emoji: '🏷️',
        title: 'Downturns as Discount Windows',
        body: 'Here\'s the mental flip that separates seasoned owners from beginners: a market crash is the only time the thing you\'ve been buying for years goes on sale, yet it\'s the moment most people stop buying. If you\'re investing for decades, lower prices today mean every dollar you contribute buys more shares — shares that multiply your gains when the recovery comes. Investors who kept contributing through 2009-2012 bought at discount prices that supercharged the following decade. A written plan you follow in the storm beats brilliant instincts you abandon in one.',
        realWorldExample:
          'Dollar-cost averaging during 2009-2012 helped steady investors buy cheaper shares.',
      },
    ],
    simulator: ownershipSimulator(
      'Flash Crash Decision',
      'You have 15 seconds when headlines scream panic. Sell or hold?',
      'See how panic selling locks losses before recovery headlines arrive.',
      'Stoic owners treat fear as a test, not a command.'
    ),
    quiz: [
      {
        id: 'q1',
        question: 'Loss aversion means people feel losses:',
        options: [
          { id: 'a', text: 'More strongly than similar-sized gains' },
          { id: 'b', text: 'Less than gains' },
          { id: 'c', text: 'Not at all' },
          { id: 'd', text: 'Only on bonds' },
        ],
        correctId: 'a',
        explanation: 'Pain of loss skews decisions toward panic.',
      },
      {
        id: 'q2',
        question: 'Panic selling during a crash often:',
        options: [
          { id: 'a', text: 'Turns temporary drops into permanent losses' },
          { id: 'b', text: 'Guarantees better returns' },
          { id: 'c', text: 'Removes all risk' },
          { id: 'd', text: 'Is required by law' },
        ],
        correctId: 'a',
        explanation: 'Selling low locks in damage if prices later recover.',
      },
      {
        id: 'q3',
        question: 'A paper loss is:',
        options: [
          { id: 'a', text: 'Unrealized until you sell' },
          { id: 'b', text: 'Always permanent' },
          { id: 'c', text: 'A bank fee' },
          { id: 'd', text: 'Only for bonds' },
        ],
        correctId: 'a',
        explanation: 'Mark-to-market drops matter only when you exit or need cash.',
      },
      {
        id: 'q4',
        question: 'Patience in investing emphasizes:',
        options: [
          { id: 'a', text: 'Long-term plan over headline reactions' },
          { id: 'b', text: 'Trading every hour' },
          { id: 'c', text: 'Ignoring all research' },
          { id: 'd', text: 'Leverage always' },
        ],
        correctId: 'a',
        explanation: 'Discipline and horizon beat emotional trading for most.',
      },
      {
        id: 'q5',
        question: 'Staying invested through downturns historically:',
        options: [
          { id: 'a', text: 'Often allowed recovery for diversified long-term owners' },
          { id: 'b', text: 'Guaranteed no drawdowns ever' },
          { id: 'c', text: 'Meant missing all gains' },
          { id: 'd', text: 'Only worked in one country' },
        ],
        correctId: 'a',
        explanation: 'Past recoveries are common but not promised; patience still key.',
      },
    ],
    rewards: { xp: 150, bamboo: 20 },
  },
];
