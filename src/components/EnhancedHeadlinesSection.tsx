
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import useHeadlines from '@/hooks/useHeadlines';
import HeadlineCard from './headlines/HeadlineCard';

const EnhancedHeadlinesSection = () => {
  const { profile } = useAuth();
  const { data: headlinesData, isLoading, isError } = useHeadlines();

  const handleHeadlineClick = (headline: any) => {
    console.log('Clicking headline:', headline);
    console.log('URL:', headline.url);
    
    if (headline.url && headline.url !== "#" && headline.url !== "") {
      // Try to open the URL
      const newWindow = window.open(headline.url, '_blank', 'noopener,noreferrer');
      
      // If popup was blocked, try a fallback
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        console.warn('Popup blocked, trying fallback method');
        // Fallback: create a temporary link element
        const link = document.createElement('a');
        link.href = headline.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      console.warn('No valid URL found for headline:', headline);
    }
  };

  const userLevel = profile?.app_version || 'beginner';

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Market Headlines</h2>
            <p className="mt-2 text-muted-foreground">Stay updated with the latest financial news</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Extract headlines from the response
  const headlines = headlinesData?.headlines || [];
  console.log('Processing headlines:', headlines);
  
  const displayHeadlines = isError || !Array.isArray(headlines) || headlines.length === 0 ? [
    {
      id: '1',
      title: "Market Reaches New Heights",
      summary: "Stock prices continue to rise as investors show confidence in the market's future performance. Major indices are posting significant gains across multiple sectors. Analysts attribute the growth to strong economic indicators and corporate earnings reports.",
      tldr: "Stock markets are up significantly due to positive investor sentiment and strong economic data.",
      url: "https://finance.yahoo.com"
    },
    {
      id: '2',
      title: "Tech Companies Report Strong Earnings",
      summary: "Major technology companies exceeded profit expectations, driving significant trading volume. Revenue growth has been particularly strong in cloud computing and artificial intelligence sectors. Investors are responding positively to future growth projections and innovation investments.",
      tldr: "Tech giants beat earnings expectations, boosting investor confidence in the sector.",
      url: "https://finance.yahoo.com"
    }
  ] : headlines;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700">Market Headlines</h2>
          <p className="mt-2 text-muted-foreground">
            Stay updated with financial news - terms are highlighted based on your level!
          </p>
          <div className="mt-2 text-sm text-primary">
            🐼 Current Level: {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)} Phil
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayHeadlines.map((headline, index) => (
            <HeadlineCard
              key={headline.id || index}
              headline={headline}
              userLevel={userLevel}
              onHeadlineClick={handleHeadlineClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeadlinesSection;
