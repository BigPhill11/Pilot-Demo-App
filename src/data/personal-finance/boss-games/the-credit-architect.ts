import { BossGameConfig, GameMeters } from '@/types/boss-game';

export const theCreditArchitectBossGame: BossGameConfig = {
  id: 'the-credit-architect',
  moduleId: 'credit-debt',
  title: 'The Credit Architect',
  subtitle: 'Build Your Credit Foundation',
  description: 'You are starting adult life with no credit history. Over 5 years, you will build credit from scratch, make major borrowing decisions, and learn to manage debt strategically. Your credit score will unlock or block opportunities.',
  totalMonths: 5,
  initialMeters: {
    income: 30,           // Credit Score proxy (starts low - no history)
    hourlyValue: 50,      // Financial Access (approval power)
    energy: 80,           // Debt Stress Level (higher = less stress)
    replaceability: 70,   // Total Debt Load (lower is better)
    optionality: 50,      // Credit Utilization Health
  },
  months: [
    // YEAR 1: Starting from Zero
    {
      month: 1,
      title: 'Year One: Credit Invisible',
      openingNarration: `You try to rent an apartment. The landlord runs a credit check. Nothing comes back. You are "credit invisible" - no score at all because you have never borrowed money.

A message appears: "Credit is the financial reputation you build through behavior over time."`,
      decisions: [
        {
          id: 'y1-first-card',
          category: 'money',
          title: 'Your First Credit Card',
          description: 'You want to build credit. How do you get your first card with no history?',
          pandaDialogue: 'Everyone keeps telling me I need credit to get credit. How does that make sense?',
          options: [
            {
              id: 'secured-card',
              label: 'Get a secured credit card',
              description: 'Put down $300 deposit as collateral',
              meterChanges: { income: 15, hourlyValue: 10, optionality: 10 },
              storyResponse: 'The $300 deposit gets you a $300 limit. Your first piece of credit history begins.',
              unlocks: ['secured-start'],
            },
            {
              id: 'store-card',
              label: 'Apply for a store credit card',
              description: 'Easier to get approved at retail stores',
              meterChanges: { income: 10, hourlyValue: 5, optionality: -5 },
              storyResponse: 'Approved! But the interest rate is 29.99% and it only works at one store.',
            },
            {
              id: 'authorized-user',
              label: 'Become an authorized user on family card',
              description: 'Piggyback on established credit history',
              meterChanges: { income: 20, hourlyValue: 15 },
              storyResponse: 'Your credit score jumps immediately from years of family payment history. A shortcut most people do not know.',
              unlocks: ['authorized-user'],
            },
          ],
        },
        {
          id: 'y1-first-usage',
          category: 'skill',
          title: 'Using Your First Card',
          description: 'You have a credit card now. How do you use it?',
          options: [
            {
              id: 'max-it-out',
              label: 'Use it for everything possible',
              description: 'Maximize the rewards',
              meterChanges: { income: -10, optionality: -25, energy: -15 },
              storyResponse: 'You maxed out immediately. Utilization at 100% tanks your score. Payments become stressful.',
            },
            {
              id: 'small-recurring',
              label: 'One small recurring charge, autopay',
              description: 'Netflix subscription on autopay',
              meterChanges: { income: 15, optionality: 20, hourlyValue: 10 },
              storyResponse: 'Perfect usage pattern. Low utilization, perfect payment history, zero effort. Score climbing.',
              unlocks: ['smart-usage'],
            },
            {
              id: 'never-use',
              label: 'Keep it for emergencies only',
              description: 'Do not use unless necessary',
              meterChanges: { income: 5, optionality: 10, hourlyValue: -5 },
              storyResponse: 'Some activity is better than none. Your credit builds slowly without regular use.',
            },
          ],
        },
        {
          id: 'y1-payment-habit',
          category: 'work',
          title: 'Payment Habits',
          description: 'How do you handle your credit card payments?',
          pandaDialogue: 'I hear payment history is the most important factor...',
          options: [
            {
              id: 'autopay-full',
              label: 'Autopay full balance every month',
              description: 'Never pay interest, never miss payment',
              meterChanges: { income: 20, energy: 15, optionality: 15 },
              storyResponse: 'Set and forget. Perfect payment history builds automatically. No interest charges ever.',
              unlocks: ['autopay-master'],
            },
            {
              id: 'manual-pay',
              label: 'Pay manually when you remember',
              description: 'Check the balance and pay',
              meterChanges: { income: 5, energy: -10, replaceability: 10 },
              storyResponse: 'You forgot once. The late payment hit your credit report. A single mistake that takes 7 years to remove.',
            },
            {
              id: 'minimum-payment',
              label: 'Just pay the minimum',
              description: 'Keep more cash available',
              meterChanges: { income: 0, replaceability: 20, energy: -20 },
              storyResponse: 'Interest accumulates. A $500 purchase becomes $700 over time. The debt grows.',
            },
          ],
        },
      ],
      closingNarration: 'Year 1 ends. You are no longer credit invisible. A score exists. The foundation is being laid.',
    },
    // YEAR 2: Borrowing Decisions
    {
      month: 2,
      title: 'Year Two: The Borrowing Choices',
      openingNarration: 'Your credit score is now 650. Doors are opening. But with access comes temptation. Not all debt is created equal. Some builds your future. Some destroys it.',
      decisions: [
        {
          id: 'y2-productive-debt',
          category: 'money',
          title: 'Education Investment',
          description: 'A $5,000 certification could increase your salary by $15,000/year. How do you pay for it?',
          pandaDialogue: 'Is borrowing for education productive debt or just more debt?',
          options: [
            {
              id: 'cash-only',
              label: 'Wait until you save $5,000 cash',
              description: 'Stay debt-free',
              meterChanges: { hourlyValue: -10, energy: 10, optionality: -10 },
              storyResponse: 'It takes 18 months to save. You missed 18 months of higher salary. $22,500 in lost income.',
            },
            {
              id: 'low-interest-loan',
              label: 'Take a low-interest personal loan',
              description: '6% interest, 12-month payoff',
              meterChanges: { income: 5, hourlyValue: 15, replaceability: 10 },
              storyResponse: 'You borrow $5,000, pay $160 in interest, earn $15,000 more that year. ROI: 2,866%.',
              unlocks: ['productive-borrower'],
            },
            {
              id: 'credit-card-fund',
              label: 'Put it on your credit card',
              description: 'Pay it off over time',
              meterChanges: { income: -5, replaceability: 25, energy: -20 },
              storyResponse: 'At 24% interest, the $5,000 costs you $1,200 in interest. The math still works, but barely.',
            },
          ],
        },
        {
          id: 'y2-car-decision',
          category: 'work',
          title: 'The Car Question',
          description: 'Your 15-year-old car finally dies. You need transportation for work. Options range from $3,000 to $35,000.',
          options: [
            {
              id: 'cheap-cash-car',
              label: 'Buy a $3,000 used car with cash',
              description: 'No payments, functional transportation',
              meterChanges: { energy: 20, hourlyValue: 5, optionality: 10 },
              storyResponse: 'The car is ugly but runs. No monthly payment. You stay debt-light and mobile.',
              unlocks: ['frugal-transport'],
            },
            {
              id: 'reasonable-loan',
              label: 'Finance a $15,000 reliable used car',
              description: '5% rate, 48-month loan',
              meterChanges: { income: 5, replaceability: 15, hourlyValue: 10 },
              storyResponse: 'Payments are $345/month. Reliable transportation that builds credit with each payment.',
              unlocks: ['reasonable-financer'],
            },
            {
              id: 'luxury-lease',
              label: 'Lease a $35,000 new car',
              description: 'Low down payment, drive something nice',
              meterChanges: { income: -15, replaceability: 35, energy: -25, optionality: -20 },
              storyResponse: 'You look successful but the $500/month payment strains your budget. You own nothing at the end.',
            },
          ],
        },
        {
          id: 'y2-credit-inquiry',
          category: 'skill',
          title: 'Credit Applications',
          description: 'You want to get the best rate on your car loan. How many lenders do you apply to?',
          options: [
            {
              id: 'one-bank',
              label: 'Apply at one bank and accept their rate',
              description: 'Keep it simple',
              meterChanges: { hourlyValue: -5, income: -5 },
              storyResponse: 'You took the first offer at 7%. Other banks would have offered 5%. $600 in extra interest.',
            },
            {
              id: 'rate-shop-window',
              label: 'Apply to 5 lenders within 2 weeks',
              description: 'Multiple inquiries count as one',
              meterChanges: { hourlyValue: 15, income: 10 },
              storyResponse: 'All inquiries counted as one. You got the best rate at 4.5%. Saved $900 over the loan.',
              unlocks: ['rate-shopper'],
            },
            {
              id: 'spread-applications',
              label: 'Apply to lenders over 3 months',
              description: 'Research each one carefully',
              meterChanges: { income: -10, optionality: -15 },
              storyResponse: 'Each application was a separate inquiry. Your score dropped 25 points. The rate is now worse.',
            },
          ],
        },
      ],
      closingNarration: 'Year 2 ends. You understand the difference between debt that builds and debt that destroys. Score: 680.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.replaceability > 70,
          event: 'Your debt load is getting heavy. Monthly payments are starting to feel constraining.',
        },
      ],
    },
    // YEAR 3: Building the Score
    {
      month: 3,
      title: 'Year Three: The Score Game',
      openingNarration: 'You understand the five factors: payment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), new credit (10%). Now you can optimize.',
      decisions: [
        {
          id: 'y3-utilization',
          category: 'money',
          title: 'Managing Utilization',
          description: 'Your credit limit is $5,000. Your typical balance before payment is $2,500 (50% utilization). This is hurting your score.',
          pandaDialogue: 'I always pay in full. Why does the balance before the statement matter?',
          options: [
            {
              id: 'keep-same',
              label: 'Keep doing what you are doing',
              description: 'You pay in full so it is fine',
              meterChanges: { optionality: -10, income: -5 },
              storyResponse: 'The high utilization keeps your score suppressed. You are doing everything right but one thing.',
            },
            {
              id: 'pay-before-statement',
              label: 'Pay down balance before statement closes',
              description: 'Lower reported utilization',
              meterChanges: { optionality: 20, income: 15, energy: -5 },
              storyResponse: 'Reported utilization drops to 5%. Score jumps 40 points immediately. Same spending, different timing.',
              unlocks: ['utilization-master'],
            },
            {
              id: 'request-cli',
              label: 'Request a credit limit increase',
              description: 'Same balance, lower percentage',
              meterChanges: { optionality: 15, income: 10, hourlyValue: 10 },
              storyResponse: 'Limit increased to $10,000. Same spending is now 25% utilization. Score improves.',
              unlocks: ['limit-optimizer'],
            },
          ],
        },
        {
          id: 'y3-credit-mix',
          category: 'skill',
          title: 'Credit Mix',
          description: 'You only have credit cards (revolving credit). Lenders like to see a mix of credit types.',
          options: [
            {
              id: 'cards-only',
              label: 'Stick with cards only',
              description: 'No need for loans',
              meterChanges: { hourlyValue: -5, income: -5 },
              storyResponse: 'Your credit mix stays thin. Not a disaster, but not optimal either.',
            },
            {
              id: 'credit-builder-loan',
              label: 'Get a credit-builder loan',
              description: 'Small loan designed to build credit',
              meterChanges: { hourlyValue: 15, income: 10, replaceability: 5 },
              storyResponse: 'The $1,000 loan is held in savings while you pay it off. Adds installment credit to your mix.',
              unlocks: ['credit-mix-diversified'],
            },
            {
              id: 'wait-for-natural',
              label: 'Wait for a natural need',
              description: 'Do not take debt for the sake of credit',
              meterChanges: { hourlyValue: 5, energy: 10 },
              storyResponse: 'Practical approach. Your mix will diversify when you actually need other credit types.',
            },
          ],
        },
        {
          id: 'y3-old-card',
          category: 'work',
          title: 'Old Card Decision',
          description: 'Your first secured card has a $15 annual fee. You have better cards now. Close it?',
          options: [
            {
              id: 'close-card',
              label: 'Close the old card',
              description: 'Stop paying the fee',
              meterChanges: { income: -15, optionality: -20 },
              storyResponse: 'You saved $15/year but lost your oldest account. Average age of credit drops. Score down 30 points.',
            },
            {
              id: 'product-change',
              label: 'Ask for a product change',
              description: 'Convert to no-fee card',
              meterChanges: { income: 10, optionality: 15, energy: 5 },
              storyResponse: 'Same account, different card, no fee. Your credit age stays intact. Perfect solution.',
              unlocks: ['product-changer'],
            },
            {
              id: 'keep-paying',
              label: 'Keep paying the $15 fee',
              description: 'Worth it to keep the history',
              meterChanges: { optionality: 10, income: 5 },
              storyResponse: 'The fee is worth the credit age. A sock drawer card that protects your score.',
              unlocks: ['history-keeper'],
            },
          ],
        },
      ],
      closingNarration: 'Year 3 ends. You are gaming the credit system like a pro. Score: 740.',
      specialEvents: [
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('utilization-master'),
          event: 'A mortgage lender says you qualify for excellent rates. Your score optimization is paying off.',
        },
      ],
    },
    // YEAR 4: Debt Paydown
    {
      month: 4,
      title: 'Year Four: The Paydown Strategy',
      openingNarration: 'You have $15,000 in total debt: $8,000 car loan at 5%, $5,000 personal loan at 12%, and $2,000 credit card at 24%. Time to create a payoff plan.',
      decisions: [
        {
          id: 'y4-payoff-strategy',
          category: 'money',
          title: 'Debt Payoff Order',
          description: 'You have $500/month extra to throw at debt. Which method do you use?',
          pandaDialogue: 'Math says highest rate first. Psychology says smallest balance first. Which actually works?',
          options: [
            {
              id: 'avalanche',
              label: 'Avalanche method (highest rate first)',
              description: 'Credit card → personal loan → car',
              meterChanges: { income: 20, hourlyValue: 15, energy: -5 },
              storyResponse: 'Mathematically optimal. You save $1,100 in interest. The credit card balance takes 4 months to clear.',
              unlocks: ['avalanche-method'],
            },
            {
              id: 'snowball',
              label: 'Snowball method (smallest balance first)',
              description: 'Credit card → personal loan → car',
              meterChanges: { income: 15, energy: 15, replaceability: -10 },
              storyResponse: 'Quick wins! Credit card gone in 4 months. The psychological momentum keeps you going.',
              unlocks: ['snowball-method'],
            },
            {
              id: 'equal-payments',
              label: 'Pay extra on all debts equally',
              description: 'Fair distribution',
              meterChanges: { income: 5, hourlyValue: -5 },
              storyResponse: 'This approach has no mathematical or psychological advantage. You pay more interest than necessary.',
            },
          ],
        },
        {
          id: 'y4-consolidation-offer',
          category: 'negotiation',
          title: 'Consolidation Offer',
          description: 'A bank offers to consolidate your debt at 9% APR. One payment, one rate.',
          options: [
            {
              id: 'reject-consolidation',
              label: 'Reject and keep current strategy',
              description: 'Already on track',
              meterChanges: { hourlyValue: 5, income: 5 },
              storyResponse: 'You are already winning. No need to restart the clock on new debt.',
              unlocks: ['consolidation-skeptic'],
            },
            {
              id: 'consolidate-all',
              label: 'Consolidate everything',
              description: 'Simplify to one payment',
              meterChanges: { income: 10, energy: 15, replaceability: 5 },
              storyResponse: 'Lower rate than two of your debts. Simpler management. May extend payoff time if not careful.',
              unlocks: ['consolidator'],
            },
            {
              id: 'partial-consolidation',
              label: 'Consolidate only high-rate debt',
              description: 'Keep the 5% car loan separate',
              meterChanges: { income: 15, hourlyValue: 10, energy: 10 },
              storyResponse: 'Smart. You reduced rates on expensive debt while keeping the cheap debt as-is.',
              unlocks: ['strategic-consolidator'],
            },
          ],
        },
        {
          id: 'y4-temptation',
          category: 'work',
          title: 'New Credit Temptation',
          description: 'Your score is 740. You qualify for a $20,000 credit limit. Do you take it?',
          options: [
            {
              id: 'take-all',
              label: 'Take the full $20,000 limit',
              description: 'More credit = lower utilization',
              meterChanges: { optionality: 15, income: 5, replaceability: 10 },
              storyResponse: 'Your utilization drops. Score goes up. But you now have $20,000 of temptation available.',
              unlocks: ['high-limit-holder'],
            },
            {
              id: 'decline-new',
              label: 'Decline the new credit',
              description: 'Stay focused on paydown',
              meterChanges: { energy: 15, hourlyValue: 5 },
              storyResponse: 'Discipline over optimization. You stay focused on eliminating existing debt.',
              unlocks: ['debt-focused'],
            },
            {
              id: 'accept-then-freeze',
              label: 'Accept it but freeze the card',
              description: 'Get the score boost, remove temptation',
              meterChanges: { optionality: 20, income: 10, energy: 10 },
              storyResponse: 'The card goes in a block of ice. Utilization drops, score rises, no temptation. Best of both worlds.',
              unlocks: ['freezer-method'],
            },
          ],
        },
      ],
      closingNarration: 'Year 4 ends. Debt is under control. You understand how to manage and eliminate it strategically. Score: 760.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.replaceability < 30,
          event: 'Your debt load is light. Monthly cash flow is strong. Financial stress is low.',
        },
      ],
    },
    // YEAR 5: Major Life Credit Decision
    {
      month: 5,
      title: 'Year Five: The Big Purchase',
      openingNarration: 'Your credit score is now 780. You are ready for a major life decision. A home purchase or similar major credit use will test everything you have learned.',
      decisions: [
        {
          id: 'y5-mortgage-prep',
          category: 'skill',
          title: 'Mortgage Preparation',
          description: 'You are 6 months from buying a home. How do you prepare your credit?',
          pandaDialogue: 'Everything I do now affects the biggest loan I will ever take.',
          options: [
            {
              id: 'credit-freeze',
              label: 'Freeze all credit activity',
              description: 'No new accounts, no changes',
              meterChanges: { income: 15, hourlyValue: 15, optionality: 10 },
              storyResponse: 'Your score stays stable. No surprises for the mortgage lender. Perfect preparation.',
              unlocks: ['mortgage-ready'],
            },
            {
              id: 'chase-rewards',
              label: 'Open a new rewards card for the move',
              description: 'Great points on furniture',
              meterChanges: { income: -15, optionality: -15, hourlyValue: -10 },
              storyResponse: 'The hard inquiry and new account drop your score 20 points. Mortgage rate is now 0.25% higher. Costs $15,000 extra over 30 years.',
            },
            {
              id: 'pay-down-more',
              label: 'Aggressively pay down remaining debt',
              description: 'Lower DTI ratio',
              meterChanges: { income: 10, hourlyValue: 20, replaceability: -20 },
              storyResponse: 'Lower debt-to-income ratio qualifies you for a larger mortgage at a better rate.',
              unlocks: ['dti-optimizer'],
            },
          ],
        },
        {
          id: 'y5-mortgage-shopping',
          category: 'money',
          title: 'Shopping for the Mortgage',
          description: 'How do you find the best mortgage rate?',
          options: [
            {
              id: 'one-lender',
              label: 'Use your existing bank',
              description: 'Relationship discount',
              meterChanges: { hourlyValue: -10, income: -10 },
              storyResponse: 'Your bank gave you an average rate. Other lenders were offering 0.375% less. $22,000 difference over 30 years.',
            },
            {
              id: 'multiple-lenders',
              label: 'Get quotes from 5 lenders in 2 weeks',
              description: 'All inquiries count as one',
              meterChanges: { hourlyValue: 20, income: 20, energy: -10 },
              storyResponse: 'Lenders competed for your business. You got the best rate available. Saved $28,000 over the loan.',
              unlocks: ['mortgage-shopper'],
            },
            {
              id: 'broker',
              label: 'Use a mortgage broker',
              description: 'They shop for you',
              meterChanges: { hourlyValue: 15, income: 15, energy: 10 },
              storyResponse: 'The broker found rates you could not access directly. Good result with less effort.',
              unlocks: ['broker-user'],
            },
          ],
        },
        {
          id: 'y5-credit-future',
          category: 'negotiation',
          title: 'Long-Term Credit Philosophy',
          description: 'You have mastered credit. What is your philosophy going forward?',
          options: [
            {
              id: 'minimize-credit',
              label: 'Use credit minimally',
              description: 'Avoid debt when possible',
              meterChanges: { energy: 20, income: 5, optionality: 5 },
              storyResponse: 'Conservative approach. Less optimization, more peace of mind. Score may drift lower over time.',
              unlocks: ['credit-minimalist'],
            },
            {
              id: 'strategic-leverage',
              label: 'Use credit strategically for opportunities',
              description: 'Productive debt when ROI is clear',
              meterChanges: { income: 20, hourlyValue: 20, optionality: 15 },
              storyResponse: 'Credit as a tool, not a burden. Investment properties, business opportunities, education. Wealth acceleration.',
              unlocks: ['strategic-leverager'],
            },
            {
              id: 'points-optimizer',
              label: 'Optimize for rewards and benefits',
              description: 'Travel free, cash back on everything',
              meterChanges: { income: 15, hourlyValue: 10, energy: -5, optionality: 10 },
              storyResponse: 'You earn $3,000/year in travel and cash back. Credit works for you now.',
              unlocks: ['rewards-master'],
            },
          ],
        },
      ],
      closingNarration: 'Year 5 ends. You built credit from zero to 780+. Major purchases are possible. Financial access is open. You understand the credit game.',
      specialEvents: [
        {
          condition: (meters: GameMeters) => meters.income >= 80,
          event: 'Your credit score is exceptional. You qualify for the best rates on any type of borrowing.',
        },
        {
          condition: (meters: GameMeters, unlocks: string[]) => unlocks.includes('mortgage-shopper') && unlocks.includes('strategic-leverager'),
          event: 'You are using credit like the wealthy do. Not avoiding debt, but using it strategically to build more wealth.',
        },
      ],
    },
  ],
  endings: [
    {
      id: 'credit-master',
      title: 'Credit Master',
      description: 'You built perfect credit and use it as a wealth-building tool.',
      trajectory: 'momentum',
      futureSnapshot: 'In 5 years, your 800+ score opens every door. You have a home at an excellent rate, strategic investments using leverage, and rewards covering your travel. Credit is your ally.',
      conditions: (meters: GameMeters, unlocks: string[]) => 
        meters.income >= 75 && meters.hourlyValue >= 70 && meters.replaceability <= 40,
    },
    {
      id: 'solid-foundation',
      title: 'Solid Foundation',
      description: 'You built good credit habits that will serve you well.',
      trajectory: 'growing',
      futureSnapshot: 'In 5 years, your 720+ score handles most needs. You avoided debt traps and built slowly. Conservative but effective.',
      conditions: (meters: GameMeters) => 
        meters.income >= 55 && meters.energy >= 60,
    },
    {
      id: 'debt-burdened',
      title: 'Debt Burdened',
      description: 'Credit became a burden rather than a tool.',
      trajectory: 'stuck',
      futureSnapshot: 'In 5 years, monthly payments consume your income. Score is decent but debt load is heavy. Every financial decision feels constrained.',
      conditions: (meters: GameMeters) => 
        meters.replaceability >= 70 || meters.energy < 40,
    },
    {
      id: 'credit-damaged',
      title: 'Credit Damaged',
      description: 'Mistakes created lasting credit problems.',
      trajectory: 'burnout',
      futureSnapshot: 'In 5 years, past mistakes still haunt your credit report. Late payments and collections make major purchases difficult or expensive.',
      conditions: (meters: GameMeters) => 
        meters.income < 40 && meters.hourlyValue < 40,
    },
    {
      id: 'default-path',
      title: 'The Average Path',
      description: 'You have functional credit without mastery.',
      trajectory: 'balanced',
      futureSnapshot: 'In 5 years, your credit works. Score around 680. You qualify for most things but not at the best rates. Average outcome.',
      conditions: () => true,
    },
  ],
};
