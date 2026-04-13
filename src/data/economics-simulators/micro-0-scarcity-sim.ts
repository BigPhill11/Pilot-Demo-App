/**
 * Scarcity & Opportunity Cost: Life Budget Simulator
 * 
 * Unit 0 Microeconomics - Students receive a monthly income and must
 * allocate it across needs, wants, savings, and investing. Every choice
 * reveals opportunity costs.
 */

import { SimulatorConfig } from '@/types/economics-sim';

export const micro0ScarcitySim: SimulatorConfig = {
  id: 'micro-0-scarcity-sim',
  unitId: 'micro-0-scarcity',
  title: 'Life Budget Simulator',
  subtitle: 'Every Dollar Has a Cost',
  description: 'You just landed your first real job! With $2,500/month after taxes, you\'ll learn that every spending choice has an opportunity cost. Can you balance needs, wants, and your future?',
  icon: '💰',
  theme: {
    primary: 'emerald',
    secondary: 'green',
    accent: 'teal',
  },
  
  introNarrative: "Congratulations! You've just started your first job earning $2,500 per month after taxes. You're excited, but reality hits fast: rent is due, you need to eat, your car needs gas, and your friends want to go out. Oh, and everyone says you should save for the future. Welcome to the real world of scarcity and trade-offs!",
  philIntro: "Hey there, new adult! I'm Phil, and I remember when I got my first bamboo allowance - so many choices! The key lesson today: every dollar you spend is a dollar you CAN'T spend on something else. That's opportunity cost, and it's about to become very real. Let's make some tough choices together!",
  
  initialMeters: [
    { id: 'savings', label: 'Savings', value: 0, min: 0, max: 1000, unit: '$', color: 'green', icon: '🏦' },
    { id: 'happiness', label: 'Life Satisfaction', value: 50, min: 0, max: 100, unit: '%', color: 'amber', icon: '😊' },
    { id: 'security', label: 'Financial Security', value: 30, min: 0, max: 100, unit: '%', color: 'blue', icon: '🛡️' },
    { id: 'stress', label: 'Money Stress', value: 50, min: 0, max: 100, unit: '%', color: 'red', icon: '😰' },
  ],
  
  rounds: [
    {
      roundNumber: 1,
      title: 'The Housing Decision',
      narrative: "First things first: you need a place to live. Housing is typically the biggest expense, and this choice will affect everything else. Remember, whatever you spend on rent is money you CAN'T spend elsewhere.",
      decisions: [
        {
          id: 'r1-d1',
          title: 'Choose Your Housing',
          scenario: "You've found three options: a nice apartment alone ($1,200/month), a decent place with a roommate ($700/month), or a small room in a shared house ($450/month). Your total monthly income is $2,500.",
          context: 'Housing experts recommend spending no more than 30% of income on housing ($750 for you).',
          options: [
            {
              id: 'solo-apt',
              label: 'Live Alone ($1,200/month)',
              description: 'Privacy and freedom, but 48% of your income goes to rent.',
              meterChanges: { happiness: 15, security: -20, stress: 20 },
              feedback: 'You love having your own space! But with only $1,300 left for everything else, you\'re feeling the squeeze.',
              philInsight: 'The opportunity cost of that privacy is HUGE - $500/month that could go to savings, fun, or emergencies. That\'s $6,000/year!',
            },
            {
              id: 'roommate',
              label: 'Get a Roommate ($700/month)',
              description: 'Less privacy, but 28% of income - right at the recommended level.',
              meterChanges: { happiness: 5, security: 10, stress: -10 },
              feedback: 'Your roommate is pretty cool, and you have $1,800 left for other things. Balanced choice!',
              philInsight: 'Smart trade-off! You gave up some privacy but gained $500/month in flexibility. That\'s the power of understanding opportunity cost.',
            },
            {
              id: 'shared-house',
              label: 'Shared House ($450/month)',
              description: 'Least privacy, but only 18% of income. Maximum flexibility.',
              meterChanges: { happiness: -5, security: 25, stress: -20 },
              feedback: 'It\'s crowded and noisy, but you have $2,050 left! Your financial options are wide open.',
              philInsight: 'Maximum financial flexibility at the cost of comfort. You can save aggressively or handle any emergency. Trade-offs!',
            },
          ],
          conceptConnection: 'This demonstrates scarcity and trade-offs: you can\'t have maximum comfort AND maximum savings. Every housing dollar has an opportunity cost.',
        },
        {
          id: 'r1-d2',
          title: 'The Transportation Trade-off',
          scenario: "You need to get to work. Options: keep your car ($400/month for payment, insurance, gas), sell the car and use public transit ($100/month), or bike/walk (free but limits where you can go).",
          options: [
            {
              id: 'keep-car',
              label: 'Keep the Car ($400/month)',
              description: 'Freedom and convenience, but a big chunk of your budget.',
              meterChanges: { happiness: 10, security: -10, stress: 10 },
              feedback: 'You love the freedom of driving anywhere, anytime. But that\'s $4,800/year that could be invested!',
              philInsight: 'The opportunity cost of car ownership is massive. $400/month invested for 30 years at 7% = over $450,000! Is the convenience worth half a million dollars?',
            },
            {
              id: 'public-transit',
              label: 'Public Transit ($100/month)',
              description: 'Less convenient, but saves $300/month compared to a car.',
              meterChanges: { happiness: -5, security: 15, stress: -5 },
              feedback: 'The commute is longer, but you can read or relax. And that extra $300/month adds up fast!',
              philInsight: 'You traded convenience for $3,600/year in savings. That\'s a vacation, an emergency fund, or serious investment money!',
            },
            {
              id: 'bike-walk',
              label: 'Bike/Walk (Free)',
              description: 'Zero transportation cost, but limited range and weather-dependent.',
              meterChanges: { happiness: -10, security: 25, stress: 5 },
              feedback: 'Rain days are rough, and you can\'t easily visit friends across town. But your savings potential is maximized!',
              philInsight: 'The ultimate trade-off: maximum financial benefit, minimum convenience. You\'re saving $400/month but paying in time and comfort.',
            },
          ],
          conceptConnection: 'Transportation shows how opportunity cost isn\'t just about money - it\'s also about time, convenience, and lifestyle.',
        },
      ],
      roundSummary: 'You\'ve made your first major trade-offs! Housing and transportation alone can consume 30-60% of your income. The choices you made here ripple through everything else.',
    },
    {
      roundNumber: 2,
      title: 'Needs vs. Wants',
      narrative: "With housing and transportation handled, you have money left for everything else. But here's where it gets tricky: distinguishing between what you NEED and what you WANT.",
      decisions: [
        {
          id: 'r2-d1',
          title: 'The Food Budget',
          scenario: "You need to eat! Options: cook all meals at home ($250/month), mix of cooking and occasional dining out ($400/month), or eat out frequently ($600/month). Which reflects your priorities?",
          context: 'The average American spends about $400/month on food. Cooking at home is cheapest but takes time.',
          options: [
            {
              id: 'cook-home',
              label: 'Cook Everything ($250/month)',
              description: 'Cheapest option, but requires time and meal planning.',
              meterChanges: { happiness: -5, security: 15, stress: 5 },
              feedback: 'Your wallet thanks you, but cooking every meal gets tiring. You\'re saving $150-350/month compared to alternatives.',
              philInsight: 'The opportunity cost of cooking is TIME, not just money. But the money saved could be $4,200/year for investing or emergencies!',
            },
            {
              id: 'mixed',
              label: 'Mix It Up ($400/month)',
              description: 'Balance of home cooking and social dining out.',
              meterChanges: { happiness: 10, security: 5, stress: -5 },
              feedback: 'You enjoy cooking most meals but treat yourself to restaurants with friends. Sustainable and social!',
              philInsight: 'This balanced approach recognizes that food isn\'t just fuel - it\'s also social connection. The opportunity cost of NEVER eating out is missing experiences.',
            },
            {
              id: 'eat-out',
              label: 'Dine Out Often ($600/month)',
              description: 'Convenient and social, but expensive.',
              meterChanges: { happiness: 15, security: -15, stress: -10 },
              feedback: 'Life is delicious! But you\'re spending $350/month more than the balanced option. That\'s $4,200/year.',
              philInsight: 'The opportunity cost is stark: $350/month = a nice vacation, 3 months of emergency fund, or significant investments. Is the convenience worth it?',
            },
          ],
          conceptConnection: 'Food shows the wants vs. needs distinction clearly: you NEED to eat, but you WANT restaurant meals. The gap between need and want is opportunity cost.',
        },
        {
          id: 'r2-d2',
          title: 'Entertainment & Social Life',
          scenario: "Your friends want to hang out! Options: free activities (parks, game nights, potlucks), moderate spending ($150/month on streaming, occasional events), or full social life ($350/month on concerts, bars, activities).",
          options: [
            {
              id: 'free-fun',
              label: 'Free Activities Only ($0/month)',
              description: 'Parks, home hangouts, free events. Zero cost but limited options.',
              meterChanges: { happiness: -10, security: 20, stress: 10 },
              feedback: 'Your bank account is happy, but you\'re missing out on some experiences. Friends understand... mostly.',
              philInsight: 'The opportunity cost of spending $0 on fun is potential loneliness and burnout. Mental health matters! But you\'re saving $150-350/month.',
            },
            {
              id: 'moderate',
              label: 'Moderate Fun ($150/month)',
              description: 'Streaming services, occasional dinners out, some events.',
              meterChanges: { happiness: 10, security: 5, stress: -10 },
              feedback: 'You can say yes to most invitations without breaking the bank. Good balance!',
              philInsight: 'Spending some money on happiness is rational! The opportunity cost of being miserable is lower productivity and health. Balance is key.',
            },
            {
              id: 'full-social',
              label: 'Full Social Life ($350/month)',
              description: 'Concerts, bars, activities, trips with friends. Living it up!',
              meterChanges: { happiness: 20, security: -15, stress: -15 },
              feedback: 'You\'re having an amazing time! But that\'s $4,200/year that could be building your future.',
              philInsight: 'The opportunity cost of $350/month in fun is serious: that\'s $50,000+ over 10 years if invested! But memories have value too. What\'s YOUR priority?',
            },
          ],
          conceptConnection: 'Entertainment is a "want" but mental health is a "need." This shows that the wants/needs line isn\'t always clear - context matters.',
        },
      ],
      roundSummary: 'You\'ve navigated the tricky territory between needs and wants. Every dollar spent on "wants" is a dollar not saved or invested. But never spending on wants isn\'t sustainable either!',
    },
    {
      roundNumber: 3,
      title: 'Building Your Future',
      narrative: "Now for the most important trade-off: present you vs. future you. Money saved and invested today grows over time. But saving means giving up things NOW. How do you balance today's happiness with tomorrow's security?",
      decisions: [
        {
          id: 'r3-d1',
          title: 'The Savings Decision',
          scenario: "Financial experts recommend saving 20% of income ($500/month for you). But that's money you can't spend now. How much will you save?",
          context: 'Compound interest is powerful: $300/month invested at 7% for 30 years = ~$340,000. $500/month = ~$567,000.',
          options: [
            {
              id: 'no-save',
              label: 'Save Nothing ($0/month)',
              description: 'Live for today! You\'ll figure out the future later.',
              meterChanges: { savings: 0, happiness: 10, security: -30, stress: 20 },
              feedback: 'You\'re having fun now, but one unexpected expense could devastate you. No safety net is terrifying.',
              philInsight: 'The opportunity cost of not saving is FUTURE SECURITY. One car repair, one medical bill, one job loss - and you\'re in crisis. Present you is stealing from future you!',
            },
            {
              id: 'some-save',
              label: 'Save 10% ($250/month)',
              description: 'A reasonable start. Building a cushion while still enjoying life.',
              meterChanges: { savings: 250, happiness: 0, security: 15, stress: -10 },
              feedback: 'You\'re building an emergency fund and starting to invest. It\'s not aggressive, but it\'s progress!',
              philInsight: 'The opportunity cost of $250/month is real - that\'s experiences you\'re not having NOW. But you\'re buying peace of mind and future wealth. Fair trade-off!',
            },
            {
              id: 'aggressive-save',
              label: 'Save 20% ($500/month)',
              description: 'Following expert advice. Tight budget now, wealthy later.',
              meterChanges: { savings: 500, happiness: -10, security: 30, stress: -5 },
              feedback: 'Your budget is tight, but your future self will thank you. $500/month at 7% for 30 years = $567,000!',
              philInsight: 'The opportunity cost is significant: $500/month of experiences, conveniences, and fun. But you\'re trading temporary pleasure for permanent security. That\'s rational thinking!',
            },
          ],
          conceptConnection: 'Saving demonstrates intertemporal trade-offs: present consumption vs. future consumption. Every dollar saved is a dollar not spent today.',
        },
        {
          id: 'r3-d2',
          title: 'The Unexpected Expense',
          scenario: "Life happens! Your car breaks down (or you get sick, or your laptop dies). The repair costs $800. How do you handle it?",
          options: [
            {
              id: 'emergency-fund',
              label: 'Use Emergency Savings',
              description: 'This is exactly what savings are for. Pay and rebuild.',
              meterChanges: { savings: -400, happiness: 0, security: 5, stress: -15 },
              feedback: 'Crisis handled smoothly! This is why emergency funds exist. You\'ll rebuild the savings over time.',
              philInsight: 'This is the BENEFIT of saving - when emergencies hit, you\'re prepared. The opportunity cost of past savings just paid off in peace of mind!',
            },
            {
              id: 'credit-card',
              label: 'Put It on Credit Card',
              description: 'No savings? Credit is the backup. But interest adds up.',
              meterChanges: { savings: 0, happiness: -5, security: -20, stress: 25 },
              feedback: 'Problem solved for now, but at 20% interest, that $800 could become $1,000+ if not paid quickly.',
              philInsight: 'The opportunity cost of NOT having savings is now clear: you\'re paying interest, which means future dollars going to the bank instead of to you!',
            },
            {
              id: 'sacrifice',
              label: 'Cut Everything to Pay Cash',
              description: 'No savings, no credit. Extreme sacrifice this month.',
              meterChanges: { savings: 0, happiness: -20, security: -10, stress: 30 },
              feedback: 'You made it work, but this month was miserable. Ramen for every meal, no social life, constant stress.',
              philInsight: 'This is the true opportunity cost of not saving: when emergencies hit, you sacrifice EVERYTHING else. Past decisions have present consequences.',
            },
          ],
          conceptConnection: 'Emergencies reveal the true value of savings. The opportunity cost of spending instead of saving becomes painfully clear when life happens.',
        },
      ],
      roundSummary: 'You\'ve experienced the ultimate trade-off: present vs. future. Every financial choice you make is a vote for who you want to be - the person enjoying today or the person building tomorrow.',
    },
  ],
  
  completionThresholds: {
    excellent: { savings: { min: 400 }, security: { min: 50 }, happiness: { min: 40 } },
    good: { savings: { min: 200 }, security: { min: 35 }, happiness: { min: 30 } },
    passing: { security: { min: 20 }, happiness: { min: 20 } },
  },
  
  endings: {
    excellent: {
      title: 'Master of Trade-offs!',
      description: 'You\'ve balanced present happiness with future security brilliantly. You understand that every dollar has an opportunity cost, and you\'ve made intentional choices that align with your values.',
      philMessage: 'Incredible! You\'ve internalized the most important lesson in economics: scarcity forces choices, and choices have costs. You didn\'t try to have everything - you chose what matters most. That\'s wisdom that will serve you for life!',
    },
    good: {
      title: 'Balanced Budget Builder',
      description: 'You\'ve made solid trade-offs and built a sustainable financial life. You understand opportunity cost and make mostly intentional choices.',
      philMessage: 'Great job! You\'ve learned that you can\'t have it all, but you CAN have what matters most. Your understanding of trade-offs will help you make better decisions throughout life. Keep thinking about opportunity costs!',
    },
    passing: {
      title: 'Learning the Ropes',
      description: 'You\'ve experienced the reality of scarcity and trade-offs. Some choices were tough, but you\'re learning that every decision has a cost.',
      philMessage: 'You\'re on your way! The key insight is that every "yes" is a "no" to something else. Keep practicing thinking about opportunity costs, and your decision-making will improve!',
    },
    needsWork: {
      title: 'Opportunity Cost Awakening',
      description: 'You\'ve felt the pain of not considering opportunity costs. But that\'s how we learn! Now you understand why every choice matters.',
      philMessage: 'Don\'t worry - everyone struggles with trade-offs at first! The important thing is you now FEEL what opportunity cost means. Use this experience to make more intentional choices. Try again with your new wisdom!',
    },
  },
  
  rewards: {
    bamboo: 50,
    xp: 200,
  },
};
