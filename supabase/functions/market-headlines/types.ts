
export interface NewsArticle {
  article_id?: string;
  title: string;
  content?: string;
  description?: string;
  link?: string;
  pubDate?: string;
  source_id?: string;
  image_url?: string;
}

export interface ProcessedHeadline {
  id: string;
  title: string;
  summary: string;
  tldr: string;
  url: string;
  publishedDate: string;
  site: string;
  image: string | null;
}

export interface MarketRecap {
  paragraphs: string[];
  tldr: string;
  sentiment: string;
  dominantSector: string;
}

export interface HeadlinesResponse {
  headlines: ProcessedHeadline[];
  marketRecap: MarketRecap;
  lastUpdated: string;
  error?: string;
}
