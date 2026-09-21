// Personal Finance Module Registry
import { PersonalFinanceModule, ModuleStatus } from '@/types/personal-finance';
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
    description: 'Get your first paycheck — then find out where the missing money went, and how to earn more without burning out.',
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
    description: 'Build a cash cushion before the kingdom needs it. When trouble hits, you\'ll be the one who\'s ready.',
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'income-growth-active-income',
        question: 'What is active income?',
        options: [
          'Money earned from investments',
          'Money earned by trading time and effort for pay',
          'Money that grows on its own while you sleep',
          'Money earned from owning property',
        ],
        correctIndex: 1,
      },
      {
        id: 'income-growth-raise-pay',
        question: "What's the most reliable way to raise your hourly pay without adding hours?",
        options: [
          'Ask for more shifts',
          'Work faster',
          'Build a skill that solves a harder problem',
          'Wait for a scheduled raise',
        ],
        correctIndex: 2,
      },
      {
        id: 'income-growth-limiter',
        question: "What's the biggest limiter on how much active income can grow?",
        options: [
          'Your available time and energy',
          'Your employer’s budget',
          'The minimum wage',
          'How many jobs exist nearby',
        ],
        correctIndex: 0,
      },
      {
        id: 'income-growth-stops',
        question: 'If you stop showing up to work, what happens to active income?',
        options: [
          'It keeps paying out for a while',
          'It stops right away',
          'It slowly grows on its own',
          'It converts into savings',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'income-growth-decision-raise',
      prompt:
        "You've been doing great work for six months and haven't had a raise. What's your move?",
      choices: [
        { id: 'ask-with-evidence', label: 'Ask your manager directly, pointing to specific work you’ve done', optimality: 95 },
        { id: 'work-harder-silently', label: 'Just keep working hard and hope it gets noticed', optimality: 35 },
        { id: 'complain-to-coworkers', label: 'Vent to coworkers about being underpaid', optimality: 10 },
        { id: 'quit-on-the-spot', label: 'Quit immediately without another job lined up', optimality: 15 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'fp-growth-clear-goals',
        question: 'Why do clear financial goals reduce stress?',
        options: [
          'They guarantee you’ll succeed',
          'They remove unnecessary choices',
          'They automatically increase your income',
          'They make saving unnecessary',
        ],
        correctIndex: 1,
      },
      {
        id: 'fp-growth-time-horizon',
        question: 'What is a "time horizon" in financial planning?',
        options: [
          'How much free time you have',
          'The length of time before a goal needs to be reached',
          'Your daily work schedule',
          'How long it takes to get paid',
        ],
        correctIndex: 1,
      },
      {
        id: 'fp-growth-opportunity-cost',
        question: 'What does "opportunity cost" mean when making a money decision?',
        options: [
          'The sales tax on a purchase',
          'The best alternative you give up by choosing something else',
          'The interest a bank charges',
          'The total cost printed on a receipt',
        ],
        correctIndex: 1,
      },
      {
        id: 'fp-growth-alignment',
        question: 'What does it mean for your spending to be "aligned" with your goals?',
        options: [
          'You spend as little as possible',
          'Your actions actually match what you say you want',
          'You never buy anything fun',
          'You earn more than your friends',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'fp-growth-decision-bonus',
      prompt: 'You get a surprise $300 bonus at work and haven’t written down any goals yet. What’s your best move?',
      choices: [
        { id: 'write-goal-first', label: 'Decide what goal it should go toward before spending any of it', optimality: 90 },
        { id: 'spend-now', label: 'Spend it right away on something fun', optimality: 30 },
        { id: 'let-it-sit', label: 'Let it sit in checking and decide later', optimality: 45 },
        { id: 'copy-friend', label: 'Do whatever a friend says they’d do with theirs', optimality: 15 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'saving-growth-pay-yourself-first',
        question: 'What does "pay yourself first" mean?',
        options: [
          'Save whatever is left after all bills',
          'Move money to savings the moment you’re paid',
          'Save once a year',
          'Pay off debt before anything else',
        ],
        correctIndex: 1,
      },
      {
        id: 'saving-growth-emergency-fund-purpose',
        question: 'What is the main purpose of an emergency fund?',
        options: [
          'To earn the highest possible interest',
          'To cover planned purchases',
          'To prevent bad decisions when something unexpected happens',
          'To replace investing entirely',
        ],
        correctIndex: 2,
      },
      {
        id: 'saving-growth-automation',
        question: 'Why does automating your savings help?',
        options: [
          'It increases your paycheck',
          'It removes the need to decide every time',
          'It raises interest rates',
          'It stops you from ever spending money',
        ],
        correctIndex: 1,
      },
      {
        id: 'saving-growth-opportunity-cost',
        question: 'What are you giving up when you choose to save money instead of spending it now?',
        options: [
          'Nothing, saving has no trade-off',
          'The chance to use that money on something else right now',
          'Your ability to ever spend it',
          'Your credit score',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'saving-growth-decision-payday',
      prompt: 'You just got paid and have some money left after covering essentials. What’s the smartest move?',
      choices: [
        { id: 'auto-transfer', label: 'Have a set amount move to savings automatically before you can spend it', optimality: 95 },
        { id: 'wait-end-of-month', label: 'Wait until the end of the month to see what’s left over', optimality: 35 },
        { id: 'spend-now', label: 'Spend it now since you worked hard for it', optimality: 20 },
        { id: 'inconsistent-amount', label: 'Save it, but change how much every month depending on mood', optimality: 40 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'investing-growth-what-it-is',
        question: 'Investing is best described as:',
        options: [
          'Betting on which price will go up next',
          'Buying ownership in something that creates value',
          'A faster type of saving',
          'A way to avoid all risk',
        ],
        correctIndex: 1,
      },
      {
        id: 'investing-growth-time-horizon-risk',
        question: 'What does a longer time horizon do to how much risk you can handle?',
        options: [
          'It has no effect',
          'It removes risk completely',
          'It lets you ride out more short-term ups and downs',
          'It guarantees higher returns',
        ],
        correctIndex: 2,
      },
      {
        id: 'investing-growth-diversification',
        question: 'What does diversification mainly protect you from?',
        options: [
          'Losing money on any single investment ever',
          'One investment’s bad performance sinking your whole plan',
          'The stock market closing',
          'Paying taxes',
        ],
        correctIndex: 1,
      },
      {
        id: 'investing-growth-consistency',
        question: 'Why does staying invested consistently usually beat trying to time the market?',
        options: [
          'Markets never drop if you’re consistent',
          'Missing the best growth periods is very costly',
          'Timing the market is easy once you learn how',
          'Consistency guarantees profit',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'investing-growth-decision-drop',
      prompt: 'The market drops 15% right after you invest your first paycheck. What’s the smart move?',
      choices: [
        { id: 'stay-invested', label: 'Stay invested and keep contributing on schedule', optimality: 95 },
        { id: 'sell-everything', label: 'Sell everything to avoid losing more', optimality: 10 },
        { id: 'pause-contributions', label: 'Stop contributing until it feels safe again', optimality: 30 },
        { id: 'time-reentry', label: 'Try to guess the exact moment to buy back in', optimality: 25 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'insurance-growth-purpose',
        question: 'What is the main purpose of insurance?',
        options: [
          'To guarantee you never lose money',
          'To limit the damage from a large, unexpected loss',
          'To grow your savings faster',
          'To replace an emergency fund',
        ],
        correctIndex: 1,
      },
      {
        id: 'insurance-growth-premium',
        question: 'What is a "premium"?',
        options: [
          'The maximum amount insurance will ever pay',
          'The regular payment you make to keep coverage active',
          'The amount you pay before coverage starts',
          'A bonus you get for not filing a claim',
        ],
        correctIndex: 1,
      },
      {
        id: 'insurance-growth-scam-urgency',
        question: 'Why do scammers try to create a sense of urgency?',
        options: [
          'It builds trust with the victim',
          'It stops you from thinking clearly before you act',
          'It’s required by law',
          'It helps verify your identity',
        ],
        correctIndex: 1,
      },
      {
        id: 'insurance-growth-liability',
        question: 'What does "liability" mean?',
        options: [
          'The assets you own',
          'Legal responsibility for harm or damage you caused',
          'The total coverage limit on a policy',
          'A type of savings account',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'insurance-growth-decision-urgent-text',
      prompt: 'You get an urgent text saying your bank account will be frozen unless you click a link right now. What’s the smart move?',
      choices: [
        { id: 'contact-bank-directly', label: 'Ignore the link and contact your bank using a number you already trust', optimality: 95 },
        { id: 'click-link', label: 'Click the link quickly before the deadline', optimality: 5 },
        { id: 'reply-for-info', label: 'Reply to the text asking for more information', optimality: 20 },
        { id: 'ignore-fully', label: 'Delete it and don’t look into it at all', optimality: 55 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'taxes-growth-purpose',
        question: 'What do taxes mainly fund?',
        options: [
          'Bank profits',
          'Public systems and services',
          'Employer bonuses',
          'Stock market growth',
        ],
        correctIndex: 1,
      },
      {
        id: 'taxes-growth-takehome',
        question: 'What does "take-home pay" mean?',
        options: [
          'Your total salary before anything is taken out',
          'The money you actually receive after taxes',
          'Your hourly wage',
          'Money you save each month',
        ],
        correctIndex: 1,
      },
      {
        id: 'taxes-growth-deductions-vs-credits',
        question: 'How do tax credits reduce what you owe, compared to deductions?',
        options: [
          'They work the exact same way',
          'Credits reduce your taxes owed directly; deductions reduce your taxable income first',
          'Credits only apply to businesses',
          'Deductions are always worth more than credits',
        ],
        correctIndex: 1,
      },
      {
        id: 'taxes-growth-tax-advantaged',
        question: 'How do tax-advantaged accounts (like a 401k) help you?',
        options: [
          'They guarantee higher investment returns',
          'They delay or reduce the taxes you pay on that money',
          'They remove all investment risk',
          'They’re only available after retirement',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'taxes-growth-decision-side-hustle',
      prompt: 'You start a side hustle that pays you directly, with no taxes withheld. What’s the smart move?',
      choices: [
        { id: 'set-aside-portion', label: 'Set aside a portion of each payment for taxes as you earn it', optimality: 95 },
        { id: 'spend-and-figure-out-later', label: 'Spend it all and figure out taxes at the end of the year', optimality: 15 },
        { id: 'assume-not-taxed', label: 'Assume side income isn’t taxed since it’s not a real job', optimality: 5 },
        { id: 'wait-for-form', label: 'Wait for a tax form to show up before thinking about it', optimality: 40 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'credit-debt-growth-harmful',
        question: 'When does debt become harmful?',
        options: [
          'The moment you borrow anything',
          'When it’s unmanaged',
          'When it’s short term',
          'When it supports long-term growth',
        ],
        correctIndex: 1,
      },
      {
        id: 'credit-debt-growth-credit-score',
        question: 'What does your credit score mainly measure?',
        options: [
          'How much money you have',
          'Your job title',
          'Your repayment behavior',
          'How many credit cards you own',
        ],
        correctIndex: 2,
      },
      {
        id: 'credit-debt-growth-avalanche',
        question: 'How does the "avalanche method" help you pay off debt faster?',
        options: [
          'It pays off the smallest balance first for motivation',
          'It targets the highest-interest debt first, reducing total interest paid',
          'It pays every debt equally each month',
          'It skips payments on low-interest debt',
        ],
        correctIndex: 1,
      },
      {
        id: 'credit-debt-growth-responsible-use',
        question: 'What does responsible credit use look like?',
        options: [
          'Maxing out every card you have',
          'Using credit lightly and paying on time',
          'Paying late occasionally to build history',
          'Avoiding credit completely forever',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'credit-debt-growth-decision-extra-payment',
      prompt: 'You have $200 extra this month and two debts: a $500 balance at 24% interest, and a $2,000 balance at 4% interest. What’s the smartest move?',
      choices: [
        { id: 'pay-high-interest', label: 'Put the extra $200 toward the 24% interest debt first', optimality: 95 },
        { id: 'split-evenly', label: 'Split it evenly between both debts', optimality: 45 },
        { id: 'pay-bigger-balance', label: 'Put it all toward the bigger $2,000 balance', optimality: 25 },
        { id: 'save-instead', label: 'Save it instead of paying down any debt', optimality: 20 },
      ],
    },
  },
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
    { question: 'Before asking for a raise, why does it help to have another real option (another offer, another path)?', options: ['It lets you threaten to quit on the spot', 'A real backup option gives you the confidence to ask and the power to walk away', 'It guarantees the raise will be approved', 'It proves you are more loyal than your coworkers'], correctIndex: 1 },
    { question: 'Visibility matters because:', options: ['Good work speaks for itself', 'Leaders are too busy to notice everyone', 'It makes coworkers jealous', 'It replaces actual performance'], correctIndex: 1 },
    { question: 'Passive income requires:', options: ['No work at all', 'Massive upfront investment', 'Luck and timing', 'Quitting your job first'], correctIndex: 1 },
    { question: 'Financial freedom is achieved when:', options: ['You earn $1 million', 'Passive income exceeds expenses', 'You retire at 65', 'You have zero debt'], correctIndex: 1 },
    { question: 'The best first step to build income streams is:', options: ['Quit your job immediately', 'Join a get-rich-quick scheme', 'Maximize your primary career income', 'Start 5 businesses at once'], correctIndex: 2 },
  ],
  growthCheck: {
    anchorQuestions: [
      {
        id: 'career-growth-human-capital',
        question: 'What is "human capital"?',
        options: [
          'Cash you have saved',
          'Your future earning potential from skills and experience',
          'The stocks you own',
          'Physical assets like a car or home',
        ],
        correctIndex: 1,
      },
      {
        id: 'career-growth-market-value',
        question: 'What mainly determines your market value at work?',
        options: [
          'Years of experience alone',
          'How many degrees you have',
          'Supply and demand for your specific skills',
          'How long you’ve been loyal to one company',
        ],
        correctIndex: 2,
      },
      {
        id: 'career-growth-skill-stacking',
        question: 'How does "skill stacking" increase your value?',
        options: [
          'It doesn’t — one deep skill is always better',
          'Combining skills creates a unique, harder-to-replace combination',
          'It only matters for certifications',
          'It guarantees a promotion',
        ],
        correctIndex: 1,
      },
      {
        id: 'career-growth-passive-income',
        question: 'What does building real passive income actually require?',
        options: [
          'No work at all, ever',
          'Upfront work or investment before it pays off passively',
          'Quitting your main job first',
          'Pure luck and timing',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'career-growth-decision-raise',
      prompt: 'You want to ask for a raise but have no other job offer or alternative lined up. What’s the smartest move?',
      choices: [
        { id: 'build-alternative-first', label: 'Build a real alternative (another offer or in-demand skill) first, then ask from a position of strength', optimality: 90 },
        { id: 'threaten-quit', label: 'Ask immediately and threaten to quit if they say no', optimality: 15 },
        { id: 'wait-quietly', label: 'Wait quietly and hope your work gets noticed', optimality: 35 },
        { id: 'vent-to-coworkers', label: 'Complain to coworkers about being underpaid', optimality: 10 },
      ],
    },
  },
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
  growthCheck: {
    anchorQuestions: [
      {
        id: 'wealth-growth-net-worth',
        question: 'What is net worth?',
        options: [
          'Income minus taxes',
          'Assets minus liabilities',
          'Spending minus saving',
          'Cash minus monthly bills',
        ],
        correctIndex: 1,
      },
      {
        id: 'wealth-growth-wealth-vs-income',
        question: 'How does wealth differ from income?',
        options: [
          'Wealth is taxed more heavily',
          'Wealth is ownership that can keep growing on its own',
          'Income is always more valuable long-term',
          'They mean exactly the same thing',
        ],
        correctIndex: 1,
      },
      {
        id: 'wealth-growth-systems',
        question: 'Why do systems (automatic habits) beat relying on motivation?',
        options: [
          'They require more willpower',
          'They keep running even when motivation is low',
          'They guarantee you’ll get rich',
          'They increase your income directly',
        ],
        correctIndex: 1,
      },
      {
        id: 'wealth-growth-risk-capacity',
        question: 'When is your capacity to take on financial risk usually highest?',
        options: [
          'When you have the most responsibilities',
          'When you’re young with few dependents and time to recover',
          'Right before retirement',
          'Only when markets are already rising',
        ],
        correctIndex: 1,
      },
    ],
    decisionScenario: {
      id: 'wealth-growth-decision-first-paycheck',
      prompt: 'You just landed your first stable paycheck with low expenses and no dependents. What’s the smart move with risk?',
      choices: [
        { id: 'use-high-capacity', label: 'Take advantage of your high risk capacity now, while you have time to recover from setbacks', optimality: 90 },
        { id: 'avoid-all-risk', label: 'Avoid all risk until you’re much older', optimality: 30 },
        { id: 'copy-influencer', label: 'Copy exactly what an influencer online is investing in', optimality: 15 },
        { id: 'wait-for-perfect-moment', label: 'Wait for the "perfect" moment to start', optimality: 25 },
      ],
    },
  },
};

// Get all modules for display
export const getAllModules = () => PERSONAL_FINANCE_MODULES;

/**
 * Single source of truth for a module's unlock state. Mirrors the gating used by
 * the skill tree: a module is unlocked if it has an explicit status, is the first
 * module, or the previous module is completed — otherwise it's locked.
 * Used to stop deep links (e.g. Ask Phil "Learn More" links) from opening a
 * module the student hasn't unlocked yet.
 */
export const getModuleUnlockStatus = (
  moduleProgress: Record<string, { status?: ModuleStatus } | undefined>,
  moduleId: string
): ModuleStatus => {
  const modules = PERSONAL_FINANCE_MODULES;
  const index = modules.findIndex((m) => m.id === moduleId);
  if (index < 0) return 'locked';
  const progress = moduleProgress[moduleId];
  if (progress?.status) return progress.status;
  if (index === 0) return 'unlocked';
  const prev = modules[index - 1];
  const prevProgress = prev ? moduleProgress[prev.id] : undefined;
  if (prevProgress?.status === 'completed') return 'unlocked';
  return 'locked';
};

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
