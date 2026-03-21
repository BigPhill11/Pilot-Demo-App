import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

interface NewsHeadline {
  id: string;
  headline: string;
  correctSentiment: 'positive' | 'negative' | 'neutral';
  explanation: string;
  impact: string;
}

const newsHeadlines: NewsHeadline[] = [
  {
    id: '1',
    headline: 'Tech Giant Beats Q3 Earnings by 25%, Raises Full-Year Guidance',
    correctSentiment: 'positive',
    explanation: 'Beating earnings and raising guidance are strong positive catalysts that typically drive stock prices up.',
    impact: 'Stock likely rises 5-10% on this news'
  },
  {
    id: '2',
    headline: 'CEO Unexpectedly Resigns Amid Investigation into Financial Irregularities',
    correctSentiment: 'negative',
    explanation: 'CEO departure during investigation is a major red flag suggesting serious problems.',
    impact: 'Stock could drop 15-30% on this news'
  },
  {
    id: '3',
    headline: 'Company Announces $500M Share Buyback Program',
    correctSentiment: 'positive',
    explanation: 'Share buybacks reduce supply and show management confidence, typically boosting stock price.',
    impact: 'Stock may rise 3-7% on announcement'
  },
  {
    id: '4',
    headline: 'Retailer Reports 15% Decline in Same-Store Sales for Third Consecutive Quarter',
    correctSentiment: 'negative',
    explanation: 'Sustained sales decline signals fundamental business problems and loss of customer interest.',
    impact: 'Stock likely drops 10-20%'
  },
  {
    id: '5',
    headline: 'Pharmaceutical Company Receives FDA Approval for New Cancer Treatment',
    correctSentiment: 'positive',
    explanation: 'FDA approval opens new revenue stream and validates company\'s research - major positive catalyst.',
    impact: 'Stock could surge 20-40%'
  },
  {
    id: '6',
    headline: 'Company Misses Earnings Estimates, Cites Supply Chain Disruptions',
    correctSentiment: 'negative',
    explanation: 'Missing earnings disappoints investors, though supply chain issues may be temporary.',
    impact: 'Stock may drop 5-12%, but could recover if issues resolve'
  },
  {
    id: '7',
    headline: 'Streaming Service Adds 10M Subscribers, Exceeding Analyst Expectations',
    correctSentiment: 'positive',
    explanation: 'Subscriber growth above expectations shows strong demand and validates the business model.',
    impact: 'Stock likely rises 8-15%'
  },
  {
    id: '8',
    headline: 'Airline Warns of Potential Fourth Quarter Loss Due to Rising Fuel Costs',
    correctSentiment: 'negative',
    explanation: 'Profit warning signals deteriorating margins and potential losses - negative for investors.',
    impact: 'Stock may drop 10-15%'
  }
];

const NewsSentimentAnalyzer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentHeadline = newsHeadlines[currentIndex];

  const handleSentiment = (sentiment: 'positive' | 'negative' | 'neutral') => {
    if (answered) return;

    setSelectedSentiment(sentiment);
    setAnswered(true);

    const isCorrect = sentiment === currentHeadline.correctSentiment;
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! 🎉');
    } else {
      toast.error('Not quite right');
    }
  };

  const handleNext = () => {
    if (currentIndex < newsHeadlines.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnswered(false);
      setSelectedSentiment(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedSentiment(null);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / newsHeadlines.length) * 100);
    return (
      <Card>
        <CardHeader>
          <CardTitle>News Sentiment Analysis Complete!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold text-primary">{percentage}%</div>
            <p className="text-muted-foreground">
              You correctly identified {score} out of {newsHeadlines.length} headlines
            </p>
          </div>

          {percentage >= 75 && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="font-semibold text-green-700 dark:text-green-300">
                🎉 Excellent work! You have a strong grasp of news sentiment analysis.
              </p>
            </div>
          )}

          {percentage >= 50 && percentage < 75 && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
              <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                👍 Good job! With more practice, you'll master news analysis.
              </p>
            </div>
          )}

          {percentage < 50 && (
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
              <p className="font-semibold text-blue-700 dark:text-blue-300">
                💡 Keep learning! Review the explanations and try again.
              </p>
            </div>
          )}

          <Button onClick={handleRestart} className="w-full" size="lg">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>News Sentiment Analyzer</CardTitle>
            <CardDescription>
              Categorize each headline as positive, negative, or neutral
            </CardDescription>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {newsHeadlines.length}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Score</span>
          <span className="font-bold text-primary">{score} / {newsHeadlines.length}</span>
        </div>

        {/* Headline */}
        <div className="bg-muted rounded-lg p-6">
          <p className="text-lg font-medium leading-relaxed">{currentHeadline.headline}</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => handleSentiment('positive')}
            disabled={answered}
            variant={selectedSentiment === 'positive' ? 'default' : 'outline'}
            className={`h-20 flex-col ${
              answered && currentHeadline.correctSentiment === 'positive'
                ? 'border-2 border-green-500'
                : ''
            }`}
          >
            <TrendingUp className="h-6 w-6 mb-1" />
            <span>Positive</span>
          </Button>

          <Button
            onClick={() => handleSentiment('neutral')}
            disabled={answered}
            variant={selectedSentiment === 'neutral' ? 'default' : 'outline'}
            className={`h-20 flex-col ${
              answered && currentHeadline.correctSentiment === 'neutral'
                ? 'border-2 border-green-500'
                : ''
            }`}
          >
            <Minus className="h-6 w-6 mb-1" />
            <span>Neutral</span>
          </Button>

          <Button
            onClick={() => handleSentiment('negative')}
            disabled={answered}
            variant={selectedSentiment === 'negative' ? 'default' : 'outline'}
            className={`h-20 flex-col ${
              answered && currentHeadline.correctSentiment === 'negative'
                ? 'border-2 border-green-500'
                : ''
            }`}
          >
            <TrendingDown className="h-6 w-6 mb-1" />
            <span>Negative</span>
          </Button>
        </div>

        {/* Explanation */}
        {answered && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className={`rounded-lg p-4 ${
              selectedSentiment === currentHeadline.correctSentiment
                ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
            }`}>
              <p className="font-semibold mb-2">
                {selectedSentiment === currentHeadline.correctSentiment
                  ? '✅ Correct!'
                  : `❌ Incorrect. The correct answer is: ${currentHeadline.correctSentiment}`
                }
              </p>
              <p className="text-sm mb-2">{currentHeadline.explanation}</p>
              <p className="text-sm font-medium italic">{currentHeadline.impact}</p>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              {currentIndex < newsHeadlines.length - 1 ? 'Next Headline' : 'See Results'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsSentimentAnalyzer;
