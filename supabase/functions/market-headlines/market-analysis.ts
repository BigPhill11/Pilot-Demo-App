
import { ProcessedHeadline, MarketRecap } from './types.ts';

interface TopicAnalysis {
  tech: number;
  finance: number;
  energy: number;
  healthcare: number;
  retail: number;
  crypto: number;
  general: number;
}

interface SentimentAnalysis {
  positive: number;
  negative: number;
  neutral: number;
}

export function generateMarketRecap(headlines: ProcessedHeadline[], userLevel: string = 'beginner'): MarketRecap {
  const topics: TopicAnalysis = {
    tech: 0,
    finance: 0,
    energy: 0,
    healthcare: 0,
    retail: 0,
    crypto: 0,
    general: 0
  };
  
  const sentiments: SentimentAnalysis = {
    positive: 0,
    negative: 0,
    neutral: 0
  };
  
  headlines.forEach(headline => {
    const titleLower = headline.title.toLowerCase();
    const summaryLower = headline.summary.toLowerCase();
    const content = titleLower + ' ' + summaryLower;
    
    // Categorize by sector
    if (content.includes('tech') || content.includes('technology') || content.includes('ai') || content.includes('software') || content.includes('cloud')) {
      topics.tech++;
    } else if (content.includes('bank') || content.includes('fed') || content.includes('interest') || content.includes('finance') || content.includes('monetary')) {
      topics.finance++;
    } else if (content.includes('oil') || content.includes('energy') || content.includes('renewable') || content.includes('gas') || content.includes('crude')) {
      topics.energy++;
    } else if (content.includes('health') || content.includes('pharma') || content.includes('drug') || content.includes('medical')) {
      topics.healthcare++;
    } else if (content.includes('retail') || content.includes('consumer') || content.includes('sales') || content.includes('shopping')) {
      topics.retail++;
    } else if (content.includes('crypto') || content.includes('bitcoin') || content.includes('digital asset') || content.includes('blockchain')) {
      topics.crypto++;
    } else {
      topics.general++;
    }
    
    // Analyze sentiment
    if (content.includes('gain') || content.includes('rise') || content.includes('up') || content.includes('positive') || content.includes('growth') || content.includes('strong') || content.includes('robust')) {
      sentiments.positive++;
    } else if (content.includes('fall') || content.includes('decline') || content.includes('down') || content.includes('negative') || content.includes('loss') || content.includes('weak') || content.includes('concern')) {
      sentiments.negative++;
    } else {
      sentiments.neutral++;
    }
  });
  
  const dominantTopic = Object.keys(topics).reduce((a, b) => topics[a as keyof TopicAnalysis] > topics[b as keyof TopicAnalysis] ? a : b);
  const dominantSentiment = Object.keys(sentiments).reduce((a, b) => sentiments[a as keyof SentimentAnalysis] > sentiments[b as keyof SentimentAnalysis] ? a : b);
  
  const activeSectors = Object.keys(topics).filter(t => topics[t as keyof TopicAnalysis] > 0);
  
  // Generate level-appropriate content
  let paragraph1 = '';
  let paragraph2 = '';
  let tldr = '';
  
  switch (userLevel) {
    case 'beginner':
      paragraph1 = generateBeginnerParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateBeginnerParagraph2(activeSectors, sentiments);
      tldr = generateBeginnerTldr(dominantSentiment, dominantTopic);
      break;
    case 'intermediate':
      paragraph1 = generateIntermediateParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateIntermediateParagraph2(activeSectors, sentiments);
      tldr = generateIntermediateTldr(dominantSentiment, dominantTopic);
      break;
    case 'advanced':
      paragraph1 = generateAdvancedParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateAdvancedParagraph2(activeSectors, sentiments);
      tldr = generateAdvancedTldr(dominantSentiment, dominantTopic);
      break;
    default:
      paragraph1 = generateBeginnerParagraph1(dominantSentiment, dominantTopic, topics);
      paragraph2 = generateBeginnerParagraph2(activeSectors, sentiments);
      tldr = generateBeginnerTldr(dominantSentiment, dominantTopic);
  }
  
  return {
    paragraphs: [paragraph1, paragraph2],
    tldr: tldr,
    sentiment: dominantSentiment,
    dominantSector: dominantTopic
  };
}

function generateBeginnerParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const moodText = sentiment === 'positive' ? 'good news and rising prices' : sentiment === 'negative' ? 'concerns and falling prices' : 'mixed results';
  const sectorText = topic === 'tech' ? 'technology companies like Apple, Google, and Microsoft' : topic === 'finance' ? 'banks and financial companies like JPMorgan and Bank of America' : topic === 'energy' ? 'oil and energy companies like ExxonMobil and Chevron' : 'various businesses across different industries';
  
  return `Today's stock market showed ${moodText} as investors focused heavily on ${sectorText}. The market reflects how people feel about buying and selling company shares, which directly affects the value of businesses we interact with every day. When stock prices go up, it usually means companies are doing well and making good profits, which can lead to more jobs and economic growth. Understanding these daily market movements helps us see how the broader economy is performing and what it might mean for our personal finances and future investment opportunities.`;
}

function generateBeginnerParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const totalNews = sentiments.positive + sentiments.negative + sentiments.neutral;
  const mainMood = sentiments.positive > sentiments.negative ? 'optimistic' : sentiments.negative > sentiments.positive ? 'cautious' : 'uncertain';
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return `As of ${currentDate}, with ${totalNews} major news stories affecting different industries, investors are feeling ${mainMood} about the future direction of the market. This sentiment matters tremendously because when stock prices change, it directly affects millions of Americans' retirement accounts, college savings plans, and the overall health of our economy. The ripple effects extend beyond Wall Street to Main Street, influencing everything from job creation to consumer spending patterns. Smart investors pay attention to these daily market signals to make informed decisions about their long-term financial goals and understand how current events might impact their investment portfolios.`;
}

function generateBeginnerTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return `On ${todayDate}, the stock market had a ${sentiment} day with ${topic} companies getting the most attention from investors. This market movement affects everyone's investments and gives us clues about where the economy might be heading in the coming weeks.`;
}

function generateIntermediateParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorCount = Object.values(topics).filter(count => count > 0).length;
  const leadingSector = topic === 'tech' ? 'technology' : topic === 'finance' ? 'financials' : topic === 'energy' ? 'energy' : topic;
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return `As of ${currentDate}, the market tone was ${sentiment}. Attention was centered on ${leadingSector}, with news tied to rates, inflation, earnings, and policy. Moves were broad across ~${sectorCount} sectors.`;
}

function generateIntermediateParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const total = sentiments.positive + sentiments.negative + sentiments.neutral || 1;
  const positiveShare = Math.round((sentiments.positive / total) * 100);
  const sectorWord = sectors.length > 0 ? sectors.length.toString() : 'several';

  return `${positiveShare}% of notable stories leaned positive across ${sectorWord} sectors. Investors are watching the next data releases and Fed comments to confirm the trend.`;
}

function generateIntermediateTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const leader = topic === 'tech' ? 'technology' : topic === 'finance' ? 'financials' : topic;
  return `On ${todayDate}, markets had a ${sentiment} tilt with ${leader} in focus. Traders watched rates, inflation, and earnings for direction.`;
}

function generateAdvancedParagraph1(sentiment: string, topic: string, topics: TopicAnalysis): string {
  const sectorCount = Object.values(topics).filter(count => count > 0).length;
  const leader = topic === 'tech' ? 'technology' : topic === 'finance' ? 'financials' : topic === 'energy' ? 'energy' : topic;
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return `As of ${currentDate}, breadth was ${sentiment} across ~${sectorCount} sectors, with leadership in ${leader}. The tape reacted to rates, inflation prints, earnings updates, and policy signals.`;
}

function generateAdvancedParagraph2(sectors: string[], sentiments: SentimentAnalysis): string {
  const total = sentiments.positive + sentiments.negative + sentiments.neutral || 1;
  const tone = sentiments.positive > sentiments.negative ? 'constructive' : sentiments.negative > sentiments.positive ? 'cautious' : 'mixed';
  const sectorWord = sectors.length > 0 ? sectors.length.toString() : 'several';

  return `Tone was ${tone} with ${sectorWord} sectors in play. Positioning remains sensitive to upcoming data and Fed commentary.`;
}

function generateAdvancedTldr(sentiment: string, topic: string): string {
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const leader = topic === 'tech' ? 'technology' : topic === 'finance' ? 'financials' : topic;
  return `On ${todayDate}, market tone was ${sentiment} with ${leader} leading. Focus stayed on rates, inflation, and earnings catalysts.`;
}
