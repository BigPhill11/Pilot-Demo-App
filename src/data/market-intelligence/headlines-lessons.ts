/**
 * Markets & Headlines — full MI lesson payloads (8 lessons).
 * Rebuilt from stubs; each lesson follows the Hook → Done 7-step format.
 */

import type { MILesson } from '@/types/mi-lesson';

const BASE = '/market-intelligence/markets-headlines';

function img(lessonId: string, name: string, alt: string, caption?: string) {
  return { src: `${BASE}/${lessonId}/${name}.png`, alt, caption };
}

// ─────────────────────────────────────────────
// MH-1  Headline Decoder
// ─────────────────────────────────────────────
export const headlineDecoderLesson: MILesson = {
  id: 'mh-headline-decoder',
  moduleId: 'headline-decoder',
  section: 'markets-headlines',
  title: 'Headline Decoder',
  estimatedMinutes: 10,
  intro: {
    hook:
      'The notification says "Market crashes 3% on Fed news." Your group chat explodes. Your aunt texts you to sell everything. Then the market closes up 1% by end of day. What just happened?',
    philMessage:
      'Headlines are written to grab attention, not to help you invest. Once you learn how to read the anatomy of a financial headline, panic becomes pattern recognition.',
    heroImage: img('headline-decoder', 'hero', 'Panda reading a tabloid-style headline on a phone screen'),
  },
  coreConcepts: [
    {
      title: 'Headline Anatomy',
      explanation:
        'A financial headline has three parts: the subject (company or market), the verb (action word — "surges," "plunges," "warns"), and the context (reason or number). The verb does most of the emotional work, which is why writers pick dramatic ones even when the move is small.',
      example:
        '"Tech giant surges 4%" sounds big, but 4% in a single session is actually pretty normal for a high-volatility stock.',
      keyTerms: ['Headline'],
      visual: img('headline-decoder', 'concept-anatomy', 'Diagram labeling headline parts: subject, verb, context'),
    },
    {
      title: 'Active Verbs That Mislead',
      explanation:
        'Words like "plunges," "soars," "crashes," and "tanks" make small moves sound catastrophic or miraculous. A 2% daily move is completely normal for a single stock. Context — like what the market did that same day — usually makes the move look boring.',
      example:
        '"Coffee chain plunges 2%" might mean the whole sector sold off 3%, making the company an outperformer.',
      keyTerms: ['Percent change'],
      visual: img('headline-decoder', 'concept-verbs', 'Infographic showing "plunges" vs actual percent changes'),
    },
    {
      title: 'Hidden Context',
      explanation:
        'The most important number in a headline is often missing: what was expected. If a company "beat earnings" by $0.01 but guided the next quarter lower, the stock drops — and the headline makes it look like good news went wrong.',
      example:
        '"Retailer beats earnings — stock falls 5%." The miss was on forward guidance, not the quarter that was just reported.',
      keyTerms: ['Guidance'],
      visual: img('headline-decoder', 'concept-context', 'Diagram: actual result vs expected, guidance arrow pointing down'),
    },
  ],
  tryActivity: {
    type: 'headline-decoder',
    title: 'Signal or Noise?',
    description: 'Read each headline. Call it Signal (matters to investors) or Noise (attention-grabbing but minor).',
    headlines: [
      {
        id: 'hd1',
        text: 'Fed holds rates steady, signals two cuts possible by year-end',
        signalPhrase: 'signals two cuts possible by year-end',
        correctCall: 'signal',
        feedback: 'Forward guidance from the Fed moves bond prices and the whole market. This is real signal.',
      },
      {
        id: 'hd2',
        text: 'Apple stock dips 0.8% on slow news day',
        signalPhrase: 'slow news day',
        correctCall: 'noise',
        feedback: 'Less than 1% on no catalyst is just random daily volatility. Noise.',
      },
      {
        id: 'hd3',
        text: 'Streaming giant loses 2 million subscribers in Q2, misses estimates by 15%',
        signalPhrase: 'misses estimates by 15%',
        correctCall: 'signal',
        feedback: 'A 15% subscriber miss reveals the business model is under pressure. Signal.',
      },
      {
        id: 'hd4',
        text: 'CEO of sneaker brand posts gym selfie, stock "pops"',
        signalPhrase: '"pops"',
        correctCall: 'noise',
        feedback: 'Social media moments don\'t affect fundamentals. The quotes around "pops" hint at sarcasm. Noise.',
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Don\'t trade on headlines',
      description:
        'The single most expensive thing retail investors do is react to scary headlines. Every time you read one, pause and ask: is this new information, or is it a dramatic retelling of something already priced in?',
      scenario: 'You see "Inflation highest since 2022 — markets drop." Before touching your portfolio, ask: was this expected? (Usually yes.)',
      visual: img('headline-decoder', 'connect-pf', 'Panda at laptop looking calm while market news flashes'),
    },
    career: {
      title: 'Financial Reporter',
      description:
        'Financial journalists write stories that balance accuracy with readability. The best ones include the "so what" — why the number matters. Learning to critique headlines trains you to write better ones.',
      role: 'Financial Reporter',
      skills: ['Research', 'Plain-English writing', 'Data literacy'],
      visual: img('headline-decoder', 'connect-career', 'Panda journalist at desk writing a headline'),
    },
  },
  flashcards: [
    { term: 'Headline', definition: 'A short news title designed to attract readers; financial headlines often use dramatic verbs for small moves.', philsAnalogy: 'Like a bamboo shoot labeled "skyscraper" — technically alive, but let\'s not get ahead of ourselves.' },
    { term: 'Percent change', definition: 'How much an asset moved up or down, expressed as a percentage of its starting price.', philsAnalogy: 'A 2% daily move in a stock is normal. A 2% move in your GPA is a different story.' },
    { term: 'Guidance', definition: 'A company\'s own forecast for future revenue, earnings, or growth; often more important to investors than past results.', philsAnalogy: 'The score matters less than how you expect to play next season.' },
    { term: 'Context', definition: 'The missing information that changes the meaning of a number — like what analysts expected or what the broader market did.', philsAnalogy: 'Getting a B on a test where everyone else failed an A is context.' },
  ],
  quiz: [
    {
      question: 'What does "guidance" mean in a financial headline?',
      options: ["A company's forecast for future performance", 'The Fed\'s interest rate decision', 'A stock analyst\'s price target', 'The percent a stock moved today'],
      correctIndex: 0,
      explanation: 'Guidance is forward-looking: what the company itself expects to earn or grow next quarter.',
    },
    {
      question: 'A headline says a stock "plunges 2.5%." What context is missing?',
      options: ['What the CEO said', 'How the stock performed relative to the market that day', 'The company\'s ticker symbol', 'The stock\'s price 10 years ago'],
      correctIndex: 1,
      explanation: 'Without knowing if the broader market fell 3%, a 2.5% drop looks like bad news but is actually an outperform.',
    },
    {
      question: 'A company beats earnings estimates. Its stock still falls. What likely caused this?',
      options: ['The news was already priced in', 'The company lowered its forward guidance', 'The CEO sold shares', 'All of the above are possible'],
      correctIndex: 3,
      explanation: 'Any of these can cause a "beat but drop." Forward guidance misses are the most common culprit.',
    },
    {
      question: 'Which of these is most likely to be a TRUE market-moving signal?',
      options: ['A celebrity tweets about a stock', 'The Fed announces an emergency rate cut', 'A CEO posts a vacation photo', 'A stock drops 0.5% on a slow Friday'],
      correctIndex: 1,
      explanation: 'Emergency Fed actions are rare, unexpected, and fundamentally change the cost of money across the economy.',
    },
  ],
  rewards: { bamboo: 15, xp: 3 },
};

// ─────────────────────────────────────────────
// MH-2  Noise vs. Signal
// ─────────────────────────────────────────────
export const noiseVsSignalLesson: MILesson = {
  id: 'mh-noise-vs-signal',
  moduleId: 'noise-vs-signal',
  section: 'markets-headlines',
  title: 'Noise vs. Signal',
  estimatedMinutes: 12,
  intro: {
    hook:
      'Every trading day, roughly 10,000 financial news stories get published. Professional investors read maybe 20. The rest is noise. But which 20 actually matter?',
    philMessage:
      'Filtering information is the skill most investors never build. Here\'s how to tell the difference between what moves markets and what just fills your feed.',
    heroImage: img('noise-vs-signal', 'hero', 'Panda at a desk with a huge stack of newspapers and a small golden envelope'),
  },
  coreConcepts: [
    {
      title: 'Why Most News Doesn\'t Move Prices',
      explanation:
        'Markets are fast. By the time a news story hits your phone, professional traders have already priced it in — often seconds after the announcement. Retail investors reacting to old news are almost always too late.',
      example:
        'Apple\'s iPhone launch date leaks on a tech blog. Institutional traders bought the rumor weeks ago. When the story hits mainstream news, the reaction is already done.',
      keyTerms: ['Priced in'],
      visual: img('noise-vs-signal', 'concept-priced-in', 'Timeline showing news release vs. price reaction'),
    },
    {
      title: 'The 5% That Actually Matters',
      explanation:
        'True signals share three traits: they are unexpected, they change a company\'s future cash flows, or they reveal that current assumptions were wrong. Surprises in earnings, regulatory shifts, and unexpected macro data are the loudest signals.',
      example:
        'A biotech drug trial failing overnight is a true signal — it changes expected revenues fundamentally. A CEO changing hairstyles is not.',
      keyTerms: ['Surprise'],
      visual: img('noise-vs-signal', 'concept-signal', 'Venn diagram: unexpected + changes cash flows + wrong assumptions = true signal'),
    },
    {
      title: 'Building Your Filter',
      explanation:
        'A simple filter: ask three questions before reacting to any news. (1) Did the market already know this? (2) Does it change how much money the company will make? (3) Will it matter six months from now? If all three are "no," it\'s noise.',
      example:
        'A retailer misses one quarter due to a hurricane. Is it unexpected? Partly. Does it change long-run earnings? No. Will it matter in six months? Probably not.',
      keyTerms: ['Filter'],
      visual: img('noise-vs-signal', 'concept-filter', '3-question decision tree for filtering news'),
    },
  ],
  tryActivity: {
    type: 'term-classify',
    title: 'Signal or Noise?',
    description: 'Sort each news event into Signal or Noise using the three-question filter.',
    categories: [
      { id: 'signal', label: 'Signal — Act or note' },
      { id: 'noise', label: 'Noise — Ignore' },
    ],
    terms: [
      { id: 't1', label: 'Fed unexpectedly hikes by 0.75%', correctCategory: 'signal' },
      { id: 't2', label: 'Celebrity endorses a meme stock', correctCategory: 'noise' },
      { id: 't3', label: 'Company restates revenue for three years', correctCategory: 'signal' },
      { id: 't4', label: 'Stock has "worst day since Tuesday"', correctCategory: 'noise' },
      { id: 't5', label: 'FDA rejects blockbuster drug application', correctCategory: 'signal' },
      { id: 't6', label: 'CEO posts motivational quote on LinkedIn', correctCategory: 'noise' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Your personal noise filter',
      description:
        'The same filter works for your own finances. "Inflation is up" is noise if you\'re 30 years from retirement. A pension fund going bankrupt in your state is a signal. Match the time horizon of the news to your own.',
      scenario: 'A friend says "I heard crypto is crashing — should I panic?" First question: do you even own crypto? Filter first.',
      visual: img('noise-vs-signal', 'connect-pf', 'Panda giving a thumbs up while ignoring a chaotic news feed'),
    },
    career: {
      title: 'Buy-Side Analyst',
      description:
        'At a hedge fund or mutual fund, analysts read hundreds of stories daily and must decide within minutes what matters. Building a fast, disciplined filter is one of the most valued skills in the industry.',
      role: 'Buy-Side Analyst',
      skills: ['Critical reading', 'Macro awareness', 'Fast synthesis'],
      visual: img('noise-vs-signal', 'connect-career', 'Panda analyst with Bloomberg terminal sorting information'),
    },
  },
  flashcards: [
    { term: 'Priced in', definition: 'When a stock\'s current price already reflects an expected event, leaving little room for reaction when it happens.', philsAnalogy: 'Everybody already knew the bamboo harvest was good. The price moved the day the rumor started, not the day it was confirmed.' },
    { term: 'Surprise', definition: 'New information that differs from what the market expected; the key driver of sharp price moves.', philsAnalogy: 'If Phil announces pizza at a bamboo summit, that\'s a surprise. Expected news is not news.' },
    { term: 'Filter', definition: 'A mental or analytical framework for deciding quickly which information deserves attention.', philsAnalogy: 'A bamboo farmer doesn\'t panic every time it rains. They know which weather is a problem and which is Tuesday.' },
    { term: 'Cash flows', definition: 'The actual money a company generates from its operations; the underlying driver of long-term stock value.', philsAnalogy: 'Profit on paper is the scoreboard. Cash flows are whether money actually hit the bank.' },
  ],
  quiz: [
    {
      question: 'What does "priced in" mean?',
      options: ["The stock's price includes expected future events", 'A stock is expensive relative to earnings', 'An analyst has set a price target', 'The Fed has set a benchmark rate'],
      correctIndex: 0,
      explanation: 'Priced in means the market already moved when the event was expected — the announcement itself may cause little reaction.',
    },
    {
      question: 'Which news event is most likely a true signal?',
      options: ["A CEO's twitter goes viral", 'A company beats sales expectations by 20%', 'A stock moves 1% on low volume', 'A financial influencer predicts a crash'],
      correctIndex: 1,
      explanation: 'A 20% sales beat changes assumptions about how fast the business is growing — that\'s new, material information.',
    },
    {
      question: 'An investor hears that a company restated its earnings. This is a signal because:',
      options: ['It changed the CEO', 'It means past financial statements were wrong', 'The stock price dropped', 'An analyst downgraded the stock'],
      correctIndex: 1,
      explanation: 'A restatement means historical data was incorrect — it forces a reassessment of every prior assumption about the company.',
    },
    {
      question: 'Which question best separates signal from noise?',
      options: ['Is this trending on social media?', 'Does this change how much money the company will make?', 'Did the stock move at least 5%?', 'Is the CEO commenting on the news?'],
      correctIndex: 1,
      explanation: 'The core signal test: does this information change the company\'s actual future earnings or cash flows?',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// MH-3  The Earnings Call
// ─────────────────────────────────────────────
export const earningsCallLesson: MILesson = {
  id: 'mh-earnings-call',
  moduleId: 'the-earnings-call',
  section: 'markets-headlines',
  title: 'The Earnings Call',
  estimatedMinutes: 15,
  intro: {
    hook:
      'Four times a year, every public company goes live on the phone with Wall Street analysts. The CEO and CFO talk for 60 minutes. Stock prices move 10, 20, even 30% based on what they say. This is the earnings call.',
    philMessage:
      'Earnings calls are where companies tell the truth — or try hard not to. Learning to read both the numbers and the words is one of the most valuable skills in investing.',
    heroImage: img('earnings-call', 'hero', 'Panda CFO on a conference call, charts on screen behind'),
  },
  coreConcepts: [
    {
      title: 'Report Structure: What to Look At',
      explanation:
        'An earnings report has two parts: the press release (backward-looking numbers) and the call transcript (forward-looking commentary). Investors care most about revenue growth, earnings per share (EPS), and guidance. The press release announces them; the call explains them.',
      example:
        'A food delivery app posts $1.2B in revenue (+18% year-over-year), beats EPS by $0.04, but on the call says "we\'re investing heavily in new markets." Guidance cut. Stock drops.',
      keyTerms: ['EPS'],
      visual: img('earnings-call', 'concept-structure', 'Infographic: press release sections vs. call sections'),
    },
    {
      title: 'Numbers That Actually Matter',
      explanation:
        'Not all revenue is equal. Recurring revenue (subscriptions) is worth more than one-time sales. Gross margin tells you if the core business is profitable before overhead. Free cash flow (FCF) tells you if the company actually generates real money.',
      example:
        'A SaaS company with 80% gross margins growing 30% is valued much higher than a hardware retailer with 15% margins growing 5% — even if their revenues are similar.',
      keyTerms: ['Gross margin'],
      visual: img('earnings-call', 'concept-numbers', 'Side-by-side of recurring vs one-time revenue, gross margin comparison'),
    },
    {
      title: 'Reading Between the Lines of Guidance',
      explanation:
        'Guidance is a company\'s own estimate for next quarter. When companies "guide down" (lower expectations), stocks often fall sharply even on a strong quarter. When they raise guidance, it signals confidence and stocks often pop. Language matters: "headwinds" = problem, "visibility" = certainty, "investing for growth" = spending more, profits later.',
      example:
        '"We see some macro headwinds affecting consumer demand in Q3." Translation: next quarter will be weaker.',
      keyTerms: ['Guidance'],
      visual: img('earnings-call', 'concept-guidance', 'Glossary card with management language and real translations'),
    },
  ],
  tryActivity: {
    type: 'line-item-sort',
    title: 'Earnings Report Builder',
    description: 'Sort each item into the right section of an earnings report.',
    buckets: [
      { id: 'press', label: 'Press Release' },
      { id: 'call', label: 'Conference Call' },
      { id: 'neither', label: 'Neither (Noise)' },
    ],
    items: [
      { id: 'i1', label: 'EPS of $1.24 vs. $1.19 expected', correctBucket: 'press' },
      { id: 'i2', label: 'CEO discusses strategy for new markets', correctBucket: 'call' },
      { id: 'i3', label: 'Analyst asks about management\'s confidence in Q4', correctBucket: 'call' },
      { id: 'i4', label: 'Revenue of $4.2B, +12% year-over-year', correctBucket: 'press' },
      { id: 'i5', label: 'Stock price on the day of the call', correctBucket: 'neither' },
      { id: 'i6', label: 'Q3 gross margin: 44.2%', correctBucket: 'press' },
      { id: 'i7', label: 'CFO lowers full-year EPS guidance', correctBucket: 'call' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Read before you invest',
      description:
        'Before buying any individual stock, read the last earnings call transcript. It\'s public and free on investor relations pages. Ten minutes of reading tells you more than 100 financial headlines.',
      scenario: 'You\'re thinking of buying shares in a fast-food chain. Their IR page has the full Q2 transcript. Read it. Free. Takes 15 minutes.',
      visual: img('earnings-call', 'connect-pf', 'Panda reading a transcript on a tablet at a café'),
    },
    career: {
      title: 'Sell-Side Analyst',
      description:
        'Sell-side analysts cover specific industries and write research reports after each earnings call. They model the company\'s financials, make price-target recommendations, and often ask questions during the live call.',
      role: 'Sell-Side Analyst',
      skills: ['Financial modeling', 'Earnings forecasting', 'Industry research'],
      visual: img('earnings-call', 'connect-career', 'Panda analyst at Bloomberg terminal modeling earnings'),
    },
  },
  flashcards: [
    { term: 'EPS', definition: 'Earnings Per Share — net income divided by shares outstanding; the most commonly cited profit metric.', philsAnalogy: 'If the bamboo grove earned $100 and there are 10 farmers, each farmer\'s share is $10. That\'s EPS.' },
    { term: 'Gross margin', definition: 'Revenue minus cost of goods sold, expressed as a percent; shows how profitable the core product is.', philsAnalogy: 'If Phil sells bamboo for $10 and it cost $4 to grow, gross margin is 60%. What\'s left for the office and Phil\'s salary.' },
    { term: 'Guidance', definition: 'A company\'s own forecast for next quarter or year; forward-looking and often more important than past results.', philsAnalogy: 'Reporting this quarter is looking backward. Guidance is where the bamboo harvest is going next season.' },
    { term: 'Free cash flow', definition: 'Cash generated from operations minus capital expenditures; the truest measure of financial health.', philsAnalogy: 'Profit is an accounting number. Free cash flow is actual money you can spend, save, or return to shareholders.' },
  ],
  quiz: [
    {
      question: 'What is EPS?',
      options: ['Earnings Per Share', 'Expected Price Spread', 'Equity Position Score', 'Estimated Profit Scale'],
      correctIndex: 0,
      explanation: 'EPS = Net Income ÷ Shares Outstanding. It\'s the most widely cited profit metric in earnings reports.',
    },
    {
      question: 'A company beats EPS but stocks drops. The most likely explanation is:',
      options: ['The market is closed', 'The company cut forward guidance', 'The CEO sounded nervous', 'Revenue was above estimates'],
      correctIndex: 1,
      explanation: 'Guidance cuts signal the company expects weaker future performance — more important to investors than a single quarter.',
    },
    {
      question: 'In an earnings call, "headwinds" usually signals:',
      options: ['Strong growth ahead', 'Upcoming challenges or slower growth', 'New product launches', 'A dividend increase'],
      correctIndex: 1,
      explanation: 'Management uses "headwinds" as a soft warning that some external force is making it harder to hit targets.',
    },
    {
      question: 'Why do investors care about gross margin more than total revenue?',
      options: ['Revenue includes taxes', 'Gross margin shows how profitable the core product is', 'Revenue is easy to fake', 'Gross margin is audited, revenue is not'],
      correctIndex: 1,
      explanation: 'Revenue can grow while the business becomes less profitable. Gross margin shows whether each additional dollar of sales is actually worth something.',
    },
  ],
  rewards: { bamboo: 25, xp: 5 },
};

// ─────────────────────────────────────────────
// MH-4  Market Mood
// ─────────────────────────────────────────────
export const marketMoodLesson: MILesson = {
  id: 'mh-market-mood',
  moduleId: 'market-mood',
  section: 'markets-headlines',
  title: 'Market Mood',
  estimatedMinutes: 10,
  intro: {
    hook:
      'March 2020: the S&P 500 drops 34% in 33 days. Everyone is panic-selling. Then it bottoms out and doubles over the next 18 months. The people who bought when the headlines were most terrifying made the most money.',
    philMessage:
      'The market is a mood ring for millions of investors. Learning to read the mood — and to not get swept up in it — is one of the most powerful edges in finance.',
    heroImage: img('market-mood', 'hero', 'Panda standing calm while a crowd of animals run in all directions'),
  },
  coreConcepts: [
    {
      title: 'Fear & Greed Index',
      explanation:
        'CNN\'s Fear & Greed Index measures seven market signals (volatility, momentum, put/call ratio, junk bond demand, etc.) on a 0–100 scale. Below 25 = extreme fear. Above 75 = extreme greed. Historically, extreme fear is when long-term investors find the best prices.',
      example:
        'In October 2022, the index hit 17 (extreme fear). The S&P 500 bottomed that month and rose 25% over the next 12 months.',
      keyTerms: ['Fear & Greed'],
      visual: img('market-mood', 'concept-fng', 'Fear & Greed dial showing zones 0-100'),
    },
    {
      title: 'Why Crashes Overshoot',
      explanation:
        'When fear peaks, even fundamentally strong stocks get sold because investors need cash, are forced out of margin positions, or simply panic. This causes prices to fall far below rational value — which is exactly why crashes create buying opportunities for patient investors.',
      example:
        'Amazon dropped 95% from its 2000 peak during the dot-com crash. It was still a real business. Investors who held (or bought at the bottom) made many multiples on their investment by 2010.',
      keyTerms: ['Overshoot'],
      visual: img('market-mood', 'concept-overshoot', 'Chart showing rational value line vs price crash overshoot'),
    },
    {
      title: 'Contrarian Basics',
      explanation:
        'Contrarian investing is not about being different for its own sake — it\'s about having the emotional discipline to act rationally when the crowd is irrational. The simple contrarian rule: buy quality when everyone else is selling; be cautious when everyone else is euphoric.',
      example:
        '"Be fearful when others are greedy and greedy when others are fearful." — Warren Buffett. He deployed billions in 2008 when banks were failing.',
      keyTerms: ['Contrarian'],
      visual: img('market-mood', 'concept-contrarian', 'Panda walking toward a sale sign while others run away'),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Mood Check',
    description: 'Given the market sentiment scenario, pick the investor move that aligns with contrarian logic.',
    rounds: [
      {
        id: 'r1',
        prompt: 'The Fear & Greed index hits 12 (extreme fear). Major banks are on the news every hour. What does a contrarian investor do?',
        options: [
          { id: 'a', label: 'Sell everything and wait for clarity', feedback: 'That\'s the crowd move. Contrarians buy when others are selling panic-driven lows.' },
          { id: 'b', label: 'Add to quality positions at lower prices', feedback: 'Correct. Extreme fear often means quality companies are temporarily underpriced.' },
          { id: 'c', label: 'Wait for the index to reach 50 to act', feedback: 'By the time the fear passes, the best prices are already gone.' },
          { id: 'd', label: 'Short the market to profit from the decline', feedback: 'Timing a short at the exact bottom is extremely difficult. Buying quality works better long-term.' },
        ],
      },
      {
        id: 'r2',
        prompt: 'The Fear & Greed index hits 87 (extreme greed). Friends are all talking about getting rich quick. What does a contrarian investor do?',
        options: [
          { id: 'a', label: 'Jump in — everyone is making money', feedback: 'The crowd being euphoric is historically when the most risk has built up.' },
          { id: 'b', label: 'Ignore it entirely and do nothing', feedback: 'Reasonable, but a contrarian also takes this as a signal to reduce risk or avoid new positions.' },
          { id: 'c', label: 'Be cautious, consider trimming overextended positions', feedback: 'Correct. Extreme greed signals that valuations may have stretched far ahead of reality.' },
          { id: 'd', label: 'Invest your life savings', feedback: 'This is exactly when historically the worst entries occur. Patience beats FOMO.' },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Don\'t time; stay invested',
      description:
        'The data is clear: missing the 10 best trading days in any 20-year period cuts your returns roughly in half. Those 10 days almost always come during periods of extreme fear. The best protection is staying invested and not reacting to mood.',
      scenario: 'Markets drop 15% in a month. Your $5,000 portfolio is now $4,250. Do you sell? History says the investors who didn\'t are the ones who ended up ahead.',
      visual: img('market-mood', 'connect-pf', 'Chart showing investor who stayed in vs. investor who sold at the bottom'),
    },
    career: {
      title: 'Sentiment Trader / Behavioral Economist',
      description:
        'Some professionals focus specifically on measuring and trading market sentiment — using options data, put/call ratios, and survey data. Behavioral economics studies why investors act irrationally and how those patterns can be anticipated.',
      role: 'Behavioral Economist',
      skills: ['Behavioral finance', 'Market data analysis', 'Emotional pattern recognition'],
      visual: img('market-mood', 'connect-career', 'Panda economist studying crowd behavior graphs'),
    },
  },
  flashcards: [
    { term: 'Fear & Greed', definition: 'A 0–100 market sentiment gauge; low = extreme fear (historically a buying opportunity), high = extreme greed (a caution signal).', philsAnalogy: 'The bamboo market feels scariest right before the biggest harvest. That\'s when prices are lowest.' },
    { term: 'Overshoot', definition: 'When prices fall (or rise) further than fundamentals justify due to emotional selling (or buying).', philsAnalogy: 'A friend drops their phone. They\'re convinced it\'s destroyed. But it just has a scratch. Overshoot.' },
    { term: 'Contrarian', definition: 'An investor who acts opposite to the crowd — buying when others panic-sell and being cautious when others are euphoric.', philsAnalogy: 'Everyone else is fleeing the bamboo forest fire. Phil checks the wind, sees it\'s just a small patch, and buys the cleared land.' },
    { term: 'Volatility', definition: 'The degree of price fluctuation in a market or asset; high volatility means large swings in both directions.', philsAnalogy: 'A calm bamboo grove barely sways. A volatile one whips around in the wind — same grove, different weather.' },
  ],
  quiz: [
    {
      question: 'A Fear & Greed index of 12 means:',
      options: ['Markets are at record highs', 'Investors are in extreme fear mode', 'A bear market is guaranteed', 'The Fed is cutting rates'],
      correctIndex: 1,
      explanation: 'Values below 25 indicate extreme fear — historically correlated with better future returns, not worse.',
    },
    {
      question: 'Why do crashes often overshoot fair value?',
      options: ['Companies become worthless', 'Forced selling, margin calls, and panic drive prices past rational levels', 'Regulators set prices too low', 'Trading algorithms always overshoot'],
      correctIndex: 1,
      explanation: 'Forced selling by margin-called and panicking investors creates price pressure beyond what fundamentals justify.',
    },
    {
      question: 'A contrarian investor sees the Fear & Greed index at 91. Their most likely move is to:',
      options: ['Buy as much as possible', 'Be cautious and avoid adding new positions', 'Sell their entire portfolio', 'Take out a loan to invest more'],
      correctIndex: 1,
      explanation: 'Extreme greed historically precedes pullbacks. A contrarian reduces risk when everyone else is euphoric.',
    },
    {
      question: 'Missing the 10 best trading days in a 20-year period typically:',
      options: ['Barely affects returns', 'Reduces returns by roughly half', 'Doubles returns by avoiding volatility', 'Only matters for bonds'],
      correctIndex: 1,
      explanation: 'The 10 best days cluster around periods of maximum fear. Selling and missing them is extremely costly long-term.',
    },
  ],
  rewards: { bamboo: 15, xp: 3 },
};

// ─────────────────────────────────────────────
// MH-5  Product Launch Hype
// ─────────────────────────────────────────────
export const productLaunchHypeLesson: MILesson = {
  id: 'mh-product-launch-hype',
  moduleId: 'product-launch-hype',
  section: 'markets-headlines',
  title: 'Product Launch Hype',
  estimatedMinutes: 12,
  intro: {
    hook:
      'The night before a major tech company\'s product event, the stock is up 8% on rumor. The next morning they announce the most anticipated phone in years. The stock drops 4% by close. Nothing went wrong. Everything went exactly as planned.',
    philMessage:
      'The stock market rewards surprise, not success. Learning the "buy the rumor, sell the news" pattern will save you from some of the most predictable traps in investing.',
    heroImage: img('product-launch-hype', 'hero', 'Panda watching a product launch livestream, stock ticker in background'),
  },
  coreConcepts: [
    {
      title: 'Pre-Launch Run-Up',
      explanation:
        'In the weeks before a major product announcement, anticipation drives buying. Investors who believe the product will be a hit buy early, pushing the price up. This run-up reflects the expected success, not the announced success.',
      example:
        'A gaming console maker\'s stock rises 15% in the two months before a major launch event, purely on speculation and analyst hype.',
      keyTerms: ['Run-up'],
      visual: img('product-launch-hype', 'concept-runup', 'Price chart showing run-up before announcement date'),
    },
    {
      title: 'Sell the News',
      explanation:
        '"Buy the rumor, sell the news" describes the pattern where investors who bought in anticipation of a positive event take profits the moment the event is confirmed. The stock drops even on good news because the buying pressure disappears and profit-takers sell.',
      example:
        'A sneaker brand announces a record-breaking collaboration. Stock drops 6% on launch day despite sell-out inventory — investors who bought on rumor sold on news.',
      keyTerms: ['Sell the news'],
      visual: img('product-launch-hype', 'concept-sell-news', 'Diagram: rumor phase up, news announcement, price drop'),
    },
    {
      title: 'Real vs. Vapor Demand',
      explanation:
        'After the launch, the real test is sustainability. Viral launch-day demand can mask weak repeat purchase rates. Analysts watch second-quarter revenue, return rates, and subscriber retention to determine if demand was real or just hype.',
      example:
        'A fitness gadget sells out in 2 hours on launch day. Six months later, 40% of users cancel subscriptions. The hype was real. The product wasn\'t.',
      keyTerms: ['Demand sustainability'],
      visual: img('product-launch-hype', 'concept-demand', 'Two line charts: real demand vs vapor demand over 12 months'),
    },
  ],
  tryActivity: {
    type: 'headline-decoder',
    title: 'Launch Headline Check',
    description: 'Decode each product launch headline. Is it a real signal about the business or just launch-day noise?',
    headlines: [
      {
        id: 'p1',
        text: 'Tech giant\'s new device sells out in 4 minutes',
        signalPhrase: 'sells out in 4 minutes',
        correctCall: 'noise',
        feedback: 'Launch-day sellouts are manufactured by limiting supply. This tells you nothing about actual demand.',
      },
      {
        id: 'p2',
        text: 'New streaming service hits 5 million subscribers in first month — 3x analyst estimates',
        signalPhrase: '3x analyst estimates',
        correctCall: 'signal',
        feedback: 'Tripling analyst estimates on a key metric reveals the market underestimated demand. True signal.',
      },
      {
        id: 'p3',
        text: 'CEO calls new product "the most revolutionary thing we\'ve ever made"',
        signalPhrase: '"the most revolutionary thing we\'ve ever made"',
        correctCall: 'noise',
        feedback: 'CEOs always say this. The market has already priced in management optimism. Noise.',
      },
      {
        id: 'p4',
        text: 'App store returns for new AI app 60% higher than comparable launches',
        signalPhrase: '60% higher than comparable launches',
        correctCall: 'signal',
        feedback: 'High return rates signal product doesn\'t live up to the hype. This is a signal of underlying weakness.',
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Avoid the launch-day buy',
      description:
        'The worst time to buy a hyped stock is the day of the announcement. The best time is weeks later, once the hype deflates and the real product data comes in. Patience after a launch beats FOMO buying.',
      scenario: 'Your favorite tech company announces a new product. Stock is up 10% before market open. History says wait — the pullback usually comes within days.',
      visual: img('product-launch-hype', 'connect-pf', 'Panda waiting patiently while others rush a store opening'),
    },
    career: {
      title: 'Tech Equity Analyst',
      description:
        'Analysts who cover consumer tech build models specifically around product launch cycles. They track pre-order data, analyst day commentary, and supply chain signals to forecast actual demand well before launch.',
      role: 'Tech Equity Analyst',
      skills: ['Demand forecasting', 'Supply chain analysis', 'Consumer behavior research'],
      visual: img('product-launch-hype', 'connect-career', 'Panda analyst tracking pre-order data and supply chain signals'),
    },
  },
  flashcards: [
    { term: 'Run-up', definition: 'The price increase that happens in anticipation of a positive catalyst, before the event actually occurs.', philsAnalogy: 'Bamboo prices rise before the spring harvest every year. The rise starts when people expect it, not when the harvest happens.' },
    { term: 'Sell the news', definition: 'The pattern where investors sell immediately after a positive event is confirmed, causing the stock to drop even on good news.', philsAnalogy: 'Phil saves up to buy new bamboo tools. The moment they arrive, he stops spending. All the anticipation ends at delivery.' },
    { term: 'Demand sustainability', definition: 'Whether initial product demand continues over time, separating genuine adoption from launch-day hype.', philsAnalogy: 'The bamboo diet trend sold a million books in week one. By month six, everyone was back to noodles.' },
    { term: 'Catalyst', definition: 'A specific event expected to cause a significant stock price move — earnings, product launch, regulatory decision, etc.', philsAnalogy: 'A catalyst for bamboo prices is a drought forecast: specific, expected, and it moves the market before it happens.' },
  ],
  quiz: [
    {
      question: 'What does "buy the rumor, sell the news" mean?',
      options: ['Invest in newspapers', 'Prices rise on anticipation, then fall when the event is confirmed', 'Only buy when news is positive', 'Read the news before buying any stock'],
      correctIndex: 1,
      explanation: 'The run-up happens during the anticipation phase. Once the event is confirmed, profit-takers sell and the price falls.',
    },
    {
      question: 'A product sells out on launch day. Why might this be noise rather than signal?',
      options: ['The product is bad', 'Sellouts are often managed by limiting supply', 'The company has no competition', 'The stock price didn\'t move'],
      correctIndex: 1,
      explanation: 'Companies routinely restrict launch supply to create buzz. Sellout speed tells you nothing about demand sustainability.',
    },
    {
      question: 'What metric best confirms that product demand is real (not vapor)?',
      options: ['Launch-day sales volume', 'Repeat purchase and retention rates at 3 and 6 months', 'CEO confidence in earnings call', 'Number of news articles'],
      correctIndex: 1,
      explanation: 'Real demand shows up in whether customers come back. Retention and repeat purchase are the truth test.',
    },
    {
      question: 'A stock jumps 12% before a product launch. You want to invest. When is the best time?',
      options: ['Immediately before the event', 'During the launch event', 'After the initial hype deflates and real data arrives', 'After the stock rises another 10%'],
      correctIndex: 2,
      explanation: 'Post-launch pullbacks are common as hype-buyers exit. Waiting for real data gives you a better price and better information.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// MH-6  Regulation Shockwaves
// ─────────────────────────────────────────────
export const regulationShockwavesLesson: MILesson = {
  id: 'mh-regulation-shockwaves',
  moduleId: 'regulation-shockwaves',
  section: 'markets-headlines',
  title: 'Regulation Shockwaves',
  estimatedMinutes: 12,
  intro: {
    hook:
      'In one week in 2021, Chinese regulators announced new rules for private tutoring companies. The stocks of the largest education firms dropped 70–90%. Most American investors had never thought about regulatory risk. They learned it fast.',
    philMessage:
      'Governments can change the rules of the game overnight. Understanding how to read regulatory signals — and which sectors are most exposed — is essential market intelligence.',
    heroImage: img('regulation-shockwaves', 'hero', 'Panda reading a government rulebook while a storm swirls outside'),
  },
  coreConcepts: [
    {
      title: 'FTC, SEC & EU Moves',
      explanation:
        'The FTC (Federal Trade Commission) blocks mergers and targets anti-competitive behavior. The SEC (Securities Exchange Commission) polices financial fraud and disclosure. The EU\'s antitrust arm (DG COMP) is the world\'s most aggressive regulator of Big Tech. Each announcement can move entire sectors.',
      example:
        'The FTC blocking a major tech acquisition can drop the acquirer\'s stock 5–10% (deal premium evaporates) and the target\'s stock 20–30% (deal cancelled).',
      keyTerms: ['Regulatory risk'],
      visual: img('regulation-shockwaves', 'concept-agencies', 'Diagram: FTC, SEC, EU logos with their jurisdiction areas'),
    },
    {
      title: 'Sectors Hit Hardest',
      explanation:
        'Not all sectors face equal regulatory risk. Healthcare (drug approvals, pricing), finance (capital requirements, consumer protection), and technology (antitrust, data privacy) are the highest-risk sectors. Energy and utilities are heavily regulated but in more predictable ways.',
      example:
        'When the FTC signaled stricter merger reviews for pharma companies, the S&P Healthcare index underperformed the S&P 500 by 12% over the following six months.',
      keyTerms: ['Regulatory exposure'],
      visual: img('regulation-shockwaves', 'concept-sectors', 'Heatmap of regulatory risk by sector'),
    },
    {
      title: 'Long-Tail vs. One-Day Reaction',
      explanation:
        'Some regulatory events cause a one-day selloff that recovers quickly. Others create long-tail risk — ongoing compliance costs, business model changes, or multi-year legal battles. The key is whether the regulation changes the fundamentals of the business or just creates short-term uncertainty.',
      example:
        'GDPR (EU data privacy law) caused a one-day drop in European tech stocks, then became a structural cost companies absorbed. It didn\'t kill the business models — it just added compliance overhead.',
      keyTerms: ['Long-tail risk'],
      visual: img('regulation-shockwaves', 'concept-longtail', 'Two price charts: one-day recovery vs sustained long-tail decline'),
    },
  ],
  tryActivity: {
    type: 'scenario-choice',
    title: 'Regulatory Impact',
    description: 'Given the regulatory announcement, decide whether this is a one-day blip or a long-tail business threat.',
    rounds: [
      {
        id: 'r1',
        prompt: 'The SEC announces new disclosure requirements for small biotech firms — they must now disclose trial data within 24 hours. Stock drops 3% on announcement.',
        options: [
          { id: 'a', label: 'One-day blip — adds compliance cost but doesn\'t change the business model', feedback: 'Correct. Disclosure rules add overhead but don\'t threaten the underlying drug pipeline.' },
          { id: 'b', label: 'Long-tail — will eliminate biotech as an industry', feedback: 'Too extreme. Disclosure requirements affect timing and cost, not the value of drug pipelines.' },
          { id: 'c', label: 'Impossible to know — sell everything', feedback: 'Not useful. This is a manageable compliance change, not a business model disruption.' },
          { id: 'd', label: 'Buy more — this is a buying opportunity', feedback: 'Maybe, but the point is assessing whether this is structural damage — which it probably isn\'t.' },
        ],
      },
      {
        id: 'r2',
        prompt: 'The EU announces that social media platforms must allow full data portability, giving users the ability to move all their content to competitors instantly. Stock drops 18%.',
        options: [
          { id: 'a', label: 'One-day blip — EU rules don\'t apply to US companies', feedback: 'Wrong. Major social platforms operate in the EU and must comply, or be blocked from EU markets.' },
          { id: 'b', label: 'Long-tail — this directly attacks the switching-cost moat that makes the platform sticky', feedback: 'Correct. Portability rules directly reduce the network effect moat — this is a fundamental business threat.' },
          { id: 'c', label: 'Irrelevant — teens don\'t care about regulations', feedback: 'Incorrect. Regulatory changes that reduce switching costs are long-term threats to platform business models.' },
          { id: 'd', label: 'Positive news — more users will join knowing they can leave', feedback: 'Incorrect. The platform\'s competitive advantage depends on high switching costs. Portability reduces that.' },
        ],
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Regulatory risk in your portfolio',
      description:
        'If you invest in individual stocks, consider the regulatory environment of each sector. Healthcare and tech carry high regulatory risk. Diversified index funds spread this risk automatically — you own a little of everything, so no single regulatory ruling wipes you out.',
      scenario: 'You own an index fund with 25% in technology. A major antitrust case targets one company. Your risk is spread — you don\'t own that company outright.',
      visual: img('regulation-shockwaves', 'connect-pf', 'Panda holding a balanced portfolio pie chart'),
    },
    career: {
      title: 'Policy Risk Analyst',
      description:
        'Policy risk analysts at investment banks and hedge funds track regulatory developments globally. They advise portfolio managers on which sectors to overweight or underweight based on legislative signals.',
      role: 'Policy Risk Analyst',
      skills: ['Legislative tracking', 'Sector analysis', 'Geopolitical awareness'],
      visual: img('regulation-shockwaves', 'connect-career', 'Panda analyst tracking legislation and writing policy brief'),
    },
  },
  flashcards: [
    { term: 'Regulatory risk', definition: 'The probability that new government rules will negatively affect a company\'s business model or profitability.', philsAnalogy: 'Like if the city council suddenly banned bamboo sales in the market district. Your whole grove is now a legal problem.' },
    { term: 'Regulatory exposure', definition: 'How vulnerable a company or sector is to adverse regulation, based on how dependent it is on current rules.', philsAnalogy: 'A bamboo merchant who sells only to government contracts has high regulatory exposure. One who sells to everyone has less.' },
    { term: 'Long-tail risk', definition: 'A risk that plays out slowly over years rather than causing a one-day shock — ongoing compliance costs, litigation, or business model changes.', philsAnalogy: 'Like a slow bamboo blight: it doesn\'t kill the grove overnight, but five years later, yields are down 40%.' },
    { term: 'Antitrust', definition: 'Laws preventing companies from gaining monopoly power or engaging in anti-competitive mergers or practices.', philsAnalogy: 'If one bamboo farmer tried to buy every grove in the city, antitrust law says the government can step in.' },
  ],
  quiz: [
    {
      question: 'What is regulatory risk?',
      options: ['Risk that a stock drops 50%', 'Risk that new government rules hurt a company\'s business model', 'Risk that a CEO resigns', 'Risk that interest rates rise'],
      correctIndex: 1,
      explanation: 'Regulatory risk specifically refers to government rule changes that can change how — or whether — a company can operate.',
    },
    {
      question: 'Which sector typically has the HIGHEST regulatory risk?',
      options: ['Consumer staples (food, beverages)', 'Healthcare and technology', 'Real estate', 'Agriculture'],
      correctIndex: 1,
      explanation: 'Healthcare (drug approvals, pricing) and technology (antitrust, data privacy) face the most active and unpredictable regulatory environments.',
    },
    {
      question: 'The EU passes a data portability law. Why is this potentially a long-tail risk for social media platforms?',
      options: ['It increases advertising revenue', 'It removes the switching-cost moat that keeps users on the platform', 'It only affects European companies', 'It increases data storage costs'],
      correctIndex: 1,
      explanation: 'Portability reduces the stickiness that gives platforms their network-effect moat — a structural, not temporary, change.',
    },
    {
      question: 'The best way to reduce regulatory risk exposure in a personal portfolio is:',
      options: ['Own only tech stocks', 'Diversify across sectors with index funds', 'Monitor the news 24/7', 'Only invest in companies in countries with no regulations'],
      correctIndex: 1,
      explanation: 'Diversification spreads regulatory risk across sectors so no single rule change is devastating to your overall portfolio.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// MH-7  PR & Reputation Crises
// ─────────────────────────────────────────────
export const prReputationCrisesLesson: MILesson = {
  id: 'mh-pr-reputation-crises',
  moduleId: 'pr-reputation-crises',
  section: 'markets-headlines',
  title: 'PR & Reputation Crises',
  estimatedMinutes: 12,
  intro: {
    hook:
      'A video of a passenger being dragged off a United Airlines flight went viral in 2017. The stock dropped 4% in two days. Three weeks later, it was back to where it started. Meanwhile, companies with deep ethics scandals sometimes never fully recover. Why the difference?',
    philMessage:
      'Not every crisis is equal. The skill is figuring out fast whether this is recoverable noise or long-lasting damage. Here\'s the playbook.',
    heroImage: img('pr-reputation-crises', 'hero', 'Panda CEO in front of a microphone during a press conference'),
  },
  coreConcepts: [
    {
      title: 'Brand Damage Timeline',
      explanation:
        'Reputation crises follow a pattern: (1) incident, (2) media cycle (1–5 days), (3) corporate response, (4) public verdict. The stock usually drops fastest in phase 2. If the response in phase 3 is fast and credible, recovery often follows. The long-term impact depends on whether the incident reveals a systemic problem or was a one-time mistake.',
      example:
        'A fast-food chain has a contamination incident. They recall the product, issue an apology, and upgrade safety systems. Stock recovers within a month.',
      keyTerms: ['Brand damage'],
      visual: img('pr-reputation-crises', 'concept-timeline', 'Timeline of crisis phases with typical stock price path'),
    },
    {
      title: 'Recoverable vs. Lasting Hits',
      explanation:
        'Recoverable crises: viral bad videos, one-time quality failures, executive gaffes, temporary supply issues. Lasting damage: fraud, cover-ups, systematic ethics violations, product that harms customers repeatedly, CEO criminal conviction. The difference is whether the core business trust is broken.',
      example:
        'Volkswagen\'s emissions scandal (2015): intentional fraud in the product itself. Stock never returned to pre-crisis highs. The betrayal was systemic.',
      keyTerms: ['Trust deficit'],
      visual: img('pr-reputation-crises', 'concept-recoverable', 'Split diagram: recoverable crises vs. lasting damage characteristics'),
    },
    {
      title: 'Real vs. Manufactured Outrage',
      explanation:
        'Social media amplifies both real crises and manufactured ones. Signs of real outrage: it trends across multiple demographics, mainstream journalists follow it, the company\'s core customers react. Signs of manufactured outrage: it\'s concentrated in one ideological community, it dies within 48 hours, the company\'s actual customers don\'t change behavior.',
      example:
        'A brand gets "canceled" by one political faction over a sponsorship. Their sales actually rise because the other faction rallies to support them.',
      keyTerms: ['Manufactured outrage'],
      visual: img('pr-reputation-crises', 'concept-outrage', 'Venn diagram: viral anger vs actual customer churn'),
    },
  ],
  tryActivity: {
    type: 'term-classify',
    title: 'Recoverable or Lasting?',
    description: 'Sort each crisis into Likely Recoverable or Long-Term Damage.',
    categories: [
      { id: 'recover', label: 'Likely Recoverable' },
      { id: 'lasting', label: 'Long-Term Damage' },
    ],
    terms: [
      { id: 'c1', label: 'CEO posts insensitive tweet, apologizes same day', correctCategory: 'recover' },
      { id: 'c2', label: 'Company found to have falsified safety data for 10 years', correctCategory: 'lasting' },
      { id: 'c3', label: 'Product recall due to supplier defect (one batch)', correctCategory: 'recover' },
      { id: 'c4', label: 'CFO convicted of insider trading', correctCategory: 'lasting' },
      { id: 'c5', label: 'Viral video of rude customer service employee', correctCategory: 'recover' },
      { id: 'c6', label: 'Systematic discrimination lawsuit from thousands of employees spanning 15 years', correctCategory: 'lasting' },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Crisis dips as buying opportunities',
      description:
        'For recoverable crises, the media-driven stock dip can create a temporary buying opportunity. But you need to assess: is the core business intact? Does this change why customers use the product? If not, the dip might be short-lived.',
      scenario: 'A beloved restaurant chain has a viral food safety incident. They close for a day, deep-clean, and reopen. If the brand was strong before, this might be a buying moment.',
      visual: img('pr-reputation-crises', 'connect-pf', 'Panda investor watching crisis dip and evaluating calmly'),
    },
    career: {
      title: 'Crisis Communications Lead',
      description:
        'PR professionals specializing in crisis communications advise companies on how to respond to scandals. The best ones move fast, acknowledge reality, and provide a credible path forward. Their work directly affects how long and how deep the stock drop goes.',
      role: 'Crisis Communications Lead',
      skills: ['Rapid response writing', 'Media training', 'Stakeholder management'],
      visual: img('pr-reputation-crises', 'connect-career', 'Panda PR professional in a fast-moving strategy meeting'),
    },
  },
  flashcards: [
    { term: 'Brand damage', definition: 'Reduction in consumer trust or willingness to buy caused by a public incident or scandal.', philsAnalogy: 'A bamboo stand that once had a line around the block now has customers checking the reviews before entering.' },
    { term: 'Trust deficit', definition: 'When a company\'s customers, employees, or investors fundamentally no longer believe the company\'s promises.', philsAnalogy: 'Phil said the bamboo was organic. It wasn\'t. Now even the real organic batch doesn\'t sell.' },
    { term: 'Manufactured outrage', definition: 'Social media controversy that generates volume but doesn\'t reflect genuine customer sentiment or business impact.', philsAnalogy: 'A thousand bots claiming the bamboo was dirty. The actual customers are still buying. The outrage was fake.' },
    { term: 'Reputational moat', definition: 'The competitive advantage a company holds due to decades of trust-building — hard to build, faster to destroy.', philsAnalogy: 'Phil\'s Bamboo Palace has 50 years of loyal customers. One bad week won\'t erase it. But five bad years might.' },
  ],
  quiz: [
    {
      question: 'What is the key difference between a recoverable crisis and lasting damage?',
      options: ['How many people saw it on social media', 'Whether the core business trust is fundamentally broken', 'How quickly the stock dropped', 'Whether the CEO was involved'],
      correctIndex: 1,
      explanation: 'One-time mistakes are recoverable. Systematic fraud or ethics violations break trust at the core — that takes years to rebuild.',
    },
    {
      question: 'Volkswagen\'s emissions fraud is an example of lasting damage because:',
      options: ['It was a one-time manufacturing error', 'The fraud was intentional and built into the product itself', 'The CEO apologized quickly', 'It happened in Europe, not the US'],
      correctIndex: 1,
      explanation: 'Intentional product fraud betrays the fundamental promise of the company. That\'s structural damage, not a PR misstep.',
    },
    {
      question: 'A brand is "canceled" on social media by one political group, but sales stay flat. This is best described as:',
      options: ['A serious threat to the business', 'Manufactured outrage with no real business impact', 'A signal to sell the stock immediately', 'Proof the brand is above criticism'],
      correctIndex: 1,
      explanation: 'When actual customer behavior doesn\'t change, social media controversy is manufactured noise — not a fundamental business threat.',
    },
    {
      question: 'A restaurant chain has a supplier contamination incident, closes for one day, and cleans everything. This is likely:',
      options: ['Permanent business collapse', 'Lasting damage requiring years to recover', 'Recoverable — core brand trust intact, problem resolved', 'No impact on the stock at all'],
      correctIndex: 2,
      explanation: 'A fast, credible response to a one-time incident typically allows a well-trusted brand to recover quickly.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// MH-8  The Fed Speaks
// ─────────────────────────────────────────────
export const theFedSpeaksLesson: MILesson = {
  id: 'mh-the-fed-speaks',
  moduleId: 'the-fed-speaks',
  section: 'markets-headlines',
  title: 'The Fed Speaks',
  estimatedMinutes: 12,
  intro: {
    hook:
      'Eight times a year, a small group of 12 people meet in Washington, D.C. Their decision — which takes about 60 minutes to announce — moves every stock market, bond market, and currency on the planet. This is the FOMC.',
    philMessage:
      'The Fed is the single most powerful force in financial markets. Once you understand how it communicates, you\'ll understand why markets react the way they do to a single word change in a press statement.',
    heroImage: img('the-fed-speaks', 'hero', 'Panda Fed chair at podium, world financial markets on screens behind'),
  },
  coreConcepts: [
    {
      title: 'FOMC Days & Rate Decisions',
      explanation:
        'The FOMC (Federal Open Market Committee) sets the federal funds rate — the interest rate banks charge each other overnight. This rate anchors all other borrowing costs in the economy: mortgages, car loans, credit cards, and corporate debt. Rate changes ripple through every asset class.',
      example:
        'When the FOMC raised rates from 0% to 5.25% between 2022 and 2023, it was the fastest rate-hike cycle in 40 years. Mortgage rates doubled. The S&P 500 dropped 20% in 2022.',
      keyTerms: ['FOMC'],
      visual: img('the-fed-speaks', 'concept-fomc', 'Diagram of FOMC structure and rate decision process'),
    },
    {
      title: 'The Dot Plot & Forward Guidance',
      explanation:
        'The "dot plot" is a chart where each FOMC member places a dot showing where they expect rates to be in 1, 2, and 3 years. It\'s not a commitment — it\'s a signal. Markets watch whether dots shift hawkish (higher rates) or dovish (lower rates) between meetings.',
      example:
        'In December 2022, the dot plot showed a median expectation of 5.1% rates in 2023. Markets rallied when the actual 2023 peak was 5.25–5.5% — closer than many feared.',
      keyTerms: ['Dot plot'],
      visual: img('the-fed-speaks', 'concept-dotplot', 'Example dot plot chart showing rate projections'),
    },
    {
      title: 'Hawkish Hold: Why Language Matters',
      explanation:
        'The Fed can hold rates unchanged but still signal tightness through language. "Hawkish hold" = rates unchanged but the statement says "we\'re prepared to raise further." "Dovish hold" = rates unchanged but "we\'re monitoring conditions." One word change in the 500-word statement can move markets by 1%.',
      example:
        '"Inflation remains elevated" (hawkish) vs. "Inflation has moderated" (dovish) in consecutive statements caused a 2% swing in the S&P 500.',
      keyTerms: ['Hawkish'],
      visual: img('the-fed-speaks', 'concept-hawkish', 'Side-by-side: hawkish vs dovish language examples from real Fed statements'),
    },
  ],
  tryActivity: {
    type: 'headline-decoder',
    title: 'Fed Statement Decoder',
    description: 'Read each Fed-related headline. Signal (market-moving) or Noise (routine/expected)?',
    headlines: [
      {
        id: 'f1',
        text: 'Fed holds rates steady — language shifts from "elevated" to "moderating" inflation',
        signalPhrase: 'language shifts from "elevated" to "moderating"',
        correctCall: 'signal',
        feedback: 'Language shifts in Fed statements are intentional signals. "Moderating" hints at future cuts — markets react to the word, not just the rate.',
      },
      {
        id: 'f2',
        text: 'FOMC minutes show members "generally supportive" of current policy stance',
        signalPhrase: '"generally supportive"',
        correctCall: 'noise',
        feedback: 'Unanimous support for current policy is expected and changes nothing. This is confirmation of the status quo.',
      },
      {
        id: 'f3',
        text: 'Two Fed officials make separate speeches calling for "more work to do on inflation"',
        signalPhrase: '"more work to do on inflation"',
        correctCall: 'signal',
        feedback: 'When multiple Fed members use the same hawkish phrase, it\'s coordinated messaging — the Fed is signaling continued tightening.',
      },
      {
        id: 'f4',
        text: 'Fed chair wears blue tie at Jackson Hole conference — market watchers debate meaning',
        signalPhrase: 'market watchers debate meaning',
        correctCall: 'noise',
        feedback: 'This is parody. Tie color has never been Fed communication. If you\'re reading this kind of "analysis," find better sources.',
      },
    ],
  },
  connect: {
    personalFinance: {
      title: 'Fed rate changes affect your money directly',
      description:
        'When the Fed raises rates: your savings account pays more, but your variable-rate debt (credit cards, HELOCs) costs more too. When they cut rates: mortgages get cheaper, but savings accounts pay less. The Fed affects every dollar you earn, save, or owe.',
      scenario: 'The Fed raises rates by 0.25%. Your $1,000 in a high-yield savings account now earns 5.25% instead of 5.00%. Your $3,000 credit card balance now costs a bit more to carry. Both matter.',
      visual: img('the-fed-speaks', 'connect-pf', 'Infographic showing rate hike effects on savings, debt, and housing'),
    },
    career: {
      title: 'Fed Watcher / Macro Economist',
      description:
        'Fed watchers spend their careers analyzing central bank communication. At banks, the role is called "rates strategist" — they trade on their read of future Fed policy. Being right consistently is worth millions in P&L.',
      role: 'Rates Strategist',
      skills: ['Macro analysis', 'Central bank communication', 'Interest rate modeling'],
      visual: img('the-fed-speaks', 'connect-career', 'Panda economist analyzing Fed dot plots and statement language'),
    },
  },
  flashcards: [
    { term: 'FOMC', definition: 'Federal Open Market Committee — the 12-member group that sets US interest rate policy 8 times per year.', philsAnalogy: 'The bamboo growers\' council meets eight times a year to set the price floor for all bamboo in the city. Every merchant adjusts to it.' },
    { term: 'Dot plot', definition: 'A chart showing where each FOMC member expects interest rates to be in future years; used as a forward guidance tool.', philsAnalogy: 'Phil asks his 12 council members to mark on a graph where they think bamboo prices will be in 3 years. That\'s the dot plot.' },
    { term: 'Hawkish', definition: 'Language or policy signaling higher interest rates to fight inflation; opposite of dovish (which signals rate cuts).', philsAnalogy: 'A hawkish bamboo farmer says "we need to slow growth to keep quality high." A dovish one says "plant faster, worry later."' },
    { term: 'Federal funds rate', definition: 'The overnight rate banks charge each other; controlled by the Fed and the anchor for all other interest rates in the economy.', philsAnalogy: 'The wholesale price of bamboo between major merchants. It sets the floor for what anyone else pays for capital.' },
  ],
  quiz: [
    {
      question: 'What is the FOMC?',
      options: [
        'The government\'s budget committee',
        'The group that sets US interest rate policy 8 times per year',
        'The committee that approves bank mergers',
        'The group that manages the federal budget deficit',
      ],
      correctIndex: 1,
      explanation: 'The FOMC sets the federal funds rate — the most powerful interest rate in the US economy.',
    },
    {
      question: 'A "hawkish hold" means:',
      options: [
        'Rates were cut but the Fed sounds aggressive',
        'Rates unchanged but language signals readiness to hike further',
        'The Fed is done raising rates permanently',
        'A hawk landed on the Fed building during the press conference',
      ],
      correctIndex: 1,
      explanation: '"Hawkish hold" means rates stay the same for now, but the statement\'s language signals continued willingness to tighten.',
    },
    {
      question: 'The dot plot shifts higher (more dots at higher rate levels). This is:',
      options: [
        'Dovish — rates are going down',
        'Hawkish — the Fed expects rates to stay higher longer',
        'Neutral — dots don\'t affect markets',
        'A guarantee that rates will rise',
      ],
      correctIndex: 1,
      explanation: 'Higher dots signal higher expected rates — a hawkish shift that typically pressures stocks and strengthens the dollar.',
    },
    {
      question: 'When the Fed raises interest rates, what happens to your high-yield savings account?',
      options: ['It pays less interest', 'It pays more interest', 'It is closed automatically', 'It has no change — savings accounts are fixed'],
      correctIndex: 1,
      explanation: 'High-yield savings accounts are variable rate — they follow the Fed\'s rate up and down, typically within days of each decision.',
    },
  ],
  rewards: { bamboo: 20, xp: 4 },
};

// ─────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────
const headlinesLessonsMap: Record<string, MILesson> = {
  'headline-decoder': headlineDecoderLesson,
  'noise-vs-signal': noiseVsSignalLesson,
  'the-earnings-call': earningsCallLesson,
  'market-mood': marketMoodLesson,
  'product-launch-hype': productLaunchHypeLesson,
  'regulation-shockwaves': regulationShockwavesLesson,
  'pr-reputation-crises': prReputationCrisesLesson,
  'the-fed-speaks': theFedSpeaksLesson,
};

export function getHeadlinesLesson(moduleId: string): MILesson | undefined {
  return headlinesLessonsMap[moduleId];
}

export const allHeadlinesLessons: MILesson[] = Object.values(headlinesLessonsMap);
