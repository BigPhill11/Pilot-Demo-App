/**
 * Market Failures: Policy Workshop
 * 
 * Unit 5 Microeconomics - Students act as policy makers addressing
 * externalities, public goods, and other market failures.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro5PolicySim: SimulatorConfig = {
  id: 'micro-5-policy-sim',
  unitId: 'micro-5-market-failures',
  title: 'Policy Workshop',
  subtitle: 'Fix Market Failures',
  description: 'Markets are amazing, but they\'re not perfect. As a policy advisor, you\'ll tackle externalities, public goods, and other market failures. Can you improve on the free market?',
  icon: '🏛️',
  theme: {
    primary: 'slate',
    secondary: 'gray',
    accent: 'zinc',
  },
  
  introNarrative: "Welcome to the Policy Workshop! You've been appointed as an economic advisor to the city. Markets usually work well, but sometimes they fail. Pollution, public parks, and information problems all need your attention. Your job: design policies that make everyone better off.",
  philIntro: "Markets are my favorite! But even I admit they're not perfect. When there are externalities (costs or benefits that spill over to others), public goods (things everyone can use), or information problems, markets can fail. That's when smart policy can help!",
  
  initialMeters: [
    { id: 'efficiency', label: 'Economic Efficiency', value: 50, min: 0, max: 100, unit: '%', color: 'green', icon: '⚡' },
    { id: 'equity', label: 'Social Equity', value: 50, min: 0, max: 100, unit: '%', color: 'blue', icon: '⚖️' },
    { id: 'environment', label: 'Environmental Health', value: 50, min: 0, max: 100, unit: '%', color: 'emerald', icon: '🌿' },
    { id: 'budget', label: 'Budget Balance', value: 50, min: 0, max: 100, unit: '%', color: 'amber', icon: '💰' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Negative Externalities',
      narrative: "A factory is polluting the river. The factory profits, but downstream residents suffer health problems and fishermen lose their catch. The market isn't accounting for these external costs. What's your policy?",
      decisions: [
        {
          id: 'r1-d1',
          title: 'The Pollution Problem',
          scenario: "The factory produces $10M in value but causes $4M in damages to others. The market says 'keep producing' but society says 'that's not efficient!' How do you fix this?",
          context: 'The social cost ($14M) exceeds the private cost ($10M). The market overproduces pollution.',
          options: [
            {
              id: 'tax',
              label: 'Pigouvian Tax ($4M)',
              description: 'Tax the factory equal to the external damage it causes.',
              meterChanges: { efficiency: 15, environment: 20, budget: 10 },
              feedback: 'Perfect! The tax makes the factory internalize the external cost. Now it only produces if benefits exceed ALL costs.',
              philInsight: 'A Pigouvian tax equals the marginal external cost. It makes private costs = social costs, restoring efficiency!',
            },
            {
              id: 'regulate',
              label: 'Command and Control',
              description: 'Set strict pollution limits by law.',
              meterChanges: { efficiency: 5, environment: 25, budget: -5 },
              feedback: 'Pollution drops, but the regulation might be too strict or too lenient. Hard to get the level right.',
              philInsight: 'Regulations work but don\'t use price signals. The government has to guess the right pollution level.',
            },
            {
              id: 'cap-trade',
              label: 'Cap and Trade',
              description: 'Set a pollution cap and let firms trade permits.',
              meterChanges: { efficiency: 20, environment: 15, budget: 5 },
              feedback: 'Efficient! Firms that can reduce pollution cheaply do so, selling permits to those who can\'t.',
              philInsight: 'Cap and trade combines the certainty of regulation with the efficiency of markets. Best of both worlds!',
            },
          ],
          conceptConnection: 'Negative externalities cause markets to overproduce. Taxes or cap-and-trade can internalize external costs.',
        },
        {
          id: 'r1-d2',
          title: 'The Coase Alternative',
          scenario: "A neighbor complains: 'The factory should pay for my damages!' The factory replies: 'You should pay ME to reduce pollution!' Who's right?",
          options: [
            {
              id: 'coase',
              label: 'Let Them Negotiate',
              description: 'If property rights are clear, they can bargain to an efficient outcome.',
              meterChanges: { efficiency: 15, budget: 5 },
              feedback: 'The Coase Theorem! If transaction costs are low and rights are clear, private bargaining can solve externalities.',
              philInsight: 'Coase showed that WHO has the right doesn\'t matter for efficiency - just that SOMEONE does. Then they can bargain!',
            },
            {
              id: 'victim-rights',
              label: 'Residents Have the Right',
              description: 'Factory must pay residents for permission to pollute.',
              meterChanges: { efficiency: 10, equity: 15, environment: 10 },
              feedback: 'Factory pays residents, who accept if payment exceeds damages. Fair and potentially efficient.',
              philInsight: 'Assigning rights to victims feels fair. The factory only pollutes if it can compensate those harmed.',
            },
            {
              id: 'factory-rights',
              label: 'Factory Has the Right',
              description: 'Residents must pay factory to reduce pollution.',
              meterChanges: { efficiency: 10, equity: -10, environment: 5 },
              feedback: 'Economically efficient but feels unfair. Why should victims pay polluters?',
              philInsight: 'Coase says this is equally efficient, but equity matters too! Distribution of rights affects who bears costs.',
            },
          ],
          conceptConnection: 'The Coase Theorem: with clear property rights and low transaction costs, private bargaining can solve externalities.',
        },
      ],
      roundSummary: 'Negative externalities mean markets overproduce harmful activities. Pigouvian taxes, cap-and-trade, or Coasian bargaining can restore efficiency.',
    },
    {
      roundNumber: 2,
      title: 'Public Goods',
      narrative: "The city needs a new public park. Everyone would benefit, but no one wants to pay - they hope others will fund it. This is the free-rider problem. How do you provide public goods?",
      decisions: [
        {
          id: 'r2-d1',
          title: 'The Park Problem',
          scenario: "A park would provide $5M in benefits to residents, but it costs $3M to build. Private developers won't build it because they can't charge admission (non-excludable). What's your solution?",
          context: 'Public goods are non-rival (my use doesn\'t reduce yours) and non-excludable (can\'t prevent free riders).',
          options: [
            {
              id: 'government',
              label: 'Government Provision',
              description: 'Tax everyone and build the park publicly.',
              meterChanges: { efficiency: 15, equity: 10, budget: -15 },
              feedback: 'Classic solution! Government can overcome the free-rider problem through taxation.',
              philInsight: 'Public goods are a market failure because private markets underprovide them. Government steps in!',
            },
            {
              id: 'private',
              label: 'Private Donation Campaign',
              description: 'Ask for voluntary contributions.',
              meterChanges: { efficiency: 5, budget: 5 },
              feedback: 'Some people donate, but most free-ride. You only raised $1M - not enough.',
              philInsight: 'Voluntary provision of public goods fails because of free-riding. Everyone waits for others to pay.',
            },
            {
              id: 'hybrid',
              label: 'Public-Private Partnership',
              description: 'Government pays half, private sponsors pay half for naming rights.',
              meterChanges: { efficiency: 12, equity: 5, budget: -8 },
              feedback: 'Creative! You reduced the tax burden while still providing the public good.',
              philInsight: 'Hybrid models can work when you find ways to make public goods partially excludable or tie them to private benefits.',
            },
          ],
          conceptConnection: 'Public goods are non-rival and non-excludable. Markets underprovide them due to free-riding.',
        },
        {
          id: 'r2-d2',
          title: 'The Tragedy of the Commons',
          scenario: "The city lake is being overfished. It's a common resource - rival (fish I catch, you can't) but non-excludable (anyone can fish). Fishermen are depleting the stock.",
          options: [
            {
              id: 'privatize',
              label: 'Privatize the Lake',
              description: 'Sell fishing rights to one owner who will manage sustainably.',
              meterChanges: { efficiency: 15, equity: -10, environment: 15 },
              feedback: 'The owner has incentive to maintain fish stocks. Efficient but raises equity concerns.',
              philInsight: 'Private ownership solves the commons problem by giving someone incentive to conserve. But is it fair?',
            },
            {
              id: 'regulate',
              label: 'Fishing Licenses & Quotas',
              description: 'Government limits who can fish and how much.',
              meterChanges: { efficiency: 10, equity: 5, environment: 20, budget: -5 },
              feedback: 'Fish stocks recover! But enforcement is costly and some fishermen lose access.',
              philInsight: 'Regulation can prevent the tragedy of the commons, but requires monitoring and enforcement.',
            },
            {
              id: 'community',
              label: 'Community Management',
              description: 'Let local fishermen create and enforce their own rules.',
              meterChanges: { efficiency: 12, equity: 10, environment: 15 },
              feedback: 'Elinor Ostrom showed this can work! Communities often manage commons better than governments or markets.',
              philInsight: 'Ostrom won the Nobel Prize showing that communities can solve commons problems through self-governance!',
            },
          ],
          conceptConnection: 'Common resources are rival but non-excludable. Without management, they get overused (tragedy of the commons).',
        },
      ],
      roundSummary: 'Public goods need government provision. Common resources need management to prevent overuse. Markets alone can\'t solve these problems.',
    },
    {
      roundNumber: 3,
      title: 'Information & Equity',
      narrative: "Final challenges: information asymmetries and inequality. When buyers and sellers have different information, or when markets produce unfair outcomes, what can policy do?",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Lemon Problem',
          scenario: "Used car buyers can't tell good cars from 'lemons.' Sellers know, but won't reveal bad news. Result: buyers assume the worst and offer low prices, driving good cars out of the market.",
          options: [
            {
              id: 'disclosure',
              label: 'Mandatory Disclosure Laws',
              description: 'Require sellers to reveal known defects.',
              meterChanges: { efficiency: 15, equity: 10 },
              feedback: 'Information flows! Buyers can now distinguish good cars from lemons. Market works better.',
              philInsight: 'Disclosure requirements reduce information asymmetry. When buyers know more, markets function better!',
            },
            {
              id: 'warranty',
              label: 'Require Warranties',
              description: 'Sellers must guarantee their cars for 30 days.',
              meterChanges: { efficiency: 12, equity: 15, budget: -5 },
              feedback: 'Warranties signal quality! Sellers of good cars offer them willingly; lemon sellers can\'t afford to.',
              philInsight: 'Warranties are a signaling mechanism. They help solve adverse selection by letting good sellers prove quality.',
            },
            {
              id: 'certification',
              label: 'Third-Party Certification',
              description: 'Create a certified pre-owned program with inspections.',
              meterChanges: { efficiency: 18, equity: 5, budget: -3 },
              feedback: 'Inspections reveal information! Certified cars command higher prices, rewarding quality.',
              philInsight: 'Third-party verification solves information problems. It\'s why we have restaurant health grades and financial audits!',
            },
          ],
          conceptConnection: 'Information asymmetry causes adverse selection. Disclosure, warranties, and certification can restore market function.',
        },
        {
          id: 'r3-d2',
          title: 'Equity vs. Efficiency',
          scenario: "The market is efficient but unequal. Some people can't afford healthcare, education, or housing. Markets don't care about fairness. Should policy intervene?",
          options: [
            {
              id: 'redistribute',
              label: 'Tax and Transfer',
              description: 'Tax the wealthy, provide services to the poor.',
              meterChanges: { efficiency: -10, equity: 25, budget: -10 },
              feedback: 'More equal outcomes, but taxes create some inefficiency (deadweight loss). The classic trade-off.',
              philInsight: 'There\'s often a trade-off between efficiency and equity. Society must choose how much inefficiency it accepts for fairness.',
            },
            {
              id: 'in-kind',
              label: 'Provide In-Kind Benefits',
              description: 'Give healthcare, education, housing directly instead of cash.',
              meterChanges: { efficiency: -5, equity: 20, budget: -15 },
              feedback: 'Ensures the poor get essential services, but limits their choices.',
              philInsight: 'In-kind benefits are paternalistic but ensure resources go to intended uses. Cash gives more freedom but less control.',
            },
            {
              id: 'market',
              label: 'Trust the Market',
              description: 'Inequality is the price of efficiency. Don\'t intervene.',
              meterChanges: { efficiency: 5, equity: -15 },
              feedback: 'Maximum efficiency, but growing inequality may cause social problems.',
              philInsight: 'Pure market outcomes maximize efficiency but not equity. Most societies choose some redistribution.',
            },
          ],
          conceptConnection: 'Markets maximize efficiency but not equity. Policy can redistribute, but often at some efficiency cost.',
        },
      ],
      roundSummary: 'Information problems and inequality are market failures too. Good policy can improve outcomes, but there are always trade-offs.',
    },
  ],
  
  completionThresholds: {
    excellent: { efficiency: { min: 70 }, equity: { min: 60 }, environment: { min: 60 } },
    good: { efficiency: { min: 55 }, equity: { min: 50 }, environment: { min: 50 } },
    passing: { efficiency: { min: 40 }, equity: { min: 40 } },
  },
  
  endings: {
    excellent: {
      title: 'Policy Virtuoso!',
      description: 'You\'ve mastered the art of fixing market failures! You understand when markets work, when they fail, and how smart policy can improve outcomes.',
      philMessage: 'Wow! You balanced efficiency, equity, and environmental health like a pro! You understand that markets are powerful but imperfect, and that good policy can make everyone better off. That\'s the essence of welfare economics!',
    },
    good: {
      title: 'Effective Advisor',
      description: 'You successfully addressed several market failures. You understand the tools available and the trade-offs involved in policy design.',
      philMessage: 'Great work! You\'ve learned that externalities, public goods, and information problems all require different solutions. The key is matching the policy tool to the problem!',
    },
    passing: {
      title: 'Policy Apprentice',
      description: 'You\'ve been introduced to market failures and policy responses. With more practice, you\'ll develop stronger intuition for policy design.',
      philMessage: 'Good start! Remember: negative externalities = tax or cap-and-trade. Public goods = government provision. Information problems = disclosure requirements. Keep practicing!',
    },
    needsWork: {
      title: 'Keep Studying!',
      description: 'Market failures and policy are complex topics. Review the different types of failures and the tools to address them, then try again.',
      philMessage: 'Don\'t give up! The key insight is that markets fail when prices don\'t reflect all costs and benefits. Policy can fix this by changing incentives. Try again!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
