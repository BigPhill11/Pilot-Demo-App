/**
 * Market Structures: Competition Arena
 * 
 * Unit 4 Microeconomics - Students experience different market structures
 * from perfect competition to monopoly and see how each affects pricing and innovation.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro4MarketPowerSim: SimulatorConfig = {
  id: 'micro-4-market-power-sim',
  unitId: 'micro-4-market-structures',
  title: 'Competition Arena',
  subtitle: 'Navigate Different Market Structures',
  description: 'Experience running a business in different market structures. See how competition (or lack of it) affects your pricing power, profits, and incentives to innovate.',
  icon: '🏟️',
  theme: {
    primary: 'violet',
    secondary: 'purple',
    accent: 'fuchsia',
  },
  
  introNarrative: "Welcome to the Competition Arena! You'll run the same business - a smartphone company - in four different market structures. Watch how your pricing power, profits, and strategies change dramatically based on how many competitors you face.",
  philIntro: "Market structure is like the rules of the game! In perfect competition, you're one of thousands - a price taker. As a monopolist, you're the only player - a price maker. Let's see how the game changes with different rules!",
  
  initialMeters: [
    { id: 'price', label: 'Your Price', value: 500, min: 200, max: 1000, unit: '$', color: 'green', icon: '💵' },
    { id: 'marketShare', label: 'Market Share', value: 25, min: 0, max: 100, unit: '%', color: 'blue', icon: '📊' },
    { id: 'profit', label: 'Profit Margin', value: 10, min: -20, max: 50, unit: '%', color: 'purple', icon: '📈' },
    { id: 'innovation', label: 'Innovation Level', value: 50, min: 0, max: 100, unit: 'pts', color: 'amber', icon: '💡' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Perfect Competition',
      narrative: "Round 1: You're selling generic smartphones in a market with thousands of identical competitors. Your product is exactly the same as everyone else's. What's your pricing power?",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Setting Your Price',
          scenario: "The market price for generic smartphones is $400. You can try to charge more, less, or match the market. What's your strategy?",
          context: 'In perfect competition, all products are identical and buyers have perfect information.',
          options: [
            {
              id: 'match',
              label: 'Match Market Price ($400)',
              description: 'Charge exactly what everyone else charges.',
              meterChanges: { price: -100, marketShare: 0, profit: 5 },
              feedback: 'Correct! In perfect competition, you\'re a price taker. Charging the market price is your only viable option.',
              philInsight: 'In perfect competition, the market sets the price. You just decide how much to produce. That\'s being a "price taker"!',
            },
            {
              id: 'higher',
              label: 'Charge Premium ($450)',
              description: 'Your phones are worth more... right?',
              meterChanges: { price: -50, marketShare: -25, profit: -15 },
              feedback: 'Disaster! With identical products, NO ONE buys from you at a higher price. You lose all customers.',
              philInsight: 'In perfect competition, charging above market price = zero sales. Products are identical, so why would anyone pay more?',
            },
            {
              id: 'lower',
              label: 'Undercut ($350)',
              description: 'Steal customers with lower prices.',
              meterChanges: { price: -150, marketShare: 10, profit: -10 },
              feedback: 'You got more customers but you\'re losing money on each sale. This isn\'t sustainable.',
              philInsight: 'Undercutting in perfect competition just means losing money. The market price already equals marginal cost!',
            },
          ],
          conceptConnection: 'In perfect competition, firms are price takers. They cannot influence the market price and must accept it as given.',
        },
        {
          id: 'r1-d2',
          title: 'Long-Run Adjustment',
          scenario: "Good news: you found a way to cut costs by $50 per phone! Bad news: so did everyone else. What happens to the market price?",
          options: [
            {
              id: 'price-falls',
              label: 'Price Falls to New Cost Level',
              description: 'Competition drives prices down to match lower costs.',
              meterChanges: { price: -50, profit: 0 },
              feedback: 'Exactly! In perfect competition, cost savings get passed to consumers. Economic profit returns to zero.',
              philInsight: 'This is the beauty and curse of perfect competition: efficiency for consumers, zero economic profit for firms in the long run.',
            },
            {
              id: 'keep-profit',
              label: 'Keep the Extra Profit',
              description: 'Don\'t lower prices - enjoy the margin!',
              meterChanges: { marketShare: -20, profit: -5 },
              feedback: 'You tried, but competitors lowered their prices. Customers left for cheaper options.',
              philInsight: 'In perfect competition, you can\'t keep above-normal profits. New entrants and competition erode them away.',
            },
            {
              id: 'innovate',
              label: 'Invest in Differentiation',
              description: 'Use savings to make your product unique.',
              meterChanges: { innovation: 20, profit: 5 },
              feedback: 'Smart thinking! But this moves you toward monopolistic competition, not perfect competition.',
              philInsight: 'Differentiation is how firms escape perfect competition! Make your product unique, gain some pricing power.',
            },
          ],
          conceptConnection: 'In perfect competition, long-run economic profit is zero. Cost reductions benefit consumers through lower prices.',
        },
      ],
      roundSummary: 'Perfect competition: Many firms, identical products, zero economic profit in the long run. Great for consumers, tough for businesses!',
    },
    {
      roundNumber: 2,
      title: 'Monopolistic Competition',
      narrative: "Round 2: Now you sell differentiated smartphones. Your brand has unique features, but there are still many competitors with similar (not identical) products. You have SOME pricing power.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Brand Differentiation',
          scenario: "Your phone has a unique camera system. Competitors have similar phones but not identical. How do you price your differentiated product?",
          options: [
            {
              id: 'premium',
              label: 'Charge Premium ($550)',
              description: 'Your unique features justify a higher price.',
              meterChanges: { price: 50, marketShare: -5, profit: 15, innovation: 10 },
              feedback: 'It works! Some customers pay more for your unique features. You have pricing power!',
              philInsight: 'Differentiation gives you a mini-monopoly over customers who love YOUR specific features. That\'s pricing power!',
            },
            {
              id: 'match',
              label: 'Match Average Price ($500)',
              description: 'Stay competitive while highlighting differences.',
              meterChanges: { marketShare: 5, profit: 10 },
              feedback: 'Solid strategy. You attract customers with value: good features at a fair price.',
              philInsight: 'Even with differentiation, you face competition. Pricing at market average with better features wins customers.',
            },
            {
              id: 'undercut',
              label: 'Undercut Competitors ($450)',
              description: 'Better product at a lower price? Dominate!',
              meterChanges: { price: -50, marketShare: 15, profit: 5, innovation: -5 },
              feedback: 'You gained share but left money on the table. Your unique features were worth more!',
              philInsight: 'Underpricing a differentiated product wastes your competitive advantage. Capture the value you create!',
            },
          ],
          conceptConnection: 'Monopolistic competition: many firms with differentiated products. Each has some pricing power over loyal customers.',
        },
        {
          id: 'r2-d2',
          title: 'The Innovation Race',
          scenario: "Competitors are copying your camera features. In 6 months, your differentiation will erode. What's your strategy?",
          options: [
            {
              id: 'innovate',
              label: 'Continuous Innovation',
              description: 'Stay ahead with new features every cycle.',
              meterChanges: { innovation: 25, profit: 5, marketShare: 5 },
              feedback: 'The innovation treadmill! You maintain differentiation but it\'s expensive.',
              philInsight: 'In monopolistic competition, profits attract imitators. Continuous innovation is how you stay ahead!',
            },
            {
              id: 'brand',
              label: 'Build Brand Loyalty',
              description: 'Make customers love your brand, not just features.',
              meterChanges: { marketShare: 10, profit: 10, innovation: 5 },
              feedback: 'Smart! Brand loyalty is harder to copy than features. Customers stick with you.',
              philInsight: 'Brand loyalty is a form of differentiation that\'s hard to replicate. It\'s a sustainable competitive advantage!',
            },
            {
              id: 'price-war',
              label: 'Start a Price War',
              description: 'If you can\'t differentiate, compete on price.',
              meterChanges: { price: -100, marketShare: 10, profit: -10, innovation: -10 },
              feedback: 'You gained share but destroyed industry profits. Everyone loses in price wars.',
              philInsight: 'Price wars in monopolistic competition hurt everyone. Differentiation is a better strategy than racing to the bottom.',
            },
          ],
          conceptConnection: 'In monopolistic competition, firms must continuously innovate or build brand loyalty to maintain pricing power.',
        },
      ],
      roundSummary: 'Monopolistic competition: differentiated products give you some pricing power, but competition keeps profits moderate. Innovation is key!',
    },
    {
      roundNumber: 3,
      title: 'Oligopoly & Monopoly',
      narrative: "Final rounds: First, experience oligopoly (few large competitors) where your decisions affect rivals. Then, see what it's like to be a monopolist with total market power.",
      decisions: [
        {
          id: 'r3-d1',
          title: 'Oligopoly: Strategic Pricing',
          scenario: "There are only 3 smartphone makers now. If you cut prices, rivals will likely respond. If you raise prices, they might follow or steal your customers. What's your move?",
          options: [
            {
              id: 'collude',
              label: 'Signal High Prices',
              description: 'Publicly commit to premium pricing, hoping rivals follow.',
              meterChanges: { price: 100, profit: 20, marketShare: 0 },
              feedback: 'Rivals followed your lead! Industry profits are high, but this looks like tacit collusion...',
              philInsight: 'Oligopolies often reach high-price equilibria through tacit coordination. Good for firms, bad for consumers (and often illegal if explicit)!',
            },
            {
              id: 'compete',
              label: 'Compete Aggressively',
              description: 'Cut prices to steal market share from rivals.',
              meterChanges: { price: -100, marketShare: 15, profit: -15 },
              feedback: 'Rivals retaliated! A price war erupted. Everyone\'s profits collapsed.',
              philInsight: 'This is the oligopoly dilemma: aggressive competition hurts everyone, but cooperation is unstable (and often illegal).',
            },
            {
              id: 'differentiate',
              label: 'Focus on Differentiation',
              description: 'Compete on features, not price.',
              meterChanges: { innovation: 20, profit: 10, marketShare: 5 },
              feedback: 'Smart! Non-price competition lets everyone profit while still competing.',
              philInsight: 'Oligopolies often compete on advertising, features, and service rather than price. It\'s more sustainable!',
            },
          ],
          conceptConnection: 'Oligopoly: few firms, interdependent decisions. Each firm must consider how rivals will respond to its actions.',
        },
        {
          id: 'r3-d2',
          title: 'Monopoly: Ultimate Power',
          scenario: "Congratulations, you're now the ONLY smartphone maker! (Hypothetically.) You have complete pricing power. How do you use it?",
          options: [
            {
              id: 'maximize',
              label: 'Maximize Profit ($900)',
              description: 'Charge where MR = MC for maximum profit.',
              meterChanges: { price: 400, marketShare: 100, profit: 40, innovation: -10 },
              feedback: 'Huge profits! But consumers pay high prices and get less innovation. Classic monopoly outcome.',
              philInsight: 'Monopolists produce less and charge more than competitive markets. That\'s the deadweight loss of monopoly!',
            },
            {
              id: 'moderate',
              label: 'Moderate Pricing ($600)',
              description: 'Don\'t abuse your power - keep prices reasonable.',
              meterChanges: { price: 100, marketShare: 100, profit: 25, innovation: 5 },
              feedback: 'Lower profits than you could get, but you avoid regulatory attention and maintain goodwill.',
              philInsight: 'Some monopolists self-regulate to avoid government intervention. It\'s called "limit pricing."',
            },
            {
              id: 'innovate',
              label: 'Invest in Innovation ($500)',
              description: 'Use monopoly profits to fund R&D.',
              meterChanges: { marketShare: 100, profit: 15, innovation: 30 },
              feedback: 'You\'re using monopoly power for good! But is this sustainable without competition pushing you?',
              philInsight: 'The Schumpeterian argument: monopoly profits fund innovation. But without competition, is there enough incentive?',
            },
          ],
          conceptConnection: 'Monopoly: one firm, maximum pricing power. Produces less at higher prices than competitive markets.',
        },
      ],
      roundSummary: 'Market structure matters! From perfect competition (no power) to monopoly (total power), the rules of the game determine prices, profits, and innovation incentives.',
    },
  ],
  
  completionThresholds: {
    excellent: { profit: { min: 30 }, innovation: { min: 70 } },
    good: { profit: { min: 20 }, innovation: { min: 50 } },
    passing: { profit: { min: 10 }, innovation: { min: 30 } },
  },
  
  endings: {
    excellent: {
      title: 'Market Structure Master!',
      description: 'You navigated all four market structures brilliantly! You understand how competition affects pricing power, profits, and innovation incentives.',
      philMessage: 'Incredible! You\'ve seen how the same business behaves completely differently depending on market structure. Perfect competition = price taker, monopoly = price maker, and everything in between. This knowledge is power!',
    },
    good: {
      title: 'Competition Navigator',
      description: 'You successfully adapted your strategy to different market structures. You understand the key differences between competitive and concentrated markets.',
      philMessage: 'Great work! You\'ve learned that market structure isn\'t just theory - it determines real business strategy. More competition = less pricing power. Remember that!',
    },
    passing: {
      title: 'Structure Student',
      description: 'You\'ve experienced the four market structures and understand the basics. More practice will help you master the strategic implications.',
      philMessage: 'Good start! The key insight: your pricing power depends on how many competitors you have and how different your product is. Keep exploring!',
    },
    needsWork: {
      title: 'Keep Competing!',
      description: 'Market structures can be confusing. Review the characteristics of each structure and how they affect firm behavior, then try again.',
      philMessage: 'Don\'t give up! Remember: Perfect competition = many firms, identical products, zero profit. Monopoly = one firm, unique product, maximum profit. Everything else is in between!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
