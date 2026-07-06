import type { VillageLesson } from '@/types/village-lesson';

export const languageFinanceLesson5: VillageLesson = {
  id: 'lf-5-ethics-reporting',
  moduleId: 'language-finance',
  unitLabel: 'Unit 5: Integrity',
  title: 'Ethical Reporting & Regulatory Frameworks',
  estimatedMinutes: 9,
  hook: {
    question:
      'A CEO offers you one click to inflate inventory so the bank approves a lifeline loan. The company is real — employees need paychecks. What do you do?',
    philMessage:
      'Numbers move stock prices, credit lines, and bonuses — so the pressure to cheat is real. Integrity is not morality theater; it is what keeps capital markets from becoming a casino.',
  },
  concepts: [
    {
      id: 'pressure',
      emoji: '🔥',
      title: 'Why Books Get Cooked',
      body: 'Accounting fraud rarely starts with a villain — it starts with pressure. Executives face loan covenant tests they must pass, bonus targets tied to earnings, and IPO timelines that demand a good story. Under that pressure, a "small, temporary" tweak feels harmless: shift some revenue forward, delay recognizing an expense, just until next quarter fixes everything. But next quarter needs a bigger tweak to cover the first one, and the snowball rolls. The legal line is intent: aggressive-but-disclosed judgment calls are earnings management; hiding material facts to deceive lenders, auditors, or investors is a crime that ends careers and, sometimes, companies.',
      realWorldExample:
        'WorldCom capitalized line costs to hide billions in expenses. Wirecard invented cash balances. When discovered, stocks collapsed and leaders faced prison.',
    },
    {
      id: 'tools',
      emoji: '🛡️',
      title: 'Audits & Regulation',
      body: 'Because trillions of dollars ride on trusting the numbers, markets built layered defenses. External auditors independently sample transactions and stress-test a company\'s internal controls before signing off on its statements. The SEC forces public companies to file standardized reports and prosecutes deception. Credit rating agencies punish restatements by downgrading debt, instantly raising a liar\'s borrowing costs. And after Enron and WorldCom vaporized billions in the early 2000s, the Sarbanes-Oxley Act added teeth: CEOs and CFOs must now personally certify their financial statements, which means "I didn\'t know" is no longer a legal shield — signing falsely is itself a crime.',
      realWorldExample:
        'After a restatement, lenders cut limits and raise rates — minority communities lose access when regional banks tighten across the board.',
    },
    {
      id: 'red_flags',
      emoji: '🚩',
      title: 'Spotting Reporting Risk',
      body: 'Fraud leaves fingerprints, and you can learn to spot them. Revenue growing much faster than cash collections suggests sales that exist only on paper. Inventory piling up while sales slow hints at products nobody wants — or costs being parked where they don\'t hit profits. "One-time" charges that somehow appear every single year are recurring costs in a costume. Related-party deals (the company doing business with the CEO\'s cousin\'s firm) invite self-dealing. Footnotes that quietly move liabilities off the balance sheet are hiding the true debt load. No single flag proves fraud, but clusters demand answers — and whistleblower hotlines exist because insiders always see the flags first.',
      realWorldExample:
        'Credit analysts downgrade firms after accounting questions — job postings for forensic accountants sometimes appear before headlines break.',
    },
    {
      id: 'career',
      emoji: '⚖️',
      title: 'Careers on the Shield',
      body: 'Financial integrity isn\'t an abstract virtue — it\'s a career field and a survival skill. Auditors, compliance officers, forensic accountants, and SEC examiners earn strong livings as the immune system of market trust, and demand for them grows after every scandal. But integrity matters even if you never work in finance: someday a boss may ask you to "adjust" a number, backdate a document, or stay quiet about one. Remember who fraud actually hurts when it unwinds — employees lose jobs, retirees lose pensions, and the people who "just followed instructions" share the indictment. The ability to say "no, and here\'s why" is a professional asset that compounds for life.',
      realWorldExample:
        'Internal auditors blocked fraudulent loans at regional banks during 2008 — boring job, massive systemic value.',
    },
  ],
  simulator: {
    title: 'Covenant Choice',
    intro:
      'Bank review for emergency credit. Report accurately and risk rejection — or adjust inventory metrics to clear covenants.',
    scenario:
      'Inventory audit tomorrow. True count is 12% below books because of theft and miscounts. Loan covenant requires stated inventory level.',
    meters: [
      { id: 'cash', label: 'Loan Approved', emoji: '💵', initial: 30, color: 'green' },
      { id: 'integrity', label: 'Integrity', emoji: '⚖️', initial: 70, color: 'blue' },
      { id: 'audit_risk', label: 'Audit Risk', emoji: '🔍', initial: 20, color: 'red' },
    ],
    rounds: [
      {
        id: 'r1',
        situation: 'CFO asks you to bump inventory on the spreadsheet before the banker arrives.',
        choices: [
          {
            id: 'cook',
            label: 'Adjust inventory upward — secure the loan',
            description: 'Dishonest shortcut.',
            effects: { cash: +35, integrity: -35, audit_risk: +30 },
            feedback:
              'Loan may clear today. You committed fraud — federal wire and securities laws do not care about good intentions.',
          },
          {
            id: 'accurate',
            label: 'Report true count — explain shrinkage plan',
            description: 'Accurate reporting.',
            effects: { cash: -15, integrity: +25, audit_risk: -15 },
            feedback:
              'Banker may decline or demand higher rate — painful but legal. You can fix operations instead of lying.',
          },
          {
            id: 'delay',
            label: 'Delay meeting — finish physical count with auditor present',
            description: 'Process fix.',
            effects: { cash: -5, integrity: +15, audit_risk: -20 },
            feedback:
              'Transparency builds long-term lender trust. Short delay beats long prison sentence.',
          },
        ],
      },
      {
        id: 'r2',
        situation: 'Loan approved via cooked books. Three quarters later, external audit samples your warehouse.',
        choices: [
          {
            id: 'confess',
            label: 'Disclose prior misstatement — restate financials',
            description: 'Come clean late.',
            effects: { cash: -30, integrity: +10, audit_risk: +20 },
            feedback:
              'Restatement triggers stock drop, covenant breach, possible SEC inquiry — still better than obstruction charges.',
          },
          {
            id: 'hide',
            label: 'Hide boxes — stall auditors',
            description: 'Cover-up.',
            effects: { cash: -20, integrity: -40, audit_risk: +40 },
            feedback:
              'Obstruction and fraud charges stack. Employees lose jobs when the firm implodes — systemic harm spreads.',
          },
          {
            id: 'whistle',
            label: 'Report to board audit committee anonymously',
            description: 'Whistle path.',
            effects: { cash: -15, integrity: +30, audit_risk: -10 },
            feedback:
              'Protected whistleblower channels exist for a reason — early correction limits damage to workers and investors.',
          },
        ],
      },
      {
        id: 'r3',
        situation: 'You reported accurately from day one. Bank offers smaller line with inventory controls.',
        choices: [
          {
            id: 'accept',
            label: 'Accept smaller line + monthly inventory checks',
            description: 'Structured trust.',
            effects: { cash: +25, integrity: +20, audit_risk: -25 },
            feedback:
              'Less glamorous than a big fraudulent loan — but company survives with monitoring. Credit analysts reward honesty over time.',
          },
          {
            id: 'shop',
            label: 'Shop another bank with truthful statements',
            description: 'Market for integrity.',
            effects: { cash: +15, integrity: +15, audit_risk: -15 },
            feedback:
              'Competition among lenders rewards clean books — you learn how markets price trust.',
          },
          {
            id: 'equity',
            label: 'Raise emergency equity instead of debt',
            description: 'Dilution over deception.',
            effects: { cash: +20, integrity: +25, audit_risk: -20 },
            feedback:
              'Owners share pain instead of lying to creditors — common in ethical turnarounds.',
          },
        ],
      },
    ],
    endMessage:
      'Accounting integrity is infrastructure. When it cracks, wealth gaps widen as capital flees and communities lose employers. Be the person who reads the truth — and reports it.',
  },
  quiz: [
    {
      id: 'q1',
      question: 'Financial fraud typically involves:',
      options: [
        { id: 'a', text: 'Intentional deception in reported numbers' },
        { id: 'b', text: 'Honest spreadsheet typos only' },
        { id: 'c', text: 'Paying taxes early' },
        { id: 'd', text: 'High gross margins' },
      ],
      correctId: 'a',
      explanation: 'Intent to mislead stakeholders separates fraud from errors.',
    },
    {
      id: 'q2',
      question: 'External auditors primarily:',
      options: [
        { id: 'a', text: 'Test whether statements fairly represent reality' },
        { id: 'b', text: 'Set stock prices' },
        { id: 'c', text: 'Approve all loans automatically' },
        { id: 'd', text: 'Run marketing campaigns' },
      ],
      correctId: 'a',
      explanation: 'Audit opinion adds assurance — not a guarantee of zero fraud.',
    },
    {
      id: 'q3',
      question: 'Revenue up, operating cash down for many quarters is:',
      options: [
        { id: 'a', text: 'A possible earnings quality red flag' },
        { id: 'b', text: 'Always illegal' },
        { id: 'c', text: 'Proof of fraud' },
        { id: 'd', text: 'Unimportant' },
      ],
      correctId: 'a',
      explanation: 'Warrants deeper questions — not automatic fraud, but risky.',
    },
    {
      id: 'q4',
      question: 'After a major restatement, companies often face:',
      options: [
        { id: 'a', text: 'Stock drops and tighter credit' },
        { id: 'b', text: 'Automatic stock doubles' },
        { id: 'c', text: 'No consequences' },
        { id: 'd', text: 'Higher trust forever' },
      ],
      correctId: 'a',
      explanation: 'Markets and lenders reprice trust instantly when lies surface.',
    },
    {
      id: 'q5',
      question: 'Choosing accurate reporting when a loan is at risk is:',
      options: [
        { id: 'a', text: 'Hard short-term but protects legal and market trust' },
        { id: 'b', text: 'Always pointless' },
        { id: 'c', text: 'Only for public companies' },
        { id: 'd', text: 'The same as tax evasion' },
      ],
      correctId: 'a',
      explanation: 'Integrity is the bedrock asset — shortcuts compound into systemic damage.',
    },
  ],
  rewards: { xp: 140, bamboo: 20 },
};
