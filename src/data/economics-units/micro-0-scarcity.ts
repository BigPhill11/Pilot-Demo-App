/**
 * Unit 0: Scarcity, Choice, and Opportunity Cost
 * 
 * The foundational unit of microeconomics - understanding that resources
 * are limited and every choice has a cost.
 */

import type { EconomicsUnit } from '@/types/economics-curriculum';

export const micro0ScarcityUnit: EconomicsUnit = {
  id: 'micro-0-scarcity',
  track: 'microeconomics',
  title: 'Scarcity, Choice & Opportunity Cost',
  description: 'Discover the fundamental problem of economics: we have unlimited wants but limited resources. Learn how every choice you make has a hidden cost.',
  icon: '⏳',
  order: 0,
  
  coreEconomicsConcepts: [
    'Scarcity',
    'Trade-offs',
    'Opportunity Cost',
    'Rational Decision-Making',
    'Wants vs. Needs',
  ],
  
  personalFinanceConnection: {
    description: 'Every dollar you spend is a dollar you can\'t save or invest. Every hour you work is an hour you can\'t spend with friends. Understanding opportunity cost helps you make better decisions with your money and time.',
    relatedPFModules: ['Budgeting Basics', 'Saving Strategies', 'Time Management'],
  },
  
  investingConnection: [
    'Opportunity cost of holding cash vs. investing in stocks',
    'Choosing between different investment options (stocks, bonds, real estate)',
    'The cost of waiting to start investing (time value of money)',
  ],
  
  careerExposure: [
    {
      title: 'Financial Planner',
      description: 'Help individuals and families make smart decisions about spending, saving, and investing by analyzing trade-offs and opportunity costs.',
      salaryRange: '$65,000 - $120,000',
      skills: ['Financial Analysis', 'Client Communication', 'Goal Setting', 'Risk Assessment'],
    },
    {
      title: 'Budget Analyst',
      description: 'Help organizations allocate limited resources effectively by evaluating programs and recommending budget priorities.',
      salaryRange: '$55,000 - $95,000',
      skills: ['Data Analysis', 'Cost-Benefit Analysis', 'Excel/Spreadsheets', 'Report Writing'],
    },
    {
      title: 'Wealth Advisor',
      description: 'Guide high-net-worth clients in making complex financial decisions, balancing risk and reward across their entire portfolio.',
      salaryRange: '$80,000 - $200,000+',
      skills: ['Investment Strategy', 'Tax Planning', 'Estate Planning', 'Relationship Management'],
    },
  ],
  
  lessons: [
    {
      id: 'micro-0-lesson-1',
      title: 'The Problem of Scarcity',
      estimatedMinutes: 12,
      intro: {
        hook: 'Why can\'t you have everything you want? Why do billionaires still have to make choices? The answer lies in one of the most fundamental concepts in economics.',
        philMessage: 'Hey there, future economist! I\'m Phil the Panda, and even though I LOVE bamboo, I can\'t eat it all day - I have to choose between eating, sleeping, and playing! That\'s scarcity in action, and it affects everyone, even billionaires!',
      },
      coreConcepts: [
        {
          title: 'What is Scarcity?',
          explanation: 'Scarcity is the fundamental economic problem: we have unlimited wants but limited resources. Resources include time, money, natural resources, and labor. Because resources are limited, we can\'t have everything we want - we must make choices.',
          example: 'Think about your weekend. You might want to hang out with friends, study for a test, work a shift for extra money, AND binge a new show. But you only have 48 hours. You can\'t do everything - that\'s scarcity of time forcing you to choose.',
        },
        {
          title: 'Scarcity vs. Shortage',
          explanation: 'Scarcity and shortage are different! Scarcity is permanent - there will always be limited resources relative to unlimited wants. A shortage is temporary - it happens when demand exceeds supply at a given price, but it can be resolved by price changes or increased production.',
          example: 'Water is scarce (there\'s a limited amount on Earth), but we don\'t usually experience a water shortage because the price and distribution system work. During a drought, there might be a temporary shortage. Scarcity is forever; shortages come and go.',
        },
        {
          title: 'Why Scarcity Matters',
          explanation: 'Scarcity forces us to make choices. Economics is essentially the study of how individuals, businesses, and governments make choices when facing scarcity. Every choice involves giving something up - and that\'s where opportunity cost comes in.',
          example: 'Jeff Bezos has billions of dollars, but he still faces scarcity of TIME. He can\'t be in two meetings at once or live two lives. Even the richest people must choose how to spend their limited time and attention.',
        },
      ],
      personalFinanceConnection: {
        description: 'Your money is scarce - you have a limited amount. Understanding this helps you prioritize spending on what truly matters to you instead of trying to buy everything.',
        realWorldExample: 'Before your next purchase, ask yourself: "Is this the BEST use of my limited money right now?" If you have $100, spending it on concert tickets means you can\'t also spend it on new shoes. Recognizing scarcity helps you make intentional choices.',
      },
      flashcards: [
        {
          term: 'Scarcity',
          definition: 'The fundamental economic problem that unlimited wants exceed limited resources, forcing people to make choices.',
          philsAnalogy: 'Even in a bamboo forest, I can\'t eat ALL the bamboo - my stomach is limited! Scarcity means I have to pick which stalks to munch.',
        },
        {
          term: 'Resources',
          definition: 'The inputs used to produce goods and services, including land, labor, capital, and entrepreneurship.',
          philsAnalogy: 'To make bamboo smoothies, I need bamboo (land/natural resources), my panda paws (labor), a blender (capital), and my brilliant smoothie ideas (entrepreneurship)!',
        },
        {
          term: 'Shortage',
          definition: 'A temporary situation where the quantity demanded exceeds the quantity supplied at the current price.',
          philsAnalogy: 'When the zoo runs out of bamboo for a day, that\'s a shortage - it\'s temporary and can be fixed. But bamboo being limited on Earth? That\'s scarcity - it\'s forever!',
        },
      ],
      quiz: [
        {
          question: 'What is the fundamental cause of scarcity?',
          options: [
            'Greedy corporations hoarding resources',
            'Unlimited wants but limited resources',
            'Government regulations',
            'Poor planning by individuals',
          ],
          correctIndex: 1,
          explanation: 'Scarcity exists because human wants are unlimited, but the resources to satisfy those wants (time, money, natural resources) are limited. This is true regardless of economic system or government policies.',
        },
        {
          question: 'Which of the following is an example of scarcity (not shortage)?',
          options: [
            'A store running out of PS5s during the holiday season',
            'Having only 24 hours in a day',
            'A restaurant being out of your favorite dish',
            'Tickets selling out for a concert',
          ],
          correctIndex: 1,
          explanation: 'Time is fundamentally scarce - there will always be only 24 hours in a day, no matter what. The other examples are temporary shortages that could be resolved with more supply or higher prices.',
        },
        {
          question: 'Why do even billionaires face scarcity?',
          options: [
            'They don\'t - billionaires can have everything',
            'The government limits what they can buy',
            'They still have limited time and can\'t be in two places at once',
            'Other billionaires compete for the same things',
          ],
          correctIndex: 2,
          explanation: 'Even with unlimited money, billionaires face scarcity of time. They can\'t attend every meeting, visit every country, or spend time with every person. Time is the great equalizer.',
        },
      ],
    },
    {
      id: 'micro-0-lesson-2',
      title: 'Trade-offs: You Can\'t Have It All',
      estimatedMinutes: 14,
      intro: {
        hook: 'Every time you say "yes" to something, you\'re saying "no" to something else. This isn\'t pessimistic - it\'s empowering! Understanding trade-offs helps you make better choices.',
        philMessage: 'Trade-offs are everywhere! When I choose to nap in the sun, I\'m trading off playtime. When I eat extra bamboo, I\'m trading off my afternoon walk. Let\'s learn to see these hidden trade-offs so we can make choices we\'re happy with!',
      },
      coreConcepts: [
        {
          title: 'What is a Trade-off?',
          explanation: 'A trade-off is the sacrifice you make when you choose one option over another. Because of scarcity, every choice involves giving something up. Trade-offs aren\'t just about money - they involve time, energy, relationships, and opportunities.',
          example: 'Choosing to study for an extra hour involves trade-offs: you might give up sleep, social time, or relaxation. The trade-off isn\'t just "studying vs. not studying" - it\'s "studying vs. everything else you could do with that hour."',
        },
        {
          title: 'Identifying Hidden Trade-offs',
          explanation: 'Many trade-offs are invisible until you look for them. When you buy something, you\'re not just trading money - you\'re trading all the other things that money could have bought. When you spend time on one activity, you\'re trading all other possible uses of that time.',
          example: 'Scrolling social media for an hour seems "free," but the hidden trade-offs include: homework you didn\'t do, sleep you didn\'t get, exercise you skipped, or a friend you didn\'t call. Nothing is truly free when time is involved.',
        },
        {
          title: 'Trade-offs in Big Decisions',
          explanation: 'Major life decisions involve complex trade-offs. Choosing a college means trading off other schools, gap years, or starting work. Choosing a career means trading off other paths. Understanding trade-offs helps you make decisions you won\'t regret.',
          example: 'Taking a high-paying job might mean trading off work-life balance, location preferences, or passion for the work. A lower-paying dream job might mean trading off financial security. Neither choice is "wrong" - but understanding the trade-offs helps you choose what\'s right for YOU.',
        },
        {
          title: 'Wants vs. Needs',
          explanation: 'Needs are things required for survival and basic functioning (food, shelter, healthcare). Wants are things that improve quality of life but aren\'t essential. Understanding this distinction helps you prioritize when facing trade-offs.',
          example: 'You NEED food, but you WANT restaurant meals. You NEED shelter, but you WANT a luxury apartment. You NEED transportation, but you WANT a sports car. When money is tight, distinguishing wants from needs helps you make smart trade-offs.',
        },
      ],
      personalFinanceConnection: {
        description: 'Every purchase is a trade-off. That $200 jacket means you\'re NOT putting $200 toward savings, a concert, or 40 meals. Seeing purchases as trade-offs helps you spend on what truly matters.',
        realWorldExample: 'Try the "trade-off test" before buying: "What else could I do with this money?" If you\'d rather have the item than the alternatives, buy it confidently. If you realize you\'d prefer the alternatives, skip the purchase.',
      },
      flashcards: [
        {
          term: 'Trade-off',
          definition: 'The sacrifice made when choosing one option over another; what you give up when you make a choice.',
          philsAnalogy: 'When I choose the juiciest bamboo stalk, I trade off eating the other stalks nearby. Every choice means giving something up!',
        },
        {
          term: 'Wants',
          definition: 'Desires for goods and services that are not necessary for survival but improve quality of life.',
          philsAnalogy: 'I WANT a heated bamboo bed and a personal bamboo chef, but I don\'t NEED them to survive. They\'d be nice, though!',
        },
        {
          term: 'Needs',
          definition: 'Basic requirements for survival and functioning, such as food, water, shelter, and healthcare.',
          philsAnalogy: 'I NEED bamboo to eat, water to drink, and a safe place to sleep. Without these, I couldn\'t survive!',
        },
        {
          term: 'Decision-Making',
          definition: 'The process of choosing between alternatives by weighing costs and benefits.',
          philsAnalogy: 'Every day I decide: nap now or play now? Eat here or explore there? Good decisions come from thinking about trade-offs!',
        },
      ],
      quiz: [
        {
          question: 'What is a trade-off?',
          options: [
            'A type of stock market transaction',
            'What you give up when you make a choice',
            'A negotiation between two parties',
            'A government economic policy',
          ],
          correctIndex: 1,
          explanation: 'A trade-off is the sacrifice you make when choosing one option over another. Every choice involves giving something up because of scarcity.',
        },
        {
          question: 'Which of the following is a NEED rather than a WANT?',
          options: [
            'The latest iPhone',
            'A Netflix subscription',
            'Basic healthcare',
            'Designer clothing',
          ],
          correctIndex: 2,
          explanation: 'Basic healthcare is a need - it\'s required for survival and functioning. The other options are wants that improve quality of life but aren\'t essential for survival.',
        },
        {
          question: 'You have $50 and must choose between a video game ($50) or dinner with friends ($50). What is the trade-off of buying the video game?',
          options: [
            'The $50 you spent',
            'The dinner with friends you can\'t have',
            'The time spent playing the game',
            'The electricity to run the game',
          ],
          correctIndex: 1,
          explanation: 'The trade-off is what you give up - the dinner with friends. The $50 is the cost, but the trade-off is the alternative you sacrificed.',
        },
        {
          question: 'Why are hidden trade-offs important to identify?',
          options: [
            'They help you avoid paying taxes',
            'They reveal the true cost of your choices',
            'They are required by law to disclose',
            'They only matter for business decisions',
          ],
          correctIndex: 1,
          explanation: 'Hidden trade-offs reveal the true cost of choices. When you scroll social media, the hidden trade-off might be sleep, homework, or exercise. Seeing these helps you make better decisions.',
        },
      ],
      careerSpotlight: {
        title: 'Financial Planner',
        description: 'Financial planners help people navigate trade-offs every day. Should you pay off debt or invest? Buy a house or rent? Retire early or work longer? They help clients see the full picture of their financial trade-offs.',
        salaryRange: '$65,000 - $120,000',
        skills: ['Financial Analysis', 'Communication', 'Goal Setting', 'Empathy'],
      },
    },
    {
      id: 'micro-0-lesson-3',
      title: 'Opportunity Cost: The Road Not Taken',
      estimatedMinutes: 15,
      intro: {
        hook: 'What\'s the REAL cost of that coffee you bought this morning? Hint: it\'s not just $5. The true cost includes everything else you could have done with that money. Welcome to opportunity cost!',
        philMessage: 'Opportunity cost is my favorite economics concept! It\'s like a superpower that helps you see the invisible price tag on every choice. Once you understand it, you\'ll never look at decisions the same way again!',
      },
      coreConcepts: [
        {
          title: 'What is Opportunity Cost?',
          explanation: 'Opportunity cost is the value of the next best alternative you give up when making a choice. It\'s not just what you spend - it\'s what you could have done instead. Opportunity cost helps you understand the TRUE cost of any decision.',
          example: 'If you spend $20 on lunch, the opportunity cost isn\'t just $20 - it\'s the best alternative use of that $20. Maybe it\'s 4 days of homemade lunches, or half of a book you wanted, or a contribution to your savings. The opportunity cost is whichever alternative you valued most.',
        },
        {
          title: 'Calculating Opportunity Cost',
          explanation: 'To find opportunity cost, identify all your alternatives, then determine which one you value most (besides your chosen option). That\'s your opportunity cost. You don\'t add up ALL alternatives - just the single best one you\'re giving up.',
          example: 'You have Saturday free. Options: A) Work and earn $100, B) Study for Monday\'s test, C) Hang with friends. If you choose to work, your opportunity cost is whichever of B or C you value more - not both combined. If you\'d rather have studied, that\'s your opportunity cost.',
        },
        {
          title: 'Opportunity Cost of Time',
          explanation: 'Time has opportunity cost too! An hour spent on one activity is an hour you can\'t spend on anything else. This is why "free" activities aren\'t really free - they cost you time that could be used elsewhere.',
          example: 'Binge-watching a show for 5 hours is "free" in terms of money, but the opportunity cost might be huge: a workout, studying, sleep, or time with family. When you value your time, you realize nothing is truly free.',
        },
        {
          title: 'Using Opportunity Cost to Decide',
          explanation: 'Good decision-makers always consider opportunity cost. Before choosing, ask: "What\'s my next best alternative? Am I okay giving that up?" If the opportunity cost is too high, reconsider your choice.',
          example: 'Before buying a $1,000 phone, consider: the opportunity cost might be a weekend trip, 2 months of car payments, or a solid start to your emergency fund. If you\'d rather have the phone than any of those, buy it! If not, maybe wait.',
        },
      ],
      personalFinanceConnection: {
        description: 'Opportunity cost is the key to smart money decisions. Every dollar spent has an opportunity cost - it could have been saved, invested, or spent on something else. Understanding this helps you spend intentionally.',
        realWorldExample: 'The opportunity cost of a $5 daily coffee isn\'t just $5 - it\'s $150/month or $1,800/year. That\'s a vacation, a new laptop, or $1,800 invested (which could grow to $5,000+ over 10 years). Is the coffee worth more than those alternatives? Only you can decide.',
      },
      flashcards: [
        {
          term: 'Opportunity Cost',
          definition: 'The value of the next best alternative forgone when making a choice.',
          philsAnalogy: 'If I choose to nap instead of play, my opportunity cost is the fun I would have had playing - not the nap itself, but what I gave up!',
        },
        {
          term: 'Next Best Alternative',
          definition: 'The option you would have chosen if your first choice wasn\'t available; used to calculate opportunity cost.',
          philsAnalogy: 'If I can\'t have bamboo, my next best alternative is eucalyptus. That\'s what I\'m really giving up when I choose bamboo!',
        },
        {
          term: 'Explicit Cost',
          definition: 'Direct, out-of-pocket payments for resources, like money spent on goods and services.',
          philsAnalogy: 'When I trade my favorite rock for bamboo, that rock is my explicit cost - something I physically gave up.',
        },
        {
          term: 'Implicit Cost',
          definition: 'The opportunity cost of using resources you already own, including time and foregone alternatives.',
          philsAnalogy: 'When I spend an hour eating bamboo, the implicit cost is the hour of playtime I gave up - no money changed paws, but I still paid a price!',
        },
      ],
      quiz: [
        {
          question: 'What is opportunity cost?',
          options: [
            'The price tag on a product',
            'The total of all alternatives given up',
            'The value of the next best alternative forgone',
            'The cost of missed opportunities in the past',
          ],
          correctIndex: 2,
          explanation: 'Opportunity cost is specifically the value of the NEXT BEST alternative - not all alternatives combined, just the single best option you\'re giving up.',
        },
        {
          question: 'You can either work for $15/hour or attend a free concert. If you choose the concert, what is your opportunity cost?',
          options: [
            '$0 because the concert is free',
            '$15 (the wages you could have earned)',
            'The price of concert tickets',
            'The cost of transportation to the concert',
          ],
          correctIndex: 1,
          explanation: 'Even though the concert is "free," attending it means giving up $15/hour in wages. That\'s your opportunity cost - what you sacrifice by choosing the concert.',
        },
        {
          question: 'Why is the opportunity cost of time important?',
          options: [
            'Because time is money',
            'Because time spent on one thing can\'t be spent on another',
            'Because employers track your time',
            'Because time moves faster as you age',
          ],
          correctIndex: 1,
          explanation: 'Time is scarce and irreversible. An hour spent on one activity is an hour you can never spend on anything else. This makes the opportunity cost of time crucial for decision-making.',
        },
        {
          question: 'How should you use opportunity cost when making decisions?',
          options: [
            'Always choose the cheapest option',
            'Avoid making any choices',
            'Compare your choice to the next best alternative',
            'Only consider monetary costs',
          ],
          correctIndex: 2,
          explanation: 'Good decision-making involves comparing your choice to the next best alternative. If you\'re comfortable giving up that alternative, proceed. If not, reconsider.',
        },
      ],
    },
    {
      id: 'micro-0-lesson-4',
      title: 'Rational Decision-Making',
      estimatedMinutes: 14,
      intro: {
        hook: 'Do you make decisions with your head or your heart? Economists assume people are "rational," but what does that really mean? And why do we sometimes make choices that seem irrational?',
        philMessage: 'Time to put it all together! We\'ve learned about scarcity, trade-offs, and opportunity cost. Now let\'s learn how to use these tools to make better decisions. Don\'t worry - being rational doesn\'t mean being a robot!',
      },
      coreConcepts: [
        {
          title: 'What is Rational Decision-Making?',
          explanation: 'In economics, "rational" means making choices that maximize your well-being given your constraints. Rational decision-makers weigh costs and benefits, consider opportunity costs, and choose the option that gives them the most satisfaction (utility).',
          example: 'A rational decision to buy a car involves: comparing the benefits (convenience, freedom) to the costs (price, insurance, gas), considering alternatives (public transit, biking), and choosing based on what maximizes YOUR happiness - not what others think you should do.',
        },
        {
          title: 'Marginal Thinking',
          explanation: 'Rational decision-makers think "at the margin" - they consider the additional (marginal) benefit vs. the additional (marginal) cost of one more unit. You should do something as long as the marginal benefit exceeds the marginal cost.',
          example: 'Should you study one more hour? Compare the marginal benefit (slightly better grade) to the marginal cost (lost sleep, missed fun). If the benefit exceeds the cost, study. If not, stop. You don\'t need to study until you drop - just until the next hour isn\'t worth it.',
        },
        {
          title: 'Emotional vs. Rational Decisions',
          explanation: 'Humans aren\'t perfectly rational - we\'re influenced by emotions, biases, and mental shortcuts. Behavioral economics studies these "irrational" patterns. Being aware of emotional influences helps you make better decisions.',
          example: 'Impulse buying is emotional, not rational. You see a sale sign and feel urgency to buy, even if you don\'t need the item. Rational thinking would ask: "Would I buy this at full price? Do I have a better use for this money?" Emotions can override logic.',
        },
        {
          title: 'Putting It All Together',
          explanation: 'Good decision-making combines everything we\'ve learned: recognize scarcity, identify trade-offs, calculate opportunity cost, think at the margin, and be aware of emotional biases. This framework helps you make choices you\'ll be happy with.',
          example: 'Deciding whether to take a job: 1) Recognize your time is scarce, 2) Identify trade-offs (salary vs. work-life balance), 3) Calculate opportunity cost (other jobs, more education), 4) Think marginally (is the extra $5K worth the extra 10 hours/week?), 5) Check your emotions (are you excited or just scared to say no?).',
        },
      ],
      personalFinanceConnection: {
        description: 'Rational financial decisions involve thinking at the margin and avoiding emotional spending. Before any purchase, pause and ask: "Is this the best use of my next dollar?" This simple question can transform your finances.',
        realWorldExample: 'Create a "24-hour rule" for purchases over $50. Wait 24 hours before buying. This pause lets rational thinking catch up to emotional impulses. You\'ll be surprised how many "must-haves" become "don\'t needs" after a day.',
      },
      flashcards: [
        {
          term: 'Rational Behavior',
          definition: 'Making choices that maximize well-being by weighing costs and benefits and responding to incentives.',
          philsAnalogy: 'I\'m rational when I choose the bamboo patch with the most food and least predators. I weigh the benefits (yummy bamboo) against the costs (danger) and pick the best option!',
        },
        {
          term: 'Marginal Thinking',
          definition: 'Decision-making that compares the additional benefits and costs of one more unit of an activity.',
          philsAnalogy: 'Should I eat ONE MORE bamboo stalk? I ask: will the joy of eating it be greater than the cost of feeling too full? That\'s marginal thinking!',
        },
        {
          term: 'Utility',
          definition: 'The satisfaction or happiness a person receives from consuming a good or service.',
          philsAnalogy: 'Utility is my happiness level! Bamboo gives me high utility. Rocks give me zero utility. I make choices to maximize my total utility.',
        },
        {
          term: 'Incentive',
          definition: 'Something that motivates or encourages a person to take a particular action.',
          philsAnalogy: 'Extra bamboo is an incentive for me to do tricks! Incentives change behavior - offer me enough bamboo, and I\'ll learn to dance!',
        },
      ],
      quiz: [
        {
          question: 'What does "rational" mean in economics?',
          options: [
            'Being emotionless like a robot',
            'Always choosing the cheapest option',
            'Making choices that maximize your well-being given constraints',
            'Following what experts recommend',
          ],
          correctIndex: 2,
          explanation: 'Rational means maximizing your own well-being by weighing costs and benefits. It doesn\'t mean being emotionless or always choosing the cheapest option - it means making the best choice FOR YOU.',
        },
        {
          question: 'What is marginal thinking?',
          options: [
            'Thinking about margins in a document',
            'Comparing the additional benefit and cost of one more unit',
            'Thinking about small, unimportant decisions',
            'Considering only the margins of profit',
          ],
          correctIndex: 1,
          explanation: 'Marginal thinking compares the additional (marginal) benefit to the additional (marginal) cost of one more unit. Should you study one more hour? Work one more shift? Eat one more slice?',
        },
        {
          question: 'You\'re at an all-you-can-eat buffet. Using marginal thinking, when should you stop eating?',
          options: [
            'When the restaurant closes',
            'When you\'ve eaten your money\'s worth',
            'When the marginal cost (discomfort) exceeds the marginal benefit (enjoyment)',
            'When your plate is empty',
          ],
          correctIndex: 2,
          explanation: 'Marginal thinking says stop when the next bite\'s cost (feeling too full, discomfort) exceeds its benefit (taste enjoyment). The sunk cost of the buffet price shouldn\'t factor in!',
        },
        {
          question: 'Why do people sometimes make "irrational" decisions?',
          options: [
            'They don\'t understand economics',
            'Emotions, biases, and mental shortcuts influence choices',
            'They want to make bad decisions',
            'Rational decisions are illegal',
          ],
          correctIndex: 1,
          explanation: 'Behavioral economics shows that emotions, cognitive biases, and mental shortcuts often override rational thinking. Impulse buying, fear of missing out, and social pressure can lead to choices that don\'t maximize well-being.',
        },
      ],
      careerSpotlight: {
        title: 'Budget Analyst',
        description: 'Budget analysts are professional rational decision-makers! They help organizations allocate scarce resources by analyzing costs, benefits, and trade-offs. They use marginal thinking to recommend where each additional dollar should go.',
        salaryRange: '$55,000 - $95,000',
        skills: ['Cost-Benefit Analysis', 'Data Analysis', 'Critical Thinking', 'Communication'],
      },
    },
  ],
  
  gamifiedActivity: {
    id: 'life-budget-sim',
    title: 'Life Budget Simulator',
    description: 'You just got your first paycheck! Allocate your monthly income across needs, wants, savings, and investments. Every choice has an opportunity cost - watch as missed opportunities are revealed!',
    instructions: [
      'Receive your monthly income of $2,500',
      'Allocate money across categories: Rent, Food, Transportation, Entertainment, Savings, Investing',
      'See the opportunity cost of each choice visualized',
      'Face unexpected events that test your budget',
      'Try to maximize your financial well-being score',
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
};
