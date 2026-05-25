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
        body: 'Active managers try to beat the market by picking stocks and timing trades. You pay higher expense ratios for research teams and trading desks.',
        realWorldExample:
          'A mutual fund charging 1.5% per year must beat the market by more than 1.5% just to match a cheap index after fees.',
      },
      {
        id: 'passive',
        emoji: '📊',
        title: 'Passive / Index Investing',
        body: 'Index funds track a basket (like the S&P 500). You own the broad market, not a bet on one manager\'s skill. Fees are often under 0.10%.',
        realWorldExample:
          'Vanguard S&P 500 ETFs popularized "own America Inc." for retail investors at rock-bottom cost.',
      },
      {
        id: 'fees',
        emoji: '💸',
        title: 'Expense Ratio Cascades',
        body: 'A 2% annual fee compounds against you every year. Over decades, fee drag can erase a huge slice of terminal wealth even if returns look similar before fees.',
        realWorldExample:
          'SEC illustrations often show how 1% extra fee can cost hundreds of thousands over a 40-year horizon.',
      },
      {
        id: 'underperformance',
        emoji: '📉',
        title: 'The Underperformance Reality',
        body: 'Most active funds underperform their benchmark over long periods after fees. Beating the market consistently is rare.',
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
        body: 'Risk tied to one company or sector: fraud, product flop, CEO scandal. You can dilute this by holding many names and industries.',
        realWorldExample:
          'Employees with 90% net worth in company stock learned hard lessons when firms went bankrupt.',
      },
      {
        id: 'systemic',
        emoji: '🌊',
        title: 'Systemic Risk',
        body: 'Macro shocks hit nearly everything: recessions, global panics, inflation spikes. Diversification cushions but cannot erase systemic hits.',
        realWorldExample:
          '2008 hit most stocks; bonds and cash behaved differently, which is why multi-asset portfolios exist.',
      },
      {
        id: 'stacking',
        emoji: '🥚',
        title: 'Asset Stacking',
        body: 'Combine stocks, bonds, cash, and optionally real assets. Low correlation between buckets smooths the ride.',
        realWorldExample:
          'When stocks fell in 2022, some bond funds also fell (unusual), reminding owners diversification is nuanced, not magic.',
      },
      {
        id: 'lazy_portfolio',
        emoji: '📦',
        title: 'Simple Diversified Templates',
        body: 'A three-fund portfolio (US stocks, international stocks, bonds) covers global equity and fixed income at low cost.',
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
        body: 'Compound growth reinvests returns so you earn on prior gains. Future value grows faster than linear saving because the base keeps expanding.',
        realWorldExample:
          'Legend says Einstein called compound interest the eighth wonder; whether true or not, the math is powerful.',
      },
      {
        id: 'formula',
        emoji: '🧮',
        title: 'Future Value Intuition',
        body: 'Regular contributions plus return rate plus years drive outcomes. Small rate differences matter enormously over decades.',
        realWorldExample:
          '7% average return doubles roughly every 10 years in the rule of 72 approximation.',
      },
      {
        id: 'time',
        emoji: '⏳',
        title: 'The Cost of Waiting',
        body: 'Starting at 16 vs. 30 gives 14 extra years of compounding. Youth is a financial asset because t (time) is in the exponent.',
        realWorldExample:
          'Two siblings with the same fund but different start dates can end with wildly different balances at 65.',
      },
      {
        id: 'consistency',
        emoji: '🔁',
        title: 'Consistency Beats Timing',
        body: 'Automated monthly investing reduces emotion. Missing the best market days hurts, but long horizons reward steady owners.',
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
        body: 'Mature profitable firms may return excess cash to shareholders as dividends. You receive cash per share owned.',
        realWorldExample:
          'Johnson & Johnson has a long history of rising dividends, attracting income-focused owners.',
      },
      {
        id: 'drip',
        emoji: '🔁',
        title: 'DRIP Reinvestment',
        body: 'Dividend Reinvestment Plans automatically buy more shares (sometimes fractional) with each payout, compounding ownership.',
        realWorldExample:
          'Broker DRIP settings let teens reinvest $12 payouts into 0.05 shares without trading fees in some plans.',
      },
      {
        id: 'consume',
        emoji: '🛍️',
        title: 'Cash Out vs. Reinvest',
        body: 'Spending dividends funds lifestyle; reinvesting accelerates the ownership snowball. Both are valid depending on goals.',
        realWorldExample:
          'Retirees may live on dividends; accumulators in their 20s often reinvest for growth.',
      },
      {
        id: 'yield_trap',
        emoji: '⚠️',
        title: 'Yield Traps',
        body: 'Ultra-high dividend yields can signal distress (price crashed). Look at payout sustainability, not yield alone.',
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
        body: 'Ownership in companies. Higher long-run return potential, higher short-term volatility. Main engine of growth portfolios.',
        realWorldExample:
          'S&P 500 historically rewarded patient owners over decades, with scary drawdowns along the way.',
      },
      {
        id: 'fixed_income',
        emoji: '📄',
        title: 'Fixed Income (Bonds)',
        body: 'Loans to governments or corporations paying interest. Usually steadier than stocks, sensitive to rate changes.',
        realWorldExample:
          'Treasury bonds are classic "flight to safety" assets during some panics.',
      },
      {
        id: 'cash',
        emoji: '💰',
        title: 'Cash Equivalents',
        body: 'Savings, money markets, short CDs. Low volatility but inflation can erode purchasing power if cash sits too long.',
        realWorldExample:
          'High-yield savings in 2024 finally paid meaningful rates after years near zero.',
      },
      {
        id: 'tradeoff',
        emoji: '⚖️',
        title: 'Risk-Premium Tradeoff',
        body: 'Higher expected return usually means accepting more volatility. Mix assets to match when you need the money (time horizon).',
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
        body: 'Prices bounce on headlines, bots, and mood. Long-term owners focus on business earnings and time in market, not every tick.',
        realWorldExample:
          'Missing the 10 best days in a decade can slash returns for traders who jumped in and out.',
      },
      {
        id: 'loss_aversion',
        emoji: '🧠',
        title: 'Loss Aversion',
        body: 'Losses feel about twice as painful as equivalent gains feel good. That bias pushes panic selling at the worst moment.',
        realWorldExample:
          'Behavioral economists Kahneman and Tversky documented how pain drives irrational exits.',
      },
      {
        id: 'paper_loss',
        emoji: '📉',
        title: 'Paper vs. Real Loss',
        body: 'Until you sell, a drop is unrealized. Selling locks in damage. Holders who stay invested often recover in later cycles (not guaranteed, but common historically).',
        realWorldExample:
          '2020 crash recovered quickly for diversified owners who stayed the course.',
      },
      {
        id: 'discount',
        emoji: '🏷️',
        title: 'Downturns as Discount Windows',
        body: 'Contributing during fear can lower average purchase price over decades. Patience plus plan beats reacting to red arrows.',
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
