
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Newspaper, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const fallbackHeadlines = [
  {
    id: 'fb1',
    title: "Tech Giants Rally on AI Advancements",
    summary: "Major technology companies saw their stock prices surge following announcements of significant breakthroughs in artificial intelligence.",
    url: "https://news.google.com/search?q=Tech+Giants+Rally+on+AI+Advancements"
  },
  {
    id: 'fb2',
    title: "Federal Reserve Signals Cautious Stance on Interest Rates",
    summary: "In a closely watched announcement, the Federal Reserve indicated it would maintain a cautious approach to adjusting interest rates.",
    url: "https://news.google.com/search?q=Federal+Reserve+Signals+Cautious+Stance"
  },
  {
    id: 'fb3',
    title: "Oil Prices Climb Amid Supply Chain Disruptions",
    summary: "Global oil prices continued their upward trajectory as ongoing supply chain disruptions and geopolitical uncertainties impacted production.",
    url: "https://news.google.com/search?q=Oil+Prices+Climb"
  },
  {
    id: 'fb4',
    title: "Retail Sales Show Unexpected Resilience",
    summary: "Despite concerns about inflation, the latest retail sales figures surprised analysts by showing continued consumer spending.",
    url: "https://news.google.com/search?q=Retail+Sales+Show+Unexpected+Resilience"
  },
  {
    id: 'fb5',
    title: "IPO Market Sees Renewed Interest in Biotech",
    summary: "The market for Initial Public Offerings (IPOs) is showing signs of life, with a particular surge in interest for biotechnology firms.",
    url: "https://news.google.com/search?q=IPO+Market+Sees+Renewed+Interest+in+Biotech"
  },
  {
    id: 'fb6',
    title: "Global Shipping Costs Begin to Stabilize",
    summary: "After months of volatility, global shipping costs are reportedly starting to stabilize, albeit at elevated levels.",
    url: "https://news.google.com/search?q=Global+Shipping+Costs+Begin+to+Stabilize"
  },
  {
    id: 'fb7',
    title: "Renewable Energy Stocks Gain on New Policy Support",
    summary: "Shares in renewable energy companies rose following announcements of new government policies aimed at boosting green energy production.",
    url: "https://news.google.com/search?q=Renewable+Energy+Stocks+Gain"
  }
];

const HeadlinesSection = () => {
  const fetchHeadlines = async () => {
    const { data, error } = await supabase.functions.invoke('market-headlines');
    if (error) throw new Error(error.message);
    if (!data || !Array.isArray(data)) throw new Error("Invalid data format");
    return data;
  };

  const { data: headlines, isLoading, isError } = useQuery({
    queryKey: ['marketHeadlines'],
    queryFn: fetchHeadlines,
    staleTime: 1000 * 60 * 30, // Refetch every 30 minutes
  });

  const headlinesToDisplay = isError || !headlines || headlines.length === 0 ? fallbackHeadlines : headlines;
  const subtitle = isError ? "Could not load live news. Showing static headlines." : "Key news stories impacting the markets today.";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <div className="flex items-center justify-center mb-2">
              <Newspaper className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-semibold text-foreground">Top Financial Headlines</h2>
          </div>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => <HeadlineSkeleton key={index} />)
          ) : (
            headlinesToDisplay.map((headline) => (
              <Card key={headline.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{headline.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm flex-grow">
                  <p className="text-muted-foreground leading-relaxed">{headline.summary}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <a href={headline.url} target="_blank" rel="noopener noreferrer">
                      Read Full Article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const HeadlineSkeleton = () => (
  <Card className="flex flex-col">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2 mt-2" />
    </CardHeader>
    <CardContent className="flex-grow">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-5/6 mt-2" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);


export default HeadlinesSection;
