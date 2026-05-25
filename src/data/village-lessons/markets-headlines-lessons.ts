import type { VillageLesson } from '@/types/village-lesson';

export const marketsHeadlinesLessons: VillageLesson[] = [
  {
    id: 'mh-1-price-discovery',
    moduleId: 'markets-headlines',
    simulatorType: 'headline-expectation',
    title: 'Why Markets Move on News',
    estimatedMinutes: 9,
    hook: {
      question:
        'A gaming company posts record profits—and the stock still drops. How is that even possible?',
      philMessage:
        'Headlines grab your eyeballs, but prices move on surprises. If you learn the expectation trap early, you will not get played by "good news" that is actually a miss.',
    },
    concepts: [
      {
        id: 'news_moves_prices',
        emoji: '📰',
        title: 'News Is Like a Game Patch',
        body: 'Stock prices do not bounce around for no reason. They react fast when new info drops—earnings, lawsuits, product flops, or Fed decisions. Investors instantly redo the math on how much money the company might make and how risky it feels to own.',
        realWorldExample:
          'A sneaker brand announces a hot collab. The stock jumps before the drop even hits stores because traders are betting on future sales—not yesterday\'s vibes.',
      },
      {
        id: 'expectation_trap',
        emoji: '🎯',
        title: 'The Expectation Trap (Hype vs. Reality)',
        body: 'The market does not grade the past—it grades the future. A "good" headline can still tank a stock if experts expected something even better. The move is about the gap between hype and what actually happened.',
        realWorldExample:
          'Bamboo Corp reports $20M profit—sounds huge. But Wall Street expected $25M. The stock dips because the headline was good, but the surprise was bad.',
      },
      {
        id: 'filings_truth',
        emoji: '📄',
        title: '10-Ks and 10-Qs: Skip the Commercial',
        body: 'Companies file official reports with the SEC. The 10-K is the big yearly check-up (audited). The 10-Q is a shorter quarterly update. The glossy marketing is on the cover; the honest stuff—especially risk factors—lives in the boring legal text.',
        realWorldExample:
          'A startup\'s Instagram looks perfect. In the 10-K risk section it admits: "We depend on one factory—if rent spikes, margins could collapse." That line can save your money.',
      },
      {
        id: 'pr_shield',
        emoji: '🛡️',
        title: 'The PR Sentiment Shield',
        body: 'Flashy press releases, viral CEO posts, and hype campaigns can build a "shield" so fans forgive mistakes later. Smart owners look past the vibe and track real cash—revenue, costs, and risks—not just brand love.',
        realWorldExample:
          'A streamer platform pushes a feel-good documentary while quietly raising prices. The shield keeps fans loyal; the signal is in the subscription numbers.',
      },
    ],
    simulator: {
      title: 'Headline Hype Check',
      intro:
        'Your live ticker just lit up. Predict the move, then hunt the hidden risk in a filing snippet before you "buy."',
      scenario:
        'You are paper-trading Bamboo Corp. One headline hits the wire. Then you get a slice of their 10-K risk section before you tap buy.',
      meters: [
        { id: 'reading_skill', label: 'News Reading', emoji: '🧠', initial: 50, color: 'blue' },
        { id: 'portfolio', label: 'Virtual Portfolio', emoji: '💰', initial: 50, color: 'green' },
      ],
      rounds: [],
      endMessage:
        'Markets reward people who compare headlines to expectations—and who read the fine print before they click buy.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'A company beats last year\'s profit but the stock falls. Most likely reason?',
        options: [
          { id: 'a', text: 'Investors hate profits' },
          { id: 'b', text: 'Results were below what experts expected' },
          { id: 'c', text: 'The CEO wore the wrong shoes' },
          { id: 'd', text: 'The market is broken forever' },
        ],
        correctId: 'b',
        explanation:
          'Prices move on surprise. Beating your own past record is not enough if the hype bar was higher.',
      },
      {
        id: 'q2',
        question: 'What is a 10-K?',
        options: [
          { id: 'a', text: 'A viral TikTok trend' },
          { id: 'b', text: 'A big yearly SEC filing with audited numbers and risks' },
          { id: 'c', text: 'A one-day stock sale' },
          { id: 'd', text: 'A Fed interest rate' },
        ],
        correctId: 'b',
        explanation:
          'The 10-K is the annual report companies must file. Risk Factors (often Item 1A) is where they admit what could go wrong.',
      },
      {
        id: 'q3',
        question: 'A CEO meme goes viral. That headline is usually:',
        options: [
          { id: 'a', text: 'Signal — always buy' },
          { id: 'b', text: 'Noise — fun, but rarely changes real earnings' },
          { id: 'c', text: 'Illegal insider info' },
          { id: 'd', text: 'The same as an earnings beat' },
        ],
        correctId: 'b',
        explanation:
          'Social hype is noise unless it changes actual business results. Follow the cash, not the clip.',
      },
      {
        id: 'q4',
        question: 'The "PR Sentiment Shield" means companies try to:',
        options: [
          { id: 'a', text: 'Hide all their revenue' },
          { id: 'b', text: 'Build brand love so mistakes hurt less in public' },
          { id: 'c', text: 'Shut down the SEC' },
          { id: 'd', text: 'Stop paying employees' },
        ],
        correctId: 'b',
        explanation:
          'PR can soften backlash. Investors still need to check whether the business itself is healthy.',
      },
      {
        id: 'q5',
        question: 'Before buying a stock, reading risk factors helps you:',
        options: [
          { id: 'a', text: 'Pick a cooler logo' },
          { id: 'b', text: 'Spot traps that hype headlines hide' },
          { id: 'c', text: 'Guarantee you will never lose money' },
          { id: 'd', text: 'Avoid paying taxes' },
        ],
        correctId: 'b',
        explanation:
          'Risk sections force companies to admit lawsuits, supply issues, and other landmines. That is homework that pays.',
      },
    ],
    rewards: { xp: 125, bamboo: 16 },
  },

  {
    id: 'mh-2-fed-policy',
    moduleId: 'markets-headlines',
    simulatorType: 'macro-headlines',
    title: 'Noise, Signal & the Fed',
    estimatedMinutes: 10,
    hook: {
      question:
        'The Fed moves one number in Washington—and your phone, your parents\' car loan, and tech stocks all react. Why?',
      philMessage:
        'Macro headlines are loud. Your job is to sort real signal from clickbait, then understand how interest rates act like gravity for stock prices.',
    },
    concepts: [
      {
        id: 'signal_vs_noise',
        emoji: '🔍',
        title: 'Signal vs. Noise',
        body: 'Signal = info that can actually change how much money a company makes (supplier gone, margins crushed, revenue restated). Noise = drama that will not matter next month (meme tweets, "worst Tuesday" headlines, influencer hot takes).',
        realWorldExample:
          'Factory parts cost 8% more → margins shrink. That is signal. CEO posts a gym selfie → stock "pops" 0.3%. That is noise.',
      },
      {
        id: 'fed_spigot',
        emoji: '🏛️',
        title: 'The Fed Controls the Money Spigot',
        body: 'The Federal Reserve is the U.S. central bank. It raises or lowers benchmark interest rates to cool inflation or support jobs. When borrowing gets expensive, growth stocks often slide; when money is cheap, risk assets can rip higher.',
        realWorldExample:
          'When rates jumped in 2022–2023, mortgage payments rose and many tech stocks fell hard—even some strong companies—because future profits were worth less at higher rates.',
      },
      {
        id: 'rate_seesaw',
        emoji: '⚖️',
        title: 'The Interest Rate Seesaw',
        body: 'Rates UP → loans cost more → companies expand slower → some investors flee risky stocks for safe savings. Rates DOWN → borrowing is cheap → spending and investment can heat up → stocks often climb. It is not instant, but the direction matters.',
        realWorldExample:
          'A student with a variable-rate credit card feels a Fed hike in real life. A growth company planning a new factory might delay if loan rates spike.',
      },
      {
        id: 'macro_headlines',
        emoji: '📢',
        title: 'Reading Fed Headlines Without Panic',
        body: 'Watch for words that signal tight vs. easy money: "hike," "hold," "cut," "inflation still hot," "data dependent." Markets often react to the surprise versus what was expected—not just the headline verb.',
        realWorldExample:
          'Headline: "Fed holds rates." Subtext: statement drops the word "elevated" for "moderating." Bond traders read that as future cuts—and stocks rally on language, not the hold itself.',
      },
    ],
    simulator: {
      title: 'Signal Sort & Macro Drill',
      intro:
        'First, trash-sort six headline cards in 15 seconds. Then survive a flash Fed hike and rebalance your portfolio mix.',
      scenario:
        'Sorting noise into your investing column leaks virtual cash. After that, rates jump—where do you move your money?',
      meters: [
        { id: 'filter_skill', label: 'Filter Skill', emoji: '🔍', initial: 55, color: 'blue' },
        { id: 'portfolio', label: 'Portfolio Health', emoji: '💰', initial: 60, color: 'green' },
      ],
      rounds: [],
      endMessage:
        'Great macro owners ignore the drama, respect the Fed\'s gravity, and rebalance when the money spigot tightens.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which is most likely a true SIGNAL?',
        options: [
          { id: 'a', text: 'Celebrity endorses a meme stock' },
          { id: 'b', text: 'Company restates three years of revenue' },
          { id: 'c', text: 'Stock dips 0.4% on a quiet Friday' },
          { id: 'd', text: 'CEO posts a motivational quote' },
        ],
        correctId: 'b',
        explanation:
          'Restated financials mean past data was wrong—investors must rebuild their whole view. That is material.',
      },
      {
        id: 'q2',
        question: 'When the Fed RAISES rates, what usually happens first?',
        options: [
          { id: 'a', text: 'Borrowing gets cheaper' },
          { id: 'b', text: 'Borrowing gets more expensive' },
          { id: 'c', text: 'All stocks guaranteed to double' },
          { id: 'd', text: 'The SEC shuts down' },
        ],
        correctId: 'b',
        explanation:
          'Higher rates lift loan and card costs. That can slow spending and pressure high-growth stocks.',
      },
      {
        id: 'q3',
        question: 'Rates DOWN, money cheap—stocks often:',
        options: [
          { id: 'a', text: 'Rise as investors chase growth' },
          { id: 'b', text: 'Always go to zero' },
          { id: 'c', text: 'Stop trading forever' },
          { id: 'd', text: 'Only affect bonds, never stocks' },
        ],
        correctId: 'a',
        explanation:
          'Cheaper money can boost business investment and risk appetite. It is a tailwind, not a promise.',
      },
      {
        id: 'q4',
        question: 'A flashy PR campaign with no earnings change is usually:',
        options: [
          { id: 'a', text: 'Noise' },
          { id: 'b', text: 'Guaranteed signal' },
          { id: 'c', text: 'A 10-K filing' },
          { id: 'd', text: 'A Fed rate cut' },
        ],
        correctId: 'a',
        explanation:
          'PR builds vibes. Without cash-flow impact, treat it as noise unless numbers back it up.',
      },
      {
        id: 'q5',
        question: 'After a surprise Fed hike, a balanced move is often:',
        options: [
          { id: 'a', text: 'Stay 100% in the riskiest tech names' },
          { id: 'b', text: 'Shift some money toward safer savings or bonds' },
          { id: 'c', text: 'Delete the investing app' },
          { id: 'd', text: 'Only buy based on TikTok' },
        ],
        correctId: 'b',
        explanation:
          'Higher rates reward patience and safer assets. Reducing extreme risk exposure is a classic macro response.',
      },
    ],
    rewards: { xp: 135, bamboo: 18 },
  },

  {
    id: 'mh-3-market-psychology',
    moduleId: 'markets-headlines',
    simulatorType: 'market-panic-hold',
    title: 'Fear, Greed & Market Bubbles',
    estimatedMinutes: 9,
    hook: {
      question:
        'Everyone\'s FOMO-buying a trendy stock. Three months later it\'s down 60%. Why do smart people still fall for bubbles?',
      philMessage:
        'Markets are humans on a group chat. Greed inflates bubbles; fear causes panic sells at the worst time. Your edge is staying calm when the feed is screaming.',
    },
    concepts: [
      {
        id: 'greed_bubbles',
        emoji: '🫧',
        title: 'Greed Phase = Bubbles',
        body: 'When prices only go up, FOMO kicks in. People buy because everyone else is buying—not because they read the business. Prices detach from reality until something pops the hype.',
        realWorldExample:
          'A random app stock triples in weeks on "AI" tweets with no real revenue. Early sellers win; late FOMO buyers often eat the crash.',
      },
      {
        id: 'fear_panic',
        emoji: '😱',
        title: 'Fear Phase = Panic',
        body: 'Bad headlines hit and brains scream "sell now." Panic selling turns a temporary screen drop into a permanent loss—especially if the underlying company is still solid.',
        realWorldExample:
          'Markets drop 15% in a month. Headlines say "crash." Investors who sold at the bottom missed the rebound over the next year.',
      },
      {
        id: 'loss_aversion',
        emoji: '🧠',
        title: 'The Brain Trap: Losses Hurt More',
        body: 'Studies show losing $100 feels about twice as bad as gaining $100 feels good. That is why people dump stocks at the bottom—they are trying to stop the pain, not make a smart plan.',
        realWorldExample:
          'Your portfolio shows red numbers. Panic says sell. A calm plan says: "Is the business broken, or is everyone just scared?"',
      },
      {
        id: 'stoic_clearance',
        emoji: '🏷️',
        title: 'Crashes Can Be Clearance Sales',
        body: 'If you believe in a company\'s long-term cash flows, lower prices can be a chance to buy more—not flee. That takes discipline when CNBC sounds like a horror movie.',
        realWorldExample:
          'During a broad selloff, quality brands trade cheaper. Patient owners who held—or added—often recovered faster than panic sellers.',
      },
    ],
    simulator: {
      title: 'Flash Crash Drill',
      intro:
        'A sudden 15% market drop hits your paper portfolio. You have seconds to choose: panic sell, hold, or buy the dip.',
      scenario:
        'Breaking news flashes red. Your virtual balance is down. What does your brain want to do—and what would a stoic owner do?',
      meters: [
        { id: 'discipline', label: 'Emotional Discipline', emoji: '🧘', initial: 50, color: 'blue' },
        { id: 'portfolio', label: 'Portfolio Value', emoji: '💰', initial: 70, color: 'green' },
      ],
      rounds: [],
      endMessage:
        'The market is a mood ring. Panic locks in losses; patience—and buying quality on sale—wins the long game.',
    },
    quiz: [
      {
        id: 'q1',
        question: 'A bubble usually forms when:',
        options: [
          { id: 'a', text: 'Everyone reads 10-K risk factors' },
          { id: 'b', text: 'Prices rise mostly on hype and FOMO' },
          { id: 'c', text: 'The Fed always cuts rates' },
          { id: 'd', text: 'Companies stop marketing' },
        ],
        correctId: 'b',
        explanation:
          'Bubbles are social. Prices run ahead of business reality until the hype breaks.',
      },
      {
        id: 'q2',
        question: 'Panic selling at the bottom often:',
        options: [
          { id: 'a', text: 'Locks in losses before a recovery' },
          { id: 'b', text: 'Guarantees you beat the market' },
          { id: 'c', text: 'Is always the smartest move' },
          { id: 'd', text: 'Only happens to beginners' },
        ],
        correctId: 'a',
        explanation:
          'Selling in fear turns a paper loss real. Recoveries hurt most if you are in cash on the way back up.',
      },
      {
        id: 'q3',
        question: 'Loss aversion means people tend to:',
        options: [
          { id: 'a', text: 'Feel losses more painfully than equal gains feel good' },
          { id: 'b', text: 'Never care about money' },
          { id: 'c', text: 'Always buy at the top' },
          { id: 'd', text: 'Ignore all news' },
        ],
        correctId: 'a',
        explanation:
          'Our brains are wired to avoid pain. That pushes panic sells even when the business is fine.',
      },
      {
        id: 'q4',
        question: 'During a broad crash, a stoic investor might:',
        options: [
          { id: 'a', text: 'Sell everything immediately' },
          { id: 'b', text: 'Hold or add to quality names they understand' },
          { id: 'c', text: 'Only follow random social posts' },
          { id: 'd', text: 'Never look at prices again and delete all records' },
        ],
        correctId: 'b',
        explanation:
          'If the business is still strong, lower prices can be opportunity—not doom.',
      },
      {
        id: 'q5',
        question: 'Headline: "Market crashes 15%!" Best first step?',
        options: [
          { id: 'a', text: 'Ask if the business you own is actually broken' },
          { id: 'b', text: 'Sell before reading anything' },
          { id: 'c', text: 'Assume every company is bankrupt' },
          { id: 'd', text: 'Borrow money to double down blindly' },
        ],
        correctId: 'a',
        explanation:
          'Separate mood from facts. Headlines sell fear; owners check whether cash flows really changed.',
      },
    ],
    rewards: { xp: 140, bamboo: 20 },
  },
];
