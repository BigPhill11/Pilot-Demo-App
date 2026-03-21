// Personal Finance Module Registry
import { PersonalFinanceModule } from '@/types/personal-finance';
import { activeIncomeBasicsLesson } from './income/lesson-1-active-income';
import { lesson2ControllingPay } from './lessons/lesson-2-controlling-pay';
import { lesson3Negotiation } from './lessons/lesson-3-negotiation';
import { lesson4EnergyBurnout } from './lessons/lesson-4-energy-burnout';
import { lesson5Launchpad } from './lessons/lesson-5-launchpad';
import { 
  lesson1DirectionBeforeSpeed,
  lesson2TimeHorizons,
  lesson3WantsNeedsTargets,
  lesson4PriorityStacking,
  lesson5ProgressMeasurement 
} from './financial-planning';
import {
  lesson1WhySavingComesBeforeSpending,
  lesson2EmergencyFundsAndTargets,
  lesson3AutomatingAndMaintainingSavings,
  lesson4SavingTradeoffsAndOpportunityCost,
  lesson5WhenToIncreaseSavings
} from './saving';
import {
  lesson1OwnershipTimeConsistency,
  lesson2WhatYouBuyWhenInvesting,
  lesson3RiskVolatilityPriceMovement,
  lesson4DiversificationRiskControl,
  lesson5LongTermStrategy
} from './investing';
import {
  lesson1ProtectingYourAssets,
  lesson2InsuranceBasicsRiskTransfer,
  lesson3FraudScamsIdentityProtection,
  lesson4LegalBasicsLiabilityProtection,
  lesson5DigitalSecurityProtectionHabits
} from './insurance';
import {
  lesson1UnderstandingTaxes,
  lesson2IncomeTypesTaxation,
  lesson3DeductionsCredits,
  lesson4TaxAdvantagedAccounts,
  lesson5TaxPlanningMindset
} from './taxes';
import {
  lesson1ManagingDebtUnderstandingCredit,
  lesson2TypesOfDebt,
  lesson3CreditScores,
  lesson4PayingDownDebt,
  lesson5BuildingCreditResponsibly
} from './credit-debt';
import {
  lesson1CareerInvestment,
  lesson2MarketValue,
  lesson3SkillsThatPay,
  lesson4NegotiationAdvancement,
  lesson5MultipleIncomeStreams
} from './career-income';
import {
  lesson1WhatWealthIs,
  lesson2SystemsCompounding,
  lesson3RiskLifeStages
} from './wealth-fundamentals';

// Module definitions with metadata
export const PERSONAL_FINANCE_MODULES: Omit<PersonalFinanceModule, 'lessons' | 'testOutQuestions'>[] = [
  {
    id: 'income',
    name: 'Income',
    pillar: 'Foundation',
    icon: '💰',
    description: 'Master the fundamentals of earning money through active and passive income streams.',
    level: 'beginner',
    unlockRequirements: {
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'financial-planning',
    name: 'Financial Planning',
    pillar: 'Foundation',
    icon: '🎯',
    description: 'Set clear financial goals and learn to measure progress without comparison.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'income',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'saving',
    name: 'Saving',
    pillar: 'Foundation',
    icon: '🏦',
    description: 'Learn strategies to keep more of what you earn and build your financial cushion.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'financial-planning',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'investing',
    name: 'Investing',
    pillar: 'Foundation',
    icon: '📈',
    description: 'Grow your wealth through smart investment strategies and compound growth.',
    level: 'beginner',
    unlockRequirements: {
      previousModuleId: 'saving',
      orTestOutScore: 85,
    },
    xpReward: 500,
    coinReward: 50,
  },
  {
    id: 'insurance',
    name: 'Insurance',
    pillar: 'Protection',
    icon: '🛡️',
    description: 'Protect yourself and your assets from unexpected financial setbacks.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'investing',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'taxes',
    name: 'Taxes',
    pillar: 'Growth',
    icon: '📋',
    description: 'Navigate the tax system and optimize your financial decisions.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'insurance',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'credit-debt',
    name: 'Credit & Debt',
    pillar: 'Protection',
    icon: '💳',
    description: 'Master credit building, debt management, and financial responsibility.',
    level: 'intermediate',
    unlockRequirements: {
      previousModuleId: 'taxes',
      orTestOutScore: 85,
    },
    xpReward: 600,
    coinReward: 60,
  },
  {
    id: 'career-income',
    name: 'Growing Income & Career Strategy',
    pillar: 'Growth',
    icon: '📈',
    description: 'Maximize your career, build multiple income streams, and achieve financial freedom.',
    level: 'advanced',
    unlockRequirements: {
      previousModuleId: 'credit-debt',
      orTestOutScore: 85,
    },
    xpReward: 800,
    coinReward: 80,
  },
  {
    id: 'wealth-fundamentals',
    name: 'Wealth Fundamentals',
    pillar: 'Mastery',
    icon: '💎',
    description: 'Master the fundamental principles of wealth: what it is, how systems build it, and how risk evolves through life.',
    level: 'advanced',
    unlockRequirements: {
      previousModuleId: 'career-income',
      orTestOutScore: 85,
    },
    xpReward: 480,
    coinReward: 48,
  },
];

// Full module with lessons (Income module)
export const incomeModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[0],
  lessons: [
    activeIncomeBasicsLesson,
    lesson2ControllingPay,
    lesson3Negotiation,
    lesson4EnergyBurnout,
    lesson5Launchpad,
  ],
  testOutQuestions: [
    {
      question: 'What is active income?',
      options: [
        'Money earned from investments',
        'Money earned by trading time and effort for pay',
        'Money earned from rental properties',
        'Money earned from dividends',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which factor most directly increases hourly income without adding hours?',
      options: [
        'Working overtime',
        'Taking more shifts',
        'Improving valuable skills',
        'Working weekends',
      ],
      correctIndex: 2,
    },
    {
      question: 'What limits active income growth the fastest?',
      options: [
        'Skill development',
        'Available time and energy',
        'Job availability',
        'Education level',
      ],
      correctIndex: 1,
    },
    {
      question: 'A skill premium is earned when you:',
      options: [
        'Work more hours than others',
        'Have more experience in years',
        'Solve harder or more valuable problems',
        'Take on more responsibilities',
      ],
      correctIndex: 2,
    },
    {
      question: 'What happens to active income when you stop working?',
      options: [
        'It continues at a reduced rate',
        'It stops completely',
        'It grows through interest',
        'It remains stable',
      ],
      correctIndex: 1,
    },
  ],
};

// Full module with lessons (Financial Planning module)
export const financialPlanningModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[1],
  lessons: [
    lesson1DirectionBeforeSpeed,
    lesson2TimeHorizons,
    lesson3WantsNeedsTargets,
    lesson4PriorityStacking,
    lesson5ProgressMeasurement,
  ],
  testOutQuestions: [
    {
      question: 'Why do clear goals reduce stress?',
      options: [
        'They increase income',
        'They remove unnecessary choices',
        'They guarantee success',
        'They increase motivation',
      ],
      correctIndex: 1,
    },
    {
      question: 'What is a time horizon?',
      options: [
        'How much time you have to work',
        'The length of time before a goal needs to be achieved',
        'Your daily schedule',
        'The time it takes to earn money',
      ],
      correctIndex: 1,
    },
    {
      question: 'Wants differ from needs because:',
      options: [
        'Wants cost more money',
        'Wants are non-essential but improve comfort',
        'Needs are always expensive',
        'Wants are bad and should be avoided',
      ],
      correctIndex: 1,
    },
    {
      question: 'Priority stacking helps because:',
      options: [
        'It lets you achieve all goals at once',
        'It focuses resources on one goal at a time',
        'It removes the need for goals',
        'It increases your income automatically',
      ],
      correctIndex: 1,
    },
    {
      question: 'The comparison trap occurs when:',
      options: [
        'You compare prices before buying',
        'You evaluate progress using others\' outcomes',
        'You track your own goals',
        'You measure alignment scores',
      ],
      correctIndex: 1,
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'The price of an item',
        'The best alternative given up when deciding',
        'Taxes you pay',
        'Interest on savings',
      ],
      correctIndex: 1,
    },
    {
      question: 'Alignment measures:',
      options: [
        'How much you earn',
        'How fast you save',
        'How well actions match goals',
        'How others are doing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Short-term goals usually require:',
      options: [
        'Maximum growth potential',
        'High risk investments',
        'Accessibility and stability',
        'Long holding periods',
      ],
      correctIndex: 2,
    },
    {
      question: 'Goal dilution happens when:',
      options: [
        'Goals become clearer',
        'Resources are spread too thin across goals',
        'You focus on one goal',
        'You complete a goal',
      ],
      correctIndex: 1,
    },
    {
      question: 'Intentional spending means:',
      options: [
        'Spending as little as possible',
        'Never buying wants',
        'Assigning money a purpose before spending',
        'Only buying needs',
      ],
      correctIndex: 2,
    },
  ],
};

// Full module with lessons (Saving module)
export const savingModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[2],
  lessons: [
    lesson1WhySavingComesBeforeSpending,
    lesson2EmergencyFundsAndTargets,
    lesson3AutomatingAndMaintainingSavings,
    lesson4SavingTradeoffsAndOpportunityCost,
    lesson5WhenToIncreaseSavings,
  ],
  testOutQuestions: [
    {
      question: 'Saving usually fails because:',
      options: [
        'Income is too low',
        'Saving waits until the end',
        'Banks limit access',
        'Investing comes first',
      ],
      correctIndex: 1,
    },
    {
      question: 'Paying yourself first means:',
      options: [
        'Saving after bills',
        'Saving when stressed',
        'Saving monthly',
        'Saving immediately when paid',
      ],
      correctIndex: 3,
    },
    {
      question: 'The main purpose of an emergency fund is to:',
      options: [
        'Earn interest',
        'Cover planned expenses',
        'Prevent bad decisions during disruptions',
        'Replace investing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Why is a starter emergency fund useful?',
      options: [
        'It replaces full savings',
        'It stops small problems from escalating',
        'It earns higher returns',
        'It reduces taxes',
      ],
      correctIndex: 1,
    },
    {
      question: 'Automation helps saving because it:',
      options: [
        'Increases income',
        'Removes decision-making',
        'Raises interest rates',
        'Limits spending',
      ],
      correctIndex: 1,
    },
    {
      question: 'Friction is dangerous because it:',
      options: [
        'Slows growth slightly',
        'Makes saving harder to repeat',
        'Lowers returns',
        'Increases taxes',
      ],
      correctIndex: 1,
    },
    {
      question: 'Opportunity cost refers to:',
      options: [
        'Total price paid',
        'Future income',
        'The best alternative given up',
        'Interest earned',
      ],
      correctIndex: 2,
    },
    {
      question: 'Increasing savings works best when:',
      options: [
        'Income feels tight',
        'Emergencies are covered and cash flow is stable',
        'Motivation is high',
        'Expenses are rising',
      ],
      correctIndex: 1,
    },
    {
      question: 'A savings pause is:',
      options: [
        'A failure',
        'Permanent',
        'Strategic during instability',
        'Avoidable always',
      ],
      correctIndex: 2,
    },
    {
      question: 'Why are withdrawal cycles harmful?',
      options: [
        'They reduce interest',
        'They break consistency and confidence',
        'They increase taxes',
        'They lower income',
      ],
      correctIndex: 1,
    },
  ],
};

// Full module with lessons (Investing module)
export const investingModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[3],
  lessons: [
    lesson1OwnershipTimeConsistency,
    lesson2WhatYouBuyWhenInvesting,
    lesson3RiskVolatilityPriceMovement,
    lesson4DiversificationRiskControl,
    lesson5LongTermStrategy,
  ],
  testOutQuestions: [
    {
      question: 'Investing is best described as',
      options: [
        'Betting on prices',
        'Buying ownership in value creation',
        'Saving with risk',
        'Fast money',
      ],
      correctIndex: 1,
    },
    {
      question: 'A longer time horizon does what to risk?',
      options: [
        'Increases it',
        'Removes it',
        'Changes its shape',
        'Makes losses impossible',
      ],
      correctIndex: 2,
    },
    {
      question: 'Stock returns mainly come from',
      options: [
        'Headlines',
        'Trading speed',
        'Business performance',
        'Market timing',
      ],
      correctIndex: 2,
    },
    {
      question: 'Volatility refers to',
      options: [
        'Permanent loss',
        'Business failure',
        'Price movement',
        'Market collapse',
      ],
      correctIndex: 2,
    },
    {
      question: 'Diversification is best described as',
      options: [
        'Avoiding risk',
        'Spreading exposure',
        'Chasing stability',
        'Limiting growth',
      ],
      correctIndex: 1,
    },
    {
      question: 'The biggest cost of leaving the market is',
      options: [
        'Taxes',
        'Fees',
        'Missed growth periods',
        'Stress',
      ],
      correctIndex: 2,
    },
    {
      question: 'Consistency matters because',
      options: [
        'Markets reward effort',
        'Timing is easy',
        'Emotion hurts decisions',
        'Cash loses value instantly',
      ],
      correctIndex: 2,
    },
    {
      question: 'Risk control exists to',
      options: [
        'Increase returns',
        'Predict markets',
        'Avoid volatility',
        'Prevent ruin',
      ],
      correctIndex: 3,
    },
    {
      question: 'Long-term strategies should be',
      options: [
        'Complex',
        'Flexible daily',
        'Rule-based',
        'Reaction-driven',
      ],
      correctIndex: 2,
    },
    {
      question: 'Staying invested works because',
      options: [
        'Markets never fall',
        'Volatility disappears',
        'Time compounds growth',
        'Rules guarantee profits',
      ],
      correctIndex: 2,
    },
  ],
};

// Full module with lessons (Insurance module)
export const insuranceModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[4],
  lessons: [
    lesson1ProtectingYourAssets,
    lesson2InsuranceBasicsRiskTransfer,
    lesson3FraudScamsIdentityProtection,
    lesson4LegalBasicsLiabilityProtection,
    lesson5DigitalSecurityProtectionHabits,
  ],
  testOutQuestions: [
    {
      question: 'Asset protection mainly exists to:',
      options: ['Increase returns', 'Prevent all risk', 'Limit damage from unexpected events', 'Speed up wealth growth'],
      correctIndex: 2,
    },
    {
      question: 'Insurance works best for risks that are:',
      options: ['Small and frequent', 'Large and rare', 'Predictable and regular', 'Guaranteed to happen'],
      correctIndex: 1,
    },
    {
      question: 'A premium is:',
      options: ['The amount you pay before insurance kicks in', 'The regular payment to keep coverage active', 'The maximum coverage amount', 'The interest on claims'],
      correctIndex: 1,
    },
    {
      question: 'Scammers use urgency because:',
      options: ['It builds trust', 'It prevents you from thinking clearly', 'It improves security', 'It helps victims decide'],
      correctIndex: 1,
    },
    {
      question: 'Identity theft is serious because:',
      options: ['It only affects money', 'Recovery takes time and affects many life areas', 'Insurance always covers it', 'It happens rarely'],
      correctIndex: 1,
    },
    {
      question: 'Liability means:',
      options: ['Owning assets', 'Legal responsibility for harm or damage', 'Avoiding all risk', 'Insurance coverage limits'],
      correctIndex: 1,
    },
    {
      question: 'Negligence increases liability when:',
      options: ['You have insurance', 'You fail to act with reasonable care', 'You sign contracts', 'You follow rules'],
      correctIndex: 1,
    },
    {
      question: 'Two-factor authentication helps because:',
      options: ['It speeds up logins', 'It adds another barrier to unauthorized access', 'It removes the need for passwords', 'It looks professional'],
      correctIndex: 1,
    },
    {
      question: 'Digital security fails most often due to:',
      options: ['Technology failures', 'Poor habits and human error', 'Law changes', 'Market conditions'],
      correctIndex: 1,
    },
    {
      question: 'Long-term protection works best when habits are:',
      options: ['Occasional', 'Perfect', 'Consistent', 'Complex'],
      correctIndex: 2,
    },
  ],
};

// Full module with lessons (Taxes module)
export const taxesModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[5],
  lessons: [
    lesson1UnderstandingTaxes,
    lesson2IncomeTypesTaxation,
    lesson3DeductionsCredits,
    lesson4TaxAdvantagedAccounts,
    lesson5TaxPlanningMindset,
  ],
  testOutQuestions: [
    {
      question: 'Taxes mainly exist to:',
      options: ['Punish workers', 'Fund public systems', 'Reduce income', 'Control spending'],
      correctIndex: 1,
    },
    {
      question: 'Take-home pay refers to:',
      options: ['Total earnings', 'Pre-tax income', 'Money after taxes', 'Hourly wages'],
      correctIndex: 2,
    },
    {
      question: 'Wages are taxed mainly through:',
      options: ['Automatic withholding', 'End of year bills', 'Voluntary payments', 'Market rules'],
      correctIndex: 0,
    },
    {
      question: 'Self-employment income requires:',
      options: ['No planning', 'Automatic withholding', 'Lower rates', 'Setting aside taxes'],
      correctIndex: 3,
    },
    {
      question: 'Deductions reduce:',
      options: ['Taxes owed', 'Taxable income', 'Tax rates', 'Spending'],
      correctIndex: 1,
    },
    {
      question: 'Credits are powerful because:',
      options: ['They reduce income', 'They change rates', 'They avoid filing', 'They reduce taxes directly'],
      correctIndex: 3,
    },
    {
      question: 'Tax-advantaged accounts help by:',
      options: ['Increasing income', 'Delaying or removing taxes', 'Eliminating risk', 'Speeding returns'],
      correctIndex: 1,
    },
    {
      question: 'Tax deferral helps because:',
      options: ['Taxes disappear', 'Growth increases before taxes', 'Rates drop', 'Income rises'],
      correctIndex: 1,
    },
    {
      question: 'Tax planning focuses on:',
      options: ['Breaking rules', 'Avoiding income', 'Legal structure', 'Guessing rates'],
      correctIndex: 2,
    },
    {
      question: 'Long-term tax impact grows because:',
      options: ['Income rises', 'Time compounds decisions', 'Taxes vanish', 'Spending stops'],
      correctIndex: 1,
    },
  ],
};

// Full module with lessons (Credit & Debt module)
export const creditDebtModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[6],
  lessons: [
    lesson1ManagingDebtUnderstandingCredit,
    lesson2TypesOfDebt,
    lesson3CreditScores,
    lesson4PayingDownDebt,
    lesson5BuildingCreditResponsibly,
  ],
  testOutQuestions: [
    { question: 'Debt becomes harmful when:', options: ['It is borrowed', 'It supports growth', 'It is unmanaged', 'It is short term'], correctIndex: 2 },
    { question: 'Credit mainly measures:', options: ['Spending style', 'Job stability', 'Repayment behavior', 'Account balances'], correctIndex: 2 },
    { question: 'Productive debt usually helps by:', options: ['Increasing comfort', 'Funding impulse spending', 'Reducing responsibility', 'Supporting long-term growth'], correctIndex: 3 },
    { question: 'High interest debt is dangerous because:', options: ['It grows quickly over time', 'It lowers credit scores instantly', 'It removes income', 'It guarantees loss'], correctIndex: 0 },
    { question: 'Credit scores affect:', options: ['Only banks', 'Only investments', 'Daily spending', 'Many life decisions'], correctIndex: 3 },
    { question: 'Payment history matters most because:', options: ['It shows consistency', 'It predicts income', 'It measures spending', 'It increases limits'], correctIndex: 0 },
    { question: 'The avalanche method helps by:', options: ['Increasing motivation only', 'Reducing total interest', 'Paying smallest balances', 'Avoiding planning'], correctIndex: 1 },
    { question: 'The snowball method helps by:', options: ['Lowering rates', 'Removing fees', 'Ending interest', 'Building momentum'], correctIndex: 3 },
    { question: 'Responsible credit use means:', options: ['Spending often', 'Borrowing maximum amounts', 'Paying late occasionally', 'Using credit lightly'], correctIndex: 3 },
    { question: 'Building credit works best when you:', options: ['Rush decisions', 'Chase rewards', 'Follow simple rules', 'Avoid planning'], correctIndex: 2 },
  ],
};

// Full module with lessons (Career Income module)
export const careerIncomeModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[7],
  lessons: [
    lesson1CareerInvestment,
    lesson2MarketValue,
    lesson3SkillsThatPay,
    lesson4NegotiationAdvancement,
    lesson5MultipleIncomeStreams,
  ],
  testOutQuestions: [
    { question: 'Human capital refers to:', options: ['Cash savings', 'Investment portfolio', 'Future earning potential', 'Physical assets'], correctIndex: 2 },
    { question: 'Career compounding means:', options: ['Earning interest on savings', 'Raises building on raises over time', 'Working longer hours', 'Getting promoted yearly'], correctIndex: 1 },
    { question: 'Market value is primarily determined by:', options: ['Years of experience', 'Educational degrees', 'Supply and demand for your skills', 'Company loyalty'], correctIndex: 2 },
    { question: 'Skill stacking helps because:', options: ['One skill is enough', 'Combining skills creates unique value', 'Stacking certifications impresses employers', 'More skills mean more work'], correctIndex: 1 },
    { question: 'Multiplier skills include:', options: ['Specific software tools', 'Leadership and communication', 'Industry certifications', 'Technical specialties only'], correctIndex: 1 },
    { question: 'BATNA stands for:', options: ['Best Alternative To Negotiated Agreement', 'Business And Technical Negotiation Approach', 'Baseline Annual Target Negotiation Amount', 'Benefits And Total Net Amount'], correctIndex: 0 },
    { question: 'Visibility matters because:', options: ['Good work speaks for itself', 'Leaders are too busy to notice everyone', 'It makes coworkers jealous', 'It replaces actual performance'], correctIndex: 1 },
    { question: 'Passive income requires:', options: ['No work at all', 'Massive upfront investment', 'Luck and timing', 'Quitting your job first'], correctIndex: 1 },
    { question: 'Financial freedom is achieved when:', options: ['You earn $1 million', 'Passive income exceeds expenses', 'You retire at 65', 'You have zero debt'], correctIndex: 1 },
    { question: 'The best first step to build income streams is:', options: ['Quit your job immediately', 'Join a get-rich-quick scheme', 'Maximize your primary career income', 'Start 5 businesses at once'], correctIndex: 2 },
  ],
};

// Full module with lessons (Wealth Fundamentals module)
export const wealthFundamentalsModule: PersonalFinanceModule = {
  ...PERSONAL_FINANCE_MODULES[8],
  lessons: [
    lesson1WhatWealthIs,
    lesson2SystemsCompounding,
    lesson3RiskLifeStages,
  ],
  testOutQuestions: [
    { question: 'Net worth equals:', options: ['Income minus taxes', 'Assets minus liabilities', 'Spending minus saving', 'Cash minus bills'], correctIndex: 1 },
    { question: 'Wealth differs from income because:', options: ['Income is taxed more', 'Wealth represents ownership that grows', 'Income is more valuable', 'Wealth requires more work'], correctIndex: 1 },
    { question: 'Systems beat motivation because:', options: ['They require less effort', 'They run automatically regardless of mood', 'They guarantee success', 'They increase income'], correctIndex: 1 },
    { question: 'Compounding requires:', options: ['Large initial investments', 'Perfect timing', 'Consistent repetition over time', 'High risk tolerance'], correctIndex: 2 },
    { question: 'Risk capacity is highest when:', options: ['Income is highest', 'Responsibilities are lowest', 'Age is advanced', 'Markets are stable'], correctIndex: 1 },
    { question: 'Smart investors adjust risk by:', options: ['Following market trends', 'Copying experts', 'Matching their life stage', 'Avoiding all risk'], correctIndex: 2 },
  ],
};

// Get all modules for display
export const getAllModules = () => PERSONAL_FINANCE_MODULES;

// Get full module by ID
export const getModuleById = (id: string): PersonalFinanceModule | undefined => {
  if (id === 'income') return incomeModule;
  if (id === 'financial-planning') return financialPlanningModule;
  if (id === 'saving') return savingModule;
  if (id === 'investing') return investingModule;
  if (id === 'insurance') return insuranceModule;
  if (id === 'taxes') return taxesModule;
  if (id === 'credit-debt') return creditDebtModule;
  if (id === 'career-income') return careerIncomeModule;
  if (id === 'wealth-fundamentals') return wealthFundamentalsModule;
  return undefined;
};
