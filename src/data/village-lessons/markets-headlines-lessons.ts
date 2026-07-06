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
        body: 'Stock prices do not bounce around for no reason — they are the market\'s live estimate of a company\'s future, and they react within seconds when new information drops. An earnings surprise, a lawsuit, a product flop, or a Fed decision instantly makes thousands of investors redo the same math: how much money will this company make now, and how risky does it feel to own? A price move is that collective recalculation. When you learn to ask "what did this news change about future profits or risk?", headlines stop feeling random and start being readable.',
        realWorldExample:
          'A sneaker brand announces a hot collab. The stock jumps before the drop even hits stores because traders are betting on future sales—not yesterday\'s vibes.',
      },
      {
        id: 'expectation_trap',
        emoji: '🎯',
        title: 'The Expectation Trap (Hype vs. Reality)',
        body: 'Here\'s the twist that confuses every beginner: a company can announce record profits and its stock can still crash. Why? Because the market does not grade the past — it grades reality against expectations. If analysts expected 30% growth and the company delivered "only" 20%, that gap is a disappointment even though 20% is objectively great. Expectations were already baked into the price before the news dropped. The price move you see is never about whether the news was good; it\'s about whether the news beat, matched, or missed what everyone had already bet on.',
        realWorldExample:
          'Bamboo Corp reports $20M profit—sounds huge. But Wall Street expected $25M. The stock dips because the headline was good, but the surprise was bad.',
      },
      {
        id: 'filings_truth',
        emoji: '📄',
        title: '10-Ks and 10-Qs: Skip the Commercial',
        body: 'Public companies can spin their marketing, but they cannot spin their SEC filings — lying there is a federal crime. The 10-K is the big annual check-up: audited financial statements, business strategy, and a brutally honest "Risk Factors" section where the company must confess everything that could go wrong. The 10-Q is its shorter quarterly cousin. Here\'s the pro move: skip the glossy cover pages and go straight to the boring legal text, because that\'s where the truth lives. Companies bury bad news in footnotes precisely because they know most people never read them.',
        realWorldExample:
          'A startup\'s Instagram looks perfect. In the 10-K risk section it admits: "We depend on one factory—if rent spikes, margins could collapse." That line can save your money.',
      },
      {
        id: 'pr_shield',
        emoji: '🛡️',
        title: 'The PR Sentiment Shield',
        body: 'Companies invest heavily in narrative for a reason: a beloved brand builds a forgiveness shield. When fans adore a CEO\'s viral posts and a company\'s story, they excuse missed deadlines, shrug off bad quarters, and keep buying the stock on vibes. That shield is real — and it\'s also exactly how investors get burned, because vibes don\'t pay dividends. Smart owners enjoy the story but audit the substance: is revenue actually growing? Are costs under control? What do the risk disclosures say? When narrative and numbers disagree, the numbers eventually win.',
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
        body: 'Every day the financial internet produces thousands of headlines, and almost none of them matter. The filter that separates investors from gamblers is one question: does this information change how much money the company will actually make? A key supplier going bankrupt, margins getting crushed, revenue being restated — that\'s signal, because it rewires the profit machine. Meme tweets, "worst Tuesday since March" headlines, and influencer hot takes are noise: loud today, forgotten next month. Train yourself to run every headline through that filter before letting it touch your decisions.',
        realWorldExample:
          'Factory parts cost 8% more → margins shrink. That is signal. CEO posts a gym selfie → stock "pops" 0.3%. That is noise.',
      },
      {
        id: 'fed_spigot',
        emoji: '🏛️',
        title: 'The Fed Controls the Money Spigot',
        body: 'The Federal Reserve is the U.S. central bank, and it controls the single most powerful dial in the economy: the benchmark interest rate that every other borrowing cost builds on. Its mandate is a balancing act — raise rates to cool inflation when prices run hot, lower them to support jobs and growth when the economy stalls. That dial reaches everything: mortgages, car loans, credit cards, business expansion, and stock prices. When borrowing gets expensive, growth stocks often slide; when money is cheap, risk assets can rip higher. This is why markets hang on every word the Fed chair says.',
        realWorldExample:
          'When rates jumped in 2022–2023, mortgage payments rose and many tech stocks fell hard—even some strong companies—because future profits were worth less at higher rates.',
      },
      {
        id: 'rate_seesaw',
        emoji: '⚖️',
        title: 'The Interest Rate Seesaw',
        body: 'Follow the chain reaction. Rates UP: loans cost more, so companies borrow less and expand slower, consumers cut big purchases, and suddenly a safe savings account paying 5% competes with risky stocks — so some investors rotate out of equities. Rates DOWN: borrowing is cheap, spending and investment heat up, savings accounts pay nothing, and money flows back toward stocks hunting for returns. The chain isn\'t instant — rate changes take months to ripple through the economy — but the direction shapes nearly everything. When you understand this transmission, Fed headlines become a map instead of noise.',
        realWorldExample:
          'A student with a variable-rate credit card feels a Fed hike in real life. A growth company planning a new factory might delay if loan rates spike.',
      },
      {
        id: 'macro_headlines',
        emoji: '📢',
        title: 'Reading Fed Headlines Without Panic',
        body: 'Fed-watching is a vocabulary game. "Hike" means tighter money, "cut" means easier money, "hold" means wait-and-see — but the richer signals hide in phrases like "inflation remains elevated" (more hikes may come) or "data dependent" (we haven\'t decided). Here\'s the key: markets price in expectations ahead of time, so they react to the surprise, not the headline verb. A rate hike everyone predicted can cause a rally if the Fed\'s tone sounds gentler than feared; a "hold" can trigger a selloff if the statement hints at future hikes. Read the gap between expected and delivered.',
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
        body: 'Greed spirals follow a script that has repeated for centuries, from tulip bulbs to meme stocks. Prices rise, winners post screenshots, and FOMO — fear of missing out — takes the wheel. People start buying not because they studied the business but because everyone around them is getting rich and sitting out feels unbearable. Each new buyer pushes prices higher, which recruits more buyers, until price has completely detached from what the company actually earns. The spiral always ends the same way: something pops the hype, and the people who bought on vibes are the ones holding the bag.',
        realWorldExample:
          'A random app stock triples in weeks on "AI" tweets with no real revenue. Early sellers win; late FOMO buyers often eat the crash.',
      },
      {
        id: 'fear_panic',
        emoji: '😱',
        title: 'Fear Phase = Panic',
        body: 'Fear spirals are greed spirals in reverse, and they move even faster. A scary headline hits, prices dip, and the ancient alarm system in your brain screams "get out NOW." Selling feels like safety — but panic selling converts a temporary screen drop into a permanent, locked-in loss, and it usually happens at exactly the worst price. The critical question in the moment is: did this news actually break the business, or did it just break the mood? If the company\'s profit machine is still intact, the drop is a storm to be weathered, not a building on fire.',
        realWorldExample:
          'Markets drop 15% in a month. Headlines say "crash." Investors who sold at the bottom missed the rebound over the next year.',
      },
      {
        id: 'loss_aversion',
        emoji: '🧠',
        title: 'The Brain Trap: Losses Hurt More',
        body: 'Nobel Prize-winning research by Kahneman and Tversky measured something wild about human wiring: losing $100 hurts roughly twice as much as gaining $100 feels good. This asymmetry — loss aversion — explains the most expensive mistake in investing: dumping stocks at the bottom of a crash. In that moment, sellers aren\'t executing a plan; they\'re paying any price to make the pain stop. The market transfers wealth from people who react to feelings to people who follow plans. You can\'t delete the bias — it\'s wired in — but naming it when it fires gives you the pause that saves you.',
        realWorldExample:
          'Your portfolio shows red numbers. Panic says sell. A calm plan says: "Is the business broken, or is everyone just scared?"',
      },
      {
        id: 'stoic_clearance',
        emoji: '🏷️',
        title: 'Crashes Can Be Clearance Sales',
        body: 'The stoic investor\'s edge is a mental reframe: if you genuinely believe in a company\'s long-term ability to make money, a lower price isn\'t a threat — it\'s a discount on something you already wanted to own more of. The business is the same; only the price tag changed. Warren Buffett\'s famous line captures it: "Be fearful when others are greedy, and greedy when others are fearful." Living that advice is brutally hard when financial news sounds like a horror movie, which is why the edge belongs to investors with written plans, automatic contributions, and the discipline to ignore the soundtrack.',
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
