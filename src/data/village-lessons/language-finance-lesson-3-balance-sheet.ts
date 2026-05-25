import type { VillageLesson } from '@/types/village-lesson';

export const languageFinanceLesson3: VillageLesson = {
  id: 'lf-3-balance-sheet',
  moduleId: 'language-finance',
  unitLabel: 'Unit 3: Anchor',
  title: 'The Balance Sheet',
  estimatedMinutes: 9,
  hook: {
    question:
      'What would you need to know to tell if a company is healthy — or secretly one bad quarter from disaster?',
    philMessage:
      'The balance sheet is a frozen photograph: what you own, what you owe, and what is left for owners. One equation holds the whole picture together.',
  },
  concepts: [
    {
      id: 'equation',
      emoji: '⚖️',
      title: 'Assets = Liabilities + Equity',
      body: 'Assets are resources that create future value — cash, inventory, equipment, patents. Liabilities are obligations to outsiders — loans, unpaid bills, deferred revenue. Shareholders\' Equity is the residual claim after all debts. The equation always balances.',
      realWorldExample:
        'Lehman Brothers carried extreme leverage — tiny equity slice meant a small asset drop wiped owners out. Balance sheet ratios warned fragility before headlines did.',
    },
    {
      id: 'assets',
      emoji: '💎',
      title: 'What You Own',
      body: 'Current assets convert within a year: cash, accounts receivable, inventory. Non-current assets are long-term: property, plant & equipment (PP&E), intangibles, goodwill after acquisitions. Goodwill is the premium paid above book value in a deal.',
      realWorldExample:
        'Coca-Cola’s brand lives partly as intangible assets — factories matter, but so does decades of customer habit.',
    },
    {
      id: 'liabilities',
      emoji: '🔗',
      title: 'What You Owe',
      body: 'Current liabilities due within a year: payables, short-term debt, deferred revenue (cash received, service not yet delivered). Long-term liabilities include bonds and leases. Leverage can amplify returns — or amplify collapse if revenue stalls.',
      realWorldExample:
        'Netflix carries billions in content debt with subscription cash backing it. WeWork had debt without matching cash flow — same line items, opposite survival odds.',
    },
    {
      id: 'liquidity',
      emoji: '💧',
      title: 'Liquidity: Can You Pay Tomorrow?',
      body: 'Liquidity measures how fast assets become cash without fire-sale discounts. Cash is most liquid; factories and specialized patents are illiquid. If debts mature soon but wealth is tied in slow assets, insolvency hits despite "million-dollar" book value.',
      realWorldExample:
        'Current ratio = Current Assets ÷ Current Liabilities. Below 1.0 flashes short-term danger — especially for firms serving low-income communities with thin buffers.',
    },
  ],
  simulator: {
    title: 'Liquidity Ladder',
    intro: 'Sort corporate items from most liquid to least — before the clock runs out on a credit review.',
    scenario: 'Credit committee asks: which assets could pay next month’s payroll?',
    meters: [
      { id: 'sort_skill', label: 'Sort Accuracy', emoji: '🪜', initial: 45, color: 'blue' },
      { id: 'credit', label: 'Credit Score', emoji: '🏦', initial: 50, color: 'green' },
      { id: 'risk', label: 'Insolvency Risk', emoji: '⚠️', initial: 55, color: 'red' },
    ],
    rounds: [
      {
        id: 'r1',
        situation: 'Which asset is MOST liquid?',
        choices: [
          {
            id: 'cash',
            label: 'Petty cash & checking accounts',
            description: 'Spend today.',
            effects: { sort_skill: +25, credit: +15, risk: -15 },
            feedback: 'Cash is king for payroll Friday — no conversion needed.',
          },
          {
            id: 'factory',
            label: 'Factory machinery',
            description: 'Heavy equipment.',
            effects: { sort_skill: -20, credit: -10, risk: +20 },
            feedback: 'Machinery takes months to sell — useless for tomorrow’s bills.',
          },
          {
            id: 'patent',
            label: 'Drug patent',
            description: 'Intangible.',
            effects: { sort_skill: -15, credit: -5, risk: +15 },
            feedback: 'Valuable strategically, but not a quick cash faucet.',
          },
        ],
      },
      {
        id: 'r2',
        situation: 'Rank the next tier — still fairly liquid.',
        choices: [
          {
            id: 'ar',
            label: 'Accounts receivable (30-day invoices)',
            description: 'Cash soon if customers pay.',
            effects: { sort_skill: +20, credit: +10, risk: -10 },
            feedback: 'Receivables are liquid only if customers are creditworthy — watch 90+ day aging.',
          },
          {
            id: 'inventory',
            label: 'Seasonal sneaker inventory',
            description: 'Must sell first.',
            effects: { sort_skill: +10, credit: +5, risk: 0 },
            feedback: 'Inventory is middle liquidity — markdowns may be needed to move units fast.',
          },
          {
            id: 'ppe',
            label: 'Warehouse building',
            description: 'Real estate.',
            effects: { sort_skill: -15, credit: -5, risk: +10 },
            feedback: 'Property is illiquid — sales take time and legal work.',
          },
        ],
      },
      {
        id: 'r3',
        situation: 'Two software firms: same profit. A has $80M cash; B has $5M cash and $60M slow receivables. Pick for emergency credit line.',
        choices: [
          {
            id: 'a',
            label: 'Company A — cash-heavy',
            description: 'Liquidity wins.',
            effects: { sort_skill: +25, credit: +25, risk: -20 },
            feedback: 'Profit without liquidity fails stress tests — A survives a downturn.',
          },
          {
            id: 'b',
            label: 'Company B — higher "growth"',
            description: 'Ignore balance sheet.',
            effects: { sort_skill: -20, credit: -20, risk: +25 },
            feedback: 'B may be profitable on paper but one collections crunch away from missing payroll.',
          },
          {
            id: 'more',
            label: 'Need aging schedule on receivables first',
            description: 'Due diligence.',
            effects: { sort_skill: +15, credit: +10, risk: -5 },
            feedback: 'Credit analysts dig before lending — you think like the job.',
          },
        ],
      },
    ],
    endMessage:
      'The balance sheet anchors everything else. Liquidity tells you whether the anchor holds when the storm hits.',
  },
  quiz: [
    {
      id: 'q1',
      question: 'The fundamental accounting equation is:',
      options: [
        { id: 'a', text: 'Revenue − Expenses = Profit' },
        { id: 'b', text: 'Assets = Liabilities + Equity' },
        { id: 'c', text: 'Cash = Net Income' },
        { id: 'd', text: 'Price = Earnings × P/E' },
      ],
      correctId: 'b',
      explanation: 'Double-entry balance sheet identity — always true.',
    },
    {
      id: 'q2',
      question: 'Deferred revenue is a liability because:',
      options: [
        { id: 'a', text: 'Cash was collected but service not yet earned' },
        { id: 'b', text: 'The company owes shareholders' },
        { id: 'c', text: 'Revenue was never received' },
        { id: 'd', text: 'It is always bad debt' },
      ],
      correctId: 'a',
      explanation: 'Prepaid subscriptions are obligations until delivered.',
    },
    {
      id: 'q3',
      question: 'Current ratio below 1.0 suggests:',
      options: [
        { id: 'a', text: 'Strong short-term liquidity' },
        { id: 'b', text: 'Current assets may not cover near-term bills' },
        { id: 'c', text: 'Zero debt' },
        { id: 'd', text: 'Record profit' },
      ],
      correctId: 'b',
      explanation: 'Current assets ÷ current liabilities < 1 — liquidity warning.',
    },
    {
      id: 'q4',
      question: 'Goodwill on a balance sheet usually comes from:',
      options: [
        { id: 'a', text: 'Charity donations' },
        { id: 'b', text: 'Acquisition premium over book value' },
        { id: 'c', text: 'Daily sales' },
        { id: 'd', text: 'Employee tips' },
      ],
      correctId: 'b',
      explanation: 'Paying above net assets in a merger creates goodwill.',
    },
    {
      id: 'q5',
      question: 'Most illiquid asset in a typical manufacturer:',
      options: [
        { id: 'a', text: 'Checking account cash' },
        { id: 'b', text: 'Specialized factory equipment' },
        { id: 'c', text: 'Petty cash' },
        { id: 'd', text: 'Undeposited checks' },
      ],
      correctId: 'b',
      explanation: 'Specialized PP&E takes time and discounts to convert to cash.',
    },
  ],
  rewards: { xp: 130, bamboo: 17 },
};
