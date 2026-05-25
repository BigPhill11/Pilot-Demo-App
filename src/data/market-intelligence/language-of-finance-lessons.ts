/**
 * Language of Finance — full MI lesson payloads.
 * Pilot: income-statement-decoded (complete). Others: tier-B ready for review.
 */

import type { MILesson } from '@/types/mi-lesson';

const BASE = '/market-intelligence/language-finance';

function img(
  lessonId: string,
  name: string,
  alt: string,
  caption?: string,
  ext: 'svg' | 'png' | 'webp' = 'svg'
) {
  return {
    src: `${BASE}/${lessonId}/${name}.${ext}`,
    alt,
    caption,
  };
}

/** Pilot lesson — Income Statement Decoded */
export const incomeStatementDecodedLesson: MILesson = {
  id: 'lof-income-statement-decoded',
  moduleId: 'income-statement-decoded',
  title: 'Income Statement Decoded',
  estimatedMinutes: 10,
  intro: {
    hook:
      "Your favorite sneaker brand posts record sales — but the stock drops 8%. Investors weren't reacting to the headline number. They were reading the income statement.",
    philMessage:
      "Think of the income statement as a company's report card for one year. Revenue is how much came in the door; expenses are what it cost to run the show; what's left is profit — or loss. Once you can read those three layers, earnings headlines start making sense.",
    heroImage: img(
      'income-statement-decoded',
      'hero',
      'Full income statement diagram showing revenue, expenses, and net income',
      'Every public company reports how it performed',
      'png'
    ),
  },
  coreConcepts: [
    {
      title: 'Revenue (Top Line)',
      explanation:
        'Revenue is total money earned from selling products or services before any costs are subtracted. It is often called the "top line" because it sits at the top of the income statement.',
      example:
        'A streaming app with 10 million subscribers at $15/month reports $1.8B in annual revenue — even if it spends heavily on new shows.',
      keyTerms: ['Revenue'],
      visual: img(
        'income-statement-decoded',
        'concept-revenue',
        'Diagram highlighting revenue as the top line of the income statement',
        'Revenue = what customers paid',
        'png'
      ),
    },
    {
      title: 'Expenses & Operating Income',
      explanation:
        'Expenses include costs like salaries, marketing, and materials. Subtract them from revenue to get operating income — profit from core business operations.',
      example:
        'A coffee chain might earn $500M in revenue but spend $420M on stores, beans, and wages — leaving $80M in operating income.',
      keyTerms: ['Operating'],
      visual: img(
        'income-statement-decoded',
        'concept-expenses',
        'Diagram showing operating expenses subtracted from revenue',
        'Expenses sit between revenue and profit',
        'png'
      ),
    },
    {
      title: 'Net Income (Bottom Line)',
      explanation:
        'Net income is what remains after all expenses, interest, and taxes. The "bottom line" tells you if the company actually made money for shareholders that period.',
      example:
        'Two retailers can have the same revenue; the one with lower rent and smarter inventory often wins on net income — and that is what drives the stock price over time.',
      keyTerms: ['Net income'],
      visual: img(
        'income-statement-decoded',
        'concept-net-income',
        'Diagram highlighting net income as the bottom line',
        'Net income = final profit or loss',
        'png'
      ),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Build the Statement',
    description:
      'Tap each item and assign it to the right part of a simple income statement. No grades — just practice the layout.',
    buckets: [
      { id: 'revenue', label: 'Revenue' },
      { id: 'expense', label: 'Operating Expense' },
      { id: 'bottom', label: 'Bottom Line' },
    ],
    items: [
      { id: '1', label: 'Product sales ($2.1B)', correctBucket: 'revenue' },
      { id: '2', label: 'Store payroll ($800M)', correctBucket: 'expense' },
      { id: '3', label: 'Ad campaign ($120M)', correctBucket: 'expense' },
      { id: '4', label: 'Net income ($95M)', correctBucket: 'bottom' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'A part-time job is your personal "top line." Gas, food, and phone are expenses. What you keep is your bottom line — and that number decides how fast you can save or invest.',
      scenario:
        'If you earn $400/month and spend $350, your "net income" is $50. Raising revenue (hours) or cutting expenses (subscriptions) both work — just like a company.',
      visual: img(
        'income-statement-decoded',
        'connect-pf',
        'Personal budget shown as a mini income statement',
        'Your budget is a personal income statement',
        'png'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Financial analysts and accountants live in income statements during earnings season. They compare revenue growth, margins, and net income across competitors.',
      role: 'Financial Analyst',
      skills: ['Excel modeling', 'Ratio analysis', 'Earnings summaries'],
      visual: img(
        'income-statement-decoded',
        'connect-career',
        'Financial analyst reviewing income statements and earnings data',
        'Analysts translate statements for investors',
        'png'
      ),
    },
  },
  flashcards: [
    {
      term: 'Revenue',
      definition: 'Total money earned from sales before expenses.',
      philsAnalogy: 'Like every dollar from your side hustle before you pay for supplies.',
    },
    {
      term: 'Operating Income',
      definition: 'Profit from core operations after operating expenses.',
      philsAnalogy: 'What is left after rent and wages — before taxes and loans.',
    },
    {
      term: 'Net Income',
      definition: 'Final profit or loss after all expenses, interest, and taxes.',
      philsAnalogy: 'The number that actually hits the company piggy bank.',
    },
    {
      term: 'Top Line',
      definition: 'Another name for revenue — the first major number on the statement.',
      philsAnalogy: 'The big number at the top of your summer job earnings.',
    },
  ],
  quiz: [
    {
      question: 'What does "top line" usually refer to on an income statement?',
      options: ['Net income', 'Revenue', 'Total debt', 'Stock price'],
      correctIndex: 1,
      explanation: 'Revenue sits at the top — money in before costs.',
    },
    {
      question: 'Operating income is best described as…',
      options: [
        'Revenue minus operating expenses',
        'Cash in the bank',
        'Stock buybacks only',
        'Revenue plus taxes',
      ],
      correctIndex: 0,
      explanation: 'It reflects profit from running the core business.',
    },
    {
      question: 'Why might investors care more about net income than revenue alone?',
      options: [
        'Net income shows what is left after all major costs',
        'Revenue is always fake',
        'Net income ignores taxes',
        'Revenue only applies to banks',
      ],
      correctIndex: 0,
      explanation: 'A company can grow sales and still lose money if costs explode.',
    },
    {
      question: 'A sneaker brand reports higher revenue but lower net income. What is a likely reason?',
      options: [
        'Costs rose faster than sales',
        'They stopped selling shoes',
        'Revenue and net income always move together',
        'Net income is not on the income statement',
      ],
      correctIndex: 0,
      explanation: 'Margins matter — expenses can eat a "record sales" headline.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

/** Balance Sheet Basics — full lesson with diagram visuals */
export const balanceSheetBasicsLesson: MILesson = {
  id: 'lof-balance-sheet-basics',
  moduleId: 'balance-sheet-basics',
  title: 'Balance Sheet Basics',
  estimatedMinutes: 10,
  intro: {
    hook:
      'A trendy retailer posts huge profits but files for bankruptcy months later. The income statement told one story; the balance sheet showed they were drowning in debt.',
    philMessage:
      'The balance sheet is a snapshot in time: what the company owns (assets), what it owes (liabilities), and what is left for owners (equity). The golden rule never breaks: Assets = Liabilities + Equity.',
    heroImage: img(
      'balance-sheet-basics',
      'hero',
      'Complete balance sheet diagram with assets, liabilities, and equity',
      'A snapshot of what a company owns and owes today',
      'png'
    ),
  },
  coreConcepts: [
    {
      title: 'Assets — What the Company Owns',
      explanation:
        'Assets are resources with economic value: cash, inventory, equipment, buildings, and money customers still owe. They are listed from most liquid (cash) to least (long-term assets).',
      example:
        'A delivery app might show $500M cash, $200M in office tech, and $150M in brand value — all assets, different types.',
      keyTerms: ['Assets'],
      visual: img(
        'balance-sheet-basics',
        'concept-assets',
        'Balance sheet left side highlighting assets column',
        'Assets = economic resources the company controls',
        'png'
      ),
    },
    {
      title: 'Liabilities — What the Company Owes',
      explanation:
        'Liabilities are obligations: loans, unpaid bills, wages owed, and bonds. They show up on the right side of the balance sheet and must be paid eventually.',
      example:
        'The same delivery app might owe $300M to banks and $100M to suppliers — those are liabilities eating into financial flexibility.',
      keyTerms: ['Liabilities'],
      visual: img(
        'balance-sheet-basics',
        'concept-liabilities',
        'Balance sheet liabilities section with loans and payables',
        'Liabilities = debts and obligations',
        'png'
      ),
    },
    {
      title: 'Equity — The Owners\' Stake',
      explanation:
        'Equity (shareholders\' equity) is what remains for owners after liabilities are subtracted from assets. It includes money investors put in plus profits kept in the business.',
      example:
        'If assets are $1B and liabilities are $700M, equity is $300M — that is the book value belonging to shareholders.',
      visual: img(
        'balance-sheet-basics',
        'concept-equity',
        'Accounting equation diagram Assets equals Liabilities plus Equity',
        'Equity = Assets − Liabilities',
        'png'
      ),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Balance the Sheet',
    description:
      'Tap each item and assign it to Assets, Liabilities, or Equity. Finish all items to continue.',
    buckets: [
      { id: 'assets', label: 'Assets' },
      { id: 'liabilities', label: 'Liabilities' },
      { id: 'equity', label: 'Equity' },
    ],
    items: [
      { id: '1', label: 'Cash in bank ($120M)', correctBucket: 'assets' },
      { id: '2', label: 'Factory & equipment ($400M)', correctBucket: 'assets' },
      { id: '3', label: 'Bank loan ($250M)', correctBucket: 'liabilities' },
      { id: '4', label: 'Retained earnings ($180M)', correctBucket: 'equity' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'Your net worth is a personal balance sheet: assets (savings, car value) minus liabilities (student loans, credit card debt) equals your equity.',
      scenario:
        'If you have $2,000 saved and owe $800 on a phone plan balance, your "equity" is $1,200 — that is your financial position today.',
      visual: img(
        'balance-sheet-basics',
        'connect-pf',
        'Teen net worth infographic assets minus liabilities',
        'Net worth = your personal balance sheet',
        'png'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Credit analysts and lenders live in balance sheets. They check liquidity (cash vs. short-term debt) and leverage before approving loans or rating bonds.',
      role: 'Credit Analyst',
      skills: ['Ratio analysis', 'Debt schedules', 'Liquidity tests'],
      visual: img(
        'balance-sheet-basics',
        'connect-career',
        'Credit analyst reviewing company balance sheet on monitors',
        'Lenders read balance sheets before they lend',
        'png'
      ),
    },
  },
  flashcards: [
    { term: 'Assets', definition: 'Resources a company owns or controls with economic value.', philsAnalogy: 'Your savings, laptop, and car — things you own.' },
    { term: 'Liabilities', definition: 'What a company owes to others.', philsAnalogy: 'Student loans and money you owe friends.' },
    { term: 'Equity', definition: 'Owners\' claim after liabilities; Assets − Liabilities.', philsAnalogy: 'House value minus the mortgage.' },
    { term: 'Balance sheet', definition: 'Snapshot of assets, liabilities, and equity at one date.', philsAnalogy: 'A financial group chat screenshot — frozen in time.' },
  ],
  quiz: [
    {
      question: 'The accounting equation on a balance sheet is…',
      options: ['Assets = Liabilities + Equity', 'Revenue = Expenses', 'Cash = Profit', 'Assets = Revenue'],
      correctIndex: 0,
      explanation: 'The sheet must always balance — what you own equals what you owe plus owners\' stake.',
    },
    {
      question: 'Which item is a liability?',
      options: ['Cash in the bank', 'Unpaid supplier bills', 'A delivery truck', 'Patents'],
      correctIndex: 1,
      explanation: 'Money owed to others is a liability, not an asset.',
    },
    {
      question: 'Why can a profitable company still go bankrupt?',
      options: [
        'Too much debt on the balance sheet vs. cash',
        'Profit is illegal',
        'Balance sheets are optional',
        'Equity is always negative',
      ],
      correctIndex: 0,
      explanation: 'Income can look fine while liabilities overwhelm assets and cash.',
    },
    {
      question: 'Shareholders\' equity represents…',
      options: [
        'The owners\' residual claim on assets',
        'Total revenue for the year',
        'Only cash in the bank',
        'Money owed to suppliers',
      ],
      correctIndex: 0,
      explanation: 'Equity is what is left for owners after paying debts.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

/** Cash Flow Statement — full lesson with diagram visuals */
export const cashFlowStatementLesson: MILesson = {
  id: 'lof-cash-flow-statement',
  moduleId: 'cash-flow-statement',
  title: 'Cash Flow Statement',
  estimatedMinutes: 10,
  intro: {
    hook:
      'A famous tech company once reported record profit — then its stock crashed because cash was bleeding out. Investors had read the cash flow statement.',
    philMessage:
      'Profit is an accounting story; cash is what pays the bills. The cash flow statement tracks where cash came from and where it went — in three buckets: operations, investing, and financing.',
    heroImage: img(
      'cash-flow-statement',
      'hero',
      'Full cash flow statement with operating, investing, and financing sections',
      'Follow the cash — not just the profit headline',
      'png'
    ),
  },
  coreConcepts: [
    {
      title: 'Operating Cash Flow',
      explanation:
        'Cash generated from day-to-day business: customers paying, suppliers being paid, salaries, and taxes. It answers: "Is the core business throwing off cash?"',
      example:
        'A subscription app collects $50M/month from users and pays $35M in costs — that net operating cash is the lifeblood.',
      visual: img(
        'cash-flow-statement',
        'concept-operating',
        'Operating activities section of cash flow statement highlighted',
        'Cash from running the business',
        'png'
      ),
    },
    {
      title: 'Investing Cash Flow',
      explanation:
        'Cash spent or received from long-term bets: buying equipment, acquiring companies, or selling assets. Negative investing often means growth spending.',
      example:
        'A retailer spending $200M on new stores shows negative investing cash flow — investing in the future.',
      visual: img(
        'cash-flow-statement',
        'concept-investing',
        'Investing activities cash flows for capital expenditures',
        'Cash for factories, tech, and acquisitions',
        'png'
      ),
    },
    {
      title: 'Financing Cash Flow & Free Cash',
      explanation:
        'Financing covers borrowing, repaying debt, issuing stock, and paying dividends. Free cash flow is operating cash minus essential investing — cash truly available.',
      example:
        'A company might raise $500M from bonds (financing inflow) while paying $100M in dividends (financing outflow).',
      visual: img(
        'cash-flow-statement',
        'concept-financing',
        'Financing activities and free cash flow highlight on statement',
        'Borrowing, dividends, and cash left over',
        'png'
      ),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Follow the Cash',
    description: 'Assign each cash movement to Operating, Investing, or Financing.',
    buckets: [
      { id: 'ops', label: 'Operating' },
      { id: 'invest', label: 'Investing' },
      { id: 'finance', label: 'Financing' },
    ],
    items: [
      { id: '1', label: 'Customers pay invoices ($90M)', correctBucket: 'ops' },
      { id: '2', label: 'Build a new warehouse ($40M)', correctBucket: 'invest' },
      { id: '3', label: 'Pay employee wages ($30M)', correctBucket: 'ops' },
      { id: '4', label: 'Issue corporate bonds ($60M)', correctBucket: 'finance' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'Your monthly cash flow: money in from work (operating), buying a laptop (investing), and paying down a credit card or getting a gift (financing).',
      scenario:
        'You earn $400, spend $350 on life, put $30 toward a phone payment plan, and save $20 — that is your personal cash flow story.',
      visual: img(
        'cash-flow-statement',
        'connect-pf',
        'Personal monthly cash flow in and out diagram',
        'Your wallet runs on cash timing',
        'png'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Equity research analysts obsess over free cash flow when valuing stocks. Investment bankers check cash flow before advising on deals.',
      role: 'Equity Research Associate',
      skills: ['DCF models', 'Free cash flow', 'Capital allocation'],
      visual: img(
        'cash-flow-statement',
        'connect-career',
        'Equity research associate analyzing cash flow charts',
        'Wall Street tracks cash, not just earnings',
        'png'
      ),
    },
  },
  flashcards: [
    { term: 'Operating cash flow', definition: 'Cash from core business operations.', philsAnalogy: 'Paycheck money after work-related spending.' },
    { term: 'Investing cash flow', definition: 'Cash for long-term assets and acquisitions.', philsAnalogy: 'Buying a car or laptop for school/work.' },
    { term: 'Financing cash flow', definition: 'Cash from debt, equity, and dividends.', philsAnalogy: 'Student loan money in, credit card payments out.' },
    { term: 'Free cash flow', definition: 'Operating cash minus essential capital spending.', philsAnalogy: 'Money left after rent and must-pay bills.' },
  ],
  quiz: [
    {
      question: 'Operating cash flow mainly reflects…',
      options: ['Day-to-day business cash', 'Stock price changes', 'Only bank loans', 'Marketing slogans'],
      correctIndex: 0,
      explanation: 'It is cash from running the core business.',
    },
    {
      question: 'Buying a new factory would most likely appear in…',
      options: ['Investing activities', 'Operating activities', 'Financing activities', 'Revenue line'],
      correctIndex: 0,
      explanation: 'Long-term asset purchases are investing cash flows.',
    },
    {
      question: 'Why can profit be positive while cash is negative?',
      options: [
        'Timing differences and non-cash accounting items',
        'Profit is always fake',
        'Cash flow statements are optional',
        'Banks forbid cash',
      ],
      correctIndex: 0,
      explanation: 'Accrual profit does not always equal cash collected this quarter.',
    },
    {
      question: 'Issuing new bonds to raise money is classified as…',
      options: ['Financing cash flow', 'Operating cash flow', 'Investing cash flow', 'Net income'],
      correctIndex: 0,
      explanation: 'Borrowing and equity transactions are financing activities.',
    },
  ],
  rewards: { bamboo: 25, xp: 5 },
};

/** Ethics in Accounting — full lesson with diagram visuals */
export const ethicsInAccountingLesson: MILesson = {
  id: 'lof-ethics-in-accounting',
  moduleId: 'ethics-in-accounting',
  title: 'Ethics in Accounting',
  estimatedMinutes: 10,
  intro: {
    hook:
      'In 2001, a massive accounting scandal wiped out billions in shareholder value overnight. Numbers were manipulated until the story collapsed — ethics in accounting is not boring, it is survival.',
    philMessage:
      'Financial reports only work if people trust them. Earnings management, weak audits, and ignored red flags destroy careers and retirement accounts. Your integrity matters from day one.',
    heroImage: img(
      'ethics-in-accounting',
      'hero',
      'Ethics in accounting infographic with scales, financial reports, and integrity',
      'Trust in markets starts with honest numbers',
      'png'
    ),
  },
  coreConcepts: [
    {
      title: 'Earnings Management',
      explanation:
        'Earnings management uses legal-but-misleading tactics to smooth profits: shifting revenue timing, hiding expenses, or aggressive assumptions. It confuses investors.',
      example:
        'Booking next quarter\'s sales early to hit a bonus target is a classic earnings management red flag.',
      visual: img(
        'ethics-in-accounting',
        'concept-earnings-management',
        'Diagram showing manipulated vs honest earnings timeline',
        'When profits are "smoothed" on purpose',
        'png'
      ),
    },
    {
      title: 'Audits & Governance',
      explanation:
        'Independent auditors review financial statements. Boards and compliance teams set governance — rules that keep reporting honest and catch material errors.',
      example:
        'A Big Four auditor might flag inventory counts that do not match warehouse reality before signing off on annual reports.',
      visual: img(
        'ethics-in-accounting',
        'concept-audit-governance',
        'Auditor checklist and corporate governance shield diagram',
        'Checks and balances on company reports',
        'png'
      ),
    },
    {
      title: 'Integrity & Whistleblowing',
      explanation:
        'When you see material errors or fraud, escalating through compliance or whistleblower channels protects investors and your career long term. Silence can make you complicit.',
      example:
        'Employees who reported accounting fraud at major firms helped stop bigger losses — laws now offer some protection for good-faith reports.',
      visual: img(
        'ethics-in-accounting',
        'concept-integrity',
        'Whistleblower ethics path and protected reporting flowchart',
        'Speaking up when numbers do not add up',
        'png'
      ),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Ethics Check',
    description: 'Pick what you would do — there is no failing grade.',
    rounds: [
      {
        id: 'r1',
        prompt: 'A manager asks you to book revenue early to hit a bonus target. You should…',
        options: [
          { id: 'a', label: 'Push back and escalate to compliance', feedback: 'Reporting integrity protects everyone long term.' },
          { id: 'b', label: 'Do it quietly to stay on the team', feedback: 'Short-term wins can end careers and hurt investors.' },
        ],
      },
      {
        id: 'r2',
        prompt: 'You spot a material error before a filing goes out. You should…',
        options: [
          { id: 'a', label: 'Document and tell audit/governance', feedback: 'That is exactly what controls are for.' },
          { id: 'b', label: 'Ignore it if it helps the stock', feedback: 'Markets depend on accurate numbers.' },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'Ethics shows up personally too: honest tax reporting, not inflating income on applications, and transparent side-hustle earnings.',
      scenario:
        'Reporting all cash income and keeping receipts is your version of GAAP — it protects you if questions come later.',
      visual: img(
        'ethics-in-accounting',
        'connect-pf',
        'Honest personal tax and budgeting ethics infographic',
        'Honesty on your taxes = personal integrity',
        'png'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Auditors, compliance officers, and CFOs guard market trust. Firms hire for technical skill and ethical judgment — scandals follow people, not just companies.',
      role: 'Auditor',
      skills: ['GAAP knowledge', 'Skeptical testing', 'Professional ethics'],
      visual: img(
        'ethics-in-accounting',
        'connect-career',
        'Professional auditor with ethics and financial documents',
        'Auditors are the trust layer in finance',
        'png'
      ),
    },
  },
  flashcards: [
    { term: 'Earnings management', definition: 'Tactics to manipulate reported profits within rules.', philsAnalogy: 'Moving bill due dates to fake a "good month."' },
    { term: 'Material misstatement', definition: 'An error large enough to change investor decisions.', philsAnalogy: 'A grade that should be a D reported as a B.' },
    { term: 'Governance', definition: 'Board and policy systems that oversee management.', philsAnalogy: 'Club rules that stop officers from cheating.' },
    { term: 'Whistleblowing', definition: 'Reporting fraud or violations through proper channels.', philsAnalogy: 'Telling the principal when someone cheats on a test.' },
  ],
  quiz: [
    {
      question: 'Earnings management is best described as…',
      options: [
        'Manipulating reported profits within accounting rules',
        'Always illegal fraud',
        'The same as revenue growth',
        'Required by GAAP every quarter',
      ],
      correctIndex: 0,
      explanation: 'It is often legal-but-misleading, which is why ethics matter.',
    },
    {
      question: 'The main purpose of an independent audit is to…',
      options: [
        'Improve reliability of financial statements for investors',
        'Guarantee stock prices rise',
        'Eliminate all business risk',
        'Replace the CEO',
      ],
      correctIndex: 0,
      explanation: 'Auditors add credibility — they do not run the company.',
    },
    {
      question: 'You discover a material error before a public filing. Best first step?',
      options: [
        'Document and escalate through proper channels',
        'Fix it silently without telling anyone',
        'Post about it online',
        'Ignore it to protect the stock',
      ],
      correctIndex: 0,
      explanation: 'Governance exists to catch and fix issues before harm spreads.',
    },
    {
      question: 'Why do accounting scandals hurt everyday investors?',
      options: [
        'False numbers distort prices and destroy savings',
        'Only CEOs lose money',
        'Scandals increase trust',
        'Balance sheets disappear',
      ],
      correctIndex: 0,
      explanation: 'Retirement accounts and pensions rely on honest reporting.',
    },
  ],
  rewards: { bamboo: 25, xp: 5 },
};

function buildTierBLesson(
  moduleId: string,
  title: string,
  hook: string,
  philMessage: string,
  concepts: [string, string],
  tryActivity: MILesson['tryActivity'],
  pfTitle: string,
  pfDesc: string,
  careerRole: string,
  terms: { term: string; def: string; analogy: string }[]
): MILesson {
  const [c1Title, c2Title] = concepts;
  return {
    id: `lof-${moduleId}`,
    moduleId,
    title,
    estimatedMinutes: 10,
    intro: {
      hook,
      philMessage,
      heroImage: img(moduleId, 'hero', `${title} lesson hero`),
    },
    coreConcepts: [
      {
        title: c1Title,
        explanation: `Learn how ${c1Title} fits into the language of finance and why professionals reference it in meetings and interviews.`,
        example: `Example: teams discuss ${c1Title} when evaluating deals, careers, or company performance.`,
        visual: img(moduleId, 'concept-1', `Diagram for ${c1Title}`),
      },
      {
        title: c2Title,
        explanation: `Understand ${c2Title} as part of the vocabulary that separates beginners from insiders in finance conversations.`,
        example: `Example: using ${c2Title} correctly signals you have done the homework.`,
        visual: img(moduleId, 'concept-2', `Diagram for ${c2Title}`),
      },
    ],
    tryActivity,
    connect: {
      personalFinance: {
        title: 'Your money',
        description: pfDesc,
        scenario: pfTitle,
        visual: img(moduleId, 'connect-pf', 'Personal finance connection'),
      },
      career: {
        title: 'On the job',
        description: `See how ${careerRole} roles use this vocabulary daily.`,
        role: careerRole,
        skills: ['Communication', 'Analysis', 'Teamwork'],
        visual: img(moduleId, 'connect-career', 'Career connection'),
      },
    },
    flashcards: terms.map((t) => ({
      term: t.term,
      definition: t.def,
      philsAnalogy: t.analogy,
    })),
    quiz: [
      {
        question: `Which best describes ${c1Title}?`,
        options: [
          `Core idea behind ${c1Title}`,
          'Unrelated to finance',
          'Only for accountants',
          'Illegal to discuss',
        ],
        correctIndex: 0,
        explanation: `${c1Title} is foundational vocabulary in this module.`,
      },
      {
        question: `Why does ${c2Title} matter in finance careers?`,
        options: [
          'It helps you sound prepared and think clearly',
          'It replaces all math',
          'It is only on social media',
          'It avoids networking',
        ],
        correctIndex: 0,
        explanation: 'Language signals preparation in interviews and internships.',
      },
      {
        question: 'What is the main goal of the Language of Finance section?',
        options: [
          'Learn vocabulary that signals insider knowledge',
          'Memorize stock tickers only',
          'Avoid reading any reports',
          'Skip career planning',
        ],
        correctIndex: 0,
        explanation: 'Terms open doors to finance conversations and roles.',
      },
    ],
    rewards: { bamboo: 15, xp: 3 },
  };
}

// NOTE: `languageOfFinanceLessons` is declared at the bottom of this file,
// after all referenced lesson constants are initialized, to avoid TDZ errors.

// ─────────────────────────────────────────────
// LOF-9  Margins & Ratios Decoded
// ─────────────────────────────────────────────
const marginsRatiosDecodedLesson: MILesson = {
  id: 'lof-margins-ratios-decoded',
  moduleId: 'margins-ratios-decoded',
  section: 'language-finance',
  title: 'Margins & Ratios Decoded',
  estimatedMinutes: 10,
  intro: {
    hook: 'Two sneaker brands both report $1 billion in revenue. One has a 60% gross margin. The other has 20%. One is printing money. The other is barely surviving. Same headline number. Completely different businesses.',
    philMessage: 'Margins tell you how efficiently a company turns revenue into profit. Ratios tell you if it can pay its bills and how leveraged it is. Together, they\'re the most important two-minute scan of any company.',
    heroImage: { src: '/market-intelligence/language-finance/margins-ratios-decoded/hero.png', alt: 'Panda analyst comparing two companies\' margin profiles side by side' },
  },
  coreConcepts: [
    {
      title: 'The Three Margin Types',
      explanation: 'Gross margin = (Revenue - Cost of Goods Sold) / Revenue. Shows raw product profitability. Operating margin subtracts operating expenses (salaries, rent). Net margin subtracts everything including interest and taxes — the final percent of revenue that becomes profit.',
      example: 'A software company: 80% gross margin, 25% operating margin, 18% net margin. A grocery chain: 25% gross, 3% operating, 2% net. Very different economics.',
      keyTerms: ['Gross margin'],
      visual: { src: '/market-intelligence/language-finance/margins-ratios-decoded/concept-margins.png', alt: 'Waterfall chart showing revenue to gross to operating to net margin' },
    },
    {
      title: 'Current Ratio',
      explanation: 'Current ratio = Current Assets / Current Liabilities. Measures short-term financial health. Above 1.5 is generally healthy — the company can cover near-term obligations. Below 1.0 is a warning sign: more due soon than available to pay.',
      example: 'A retailer has $5M in current assets (cash + inventory) and $3M in current liabilities (bills due soon). Current ratio = 1.67 — solid.',
      keyTerms: ['Current ratio'],
      visual: { src: '/market-intelligence/language-finance/margins-ratios-decoded/concept-current-ratio.png', alt: 'Current assets vs current liabilities scale visualization' },
    },
    {
      title: 'Debt-to-Equity',
      explanation: 'Debt-to-equity (D/E) ratio = Total Debt / Total Shareholders\' Equity. Shows how much a company is financed by debt vs. owner capital. Higher D/E means more financial risk — in downturns, debt payments must still be made even if revenues fall.',
      example: 'A telecom with D/E of 3.0 has $3 of debt for every $1 of equity. Risky if revenues soften. A tech company with D/E of 0.2 has minimal financial leverage — more resilient.',
      keyTerms: ['Debt-to-equity'],
      visual: { src: '/market-intelligence/language-finance/margins-ratios-decoded/concept-dte.png', alt: 'Balance scale showing debt vs equity weight' },
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Ratio Sort',
    description: 'Sort each metric into the right ratio category.',
    buckets: [
      { id: 'profitability', label: 'Profitability (Margins)' },
      { id: 'liquidity', label: 'Liquidity (Short-term Health)' },
      { id: 'leverage', label: 'Leverage (Debt Level)' },
    ],
    items: [
      { id: 'i1', label: 'Gross margin: 65%', correctBucket: 'profitability' },
      { id: 'i2', label: 'Current ratio: 2.1', correctBucket: 'liquidity' },
      { id: 'i3', label: 'Debt-to-equity: 4.5', correctBucket: 'leverage' },
      { id: 'i4', label: 'Net margin: 8%', correctBucket: 'profitability' },
      { id: 'i5', label: 'Cash: $2M, Bills due: $3M', correctBucket: 'liquidity' },
      { id: 'i6', label: 'Total debt: $500M, Total equity: $200M', correctBucket: 'leverage' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Ratios in your personal finances',
      description: 'You have a personal version of these ratios. Your personal "current ratio": cash on hand vs. bills due this month. Your personal D/E: total debt (student loans, credit cards) vs. net worth. Tracking them tells you your own financial health at a glance.',
      scenario: 'Monthly expenses: $2,000. Emergency fund: $6,000. Personal current ratio: 3.0. That\'s 3 months of coverage — solid.',
      visual: { src: '/market-intelligence/language-finance/margins-ratios-decoded/connect-pf.png', alt: 'Panda checking personal financial ratios on a simple dashboard' },
    },
    career: {
      title: 'Equity Analyst',
      description: 'Equity analysts screen hundreds of companies using margins and ratios before deciding which to research in depth. A quick ratio scan can filter a universe of 500 companies down to 20 worth studying in detail.',
      role: 'Equity Analyst',
      skills: ['Financial ratio analysis', 'Excel modeling', 'Sector comparison'],
      visual: { src: '/market-intelligence/language-finance/margins-ratios-decoded/connect-career.png', alt: 'Panda analyst screening companies by ratio metrics' },
    },
  },
  flashcards: [
    { term: 'Gross margin', definition: '(Revenue - Cost of Goods Sold) / Revenue; shows how profitable the core product is before any overhead.', philsAnalogy: 'The grove earns $100K from bamboo. The bamboo cost $40K to grow. Gross margin: 60%.' },
    { term: 'Operating margin', definition: 'Operating income / Revenue; profitability after cost of goods AND operating expenses like salaries and rent.', philsAnalogy: 'After paying workers and rent, Phil keeps 25 cents of every dollar. That\'s the operating margin.' },
    { term: 'Current ratio', definition: 'Current assets / current liabilities; below 1.0 is a warning sign that bills may not get paid on time.', philsAnalogy: 'Phil has $2K in the till and $1K in bills due this week. Current ratio of 2.0. He\'s fine.' },
    { term: 'Debt-to-equity', definition: 'Total debt / shareholders\' equity; measures financial leverage and risk from using borrowed money.', philsAnalogy: 'Phil borrowed $3 for every $1 he owns in the grove. Great when bamboo booms. Painful when it doesn\'t.' },
  ],
  quiz: [
    { question: 'Gross margin is calculated as:', options: ['Net income / Revenue', '(Revenue - COGS) / Revenue', 'Operating income / Total assets', 'Cash flow / Debt'], correctIndex: 1, explanation: 'Gross margin = (Revenue - Cost of Goods Sold) / Revenue — it shows the profit from the core product before overhead.' },
    { question: 'A current ratio of 0.7 means:', options: ['The company has 70% cash', 'The company has more short-term obligations than assets to cover them', 'The company is 30% leveraged', 'The company is very profitable'], correctIndex: 1, explanation: 'Below 1.0 means current liabilities exceed current assets — the company may struggle to pay near-term bills.' },
    { question: 'Company A has 80% gross margin. Company B has 20%. Everything else equal, which is more valuable?', options: ['Company B — lower margins mean lower prices', 'Company A — higher margins signal more efficient and profitable product economics', 'Neither — gross margin doesn\'t affect value', 'Company B — low-margin businesses are safer'], correctIndex: 1, explanation: 'Higher gross margins mean more profit from each dollar of revenue to reinvest or return to shareholders.' },
    { question: 'A high debt-to-equity ratio means:', options: ['The company is well-funded', 'The company is financed heavily by debt, increasing financial risk', 'The stock is cheap', 'Management owns a large stake'], correctIndex: 1, explanation: 'High D/E means debt payments must be made regardless of revenue — more risk in downturns.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// LOF-10  Valuation Basics
// ─────────────────────────────────────────────
const valuationBasicsLesson: MILesson = {
  id: 'lof-valuation-basics',
  moduleId: 'valuation-basics',
  section: 'language-finance',
  title: 'Valuation Basics',
  estimatedMinutes: 14,
  intro: {
    hook: 'Two companies both earn $10 per share. One trades at $100 (P/E of 10). The other trades at $300 (P/E of 30). Are investors wrong about one of them? Or do they know something you don\'t?',
    philMessage: 'Valuation is how investors answer "is this stock cheap or expensive?" Learning to read P/E ratios, market cap, and enterprise value gives you the vocabulary to understand every analyst recommendation you\'ll ever see.',
    heroImage: { src: '/market-intelligence/language-finance/valuation-basics/hero.png', alt: 'Panda holding a price tag next to a business and comparing to another price tag' },
  },
  coreConcepts: [
    {
      title: 'Price-to-Earnings Ratio',
      explanation: 'P/E ratio = Stock Price / Earnings Per Share. It tells you how much investors are paying for each dollar of earnings. A P/E of 20 means investors pay $20 for $1 of annual profit. Higher P/E = more growth expected. Lower P/E = slower growth or more risk.',
      example: 'A mature retailer trades at P/E 12 (slow growth, stable). A fast-growing tech company trades at P/E 45 (investors paying a premium for expected future growth).',
      keyTerms: ['P/E ratio'],
      visual: { src: '/market-intelligence/language-finance/valuation-basics/concept-pe.png', alt: 'P/E ratio formula with high vs low P/E examples' },
    },
    {
      title: 'Market Cap vs. Enterprise Value',
      explanation: 'Market cap = Share price × shares outstanding. It\'s the equity value of a company. Enterprise Value (EV) = Market cap + Debt - Cash. EV is the "total takeover price" — you\'d pay market cap for the shares, assume the debt, and keep the cash.',
      example: 'A company with $50 market cap, $20B debt, and $5B cash has EV of $65B. An acquirer would really pay $65B to own the whole thing.',
      keyTerms: ['Market cap'],
      visual: { src: '/market-intelligence/language-finance/valuation-basics/concept-ev.png', alt: 'Diagram building enterprise value from market cap plus debt minus cash' },
    },
    {
      title: 'Comp Tables',
      explanation: 'A comp table (comparable company analysis) lines up similar companies\' valuation multiples — P/E, EV/EBITDA, Price/Sales — to see if the target is cheap or expensive relative to peers. This is how most M&A and equity research valuation is done.',
      example: 'Streaming comps: Netflix 30x EV/EBITDA, Disney 18x, Paramount 8x. If you think Paramount has similar quality to Disney, 8x vs 18x suggests it\'s cheap — or the market knows something you don\'t.',
      keyTerms: ['Comparable analysis'],
      visual: { src: '/market-intelligence/language-finance/valuation-basics/concept-comps.png', alt: 'Sample comp table with columns for P/E, EV/EBITDA, and revenue growth' },
    },
  ],
  tryActivity: {
    type: 'compound-compare',
    title: 'P/E Growth Explorer',
    description: 'See how different P/E ratios imply different growth expectations. Which P/E is justified by the growth rate?',
    defaultStartAge: 20,
    defaultMonthly: 300,
    annualReturnRate: 0.1,
    retirementAge: 55,
  },
  connect: {
    personalFinance: {
      title: 'P/E tells you what you\'re paying',
      description: 'When you invest in an index fund, you\'re paying the aggregate P/E of the market. In early 2024, the S&P 500 had a P/E around 25. Historically, paying high P/Es for the overall market means lower expected 10-year returns. Context always matters.',
      scenario: 'Before buying any individual stock, look up the P/E on any finance site. Compare it to the industry average. If it\'s 2x the industry, ask: why does the market think this company grows so much faster?',
      visual: { src: '/market-intelligence/language-finance/valuation-basics/connect-pf.png', alt: 'Panda looking up P/E ratio on a finance app before buying a stock' },
    },
    career: {
      title: 'M&A Analyst',
      description: 'Investment bankers and corporate development analysts build comp tables to advise on acquisitions. Setting the right price matters: too high and you destroy shareholder value, too low and the target rejects the offer.',
      role: 'M&A Analyst',
      skills: ['Comparable company analysis', 'DCF modeling', 'Deal structuring'],
      visual: { src: '/market-intelligence/language-finance/valuation-basics/connect-career.png', alt: 'Panda M&A analyst presenting a comp table in a boardroom' },
    },
  },
  flashcards: [
    { term: 'P/E ratio', definition: 'Price divided by earnings per share; shows how much investors pay for each dollar of profit. Higher P/E = more growth expected.', philsAnalogy: 'You pay $30 for a bamboo grove that earns $1/year. P/E of 30. You expect it to grow fast to justify that price.' },
    { term: 'Market cap', definition: 'Share price × shares outstanding; the total equity value of a company in the stock market.', philsAnalogy: '10 million bamboo grove shares at $20 each = $200M market cap. That\'s what the market says the whole grove is worth.' },
    { term: 'Enterprise value', definition: 'Market cap + debt - cash; the total cost to acquire a company including assuming its debt and keeping its cash.', philsAnalogy: 'The grove costs $200M to buy (market cap). It has a $50M loan you inherit and $10M cash in the till. EV = $240M.' },
    { term: 'Comparable analysis', definition: 'Valuing a company by comparing its multiples to similar publicly traded companies; the most common valuation approach.', philsAnalogy: 'If every bamboo grove on the block sells for 10x annual earnings, your grove is probably worth 10x too — unless something is different.' },
  ],
  quiz: [
    { question: 'A company with a P/E of 35 vs. an industry average of 18 suggests:', options: ['The company is cheap', 'Investors expect significantly higher growth from this company', 'The company has low earnings', 'The stock is about to drop'], correctIndex: 1, explanation: 'A P/E premium to peers usually reflects higher expected growth — or sometimes just more hype.' },
    { question: 'Enterprise value is different from market cap because:', options: ['It only counts shares held by institutions', 'It includes debt and subtracts cash to show the true acquisition cost', 'It\'s based on future earnings not current price', 'It excludes small companies'], correctIndex: 1, explanation: 'EV = market cap + debt - cash. This is the real cost an acquirer pays, since they inherit the debt and receive the cash.' },
    { question: 'A comp table helps analysts:', options: ['Predict exact stock prices', 'Compare a company\'s valuation multiples to similar peers', 'Calculate dividend payments', 'Measure employee satisfaction'], correctIndex: 1, explanation: 'Comp tables reveal whether a company is cheap or expensive relative to its peer group based on standard valuation multiples.' },
    { question: 'Which type of company usually has the highest P/E ratio?', options: ['A slow-growing utility', 'A high-growth technology company', 'A company with declining revenues', 'A company paying high dividends'], correctIndex: 1, explanation: 'High P/E reflects high expected future growth — tech companies often trade at high multiples when growth is strong.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// LOF-11  Risk & Beta
// ─────────────────────────────────────────────
const riskAndBetaLesson: MILesson = {
  id: 'lof-risk-and-beta',
  moduleId: 'risk-and-beta',
  section: 'language-finance',
  title: 'Risk & Beta',
  estimatedMinutes: 10,
  intro: {
    hook: 'The S&P 500 drops 10%. Some stocks fall 5%. Some fall 20%. Some actually go up. The measure that tells you in advance which direction a stock is likely to go, and how far, is called beta.',
    philMessage: 'Beta is one of the most used risk metrics in finance. Understanding it — along with alpha — gives you a way to talk about risk and return in the same language as professional investors.',
    heroImage: { src: '/market-intelligence/language-finance/risk-and-beta/hero.png', alt: 'Panda at a control panel with a dial labeled beta from 0 to 2' },
  },
  coreConcepts: [
    {
      title: 'Beta = Market Sensitivity',
      explanation: 'Beta measures how much a stock moves relative to the market. Beta of 1.0 = moves with the market. Beta of 1.5 = moves 50% more than the market (up and down). Beta of 0.5 = moves half as much. Beta below 0 = moves opposite the market.',
      example: 'The S&P 500 drops 10%. A stock with beta 1.5 drops about 15%. A utility with beta 0.4 drops about 4%. A gold fund with beta -0.3 might rise 3%.',
      keyTerms: ['Beta'],
      visual: { src: '/market-intelligence/language-finance/risk-and-beta/concept-beta.png', alt: 'Chart showing S&P 500 vs. high beta and low beta stock movements' },
    },
    {
      title: 'Alpha',
      explanation: 'Alpha is the return above what beta (market exposure) alone would predict. Positive alpha = the stock outperformed its risk level. Zero alpha = it performed exactly as beta predicted. Negative alpha = underperformed for its risk level.',
      example: 'A stock with beta 1.2 should have returned 12% if the market returned 10%. If it returned 15%, the extra 3% is alpha — performance beyond market exposure.',
      keyTerms: ['Alpha'],
      visual: { src: '/market-intelligence/language-finance/risk-and-beta/concept-alpha.png', alt: 'Diagram separating total return into beta-driven return and alpha' },
    },
    {
      title: 'Sharpe Ratio in One Line',
      explanation: 'The Sharpe ratio measures return per unit of risk: (Portfolio Return - Risk-free Rate) / Standard Deviation. Higher Sharpe = more return for each unit of risk taken. It\'s how professionals compare funds that have different risk levels.',
      example: 'Fund A returns 15% with high volatility (Sharpe 0.8). Fund B returns 10% with low volatility (Sharpe 1.4). Fund B is actually the better risk-adjusted investment.',
      keyTerms: ['Sharpe ratio'],
      visual: { src: '/market-intelligence/language-finance/risk-and-beta/concept-sharpe.png', alt: 'Two funds compared by return vs risk: Sharpe ratio determines winner' },
    },
  ],
  tryActivity: {
    type: 'term-classify',
    title: 'High Beta or Low Beta?',
    description: 'Sort each stock into High Beta (more volatile than the market) or Low Beta (less volatile).',
    categories: [
      { id: 'high', label: 'High Beta (β > 1.2)' },
      { id: 'low', label: 'Low Beta (β < 0.8)' },
    ],
    terms: [
      { id: 't1', label: 'Small biotech stock with clinical trials pending', correctCategory: 'high' },
      { id: 't2', label: 'Electric utility serving a regulated state market', correctCategory: 'low' },
      { id: 't3', label: 'Early-stage electric vehicle startup', correctCategory: 'high' },
      { id: 't4', label: 'Consumer staples giant selling soap and cereal', correctCategory: 'low' },
      { id: 't5', label: 'High-growth social media platform', correctCategory: 'high' },
      { id: 't6', label: 'Large diversified bank with stable dividend history', correctCategory: 'low' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Use beta to understand your portfolio\'s risk',
      description: 'A portfolio heavy in high-beta tech stocks will feel much more volatile than the market. When the market drops 10%, your portfolio might drop 15–20%. Knowing your portfolio\'s overall beta helps you prepare emotionally and financially for swings.',
      scenario: 'You have 60% in a growth index (avg beta ~1.3) and 40% in a bond fund (beta ~0.1). Portfolio beta ≈ 0.82. When the market drops 10%, expect roughly an 8% drop.',
      visual: { src: '/market-intelligence/language-finance/risk-and-beta/connect-pf.png', alt: 'Panda calculating portfolio beta from individual positions' },
    },
    career: {
      title: 'Risk Quant',
      description: 'Quantitative risk analysts at hedge funds and banks measure portfolio risk daily using beta, VaR (Value at Risk), and correlation matrices. They build models that tell portfolio managers exactly how much risk is in each position.',
      role: 'Risk Quant',
      skills: ['Statistical modeling', 'Python/R programming', 'Portfolio risk metrics'],
      visual: { src: '/market-intelligence/language-finance/risk-and-beta/connect-career.png', alt: 'Panda quant writing code to calculate portfolio beta and VaR' },
    },
  },
  flashcards: [
    { term: 'Beta', definition: 'A measure of a stock\'s sensitivity to market movements; beta 1.5 means the stock moves 50% more than the market.', philsAnalogy: 'The market bamboo price drops $10. High-beta bamboo drops $15. Low-beta drops $5. Same storm, different impact.' },
    { term: 'Alpha', definition: 'Return above what beta would predict; positive alpha means the investment outperformed its risk-adjusted expected return.', philsAnalogy: 'Phil\'s grove should have earned 10% based on its risk. It earned 14%. That extra 4% is Phil\'s alpha.' },
    { term: 'Sharpe ratio', definition: 'Return above the risk-free rate divided by volatility; measures return per unit of risk.', philsAnalogy: 'Two groves earn the same. One is far away and hard to tend. The nearby one has a better Sharpe — same return, less effort/risk.' },
    { term: 'Volatility', definition: 'The statistical measure of price swings; high volatility = large movements up and down.', philsAnalogy: 'Bamboo prices that swing from $5 to $50 in a month have high volatility. Prices that stay between $18 and $22 have low volatility.' },
  ],
  quiz: [
    { question: 'A stock with beta of 1.5 in a market that drops 10% would likely:', options: ['Drop about 5%', 'Drop about 15%', 'Rise 10%', 'Move exactly 10%'], correctIndex: 1, explanation: 'Beta 1.5 means 1.5x market movement. 10% × 1.5 = ~15% drop.' },
    { question: 'Positive alpha means:', options: ['The stock has a high price', 'The investment returned more than its risk level (beta) predicted', 'Beta is positive', 'The Sharpe ratio is above 1.0'], correctIndex: 1, explanation: 'Alpha is the excess return above what beta exposure alone would generate — it measures manager or stock-specific performance.' },
    { question: 'Two funds have the same 12% return. Fund A has Sharpe of 0.6, Fund B has Sharpe of 1.2. Which is better?', options: ['Fund A — same return, might have better tax treatment', 'Fund B — achieves the same return with less risk per unit', 'They are identical', 'Fund A — higher raw return always wins'], correctIndex: 1, explanation: 'The Sharpe ratio measures return per unit of risk. Fund B earns the same return with half the risk — clearly superior on a risk-adjusted basis.' },
    { question: 'Which type of company typically has the lowest beta?', options: ['High-growth tech startup', 'Electric utility with regulated revenues', 'Biotech company with a drug in trials', 'Cryptocurrency exchange'], correctIndex: 1, explanation: 'Regulated utilities have stable, predictable cash flows that barely respond to broad market movements — very low beta.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// LOF-12  Debt & Credit Language
// ─────────────────────────────────────────────
const debtCreditLanguageLesson: MILesson = {
  id: 'lof-debt-credit-language',
  moduleId: 'debt-and-credit-language',
  section: 'language-finance',
  title: 'Debt & Credit Language',
  estimatedMinutes: 12,
  intro: {
    hook: 'The bond market is twice the size of the stock market. Yet most people know almost nothing about it. Every company, every government, every mortgage relies on it. Once you learn the language, a whole new dimension of finance opens up.',
    philMessage: 'Bonds are just loans that can be bought and sold. Once you get that, everything else — coupon, yield, credit rating — falls into place quickly.',
    heroImage: { src: '/market-intelligence/language-finance/debt-credit-language/hero.png', alt: 'Panda holding a bond certificate at an auction house' },
  },
  coreConcepts: [
    {
      title: 'Bond Basics: Coupon and Yield',
      explanation: 'A bond is a loan. The issuer (company or government) borrows money and promises to pay interest (the "coupon") regularly and return the principal at maturity. Coupon is fixed in dollars. Yield is the annualized return based on the current price — it changes as the bond price moves.',
      example: 'A $1,000 bond with a 5% coupon pays $50/year in interest. If the bond price drops to $900, the yield rises to 5.56% ($50/$900) — same $50 payment, lower price.',
      keyTerms: ['Bond'],
      visual: { src: '/market-intelligence/language-finance/debt-credit-language/concept-bond.png', alt: 'Bond anatomy diagram: face value, coupon rate, maturity, current yield' },
    },
    {
      title: 'Why Yields and Prices Move Opposite',
      explanation: 'Bond prices and yields move in opposite directions — always. When rates rise, existing bonds become less attractive (their fixed coupon is now below market rate), so prices fall and yields rise. When rates fall, existing bonds become more valuable, prices rise, yields fall.',
      example: 'You own a bond paying 4%. New bonds now pay 6%. Your bond is less attractive, so its price falls until its yield matches 6%. The coupon didn\'t change — the price did.',
      keyTerms: ['Yield'],
      visual: { src: '/market-intelligence/language-finance/debt-credit-language/concept-yield.png', alt: 'Seesaw diagram: bond price on one side, yield on the other' },
    },
    {
      title: 'Credit Ratings and What They Mean',
      explanation: 'Credit rating agencies (Moody\'s, S&P, Fitch) rate issuers on their ability to repay debt. AAA/Aaa is the highest (US Treasury). Investment grade: BBB-/Baa3 and above. Below that: "junk" (high yield) bonds — higher interest rates to compensate for higher default risk.',
      example: 'Apple (AAA equivalent) borrows at 4.5%. A struggling retailer (BB- rated) borrows at 8.5%. The extra 4% is the "credit spread" — the cost of additional default risk.',
      keyTerms: ['Credit rating'],
      visual: { src: '/market-intelligence/language-finance/debt-credit-language/concept-ratings.png', alt: 'Credit rating scale from AAA to D with examples of issuers' },
    },
  ],
  tryActivity: {
    type: 'role-match',
    title: 'Who Holds This Bond?',
    description: 'Match the bond type to the investor most likely to hold it.',
    roles: [
      { id: 'pension', name: 'Pension Fund Manager', description: 'Manages retirement assets for thousands of beneficiaries; needs stable, predictable returns.' },
      { id: 'hedgefund', name: 'High-Yield Hedge Fund', description: 'Seeks higher returns; comfortable taking credit risk for a premium yield.' },
      { id: 'retiree', name: 'Conservative Retiree', description: 'Needs income but cannot afford big losses; prioritizes capital preservation.' },
    ],
    scenarios: [
      { id: 's1', description: 'AAA-rated US Treasury bond yielding 4.5%', correctRoleId: 'retiree' },
      { id: 's2', description: 'BB-rated retail company bond yielding 8.5%', correctRoleId: 'hedgefund' },
      { id: 's3', description: 'Investment-grade corporate bond portfolio yielding 5.2%', correctRoleId: 'pension' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your mortgage is a bond from a bank\'s view',
      description: 'When you take a mortgage, you\'re the "bond issuer" — the bank is the buyer. Your interest rate is your coupon. Your credit score is your credit rating. A higher score = lower rate (the bank trusts you more). This is the bond market applied to your home loan.',
      scenario: 'Credit score 750 → mortgage at 6.5%. Credit score 650 → mortgage at 7.8%. Same house, same down payment. The 1.3% difference costs $40,000+ over 30 years on a $300K loan.',
      visual: { src: '/market-intelligence/language-finance/debt-credit-language/connect-pf.png', alt: 'Panda comparing mortgage rates at different credit scores' },
    },
    career: {
      title: 'Credit Analyst',
      description: 'Credit analysts at banks and rating agencies assess whether borrowers can repay debt. They model cash flows, stress-test scenarios, and assign internal ratings. The job requires both financial modeling and judgment about business risk.',
      role: 'Credit Analyst',
      skills: ['Credit modeling', 'Cash flow analysis', 'Covenant review'],
      visual: { src: '/market-intelligence/language-finance/debt-credit-language/connect-career.png', alt: 'Panda credit analyst reviewing a borrower\'s financial statements' },
    },
  },
  flashcards: [
    { term: 'Bond', definition: 'A debt instrument: the issuer borrows money and promises to pay periodic interest (coupon) and return principal at maturity.', philsAnalogy: 'Phil borrows $10,000 from investors, pays them $500/year interest, and returns the $10,000 in 10 years. That\'s a bond.' },
    { term: 'Yield', definition: 'The annualized return of a bond based on its current price; inversely related to price.', philsAnalogy: 'Phil\'s grove bond pays $500/year. If you paid $10K for it, yield is 5%. If the price drops to $8K, yield rises to 6.25%.' },
    { term: 'Credit rating', definition: 'An agency\'s opinion of a borrower\'s ability to repay debt; AAA = highest quality, D = default.', philsAnalogy: 'Phil has paid every bamboo loan on time for 20 years. His credit rating is excellent. New borrowers pay higher rates.' },
    { term: 'Coupon', definition: 'The fixed annual interest payment on a bond, expressed as a percentage of face value.', philsAnalogy: 'A 5% coupon on a $1,000 bond = $50/year, no matter what happens to the bond\'s market price.' },
  ],
  quiz: [
    { question: 'When interest rates rise, bond prices:', options: ['Rise too', 'Fall', 'Stay the same', 'Double'], correctIndex: 1, explanation: 'Bond prices and yields move inversely. Rising rates make existing bonds less attractive, so their prices fall.' },
    { question: 'A "junk bond" is:', options: ['A worthless bond', 'A below-investment-grade bond with higher yield to compensate for higher default risk', 'An expired bond', 'A bond from a foreign country'], correctIndex: 1, explanation: 'Junk (high-yield) bonds are rated below BBB-. They compensate investors for higher default risk with higher interest rates.' },
    { question: 'A bond\'s coupon rate is 6% and its current price is $1,100. The current yield is:', options: ['6%', '5.45% (because $60/$1,100 = 5.45%)', '7.2%', 'The same as the coupon'], correctIndex: 1, explanation: 'Current yield = coupon payment / current price = $60/$1,100 = 5.45%. Premium price reduces the effective yield.' },
    { question: 'Why does a company with a lower credit rating pay higher interest on its bonds?', options: ['They issue more bonds', 'Investors demand higher returns to compensate for greater default risk', 'The government requires higher rates for risky companies', 'Lower-rated companies always have lower revenues'], correctIndex: 1, explanation: 'Credit spreads compensate investors for the additional risk that the borrower might not repay. More risk = higher required return.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// LOF-13  Earnings Season Glossary
// ─────────────────────────────────────────────
const earningsSeasonGlossaryLesson: MILesson = {
  id: 'lof-earnings-season-glossary',
  moduleId: 'earnings-season-glossary',
  section: 'language-finance',
  title: 'Earnings Season Glossary',
  estimatedMinutes: 10,
  intro: {
    hook: 'Four times a year, for about 3 weeks at a stretch, the entire financial world talks about earnings. Stocks move 10%, 20%, 30%. The same 30 words appear constantly. Once you know those words, you can decode every earnings headline instantly.',
    philMessage: 'Earnings season is wall-to-wall signal. Most investors can\'t separate the crucial from the routine. Learn these terms and you\'ll process faster than almost everyone in your group chat.',
    heroImage: { src: '/market-intelligence/language-finance/earnings-season-glossary/hero.png', alt: 'Panda reading a rapidly scrolling earnings ticker with glossary cards flying by' },
  },
  coreConcepts: [
    {
      title: 'Beat / Miss / In-Line',
      explanation: 'Before earnings, analysts set consensus estimates — a group average of what they expect. Beat = actual results above consensus. Miss = actual results below consensus. In-line = at consensus. The market reacts to the surprise, not the absolute number.',
      example: 'Company earns $2.50/share. Consensus was $2.20. Beat by $0.30. Stock +8%. Same company earns $2.50 when consensus was $2.60. Technically positive, but it "missed." Stock -5%.',
      keyTerms: ['Beat'],
      visual: { src: '/market-intelligence/language-finance/earnings-season-glossary/concept-beat-miss.png', alt: 'Three scenarios: beat, miss, and in-line with typical stock reactions' },
    },
    {
      title: 'Guidance',
      explanation: 'After reporting the past quarter, management gives guidance: their own estimate for next quarter and/or full year. Guidance is often more important than the just-reported quarter. "Raising guidance" is bullish. "Lowering guidance" (guiding down) causes stock drops even on beat quarters.',
      example: '"Beats Q3, guides Q4 lower." This headline typically means the stock falls despite the good Q3 result, because Q4 is where the business is now heading.',
      keyTerms: ['Guidance'],
      visual: { src: '/market-intelligence/language-finance/earnings-season-glossary/concept-guidance.png', alt: 'Arrow diagram: reported quarter (past) vs guidance (future) and which matters more to markets' },
    },
    {
      title: 'Forward P/E',
      explanation: 'Forward P/E = Current stock price / Next twelve months estimated earnings per share. It shows what investors are paying for expected future earnings — more relevant than trailing P/E (which uses past earnings). After guidance updates, forward P/E often shifts significantly.',
      example: 'Stock at $100, expected EPS next year $5. Forward P/E = 20x. If guidance cuts next year EPS to $4, forward P/E jumps to 25x — suddenly looks more expensive at the same price.',
      keyTerms: ['Forward P/E'],
      visual: { src: '/market-intelligence/language-finance/earnings-season-glossary/concept-forward-pe.png', alt: 'Comparison of trailing vs forward P/E and how guidance shifts it' },
    },
  ],
  tryActivity: {
    type: 'headline-decoder',
    title: 'Earnings Headline Check',
    description: 'Read each earnings-season headline. Is it a real signal or headline noise?',
    headlines: [
      {
        id: 'e1',
        text: 'Retailer beats EPS by 12% — lowers full-year guidance citing "macro uncertainty"',
        signalPhrase: 'lowers full-year guidance',
        correctCall: 'signal',
        feedback: 'The beat is backward-looking. Lowering full-year guidance is forward-looking and reveals management sees problems ahead. Signal.',
      },
      {
        id: 'e2',
        text: 'Bank meets earnings expectations exactly — stock flat',
        signalPhrase: 'meets earnings expectations exactly',
        correctCall: 'noise',
        feedback: 'In-line is no surprise. Markets had already priced this result. Noise.',
      },
      {
        id: 'e3',
        text: 'Tech giant raises full-year guidance by 8% — "strongest demand environment we\'ve seen in years"',
        signalPhrase: 'raises full-year guidance by 8%',
        correctCall: 'signal',
        feedback: 'An 8% guidance raise means the company sees accelerating business. That changes forward P/E and future estimates. Signal.',
      },
      {
        id: 'e4',
        text: 'CEO thanks employees during earnings call, says "our team is the best in the industry"',
        signalPhrase: '"our team is the best in the industry"',
        correctCall: 'noise',
        feedback: 'Every CEO says this. Employee praise has zero information content for investors. Pure noise.',
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Read the summary, not just the headline',
      description: 'The single most useful free resource after an earnings release is the earnings call transcript — especially the Q&A section, where analysts push management on the guidance. Read the Q&A before acting on any headlines.',
      scenario: 'You own a stock. It beats EPS by 5%. Before celebrating, check: what did management say about next quarter? One number from the guidance section matters more than the entire headline.',
      visual: { src: '/market-intelligence/language-finance/earnings-season-glossary/connect-pf.png', alt: 'Panda scrolling past the headline to read the full earnings transcript' },
    },
    career: {
      title: 'Earnings Reporter / Financial Journalist',
      description: 'Financial journalists covering earnings have 20–30 minutes after a release to write a coherent article. The best ones immediately go to the guidance section, the cash flow statement, and the Q&A to find the real story that\'ll move the stock.',
      role: 'Earnings Reporter',
      skills: ['Financial literacy', 'Speed writing', 'Source analysis'],
      visual: { src: '/market-intelligence/language-finance/earnings-season-glossary/connect-career.png', alt: 'Panda journalist rapidly typing an earnings article with a clock ticking' },
    },
  },
  flashcards: [
    { term: 'Beat', definition: 'When a company\'s actual results exceed analyst consensus estimates; the stock usually rises.', philsAnalogy: 'Analysts said Phil\'s grove would earn $10K. It earned $14K. Beat by $4K. Phil\'s stock pops.' },
    { term: 'Guidance', definition: 'Management\'s own forecast for next quarter or year; often more market-moving than the reported quarter.', philsAnalogy: 'Phil had a great harvest, but says next season looks dry. Investors care more about next season. Stock falls.' },
    { term: 'Forward P/E', definition: 'Stock price divided by estimated next-twelve-months earnings; shows what investors pay for expected future profits.', philsAnalogy: 'Phil\'s grove trades at $100. Estimated next-year earnings: $5. Forward P/E = 20x. Then guidance drops to $4 earnings → forward P/E jumps to 25x. More expensive, same price.' },
    { term: 'Consensus estimate', definition: 'The average forecast from all analysts covering a stock; the bar a company is measured against each quarter.', philsAnalogy: 'All 12 bamboo analysts predicted $10K earnings. That\'s the consensus. Phil\'s actual result is judged against it.' },
  ],
  quiz: [
    { question: 'A company reports strong earnings but its stock drops. The most likely reason is:', options: ['The earnings beat was too large', 'The company lowered forward guidance', 'The stock market is closed', 'An analyst upgraded the stock'], correctIndex: 1, explanation: 'Guidance for the future overrides the past quarter. Lowering guidance signals weaker business ahead — stocks fall despite the beat.' },
    { question: 'What does "in-line" mean in earnings reporting?', options: ['The company just went public', 'Results matched analyst consensus estimates exactly', 'The company is growing in a straight line', 'The CEO gave an interview on TV'], correctIndex: 1, explanation: 'In-line means no surprise. The result was already priced in, so the stock typically barely moves.' },
    { question: 'Forward P/E rises after earnings guidance is cut. This means:', options: ['The stock got cheaper', 'The stock looks more expensive because future earnings were reduced', 'The market is growing', 'The company increased dividends'], correctIndex: 1, explanation: 'Lower expected earnings = higher P/E at the same price. The stock looks more expensive after a guidance cut.' },
    { question: 'During earnings season, what should you read FIRST to understand the real story?', options: ['The stock price chart', 'The guidance section and Q&A transcript', 'The title of the press release', 'The CEO\'s Twitter feed'], correctIndex: 1, explanation: 'Guidance and Q&A contain forward-looking information and analyst challenges — where the real market-moving content lives.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// LOF-14  M&A & IPO Vocabulary
// ─────────────────────────────────────────────
const maIpoVocabLesson: MILesson = {
  id: 'lof-ma-ipo-vocab',
  moduleId: 'ma-ipo-vocab',
  section: 'language-finance',
  title: 'M&A & IPO Vocabulary',
  estimatedMinutes: 12,
  intro: {
    hook: 'A company goes from a startup valued at $200 million to a $4 billion IPO in 4 years. Its founders can now sell shares. Its employees can exercise options. The original investors can exit. One moment — the IPO — changed everything.',
    philMessage: 'Mergers, acquisitions, and IPOs are the biggest events in a company\'s life. Once you know the vocabulary, you can decode every deal announcement, SPAC rumor, and lock-up expiration that hits your feed.',
    heroImage: { src: '/market-intelligence/language-finance/ma-ipo-vocab/hero.png', alt: 'Panda ringing the NYSE opening bell at an IPO ceremony' },
  },
  coreConcepts: [
    {
      title: 'IPO Mechanics Basics',
      explanation: 'An Initial Public Offering (IPO) is when a private company sells shares to the public for the first time. The company hires investment banks (underwriters) to set the price, build a "book" of institutional buyers, and manage the launch. IPO proceeds go to the company or to early investors (insiders) selling their shares.',
      example: 'A delivery startup files for an IPO at $18/share. Banks market it to institutions. Shares open to the public at $22 ("first-day pop"). The company raised $500M at $18; the pop benefits early secondary buyers, not the company.',
      keyTerms: ['IPO'],
      visual: { src: '/market-intelligence/language-finance/ma-ipo-vocab/concept-ipo.png', alt: 'IPO process: private → filing → roadshow → first day trading' },
    },
    {
      title: 'Strategic vs. Financial Buyers',
      explanation: 'In M&A, buyers have very different goals. A strategic buyer (another company) acquires to gain market share, technology, or talent — often pays more because of synergies. A financial buyer (private equity firm) acquires to improve operations and sell later for a profit — often more price-disciplined.',
      example: 'Microsoft acquiring LinkedIn ($26B, 2016) = strategic: LinkedIn data feeds Microsoft\'s products. A PE firm acquiring the same company would model IRR and exit multiple — likely at a lower price.',
      keyTerms: ['Strategic buyer'],
      visual: { src: '/market-intelligence/language-finance/ma-ipo-vocab/concept-buyers.png', alt: 'Two-column comparison: strategic buyer vs financial buyer goals and tactics' },
    },
    {
      title: 'Lock-Up Period',
      explanation: 'After an IPO, insiders (employees, early investors, founders) are typically prohibited from selling shares for 90–180 days. This "lock-up period" prevents insiders from immediately cashing out and flooding the market with shares. When the lock-up expires, if insiders sell heavily, the stock often drops.',
      example: 'A tech IPO launches at $20/share. Lock-up expires 180 days later. CEO and CFO sell $50M in shares. Stock drops 12% that week. The selling pressure was entirely predictable.',
      keyTerms: ['Lock-up period'],
      visual: { src: '/market-intelligence/language-finance/ma-ipo-vocab/concept-lockup.png', alt: 'Timeline showing IPO date, lock-up period, expiration, and typical stock drop' },
    },
  ],
  tryActivity: {
    type: 'term-classify',
    title: 'Deal Term Sort',
    description: 'Sort each M&A or IPO term into the right category.',
    categories: [
      { id: 'ipo', label: 'IPO Mechanics' },
      { id: 'ma', label: 'M&A Deals' },
      { id: 'both', label: 'Both / Either' },
    ],
    terms: [
      { id: 't1', label: 'Lock-up expiration', correctCategory: 'ipo' },
      { id: 't2', label: 'Strategic acquirer paying a premium for synergies', correctCategory: 'ma' },
      { id: 't3', label: 'Underwriter managing the deal', correctCategory: 'both' },
      { id: 't4', label: 'Roadshow to pitch institutional investors', correctCategory: 'ipo' },
      { id: 't5', label: 'Due diligence on target company', correctCategory: 'ma' },
      { id: 't6', label: 'Share price set before first day of trading', correctCategory: 'ipo' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'IPO stocks are tricky for retail investors',
      description: 'Retail investors rarely get IPO shares at the offer price — that\'s reserved for institutional clients. You buy on the open market at or above the first-day pop price. Studies show buying IPOs at the open on day one underperforms the market on average over 3 years. Wait and watch.',
      scenario: 'A hot IPO opens at $30 (offer was $18). You buy at $30. Most IPOs underperform over the next year at that entry price. The advantage was captured by the institutions that got the $18 allocation.',
      visual: { src: '/market-intelligence/language-finance/ma-ipo-vocab/connect-pf.png', alt: 'Panda watching first-day IPO pop from a distance, choosing to wait' },
    },
    career: {
      title: 'IB Associate (M&A)',
      description: 'Investment banking associates on M&A deal teams advise buyers and sellers on every aspect of transactions: valuation, deal structure, due diligence, regulatory approval, and financing. It\'s one of the most intense and well-compensated analyst roles in finance.',
      role: 'IB Associate',
      skills: ['Valuation modeling', 'Deal structuring', 'Due diligence'],
      visual: { src: '/market-intelligence/language-finance/ma-ipo-vocab/connect-career.png', alt: 'Panda IB associate in a deal war room with models on multiple screens' },
    },
  },
  flashcards: [
    { term: 'IPO', definition: 'Initial Public Offering — when a private company first sells shares to the public, listing on a stock exchange.', philsAnalogy: 'Phil\'s bamboo operation has been private for 10 years. Today, anyone can buy a piece. That\'s the IPO.' },
    { term: 'Strategic buyer', definition: 'A corporation acquiring another company primarily for operational synergies, market share, or capabilities — often pays a premium.', philsAnalogy: 'A big bamboo chain buys Phil\'s grove to get his special high-yield breed. They\'d pay more because of what the grove adds to the chain.' },
    { term: 'Lock-up period', definition: 'A 90–180 day restriction preventing insiders from selling IPO shares after a company goes public.', philsAnalogy: 'Phil and his co-founders can\'t sell their bamboo shares for 6 months after the IPO. This prevents a rush to exit before the public has information.' },
    { term: 'Underwriter', definition: 'An investment bank that manages an IPO or debt offering: sets the price, builds demand, and guarantees the deal.', philsAnalogy: 'Phil hires the biggest bamboo bank to handle his IPO. They promise to sell all the shares and take responsibility if they can\'t.' },
  ],
  quiz: [
    { question: 'In an IPO, who typically benefits from the first-day price pop?', options: ['Retail investors who bought on day one', 'Institutional investors who received shares at the offer price', 'The company itself', 'The stock exchange'], correctIndex: 1, explanation: 'Institutional investors get IPO shares at the offer price. The pop means their shares are immediately worth more. Retail investors buying at the open pay the inflated price.' },
    { question: 'A strategic buyer pays a 30% premium for an acquisition. This is most likely because:', options: ['They want to overpay for publicity', 'They expect synergies that make the combined entity worth more than the sum of parts', 'Regulators require a premium', 'Financial buyers set the price floor'], correctIndex: 1, explanation: 'Strategic buyers justify premiums through synergies — cost savings, revenue cross-selling, or technology gains from combining the two companies.' },
    { question: 'Lock-up periods exist primarily to:', options: ['Prevent companies from going private again', 'Prevent insiders from immediately selling and flooding the market', 'Force retail investors to hold shares', 'Limit the IPO size'], correctIndex: 1, explanation: 'Lock-ups protect the post-IPO stock price from being overwhelmed by insider selling before the public has had time to properly value the company.' },
    { question: 'What is the typical outcome when a lock-up period expires and insiders sell heavily?', options: ['The stock price rises on increased volume', 'The stock often drops due to increased share supply', 'The IPO is voided', 'The company buys back the shares'], correctIndex: 1, explanation: 'Heavy insider selling at lock-up expiration increases share supply and signals insiders are cashing out — typically pressures the stock price down.' },
  ],
  rewards: { bamboo: 25, xp: 5 },
};

export const languageOfFinanceLessons: MILesson[] = [
  buildTierBLesson(
    'whos-at-the-table',
    "Who's at the Table?",
    'A $2B deal does not happen because one person had a gut feeling. A room full of roles — each with a job — shapes every capital decision.',
    'Before you memorize jargon, learn who actually sits at the table. Names and titles tell you who builds the analysis, who owns the risk, and who faces the client.',
    ['Capital allocation', 'Deal committee'],
    {
      type: 'role-match',
      title: 'Who Decides?',
      description: 'Match each scenario to the role most likely to own that decision.',
      roles: [
        { id: 'analyst', name: 'Analyst', description: 'Builds models and summaries' },
        { id: 'pm', name: 'Portfolio Manager', description: 'Makes final investment calls' },
        { id: 'md', name: 'Managing Director', description: 'Runs the team and clients' },
      ],
      scenarios: [
        { id: 's1', description: 'Updates the DCF model before a client meeting', correctRoleId: 'analyst' },
        { id: 's2', description: 'Approves a $50M position in the fund', correctRoleId: 'pm' },
      ],
    },
    'Your first internship offer compares salary, location, and growth — that is personal capital allocation.',
    'Investment banking analysts build pitch books; associates run the process; VPs and MDs own relationships.',
    'Investment Banking Analyst',
    [
      { term: 'Capital allocation', def: 'How firms decide where money goes.', analogy: 'Like choosing between saving, spending, or investing your paycheck.' },
      { term: 'Deal committee', def: 'Group that approves major transactions.', analogy: 'Like your family voting on a big purchase.' },
    ]
  ),
  buildTierBLesson(
    'the-network-effect',
    'The Network Effect',
    'Finance knowledge spreads the way reputation does — one good conversation leads to introductions, interviews, and mentors.',
    'The network effect here means your literacy compounds socially: people invite prepared students into rooms where deals are discussed.',
    ['Career capital', 'Information edge'],
    {
      type: 'term-classify',
      title: 'Insider or Outsider?',
      description: 'Sort each phrase into the bucket that fits best. Finish all items to continue.',
      categories: [
        { id: 'insider', label: 'Insider signal' },
        { id: 'general', label: 'General business' },
      ],
      terms: [
        { id: 't1', label: 'Warm intro from alumni', correctCategory: 'insider' },
        { id: 't2', label: 'Generic company slogan', correctCategory: 'general' },
      ],
    },
    'Talking about budgeting with friends makes everyone sharper — same with finance study groups.',
    'Recruiters remember candidates who ask informed questions about markets and roles.',
    'Campus Recruiter',
    [
      { term: 'Career capital', def: 'Skills and credibility that compound over time.', analogy: 'Practice hours before a big game.' },
      { term: 'Information edge', def: 'Knowing useful context before others.', analogy: 'Reading the syllabus before day one.' },
    ]
  ),
  buildTierBLesson(
    'speaking-the-language',
    'Speaking the Language',
    'Saying "the stock went up" is fine at lunch. In a finance interview, "margins compressed" tells a sharper story.',
    'Insider language is not about showing off — it is about being precise. This lesson builds terms you can use naturally.',
    ['Margin', 'Leverage'],
    {
      type: 'term-classify',
      title: 'Precise or vague?',
      description: 'Tap the category that fits each phrase in a finance meeting.',
      categories: [
        { id: 'insider', label: 'Insider signal' },
        { id: 'general', label: 'General business' },
      ],
      terms: [
        { id: 't1', label: 'Gross margin compressed', correctCategory: 'insider' },
        { id: 't2', label: 'We had a good quarter', correctCategory: 'general' },
      ],
    },
    'If your side hustle has costs, your "margin" is what you keep per sale — same idea as companies.',
    'Consultants and bankers use precise terms so teams align in one sentence.',
    'Management Consultant',
    [
      { term: 'Margin', def: 'Profit as a percent of revenue.', analogy: 'Keep $6 on a $10 resale.' },
      { term: 'Leverage', def: 'Using borrowed money or fixed costs to amplify results.', analogy: 'Buying supplies on credit to sell more at a festival.' },
    ]
  ),
  buildTierBLesson(
    'from-learner-to-insider',
    'From Learner to Insider',
    'Every professional started as a student who learned the vocabulary, then proved it with projects and internships.',
    'Your path is not one leap — it is modules like this, flashcards, and practice interviews that stack into credibility.',
    ['Track record', 'Pathway'],
    {
      type: 'term-classify',
      title: 'Path or dead end?',
      description: 'Classify each item as strong career capital or a weak substitute.',
      categories: [
        { id: 'insider', label: 'Builds track record' },
        { id: 'general', label: 'Low signal' },
      ],
      terms: [
        { id: 't1', label: 'Investment club portfolio', correctCategory: 'insider' },
        { id: 't2', label: 'Only listing buzzwords on resume', correctCategory: 'general' },
      ],
    },
    'A savings streak or investing club project is a mini track record — proof you can stick to a plan.',
    'Firms hire for curiosity plus evidence: clubs, competitions, certifications.',
    'Asset Management Intern',
    [
      { term: 'Track record', def: 'Evidence of performance or consistency over time.', analogy: 'Your GPA and project portfolio.' },
      { term: 'Pathway', def: 'Typical steps into a finance role.', analogy: 'Internship → return offer → analyst program.' },
    ]
  ),
  balanceSheetBasicsLesson,
  cashFlowStatementLesson,
  ethicsInAccountingLesson,
  incomeStatementDecodedLesson,
  marginsRatiosDecodedLesson,
  valuationBasicsLesson,
  riskAndBetaLesson,
  debtCreditLanguageLesson,
  earningsSeasonGlossaryLesson,
  maIpoVocabLesson,
];

export function getLanguageOfFinanceLesson(moduleId: string): MILesson | undefined {
  return languageOfFinanceLessons.find((l) => l.moduleId === moduleId);
}

export function getLanguageOfFinanceLessonById(lessonId: string): MILesson | undefined {
  return languageOfFinanceLessons.find((l) => l.id === lessonId);
}
