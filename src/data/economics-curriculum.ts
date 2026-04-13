import type { EconomicsUnit } from '../types/economics-curriculum';

export const economicsUnits: EconomicsUnit[] = [
  // ==========================================
  // MICROECONOMICS TRACK (Units 1-5)
  // ==========================================
  {
    id: 'micro-1-supply-demand',
    track: 'microeconomics',
    title: 'Supply & Demand',
    description: 'Discover how prices are set in markets through the interaction of buyers and sellers. Learn the fundamental forces that drive every economic transaction.',
    icon: '⚖️',
    order: 1,
    
    coreEconomicsConcepts: [
      'Law of Demand',
      'Law of Supply',
      'Market Equilibrium',
      'Price Signals',
      'Shifts vs. Movements Along Curves',
    ],
    
    personalFinanceConnection: {
      description: 'Understanding supply and demand helps you make smarter purchasing decisions, negotiate better prices, and recognize when markets are overheated or undervalued.',
      relatedPFModules: ['Budgeting Basics', 'Smart Shopping'],
    },
    
    investingConnection: [
      'Stock prices reflect supply and demand for shares',
      'Housing market dynamics',
      'Commodity price fluctuations',
    ],
    
    careerExposure: [
      {
        title: 'Market Analyst',
        description: 'Analyze market trends and consumer behavior to help businesses make pricing and production decisions.',
        salaryRange: '$55,000 - $95,000',
        skills: ['Data Analysis', 'Market Research', 'Statistical Modeling'],
      },
      {
        title: 'Pricing Strategist',
        description: 'Develop pricing strategies that maximize revenue while remaining competitive in the market.',
        salaryRange: '$70,000 - $130,000',
        skills: ['Economic Analysis', 'Competitive Intelligence', 'Revenue Optimization'],
      },
    ],
    
    lessons: [
      {
        id: 'micro-1-lesson-1',
        title: 'What is a Market?',
        estimatedMinutes: 8,
        intro: {
          hook: 'You participated in a market today. Maybe you bought coffee, scrolled through Amazon, or checked gas prices. Markets are everywhere—and understanding them is your first step to financial power.',
          philMessage: 'Hey! I\'m Phil, and I\'m obsessed with how the world works. Here\'s a secret: once you understand markets, you\'ll never look at prices the same way. Ready to see the invisible forces shaping every purchase you make?',
        },
        coreConcepts: [
          {
            title: 'Markets: Where Money Meets Stuff',
            explanation: 'A Market is simply where buyers and sellers meet to make a Transaction. It doesn\'t need to be a physical place—your phone is a market when you order food delivery. The magic happens when someone who wants something finds someone who has it.',
            example: 'StockX is a market for sneakers. Depop is a market for vintage clothes. Even your school cafeteria is a market. Anywhere money changes hands for goods = market.',
            keyTerms: ['market', 'transaction'],
            pfTip: 'You\'re always in a market as a Buyer. Knowing this helps you shop smarter—compare prices, wait for sales, and never pay the first price you see.',
            careerTip: 'Market Analysts study these patterns professionally. They predict what people will buy and when, earning $55K-$95K/year.',
          },
          {
            title: 'Demand: What Buyers Want',
            explanation: 'Demand is how much of something Buyers want at different prices. Here\'s the key insight: when prices drop, people want MORE. When prices rise, people want LESS. This simple rule explains why sales work and why luxury items feel exclusive.',
            example: 'Netflix at $8/month? 200 million subscribers. Netflix at $25/month? Suddenly people "discover" free alternatives. Price changes behavior.',
            keyTerms: ['demand', 'buyer'],
            pfTip: 'Your personal demand affects your budget. Ask yourself: "Would I still want this if it cost 2x more?" If no, you might be buying based on price, not value.',
            careerTip: 'Demand Forecasters predict what consumers will buy, helping companies avoid overstocking or running out. Salary: $60K-$110K.',
          },
          {
            title: 'Supply: What Sellers Offer',
            explanation: 'Supply is how much Sellers are willing to offer at different prices. The twist: higher prices motivate sellers to produce MORE. Why? Because higher prices mean higher profits, which attracts more people to sell.',
            example: 'When Uber shows "surge pricing" at 2x, suddenly more drivers log on. The higher price literally creates more supply. Same with housing—high prices = more construction.',
            keyTerms: ['supply', 'seller'],
            pfTip: 'When supply is low (limited editions, housing shortages), prices spike. Timing your purchases around supply can save you serious money.',
            careerTip: 'Supply Chain Managers ensure products are available when needed. They\'re the reason your Amazon package arrives on time. Salary: $70K-$120K.',
          },
        ],
        personalFinanceConnection: {
          description: 'Every financial decision you make happens in a market. Understanding supply and demand helps you know WHEN to buy (high supply = lower prices), WHERE to buy (more sellers = more competition = better deals), and WHETHER to buy (is this price fair or inflated?).',
          realWorldExample: 'Pro move: Buy winter coats in March (low demand = clearance prices). Buy concert tickets the day they drop (before scalper supply dries up). Sell your old phone before the new model launches (your supply becomes less valuable after).',
        },
        flashcards: [
          {
            term: 'Market',
            definition: 'Any system where buyers and sellers exchange goods, services, or resources for money.',
            philsAnalogy: 'A market is like Tinder for stuff—it matches people who have things with people who want things!',
          },
          {
            term: 'Demand',
            definition: 'How much of something buyers want to purchase at various prices. Lower prices = more demand.',
            philsAnalogy: 'Demand is like my appetite for bamboo—free bamboo? I\'ll eat the whole forest. $100 per stalk? I\'ll find something else.',
          },
          {
            term: 'Supply',
            definition: 'How much of something sellers offer at various prices. Higher prices = more supply.',
            philsAnalogy: 'Supply is like how many pandas would become bamboo farmers. Pay us enough, and we\'ll all start growing it!',
          },
          {
            term: 'Transaction',
            definition: 'The moment when a buyer and seller agree on a price and exchange money for goods/services.',
            philsAnalogy: 'A transaction is like a handshake deal—you give me money, I give you bamboo. Everyone walks away happy (hopefully).',
          },
        ],
        quiz: [
          {
            question: 'You\'re selling your old gaming console. What type of market participant are you?',
            options: [
              'A buyer creating demand',
              'A seller creating supply',
              'A market regulator',
              'An economist',
            ],
            correctIndex: 1,
            explanation: 'When you sell something, you\'re a seller adding to the supply. Your console becomes part of the used gaming market\'s supply.',
          },
          {
            question: 'Uber shows "surge pricing" during a concert. What happens to the supply of drivers?',
            options: [
              'It decreases because drivers avoid busy areas',
              'It stays the same regardless of price',
              'It increases because higher prices attract more drivers',
              'It depends on the weather',
            ],
            correctIndex: 2,
            explanation: 'Higher prices motivate more sellers (drivers) to participate. This is the Law of Supply in action—surge pricing literally creates more supply.',
          },
          {
            question: 'Why do stores have Black Friday sales?',
            options: [
              'To lose money and help customers',
              'Because the government requires it',
              'To increase demand by lowering prices',
              'To reduce supply of products',
            ],
            correctIndex: 2,
            explanation: 'Lower prices increase quantity demanded. Stores know that slashing prices will bring in more buyers, even if profit per item is lower.',
          },
        ],
        careerSpotlight: {
          title: 'Market Analyst',
          description: 'Market Analysts study supply, demand, and pricing patterns to help businesses make smarter decisions. They answer questions like "What should we charge?" and "How many units will we sell?"',
          salaryRange: '$55,000 - $95,000',
          skills: ['Data Analysis', 'Excel/Python', 'Market Research', 'Communication'],
        },
      },
      {
        id: 'micro-1-lesson-2',
        title: 'The Law of Demand',
        estimatedMinutes: 15,
        intro: {
          hook: 'Why do stores have sales? Why do you buy more snacks when they\'re on discount? There\'s a powerful economic law at work every time prices change.',
          philMessage: 'Get ready for one of the most important ideas in all of economics! The Law of Demand explains so much about how the world works. Once you understand it, you\'ll see it everywhere!',
        },
        coreConcepts: [
          {
            title: 'The Law of Demand',
            explanation: 'The Law of Demand states that, all else being equal, as the price of a good rises, the quantity demanded falls, and as the price falls, the quantity demanded rises. This inverse relationship between price and quantity demanded is one of the most fundamental principles in economics.',
            example: 'When gas prices spike to $5 per gallon, people drive less, carpool more, and consider buying fuel-efficient cars. When gas drops to $2 per gallon, people take more road trips and worry less about fuel economy.',
          },
          {
            title: 'The Demand Curve',
            explanation: 'A demand curve is a graph that shows the relationship between price and quantity demanded. It slopes downward from left to right, reflecting the Law of Demand. Each point on the curve shows how much buyers would purchase at that specific price.',
            example: 'Imagine graphing how many streaming subscriptions people would buy at different prices. At $5/month, maybe 100 million people subscribe. At $15/month, only 50 million. At $30/month, just 20 million. Connect these points, and you get a downward-sloping demand curve.',
          },
          {
            title: 'Why Demand Slopes Downward',
            explanation: 'Three main reasons explain why people buy less when prices rise: (1) The substitution effect - people switch to cheaper alternatives, (2) The income effect - higher prices mean your money buys less, so you reduce purchases, (3) Diminishing marginal utility - each additional unit provides less satisfaction, so you\'re only willing to pay less for more.',
            example: 'When beef prices double, you might: (1) substitute chicken or beans for some meals, (2) feel poorer and cut back on meat overall, and (3) decide that third burger of the week isn\'t worth the higher price. All three effects push you to buy less beef.',
          },
          {
            title: 'Movement Along vs. Shift of the Curve',
            explanation: 'A change in price causes movement along the demand curve - you\'re just sliding to a different point on the same curve. But other factors (income, tastes, prices of related goods) can shift the entire demand curve left or right, meaning people want more or less at EVERY price.',
            example: 'If the price of iPhones drops from $1000 to $800, that\'s movement along the curve - more people buy at the lower price. But if a celebrity endorses Android phones and they become trendy, the entire demand curve for iPhones shifts left - fewer people want them at ANY price.',
          },
        ],
        personalFinanceConnection: {
          description: 'The Law of Demand is your friend when shopping. Sales, discounts, and price drops are designed to move you along the demand curve. Understanding this helps you decide when a "deal" is really worth it.',
          realWorldExample: 'Black Friday sales exploit the Law of Demand. Stores slash prices knowing that lower prices will dramatically increase quantity demanded. But ask yourself: would you want this item at full price? If not, you might be buying just because it\'s cheap, not because you need it.',
        },
        flashcards: [
          {
            term: 'Law of Demand',
            definition: 'The principle that, all else equal, as price rises, quantity demanded falls, and as price falls, quantity demanded rises.',
            philsAnalogy: 'It\'s like bamboo at the zoo - when the zookeepers give me bamboo for free, I eat tons! But if they charged me, I\'d be much pickier about each stalk.',
          },
          {
            term: 'Demand Curve',
            definition: 'A graph showing the relationship between price and quantity demanded, typically sloping downward from left to right.',
            philsAnalogy: 'Think of it as a slide at the playground - it goes down from left to right, just like my enthusiasm goes down as bamboo prices go up!',
          },
          {
            term: 'Substitution Effect',
            definition: 'The tendency to switch to cheaper alternatives when the price of a good rises.',
            philsAnalogy: 'If bamboo gets too expensive, I might try eucalyptus instead. Not as good, but hey, a panda\'s gotta eat!',
          },
          {
            term: 'Income Effect',
            definition: 'The change in quantity demanded that results from a price change making consumers feel richer or poorer.',
            philsAnalogy: 'When bamboo prices rise, my bamboo budget doesn\'t go as far. I feel poorer, so I buy less of everything, including bamboo!',
          },
        ],
        quiz: [
          {
            question: 'According to the Law of Demand, what happens when the price of a good decreases?',
            options: [
              'Quantity demanded decreases',
              'Quantity demanded increases',
              'Supply increases',
              'The market shuts down',
            ],
            correctIndex: 1,
            explanation: 'The Law of Demand states there\'s an inverse relationship between price and quantity demanded. Lower prices lead to higher quantity demanded.',
          },
          {
            question: 'Which of the following would cause a SHIFT in the demand curve (not just movement along it)?',
            options: [
              'The price of the product decreases',
              'A sale is announced',
              'Consumer income increases',
              'The store offers a discount',
            ],
            correctIndex: 2,
            explanation: 'Price changes cause movement along the curve. But changes in income, tastes, or prices of related goods shift the entire curve. Higher income means people want more at every price level.',
          },
          {
            question: 'Why does the demand curve slope downward?',
            options: [
              'Because sellers want to charge more',
              'Because of government price controls',
              'Because of substitution effect, income effect, and diminishing marginal utility',
              'Because markets are inefficient',
            ],
            correctIndex: 2,
            explanation: 'The downward slope is explained by three factors: people substitute cheaper goods, feel poorer when prices rise, and value additional units less.',
          },
          {
            question: 'If the price of coffee rises, what is the substitution effect?',
            options: [
              'People drink more coffee',
              'People switch to tea or energy drinks',
              'Coffee shops close down',
              'Coffee farmers plant more beans',
            ],
            correctIndex: 1,
            explanation: 'The substitution effect means consumers switch to alternatives when a good becomes more expensive. Tea and energy drinks are substitutes for coffee.',
          },
        ],
        careerSpotlight: {
          title: 'Demand Forecaster',
          description: 'Demand forecasters predict how much of a product consumers will want to buy. They use historical data, economic trends, and statistical models to help companies plan production, inventory, and pricing strategies.',
          salaryRange: '$60,000 - $110,000',
          skills: ['Statistical Analysis', 'Data Modeling', 'Market Research', 'Excel/Python'],
        },
      },
      {
        id: 'micro-1-lesson-3',
        title: 'The Law of Supply',
        estimatedMinutes: 14,
        intro: {
          hook: 'Ever wonder why there are more food trucks when a big event comes to town? Or why farmers grow more corn when corn prices are high? Let\'s explore the seller\'s side of the market!',
          philMessage: 'Now we flip to the other side of the market - the sellers! Understanding supply is just as important as understanding demand. Together, they\'re like two dancers creating the beautiful choreography of markets!',
        },
        coreConcepts: [
          {
            title: 'The Law of Supply',
            explanation: 'The Law of Supply states that, all else being equal, as the price of a good rises, the quantity supplied rises, and as the price falls, the quantity supplied falls. This direct relationship exists because higher prices make production more profitable, encouraging sellers to produce more.',
            example: 'When avocado prices soared due to high demand, farmers in Mexico and California planted more avocado trees. The high prices made it worth the investment. When prices dropped, some farmers switched to other crops.',
          },
          {
            title: 'The Supply Curve',
            explanation: 'A supply curve is a graph showing the relationship between price and quantity supplied. Unlike the demand curve, it slopes upward from left to right. Higher prices lead to higher quantities supplied because sellers are more motivated to produce and sell.',
            example: 'Consider Uber drivers. At $10 per ride, maybe 1,000 drivers are on the road. At $20 per ride (surge pricing), suddenly 2,500 drivers log on - it\'s worth their time. At $5 per ride, only 300 drivers bother. The supply curve slopes upward.',
          },
          {
            title: 'Why Supply Slopes Upward',
            explanation: 'Higher prices encourage more supply for several reasons: (1) Existing producers can afford to increase production, (2) New producers enter the market attracted by profits, (3) Producers can cover higher marginal costs of producing additional units.',
            example: 'When oil prices hit $100/barrel, oil companies drill in expensive locations like deep ocean or Arctic regions. At $30/barrel, those operations aren\'t profitable, so they shut down. Higher prices justify higher production costs.',
          },
          {
            title: 'Shifts in Supply',
            explanation: 'The supply curve shifts when non-price factors change. These include: input costs (wages, materials), technology, number of sellers, expectations about future prices, government policies (taxes, subsidies), and natural events. A rightward shift means more supply at every price; leftward means less.',
            example: 'When a drought hits California, the supply curve for almonds shifts left - farmers produce fewer almonds at every price. When a new harvesting robot is invented, the supply curve shifts right - farmers can produce more at every price.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding supply helps you predict when prices might rise or fall. If you know a supply disruption is coming (like a chip shortage), you can make purchases before prices spike. You can also understand why some jobs pay more than others based on labor supply.',
          realWorldExample: 'During the 2021 chip shortage, car prices spiked because supply dropped. Savvy buyers who understood supply either bought early, waited it out, or looked at used cars. Those who didn\'t understand supply overpaid at the peak.',
        },
        flashcards: [
          {
            term: 'Law of Supply',
            definition: 'The principle that, all else equal, as price rises, quantity supplied rises, and as price falls, quantity supplied falls.',
            philsAnalogy: 'If someone offered me $100 per bamboo stalk I found, I\'d search the whole forest! At $1 per stalk, I\'d barely look. Higher pay = more effort!',
          },
          {
            term: 'Supply Curve',
            definition: 'A graph showing the relationship between price and quantity supplied, typically sloping upward from left to right.',
            philsAnalogy: 'It\'s like climbing a hill - as you go right (higher prices), you go up (more quantity supplied). Sellers get more motivated!',
          },
          {
            term: 'Input Costs',
            definition: 'The costs of resources used to produce a good or service, including labor, materials, and energy.',
            philsAnalogy: 'To make bamboo smoothies, I need bamboo, a blender, and electricity. If any of these costs go up, I\'ll make fewer smoothies unless I can charge more!',
          },
          {
            term: 'Supply Shift',
            definition: 'A change in quantity supplied at every price level, caused by non-price factors like technology or input costs.',
            philsAnalogy: 'If I learn a faster way to harvest bamboo, I can supply more at any price. My whole supply curve moves right - that\'s a shift!',
          },
        ],
        quiz: [
          {
            question: 'According to the Law of Supply, what happens when the price of a good increases?',
            options: [
              'Quantity supplied decreases',
              'Quantity supplied increases',
              'Demand increases',
              'The market reaches equilibrium',
            ],
            correctIndex: 1,
            explanation: 'The Law of Supply states there\'s a direct relationship between price and quantity supplied. Higher prices motivate sellers to produce and sell more.',
          },
          {
            question: 'Why does the supply curve slope upward?',
            options: [
              'Because consumers want more at higher prices',
              'Because higher prices cover higher production costs and attract new sellers',
              'Because the government requires it',
              'Because of the substitution effect',
            ],
            correctIndex: 1,
            explanation: 'Higher prices make production more profitable, allowing sellers to cover higher marginal costs and attracting new producers to the market.',
          },
          {
            question: 'Which of the following would shift the supply curve to the LEFT (decrease supply)?',
            options: [
              'New technology that reduces production costs',
              'A decrease in the price of the good',
              'An increase in the cost of raw materials',
              'More companies entering the market',
            ],
            correctIndex: 2,
            explanation: 'Higher input costs make production more expensive, so sellers supply less at every price. This shifts the supply curve left. Note: a price change causes movement along the curve, not a shift.',
          },
          {
            question: 'Surge pricing on Uber during a concert is an example of:',
            options: [
              'The Law of Demand only',
              'The Law of Supply only',
              'Both Laws working together',
              'Market failure',
            ],
            correctIndex: 2,
            explanation: 'Surge pricing demonstrates both laws: high demand (many people want rides) meets limited supply (few drivers). The higher price reduces quantity demanded while increasing quantity supplied (more drivers log on).',
          },
        ],
      },
      {
        id: 'micro-1-lesson-4',
        title: 'Market Equilibrium',
        estimatedMinutes: 16,
        intro: {
          hook: 'What happens when an unstoppable force meets an immovable object? In economics, we find out when demand meets supply. The result is one of the most elegant concepts in all of economics: equilibrium.',
          philMessage: 'This is where the magic happens! When supply and demand come together, they find a special price where everyone\'s happy - well, as happy as they can be. It\'s like finding the perfect temperature in a room where some people want it warmer and others want it cooler!',
        },
        coreConcepts: [
          {
            title: 'What is Market Equilibrium?',
            explanation: 'Market equilibrium occurs where the supply curve and demand curve intersect. At this point, the quantity that buyers want to purchase exactly equals the quantity that sellers want to sell. The price at this intersection is called the equilibrium price, and the quantity is the equilibrium quantity.',
            example: 'Imagine the market for used textbooks at your school. If the equilibrium price is $40, then at that price, the number of students wanting to sell their books exactly matches the number wanting to buy. No books go unsold, and no buyers go home empty-handed.',
          },
          {
            title: 'Surplus: When Price is Too High',
            explanation: 'When the market price is above equilibrium, quantity supplied exceeds quantity demanded, creating a surplus (excess supply). Sellers have unsold inventory piling up. To clear this surplus, sellers must lower prices, which increases quantity demanded and decreases quantity supplied until equilibrium is reached.',
            example: 'If a clothing store prices winter coats at $300 but the equilibrium price is $200, they\'ll have racks of unsold coats. Eventually, they\'ll have a sale, dropping prices until the coats sell. That\'s the market pushing toward equilibrium.',
          },
          {
            title: 'Shortage: When Price is Too Low',
            explanation: 'When the market price is below equilibrium, quantity demanded exceeds quantity supplied, creating a shortage (excess demand). Buyers can\'t find enough of the product. This allows sellers to raise prices, which decreases quantity demanded and increases quantity supplied until equilibrium is reached.',
            example: 'When a hot new gaming console launches at $500 but the equilibrium price is $700, there\'s a shortage. Stores sell out instantly, and scalpers sell on eBay for $1000+. Eventually, either the company raises prices or supply catches up to demand.',
          },
          {
            title: 'How Equilibrium Changes',
            explanation: 'Equilibrium isn\'t static - it changes whenever supply or demand shifts. If demand increases (shifts right), equilibrium price and quantity both rise. If supply increases (shifts right), equilibrium price falls but quantity rises. Markets constantly adjust to new equilibrium points as conditions change.',
            example: 'When a pandemic hits, demand for hand sanitizer surges (demand shifts right). The equilibrium price jumps from $3 to $8, and equilibrium quantity rises as producers ramp up. When the pandemic ends, demand shifts back left, and prices return to normal.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding equilibrium helps you time purchases and sales. When you see a shortage (like hot holiday toys), expect prices to rise. When you see a surplus (like last season\'s fashion), expect deals. You can also understand why some things are expensive (high demand, low supply) and others are cheap.',
          realWorldExample: 'Housing markets clearly show equilibrium at work. In cities with high demand and limited supply (San Francisco), equilibrium prices are sky-high. In areas with low demand or lots of supply, prices are much lower. Understanding this helps you decide where to live and when to buy.',
        },
        flashcards: [
          {
            term: 'Market Equilibrium',
            definition: 'The point where quantity supplied equals quantity demanded, determining the market price and quantity.',
            philsAnalogy: 'It\'s like when the bamboo I want to eat exactly matches the bamboo the forest produces. Perfect balance! No wasted bamboo, no hungry panda.',
          },
          {
            term: 'Equilibrium Price',
            definition: 'The price at which quantity supplied equals quantity demanded; also called the market-clearing price.',
            philsAnalogy: 'The "just right" price - not so high that bamboo sits uneaten, not so low that pandas fight over scraps!',
          },
          {
            term: 'Surplus',
            definition: 'A situation where quantity supplied exceeds quantity demanded, typically because price is above equilibrium.',
            philsAnalogy: 'Too much bamboo, not enough pandas! When there\'s a surplus, prices need to drop to attract more hungry pandas like me.',
          },
          {
            term: 'Shortage',
            definition: 'A situation where quantity demanded exceeds quantity supplied, typically because price is below equilibrium.',
            philsAnalogy: 'Too many hungry pandas, not enough bamboo! When there\'s a shortage, prices rise until some pandas decide to eat something else.',
          },
        ],
        quiz: [
          {
            question: 'At market equilibrium:',
            options: [
              'Price is at its highest possible level',
              'Quantity supplied equals quantity demanded',
              'There is always a surplus',
              'The government sets the price',
            ],
            correctIndex: 1,
            explanation: 'Equilibrium is the point where the quantity buyers want to purchase exactly matches the quantity sellers want to sell. The market "clears" with no surplus or shortage.',
          },
          {
            question: 'If the current market price is ABOVE the equilibrium price, what exists?',
            options: [
              'A shortage',
              'A surplus',
              'Perfect balance',
              'Infinite demand',
            ],
            correctIndex: 1,
            explanation: 'When price is too high, sellers want to sell more than buyers want to buy, creating a surplus. Unsold goods pile up, putting downward pressure on prices.',
          },
          {
            question: 'What happens to equilibrium price and quantity when demand INCREASES (shifts right)?',
            options: [
              'Price falls, quantity falls',
              'Price rises, quantity falls',
              'Price rises, quantity rises',
              'Price falls, quantity rises',
            ],
            correctIndex: 2,
            explanation: 'When demand increases, more people want to buy at every price. This pushes the equilibrium to a higher price and higher quantity as the new demand curve intersects supply at a different point.',
          },
          {
            question: 'A new factory opens, increasing the supply of smartphones. What happens to equilibrium?',
            options: [
              'Price rises, quantity rises',
              'Price rises, quantity falls',
              'Price falls, quantity rises',
              'Price falls, quantity falls',
            ],
            correctIndex: 2,
            explanation: 'More supply (shift right) means more phones available at every price. The new equilibrium has a lower price (phones are cheaper) and higher quantity (more phones sold).',
          },
        ],
        careerSpotlight: {
          title: 'Market Analyst',
          description: 'Market analysts study supply and demand conditions across industries to help businesses make strategic decisions about pricing, production, and market entry. They track equilibrium changes and predict future market conditions.',
          salaryRange: '$55,000 - $95,000',
          skills: ['Data Analysis', 'Market Research', 'Economic Modeling', 'Communication'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'market-maker-sim',
      title: 'Market Maker Simulation',
      description: 'Run your own virtual marketplace! Set prices, watch supply and demand curves shift, and try to find the perfect equilibrium.',
      instructions: [
        'Start with a product (bamboo snacks)',
        'Adjust your price and see how quantity demanded changes',
        'Watch for external events that shift curves',
        'Find the equilibrium price to maximize trades',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {},
  },
  
  {
    id: 'micro-2-elasticity',
    track: 'microeconomics',
    title: 'Elasticity',
    description: 'Learn how sensitive buyers and sellers are to price changes. Discover why some products can raise prices without losing customers while others cannot.',
    icon: '🎯',
    order: 2,
    
    coreEconomicsConcepts: [
      'Price Elasticity of Demand',
      'Price Elasticity of Supply',
      'Elastic vs. Inelastic Goods',
      'Total Revenue Test',
      'Determinants of Elasticity',
    ],
    
    personalFinanceConnection: {
      description: 'Recognize which expenses in your budget are flexible (elastic) vs. fixed (inelastic). This helps prioritize where to cut spending and where you have negotiating power.',
      relatedPFModules: ['Budget Categories', 'Expense Tracking'],
    },
    
    investingConnection: [
      'Companies with inelastic demand have pricing power',
      'Luxury goods vs. necessities in recessions',
      'Subscription business models',
    ],
    
    careerExposure: [
      {
        title: 'Revenue Manager',
        description: 'Optimize pricing across different customer segments and time periods to maximize total revenue.',
        salaryRange: '$60,000 - $110,000',
        skills: ['Dynamic Pricing', 'Demand Forecasting', 'Analytics'],
      },
      {
        title: 'Product Manager',
        description: 'Make decisions about product features and pricing based on customer sensitivity and market conditions.',
        salaryRange: '$80,000 - $150,000',
        skills: ['Market Analysis', 'Customer Research', 'Strategic Planning'],
      },
    ],
    
    lessons: [
      {
        id: 'micro-2-lesson-1',
        title: 'Introduction to Elasticity',
        estimatedMinutes: 13,
        intro: {
          hook: 'Why can gas stations raise prices and still sell plenty of gas, while a small price increase at a coffee shop sends customers running to competitors? The answer lies in a powerful concept called elasticity.',
          philMessage: 'Elasticity is like asking "how stretchy is demand?" Some products have super stretchy demand - raise the price a little and sales plummet. Others are rigid - people keep buying no matter what. Let\'s find out why!',
        },
        coreConcepts: [
          {
            title: 'What is Price Elasticity of Demand?',
            explanation: 'Price elasticity of demand measures how sensitive the quantity demanded is to a change in price. It answers the question: if I raise my price by 10%, how much will my sales drop? Mathematically, it\'s the percentage change in quantity demanded divided by the percentage change in price.',
            example: 'If a streaming service raises its price by 10% and loses 20% of subscribers, the elasticity is -2 (20%/10%). This means demand is very sensitive to price. If they raised prices 10% and only lost 5% of subscribers, elasticity would be -0.5, meaning demand is less sensitive.',
          },
          {
            title: 'Elastic vs. Inelastic Demand',
            explanation: 'When elasticity is greater than 1 (in absolute value), demand is "elastic" - very responsive to price changes. When elasticity is less than 1, demand is "inelastic" - not very responsive. When elasticity equals 1, demand is "unit elastic." This distinction is crucial for pricing decisions.',
            example: 'Luxury vacations have elastic demand - raise prices 20% and bookings might drop 40%. Insulin for diabetics has inelastic demand - even a 50% price increase barely changes the quantity purchased because people need it to survive.',
          },
          {
            title: 'Perfectly Elastic and Perfectly Inelastic',
            explanation: 'At the extremes: perfectly elastic demand (elasticity = infinity) means any price increase causes demand to drop to zero - buyers are infinitely sensitive. Perfectly inelastic demand (elasticity = 0) means quantity demanded doesn\'t change at all regardless of price - buyers are completely insensitive.',
            example: 'A commodity like wheat from one farmer is nearly perfectly elastic - if Farmer Joe charges even 1 cent more than market price, buyers go to other farmers. Life-saving emergency surgery is nearly perfectly inelastic - you\'ll pay whatever it costs.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding elasticity helps you identify which expenses in your budget are flexible and which are fixed. Inelastic expenses (rent, medicine, utilities) are hard to cut. Elastic expenses (entertainment, dining out, subscriptions) are where you have negotiating power and flexibility.',
          realWorldExample: 'When budgeting, categorize expenses by elasticity. Your rent is inelastic - you can\'t easily reduce it without moving. But your streaming subscriptions are elastic - you can easily cancel some. Focus budget cuts on elastic expenses first.',
        },
        flashcards: [
          {
            term: 'Price Elasticity of Demand',
            definition: 'A measure of how responsive quantity demanded is to a change in price, calculated as % change in quantity demanded divided by % change in price.',
            philsAnalogy: 'It\'s like measuring how much I\'ll reduce my bamboo eating if prices go up. Very elastic = I\'ll eat way less. Inelastic = I\'ll keep munching anyway!',
          },
          {
            term: 'Elastic Demand',
            definition: 'Demand where the elasticity is greater than 1, meaning quantity demanded is highly responsive to price changes.',
            philsAnalogy: 'Like a rubber band that stretches a lot! A small price change causes a big change in how much people buy.',
          },
          {
            term: 'Inelastic Demand',
            definition: 'Demand where the elasticity is less than 1, meaning quantity demanded is not very responsive to price changes.',
            philsAnalogy: 'Like a stiff board that barely bends. Even big price changes don\'t change buying behavior much. That\'s me with bamboo - I need it!',
          },
        ],
        quiz: [
          {
            question: 'If a 10% price increase leads to a 15% decrease in quantity demanded, demand is:',
            options: [
              'Inelastic',
              'Elastic',
              'Unit elastic',
              'Perfectly inelastic',
            ],
            correctIndex: 1,
            explanation: 'Elasticity = 15%/10% = 1.5. Since this is greater than 1, demand is elastic. The quantity response is proportionally larger than the price change.',
          },
          {
            question: 'Which product likely has the MOST inelastic demand?',
            options: [
              'Designer handbags',
              'Insulin for diabetics',
              'Movie tickets',
              'Restaurant meals',
            ],
            correctIndex: 1,
            explanation: 'Insulin is a necessity with no substitutes for diabetics. They must buy it regardless of price, making demand highly inelastic. The other options all have substitutes or can be foregone.',
          },
          {
            question: 'What does an elasticity of exactly 1 mean?',
            options: [
              'Demand doesn\'t respond to price at all',
              'Demand responds infinitely to price',
              'The percentage change in quantity equals the percentage change in price',
              'The product is free',
            ],
            correctIndex: 2,
            explanation: 'Unit elasticity (elasticity = 1) means a 10% price change causes exactly a 10% change in quantity demanded. The responses are proportionally equal.',
          },
        ],
      },
      {
        id: 'micro-2-lesson-2',
        title: 'Determinants of Elasticity',
        estimatedMinutes: 14,
        intro: {
          hook: 'Why is demand for salt inelastic while demand for a specific brand of salt is elastic? What makes some products price-sensitive and others not? Let\'s uncover the factors that determine elasticity.',
          philMessage: 'There\'s a method to the elasticity madness! Certain characteristics make products more or less elastic. Once you know these factors, you can predict elasticity for almost any product!',
        },
        coreConcepts: [
          {
            title: 'Availability of Substitutes',
            explanation: 'The most important determinant of elasticity is the availability of substitutes. If there are many alternatives, demand is elastic because consumers can easily switch. If there are few or no substitutes, demand is inelastic because consumers are stuck.',
            example: 'Demand for Coca-Cola is elastic because Pepsi, Dr Pepper, and other sodas are close substitutes. But demand for all soft drinks as a category is less elastic because the substitutes (water, juice) are less similar. Demand for insulin has no substitutes, making it very inelastic.',
          },
          {
            title: 'Necessity vs. Luxury',
            explanation: 'Necessities tend to have inelastic demand because people need them regardless of price. Luxuries tend to have elastic demand because people can easily do without them when prices rise.',
            example: 'Electricity is a necessity - you\'ll pay higher bills rather than sit in the dark. A yacht is a luxury - if prices rise 20%, many potential buyers will simply not buy one. Basic groceries are necessities; gourmet foods are luxuries.',
          },
          {
            title: 'Proportion of Income',
            explanation: 'Products that take up a large share of your budget tend to have more elastic demand because price changes significantly impact your finances. Products that are a tiny fraction of spending tend to be inelastic because the price barely matters.',
            example: 'A 10% increase in housing costs (maybe $200/month) forces you to reconsider. A 10% increase in salt prices (maybe 20 cents per year) doesn\'t change your behavior at all. Big-ticket items face more price sensitivity.',
          },
          {
            title: 'Time Horizon',
            explanation: 'Demand tends to be more elastic over longer time periods. In the short run, consumers are stuck with their current situation. Over time, they can find substitutes, change habits, or make adjustments.',
            example: 'When gas prices spike, you still need to drive to work tomorrow (inelastic short-run). But over a year, you might buy a fuel-efficient car, move closer to work, or start carpooling (elastic long-run). Time allows adjustment.',
          },
        ],
        personalFinanceConnection: {
          description: 'Use the determinants of elasticity to find savings opportunities. Look for products where you have substitutes, that are luxuries rather than necessities, and where you\'re spending a lot. These are areas where you can negotiate, switch brands, or cut back.',
          realWorldExample: 'Your phone plan might seem inelastic, but consider: there are substitute carriers (T-Mobile, Verizon, MVNOs), it\'s not truly a necessity (you could use WiFi more), and it\'s a significant monthly expense. This means you have more negotiating power than you think!',
        },
        flashcards: [
          {
            term: 'Substitutes',
            definition: 'Alternative products that can be used in place of another, making demand for the original product more elastic.',
            philsAnalogy: 'If bamboo gets expensive and eucalyptus is available, bamboo demand becomes elastic. But I\'m a panda - there\'s no real substitute for bamboo for me, so my demand is inelastic!',
          },
          {
            term: 'Necessity',
            definition: 'A good that consumers need regardless of price, typically having inelastic demand.',
            philsAnalogy: 'Bamboo is my necessity - I literally can\'t survive without it. I\'ll pay almost any price. That\'s inelastic demand!',
          },
          {
            term: 'Luxury Good',
            definition: 'A good that consumers can easily do without, typically having elastic demand.',
            philsAnalogy: 'A fancy bamboo-shaped bed is a luxury. If the price doubles, I\'ll just sleep on regular leaves. That\'s elastic demand!',
          },
          {
            term: 'Time Horizon',
            definition: 'The length of time consumers have to respond to price changes, with longer periods allowing more elastic responses.',
            philsAnalogy: 'If bamboo prices spike today, I\'m stuck eating it anyway. But give me a year, and I might learn to like other plants. Time makes demand more elastic!',
          },
        ],
        quiz: [
          {
            question: 'Which factor is the MOST important determinant of price elasticity of demand?',
            options: [
              'The color of the product',
              'Availability of substitutes',
              'The brand name',
              'Where it\'s manufactured',
            ],
            correctIndex: 1,
            explanation: 'Substitutes are the primary determinant. If consumers can easily switch to alternatives, demand is elastic. If there are no good substitutes, demand is inelastic.',
          },
          {
            question: 'Why is demand typically MORE elastic in the long run than the short run?',
            options: [
              'Prices are lower in the long run',
              'Consumers have more time to find substitutes and adjust behavior',
              'Companies produce more in the long run',
              'The government regulates long-run prices',
            ],
            correctIndex: 1,
            explanation: 'Over time, consumers can find alternatives, change habits, buy different products, or make lifestyle adjustments. In the short run, they\'re stuck with current circumstances.',
          },
          {
            question: 'A product that takes up a large share of your budget will likely have:',
            options: [
              'More inelastic demand',
              'More elastic demand',
              'Unit elastic demand',
              'No relationship to elasticity',
            ],
            correctIndex: 1,
            explanation: 'When something is a big part of your budget, price changes really matter to you financially. You\'ll be more responsive to price changes, making demand more elastic.',
          },
          {
            question: 'Which of these likely has the MOST elastic demand?',
            options: [
              'Tap water',
              'A specific brand of bottled water',
              'Heart medication',
              'Gasoline in a town with one gas station',
            ],
            correctIndex: 1,
            explanation: 'A specific brand of bottled water has many close substitutes (other brands, tap water). The other options either have few substitutes or are necessities.',
          },
        ],
      },
      {
        id: 'micro-2-lesson-3',
        title: 'The Total Revenue Test',
        estimatedMinutes: 12,
        intro: {
          hook: 'Here\'s a business puzzle: should you raise prices or lower them to make more money? The answer isn\'t always "charge more." Sometimes lowering prices actually increases your total revenue!',
          philMessage: 'This is where elasticity becomes super practical! The Total Revenue Test helps businesses decide whether to raise or lower prices. It\'s like having a crystal ball for pricing decisions!',
        },
        coreConcepts: [
          {
            title: 'What is Total Revenue?',
            explanation: 'Total revenue is the total amount of money a seller receives, calculated as price multiplied by quantity sold (TR = P × Q). When you change price, both P and Q change (in opposite directions), so the effect on total revenue depends on which change is bigger.',
            example: 'If you sell 100 shirts at $20 each, total revenue is $2,000. If you raise the price to $25 and sell only 70 shirts, total revenue is $1,750. The price increase actually hurt your revenue because quantity dropped too much.',
          },
          {
            title: 'The Total Revenue Test',
            explanation: 'The Total Revenue Test determines elasticity by observing what happens to revenue when price changes. If price and total revenue move in OPPOSITE directions, demand is elastic. If they move in the SAME direction, demand is inelastic. If revenue stays the same, demand is unit elastic.',
            example: 'A movie theater raises ticket prices and total revenue falls. This means demand is elastic - the quantity drop outweighed the price increase. A hospital raises prices and revenue rises. Demand is inelastic - patients keep coming despite higher prices.',
          },
          {
            title: 'Pricing Strategy with Elastic Demand',
            explanation: 'When demand is elastic, lowering prices increases total revenue because the percentage increase in quantity sold is greater than the percentage decrease in price. Raising prices decreases revenue. Businesses with elastic demand should compete on price.',
            example: 'Airlines know leisure travel demand is elastic. That\'s why they offer sales and discounts - lower prices bring in so many more travelers that total revenue increases. Dollar stores thrive on elastic demand by keeping prices ultra-low.',
          },
          {
            title: 'Pricing Strategy with Inelastic Demand',
            explanation: 'When demand is inelastic, raising prices increases total revenue because the percentage decrease in quantity is smaller than the percentage increase in price. Businesses with inelastic demand have pricing power and can charge premium prices.',
            example: 'Pharmaceutical companies can raise prices on life-saving drugs because demand is inelastic - patients will pay almost any price. Luxury brands like Rolex keep prices high because their customers aren\'t price-sensitive.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding the total revenue test helps you negotiate and find deals. Sellers with elastic demand are more willing to negotiate because they\'d rather sell at a lower price than not sell at all. Sellers with inelastic demand have less incentive to bargain.',
          realWorldExample: 'Car dealerships face elastic demand - there are many competitors and substitutes. This is why negotiating works! But the DMV has inelastic demand for registration - you can\'t negotiate because you have no alternative. Focus negotiation efforts where demand is elastic.',
        },
        flashcards: [
          {
            term: 'Total Revenue',
            definition: 'The total amount received by sellers, calculated as price times quantity sold (TR = P × Q).',
            philsAnalogy: 'If I sell bamboo smoothies for $5 each and sell 20, my total revenue is $100. Simple math, big implications!',
          },
          {
            term: 'Total Revenue Test',
            definition: 'A method to determine elasticity by observing whether total revenue moves in the same or opposite direction as price.',
            philsAnalogy: 'If I raise smoothie prices and make MORE money, demand is inelastic. If I make LESS money, demand is elastic. The revenue tells the story!',
          },
          {
            term: 'Pricing Power',
            definition: 'The ability of a seller to raise prices without significantly losing customers, associated with inelastic demand.',
            philsAnalogy: 'If I\'m the only panda selling bamboo smoothies and everyone loves them, I have pricing power. I can charge more and people still buy!',
          },
        ],
        quiz: [
          {
            question: 'If a company raises prices and total revenue DECREASES, demand is:',
            options: [
              'Inelastic',
              'Elastic',
              'Unit elastic',
              'Perfectly inelastic',
            ],
            correctIndex: 1,
            explanation: 'When price and revenue move in opposite directions (price up, revenue down), demand is elastic. The quantity drop was proportionally larger than the price increase.',
          },
          {
            question: 'A business with inelastic demand should generally:',
            options: [
              'Lower prices to increase revenue',
              'Raise prices to increase revenue',
              'Keep prices exactly the same',
              'Give products away for free',
            ],
            correctIndex: 1,
            explanation: 'With inelastic demand, raising prices increases revenue because customers don\'t reduce purchases much. The higher price more than compensates for slightly lower quantity.',
          },
          {
            question: 'Why do airlines offer so many discounts and sales?',
            options: [
              'They\'re losing money',
              'Demand for leisure travel is elastic, so lower prices increase revenue',
              'The government requires it',
              'They have too many planes',
            ],
            correctIndex: 1,
            explanation: 'Leisure travel has elastic demand due to many substitutes (driving, staying home) and being a luxury. Lower prices attract many more travelers, increasing total revenue.',
          },
          {
            question: 'Total revenue stays the same when price changes. This means demand is:',
            options: [
              'Elastic',
              'Inelastic',
              'Unit elastic',
              'Undefined',
            ],
            correctIndex: 2,
            explanation: 'Unit elastic demand (elasticity = 1) means the percentage changes in price and quantity are equal, so their product (total revenue) stays constant.',
          },
        ],
        careerSpotlight: {
          title: 'Pricing Analyst',
          description: 'Pricing analysts use elasticity concepts to set optimal prices for products and services. They analyze sales data, conduct price experiments, and recommend pricing strategies that maximize revenue or profit.',
          salaryRange: '$55,000 - $100,000',
          skills: ['Data Analysis', 'Statistical Modeling', 'Market Research', 'Excel/SQL'],
        },
      },
      {
        id: 'micro-2-lesson-4',
        title: 'Other Types of Elasticity',
        estimatedMinutes: 13,
        intro: {
          hook: 'Price isn\'t the only thing that affects how much people buy. What about when your income changes? Or when the price of a related product changes? There\'s an elasticity for that!',
          philMessage: 'We\'ve mastered price elasticity of demand, but the elasticity family has more members! Let\'s meet income elasticity, cross-price elasticity, and price elasticity of supply. They\'re all useful in different situations!',
        },
        coreConcepts: [
          {
            title: 'Income Elasticity of Demand',
            explanation: 'Income elasticity measures how quantity demanded changes when consumer income changes. It\'s calculated as % change in quantity demanded divided by % change in income. Positive income elasticity means people buy more when richer (normal goods). Negative means they buy less when richer (inferior goods).',
            example: 'When your income rises 20%, you might buy 30% more restaurant meals (income elasticity = 1.5, a luxury normal good). But you might buy 10% less instant ramen (income elasticity = -0.5, an inferior good). Higher income changes what you buy.',
          },
          {
            title: 'Normal Goods vs. Inferior Goods',
            explanation: 'Normal goods have positive income elasticity - demand increases as income rises. Within normal goods, necessities have elasticity between 0 and 1, while luxuries have elasticity greater than 1. Inferior goods have negative income elasticity - demand decreases as income rises because people upgrade to better alternatives.',
            example: 'As income rises: demand for organic food increases (normal luxury, elasticity > 1), demand for regular groceries increases slightly (normal necessity, elasticity 0-1), and demand for generic store brands decreases (inferior good, elasticity < 0).',
          },
          {
            title: 'Cross-Price Elasticity of Demand',
            explanation: 'Cross-price elasticity measures how the quantity demanded of one good changes when the price of another good changes. Positive cross-elasticity means the goods are substitutes (one goes up, demand for the other rises). Negative means they\'re complements (used together).',
            example: 'If Pepsi\'s price rises 10% and Coca-Cola sales increase 8%, cross-elasticity is +0.8 (substitutes). If printer prices drop 20% and ink cartridge sales rise 15%, cross-elasticity is -0.75 (complements - you need both).',
          },
          {
            title: 'Price Elasticity of Supply',
            explanation: 'Price elasticity of supply measures how responsive quantity supplied is to price changes. It\'s calculated as % change in quantity supplied divided by % change in price. Supply is more elastic when producers can easily adjust production, and more inelastic when production is difficult to change.',
            example: 'Digital goods (ebooks, software) have very elastic supply - companies can produce unlimited copies instantly. Beachfront property has perfectly inelastic supply - you can\'t create more beach. Agricultural products have inelastic supply in the short run (crops take time to grow) but elastic in the long run.',
          },
        ],
        personalFinanceConnection: {
          description: 'Income elasticity helps you understand how your spending will change as your career progresses. As your income grows, you\'ll naturally spend more on luxuries and less on inferior goods. Planning for this helps you avoid lifestyle inflation and build wealth.',
          realWorldExample: 'When you get a raise, notice which spending categories grow fastest. If restaurant spending jumps 50% when income rises 20%, that\'s a luxury with high income elasticity. Being aware of this helps you consciously decide where extra income should go rather than letting it disappear.',
        },
        flashcards: [
          {
            term: 'Income Elasticity of Demand',
            definition: 'A measure of how responsive quantity demanded is to changes in consumer income.',
            philsAnalogy: 'When I get more bamboo allowance, do I buy more premium bamboo (normal good) or less cheap bamboo (inferior good)? Income elasticity tells the story!',
          },
          {
            term: 'Normal Good',
            definition: 'A good for which demand increases when income increases (positive income elasticity).',
            philsAnalogy: 'Fresh, organic bamboo is a normal good for me. The richer I get, the more I want!',
          },
          {
            term: 'Inferior Good',
            definition: 'A good for which demand decreases when income increases (negative income elasticity).',
            philsAnalogy: 'Day-old discount bamboo is an inferior good. When I have more money, I buy less of it and upgrade to the fresh stuff!',
          },
          {
            term: 'Cross-Price Elasticity',
            definition: 'A measure of how the quantity demanded of one good responds to price changes in another good.',
            philsAnalogy: 'If bamboo prices rise and I buy more eucalyptus, they\'re substitutes (positive). If bamboo prices rise and I buy less bamboo sauce, they\'re complements (negative)!',
          },
        ],
        quiz: [
          {
            question: 'If demand for a product DECREASES when income rises, the product is:',
            options: [
              'A normal good',
              'An inferior good',
              'A luxury good',
              'A complement',
            ],
            correctIndex: 1,
            explanation: 'Inferior goods have negative income elasticity - as people get richer, they buy less of these products and upgrade to better alternatives.',
          },
          {
            question: 'Butter and margarine have a cross-price elasticity of +2.5. This means they are:',
            options: [
              'Complements',
              'Substitutes',
              'Unrelated',
              'Inferior goods',
            ],
            correctIndex: 1,
            explanation: 'Positive cross-price elasticity means the goods are substitutes. When butter\'s price rises, people buy more margarine instead.',
          },
          {
            question: 'Which product likely has the MOST elastic supply?',
            options: [
              'Vintage wine from a specific year',
              'Beachfront property',
              'Digital music downloads',
              'Original Picasso paintings',
            ],
            correctIndex: 2,
            explanation: 'Digital goods can be reproduced infinitely at near-zero cost, making supply extremely elastic. The other options are limited or impossible to produce more of.',
          },
          {
            question: 'Hot dogs and hot dog buns have negative cross-price elasticity. This means:',
            options: [
              'They are substitutes',
              'They are complements',
              'They are inferior goods',
              'They are unrelated',
            ],
            correctIndex: 1,
            explanation: 'Negative cross-price elasticity indicates complements - goods used together. When hot dog prices fall, people buy more buns too because they\'re having more cookouts.',
          },
        ],
      },
    ],
    
    gamifiedActivity: {
      id: 'elasticity-challenge',
      title: 'The Elasticity Challenge',
      description: 'Test different products and predict whether demand is elastic or inelastic. Can you maximize revenue by choosing the right pricing strategy?',
      instructions: [
        'View a product category',
        'Predict if demand is elastic or inelastic',
        'Set a price increase or decrease',
        'See if total revenue goes up or down',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'micro-1-supply-demand',
    },
  },
  
  {
    id: 'micro-3-consumer-choice',
    track: 'microeconomics',
    title: 'Consumer Choice & Utility',
    description: 'Explore how people make decisions to maximize their satisfaction. Learn the economics behind every choice you make as a consumer.',
    icon: '🛒',
    order: 3,
    
    coreEconomicsConcepts: [
      'Utility and Marginal Utility',
      'Diminishing Marginal Utility',
      'Budget Constraints',
      'Opportunity Cost',
      'Consumer Surplus',
    ],
    
    personalFinanceConnection: {
      description: 'Apply utility theory to your own spending decisions. Understand why the first slice of pizza brings more joy than the fifth, and how to allocate your limited budget for maximum happiness.',
      relatedPFModules: ['Spending Priorities', 'Needs vs. Wants'],
    },
    
    investingConnection: [
      'Consumer behavior drives company revenues',
      'Brand loyalty and switching costs',
      'Behavioral economics in markets',
    ],
    
    careerExposure: [
      {
        title: 'Consumer Insights Analyst',
        description: 'Study consumer behavior and preferences to help companies develop products and marketing strategies.',
        salaryRange: '$55,000 - $90,000',
        skills: ['Survey Design', 'Data Analysis', 'Behavioral Research'],
      },
      {
        title: 'Behavioral Economist',
        description: 'Apply psychological insights to economic models, helping organizations understand real-world decision-making.',
        salaryRange: '$75,000 - $140,000',
        skills: ['Research Design', 'Statistical Analysis', 'Psychology'],
      },
    ],
    
    lessons: [
      {
        id: 'micro-3-lesson-1',
        title: 'Understanding Utility',
        estimatedMinutes: 13,
        intro: {
          hook: 'Why does the first slice of pizza taste amazing but the fifth feels like a chore? Why do you feel happier buying something you really want versus something you kind of want? Economics has a word for this: utility.',
          philMessage: 'Utility is just a fancy word for satisfaction or happiness! Economists use it to understand why we make the choices we do. Trust me, once you understand utility, you\'ll make better decisions about everything!',
        },
        coreConcepts: [
          {
            title: 'What is Utility?',
            explanation: 'Utility is the satisfaction or benefit a consumer receives from consuming a good or service. It\'s subjective - different people get different utility from the same thing. Economists use utility to explain and predict consumer choices. While we can\'t measure utility precisely, we can compare it: "I get more utility from A than B."',
            example: 'You might get high utility from playing video games, while your friend gets high utility from reading books. Neither is wrong - utility is personal. A coffee lover gets more utility from a latte than someone who hates coffee.',
          },
          {
            title: 'Total Utility vs. Marginal Utility',
            explanation: 'Total utility is the overall satisfaction from consuming a certain quantity of a good. Marginal utility is the ADDITIONAL satisfaction from consuming ONE MORE unit. Marginal utility is crucial for decision-making because we always choose at the margin - should I have one more?',
            example: 'Eating 3 tacos gives you a total utility of, say, 25 "happiness points." The marginal utility of the 3rd taco is how much happiness that specific taco added - maybe 5 points. The first taco might have added 12 points, the second 8 points, and the third only 5.',
          },
          {
            title: 'The Law of Diminishing Marginal Utility',
            explanation: 'This fundamental law states that as you consume more of a good, the additional satisfaction (marginal utility) from each extra unit decreases. The first unit brings the most joy; subsequent units bring less and less. This explains why variety matters and why "too much of a good thing" is real.',
            example: 'First hour of a video game: amazing! Second hour: still great. Third hour: pretty good. Sixth hour: you\'re tired and it\'s not as fun. Tenth hour: you might actually feel worse. Each additional hour provides less marginal utility than the one before.',
          },
        ],
        personalFinanceConnection: {
          description: 'Diminishing marginal utility explains why spreading your money across different purchases often brings more happiness than spending it all on one thing. It also explains why experiences often beat material goods - the utility from experiences tends to diminish more slowly.',
          realWorldExample: 'Instead of buying 5 video games at once (where the 5th game brings little extra joy), buy one game, one concert ticket, one nice dinner, and save the rest. Diversifying your spending maximizes total utility from your budget.',
        },
        flashcards: [
          {
            term: 'Utility',
            definition: 'The satisfaction or benefit a consumer receives from consuming a good or service.',
            philsAnalogy: 'Utility is the happiness I get from eating bamboo. More bamboo = more happiness... up to a point!',
          },
          {
            term: 'Marginal Utility',
            definition: 'The additional satisfaction gained from consuming one more unit of a good or service.',
            philsAnalogy: 'The marginal utility of my 5th bamboo stalk is how much EXTRA happiness that specific stalk brings. Spoiler: it\'s less than the 1st stalk brought!',
          },
          {
            term: 'Law of Diminishing Marginal Utility',
            definition: 'The principle that as consumption increases, the marginal utility from each additional unit decreases.',
            philsAnalogy: 'My first bamboo stalk of the day? AMAZING! My 50th? Meh. That\'s diminishing marginal utility - each extra stalk brings less joy.',
          },
          {
            term: 'Total Utility',
            definition: 'The overall satisfaction received from consuming a given quantity of a good or service.',
            philsAnalogy: 'Total utility is ALL the happiness from ALL the bamboo I\'ve eaten today. It keeps rising, but slower and slower with each stalk.',
          },
        ],
        quiz: [
          {
            question: 'What does "utility" mean in economics?',
            options: [
              'The usefulness of a product',
              'The satisfaction or benefit from consuming something',
              'The price of a good',
              'The electricity bill',
            ],
            correctIndex: 1,
            explanation: 'In economics, utility refers to the satisfaction, happiness, or benefit a consumer receives from consuming a good or service. It\'s subjective and varies by person.',
          },
          {
            question: 'According to the Law of Diminishing Marginal Utility:',
            options: [
              'More consumption always makes you happier',
              'Each additional unit provides less additional satisfaction',
              'Prices always decrease over time',
              'Total utility decreases with consumption',
            ],
            correctIndex: 1,
            explanation: 'Diminishing marginal utility means each additional unit brings less extra satisfaction than the previous one. Total utility can still increase, just at a decreasing rate.',
          },
          {
            question: 'If your total utility from 3 pizzas is 30 and from 4 pizzas is 35, the marginal utility of the 4th pizza is:',
            options: [
              '35',
              '30',
              '5',
              '4',
            ],
            correctIndex: 2,
            explanation: 'Marginal utility is the ADDITIONAL utility from one more unit. Going from 3 to 4 pizzas increased total utility from 30 to 35, so marginal utility = 35 - 30 = 5.',
          },
        ],
      },
      {
        id: 'micro-3-lesson-2',
        title: 'Budget Constraints & Choices',
        estimatedMinutes: 14,
        intro: {
          hook: 'You want the new iPhone AND a vacation AND a new wardrobe AND to save for retirement. But your paycheck has limits. How do you decide what to buy? Welcome to the world of budget constraints!',
          philMessage: 'Here\'s the sad truth: we can\'t have everything we want. But here\'s the good news: economics teaches us how to get the MOST satisfaction from what we CAN afford. It\'s all about smart trade-offs!',
        },
        coreConcepts: [
          {
            title: 'The Budget Constraint',
            explanation: 'A budget constraint shows all the combinations of goods a consumer can afford given their income and the prices of goods. It\'s a line on a graph where any point on or below the line is affordable, and any point above is not. Your budget forces you to make trade-offs.',
            example: 'If you have $100 and pizzas cost $10 while movies cost $20, you could buy 10 pizzas (and 0 movies), or 5 movies (and 0 pizzas), or 4 pizzas and 3 movies, etc. The budget constraint shows all these possibilities.',
          },
          {
            title: 'Opportunity Cost Revisited',
            explanation: 'Because of budget constraints, every purchase has an opportunity cost - what you give up to get it. The opportunity cost of buying something isn\'t just the money; it\'s the best alternative you could have bought with that money. Smart consumers always consider opportunity costs.',
            example: 'The opportunity cost of a $60 video game isn\'t just $60 - it\'s the dinner out, the new shirt, or the savings you could have had instead. If the game brings more utility than those alternatives, buy it. If not, don\'t.',
          },
          {
            title: 'How Budget Constraints Change',
            explanation: 'Your budget constraint shifts when income or prices change. Higher income shifts the constraint outward (you can afford more). Lower prices of goods also expand what you can afford. Conversely, lower income or higher prices shrink your options.',
            example: 'A raise from $3,000 to $4,000/month shifts your entire budget constraint outward - you can now afford more of everything. If rent increases by $500, your constraint shifts inward for all other goods because less money remains after rent.',
          },
          {
            title: 'Making Choices Within Constraints',
            explanation: 'Rational consumers try to maximize their total utility within their budget constraint. This means finding the combination of goods that brings the most satisfaction given what you can afford. It\'s not about buying the cheapest things - it\'s about buying the right mix.',
            example: 'With $200 for entertainment, you might maximize utility with 2 concert tickets ($80), 3 months of streaming ($45), and 5 movie rentals ($25), saving $50. This mix might bring more total utility than spending all $200 on concerts alone.',
          },
        ],
        personalFinanceConnection: {
          description: 'Your budget is literally a budget constraint! Understanding this concept helps you see that budgeting isn\'t about deprivation - it\'s about maximizing happiness within your means. Every spending category competes with others for your limited dollars.',
          realWorldExample: 'Create a "utility-based budget." Instead of arbitrary categories, ask: "What spending brings me the most joy per dollar?" You might find that cutting a rarely-used gym membership ($50/month) to fund more social dinners brings more total utility.',
        },
        flashcards: [
          {
            term: 'Budget Constraint',
            definition: 'A graphical representation of all combinations of goods a consumer can afford given their income and prices.',
            philsAnalogy: 'My bamboo budget is my constraint. I can have lots of cheap bamboo OR a little premium bamboo, but not unlimited amounts of both!',
          },
          {
            term: 'Opportunity Cost',
            definition: 'The value of the best alternative foregone when making a choice.',
            philsAnalogy: 'If I spend my bamboo budget on snacks, I can\'t buy a bamboo bed. The bed is my opportunity cost of choosing snacks!',
          },
          {
            term: 'Trade-off',
            definition: 'The exchange of one thing for another, especially relinquishing one benefit for another.',
            philsAnalogy: 'More bamboo snacks means less bamboo furniture. That\'s the trade-off I face with my limited bamboo budget!',
          },
        ],
        quiz: [
          {
            question: 'What does a budget constraint show?',
            options: [
              'How much debt you can take on',
              'All combinations of goods you can afford given income and prices',
              'The minimum you must spend',
              'Government spending limits',
            ],
            correctIndex: 1,
            explanation: 'A budget constraint illustrates all the different combinations of goods and services a consumer can purchase given their limited income and the prices of those goods.',
          },
          {
            question: 'If your income increases while prices stay the same, your budget constraint:',
            options: [
              'Shifts inward (you can afford less)',
              'Shifts outward (you can afford more)',
              'Stays the same',
              'Becomes vertical',
            ],
            correctIndex: 1,
            explanation: 'Higher income expands your purchasing power, shifting the budget constraint outward. You can now afford more of all goods.',
          },
          {
            question: 'The opportunity cost of buying a $50 sweater is:',
            options: [
              'Exactly $50',
              'The best alternative use of that $50',
              'The sales tax on the sweater',
              'Nothing, because you wanted the sweater',
            ],
            correctIndex: 1,
            explanation: 'Opportunity cost is what you give up - the best alternative. It\'s not just the money, but what that money could have bought instead (dinner out, savings, etc.).',
          },
          {
            question: 'A rational consumer tries to:',
            options: [
              'Spend as little as possible',
              'Buy the most expensive items',
              'Maximize total utility within their budget constraint',
              'Ignore prices completely',
            ],
            correctIndex: 2,
            explanation: 'Rational consumers aim to get the most satisfaction (utility) possible from their limited budget. This means finding the optimal mix of goods, not just spending less or more.',
          },
        ],
      },
      {
        id: 'micro-3-lesson-3',
        title: 'Maximizing Utility',
        estimatedMinutes: 15,
        intro: {
          hook: 'How do you know if you\'re spending your money in the best possible way? There\'s actually a mathematical rule that tells you when you\'ve achieved maximum happiness from your budget!',
          philMessage: 'Get ready for the utility maximization rule! It sounds fancy, but it\'s actually super intuitive once you understand it. This is the secret formula for getting the most bang for your buck!',
        },
        coreConcepts: [
          {
            title: 'Marginal Utility per Dollar',
            explanation: 'To compare how much satisfaction different goods provide relative to their cost, we calculate marginal utility per dollar (MU/P). This tells us the "happiness per dollar" from each good. A good with higher MU/P gives you more satisfaction per dollar spent.',
            example: 'If a $10 meal gives you 50 utility points, MU/P = 5. If a $20 concert ticket gives you 80 utility points, MU/P = 4. The meal gives more utility per dollar, even though the concert gives more total utility.',
          },
          {
            title: 'The Utility Maximization Rule',
            explanation: 'You maximize utility when the marginal utility per dollar is EQUAL across all goods you buy. If MU/P is higher for one good, you should buy more of it (and less of others) until they equalize. Mathematically: MU₁/P₁ = MU₂/P₂ = MU₃/P₃ for all goods.',
            example: 'If coffee gives you 10 MU/$ and donuts give you 15 MU/$, you\'re not maximizing! Buy more donuts (which lowers their MU due to diminishing returns) and less coffee (which raises its MU) until both equal, say, 12 MU/$.',
          },
          {
            title: 'Why This Rule Works',
            explanation: 'If MU/P is higher for good A than good B, you can increase total utility by shifting a dollar from B to A. You lose less utility from B than you gain from A. Only when MU/P is equal everywhere is there no way to improve - you\'ve maximized!',
            example: 'Imagine MU/P for tacos is 8 and for burritos is 5. Spending $1 less on burritos loses 5 utility, but spending that $1 on tacos gains 8 utility. Net gain: 3 utility! Keep shifting until MU/P equalizes.',
          },
          {
            title: 'Applying the Rule in Real Life',
            explanation: 'While we don\'t calculate exact utility numbers in real life, the principle guides good decisions. Ask yourself: "Am I getting equal satisfaction per dollar across my spending?" If one category feels like a waste while another feels valuable, reallocate!',
            example: 'If you\'re paying $150/month for a gym you rarely use (low MU/$) but wish you could afford more dinners with friends (high MU/$), the utility maximization rule says: cancel the gym and reallocate to social dining!',
          },
        ],
        personalFinanceConnection: {
          description: 'The utility maximization rule is the theoretical foundation for mindful spending. It explains why you should cut spending that brings little joy and redirect to what matters most. It\'s not about spending less - it\'s about spending smarter.',
          realWorldExample: 'Review your subscriptions through the MU/$ lens. Netflix at $15/month that you watch daily? High MU/$. A magazine subscription you never read at $10/month? Low MU/$. Cancel the magazine and maybe upgrade to Netflix premium - you\'ll be happier!',
        },
        flashcards: [
          {
            term: 'Marginal Utility per Dollar (MU/P)',
            definition: 'The additional satisfaction received per dollar spent on a good, calculated as marginal utility divided by price.',
            philsAnalogy: 'If premium bamboo costs $5 and gives me 25 happiness points, that\'s 5 happiness per dollar. Regular bamboo at $1 for 4 points is only 4 happiness per dollar. Premium wins!',
          },
          {
            term: 'Utility Maximization Rule',
            definition: 'The principle that utility is maximized when the marginal utility per dollar is equal across all goods purchased.',
            philsAnalogy: 'I should keep buying more premium bamboo until its MU/$ drops to equal regular bamboo\'s MU/$. That\'s when I\'m getting the most happiness from my bamboo budget!',
          },
          {
            term: 'Consumer Equilibrium',
            definition: 'The state where a consumer has allocated their budget to maximize total utility, with MU/P equal across all goods.',
            philsAnalogy: 'When I can\'t make myself happier by switching any spending around, I\'ve reached consumer equilibrium. Perfect bamboo balance!',
          },
        ],
        quiz: [
          {
            question: 'If Good A has MU/P of 10 and Good B has MU/P of 6, you should:',
            options: [
              'Buy more of Good B',
              'Buy more of Good A',
              'Buy equal amounts of both',
              'Stop buying both',
            ],
            correctIndex: 1,
            explanation: 'Good A gives more utility per dollar, so buying more of it (and less of B) increases total utility. Continue until MU/P equalizes across goods.',
          },
          {
            question: 'According to the utility maximization rule, you\'ve optimized your spending when:',
            options: [
              'You\'ve spent all your money',
              'MU/P is equal for all goods you buy',
              'You\'ve bought the cheapest options',
              'Total utility equals total spending',
            ],
            correctIndex: 1,
            explanation: 'Maximum utility occurs when marginal utility per dollar is equal across all purchases. At this point, no reallocation can increase total satisfaction.',
          },
          {
            question: 'Why does buying more of a good eventually lower its MU/P?',
            options: [
              'Prices always increase',
              'Diminishing marginal utility reduces MU while price stays constant',
              'Sellers raise prices for frequent buyers',
              'The government taxes high consumption',
            ],
            correctIndex: 1,
            explanation: 'Due to diminishing marginal utility, each additional unit provides less satisfaction. Since MU falls while P stays constant, MU/P decreases.',
          },
          {
            question: 'You pay $100/month for a gym you visit twice. Your friend pays $100/month for a gym they visit daily. Who has higher MU/P from the gym?',
            options: [
              'You do',
              'Your friend does',
              'It\'s equal since the price is the same',
              'Cannot be determined',
            ],
            correctIndex: 1,
            explanation: 'Your friend gets much more utility (satisfaction from frequent use) for the same price, so their MU/P is higher. You might want to reconsider your membership!',
          },
        ],
        careerSpotlight: {
          title: 'Consumer Behavior Analyst',
          description: 'Consumer behavior analysts study how people make purchasing decisions, applying concepts like utility maximization to help companies understand their customers and design better products and marketing strategies.',
          salaryRange: '$55,000 - $95,000',
          skills: ['Psychology', 'Data Analysis', 'Market Research', 'Statistical Modeling'],
        },
      },
      {
        id: 'micro-3-lesson-4',
        title: 'Consumer Surplus & Value',
        estimatedMinutes: 12,
        intro: {
          hook: 'Have you ever bought something and thought, "Wow, I would have paid way more for this!"? That feeling of getting a deal has a name in economics, and it\'s a measure of how well markets serve consumers.',
          philMessage: 'Consumer surplus is like finding money you didn\'t know you had! It\'s the difference between what you\'d be willing to pay and what you actually pay. Markets create this surplus every single day!',
        },
        coreConcepts: [
          {
            title: 'Willingness to Pay',
            explanation: 'Willingness to pay (WTP) is the maximum amount a consumer would pay for a good or service. It reflects the utility or value they place on it. Different consumers have different WTPs for the same product based on their preferences, income, and circumstances.',
            example: 'For a cold water bottle on a hot day, a dehydrated hiker might be willing to pay $10, a casual walker $3, and someone with a full cooler $0.50. Same product, vastly different WTPs based on circumstances.',
          },
          {
            title: 'What is Consumer Surplus?',
            explanation: 'Consumer surplus is the difference between what consumers are willing to pay and what they actually pay. It represents the "bonus" value consumers receive from market transactions. On a graph, it\'s the area between the demand curve and the market price.',
            example: 'If you\'d pay up to $80 for concert tickets but get them for $50, your consumer surplus is $30. You received $30 worth of value "for free." Multiply this across millions of transactions and markets create enormous consumer surplus.',
          },
          {
            title: 'Consumer Surplus and Market Efficiency',
            explanation: 'Markets are considered efficient partly because they maximize total surplus (consumer surplus plus producer surplus). When markets work well, goods flow to those who value them most, and consumer surplus is maximized. Market distortions (like price controls) typically reduce consumer surplus.',
            example: 'At equilibrium price, everyone who values the good more than the price gets to buy it, earning surplus. If the government caps prices below equilibrium, shortages occur - some high-WTP consumers can\'t buy at all, destroying their potential surplus.',
          },
          {
            title: 'How Prices Affect Consumer Surplus',
            explanation: 'Lower prices increase consumer surplus because the gap between WTP and price widens for existing buyers, AND more consumers can now afford to buy. Higher prices decrease consumer surplus. This is why consumers generally prefer lower prices and competitive markets.',
            example: 'When streaming services have a price war and Netflix drops from $15 to $10, existing subscribers gain $5 in surplus each, and new subscribers who wouldn\'t pay $15 but will pay $10 also gain surplus. Total consumer surplus increases.',
          },
        ],
        personalFinanceConnection: {
          description: 'Maximizing consumer surplus is about finding the biggest gap between value and price. This means buying things you truly value at the lowest possible price. It\'s not about buying cheap things - it\'s about getting great deals on things you really want.',
          realWorldExample: 'A $200 jacket on sale for $100 gives you $100 surplus IF you\'d truly pay $200 for it. But a $50 jacket you don\'t really want, even at $25, gives you little surplus because your WTP was low. Focus on deals for things you genuinely value highly.',
        },
        flashcards: [
          {
            term: 'Willingness to Pay (WTP)',
            definition: 'The maximum amount a consumer would pay for a good or service, reflecting the value they place on it.',
            philsAnalogy: 'My WTP for premium bamboo is $10 per stalk because that\'s how much I value it. If it costs less, I\'m thrilled!',
          },
          {
            term: 'Consumer Surplus',
            definition: 'The difference between what consumers are willing to pay and what they actually pay, representing the extra value they receive.',
            philsAnalogy: 'If I\'d pay $10 for bamboo but it only costs $3, my consumer surplus is $7. That\'s $7 of happiness I got "for free"!',
          },
          {
            term: 'Market Efficiency',
            definition: 'A state where resources are allocated to maximize total surplus (consumer plus producer surplus) in the economy.',
            philsAnalogy: 'An efficient bamboo market gets bamboo to the pandas who want it most at prices that work for farmers too. Everyone wins!',
          },
        ],
        quiz: [
          {
            question: 'If you would pay up to $50 for a product but buy it for $35, your consumer surplus is:',
            options: [
              '$50',
              '$35',
              '$15',
              '$85',
            ],
            correctIndex: 2,
            explanation: 'Consumer surplus = Willingness to Pay - Actual Price = $50 - $35 = $15. This is the extra value you received beyond what you paid.',
          },
          {
            question: 'When market prices decrease, consumer surplus generally:',
            options: [
              'Decreases',
              'Increases',
              'Stays the same',
              'Becomes negative',
            ],
            correctIndex: 1,
            explanation: 'Lower prices widen the gap between WTP and price for existing buyers and allow new buyers to enter the market. Both effects increase total consumer surplus.',
          },
          {
            question: 'Two people buy the same $20 shirt. Person A would have paid $50, Person B would have paid $25. Who has more consumer surplus?',
            options: [
              'Person A ($30 surplus)',
              'Person B ($5 surplus)',
              'They have equal surplus',
              'Neither has surplus',
            ],
            correctIndex: 0,
            explanation: 'Person A\'s surplus is $50 - $20 = $30. Person B\'s surplus is $25 - $20 = $5. Person A values the shirt more and thus gains more surplus from the purchase.',
          },
          {
            question: 'Consumer surplus is maximized when:',
            options: [
              'Prices are as high as possible',
              'Everyone pays their maximum willingness to pay',
              'Markets are competitive and prices reflect supply and demand',
              'The government sets prices',
            ],
            correctIndex: 2,
            explanation: 'Competitive markets with prices at equilibrium maximize total surplus. Goods go to those who value them most, and the gap between WTP and price creates consumer surplus.',
          },
        ],
      },
    ],
    
    gamifiedActivity: {
      id: 'utility-maximizer',
      title: 'Utility Maximizer',
      description: 'Given a budget, allocate spending across different goods to maximize your total utility. Watch out for diminishing returns!',
      instructions: [
        'Receive a virtual budget',
        'Choose how much to spend on each category',
        'See your utility score update in real-time',
        'Find the optimal allocation',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'micro-2-elasticity',
    },
  },
  
  {
    id: 'micro-4-market-structures',
    track: 'microeconomics',
    title: 'Market Structures',
    description: 'Compare different types of markets from perfect competition to monopoly. Understand how market structure affects prices, innovation, and consumer welfare.',
    icon: '🏢',
    order: 4,
    
    coreEconomicsConcepts: [
      'Perfect Competition',
      'Monopoly',
      'Oligopoly',
      'Monopolistic Competition',
      'Barriers to Entry',
    ],
    
    personalFinanceConnection: {
      description: 'Recognize when you\'re dealing with a monopoly (utilities) vs. competitive markets (groceries). This knowledge helps you understand pricing power and find alternatives.',
      relatedPFModules: ['Comparing Prices', 'Utility Bills'],
    },
    
    investingConnection: [
      'Competitive advantage and moats',
      'Antitrust regulation risks',
      'Industry concentration trends',
    ],
    
    careerExposure: [
      {
        title: 'Antitrust Economist',
        description: 'Analyze market competition for government agencies or law firms in merger reviews and antitrust cases.',
        salaryRange: '$90,000 - $180,000',
        skills: ['Economic Modeling', 'Legal Analysis', 'Market Definition'],
      },
      {
        title: 'Strategy Consultant',
        description: 'Help companies understand their competitive position and develop strategies to gain market share.',
        salaryRange: '$85,000 - $160,000',
        skills: ['Industry Analysis', 'Competitive Strategy', 'Business Development'],
      },
    ],
    
    lessons: [
      {
        id: 'micro-4-lesson-1',
        title: 'Introduction to Market Structures',
        estimatedMinutes: 13,
        intro: {
          hook: 'Why can your local utility company charge whatever it wants while restaurants compete fiercely for your business? The answer lies in market structure - the competitive landscape that shapes how businesses behave.',
          philMessage: 'Not all markets are created equal! Some have tons of competitors, others have just one big player. Understanding market structure helps you see why some industries have low prices and innovation while others seem stuck. Let\'s explore!',
        },
        coreConcepts: [
          {
            title: 'What is Market Structure?',
            explanation: 'Market structure describes the competitive environment in which firms operate. It\'s determined by factors like the number of sellers, how similar their products are, how easy it is to enter the market, and how much control firms have over prices. Different structures lead to very different outcomes for consumers and businesses.',
            example: 'The smartphone market (few big players, differentiated products) has a very different structure than the wheat market (many farmers, identical product). This explains why Apple can charge premium prices while wheat farmers must accept market prices.',
          },
          {
            title: 'The Four Main Market Structures',
            explanation: 'Economists identify four main market structures: Perfect Competition (many sellers, identical products), Monopolistic Competition (many sellers, differentiated products), Oligopoly (few sellers, significant market power), and Monopoly (one seller, no competition). Real markets fall somewhere on this spectrum.',
            example: 'Agriculture is close to perfect competition. Restaurants and clothing stores are monopolistic competition. Airlines and cell phone carriers are oligopolies. Your local water company is likely a monopoly.',
          },
          {
            title: 'Key Characteristics That Define Structure',
            explanation: 'Four key factors determine market structure: (1) Number of firms - from one to many, (2) Product differentiation - identical vs. unique products, (3) Barriers to entry - how hard it is for new firms to enter, (4) Price-making power - whether firms can set prices or must accept market prices.',
            example: 'A hot dog stand has many competitors, sells similar products, faces low barriers (anyone can start one), and has little pricing power. A pharmaceutical company with a patented drug has no competitors for that drug, a unique product, high barriers (patents, R&D costs), and significant pricing power.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding market structure helps you know when you have bargaining power as a consumer. In competitive markets, you can shop around for deals. In monopolistic markets, you have fewer options and may need to accept higher prices or seek alternatives.',
          realWorldExample: 'Internet service in many areas is an oligopoly or local monopoly - you might have only 1-2 options. This explains high prices and poor service. But streaming services are more competitive, which is why they offer free trials and competitive pricing. Know your market!',
        },
        flashcards: [
          {
            term: 'Market Structure',
            definition: 'The competitive characteristics of a market, including number of firms, product differentiation, barriers to entry, and pricing power.',
            philsAnalogy: 'Market structure is like the rules of the game. Some bamboo markets have lots of sellers competing (good for me!), others have just one seller who can charge whatever they want (bad for me!).',
          },
          {
            term: 'Barriers to Entry',
            definition: 'Obstacles that make it difficult for new firms to enter a market, such as high startup costs, patents, or regulations.',
            philsAnalogy: 'If starting a bamboo farm requires millions of dollars and special permits, that\'s a high barrier. If anyone can plant bamboo in their backyard, barriers are low!',
          },
          {
            term: 'Price-Making Power',
            definition: 'The ability of a firm to influence the market price of its product rather than accepting the prevailing market price.',
            philsAnalogy: 'If I\'m the only panda selling bamboo smoothies, I can set any price I want - that\'s pricing power! If there are 100 smoothie stands, I have to match their prices.',
          },
        ],
        quiz: [
          {
            question: 'Which factor is NOT a key determinant of market structure?',
            options: [
              'Number of firms in the market',
              'The color of the company\'s logo',
              'Barriers to entry',
              'Product differentiation',
            ],
            correctIndex: 1,
            explanation: 'Market structure is determined by number of firms, product differentiation, barriers to entry, and pricing power. Logo color has no effect on competitive dynamics.',
          },
          {
            question: 'A market with many sellers offering identical products and low barriers to entry is:',
            options: [
              'A monopoly',
              'An oligopoly',
              'Perfect competition',
              'Monopolistic competition',
            ],
            correctIndex: 2,
            explanation: 'Perfect competition is characterized by many sellers, identical products, low barriers to entry, and no individual firm having pricing power.',
          },
          {
            question: 'Why do firms in competitive markets have less pricing power?',
            options: [
              'The government controls their prices',
              'Consumers can easily switch to competitors offering similar products',
              'They choose not to raise prices',
              'Their costs are lower',
            ],
            correctIndex: 1,
            explanation: 'When many competitors offer similar products, raising prices above the market level causes customers to switch to alternatives. Competition limits pricing power.',
          },
        ],
      },
      {
        id: 'micro-4-lesson-2',
        title: 'Perfect Competition',
        estimatedMinutes: 14,
        intro: {
          hook: 'Imagine a market so competitive that no single seller can influence the price at all. Sounds like a consumer\'s paradise, right? Welcome to perfect competition - the economist\'s ideal benchmark!',
          philMessage: 'Perfect competition is like the "gold standard" of markets. It\'s rare in the real world, but understanding it helps us see how competition benefits consumers and what happens when markets fall short of this ideal!',
        },
        coreConcepts: [
          {
            title: 'Characteristics of Perfect Competition',
            explanation: 'Perfect competition has four key features: (1) Many buyers and sellers - no one can influence the market, (2) Identical products - consumers see no difference between sellers, (3) Perfect information - everyone knows all prices and quality, (4) Free entry and exit - no barriers to entering or leaving the market.',
            example: 'Agricultural commodity markets come closest to perfect competition. Thousands of wheat farmers sell identical wheat. Buyers don\'t care which farm it came from. Price information is public. Anyone can start or stop farming.',
          },
          {
            title: 'Price Takers',
            explanation: 'In perfect competition, firms are "price takers" - they must accept the market price determined by overall supply and demand. If they charge more, customers go elsewhere. Charging less just loses money since they could sell at the market price. Individual firms have zero pricing power.',
            example: 'A corn farmer can\'t decide to charge $10/bushel when the market price is $5. No one would buy from them. They also wouldn\'t charge $4 when they could get $5. They simply accept the market price and decide how much to produce.',
          },
          {
            title: 'Long-Run Equilibrium',
            explanation: 'In perfect competition, economic profits attract new firms, increasing supply and pushing prices down. Losses cause firms to exit, reducing supply and pushing prices up. In the long run, firms earn zero economic profit - just enough to stay in business. This is efficient but not very exciting for business owners!',
            example: 'If tomato farming becomes very profitable, new farmers enter, tomato supply increases, and prices fall until profits return to normal. If it becomes unprofitable, farmers switch to other crops until prices recover. The market self-corrects.',
          },
          {
            title: 'Efficiency of Perfect Competition',
            explanation: 'Perfect competition achieves both productive efficiency (goods produced at lowest cost) and allocative efficiency (resources go where they\'re valued most). Prices equal marginal cost, and consumer surplus is maximized. It\'s the benchmark against which we judge other market structures.',
            example: 'In a perfectly competitive egg market, eggs are produced at the lowest possible cost (productive efficiency), and the price reflects exactly what it costs to produce one more egg (allocative efficiency). No resources are wasted.',
          },
        ],
        personalFinanceConnection: {
          description: 'As a consumer, you benefit most from markets that approach perfect competition. Look for markets with many sellers and similar products - that\'s where you\'ll find the best prices and have the most bargaining power.',
          realWorldExample: 'Generic medications are closer to perfect competition than brand-name drugs. Once patents expire, many manufacturers make identical products, prices plummet, and consumers win. Always ask your pharmacist about generic alternatives!',
        },
        flashcards: [
          {
            term: 'Perfect Competition',
            definition: 'A market structure with many buyers and sellers, identical products, perfect information, and free entry/exit, where no firm can influence the market price.',
            philsAnalogy: 'Imagine a bamboo market with thousands of sellers, all selling identical bamboo, and I know every price instantly. No seller can overcharge me - that\'s perfect competition!',
          },
          {
            term: 'Price Taker',
            definition: 'A firm that must accept the prevailing market price and cannot influence it through its own actions.',
            philsAnalogy: 'A bamboo farmer in a perfectly competitive market is a price taker. They look at the market price and say "I guess that\'s what I\'m charging today!"',
          },
          {
            term: 'Zero Economic Profit',
            definition: 'The long-run outcome in perfect competition where firms earn just enough to cover all costs, including opportunity costs, but no more.',
            philsAnalogy: 'In the long run, bamboo farmers make just enough to keep farming - no windfall profits. If they made more, new farmers would enter and compete away the profits!',
          },
        ],
        quiz: [
          {
            question: 'In perfect competition, why can\'t a firm charge above the market price?',
            options: [
              'It\'s illegal',
              'Customers would buy from competitors selling identical products',
              'The government sets maximum prices',
              'Firms agree not to compete on price',
            ],
            correctIndex: 1,
            explanation: 'With many sellers offering identical products and perfect information, any firm charging above market price would lose all customers to competitors.',
          },
          {
            question: 'What happens in perfect competition when firms are earning economic profits?',
            options: [
              'Prices increase further',
              'New firms enter, supply increases, and profits fall to zero',
              'Existing firms leave the market',
              'The government intervenes',
            ],
            correctIndex: 1,
            explanation: 'Profits attract new entrants. More firms mean more supply, which pushes prices down until economic profits disappear. This is the self-correcting nature of competitive markets.',
          },
          {
            question: 'Which market is CLOSEST to perfect competition?',
            options: [
              'Smartphone manufacturing',
              'Commodity wheat trading',
              'Luxury car sales',
              'Cable TV providers',
            ],
            correctIndex: 1,
            explanation: 'Wheat is a standardized commodity with many producers, public pricing, and relatively easy entry/exit. The other markets have differentiated products, few sellers, or high barriers.',
          },
          {
            question: 'Perfect competition is considered efficient because:',
            options: [
              'Firms make the highest possible profits',
              'Prices equal marginal cost and resources are optimally allocated',
              'There is no competition',
              'The government controls production',
            ],
            correctIndex: 1,
            explanation: 'Perfect competition achieves allocative efficiency (price = marginal cost) and productive efficiency (lowest cost production), maximizing total surplus in the economy.',
          },
        ],
      },
      {
        id: 'micro-4-lesson-3',
        title: 'Monopoly',
        estimatedMinutes: 15,
        intro: {
          hook: 'What if there was only ONE seller of something you needed? No competition, no alternatives, no bargaining power. That\'s a monopoly - and understanding them helps you recognize when markets aren\'t working for consumers.',
          philMessage: 'Monopolies are the opposite extreme from perfect competition. One seller, total control. They\'re not always evil - sometimes they make sense - but they definitely change the game for consumers. Let\'s see how!',
        },
        coreConcepts: [
          {
            title: 'What is a Monopoly?',
            explanation: 'A monopoly exists when a single firm is the only seller in a market with no close substitutes. The monopolist IS the market - they face the entire market demand curve. This gives them significant power over price and quantity, unlike firms in competitive markets.',
            example: 'Your local water utility is likely a monopoly - there\'s only one company providing tap water, and you can\'t easily substitute bottled water for all your needs. They\'re the only game in town.',
          },
          {
            title: 'Sources of Monopoly Power',
            explanation: 'Monopolies arise from barriers to entry: (1) Control of key resources (DeBeers and diamonds), (2) Government-granted rights like patents and licenses, (3) Natural monopoly - when one firm can serve the market at lower cost than multiple firms (utilities), (4) Network effects and economies of scale.',
            example: 'Pharmaceutical patents create temporary monopolies - only one company can sell a new drug for 20 years. Utility monopolies exist because building duplicate water pipes or power lines would be wasteful and expensive.',
          },
          {
            title: 'Monopoly Pricing and Output',
            explanation: 'Monopolists maximize profit by producing where marginal revenue equals marginal cost, then charging the highest price consumers will pay for that quantity. This results in higher prices and lower output than perfect competition. The monopolist restricts supply to keep prices high.',
            example: 'If a monopolist could sell 100 units at $10 or 80 units at $15, they might choose 80 units because total revenue is higher ($1,200 vs $1,000). Consumers who would have bought at $10-$14 are left out.',
          },
          {
            title: 'The Costs of Monopoly',
            explanation: 'Monopolies create deadweight loss - transactions that would benefit both buyers and sellers don\'t happen because of artificially high prices. Consumer surplus shrinks as monopolists capture more value. There may also be less innovation since monopolists face no competitive pressure.',
            example: 'If a life-saving drug costs $1 to make but the monopolist charges $1,000, many patients who would pay $100-$900 can\'t afford it. Those beneficial transactions don\'t occur - that\'s deadweight loss. Society loses.',
          },
        ],
        personalFinanceConnection: {
          description: 'Recognizing monopolies helps you understand why some prices seem unfairly high and why you have little negotiating power. In monopoly markets, focus on reducing consumption, finding imperfect substitutes, or advocating for regulation.',
          realWorldExample: 'If your area has only one internet provider (a local monopoly), you can\'t negotiate much. Options include: using mobile data as a partial substitute, reducing usage, moving to an area with competition, or supporting policies that increase competition.',
        },
        flashcards: [
          {
            term: 'Monopoly',
            definition: 'A market structure with a single seller of a product with no close substitutes, giving the firm significant market power.',
            philsAnalogy: 'If I were the only panda selling bamboo smoothies in the entire world, I\'d be a monopolist. I could charge whatever I want because you can\'t get smoothies anywhere else!',
          },
          {
            term: 'Deadweight Loss',
            definition: 'The loss of economic efficiency when the equilibrium outcome is not achieved, such as when monopolists restrict output to raise prices.',
            philsAnalogy: 'If I charge so much for smoothies that some pandas who would happily pay a fair price can\'t afford them, those lost sales are deadweight loss. Everyone loses!',
          },
          {
            term: 'Natural Monopoly',
            definition: 'A monopoly that arises because a single firm can supply the entire market at a lower cost than multiple competing firms.',
            philsAnalogy: 'Building one set of bamboo pipes to every home makes sense. Building three competing pipe systems would be wasteful. That\'s why utilities are natural monopolies.',
          },
          {
            term: 'Price Maker',
            definition: 'A firm with the power to set its own price rather than accepting the market price, characteristic of monopolies.',
            philsAnalogy: 'As a monopolist, I\'m a price maker. I look at how much pandas are willing to pay and set my price accordingly. I control the market!',
          },
        ],
        quiz: [
          {
            question: 'What is the PRIMARY source of a monopolist\'s power?',
            options: [
              'Government support',
              'Barriers to entry that prevent competition',
              'Lower costs than competitors',
              'Better advertising',
            ],
            correctIndex: 1,
            explanation: 'Monopoly power comes from barriers that prevent other firms from entering the market. Without barriers, competitors would enter and erode the monopolist\'s power.',
          },
          {
            question: 'Compared to perfect competition, a monopoly typically results in:',
            options: [
              'Lower prices and higher output',
              'Higher prices and lower output',
              'The same prices and output',
              'Lower prices and lower output',
            ],
            correctIndex: 1,
            explanation: 'Monopolists restrict output to raise prices above competitive levels. This maximizes their profit but harms consumers through higher prices and reduced availability.',
          },
          {
            question: 'Which is an example of a natural monopoly?',
            options: [
              'A popular restaurant',
              'A local water utility',
              'A clothing brand',
              'A coffee shop chain',
            ],
            correctIndex: 1,
            explanation: 'Water utilities are natural monopolies because the infrastructure (pipes) has huge fixed costs. One company can serve everyone more cheaply than multiple competing pipe networks.',
          },
          {
            question: 'Deadweight loss from monopoly represents:',
            options: [
              'The monopolist\'s profit',
              'Transactions that would benefit society but don\'t happen due to high prices',
              'The cost of producing goods',
              'Government tax revenue',
            ],
            correctIndex: 1,
            explanation: 'Deadweight loss is the value of trades that would make both buyers and sellers better off but don\'t occur because monopoly prices are too high. It\'s pure economic waste.',
          },
        ],
        careerSpotlight: {
          title: 'Antitrust Economist',
          description: 'Antitrust economists analyze market competition and help government agencies and law firms evaluate mergers, investigate monopolistic behavior, and design remedies to promote competition.',
          salaryRange: '$90,000 - $180,000',
          skills: ['Economic Modeling', 'Market Analysis', 'Legal Knowledge', 'Data Analysis'],
        },
      },
      {
        id: 'micro-4-lesson-4',
        title: 'Oligopoly & Monopolistic Competition',
        estimatedMinutes: 14,
        intro: {
          hook: 'Most real-world markets aren\'t perfectly competitive or pure monopolies - they\'re somewhere in between. Airlines, smartphones, restaurants, and clothing stores all operate in these middle-ground market structures.',
          philMessage: 'Welcome to the real world of markets! Oligopolies and monopolistic competition describe most of the businesses you interact with daily. Understanding them helps you navigate the modern economy!',
        },
        coreConcepts: [
          {
            title: 'Oligopoly: Few Firms, Big Impact',
            explanation: 'An oligopoly is a market dominated by a small number of large firms. Each firm is big enough that its actions affect the others. This creates strategic interdependence - firms must consider how rivals will respond to their decisions. Think of it as a chess game between giants.',
            example: 'The US airline industry is an oligopoly - United, Delta, American, and Southwest dominate. When one airline raises prices, others must decide whether to match (keeping market share) or stay low (stealing customers). Every move is strategic.',
          },
          {
            title: 'Oligopoly Behavior: Competition vs. Collusion',
            explanation: 'Oligopolists can compete aggressively (price wars) or tacitly cooperate (keeping prices high). Explicit collusion (cartels) is usually illegal, but firms may engage in tacit collusion by following price leaders. Game theory helps explain these strategic interactions.',
            example: 'Gas stations on the same corner often have identical prices - not because they\'re colluding, but because if one raises prices, customers go next door, and if one lowers prices, the other must match. They settle on similar prices through strategic interaction.',
          },
          {
            title: 'Monopolistic Competition: Many Firms, Differentiated Products',
            explanation: 'Monopolistic competition features many firms selling similar but differentiated products. Each firm has a tiny bit of monopoly power over its unique version, but faces competition from close substitutes. Entry is relatively easy, so long-run profits are competed away.',
            example: 'Restaurants are monopolistically competitive. Each has a unique menu, atmosphere, and location (differentiation), but there are many restaurants competing for your dining dollars. If one restaurant is too profitable, new ones open nearby.',
          },
          {
            title: 'Product Differentiation and Branding',
            explanation: 'In monopolistic competition, firms compete through product differentiation rather than just price. Branding, quality differences, location, and customer service create perceived uniqueness. This gives firms some pricing power but also requires spending on marketing and innovation.',
            example: 'Shampoo brands (Pantene, Dove, Head & Shoulders) are all basically soap, but differentiation through branding, scents, and claimed benefits lets each charge different prices. Consumers pay more for perceived differences.',
          },
        ],
        personalFinanceConnection: {
          description: 'In oligopolies, prices tend to be stable but high - shop around less frequently but watch for occasional price wars. In monopolistic competition, differentiation often isn\'t worth the premium - generic or store brands may offer similar quality at lower prices.',
          realWorldExample: 'Cell phone carriers (oligopoly) rarely have dramatic price differences - switching may not save much. But for items like over-the-counter medicine (monopolistic competition), the store brand is often identical to the name brand at half the price. Know your market structure!',
        },
        flashcards: [
          {
            term: 'Oligopoly',
            definition: 'A market structure with a small number of large firms whose decisions are interdependent, each considering rivals\' likely responses.',
            philsAnalogy: 'If there are only 3 bamboo sellers and I\'m one of them, I can\'t just set any price. I have to think about what the other 2 will do in response!',
          },
          {
            term: 'Strategic Interdependence',
            definition: 'The situation in oligopoly where each firm\'s optimal decision depends on the decisions of its rivals.',
            philsAnalogy: 'In an oligopoly, it\'s like a game of chess. My best move depends on what I think you\'ll do, and your best move depends on what you think I\'ll do!',
          },
          {
            term: 'Monopolistic Competition',
            definition: 'A market structure with many firms selling differentiated products, with relatively easy entry and exit.',
            philsAnalogy: 'Every bamboo smoothie stand has its own special recipe. We\'re all competing, but each of us is a tiny monopoly over our unique flavor!',
          },
          {
            term: 'Product Differentiation',
            definition: 'Making a product distinct from competitors\' products through branding, quality, features, or other attributes.',
            philsAnalogy: 'My bamboo smoothies have a secret ingredient that makes them special. That differentiation lets me charge a bit more than generic smoothie stands!',
          },
        ],
        quiz: [
          {
            question: 'What makes oligopoly different from monopolistic competition?',
            options: [
              'Oligopolies have more firms',
              'Oligopolies have few firms whose actions are strategically interdependent',
              'Monopolistic competition has higher barriers to entry',
              'Oligopolies sell identical products',
            ],
            correctIndex: 1,
            explanation: 'The key distinction is that oligopolies have few large firms that must consider rivals\' reactions, while monopolistic competition has many small firms that largely ignore individual competitors.',
          },
          {
            question: 'Why might gas stations on the same corner have identical prices?',
            options: [
              'The government sets gas prices',
              'They\'re owned by the same company',
              'Strategic interdependence leads them to match each other\'s prices',
              'Gas is a perfectly competitive market',
            ],
            correctIndex: 2,
            explanation: 'Gas stations in close proximity are in a local oligopoly. If one raises prices, it loses customers. If one lowers prices, others must match. Strategic interaction leads to similar prices.',
          },
          {
            question: 'In monopolistic competition, firms compete primarily through:',
            options: [
              'Being the only seller',
              'Government contracts',
              'Product differentiation and branding',
              'Forming cartels',
            ],
            correctIndex: 2,
            explanation: 'With many competitors selling similar products, firms in monopolistic competition differentiate through branding, quality, features, and marketing to attract customers.',
          },
          {
            question: 'Which industry is the BEST example of an oligopoly?',
            options: [
              'Restaurants',
              'Smartphone operating systems (iOS, Android)',
              'Farmers markets',
              'Hair salons',
            ],
            correctIndex: 1,
            explanation: 'The smartphone OS market is dominated by just two players (Apple and Google) who are strategically interdependent. Restaurants and hair salons have many competitors (monopolistic competition).',
          },
        ],
      },
    ],
    
    gamifiedActivity: {
      id: 'market-structure-tycoon',
      title: 'Market Structure Tycoon',
      description: 'Experience running a business in different market structures. See how your pricing power and profits change based on competition.',
      instructions: [
        'Choose a market structure scenario',
        'Set prices and production levels',
        'Observe competitor responses',
        'Compare profits across structures',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'micro-3-consumer-choice',
    },
  },
  
  {
    id: 'micro-5-market-failures',
    track: 'microeconomics',
    title: 'Market Failures & Government',
    description: 'Discover when markets don\'t work perfectly and how government can step in. Learn about externalities, public goods, and the role of regulation.',
    icon: '⚠️',
    order: 5,
    
    coreEconomicsConcepts: [
      'Externalities (Positive & Negative)',
      'Public Goods',
      'Common Resources',
      'Information Asymmetry',
      'Government Intervention',
    ],
    
    personalFinanceConnection: {
      description: 'Understand why some goods are provided by government (roads, education) and how externalities affect your daily life, from pollution to vaccinations.',
      relatedPFModules: ['Understanding Taxes', 'Public Services'],
    },
    
    investingConnection: [
      'Environmental regulations and ESG investing',
      'Healthcare market dynamics',
      'Government contracts and subsidies',
    ],
    
    careerExposure: [
      {
        title: 'Policy Economist',
        description: 'Analyze the economic impact of government policies and regulations for think tanks or government agencies.',
        salaryRange: '$70,000 - $130,000',
        skills: ['Policy Analysis', 'Economic Modeling', 'Research'],
      },
      {
        title: 'Environmental Economist',
        description: 'Study the economic aspects of environmental issues and help design market-based solutions to pollution.',
        salaryRange: '$65,000 - $120,000',
        skills: ['Cost-Benefit Analysis', 'Environmental Science', 'Regulatory Knowledge'],
      },
    ],
    
    lessons: [
      {
        id: 'micro-5-lesson-1',
        title: 'When Markets Fail',
        estimatedMinutes: 13,
        intro: {
          hook: 'Markets are amazing at allocating resources efficiently - most of the time. But sometimes markets fail spectacularly, producing too much pollution, too little education, or leaving some people without essential services. Why does this happen?',
          philMessage: 'I love free markets, but even I have to admit they\'re not perfect! Market failures are situations where the invisible hand drops the ball. Understanding them helps us know when and how to fix things!',
        },
        coreConcepts: [
          {
            title: 'What is Market Failure?',
            explanation: 'Market failure occurs when free markets fail to allocate resources efficiently, resulting in a loss of economic welfare. The market equilibrium doesn\'t maximize total surplus - too much or too little of something is produced. Market failures justify potential government intervention.',
            example: 'A factory pollutes a river, harming downstream fishermen. The market for the factory\'s products doesn\'t account for this damage, so the factory produces "too much" from society\'s perspective. The market has failed to include all costs.',
          },
          {
            title: 'Types of Market Failure',
            explanation: 'The main types of market failure are: (1) Externalities - costs or benefits affecting third parties, (2) Public goods - goods that are non-excludable and non-rivalrous, (3) Common resources - goods that are rivalrous but non-excludable, (4) Information asymmetry - when one party knows more than another, (5) Market power - monopolies and oligopolies.',
            example: 'Pollution is a negative externality. National defense is a public good. Ocean fish are a common resource. Used car sales involve information asymmetry (sellers know more about the car). Your local cable company may have market power.',
          },
          {
            title: 'Why Markets Fail',
            explanation: 'Markets fail when prices don\'t reflect true social costs and benefits. If a cost (like pollution) isn\'t paid by the producer, they produce too much. If a benefit (like education) isn\'t captured by the provider, they produce too little. Markets need prices to signal value, and when prices are wrong, markets fail.',
            example: 'A coal plant doesn\'t pay for the health problems its pollution causes - that cost is external to their business. So coal appears cheaper than it really is, and we use too much of it. The price signal is wrong.',
          },
        ],
        personalFinanceConnection: {
          description: 'Market failures affect your daily life and finances. You breathe polluted air (negative externality), benefit from public education (positive externality), and may face information asymmetry when buying used cars or health insurance. Understanding these helps you navigate and advocate for better policies.',
          realWorldExample: 'When buying a used car, you face information asymmetry - the seller knows the car\'s history better than you. Protect yourself by getting a vehicle history report, having a mechanic inspect it, and buying from reputable dealers who offer warranties.',
        },
        flashcards: [
          {
            term: 'Market Failure',
            definition: 'A situation where free markets fail to allocate resources efficiently, resulting in a net loss of economic welfare.',
            philsAnalogy: 'Market failure is when the bamboo market produces the wrong amount - maybe too much low-quality bamboo that harms the forest, or too little bamboo education for young pandas!',
          },
          {
            term: 'Externality',
            definition: 'A cost or benefit that affects a party who did not choose to incur that cost or benefit, not reflected in market prices.',
            philsAnalogy: 'If my bamboo smoothie stand is really noisy and bothers my neighbors, that\'s a negative externality. They\'re paying a cost (noise) without getting any smoothies!',
          },
          {
            term: 'Information Asymmetry',
            definition: 'A situation where one party in a transaction has more or better information than the other party.',
            philsAnalogy: 'If I\'m selling you bamboo and I know it\'s rotten inside but you can\'t tell, that\'s information asymmetry. I know more than you, which isn\'t fair!',
          },
        ],
        quiz: [
          {
            question: 'Market failure occurs when:',
            options: [
              'A business goes bankrupt',
              'Prices are too high',
              'Free markets fail to allocate resources efficiently',
              'The government intervenes in markets',
            ],
            correctIndex: 2,
            explanation: 'Market failure is specifically about inefficient resource allocation - when the market equilibrium doesn\'t maximize total social welfare, not just when businesses struggle.',
          },
          {
            question: 'Which is NOT a type of market failure?',
            options: [
              'Externalities',
              'Public goods',
              'High prices',
              'Information asymmetry',
            ],
            correctIndex: 2,
            explanation: 'High prices alone aren\'t market failure - they might reflect genuine scarcity. Market failures involve externalities, public goods, common resources, information asymmetry, and market power.',
          },
          {
            question: 'Why do externalities cause market failure?',
            options: [
              'They make products too expensive',
              'Prices don\'t reflect true social costs or benefits',
              'They reduce competition',
              'They increase government spending',
            ],
            correctIndex: 1,
            explanation: 'Externalities cause market failure because costs or benefits aren\'t included in prices. When prices don\'t reflect true social value, markets produce the wrong quantities.',
          },
        ],
      },
      {
        id: 'micro-5-lesson-2',
        title: 'Externalities: Positive and Negative',
        estimatedMinutes: 15,
        intro: {
          hook: 'Every time a factory pollutes or a neighbor plants a beautiful garden, economic ripples spread to people who weren\'t part of the original transaction. These spillover effects - externalities - are everywhere, and they explain a lot about why we have environmental laws, subsidies, and taxes.',
          philMessage: 'Externalities are like economic ripples in a pond. Drop a stone (make a transaction) and the ripples (effects) spread to others who weren\'t involved. Some ripples are nice, some are not so nice. Let\'s dive in!',
        },
        coreConcepts: [
          {
            title: 'Negative Externalities',
            explanation: 'A negative externality occurs when a transaction imposes costs on third parties who didn\'t agree to bear those costs. The market price doesn\'t include these external costs, so the good is overproduced from society\'s perspective. The social cost exceeds the private cost.',
            example: 'A factory emits pollution that causes health problems for nearby residents. The factory doesn\'t pay for these health costs - residents do. So the factory\'s products seem cheaper than they really are, and too much is produced.',
          },
          {
            title: 'Positive Externalities',
            explanation: 'A positive externality occurs when a transaction creates benefits for third parties who didn\'t pay for those benefits. The market price doesn\'t capture these external benefits, so the good is underproduced from society\'s perspective. The social benefit exceeds the private benefit.',
            example: 'When you get vaccinated, you protect not just yourself but everyone around you (herd immunity). You don\'t capture all the benefits of your vaccination, so people get fewer vaccines than would be socially optimal.',
          },
          {
            title: 'Correcting Negative Externalities',
            explanation: 'Governments can address negative externalities through: (1) Taxes that make polluters pay the social cost (Pigouvian taxes), (2) Regulations that limit harmful activities, (3) Cap-and-trade systems that create markets for pollution rights, (4) Assigning property rights so affected parties can negotiate.',
            example: 'A carbon tax makes fossil fuels more expensive, reflecting their true environmental cost. This encourages people to use less and switch to cleaner alternatives. The tax "internalizes" the externality.',
          },
          {
            title: 'Correcting Positive Externalities',
            explanation: 'Governments can encourage activities with positive externalities through: (1) Subsidies that reduce the cost to producers or consumers, (2) Direct provision of the good (public education), (3) Mandates requiring the activity (vaccination requirements). The goal is to increase production to the socially optimal level.',
            example: 'Government subsidies for solar panels make them cheaper, encouraging more adoption. This accounts for the positive externality of reduced pollution that benefits everyone, not just the panel owner.',
          },
        ],
        personalFinanceConnection: {
          description: 'You experience externalities daily. You benefit from others\' education (positive) and suffer from others\' pollution (negative). Tax incentives for things like home insulation or electric vehicles exist because of positive externalities. Understanding this helps you take advantage of subsidies and understand why some things are taxed.',
          realWorldExample: 'Federal tax credits for electric vehicles exist because EVs have positive externalities (less pollution, less oil dependence). If you\'re buying a car, factor in these credits - they\'re society\'s way of encouraging choices that benefit everyone.',
        },
        flashcards: [
          {
            term: 'Negative Externality',
            definition: 'A cost imposed on third parties who are not part of a transaction and did not agree to bear that cost.',
            philsAnalogy: 'If a bamboo processing plant dumps waste in the river and kills fish that other pandas eat, that\'s a negative externality. The plant didn\'t pay for the fish they destroyed!',
          },
          {
            term: 'Positive Externality',
            definition: 'A benefit received by third parties who are not part of a transaction and did not pay for that benefit.',
            philsAnalogy: 'If I plant a beautiful bamboo garden that all my neighbors enjoy looking at, that\'s a positive externality. They get the view for free!',
          },
          {
            term: 'Pigouvian Tax',
            definition: 'A tax on activities that generate negative externalities, designed to make the private cost equal the social cost.',
            philsAnalogy: 'If the bamboo plant has to pay a tax equal to the value of the fish they kill, they\'ll pollute less because now they\'re paying the true cost!',
          },
          {
            term: 'Subsidy',
            definition: 'A payment from the government to encourage activities that generate positive externalities.',
            philsAnalogy: 'If the government pays me to plant bamboo gardens because everyone benefits from cleaner air, that subsidy encourages me to plant more than I would otherwise!',
          },
        ],
        quiz: [
          {
            question: 'A factory pollutes a river, harming downstream fishermen. This is an example of:',
            options: [
              'A positive externality',
              'A negative externality',
              'A public good',
              'Perfect competition',
            ],
            correctIndex: 1,
            explanation: 'The fishermen bear costs (polluted water, fewer fish) from a transaction they weren\'t part of. This is a classic negative externality - third parties harmed by others\' actions.',
          },
          {
            question: 'Why do goods with negative externalities tend to be OVERPRODUCED?',
            options: [
              'People like them too much',
              'The government subsidizes them',
              'Producers don\'t pay the full social cost, so prices are too low',
              'There\'s too much competition',
            ],
            correctIndex: 2,
            explanation: 'When external costs aren\'t included in prices, goods appear cheaper than their true social cost. This artificially low price leads to overconsumption.',
          },
          {
            question: 'Education has positive externalities because:',
            options: [
              'Schools are expensive to build',
              'Educated people benefit society beyond just themselves',
              'Teachers are underpaid',
              'Students don\'t want to learn',
            ],
            correctIndex: 1,
            explanation: 'Educated people contribute to society through innovation, civic participation, and reduced crime - benefits that extend beyond the individual student. These spillover benefits are positive externalities.',
          },
          {
            question: 'A carbon tax is designed to:',
            options: [
              'Raise government revenue',
              'Make fossil fuels reflect their true environmental cost',
              'Punish oil companies',
              'Reduce all taxes',
            ],
            correctIndex: 1,
            explanation: 'A carbon tax is a Pigouvian tax that internalizes the negative externality of carbon emissions. By making polluters pay the social cost, it encourages cleaner alternatives.',
          },
        ],
        careerSpotlight: {
          title: 'Environmental Economist',
          description: 'Environmental economists study the economic impact of environmental policies and help design market-based solutions to pollution and resource depletion. They work for government agencies, consulting firms, and environmental organizations.',
          salaryRange: '$65,000 - $120,000',
          skills: ['Cost-Benefit Analysis', 'Environmental Science', 'Policy Analysis', 'Statistical Modeling'],
        },
      },
      {
        id: 'micro-5-lesson-3',
        title: 'Public Goods & Common Resources',
        estimatedMinutes: 14,
        intro: {
          hook: 'Why do we have public parks, national defense, and lighthouses? Why are fish populations declining and traffic jams getting worse? The answers involve two special types of goods that markets struggle to handle: public goods and common resources.',
          philMessage: 'Some things are tricky for markets to provide. Public goods benefit everyone whether they pay or not. Common resources get overused because no one owns them. Let\'s see why these cause problems and what we can do about it!',
        },
        coreConcepts: [
          {
            title: 'Characteristics of Goods: Rivalry and Excludability',
            explanation: 'Goods differ in two key ways: (1) Rivalry - does one person\'s use reduce availability for others? (2) Excludability - can non-payers be prevented from using it? These characteristics determine whether markets can efficiently provide the good.',
            example: 'A pizza is rival (if I eat a slice, you can\'t) and excludable (the restaurant can refuse to serve non-payers). A radio broadcast is non-rival (my listening doesn\'t affect yours) and non-excludable (anyone with a radio can tune in).',
          },
          {
            title: 'Public Goods',
            explanation: 'Public goods are non-rival and non-excludable. Everyone can use them simultaneously, and no one can be prevented from using them. Markets underprovide public goods because of the free-rider problem - people can benefit without paying, so no one wants to pay.',
            example: 'National defense protects everyone in the country equally (non-rival) and you can\'t exclude citizens from being protected (non-excludable). If defense were privately funded, everyone would want others to pay while they enjoy free protection.',
          },
          {
            title: 'The Free-Rider Problem',
            explanation: 'The free-rider problem occurs when people can enjoy a good without paying for it, leading to underprovision. If you can benefit from a public good whether you pay or not, rational self-interest says don\'t pay. But if everyone thinks this way, the good isn\'t provided at all.',
            example: 'Imagine a neighborhood trying to fund fireworks. Everyone would enjoy them, but each person thinks "why should I pay when I can watch for free?" If everyone free-rides, no one pays and there are no fireworks.',
          },
          {
            title: 'Common Resources and the Tragedy of the Commons',
            explanation: 'Common resources are rival but non-excludable - anyone can use them, but use by one reduces availability for others. This leads to overuse and depletion because individuals don\'t bear the full cost of their consumption. This is called the "tragedy of the commons."',
            example: 'Ocean fish are a common resource. Each fishing boat catches as much as possible because any fish they don\'t catch, someone else will. But collectively, this depletes fish populations. Individual rationality leads to collective disaster.',
          },
        ],
        personalFinanceConnection: {
          description: 'You benefit from public goods (roads, defense, clean air regulations) funded by taxes. You also use common resources (public parks, roads during rush hour). Understanding these concepts helps you appreciate why taxes exist and why some resources need management.',
          realWorldExample: 'Traffic congestion is a tragedy of the commons - roads are common resources that get overused during peak hours. Congestion pricing (like tolls that vary by time) can help by making drivers pay the true cost of their road use during busy times.',
        },
        flashcards: [
          {
            term: 'Public Good',
            definition: 'A good that is non-rival (one person\'s use doesn\'t reduce others\' use) and non-excludable (non-payers cannot be prevented from using it).',
            philsAnalogy: 'A fireworks show is a public good. My watching doesn\'t block your view (non-rival), and you can\'t stop people from looking up (non-excludable)!',
          },
          {
            term: 'Free-Rider Problem',
            definition: 'The tendency for people to avoid paying for public goods while still enjoying their benefits, leading to underprovision.',
            philsAnalogy: 'If pandas could enjoy the bamboo forest without helping maintain it, everyone would free-ride and the forest would fall apart. That\'s the free-rider problem!',
          },
          {
            term: 'Common Resource',
            definition: 'A good that is rival (use by one reduces availability for others) but non-excludable (anyone can access it).',
            philsAnalogy: 'A wild bamboo forest is a common resource. The bamboo I eat is gone (rival), but any panda can come eat (non-excludable). We might eat it all!',
          },
          {
            term: 'Tragedy of the Commons',
            definition: 'The overuse and depletion of common resources because individuals don\'t bear the full cost of their consumption.',
            philsAnalogy: 'If every panda eats as much wild bamboo as they can, thinking "if I don\'t eat it, someone else will," we\'ll destroy the whole forest. That\'s the tragedy of the commons!',
          },
        ],
        quiz: [
          {
            question: 'A good is "non-rival" when:',
            options: [
              'No one wants it',
              'One person\'s use doesn\'t reduce availability for others',
              'It\'s very expensive',
              'Only one company sells it',
            ],
            correctIndex: 1,
            explanation: 'Non-rivalry means multiple people can use the good simultaneously without diminishing each other\'s enjoyment. A TV broadcast is non-rival; a sandwich is rival.',
          },
          {
            question: 'Why do markets underprovide public goods?',
            options: [
              'They\'re too expensive to produce',
              'The government bans them',
              'People can enjoy them without paying (free-rider problem)',
              'No one wants them',
            ],
            correctIndex: 2,
            explanation: 'Because public goods are non-excludable, people can benefit without paying. This free-rider problem means private providers can\'t collect enough revenue to cover costs.',
          },
          {
            question: 'Which is an example of a common resource?',
            options: [
              'A private swimming pool',
              'National defense',
              'Fish in the ocean',
              'A movie in a theater',
            ],
            correctIndex: 2,
            explanation: 'Ocean fish are rival (fish caught by one boat can\'t be caught by another) but non-excludable (anyone can fish in international waters). This makes them a common resource prone to overuse.',
          },
          {
            question: 'The "tragedy of the commons" refers to:',
            options: [
              'Public parks being underfunded',
              'Common resources being overused and depleted',
              'Too many public goods being provided',
              'Private property being seized',
            ],
            correctIndex: 1,
            explanation: 'The tragedy of the commons describes how shared resources get overused because individuals don\'t bear the full cost of their consumption, leading to depletion.',
          },
        ],
      },
      {
        id: 'micro-5-lesson-4',
        title: 'Government Intervention & Policy Tools',
        estimatedMinutes: 14,
        intro: {
          hook: 'When markets fail, governments often step in. But how? And does intervention always make things better? Understanding policy tools helps you evaluate whether government actions are likely to help or hurt.',
          philMessage: 'Government has a toolbox for fixing market failures: taxes, subsidies, regulations, and more. But like any tool, they can be used well or poorly. Let\'s learn when intervention helps and when it might make things worse!',
        },
        coreConcepts: [
          {
            title: 'Why Government Intervenes',
            explanation: 'Government intervention in markets is justified when market failures prevent efficient outcomes. The goal is to correct the failure and move closer to the socially optimal result. However, intervention has costs too, so the cure shouldn\'t be worse than the disease.',
            example: 'Markets fail to provide clean air (negative externality from pollution), so governments regulate emissions. Markets underprovide education (positive externality), so governments fund public schools. The intervention addresses the specific failure.',
          },
          {
            title: 'Taxes and Subsidies',
            explanation: 'Taxes can discourage activities with negative externalities by raising their cost. Subsidies can encourage activities with positive externalities by lowering their cost. The ideal tax or subsidy equals the external cost or benefit, "internalizing" the externality.',
            example: 'A $50/ton carbon tax makes fossil fuels more expensive, encouraging conservation and clean energy. A $7,500 electric vehicle tax credit makes EVs cheaper, encouraging adoption. Both align private incentives with social benefits.',
          },
          {
            title: 'Regulations and Standards',
            explanation: 'Regulations directly mandate or prohibit certain behaviors. They can be effective when externalities are severe or hard to measure, but they may be less flexible than market-based approaches. Examples include emission standards, safety requirements, and zoning laws.',
            example: 'Rather than taxing car pollution, the government sets fuel efficiency standards (CAFE). Rather than taxing unsafe products, it bans them (FDA approval). Regulations provide certainty but may not find the most efficient solutions.',
          },
          {
            title: 'Government Failure',
            explanation: 'Government intervention can also fail. Politicians may serve special interests rather than the public good. Regulations may be poorly designed or have unintended consequences. Bureaucracies may be inefficient. The cure can sometimes be worse than the disease.',
            example: 'Agricultural subsidies were meant to help struggling farmers but often benefit large agribusinesses and encourage overproduction. Rent control was meant to help renters but often reduces housing supply and quality. Good intentions don\'t guarantee good outcomes.',
          },
        ],
        personalFinanceConnection: {
          description: 'Government policies affect your wallet directly. Tax credits for retirement savings, education, and home ownership are subsidies for activities with positive externalities. Understanding policy helps you take advantage of incentives and understand why you pay certain taxes.',
          realWorldExample: 'The mortgage interest deduction subsidizes homeownership (seen as having positive externalities for communities). If you\'re deciding whether to rent or buy, factor in this tax benefit. Similarly, 401(k) tax advantages subsidize retirement saving. Use these policies to your advantage!',
        },
        flashcards: [
          {
            term: 'Government Intervention',
            definition: 'Actions taken by government to correct market failures and improve economic outcomes, including taxes, subsidies, and regulations.',
            philsAnalogy: 'When the bamboo market fails - too much pollution, not enough forest protection - the panda government steps in with rules and incentives to fix it!',
          },
          {
            term: 'Regulation',
            definition: 'Government rules that mandate or prohibit certain behaviors, used to address market failures directly.',
            philsAnalogy: 'A regulation might say "bamboo factories can\'t dump waste in rivers." It\'s a direct rule, not a price signal.',
          },
          {
            term: 'Government Failure',
            definition: 'When government intervention fails to improve on market outcomes, due to poor design, unintended consequences, or special interest influence.',
            philsAnalogy: 'Sometimes the panda government tries to fix a problem but makes it worse - maybe the regulation is too strict, or it helps the wrong pandas. That\'s government failure!',
          },
          {
            term: 'Cost-Benefit Analysis',
            definition: 'A systematic approach to evaluating whether the benefits of a policy exceed its costs.',
            philsAnalogy: 'Before making a new bamboo rule, we should ask: do the benefits (cleaner forests) outweigh the costs (higher bamboo prices)? That\'s cost-benefit analysis!',
          },
        ],
        quiz: [
          {
            question: 'Government intervention is most justified when:',
            options: [
              'Businesses are making too much profit',
              'Market failures prevent efficient outcomes',
              'Prices are rising',
              'Consumers want lower prices',
            ],
            correctIndex: 1,
            explanation: 'The economic justification for intervention is market failure - when free markets don\'t achieve efficient outcomes. High profits or prices alone don\'t indicate failure.',
          },
          {
            question: 'A Pigouvian tax is designed to:',
            options: [
              'Raise revenue for government programs',
              'Punish successful businesses',
              'Make the private cost equal the social cost of an activity',
              'Reduce all economic activity',
            ],
            correctIndex: 2,
            explanation: 'Pigouvian taxes internalize externalities by making producers or consumers pay the full social cost of their actions, not just the private cost.',
          },
          {
            question: 'Which is an example of government failure?',
            options: [
              'A carbon tax that reduces pollution',
              'Public schools that educate children',
              'A subsidy that mainly benefits wealthy special interests',
              'National defense protecting citizens',
            ],
            correctIndex: 2,
            explanation: 'Government failure occurs when intervention doesn\'t achieve its goals or creates new problems. Subsidies captured by special interests rather than helping the intended beneficiaries is a classic example.',
          },
          {
            question: 'Compared to regulations, taxes and subsidies:',
            options: [
              'Are always more effective',
              'Allow more flexibility for individuals and businesses to respond',
              'Are easier to enforce',
              'Never have unintended consequences',
            ],
            correctIndex: 1,
            explanation: 'Market-based approaches like taxes and subsidies let individuals find the most efficient ways to respond, while regulations mandate specific behaviors. Both have pros and cons.',
          },
        ],
        careerSpotlight: {
          title: 'Policy Economist',
          description: 'Policy economists analyze the economic impact of government policies and regulations. They work for government agencies, think tanks, and consulting firms, helping design and evaluate policies that address market failures.',
          salaryRange: '$70,000 - $130,000',
          skills: ['Economic Modeling', 'Policy Analysis', 'Statistical Methods', 'Communication'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'externality-fixer',
      title: 'Externality Fixer',
      description: 'Identify market failures in different scenarios and choose the best policy intervention. Balance efficiency with fairness!',
      instructions: [
        'Review a market failure scenario',
        'Identify the type of failure',
        'Choose a policy intervention',
        'See the economic outcomes',
      ],
      rewards: {
        bamboo: 75,
        xp: 150,
      },
    },
    
    rewards: {
      bamboo: 200,
      xp: 400,
    },
    
    unlockRequirements: {
      previousUnitId: 'micro-4-market-structures',
    },
  },
  
  // ==========================================
  // MACROECONOMICS TRACK (Units 6-10)
  // ==========================================
  {
    id: 'macro-1-gdp-growth',
    track: 'macroeconomics',
    title: 'GDP & Economic Growth',
    description: 'Measure the health of entire economies. Learn how GDP is calculated and what drives long-term economic prosperity.',
    icon: '📈',
    order: 1,
    
    coreEconomicsConcepts: [
      'Gross Domestic Product (GDP)',
      'Real vs. Nominal GDP',
      'GDP Components (C + I + G + NX)',
      'Economic Growth',
      'Standard of Living',
    ],
    
    personalFinanceConnection: {
      description: 'Economic growth affects job availability, wages, and investment returns. Understanding GDP trends helps you anticipate career opportunities and plan for the future.',
      relatedPFModules: ['Career Planning', 'Long-term Goals'],
    },
    
    investingConnection: [
      'GDP growth and stock market performance',
      'Sector rotation based on economic cycles',
      'International diversification',
    ],
    
    careerExposure: [
      {
        title: 'Macroeconomist',
        description: 'Study economy-wide trends and develop forecasts for governments, central banks, or financial institutions.',
        salaryRange: '$80,000 - $150,000',
        skills: ['Econometrics', 'Forecasting', 'Data Analysis'],
      },
      {
        title: 'Economic Research Analyst',
        description: 'Analyze economic data and trends to support investment decisions or policy recommendations.',
        salaryRange: '$60,000 - $100,000',
        skills: ['Statistical Analysis', 'Report Writing', 'Economic Theory'],
      },
    ],
    
    lessons: [
      {
        id: 'macro-1-lesson-1',
        title: 'What is GDP?',
        estimatedMinutes: 14,
        intro: {
          hook: 'How do you measure the size of an entire economy? How do we know if a country is getting richer or poorer? The answer is GDP - the single most important number in macroeconomics.',
          philMessage: 'Welcome to macroeconomics! We\'re zooming out from individual markets to look at entire economies. GDP is like taking the pulse of a nation\'s economy. Let\'s learn what it measures and why it matters!',
        },
        coreConcepts: [
          {
            title: 'Gross Domestic Product Defined',
            explanation: 'Gross Domestic Product (GDP) is the total market value of all final goods and services produced within a country\'s borders in a given time period (usually a year or quarter). It measures the size of an economy and is the most widely used indicator of economic health.',
            example: 'US GDP in 2023 was about $27 trillion. This means the total value of all cars made, haircuts given, software written, meals served, and everything else produced in America that year added up to $27 trillion.',
          },
          {
            title: 'What Counts in GDP',
            explanation: 'GDP includes only: (1) Final goods and services (not intermediate goods to avoid double-counting), (2) Currently produced items (not resales of used goods), (3) Market transactions (not unpaid work like housework), (4) Production within the country\'s borders (regardless of who owns the company).',
            example: 'A new car counts in GDP. The steel used to make it doesn\'t count separately (it\'s in the car\'s price). A used car sale doesn\'t count (it was counted when new). Cooking dinner at home doesn\'t count (no market transaction). A Toyota made in Kentucky counts in US GDP.',
          },
          {
            title: 'The Three Approaches to Measuring GDP',
            explanation: 'GDP can be measured three ways that all give the same answer: (1) Expenditure approach - add up all spending on final goods, (2) Income approach - add up all income earned producing goods, (3) Production approach - add up value added at each stage of production.',
            example: 'If you buy a $30,000 car: Expenditure approach counts your $30,000 purchase. Income approach counts the wages, profits, and rents earned making the car. Production approach counts value added at the mine, steel mill, parts factory, and assembly plant. All equal $30,000.',
          },
          {
            title: 'GDP Components: C + I + G + NX',
            explanation: 'Using the expenditure approach, GDP = Consumption (C) + Investment (I) + Government Spending (G) + Net Exports (NX). Consumption is household spending, Investment is business spending on capital, Government is public spending, and Net Exports is exports minus imports.',
            example: 'In the US: Consumption (about 68% of GDP) includes your groceries and Netflix. Investment (about 18%) includes factory equipment and new homes. Government (about 17%) includes military and schools. Net Exports (about -3%) is negative because we import more than we export.',
          },
        ],
        personalFinanceConnection: {
          description: 'GDP growth affects your job prospects, salary potential, and investment returns. When GDP is growing, companies hire more, wages rise, and stocks tend to perform well. Understanding GDP trends helps you anticipate economic conditions that affect your financial life.',
          realWorldExample: 'During the 2008 recession, US GDP shrank by about 4%. Unemployment doubled, home values crashed, and retirement accounts plummeted. During the 2020 recovery, GDP growth was strong, unemployment fell rapidly, and markets soared. GDP trends matter for your finances!',
        },
        flashcards: [
          {
            term: 'Gross Domestic Product (GDP)',
            definition: 'The total market value of all final goods and services produced within a country\'s borders in a given time period.',
            philsAnalogy: 'GDP is like weighing all the bamboo harvested in Panda Land this year. It tells us how much our economy produced!',
          },
          {
            term: 'Final Goods',
            definition: 'Goods sold to the end user, as opposed to intermediate goods used to make other products.',
            philsAnalogy: 'A bamboo smoothie I sell to you is a final good. The bamboo I bought to make it is an intermediate good. We only count the smoothie to avoid counting the bamboo twice!',
          },
          {
            term: 'Consumption (C)',
            definition: 'Household spending on goods and services, the largest component of GDP in most countries.',
            philsAnalogy: 'When pandas buy bamboo snacks, smoothies, and bamboo furniture for their homes, that\'s consumption - and it\'s the biggest part of Panda Land\'s GDP!',
          },
          {
            term: 'Net Exports (NX)',
            definition: 'Exports minus imports; positive if a country exports more than it imports, negative if it imports more.',
            philsAnalogy: 'If Panda Land exports $100 million in bamboo products but imports $150 million in other goods, our net exports are -$50 million. We\'re buying more from the world than we\'re selling!',
          },
        ],
        quiz: [
          {
            question: 'GDP measures:',
            options: [
              'The total wealth of a country',
              'The market value of all final goods and services produced in a country in a time period',
              'The government\'s budget',
              'The stock market\'s value',
            ],
            correctIndex: 1,
            explanation: 'GDP is a flow measure of production over time, not a stock of wealth. It captures the value of what\'s produced, not what\'s accumulated.',
          },
          {
            question: 'Which transaction would NOT be counted in US GDP?',
            options: [
              'A new car manufactured in Detroit',
              'A haircut at a local salon',
              'A used textbook sold between students',
              'A meal at a restaurant',
            ],
            correctIndex: 2,
            explanation: 'Used goods don\'t count in GDP because they were already counted when first produced. The used textbook was counted in GDP when it was new.',
          },
          {
            question: 'The largest component of US GDP is:',
            options: [
              'Government spending',
              'Investment',
              'Consumption',
              'Net exports',
            ],
            correctIndex: 2,
            explanation: 'Consumption (household spending) makes up about 68% of US GDP. Americans\' spending on goods and services drives the economy.',
          },
          {
            question: 'A Japanese company builds cars in Ohio. These cars are counted in:',
            options: [
              'Japan\'s GDP only',
              'US GDP only',
              'Both US and Japan\'s GDP',
              'Neither country\'s GDP',
            ],
            correctIndex: 1,
            explanation: 'GDP measures production within a country\'s borders, regardless of ownership. Cars made in Ohio count in US GDP, even if the company is Japanese.',
          },
        ],
      },
      {
        id: 'macro-1-lesson-2',
        title: 'Real vs. Nominal GDP',
        estimatedMinutes: 13,
        intro: {
          hook: 'If GDP goes up 5%, does that mean we produced 5% more stuff? Not necessarily! Prices might have just gone up. To truly measure economic growth, we need to separate real production from price changes.',
          philMessage: 'Here\'s a tricky concept: if everything costs twice as much, GDP doubles even if we produce the same amount! That\'s why economists distinguish between nominal and real GDP. Let\'s untangle this!',
        },
        coreConcepts: [
          {
            title: 'Nominal GDP',
            explanation: 'Nominal GDP measures production using current prices - the actual prices that existed in the year being measured. It can increase either because more was produced OR because prices went up. This makes it hard to compare across years.',
            example: 'If nominal GDP was $20 trillion in 2020 and $22 trillion in 2023, we can\'t tell if we produced 10% more stuff or if prices just rose 10% (or some combination). Nominal GDP mixes quantity and price changes.',
          },
          {
            title: 'Real GDP',
            explanation: 'Real GDP measures production using constant prices from a base year, removing the effect of price changes. It shows how much actual output changed. Real GDP is the better measure for comparing economic performance over time.',
            example: 'If we use 2020 prices as the base, real GDP in 2023 tells us what 2023\'s production would have been worth at 2020 prices. If real GDP rose 6% from 2020 to 2023, we actually produced 6% more stuff.',
          },
          {
            title: 'The GDP Deflator',
            explanation: 'The GDP deflator is a price index that measures the overall price level of all goods in GDP. It equals (Nominal GDP / Real GDP) × 100. The percentage change in the GDP deflator shows the inflation rate for the whole economy.',
            example: 'If nominal GDP is $22 trillion and real GDP is $20 trillion, the GDP deflator is 110. This means prices are 10% higher than in the base year. The GDP deflator captures inflation across all domestically produced goods.',
          },
          {
            title: 'Why Real GDP Matters',
            explanation: 'Real GDP is what we care about for measuring economic well-being. Higher real GDP means more goods and services are available for people to consume. Economic growth means real GDP is increasing - we\'re actually producing more, not just charging more.',
            example: 'China\'s nominal GDP grew about 8% per year from 2000-2020, but real GDP grew about 9% per year. The difference? Prices actually fell slightly in some years (deflation). Real GDP showed the true explosion in Chinese production.',
          },
        ],
        personalFinanceConnection: {
          description: 'The distinction between real and nominal applies to your personal finances too. A 3% raise sounds good, but if inflation is 4%, your real purchasing power actually fell. Always think in real terms - what can your money actually buy?',
          realWorldExample: 'If your salary goes from $50,000 to $52,000 (4% raise) but prices rose 5%, your real salary actually decreased. You can buy less than before! When evaluating raises, investments, or savings, always adjust for inflation to see the real picture.',
        },
        flashcards: [
          {
            term: 'Nominal GDP',
            definition: 'GDP measured using current prices, reflecting both changes in production and changes in prices.',
            philsAnalogy: 'Nominal GDP is like counting my bamboo sales in today\'s prices. If bamboo prices doubled, my nominal sales doubled even if I sold the same amount!',
          },
          {
            term: 'Real GDP',
            definition: 'GDP measured using constant prices from a base year, showing changes in actual production only.',
            philsAnalogy: 'Real GDP is like counting my bamboo sales using last year\'s prices. Now I can see if I actually sold more bamboo or if prices just went up!',
          },
          {
            term: 'GDP Deflator',
            definition: 'A price index calculated as (Nominal GDP / Real GDP) × 100, measuring the overall price level of GDP components.',
            philsAnalogy: 'The GDP deflator tells me how much prices have changed overall. If it\'s 110, prices are 10% higher than the base year!',
          },
          {
            term: 'Economic Growth',
            definition: 'An increase in real GDP over time, indicating that an economy is producing more goods and services.',
            philsAnalogy: 'True economic growth means Panda Land is actually making more bamboo products, not just charging more for them. That\'s real GDP growth!',
          },
        ],
        quiz: [
          {
            question: 'If nominal GDP increased by 6% and prices increased by 4%, real GDP increased by approximately:',
            options: [
              '10%',
              '6%',
              '4%',
              '2%',
            ],
            correctIndex: 3,
            explanation: 'Real GDP growth ≈ Nominal GDP growth - Inflation. 6% - 4% = 2%. Only 2% of the nominal increase represents actual production growth.',
          },
          {
            question: 'Why is real GDP better than nominal GDP for comparing economic performance over time?',
            options: [
              'Real GDP is always larger',
              'Real GDP removes the effect of price changes',
              'Real GDP includes more goods',
              'Real GDP is easier to calculate',
            ],
            correctIndex: 1,
            explanation: 'Real GDP uses constant prices, so changes in real GDP reflect actual changes in production, not just inflation. This allows meaningful comparisons across years.',
          },
          {
            question: 'The GDP deflator is 120. This means:',
            options: [
              'Real GDP is 120% of nominal GDP',
              'Prices are 20% higher than in the base year',
              'The economy grew 20%',
              'Inflation is 120%',
            ],
            correctIndex: 1,
            explanation: 'A GDP deflator of 120 means the price level is 20% higher than the base year (when the deflator was 100). It measures cumulative price change since the base year.',
          },
          {
            question: 'During a period of deflation (falling prices):',
            options: [
              'Nominal GDP will be higher than real GDP',
              'Real GDP will be higher than nominal GDP',
              'Nominal and real GDP will be equal',
              'GDP cannot be measured',
            ],
            correctIndex: 1,
            explanation: 'With deflation, current prices are lower than base year prices. So measuring current production at base year prices (real GDP) gives a higher value than measuring at current prices (nominal GDP).',
          },
        ],
      },
      {
        id: 'macro-1-lesson-3',
        title: 'Economic Growth & Living Standards',
        estimatedMinutes: 14,
        intro: {
          hook: 'Why are people in some countries so much richer than in others? Why did living standards barely change for thousands of years, then explode in the last 200? The answer is economic growth - and understanding it is key to understanding the modern world.',
          philMessage: 'Economic growth is the closest thing to magic in economics. Small differences in growth rates, compounded over decades, create enormous differences in living standards. Let\'s explore why growth matters so much!',
        },
        coreConcepts: [
          {
            title: 'GDP Per Capita',
            explanation: 'GDP per capita is GDP divided by population. It measures average economic output per person and is a rough indicator of living standards. A country can have high total GDP but low GDP per capita if it has a large population.',
            example: 'India\'s total GDP is larger than the UK\'s, but the UK\'s GDP per capita is about 20 times higher. The average British person has access to far more goods and services than the average Indian person.',
          },
          {
            title: 'The Power of Compound Growth',
            explanation: 'Small differences in growth rates lead to huge differences over time due to compounding. The "Rule of 70" says that GDP doubles in approximately 70 ÷ growth rate years. At 2% growth, GDP doubles every 35 years. At 7% growth, it doubles every 10 years.',
            example: 'If Country A grows at 1% and Country B at 3%, after 70 years A\'s GDP doubles once while B\'s doubles three times (8x larger). A 2 percentage point difference seems small but creates an 8x gap over a lifetime!',
          },
          {
            title: 'Sources of Economic Growth',
            explanation: 'Long-run economic growth comes from: (1) Increases in physical capital (machines, buildings), (2) Increases in human capital (education, skills), (3) Technological progress (new ideas, better methods), (4) Institutions (property rights, rule of law). Technology is the most important for sustained growth.',
            example: 'China\'s rapid growth came from massive investment in factories (physical capital), expanding education (human capital), adopting foreign technology, and reforming economic institutions. All four sources contributed.',
          },
          {
            title: 'Limits of GDP as a Welfare Measure',
            explanation: 'GDP doesn\'t capture everything about well-being. It misses: leisure time, environmental quality, income distribution, non-market activities, and quality of life factors. A country can have high GDP but poor quality of life, or vice versa.',
            example: 'The US has higher GDP per capita than many European countries, but Americans work more hours and have less vacation. Bhutan famously tracks "Gross National Happiness" alongside GDP. Money isn\'t everything!',
          },
        ],
        personalFinanceConnection: {
          description: 'Economic growth affects your lifetime earnings potential. Growing up in a growing economy means more job opportunities, higher wages, and better living standards. Understanding growth helps you appreciate long-term investing and the power of compound returns.',
          realWorldExample: 'The S&P 500 has returned about 10% annually over the long term, roughly tracking economic growth plus dividends. At 10% returns, money doubles every 7 years. $10,000 invested at age 25 becomes $450,000 by age 65. That\'s the power of compound growth!',
        },
        flashcards: [
          {
            term: 'GDP Per Capita',
            definition: 'GDP divided by population, measuring average economic output per person as an indicator of living standards.',
            philsAnalogy: 'If Panda Land produces $1 billion in bamboo products and has 1 million pandas, GDP per capita is $1,000 per panda. That\'s our average standard of living!',
          },
          {
            term: 'Rule of 70',
            definition: 'A formula stating that the number of years for a quantity to double equals approximately 70 divided by the growth rate.',
            philsAnalogy: 'At 7% growth, Panda Land\'s economy doubles in 10 years (70÷7). At 2% growth, it takes 35 years. Small rate differences matter a lot over time!',
          },
          {
            term: 'Human Capital',
            definition: 'The knowledge, skills, and health that workers accumulate through education, training, and experience.',
            philsAnalogy: 'When pandas go to school and learn better bamboo harvesting techniques, that\'s building human capital. Smarter pandas = more productive economy!',
          },
          {
            term: 'Technological Progress',
            definition: 'Advances in knowledge that allow more output to be produced from the same inputs.',
            philsAnalogy: 'When we invent a better bamboo harvesting machine, we can gather more bamboo with the same effort. That\'s technological progress - the engine of long-run growth!',
          },
        ],
        quiz: [
          {
            question: 'Country A has GDP of $10 trillion and 100 million people. Country B has GDP of $5 trillion and 10 million people. Which has higher living standards?',
            options: [
              'Country A (higher total GDP)',
              'Country B (higher GDP per capita)',
              'They\'re equal',
              'Cannot be determined',
            ],
            correctIndex: 1,
            explanation: 'GDP per capita matters for living standards. Country A: $100,000 per person. Country B: $500,000 per person. Despite lower total GDP, Country B\'s citizens are much better off on average.',
          },
          {
            question: 'Using the Rule of 70, how long does it take for GDP to double at 5% growth?',
            options: [
              '5 years',
              '14 years',
              '35 years',
              '70 years',
            ],
            correctIndex: 1,
            explanation: 'Rule of 70: Years to double = 70 ÷ growth rate = 70 ÷ 5 = 14 years.',
          },
          {
            question: 'Which is the most important source of LONG-RUN economic growth?',
            options: [
              'Government spending',
              'Technological progress',
              'Population growth',
              'Natural resources',
            ],
            correctIndex: 1,
            explanation: 'While all factors matter, technological progress is the key driver of sustained long-run growth. It allows us to produce more with the same resources, overcoming limits of physical inputs.',
          },
          {
            question: 'GDP does NOT capture:',
            options: [
              'The value of cars produced',
              'The value of haircuts',
              'The value of leisure time',
              'The value of restaurant meals',
            ],
            correctIndex: 2,
            explanation: 'GDP measures market transactions but misses non-market values like leisure, environmental quality, and household work. A country could have high GDP but overworked, unhappy citizens.',
          },
        ],
        careerSpotlight: {
          title: 'Macroeconomist',
          description: 'Macroeconomists study economy-wide phenomena like GDP growth, inflation, and unemployment. They work for central banks, government agencies, international organizations, and financial institutions, developing forecasts and policy recommendations.',
          salaryRange: '$80,000 - $150,000',
          skills: ['Econometrics', 'Data Analysis', 'Economic Modeling', 'Policy Analysis'],
        },
      },
      {
        id: 'macro-1-lesson-4',
        title: 'The Business Cycle',
        estimatedMinutes: 13,
        intro: {
          hook: 'Economies don\'t grow smoothly - they boom and bust, expand and contract. These fluctuations affect jobs, incomes, and investments. Understanding the business cycle helps you prepare for economic ups and downs.',
          philMessage: 'The economy is like a roller coaster - sometimes climbing, sometimes falling. These ups and downs are called the business cycle. Let\'s learn to recognize where we are on the ride and what it means for you!',
        },
        coreConcepts: [
          {
            title: 'What is the Business Cycle?',
            explanation: 'The business cycle refers to the fluctuations in economic activity over time. Economies alternate between periods of expansion (growth) and contraction (decline). These cycles are irregular in length and intensity but follow a general pattern.',
            example: 'The US has experienced about 12 recessions since World War II, averaging one every 6-7 years. The 2008-2009 recession was severe (GDP fell 4%), while the 2020 recession was sharp but brief (GDP fell 9% in one quarter, then rebounded).',
          },
          {
            title: 'Phases of the Business Cycle',
            explanation: 'The four phases are: (1) Expansion - GDP growing, unemployment falling, (2) Peak - highest point before decline begins, (3) Contraction/Recession - GDP falling, unemployment rising, (4) Trough - lowest point before recovery begins. A recession is typically defined as two consecutive quarters of declining GDP.',
            example: 'In 2019, the US was in late expansion (low unemployment, steady growth). February 2020 was the peak. March-April 2020 was a sharp contraction (COVID recession). April 2020 was the trough. May 2020 onward was expansion again.',
          },
          {
            title: 'Causes of Business Cycles',
            explanation: 'Business cycles can be triggered by: demand shocks (changes in consumer or business spending), supply shocks (oil price spikes, pandemics), financial crises (banking collapses), policy changes (interest rate hikes), or confidence shifts. Often multiple factors combine.',
            example: 'The 2008 recession was caused by a financial crisis (housing bubble burst, banks failed). The 2020 recession was a supply shock (pandemic shut down businesses). The early 1980s recession was partly caused by the Fed raising interest rates to fight inflation.',
          },
          {
            title: 'Economic Indicators',
            explanation: 'Economists use indicators to track the business cycle: Leading indicators predict future activity (stock prices, building permits), Coincident indicators move with the economy (GDP, employment), Lagging indicators confirm trends (unemployment rate, corporate profits). Watching these helps anticipate turns.',
            example: 'Stock prices often fall before recessions (leading indicator). GDP falls during recessions (coincident). Unemployment peaks after recessions end (lagging). By the time unemployment is highest, the economy is often already recovering!',
          },
        ],
        personalFinanceConnection: {
          description: 'Business cycles affect your job security, investment returns, and major financial decisions. During expansions, jobs are plentiful and stocks rise. During recessions, layoffs increase and markets fall. Understanding cycles helps you prepare and avoid panic decisions.',
          realWorldExample: 'Build an emergency fund during good times (expansion) when income is stable. Don\'t panic-sell investments during recessions - historically, markets recover. If you\'re job hunting, know that recessions make it harder but expansions create opportunities. Time major purchases accordingly.',
        },
        flashcards: [
          {
            term: 'Business Cycle',
            definition: 'The recurring pattern of expansion and contraction in economic activity over time.',
            philsAnalogy: 'The bamboo economy doesn\'t grow steadily - sometimes it booms (everyone\'s buying bamboo!), sometimes it busts (pandas tighten their belts). That\'s the business cycle!',
          },
          {
            term: 'Recession',
            definition: 'A period of declining economic activity, typically defined as two consecutive quarters of falling GDP.',
            philsAnalogy: 'A recession is when the bamboo economy shrinks - fewer sales, pandas losing jobs, everyone worried. It\'s the "down" part of the cycle.',
          },
          {
            term: 'Leading Indicator',
            definition: 'An economic measure that changes before the overall economy, helping predict future conditions.',
            philsAnalogy: 'When pandas start canceling bamboo orders, that\'s a leading indicator - it predicts the economy will slow down soon!',
          },
          {
            term: 'Expansion',
            definition: 'A phase of the business cycle characterized by increasing GDP, falling unemployment, and general economic growth.',
            philsAnalogy: 'During expansion, bamboo business is booming! More jobs, higher sales, happy pandas. It\'s the "up" part of the cycle.',
          },
        ],
        quiz: [
          {
            question: 'A recession is typically defined as:',
            options: [
              'Any decline in stock prices',
              'Two consecutive quarters of declining GDP',
              'Unemployment above 5%',
              'Inflation above 3%',
            ],
            correctIndex: 1,
            explanation: 'The common definition of recession is two consecutive quarters of declining real GDP. This indicates a sustained contraction in economic activity.',
          },
          {
            question: 'Which is a LEADING economic indicator?',
            options: [
              'Current GDP',
              'Current unemployment rate',
              'Stock market prices',
              'Last quarter\'s corporate profits',
            ],
            correctIndex: 2,
            explanation: 'Stock prices tend to fall before recessions and rise before recoveries, making them a leading indicator. GDP and unemployment are coincident or lagging indicators.',
          },
          {
            question: 'During which phase of the business cycle is unemployment typically HIGHEST?',
            options: [
              'Peak',
              'Expansion',
              'Trough',
              'Early expansion',
            ],
            correctIndex: 2,
            explanation: 'Unemployment peaks at or near the trough (bottom) of the cycle. It\'s a lagging indicator - it keeps rising even after GDP starts recovering.',
          },
          {
            question: 'The 2020 recession was primarily caused by:',
            options: [
              'A financial crisis',
              'High inflation',
              'A supply shock (pandemic)',
              'Government overspending',
            ],
            correctIndex: 2,
            explanation: 'The 2020 recession was caused by the COVID-19 pandemic - a supply shock that shut down businesses and disrupted production. It was unusual in being caused by a health crisis rather than financial imbalances.',
          },
        ],
      },
    ],
    
    gamifiedActivity: {
      id: 'gdp-calculator',
      title: 'GDP Detective',
      description: 'Calculate GDP for a virtual country by categorizing different economic activities. Can you track all the components?',
      instructions: [
        'Review economic transactions',
        'Categorize each as C, I, G, or NX',
        'Calculate total GDP',
        'Compare real vs. nominal values',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {},
  },
  
  {
    id: 'macro-2-unemployment',
    track: 'macroeconomics',
    title: 'Unemployment',
    description: 'Explore the different types of unemployment and their causes. Understand the human and economic costs of joblessness.',
    icon: '👷',
    order: 2,
    
    coreEconomicsConcepts: [
      'Unemployment Rate',
      'Types of Unemployment (Frictional, Structural, Cyclical)',
      'Natural Rate of Unemployment',
      'Labor Force Participation',
      'Underemployment',
    ],
    
    personalFinanceConnection: {
      description: 'Understanding unemployment types helps you prepare for job market challenges. Build skills that reduce structural unemployment risk and maintain an emergency fund for cyclical downturns.',
      relatedPFModules: ['Emergency Fund', 'Career Development'],
    },
    
    investingConnection: [
      'Employment data as economic indicator',
      'Consumer spending and employment',
      'Sector-specific employment trends',
    ],
    
    careerExposure: [
      {
        title: 'Labor Economist',
        description: 'Study employment trends, wage dynamics, and labor market policies.',
        salaryRange: '$70,000 - $130,000',
        skills: ['Labor Market Analysis', 'Policy Evaluation', 'Statistics'],
      },
      {
        title: 'HR Analytics Specialist',
        description: 'Use data to understand workforce trends and help organizations make better hiring and retention decisions.',
        salaryRange: '$65,000 - $110,000',
        skills: ['People Analytics', 'Data Visualization', 'Workforce Planning'],
      },
    ],
    
    lessons: [
      {
        id: 'macro-2-lesson-1',
        title: 'Measuring Unemployment',
        estimatedMinutes: 13,
        intro: {
          hook: 'The unemployment rate is one of the most watched economic numbers. Politicians campaign on it, markets react to it, and it affects millions of lives. But what exactly does it measure, and what does it miss?',
          philMessage: 'Unemployment isn\'t just a statistic - it represents real people without jobs. Understanding how we measure it helps you interpret the news and understand the job market you\'ll be entering!',
        },
        coreConcepts: [
          {
            title: 'Who Counts as Unemployed?',
            explanation: 'To be officially unemployed, you must: (1) Not have a job, (2) Be actively looking for work in the past 4 weeks, (3) Be available to start work. People who aren\'t looking (retirees, students, stay-at-home parents) aren\'t counted as unemployed - they\'re "not in the labor force."',
            example: 'A laid-off worker sending out resumes is unemployed. A college student not looking for work isn\'t unemployed (not in labor force). A discouraged worker who gave up looking isn\'t officially unemployed either, even though they want a job.',
          },
          {
            title: 'The Unemployment Rate',
            explanation: 'The unemployment rate = (Number of Unemployed / Labor Force) × 100. The labor force includes everyone who is either employed or unemployed (actively seeking work). It excludes those not looking for work. The US Bureau of Labor Statistics surveys 60,000 households monthly to calculate this.',
            example: 'If 160 million people are employed and 6 million are unemployed, the labor force is 166 million. The unemployment rate is (6/166) × 100 = 3.6%. This is considered low - "full employment" is often defined as 4-5%.',
          },
          {
            title: 'Labor Force Participation Rate',
            explanation: 'The labor force participation rate = (Labor Force / Working-Age Population) × 100. It shows what percentage of adults are working or looking for work. This rate has declined in the US from 67% in 2000 to about 62% today, due to aging population, more students, and other factors.',
            example: 'If the working-age population is 260 million and the labor force is 166 million, the participation rate is 63.8%. A falling participation rate can mask unemployment - if discouraged workers stop looking, unemployment falls but the job market isn\'t actually better.',
          },
          {
            title: 'Limitations of the Unemployment Rate',
            explanation: 'The official rate misses: (1) Discouraged workers who stopped looking, (2) Underemployed workers (part-time but want full-time), (3) Quality of jobs (wages, benefits). The "U-6" rate includes these marginally attached and underemployed workers and is typically 3-4 percentage points higher.',
            example: 'In 2023, the official unemployment rate (U-3) was about 3.5%, but the U-6 rate was about 7%. This broader measure captures more of the labor market slack that the headline number misses.',
          },
        ],
        personalFinanceConnection: {
          description: 'The unemployment rate affects your job prospects and bargaining power. When unemployment is low, employers compete for workers (higher wages, better benefits). When it\'s high, workers compete for jobs (lower bargaining power). Understanding this helps you time job searches and negotiations.',
          realWorldExample: 'In a tight labor market (low unemployment), you have leverage to negotiate salary, remote work, or better benefits. In a weak market (high unemployment), focus on getting your foot in the door and building skills. The unemployment rate tells you which situation you\'re in.',
        },
        flashcards: [
          {
            term: 'Unemployment Rate',
            definition: 'The percentage of the labor force that is unemployed, calculated as (Unemployed / Labor Force) × 100.',
            philsAnalogy: 'If 100 pandas want to work and 5 can\'t find bamboo-harvesting jobs, the unemployment rate is 5%. It only counts pandas actively looking for work!',
          },
          {
            term: 'Labor Force',
            definition: 'The total number of people who are either employed or actively seeking employment.',
            philsAnalogy: 'The labor force is all pandas who are either working or looking for work. Retired pandas and panda students not seeking jobs aren\'t counted!',
          },
          {
            term: 'Labor Force Participation Rate',
            definition: 'The percentage of the working-age population that is in the labor force (employed or seeking work).',
            philsAnalogy: 'If 100 adult pandas exist and 65 are working or job-hunting, the participation rate is 65%. The other 35 aren\'t in the labor force at all.',
          },
          {
            term: 'Discouraged Worker',
            definition: 'A person who wants a job but has stopped actively looking because they believe no jobs are available for them.',
            philsAnalogy: 'A panda who wants work but gave up looking because they couldn\'t find anything is a discouraged worker. They\'re not counted as unemployed, but they\'re not really employed either!',
          },
        ],
        quiz: [
          {
            question: 'To be counted as officially unemployed, a person must:',
            options: [
              'Simply not have a job',
              'Not have a job and be actively looking for work',
              'Be receiving unemployment benefits',
              'Have been laid off from their previous job',
            ],
            correctIndex: 1,
            explanation: 'Official unemployment requires both not having a job AND actively seeking one. People not looking (by choice or discouragement) aren\'t counted as unemployed.',
          },
          {
            question: 'If discouraged workers start looking for jobs again, the unemployment rate will:',
            options: [
              'Decrease',
              'Increase',
              'Stay the same',
              'Become negative',
            ],
            correctIndex: 1,
            explanation: 'When discouraged workers re-enter the labor force and start looking, they\'re counted as unemployed (until they find jobs). This increases the unemployment rate, even though the job market might actually be improving!',
          },
          {
            question: 'The U-6 unemployment rate is higher than the U-3 rate because it includes:',
            options: [
              'Only full-time workers',
              'Discouraged workers and those working part-time who want full-time work',
              'Retired workers',
              'Self-employed workers',
            ],
            correctIndex: 1,
            explanation: 'U-6 is a broader measure that includes marginally attached workers (including discouraged workers) and those underemployed (part-time but wanting full-time). It captures more labor market distress.',
          },
          {
            question: 'A college student who isn\'t looking for work is classified as:',
            options: [
              'Unemployed',
              'Employed',
              'Not in the labor force',
              'Underemployed',
            ],
            correctIndex: 2,
            explanation: 'People not seeking work are "not in the labor force." They\'re neither employed nor unemployed. This includes students, retirees, and stay-at-home parents by choice.',
          },
        ],
      },
      {
        id: 'macro-2-lesson-2',
        title: 'Types of Unemployment',
        estimatedMinutes: 14,
        intro: {
          hook: 'Not all unemployment is the same. Some people are between jobs, others have skills that don\'t match available jobs, and still others are out of work because the economy is in recession. Understanding these types helps us know what policies might help.',
          philMessage: 'Unemployment comes in different flavors, and each has different causes and solutions. Some unemployment is actually healthy for the economy! Let\'s sort out the types and what they mean.',
        },
        coreConcepts: [
          {
            title: 'Frictional Unemployment',
            explanation: 'Frictional unemployment occurs when workers are temporarily between jobs or searching for better matches. It exists even in a healthy economy because job searching takes time. New graduates looking for first jobs and workers voluntarily switching careers experience frictional unemployment.',
            example: 'A software engineer who quits to find a better job is frictionally unemployed during the search. A recent college graduate interviewing at multiple companies is frictionally unemployed. This type is usually short-term and often voluntary.',
          },
          {
            title: 'Structural Unemployment',
            explanation: 'Structural unemployment occurs when workers\' skills don\'t match available jobs, often due to technological change, globalization, or shifts in the economy. It can be long-lasting because workers need to retrain or relocate. It\'s more painful than frictional unemployment.',
            example: 'Coal miners in Appalachia face structural unemployment as the industry declines. Factory workers replaced by robots face structural unemployment. Their skills don\'t match the jobs available in their area, and retraining takes time.',
          },
          {
            title: 'Cyclical Unemployment',
            explanation: 'Cyclical unemployment rises and falls with the business cycle. During recessions, demand for goods and services drops, so businesses lay off workers. During expansions, demand rises and unemployment falls. This is the type that macroeconomic policy tries to address.',
            example: 'During the 2008 recession, unemployment rose from 5% to 10% as businesses cut workers due to falling demand. As the economy recovered, cyclical unemployment gradually disappeared. The 2020 pandemic caused a sharp spike in cyclical unemployment.',
          },
          {
            title: 'The Natural Rate of Unemployment',
            explanation: 'The natural rate of unemployment is the level that exists when the economy is at "full employment" - it includes frictional and structural unemployment but not cyclical. In the US, it\'s estimated at 4-5%. Unemployment below this level is unsustainable and can cause inflation.',
            example: 'If the natural rate is 4.5% and actual unemployment is 3.5%, the economy is "running hot" - there\'s negative cyclical unemployment. If actual unemployment is 7%, there\'s 2.5% cyclical unemployment that policy should address.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding unemployment types helps you manage career risk. Frictional unemployment is normal during job transitions - have savings to cover it. Structural unemployment is a bigger threat - continuously update your skills to stay relevant. Cyclical unemployment affects everyone during recessions - diversify your income sources.',
          realWorldExample: 'If you work in an industry facing structural decline (like traditional retail), don\'t wait to be laid off. Start building skills in growing fields now. If you\'re in a cyclical industry (like construction), build a larger emergency fund because your job is more recession-sensitive.',
        },
        flashcards: [
          {
            term: 'Frictional Unemployment',
            definition: 'Short-term unemployment that occurs when workers are between jobs or searching for better matches.',
            philsAnalogy: 'A panda who quit their bamboo-sorting job to find a better bamboo-tasting job is frictionally unemployed. It\'s temporary and often by choice!',
          },
          {
            term: 'Structural Unemployment',
            definition: 'Unemployment caused by a mismatch between workers\' skills and available jobs, often due to economic changes.',
            philsAnalogy: 'When bamboo-harvesting machines replace panda harvesters, those pandas face structural unemployment. Their old skills don\'t match new jobs - they need to retrain!',
          },
          {
            term: 'Cyclical Unemployment',
            definition: 'Unemployment that rises during recessions and falls during expansions, caused by fluctuations in overall economic demand.',
            philsAnalogy: 'When the bamboo economy enters recession and pandas buy less, bamboo workers get laid off. That\'s cyclical unemployment - it goes away when the economy recovers!',
          },
          {
            term: 'Natural Rate of Unemployment',
            definition: 'The unemployment rate when the economy is at full employment, including frictional and structural but not cyclical unemployment.',
            philsAnalogy: 'Even in a perfect panda economy, some unemployment exists (job searching, skill mismatches). That baseline level is the natural rate - maybe 4-5%.',
          },
        ],
        quiz: [
          {
            question: 'A recent college graduate searching for their first job is experiencing:',
            options: [
              'Structural unemployment',
              'Cyclical unemployment',
              'Frictional unemployment',
              'Seasonal unemployment',
            ],
            correctIndex: 2,
            explanation: 'Job searching after graduation is frictional unemployment - it\'s the normal time needed to find a good job match. It\'s temporary and part of a healthy labor market.',
          },
          {
            question: 'Factory workers laid off because robots replaced their jobs are experiencing:',
            options: [
              'Frictional unemployment',
              'Structural unemployment',
              'Cyclical unemployment',
              'Voluntary unemployment',
            ],
            correctIndex: 1,
            explanation: 'When technology eliminates jobs and workers\' skills no longer match available positions, that\'s structural unemployment. It requires retraining or relocation to resolve.',
          },
          {
            question: 'During a recession, unemployment rises primarily due to:',
            options: [
              'More people entering the labor force',
              'Decreased demand for goods and services',
              'Technological change',
              'Workers being too picky about jobs',
            ],
            correctIndex: 1,
            explanation: 'Recessions cause cyclical unemployment because falling demand leads businesses to cut production and lay off workers. When demand recovers, so does employment.',
          },
          {
            question: 'The natural rate of unemployment:',
            options: [
              'Is always zero in a healthy economy',
              'Includes frictional and structural but not cyclical unemployment',
              'Only exists during recessions',
              'Is set by the government',
            ],
            correctIndex: 1,
            explanation: 'The natural rate is the baseline unemployment that exists even in a healthy economy due to job searching (frictional) and skill mismatches (structural). Cyclical unemployment is the deviation from this natural rate.',
          },
        ],
      },
      {
        id: 'macro-2-lesson-3',
        title: 'Costs of Unemployment',
        estimatedMinutes: 12,
        intro: {
          hook: 'Unemployment isn\'t just a number - it has real costs for individuals, families, and society. Lost income, deteriorating skills, and psychological harm make unemployment one of the most painful economic experiences.',
          philMessage: 'Behind every unemployment statistic is a person struggling to pay bills, support their family, and maintain their sense of purpose. Understanding these costs helps us appreciate why fighting unemployment matters so much.',
        },
        coreConcepts: [
          {
            title: 'Individual Costs of Unemployment',
            explanation: 'Unemployed individuals suffer: lost income (often 50%+ reduction in living standards), skill deterioration (skills rust without use), psychological harm (depression, anxiety, loss of self-worth), and long-term career damage (gaps on resumes, lower future earnings). These effects can persist long after finding new work.',
            example: 'Studies show that workers laid off during recessions earn 15-20% less than similar workers even 15-20 years later. The "scarring effect" of unemployment follows people throughout their careers, especially for young workers.',
          },
          {
            title: 'Social Costs of Unemployment',
            explanation: 'Society bears costs too: lost output (GDP below potential), increased government spending (unemployment benefits, social services), reduced tax revenue, higher crime rates, worse health outcomes, and social instability. High unemployment can tear at the social fabric.',
            example: 'During the Great Depression, unemployment reached 25%. Beyond the economic devastation, it contributed to social unrest, political extremism, and lasting psychological trauma for a generation. The costs extended far beyond lost paychecks.',
          },
          {
            title: 'Okun\'s Law',
            explanation: 'Okun\'s Law describes the relationship between unemployment and GDP. Roughly, for every 1 percentage point unemployment exceeds the natural rate, GDP is about 2% below its potential. This quantifies the economic cost of cyclical unemployment.',
            example: 'If the natural rate is 4% and actual unemployment is 7%, that\'s 3 percentage points of excess unemployment. By Okun\'s Law, GDP is about 6% below potential - trillions of dollars in lost output annually.',
          },
          {
            title: 'Unequal Impact of Unemployment',
            explanation: 'Unemployment doesn\'t affect everyone equally. Young workers, minorities, and less-educated workers typically face higher unemployment rates. Recessions hit these groups hardest, widening inequality. Geographic concentration of unemployment (like in declining industrial areas) creates persistent pockets of distress.',
            example: 'In 2020, while overall unemployment peaked at 14.7%, Black unemployment reached 16.8% and Hispanic unemployment 18.9%. Young workers (16-24) saw rates above 25%. Unemployment\'s burden falls disproportionately on vulnerable groups.',
          },
        ],
        personalFinanceConnection: {
          description: 'The costs of unemployment underscore why building financial resilience matters. Emergency funds, marketable skills, and professional networks are your insurance against unemployment\'s devastating effects. Prevention is far better than cure.',
          realWorldExample: 'Financial advisors recommend 3-6 months of expenses in emergency savings, but if you\'re in a volatile industry or early in your career, consider 6-12 months. Also invest in skills that transfer across industries - communication, data analysis, project management - to reduce structural unemployment risk.',
        },
        flashcards: [
          {
            term: 'Scarring Effect',
            definition: 'The long-lasting negative impact of unemployment on workers\' future earnings and career prospects.',
            philsAnalogy: 'A panda who was unemployed for a year might earn less for decades afterward - that\'s the scarring effect. The wound heals, but the scar remains!',
          },
          {
            term: 'Okun\'s Law',
            definition: 'The observation that for every 1% unemployment exceeds the natural rate, GDP is approximately 2% below potential.',
            philsAnalogy: 'Okun\'s Law says idle pandas are expensive! Each percentage point of excess unemployment means Panda Land produces 2% less bamboo than it could.',
          },
          {
            term: 'Potential GDP',
            definition: 'The level of output an economy can produce when operating at full employment with normal utilization of resources.',
            philsAnalogy: 'Potential GDP is how much bamboo Panda Land could produce if all pandas who wanted to work had jobs. Actual GDP during recessions falls below this potential.',
          },
        ],
        quiz: [
          {
            question: 'The "scarring effect" of unemployment refers to:',
            options: [
              'Physical injuries from dangerous jobs',
              'Long-lasting negative impacts on future earnings and careers',
              'Damage to factory equipment',
              'Environmental pollution from closed factories',
            ],
            correctIndex: 1,
            explanation: 'The scarring effect describes how unemployment, especially during recessions, can permanently reduce workers\' earnings potential and career trajectories, even after they find new jobs.',
          },
          {
            question: 'According to Okun\'s Law, if unemployment is 2 percentage points above the natural rate, GDP is approximately:',
            options: [
              '2% below potential',
              '4% below potential',
              '1% below potential',
              '2% above potential',
            ],
            correctIndex: 1,
            explanation: 'Okun\'s Law states that each percentage point of excess unemployment corresponds to about 2% of lost GDP. So 2 points × 2% = 4% below potential.',
          },
          {
            question: 'Which group typically experiences the HIGHEST unemployment rates during recessions?',
            options: [
              'Middle-aged workers with college degrees',
              'Young workers and minorities',
              'Government employees',
              'Healthcare workers',
            ],
            correctIndex: 1,
            explanation: 'Young workers and minorities consistently face higher unemployment rates, and these disparities widen during recessions. They\'re often "last hired, first fired."',
          },
          {
            question: 'Social costs of unemployment include all of the following EXCEPT:',
            options: [
              'Lost economic output',
              'Higher government spending on benefits',
              'Increased innovation',
              'Higher crime rates',
            ],
            correctIndex: 2,
            explanation: 'Unemployment generally reduces innovation as R&D budgets are cut and workers lose skills. The other options are all documented social costs of high unemployment.',
          },
        ],
      },
      {
        id: 'macro-2-lesson-4',
        title: 'Policies to Address Unemployment',
        estimatedMinutes: 13,
        intro: {
          hook: 'What can be done about unemployment? Different types require different solutions. Cyclical unemployment calls for stimulus, structural unemployment needs retraining, and frictional unemployment might just need better job-matching technology.',
          philMessage: 'Now that we understand unemployment, let\'s explore solutions! Governments and markets both play roles in getting people back to work. The right policy depends on what\'s causing the unemployment.',
        },
        coreConcepts: [
          {
            title: 'Addressing Cyclical Unemployment',
            explanation: 'Cyclical unemployment is fought with macroeconomic policy. Monetary policy (lower interest rates) and fiscal policy (government spending, tax cuts) can boost demand, encouraging businesses to hire. The goal is to close the gap between actual and potential GDP.',
            example: 'During the 2008 recession, the Fed cut interest rates to near zero and the government passed stimulus packages. During 2020, similar policies plus direct payments to households helped reduce cyclical unemployment faster than after 2008.',
          },
          {
            title: 'Addressing Structural Unemployment',
            explanation: 'Structural unemployment requires supply-side policies: job training and education programs, relocation assistance, reducing barriers to new industries, and supporting entrepreneurship. These take longer to work than demand-side policies but address the root cause.',
            example: 'Programs that retrain coal miners for solar panel installation or manufacturing address structural unemployment. Community colleges offering coding bootcamps help workers transition to tech jobs. These investments in human capital create lasting solutions.',
          },
          {
            title: 'Addressing Frictional Unemployment',
            explanation: 'Frictional unemployment can be reduced by improving job matching: better job boards and search technology, career counseling, and reducing information gaps between employers and job seekers. Some frictional unemployment is healthy, so the goal isn\'t zero.',
            example: 'LinkedIn and Indeed have reduced frictional unemployment by making it easier to find and apply for jobs. Unemployment insurance that allows time for good matches (rather than forcing workers to take the first job) can actually improve outcomes.',
          },
          {
            title: 'Unemployment Insurance',
            explanation: 'Unemployment insurance provides temporary income to laid-off workers while they search for new jobs. It reduces the personal cost of unemployment and stabilizes the economy (unemployed workers keep spending). However, very generous benefits might extend job searches, so design matters.',
            example: 'In the US, unemployment insurance typically replaces about 40-50% of previous wages for up to 26 weeks. During recessions, benefits are often extended. The 2020 pandemic saw unprecedented $600/week federal supplements to help workers through the crisis.',
          },
        ],
        personalFinanceConnection: {
          description: 'Know your unemployment insurance options before you need them. Understand eligibility, benefit amounts, and duration in your state. Also invest in your own "insurance" - skills, savings, and networks that help you bounce back faster from job loss.',
          realWorldExample: 'If you lose your job, file for unemployment immediately - there\'s often a waiting period. Use the time productively: update skills, expand your network, and consider whether this is an opportunity to pivot careers. Many successful career changes started with an unexpected layoff.',
        },
        flashcards: [
          {
            term: 'Monetary Policy',
            definition: 'Central bank actions to influence the economy, primarily through adjusting interest rates and the money supply.',
            philsAnalogy: 'When the Panda Central Bank lowers interest rates, it\'s cheaper to borrow, businesses invest more, and they hire more pandas. That\'s monetary policy fighting unemployment!',
          },
          {
            term: 'Fiscal Policy',
            definition: 'Government decisions about spending and taxation to influence the economy.',
            philsAnalogy: 'When the panda government spends more on bamboo infrastructure or cuts taxes, it puts money in pandas\' pockets, boosting demand and creating jobs. That\'s fiscal policy!',
          },
          {
            term: 'Unemployment Insurance',
            definition: 'Government program providing temporary income to workers who lose their jobs through no fault of their own.',
            philsAnalogy: 'Unemployment insurance is like a safety net for pandas who get laid off. It helps them pay for bamboo while they search for a new job!',
          },
          {
            term: 'Job Training Programs',
            definition: 'Government or private programs that help workers develop new skills to match available jobs.',
            philsAnalogy: 'When bamboo-harvesting jobs disappear, job training helps those pandas learn bamboo-processing or bamboo-marketing skills. It\'s the cure for structural unemployment!',
          },
        ],
        quiz: [
          {
            question: 'Cyclical unemployment is best addressed by:',
            options: [
              'Job training programs',
              'Monetary and fiscal policy to boost demand',
              'Better job search websites',
              'Reducing minimum wage',
            ],
            correctIndex: 1,
            explanation: 'Cyclical unemployment is caused by insufficient demand during recessions. Monetary policy (lower rates) and fiscal policy (stimulus) boost demand, encouraging hiring.',
          },
          {
            question: 'Structural unemployment is best addressed by:',
            options: [
              'Lowering interest rates',
              'Government spending increases',
              'Education and job training programs',
              'Extending unemployment benefits',
            ],
            correctIndex: 2,
            explanation: 'Structural unemployment results from skill mismatches. Training and education help workers develop skills that match available jobs - a supply-side solution.',
          },
          {
            question: 'Unemployment insurance helps the economy by:',
            options: [
              'Eliminating all unemployment',
              'Allowing unemployed workers to keep spending, stabilizing demand',
              'Forcing workers to take any available job immediately',
              'Reducing the labor force',
            ],
            correctIndex: 1,
            explanation: 'Unemployment insurance acts as an "automatic stabilizer" - it maintains consumer spending during downturns, preventing a deeper spiral of falling demand and more layoffs.',
          },
          {
            question: 'Which policy would LEAST effectively reduce frictional unemployment?',
            options: [
              'Better online job boards',
              'Career counseling services',
              'Lower interest rates',
              'Job fairs connecting employers and job seekers',
            ],
            correctIndex: 2,
            explanation: 'Lower interest rates address cyclical unemployment (demand-side). Frictional unemployment is about job matching, which is improved by better information and connections, not interest rates.',
          },
        ],
        careerSpotlight: {
          title: 'Labor Economist',
          description: 'Labor economists study employment, wages, and workforce dynamics. They analyze labor market trends, evaluate employment policies, and help organizations understand workforce issues. They work for government agencies, research institutions, and consulting firms.',
          salaryRange: '$70,000 - $130,000',
          skills: ['Statistical Analysis', 'Labor Market Research', 'Policy Evaluation', 'Data Visualization'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'job-market-sim',
      title: 'Job Market Simulator',
      description: 'Match workers with jobs in a dynamic economy. See how different types of unemployment emerge and what policies can help.',
      instructions: [
        'View available workers and jobs',
        'Identify why some workers are unemployed',
        'Implement policy interventions',
        'Track the unemployment rate',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'macro-1-gdp-growth',
    },
  },
  
  {
    id: 'macro-3-inflation',
    track: 'macroeconomics',
    title: 'Inflation & Price Levels',
    description: 'Understand why prices rise over time and how inflation affects purchasing power. Learn to protect your finances from inflation\'s hidden tax.',
    icon: '💸',
    order: 3,
    
    coreEconomicsConcepts: [
      'Inflation and Deflation',
      'Consumer Price Index (CPI)',
      'Causes of Inflation (Demand-Pull, Cost-Push)',
      'Real vs. Nominal Values',
      'Hyperinflation',
    ],
    
    personalFinanceConnection: {
      description: 'Inflation erodes your savings and purchasing power. Learn why keeping all your money in a checking account loses value and how to invest to beat inflation.',
      relatedPFModules: ['Savings Strategies', 'Investment Basics'],
    },
    
    investingConnection: [
      'Inflation-protected securities (TIPS)',
      'Real estate as inflation hedge',
      'Stock returns and inflation',
    ],
    
    careerExposure: [
      {
        title: 'Inflation Analyst',
        description: 'Track price changes and inflation trends for central banks, financial institutions, or research organizations.',
        salaryRange: '$65,000 - $115,000',
        skills: ['Price Index Analysis', 'Economic Forecasting', 'Data Collection'],
      },
      {
        title: 'Fixed Income Analyst',
        description: 'Analyze bonds and interest rate products, with special attention to inflation expectations.',
        salaryRange: '$75,000 - $140,000',
        skills: ['Bond Valuation', 'Interest Rate Analysis', 'Risk Assessment'],
      },
    ],
    
    lessons: [
      {
        id: 'macro-3-lesson-1',
        title: 'What is Inflation?',
        estimatedMinutes: 13,
        intro: {
          hook: 'A movie ticket cost $4 in 1990 and $12 today. A house that cost $100,000 then costs $400,000 now. Why do prices keep rising? The answer is inflation - and understanding it is crucial for protecting your financial future.',
          philMessage: 'Inflation is like a slow leak in your wallet - your money gradually loses purchasing power over time. Let\'s understand what causes it, how we measure it, and why it matters for your finances!',
        },
        coreConcepts: [
          {
            title: 'Inflation Defined',
            explanation: 'Inflation is a sustained increase in the general price level of goods and services over time. It means your money buys less than it used to. A little inflation (2-3%) is normal and even healthy. High inflation (10%+) is problematic. Deflation (falling prices) can also cause problems.',
            example: 'If inflation is 3% per year, something that costs $100 today will cost $103 next year. Over 20 years, that $100 item would cost about $180. Your money\'s purchasing power erodes over time.',
          },
          {
            title: 'The Consumer Price Index (CPI)',
            explanation: 'The CPI measures inflation by tracking the cost of a "basket" of goods and services that typical consumers buy - food, housing, transportation, healthcare, etc. The Bureau of Labor Statistics surveys prices monthly and calculates how much the basket\'s cost has changed.',
            example: 'The CPI basket includes about 80,000 items. If the basket cost $100 in the base year and costs $110 now, the CPI is 110, meaning prices are 10% higher. The annual percentage change in CPI is the inflation rate.',
          },
          {
            title: 'Core Inflation vs. Headline Inflation',
            explanation: 'Headline inflation includes all items in the CPI. Core inflation excludes food and energy prices because they\'re volatile and can obscure underlying trends. Economists often focus on core inflation to see the "true" inflation trend without short-term noise.',
            example: 'If oil prices spike due to a Middle East crisis, headline inflation might jump to 5%, but core inflation might stay at 2%. The Fed focuses more on core inflation because the oil spike is temporary and not something monetary policy should react to.',
          },
          {
            title: 'Real vs. Nominal Values',
            explanation: 'Nominal values are measured in current dollars. Real values are adjusted for inflation to show purchasing power. To convert nominal to real, divide by a price index. This distinction is crucial for comparing values across time.',
            example: 'Minimum wage was $3.35 in 1981 and $7.25 in 2023. Nominally, it more than doubled. But adjusted for inflation, $3.35 in 1981 equals about $11 in 2023 dollars. Real minimum wage actually FELL - it buys less today than in 1981.',
          },
        ],
        personalFinanceConnection: {
          description: 'Inflation is the silent enemy of savers. Money sitting in a checking account loses purchasing power every year. Understanding inflation motivates you to invest your savings in assets that grow faster than inflation - stocks, real estate, inflation-protected bonds.',
          realWorldExample: 'If you keep $10,000 in a savings account earning 0.5% while inflation is 3%, you lose 2.5% purchasing power annually. After 10 years, your $10,000 can only buy what $7,800 could buy today. Inflation punishes holding cash!',
        },
        flashcards: [
          {
            term: 'Inflation',
            definition: 'A sustained increase in the general price level of goods and services, reducing the purchasing power of money.',
            philsAnalogy: 'Inflation is like my bamboo getting more expensive every year. The same amount of money buys less and less bamboo over time!',
          },
          {
            term: 'Consumer Price Index (CPI)',
            definition: 'A measure of the average change in prices paid by consumers for a basket of goods and services.',
            philsAnalogy: 'The CPI tracks how much a typical panda\'s shopping basket costs. If it goes from 100 to 105, prices rose 5%!',
          },
          {
            term: 'Core Inflation',
            definition: 'Inflation measured excluding volatile food and energy prices to show underlying price trends.',
            philsAnalogy: 'Core inflation ignores bamboo price spikes from bad harvests. It shows the steady underlying trend, not temporary craziness!',
          },
          {
            term: 'Purchasing Power',
            definition: 'The quantity of goods and services that can be purchased with a unit of currency.',
            philsAnalogy: 'Purchasing power is how much bamboo my dollar can buy. When inflation rises, my purchasing power falls - same dollar, less bamboo!',
          },
        ],
        quiz: [
          {
            question: 'Inflation is best defined as:',
            options: [
              'An increase in the price of one specific good',
              'A sustained increase in the general price level',
              'The government printing money',
              'Rising stock prices',
            ],
            correctIndex: 1,
            explanation: 'Inflation refers to a broad, sustained increase in the overall price level, not just one product. It\'s measured across a basket of goods and services.',
          },
          {
            question: 'The CPI measures inflation by:',
            options: [
              'Counting how much money the government prints',
              'Tracking the cost of a basket of goods typical consumers buy',
              'Measuring GDP growth',
              'Surveying how much people think prices have risen',
            ],
            correctIndex: 1,
            explanation: 'The CPI tracks the cost of a representative basket of consumer goods and services. Changes in this cost over time measure inflation.',
          },
          {
            question: 'Why do economists often focus on "core" inflation?',
            options: [
              'It\'s always higher than headline inflation',
              'It excludes volatile food and energy prices to show underlying trends',
              'It\'s easier to calculate',
              'The government prefers it',
            ],
            correctIndex: 1,
            explanation: 'Core inflation excludes food and energy because their prices are volatile due to weather, geopolitics, etc. Core inflation shows the underlying trend that monetary policy can influence.',
          },
          {
            question: 'If your salary rises 4% but inflation is 5%, your REAL income:',
            options: [
              'Increased by 4%',
              'Increased by 9%',
              'Decreased by about 1%',
              'Stayed the same',
            ],
            correctIndex: 2,
            explanation: 'Real income change ≈ Nominal change - Inflation = 4% - 5% = -1%. Even though your paycheck is bigger, it buys less than before.',
          },
        ],
      },
      {
        id: 'macro-3-lesson-2',
        title: 'Causes of Inflation',
        estimatedMinutes: 14,
        intro: {
          hook: 'What makes prices rise? Is it greedy corporations? The government printing money? Too much spending? Actually, inflation can come from multiple sources, and understanding them helps us know what policies might work.',
          philMessage: 'Inflation isn\'t just one thing - it has different causes that require different solutions. Let\'s explore demand-pull, cost-push, and monetary inflation. Knowing the cause helps identify the cure!',
        },
        coreConcepts: [
          {
            title: 'Demand-Pull Inflation',
            explanation: 'Demand-pull inflation occurs when aggregate demand exceeds the economy\'s ability to produce goods and services. "Too much money chasing too few goods." When everyone wants to buy more than can be produced, prices get bid up.',
            example: 'During the post-COVID recovery in 2021, consumers had lots of savings and stimulus money, but supply chains were disrupted. Strong demand + limited supply = prices rose rapidly. People were bidding up prices for cars, houses, and goods.',
          },
          {
            title: 'Cost-Push Inflation',
            explanation: 'Cost-push inflation occurs when production costs rise, pushing up prices. This can come from higher wages, more expensive raw materials, or supply disruptions. Unlike demand-pull, it originates from the supply side of the economy.',
            example: 'When oil prices spiked in the 1970s due to OPEC embargoes, it raised costs for transportation, manufacturing, and heating. These higher costs were passed on to consumers as higher prices throughout the economy.',
          },
          {
            title: 'Monetary Inflation',
            explanation: 'Monetary inflation results from excessive growth in the money supply. When the central bank creates too much money, each dollar becomes worth less. This is the classic "printing money" cause of inflation. In extreme cases, it leads to hyperinflation.',
            example: 'Zimbabwe in the 2000s printed money to pay government bills. The result was hyperinflation reaching billions of percent per year. Prices doubled every few hours. Venezuela experienced similar monetary inflation in the 2010s.',
          },
          {
            title: 'Inflation Expectations',
            explanation: 'Expectations can become self-fulfilling. If people expect inflation, workers demand higher wages and businesses raise prices preemptively, causing the expected inflation to actually occur. This is why central banks work hard to "anchor" inflation expectations around their target.',
            example: 'If workers expect 5% inflation, they\'ll demand 5% raises. Businesses facing higher labor costs raise prices 5%. The expectation caused the inflation! The Fed tries to keep expectations anchored at 2% to prevent this spiral.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding inflation\'s causes helps you anticipate it. Watch for signs: strong consumer spending (demand-pull), rising oil or commodity prices (cost-push), or aggressive Fed money creation (monetary). Adjust your investments and major purchases accordingly.',
          realWorldExample: 'In early 2021, signs of demand-pull inflation were clear: stimulus checks, reopening economy, supply shortages. Savvy observers locked in low mortgage rates and made major purchases before prices rose further. Understanding causes helps you act early.',
        },
        flashcards: [
          {
            term: 'Demand-Pull Inflation',
            definition: 'Inflation caused by aggregate demand exceeding the economy\'s productive capacity - "too much money chasing too few goods."',
            philsAnalogy: 'When every panda wants bamboo but there\'s not enough, we bid up the price. That\'s demand-pull inflation - too many hungry pandas, not enough bamboo!',
          },
          {
            term: 'Cost-Push Inflation',
            definition: 'Inflation caused by increases in production costs, such as wages or raw materials, that are passed on to consumers.',
            philsAnalogy: 'If bamboo farming costs rise (expensive fertilizer, higher wages), farmers charge more for bamboo. That\'s cost-push inflation - costs push prices up!',
          },
          {
            term: 'Hyperinflation',
            definition: 'Extremely rapid inflation, typically exceeding 50% per month, often caused by excessive money printing.',
            philsAnalogy: 'Hyperinflation is when bamboo prices double every week! Your savings become worthless. It happens when the government prints way too much money.',
          },
          {
            term: 'Inflation Expectations',
            definition: 'People\'s beliefs about future inflation, which can become self-fulfilling as they adjust behavior accordingly.',
            philsAnalogy: 'If pandas expect bamboo prices to rise 10%, they demand 10% higher wages, and bamboo sellers raise prices 10%. The expectation made it happen!',
          },
        ],
        quiz: [
          {
            question: 'Demand-pull inflation is caused by:',
            options: [
              'Rising production costs',
              'Aggregate demand exceeding productive capacity',
              'Government price controls',
              'Falling consumer confidence',
            ],
            correctIndex: 1,
            explanation: 'Demand-pull inflation occurs when total spending (demand) exceeds what the economy can produce. The excess demand bids up prices.',
          },
          {
            question: 'An oil price shock that raises transportation and manufacturing costs would cause:',
            options: [
              'Demand-pull inflation',
              'Cost-push inflation',
              'Deflation',
              'No change in prices',
            ],
            correctIndex: 1,
            explanation: 'Rising input costs (like oil) push up production costs, which are passed to consumers as higher prices. This is cost-push inflation originating from the supply side.',
          },
          {
            question: 'Hyperinflation is typically caused by:',
            options: [
              'Strong economic growth',
              'Excessive money supply growth',
              'High interest rates',
              'Trade surpluses',
            ],
            correctIndex: 1,
            explanation: 'Hyperinflation almost always results from governments printing excessive amounts of money, often to pay debts. Each unit of currency becomes worth less and less.',
          },
          {
            question: 'Why do central banks care about inflation expectations?',
            options: [
              'Expectations don\'t matter for actual inflation',
              'Expected inflation can become self-fulfilling',
              'Only actual inflation matters',
              'Expectations are easy to control',
            ],
            correctIndex: 1,
            explanation: 'If people expect inflation, they act in ways that cause it (demanding higher wages, raising prices preemptively). Anchoring expectations at low levels helps keep actual inflation low.',
          },
        ],
      },
      {
        id: 'macro-3-lesson-3',
        title: 'Costs of Inflation',
        estimatedMinutes: 13,
        intro: {
          hook: 'A little inflation seems harmless - prices go up 2-3% a year, no big deal, right? But inflation has real costs that can hurt individuals and the economy. And high inflation? That\'s seriously damaging.',
          philMessage: 'Inflation isn\'t just numbers on a chart - it redistributes wealth, distorts decisions, and can destabilize economies. Let\'s understand why keeping inflation low and stable matters so much!',
        },
        coreConcepts: [
          {
            title: 'Erosion of Purchasing Power',
            explanation: 'Inflation reduces what your money can buy. People on fixed incomes (retirees, bondholders) are hurt because their income doesn\'t rise with prices. Savers are hurt because their savings buy less over time. This is inflation\'s most direct cost.',
            example: 'A retiree living on a fixed $3,000/month pension sees their purchasing power fall every year with inflation. At 3% inflation, after 10 years their $3,000 only buys what $2,230 could buy when they retired. They\'re effectively getting poorer.',
          },
          {
            title: 'Redistribution of Wealth',
            explanation: 'Inflation redistributes wealth from creditors to debtors. If you borrowed $100,000 at fixed interest and inflation rises, you repay with dollars that are worth less. Lenders lose, borrowers win. This arbitrary redistribution is unfair and economically harmful.',
            example: 'If you have a 30-year mortgage at 3% fixed and inflation rises to 7%, you\'re effectively being paid to borrow! Your payments stay the same while your income rises with inflation. Banks and bondholders lose purchasing power on what they\'re repaid.',
          },
          {
            title: 'Menu Costs and Shoe-Leather Costs',
            explanation: 'Menu costs are the costs of changing prices - reprinting menus, updating systems, renegotiating contracts. Shoe-leather costs are the time and effort spent minimizing cash holdings when inflation is high. Both waste resources that could be used productively.',
            example: 'During high inflation, businesses constantly update prices, which takes time and money. Consumers make frequent bank trips to avoid holding cash that loses value. In hyperinflation, people spend hours daily managing money instead of working productively.',
          },
          {
            title: 'Uncertainty and Reduced Investment',
            explanation: 'High or unpredictable inflation makes planning difficult. Businesses hesitate to invest when they can\'t predict future costs and prices. Long-term contracts become risky. This uncertainty reduces economic growth and efficiency.',
            example: 'Would you sign a 10-year contract if you had no idea what inflation would be? Businesses facing uncertain inflation invest less, hire less, and focus on short-term survival rather than long-term growth. The economy suffers.',
          },
        ],
        personalFinanceConnection: {
          description: 'Inflation\'s costs explain why you should invest rather than hold cash, why fixed-rate debt can be advantageous, and why inflation-protected investments (TIPS, I-bonds) exist. Structure your finances to benefit from, or at least not be hurt by, moderate inflation.',
          realWorldExample: 'A 30-year fixed mortgage is a bet that inflation will make your payments easier over time. If you locked in 3% in 2020 and inflation ran 7% in 2022, you\'re winning! Your payment stays fixed while your income rises. Inflation helps debtors.',
        },
        flashcards: [
          {
            term: 'Fixed Income',
            definition: 'Income that doesn\'t change with inflation, such as pensions, bonds, or annuities, making recipients vulnerable to inflation.',
            philsAnalogy: 'If my bamboo allowance is fixed at $100/month forever, inflation makes me poorer each year. I\'m on a fixed income - prices rise but my allowance doesn\'t!',
          },
          {
            term: 'Menu Costs',
            definition: 'The costs businesses incur to change prices, including updating price lists, menus, catalogs, and systems.',
            philsAnalogy: 'Every time I have to reprint my bamboo smoothie menu because of inflation, that\'s a menu cost. It wastes time and money!',
          },
          {
            term: 'Shoe-Leather Costs',
            definition: 'The time and effort spent minimizing cash holdings during inflation, metaphorically wearing out shoes walking to the bank.',
            philsAnalogy: 'During high inflation, I run to the bank constantly to avoid holding cash that loses value. I\'m wearing out my panda paws - that\'s shoe-leather cost!',
          },
          {
            term: 'Inflation-Protected Securities',
            definition: 'Bonds whose principal or interest payments adjust with inflation, protecting investors from purchasing power loss.',
            philsAnalogy: 'TIPS (Treasury Inflation-Protected Securities) are like bamboo bonds that grow with inflation. If prices rise 5%, my bond value rises 5% too!',
          },
        ],
        quiz: [
          {
            question: 'Who is MOST hurt by unexpected inflation?',
            options: [
              'People with large mortgages',
              'People living on fixed pensions',
              'People with variable-rate income',
              'People with lots of debt',
            ],
            correctIndex: 1,
            explanation: 'Fixed-income recipients (like pensioners) see their purchasing power erode because their income doesn\'t rise with prices. Debtors actually benefit as they repay with cheaper dollars.',
          },
          {
            question: 'Inflation redistributes wealth from:',
            options: [
              'Debtors to creditors',
              'Creditors to debtors',
              'Young to old',
              'Government to citizens',
            ],
            correctIndex: 1,
            explanation: 'Inflation helps debtors (who repay with less valuable dollars) and hurts creditors (who receive less valuable dollars). This is why lenders demand higher interest rates when they expect inflation.',
          },
          {
            question: '"Menu costs" refer to:',
            options: [
              'The cost of food at restaurants',
              'The costs of changing prices during inflation',
              'Government spending on inflation control',
              'The cost of printing money',
            ],
            correctIndex: 1,
            explanation: 'Menu costs are the resources businesses spend updating prices - literally reprinting menus, but also updating systems, catalogs, and contracts. These are wasted resources.',
          },
          {
            question: 'High inflation reduces investment because:',
            options: [
              'Interest rates are always low during inflation',
              'Uncertainty makes long-term planning difficult',
              'Businesses have too much cash',
              'Workers don\'t want to work',
            ],
            correctIndex: 1,
            explanation: 'When inflation is high or unpredictable, businesses can\'t forecast costs and revenues, making long-term investments risky. They hold back, hurting economic growth.',
          },
        ],
      },
      {
        id: 'macro-3-lesson-4',
        title: 'Deflation and the Inflation Target',
        estimatedMinutes: 12,
        intro: {
          hook: 'If inflation is bad, is deflation (falling prices) good? Actually, deflation can be even worse! And that\'s why central banks aim for low, stable inflation - not zero. Let\'s understand the Goldilocks zone of price stability.',
          philMessage: 'You might think falling prices sound great - everything gets cheaper! But deflation can trap economies in a downward spiral. Let\'s see why central banks target 2% inflation, not 0%.',
        },
        coreConcepts: [
          {
            title: 'What is Deflation?',
            explanation: 'Deflation is a sustained decrease in the general price level - the opposite of inflation. While it sounds good (things get cheaper!), deflation can be economically devastating. It discourages spending, increases debt burdens, and can spiral into depression.',
            example: 'Japan experienced mild deflation for much of the 1990s-2010s. Consumers delayed purchases thinking prices would fall further. Businesses cut prices, then wages, then investment. The economy stagnated for decades - the "Lost Decades."',
          },
          {
            title: 'The Deflationary Spiral',
            explanation: 'Deflation can become self-reinforcing: falling prices → consumers delay spending → businesses cut prices more → profits fall → layoffs → less spending → prices fall more. This spiral is hard to escape because even zero interest rates can\'t stimulate enough spending.',
            example: 'During the Great Depression, prices fell about 25% from 1929-1933. Consumers hoarded cash (it gained value!), businesses couldn\'t sell goods, unemployment hit 25%. The deflation made the depression much worse.',
          },
          {
            title: 'Why 2% Inflation Target?',
            explanation: 'Most central banks target about 2% inflation because: (1) It provides a buffer against deflation, (2) It allows real interest rates to go negative if needed, (3) It\'s low enough to not distort decisions much, (4) It allows relative prices to adjust (some prices can fall while average rises).',
            example: 'If the Fed targets 0% and a recession hits, they can\'t cut real interest rates below 0% to stimulate the economy. With 2% inflation, they can cut nominal rates to 0%, making real rates -2%, providing more stimulus.',
          },
          {
            title: 'Price Stability as a Goal',
            explanation: 'Central banks aim for price stability - low, stable, predictable inflation. This isn\'t zero inflation, but inflation low enough that people don\'t think about it when making decisions. Price stability supports economic growth, employment, and financial planning.',
            example: 'From 1990-2020, US inflation averaged about 2.5% and was fairly predictable. Businesses could plan, workers could negotiate wages, and savers could invest without worrying much about inflation. That stability supported strong economic performance.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding the inflation target helps you interpret Fed policy and anticipate interest rate changes. When inflation is above 2%, expect the Fed to raise rates (bad for bonds, mortgages). When below 2%, expect lower rates (good for borrowers). Plan accordingly.',
          realWorldExample: 'In 2022, inflation hit 9%, far above the 2% target. The Fed raised rates aggressively, causing mortgage rates to double and stock prices to fall. Understanding the target helps you anticipate these policy responses and adjust your financial plans.',
        },
        flashcards: [
          {
            term: 'Deflation',
            definition: 'A sustained decrease in the general price level, the opposite of inflation.',
            philsAnalogy: 'Deflation sounds nice - bamboo gets cheaper! But if I expect prices to fall, I\'ll wait to buy, bamboo sellers lose money, they cut jobs... it spirals down!',
          },
          {
            term: 'Deflationary Spiral',
            definition: 'A self-reinforcing cycle where falling prices lead to reduced spending, which leads to further price cuts, layoffs, and economic contraction.',
            philsAnalogy: 'In a deflationary spiral, falling bamboo prices → pandas wait to buy → farmers cut prices more → farmers go broke → pandas lose jobs → even less buying. It feeds on itself!',
          },
          {
            term: 'Inflation Target',
            definition: 'The rate of inflation that a central bank aims to achieve, typically around 2% for developed economies.',
            philsAnalogy: 'The Panda Central Bank targets 2% inflation - not too hot, not too cold. Just right for a healthy economy!',
          },
          {
            term: 'Price Stability',
            definition: 'A condition of low, stable, and predictable inflation that allows economic agents to make decisions without worrying about price level changes.',
            philsAnalogy: 'Price stability means I don\'t have to worry about bamboo prices when planning my budget. Inflation is low and predictable - I can focus on other things!',
          },
        ],
        quiz: [
          {
            question: 'Deflation is problematic because:',
            options: [
              'It makes everything too expensive',
              'It encourages consumers to delay purchases, reducing economic activity',
              'It causes too much spending',
              'It only affects rich people',
            ],
            correctIndex: 1,
            explanation: 'When prices are falling, consumers wait to buy (things will be cheaper tomorrow!). This reduced spending causes businesses to cut prices more, creating a downward spiral.',
          },
          {
            question: 'Why do central banks target 2% inflation rather than 0%?',
            options: [
              'They want to help debtors',
              '0% would be too hard to achieve',
              'It provides a buffer against deflation and allows negative real interest rates',
              'Higher inflation is always better',
            ],
            correctIndex: 2,
            explanation: 'A small positive inflation target provides room for monetary policy to work (real rates can go negative) and creates a buffer against the dangers of deflation.',
          },
          {
            question: 'Japan\'s "Lost Decades" were characterized by:',
            options: [
              'Hyperinflation',
              'Mild deflation and economic stagnation',
              'Rapid economic growth',
              'High inflation and high growth',
            ],
            correctIndex: 1,
            explanation: 'Japan experienced mild deflation and very slow growth from the 1990s-2010s. Falling prices discouraged spending and investment, trapping the economy in stagnation.',
          },
          {
            question: 'Price stability means:',
            options: [
              'Prices never change',
              'Zero inflation',
              'Low, stable, predictable inflation',
              'Government-controlled prices',
            ],
            correctIndex: 2,
            explanation: 'Price stability doesn\'t mean zero inflation - it means inflation is low and predictable enough that people don\'t factor it into everyday decisions. The 2% target achieves this.',
          },
        ],
        careerSpotlight: {
          title: 'Inflation Analyst',
          description: 'Inflation analysts track price changes across the economy, analyze inflation trends, and forecast future inflation. They work for central banks, financial institutions, and research organizations, providing crucial data for monetary policy and investment decisions.',
          salaryRange: '$65,000 - $115,000',
          skills: ['Statistical Analysis', 'Economic Forecasting', 'Data Collection', 'Report Writing'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'inflation-time-machine',
      title: 'Inflation Time Machine',
      description: 'Travel through time and see how inflation has changed prices. Calculate real values and understand purchasing power across decades.',
      instructions: [
        'Pick a year to travel to',
        'Compare prices then vs. now',
        'Calculate real purchasing power',
        'See how savings would have grown or shrunk',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'macro-2-unemployment',
    },
  },
  
  {
    id: 'macro-4-monetary-policy',
    track: 'macroeconomics',
    title: 'Money & Monetary Policy',
    description: 'Discover how central banks like the Federal Reserve control the money supply and influence the economy through interest rates.',
    icon: '🏦',
    order: 4,
    
    coreEconomicsConcepts: [
      'Functions of Money',
      'The Federal Reserve',
      'Interest Rates',
      'Money Supply',
      'Monetary Policy Tools',
    ],
    
    personalFinanceConnection: {
      description: 'Fed decisions directly impact your life: mortgage rates, savings account yields, and credit card APRs all respond to monetary policy. Understanding the Fed helps you time major financial decisions.',
      relatedPFModules: ['Interest Rates', 'Borrowing Wisely'],
    },
    
    investingConnection: [
      'Interest rate impact on stock valuations',
      'Bond prices and Fed policy',
      'Banking sector investments',
    ],
    
    careerExposure: [
      {
        title: 'Central Bank Economist',
        description: 'Work at the Federal Reserve or other central banks analyzing monetary policy and economic conditions.',
        salaryRange: '$85,000 - $160,000',
        skills: ['Monetary Economics', 'Policy Analysis', 'Economic Modeling'],
      },
      {
        title: 'Interest Rate Strategist',
        description: 'Predict interest rate movements and help investors position their portfolios accordingly.',
        salaryRange: '$100,000 - $200,000',
        skills: ['Fed Watching', 'Fixed Income', 'Market Analysis'],
      },
    ],
    
    lessons: [
      {
        id: 'macro-4-lesson-1',
        title: 'What is Money?',
        estimatedMinutes: 13,
        intro: {
          hook: 'You use money every day, but have you ever wondered what makes those pieces of paper valuable? Why do we accept dollars but not Monopoly money? Understanding money is the first step to understanding how central banks control the economy.',
          philMessage: 'Money is one of humanity\'s greatest inventions! It makes trade possible, stores value, and measures worth. But money is also weird - it\'s valuable because we all agree it\'s valuable. Let\'s explore this fascinating concept!',
        },
        coreConcepts: [
          {
            title: 'The Three Functions of Money',
            explanation: 'Money serves three functions: (1) Medium of exchange - it\'s accepted for buying and selling, (2) Unit of account - it measures value and allows price comparisons, (3) Store of value - it holds purchasing power over time. Anything that performs these functions well can serve as money.',
            example: 'Without money, you\'d need to barter - trade your skills directly for goods. Imagine a dentist who wants bread having to find a baker with a toothache! Money solves this "double coincidence of wants" problem.',
          },
          {
            title: 'Types of Money',
            explanation: 'Commodity money has intrinsic value (gold, silver). Representative money is backed by a commodity (gold-backed dollars). Fiat money has value by government decree, not backing (modern dollars). Most money today is fiat money - valuable because governments say so and people accept it.',
            example: 'US dollars haven\'t been backed by gold since 1971. They\'re fiat money - valuable because the government accepts them for taxes, declares them legal tender, and everyone trusts they\'ll be accepted tomorrow.',
          },
          {
            title: 'The Money Supply',
            explanation: 'The money supply is the total amount of money in the economy. It\'s measured in different ways: M1 (cash + checking accounts - most liquid), M2 (M1 + savings accounts + small CDs - broader measure). The Federal Reserve influences the money supply through monetary policy.',
            example: 'US M1 is about $18 trillion, M2 about $21 trillion. Most "money" isn\'t physical cash - it\'s numbers in bank accounts. When you pay with a debit card, no physical money moves, just numbers in computers.',
          },
          {
            title: 'How Banks Create Money',
            explanation: 'Banks create money through fractional reserve banking. When you deposit $100, the bank keeps a fraction (say 10%) as reserves and lends out the rest ($90). That $90 gets deposited elsewhere, and 90% of that gets lent out, and so on. Your $100 deposit can create much more than $100 in total money supply.',
            example: 'If the reserve requirement is 10%, a $100 deposit can theoretically create up to $1,000 in money supply (100 ÷ 0.10). This "money multiplier" is how banks expand the money supply beyond the base money the Fed creates.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding money helps you see that cash is just one form of wealth, and holding too much cash means losing to inflation. Your bank account is money, but so are easily-liquidated investments. Think about your "money" broadly when managing finances.',
          realWorldExample: 'Keeping $50,000 in a checking account (part of M1) earning 0.01% loses purchasing power to inflation. Moving some to a high-yield savings account (still in M2) or short-term bonds maintains liquidity while earning better returns. Money is a tool, not a goal.',
        },
        flashcards: [
          {
            term: 'Medium of Exchange',
            definition: 'The function of money that allows it to be used to buy and sell goods and services.',
            philsAnalogy: 'Money as a medium of exchange means I can sell bamboo for dollars, then use those dollars to buy anything else. No need to find someone who wants bamboo AND has what I want!',
          },
          {
            term: 'Fiat Money',
            definition: 'Money that has value because the government declares it legal tender, not because it\'s backed by a commodity.',
            philsAnalogy: 'Fiat money is valuable because the Panda Government says so and everyone accepts it. There\'s no gold behind it - just trust and law!',
          },
          {
            term: 'Money Supply',
            definition: 'The total amount of money circulating in an economy, measured in different ways (M1, M2).',
            philsAnalogy: 'The money supply is all the dollars floating around Panda Land - cash in paws, money in bank accounts, the whole pool of purchasing power!',
          },
          {
            term: 'Fractional Reserve Banking',
            definition: 'A banking system where banks hold only a fraction of deposits as reserves and lend out the rest, creating money in the process.',
            philsAnalogy: 'When I deposit 100 bamboo-bucks, the bank keeps 10 and lends 90. That 90 gets deposited and 81 gets lent. My 100 becomes much more money in the system!',
          },
        ],
        quiz: [
          {
            question: 'Which is NOT a function of money?',
            options: [
              'Medium of exchange',
              'Store of value',
              'Source of economic growth',
              'Unit of account',
            ],
            correctIndex: 2,
            explanation: 'Money serves as a medium of exchange, store of value, and unit of account. It doesn\'t directly cause economic growth - that comes from productivity, innovation, and investment.',
          },
          {
            question: 'Modern US dollars are an example of:',
            options: [
              'Commodity money',
              'Representative money',
              'Fiat money',
              'Barter',
            ],
            correctIndex: 2,
            explanation: 'US dollars are fiat money - they have value because the government declares them legal tender and people accept them, not because they\'re backed by gold or another commodity.',
          },
          {
            question: 'Banks create money through:',
            options: [
              'Printing currency',
              'Fractional reserve banking and lending',
              'Government grants',
              'International trade',
            ],
            correctIndex: 1,
            explanation: 'Banks create money by keeping only a fraction of deposits as reserves and lending the rest. These loans become new deposits, which enable more lending, multiplying the money supply.',
          },
          {
            question: 'M2 is larger than M1 because M2 includes:',
            options: [
              'Only cash',
              'M1 plus savings accounts and small time deposits',
              'Only checking accounts',
              'Foreign currency',
            ],
            correctIndex: 1,
            explanation: 'M2 is a broader measure that includes everything in M1 (cash + checking) plus savings accounts, money market accounts, and small CDs. It captures more forms of "near money."',
          },
        ],
      },
      {
        id: 'macro-4-lesson-2',
        title: 'The Federal Reserve',
        estimatedMinutes: 14,
        intro: {
          hook: 'The Federal Reserve might be the most powerful institution you\'ve never thought much about. Its decisions affect your mortgage rate, your job prospects, and your investment returns. Let\'s meet the Fed and understand what it does.',
          philMessage: 'The Fed is like the economy\'s thermostat - it tries to keep things not too hot, not too cold. Understanding the Fed helps you anticipate interest rate changes and make smarter financial decisions!',
        },
        coreConcepts: [
          {
            title: 'What is the Federal Reserve?',
            explanation: 'The Federal Reserve is the central bank of the United States, created in 1913. It\'s independent from the government (though created by Congress) to insulate monetary policy from political pressure. The Fed has a dual mandate: maximum employment and stable prices.',
            example: 'The Fed is led by a Board of Governors appointed by the President and confirmed by the Senate. The Chair (currently Jerome Powell) is the most powerful economic policymaker in the world. Fed decisions move markets globally.',
          },
          {
            title: 'Structure of the Federal Reserve',
            explanation: 'The Fed has three main parts: (1) Board of Governors in Washington (7 members, 14-year terms), (2) 12 regional Federal Reserve Banks across the country, (3) Federal Open Market Committee (FOMC) that sets monetary policy. This structure balances central control with regional input.',
            example: 'The FOMC meets 8 times per year to decide interest rates. It includes the 7 governors plus 5 rotating regional bank presidents. Their statements are analyzed word-by-word by markets looking for hints about future policy.',
          },
          {
            title: 'The Fed\'s Dual Mandate',
            explanation: 'Congress gave the Fed two goals: maximum employment and stable prices (low inflation). These can conflict - stimulating employment might cause inflation, while fighting inflation might increase unemployment. The Fed must balance these objectives.',
            example: 'In 2022, with inflation at 9% and unemployment at 3.5%, the Fed prioritized fighting inflation by raising rates, accepting that this might increase unemployment. In 2020, with unemployment spiking, they prioritized jobs by cutting rates to zero.',
          },
          {
            title: 'Fed Independence',
            explanation: 'The Fed operates independently from elected officials to make unpopular but necessary decisions (like raising rates before elections). This independence is crucial for credibility - if markets believed politicians controlled the Fed, inflation expectations would be harder to anchor.',
            example: 'In 1979, Fed Chair Paul Volcker raised rates to 20% to crush inflation, causing a severe recession. It was deeply unpopular but necessary. An elected official might not have had the courage. Fed independence allowed the tough choice.',
          },
        ],
        personalFinanceConnection: {
          description: 'Fed decisions directly affect your finances. When the Fed raises rates, mortgages and car loans get more expensive, but savings accounts pay more. When they cut rates, borrowing is cheaper but saving pays less. Watch Fed announcements to anticipate these changes.',
          realWorldExample: 'Before the Fed started raising rates in 2022, savvy homebuyers locked in 3% mortgages. After rates rose, mortgages hit 7%. That\'s the difference between a $1,500 and $2,300 monthly payment on a $300,000 loan. Fed-watching pays off!',
        },
        flashcards: [
          {
            term: 'Federal Reserve',
            definition: 'The central bank of the United States, responsible for monetary policy, bank regulation, and financial stability.',
            philsAnalogy: 'The Fed is like the Panda Central Bank - it controls the money supply and interest rates to keep our economy healthy!',
          },
          {
            term: 'Dual Mandate',
            definition: 'The Fed\'s two congressionally-assigned goals: maximum employment and stable prices.',
            philsAnalogy: 'The Fed has two jobs: keep pandas employed AND keep bamboo prices stable. Sometimes these goals conflict, and the Fed has to balance them!',
          },
          {
            term: 'FOMC',
            definition: 'Federal Open Market Committee - the Fed body that sets monetary policy, including the federal funds rate.',
            philsAnalogy: 'The FOMC is the group of pandas who decide interest rates. When they meet, the whole economy pays attention!',
          },
          {
            term: 'Fed Independence',
            definition: 'The principle that the Federal Reserve operates independently from elected officials to make monetary policy decisions.',
            philsAnalogy: 'Fed independence means politicians can\'t force the Panda Central Bank to print money before elections. The Fed makes tough choices without political pressure!',
          },
        ],
        quiz: [
          {
            question: 'The Federal Reserve\'s dual mandate includes:',
            options: [
              'Balanced budget and low taxes',
              'Maximum employment and stable prices',
              'Strong dollar and trade surplus',
              'High growth and low debt',
            ],
            correctIndex: 1,
            explanation: 'Congress gave the Fed two goals: maximum employment (low unemployment) and stable prices (low inflation). The Fed must balance these sometimes-conflicting objectives.',
          },
          {
            question: 'Why is Fed independence important?',
            options: [
              'It makes the Fed more profitable',
              'It allows unpopular but necessary decisions without political pressure',
              'It reduces government spending',
              'It makes elections more competitive',
            ],
            correctIndex: 1,
            explanation: 'Independence allows the Fed to make tough decisions (like raising rates) that might be unpopular but are economically necessary, without pressure from politicians facing elections.',
          },
          {
            question: 'The FOMC is responsible for:',
            options: [
              'Setting tax rates',
              'Regulating banks',
              'Setting monetary policy, including interest rates',
              'Managing the federal budget',
            ],
            correctIndex: 2,
            explanation: 'The Federal Open Market Committee (FOMC) is the Fed\'s monetary policy body. It sets the federal funds rate target and makes decisions about other monetary policy tools.',
          },
          {
            question: 'How often does the FOMC typically meet?',
            options: [
              'Once a year',
              'Once a month',
              'Eight times per year',
              'Every day',
            ],
            correctIndex: 2,
            explanation: 'The FOMC meets eight times per year (roughly every six weeks) to assess economic conditions and decide on monetary policy. Additional emergency meetings can be called if needed.',
          },
        ],
      },
      {
        id: 'macro-4-lesson-3',
        title: 'Monetary Policy Tools',
        estimatedMinutes: 15,
        intro: {
          hook: 'How does the Fed actually control the economy? It can\'t force businesses to hire or consumers to spend. But it has powerful tools that influence interest rates throughout the economy, which in turn affect spending, investment, and employment.',
          philMessage: 'The Fed has a toolbox for steering the economy. Interest rates are the main lever, but there are others too. Let\'s see how these tools work and how they ripple through the economy!',
        },
        coreConcepts: [
          {
            title: 'The Federal Funds Rate',
            explanation: 'The federal funds rate is the interest rate banks charge each other for overnight loans. It\'s the Fed\'s primary policy tool. When the Fed raises this rate, all other interest rates tend to rise too. When it cuts, rates fall. This is how the Fed influences the entire economy.',
            example: 'When the Fed raised the federal funds rate from 0% to 5% in 2022-2023, mortgage rates rose from 3% to 7%, car loan rates rose, credit card rates rose, and savings account rates rose. One rate change ripples everywhere.',
          },
          {
            title: 'Open Market Operations',
            explanation: 'The Fed adjusts the federal funds rate through open market operations - buying and selling government bonds. When the Fed buys bonds, it pays with newly created money, increasing bank reserves and pushing rates down. When it sells bonds, it absorbs money, reducing reserves and pushing rates up.',
            example: 'To lower rates, the Fed buys Treasury bonds from banks. Banks now have more reserves (cash) and are willing to lend at lower rates. To raise rates, the Fed sells bonds, draining reserves and making banks charge more for loans.',
          },
          {
            title: 'Quantitative Easing (QE)',
            explanation: 'When interest rates hit zero, the Fed can\'t cut further. Quantitative easing is an unconventional tool where the Fed buys large amounts of bonds (and other assets) to push down long-term rates and inject money into the economy. It was used heavily after 2008 and 2020.',
            example: 'After 2008, the Fed bought trillions in bonds through QE, pushing down mortgage rates and supporting housing. After 2020, QE helped keep borrowing costs low during the pandemic. The Fed\'s balance sheet grew from $900 billion to $9 trillion.',
          },
          {
            title: 'How Monetary Policy Affects the Economy',
            explanation: 'Lower interest rates stimulate the economy: cheaper mortgages boost housing, cheaper car loans boost auto sales, cheaper business loans boost investment, lower rates make stocks more attractive. Higher rates do the opposite, cooling the economy and reducing inflation.',
            example: 'When the Fed cut rates to 0% in 2020, mortgage applications surged, home prices rose, businesses borrowed to invest, and stocks rallied. When rates rose in 2022, housing cooled, business investment slowed, and stocks fell. The transmission mechanism works!',
          },
        ],
        personalFinanceConnection: {
          description: 'Fed rate decisions directly affect your borrowing costs and savings returns. When rates are low, it\'s a good time to borrow (mortgages, refinancing) but a bad time for savers. When rates are high, saving pays better but borrowing is expensive. Time your major financial decisions accordingly.',
          realWorldExample: 'In early 2022, the Fed signaled rate hikes were coming. Smart borrowers refinanced mortgages and locked in low rates before the increases. Smart savers moved money to high-yield accounts as rates rose. Following Fed signals helps you act before changes hit.',
        },
        flashcards: [
          {
            term: 'Federal Funds Rate',
            definition: 'The interest rate at which banks lend reserves to each other overnight, the Fed\'s primary policy tool.',
            philsAnalogy: 'The federal funds rate is like the "master rate" - when the Panda Central Bank changes it, all other rates follow!',
          },
          {
            term: 'Open Market Operations',
            definition: 'The Fed\'s buying and selling of government bonds to influence the money supply and interest rates.',
            philsAnalogy: 'When the Fed buys bonds, it\'s like pouring money into the banking system, pushing rates down. Selling bonds drains money out, pushing rates up!',
          },
          {
            term: 'Quantitative Easing (QE)',
            definition: 'Large-scale asset purchases by the Fed to lower long-term interest rates when short-term rates are already at zero.',
            philsAnalogy: 'QE is the Fed\'s emergency tool - when normal rate cuts aren\'t enough, they buy massive amounts of bonds to push rates even lower!',
          },
          {
            term: 'Transmission Mechanism',
            definition: 'The process by which monetary policy changes affect the broader economy through interest rates, asset prices, and credit availability.',
            philsAnalogy: 'The transmission mechanism is how Fed rate changes ripple through the economy - from banks to mortgages to home buying to construction jobs. It\'s all connected!',
          },
        ],
        quiz: [
          {
            question: 'When the Fed wants to LOWER interest rates, it:',
            options: [
              'Sells government bonds',
              'Buys government bonds',
              'Raises taxes',
              'Cuts government spending',
            ],
            correctIndex: 1,
            explanation: 'Buying bonds injects money into the banking system, increasing reserves and pushing interest rates down. Selling bonds does the opposite.',
          },
          {
            question: 'The federal funds rate directly affects:',
            options: [
              'Only mortgage rates',
              'Only savings account rates',
              'Interest rates throughout the economy',
              'Only government bond rates',
            ],
            correctIndex: 2,
            explanation: 'The federal funds rate is the benchmark that influences all other interest rates - mortgages, car loans, credit cards, savings accounts, and business loans all respond to Fed rate changes.',
          },
          {
            question: 'Quantitative easing is used when:',
            options: [
              'Inflation is too high',
              'Interest rates are already at zero and more stimulus is needed',
              'The economy is overheating',
              'Banks have too many reserves',
            ],
            correctIndex: 1,
            explanation: 'QE is an unconventional tool used when the Fed can\'t cut rates further (they\'re at zero). It involves large-scale bond purchases to push down long-term rates and stimulate the economy.',
          },
          {
            question: 'Lower interest rates stimulate the economy by:',
            options: [
              'Making saving more attractive',
              'Making borrowing cheaper, encouraging spending and investment',
              'Increasing government revenue',
              'Reducing the money supply',
            ],
            correctIndex: 1,
            explanation: 'Lower rates make it cheaper to borrow for homes, cars, and business investment. This increased spending and investment stimulates economic activity and employment.',
          },
        ],
      },
      {
        id: 'macro-4-lesson-4',
        title: 'Monetary Policy in Action',
        estimatedMinutes: 13,
        intro: {
          hook: 'Theory is one thing, but how does monetary policy work in the real world? Let\'s look at how the Fed has responded to actual economic crises and what we can learn about effective (and sometimes ineffective) policy.',
          philMessage: 'Time for some real-world examples! The Fed has faced some dramatic challenges - financial crises, pandemics, inflation surges. Let\'s see how they responded and what worked!',
        },
        coreConcepts: [
          {
            title: 'Expansionary vs. Contractionary Policy',
            explanation: 'Expansionary policy (lower rates, QE) stimulates the economy - used during recessions to boost employment. Contractionary policy (higher rates, QT) slows the economy - used when inflation is too high. The Fed constantly adjusts between these based on economic conditions.',
            example: 'In 2020, the Fed went full expansionary: rates to zero, massive QE. In 2022, they shifted to contractionary: rapid rate hikes to fight inflation. The same Fed, opposite policies, based on what the economy needed.',
          },
          {
            title: 'The 2008 Financial Crisis Response',
            explanation: 'When the 2008 crisis hit, the Fed cut rates to zero and launched unprecedented QE, buying trillions in bonds and even mortgage-backed securities. These extraordinary measures prevented a depression but recovery was slow. The Fed kept rates near zero for seven years.',
            example: 'The Fed\'s balance sheet grew from $900 billion to $4.5 trillion through QE. Critics worried about inflation, but it never materialized - the economy was so weak that the money didn\'t cause price pressures. The Fed learned that aggressive action in crises is essential.',
          },
          {
            title: 'The 2020 Pandemic Response',
            explanation: 'When COVID hit, the Fed acted even faster than in 2008: rates to zero within days, unlimited QE announced, emergency lending programs created. This prevented financial collapse and supported the recovery. But combined with fiscal stimulus, it may have contributed to 2022\'s inflation.',
            example: 'The Fed\'s balance sheet doubled from $4 trillion to $9 trillion in two years. Markets stabilized quickly, and the recession was the shortest on record. But critics argue the Fed kept policy too loose for too long, fueling inflation.',
          },
          {
            title: 'Fighting Inflation: 2022-2023',
            explanation: 'When inflation hit 9% in 2022, the Fed pivoted to aggressive rate hikes - the fastest in 40 years. Rates went from 0% to 5% in about 18 months. The goal was to cool demand and bring inflation back to 2%, even at the cost of higher unemployment.',
            example: 'The rapid rate hikes caused mortgage rates to double, stock markets to fall 20%, and some banks to fail (SVB). But inflation fell from 9% to about 3%. The Fed demonstrated it would accept economic pain to restore price stability.',
          },
        ],
        personalFinanceConnection: {
          description: 'Understanding Fed policy cycles helps you make better financial decisions. During expansionary periods (low rates), lock in borrowing and be cautious about bonds. During contractionary periods (rising rates), savings accounts become attractive and borrowing gets expensive. Position yourself accordingly.',
          realWorldExample: 'Investors who understood the Fed\'s 2022 pivot moved from growth stocks to value stocks and short-term bonds before the crash. Homebuyers who recognized the rate hike cycle locked in mortgages early. Those who ignored Fed signals got caught off-guard.',
        },
        flashcards: [
          {
            term: 'Expansionary Monetary Policy',
            definition: 'Fed actions to stimulate the economy, including lowering interest rates and buying bonds (QE).',
            philsAnalogy: 'Expansionary policy is like the Fed pressing the gas pedal - lower rates, more money, let\'s get this economy moving!',
          },
          {
            term: 'Contractionary Monetary Policy',
            definition: 'Fed actions to slow the economy and reduce inflation, including raising interest rates and selling bonds (QT).',
            philsAnalogy: 'Contractionary policy is like the Fed pressing the brakes - higher rates, less money, let\'s cool this economy down before it overheats!',
          },
          {
            term: 'Quantitative Tightening (QT)',
            definition: 'The Fed reducing its balance sheet by selling bonds or letting them mature without reinvesting, the opposite of QE.',
            philsAnalogy: 'QT is the reverse of QE - instead of buying bonds and adding money, the Fed lets bonds mature and drains money from the system!',
          },
          {
            term: 'Policy Lag',
            definition: 'The delay between when the Fed changes policy and when the effects are felt in the economy.',
            philsAnalogy: 'Policy lag means when the Fed changes rates today, the full effect might not show up for 12-18 months. It\'s like steering a massive ship - you turn the wheel now, but the ship turns slowly!',
          },
        ],
        quiz: [
          {
            question: 'Expansionary monetary policy is appropriate when:',
            options: [
              'Inflation is too high',
              'The economy is in recession and unemployment is high',
              'Asset prices are rising too fast',
              'The dollar is too weak',
            ],
            correctIndex: 1,
            explanation: 'Expansionary policy (lower rates, QE) stimulates spending and investment, appropriate when the economy needs a boost during recessions or periods of high unemployment.',
          },
          {
            question: 'The Fed\'s response to the 2008 crisis included:',
            options: [
              'Raising interest rates',
              'Cutting rates to zero and launching QE',
              'Reducing the money supply',
              'Increasing reserve requirements',
            ],
            correctIndex: 1,
            explanation: 'The Fed went full expansionary: rates to zero, massive QE, emergency lending programs. These unprecedented measures helped prevent a depression.',
          },
          {
            question: 'Why did the Fed raise rates aggressively in 2022?',
            options: [
              'To stimulate economic growth',
              'To fight high inflation',
              'To weaken the dollar',
              'To help banks make more money',
            ],
            correctIndex: 1,
            explanation: 'With inflation at 9%, the Fed raised rates rapidly to cool demand and bring inflation back toward the 2% target, even knowing it would slow the economy.',
          },
          {
            question: 'Policy lag means:',
            options: [
              'The Fed is slow to make decisions',
              'There\'s a delay between policy changes and their economic effects',
              'Congress must approve Fed decisions',
              'Interest rates change slowly',
            ],
            correctIndex: 1,
            explanation: 'Policy lag is the time between when the Fed changes rates and when those changes fully affect the economy - typically 12-18 months. This makes policy-making challenging.',
          },
        ],
        careerSpotlight: {
          title: 'Central Bank Economist',
          description: 'Central bank economists analyze economic conditions and help formulate monetary policy. They work at the Federal Reserve, other central banks, or organizations that closely follow monetary policy. It\'s one of the most influential roles in economics.',
          salaryRange: '$85,000 - $160,000',
          skills: ['Macroeconomic Analysis', 'Econometrics', 'Policy Analysis', 'Financial Markets'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'fed-chair-sim',
      title: 'Fed Chair for a Day',
      description: 'Take the helm at the Federal Reserve! Set interest rates and manage the money supply to achieve stable prices and full employment.',
      instructions: [
        'Review economic indicators',
        'Decide on interest rate changes',
        'Watch the economy respond',
        'Balance inflation and unemployment',
      ],
      rewards: {
        bamboo: 50,
        xp: 100,
      },
    },
    
    rewards: {
      bamboo: 150,
      xp: 300,
    },
    
    unlockRequirements: {
      previousUnitId: 'macro-3-inflation',
    },
  },
  
  {
    id: 'macro-5-fiscal-policy',
    track: 'macroeconomics',
    title: 'Fiscal Policy & Government',
    description: 'Explore how government spending and taxation shape the economy. Understand budget deficits, national debt, and the debate over fiscal policy.',
    icon: '🏛️',
    order: 5,
    
    coreEconomicsConcepts: [
      'Fiscal Policy',
      'Government Spending',
      'Taxation',
      'Budget Deficits and Surpluses',
      'National Debt',
    ],
    
    personalFinanceConnection: {
      description: 'Tax policy directly affects your take-home pay and financial planning. Understanding fiscal policy helps you anticipate tax changes and take advantage of government programs.',
      relatedPFModules: ['Tax Planning', 'Government Benefits'],
    },
    
    investingConnection: [
      'Government bonds and debt markets',
      'Infrastructure spending and related sectors',
      'Tax policy impact on corporate earnings',
    ],
    
    careerExposure: [
      {
        title: 'Fiscal Policy Analyst',
        description: 'Analyze government budgets and tax policies for legislative bodies, think tanks, or advocacy organizations.',
        salaryRange: '$65,000 - $120,000',
        skills: ['Budget Analysis', 'Tax Policy', 'Legislative Process'],
      },
      {
        title: 'Public Finance Economist',
        description: 'Study how governments raise and spend money, and evaluate the efficiency and equity of fiscal policies.',
        salaryRange: '$75,000 - $140,000',
        skills: ['Public Economics', 'Cost-Benefit Analysis', 'Policy Evaluation'],
      },
    ],
    
    lessons: [
      {
        id: 'macro-5-lesson-1',
        title: 'Introduction to Fiscal Policy',
        estimatedMinutes: 13,
        intro: {
          hook: 'While the Fed controls monetary policy, Congress and the President control fiscal policy - government spending and taxes. These decisions affect everything from the roads you drive on to the size of your paycheck. Let\'s understand how fiscal policy shapes the economy.',
          philMessage: 'Fiscal policy is the government\'s power of the purse! Unlike the Fed, which is independent, fiscal policy is made by elected officials. That makes it political, but also directly accountable to voters. Let\'s explore!',
        },
        coreConcepts: [
          {
            title: 'What is Fiscal Policy?',
            explanation: 'Fiscal policy refers to government decisions about spending and taxation to influence the economy. Unlike monetary policy (controlled by the Fed), fiscal policy is controlled by Congress and the President. It can stimulate or slow the economy by changing how much the government spends and how much it collects in taxes.',
            example: 'The 2021 American Rescue Plan was fiscal policy - $1.9 trillion in government spending including stimulus checks, unemployment benefits, and aid to states. It was designed to boost the economy during the pandemic recovery.',
          },
          {
            title: 'Government Spending',
            explanation: 'Government spending (G in GDP) includes purchases of goods and services (defense, infrastructure, education) and transfer payments (Social Security, Medicare, unemployment benefits). Spending puts money into the economy, increasing aggregate demand and potentially boosting GDP and employment.',
            example: 'Federal spending is about $6 trillion annually. About $1 trillion goes to defense, $1.4 trillion to Social Security, $900 billion to Medicare, and the rest to everything from highways to national parks to food stamps.',
          },
          {
            title: 'Taxation',
            explanation: 'Taxes remove money from the private economy and transfer it to the government. Lower taxes leave more money in people\'s pockets, potentially increasing spending. Higher taxes reduce private spending but fund government programs. The mix of taxes (income, payroll, corporate, sales) affects who bears the burden.',
            example: 'Federal revenue is about $4.5 trillion annually. About half comes from individual income taxes, a third from payroll taxes (Social Security/Medicare), and the rest from corporate taxes, excise taxes, and other sources.',
          },
          {
            title: 'Expansionary vs. Contractionary Fiscal Policy',
            explanation: 'Expansionary fiscal policy (more spending, lower taxes) stimulates the economy - used during recessions. Contractionary fiscal policy (less spending, higher taxes) slows the economy - used when inflation is high or to reduce deficits. Like monetary policy, fiscal policy can push the economy in either direction.',
            example: 'The 2009 stimulus was expansionary - $800 billion in spending and tax cuts to fight the recession. The 1990s deficit reduction was contractionary - spending cuts and tax increases to balance the budget.',
          },
        ],
        personalFinanceConnection: {
          description: 'Fiscal policy affects your taxes, the services you receive, and the overall economy. Tax cuts put more money in your pocket; tax increases take more. Government spending creates jobs and provides services. Understanding fiscal policy helps you anticipate how political decisions affect your finances.',
          realWorldExample: 'The 2017 Tax Cuts and Jobs Act lowered tax rates for most Americans. If you understood the changes, you could adjust your withholding and plan for the new rates. Fiscal policy changes are announced in advance - pay attention and adapt!',
        },
        flashcards: [
          {
            term: 'Fiscal Policy',
            definition: 'Government decisions about spending and taxation to influence the economy, controlled by Congress and the President.',
            philsAnalogy: 'Fiscal policy is how the Panda Government decides to spend bamboo-bucks and collect taxes. It\'s the political side of economic management!',
          },
          {
            term: 'Government Spending',
            definition: 'Expenditures by the government on goods, services, and transfer payments, a component of aggregate demand.',
            philsAnalogy: 'When the Panda Government builds bamboo highways or sends bamboo-bucks to retired pandas, that\'s government spending pumping money into the economy!',
          },
          {
            term: 'Transfer Payments',
            definition: 'Government payments to individuals not in exchange for goods or services, such as Social Security, unemployment benefits, and welfare.',
            philsAnalogy: 'Transfer payments are when the government gives bamboo-bucks to pandas without getting work in return - like retirement benefits or unemployment checks!',
          },
          {
            term: 'Expansionary Fiscal Policy',
            definition: 'Fiscal policy that increases aggregate demand through higher government spending or lower taxes.',
            philsAnalogy: 'Expansionary fiscal policy is the government pressing the gas pedal - more spending, lower taxes, let\'s boost this economy!',
          },
        ],
        quiz: [
          {
            question: 'Fiscal policy is controlled by:',
            options: [
              'The Federal Reserve',
              'Congress and the President',
              'The Supreme Court',
              'State governments only',
            ],
            correctIndex: 1,
            explanation: 'Unlike monetary policy (Fed), fiscal policy is made by elected officials - Congress passes spending and tax bills, and the President signs them into law.',
          },
          {
            question: 'Expansionary fiscal policy includes:',
            options: [
              'Raising taxes and cutting spending',
              'Lowering taxes and increasing spending',
              'Keeping taxes and spending unchanged',
              'Raising interest rates',
            ],
            correctIndex: 1,
            explanation: 'Expansionary fiscal policy stimulates the economy by putting more money into circulation - either through tax cuts (leaving more in private hands) or increased spending.',
          },
          {
            question: 'Transfer payments include:',
            options: [
              'Government purchases of military equipment',
              'Social Security and unemployment benefits',
              'Salaries of government workers',
              'Interest on government debt',
            ],
            correctIndex: 1,
            explanation: 'Transfer payments are money given to individuals without receiving goods or services in return - Social Security, Medicare, unemployment benefits, and welfare programs.',
          },
          {
            question: 'The largest source of federal revenue is:',
            options: [
              'Corporate income taxes',
              'Individual income taxes',
              'Sales taxes',
              'Tariffs',
            ],
            correctIndex: 1,
            explanation: 'Individual income taxes provide about half of federal revenue. Payroll taxes are second, followed by corporate taxes. Sales taxes are primarily a state/local revenue source.',
          },
        ],
      },
      {
        id: 'macro-5-lesson-2',
        title: 'The Multiplier Effect & Crowding Out',
        estimatedMinutes: 14,
        intro: {
          hook: 'When the government spends $1, does the economy grow by $1? Actually, it might grow by more - or less! The multiplier effect and crowding out are two forces that determine how powerful fiscal policy really is.',
          philMessage: 'Fiscal policy has some interesting twists! A dollar of government spending can create more than a dollar of economic activity through the multiplier. But it can also push out private spending through crowding out. Let\'s see how these forces work!',
        },
        coreConcepts: [
          {
            title: 'The Multiplier Effect',
            explanation: 'The multiplier effect means that an initial change in spending creates a larger change in GDP. When the government spends $1, the recipient spends part of it, and that recipient spends part of that, and so on. The total effect is larger than the initial spending.',
            example: 'If the government builds a $1 million bridge, workers earn $1 million. They spend 80% ($800,000) at local businesses. Those businesses spend 80% of that ($640,000). This chain continues, and the total GDP increase might be $5 million from the initial $1 million.',
          },
          {
            title: 'The Spending Multiplier',
            explanation: 'The spending multiplier = 1 / (1 - MPC), where MPC is the marginal propensity to consume (the fraction of additional income that people spend). If people spend 80% of additional income (MPC = 0.8), the multiplier is 1/(1-0.8) = 5. A $1 increase in government spending increases GDP by $5.',
            example: 'With an MPC of 0.75, the multiplier is 4. A $100 billion infrastructure bill would increase GDP by $400 billion. But if people save more (lower MPC), the multiplier shrinks. During recessions when people are cautious, the multiplier may be smaller.',
          },
          {
            title: 'Crowding Out',
            explanation: 'Crowding out occurs when government borrowing to finance spending raises interest rates, which reduces private investment. The government "crowds out" private borrowers from the loan market. This can offset some or all of the stimulus from government spending.',
            example: 'If the government borrows $500 billion for a stimulus, it competes with businesses for loans. Interest rates rise, making business investment more expensive. Some businesses cancel projects. The net stimulus is less than $500 billion because private investment fell.',
          },
          {
            title: 'When is Fiscal Policy Most Effective?',
            explanation: 'Fiscal policy is most effective during recessions when: (1) There\'s slack in the economy (unused capacity), (2) Interest rates are already low (less crowding out), (3) People are likely to spend (high MPC). It\'s less effective when the economy is near full employment or when it causes large interest rate increases.',
            example: 'The 2009 stimulus was relatively effective because the economy had massive slack - unemployment was 10%, rates were near zero, and there was little crowding out. Stimulus during a boom would be less effective and might just cause inflation.',
          },
        ],
        personalFinanceConnection: {
          description: 'The multiplier effect explains why recessions can spiral (job losses lead to less spending, leading to more job losses) and why stimulus can help break the cycle. Understanding these dynamics helps you see how your spending decisions, multiplied across millions of people, affect the whole economy.',
          realWorldExample: 'During COVID, stimulus checks had a high multiplier because people spent them quickly (high MPC). If you received $1,400 and spent it at local businesses, you helped create economic activity beyond just your purchase. Your spending became someone else\'s income.',
        },
        flashcards: [
          {
            term: 'Multiplier Effect',
            definition: 'The phenomenon where an initial change in spending creates a larger change in GDP as the money circulates through the economy.',
            philsAnalogy: 'The multiplier effect is like a bamboo-buck rippling through the economy. I spend it, you spend it, they spend it - one dollar creates many dollars of activity!',
          },
          {
            term: 'Marginal Propensity to Consume (MPC)',
            definition: 'The fraction of additional income that households spend rather than save.',
            philsAnalogy: 'If I get an extra $100 and spend $80, my MPC is 0.8. The higher the MPC, the bigger the multiplier effect!',
          },
          {
            term: 'Crowding Out',
            definition: 'The reduction in private investment that occurs when government borrowing raises interest rates.',
            philsAnalogy: 'Crowding out is when the Panda Government borrows so much that interest rates rise, and private bamboo businesses can\'t afford to borrow for their projects!',
          },
          {
            term: 'Spending Multiplier',
            definition: 'The ratio of the change in GDP to the initial change in spending, calculated as 1/(1-MPC).',
            philsAnalogy: 'If the MPC is 0.8, the multiplier is 5. Every bamboo-buck the government spends creates 5 bamboo-bucks of economic activity!',
          },
        ],
        quiz: [
          {
            question: 'If the MPC is 0.75, the spending multiplier is:',
            options: [
              '0.75',
              '1.33',
              '4',
              '7.5',
            ],
            correctIndex: 2,
            explanation: 'Multiplier = 1/(1-MPC) = 1/(1-0.75) = 1/0.25 = 4. Each dollar of government spending creates $4 of GDP.',
          },
          {
            question: 'Crowding out reduces the effectiveness of fiscal policy because:',
            options: [
              'People save all their income',
              'Government borrowing raises interest rates, reducing private investment',
              'Taxes are too high',
              'The multiplier is always negative',
            ],
            correctIndex: 1,
            explanation: 'When the government borrows heavily, it competes with private borrowers, pushing up interest rates. Higher rates discourage private investment, offsetting some of the stimulus.',
          },
          {
            question: 'Fiscal policy is MOST effective when:',
            options: [
              'The economy is at full employment',
              'Interest rates are very high',
              'There is significant slack in the economy and rates are low',
              'People are saving most of their income',
            ],
            correctIndex: 2,
            explanation: 'With economic slack, stimulus creates jobs without much inflation. With low rates, there\'s less crowding out. These conditions maximize fiscal policy\'s impact.',
          },
          {
            question: 'The multiplier effect occurs because:',
            options: [
              'The government prints money',
              'One person\'s spending becomes another\'s income, which is then spent again',
              'Taxes are reduced',
              'Interest rates fall',
            ],
            correctIndex: 1,
            explanation: 'The multiplier works through successive rounds of spending. Government spending becomes income, which is partially spent, becoming someone else\'s income, and so on.',
          },
        ],
      },
      {
        id: 'macro-5-lesson-3',
        title: 'Budget Deficits & National Debt',
        estimatedMinutes: 14,
        intro: {
          hook: 'The US national debt is over $34 trillion. Is that a crisis waiting to happen, or is it manageable? Understanding deficits and debt is crucial for evaluating political debates and understanding the government\'s fiscal constraints.',
          philMessage: 'Deficits and debt are some of the most misunderstood topics in economics. Let\'s cut through the political noise and understand what they really mean, when they\'re a problem, and when they\'re not!',
        },
        coreConcepts: [
          {
            title: 'Deficit vs. Debt',
            explanation: 'The budget deficit is the annual shortfall when government spending exceeds revenue in a single year. The national debt is the total accumulated borrowing over time - the sum of all past deficits minus surpluses. Deficits add to the debt each year.',
            example: 'In 2023, the federal government spent about $6.1 trillion but collected only $4.4 trillion in revenue - a deficit of $1.7 trillion. This added to the national debt, which reached about $34 trillion (accumulated over decades).',
          },
          {
            title: 'Why Governments Run Deficits',
            explanation: 'Governments run deficits for several reasons: (1) Automatic stabilizers - spending rises and revenue falls during recessions, (2) Deliberate stimulus during downturns, (3) Wars and emergencies, (4) Political difficulty of raising taxes or cutting popular programs. Some deficit spending is economically justified; some is just politically convenient.',
            example: 'During COVID, the deficit exploded to $3 trillion as the government spent on relief while tax revenue fell. This was appropriate crisis response. But deficits also persist during good times when politicians prefer tax cuts and spending increases to fiscal discipline.',
          },
          {
            title: 'Debt-to-GDP Ratio',
            explanation: 'The absolute debt number matters less than debt relative to the economy\'s size. The debt-to-GDP ratio shows the debt burden relative to the country\'s ability to pay. US debt is about 120% of GDP - high historically, but not unprecedented globally. Japan\'s is over 250%.',
            example: 'A $34 trillion debt sounds scary, but with a $27 trillion economy, the ratio is about 125%. If the economy grows faster than the debt, the ratio falls even without paying down debt. Growth is the friend of debt sustainability.',
          },
          {
            title: 'Is the Debt a Problem?',
            explanation: 'Economists disagree about debt dangers. Concerns include: rising interest payments crowding out other spending, potential loss of confidence causing a crisis, burden on future generations. Counterarguments: US borrows in its own currency, demand for Treasuries remains strong, low interest rates make debt serviceable. The truth is nuanced.',
            example: 'Interest on the debt is now about $1 trillion annually - more than defense spending. If rates stay high, this crowds out other priorities. But the US has never defaulted, and Treasuries remain the world\'s safe asset. The situation is concerning but not immediately critical.',
          },
        ],
        personalFinanceConnection: {
          description: 'Government debt affects you through future taxes, interest rates, and the services government can afford. High debt might mean higher taxes or fewer services for your generation. But government debt is different from personal debt - governments can tax, print currency, and never fully "retire."',
          realWorldExample: 'Social Security and Medicare face long-term funding gaps. Without changes, benefits might be cut or taxes raised when you retire. Understanding the fiscal situation helps you plan - don\'t assume current benefit levels will continue forever. Save extra for retirement.',
        },
        flashcards: [
          {
            term: 'Budget Deficit',
            definition: 'The annual shortfall when government spending exceeds revenue in a single year.',
            philsAnalogy: 'A deficit is when the Panda Government spends more bamboo-bucks than it collects in taxes this year. It has to borrow the difference!',
          },
          {
            term: 'National Debt',
            definition: 'The total accumulated government borrowing over time, the sum of all past deficits minus surpluses.',
            philsAnalogy: 'The national debt is all the bamboo-bucks the Panda Government has borrowed over the years and hasn\'t paid back yet. It\'s the running total!',
          },
          {
            term: 'Debt-to-GDP Ratio',
            definition: 'National debt as a percentage of GDP, measuring the debt burden relative to the economy\'s size.',
            philsAnalogy: 'Debt-to-GDP is like comparing what you owe to what you earn. A $100,000 debt is scary for someone earning $30,000, but manageable for someone earning $200,000!',
          },
          {
            term: 'Automatic Stabilizers',
            definition: 'Government spending and tax provisions that automatically increase deficits during recessions and reduce them during expansions.',
            philsAnalogy: 'Automatic stabilizers are like shock absorbers. When the economy dips, unemployment benefits automatically rise and tax revenue falls, cushioning the blow without new legislation!',
          },
        ],
        quiz: [
          {
            question: 'The difference between deficit and debt is:',
            options: [
              'They mean the same thing',
              'Deficit is annual shortfall; debt is total accumulated borrowing',
              'Debt is annual; deficit is total',
              'Deficit is state-level; debt is federal',
            ],
            correctIndex: 1,
            explanation: 'The deficit is this year\'s gap between spending and revenue. The debt is the total of all past deficits (minus any surpluses) - the accumulated borrowing over time.',
          },
          {
            question: 'The debt-to-GDP ratio is important because:',
            options: [
              'It shows the absolute size of the debt',
              'It measures debt burden relative to the economy\'s ability to pay',
              'It determines interest rates',
              'It\'s required by law to be below 100%',
            ],
            correctIndex: 1,
            explanation: 'Absolute debt numbers are less meaningful than debt relative to economic size. A large economy can handle more debt. The ratio shows sustainability better than the raw number.',
          },
          {
            question: 'Automatic stabilizers cause deficits to:',
            options: [
              'Stay constant through the business cycle',
              'Increase during recessions and decrease during expansions',
              'Decrease during recessions',
              'Increase only when Congress acts',
            ],
            correctIndex: 1,
            explanation: 'Automatic stabilizers (unemployment benefits, progressive taxes) automatically increase spending and reduce revenue during recessions, widening deficits without new legislation.',
          },
          {
            question: 'US national debt is currently about:',
            options: [
              '$3 trillion',
              '$10 trillion',
              '$34 trillion',
              '$100 trillion',
            ],
            correctIndex: 2,
            explanation: 'US national debt is approximately $34 trillion as of 2024, representing about 120-125% of GDP.',
          },
        ],
      },
      {
        id: 'macro-5-lesson-4',
        title: 'Fiscal Policy Debates & Trade-offs',
        estimatedMinutes: 13,
        intro: {
          hook: 'Should we cut taxes or increase spending? Balance the budget or stimulate growth? Fiscal policy involves real trade-offs and genuine disagreements among economists. Let\'s explore the debates that shape economic policy.',
          philMessage: 'Unlike some topics where there\'s a clear right answer, fiscal policy involves genuine trade-offs and values. Reasonable people disagree! Let\'s understand the different perspectives so you can form your own informed views.',
        },
        coreConcepts: [
          {
            title: 'Keynesian vs. Classical Views',
            explanation: 'Keynesians believe government should actively use fiscal policy to stabilize the economy - spend during recessions, pull back during booms. Classical/supply-side economists believe markets self-correct and government intervention often does more harm than good. Most modern economists are somewhere in between.',
            example: 'During COVID, even many conservatives supported massive fiscal stimulus (a Keynesian response). But debates continue about how quickly to withdraw support and whether stimulus caused inflation. The "right" answer depends partly on values, not just economics.',
          },
          {
            title: 'Short-Run vs. Long-Run Trade-offs',
            explanation: 'Fiscal stimulus can boost the economy in the short run but may increase debt that burdens future generations. Tax cuts can stimulate growth but may reduce revenue for public investment. Policymakers must balance immediate needs against long-term consequences.',
            example: 'The 2017 tax cuts boosted short-term growth but added $1-2 trillion to the debt over 10 years. Was that trade-off worth it? Supporters say growth benefits outweigh debt costs. Critics say it was fiscally irresponsible. Both have valid points.',
          },
          {
            title: 'Efficiency vs. Equity',
            explanation: 'Fiscal policy involves trade-offs between economic efficiency (maximizing total output) and equity (fair distribution). Progressive taxes may reduce work incentives but fund programs that help the poor. Flat taxes may be more efficient but less equitable. These are value judgments, not just economic calculations.',
            example: 'Should we have a higher minimum wage? It might reduce poverty (equity) but could cost some jobs (efficiency). Should we tax capital gains at lower rates? It might encourage investment (efficiency) but benefits the wealthy (equity concerns). No objectively "correct" answer exists.',
          },
          {
            title: 'Political Economy of Fiscal Policy',
            explanation: 'Fiscal policy is made by politicians who face elections. This creates biases: tax cuts are popular, spending cuts are painful, deficits push costs to future voters. Understanding political incentives helps explain why fiscal policy often seems short-sighted.',
            example: 'Politicians love to cut taxes and increase spending (both popular) but hate raising taxes or cutting programs (both unpopular). This asymmetry explains persistent deficits. Fiscal responsibility often loses to electoral incentives.',
          },
        ],
        personalFinanceConnection: {
          description: 'Fiscal policy debates affect your taxes, benefits, and economic opportunities. Understanding different perspectives helps you evaluate political candidates\' economic proposals. Don\'t just accept partisan talking points - think through the trade-offs yourself.',
          realWorldExample: 'When politicians promise tax cuts AND more spending AND balanced budgets, be skeptical - the math usually doesn\'t add up. When they promise painful choices will be painless, be skeptical too. Good citizenship requires understanding fiscal trade-offs.',
        },
        flashcards: [
          {
            term: 'Keynesian Economics',
            definition: 'The view that government should actively use fiscal policy to stabilize the economy, especially during recessions.',
            philsAnalogy: 'Keynesians say when the bamboo economy slumps, the Panda Government should spend more to get things moving again. Don\'t just wait for markets to fix themselves!',
          },
          {
            term: 'Supply-Side Economics',
            definition: 'The view that tax cuts, especially on businesses and high earners, stimulate economic growth by increasing incentives to work, save, and invest.',
            philsAnalogy: 'Supply-siders say if you cut taxes on bamboo producers, they\'ll produce more bamboo, and everyone benefits. Growth comes from the supply side!',
          },
          {
            term: 'Fiscal Responsibility',
            definition: 'The principle of maintaining sustainable government finances, avoiding excessive deficits and debt.',
            philsAnalogy: 'Fiscal responsibility means the Panda Government shouldn\'t borrow endlessly and leave the bill for future panda generations. Live within your means!',
          },
          {
            term: 'Political Business Cycle',
            definition: 'The tendency for politicians to pursue expansionary policies before elections and contractionary policies after.',
            philsAnalogy: 'Politicians love to hand out bamboo-bucks before elections and send the bill afterward. That\'s the political business cycle - economics meets electoral incentives!',
          },
        ],
        quiz: [
          {
            question: 'Keynesian economists generally believe:',
            options: [
              'Government should never intervene in the economy',
              'Government should actively use fiscal policy to stabilize the economy',
              'Tax cuts always pay for themselves',
              'Deficits are never justified',
            ],
            correctIndex: 1,
            explanation: 'Keynesians advocate active fiscal policy - government spending during recessions to boost demand, and pulling back during booms to prevent overheating.',
          },
          {
            question: 'The trade-off between efficiency and equity means:',
            options: [
              'We can always have both',
              'Policies that maximize output may not distribute it fairly, and vice versa',
              'Efficiency is always more important',
              'Equity is always more important',
            ],
            correctIndex: 1,
            explanation: 'Efficiency (maximizing total output) and equity (fair distribution) often conflict. Policies involve trade-offs between these goals, and the "right" balance depends on values.',
          },
          {
            question: 'Why do democracies tend to run persistent deficits?',
            options: [
              'Voters demand balanced budgets',
              'Politicians face incentives to cut taxes and increase spending, both popular',
              'Deficits are always good for the economy',
              'The constitution requires deficits',
            ],
            correctIndex: 1,
            explanation: 'Tax cuts and spending increases are popular; tax increases and spending cuts are not. Politicians facing elections have incentives to please voters now and defer costs to the future.',
          },
          {
            question: 'Supply-side economists argue that tax cuts:',
            options: [
              'Always increase the deficit',
              'Have no effect on the economy',
              'Can stimulate growth by increasing incentives to work and invest',
              'Should only go to low-income households',
            ],
            correctIndex: 2,
            explanation: 'Supply-siders believe lower tax rates increase incentives to work, save, and invest, potentially boosting economic growth. Critics argue the growth effects are often overstated.',
          },
        ],
        careerSpotlight: {
          title: 'Fiscal Policy Analyst',
          description: 'Fiscal policy analysts study government budgets, tax policies, and their economic effects. They work for government agencies (CBO, Treasury), think tanks, and consulting firms, providing analysis that shapes policy debates.',
          salaryRange: '$65,000 - $120,000',
          skills: ['Budget Analysis', 'Tax Policy', 'Economic Modeling', 'Policy Writing'],
        },
      },
    ],
    
    gamifiedActivity: {
      id: 'budget-balancer',
      title: 'Budget Balancer',
      description: 'You\'re in charge of the national budget! Make spending and tax decisions while managing the deficit and keeping the economy healthy.',
      instructions: [
        'Review current spending and revenue',
        'Propose changes to taxes or spending',
        'See the impact on the deficit and economy',
        'Try to achieve your policy goals',
      ],
      rewards: {
        bamboo: 75,
        xp: 150,
      },
    },
    
    rewards: {
      bamboo: 200,
      xp: 400,
    },
    
    unlockRequirements: {
      previousUnitId: 'macro-4-monetary-policy',
    },
  },
];

export const getMicroeconomicsUnits = (): EconomicsUnit[] => 
  economicsUnits.filter(unit => unit.track === 'microeconomics');

export const getMacroeconomicsUnits = (): EconomicsUnit[] => 
  economicsUnits.filter(unit => unit.track === 'macroeconomics');

export const getUnitById = (id: string): EconomicsUnit | undefined =>
  economicsUnits.find(unit => unit.id === id);
