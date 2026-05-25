/**
 * Ownership — full MI lesson payloads for Market Intelligence.
 */

import type { MILesson } from '@/types/mi-lesson';

const BASE = '/market-intelligence/ownership';

function img(
  lessonId: string,
  name: string,
  alt: string,
  caption?: string
) {
  return {
    src: `${BASE}/${lessonId}/${name}.png`,
    alt,
    caption,
  };
}

export const ownAPieceLesson: MILesson = {
  id: 'own-own-a-piece',
  moduleId: 'own-a-piece',
  section: 'ownership',
  title: 'Own a Piece',
  estimatedMinutes: 10,
  intro: {
    hook:
      'You grab coffee from the same chain every week. If you own one share of that company, you are not just a customer — you legally own a tiny slice of the business.',
    philMessage:
      'Stock is not a lottery ticket. It is partial ownership. One share means you have a fractional claim on the company\'s assets and future earnings. That mindset changes how you read every headline.',
    heroImage: img(
      'own-a-piece',
      'hero',
      'Illustration of a shareholder owning a slice of a bamboo-themed storefront',
      'Every share is a piece of a real business'
    ),
  },
  coreConcepts: [
    {
      title: 'What a Share Actually Is',
      explanation:
        'A share of stock is a fractional ownership stake in a corporation. If a company has 1 billion shares outstanding and you own 1 share, you own one-billionth of that business — its stores, brands, and future profits.',
      example:
        'A streaming service with 200 million subscribers might have 500 million shares. Your single share is small, but it is real legal ownership — the same type institutions and founders hold, just smaller.',
      keyTerms: ['Share'],
      visual: img(
        'own-a-piece',
        'concept-share',
        'Diagram showing one share as a slice of a company pie',
        'One share = fractional ownership'
      ),
    },
    {
      title: 'Your Rights as a Shareholder',
      explanation:
        'Owners typically get voting rights on major decisions (like electing the board), may receive dividends when the company pays profits to shareholders, and have a claim on assets if the company is liquidated — though bondholders and creditors come first.',
      example:
        'If a profitable tech company declares a $1 dividend per share and you own 10 shares, you receive $10. You might also vote on whether to approve a merger — your voice is proportional to shares owned.',
      keyTerms: ['Dividend', 'Shareholder'],
      visual: img(
        'own-a-piece',
        'concept-rights',
        'Diagram of shareholder voting and dividend rights',
        'Ownership comes with rights — and risks'
      ),
    },
    {
      title: 'Ownership vs. Renting',
      explanation:
        'Cash in a savings account and most bonds mean you are lending or renting purchasing power — you earn interest but do not participate in business growth. Stocks and index funds mean you own productive businesses that can grow earnings over decades.',
      example:
        'A bond pays you back with interest like rent on your money. A stock in a growing company can rise as the business expands — you participate as an owner, not just a lender.',
      keyTerms: ['Index fund'],
      visual: img(
        'own-a-piece',
        'concept-owner-vs-renter',
        'Comparison of owning businesses versus lending money',
        'Owners participate in growth; lenders collect fixed payments'
      ),
    },
  ],
  tryActivity: {
    type: 'term-classify',
    title: 'Owner or Not?',
    description:
      'Tap a statement, then pick the category. Sort all eight to see what ownership really includes.',
    categories: [
      { id: 'owner', label: 'Owner perk' },
      { id: 'not-owner', label: 'Not an owner perk' },
    ],
    terms: [
      { id: '1', label: 'Vote on board elections', correctCategory: 'owner' },
      { id: '2', label: 'Receive dividends when paid', correctCategory: 'owner' },
      { id: '3', label: 'Guaranteed fixed return every year', correctCategory: 'not-owner' },
      { id: '4', label: 'Claim on company assets in bankruptcy', correctCategory: 'owner' },
      { id: '5', label: 'Price moves with business performance', correctCategory: 'owner' },
      { id: '6', label: 'FDIC insurance on your stake', correctCategory: 'not-owner' },
      { id: '7', label: 'Participate in long-term earnings growth', correctCategory: 'owner' },
      { id: '8', label: 'Interest payment like a loan', correctCategory: 'not-owner' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'In Bamboo Empire, your Bank building earns compound interest on savings. Owning stock is the next level — you own slices of real companies that grow while you sleep, like planting seeds across Bamboo City instead of keeping bamboo in one jar.',
      scenario:
        'Your first $50 in a broad index fund is not gambling. It is buying tiny ownership stakes in hundreds of businesses — the same principle as building an empire one plot at a time.',
      visual: img(
        'own-a-piece',
        'connect-pf',
        'Bamboo Empire bank building connected to stock ownership metaphor',
        'Savings grow in the Bank; ownership grows in the market'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Wealth management associates explain ownership to everyday investors — what a share means, how dividends work, and why diversification matters. They translate Wall Street language into decisions clients can stick with.',
      role: 'Wealth Management Associate',
      skills: ['Client communication', 'Portfolio basics', 'Risk explanation'],
      visual: img(
        'own-a-piece',
        'connect-career',
        'Wealth advisor explaining stock ownership to a client',
        'Advisors help clients think like owners'
      ),
    },
  },
  flashcards: [
    {
      term: 'Share',
      definition: 'A unit of ownership in a corporation.',
      philsAnalogy: 'One bamboo stalk in a grove that spans the whole city — tiny, but real.',
    },
    {
      term: 'Dividend',
      definition: 'A payment some companies make to shareholders from profits.',
      philsAnalogy: 'The grove shares extra bamboo with owners when the harvest is strong.',
    },
    {
      term: 'Shareholder',
      definition: 'A person or institution that owns stock in a company.',
      philsAnalogy: 'You are not just a customer — you are on the ownership roster.',
    },
    {
      term: 'Index fund',
      definition: 'A fund that holds many stocks to match a market index, offering broad ownership in one purchase.',
      philsAnalogy: 'Buying a basket of bamboo plots across Bamboo City instead of betting on one field.',
    },
  ],
  quiz: [
    {
      question: 'What does owning one share of a company mean?',
      options: [
        'You lent money and get fixed interest',
        'You own a fractional stake in that business',
        'You are guaranteed a profit',
        'You can run the company day to day',
      ],
      correctIndex: 1,
      explanation: 'A share is partial ownership — a claim on assets and future earnings.',
    },
    {
      question: 'Which is typically an owner benefit, not a lender benefit?',
      options: [
        'Fixed interest payment',
        'FDIC insurance',
        'Voting on major corporate decisions',
        'Guaranteed principal return',
      ],
      correctIndex: 2,
      explanation: 'Shareholders often vote on big decisions; bondholders and savers generally do not.',
    },
    {
      question: 'How is an index fund different from keeping cash in savings?',
      options: [
        'Index funds own pieces of many businesses; cash does not participate in business growth',
        'Cash always grows faster than stocks',
        'Index funds are the same as a savings account',
        'Savings accounts give you voting rights',
      ],
      correctIndex: 0,
      explanation: 'Index funds spread ownership across companies; cash earns interest but not business upside.',
    },
    {
      question: 'Why might a shareholder receive a dividend?',
      options: [
        'The government requires it on all stocks',
        'The company chooses to pay part of profits to owners',
        'Dividends are automatic every month',
        'Only bondholders get dividends',
      ],
      correctIndex: 1,
      explanation: 'Profitable companies may return cash to shareholders — but many growth companies pay none.',
    },
  ],
  rewards: { bamboo: 15, xp: 3 },
};

export const timeIsYourAllyLesson: MILesson = {
  id: 'own-time-is-your-ally',
  moduleId: 'time-is-your-ally',
  section: 'ownership',
  title: 'Time is Your Ally',
  estimatedMinutes: 12,
  intro: {
    hook:
      'Alex in Bamboo City starts investing $100 a month at 18. Jordan waits until 28. Same amount, same discipline — but at 65, Alex\'s portfolio is nearly double Jordan\'s. Time did the heavy lifting.',
    philMessage:
      'Compound growth means your earnings start earning too — like a bamboo grove that plants its own seeds. The ingredient you cannot buy back is time. Start early, stay consistent, and let the math work.',
    heroImage: img(
      'time-is-your-ally',
      'hero',
      'Split timeline showing early investor vs late investor at retirement',
      'Ten extra years can matter more than doubling contributions'
    ),
  },
  coreConcepts: [
    {
      title: 'The Math of Compound Growth',
      explanation:
        'Compound growth means you earn returns not just on your original money, but on prior gains too. Each year builds on the last — a snowball rolling downhill, or a bamboo grove expanding season after season.',
      example:
        '$100/month at 7% average return for 40 years grows to roughly $260,000 — and more than half of that is growth on growth, not just your deposits.',
      keyTerms: ['Compound growth'],
      visual: img(
        'time-is-your-ally',
        'concept-compound',
        'Curved compound growth chart with bamboo snowball metaphor',
        'Earnings on earnings — that is the magic'
      ),
    },
    {
      title: 'Why Starting Early Matters',
      explanation:
        'Extra years of compounding often beat larger contributions started later. Missing the first decade can cost more than doubling your monthly investment in your 30s.',
      example:
        'Investing $100/month from 18–65 at 7% beats investing $200/month from 28–65 at the same rate. Alex\'s extra ten years outweigh Jordan\'s doubled contribution.',
      keyTerms: ['Time horizon'],
      visual: img(
        'time-is-your-ally',
        'concept-early-start',
        'Side-by-side bars comparing early vs late start outcomes',
        'Start early — even small amounts count'
      ),
    },
    {
      title: 'Realistic Long-Term Returns',
      explanation:
        'Historically, diversified stock investments have averaged roughly 7–10% per year before inflation over long periods — but with big swings year to year. Cash and savings often earn less. Patience matters because short-term volatility is normal.',
      example:
        'Some years the market drops 20%; other years it gains 30%. Over 30+ years, business growth has tended to reward patient owners — but nothing is guaranteed.',
      keyTerms: ['Volatility'],
      visual: img(
        'time-is-your-ally',
        'concept-returns',
        'Long-term growth band with short-term volatility wiggles',
        'Long horizons smooth out the bumps'
      ),
    },
  ],
  tryActivity: {
    type: 'compound-compare',
    title: 'Time Machine Calculator',
    description:
      'Adjust start age and monthly amount. Compare two investors side by side at retirement. Try at least two combinations to continue.',
    defaultStartAge: 22,
    defaultMonthly: 100,
    annualReturnRate: 0.07,
    retirementAge: 65,
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'Automating $25/month from a part-time job beats waiting for the "perfect" lump sum. In Bamboo Empire terms, steady bamboo planting every season beats one frantic planting spree in year ten.',
      scenario:
        'Set up auto-transfer on payday — even $20. Time starts working the day your first deposit hits, not the day you feel "ready."',
      visual: img(
        'time-is-your-ally',
        'connect-pf',
        'Automated monthly investing illustrated with bamboo planting calendar',
        'Consistency + time beats perfect timing'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Financial planners model compound scenarios for clients — retirement at 62 vs 67, college savings starting at birth vs age 10. Their charts turn "I\'ll start later" into visible dollar costs.',
      role: 'Financial Planner',
      skills: ['Projection modeling', 'Goal planning', 'Behavior coaching'],
      visual: img(
        'time-is-your-ally',
        'connect-career',
        'Financial planner showing compound growth projections to a family',
        'Planners make time visible in dollars'
      ),
    },
  },
  flashcards: [
    {
      term: 'Compound growth',
      definition: 'Earning returns on both principal and accumulated gains over time.',
      philsAnalogy: 'A bamboo grove where last season\'s growth becomes seed for this season.',
    },
    {
      term: 'Time horizon',
      definition: 'How long money stays invested before you need it.',
      philsAnalogy: 'Money for next month\'s rent stays safe; money for age 65 can ride out storms.',
    },
    {
      term: 'Volatility',
      definition: 'Short-term ups and downs in investment value.',
      philsAnalogy: 'Wind bending bamboo stalks — scary up close, normal over many seasons.',
    },
    {
      term: 'Dollar-cost averaging',
      definition: 'Investing a fixed amount regularly regardless of market conditions.',
      philsAnalogy: 'Planting the same number of seeds every month — rain or shine.',
    },
  ],
  quiz: [
    {
      question: 'What is compound growth?',
      options: [
        'Earning interest only on your original deposit',
        'Earning returns on prior gains as well as principal',
        'Guaranteed 10% every year',
        'Only available to professional investors',
      ],
      correctIndex: 1,
      explanation: 'Compounding means your gains generate their own gains over time.',
    },
    {
      question: 'Why can starting at 18 beat starting at 28 with double the monthly amount?',
      options: [
        'Younger investors always pick better stocks',
        'Extra years of compounding add more than later catch-up',
        'Taxes disappear before age 30',
        'The market only goes up in your 20s',
      ],
      correctIndex: 1,
      explanation: 'Time in the market often matters more than timing the market.',
    },
    {
      question: 'Historically, long-term stock returns have averaged roughly…',
      options: ['0–1% per year', '7–10% per year (with volatility)', '50% per year guaranteed', 'Exactly 5% every year'],
      correctIndex: 1,
      explanation: 'Long horizons show positive average returns, but any single year can vary wildly.',
    },
    {
      question: 'What is dollar-cost averaging?',
      options: [
        'Trying to buy at the lowest price each month',
        'Investing a fixed amount on a regular schedule',
        'Selling everything when the market drops',
        'Only investing when headlines are positive',
      ],
      correctIndex: 1,
      explanation: 'Regular investing removes the pressure to predict the perfect moment.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

export const thePatienceGameLesson: MILesson = {
  id: 'own-the-patience-game',
  moduleId: 'the-patience-game',
  section: 'ownership',
  title: 'The Patience Game',
  estimatedMinutes: 10,
  intro: {
    hook:
      'BREAKING: "MARKET CRASHES 20%!" Your portfolio statement drops on paper. Phil\'s take: you only lose if you sell the deed to your bamboo grove at the worst possible moment.',
    philMessage:
      'Short-term drops feel brutal, but patient owners have historically been rewarded over decades. The game is not predicting headlines — it is not abandoning ownership when fear is loudest.',
    heroImage: img(
      'the-patience-game',
      'hero',
      'Calm panda investor beside panicked headline about market crash',
      'Paper losses are not real losses until you sell'
    ),
  },
  coreConcepts: [
    {
      title: 'Paper Loss vs. Real Loss',
      explanation:
        'When your portfolio value drops, you have an unrealized or "paper" loss — it only becomes real if you sell. Businesses often recover over years; panic sellers lock in losses permanently.',
      example:
        'If your $10,000 investment shows $8,000 after a crash but you hold for five years while businesses recover, you may never actually realize that $2,000 loss.',
      keyTerms: ['Unrealized loss'],
      visual: img(
        'the-patience-game',
        'concept-paper-loss',
        'Diagram showing paper loss vs realized loss when selling',
        'On paper is not the same as in your pocket'
      ),
    },
    {
      title: 'Missing the Best Days',
      explanation:
        'A meaningful share of long-term market gains have clustered in a small number of strong days — often right after scary drops. Investors who panic-sell frequently miss the rebound that follows.',
      example:
        'Research on the S&P 500 suggests missing just the ten best days in a 20-year period can cut total returns dramatically. Those days are hard to predict and often arrive when news feels worst.',
      keyTerms: ['Market timing'],
      visual: img(
        'the-patience-game',
        'concept-best-days',
        'Chart highlighting few best days driving long-term returns',
        'The best days often follow the scariest headlines'
      ),
    },
    {
      title: 'Emotional Discipline Tools',
      explanation:
        'Auto-investing, ignoring daily price checks, and writing an "if/then" plan before fear hits all reduce panic decisions. Discipline is a skill — not a personality trait.',
      example:
        'Before a crash, write: "If the market drops 20%, I will keep investing $50/month and not check daily." Having the plan pre-written beats deciding in panic mode.',
      keyTerms: ['Auto-invest'],
      visual: img(
        'the-patience-game',
        'concept-discipline',
        'Checklist of discipline tools for volatile markets',
        'Process beats panic every time'
      ),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Headline Pressure Test',
    description:
      'Three Bamboo City market moments. Choose Hold, Add, or Sell — see how patience usually wins over decades.',
    rounds: [
      {
        id: 'crash',
        prompt: 'Headline: "MARKET CRASHES 20% IN ONE WEEK!" Your portfolio is down on paper. What do you do?',
        options: [
          {
            id: 'hold',
            label: 'Hold — I do not need this money for 20+ years',
            feedback:
              'Historically, patient holders who stayed invested through crashes often recovered as businesses rebuilt. Paper losses are not locked in.',
          },
          {
            id: 'add',
            label: 'Add — stocks are on sale relative to last month',
            feedback:
              'Buying during fear is hard emotionally, but adding when prices drop can boost long-term returns — if you have cash you will not need soon.',
          },
          {
            id: 'sell',
            label: 'Sell everything — cut my losses now',
            feedback:
              'Selling turns a paper loss into a real one. Many rebounds happen quickly after crashes — panic sellers often miss them.',
          },
        ],
      },
      {
        id: 'rally',
        prompt: 'Headline: "MARKET SOARS — BEST YEAR IN DECADE!" Everyone is talking about getting rich quick. You feel FOMO.',
        options: [
          {
            id: 'hold',
            label: 'Hold my plan — no sudden moves',
            feedback:
              'Sticking to your plan avoids buying hype at peaks. Consistency beats chasing whatever just went up.',
          },
          {
            id: 'add',
            label: 'Double down with money I might need next year',
            feedback:
              'Investing money you need soon raises stress and bad decisions. Keep short-term cash separate from long-term ownership.',
          },
          {
            id: 'sell',
            label: 'Sell to "lock in gains" and wait for a dip',
            feedback:
              'Trying to time the next dip often means sitting in cash while the market keeps rising. Missing days hurts long-term returns.',
          },
        ],
      },
      {
        id: 'flat',
        prompt: 'Headline: "BORING YEAR — MARKET GOES NOWHERE." Friends say investing is pointless. You feel impatient.',
        options: [
          {
            id: 'hold',
            label: 'Keep auto-investing — boring years are normal',
            feedback:
              'Flat years happen. Owners who stay consistent buy through dull periods and are positioned when growth returns.',
          },
          {
            id: 'add',
            label: 'Stay the course with my regular contribution',
            feedback:
              'Perfect response. Flat markets are when discipline matters most — you accumulate ownership without the excitement.',
          },
          {
            id: 'sell',
            label: 'Move to cash — at least it feels safe',
            feedback:
              'Cash feels calm but inflation erodes purchasing power. Long-term owners accept boring stretches as part of the journey.',
          },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'Your Bamboo Empire keeps growing while you are away — offline earnings reward patience. Index fund ownership works the same way: businesses operate and compound over years whether you check daily or not.',
      scenario:
        'Set investments to auto-pilot and check quarterly, not hourly. Empire builders who micromanage every stalk often make worse decisions than those who trust the system.',
      visual: img(
        'the-patience-game',
        'connect-pf',
        'Bamboo Empire growing while player is away — patience metaphor',
        'Let ownership work while you live your life'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Portfolio managers spend more time keeping clients from panic-selling than picking hot stocks. The job is often process and psychology — helping owners stay owners through scary headlines.',
      role: 'Portfolio Manager',
      skills: ['Risk communication', 'Process discipline', 'Client coaching'],
      visual: img(
        'the-patience-game',
        'connect-career',
        'Portfolio manager calming a client during market volatility',
        'Pros protect clients from themselves'
      ),
    },
  },
  flashcards: [
    {
      term: 'Unrealized loss',
      definition: 'A drop in investment value that only becomes real if you sell.',
      philsAnalogy: 'Bamboo prices dip at market — you only lose if you sell the grove at the bottom.',
    },
    {
      term: 'Market timing',
      definition: 'Trying to predict the best moments to buy or sell.',
      philsAnalogy: 'Guessing which day will rain — you miss more sunshine than you catch.',
    },
    {
      term: 'Auto-invest',
      definition: 'Automatic regular contributions regardless of market mood.',
      philsAnalogy: 'Irrigation on a schedule — the grove gets water whether the sky looks scary or not.',
    },
    {
      term: 'Rebound',
      definition: 'Recovery in prices after a significant drop.',
      philsAnalogy: 'Bamboo bends in a storm but stands tall next season — markets often do the same.',
    },
  ],
  quiz: [
    {
      question: 'When is a portfolio loss "real"?',
      options: [
        'Whenever the statement shows red',
        'When you sell and lock in the lower price',
        'Every Monday after a bad week',
        'Never — losses are always fake',
      ],
      correctIndex: 1,
      explanation: 'Until you sell, it is a paper loss — the price might recover.',
    },
    {
      question: 'Why do panic sellers often hurt their long-term returns?',
      options: [
        'They pay too many taxes on gains',
        'They miss sharp rebound days that drive much of long-term growth',
        'Brokers charge extra fees for holding',
        'Markets only go up when you sell',
      ],
      correctIndex: 1,
      explanation: 'Best days often cluster around volatile periods — being out of the market misses them.',
    },
    {
      question: 'Which habit best supports patience?',
      options: [
        'Checking your portfolio every hour',
        'Auto-investing on a schedule and limiting daily checks',
        'Selling whenever CNBC looks worried',
        'Waiting until you feel 100% confident',
      ],
      correctIndex: 1,
      explanation: 'Automation and fewer checks reduce emotional trading.',
    },
    {
      question: 'A flat, boring market year is…',
      options: [
        'Proof investing never works',
        'A signal to move everything to cash forever',
        'Normal — consistency through dull periods matters',
        'The time to borrow money and gamble',
      ],
      correctIndex: 2,
      explanation: 'Not every year is exciting; long-term owners stay the course.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

export const mistakesThatMatterLesson: MILesson = {
  id: 'own-mistakes-that-matter',
  moduleId: 'mistakes-that-matter',
  section: 'ownership',
  title: 'Mistakes That Matter',
  estimatedMinutes: 12,
  intro: {
    hook:
      'Phil ranks investor mistakes like a coach reviewing game tape: some are fumbles you recover from; others end the season. Knowing the difference saves you years of regret.',
    philMessage:
      'Obsessing over a 0.05% fund fee while never investing at all is like polishing your cleats but skipping practice. Focus on the few decisions that actually move your lifetime outcomes.',
    heroImage: img(
      'mistakes-that-matter',
      'hero',
      'Mistake severity ladder from minor to major investor errors',
      'Some mistakes sting — others change your trajectory'
    ),
  },
  coreConcepts: [
    {
      title: 'Big Mistakes vs. Small Ones',
      explanation:
        'Small mistakes: picking an ETF with a slightly higher fee, minor timing imperfections. Big mistakes: never investing, panic selling, investing money needed next month, or betting everything on one hype stock.',
      example:
        'Paying 0.15% instead of 0.10% in fees costs dollars. Never starting for ten years costs tens of thousands in missed compounding.',
      keyTerms: ['Opportunity cost'],
      visual: img(
        'mistakes-that-matter',
        'concept-big-vs-small',
        'Scale comparing minor fee difference vs never investing',
        'Focus energy on decisions that compound'
      ),
    },
    {
      title: 'Recoverable vs. Unrecoverable',
      explanation:
        'Starting late is costly but fixable — you can increase savings and extend your timeline. Total loss from leverage, scams, or investing rent money often cannot be undone.',
      example:
        'Missing five years of investing hurts, but you can still build wealth starting today. Losing your emergency fund on a meme stock gamble may leave you in debt with no cushion.',
      keyTerms: ['Permanent loss'],
      visual: img(
        'mistakes-that-matter',
        'concept-recoverable',
        'Two paths — fixable setback vs permanent capital loss',
        'Know which mistakes you can walk back from'
      ),
    },
    {
      title: 'Common Errors to Avoid',
      explanation:
        'Timing the market, chasing meme stocks, ignoring fees and taxes, and skipping an emergency fund before aggressive investing are classic traps. Good habits — auto-invest, diversify, keep short-term cash safe — prevent most blow-ups.',
      example:
        'Investing your entire tax refund in one trending stock while carrying credit card debt at 22% interest is three mistakes stacked together.',
      keyTerms: ['Diversification'],
      visual: img(
        'mistakes-that-matter',
        'concept-common-errors',
        'Icons for timing, hype chasing, no emergency fund, concentration',
        'Most wealth is lost through behavior, not math'
      ),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Coach Phil\'s Sorting Drill',
    description:
      'Drag each item into the right bucket. Learn which choices actually matter for long-term wealth.',
    buckets: [
      { id: 'major', label: 'Major mistake' },
      { id: 'minor', label: 'Minor annoyance' },
      { id: 'good', label: 'Good habit' },
    ],
    items: [
      { id: '1', label: 'Never investing because "the market feels risky"', correctBucket: 'major' },
      { id: '2', label: 'Picking an index fund with 0.03% higher fee', correctBucket: 'minor' },
      { id: '3', label: 'Auto-investing $50 every payday', correctBucket: 'good' },
      { id: '4', label: 'Panic selling during a 25% crash', correctBucket: 'major' },
      { id: '5', label: 'Investing rent money due next month', correctBucket: 'major' },
      { id: '6', label: 'Rebalancing once a year', correctBucket: 'good' },
      { id: '7', label: 'Waiting one week to invest a bonus', correctBucket: 'minor' },
      { id: '8', label: 'Putting 100% of savings in one meme stock', correctBucket: 'major' },
      { id: '9', label: 'Building a 3-month emergency fund first', correctBucket: 'good' },
      { id: '10', label: 'Choosing between two reputable broad index funds', correctBucket: 'minor' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your money',
      description:
        'In Bamboo Empire, building an emergency fund before risky expansions is smart strategy. In real life, secure short-term cash before aggressive stock bets — same sequencing, same survival.',
      scenario:
        'Before maxing your portfolio risk, ask: "If the market dropped 30% tomorrow, could I still pay rent?" If not, fix that first.',
      visual: img(
        'mistakes-that-matter',
        'connect-pf',
        'Emergency fund building before risky empire expansion',
        'Safety first — then growth'
      ),
    },
    career: {
      title: 'On the job',
      description:
        'Compliance and client education teams help firms prevent behavioral blow-ups — unsuitable products, concentration limits, and clear risk disclosures keep investors from season-ending mistakes.',
      role: 'Client Education / Compliance Specialist',
      skills: ['Regulation knowledge', 'Risk disclosure', 'Behavioral coaching'],
      visual: img(
        'mistakes-that-matter',
        'connect-career',
        'Compliance specialist reviewing client suitability guidelines',
        'Guardrails exist because mistakes are predictable'
      ),
    },
  },
  flashcards: [
    {
      term: 'Opportunity cost',
      definition: 'What you give up by choosing one path over another.',
      philsAnalogy: 'Years in cash while the grove could have been growing — that lost growth is the cost.',
    },
    {
      term: 'Permanent loss',
      definition: 'Capital that cannot be recovered — often from selling low, scams, or excessive leverage.',
      philsAnalogy: 'Selling your grove at the bottom of a storm — the bamboo is gone for good.',
    },
    {
      term: 'Diversification',
      definition: 'Spreading investments across many assets to reduce reliance on any one outcome.',
      philsAnalogy: 'Many bamboo plots across Bamboo City — one drought will not wipe you out.',
    },
    {
      term: 'Emergency fund',
      definition: 'Cash set aside for unexpected expenses so you do not sell investments at bad times.',
      philsAnalogy: 'Stored bamboo for winter — you survive without fire-selling your farm.',
    },
  ],
  quiz: [
    {
      question: 'Which is typically a MAJOR mistake?',
      options: [
        'Choosing between two low-cost index funds',
        'Waiting a few days to invest a bonus',
        'Never investing because markets feel scary',
        'Rebalancing once a year',
      ],
      correctIndex: 2,
      explanation: 'Never starting forfeits years of compounding — far costlier than small fee differences.',
    },
    {
      question: 'Which mistake is often recoverable?',
      options: [
        'Losing everything in a scam',
        'Starting to invest at 32 instead of 22',
        'Investing money needed for rent next month',
        'Putting 100% in one volatile stock',
      ],
      correctIndex: 1,
      explanation: 'A late start hurts but you can still build wealth with time and consistency.',
    },
    {
      question: 'Why build an emergency fund before aggressive investing?',
      options: [
        'Banks require it by law',
        'So you will not forced to sell investments at the worst time',
        'Emergency funds earn more than stocks',
        'It eliminates all investment risk',
      ],
      correctIndex: 1,
      explanation: 'Cash buffer prevents panic selling when life surprises you.',
    },
    {
      question: 'What is diversification?',
      options: [
        'Buying whatever is trending on social media',
        'Spreading ownership across many investments',
        'Timing every buy and sell perfectly',
        'Keeping all money in one "sure thing" stock',
      ],
      correctIndex: 1,
      explanation: 'Spreading risk avoids one bad bet ending your season.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// OWN-5  Diversification by Design
// ─────────────────────────────────────────────
const diversificationByDesignLesson: MILesson = {
  id: 'own-diversification-by-design',
  moduleId: 'diversification-by-design',
  section: 'ownership',
  title: 'Diversification by Design',
  estimatedMinutes: 12,
  intro: {
    hook: 'Your friend puts $5,000 into one hot stock. Six months later it\'s worth $2,100. Your other friend split the same $5,000 across 500 companies. Six months later: $5,300. Same starting point. Very different outcomes.',
    philMessage: 'Diversification isn\'t giving up on big gains — it\'s choosing to not bet everything on being right about one thing. Here\'s how to build it by design, not by accident.',
    heroImage: img('diversification-by-design', 'hero', 'Panda spreading eggs across many baskets on a farm'),
  },
  coreConcepts: [
    {
      title: 'All Eggs in One Basket',
      explanation: 'Concentration risk means your portfolio rises and falls with a single bet. If that bet is wrong, there\'s no cushion. A diversified portfolio won\'t double on one great pick, but it also won\'t collapse when one stock implodes.',
      example: 'Enron employees who held all their 401(k) in company stock lost everything in 2001. Diversified investors lost only their small Enron allocation.',
      keyTerms: ['Concentration risk'],
      visual: img('diversification-by-design', 'concept-eggs', 'Two egg basket scenarios: all in one vs. spread across many'),
    },
    {
      title: 'Correlation Basics',
      explanation: 'Correlation measures how similarly two assets move. When stocks are correlated, they fall together in a crash — not much protection. The goal is to own assets that don\'t all move in the same direction at the same time.',
      example: 'US tech stocks and US growth stocks are highly correlated. US stocks and bonds are often negatively correlated — when stocks fall, bonds may rise.',
      keyTerms: ['Correlation'],
      visual: img('diversification-by-design', 'concept-correlation', 'Correlation scale from -1 to +1 with examples'),
    },
    {
      title: 'Lazy-Portfolio Templates',
      explanation: 'The three-fund portfolio (US total market + international + bonds) is used by some of the most sophisticated investors in the world. Simple, cheap, and historically competitive with most active strategies.',
      example: 'A 70/20/10 split (70% US stocks, 20% international, 10% bonds) has beaten most active fund managers over any 20-year period.',
      keyTerms: ['Three-fund portfolio'],
      visual: img('diversification-by-design', 'concept-threefund', 'Pie chart of three-fund portfolio with typical allocations'),
    },
  ],
  tryActivity: {
    type: 'slider-budget',
    title: 'Build Your Allocation',
    description: 'Adjust the sliders to build an allocation that matches the investor profile. Must total 100%.',
    sliderCategories: [
      { id: 'us-stocks', label: 'US Stocks', description: 'Broad US market index' },
      { id: 'intl-stocks', label: 'International Stocks', description: 'Developed + emerging markets' },
      { id: 'bonds', label: 'Bonds', description: 'US total bond market' },
    ],
    sliderScenarios: [
      {
        id: 's1',
        prompt: 'Young investor, 30 years to retirement, high risk tolerance. Wants maximum long-term growth.',
        optimalAllocation: { 'us-stocks': 70, 'intl-stocks': 20, 'bonds': 10 },
        feedback: 'Long time horizon means you can ride out volatility. Heavy stocks, light bonds.',
      },
      {
        id: 's2',
        prompt: 'Investor retiring in 5 years. Wants to protect what they\'ve built while keeping some growth.',
        optimalAllocation: { 'us-stocks': 40, 'intl-stocks': 20, 'bonds': 40 },
        feedback: 'Near retirement means protecting capital. More bonds reduce volatility at the cost of some growth.',
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your first diversified portfolio',
      description: 'You don\'t need to pick stocks. A single target-date fund or three-fund portfolio in a Roth IRA gives you instant diversification across thousands of companies at minimal cost.',
      scenario: 'You open a Roth IRA and put $100/month into a total market index fund. You now own fractional pieces of over 3,500 US companies.',
      visual: img('diversification-by-design', 'connect-pf', 'Panda opening a Roth IRA on a phone app'),
    },
    career: {
      title: 'Multi-Asset Allocator',
      description: 'Portfolio managers at pension funds and endowments build diversified allocations across stocks, bonds, real estate, commodities, and alternatives. Their job is to maximize returns for a given level of risk.',
      role: 'Multi-Asset Allocator',
      skills: ['Asset allocation', 'Risk modeling', 'Portfolio construction'],
      visual: img('diversification-by-design', 'connect-career', 'Panda portfolio manager reviewing allocation across asset classes'),
    },
  },
  flashcards: [
    { term: 'Concentration risk', definition: 'The risk of having too much of your portfolio in a single stock, sector, or asset class.', philsAnalogy: 'Phil plants only one bamboo species. A single blight wipes the whole grove. Diversify the species.' },
    { term: 'Correlation', definition: 'A measure of how closely two assets move together; 1.0 = identical moves, -1.0 = perfect opposites.', philsAnalogy: 'If your bamboo and rice farms both fail in drought, they\'re correlated. If one fails when the other thrives, that\'s natural diversification.' },
    { term: 'Three-fund portfolio', definition: 'A simple allocation across US total market, international stocks, and bonds — historically competitive and very low cost.', philsAnalogy: 'Phil splits his groves: city bamboo, countryside bamboo, stable government land. Simple, spread, and it works.' },
    { term: 'Asset allocation', definition: 'How you divide your portfolio between different asset classes like stocks, bonds, and real estate.', philsAnalogy: 'Not all bamboo in one plot. Split by location, type, and ownership structure.' },
  ],
  quiz: [
    { question: 'What is concentration risk?', options: ['Risk of having too many stocks', 'Risk of a single position dominating your portfolio', 'Risk that markets are too concentrated in tech', 'Risk of diversifying too much'], correctIndex: 1, explanation: 'Concentration risk is when one holding can make or break your entire portfolio.' },
    { question: 'Two assets with correlation of 0.95 are:', options: ['Good diversifiers for each other', 'Nearly identical in their price movement', 'Complete opposites', 'Uncorrelated'], correctIndex: 1, explanation: '0.95 correlation means the two assets move almost identically — they provide little diversification against each other.' },
    { question: 'The three-fund portfolio includes:', options: ['US stocks, international stocks, bonds', 'US stocks, gold, real estate', 'Individual stocks, mutual funds, crypto', 'Index funds, ETFs, and futures'], correctIndex: 0, explanation: 'The three-fund portfolio: US total market + international stocks + US total bond market.' },
    { question: 'Why did Enron employees lose everything if they had a diversified portfolio?', options: ['They didn\'t — diversified employees only lost their Enron slice', 'Diversification doesn\'t protect against fraud', 'The whole market crashed with Enron', 'Enron employees were required to be diversified'], correctIndex: 0, explanation: 'Diversified investors held a small Enron position. Company stock-concentrated employees lost almost everything.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// OWN-6  Risk vs. Reward
// ─────────────────────────────────────────────
const riskVsRewardLesson: MILesson = {
  id: 'own-risk-vs-reward',
  moduleId: 'risk-vs-reward',
  section: 'ownership',
  title: 'Risk vs. Reward',
  estimatedMinutes: 12,
  intro: {
    hook: 'Two investors both put $10,000 in the market. One checks their portfolio every day and sells every time it drops 5%. The other looks once a year. After 20 years, the checker has $31,000. The patient one has $67,000. Same market. Very different behavior.',
    philMessage: 'Risk in investing isn\'t just about losing money — it\'s about making decisions under uncertainty. Understanding your actual risk capacity (not just your gut feeling) is one of the most important things you can do before investing a dollar.',
    heroImage: img('risk-vs-reward', 'hero', 'Panda at a crossroads: calm mountain path vs. stormy shortcut'),
  },
  coreConcepts: [
    {
      title: 'Volatility ≠ Risk',
      explanation: 'Volatility is the size of price swings. Risk is the probability of a permanent loss. A stock that drops 30% but recovers fully in 12 months had high volatility but low real risk for a long-term holder. A stock that goes to zero had low daily volatility for years — and then maximum real risk.',
      example: 'The S&P 500 dropped 34% in March 2020. It recovered fully within 5 months. If you didn\'t sell, you experienced volatility but not a permanent loss.',
      keyTerms: ['Volatility'],
      visual: img('risk-vs-reward', 'concept-volatility', 'Chart comparing volatile recovery vs permanent loss scenarios'),
    },
    {
      title: 'Risk Capacity vs. Tolerance',
      explanation: 'Risk capacity is objective — how much financial risk you can mathematically afford based on time horizon, income stability, and emergency fund. Risk tolerance is subjective — how much emotional stress you can handle watching your portfolio swing. You need to match both.',
      example: 'A 22-year-old with a stable job, 6-month emergency fund, and 40-year horizon has high risk capacity. If they panic-sell in every correction, their tolerance is low — they should build exposure slowly.',
      keyTerms: ['Risk capacity'],
      visual: img('risk-vs-reward', 'concept-capacity', 'Two-axis grid: capacity (financial) vs tolerance (emotional)'),
    },
    {
      title: 'Drawdown Math',
      explanation: 'Drawdown is the peak-to-trough decline in portfolio value. To recover from a 50% drawdown, you need a 100% gain — which is why large losses are so hard to recover from. This is why capital preservation matters as much as growth.',
      example: 'If your $10,000 drops to $5,000 (50% drawdown), you need it to double just to break even. That can take 5–7 years at normal market returns.',
      keyTerms: ['Drawdown'],
      visual: img('risk-vs-reward', 'concept-drawdown', 'Chart showing drawdown and required recovery percentage'),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Risk Profiler',
    description: 'Given this investor\'s situation, pick the portfolio that best matches their risk capacity AND tolerance.',
    rounds: [
      {
        id: 'r1',
        prompt: 'Jordan, 19, first job, $1,500 in savings, no emergency fund, investing $100/month in a Roth IRA for retirement.',
        options: [
          { id: 'a', label: '100% crypto — highest potential gains', feedback: 'No emergency fund + crypto = one car repair away from selling at a loss. Capacity is lower than it looks.' },
          { id: 'b', label: '80% stocks, 20% bonds — standard young investor allocation', feedback: 'Good starting point, but Jordan should build an emergency fund before investing at all.' },
          { id: 'c', label: 'Build the emergency fund first, then 90% total market index', feedback: 'Correct. High risk capacity for the IRA long-term, but the emergency fund is non-negotiable first.' },
          { id: 'd', label: '50/50 stocks and cash — play it safe', feedback: 'Too conservative for a 40+ year horizon. At 19, time is the biggest asset — use it for growth.' },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Know your number before investing',
      description: 'Before investing, answer three questions: (1) Do I have 3–6 months of expenses saved? (2) Is my income stable for the next year? (3) Can I leave this money untouched for 5+ years? If yes to all three, your risk capacity is solid.',
      scenario: 'You want to invest $500. Your emergency fund has $2,000. Monthly expenses are $1,200. You should build the emergency fund to $3,600–$7,200 first, then invest.',
      visual: img('risk-vs-reward', 'connect-pf', 'Panda checking off emergency fund, stable income, long horizon before investing'),
    },
    career: {
      title: 'Risk Profiler / Wealth Advisor',
      description: 'Financial advisors and wealth managers spend the first meeting assessing a client\'s risk capacity and tolerance. This determines the entire portfolio strategy. It\'s one of the most important client conversations in wealth management.',
      role: 'Wealth Advisor',
      skills: ['Client assessment', 'Portfolio construction', 'Behavioral coaching'],
      visual: img('risk-vs-reward', 'connect-career', 'Panda advisor in a discovery meeting with a client'),
    },
  },
  flashcards: [
    { term: 'Volatility', definition: 'The degree of price fluctuation in an asset; high volatility means large swings but doesn\'t automatically mean permanent loss.', philsAnalogy: 'Bamboo prices swing with the seasons. That\'s volatility. The grove itself isn\'t going anywhere.' },
    { term: 'Drawdown', definition: 'The peak-to-trough percentage decline in a portfolio or asset; recovering a 50% drawdown requires a 100% gain.', philsAnalogy: 'Phil\'s bamboo grove value drops from $100K to $50K. He needs to double back up just to break even.' },
    { term: 'Risk capacity', definition: 'The objective financial ability to take on risk, based on time horizon, income, and emergency reserves.', philsAnalogy: 'Phil can afford to bet on experimental bamboo only if he has a full warehouse of regular bamboo as backup.' },
    { term: 'Risk tolerance', definition: 'The psychological comfort level with watching portfolio values fluctuate; distinct from financial capacity.', philsAnalogy: 'Phil technically can afford losses, but losing sleep over every bamboo price drop means his tolerance is low.' },
  ],
  quiz: [
    { question: 'An investor\'s portfolio drops 30% then recovers fully in 8 months. This was:', options: ['A permanent loss', 'High volatility but no permanent loss', 'A sign the investor should sell', 'Proof the market is broken'], correctIndex: 1, explanation: 'A full recovery means the drawdown was temporary volatility, not permanent loss — a crucial distinction.' },
    { question: 'What is a "drawdown"?', options: ['Withdrawing money from an account', 'The peak-to-trough decline in portfolio value', 'A type of investment account', 'A fee charged by financial advisors'], correctIndex: 1, explanation: 'Drawdown measures how far a portfolio fell from its peak — and highlights how hard it is to recover from large losses.' },
    { question: 'Risk capacity is different from risk tolerance because:', options: ['They are the same thing', 'Capacity is financial ability; tolerance is emotional comfort', 'Tolerance is objective; capacity is subjective', 'Only tolerance matters for young investors'], correctIndex: 1, explanation: 'You can have high financial capacity but low tolerance — or vice versa. Good planning accounts for both.' },
    { question: 'To recover from a 50% drawdown, you need:', options: ['A 50% gain', 'A 100% gain', 'A 25% gain', 'A 75% gain'], correctIndex: 1, explanation: '$10,000 → $5,000 (50% loss) → $10,000 requires doubling back up — a 100% gain.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// OWN-7  Index Funds vs. Active
// ─────────────────────────────────────────────
const indexVsActiveLesson: MILesson = {
  id: 'own-index-vs-active',
  moduleId: 'index-vs-active',
  section: 'ownership',
  title: 'Index Funds vs. Active',
  estimatedMinutes: 12,
  intro: {
    hook: 'The best fund managers in the world — Harvard MBAs, former Goldman traders, people with rooms full of Bloomberg terminals — fail to beat a simple S&P 500 index fund over 15+ years roughly 90% of the time. Why would you pay them more?',
    philMessage: 'Index funds are one of the most powerful financial innovations ever created. Understanding why they work — and when active management might make sense — is essential knowledge for any investor.',
    heroImage: img('index-vs-active', 'hero', 'Panda holding a boring-looking index fund box vs a shiny active fund trophy'),
  },
  coreConcepts: [
    {
      title: 'What an Index Is',
      explanation: 'An index is a list of stocks that represent a market or segment. The S&P 500 contains the 500 largest US public companies. An index fund simply buys all of them in proportion to their size — no manager deciding what to buy or sell.',
      example: 'The S&P 500 contains companies like Apple, Microsoft, Amazon, and 497 others. An S&P 500 index fund owns all of them, automatically.',
      keyTerms: ['Index'],
      visual: img('index-vs-active', 'concept-index', 'Diagram showing S&P 500 composition and how an index fund mirrors it'),
    },
    {
      title: 'Expense Ratios and Fee Drag',
      explanation: 'An expense ratio is the annual fee a fund charges, expressed as a percent of assets. Index funds charge as little as 0.03%. Actively managed funds average 0.5–1.0%. Over 30 years, a 1% difference in fees can reduce your final balance by 25–30%.',
      example: 'Starting with $10,000 at 8% growth for 30 years: 0.03% expense ratio → ~$94,000. 1% expense ratio → ~$67,000. The 0.97% difference costs you $27,000.',
      keyTerms: ['Expense ratio'],
      visual: img('index-vs-active', 'concept-fees', 'Side-by-side compound growth chart: 0.03% vs 1% fee over 30 years'),
    },
    {
      title: 'Active Is Hard, Not Impossible',
      explanation: 'Some active managers do beat the market — but identifying them in advance is nearly impossible. And even the best managers have bad decades. For most investors, a low-cost index fund beats the likely outcomes of active management after fees over long horizons.',
      example: 'Warren Buffett has beaten the S&P 500 over 60 years. But Buffett himself has publicly recommended index funds for most investors, not Berkshire Hathaway stock.',
      keyTerms: ['Active management'],
      visual: img('index-vs-active', 'concept-active', 'Bar chart: percent of active managers beating index over 1, 5, 10, 15 years'),
    },
  ],
  tryActivity: {
    type: 'compound-compare',
    title: 'Fee Drag Calculator',
    description: 'See how different expense ratios affect your final balance. Adjust the slider to see fee impact over time.',
    defaultStartAge: 20,
    defaultMonthly: 200,
    annualReturnRate: 0.08,
    retirementAge: 60,
  },
  connect: {
    personalFinance: {
      title: 'Start with index funds',
      description: 'For first-time investors, a total market index fund in a Roth IRA is almost always the right first move. Low fees, instant diversification, no stock-picking required. Once you have a strong foundation, you can explore individual stocks with a small portion.',
      scenario: 'You have $50/month to invest. Roth IRA → total market index fund (0.03% fee). You\'re done. That\'s a genuinely good strategy used by millions of professional investors.',
      visual: img('index-vs-active', 'connect-pf', 'Panda opening a Roth IRA app with a simple index fund selected'),
    },
    career: {
      title: 'Index Fund Portfolio Manager',
      description: 'Passive fund managers at Vanguard, Fidelity, and BlackRock manage trillions by doing simple, systematic work: tracking an index with near-zero tracking error. It\'s operationally complex at scale even if the strategy is simple.',
      role: 'Index Fund PM',
      skills: ['Portfolio tracking', 'Rebalancing', 'Tax efficiency'],
      visual: img('index-vs-active', 'connect-career', 'Panda portfolio manager tracking index replication with minimal error'),
    },
  },
  flashcards: [
    { term: 'Index', definition: 'A list of stocks representing a market or sector, used as a benchmark or replicated by index funds.', philsAnalogy: 'The city bamboo index tracks the 500 biggest bamboo operations in the city. Own the index, own a piece of all of them.' },
    { term: 'Expense ratio', definition: 'Annual fund fee expressed as a percent of assets; index funds charge as little as 0.03%, active funds average 0.5–1.0%.', philsAnalogy: 'Paying Phil a 1% management fee to oversee your bamboo grove costs you $10K over 30 years vs. doing it yourself for $30.' },
    { term: 'Tracking error', definition: 'How closely an index fund\'s performance matches its target index; lower is better for passive funds.', philsAnalogy: 'If the bamboo index is up 8% but your bamboo fund is up 7.5%, that 0.5% gap is tracking error.' },
    { term: 'Active management', definition: 'An investment approach where a manager makes decisions about what to buy and sell, attempting to outperform an index.', philsAnalogy: 'Phil handpicking every bamboo shoot vs. just owning every shoot in the grove. Active is Phil\'s judgment vs. the whole market.' },
  ],
  quiz: [
    { question: 'An index fund works by:', options: ['Picking the best stocks in the market', 'Owning all stocks in a market index in proportion to their size', 'Actively trading to beat the market', 'Owning bonds instead of stocks'], correctIndex: 1, explanation: 'Index funds simply replicate a market index — no manager decisions, very low cost.' },
    { question: 'An expense ratio of 0.03% vs 1.0% over 30 years with $10,000 starting balance roughly results in:', options: ['The same outcome — fees are tiny', 'A $27,000 difference in final balance', 'A 3% difference in final balance', 'A difference only relevant at retirement age'], correctIndex: 1, explanation: 'Fee drag compounds over decades: a 0.97% fee difference can cost $27,000+ on a $10K investment over 30 years.' },
    { question: 'What percentage of active managers beat the S&P 500 index over 15+ years?', options: ['About 90%', 'About 50%', 'About 10%', 'Exactly equal numbers beat and lose'], correctIndex: 2, explanation: 'Roughly 90% of active managers underperform the S&P 500 over 15+ years after fees — making index funds the default winner.' },
    { question: 'Warren Buffett\'s recommendation for most investors is:', options: ['Buy Berkshire Hathaway', 'A low-cost S&P 500 index fund', 'Gold and real estate', 'Individual dividend stocks'], correctIndex: 1, explanation: 'Buffett has publicly said the best investment for most people is a low-cost index fund — not individual stock picking.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// OWN-8  Dividends & Reinvestment
// ─────────────────────────────────────────────
const dividendsReinvestmentLesson: MILesson = {
  id: 'own-dividends-reinvestment',
  moduleId: 'dividends-and-reinvestment',
  section: 'ownership',
  title: 'Dividends & Reinvestment',
  estimatedMinutes: 12,
  intro: {
    hook: 'In 1993, a $10,000 investment in Coca-Cola stock bought about 500 shares. Today those shares are worth around $24,000. But if you had reinvested every dividend along the way, you\'d have closer to $90,000. The difference is called DRIP magic.',
    philMessage: 'Dividends are cash payments companies make to shareholders. Reinvesting them instead of spending them is one of the most powerful (and most ignored) accelerators of long-term wealth.',
    heroImage: img('dividends-reinvestment', 'hero', 'Panda watching a bamboo grove self-replant and grow bigger every year'),
  },
  coreConcepts: [
    {
      title: 'What a Dividend Is',
      explanation: 'A dividend is a regular cash payment from a company\'s profits to its shareholders. Not all companies pay them — growth companies often reinvest profits instead. Dividend payers are typically mature, profitable businesses that generate more cash than they need to grow.',
      example: 'Johnson & Johnson has paid and increased its dividend every year for over 60 consecutive years. It pays about $1.19 per share per quarter.',
      keyTerms: ['Dividend'],
      visual: img('dividends-reinvestment', 'concept-dividend', 'Diagram: company profits → retained earnings vs. dividends to shareholders'),
    },
    {
      title: 'DRIP Magic',
      explanation: 'A Dividend Reinvestment Plan (DRIP) automatically uses your dividend payments to buy more shares instead of paying you cash. More shares means larger future dividends, which buy even more shares — a powerful compounding loop.',
      example: 'You own 100 shares of a stock paying $2/year in dividends. DRIP buys 2 more shares at $100 each. Next year you earn $204 in dividends. Year after that, $208. The snowball grows.',
      keyTerms: ['DRIP'],
      visual: img('dividends-reinvestment', 'concept-drip', 'Compounding loop diagram: dividends → more shares → more dividends'),
    },
    {
      title: 'Growth vs. Dividend Stocks',
      explanation: 'Growth stocks reinvest profits to expand the business — they rarely pay dividends. Dividend stocks return profits to shareholders — they grow more slowly but provide income. Neither is always better: the right mix depends on your income needs and time horizon.',
      example: 'Amazon paid no dividends for 27 years, reinvesting profits to build AWS and logistics. Retirees who need income might prefer a dividend payer. Long-term growth investors might prefer Amazon.',
      keyTerms: ['Dividend yield'],
      visual: img('dividends-reinvestment', 'concept-growth-vs-dividend', 'Side-by-side comparison of growth stock vs. dividend stock characteristics'),
    },
  ],
  tryActivity: {
    type: 'compound-compare',
    title: 'DRIP vs. No-DRIP',
    description: 'Compare how much more you end up with when dividends are reinvested vs. taken as cash. Adjust the sliders.',
    defaultStartAge: 20,
    defaultMonthly: 100,
    annualReturnRate: 0.09,
    retirementAge: 60,
  },
  connect: {
    personalFinance: {
      title: 'Set DRIP and forget it',
      description: 'In most brokerage and retirement accounts, you can turn on DRIP with one toggle. Do it once and dividends automatically compound forever. This is one of the easiest set-and-forget wealth-building habits.',
      scenario: 'You turn on DRIP in your Roth IRA. You invest $150/month in a dividend-paying fund for 30 years. You receive tens of thousands of dollars more vs. taking dividends as cash.',
      visual: img('dividends-reinvestment', 'connect-pf', 'Panda toggling DRIP setting on in a brokerage account app'),
    },
    career: {
      title: 'Dividend Income Analyst',
      description: 'Income-focused analysts at wealth management firms focus on high-dividend stocks and funds for clients who need regular income — retirees, endowments, or foundations. They evaluate dividend sustainability (payout ratio, free cash flow coverage).',
      role: 'Dividend Income Analyst',
      skills: ['Dividend sustainability analysis', 'Income portfolio construction', 'Payout ratio modeling'],
      visual: img('dividends-reinvestment', 'connect-career', 'Panda analyst reviewing dividend history and payout ratios'),
    },
  },
  flashcards: [
    { term: 'Dividend', definition: 'A cash payment from a company\'s profits to shareholders, typically paid quarterly.', philsAnalogy: 'Phil\'s bamboo grove makes $50K profit. He keeps $30K to expand and pays the grove owners $20K. That\'s a dividend.' },
    { term: 'DRIP', definition: 'Dividend Reinvestment Plan — automatically uses dividend payments to buy more shares instead of distributing cash.', philsAnalogy: 'Instead of spending the $20K from the grove, you plow it back in to plant more bamboo. Bigger grove = bigger dividend next year.' },
    { term: 'Dividend yield', definition: 'Annual dividend per share divided by stock price; shows the income return as a percentage.', philsAnalogy: 'The grove pays $4/share in dividends and the share price is $100. Yield = 4%. That\'s your annual bamboo return before price growth.' },
    { term: 'Payout ratio', definition: 'Percentage of earnings paid out as dividends; very high ratios (over 80%) may be unsustainable.', philsAnalogy: 'If Phil\'s grove earns $100K and pays out $90K in dividends, there\'s barely anything left to maintain the grove. That\'s a risky payout ratio.' },
  ],
  quiz: [
    { question: 'What is a DRIP?', options: ['A water management system for bamboo groves', 'A plan to automatically reinvest dividends into more shares', 'A type of bond payment', 'A fee charged by dividend funds'], correctIndex: 1, explanation: 'DRIP = Dividend Reinvestment Plan. Each dividend payment buys more shares, compounding your ownership over time.' },
    { question: 'Which type of company typically pays higher dividends?', options: ['High-growth tech startups', 'Mature, profitable companies with stable cash flows', 'Companies with no profits', 'Companies that just went public'], correctIndex: 1, explanation: 'Mature companies generate more cash than they need to grow, so they return it to shareholders as dividends.' },
    { question: 'The main advantage of reinvesting dividends is:', options: ['You receive more cash immediately', 'Dividends compound to buy more shares, which pay more dividends', 'You avoid paying taxes on dividends', 'The company gives you a bonus for reinvesting'], correctIndex: 1, explanation: 'DRIP creates a compounding loop: dividends buy shares → shares pay dividends → dividends buy more shares.' },
    { question: 'A payout ratio of 95% means:', options: ['The company is very profitable', '95% of earnings are paid as dividends — potentially unsustainable', 'The dividend is growing 95% annually', 'The stock is 95% owned by institutions'], correctIndex: 1, explanation: 'Very high payout ratios leave little room for reinvestment or cushion in a bad year — the dividend may be cut.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// OWN-9  Tax-Smart Ownership
// ─────────────────────────────────────────────
const taxSmartOwnershipLesson: MILesson = {
  id: 'own-tax-smart-ownership',
  moduleId: 'tax-smart-ownership',
  section: 'ownership',
  title: 'Tax-Smart Ownership',
  estimatedMinutes: 14,
  intro: {
    hook: 'Your coworker earns the same salary as you. You both invest $300/month. After 30 years, you have $420,000. They have $310,000. Same income. Same contribution. The difference: you used a Roth IRA and they used a taxable account. One decision. $110,000.',
    philMessage: 'The government gives you legal ways to pay zero (or very little) tax on your investment gains. Not using them is leaving real money on the table. Here\'s the playbook.',
    heroImage: img('tax-smart-ownership', 'hero', 'Panda reading a tax code book and finding hidden treasure inside'),
  },
  coreConcepts: [
    {
      title: 'Roth IRA Basics',
      explanation: 'A Roth IRA is a retirement account where you invest after-tax dollars. The money grows tax-free — you never pay taxes on gains or withdrawals in retirement. The 2024 annual contribution limit is $7,000 ($8,000 if 50+). Income limits apply.',
      example: 'You put $200/month in a Roth IRA from age 22 to 65. At 7% growth, you accumulate about $620,000. You owe zero in taxes on any of that growth.',
      keyTerms: ['Roth IRA'],
      visual: img('tax-smart-ownership', 'concept-roth', 'Roth IRA mechanics: after-tax in, tax-free growth, tax-free out'),
    },
    {
      title: '401(k) Match = Free Money',
      explanation: 'Many employers match 401(k) contributions up to a percentage of salary. A 50% match on 6% of salary means if you contribute 6%, your employer adds another 3%. This is an immediate 50% guaranteed return — better than almost any investment.',
      example: 'You earn $50,000. You contribute 6% = $3,000. Your employer matches 50% = $1,500 free. You just earned $1,500 for putting money in a retirement account you would have anyway.',
      keyTerms: ['Employer match'],
      visual: img('tax-smart-ownership', 'concept-match', 'Diagram showing employer match as instant return on contribution'),
    },
    {
      title: 'Capital Gains: Short vs. Long',
      explanation: 'Capital gains are profits from selling investments. Short-term gains (held under 1 year) are taxed as ordinary income — potentially 22–37%. Long-term gains (held over 1 year) are taxed at 0%, 15%, or 20% depending on income. Holding one extra day past the one-year mark can literally save thousands.',
      example: 'You sell stock for a $5,000 gain after 11 months: owe ~$1,100 at 22% bracket. Wait one more month: owe $0 (if income is under ~$47,000) or $750 at 15%. Same gain. Very different tax bill.',
      keyTerms: ['Capital gains'],
      visual: img('tax-smart-ownership', 'concept-capgains', 'Tax rate comparison: short-term vs long-term capital gains'),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Account Matching',
    description: 'Sort each investment type into the account where it belongs for maximum tax efficiency.',
    buckets: [
      { id: 'roth', label: 'Roth IRA' },
      { id: 'traditional', label: 'Traditional 401(k)' },
      { id: 'taxable', label: 'Taxable Brokerage' },
    ],
    items: [
      { id: 'i1', label: 'High-growth index fund you won\'t touch for 40 years', correctBucket: 'roth' },
      { id: 'i2', label: 'Bond fund generating regular interest income', correctBucket: 'traditional' },
      { id: 'i3', label: 'Stocks you plan to sell within 2 years', correctBucket: 'taxable' },
      { id: 'i4', label: 'Maximum employer-match contribution', correctBucket: 'traditional' },
      { id: 'i5', label: 'Municipal bonds (already tax-free interest)', correctBucket: 'taxable' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'The order of operations',
      description: '(1) Contribute enough to 401(k) to get full employer match. (2) Max out Roth IRA. (3) If money left, max out 401(k). (4) Then taxable brokerage. Following this order optimizes every dollar you invest for long-term tax efficiency.',
      scenario: 'First job, $45K salary. Contribute 6% to 401(k) for full match. Open Roth IRA at Fidelity and auto-invest $100/month. You\'ve just set up an optimal tax-advantaged system.',
      visual: img('tax-smart-ownership', 'connect-pf', 'Panda following the investment order of operations on a flowchart'),
    },
    career: {
      title: 'Tax-Aware Financial Advisor',
      description: 'Advisors who specialize in tax-aware investing help clients locate the right assets in the right account types. Known as "asset location" strategy, it can meaningfully improve after-tax returns without changing a single investment.',
      role: 'Tax-Aware Advisor',
      skills: ['Tax law basics', 'Asset location', 'Retirement planning'],
      visual: img('tax-smart-ownership', 'connect-career', 'Panda advisor mapping out client accounts for tax efficiency'),
    },
  },
  flashcards: [
    { term: 'Roth IRA', definition: 'A retirement account funded with after-tax dollars; all growth and qualified withdrawals are completely tax-free.', philsAnalogy: 'Pay taxes on the bamboo seeds now. The entire harvest — forever — is yours, tax-free.' },
    { term: 'Employer match', definition: 'Free money from your employer added to your 401(k) when you contribute; the most guaranteed return available.', philsAnalogy: 'Phil says he\'ll match every bamboo you plant with a free bamboo of his own. You plant nothing, you get nothing. You plant 10, you get 15.' },
    { term: 'Capital gains', definition: 'Profit from selling an investment; taxed at lower rates if held over one year (long-term) vs. under one year (short-term).', philsAnalogy: 'Sell the bamboo grove after owning it 6 months: pay full income tax on the gain. Hold it 13 months: pay a much lower rate.' },
    { term: 'Tax-loss harvesting', definition: 'Selling investments at a loss to offset gains, reducing your tax bill — without changing your overall market exposure.', philsAnalogy: 'Sell the dying bamboo patch to claim the loss on paper. Use the cash to buy a similar patch. Net exposure the same, tax bill lower.' },
  ],
  quiz: [
    { question: 'In a Roth IRA, taxes are paid:', options: ['When you withdraw in retirement', 'On contributions going in (before-tax dollars are not used)', 'Both going in and coming out', 'Never — Roth is fully tax-exempt including contributions'], correctIndex: 1, explanation: 'Roth uses after-tax dollars. You pay tax on contributions now, but growth and withdrawals in retirement are 100% tax-free.' },
    { question: 'Your employer matches 50% of 401(k) contributions up to 6% of salary. If your salary is $60,000 and you contribute 6%, your employer adds:', options: ['$3,600', '$1,800', '$3,000', '$600'], correctIndex: 1, explanation: '6% of $60,000 = $3,600 from you. 50% match = $1,800 from employer. Immediate 50% return on your $3,600.' },
    { question: 'Long-term capital gains tax rates (held over 1 year) are:', options: ['Higher than short-term rates', 'Lower than short-term rates', 'The same as short-term rates', 'Zero for everyone'], correctIndex: 1, explanation: 'Long-term rates (0/15/20%) are significantly lower than short-term rates (ordinary income: up to 37%) — a strong incentive to hold.' },
    { question: 'What is the recommended first step in the investment order of operations?', options: ['Open a taxable brokerage', 'Max out the Roth IRA', 'Get the full employer 401(k) match', 'Buy individual stocks'], correctIndex: 2, explanation: 'The employer match is free money with an immediate guaranteed return. Always capture it first.' },
  ],
  rewards: { bamboo: 25, xp: 5 },
};

// ─────────────────────────────────────────────
// OWN-10  Reading Your Portfolio
// ─────────────────────────────────────────────
const readingYourPortfolioLesson: MILesson = {
  id: 'own-reading-your-portfolio',
  moduleId: 'reading-your-portfolio',
  section: 'ownership',
  title: 'Reading Your Portfolio',
  estimatedMinutes: 10,
  intro: {
    hook: 'You open your brokerage app. There are numbers everywhere. Allocation, unrealized gains, drift, sectors, cost basis. Most people scroll past all of it and just look at the green and red percentages. Here\'s what you should actually look at.',
    philMessage: 'Your portfolio statement is a dashboard, not a scoreboard. Reading it correctly means looking at allocation, drift, and when to act — not just today\'s return.',
    heroImage: img('reading-your-portfolio', 'hero', 'Panda studying a portfolio dashboard with arrows and charts'),
  },
  coreConcepts: [
    {
      title: 'Allocation Pie',
      explanation: 'Your allocation is the percentage of your portfolio in each asset class. A typical starting point for young investors: 80–90% stocks, 10–20% bonds. As you age, the allocation typically shifts toward more bonds for stability.',
      example: 'Portfolio: $8,000 in stocks, $2,000 in bonds = 80/20 allocation. Easy to read, important to maintain intentionally.',
      keyTerms: ['Allocation'],
      visual: img('reading-your-portfolio', 'concept-allocation', 'Pie chart showing 80/20 and 60/40 allocation examples'),
    },
    {
      title: 'Rebalancing Rules',
      explanation: 'Over time, fast-growing assets (usually stocks) drift above your target allocation. Rebalancing means selling a bit of what grew and buying what shrank, to return to your original percentages. Most advisors suggest rebalancing once a year or when any allocation drifts 5+ percentage points.',
      example: 'Target: 80/20 stocks/bonds. After a bull market: stocks grew to 90% of the portfolio. Sell 10% of stocks, buy bonds to return to 80/20.',
      keyTerms: ['Rebalance'],
      visual: img('reading-your-portfolio', 'concept-rebalance', 'Before/after rebalancing diagram showing target vs actual allocation'),
    },
    {
      title: 'When to Act vs. When Not To',
      explanation: 'Rebalance on a calendar schedule or when drift exceeds your threshold — not based on news or market swings. The worst rebalancing mistakes are emotion-driven: adding to bonds during a crash (selling equities at the low) or letting stocks run unchecked for years until risk is sky-high.',
      example: 'Scheduled annual rebalance: you check once a year regardless of headlines. Drift rebalance: you check when any allocation moves 5% from target. Both are better than market-timing.',
      keyTerms: ['Drift'],
      visual: img('reading-your-portfolio', 'concept-drift', 'Timeline showing portfolio drift over a bull market period'),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Portfolio Decision',
    description: 'Given the portfolio situation, pick the right action.',
    rounds: [
      {
        id: 'r1',
        prompt: 'Target allocation: 75% stocks, 25% bonds. Current: 85% stocks, 15% bonds (after a strong stock market year). What do you do?',
        options: [
          { id: 'a', label: 'Let it ride — stocks are winning', feedback: 'Letting drift run unchecked means you\'re taking more risk than you planned. This is how people get hurt in corrections.' },
          { id: 'b', label: 'Rebalance back to 75/25 by selling some stocks and buying bonds', feedback: 'Correct. Annual or drift-triggered rebalancing keeps your risk profile where you planned it.' },
          { id: 'c', label: 'Sell all stocks and wait for a correction', feedback: 'That\'s market-timing, not rebalancing. You\'re taking on cash-drag risk trying to predict the market.' },
          { id: 'd', label: 'Change your target allocation to 85/15 permanently', feedback: 'Only change your target if your life situation changed — not because the market moved.' },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'The one-hour-a-year portfolio review',
      description: 'Pick one day a year — your birthday works — to open your portfolio, check if allocation has drifted more than 5%, and rebalance if needed. That\'s it. Investing doesn\'t need more attention than that for most long-term investors.',
      scenario: 'Every January 1st, you check your three-fund portfolio. Stocks are at 82%, target is 80%. You move $200 from a stock fund to a bond fund. Done for the year.',
      visual: img('reading-your-portfolio', 'connect-pf', 'Panda calendar with one annual portfolio review day circled'),
    },
    career: {
      title: 'Wealth Operations Analyst',
      description: 'At wealth management firms, operations analysts monitor client portfolios daily for drift, tax-loss harvesting opportunities, and rebalancing triggers. They implement the trades that keep each client at their target allocation.',
      role: 'Wealth Operations Analyst',
      skills: ['Portfolio monitoring', 'Rebalancing execution', 'Tax-aware trading'],
      visual: img('reading-your-portfolio', 'connect-career', 'Panda analyst tracking portfolio drift across multiple client accounts'),
    },
  },
  flashcards: [
    { term: 'Allocation', definition: 'The percentage of your portfolio in each asset class (stocks, bonds, cash); your risk level expressed as a percentage.', philsAnalogy: 'Phil\'s grove: 80% bamboo, 20% stable fruit trees. That\'s the allocation. It defines the risk-to-income profile.' },
    { term: 'Rebalance', definition: 'Selling overweight assets and buying underweight ones to return your portfolio to its target allocation.', philsAnalogy: 'The bamboo grew bigger than the fruit trees this year. Trim some bamboo, plant more fruit trees. Back to 80/20.' },
    { term: 'Drift', definition: 'When market movements cause your actual allocation to diverge from your target — usually stocks drifting higher in bull markets.', philsAnalogy: 'A good bamboo harvest means bamboo is now 88% of Phil\'s grove. It drifted from the 80% target.' },
    { term: 'Statement', definition: 'A periodic account summary showing holdings, performance, allocation, and any activity in the period.', philsAnalogy: 'Phil gets a quarterly grove report: what grew, what didn\'t, what the mix is, and what changed.' },
  ],
  quiz: [
    { question: 'What does "rebalancing" mean?', options: ['Selling your entire portfolio and starting over', 'Selling overweight assets and buying underweight ones to hit your target allocation', 'Moving from stocks to bonds permanently', 'Paying off debt before investing'], correctIndex: 1, explanation: 'Rebalancing keeps your actual allocation aligned with your target by trimming winners and adding to laggards.' },
    { question: 'Portfolio drift most commonly happens when:', options: ['Bonds outperform stocks', 'Stocks outperform bonds in a bull market, growing above their target allocation', 'You make no contributions for a year', 'Dividend payments are reinvested'], correctIndex: 1, explanation: 'Bull markets push stocks above their target weight — requiring rebalancing back to the original allocation.' },
    { question: 'The best trigger for rebalancing is:', options: ['When the news is scary', 'A calendar schedule or when drift exceeds 5% from target', 'When your portfolio loses 10%', 'Every time you check your account'], correctIndex: 1, explanation: 'Calendar or drift-based triggers keep emotions out of the decision — which is the whole point of having rules.' },
    { question: 'Your target is 70/30 stocks/bonds. Stocks are now at 78%. You should:', options: ['Celebrate and leave it', 'Sell some stocks and buy bonds to return to 70/30', 'Change your target to 78/22', 'Sell all bonds immediately'], correctIndex: 1, explanation: '8% drift is over the typical 5% threshold — a rebalance back to target keeps your risk profile consistent with your plan.' },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

export const ownershipLessons: MILesson[] = [
  ownAPieceLesson,
  timeIsYourAllyLesson,
  thePatienceGameLesson,
  mistakesThatMatterLesson,
  diversificationByDesignLesson,
  riskVsRewardLesson,
  indexVsActiveLesson,
  dividendsReinvestmentLesson,
  taxSmartOwnershipLesson,
  readingYourPortfolioLesson,
];

const ownershipLessonMap = new Map(
  ownershipLessons.map((lesson) => [lesson.moduleId, lesson])
);

export function getOwnershipLesson(moduleId: string): MILesson | undefined {
  return ownershipLessonMap.get(moduleId);
}
