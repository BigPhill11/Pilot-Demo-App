/**
 * Elasticity: Price Sensitivity Lab
 * 
 * Unit 2 Microeconomics - Students manage a subscription service and learn
 * how price elasticity affects revenue decisions.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro2ElasticitySim: SimulatorConfig = {
  id: 'micro-2-elasticity-sim',
  unitId: 'micro-2-elasticity',
  title: 'Price Sensitivity Lab',
  subtitle: 'Master the Art of Pricing',
  description: 'Run a streaming service and discover how sensitive customers are to price changes. Learn when raising prices helps and when it hurts your bottom line.',
  icon: '📊',
  theme: {
    primary: 'blue',
    secondary: 'indigo',
    accent: 'violet',
  },
  
  introNarrative: "Welcome to StreamPanda, your new streaming service! You've got great content, but pricing is tricky. Some customers will pay almost anything for their favorite shows, while others will cancel over a dollar increase. Your job is to understand price sensitivity and maximize revenue.",
  philIntro: "Elasticity is one of my favorite topics! It's all about how stretchy demand is when you pull on the price. Some products are like rubber bands - very stretchy. Others are like bamboo - not stretchy at all. Let's find out which is which!",
  
  initialMeters: [
    { id: 'subscribers', label: 'Subscribers', value: 100000, min: 0, max: 200000, unit: 'K', color: 'blue', icon: '👥' },
    { id: 'price', label: 'Monthly Price', value: 12, min: 5, max: 25, unit: '$', color: 'green', icon: '💵' },
    { id: 'revenue', label: 'Monthly Revenue', value: 1200, min: 0, max: 3000, unit: 'K', color: 'purple', icon: '📈' },
    { id: 'satisfaction', label: 'Customer Satisfaction', value: 75, min: 0, max: 100, unit: '%', color: 'amber', icon: '⭐' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Understanding Elasticity',
      narrative: "Your first quarter as pricing manager! You need to understand how your different customer segments respond to price changes. Some are price-sensitive, others aren't.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'The Price Increase Test',
          scenario: "The board wants more revenue. You're considering a $2 price increase from $12 to $14. Your analysts estimate you'll lose about 15% of subscribers. Should you do it?",
          context: 'Calculate: If you lose 15% of 100K subscribers but charge $2 more, what happens to revenue?',
          options: [
            {
              id: 'increase',
              label: 'Raise Price to $14',
              description: 'Accept some subscriber loss for higher per-user revenue.',
              meterChanges: { price: 2, subscribers: -15000, revenue: 190, satisfaction: -10 },
              feedback: 'Revenue increased! You lost subscribers but each remaining one pays more. The math worked out.',
              philInsight: 'This is inelastic demand! When a 17% price increase only causes 15% subscriber loss, total revenue goes UP. The elasticity is less than 1.',
            },
            {
              id: 'small-increase',
              label: 'Smaller Increase to $13',
              description: 'Test with a smaller change to minimize risk.',
              meterChanges: { price: 1, subscribers: -7000, revenue: 86, satisfaction: -5 },
              feedback: 'A cautious approach. Revenue still increased, and you kept more subscribers.',
              philInsight: 'Smart testing! You\'re learning that your demand is relatively inelastic - people really value your content.',
            },
            {
              id: 'no-change',
              label: 'Keep Price at $12',
              description: 'Don\'t risk losing subscribers.',
              meterChanges: { satisfaction: 5 },
              feedback: 'Subscribers are happy, but you missed a revenue opportunity.',
              philInsight: 'Sometimes no change is the right call, but you won\'t know your elasticity without testing!',
            },
          ],
          conceptConnection: 'Price elasticity of demand measures how much quantity demanded changes when price changes.',
        },
        {
          id: 'r1-d2',
          title: 'The Competitor\'s Move',
          scenario: "A competitor just dropped their price from $15 to $10. Your subscribers are noticing. How elastic is your demand to competitor pricing?",
          options: [
            {
              id: 'match',
              label: 'Match Their Price ($10)',
              description: 'Cut your price to stay competitive.',
              meterChanges: { price: -2, subscribers: 10000, revenue: -100, satisfaction: 10 },
              feedback: 'You kept subscribers but revenue dropped significantly. Was it worth it?',
              philInsight: 'If demand is elastic to competitor prices, you might need to match. But consider: are you competing on price or value?',
            },
            {
              id: 'add-value',
              label: 'Add Value Instead',
              description: 'Keep price but add exclusive content.',
              meterChanges: { subscribers: -5000, revenue: -60, satisfaction: 15 },
              feedback: 'Some price-sensitive customers left, but loyal fans appreciate the new content.',
              philInsight: 'Differentiation reduces cross-price elasticity! When your product is unique, competitor prices matter less.',
            },
            {
              id: 'segment',
              label: 'Create a Budget Tier ($8)',
              description: 'Offer a cheaper option with fewer features.',
              meterChanges: { subscribers: 15000, revenue: 50, satisfaction: 5 },
              feedback: 'You captured price-sensitive customers without lowering prices for everyone!',
              philInsight: 'Price discrimination! Different customers have different elasticities. Tiered pricing captures more consumer surplus.',
            },
          ],
          conceptConnection: 'Cross-price elasticity measures how demand for your product responds to changes in competitor prices.',
        },
      ],
      roundSummary: 'You\'ve learned that elasticity varies by product and customer segment. When demand is inelastic, raising prices increases revenue. When it\'s elastic, the opposite is true.',
    },
    {
      roundNumber: 2,
      title: 'Elasticity Factors',
      narrative: "Now you understand the basics. Let's explore what makes demand more or less elastic. Necessities vs. luxuries, substitutes, and time all play a role.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'The Necessity Test',
          scenario: "You're launching two new add-ons: 1) Live sports (fans NEED it) and 2) Cooking shows (nice to have). How should you price each?",
          options: [
            {
              id: 'sports-premium',
              label: 'Sports Premium, Cooking Budget',
              description: 'Sports at $8/mo, Cooking at $3/mo.',
              meterChanges: { subscribers: 8000, revenue: 120, satisfaction: 5 },
              feedback: 'Perfect! Sports fans pay the premium because they have no substitute. Cooking fans are more price-sensitive.',
              philInsight: 'Necessities have inelastic demand, luxuries have elastic demand. You priced accordingly!',
            },
            {
              id: 'same-price',
              label: 'Same Price for Both ($5/mo)',
              description: 'Keep it simple with uniform pricing.',
              meterChanges: { subscribers: 5000, revenue: 60, satisfaction: 0 },
              feedback: 'You\'re leaving money on the table with sports and overcharging for cooking.',
              philInsight: 'One-size-fits-all pricing ignores elasticity differences. You could do better!',
            },
            {
              id: 'cooking-premium',
              label: 'Cooking Premium, Sports Budget',
              description: 'Cooking at $8/mo, Sports at $3/mo.',
              meterChanges: { subscribers: 2000, revenue: 20, satisfaction: -10 },
              feedback: 'Oops! Cooking fans have many alternatives (YouTube, etc.) and won\'t pay premium. Sports fans would have paid more.',
              philInsight: 'You got the elasticities backwards! More substitutes = more elastic demand.',
            },
          ],
          conceptConnection: 'Products with fewer substitutes have more inelastic demand and can command higher prices.',
        },
        {
          id: 'r2-d2',
          title: 'The Time Factor',
          scenario: "You announced a price increase from $14 to $18 starting next month. How will subscriber response change over time?",
          options: [
            {
              id: 'immediate',
              label: 'Expect Immediate Mass Exodus',
              description: 'Prepare for 30% subscriber loss right away.',
              meterChanges: { subscribers: -10000, revenue: -20, satisfaction: -15 },
              feedback: 'You overestimated short-term elasticity. People don\'t cancel immediately - they\'re locked into habits.',
              philInsight: 'Demand is more inelastic in the short run! People need time to find alternatives and change habits.',
            },
            {
              id: 'gradual',
              label: 'Expect Gradual Decline',
              description: 'Plan for 10% loss now, more over 6 months.',
              meterChanges: { subscribers: -5000, revenue: 100, satisfaction: -10 },
              feedback: 'Correct! Short-term elasticity is low, but it increases over time as people find alternatives.',
              philInsight: 'Time is a key elasticity factor! In the long run, demand becomes more elastic as substitutes emerge.',
            },
            {
              id: 'none',
              label: 'Expect Minimal Impact',
              description: 'Our content is too good - nobody will leave.',
              meterChanges: { subscribers: -15000, revenue: 30, satisfaction: -20 },
              feedback: 'You underestimated long-term elasticity. Over time, even loyal customers found alternatives.',
              philInsight: 'Never assume demand is perfectly inelastic! Given enough time, consumers always find substitutes.',
            },
          ],
          conceptConnection: 'Demand becomes more elastic over time as consumers have more opportunity to find substitutes.',
        },
      ],
      roundSummary: 'Key elasticity factors: substitutes (more = more elastic), necessity vs. luxury, and time horizon. Use these to predict customer responses!',
    },
    {
      roundNumber: 3,
      title: 'Revenue Optimization',
      narrative: "Final quarter! Time to apply everything you've learned about elasticity to maximize revenue. Remember: it's not about the highest price, it's about the optimal price.",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Total Revenue Test',
          scenario: "Your data shows: At $10, you'd have 150K subscribers. At $15, you'd have 90K. At $20, you'd have 50K. Which maximizes revenue?",
          context: 'Revenue = Price × Quantity. Calculate each scenario.',
          options: [
            {
              id: 'low',
              label: 'Price at $10 (150K × $10 = $1.5M)',
              description: 'Maximize subscribers with low price.',
              meterChanges: { price: -4, subscribers: 50000, revenue: 300, satisfaction: 15 },
              feedback: 'High volume but you\'re not capturing the value customers would pay.',
              philInsight: 'At $10, demand is elastic - you could raise prices and still keep most subscribers!',
            },
            {
              id: 'mid',
              label: 'Price at $15 (90K × $15 = $1.35M)',
              description: 'Balance price and volume.',
              meterChanges: { price: 1, subscribers: -10000, revenue: 150, satisfaction: 0 },
              feedback: 'Good balance! You\'re close to the revenue-maximizing point.',
              philInsight: 'This is near the unit elastic point where % price change = % quantity change. Revenue is maximized!',
            },
            {
              id: 'high',
              label: 'Price at $20 (50K × $20 = $1.0M)',
              description: 'Maximize per-subscriber revenue.',
              meterChanges: { price: 6, subscribers: -50000, revenue: -200, satisfaction: -20 },
              feedback: 'Too high! You lost too many subscribers. Revenue actually decreased.',
              philInsight: 'At $20, demand is elastic - the subscriber loss outweighs the price gain. Revenue falls!',
            },
          ],
          conceptConnection: 'The Total Revenue Test: If demand is elastic, lowering price increases revenue. If inelastic, raising price increases revenue.',
        },
        {
          id: 'r3-d2',
          title: 'Dynamic Pricing Strategy',
          scenario: "You can now implement smart pricing. How will you use your elasticity knowledge going forward?",
          options: [
            {
              id: 'segment',
              label: 'Segment-Based Pricing',
              description: 'Different prices for students, families, and individuals based on their elasticity.',
              meterChanges: { subscribers: 20000, revenue: 200, satisfaction: 10 },
              feedback: 'Excellent! You\'re capturing value from inelastic segments while keeping elastic ones.',
              philInsight: 'Price discrimination based on elasticity is how airlines, movie theaters, and streaming services maximize revenue!',
            },
            {
              id: 'dynamic',
              label: 'Time-Based Pricing',
              description: 'Lower prices for new subscribers, gradually increase for loyal ones.',
              meterChanges: { subscribers: 15000, revenue: 150, satisfaction: 5 },
              feedback: 'Smart! New customers are elastic (many choices), loyal ones are inelastic (switching costs).',
              philInsight: 'Introductory pricing exploits the fact that elasticity changes over the customer lifecycle!',
            },
            {
              id: 'uniform',
              label: 'Keep Uniform Pricing',
              description: 'One price for everyone - simple and fair.',
              meterChanges: { subscribers: 5000, revenue: 50, satisfaction: 15 },
              feedback: 'Customers appreciate the simplicity, but you\'re leaving significant revenue on the table.',
              philInsight: 'Uniform pricing is fair but ignores elasticity differences. There\'s a trade-off between simplicity and optimization.',
            },
          ],
          conceptConnection: 'Understanding elasticity enables price discrimination strategies that capture more consumer surplus.',
        },
      ],
      roundSummary: 'You\'ve mastered elasticity! Remember: elastic demand means price cuts increase revenue, inelastic means price increases do. The sweet spot is where elasticity equals 1.',
    },
  ],
  
  completionThresholds: {
    excellent: { revenue: { min: 1800 }, subscribers: { min: 100000 } },
    good: { revenue: { min: 1500 }, subscribers: { min: 80000 } },
    passing: { revenue: { min: 1200 }, subscribers: { min: 60000 } },
  },
  
  endings: {
    excellent: {
      title: 'Elasticity Expert!',
      description: 'You\'ve mastered the art of pricing! You understand how to measure and use elasticity to optimize revenue while keeping customers satisfied.',
      philMessage: 'Incredible work! You stretched your understanding of elasticity to the max! You now know that the key to pricing isn\'t just "charge more" or "charge less" - it\'s understanding how sensitive your customers are. That\'s bamboo-level wisdom!',
    },
    good: {
      title: 'Pricing Pro',
      description: 'You\'ve developed solid intuition for price elasticity. You can predict how customers will respond to price changes and make smart decisions.',
      philMessage: 'Great job! You\'ve got a good grip on elasticity. Remember the Total Revenue Test: if demand is elastic, lower prices boost revenue. If inelastic, raise them. Keep practicing!',
    },
    passing: {
      title: 'Getting Flexible',
      description: 'You understand the basics of elasticity but could benefit from more practice applying the concepts to real pricing decisions.',
      philMessage: 'You\'re bending in the right direction! Elasticity takes practice to master. The key formula: Elasticity = % change in quantity / % change in price. When it\'s greater than 1, demand is elastic!',
    },
    needsWork: {
      title: 'Keep Stretching!',
      description: 'Elasticity is a tricky concept. Review the relationship between price changes, quantity changes, and total revenue, then try again.',
      philMessage: 'Don\'t snap under pressure! Elasticity is one of the most useful concepts in economics. Remember: elastic = sensitive to price, inelastic = not sensitive. Try the simulation again!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
