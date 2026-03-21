
import { NewsArticle, ProcessedHeadline } from './types.ts';
import { extractKeyPoints, createSummary } from './text-processing.ts';

export function processNewsArticles(articles: NewsArticle[], userLevel: string = 'beginner'): ProcessedHeadline[] {
  // Filter for finance-related articles first
  const financeArticles = articles.filter((article: any) => {
    const title = article.title?.toLowerCase() || '';
    const description = article.description?.toLowerCase() || '';
    const keywords = article.keywords?.join(' ').toLowerCase() || '';
    
    const financeTerms = [
      'stock', 'market', 'finance', 'business', 'economy', 'economic', 
      'investment', 'trading', 'earnings', 'revenue', 'profit', 'loss',
      'bank', 'banking', 'federal reserve', 'interest rate', 'inflation',
      'GDP', 'wall street', 'nasdaq', 'dow jones', 's&p', 'company',
      'corporate', 'industry', 'sector', 'share', 'shareholder'
    ];
    
    return financeTerms.some(term => 
      title.includes(term) || description.includes(term) || keywords.includes(term)
    );
  });
  
  console.log(`Filtered ${financeArticles.length} finance-related articles from ${articles.length} total articles`);
  
  return financeArticles.slice(0, 8).map((article: any, index: number) => {
    const summary = createSummary(article, userLevel);
    const tldr = extractKeyPoints(article.title, article.content || article.description || '', userLevel);
    
    return {
      id: article.article_id || `headline-${index}`,
      title: article.title || 'Business Update',
      summary: summary,
      tldr: tldr,
      url: article.link || '#',
      publishedDate: article.pubDate || new Date().toISOString(),
      site: article.source_id || 'News Source',
      image: article.image_url || null
    };
  });
}
