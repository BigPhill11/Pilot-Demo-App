import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const theTaxStrategistBossGame: BossGameConfig = {
  id: 'the-tax-strategist',
  moduleId: 'taxes',
  title: 'The Tax Strategist',
  subtitle: 'Navigate the Tax System',
  description: 'You are starting your first real job and side hustle. Over 5 years, you will learn to navigate the tax system, maximize deductions, use tax-advantaged accounts, and think strategically about taxes year-round.',
  totalMonths: 5,
  initialMeters: {
    income: 50,           // After-Tax Wealth (what you actually keep)
    hourlyValue: 40,      // Tax Efficiency (how optimized your strategy is)
    energy: 80,           // Compliance Level (IRS risk - higher is safer)
    replaceability: 30,   // Tax Stress (lower is better)
    optionality: 50,      // Future Tax Benefits (positioning)
  },
  months: [
    // YEAR 1: First Paycheck
    {
      month: 1,
      title: 'Year One: Your First Real Paycheck',
      openingNarration: `You just landed your first full-time job making $45,000 a year. HR hands you a stack of forms including the mysterious W-4. You stare at terms like "withholding allowances" and "additional withholding."

A message appears: "The tax system rewards those who understand it. The uninformed pay more."`,
      decisions: [
        {
          id: 'y1-w4-choice',
          category: 'money',
          title: 'The W-4 Decision',
          description: 'How should you fill out your W-4 withholding form?',
          pandaDialogue: 'Everyone at work seems to have different opinions about this form...',
          options: [
            {
              id: 'max-withholding',
              label: 'Claim zero allowances',
              description: 'Maximum taxes withheld from each paycheck',
              meterChanges: { income: -15, energy: 15, replaceability: -10 },
              storyResponse: 'You get a huge refund in April, but you gave the government an interest-free loan all year. That money could have been earning returns.',
            },
            {
              id: 'accurate-withholding',
              label: 'Calculate accurate withholding',
              description: 'Use the IRS calculator to get it right',
              meterChanges: { income: 10, hourlyValue: 15, energy: 10 },
              storyResponse: 'Your refund is small but your paychecks are bigger. You kept your money working for you all year.',
              unlocks: ['accurate-w4'],
            },
            {
              id: 'copy-coworker',
              label: 'Copy what your coworker did',
              description: 'They seem to know what they are doing',
              meterChanges: { hourlyValue: -5, replaceability: 10 },
              storyResponse: 'Your coworker has three kids and a mortgage. Your tax situation is completely different. Oops.',
            },
          ],
        },
        {
          id: 'y1-first-return',
          category: 'skill',
          title: 'Filing Your First Return',
          description: 'Tax season arrives. How do you handle your first tax return?',
          options: [
            {
              id: 'free-software',
              label: 'Use free tax software',
              description: 'Simple situation, simple solution',
              meterChanges: { income: 5, hourlyValue: 10, energy: 5 },
              storyResponse: 'The software walks you through everything. You learn the basics while saving money on preparation.',
              unlocks: ['self-filer'],
            },
            {
              id: 'expensive-accountant',
              label: 'Hire an expensive CPA',
              description: 'Pay $400 for professional help',
              meterChanges: { income: -10, energy: 15 },
              storyResponse: 'The CPA does a great job, but admits your return was so simple you could have done it yourself.',
            },
            {
              id: 'ignore-deadline',
              label: 'Wait until the last minute',
              description: 'You have until April 15th',
              meterChanges: { replaceability: 20, energy: -15, hourlyValue: -5 },
              storyResponse: 'Panic filing at midnight on April 14th. You missed a deduction because you rushed.',
            },
          ],
        },
        {
          id: 'y1-401k-intro',
          category: 'money',
          title: 'The 401k Question',
          description: 'Your employer offers a 401k with a 3% match. What do you do?',
          pandaDialogue: 'They keep talking about something called a match...',
          options: [
            {
              id: 'no-401k',
              label: 'Skip the 401k for now',
              description: 'You need all your paycheck',
              meterChanges: { income: -20, optionality: -20, hourlyValue: -15 },
              storyResponse: 'You left free money on the table. The match was literally 100% return on your contribution.',
            },
            {
              id: 'match-only',
              label: 'Contribute just enough for the match',
              description: 'Get the free money',
              meterChanges: { income: 15, optionality: 15, hourlyValue: 10 },
              storyResponse: 'You capture every dollar of free money while reducing your taxable income. Smart move.',
              unlocks: ['401k-matcher'],
            },
            {
              id: 'max-401k',
              label: 'Max out the 401k completely',
              description: 'Contribute $22,500 this year',
              meterChanges: { income: 10, optionality: 25, hourlyValue: 20, energy: -10 },
              storyResponse: 'Aggressive tax reduction, but your budget is tight. You adjusted spending to make it work.',
              unlocks: ['401k-maxer'],
            },
          ],
        },
      ],
      closingNarration: 'Year 1 ends. You survived your first tax season. The system is starting to make sense.',
    },
    // YEAR 2: Side Hustle Launch
    {
      month: 2,
      title: 'Year Two: The Side Hustle',
      openingNarration: 'You started freelancing on nights and weekends, earning an extra $15,000 this year. Welcome to the world of self-employment taxes and 1099 income. The rules are different here.',
      decisions: [
        {
          id: 'y2-1099-shock',
          category: 'money',
          title: 'The 1099 Tax Surprise',
          description: 'You realize you owe self-employment tax (15.3%) on top of income tax. Your side hustle income feels smaller now.',
          pandaDialogue: 'Wait, I have to pay BOTH sides of Social Security and Medicare?',
          options: [
            {
              id: 'ignore-se-tax',
              label: 'Worry about it later',
              description: 'Deal with it at tax time',
              meterChanges: { income: -15, replaceability: 25, energy: -20 },
              storyResponse: 'April arrives with a $4,000 tax bill you cannot pay. Penalties and interest make it worse.',
            },
            {
              id: 'quarterly-estimates',
              label: 'Pay quarterly estimated taxes',
              description: 'Set aside money throughout the year',
              meterChanges: { income: 5, hourlyValue: 15, energy: 15, replaceability: -10 },
              storyResponse: 'Every quarter you send the IRS a check. April brings no surprises. You stay ahead of the system.',
              unlocks: ['quarterly-payer'],
            },
            {
              id: 'increase-w4',
              label: 'Increase W-4 withholding at your job',
              description: 'Cover the side hustle taxes through your paycheck',
              meterChanges: { income: 0, hourlyValue: 10, energy: 10 },
              storyResponse: 'Simpler than quarterly payments. Your W-2 job covers your 1099 taxes automatically.',
              unlocks: ['w4-strategy'],
            },
          ],
        },
        {
          id: 'y2-expense-tracking',
          category: 'skill',
          title: 'Business Expense Tracking',
          description: 'Your side hustle has expenses: laptop, software, home office. How do you track them?',
          options: [
            {
              id: 'no-tracking',
              label: 'Keep receipts in a shoebox',
              description: 'You will figure it out later',
              meterChanges: { hourlyValue: -10, replaceability: 15, energy: -10 },
              storyResponse: 'Tax time is chaos. You miss $2,000 in deductions because you lost receipts.',
            },
            {
              id: 'spreadsheet',
              label: 'Build a simple expense spreadsheet',
              description: 'Track everything as it happens',
              meterChanges: { hourlyValue: 15, energy: 5, income: 5 },
              storyResponse: 'Every expense logged, every receipt saved. Tax time is easy and you capture every deduction.',
              unlocks: ['expense-tracker'],
            },
            {
              id: 'accounting-app',
              label: 'Use accounting software',
              description: 'Pay $15/month for automation',
              meterChanges: { hourlyValue: 20, income: 0, energy: 10 },
              storyResponse: 'Bank feeds pull in transactions automatically. Categories suggested. Reports generated instantly.',
              unlocks: ['automated-accounting'],
            },
          ],
        },
        {
          id: 'y2-home-office',
          category: 'money',
          title: 'The Home Office Deduction',
          description: 'You work from a dedicated room in your apartment. Can you deduct it?',
          options: [
            {
              id: 'skip-home-office',
              label: 'Skip it to avoid audit risk',
              description: 'Home office deductions attract attention',
              meterChanges: { income: -5, energy: 10, hourlyValue: -5 },
              storyResponse: 'You left money on the table out of fear. The deduction was legitimate.',
            },
            {
              id: 'simplified-method',
              label: 'Use the simplified method',
              description: '$5 per square foot, up to 300 sq ft',
              meterChanges: { income: 10, hourlyValue: 10, energy: 5 },
              storyResponse: 'Easy calculation, clear documentation. $1,500 deduction with minimal paperwork.',
              unlocks: ['home-office-simple'],
            },
            {
              id: 'actual-expenses',
              label: 'Calculate actual expenses',
              description: 'Prorate rent, utilities, internet',
              meterChanges: { income: 15, hourlyValue: 15, energy: -5 },
              storyResponse: 'More work but bigger deduction. You documented everything perfectly.',
              unlocks: ['home-office-actual'],
            },
          ],
        },
      ],
      closingNarration: 'Year 2 ends. You now understand two different tax worlds: W-2 and 1099. Most people never learn this.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.replaceability > 60,
          event: 'The stress of managing two income streams is affecting your sleep. Maybe it is time to get more organized.',
        },
      ],
    },
    // YEAR 3: Deductions & Credits
    {
      month: 3,
      title: 'Year Three: Maximizing Deductions',
      openingNarration: 'Your income grew to $75,000 between job and side hustle. You are in a higher tax bracket now. Every deduction matters more. Time to learn the difference between deductions and credits.',
      decisions: [
        {
          id: 'y3-standard-vs-itemize',
          category: 'money',
          title: 'Standard vs Itemized Deductions',
          description: 'The standard deduction is $13,850. Your itemized deductions might be higher. What do you choose?',
          pandaDialogue: 'I have mortgage interest, state taxes, and charitable donations...',
          options: [
            {
              id: 'always-standard',
              label: 'Always take the standard deduction',
              description: 'Simpler and probably enough',
              meterChanges: { income: -5, hourlyValue: -10, energy: 10 },
              storyResponse: 'Your itemized deductions were $17,000. You left $3,150 in deductions unused.',
            },
            {
              id: 'calculate-both',
              label: 'Calculate both and pick the higher one',
              description: 'Spend time to save money',
              meterChanges: { income: 10, hourlyValue: 15, energy: -5 },
              storyResponse: 'Itemizing saved you $800 more in taxes. The math was worth it.',
              unlocks: ['itemizer'],
            },
            {
              id: 'bunch-deductions',
              label: 'Bunch deductions strategically',
              description: 'Time deductions to maximize in alternating years',
              meterChanges: { income: 15, hourlyValue: 20, optionality: 10 },
              storyResponse: 'You prepaid next year\'s charitable donations this year to push over the standard deduction threshold. Advanced strategy.',
              unlocks: ['deduction-buncher'],
            },
          ],
        },
        {
          id: 'y3-credit-discovery',
          category: 'skill',
          title: 'Tax Credits vs Deductions',
          description: 'You can take a $1,000 deduction OR a $500 credit. Which is worth more?',
          options: [
            {
              id: 'choose-deduction',
              label: 'Take the $1,000 deduction',
              description: 'Bigger number is better',
              meterChanges: { income: -5, hourlyValue: -10 },
              storyResponse: 'The deduction only saved you $220 (22% bracket). The credit would have saved $500 directly.',
            },
            {
              id: 'choose-credit',
              label: 'Take the $500 credit',
              description: 'Credits reduce tax dollar-for-dollar',
              meterChanges: { income: 10, hourlyValue: 15 },
              storyResponse: 'You understood the difference. The credit saved you $280 more than the deduction would have.',
              unlocks: ['credit-smart'],
            },
            {
              id: 'ask-advisor',
              label: 'Ask a tax professional',
              description: 'Get advice for this specific situation',
              meterChanges: { income: 5, hourlyValue: 10, energy: 5 },
              storyResponse: 'The CPA confirmed credits beat deductions and explained exactly why.',
            },
          ],
        },
        {
          id: 'y3-education-credit',
          category: 'money',
          title: 'Education and Learning',
          description: 'You spent $2,000 on a professional certification. How do you handle it?',
          options: [
            {
              id: 'ignore-education',
              label: 'Assume it is not deductible',
              description: 'Probably personal expense',
              meterChanges: { income: -5, hourlyValue: -5 },
              storyResponse: 'It was deductible as a business expense for your side hustle. Missed opportunity.',
            },
            {
              id: 'business-deduction',
              label: 'Deduct as a business expense',
              description: 'It relates to your side hustle',
              meterChanges: { income: 10, hourlyValue: 10, optionality: 5 },
              storyResponse: 'The certification directly relates to your business. Full deduction, $440 saved.',
              unlocks: ['education-deducter'],
            },
            {
              id: 'lifetime-learning',
              label: 'Claim the Lifetime Learning Credit',
              description: 'Get a tax credit instead of deduction',
              meterChanges: { income: 15, hourlyValue: 15 },
              storyResponse: 'The credit was worth more than the deduction. You saved $400 directly.',
              unlocks: ['education-credit'],
            },
          ],
        },
      ],
      closingNarration: 'Year 3 ends. You now understand the difference between deductions and credits. This knowledge will save you thousands over your lifetime.',
      specialEvents: [
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('deduction-buncher'),
          event: 'Your accountant is impressed. Deduction bunching is a strategy most people never learn.',
        },
      ],
    },
    // YEAR 4: Tax-Advantaged Accounts
    {
      month: 4,
      title: 'Year Four: Building Tax Shields',
      openingNarration: 'Your income is now $90,000. Without tax strategy, you would lose over $20,000 to taxes. Time to build serious tax shields using retirement accounts, HSAs, and other tax-advantaged vehicles.',
      decisions: [
        {
          id: 'y4-retirement-strategy',
          category: 'money',
          title: 'Traditional vs Roth',
          description: 'You can put money in Traditional (tax-deferred) or Roth (tax-free growth) accounts. Which strategy?',
          pandaDialogue: 'One saves taxes now, one saves taxes later. Which is better for me?',
          options: [
            {
              id: 'all-traditional',
              label: 'All Traditional accounts',
              description: 'Maximize current tax savings',
              meterChanges: { income: 15, hourlyValue: 10, optionality: -5 },
              storyResponse: 'You reduced taxable income significantly. But all withdrawals will be taxed later.',
              unlocks: ['traditional-focused'],
            },
            {
              id: 'all-roth',
              label: 'All Roth accounts',
              description: 'Pay taxes now, never again',
              meterChanges: { income: -5, hourlyValue: 10, optionality: 15 },
              storyResponse: 'Higher taxes now, but your money will grow tax-free forever. Powerful for the long term.',
              unlocks: ['roth-focused'],
            },
            {
              id: 'split-strategy',
              label: 'Split between both types',
              description: 'Tax diversification',
              meterChanges: { income: 5, hourlyValue: 15, optionality: 20 },
              storyResponse: 'Future tax rates are uncertain. Having both types gives you flexibility in retirement.',
              unlocks: ['tax-diversified'],
            },
          ],
        },
        {
          id: 'y4-hsa-power',
          category: 'skill',
          title: 'The HSA Triple Tax Advantage',
          description: 'You have a high-deductible health plan. An HSA offers tax deduction, tax-free growth, AND tax-free withdrawals for medical.',
          options: [
            {
              id: 'skip-hsa',
              label: 'Skip the HSA',
              description: 'Too complicated',
              meterChanges: { hourlyValue: -10, optionality: -10 },
              storyResponse: 'You missed the only account with triple tax benefits. This mistake compounds over decades.',
            },
            {
              id: 'hsa-for-current',
              label: 'Use HSA for current medical expenses',
              description: 'Spend the money as you go',
              meterChanges: { income: 10, hourlyValue: 10 },
              storyResponse: 'You save on taxes, but you do not get the long-term investment growth benefit.',
              unlocks: ['hsa-spender'],
            },
            {
              id: 'hsa-invest',
              label: 'Max HSA and invest it for the future',
              description: 'Pay medical costs out of pocket now',
              meterChanges: { income: 5, hourlyValue: 20, optionality: 15, energy: -5 },
              storyResponse: 'The ultimate tax hack. Your HSA will grow tax-free for 30 years. Retirement medical costs covered.',
              unlocks: ['hsa-investor'],
            },
          ],
        },
        {
          id: 'y4-ira-decision',
          category: 'money',
          title: 'Backdoor Roth IRA',
          description: 'Your income is too high for direct Roth IRA contributions. But there is a legal workaround.',
          options: [
            {
              id: 'no-ira',
              label: 'Skip the IRA entirely',
              description: 'You already have a 401k',
              meterChanges: { optionality: -10, hourlyValue: -5 },
              storyResponse: 'You left tax-advantaged space unused. Every dollar not sheltered is taxed.',
            },
            {
              id: 'traditional-ira',
              label: 'Contribute to Traditional IRA',
              description: 'Non-deductible but still tax-deferred',
              meterChanges: { optionality: 5, hourlyValue: 5 },
              storyResponse: 'Growth is tax-deferred but withdrawals are taxed. Not the best outcome at your income.',
            },
            {
              id: 'backdoor-roth',
              label: 'Execute a Backdoor Roth IRA',
              description: 'Contribute to Traditional, convert to Roth',
              meterChanges: { optionality: 15, hourlyValue: 20, income: 5 },
              storyResponse: 'Legal tax strategy used by high earners everywhere. $6,500 more in tax-free growth each year.',
              unlocks: ['backdoor-roth'],
            },
          ],
        },
      ],
      closingNarration: 'Year 4 ends. You have built a powerful tax shield. Multiple accounts working together to minimize your lifetime tax burden.',
      specialEvents: [
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('hsa-investor') && unlocks.includes('backdoor-roth'),
          event: 'You are using strategies most people never learn. Your tax-advantaged accounts will be worth millions by retirement.',
        },
      ],
    },
    // YEAR 5: Tax Planning Mindset
    {
      month: 5,
      title: 'Year Five: The Planning Mindset',
      openingNarration: 'Your income is now $120,000 between job and thriving side business. You are no longer just filing taxes. You are planning them. Tax strategy is now part of every financial decision.',
      decisions: [
        {
          id: 'y5-year-round',
          category: 'skill',
          title: 'Year-Round Tax Planning',
          description: 'How do you approach taxes now?',
          pandaDialogue: 'Taxes used to stress me out. Now I see them as a system to optimize.',
          options: [
            {
              id: 'still-reactive',
              label: 'Still figure it out at tax time',
              description: 'April is when you deal with taxes',
              meterChanges: { hourlyValue: -10, replaceability: 15, income: -10 },
              storyResponse: 'Reactive tax planning always costs more. You missed optimization opportunities all year.',
            },
            {
              id: 'quarterly-review',
              label: 'Review taxes quarterly',
              description: 'Check and adjust every three months',
              meterChanges: { hourlyValue: 15, income: 10, energy: -5 },
              storyResponse: 'Quarterly reviews catch problems early and identify opportunities. No April surprises.',
              unlocks: ['quarterly-planner'],
            },
            {
              id: 'integrated-planning',
              label: 'Integrate taxes into all financial decisions',
              description: 'Tax impact is part of every major choice',
              meterChanges: { hourlyValue: 25, income: 15, optionality: 10 },
              storyResponse: 'Buying a house? Tax implications. Selling investments? Tax implications. Every decision optimized.',
              unlocks: ['integrated-thinker'],
            },
          ],
        },
        {
          id: 'y5-business-structure',
          category: 'money',
          title: 'Business Structure Decision',
          description: 'Your side business earns $50,000 profit. Should you change from sole proprietorship to an S-Corp?',
          options: [
            {
              id: 'stay-sole-prop',
              label: 'Stay a sole proprietorship',
              description: 'Simpler, no extra paperwork',
              meterChanges: { income: -10, energy: 10, hourlyValue: -5 },
              storyResponse: 'You paid full self-employment tax on all profits. An S-Corp would have saved $5,000.',
            },
            {
              id: 'form-scorp',
              label: 'Form an S-Corporation',
              description: 'Pay yourself a salary, take rest as distributions',
              meterChanges: { income: 20, hourlyValue: 20, energy: -10 },
              storyResponse: 'With a reasonable $40,000 salary, you save 15.3% self-employment tax on $10,000 of distributions.',
              unlocks: ['s-corp-owner'],
            },
            {
              id: 'consult-cpa',
              label: 'Consult with a CPA first',
              description: 'Make sure the math works for your situation',
              meterChanges: { income: 15, hourlyValue: 15, energy: 0 },
              storyResponse: 'The CPA confirmed the S-Corp saves money and set it up properly. Worth the consultation fee.',
              unlocks: ['professional-advised'],
            },
          ],
        },
        {
          id: 'y5-tax-loss-harvest',
          category: 'money',
          title: 'Tax-Loss Harvesting',
          description: 'Some investments are down. You can sell them to realize losses that offset gains.',
          options: [
            {
              id: 'hold-losers',
              label: 'Hold and hope they recover',
              description: 'They might come back',
              meterChanges: { hourlyValue: -5, income: -5 },
              storyResponse: 'Emotional attachment cost you. The losses could have offset $3,000 of income.',
            },
            {
              id: 'harvest-losses',
              label: 'Sell losers and buy similar investments',
              description: 'Capture the loss, stay invested',
              meterChanges: { income: 15, hourlyValue: 20 },
              storyResponse: 'You realized losses to offset gains, bought similar investments immediately. Tax saved, allocation unchanged.',
              unlocks: ['tax-loss-harvester'],
            },
            {
              id: 'automated-harvesting',
              label: 'Set up automated tax-loss harvesting',
              description: 'Robo-advisor handles it continuously',
              meterChanges: { income: 20, hourlyValue: 25, energy: 10 },
              storyResponse: 'The algorithm harvests losses year-round when they occur. Maximum tax efficiency with zero effort.',
              unlocks: ['automated-harvesting'],
            },
          ],
        },
      ],
      closingNarration: 'Year 5 ends. You have transformed from tax-confused to tax-strategic. You now think about taxes like the wealthy do: as a system to optimize, not a burden to suffer.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.hourlyValue > 80,
          event: 'Your tax efficiency is exceptional. You are keeping significantly more of what you earn than the average person at your income level.',
        },
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('s-corp-owner') && unlocks.includes('tax-loss-harvester'),
          event: 'You are using tax strategies that most high earners never learn. Your lifetime tax savings will be substantial.',
        },
      ],
    },
  ],
  endings: [
    {
      id: 'tax-master',
      title: 'Tax Master',
      description: 'You understand taxes at a level most people never reach.',
      trajectory: 'momentum',
      futureSnapshot: 'In 5 years, your tax-advantaged accounts are worth over $200,000. Your effective tax rate is 15% on income that should be taxed at 24%. Every financial decision incorporates tax strategy. Friends ask you for advice.',
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.hourlyValue >= 70 && meters.income >= 60 && meters.optionality >= 60,
    },
    {
      id: 'solid-strategist',
      title: 'Solid Strategist',
      description: 'You have built good tax habits and avoid major mistakes.',
      trajectory: 'growing',
      futureSnapshot: 'In 5 years, you have healthy retirement accounts and rarely get surprised at tax time. You are not optimizing every dollar, but you are far ahead of most people.',
      conditions: (meters: GameMeters) => 
        meters.hourlyValue >= 50 && meters.income >= 50,
    },
    {
      id: 'tax-stressed',
      title: 'Tax Stressed',
      description: 'Taxes remain a source of annual anxiety.',
      trajectory: 'stuck',
      futureSnapshot: 'In 5 years, you still dread April. Last-minute filing, occasional penalties, missed deductions. You know you should do better but never find the time to learn.',
      conditions: (meters: GameMeters) => 
        meters.replaceability >= 60 || meters.energy < 40,
    },
    {
      id: 'audit-risk',
      title: 'Audit Risk',
      description: 'Aggressive positions without proper documentation created problems.',
      trajectory: 'burnout',
      futureSnapshot: 'In 5 years, you got audited. Some deductions were disallowed. Penalties and interest added up. You now live in fear of the next notice.',
      conditions: (meters: GameMeters) => 
        meters.energy < 30 && meters.hourlyValue > 60,
    },
    {
      id: 'default-path',
      title: 'The Standard Approach',
      description: 'You pay what you owe but leave optimization on the table.',
      trajectory: 'balanced',
      futureSnapshot: 'In 5 years, you file your taxes and get small refunds. You have not built tax-advantaged wealth, but you have no problems either. Average outcome.',
      conditions: () => true,
    },
  ],
};
