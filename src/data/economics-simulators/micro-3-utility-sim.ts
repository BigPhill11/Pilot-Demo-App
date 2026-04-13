/**
 * Consumer Choice: Budget Optimizer
 * 
 * Unit 3 Microeconomics - Students manage a monthly budget and learn
 * how to maximize utility (satisfaction) given limited resources.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro3UtilitySim: SimulatorConfig = {
  id: 'micro-3-utility-sim',
  unitId: 'micro-3-consumer-choice',
  title: 'Budget Optimizer',
  subtitle: 'Maximize Your Happiness',
  description: 'You have a limited budget and unlimited wants. Learn to allocate your money to maximize satisfaction using the principles of utility theory.',
  icon: '🎯',
  theme: {
    primary: 'emerald',
    secondary: 'teal',
    accent: 'cyan',
  },
  
  introNarrative: "Congratulations on your first job! You're earning $3,000/month after taxes. Between rent, food, entertainment, and savings, you need to make smart choices. Your goal: maximize your happiness (utility) with every dollar you spend.",
  philIntro: "Utility is just a fancy word for satisfaction or happiness! Every purchase gives you some utility, but here's the trick: the MORE you have of something, the LESS additional happiness each extra unit brings. That's diminishing marginal utility, and it's the key to smart spending!",
  
  initialMeters: [
    { id: 'budget', label: 'Monthly Budget', value: 3000, min: 0, max: 3000, unit: '$', color: 'green', icon: '💵' },
    { id: 'utility', label: 'Total Utility', value: 0, min: 0, max: 100, unit: 'pts', color: 'purple', icon: '😊' },
    { id: 'savings', label: 'Savings Rate', value: 0, min: 0, max: 30, unit: '%', color: 'blue', icon: '🏦' },
    { id: 'balance', label: 'Life Balance', value: 50, min: 0, max: 100, unit: '%', color: 'amber', icon: '⚖️' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Understanding Utility',
      narrative: "Your first month of budgeting! Let's learn how different purchases give you different amounts of satisfaction, and why the first slice of pizza is always better than the fifth.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'The Entertainment Dilemma',
          scenario: "You have $200 for entertainment this month. You're choosing between: streaming services ($15/mo each), concert tickets ($80), or video games ($60). How do you allocate?",
          context: 'Think about diminishing marginal utility - does the 4th streaming service give as much joy as the 1st?',
          options: [
            {
              id: 'diversify',
              label: 'Diversify: 2 Streams + 1 Concert',
              description: '$30 streaming + $80 concert + $60 games = $170',
              meterChanges: { budget: -170, utility: 25, balance: 10 },
              feedback: 'Great choice! Variety maximizes utility because each type of entertainment gives high marginal utility.',
              philInsight: 'This is optimal! The first unit of each good gives more utility than additional units of the same good. Diversification wins!',
            },
            {
              id: 'all-streaming',
              label: 'All Streaming (6 services)',
              description: 'Subscribe to every streaming platform ($90)',
              meterChanges: { budget: -90, utility: 12, balance: -5 },
              feedback: 'You saved money but... do you really need 6 streaming services? The 6th adds little joy.',
              philInsight: 'Diminishing marginal utility in action! The first streaming service is great, but each additional one adds less satisfaction.',
            },
            {
              id: 'splurge',
              label: 'Splurge on Concerts (2 tickets)',
              description: 'Go to two concerts this month ($160)',
              meterChanges: { budget: -160, utility: 18, balance: 5 },
              feedback: 'Concerts are fun, but the second one this month wasn\'t quite as exciting as the first.',
              philInsight: 'Even experiences have diminishing returns! The marginal utility of the 2nd concert is lower than the 1st.',
            },
          ],
          conceptConnection: 'Diminishing marginal utility: each additional unit of a good provides less additional satisfaction than the previous one.',
        },
        {
          id: 'r1-d2',
          title: 'Needs vs. Wants',
          scenario: "You need to allocate between groceries (need) and dining out (want). Groceries cost $300/month for basics, dining out is $15-25 per meal. You have $500 for food.",
          options: [
            {
              id: 'balanced',
              label: 'Balanced: $350 Groceries + $150 Dining',
              description: 'Good groceries plus about 8 restaurant meals.',
              meterChanges: { budget: -500, utility: 22, balance: 15 },
              feedback: 'Smart balance! You covered your needs and still enjoyed some dining out.',
              philInsight: 'Needs have high initial utility (you gotta eat!), but once satisfied, wants can add more marginal utility.',
            },
            {
              id: 'frugal',
              label: 'Frugal: $300 Groceries + $50 Dining',
              description: 'Basic groceries and just 2-3 restaurant meals.',
              meterChanges: { budget: -350, utility: 15, savings: 5, balance: 5 },
              feedback: 'You saved money but might feel deprived. Those few restaurant meals were extra special though!',
              philInsight: 'When dining out is rare, each meal has HIGH marginal utility. Scarcity increases value!',
            },
            {
              id: 'foodie',
              label: 'Foodie: $250 Groceries + $400 Dining',
              description: 'Minimal groceries, maximum restaurant experiences.',
              meterChanges: { budget: -650, utility: 18, balance: -10 },
              feedback: 'Lots of great meals, but you went over budget and your home fridge is empty.',
              philInsight: 'You exceeded your budget constraint! No matter how much utility something gives, you can\'t spend more than you have.',
            },
          ],
          conceptConnection: 'Budget constraints limit our choices. We must allocate limited resources to maximize total utility.',
        },
      ],
      roundSummary: 'Key insight: Spread your spending across different categories to maximize utility. The first dollar spent on each category gives more satisfaction than the tenth dollar on one category.',
    },
    {
      roundNumber: 2,
      title: 'The Utility Maximization Rule',
      narrative: "Now let's get mathematical! The secret to maximizing utility: spend each dollar where it gives you the most bang for your buck. That means equalizing marginal utility per dollar across all purchases.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Marginal Utility Per Dollar',
          scenario: "You're comparing: Gym membership ($50/mo, 20 utility points) vs. Spotify ($10/mo, 8 utility points) vs. Nice coffee ($5/day = $150/mo, 30 utility points). Which gives best utility per dollar?",
          context: 'Calculate: Utility ÷ Price for each option.',
          options: [
            {
              id: 'spotify',
              label: 'Prioritize Spotify (0.8 utility/$)',
              description: 'Best bang for your buck at 8 utility ÷ $10 = 0.8',
              meterChanges: { budget: -10, utility: 8, balance: 5 },
              feedback: 'Correct calculation! Spotify gives the most utility per dollar spent.',
              philInsight: 'You found the highest marginal utility per dollar! This is the utility maximization rule in action.',
            },
            {
              id: 'gym',
              label: 'Prioritize Gym (0.4 utility/$)',
              description: 'Health is wealth! 20 utility ÷ $50 = 0.4',
              meterChanges: { budget: -50, utility: 20, balance: 10 },
              feedback: 'Good utility, but not the best per dollar. You\'re paying more per unit of satisfaction.',
              philInsight: 'The gym gives good total utility but lower marginal utility per dollar than Spotify.',
            },
            {
              id: 'coffee',
              label: 'Prioritize Coffee (0.2 utility/$)',
              description: 'Daily joy! 30 utility ÷ $150 = 0.2',
              meterChanges: { budget: -150, utility: 30, balance: -5 },
              feedback: 'Highest total utility but worst per dollar. You\'re overspending for the satisfaction received.',
              philInsight: 'Coffee gives the most total utility but the LEAST per dollar. That\'s an inefficient allocation!',
            },
          ],
          conceptConnection: 'Utility maximization rule: Allocate spending so marginal utility per dollar is equal across all goods.',
        },
        {
          id: 'r2-d2',
          title: 'Rebalancing Your Budget',
          scenario: "Your current spending: Rent $1200, Food $500, Transport $200, Entertainment $300, Savings $300, Other $500. You got a $200 raise. Where should it go?",
          options: [
            {
              id: 'savings',
              label: 'Boost Savings to $500',
              description: 'Future you will thank present you.',
              meterChanges: { budget: 0, utility: 5, savings: 7, balance: 10 },
              feedback: 'Smart! Savings have high marginal utility when you\'re below your target rate.',
              philInsight: 'When savings are low, each dollar saved has high marginal utility (security, future options). Good choice!',
            },
            {
              id: 'entertainment',
              label: 'Double Entertainment to $500',
              description: 'You work hard, you deserve fun!',
              meterChanges: { budget: 0, utility: 8, balance: -5 },
              feedback: 'More fun, but diminishing returns. Is the 4th streaming service as good as the 1st?',
              philInsight: 'Entertainment already has $300. Adding $200 more hits diminishing marginal utility hard.',
            },
            {
              id: 'food',
              label: 'Upgrade Food to $700',
              description: 'Better ingredients, better meals.',
              meterChanges: { budget: 0, utility: 6, balance: 5 },
              feedback: 'Nicer groceries and more dining out. Moderate utility gain.',
              philInsight: 'Food upgrades have decent marginal utility, but you were already eating well at $500.',
            },
          ],
          conceptConnection: 'When income increases, allocate the extra money where marginal utility per dollar is highest.',
        },
      ],
      roundSummary: 'The utility maximization rule: MU₁/P₁ = MU₂/P₂ = MU₃/P₃. Spend each dollar where it gives the most additional satisfaction!',
    },
    {
      roundNumber: 3,
      title: 'Consumer Surplus & Value',
      narrative: "Final lesson: the difference between what you're willing to pay and what you actually pay is your consumer surplus. Let's maximize it!",
      decisions: [
        {
          id: 'r3-d1',
          title: 'Finding Deals',
          scenario: "You want a new laptop. You'd pay up to $1500 for it (your maximum willingness to pay). You found three options: Brand A at $1400, Brand B at $1000, Brand C at $800 (refurbished, same specs).",
          options: [
            {
              id: 'brand-c',
              label: 'Brand C Refurbished ($800)',
              description: 'Consumer surplus: $1500 - $800 = $700',
              meterChanges: { budget: -800, utility: 20, savings: 3 },
              feedback: 'Maximum consumer surplus! You got $700 worth of value beyond what you paid.',
              philInsight: 'Consumer surplus is the area between your demand curve and the price. You maximized it!',
            },
            {
              id: 'brand-b',
              label: 'Brand B New ($1000)',
              description: 'Consumer surplus: $1500 - $1000 = $500',
              meterChanges: { budget: -1000, utility: 22, savings: 1 },
              feedback: 'Good surplus, plus the peace of mind of new. Solid choice.',
              philInsight: 'You traded some consumer surplus for the utility of "new." That\'s a valid preference!',
            },
            {
              id: 'brand-a',
              label: 'Brand A Premium ($1400)',
              description: 'Consumer surplus: $1500 - $1400 = $100',
              meterChanges: { budget: -1400, utility: 23, savings: -2 },
              feedback: 'Minimal surplus. You paid almost your maximum willingness to pay.',
              philInsight: 'Low consumer surplus means you captured little value beyond the price. The seller got most of the gains from trade.',
            },
          ],
          conceptConnection: 'Consumer surplus = Willingness to Pay - Actual Price. It measures the benefit consumers get from market transactions.',
        },
        {
          id: 'r3-d2',
          title: 'The Annual Budget Review',
          scenario: "Year-end review! Looking at your spending patterns, where did you get the most utility per dollar? Time to optimize for next year.",
          options: [
            {
              id: 'optimize',
              label: 'Reallocate Based on Marginal Utility',
              description: 'Cut low-MU spending, boost high-MU categories.',
              meterChanges: { utility: 15, savings: 5, balance: 10 },
              feedback: 'Perfect! You\'re applying utility theory to real budgeting. Maximum satisfaction achieved.',
              philInsight: 'This is rational consumer behavior! Continuously reallocate until MU/$ is equal everywhere.',
            },
            {
              id: 'increase-all',
              label: 'Increase Everything Proportionally',
              description: 'Got a raise? Scale up all categories equally.',
              meterChanges: { utility: 8, balance: 5 },
              feedback: 'Simple but not optimal. Some categories have higher marginal utility than others.',
              philInsight: 'Proportional increases ignore that different goods have different marginal utilities at current levels.',
            },
            {
              id: 'no-change',
              label: 'Keep Current Allocation',
              description: 'If it ain\'t broke, don\'t fix it.',
              meterChanges: { utility: 3, balance: 0 },
              feedback: 'You\'re leaving utility on the table. Circumstances change, and so should budgets.',
              philInsight: 'Static budgets miss optimization opportunities. Marginal utility changes as quantities change!',
            },
          ],
          conceptConnection: 'Rational consumers continuously adjust spending to maximize utility given their budget constraint.',
        },
      ],
      roundSummary: 'You\'ve learned to think like an economist about spending! Maximize utility by equalizing marginal utility per dollar, and capture consumer surplus by paying less than your willingness to pay.',
    },
  ],
  
  completionThresholds: {
    excellent: { utility: { min: 80 }, savings: { min: 10 }, balance: { min: 60 } },
    good: { utility: { min: 60 }, savings: { min: 5 }, balance: { min: 40 } },
    passing: { utility: { min: 40 }, balance: { min: 30 } },
  },
  
  endings: {
    excellent: {
      title: 'Utility Maximizer!',
      description: 'You\'ve mastered the art of getting the most satisfaction from every dollar. Your budget is optimized, your savings are growing, and your life is balanced.',
      philMessage: 'You\'re a utility-maximizing machine! You understand that happiness isn\'t about spending more - it\'s about spending SMART. Equalizing marginal utility per dollar is the key to consumer bliss!',
    },
    good: {
      title: 'Smart Spender',
      description: 'You make thoughtful spending decisions and understand the basics of utility maximization. Your budget works well for you.',
      philMessage: 'Nice work! You\'ve got good instincts for utility. Remember: always ask "what\'s the marginal utility per dollar?" before spending. That question will serve you well!',
    },
    passing: {
      title: 'Budget Aware',
      description: 'You understand that resources are limited and choices matter. With more practice, you\'ll become a utility maximization pro.',
      philMessage: 'You\'re on the right track! The key insight is diminishing marginal utility - the 10th dollar on entertainment gives less joy than the 1st. Spread your spending around!',
    },
    needsWork: {
      title: 'Keep Optimizing!',
      description: 'Budgeting is hard! Review the concepts of marginal utility and the utility maximization rule, then try again.',
      philMessage: 'Don\'t worry - even economists struggle with their own budgets! The key is: spend each dollar where it gives you the most happiness. That\'s utility maximization in a nutshell!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
