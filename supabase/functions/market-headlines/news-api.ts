
import { NewsArticle } from './types.ts';

export async function fetchNewsFromAPI(apiKey: string): Promise<NewsArticle[]> {
  console.log('Fetching finance headlines from NewsAPI...');

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=finance OR economics OR stock OR market OR investment OR trading OR earnings OR revenue OR GDP OR inflation OR "interest rate" OR "Federal Reserve" OR "Wall Street"&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
      }
    }
  );
  
  if (!response.ok) {
    console.error('NewsAPI error:', response.status, response.statusText);
    const errorText = await response.text();
    console.error('Error details:', errorText);
    throw new Error(`NewsAPI error: ${response.status}`);
  }

  const data = await response.json();
  console.log('NewsAPI response received:', data);

  const articles = data.articles || [];
  console.log(`Processing ${articles.length} finance-focused articles from NewsAPI`);
  
  // Transform NewsAPI format to our format
  return articles.map((article: any) => ({
    article_id: article.url, // Use URL as unique ID
    title: article.title,
    description: article.description,
    content: article.content,
    link: article.url,
    pubDate: article.publishedAt,
    source_id: article.source?.name || 'NewsAPI',
    image_url: article.urlToImage
  }));
}
