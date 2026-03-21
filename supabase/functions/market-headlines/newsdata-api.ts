
import { NewsArticle } from './types.ts';

export async function fetchMarketOverviewFromNewsData(apiKey: string): Promise<NewsArticle[]> {
  console.log('Fetching market overview data from newsdata.io...');

  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${apiKey}&category=business&q=market overview OR market summary OR economic outlook OR financial markets OR stock market trends OR market analysis&language=en&country=us&size=10`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NewsDataBot/1.0)',
      }
    }
  );
  
  if (!response.ok) {
    console.error('Newsdata.io API error:', response.status, response.statusText);
    const errorText = await response.text();
    console.error('Error details:', errorText);
    throw new Error(`Newsdata.io API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('Newsdata.io API response received for market overview');

  const articles = data.results || [];
  console.log(`Processing ${articles.length} market overview articles from newsdata.io`);
  
  // Transform newsdata.io format to our format
  return articles.map((article: any) => ({
    article_id: article.article_id || article.link,
    title: article.title,
    description: article.description,
    content: article.content,
    link: article.link,
    pubDate: article.pubDate,
    source_id: article.source_id || 'NewsData',
    image_url: article.image_url
  }));
}
