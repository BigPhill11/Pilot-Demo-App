
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import TermHighlighter from '@/components/headlines/TermHighlighter';
import useHeadlines from '@/hooks/useHeadlines';

const MarketRecapTab = () => {
  const { profile } = useAuth();
  const userLevel = profile?.app_version || 'beginner';
  
  const { data: marketData, isLoading } = useHeadlines(userLevel);

  const marketRecap = marketData?.marketRecap;

  const getComplexityDescription = (level: string) => {
    switch (level) {
      case 'beginner': return '(9th grade level)';
      case 'intermediate': return '(12th grade level)';
      case 'advanced': return '(Finance professional level)';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-20 w-full mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!marketRecap) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Market overview data is currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <TrendingUp className="h-6 w-6" />
            Market Overview - {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            <span className="text-sm font-normal text-green-600 ml-auto">
              {getComplexityDescription(userLevel)} (Powered by Lovable AI)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-700 leading-relaxed space-y-4">
            {marketRecap.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-base">
                <TermHighlighter text={paragraph} userLevel={userLevel} />
              </p>
            ))}
          </div>
          
          {marketRecap.tldr && (
            <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-sm font-semibold text-green-700 mb-2">TL;DR (Easy Explanation {getComplexityDescription(userLevel)}):</p>
              <p className="text-green-700 font-medium italic">
                <TermHighlighter text={marketRecap.tldr} userLevel={userLevel} />
              </p>
            </div>
          )}

          <div className="flex gap-3 text-sm">
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Sentiment: {marketRecap.sentiment || 'Neutral'}
            </span>
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Focus: {marketRecap.dominantSector || 'Mixed'} sector
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketRecapTab;
