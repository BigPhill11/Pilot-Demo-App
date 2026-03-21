import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Eye, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CompanyScenario {
  name: string;
  ticker: string;
  currentPrice: number;
  financials: {
    revenue: string;
    revenueGrowth: string;
    netMargin: string;
    debtToEquity: string;
  };
  valuation: {
    pe: string;
    marketCap: string;
    priceToBook: string;
  };
  sentiment: {
    recentNews: string[];
    analystRating: string;
    socialBuzz: string;
  };
  expertDecision: 'invest' | 'pass' | 'watch';
  expertReasoning: string;
  keyPoints: string[];
}

const scenarios: CompanyScenario[] = [
  {
    name: 'GreenEnergy Solutions',
    ticker: 'GREN',
    currentPrice: 45,
    financials: {
      revenue: '$2.5B (FY2024)',
      revenueGrowth: '+35% YoY',
      netMargin: '22%',
      debtToEquity: '0.8'
    },
    valuation: {
      pe: '28',
      marketCap: '$15B (Large-cap)',
      priceToBook: '4.2'
    },
    sentiment: {
      recentNews: [
        'Won $500M government contract for solar installations',
        'Analyst upgrades citing renewable energy demand',
        'Moderate social media interest, focused on fundamentals'
      ],
      analystRating: '75% BUY, 25% HOLD',
      socialBuzz: 'Positive, not hyped'
    },
    expertDecision: 'invest',
    expertReasoning: 'Strong fundamentals with 35% growth, healthy margins, and manageable debt. Valuation is elevated but justified by growth and positive catalysts. Government contract provides revenue visibility.',
    keyPoints: [
      '✅ Excellent growth (35% YoY)',
      '✅ Strong profit margins (22%)',
      '✅ Low debt (0.8 D/E)',
      '⚠️ P/E of 28 is high but growth justifies it',
      '✅ Positive sentiment with concrete catalysts',
      '✅ Large-cap provides stability'
    ]
  },
  {
    name: 'RetailChain Legacy',
    ticker: 'RCHL',
    currentPrice: 12,
    financials: {
      revenue: '$8B (FY2024)',
      revenueGrowth: '-12% YoY',
      netMargin: '2%',
      debtToEquity: '3.2'
    },
    valuation: {
      pe: '6',
      marketCap: '$1.5B (Mid-cap)',
      priceToBook: '0.7'
    },
    sentiment: {
      recentNews: [
        'Closing 50 underperforming stores',
        'CEO announced "turnaround plan"',
        'Multiple analyst downgrades to SELL'
      ],
      analystRating: '10% BUY, 30% HOLD, 60% SELL',
      socialBuzz: 'Very negative'
    },
    expertDecision: 'pass',
    expertReasoning: 'Multiple red flags: declining revenue, razor-thin margins, excessive debt, and overwhelmingly negative sentiment. Low P/E is a value trap - the business is deteriorating. High bankruptcy risk.',
    keyPoints: [
      '🚨 Revenue declining (-12% YoY)',
      '🚨 Terrible margins (2%)',
      '🚨 Dangerous debt level (3.2 D/E)',
      '⚠️ Low P/E of 6 is a value trap, not a bargain',
      '🚨 60% of analysts say SELL',
      '🚨 Store closures signal fundamental problems'
    ]
  },
  {
    name: 'CloudTech Innovate',
    ticker: 'CLDI',
    currentPrice: 180,
    financials: {
      revenue: '$500M (FY2024)',
      revenueGrowth: '+25% YoY',
      netMargin: '15%',
      debtToEquity: '0.5'
    },
    valuation: {
      pe: '65',
      marketCap: '$25B (Large-cap)',
      priceToBook: '12'
    },
    sentiment: {
      recentNews: [
        'Strong earnings beat last quarter',
        'Stock up 120% year-to-date',
        'Some analysts calling it overvalued'
      ],
      analystRating: '40% BUY, 50% HOLD, 10% SELL',
      socialBuzz: 'Extremely positive, some FOMO'
    },
    expertDecision: 'watch',
    expertReasoning: 'Good company with solid growth and healthy financials, but valuation is stretched (P/E of 65). Stock has run up significantly. Wait for pullback to more reasonable entry point. Add to watch list.',
    keyPoints: [
      '✅ Strong revenue growth (25%)',
      '✅ Healthy margins (15%)',
      '✅ Low debt (0.5 D/E)',
      '🚨 P/E of 65 is very high',
      '⚠️ Already up 120% this year',
      '⏸️ Wait for better entry point'
    ]
  }
];

const InvestmentDecisionSimulator: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userDecision, setUserDecision] = useState<string | null>(null);
  const [showExpert, setShowExpert] = useState(false);

  const scenario = scenarios[currentScenario];

  const handleDecision = (decision: 'invest' | 'pass' | 'watch') => {
    setUserDecision(decision);
    setShowExpert(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setUserDecision(null);
      setShowExpert(false);
    } else {
      setCurrentScenario(0);
      setUserDecision(null);
      setShowExpert(false);
    }
  };

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'invest': return <ThumbsUp className="h-5 w-5" />;
      case 'pass': return <ThumbsDown className="h-5 w-5" />;
      case 'watch': return <Eye className="h-5 w-5" />;
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'invest': return 'text-green-600';
      case 'pass': return 'text-red-600';
      case 'watch': return 'text-yellow-600';
    }
  };

  const isCorrect = userDecision === scenario.expertDecision;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Investment Decision Simulator</CardTitle>
            <CardDescription>
              Analyze the company and make your decision
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {currentScenario + 1} / {scenarios.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Header */}
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">{scenario.name}</h3>
          <div className="flex items-center justify-center gap-2">
            <p className="text-muted-foreground">${scenario.ticker}</p>
            <span className="text-muted-foreground">•</span>
            <p className="text-xl font-bold text-primary">${scenario.currentPrice}</p>
          </div>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="financials" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          </TabsList>

          <TabsContent value="financials" className="space-y-2 mt-4">
            {Object.entries(scenario.financials).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm capitalize text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="valuation" className="space-y-2 mt-4">
            {Object.entries(scenario.valuation).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                <span className="text-sm capitalize text-muted-foreground">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-3 mt-4">
            <div>
              <p className="text-sm font-medium mb-2">Recent News:</p>
              <div className="space-y-1">
                {scenario.sentiment.recentNews.map((news, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">• {news}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">Analyst Rating</p>
                <p className="text-sm font-medium">{scenario.sentiment.analystRating}</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-xs text-muted-foreground mb-1">Social Buzz</p>
                <p className="text-sm font-medium">{scenario.sentiment.socialBuzz}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Decision Buttons */}
        {!showExpert && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">What's your decision?</p>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => handleDecision('invest')}
                variant="outline"
                className="h-20 flex-col"
              >
                <ThumbsUp className="h-6 w-6 mb-1 text-green-600" />
                <span className="text-xs">Invest</span>
              </Button>

              <Button
                onClick={() => handleDecision('watch')}
                variant="outline"
                className="h-20 flex-col"
              >
                <Eye className="h-6 w-6 mb-1 text-yellow-600" />
                <span className="text-xs">Watch List</span>
              </Button>

              <Button
                onClick={() => handleDecision('pass')}
                variant="outline"
                className="h-20 flex-col"
              >
                <ThumbsDown className="h-6 w-6 mb-1 text-red-600" />
                <span className="text-xs">Pass</span>
              </Button>
            </div>
          </div>
        )}

        {/* Expert Analysis */}
        {showExpert && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className={`rounded-lg p-4 border ${
              isCorrect 
                ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                <h4 className="font-bold">
                  {isCorrect ? '✅ Correct! ' : '💡 Expert Decision: '}
                  <span className={`capitalize ${getDecisionColor(scenario.expertDecision)}`}>
                    {scenario.expertDecision}
                  </span>
                </h4>
              </div>
              <p className="text-sm mb-3">{scenario.expertReasoning}</p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">Key Analysis Points:</h4>
              <div className="space-y-1">
                {scenario.keyPoints.map((point, idx) => (
                  <p key={idx} className="text-sm">{point}</p>
                ))}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              {currentScenario < scenarios.length - 1 ? 'Next Company' : 'Start Over'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentDecisionSimulator;
