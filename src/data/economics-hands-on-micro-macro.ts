import type { EconomicsHandsOnConfig } from '@/types/economics-curriculum';

/**
 * Hands-on mini simulators for Supply & Demand + GDP units (8 lessons).
 * Keys match lesson ids in economics-curriculum.ts.
 */
export const ECONOMICS_HANDS_ON_BY_LESSON: Record<string, EconomicsHandsOnConfig> = {
  'micro-1-lesson-1': {
    title: 'Market Channel Simulator',
    description: 'Pick where to sell. Watch price, liquidity, and match quality.',
    meters: [
      { id: 'price', label: 'Avg. price', value: 50, min: 0, max: 100, unit: '%', icon: '💵', hint: 'Goal: fair value' },
      { id: 'liquidity', label: 'Liquidity', value: 45, min: 0, max: 100, unit: '%', icon: '🔄', hint: 'Ease of trade' },
      { id: 'match', label: 'Match quality', value: 50, min: 0, max: 100, unit: '%', icon: '✓', hint: 'Right buyer/seller fit' },
    ],
    scenarios: [
      {
        id: 'm1-s1',
        title: 'Sell your bike',
        description: 'You need cash this weekend. Where do you list it?',
        choices: [
          {
            id: 'c1',
            label: 'National marketplace app (lots of buyers)',
            outcome: {
              meterChanges: { price: 8, liquidity: 18, match: 5 },
              feedback: 'High liquidity—many bids—but fees and shipping can trim your take-home price.',
            },
          },
          {
            id: 'c2',
            label: 'Local pickup only, community board',
            outcome: {
              meterChanges: { price: -5, liquidity: -10, match: 15 },
              feedback: 'Slower and fewer buyers, but cash today and fewer surprises.',
            },
          },
          {
            id: 'c3',
            label: 'Friend-of-a-friend text chain',
            outcome: {
              meterChanges: { price: 3, liquidity: -18, match: 22 },
              feedback: 'Best match quality if it works—trust is high, but liquidity is low.',
            },
          },
        ],
      },
      {
        id: 'm1-s2',
        title: 'Buy headphones',
        description: 'Same model is $20 cheaper online with 5-day shipping vs. in-store today.',
        choices: [
          {
            id: 'c1',
            label: 'Buy online for the lower price',
            outcome: {
              meterChanges: { price: 12, liquidity: 8, match: -5 },
              feedback: 'Lower price, decent liquidity—wait time is the tradeoff.',
            },
          },
          {
            id: 'c2',
            label: 'Pay in-store today',
            outcome: {
              meterChanges: { price: -12, liquidity: 15, match: 10 },
              feedback: 'You pay for immediacy and easy returns—classic demand vs. time tradeoff.',
            },
          },
          {
            id: 'c3',
            label: 'Wait for a holiday sale alert',
            outcome: {
              meterChanges: { price: 6, liquidity: -8, match: 0 },
              feedback: 'You might optimize price but sacrifice certainty and time.',
            },
          },
        ],
      },
      {
        id: 'm1-s3',
        title: 'Thin market',
        description: 'Only two people want your rare collectible. What do you do?',
        choices: [
          {
            id: 'c1',
            label: 'Auction with a reserve price',
            outcome: {
              meterChanges: { price: 10, liquidity: 5, match: 8 },
              feedback: 'Price discovery helps thin markets; reserve protects your floor.',
            },
          },
          {
            id: 'c2',
            label: 'Take the first offer',
            outcome: {
              meterChanges: { price: -15, liquidity: 20, match: -5 },
              feedback: 'Fast liquidity, but you might leave money on the table—low supply of buyers.',
            },
          },
          {
            id: 'c3',
            label: 'Wait for a specialty convention',
            outcome: {
              meterChanges: { price: 18, liquidity: -12, match: 20 },
              feedback: 'Match quality jumps when serious buyers gather—even if it takes longer.',
            },
          },
        ],
      },
    ],
  },

  'micro-1-lesson-2': {
    title: 'Demand Curve Simulator',
    description: 'Change price and watch quantity demanded and revenue.',
    meters: [
      { id: 'price', label: 'Price index', value: 100, min: 40, max: 160, unit: '', icon: '🏷️', hint: 'Higher ↔ lower qty' },
      { id: 'qty', label: 'Qty demanded', value: 50, min: 0, max: 100, unit: '%', icon: '📦', hint: 'Law of demand' },
      { id: 'revenue', label: 'Revenue index', value: 50, min: 0, max: 100, unit: '%', icon: '📈', hint: 'Price × quantity' },
    ],
    scenarios: [
      {
        id: 'm2-s1',
        title: 'Streaming hike',
        description: 'A service raises monthly price from $10 to $14.',
        choices: [
          {
            id: 'c1',
            label: 'Model: fewer subscribers, higher price',
            outcome: {
              meterChanges: { price: 14, qty: -18, revenue: 4 },
              feedback: 'Classic move along demand: higher price → lower quantity. Revenue can rise or fall depending on elasticity.',
            },
          },
          {
            id: 'c2',
            label: 'Assume everyone stays subscribed',
            outcome: {
              meterChanges: { price: 14, qty: 0, revenue: 25 },
              feedback: 'Unrealistic if substitutes exist—quantity demanded usually drops.',
            },
          },
          {
            id: 'c3',
            label: 'Cancel and switch to a free tier',
            outcome: {
              meterChanges: { price: 8, qty: -35, revenue: -22 },
              feedback: 'Big quantity response—shows elastic demand for entertainment.',
            },
          },
        ],
      },
      {
        id: 'm2-s2',
        title: 'Student discount',
        description: 'Concert cuts ticket price 25% for students.',
        choices: [
          {
            id: 'c1',
            label: 'Expect more tickets sold',
            outcome: {
              meterChanges: { price: -12, qty: 22, revenue: 8 },
              feedback: 'Lower price along the curve raises quantity demanded—total revenue often rises if demand is elastic enough.',
            },
          },
          {
            id: 'c2',
            label: 'Assume no change in attendance',
            outcome: {
              meterChanges: { price: -12, qty: 0, revenue: -12 },
              feedback: 'Ignores the law of demand—price cuts usually move quantity.',
            },
          },
          {
            id: 'c3',
            label: 'Only super-fans buy—others wait',
            outcome: {
              meterChanges: { price: -12, qty: 8, revenue: -5 },
              feedback: 'Inelastic slice of demand: quantity responds less.',
            },
          },
        ],
      },
      {
        id: 'm2-s3',
        title: 'Shift vs. slide',
        description: 'A viral post makes your product trendy (tastes change).',
        choices: [
          {
            id: 'c1',
            label: 'Demand shifts right at every price',
            outcome: {
              meterChanges: { price: 5, qty: 25, revenue: 28 },
              feedback: 'Not just movement along the curve—the whole demand relationship shifts.',
            },
          },
          {
            id: 'c2',
            label: 'Only the price changed',
            outcome: {
              meterChanges: { price: 10, qty: -5, revenue: 3 },
              feedback: 'That would be movement along the curve—here tastes changed too.',
            },
          },
          {
            id: 'c3',
            label: 'Quantity falls because price rose',
            outcome: {
              meterChanges: { price: 8, qty: -10, revenue: -3 },
              feedback: 'Confuses shift with a price increase along the same curve.',
            },
          },
        ],
      },
    ],
  },

  'micro-1-lesson-3': {
    title: 'Supply Response Simulator',
    description: 'Watch costs, quantity supplied, and margin as conditions change.',
    meters: [
      { id: 'input', label: 'Input cost', value: 40, min: 0, max: 100, unit: '%', icon: '🧱', hint: 'Lower is easier' },
      { id: 'qty', label: 'Qty supplied', value: 55, min: 0, max: 100, unit: '%', icon: '📦', hint: 'Law of supply' },
      { id: 'margin', label: 'Margin', value: 50, min: 0, max: 100, unit: '%', icon: '💰', hint: 'Room to profit' },
    ],
    scenarios: [
      {
        id: 'm3-s1',
        title: 'Surge evening',
        description: 'Ride prices double for two hours—drivers respond.',
        choices: [
          {
            id: 'c1',
            label: 'More drivers go online',
            outcome: {
              meterChanges: { input: 0, qty: 25, margin: 18 },
              feedback: 'Higher price increases quantity supplied—core law of supply.',
            },
          },
          {
            id: 'c2',
            label: 'Same number of drivers',
            outcome: {
              meterChanges: { input: 0, qty: 0, margin: 5 },
              feedback: 'Unlikely—higher pay typically pulls more sellers in.',
            },
          },
          {
            id: 'c3',
            label: 'Drivers quit because it is busy',
            outcome: {
              meterChanges: { input: 5, qty: -15, margin: -20 },
              feedback: 'Stress can matter, but the dominant short-run effect is more supply at higher prices.',
            },
          },
        ],
      },
      {
        id: 'm3-s2',
        title: 'Crop freeze',
        description: 'A freeze raises fruit input costs for juice bars.',
        choices: [
          {
            id: 'c1',
            label: 'Supply shifts left; higher costs',
            outcome: {
              meterChanges: { input: 28, qty: -22, margin: -25 },
              feedback: 'Non-price shock: less supplied at each price until prices adjust.',
            },
          },
          {
            id: 'c2',
            label: 'Bars sell more at the same cost',
            outcome: {
              meterChanges: { input: -5, qty: 15, margin: 10 },
              feedback: 'Ignores the freeze—input costs rose for everyone.',
            },
          },
          {
            id: 'c3',
            label: 'Government caps juice prices',
            outcome: {
              meterChanges: { input: 20, qty: -35, margin: -40 },
              feedback: 'Shortages often follow when price cannot rise to clear the market.',
            },
          },
        ],
      },
      {
        id: 'm3-s3',
        title: 'Better equipment',
        description: 'New machines cut labor time per unit.',
        choices: [
          {
            id: 'c1',
            label: 'Supply shifts right',
            outcome: {
              meterChanges: { input: -18, qty: 22, margin: 20 },
              feedback: 'Technology lowers cost—more can be supplied at each price.',
            },
          },
          {
            id: 'c2',
            label: 'Only demand shifts',
            outcome: {
              meterChanges: { input: 0, qty: 5, margin: 2 },
              feedback: 'This shock is on the supply side—production got cheaper.',
            },
          },
          {
            id: 'c3',
            label: 'Firms exit the market',
            outcome: {
              meterChanges: { input: 10, qty: -20, margin: -15 },
              feedback: 'Lower costs usually attract production, not exit.',
            },
          },
        ],
      },
    ],
  },

  'micro-1-lesson-4': {
    title: 'Equilibrium Simulator',
    description: 'Balance shortage vs. surplus using price and waste.',
    meters: [
      { id: 'gap', label: 'Shortage / surplus', value: 0, min: -50, max: 50, unit: '', icon: '⚖️', hint: '0 = balanced' },
      { id: 'price', label: 'Price', value: 50, min: 20, max: 100, unit: '%', icon: '💵', hint: 'Clears market' },
      { id: 'waste', label: 'Waste / stockouts', value: 20, min: 0, max: 100, unit: '%', icon: '📉', hint: 'Lower is better' },
    ],
    scenarios: [
      {
        id: 'm4-s1',
        title: 'Too high',
        description: 'Your price is above equilibrium; jackets pile up.',
        choices: [
          {
            id: 'c1',
            label: 'Mark down until inventory clears',
            outcome: {
              meterChanges: { gap: -18, price: -12, waste: -22 },
              feedback: 'Surplus signals price is too high—cutting price restores equilibrium.',
            },
          },
          {
            id: 'c2',
            label: 'Raise price to signal quality',
            outcome: {
              meterChanges: { gap: 15, price: 10, waste: 25 },
              feedback: 'Usually worsens surplus when you are already above equilibrium.',
            },
          },
          {
            id: 'c3',
            label: 'Destroy excess inventory',
            outcome: {
              meterChanges: { gap: -5, price: 0, waste: 15 },
              feedback: 'Removes stock but does not fix the price signal—waste can remain costly.',
            },
          },
        ],
      },
      {
        id: 'm4-s2',
        title: 'Too low',
        description: 'Tickets priced below equilibrium—site crashes.',
        choices: [
          {
            id: 'c1',
            label: 'Raise price or auction remaining seats',
            outcome: {
              meterChanges: { gap: -20, price: 18, waste: -25 },
              feedback: 'Shortage means price was too low—raising price rations to those who value it most.',
            },
          },
          {
            id: 'c2',
            label: 'Keep price; add random lottery',
            outcome: {
              meterChanges: { gap: -8, price: 0, waste: 10 },
              feedback: 'Non-price rationing can work but may not eliminate excess demand.',
            },
          },
          {
            id: 'c3',
            label: 'Cancel the event',
            outcome: {
              meterChanges: { gap: 0, price: -10, waste: 40 },
              feedback: 'Extreme fix—markets usually adjust price first.',
            },
          },
        ],
      },
      {
        id: 'm4-s3',
        title: 'Demand jumps',
        description: 'A heat wave shifts demand right for cold drinks.',
        choices: [
          {
            id: 'c1',
            label: 'Let price rise to new equilibrium',
            outcome: {
              meterChanges: { gap: -5, price: 15, waste: -8 },
              feedback: 'Higher equilibrium price and quantity—both can rise when demand shifts right.',
            },
          },
          {
            id: 'c2',
            label: 'Hold price; run out early',
            outcome: {
              meterChanges: { gap: 25, price: 0, waste: 30 },
              feedback: 'Creates shortage and stockouts—classic below-equilibrium pricing.',
            },
          },
          {
            id: 'c3',
            label: 'Cut price to be nice',
            outcome: {
              meterChanges: { gap: 35, price: -12, waste: 35 },
              feedback: 'Generous, but worsens shortage when demand surges.',
            },
          },
        ],
      },
    ],
  },

  'macro-1-lesson-1': {
    title: 'GDP Flow Simulator',
    description: 'Classify spending; keep GDP consistent and avoid double counting.',
    meters: [
      { id: 'gdp', label: 'GDP index', value: 60, min: 0, max: 100, unit: '%', icon: '📊', hint: 'Total output' },
      { id: 'mix', label: 'C+I+G+NX mix', value: 55, min: 0, max: 100, unit: '%', icon: '🧩', hint: 'Balanced tally' },
      { id: 'error', label: 'Double-count risk', value: 35, min: 0, max: 100, unit: '%', icon: '⚠️', hint: 'Lower is better' },
    ],
    scenarios: [
      {
        id: 'a1-s1',
        title: 'New factory robots',
        description: 'A firm buys assembly robots installed in Ohio.',
        choices: [
          {
            id: 'c1',
            label: 'Count as investment (I)',
            outcome: {
              meterChanges: { gdp: 12, mix: 10, error: -15 },
              feedback: 'Business capital spending is investment in GDP—not intermediate if it is final installation.',
            },
          },
          {
            id: 'c2',
            label: 'Count steel in robots again separately',
            outcome: {
              meterChanges: { gdp: -5, mix: -8, error: 25 },
              feedback: 'Double counts intermediate inputs already embedded in final goods.',
            },
          },
          {
            id: 'c3',
            label: 'Ignore—it is a business, not a person',
            outcome: {
              meterChanges: { gdp: -15, mix: -10, error: 5 },
              feedback: 'Business investment still counts in GDP.',
            },
          },
        ],
      },
      {
        id: 'a1-s2',
        title: 'Used car sale',
        description: 'You sell your used car to another person.',
        choices: [
          {
            id: 'c1',
            label: 'Exclude from GDP',
            outcome: {
              meterChanges: { gdp: 3, mix: 5, error: -20 },
              feedback: 'Used goods were counted when new; resales are not current production.',
            },
          },
          {
            id: 'c2',
            label: 'Add full sale price to GDP',
            outcome: {
              meterChanges: { gdp: -8, mix: -5, error: 30 },
              feedback: 'Would double count the car’s original production.',
            },
          },
          {
            id: 'c3',
            label: 'Count only your profit',
            outcome: {
              meterChanges: { gdp: 2, mix: 2, error: -5 },
              feedback: 'Brokerage services can count; the car itself does not add new production.',
            },
          },
        ],
      },
      {
        id: 'a1-s3',
        title: 'Imports',
        description: 'US households buy $50B more imported phones.',
        choices: [
          {
            id: 'c1',
            label: 'Subtract imports in NX; C includes spending',
            outcome: {
              meterChanges: { gdp: 5, mix: 12, error: -12 },
              feedback: 'Imports rise—net exports fall—GDP uses domestic production, not foreign.',
            },
          },
          {
            id: 'c2',
            label: 'Add imports to GDP because spending rose',
            outcome: {
              meterChanges: { gdp: -10, mix: -8, error: 20 },
              feedback: 'Imports are subtracted in NX; otherwise foreign production would inflate GDP.',
            },
          },
          {
            id: 'c3',
            label: 'Ignore phones—they are consumer goods',
            outcome: {
              meterChanges: { gdp: -5, mix: -6, error: 8 },
              feedback: 'Consumption rises but imports offset in NX—both matter.',
            },
          },
        ],
      },
    ],
  },

  'macro-1-lesson-2': {
    title: 'Real vs Nominal Simulator',
    description: 'Separate price change from real output.',
    meters: [
      { id: 'nominal', label: 'Nominal growth', value: 6, min: -5, max: 15, unit: '%', icon: '📃', hint: 'Current $' },
      { id: 'infl', label: 'Inflation', value: 4, min: 0, max: 12, unit: '%', icon: '🔥', hint: 'Price level' },
      { id: 'real', label: 'Real growth', value: 2, min: -5, max: 12, unit: '%', icon: '✅', hint: 'Actual stuff' },
    ],
    scenarios: [
      {
        id: 'a2-s1',
        title: 'Headline number',
        description: 'Nominal GDP +6%; inflation +4%.',
        choices: [
          {
            id: 'c1',
            label: 'Real growth is about +2%',
            outcome: {
              meterChanges: { nominal: 0, infl: 0, real: 8 },
              feedback: 'Approximate: nominal minus inflation leaves rough real growth.',
            },
          },
          {
            id: 'c2',
            label: 'Real growth is +6%',
            outcome: {
              meterChanges: { nominal: 0, infl: 2, real: -5 },
              feedback: 'Confuses nominal with real—prices ate part of the gain.',
            },
          },
          {
            id: 'c3',
            label: 'Real growth is −2%',
            outcome: {
              meterChanges: { nominal: 0, infl: 0, real: -8 },
              feedback: 'Too pessimistic here—inflation is below nominal growth.',
            },
          },
        ],
      },
      {
        id: 'a2-s2',
        title: 'Raise and prices',
        description: 'Your pay rises 3% while CPI rises 5%.',
        choices: [
          {
            id: 'c1',
            label: 'Real pay fell',
            outcome: {
              meterChanges: { nominal: 3, infl: 5, real: -6 },
              feedback: 'Purchasing power drops when inflation beats your raise.',
            },
          },
          {
            id: 'c2',
            label: 'You are better off in real terms',
            outcome: {
              meterChanges: { nominal: 3, infl: 5, real: 5 },
              feedback: 'Nominal up does not mean real up if prices rose faster.',
            },
          },
          {
            id: 'c3',
            label: 'Inflation does not affect real pay',
            outcome: {
              meterChanges: { nominal: 0, infl: 0, real: -3 },
              feedback: 'Real is what matters for what you can buy.',
            },
          },
        ],
      },
      {
        id: 'a2-s3',
        title: 'Deflator 120',
        description: 'GDP deflator = 120 vs base 100.',
        choices: [
          {
            id: 'c1',
            label: 'Price level +20% vs base',
            outcome: {
              meterChanges: { nominal: 5, infl: -2, real: 4 },
              feedback: 'Deflator 120 means aggregate prices are 20% above the base year.',
            },
          },
          {
            id: 'c2',
            label: 'Real GDP is 120% of nominal',
            outcome: {
              meterChanges: { nominal: -3, infl: 8, real: -8 },
              feedback: 'Inverted—deflator relates nominal to real, not that statement.',
            },
          },
          {
            id: 'c3',
            label: 'Economy shrank 20%',
            outcome: {
              meterChanges: { nominal: -5, infl: 0, real: -10 },
              feedback: 'Deflator is a price index level, not a growth rate by itself.',
            },
          },
        ],
      },
    ],
  },

  'macro-1-lesson-3': {
    title: 'Per Capita Simulator',
    description: 'Track GDP, population, and income per person.',
    meters: [
      { id: 'gdp', label: 'GDP growth', value: 4, min: -5, max: 12, unit: '%', icon: '📈', hint: 'Total pie' },
      { id: 'pop', label: 'Population growth', value: 3, min: -2, max: 8, unit: '%', icon: '👥', hint: 'More people' },
      { id: 'pc', label: 'GDP per capita', value: 2, min: -8, max: 12, unit: '%', icon: '🧑‍💼', hint: 'Per person' },
    ],
    scenarios: [
      {
        id: 'a3-s1',
        title: 'Immigration wave',
        description: 'Population +3%, GDP +4% this year.',
        choices: [
          {
            id: 'c1',
            label: 'Per capita rises ~1%',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: 6 },
              feedback: 'Roughly GDP growth minus population growth if shares are stable.',
            },
          },
          {
            id: 'c2',
            label: 'Everyone is 4% richer automatically',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: -8 },
              feedback: 'Total GDP rose, but more people share it—per capita moves less.',
            },
          },
          {
            id: 'c3',
            label: 'Per capita falls because population grew',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: -4 },
              feedback: 'Here GDP outpaced population—per capita still rises slightly.',
            },
          },
        ],
      },
      {
        id: 'a3-s2',
        title: 'Productivity push',
        description: 'Training boosts output per worker sharply.',
        choices: [
          {
            id: 'c1',
            label: 'Raises long-run GDP per capita',
            outcome: {
              meterChanges: { gdp: 8, pop: 0, pc: 12 },
              feedback: 'Human capital and technology lift living standards.',
            },
          },
          {
            id: 'c2',
            label: 'Only helps firms, not people',
            outcome: {
              meterChanges: { gdp: -3, pop: 0, pc: -6 },
              feedback: 'Higher productivity generally supports wages and output per person over time.',
            },
          },
          {
            id: 'c3',
            label: 'Shows up only in nominal GDP',
            outcome: {
              meterChanges: { gdp: 2, pop: 0, pc: 0 },
              feedback: 'Real productivity lifts what the economy can produce.',
            },
          },
        ],
      },
      {
        id: 'a3-s3',
        title: 'Rule of 70',
        description: 'Real GDP per capita grows 2% a year.',
        choices: [
          {
            id: 'c1',
            label: 'Doubles in ~35 years',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: 8 },
              feedback: '70 ÷ 2 ≈ 35 years to double.',
            },
          },
          {
            id: 'c2',
            label: 'Doubles in 70 years',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: -10 },
              feedback: 'That would be 1% growth, not 2%.',
            },
          },
          {
            id: 'c3',
            label: 'Doubles in 14 years',
            outcome: {
              meterChanges: { gdp: 0, pop: 0, pc: -6 },
              feedback: 'That is closer to 5% growth.',
            },
          },
        ],
      },
    ],
  },

  'macro-1-lesson-4': {
    title: 'Business Cycle Simulator',
    description: 'Read mixed signals—GDP, jobs, and confidence rarely turn together.',
    meters: [
      { id: 'gdp', label: 'GDP growth', value: 1, min: -8, max: 8, unit: '%', icon: '📊', hint: 'Coincident' },
      { id: 'unemp', label: 'Unemployment', value: 5, min: 2, max: 12, unit: '%', icon: '📉', hint: 'Often lags' },
      { id: 'conf', label: 'Confidence', value: 45, min: 0, max: 100, unit: '%', icon: '💬', hint: 'Forward-looking' },
    ],
    scenarios: [
      {
        id: 'a4-s1',
        title: 'Soft landing talk',
        description: 'GDP still positive but slowing; hiring cools.',
        choices: [
          {
            id: 'c1',
            label: 'Late expansion—watch leading indicators',
            outcome: {
              meterChanges: { gdp: -1, unemp: 1, conf: -10 },
              feedback: 'Momentum can fade before GDP turns negative—confidence often moves early.',
            },
          },
          {
            id: 'c2',
            label: 'Recession already because hiring slowed',
            outcome: {
              meterChanges: { gdp: 2, unemp: -1, conf: 5 },
              feedback: 'Not yet—recessions usually need broad, sustained output loss.',
            },
          },
          {
            id: 'c3',
            label: 'Unemployment will fall immediately if GDP dips',
            outcome: {
              meterChanges: { gdp: -2, unemp: 3, conf: -5 },
              feedback: 'Unemployment often rises after GDP weakens—lagging indicator.',
            },
          },
        ],
      },
      {
        id: 'a4-s2',
        title: 'Stocks slide',
        description: 'Equity index falls 15% while jobs still grow.',
        choices: [
          {
            id: 'c1',
            label: 'Stocks can lead; GDP/jobs confirm later',
            outcome: {
              meterChanges: { gdp: 0, unemp: 0, conf: -15 },
              feedback: 'Leading indicators can warn before coincident data turns.',
            },
          },
          {
            id: 'c2',
            label: 'Ignore markets—jobs prove expansion',
            outcome: {
              meterChanges: { gdp: 1, unemp: -0.5, conf: 8 },
              feedback: 'Both matter—markets embed expectations earlier than payrolls.',
            },
          },
          {
            id: 'c3',
            label: 'Recession is impossible if unemployment is low',
            outcome: {
              meterChanges: { gdp: -1, unemp: 2, conf: -8 },
              feedback: 'Turns can start while unemployment is still low—lags matter.',
            },
          },
        ],
      },
      {
        id: 'a4-s3',
        title: 'Policy move',
        description: 'Central bank cuts rates; confidence stabilizes.',
        choices: [
          {
            id: 'c1',
            label: 'Aim to support demand and soften a downturn',
            outcome: {
              meterChanges: { gdp: 2, unemp: -0.5, conf: 18 },
              feedback: 'Counter-cyclical policy tries to cushion weak periods.',
            },
          },
          {
            id: 'c2',
            label: 'Immediately raises real GDP next quarter only',
            outcome: {
              meterChanges: { gdp: 5, unemp: -2, conf: 5 },
              feedback: 'Transmission takes time—effects are uncertain and gradual.',
            },
          },
          {
            id: 'c3',
            label: 'Fixes supply shocks instantly',
            outcome: {
              meterChanges: { gdp: 0, unemp: 1, conf: -5 },
              feedback: 'Demand tools cannot solve every supply-side problem.',
            },
          },
        ],
      },
    ],
  },
};

export function getEconomicsHandsOnForLesson(lessonId: string): EconomicsHandsOnConfig | undefined {
  return ECONOMICS_HANDS_ON_BY_LESSON[lessonId];
}
