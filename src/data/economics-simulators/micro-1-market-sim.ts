/**
 * Supply & Demand: Market Price Simulator
 * 
 * Unit 1 Microeconomics - Students run a lemonade stand and learn
 * how supply and demand interact to determine market prices.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro1MarketSim: SimulatorConfig = {
  id: 'micro-1-market-sim',
  unitId: 'micro-1-supply-demand',
  title: 'Market Price Simulator',
  subtitle: 'Run Your Own Lemonade Stand',
  description: 'Experience supply and demand firsthand by running a lemonade stand. Set prices, respond to market conditions, and watch how equilibrium emerges.',
  icon: '🍋',
  theme: {
    primary: 'amber',
    secondary: 'yellow',
    accent: 'orange',
  },
  
  introNarrative: "Welcome to Sunny Day Lemonade! You've just opened your very own lemonade stand in a busy neighborhood. Your goal is to find the perfect price that balances what customers want to pay with how much lemonade you can make. Let's discover how markets really work!",
  philIntro: "Hey there, future entrepreneur! I'm Phil, and I LOVE lemonade almost as much as I love bamboo! Today you'll learn the most important lesson in economics: how prices are set by the invisible hand of supply and demand. Ready to squeeze some profits?",
  
  initialMeters: [
    { id: 'price', label: 'Price per Cup', value: 2, min: 0.5, max: 5, unit: '$', color: 'green', icon: '💵' },
    { id: 'demand', label: 'Customer Demand', value: 50, min: 0, max: 100, unit: '%', color: 'blue', icon: '👥' },
    { id: 'supply', label: 'Your Supply', value: 50, min: 0, max: 100, unit: '%', color: 'amber', icon: '🍋' },
    { id: 'profit', label: 'Daily Profit', value: 25, min: -50, max: 100, unit: '$', color: 'purple', icon: '📈' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'Opening Day',
      narrative: "It's your first day! The weather is perfect, and neighbors are curious about your new stand. You need to set your initial price. Remember: too high and customers walk away, too low and you lose money!",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Set Your Opening Price',
          scenario: "You've calculated that each cup costs you $0.75 to make (lemons, sugar, cups). The stand across the street charges $2.50. What's your strategy?",
          context: 'Consider both your costs and what customers might be willing to pay.',
          options: [
            {
              id: 'undercut',
              label: 'Undercut the Competition ($1.50)',
              description: 'Price low to attract customers away from the competition.',
              meterChanges: { price: -0.5, demand: 25, supply: -10, profit: -5 },
              feedback: 'Customers flood in! But your profit margin is thin, and you\'re running low on supplies.',
              philInsight: 'Classic Law of Demand in action! Lower prices = more quantity demanded. But watch those costs!',
            },
            {
              id: 'match',
              label: 'Match the Market ($2.50)',
              description: 'Price at the going rate to compete on quality.',
              meterChanges: { price: 0.5, demand: 5, supply: 5, profit: 10 },
              feedback: 'Steady business! Customers compare quality, and some choose you. Sustainable profits.',
              philInsight: 'When prices are equal, other factors like quality and location matter. Smart equilibrium thinking!',
            },
            {
              id: 'premium',
              label: 'Go Premium ($3.50)',
              description: 'Price high and position as the "artisan" option.',
              meterChanges: { price: 1.5, demand: -15, supply: 15, profit: 5 },
              feedback: 'Fewer customers, but those who buy pay more. You have leftover lemonade.',
              philInsight: 'Higher prices reduce quantity demanded but increase profit per sale. It\'s all about the trade-off!',
            },
          ],
          conceptConnection: 'This demonstrates the Law of Demand: as price increases, quantity demanded decreases.',
        },
        {
          id: 'r1-d2',
          title: 'Unexpected Rush!',
          scenario: "Word spread about your stand! Suddenly there's a line of 20 people, but you only have supplies for 10 more cups. What do you do?",
          options: [
            {
              id: 'raise-price',
              label: 'Raise Prices',
              description: 'Increase price to $3.50 to manage the shortage.',
              meterChanges: { price: 1, demand: -20, profit: 15 },
              feedback: 'Some customers leave, but those who stay pay more. You sell out at higher margins!',
              philInsight: 'When demand exceeds supply, prices naturally rise. This is how markets self-correct!',
            },
            {
              id: 'first-come',
              label: 'First Come, First Served',
              description: 'Keep prices the same and serve until you run out.',
              meterChanges: { demand: 10, profit: 5 },
              feedback: 'Customers love the fair treatment, but some leave disappointed. Good reputation, missed revenue.',
              philInsight: 'Without price signals, you get shortages. The 10 who didn\'t get lemonade might value it more than some who did!',
            },
            {
              id: 'ration',
              label: 'Limit Purchases',
              description: 'One cup per customer to serve more people.',
              meterChanges: { demand: 5, supply: -5, profit: 8 },
              feedback: 'More people get lemonade, but some wanted to buy for their whole family.',
              philInsight: 'Rationing is another way to handle shortages, but it doesn\'t let prices do their job of allocating resources.',
            },
          ],
          conceptConnection: 'This shows how shortages occur when quantity demanded exceeds quantity supplied at the current price.',
        },
      ],
      roundSummary: 'Day 1 complete! You\'ve experienced how prices affect both buyers and sellers. The market is always searching for that sweet spot where supply meets demand.',
    },
    {
      roundNumber: 2,
      title: 'Market Shifts',
      narrative: "A week in, and things are changing! A heat wave is coming, and a new competitor just opened. How will you adapt to these market shifts?",
      decisions: [
        {
          id: 'r2-d1',
          title: 'Heat Wave Incoming!',
          scenario: "Weather forecasts predict 100°F temperatures this weekend. Everyone will want cold drinks! This will shift the entire demand curve to the right.",
          options: [
            {
              id: 'stock-up',
              label: 'Stock Up & Raise Prices',
              description: 'Buy extra supplies and increase prices for the weekend.',
              meterChanges: { price: 1, demand: 15, supply: 20, profit: 25 },
              feedback: 'Perfect timing! High demand meets ready supply. Your best weekend yet!',
              philInsight: 'When demand shifts right, the new equilibrium has both higher price AND higher quantity. You captured that!',
            },
            {
              id: 'same-price',
              label: 'Keep Prices, Increase Supply',
              description: 'Stock up but maintain current prices.',
              meterChanges: { demand: 25, supply: 15, profit: 15 },
              feedback: 'Customers love you! Long lines, but you could have earned more.',
              philInsight: 'You left money on the table! When demand shifts right, the market equilibrium price rises naturally.',
            },
            {
              id: 'unprepared',
              label: 'Business as Usual',
              description: 'Don\'t change anything - it\'s just weather.',
              meterChanges: { demand: 20, supply: -20, profit: -5 },
              feedback: 'You sold out by noon and had to close. Customers went to competitors.',
              philInsight: 'Oops! Ignoring demand shifts means missing opportunities. Markets reward those who anticipate changes!',
            },
          ],
          conceptConnection: 'External factors like weather shift the entire demand curve, not just movement along it.',
        },
        {
          id: 'r2-d2',
          title: 'New Competition',
          scenario: "A fancy juice bar opened nearby, selling fresh-squeezed lemonade for $4.00. They're targeting the premium market. How do you respond?",
          options: [
            {
              id: 'differentiate',
              label: 'Differentiate Your Product',
              description: 'Add unique flavors (strawberry, mint) at $2.75.',
              meterChanges: { price: 0.25, demand: 10, supply: -5, profit: 12 },
              feedback: 'Your specialty flavors attract customers who want variety without the premium price!',
              philInsight: 'Product differentiation lets you compete on more than just price. Smart market positioning!',
            },
            {
              id: 'budget',
              label: 'Own the Budget Market',
              description: 'Drop prices to $1.75 and focus on volume.',
              meterChanges: { price: -0.75, demand: 20, supply: -10, profit: 5 },
              feedback: 'You\'re the go-to for budget-conscious buyers. Thin margins but steady business.',
              philInsight: 'Different market segments have different price sensitivities. You found your niche!',
            },
            {
              id: 'ignore',
              label: 'Stay the Course',
              description: 'Don\'t change - your regulars will stay loyal.',
              meterChanges: { demand: -10, profit: -8 },
              feedback: 'Some loyal customers stay, but you\'ve lost the premium seekers and some budget shoppers.',
              philInsight: 'New competitors change the market structure. Ignoring them rarely works!',
            },
          ],
          conceptConnection: 'Competition affects market equilibrium by giving consumers more choices and putting pressure on prices.',
        },
      ],
      roundSummary: 'You\'ve learned that markets are dynamic! Demand and supply curves shift based on external factors, and smart sellers anticipate these changes.',
    },
    {
      roundNumber: 3,
      title: 'Finding Equilibrium',
      narrative: "After weeks of experimentation, you're getting a feel for the market. It's time to find that perfect equilibrium price where your supply exactly meets customer demand.",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Perfect Price',
          scenario: "You've collected data: At $1.50, you sell 80 cups but run out. At $3.00, you only sell 30 cups. At $2.25, you sell about 50 cups and have just a few left over. What's your target?",
          options: [
            {
              id: 'equilibrium',
              label: 'Target $2.25 (Equilibrium)',
              description: 'Price where quantity supplied equals quantity demanded.',
              meterChanges: { price: 0.25, demand: 5, supply: 5, profit: 20 },
              feedback: 'Perfect! You sell almost everything with minimal waste. Maximum efficiency!',
              philInsight: 'You found the equilibrium price! This is where the supply and demand curves intersect. No shortage, no surplus!',
            },
            {
              id: 'below',
              label: 'Stay at $1.75 (Below Equilibrium)',
              description: 'Keep prices low to ensure you always sell out.',
              meterChanges: { price: -0.25, demand: 15, supply: -15, profit: 5 },
              feedback: 'You sell out daily, but you\'re leaving money on the table and some customers go without.',
              philInsight: 'Below equilibrium = shortage. Some customers who would pay more can\'t get any!',
            },
            {
              id: 'above',
              label: 'Push to $2.75 (Above Equilibrium)',
              description: 'Price higher to maximize per-cup profit.',
              meterChanges: { price: 0.75, demand: -15, supply: 10, profit: 8 },
              feedback: 'You have leftover lemonade each day. Higher margins but wasted product.',
              philInsight: 'Above equilibrium = surplus. You\'re making lemonade that nobody buys!',
            },
          ],
          conceptConnection: 'Market equilibrium is the price where quantity supplied equals quantity demanded - no shortage or surplus.',
        },
        {
          id: 'r3-d2',
          title: 'End of Season Decision',
          scenario: "Summer is ending. Demand will drop as weather cools. You have a choice about how to wind down the season.",
          options: [
            {
              id: 'clearance',
              label: 'Clearance Sale',
              description: 'Drop prices to $1.00 to sell remaining inventory.',
              meterChanges: { price: -1.25, demand: 30, supply: -25, profit: 10 },
              feedback: 'Everything sells! You end the season with cash instead of spoiled lemons.',
              philInsight: 'When demand shifts left (seasonal change), the new equilibrium has lower price and quantity. You adapted!',
            },
            {
              id: 'maintain',
              label: 'Maintain Quality & Price',
              description: 'Keep standards high for loyal customers.',
              meterChanges: { demand: -20, supply: 5, profit: -5 },
              feedback: 'A few dedicated customers appreciate it, but you have lots of waste.',
              philInsight: 'Sticking to old prices when demand falls means surplus and losses.',
            },
            {
              id: 'pivot',
              label: 'Pivot to Hot Cider',
              description: 'Switch products to match the new season.',
              meterChanges: { demand: 10, supply: -10, profit: 15 },
              feedback: 'Smart pivot! You\'re meeting the new demand with a new product.',
              philInsight: 'The best entrepreneurs don\'t fight market forces - they adapt to them!',
            },
          ],
          conceptConnection: 'Seasonal changes shift demand curves, requiring price and quantity adjustments to find new equilibrium.',
        },
      ],
      roundSummary: 'Congratulations! You\'ve mastered the basics of supply and demand. You understand how markets find equilibrium and how to adapt when conditions change.',
    },
  ],
  
  completionThresholds: {
    excellent: { profit: { min: 60 }, demand: { min: 50 } },
    good: { profit: { min: 40 }, demand: { min: 40 } },
    passing: { profit: { min: 20 }, demand: { min: 30 } },
  },
  
  endings: {
    excellent: {
      title: 'Market Master!',
      description: 'You\'ve demonstrated an excellent understanding of supply and demand. Your lemonade stand thrived because you understood how prices coordinate buyers and sellers.',
      philMessage: 'Wow! You really squeezed every drop of knowledge from this simulation! You understand that prices aren\'t just numbers - they\'re signals that help markets work efficiently. Ready to tackle elasticity next?',
    },
    good: {
      title: 'Solid Entrepreneur',
      description: 'You\'ve grasped the key concepts of supply and demand. Your stand was profitable and you made smart adjustments to market changes.',
      philMessage: 'Great job! You\'ve got a good handle on how markets work. Remember: equilibrium is where supply meets demand, and prices adjust to get us there. Keep learning!',
    },
    passing: {
      title: 'Learning the Ropes',
      description: 'You\'ve experienced the basics of market dynamics. With more practice, you\'ll develop stronger instincts for pricing and market changes.',
      philMessage: 'You\'re on your way! Markets can be tricky, but you\'ve learned the fundamentals. Remember: when demand goes up, prices rise. When supply goes up, prices fall. Simple but powerful!',
    },
    needsWork: {
      title: 'Keep Practicing!',
      description: 'Running a business in a market economy is challenging! Review the concepts of supply, demand, and equilibrium, then try again.',
      philMessage: 'Don\'t give up! Even the best economists needed practice. The key insight is that prices balance what buyers want with what sellers offer. Try the simulation again with this in mind!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
