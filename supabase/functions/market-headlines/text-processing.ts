
export function extractKeyPoints(title: string, text: string, userLevel: string = 'beginner'): string {
  if (!text || text.length < 50) return createFallbackTLDR(title, userLevel);

  // Extract key financial concepts from the full article
  const keyFinancialData = extractFinancialData(text);
  const mainSubject = extractMainSubject(title, text);
  const impact = extractImpact(text);
  
  return createLevelAppropiateTLDR(mainSubject, keyFinancialData, impact, userLevel);
}

function extractFinancialData(text: string): string[] {
  const patterns = [
    /\$[\d,]+\.?\d*[BbMmKkTt]?/g, // Dollar amounts
    /\d+\.?\d*%/g, // Percentages
    /up \d+\.?\d*%|down \d+\.?\d*%|rose \d+\.?\d*%|fell \d+\.?\d*%|gained \d+\.?\d*%|dropped \d+\.?\d*%/gi,
    /earnings|revenue|profit|loss|growth|decline|rates|inflation|GDP/gi,
  ];
  
  const matches = [];
  for (const pattern of patterns) {
    const found = text.match(pattern);
    if (found) matches.push(...found.slice(0, 2));
  }
  
  return matches;
}

function extractMainSubject(title: string, text: string): string {
  const combinedText = title + ' ' + text;
  
  if (combinedText.match(/\b(Apple|Microsoft|Google|Amazon|Tesla|Meta)\b/gi)) {
    return 'major tech company';
  } else if (combinedText.match(/\b(bank|JPMorgan|Goldman|Wells Fargo|financial|Fed|interest rate)\b/gi)) {
    return 'financial institution';
  } else if (combinedText.match(/\b(oil|energy|Exxon|renewable|gas)\b/gi)) {
    return 'energy sector';
  } else if (combinedText.match(/\b(stock market|S&P|Dow|Nasdaq|trading)\b/gi)) {
    return 'stock market';
  } else if (combinedText.match(/\b(economy|economic|GDP|inflation|jobs)\b/gi)) {
    return 'economic indicator';
  }
  
  return 'market development';
}

function extractImpact(text: string): 'positive' | 'negative' | 'neutral' {
  const positiveWords = text.match(/\b(gain|rise|up|increase|growth|strong|beat|exceed|positive|boost)\b/gi) || [];
  const negativeWords = text.match(/\b(fall|decline|down|decrease|loss|weak|miss|below|negative|concern)\b/gi) || [];
  
  if (positiveWords.length > negativeWords.length) return 'positive';
  if (negativeWords.length > positiveWords.length) return 'negative';
  return 'neutral';
}

function createLevelAppropiateTLDR(subject: string, data: string[], impact: 'positive' | 'negative' | 'neutral', userLevel: string): string {
  const impactText = impact === 'positive' ? 'gained' : impact === 'negative' ? 'lost' : 'moved';
  const keyData = data.length > 0 ? data[0] : '';
  
  switch (userLevel) {
    case 'beginner':
      return `A ${subject} ${impactText} value today${keyData ? ` by ${keyData}` : ''}, affecting investor decisions.`;
    case 'intermediate':
      return `${subject.charAt(0).toUpperCase() + subject.slice(1)} reported ${impact} results${keyData ? ` with ${keyData} change` : ''}, influencing market sentiment.`;
    case 'advanced':
      return `${subject.charAt(0).toUpperCase() + subject.slice(1)} demonstrated ${impact} performance${keyData ? ` registering ${keyData}` : ''}, impacting systematic risk factors.`;
    default:
      return `A ${subject} ${impactText} value today${keyData ? ` by ${keyData}` : ''}, affecting investor decisions.`;
  }
}

function createFallbackTLDR(title: string, userLevel: string): string {
  const subject = extractMainSubject(title, '');
  
  switch (userLevel) {
    case 'beginner':
      return `Important news about ${subject} that could affect people's investments and savings.`;
    case 'intermediate':
      return `Market-relevant development in ${subject} with potential portfolio implications for investors.`;
    case 'advanced':
      return `${subject.charAt(0).toUpperCase() + subject.slice(1)} catalyst with systematic implications for factor exposure and risk-adjusted returns.`;
    default:
      return `Important news about ${subject} that could affect people's investments and savings.`;
  }
}

export function createSummary(article: any, userLevel: string = 'beginner'): string {
  const sourceText = article.description || article.content || '';
  
  if (sourceText && sourceText.length > 50 && sourceText !== 'ONLY AVAILABLE IN PAID PLANS') {
    return createLevelAppropriateSummary(sourceText, article.title, userLevel);
  } else {
    return createGenericSummary(article.title, userLevel);
  }
}

function createLevelAppropriateSummary(text: string, title: string, userLevel: string): string {
  // Extract 3 most important sentences
  const sentences = text
    .split(/[.!?]+/)
    .filter((s: string) => s.trim().length > 20)
    .map((s: string) => s.trim())
    .slice(0, 5); // Get more to choose from
  
  // Score sentences by importance (financial keywords, numbers, etc.)
  const scoredSentences = sentences.map(sentence => ({
    text: sentence,
    score: scoreFinancialImportance(sentence)
  })).sort((a, b) => b.score - a.score).slice(0, 3);
  
  const selectedSentences = scoredSentences.map(s => s.text);
  
  // Adjust language complexity based on user level
  return selectedSentences.map(sentence => adjustComplexity(sentence, userLevel)).join('. ') + '.';
}

function scoreFinancialImportance(sentence: string): number {
  let score = 0;
  const lowerSentence = sentence.toLowerCase();
  
  // Financial keywords
  if (lowerSentence.match(/\$[\d,]+/)) score += 3;
  if (lowerSentence.match(/\d+\.?\d*%/)) score += 3;
  if (lowerSentence.match(/\b(revenue|earnings|profit|sales|growth)\b/)) score += 2;
  if (lowerSentence.match(/\b(stock|share|market|investor|trading)\b/)) score += 2;
  if (lowerSentence.match(/\b(quarter|quarterly|annual|year)\b/)) score += 1;
  
  return score;
}

function adjustComplexity(sentence: string, userLevel: string): string {
  switch (userLevel) {
    case 'beginner':
      return sentence
        .replace(/\bequity\b/gi, 'stock')
        .replace(/\bvolatility\b/gi, 'price changes')
        .replace(/\bliquidity\b/gi, 'available cash')
        .replace(/\bcapitalization\b/gi, 'company size')
        .replace(/\bvaluation\b/gi, 'company worth');
    case 'intermediate':
      return sentence
        .replace(/\bshareholder equity\b/gi, 'company ownership value')
        .replace(/\bmarket cap\b/gi, 'total company value')
        .replace(/\bEBITDA\b/gi, 'operating profit');
    case 'advanced':
      return sentence; // Keep original complexity
    default:
      return adjustComplexity(sentence, 'beginner');
  }
}

function createGenericSummary(title: string, userLevel: string): string {
  const subject = extractMainSubject(title, '');
  
  switch (userLevel) {
    case 'beginner':
      return `This news is about ${subject} and how it affects the stock market. When companies make money or lose money, it changes how much their stocks are worth. This is important because many people have investments that can go up or down based on this news.`;
    case 'intermediate':
      return `This development involves ${subject} and its impact on market valuations and investor sentiment. The news affects stock prices through changes in company fundamentals and market perception. Portfolio managers and individual investors monitor such developments for investment decision-making.`;
    case 'advanced':
      return `This catalyst represents a systematic factor affecting ${subject} with implications for risk-adjusted returns and portfolio optimization. The development impacts factor loadings, correlation matrices, and alpha generation opportunities. Institutional investors adjust position sizing and hedging strategies based on such fundamental catalysts.`;
    default:
      return createGenericSummary(title, 'beginner');
  }
}
