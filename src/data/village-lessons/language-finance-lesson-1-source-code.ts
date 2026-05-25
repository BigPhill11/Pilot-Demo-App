import type { VillageLesson } from '@/types/village-lesson';

export const languageFinanceLesson1: VillageLesson = {
  id: 'lf-1-accounting-source-code',
  moduleId: 'language-finance',
  unitLabel: 'Unit 1: Source Code',
  title: 'The Core Source Code',
  estimatedMinutes: 9,
  hook: {
    question:
      'Wall Street shows you stock charts and hype headlines — but what language tells you if a company is actually healthy before the price moves?',
    philMessage:
      'Accounting is the source code of business. Finance builds bets on top of that code. If the history is wrong, every forecast is a guess with a blindfold on.',
  },
  concepts: [
    {
      id: 'accounting_vs_finance',
      emoji: '📜',
      title: 'Accounting vs Finance',
      body: 'Accounting is the backward-looking scoreboard: where every dollar came from, where it sits, and how it left. It values accuracy, legal rules, and historic cost. Finance is the forward-looking playbook: valuations, mergers, capital allocation, and risk bets. You cannot run reliable projections on fantasy baselines.',
      realWorldExample:
        'A credit analyst reads audited financials (accounting) before approving a loan. An investment banker builds a DCF model (finance) only after trusting those numbers. FP&A teams bridge both.',
    },
    {
      id: 'accrual',
      emoji: '📅',
      title: 'Cash vs Accrual Accounting',
      body: 'In daily life you use cash thinking: if you have $50, you can spend $50. Big companies use accrual accounting: revenue is recorded when goods or services are delivered, not when cash arrives. Expenses match the period they belong to. That gap is where "profitable" companies go bankrupt.',
      realWorldExample:
        'A sneaker startup signs a $500,000 delivery contract but gets paid in 90 days. Accrual may show huge revenue while the bank account is empty — payroll still due Friday.',
    },
    {
      id: 'integrity',
      emoji: '⚖️',
      title: 'Why Accuracy Is Power',
      body: 'GAAP and IFRS exist so statements are comparable and legally defensible. Auditors sample transactions to test whether records match reality. When accounting integrity breaks, credit lines freeze and stocks reprice overnight.',
      realWorldExample:
        'After reporting scandals, banks cut covenant limits for whole industries — especially hurting smaller firms with less bargaining power.',
    },
    {
      id: 'symptom_vs_source',
      emoji: '📈',
      title: 'Stock Prices Are Symptoms',
      body: 'Charts show what traders believe today. Financial statements show what the business actually did. As an investor or job candidate, statements help you ask: Is growth real? Is debt survivable? Is profit cash-backed?',
      realWorldExample:
        'Headlines scream "record earnings" while the cash flow statement shows the firm cannot pay suppliers — smart readers check both before buying shares or accepting a job offer.',
    },
  ],
  simulator: {
    title: 'The Accrual Trap',
    intro:
      'You are the bookkeeper for a hot virtual sneaker startup. A mega contract just landed — when do you record revenue?',
    scenario:
      'Contract signed today: deliver 10,000 pairs next year, $500,000 total. Bank balance: $12,000. Payroll next week: $18,000.',
    meters: [
      { id: 'accuracy', label: 'Books Accuracy', emoji: '✅', initial: 60, color: 'green' },
      { id: 'hype', label: 'Headline Hype', emoji: '📰', initial: 40, color: 'yellow' },
      { id: 'survival', label: 'Cash Survival', emoji: '💵', initial: 35, color: 'red' },
    ],
    rounds: [
      {
        id: 'r1',
        situation: 'Founder wants $500,000 revenue booked today because the contract is signed.',
        choices: [
          {
            id: 'signing',
            label: 'Record full $500k now — deal is signed',
            description: 'Cash-thinking / hype path.',
            effects: { accuracy: -25, hype: +30, survival: -15 },
            feedback:
              'Board deck looks amazing; bank still empty. Accrual rules (ASC 606) require delivery — premature revenue is a classic fraud red flag auditors hunt.',
          },
          {
            id: 'delivery',
            label: 'Record revenue only as pairs ship',
            description: 'Accrual path.',
            effects: { accuracy: +25, hype: -10, survival: +10 },
            feedback:
              'Correct. Revenue unlocks with performance. Finance can forecast from a real pipeline, not a paper fantasy.',
          },
          {
            id: 'deposit',
            label: 'Record $50k deposit only; rest when delivered',
            description: 'If customer prepaid partial — still not full revenue.',
            effects: { accuracy: +15, hype: +5, survival: +5 },
            feedback:
              'Deposits may be deferred revenue (a liability) until earned. Partial cash helps survival but does not equal $500k profit today.',
          },
        ],
      },
      {
        id: 'r2',
        situation: 'Investor call tonight. Founder asks you to "smooth" numbers so valuation pops.',
        choices: [
          {
            id: 'comply',
            label: 'Inflate Q4 recognition — hit the narrative',
            description: 'Short-term hype.',
            effects: { accuracy: -30, hype: +20, survival: -10 },
            feedback:
              'You traded integrity for a meeting. Due diligence later will compare bank statements to the income statement — mismatches kill deals and careers.',
          },
          {
            id: 'honest',
            label: 'Show signed backlog separately from earned revenue',
            description: 'Transparent pipeline.',
            effects: { accuracy: +20, hype: +5, survival: +5 },
            feedback:
              'Sophisticated investors prefer honest pipelines. Contracted backlog is valuable — without pretending it is already profit.',
          },
          {
            id: 'delay',
            label: 'Postpone investor call until after first shipment',
            description: 'Buy time for real data.',
            effects: { accuracy: +10, hype: -15, survival: +15 },
            feedback:
              'Less glamorous, but you avoid misleading capital. Many underserved founders get hurt by predatory terms when hype outruns cash.',
          },
        ],
      },
      {
        id: 'r3',
        situation: 'Payroll is due. You have $12k cash and $18k payroll. Contract cash arrives in 90 days.',
        choices: [
          {
            id: 'bridge',
            label: 'Negotiate short-term line of credit',
            description: 'Finance tool on real contract.',
            effects: { accuracy: +5, hype: 0, survival: +25 },
            feedback:
              'Accounting told the truth about cash; finance solved timing with credit — the normal business bridge when accrual profit ≠ cash yet.',
          },
          {
            id: 'delay_pay',
            label: 'Delay payroll without telling staff',
            description: 'Hide the gap.',
            effects: { accuracy: -15, hype: +5, survival: +5 },
            feedback:
              'Cash crisis hidden from books and people — destroys trust. Operating integrity matters as much as GAAP.',
          },
          {
            id: 'fake_rev',
            label: 'Book revenue early to show profit for the bank',
            description: 'Cook the books.',
            effects: { accuracy: -35, hype: +15, survival: -20 },
            feedback:
              'Bank may lend once; auditors or regulators later find the gap. Accounting fraud turns a timing problem into a legal catastrophe.',
          },
        ],
      },
    ],
    endMessage:
      'Accounting is not tax paperwork — it is the language that tells you whether finance and stock prices have something real underneath.',
  },
  quiz: [
    {
      id: 'q1',
      question: 'Accounting is best described as:',
      options: [
        { id: 'a', text: 'Predicting next year stock prices' },
        { id: 'b', text: 'Recording and reporting what already happened with rules' },
        { id: 'c', text: 'Only calculating taxes' },
        { id: 'd', text: 'Marketing financial products' },
      ],
      correctId: 'b',
      explanation: 'Accounting is the historic, rules-based scoreboard finance builds on.',
    },
    {
      id: 'q2',
      question: 'Under accrual accounting, revenue is generally recognized when:',
      options: [
        { id: 'a', text: 'Cash hits the bank only' },
        { id: 'b', text: 'The contract is imagined' },
        { id: 'c', text: 'Goods or services are delivered' },
        { id: 'd', text: 'Stock price rises' },
      ],
      correctId: 'c',
      explanation: 'Performance triggers revenue — not signing alone.',
    },
    {
      id: 'q3',
      question: 'A company can show profit on the income statement but fail because:',
      options: [
        { id: 'a', text: 'Cash has not arrived to pay bills' },
        { id: 'b', text: 'Profit is illegal' },
        { id: 'c', text: 'Accrual accounting bans revenue' },
        { id: 'd', text: 'Banks refuse all deposits' },
      ],
      correctId: 'a',
      explanation: 'Accrual profit ≠ cash on hand — timing gaps kill weak balance sheets.',
    },
    {
      id: 'q4',
      question: 'Finance mainly uses accounting data to:',
      options: [
        { id: 'a', text: 'File employee lunch receipts' },
        { id: 'b', text: 'Value companies and allocate capital forward' },
        { id: 'c', text: 'Eliminate all risk' },
        { id: 'd', text: 'Set grocery prices' },
      ],
      correctId: 'b',
      explanation: 'Finance projects, prices, and decides bets using accounting baselines.',
    },
    {
      id: 'q5',
      question: 'Before trusting a DCF valuation, you should first:',
      options: [
        { id: 'a', text: 'Ignore the financial statements' },
        { id: 'b', text: 'Check whether accounting numbers are accurate and consistent' },
        { id: 'c', text: 'Only read social media' },
        { id: 'd', text: 'Assume revenue equals cash' },
      ],
      correctId: 'b',
      explanation: 'Garbage historic data → garbage forecasts. Accounting quality comes first.',
    },
  ],
  rewards: { xp: 120, bamboo: 15 },
};
