
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';

export const companyProfiles: CompanyProfile[] = [
  {
    id: "AAPL",
    name: "Apple Inc.",
    ticker: "AAPL",
    industry: "Technology",
    professional: {
      overview: "Apple is a global tech leader known for its iconic hardware like the iPhone and Mac, and its rapidly growing services division. It maintains a powerful brand and a loyal customer base.",
      kpis: [
        { title: "iPhone Sales", value: "Cornerstone of revenue" },
        { title: "Services Growth", value: "High-margin, key focus" },
        { title: "Active Devices", value: "Over 2.2 billion" },
      ],
      financials: [
        { title: "Gross Margin", value: "Approx. 45%" },
        { title: "R&D Spending", value: "Investing in future tech" },
        { title: "Cash on Hand", value: "Massive reserves" },
      ],
    },
    dating: {
      marketSentiment: "Most people are either obsessed with me or know someone who is. I'm kind of a big deal and my products are everywhere. The general vibe is super positive, but some think I'm too controlling with my 'walled garden'.",
      analystSentiment: "Wall Street loves me. Most analysts are saying 'Buy! Buy! Buy!', thinking my push into services and new gadgets like the Vision Pro will keep the money rolling in. They see me as a safe, long-term bet.",
      historicalPerformance: "My track record is legendary. I've basically been on a rocket ship for the last 20 years, turning early believers into millionaires. There are bumps, sure, but the trend has been straight up. I'm what you'd call a 'keeper'.",
    },
    marketCap: "$2.8T",
    revenueTTM: "$383B",
    peRatio: "29.5",
    headquarters: "Cupertino, CA"
  },
  {
    id: "MSFT",
    name: "Microsoft Corp.",
    ticker: "MSFT",
    industry: "Technology",
    professional: {
      overview: "Microsoft is a diversified software behemoth, leading the charge in enterprise solutions and cloud computing with its Azure platform. It has successfully pivoted to a subscription-based model, ensuring strong recurring revenue.",
      kpis: [
        { title: "Azure Cloud Growth", value: "Major revenue driver" },
        { title: "Office 365 Subscribers", value: "Huge commercial base" },
        { title: "Gaming Revenue", value: "Xbox & Game Pass growth" },
      ],
      financials: [
        { title: "Cloud Revenue", value: "Exceeds $100B annually" },
        { title: "Operating Margin", value: "Strong and consistent" },
        { title: "LinkedIn Revenue", value: "Steady B2B income" },
      ],
    },
    dating: {
      marketSentiment: "I used to be the 'boring but reliable' type, but now I'm seen as a cool, smart powerhouse, especially with my big moves in AI. Businesses can't live without me, and gamers love my fun side.",
      analystSentiment: "Analysts are basically my fan club. They're all hyped about Azure eating up the cloud market and my AI partnership with OpenAI. They think I have a clear path to keep growing for years to come.",
      historicalPerformance: "Let's just say I had a major glow-up. After a bit of a quiet spell, I've come roaring back over the last decade. My stock chart is a thing of beauty. I've proven I can change and come out even stronger.",
    },
    marketCap: "$3.1T",
    revenueTTM: "$227B",
    peRatio: "38.0",
    headquarters: "Redmond, WA"
  },
  {
    id: "GOOGL",
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    industry: "Technology",
    professional: {
      overview: "Alphabet, Google's parent company, dominates the digital advertising market through its Search and YouTube platforms. It's also a major player in cloud computing and is investing heavily in 'Other Bets' like AI and self-driving cars.",
      kpis: [
        { title: "Ad Revenue Growth", value: "Core of the business" },
        { title: "Google Cloud Performance", value: "Key growth area" },
        { title: "YouTube Watch Hours", value: "Monetization engine" },
      ],
      financials: [
        { title: "Traffic Acquisition Costs", value: "A key expense to watch" },
        { title: "Operating Income", value: "Extremely high profitability" },
        { title: "'Other Bets' Losses", value: "Investing in moonshots" },
      ],
    },
    dating: {
      marketSentiment: "Everyone uses my stuff, so the brand recognition is off the charts. People rely on me for everything. The only drama is when politicians get mad about me being so big and powerful.",
      analystSentiment: "Analysts think my main search business is a cash-printing machine. They're excited about my AI smarts (Gemini) and hope my cloud business can catch up to the competition. They say I'm a solid choice, but to watch out for lawsuits.",
      historicalPerformance: "I've been a straight-A student since I was young. My stock has been a massive winner over the long run. I'm the kind of reliable performer you can bring home to meet your parents, even if I have some weird, expensive hobbies on the side.",
    },
    marketCap: "$2.2T",
    revenueTTM: "$307B",
    peRatio: "27.1",
    headquarters: "Mountain View, CA"
  },
  {
    id: "AMZN",
    name: "Amazon.com, Inc.",
    ticker: "AMZN",
    industry: "E-commerce & Cloud Computing",
    professional: {
      overview: "Amazon is a titan of e-commerce and cloud computing. Its AWS division is the market leader and highly profitable, funding the company's vast logistics network and ventures into new areas like advertising and healthcare.",
      kpis: [
        { title: "AWS Revenue Growth", value: "The profit engine" },
        { title: "Online Store Sales", value: "Massive but lower margin" },
        { title: "Prime Subscribers", value: "Sticky customer base" },
      ],
      financials: [
        { title: "Operating Cash Flow", value: "A key metric of health" },
        { title: "Capital Expenditures", value: "High spending on infrastructure" },
        { title: "Advertising Revenue", value: "Fast-growing segment" },
      ],
    },
    dating: {
      marketSentiment: "Love it or hate it, almost everyone uses me. People love the convenience, even if they sometimes feel guilty about it. I'm basically the utility player of modern life.",
      analystSentiment: "The experts see me as two amazing companies in one. They drool over the profits from my cloud business (AWS) and see my ad business as a hidden gem. They believe I'm built for world domination, as long as I can handle the costs.",
      historicalPerformance: "My life story is insane. I started in a garage and now I'm... well, I'm Amazon. My stock has had some wild rides, but if you stuck with me, you've done incredibly well. I'm all about that long-term growth.",
    },
    marketCap: "$1.9T",
    revenueTTM: "$574B",
    peRatio: "52.3",
    headquarters: "Seattle, WA"
  },
  {
    id: "TSLA",
    name: "Tesla, Inc.",
    ticker: "TSLA",
    industry: "Automotive & Energy",
    professional: {
      overview: "Tesla is a disruptive force in the automotive industry, leading the transition to electric vehicles. Beyond cars, it has ambitions in energy storage, artificial intelligence (Full Self-Driving), and robotics.",
      kpis: [
        { title: "Vehicle Deliveries", value: "The most-watched number" },
        { title: "Automotive Gross Margin", value: "Indicates profitability" },
        { title: "Energy Storage Deployments", value: "Growing side business" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Shows financial sustainability" },
        { title: "Regulatory Credits Sales", value: "Historically important income" },
        { title: "R&D on AI/Robotics", value: "Betting on the future" },
      ],
    },
    dating: {
      marketSentiment: "I'm the most talked-about name out there. You either think I'm the future of everything or that I'm totally full of it. There's no in-between. My fans are ride-or-die.",
      analystSentiment: "The analysts are totally split on me. Some think I'm going to be the biggest company in the world, thanks to AI and robots. Others think I'm just a car company that's way too expensive. It's a total soap opera.",
      historicalPerformance: "My history is a rollercoaster. I've made some people insanely rich and given others heart attacks. My stock chart looks like a seismograph during an earthquake. If you're into high-stakes excitement, I'm your match.",
    },
    marketCap: "$580B",
    revenueTTM: "$96B",
    peRatio: "45.0",
    headquarters: "Austin, TX"
  },
  {
    id: "NVDA",
    name: "NVIDIA Corporation",
    ticker: "NVDA",
    industry: "Technology",
    professional: {
      overview: "NVIDIA is the leading designer of graphics processing units (GPUs) and has become the dominant force in artificial intelligence computing. Their chips power everything from gaming to data centers to autonomous vehicles.",
      kpis: [
        { title: "GPU Market Share", value: "Dominates gaming and AI markets" },
        { title: "Data Center Revenue", value: "Explosive AI-driven growth" },
        { title: "Gaming Revenue", value: "Core traditional business" },
      ],
      financials: [
        { title: "Revenue Growth", value: "Massive AI boom benefits" },
        { title: "Gross Margins", value: "Premium pricing power" },
        { title: "R&D Investment", value: "Heavy innovation spending" },
      ],
    },
    dating: {
      marketSentiment: "I'm the hot new thing everyone wants to date! People see me as the future of AI and can't stop talking about how smart and powerful I am. I'm basically the supermodel of tech stocks right now.",
      analystSentiment: "Wall Street is absolutely obsessed with me. Analysts think I'm going to ride the AI wave to the moon. They're betting big that every company will need my chips to stay competitive in the AI race.",
      historicalPerformance: "My glow-up has been INSANE. I went from being just a gaming company to the AI darling in a few short years. My stock chart looks like a rocket ship - early believers are now millionaires.",
    },
    marketCap: "$1.8T",
    revenueTTM: "$96B",
    peRatio: "65.5",
    headquarters: "Santa Clara, CA"
  },
  {
    id: "META",
    name: "Meta Platforms, Inc.",
    ticker: "META",
    industry: "Social Media & Technology",
    professional: {
      overview: "Meta owns Facebook, Instagram, WhatsApp, and is heavily investing in the metaverse through Reality Labs. Despite challenges, it remains a digital advertising powerhouse with billions of users worldwide.",
      kpis: [
        { title: "Monthly Active Users", value: "Nearly 4 billion across platforms" },
        { title: "Average Revenue Per User", value: "Key monetization metric" },
        { title: "Metaverse Investment", value: "Billions in Reality Labs" },
      ],
      financials: [
        { title: "Ad Revenue", value: "Still the core business" },
        { title: "Operating Efficiency", value: "Year of efficiency focus" },
        { title: "Metaverse Losses", value: "Heavy investment phase" },
      ],
    },
    dating: {
      marketSentiment: "It's complicated with me. Some people think I'm trying too hard with this whole metaverse thing, but others love my comeback story. I've been working on myself and people are starting to notice.",
      analystSentiment: "The experts are warming up to me again. They like my efficiency improvements and think my AI investments will pay off. Some are still skeptical about my metaverse spending, but they respect the vision.",
      historicalPerformance: "I've had some dramatic ups and downs - kind of like a reality TV show. But my recent comeback has been impressive. I proved I can adapt and bounce back stronger than ever.",
    },
    marketCap: "$1.3T",
    revenueTTM: "$134B",
    peRatio: "26.2",
    headquarters: "Menlo Park, CA"
  },
  {
    id: "BRK.A",
    name: "Berkshire Hathaway Inc.",
    ticker: "BRK.A",
    industry: "Conglomerate",
    professional: {
      overview: "Warren Buffett's Berkshire Hathaway is a massive conglomerate owning everything from insurance (GEICO) to railroads (BNSF) to consumer brands (Coca-Cola). It's known for value investing and long-term thinking.",
      kpis: [
        { title: "Book Value Growth", value: "Long-term wealth creation" },
        { title: "Insurance Float", value: "Huge capital advantage" },
        { title: "Operating Earnings", value: "Diverse business mix" },
      ],
      financials: [
        { title: "Cash Position", value: "Enormous war chest" },
        { title: "Investment Portfolio", value: "Blue-chip stock holdings" },
        { title: "Operating Companies", value: "Diversified revenue streams" },
      ],
    },
    dating: {
      marketSentiment: "I'm the wise, reliable type that your grandparents love. People see me as stable and trustworthy - not flashy, but someone who'll be there for the long haul. I'm old-school in the best way.",
      analystSentiment: "Analysts respect my track record but worry I'm getting too old and conservative. They love Buffett's wisdom but wonder what happens next. Still, they can't argue with decades of success.",
      historicalPerformance: "I'm the tortoise in the race - slow and steady wins. I've created more millionaires than almost anyone over the long term. My approach never goes out of style, even if it's not always exciting.",
    },
    marketCap: "$900B",
    revenueTTM: "$364B",
    peRatio: "21.8",
    headquarters: "Omaha, NE"
  },
  {
    id: "LLY",
    name: "Eli Lilly and Company",
    ticker: "LLY",
    industry: "Pharmaceuticals",
    professional: {
      overview: "Eli Lilly is a pharmaceutical giant that has hit the jackpot with diabetes and weight-loss drugs like Ozempic competitors. They're at the forefront of the obesity treatment revolution.",
      kpis: [
        { title: "Diabetes Drug Sales", value: "Massive growth driver" },
        { title: "Pipeline Success", value: "Strong drug development" },
        { title: "Weight Loss Market", value: "Huge addressable market" },
      ],
      financials: [
        { title: "Revenue Growth", value: "Blockbuster drug success" },
        { title: "R&D Investment", value: "Heavy innovation focus" },
        { title: "Profit Margins", value: "High-value medications" },
      ],
    },
    dating: {
      marketSentiment: "I'm having a major moment! Everyone's talking about my amazing weight-loss drugs. People see me as a life-changer - literally helping people become healthier versions of themselves.",
      analystSentiment: "Wall Street is head over heels for me right now. Analysts think my obesity drugs could be the biggest thing in pharmaceuticals in decades. They're betting I'll dominate this massive market.",
      historicalPerformance: "I've been a solid performer for years, but lately I've been absolutely on fire. My recent success has turned me into one of the hottest stocks around. Talk about a health transformation!",
    },
    marketCap: "$750B",
    revenueTTM: "$34B",
    peRatio: "58.3",
    headquarters: "Indianapolis, IN"
  },
  {
    id: "V",
    name: "Visa Inc.",
    ticker: "V",
    industry: "Financial Services",
    professional: {
      overview: "Visa operates one of the world's largest payment networks, processing transactions globally. They don't lend money but take a small cut of every transaction, making them a toll booth on the digital economy.",
      kpis: [
        { title: "Payment Volume", value: "Trillions in transactions" },
        { title: "Cross-border Growth", value: "International expansion" },
        { title: "Digital Payments", value: "Cashless society trend" },
      ],
      financials: [
        { title: "Network Revenue", value: "Transaction-based income" },
        { title: "Operating Margins", value: "Incredibly efficient model" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
      ],
    },
    dating: {
      marketSentiment: "I'm the reliable partner everyone depends on. Every time someone swipes a card or taps to pay, I'm there making it happen. People trust me with their most important transactions.",
      analystSentiment: "Analysts love my business model - I make money on every transaction without the risk of lending. They see me benefiting from the shift away from cash and the growth of digital payments worldwide.",
      historicalPerformance: "I've been a steady winner for years. My growth has been consistent and reliable, like a good friend you can always count on. I'm the definition of a quality business.",
    },
    marketCap: "$520B",
    revenueTTM: "$32B",
    peRatio: "33.1",
    headquarters: "San Francisco, CA"
  },
  {
    id: "JPM",
    name: "JPMorgan Chase & Co.",
    ticker: "JPM",
    industry: "Banking",
    professional: {
      overview: "JPMorgan Chase is America's largest bank, offering everything from consumer banking to investment services. Led by Jamie Dimon, it's considered the gold standard of banking with a fortress balance sheet.",
      kpis: [
        { title: "Net Interest Income", value: "Core banking profitability" },
        { title: "Investment Banking Fees", value: "Wall Street services" },
        { title: "Credit Loss Provisions", value: "Risk management metric" },
      ],
      financials: [
        { title: "Return on Equity", value: "Shareholder value creation" },
        { title: "Tier 1 Capital Ratio", value: "Financial strength" },
        { title: "Efficiency Ratio", value: "Operational excellence" },
      ],
    },
    dating: {
      marketSentiment: "I'm the strong, dependable type that people turn to when they need financial help. I've got a reputation for being rock-solid and trustworthy. People know I can handle whatever the economy throws at me.",
      analystSentiment: "Wall Street respects me as the king of banking. Analysts love my diversified business model and strong leadership. They see me as the safe choice in an uncertain financial world.",
      historicalPerformance: "I've weathered every financial storm and come out stronger. My track record speaks for itself - I'm the bank that other banks wish they could be. Consistency is my middle name.",
    },
    marketCap: "$470B",
    revenueTTM: "$162B",
    peRatio: "12.8",
    headquarters: "New York, NY"
  },
  {
    id: "UNH",
    name: "UnitedHealth Group Inc.",
    ticker: "UNH",
    industry: "Healthcare",
    professional: {
      overview: "UnitedHealth is a healthcare behemoth combining insurance (UnitedHealthcare) with healthcare services (Optum). They're essentially trying to own the entire healthcare value chain.",
      kpis: [
        { title: "Medical Loss Ratio", value: "Insurance profitability" },
        { title: "Optum Revenue Growth", value: "Healthcare services expansion" },
        { title: "Membership Growth", value: "Insurance customer base" },
      ],
      financials: [
        { title: "Premium Revenue", value: "Insurance income" },
        { title: "Operating Cash Flow", value: "Strong cash generation" },
        { title: "Diversified Revenue", value: "Multiple business streams" },
      ],
    },
    dating: {
      marketSentiment: "People have mixed feelings about me - they need me but sometimes resent how big I've gotten. I'm essential to the healthcare system, which makes me powerful but also controversial.",
      analystSentiment: "Analysts love my business model and growth prospects. They see me benefiting from an aging population and increasing healthcare needs. My diversification across the healthcare chain impresses them.",
      historicalPerformance: "I've been a consistent winner, growing steadily year after year. Healthcare is recession-proof, and I've proven I can navigate the complex regulatory environment successfully.",
    },
    marketCap: "$540B",
    revenueTTM: "$371B",
    peRatio: "25.4",
    headquarters: "Minnetonka, MN"
  },
  {
    id: "XOM",
    name: "Exxon Mobil Corporation",
    ticker: "XOM",
    industry: "Energy",
    professional: {
      overview: "ExxonMobil is one of the world's largest oil and gas companies, involved in exploration, production, refining, and marketing. Despite ESG pressures, they remain a cash flow machine when energy prices are high.",
      kpis: [
        { title: "Oil Production", value: "Barrels per day output" },
        { title: "Refining Margins", value: "Processing profitability" },
        { title: "Capital Efficiency", value: "Returns on investment" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Highly cyclical" },
        { title: "Dividend Coverage", value: "Shareholder returns" },
        { title: "Debt Levels", value: "Balance sheet strength" },
      ],
    },
    dating: {
      marketSentiment: "I'm controversial - some people love my dividends and think I'm essential, while others see me as old-fashioned. The energy transition has made me a polarizing figure.",
      analystSentiment: "Analysts are split on me. Some love my cash generation and shareholder returns, others worry about my long-term future in a green energy world. I'm definitely a cyclical play.",
      historicalPerformance: "I've been through boom and bust cycles my whole life. When energy prices are high, I'm a superstar. When they're low, not so much. I'm working on becoming more efficient and sustainable.",
    },
    marketCap: "$460B",
    revenueTTM: "$334B",
    peRatio: "14.7",
    headquarters: "Irving, TX"
  },
  {
    id: "JNJ",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    industry: "Healthcare",
    professional: {
      overview: "Johnson & Johnson is a diversified healthcare giant with pharmaceutical, medical device, and consumer products divisions. Known for stability and innovation, recently spun off their consumer division.",
      kpis: [
        { title: "Pharmaceutical Sales", value: "High-margin drugs business" },
        { title: "Medical Device Revenue", value: "Surgical and diagnostic tools" },
        { title: "Pipeline Success", value: "Drug development progress" },
      ],
      financials: [
        { title: "Dividend History", value: "Dividend aristocrat status" },
        { title: "R&D Investment", value: "Innovation spending" },
        { title: "Global Revenue Mix", value: "Worldwide diversification" },
      ],
    },
    dating: {
      marketSentiment: "I'm the steady, reliable type that families trust. People have been using my products their whole lives. I'm not flashy, but I'm dependable and always there when you need me.",
      analystSentiment: "Analysts appreciate my consistency and strong fundamentals. They like my focus on higher-margin pharmaceuticals and see me as a defensive play in uncertain times.",
      historicalPerformance: "I've been a dividend aristocrat for decades - that's how reliable I am. My performance is steady rather than spectacular, but consistency has its own appeal.",
    },
    marketCap: "$440B",
    revenueTTM: "$85B",
    peRatio: "15.2",
    headquarters: "New Brunswick, NJ"
  },
  {
    id: "WMT",
    name: "Walmart Inc.",
    ticker: "WMT",
    industry: "Retail",
    professional: {
      overview: "Walmart is the world's largest retailer, known for low prices and massive scale. They're successfully transitioning to compete with Amazon through e-commerce and pickup/delivery services.",
      kpis: [
        { title: "Same-Store Sales Growth", value: "Core retail performance" },
        { title: "E-commerce Growth", value: "Digital transformation" },
        { title: "International Operations", value: "Global expansion" },
      ],
      financials: [
        { title: "Operating Cash Flow", value: "Strong cash generation" },
        { title: "Inventory Turnover", value: "Efficiency metrics" },
        { title: "Capital Expenditures", value: "Technology investments" },
      ],
    },
    dating: {
      marketSentiment: "I'm the practical choice that everyone's family shops at. People appreciate my low prices and convenience, especially during tough economic times. I'm essential to American life.",
      analystSentiment: "Analysts respect my ability to adapt and compete with Amazon. They like my defensive characteristics and steady cash flow. I'm seen as a reliable performer in retail.",
      historicalPerformance: "I've been a steady performer for decades. I'm not the most exciting stock, but I've consistently delivered for shareholders through dividends and modest growth.",
    },
    marketCap: "$650B",
    revenueTTM: "$648B",
    peRatio: "27.8",
    headquarters: "Bentonville, AR"
  },
  {
    id: "MA",
    name: "Mastercard Incorporated",
    ticker: "MA",
    industry: "Financial Services",
    professional: {
      overview: "Mastercard operates a global payment network similar to Visa, processing billions of transactions worldwide. They benefit from the shift to digital payments and have minimal credit risk.",
      kpis: [
        { title: "Gross Dollar Volume", value: "Total payment processing" },
        { title: "Cross-border Transactions", value: "International growth" },
        { title: "Purchase Transactions", value: "Volume growth" },
      ],
      financials: [
        { title: "Net Revenue Growth", value: "Transaction-based income" },
        { title: "Operating Margins", value: "Highly efficient model" },
        { title: "Return on Invested Capital", value: "Capital efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm Visa's main competitor and people see us as equally reliable. Every swipe, tap, or online purchase potentially involves me. I'm essential to modern commerce and people trust me.",
      analystSentiment: "Analysts love my business model just like Visa's - I get paid on transactions without credit risk. They see me benefiting from global digitization and the decline of cash.",
      historicalPerformance: "I've been a fantastic performer, growing consistently as digital payments expand worldwide. My stock has been a winner for long-term investors who believed in the cashless future.",
    },
    marketCap: "$420B",
    revenueTTM: "$25B",
    peRatio: "35.6",
    headquarters: "Purchase, NY"
  },
  {
    id: "PG",
    name: "Procter & Gamble Co.",
    ticker: "PG",
    industry: "Consumer Goods",
    professional: {
      overview: "P&G is a consumer goods giant owning brands like Tide, Crest, Pampers, and Gillette. They focus on everyday essentials that people buy regardless of economic conditions.",
      kpis: [
        { title: "Organic Sales Growth", value: "Core brand performance" },
        { title: "Market Share", value: "Category leadership" },
        { title: "Brand Portfolio", value: "Billion-dollar brands" },
      ],
      financials: [
        { title: "Gross Margins", value: "Premium brand pricing" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
        { title: "Dividend Growth", value: "Consistent shareholder returns" },
      ],
    },
    dating: {
      marketSentiment: "I'm the dependable partner who's always there for daily needs. People might not think about me much, but they use my products every day. I'm practical and reliable.",
      analystSentiment: "Analysts love my defensive characteristics and strong brands. They see me as a safe haven during economic uncertainty because people always need toothpaste and detergent.",
      historicalPerformance: "I'm a dividend aristocrat with decades of consistent performance. I'm not exciting, but I'm steady and reliable - the kind of stock that helps people sleep well at night.",
    },
    marketCap: "$360B",
    revenueTTM: "$82B",
    peRatio: "25.1",
    headquarters: "Cincinnati, OH"
  },
  {
    id: "HD",
    name: "The Home Depot, Inc.",
    ticker: "HD",
    industry: "Retail",
    professional: {
      overview: "Home Depot is the largest home improvement retailer, benefiting from homeownership trends and the DIY movement. They serve both professional contractors and weekend warriors.",
      kpis: [
        { title: "Comparable Store Sales", value: "Core retail performance" },
        { title: "Professional Customer Sales", value: "B2B contractor business" },
        { title: "Online Integration", value: "Digital transformation" },
      ],
      financials: [
        { title: "Return on Invested Capital", value: "Capital efficiency" },
        { title: "Operating Leverage", value: "Fixed cost absorption" },
        { title: "Inventory Management", value: "Working capital efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm the go-to for anyone who owns a home or wants to improve it. People see me as essential - whether they're fixing a leak or renovating their kitchen, I'm their first stop.",
      analystSentiment: "Analysts love my market leadership and strong execution. They see me benefiting from housing market trends and the American love affair with home improvement.",
      historicalPerformance: "I've been a consistent winner, especially during the pandemic when everyone was stuck at home doing projects. My performance has been solid through various economic cycles.",
    },
    marketCap: "$400B",
    revenueTTM: "$153B",
    peRatio: "26.3",
    headquarters: "Atlanta, GA"
  },
  {
    id: "NFLX",
    name: "Netflix, Inc.",
    ticker: "NFLX",
    industry: "Entertainment",
    professional: {
      overview: "Netflix pioneered streaming entertainment and remains the global leader with over 230 million subscribers worldwide. They've invested heavily in original content and international expansion.",
      kpis: [
        { title: "Subscriber Growth", value: "User base expansion" },
        { title: "Average Revenue Per User", value: "Monetization metric" },
        { title: "Content Engagement", value: "Viewing hours and retention" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Recently turned positive" },
        { title: "Content Spending", value: "Investment in originals" },
        { title: "International Revenue", value: "Global expansion" },
      ],
    },
    dating: {
      marketSentiment: "I'm the streaming pioneer everyone knows and loves. 'Netflix and chill' is literally part of the culture. People see me as essential entertainment, though they worry about all the competition now.",
      analystSentiment: "Analysts are mixed on me. Some love my global reach and content library, others worry about increased competition and slowing growth. The password-sharing crackdown has helped my case.",
      historicalPerformance: "I've had an incredible run, transforming from DVD-by-mail to streaming giant. My growth story has been amazing, though lately it's been more volatile as the market matures.",
    },
    marketCap: "$280B",
    revenueTTM: "$33B",
    peRatio: "44.8",
    headquarters: "Los Gatos, CA"
  },
  {
    id: "CRM",
    name: "Salesforce, Inc.",
    ticker: "CRM",
    industry: "Software",
    professional: {
      overview: "Salesforce is the leading customer relationship management (CRM) platform, helping businesses manage their sales, marketing, and customer service. They pioneered the Software-as-a-Service model.",
      kpis: [
        { title: "Subscription Revenue Growth", value: "Recurring revenue model" },
        { title: "Customer Retention Rate", value: "Sticky platform" },
        { title: "Platform Adoption", value: "Multi-cloud strategy" },
      ],
      financials: [
        { title: "Annual Recurring Revenue", value: "Predictable income" },
        { title: "Operating Margins", value: "Path to profitability" },
        { title: "Free Cash Flow", value: "Business model efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm the business software that companies can't live without. I help them manage their customers and grow their revenue. Businesses see me as essential to their success.",
      analystSentiment: "Analysts appreciate my dominant market position and sticky customer base. They like my recurring revenue model, though some want to see better profitability and growth acceleration.",
      historicalPerformance: "I've been a solid grower in the cloud software space. My performance has been strong over the long term, though I've faced some volatility as investors focus more on profitability.",
    },
    marketCap: "$320B",
    revenueTTM: "$34B",
    peRatio: "58.7",
    headquarters: "San Francisco, CA"
  },
  {
    id: "DIS",
    name: "The Walt Disney Company",
    ticker: "DIS",
    industry: "Entertainment",
    professional: {
      overview: "Disney is a diversified entertainment company with theme parks, movies, streaming (Disney+), and media networks. They own some of the world's most valuable intellectual property and brands.",
      kpis: [
        { title: "Disney+ Subscribers", value: "Streaming growth" },
        { title: "Parks Revenue", value: "High-margin business" },
        { title: "Box Office Performance", value: "Movie success" },
      ],
      financials: [
        { title: "Streaming Profitability", value: "Path to break-even" },
        { title: "Parks Operating Income", value: "Core profit driver" },
        { title: "Content Investment", value: "IP development" },
      ],
    },
    dating: {
      marketSentiment: "I'm magical and beloved, but people worry I've lost some of my sparkle lately. Families still love me, but investors are concerned about my streaming losses and cultural controversies.",
      analystSentiment: "Analysts are cautiously optimistic about my turnaround efforts. They love my irreplaceable IP but want to see streaming become profitable and parks maintain their momentum.",
      historicalPerformance: "I've had ups and downs, especially during COVID when my parks were closed. My streaming launch was exciting, but the losses have been concerning. I'm working on my comeback.",
    },
    marketCap: "$210B",
    revenueTTM: "$83B",
    peRatio: "39.8",
    headquarters: "Burbank, CA"
  },
  {
    id: "ADBE",
    name: "Adobe Inc.",
    ticker: "ADBE",
    industry: "Software",
    professional: {
      overview: "Adobe dominates creative software with products like Photoshop, Illustrator, and Premiere Pro. They've successfully transitioned to a subscription model and are expanding into digital marketing and document services.",
      kpis: [
        { title: "Creative Cloud Subscribers", value: "Core creative business" },
        { title: "Digital Experience Revenue", value: "Marketing cloud growth" },
        { title: "Document Cloud Revenue", value: "PDF and e-signature" },
      ],
      financials: [
        { title: "Subscription Revenue", value: "Recurring revenue model" },
        { title: "Operating Margins", value: "High-margin software" },
        { title: "Customer Retention", value: "Sticky creative tools" },
      ],
    },
    dating: {
      marketSentiment: "I'm essential to creative professionals worldwide. Designers, photographers, and marketers can't live without me. People might complain about my subscription prices, but they keep paying them.",
      analystSentiment: "Analysts love my dominant market position and pricing power. They see me as a steady grower with strong competitive moats. My transition to AI-enhanced tools excites them.",
      historicalPerformance: "I've been a consistent winner in the software space. My transition from perpetual licenses to subscriptions was brilliant and has created steady, predictable growth.",
    },
    marketCap: "$240B",
    revenueTTM: "$20B",
    peRatio: "45.2",
    headquarters: "San Jose, CA"
  },
  {
    id: "KO",
    name: "The Coca-Cola Company",
    ticker: "KO",
    industry: "Beverages",
    professional: {
      overview: "Coca-Cola is the world's largest beverage company, owning over 500 brands. While facing health-conscious trends, they're diversifying beyond traditional sodas into water, coffee, and healthier options.",
      kpis: [
        { title: "Unit Case Volume", value: "Global beverage consumption" },
        { title: "Price/Mix Improvement", value: "Revenue optimization" },
        { title: "Market Share", value: "Category leadership" },
      ],
      financials: [
        { title: "Organic Revenue Growth", value: "Core business performance" },
        { title: "Operating Margins", value: "Efficiency improvements" },
        { title: "Free Cash Flow", value: "Dividend sustainability" },
      ],
    },
    dating: {
      marketSentiment: "I'm a classic that never goes out of style. People have been enjoying me for over a century. Sure, health trends worry some, but I'm adapting and staying relevant.",
      analystSentiment: "Analysts appreciate my global reach and brand strength. They like my dividend consistency and see me as a defensive play, though they want to see more growth innovation.",
      historicalPerformance: "I'm the definition of a blue-chip stock. My dividend history is legendary, and I've provided steady returns for generations of investors. I'm reliability personified.",
    },
    marketCap: "$270B",
    revenueTTM: "$46B",
    peRatio: "25.8",
    headquarters: "Atlanta, GA"
  },
  {
    id: "PEP",
    name: "PepsiCo, Inc.",
    ticker: "PEP",
    industry: "Food & Beverages",
    professional: {
      overview: "PepsiCo is more diversified than Coca-Cola, with both beverages (Pepsi, Gatorade) and snacks (Frito-Lay, Quaker). This diversification provides more stability and growth opportunities.",
      kpis: [
        { title: "Frito-Lay Performance", value: "Snack business dominance" },
        { title: "Beverage Innovation", value: "Product development" },
        { title: "International Expansion", value: "Global growth" },
      ],
      financials: [
        { title: "Organic Growth", value: "Core business expansion" },
        { title: "Productivity Savings", value: "Operational efficiency" },
        { title: "Capital Allocation", value: "Shareholder returns" },
      ],
    },
    dating: {
      marketSentiment: "I'm Coke's main rival, but people see me as more well-rounded with my snack business. I'm at every party, game, and gathering. I'm fun and dependable.",
      analystSentiment: "Analysts often prefer me to Coke because of my diversification. They like my snack business's resilience and see me as better positioned for changing consumer preferences.",
      historicalPerformance: "I've been a steady performer with consistent dividend growth. My diversified model has helped me weather various market conditions better than pure-play beverage companies.",
    },
    marketCap: "$230B",
    revenueTTM: "$91B",
    peRatio: "25.1",
    headquarters: "Purchase, NY"
  },
  {
    id: "TMO",
    name: "Thermo Fisher Scientific Inc.",
    ticker: "TMO",
    industry: "Life Sciences",
    professional: {
      overview: "Thermo Fisher is a leading life sciences company providing analytical instruments, laboratory equipment, and services to healthcare, research, and industrial markets. They were crucial during the COVID pandemic.",
      kpis: [
        { title: "Life Sciences Solutions", value: "Research and biotech tools" },
        { title: "Analytical Instruments", value: "High-end equipment" },
        { title: "Specialty Diagnostics", value: "Testing solutions" },
      ],
      financials: [
        { title: "Organic Growth", value: "Core business expansion" },
        { title: "Acquisition Integration", value: "M&A strategy" },
        { title: "Operating Leverage", value: "Margin expansion" },
      ],
    },
    dating: {
      marketSentiment: "I'm the behind-the-scenes hero of scientific breakthroughs. I help discover new medicines and advance human knowledge. People respect what I do, even if they don't always understand it.",
      analystSentiment: "Analysts love my essential role in life sciences and my strong competitive position. They see me benefiting from increased R&D spending and aging demographics driving healthcare innovation.",
      historicalPerformance: "I've been a consistent winner in the life sciences space. My performance was especially strong during COVID, and I've maintained solid growth as a critical infrastructure provider.",
    },
    marketCap: "$210B",
    revenueTTM: "$42B",
    peRatio: "30.5",
    headquarters: "Waltham, MA"
  },
  {
    id: "AVGO",
    name: "Broadcom Inc.",
    ticker: "AVGO",
    industry: "Technology",
    professional: {
      overview: "Broadcom is a diversified technology company that designs and develops semiconductor and infrastructure software solutions. They serve multiple industries including data center, networking, broadband, wireless, and industrial markets.",
      kpis: [
        { title: "Semiconductor Revenue", value: "Core hardware business" },
        { title: "Infrastructure Software", value: "High-margin recurring revenue" },
        { title: "AI Chip Demand", value: "Next-generation computing" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Strong cash generation" },
        { title: "R&D Investment", value: "Innovation in chips and software" },
        { title: "Acquisition Strategy", value: "Strategic M&A activity" },
      ],
    },
    dating: {
      marketSentiment: "I'm the tech company that makes the stuff that makes everything else work. People might not know my name, but I'm in their phones, cars, and data centers. I'm essential infrastructure.",
      analystSentiment: "Analysts love my diversified business model and strong cash flow. They see me benefiting from AI trends and the ongoing digital transformation across industries.",
      historicalPerformance: "I've been a consistent performer in the semiconductor space. My combination of hardware and software gives me more stability than pure-play chip companies.",
    },
    marketCap: "$660B",
    revenueTTM: "$38B",
    peRatio: "33.2",
    headquarters: "San Jose, CA"
  },
  {
    id: "COST",
    name: "Costco Wholesale Corporation",
    ticker: "COST",
    industry: "Retail",
    professional: {
      overview: "Costco operates membership-only warehouse clubs, offering a limited selection of merchandise in bulk packaging at low prices. Their membership model creates recurring revenue and customer loyalty.",
      kpis: [
        { title: "Membership Renewal Rate", value: "Customer loyalty metric" },
        { title: "Same-Store Sales Growth", value: "Core retail performance" },
        { title: "Membership Fee Revenue", value: "High-margin income" },
      ],
      financials: [
        { title: "Gross Margins", value: "Intentionally low for value" },
        { title: "Membership Revenue", value: "Profit driver" },
        { title: "Inventory Turnover", value: "Operational efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm the warehouse store that people are obsessed with. My members are loyal to a fault - they'll drive across town to save money and buy giant jars of mayo. I'm practical and beloved.",
      analystSentiment: "Analysts love my membership model and customer loyalty. They see me as recession-resistant because people want value, especially during tough times. My execution is consistently strong.",
      historicalPerformance: "I've been a steady winner in retail for decades. My membership model gives me predictable revenue, and my execution has been nearly flawless. I'm the tortoise that keeps winning.",
    },
    marketCap: "$380B",
    revenueTTM: "$242B",
    peRatio: "52.1",
    headquarters: "Issaquah, WA"
  },
  {
    id: "ABBV",
    name: "AbbVie Inc.",
    ticker: "ABBV",
    industry: "Pharmaceuticals",
    professional: {
      overview: "AbbVie is a research-based pharmaceutical company focused on developing and commercializing advanced therapies for complex diseases. They're known for blockbuster drugs like Humira and are building their pipeline for future growth.",
      kpis: [
        { title: "Drug Pipeline Success", value: "Future revenue potential" },
        { title: "Patent Cliff Management", value: "Protecting key drugs" },
        { title: "International Expansion", value: "Global market penetration" },
      ],
      financials: [
        { title: "R&D Investment", value: "Innovation spending" },
        { title: "Operating Margins", value: "High-value medications" },
        { title: "Free Cash Flow", value: "Dividend sustainability" },
      ],
    },
    dating: {
      marketSentiment: "I'm the pharma company that makes life-changing medications. People see me as essential for treating serious diseases, though they sometimes worry about drug prices. I'm focused on helping patients.",
      analystSentiment: "Analysts appreciate my strong pipeline and ability to develop breakthrough therapies. They like my dividend yield but watch carefully for patent expirations and new drug approvals.",
      historicalPerformance: "I've been a solid performer since spinning off from Abbott. My focus on pharmaceuticals has paid off, though I face the typical challenges of patent cliffs in the drug business.",
    },
    marketCap: "$320B",
    revenueTTM: "$58B",
    peRatio: "15.8",
    headquarters: "North Chicago, IL"
  },
  {
    id: "ORCL",
    name: "Oracle Corporation",
    ticker: "ORCL",
    industry: "Software",
    professional: {
      overview: "Oracle is a multinational computer technology company specializing in database software and cloud computing. They're a leader in enterprise software and are transitioning to cloud-based services.",
      kpis: [
        { title: "Cloud Revenue Growth", value: "Strategic transformation" },
        { title: "Database Market Share", value: "Core franchise" },
        { title: "Enterprise Customer Base", value: "Sticky business relationships" },
      ],
      financials: [
        { title: "Subscription Revenue", value: "Recurring income model" },
        { title: "Operating Margins", value: "Software profitability" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
      ],
    },
    dating: {
      marketSentiment: "I'm the enterprise software company that big businesses depend on. I might not be as flashy as the newer tech companies, but I'm reliable and essential for running major operations.",
      analystSentiment: "Analysts respect my dominant position in databases and enterprise software. They're watching my cloud transition closely and like my strong cash flow and shareholder returns.",
      historicalPerformance: "I've been a steady performer in enterprise software for decades. My transition to cloud has been gradual but successful, and I've consistently returned cash to shareholders.",
    },
    marketCap: "$330B",
    revenueTTM: "$52B",
    peRatio: "25.4",
    headquarters: "Austin, TX"
  },
  {
    id: "ACN",
    name: "Accenture plc",
    ticker: "ACN",
    industry: "Consulting",
    professional: {
      overview: "Accenture is a global professional services company providing strategy, consulting, digital, technology, and operations services. They help companies transform their businesses through technology and innovation.",
      kpis: [
        { title: "Digital Transformation Revenue", value: "Growth area focus" },
        { title: "Client Retention Rate", value: "Long-term relationships" },
        { title: "Consulting Bookings", value: "Future revenue pipeline" },
      ],
      financials: [
        { title: "Operating Margins", value: "Professional services efficiency" },
        { title: "Revenue Growth", value: "Market share expansion" },
        { title: "Return on Invested Capital", value: "Capital efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm the consulting firm that helps big companies figure out their digital future. Businesses see me as essential for navigating technology changes and staying competitive in the modern world.",
      analystSentiment: "Analysts love my consistent execution and growth in digital services. They see me benefiting from the ongoing digital transformation that every company needs to undergo.",
      historicalPerformance: "I've been a consistent winner in professional services. My ability to evolve with technology trends and help clients transform has made me a reliable growth story.",
    },
    marketCap: "$210B",
    revenueTTM: "$64B",
    peRatio: "30.8",
    headquarters: "Dublin, Ireland"
  },
  {
    id: "CSCO",
    name: "Cisco Systems, Inc.",
    ticker: "CSCO",
    industry: "Technology",
    professional: {
      overview: "Cisco is a worldwide leader in networking hardware, software, and services. They provide the infrastructure that powers the internet and help organizations connect, secure, and automate their operations.",
      kpis: [
        { title: "Networking Equipment Sales", value: "Core hardware business" },
        { title: "Software and Services Growth", value: "Recurring revenue focus" },
        { title: "Security Solutions Revenue", value: "High-growth segment" },
      ],
      financials: [
        { title: "Gross Margins", value: "Premium networking solutions" },
        { title: "R&D Investment", value: "Innovation in networking" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
      ],
    },
    dating: {
      marketSentiment: "I'm the networking company that keeps the internet running. People might not think about me daily, but I'm essential infrastructure that everything else depends on. I'm reliable and trusted.",
      analystSentiment: "Analysts respect my dominant position in networking but want to see more growth in software and services. They like my dividend and strong cash flow generation.",
      historicalPerformance: "I've been a steady performer in networking for decades. While my growth has slowed from my early days, I remain profitable and return significant cash to shareholders.",
    },
    marketCap: "$200B",
    revenueTTM: "$57B",
    peRatio: "19.2",
    headquarters: "San Jose, CA"
  },
  {
    id: "INTC",
    name: "Intel Corporation",
    ticker: "INTC",
    industry: "Technology",
    professional: {
      overview: "Intel is a leading semiconductor company that designs and manufactures microprocessors and other computing components. They're working to regain their leadership position in chip manufacturing and expand into new markets.",
      kpis: [
        { title: "CPU Market Share", value: "Core processor business" },
        { title: "Data Center Revenue", value: "Enterprise and cloud chips" },
        { title: "Manufacturing Process Node", value: "Technology leadership" },
      ],
      financials: [
        { title: "Capital Expenditures", value: "Fab investment spending" },
        { title: "R&D Investment", value: "Innovation and development" },
        { title: "Operating Margins", value: "Manufacturing efficiency" },
      ],
    },
    dating: {
      marketSentiment: "I'm the chip company that used to be on top of the world but has been struggling lately. People still respect my legacy and hope I can make a comeback. I'm working hard to prove myself again.",
      analystSentiment: "Analysts are cautiously optimistic about my turnaround efforts. They like my dividend yield but want to see execution on manufacturing improvements and new product launches.",
      historicalPerformance: "I've had better days, honestly. I used to dominate the chip industry, but I've fallen behind in recent years. I'm investing heavily to regain my competitive edge.",
    },
    marketCap: "$90B",
    revenueTTM: "$63B",
    peRatio: "18.5",
    headquarters: "Santa Clara, CA"
  },
  {
    id: "IBM",
    name: "International Business Machines Corporation",
    ticker: "IBM",
    industry: "Technology",
    professional: {
      overview: "IBM is a multinational technology company that provides hardware, software, and consulting services. They're focusing on hybrid cloud, AI, and enterprise services while transitioning from their legacy businesses.",
      kpis: [
        { title: "Cloud and Cognitive Software", value: "Growth area focus" },
        { title: "Consulting Revenue", value: "Professional services" },
        { title: "AI and Analytics Adoption", value: "Next-generation solutions" },
      ],
      financials: [
        { title: "Free Cash Flow", value: "Strong cash generation" },
        { title: "R&D Investment", value: "Innovation spending" },
        { title: "Dividend Coverage", value: "Shareholder returns" },
      ],
    },
    dating: {
      marketSentiment: "I'm the tech veteran that's been around forever. People respect my history and expertise, but they wonder if I can stay relevant in the modern tech world. I'm working on reinventing myself.",
      analystSentiment: "Analysts appreciate my dividend and strong cash flow, but they want to see more growth and successful transformation to cloud and AI services. I'm a show-me story.",
      historicalPerformance: "I've been through many transformations over the decades. My recent performance has been challenging, but I'm investing in new areas like AI and hybrid cloud to drive future growth.",
    },
    marketCap: "$170B",
    revenueTTM: "$62B",
    peRatio: "22.1",
    headquarters: "Armonk, NY"
  },
  {
    id: "QCOM",
    name: "QUALCOMM Incorporated",
    ticker: "QCOM",
    industry: "Technology",
    professional: {
      overview: "Qualcomm is a leading wireless technology company that designs and licenses wireless telecommunications products and services. They're essential to mobile communications and are expanding into automotive and IoT markets.",
      kpis: [
        { title: "Mobile Chip Sales", value: "Smartphone processor business" },
        { title: "Patent Licensing Revenue", value: "High-margin IP income" },
        { title: "5G Technology Adoption", value: "Next-generation wireless" },
      ],
      financials: [
        { title: "Licensing Margins", value: "IP monetization" },
        { title: "R&D Investment", value: "Wireless innovation" },
        { title: "Free Cash Flow", value: "Strong cash generation" },
      ],
    },
    dating: {
      marketSentiment: "I'm the wireless technology company that makes mobile communication possible. People might not know my name, but I'm in almost every smartphone. I'm essential to the connected world.",
      analystSentiment: "Analysts love my patent portfolio and licensing business model. They see me benefiting from 5G adoption and expansion into new markets like automotive and IoT.",
      historicalPerformance: "I've been a solid performer in wireless technology. My combination of chip sales and patent licensing gives me multiple revenue streams and strong profitability.",
    },
    marketCap: "$180B",
    revenueTTM: "$39B",
    peRatio: "17.3",
    headquarters: "San Diego, CA"
  },
  {
    id: "AMD",
    name: "Advanced Micro Devices, Inc.",
    ticker: "AMD",
    industry: "Technology",
    professional: {
      overview: "AMD designs and produces microprocessors, graphics processors, and related technologies for computers and data centers. They've gained significant market share from Intel and are expanding into AI and data center markets.",
      kpis: [
        { title: "CPU Market Share Gains", value: "Competing with Intel" },
        { title: "Data Center Revenue", value: "Enterprise growth area" },
        { title: "GPU Performance", value: "Graphics and AI computing" },
      ],
      financials: [
        { title: "Revenue Growth", value: "Market share expansion" },
        { title: "Gross Margins", value: "Product mix improvement" },
        { title: "R&D Investment", value: "Technology advancement" },
      ],
    },
    dating: {
      marketSentiment: "I'm the underdog chip company that's been making a huge comeback. People love my David vs. Goliath story against Intel. Gamers and tech enthusiasts are really passionate about me.",
      analystSentiment: "Analysts are impressed with my execution and market share gains. They see me as a legitimate competitor in CPUs and a growing force in data center and AI chips.",
      historicalPerformance: "My turnaround story has been incredible. I went from near-bankruptcy to being a major player in semiconductors. My stock performance has been one of the best comeback stories in tech.",
    },
    marketCap: "$220B",
    revenueTTM: "$25B",
    peRatio: "28.4",
    headquarters: "Santa Clara, CA"
  }
];
