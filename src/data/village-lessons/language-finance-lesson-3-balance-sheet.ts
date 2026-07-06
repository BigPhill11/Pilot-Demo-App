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
      body: 'The balance sheet is a photograph of a company\'s financial position at one instant, organized by an equation that cannot break: Assets = Liabilities + Shareholders\' Equity. Assets are resources that create future value — cash, inventory, equipment, patents. Liabilities are obligations owed to outsiders — loans, unpaid bills, deferred revenue. Shareholders\' Equity is the residual: what would be left for owners if every asset were sold and every debt paid. The equation always balances because it\'s just logic — everything the company has was funded either by borrowing it or by owners\' money. Read it and you know who really owns what.',
      realWorldExample:
        'Lehman Brothers carried extreme leverage — tiny equity slice meant a small asset drop wiped owners out. Balance sheet ratios warned fragility before headlines did.',
    },
    {
      id: 'assets',
      emoji: '💎',
      title: 'What You Own',
      body: 'Assets are sorted by how fast they turn into cash. Current assets convert within a year: cash itself, accounts receivable (money customers owe), and inventory waiting to be sold. Non-current assets are the long-term machinery of the business: property, plant & equipment (PP&E), plus intangibles like patents and brands. The strangest resident is goodwill — when one company buys another for more than its assets are technically worth, the premium gets parked on the balance sheet as goodwill. It represents things like reputation and customer loyalty, but if the acquisition sours, goodwill gets "written down" and profits take the hit years later.',
      realWorldExample:
        'Coca-Cola’s brand lives partly as intangible assets — factories matter, but so does decades of customer habit.',
    },
    {
      id: 'liabilities',
      emoji: '🔗',
      title: 'What You Owe',
      body: 'Liabilities are sorted by the same clock as assets. Current liabilities come due within a year: supplier payables, short-term debt, and deferred revenue — cash customers already paid for services not yet delivered (yes, that\'s a debt: you owe them the service). Long-term liabilities include bonds and multi-year leases. Debt\'s double edge is called leverage: borrowing lets a company control more assets than its own money could buy, which amplifies returns when business is good — and amplifies destruction when revenue stalls, because interest payments don\'t pause for bad quarters. The balance sheet shows exactly how much amplification a company is running.',
      realWorldExample:
        'Netflix carries billions in content debt with subscription cash backing it. WeWork had debt without matching cash flow — same line items, opposite survival odds.',
    },
    {
      id: 'liquidity',
      emoji: '💧',
      title: 'Liquidity: Can You Pay Tomorrow?',
      body: 'Liquidity measures how quickly an asset becomes spendable cash without taking a fire-sale discount. Cash is perfectly liquid; a factory or a specialized patent might take a year to sell at fair value. Here\'s why it can be fatal: bills are always due in cash, never in factories. A company can hold a million dollars of book value, but if its debts mature this quarter and its wealth is locked in slow assets, it can\'t pay — and runs out of money while technically "rich." This mismatch, not lack of assets, is how profitable-looking companies suddenly collapse. The same logic applies to you: an emergency fund exists because your future wealth can\'t pay this month\'s rent.',
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
