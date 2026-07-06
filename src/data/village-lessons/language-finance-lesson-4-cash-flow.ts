import type { VillageLesson } from '@/types/village-lesson';

export const languageFinanceLesson4: VillageLesson = {
  id: 'lf-4-cash-flow-statement',
  moduleId: 'language-finance',
  unitLabel: 'Unit 4: Reality Check',
  title: 'Statement of Cash Flows',
  estimatedMinutes: 9,
  hook: {
    question: 'A company reports $50M profit. Six months later it is bankrupt. How is that possible?',
    philMessage:
      'Profit is an opinion built on accrual rules. Cash is a fact in the bank. The cash flow statement is the truth filter — read it or get fooled.',
  },
  concepts: [
    {
      id: 'three_buckets',
      emoji: '🌊',
      title: 'Three Cash Buckets',
      body: 'The cash flow statement sorts every dollar of cash movement into three rivers. Operating Cash Flow (CFO) is the core business at work: collecting from customers, paying workers and suppliers — the river that must eventually run positive or the company dies. Investing Cash Flow (CFI) tracks buying and selling long-term assets: negative CFI often means healthy growth spending on factories and acquisitions. Financing Cash Flow (CFF) is money moving between the company and its funders — taking loans, issuing stock, paying dividends, buying back shares. Add the three rivers together and you get the net change in cash: the truest single line in all of accounting.',
      realWorldExample:
        'Amazon once ran huge operating cash but negative investing cash while building warehouses — growth spending shows up in CFI, not as "expense" on day one.',
    },
    {
      id: 'cfo_vs_income',
      emoji: '⚡',
      title: 'Why CFO ≠ Net Income',
      body: 'Net income is an opinion; cash is a fact. Net income includes non-cash charges like depreciation and stock compensation, plus accrual timing — sales booked as revenue before a single dollar arrives. Operating cash flow un-spins all of it: start with net income, add back the non-cash charges, subtract receivables that grew (sales not yet collected), add payables that grew (bills not yet paid). What remains is the cash that actually moved. This reconciliation is why sophisticated investors read the cash flow statement first — a company can massage its earnings line with accounting choices, but faking actual cash movement requires outright fraud, which is much harder to hide.',
      realWorldExample:
        'Blockbuster showed profits while operating cash weakened for years — the cash flow statement predicted failure before the income statement did.',
    },
    {
      id: 'divergence',
      emoji: '🔥',
      title: 'Profit vs Cash Divergence',
      body: 'Here\'s the paradox that kills ambitious companies: growing fast burns cash. To grow, you build inventory before anyone buys it, extend credit so customers pay in 60 days, and pour money into new locations and equipment. On the income statement, everything looks glorious — revenue up, net income green. Meanwhile operating cash flow turns negative because the money is flying out today and coming back later, if ever. Payroll, rent, and utilities only accept cash, so when the bank account hits zero, the "profitable" company stops operating. This is why founders repeat the mantra: revenue is vanity, profit is sanity, cash is reality.',
      realWorldExample:
        'Small suppliers serving big retailers often wait 60–90 days for payment — profitable on paper, broke on payday without a credit line.',
    },
    {
      id: 'fcf',
      emoji: '💰',
      title: 'Free Cash Flow',
      body: 'Free Cash Flow (FCF) is the money that\'s truly free: Operating Cash Flow minus capital expenditures (capex) — the spending required just to keep the lights on and machines running. What survives is cash the company can deploy however it wants: pay down debt, send dividends to owners, buy back shares, or fund the next big bet. That optionality is why many professionals call FCF the most important number in finance. It\'s also the ultimate hype detector: a company with a soaring stock price and years of negative free cash flow is running on investor faith, and faith has an expiration date. Real businesses eventually mint real, free cash.',
      realWorldExample:
        'Microsoft converts a large share of revenue to free cash — one reason quality investors trust the story beyond EPS headlines.',
    },
  ],
  simulator: {
    title: 'Cash Crunch Event',
    intro:
      'Net income is positive and green. Your bank balance hits zero. Choose how to survive the week.',
    scenario:
      'Manufacturing co: $20M revenue, 5% net margin, big order fulfilled, customers pay in 90 days, $400k cash, $600k monthly burn.',
    meters: [
      { id: 'runway', label: 'Cash Runway', emoji: '⏱️', initial: 35, color: 'red' },
      { id: 'trust', label: 'Stakeholder Trust', emoji: '🤝', initial: 60, color: 'blue' },
      { id: 'quality', label: 'Report Quality', emoji: '✨', initial: 70, color: 'green' },
    ],
    rounds: [
      {
        id: 'r1',
        situation: '$3M receivables, 90-day terms. Payroll in 10 days. First move?',
        choices: [
          {
            id: 'factor',
            label: 'Factor $2M receivables at 92¢ on the dollar',
            description: 'Costly but fast cash.',
            effects: { runway: +35, trust: -5, quality: +5 },
            feedback:
              'Expensive (~8% annualized) but buys runway. CFO negative while profit positive — classic working capital squeeze.',
          },
          {
            id: 'discount',
            label: 'Offer 2% discount for payment within 10 days',
            description: 'Speed collections.',
            effects: { runway: +25, trust: +15, quality: +10 },
            feedback:
              'Legal and relationship-friendly. Not all customers can pay early — but improves operating cash without cooking books.',
          },
          {
            id: 'ignore',
            label: 'Trust net income — wait for customers',
            description: 'Hope accrual pays bills.',
            effects: { runway: -25, trust: -20, quality: -15 },
            feedback:
              'Profit does not pay Friday’s payroll — cash does. Waiting risks missing payroll and supplier defaults.',
          },
        ],
      },
      {
        id: 'r2',
        situation: 'CFO is negative because inventory piled up unsold. Fix operations?',
        choices: [
          {
            id: 'slow_prod',
            label: 'Slow production — stop building more inventory',
            description: 'Operating fix.',
            effects: { runway: +15, trust: +10, quality: +15 },
            feedback:
              'Operating cash improves when you stop bleeding cash into shelves. Growth too fast without sales is a cash killer.',
          },
          {
            id: 'book_rev',
            label: 'Recognize next quarter sales early',
            description: 'Accounting trick.',
            effects: { runway: -10, trust: -25, quality: -30 },
            feedback:
              'Income statement looks better; bank still empty. Fraud path — auditors compare cash to earnings.',
          },
          {
            id: 'loan',
            label: 'Emergency 18% bridge loan',
            description: 'Financing fix.',
            effects: { runway: +30, trust: -10, quality: +0 },
            feedback:
              'CFF inflow saves the week but costs interest — better paired with collection fixes, or debt spirals.',
          },
        ],
      },
      {
        id: 'r3',
        situation: 'Stabilized. Bank offers revolver at 8% or equity investor for 20% ownership.',
        choices: [
          {
            id: 'revolver',
            label: '$2M revolving credit line',
            description: 'Debt, keep ownership.',
            effects: { runway: +25, trust: +10, quality: +10 },
            feedback:
              'Matches working-capital businesses — pay interest only when drawn. Financing cash flow supports operations.',
          },
          {
            id: 'equity',
            label: 'Sell 20% equity for $2M',
            description: 'Permanent partner.',
            effects: { runway: +20, trust: +5, quality: +5 },
            feedback:
              'Cash arrives via CFF but you diluted forever — sometimes right for turnaround, costly if profits return.',
          },
          {
            id: 'bootstrap',
            label: 'Refuse both — cut costs to the bone',
            description: 'No external capital.',
            effects: { runway: +10, trust: 0, quality: +15 },
            feedback:
              'Discipline helps CFO long-term; ensure cuts do not kill the product customers owe you for.',
          },
        ],
      },
    ],
    endMessage:
      'The cash flow statement answers one question: did the bank account actually get stronger? Never invest or work for a company until you ask that.',
  },
  quiz: [
    {
      id: 'q1',
      question: 'Operating cash flow mainly reflects:',
      options: [
        { id: 'a', text: 'Core business cash in and out' },
        { id: 'b', text: 'Only stock buybacks' },
        { id: 'c', text: 'CEO salary forecasts' },
        { id: 'd', text: 'Tax rates in Europe' },
      ],
      correctId: 'a',
      explanation: 'CFO = cash from running the business itself.',
    },
    {
      id: 'q2',
      question: 'Buying a factory appears in:',
      options: [
        { id: 'a', text: 'Investing cash flows' },
        { id: 'b', text: 'Operating cash flows only' },
        { id: 'c', text: 'Gross profit' },
        { id: 'd', text: 'Shareholders equity directly' },
      ],
      correctId: 'a',
      explanation: 'Long-term asset purchases are CFI — capital deployment.',
    },
    {
      id: 'q3',
      question: 'High net income with negative operating cash flow often signals:',
      options: [
        { id: 'a', text: 'Earnings not converting to cash yet' },
        { id: 'b', text: 'Perfect health' },
        { id: 'c', text: 'Too much cash' },
        { id: 'd', text: 'No accrual accounting' },
      ],
      correctId: 'a',
      explanation: 'Receivables/inventory growth can trap paper profit.',
    },
    {
      id: 'q4',
      question: 'Free cash flow is typically:',
      options: [
        { id: 'a', text: 'Operating cash flow minus capex' },
        { id: 'b', text: 'Revenue minus COGS' },
        { id: 'c', text: 'Net income plus goodwill' },
        { id: 'd', text: 'Total assets' },
      ],
      correctId: 'a',
      explanation: 'Cash after maintaining/growing productive assets.',
    },
    {
      id: 'q5',
      question: 'Paying dividends to shareholders is classified as:',
      options: [
        { id: 'a', text: 'Financing cash outflow' },
        { id: 'b', text: 'Operating expense' },
        { id: 'c', text: 'COGS' },
        { id: 'd', text: 'Investing in inventory' },
      ],
      correctId: 'a',
      explanation: 'Returning cash to owners is a financing activity (CFF).',
    },
  ],
  rewards: { xp: 135, bamboo: 18 },
};
