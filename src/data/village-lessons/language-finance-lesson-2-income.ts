import type { VillageLesson } from '@/types/village-lesson';

export const languageFinanceLesson2: VillageLesson = {
  id: 'lf-2-income-statement',
  moduleId: 'language-finance',
  unitLabel: 'Unit 2: Waterfall',
  title: 'The Income Statement',
  estimatedMinutes: 9,
  hook: {
    question:
      'A company reports $5 billion in revenue. Is that good? You need four more numbers before that question even makes sense.',
    philMessage:
      'The income statement is a waterfall — dollars fall through COGS, operating costs, interest, and taxes until only the bottom line is left. Learn the ladder and earnings headlines stop confusing you.',
  },
  concepts: [
    {
      id: 'waterfall',
      emoji: '📉',
      title: 'The P&L Waterfall',
      body: 'The income statement (also called the P&L) tells the story of a period — a quarter or a year — as a waterfall from top to bottom. Start at Gross Revenue: every dollar customers paid. Subtract Cost of Goods Sold (COGS), the direct cost of making what you sold, to get Gross Profit. Subtract Operating Expenses (OPEX) — rent, salaries, marketing — to reach Operating Income (EBIT), the profit from actually running the business. Finally subtract interest and taxes to arrive at Net Income, the famous "bottom line" that belongs to owners. Each level of the waterfall reveals where money leaks out.',
      realWorldExample:
        'AP Business with Personal Finance expects this exact ladder: Revenue − COGS = Gross Profit; Gross Profit − OPEX = EBIT; EBIT − interest & taxes = Net Income.',
    },
    {
      id: 'cogs_opex',
      emoji: '🏭',
      title: 'COGS vs OPEX',
      body: 'The COGS-versus-OPEX split is really the variable-versus-fixed split, and it shapes how a business scales. COGS tracks costs tied directly to each unit sold — the fabric in every hoodie, the shipping on every order, the factory power per batch. Sell twice as much, and COGS roughly doubles. OPEX is the structural overhead that exists regardless of volume — headquarters rent, executive salaries, the Super Bowl ad. A sneaker brand\'s COGS spikes with every pair made, while its marketing team costs the same whether the launch sells out or flops. Businesses with low COGS per unit (like software) can scale profits explosively; high-COGS businesses grind for every margin point.',
      realWorldExample:
        'During a slowdown, firms cut OPEX first (hiring freeze). COGS only falls if they make fewer units or negotiate cheaper inputs.',
    },
    {
      id: 'margins',
      emoji: '📊',
      title: 'Margins Tell the Model',
      body: 'Margins convert raw profit dollars into percentages, which is what makes companies comparable. Gross Margin (Gross Profit ÷ Revenue) shows how much of each sales dollar survives the direct cost of making the product. Operating Margin (EBIT ÷ Revenue) shows what survives after running the whole company. Net Margin (Net Income ÷ Revenue) is what finally reaches owners. Context is everything: software companies often post 70%+ gross margins because copying code costs nothing, while grocery chains grind at around 25% and win on volume. Always compare margins within an industry — judging a grocer by software standards tells you nothing.',
      realWorldExample:
        'Microsoft ~70% gross margin vs Walmart ~24% — both can be great businesses with different physics.',
    },
    {
      id: 'quality',
      emoji: '🔍',
      title: 'Earnings Quality',
      body: 'Two companies can report identical net income and be in completely different health — that\'s why analysts talk about earnings "quality." High-quality earnings come from the core business doing its job, repeat reliably, and eventually show up as actual cash in the bank. Low-quality earnings lean on tricks: booking revenue aggressively early, dressing up one-time gains as if they\'ll repeat, or burying real expenses in footnotes. The classic tell that forensic accountants watch: receivables (money owed by customers) growing much faster than sales. That means "profits" are piling up as IOUs instead of cash — and IOUs sometimes never arrive.',
      realWorldExample:
        'Enron’s income statement looked strong; cash flow told the truth. Investors who read both avoided the wipeout.',
    },
  ],
  simulator: {
    title: 'P&L Builder',
    intro:
      'Raw metrics only — no valuation multiples until you calculate the waterfall correctly.',
    scenario: 'Startup pitch deck hides multiples. You see: Revenue $100k, COGS $40k, Operating Expenses $25k, Interest+Tax $5k.',
    meters: [
      { id: 'math', label: 'Calculation Skill', emoji: '🧮', initial: 40, color: 'blue' },
      { id: 'unlock', label: 'Valuation Unlocked', emoji: '🔓', initial: 0, color: 'green' },
      { id: 'cred', label: 'Credibility', emoji: '🎯', initial: 50, color: 'yellow' },
    ],
    rounds: [
      {
        id: 'r1',
        situation: 'What is Gross Profit?',
        choices: [
          {
            id: '60k',
            label: '$60,000',
            description: 'Revenue minus COGS.',
            effects: { math: +25, unlock: +20, cred: +15 },
            feedback: '$100k − $40k = $60k gross profit. Top of the waterfall after direct costs.',
          },
          {
            id: '75k',
            label: '$75,000',
            description: 'Revenue minus OPEX only.',
            effects: { math: -15, unlock: 0, cred: -10 },
            feedback: 'That skipped COGS — you subtracted operating expenses too early.',
          },
          {
            id: '100k',
            label: '$100,000',
            description: 'Same as revenue.',
            effects: { math: -20, unlock: 0, cred: -15 },
            feedback: 'Revenue is the top line, not gross profit. COGS exists for a reason.',
          },
        ],
      },
      {
        id: 'r2',
        situation: 'What is Operating Income (EBIT)?',
        choices: [
          {
            id: '35k',
            label: '$35,000',
            description: 'Gross profit minus OPEX.',
            effects: { math: +25, unlock: +30, cred: +20 },
            feedback: '$60k − $25k = $35k EBIT. Core business profit before financing and taxes.',
          },
          {
            id: '60k',
            label: '$60,000',
            description: 'Same as gross profit.',
            effects: { math: -10, unlock: +5, cred: -5 },
            feedback: 'You forgot $25k of operating expenses — rent, salaries, ads.',
          },
          {
            id: '15k',
            label: '$15,000',
            description: 'After interest and tax already.',
            effects: { math: -10, unlock: 0, cred: -10 },
            feedback: 'That is closer to net income — EBIT comes before interest and taxes.',
          },
        ],
      },
      {
        id: 'r3',
        situation: 'Net Income after $5k interest and taxes?',
        choices: [
          {
            id: '30k',
            label: '$30,000',
            description: 'EBIT minus $5k.',
            effects: { math: +20, unlock: +25, cred: +25 },
            feedback: '$35k − $5k = $30k net income. Multiples now mean something — you know the bottom line.',
          },
          {
            id: '35k',
            label: '$35,000',
            description: 'Stop at EBIT.',
            effects: { math: 0, unlock: +10, cred: 0 },
            feedback: 'EBIT is not what shareholders ultimately keep — lenders and governments take their slice.',
          },
          {
            id: '95k',
            label: '$95,000',
            description: 'Revenue minus only taxes.',
            effects: { math: -25, unlock: 0, cred: -20 },
            feedback: 'You cannot ignore both COGS and OPEX — that is how hype valuations fool beginners.',
          },
        ],
      },
    ],
    endMessage:
      'Revenue is vanity, profit is sanity — but only if you know which rung of the waterfall you are staring at.',
  },
  quiz: [
    {
      id: 'q1',
      question: 'Gross Profit equals:',
      options: [
        { id: 'a', text: 'Revenue minus Cost of Goods Sold' },
        { id: 'b', text: 'Revenue minus all expenses' },
        { id: 'c', text: 'Net income plus taxes' },
        { id: 'd', text: 'Operating income minus COGS' },
      ],
      correctId: 'a',
      explanation: 'First waterfall step after direct production costs.',
    },
    {
      id: 'q2',
      question: 'Operating Income (EBIT) is:',
      options: [
        { id: 'a', text: 'Gross Profit minus operating expenses' },
        { id: 'b', text: 'Revenue minus COGS only' },
        { id: 'c', text: 'Cash from customers' },
        { id: 'd', text: 'Assets minus liabilities' },
      ],
      correctId: 'a',
      explanation: 'Core profitability before interest and taxes.',
    },
    {
      id: 'q3',
      question: 'COGS for a sneaker brand includes:',
      options: [
        { id: 'a', text: 'Corporate HQ lease and CEO salary' },
        { id: 'b', text: 'Materials and manufacturing per pair sold' },
        { id: 'c', text: 'Stock buybacks' },
        { id: 'd', text: 'Income taxes' },
      ],
      correctId: 'b',
      explanation: 'COGS = direct cost of units sold; HQ costs are OPEX.',
    },
    {
      id: 'q4',
      question: 'Receivables growing much faster than revenue suggests:',
      options: [
        { id: 'a', text: 'Strong cash collection' },
        { id: 'b', text: 'Possible earnings quality problems' },
        { id: 'c', text: 'Lower gross margin' },
        { id: 'd', text: 'Higher COGS' },
      ],
      correctId: 'b',
      explanation: 'Sales booked but cash not collected — forensic red flag.',
    },
    {
      id: 'q5',
      question: 'With $100k revenue and 30% net margin, net income is:',
      options: [
        { id: 'a', text: '$30,000' },
        { id: 'b', text: '$70,000' },
        { id: 'c', text: '$100,000' },
        { id: 'd', text: '$3,000' },
      ],
      correctId: 'a',
      explanation: 'Net margin × revenue = bottom line ($30k).',
    },
  ],
  rewards: { xp: 130, bamboo: 17 },
};
