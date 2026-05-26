export type WealthManagementActivityType = 'choice' | 'matching' | 'allocation';

export interface WealthManagementConcept {
  title: string;
  body: string;
  example: string;
}

export interface WealthManagementChoice {
  id: string;
  label: string;
  feedback: string;
  isBest?: boolean;
}

export interface WealthManagementActivityPrompt {
  id: string;
  prompt: string;
  context?: string;
  choices: WealthManagementChoice[];
}

export interface WealthManagementActivity {
  type: WealthManagementActivityType;
  title: string;
  description: string;
  prompts: WealthManagementActivityPrompt[];
}

export interface WealthManagementQuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface WealthManagementModule {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  minutes: number;
  color: string;
  outcomes: string[];
  concepts: WealthManagementConcept[];
  activity: WealthManagementActivity;
  quiz: WealthManagementQuizQuestion[];
  reward: {
    xp: number;
    badge: string;
  };
}

export type WealthManagementMeter = 'trust' | 'technical' | 'growth' | 'risk';

export interface WealthManagementCareerDecision {
  id: string;
  label: string;
  result: string;
  meterChanges: Partial<Record<WealthManagementMeter, number>>;
  isBest?: boolean;
}

export interface WealthManagementCareerRound {
  id: string;
  prompt: string;
  clientContext: string;
  decisions: WealthManagementCareerDecision[];
}

export interface WealthManagementCareerStage {
  id: string;
  title: string;
  headline: string;
  description: string;
  coreSkills: string[];
  rounds: WealthManagementCareerRound[];
  unlockSummary: string;
}

export const wealthManagementModules: WealthManagementModule[] = [
  {
    id: 'blueprint',
    number: 1,
    title: 'The Blueprint',
    shortTitle: 'Industry Blueprint',
    subtitle: 'Demystify financial planning, wealth management, and private banking.',
    minutes: 14,
    color: 'from-emerald-700 to-green-600',
    outcomes: [
      'Explain the difference between planning, wealth management, and private banking.',
      'Match client needs to the right layer of advice.',
      'Understand how advice changes by AUM tier.',
    ],
    concepts: [
      {
        title: 'Financial planning is the tactical base layer',
        body: 'Financial planning focuses on cash flow, budgeting, retirement milestones, insurance needs, and whether a family is on track.',
        example: 'A client asks, "Can I retire at 60?" The planner checks savings, spending, income, debt, and insurance before talking about advanced strategies.',
      },
      {
        title: 'Wealth management connects the whole balance sheet',
        body: 'Wealth management builds on planning by combining investments, tax strategy, estate planning, asset protection, and family goals.',
        example: 'A founder with concentrated stock may need diversification, tax planning, estate documents, and a plan for teaching kids about money.',
      },
      {
        title: 'Private banking solves custom liquidity needs',
        body: 'Private banking is the high-touch banking layer. It often focuses on lending, custom mortgages, securities-backed lines of credit, and concierge banking.',
        example: 'A client wants to buy a second home without selling a taxable portfolio. A private banker may structure an SBLOC or custom mortgage.',
      },
    ],
    activity: {
      type: 'choice',
      title: 'Triad Sorter',
      description: 'Choose which advisory lane fits each real client request.',
      prompts: [
        {
          id: 'retire-60',
          prompt: 'A teacher asks whether she has enough saved to retire at 60.',
          choices: [
            { id: 'planning', label: 'Financial Planning', feedback: 'Correct. This starts with cash flow, retirement projections, and insurance basics.', isBest: true },
            { id: 'wealth', label: 'Wealth Management', feedback: 'Close, but this question is first about tactical retirement readiness.' },
            { id: 'banking', label: 'Private Banking', feedback: 'Not yet. Lending and liquidity are not the main issue.' },
          ],
        },
        {
          id: 'founder-stock',
          prompt: 'A startup founder has $8M of company stock and wants to reduce taxes while protecting her family.',
          choices: [
            { id: 'planning', label: 'Financial Planning', feedback: 'Planning matters, but the tax, estate, and concentration risk make this broader.' },
            { id: 'wealth', label: 'Wealth Management', feedback: 'Correct. This needs investment, tax, estate, and risk coordination.', isBest: true },
            { id: 'banking', label: 'Private Banking', feedback: 'Banking could help later, but it is not the core advisory lane.' },
          ],
        },
        {
          id: 'custom-mortgage',
          prompt: 'A client with irregular income needs a custom mortgage for a unique property.',
          choices: [
            { id: 'planning', label: 'Financial Planning', feedback: 'This may affect the plan, but the solution is lending-heavy.' },
            { id: 'wealth', label: 'Wealth Management', feedback: 'A wealth team may coordinate it, but a banking specialist likely owns execution.' },
            { id: 'banking', label: 'Private Banking', feedback: 'Correct. Custom credit and liquidity are private banking strengths.', isBest: true },
          ],
        },
      ],
    },
    quiz: [
      {
        question: 'What best describes modern wealth management?',
        options: ['Only selling investment products', 'Coordinating investments, taxes, estate planning, and family goals', 'Only building monthly budgets'],
        answerIndex: 1,
        explanation: 'Modern wealth management is holistic. Investments matter, but the value is in coordinating the full financial picture.',
      },
      {
        question: 'Which client is most likely to need UHNW-style services?',
        options: ['$250K invested in a robo portfolio', '$3M with a taxable brokerage account', '$40M across businesses, trusts, and alternatives'],
        answerIndex: 2,
        explanation: 'UHNW clients often need bespoke estate, tax, alternative investment, credit, and family governance support.',
      },
    ],
    reward: { xp: 120, badge: 'Industry Decoder' },
  },
  {
    id: 'ecosystem',
    number: 2,
    title: 'The Ecosystem',
    shortTitle: 'Advisory Team',
    subtitle: 'Meet the roles that turn client needs into coordinated advice.',
    minutes: 12,
    color: 'from-teal-700 to-emerald-600',
    outcomes: [
      'Identify the main roles on a wealth advisory team.',
      'Understand why the job is not just sales.',
      'Route client problems to the right specialist.',
    ],
    concepts: [
      {
        title: 'The lead advisor owns trust and direction',
        body: 'The relationship manager or lead advisor anchors the client relationship, asks better questions, and quarterbacks the team.',
        example: 'During a market selloff, the lead advisor calms the client, reconnects decisions to the plan, and brings in specialists if needed.',
      },
      {
        title: 'The wealth strategist handles technical depth',
        body: 'Financial planners and wealth strategists build models, analyze tax returns, map estate flows, and turn messy facts into advice.',
        example: 'A strategist may notice that exercising stock options this year could create a tax spike unless the team plans around it.',
      },
      {
        title: 'The portfolio team turns goals into investments',
        body: 'Investment analysts and portfolio managers set asset allocation, review managers, evaluate alternatives, and rebalance portfolios.',
        example: 'For a client who needs income but hates volatility, the PM thinks about bonds, cash, dividend exposure, and after-tax risk.',
      },
    ],
    activity: {
      type: 'matching',
      title: 'Team Role Matcher',
      description: 'Pick the teammate who should take the lead.',
      prompts: [
        {
          id: 'anxious-client',
          prompt: 'A nervous client calls after seeing the market drop 4% in a week.',
          choices: [
            { id: 'advisor', label: 'Lead Advisor', feedback: 'Correct. The first job is trust, context, and behavior coaching.', isBest: true },
            { id: 'strategist', label: 'Wealth Strategist', feedback: 'They may help later, but this is first a relationship moment.' },
            { id: 'pm', label: 'Portfolio Manager', feedback: 'The PM can explain positioning, but the advisor should anchor the conversation.' },
          ],
        },
        {
          id: 'tax-return',
          prompt: 'A client uploads a tax return showing high realized gains and stock option income.',
          choices: [
            { id: 'advisor', label: 'Lead Advisor', feedback: 'The advisor should know, but the technical analysis needs a specialist.' },
            { id: 'strategist', label: 'Wealth Strategist', feedback: 'Correct. This is tax, planning, and modeling work.', isBest: true },
            { id: 'pm', label: 'Portfolio Manager', feedback: 'Investments may be affected, but the first pass is planning analysis.' },
          ],
        },
        {
          id: 'alts-diligence',
          prompt: 'The team is reviewing a private credit fund for suitable clients.',
          choices: [
            { id: 'advisor', label: 'Lead Advisor', feedback: 'The advisor handles suitability conversations, but not fund diligence alone.' },
            { id: 'strategist', label: 'Wealth Strategist', feedback: 'Planning fit matters, but investment due diligence leads this.' },
            { id: 'pm', label: 'Portfolio Manager', feedback: 'Correct. Manager research and portfolio fit sit with the investment team.', isBest: true },
          ],
        },
      ],
    },
    quiz: [
      {
        question: 'Why does a modern wealth team look like a small enterprise?',
        options: ['Because no one specializes', 'Because clients need relationship, planning, investment, tax, estate, and credit coordination', 'Because every advisor does the same job'],
        answerIndex: 1,
        explanation: 'Complex clients need different experts working from one shared plan.',
      },
      {
        question: 'Which role usually quarterbacks the client relationship?',
        options: ['Lead Advisor', 'Portfolio Operations Analyst', 'External fund wholesaler'],
        answerIndex: 0,
        explanation: 'The lead advisor owns trust, communication, priorities, and coordination.',
      },
    ],
    reward: { xp: 120, badge: 'Team Quarterback' },
  },
  {
    id: 'toolkit',
    number: 3,
    title: 'The Toolkit',
    shortTitle: 'Hireable Skills',
    subtitle: 'Practice the technical and human skills that make candidates useful fast.',
    minutes: 16,
    color: 'from-lime-700 to-green-600',
    outcomes: [
      'Connect account type, tax treatment, and investment placement.',
      'Recognize why tech stack fluency matters.',
      'Practice translating market fear into plain English.',
    ],
    concepts: [
      {
        title: 'Asset location is about where investments live',
        body: 'The same portfolio can produce different after-tax results depending on what sits in taxable, traditional, Roth, or trust accounts.',
        example: 'High-yield credit may be better in a tax-deferred account, while broad index ETFs can often work well in taxable accounts.',
      },
      {
        title: 'Clean dashboards beat messy spreadsheets',
        body: 'Junior talent becomes valuable by organizing account data, cost basis, unrealized gains, cash needs, and planning notes clearly.',
        example: 'A clean one-page balance sheet helps the advisor spot concentrated stock, idle cash, high fees, or missing beneficiaries.',
      },
      {
        title: 'Behavioral finance is part of execution',
        body: 'Great advice fails if clients panic, misunderstand it, or cannot stick with it. Advisors translate complexity into calm next steps.',
        example: 'Instead of saying "duration risk," a good advisor says, "Bond prices fell because rates rose, but this income sleeve still has a job."',
      },
    ],
    activity: {
      type: 'allocation',
      title: 'Asset Location Mini-Case',
      description: 'Choose the most tax-aware home for each investment.',
      prompts: [
        {
          id: 'high-yield-credit',
          prompt: 'Where would you usually prefer to place high-yield credit for a taxable family?',
          context: 'Assume the client has taxable, traditional IRA, and Roth accounts available.',
          choices: [
            { id: 'taxable', label: 'Taxable brokerage', feedback: 'Usually not ideal because interest can be taxed heavily each year.' },
            { id: 'traditional', label: 'Traditional IRA', feedback: 'Correct. Tax-deferred accounts can shelter ordinary income from annual taxation.', isBest: true },
            { id: 'roth', label: 'Roth IRA', feedback: 'Possible, but many teams reserve Roth space for high-growth assets.' },
          ],
        },
        {
          id: 'index-etf',
          prompt: 'Where can a low-turnover broad market index ETF often fit well?',
          choices: [
            { id: 'taxable', label: 'Taxable brokerage', feedback: 'Correct. Low turnover and qualified dividends can make index ETFs tax efficient.', isBest: true },
            { id: 'cash', label: 'Checking account', feedback: 'Checking accounts are for liquidity, not long-term market exposure.' },
            { id: 'debt', label: 'Credit card account', feedback: 'Credit cards are liabilities, not investment accounts.' },
          ],
        },
        {
          id: 'highest-growth',
          prompt: 'Where might a team place the highest expected growth asset for a young client?',
          choices: [
            { id: 'roth', label: 'Roth IRA', feedback: 'Correct. Tax-free growth can be powerful for long time horizons.', isBest: true },
            { id: 'checking', label: 'Checking account', feedback: 'Checking is for spending and emergency cash.' },
            { id: 'short-term', label: 'Short-term savings', feedback: 'Short-term savings should avoid major volatility.' },
          ],
        },
      ],
    },
    quiz: [
      {
        question: 'What does asset location mean?',
        options: ['Picking a city for a client meeting', 'Choosing which account type should hold which investments', 'Moving all assets into cash'],
        answerIndex: 1,
        explanation: 'Asset location is about placing investments in accounts where their tax treatment and purpose fit best.',
      },
      {
        question: 'What makes a junior analyst immediately useful?',
        options: ['Using complicated jargon', 'Producing clean data, clear summaries, and accurate follow-up', 'Avoiding client context'],
        answerIndex: 1,
        explanation: 'Clean execution lets senior advisors trust the analysis and move faster.',
      },
    ],
    reward: { xp: 140, badge: 'Planning Toolkit' },
  },
  {
    id: 'breaking-in',
    number: 4,
    title: 'Breaking In',
    shortTitle: 'Recruiting Playbook',
    subtitle: 'Turn the curriculum into a credible first conversation with the industry.',
    minutes: 13,
    color: 'from-amber-700 to-emerald-600',
    outcomes: [
      'Understand CFP, CFA, and CPWA credential signals.',
      'Map firm types before networking.',
      'Ask sharper informational interview questions.',
    ],
    concepts: [
      {
        title: 'The CFP signals holistic planning ability',
        body: 'The Certified Financial Planner path is becoming the core credential for retail and HNW wealth management because it covers planning, insurance, tax, retirement, and estate basics.',
        example: 'A student interested in client-facing advice should know why many firms expect or strongly prefer CFP progress.',
      },
      {
        title: 'CFA and CPWA point to different pivots',
        body: 'The CFA is valued for investment-centric roles. The CPWA is more focused on advanced HNW and UHNW wealth strategies.',
        example: 'A portfolio analyst may talk about CFA plans, while an advanced planning specialist may care more about CPWA-style topics.',
      },
      {
        title: 'Firm anatomy changes the job',
        body: 'Wirehouses, independent RIAs, private banks, and multi-family offices can all serve wealthy clients, but the workflows, products, and career paths differ.',
        example: 'A family office role may involve bill pay, governance, and family meetings, while an RIA may emphasize planning software and client service pods.',
      },
    ],
    activity: {
      type: 'choice',
      title: 'Informational Interview Upgrade',
      description: 'Pick questions that sound curious, prepared, and useful.',
      prompts: [
        {
          id: 'wirehouse',
          prompt: 'You are speaking with an advisor at a large wirehouse. What is the strongest question?',
          choices: [
            { id: 'hiring', label: 'Are you hiring right now?', feedback: 'Too early. It makes the conversation transactional.' },
            { id: 'workflow', label: 'How does your team divide client service, planning, portfolio, and credit work?', feedback: 'Correct. This shows you understand the operating model.', isBest: true },
            { id: 'salary', label: 'How much will I make in year one?', feedback: 'Compensation matters, but this is not the best opening question.' },
          ],
        },
        {
          id: 'ria',
          prompt: 'You are speaking with an independent RIA. What should you ask?',
          choices: [
            { id: 'software', label: 'Which planning and CRM tools run your client workflow?', feedback: 'Correct. RIAs often care about tech-enabled process and service quality.', isBest: true },
            { id: 'hot-stock', label: 'What stock should I buy?', feedback: 'That misses the planning-first nature of the role.' },
            { id: 'easy-job', label: 'Is the job pretty easy?', feedback: 'This signals the wrong mindset.' },
          ],
        },
        {
          id: 'family-office',
          prompt: 'You are speaking with someone at a multi-family office. What is most strategic?',
          choices: [
            { id: 'governance', label: 'How do you coordinate investment, estate, tax, and family governance conversations?', feedback: 'Correct. It shows you understand UHNW complexity.', isBest: true },
            { id: 'free-lunch', label: 'Do interns get free lunch?', feedback: 'Fine later, not for a serious networking call.' },
            { id: 'logo', label: 'Can I use your logo on LinkedIn?', feedback: 'Not the right focus.' },
          ],
        },
      ],
    },
    quiz: [
      {
        question: 'Which credential is most associated with holistic financial planning?',
        options: ['CFP', 'CPA only', 'Series 3 only'],
        answerIndex: 0,
        explanation: 'The CFP is widely recognized for holistic planning competence.',
      },
      {
        question: 'What is the best networking posture?',
        options: ['Ask only whether they are hiring', 'Ask informed questions about how the firm actually serves clients', 'Lead with how much money you want to make'],
        answerIndex: 1,
        explanation: 'Informed workflow questions help you sound serious and learn what the job actually is.',
      },
    ],
    reward: { xp: 130, badge: 'Recruiting Ready' },
  },
];

export const wealthManagementCareerStages: WealthManagementCareerStage[] = [
  {
    id: 'intern',
    title: 'Intern',
    headline: 'Earn trust by being organized.',
    description: 'You are helping the team prepare for a discovery meeting with a new family.',
    coreSkills: ['Meeting prep', 'CRM notes', 'Client data cleanup'],
    rounds: [
      {
        id: 'prep',
        prompt: 'The advisor asks you to prepare the meeting packet. What do you do first?',
        clientContext: 'The family sent account statements, insurance policies, and a messy list of goals.',
        decisions: [
          { id: 'organize', label: 'Organize the documents by topic and flag missing items', result: 'The team can see the client picture quickly.', meterChanges: { trust: 8, technical: 6, risk: 5 }, isBest: true },
          { id: 'summarize', label: 'Write a generic one-page summary without checking documents', result: 'It looks polished but may miss important facts.', meterChanges: { trust: 2, technical: -4, risk: -3 } },
          { id: 'wait', label: 'Wait for someone senior to tell you every step', result: 'You avoid mistakes, but you do not add much value.', meterChanges: { trust: -2, technical: 0, growth: -2 } },
        ],
      },
      {
        id: 'crm',
        prompt: 'After the meeting, what is the best follow-up habit?',
        clientContext: 'The advisor mentioned that small details often become big planning clues.',
        decisions: [
          { id: 'notes', label: 'Enter clean notes, owners, and due dates in the CRM', result: 'The next person can pick up the relationship without confusion.', meterChanges: { trust: 7, risk: 6, technical: 4 }, isBest: true },
          { id: 'memory', label: 'Rely on memory because the meeting felt simple', result: 'Important details fade fast.', meterChanges: { trust: -4, risk: -5 } },
          { id: 'email-all', label: 'Email everyone a long transcript with no priorities', result: 'The team has information, but not clarity.', meterChanges: { technical: 1, trust: -1 } },
        ],
      },
    ],
    unlockSummary: 'Interns win by being accurate, prepared, and easy to trust.',
  },
  {
    id: 'analyst',
    title: 'Analyst',
    headline: 'Turn messy data into planning insight.',
    description: 'You are building a balance-sheet snapshot for a HNW client.',
    coreSkills: ['Balance sheet analysis', 'Tax awareness', 'Planning gaps'],
    rounds: [
      {
        id: 'balance-sheet',
        prompt: 'You notice $900K of one stock, $300K idle cash, and no updated beneficiaries. What do you flag?',
        clientContext: 'The client says they are conservative but their balance sheet is concentrated.',
        decisions: [
          { id: 'three-gaps', label: 'Flag concentration risk, idle cash, and estate admin gaps', result: 'You connect investments, liquidity, and estate hygiene.', meterChanges: { technical: 10, trust: 5, risk: 8 }, isBest: true },
          { id: 'stock-only', label: 'Only mention the stock because markets are exciting', result: 'You catch one issue but miss the full planning picture.', meterChanges: { technical: 2, risk: 1 } },
          { id: 'ignore', label: 'Do not flag anything because the client is wealthy', result: 'Wealth does not remove risk. It often adds complexity.', meterChanges: { technical: -6, risk: -8 } },
        ],
      },
      {
        id: 'cost-basis',
        prompt: 'Before suggesting diversification, what data matters most?',
        clientContext: 'Selling appreciated stock may create taxes.',
        decisions: [
          { id: 'basis', label: 'Cost basis, holding period, tax bracket, and charitable goals', result: 'You give the advisor the facts needed for a tax-aware plan.', meterChanges: { technical: 9, risk: 6, trust: 4 }, isBest: true },
          { id: 'ticker', label: 'Only the ticker symbol', result: 'The investment matters, but tax data drives execution.', meterChanges: { technical: -2 } },
          { id: 'headline', label: 'A recent news headline about the company', result: 'Useful context, but not enough for client-specific advice.', meterChanges: { technical: 0, growth: 1 } },
        ],
      },
    ],
    unlockSummary: 'Analysts become valuable when they turn facts into decision-ready insight.',
  },
  {
    id: 'associate',
    title: 'Associate',
    headline: 'Move from analysis to client-ready recommendations.',
    description: 'You are preparing follow-up after a planning review.',
    coreSkills: ['Recommendation framing', 'Client follow-up', 'Specialist coordination'],
    rounds: [
      {
        id: 'recommendation',
        prompt: 'The client has taxable gains and wants portfolio income. How do you present the next step?',
        clientContext: 'The advisor wants a recommendation that is clear but not oversold.',
        decisions: [
          { id: 'balanced', label: 'Show the tradeoff: income, taxes, risk, and implementation options', result: 'The client sees the recommendation as thoughtful, not generic.', meterChanges: { trust: 8, technical: 8, risk: 6 }, isBest: true },
          { id: 'product', label: 'Lead with one product and skip the tradeoffs', result: 'This feels like product sales, not holistic advice.', meterChanges: { trust: -5, growth: 2, risk: -4 } },
          { id: 'complex', label: 'Use technical jargon to sound smart', result: 'The client may feel confused and less confident.', meterChanges: { trust: -4, technical: 2 } },
        ],
      },
      {
        id: 'handoff',
        prompt: 'A trust question comes up that is beyond your expertise. What do you do?',
        clientContext: 'The client asks whether their current trust protects children from poor spending decisions.',
        decisions: [
          { id: 'specialist', label: 'Loop in the estate specialist and summarize the question clearly', result: 'You protect the client and keep momentum.', meterChanges: { trust: 7, risk: 8, technical: 4 }, isBest: true },
          { id: 'guess', label: 'Guess based on something you read online', result: 'This creates advice risk.', meterChanges: { trust: -8, risk: -10 } },
          { id: 'avoid', label: 'Avoid the question and hope it disappears', result: 'The client may feel unheard.', meterChanges: { trust: -5, risk: -3 } },
        ],
      },
    ],
    unlockSummary: 'Associates bridge analysis and execution while knowing when to bring in specialists.',
  },
  {
    id: 'vice-president',
    title: 'Vice President',
    headline: 'Own client moments when emotions are high.',
    description: 'You are now trusted to lead more client conversations.',
    coreSkills: ['Behavioral coaching', 'Prioritization', 'Revenue with trust'],
    rounds: [
      {
        id: 'panic',
        prompt: 'A client wants to liquidate after a market correction. What is your response?',
        clientContext: 'They say, "I cannot watch this anymore. Sell everything today."',
        decisions: [
          { id: 'anchor', label: 'Acknowledge the fear, revisit the plan, and discuss cash needs before trading', result: 'You slow the decision down and protect the long-term plan.', meterChanges: { trust: 10, risk: 9, technical: 4 }, isBest: true },
          { id: 'sell', label: 'Sell everything immediately to keep the client happy', result: 'Fast action may damage the plan and reinforce panic selling.', meterChanges: { trust: -2, risk: -10, growth: -6 } },
          { id: 'dismiss', label: 'Tell them they are wrong and should calm down', result: 'You may be technically right, but emotionally ineffective.', meterChanges: { trust: -8, technical: 1 } },
        ],
      },
      {
        id: 'prioritize',
        prompt: 'Three tasks compete: a prospect proposal, a tax deadline, and a client birthday call. What do you prioritize?',
        clientContext: 'The tax deadline is tomorrow. The prospect meeting is next week.',
        decisions: [
          { id: 'deadline', label: 'Protect the tax deadline, delegate the birthday touchpoint, schedule proposal prep', result: 'You balance risk, service, and growth.', meterChanges: { risk: 8, trust: 5, growth: 5 }, isBest: true },
          { id: 'prospect', label: 'Only focus on the prospect proposal', result: 'Growth matters, but missing a deadline damages trust.', meterChanges: { growth: 5, risk: -8, trust: -5 } },
          { id: 'birthday', label: 'Spend all day on the birthday call', result: 'Nice service, poor prioritization.', meterChanges: { trust: 1, risk: -6, growth: -3 } },
        ],
      },
    ],
    unlockSummary: 'VPs protect trust by making calm, prioritized decisions under pressure.',
  },
  {
    id: 'director',
    title: 'Director',
    headline: 'Coordinate complex UHNW advice.',
    description: 'You lead a case involving alternatives, estate planning, and family governance.',
    coreSkills: ['UHNW structuring', 'Alternatives suitability', 'Family dynamics'],
    rounds: [
      {
        id: 'alts',
        prompt: 'A UHNW client asks for private credit because a friend mentioned high yield. What do you do?',
        clientContext: 'They have liquidity needs in three years and limited experience with illiquid funds.',
        decisions: [
          { id: 'suitability', label: 'Assess liquidity, risk, fees, tax reporting, and portfolio fit before recommending anything', result: 'You treat alternatives as tools, not trophies.', meterChanges: { trust: 7, technical: 9, risk: 9 }, isBest: true },
          { id: 'access', label: 'Offer the fund immediately because access feels exclusive', result: 'Exclusivity without suitability can hurt clients.', meterChanges: { growth: 4, risk: -9, trust: -5 } },
          { id: 'reject', label: 'Reject all alternatives without analysis', result: 'You may be too rigid for complex clients.', meterChanges: { risk: 2, technical: -2, growth: -3 } },
        ],
      },
      {
        id: 'family',
        prompt: 'The parents want to transfer wealth, but their adult children disagree about responsibility. What is the next step?',
        clientContext: 'The money issue is becoming a family communication issue.',
        decisions: [
          { id: 'governance', label: 'Suggest a family governance conversation with clear roles and education', result: 'You address the human system around the money.', meterChanges: { trust: 9, risk: 6, technical: 4 }, isBest: true },
          { id: 'portfolio-only', label: 'Only discuss portfolio returns', result: 'Returns do not solve family misalignment.', meterChanges: { technical: 1, trust: -4 } },
          { id: 'ignore-kids', label: 'Ignore the children because they are not current clients', result: 'Multi-generational planning requires a broader lens.', meterChanges: { trust: -5, growth: -4 } },
        ],
      },
    ],
    unlockSummary: 'Directors lead complex cases by combining technical advice with family judgment.',
  },
  {
    id: 'managing-director',
    title: 'Managing Director',
    headline: 'Build the business without losing the advice standard.',
    description: 'You run relationships, coach the team, and source new clients.',
    coreSkills: ['Business development', 'Team leadership', 'Enterprise judgment'],
    rounds: [
      {
        id: 'prospect',
        prompt: 'A large prospect wants a pitch tomorrow. Your team is overloaded. What do you do?',
        clientContext: 'The prospect is valuable, but the current client book has urgent work.',
        decisions: [
          { id: 'triage', label: 'Triage current obligations, assign owners, and build a focused prospect agenda', result: 'You pursue growth without sacrificing service.', meterChanges: { growth: 9, trust: 6, risk: 6 }, isBest: true },
          { id: 'drop-clients', label: 'Drop current work and chase the prospect only', result: 'A bigger book is not worth eroding existing trust.', meterChanges: { growth: 5, trust: -8, risk: -6 } },
          { id: 'decline', label: 'Decline every prospect when busy', result: 'Service matters, but leadership also creates capacity.', meterChanges: { trust: 2, growth: -7 } },
        ],
      },
      {
        id: 'coach',
        prompt: 'A junior analyst made a small error in a client deck. How do you handle it?',
        clientContext: 'The error was caught before the meeting.',
        decisions: [
          { id: 'coach-process', label: 'Fix it, coach the analyst, and improve the review process', result: 'The team gets better without creating fear.', meterChanges: { trust: 6, technical: 7, risk: 7, growth: 3 }, isBest: true },
          { id: 'blame', label: 'Blame them publicly so everyone learns', result: 'Fear reduces honesty and can hide future mistakes.', meterChanges: { trust: -7, risk: -5 } },
          { id: 'ignore', label: 'Ignore it because it was caught', result: 'Missed process lessons repeat later.', meterChanges: { risk: -4, technical: -2 } },
        ],
      },
    ],
    unlockSummary: 'Managing directors grow the franchise by setting standards, coaching people, and protecting client trust.',
  },
];

export const wealthManagementMeterLabels: Record<WealthManagementMeter, string> = {
  trust: 'Client Trust',
  technical: 'Technical Quality',
  growth: 'Business Growth',
  risk: 'Risk Control',
};
