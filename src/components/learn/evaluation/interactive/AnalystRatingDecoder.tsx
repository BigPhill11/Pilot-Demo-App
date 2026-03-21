import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface AnalystData {
  companyName: string;
  currentPrice: number;
  ratings: {
    buy: number;
    hold: number;
    sell: number;
  };
  priceTargets: {
    high: number;
    average: number;
    low: number;
  };
  scenario: string;
  correctInterpretation: string;
  reasoning: string;
}

const analystScenarios: AnalystData[] = [
  {
    companyName: 'TechCorp Inc',
    currentPrice: 150,
    ratings: { buy: 15, hold: 3, sell: 2 },
    priceTargets: { high: 200, average: 180, low: 140 },
    scenario: 'Strong consensus with significant upside',
    correctInterpretation: 'Bullish - Most analysts recommend buying, average target shows 20% upside',
    reasoning: '75% buy ratings and average price target 20% above current price indicates strong bullish consensus.'
  },
  {
    companyName: 'RetailMax',
    currentPrice: 45,
    ratings: { buy: 3, hold: 8, sell: 9 },
    priceTargets: { high: 50, average: 40, low: 30 },
    scenario: 'Bearish sentiment with downside risk',
    correctInterpretation: 'Bearish - Majority recommend selling, target suggests potential decline',
    reasoning: '45% sell ratings and average target below current price signals bearish sentiment and potential downside.'
  },
  {
    companyName: 'MedTech Solutions',
    currentPrice: 220,
    ratings: { buy: 10, hold: 10, sell: 0 },
    priceTargets: { high: 280, average: 250, low: 220 },
    scenario: 'Mixed ratings with moderate upside',
    correctInterpretation: 'Neutral to Bullish - Split opinions but upside potential exists',
    reasoning: 'Even split on buy/hold with no sells, plus 14% average upside suggests cautious optimism.'
  }
];

const AnalystRatingDecoder: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const data = analystScenarios[currentScenario];
  const totalRatings = data.ratings.buy + data.ratings.hold + data.ratings.sell;
  const buyPercentage = Math.round((data.ratings.buy / totalRatings) * 100);
  const holdPercentage = Math.round((data.ratings.hold / totalRatings) * 100);
  const sellPercentage = Math.round((data.ratings.sell / totalRatings) * 100);
  
  const avgUpside = Math.round(((data.priceTargets.average - data.currentPrice) / data.currentPrice) * 100);
  const highUpside = Math.round(((data.priceTargets.high - data.currentPrice) / data.currentPrice) * 100);
  const lowUpside = Math.round(((data.priceTargets.low - data.currentPrice) / data.currentPrice) * 100);

  const handleNext = () => {
    if (currentScenario < analystScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setShowAnalysis(false);
    } else {
      setCurrentScenario(0);
      setShowAnalysis(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyst Rating Decoder</CardTitle>
        <CardDescription>
          Learn to interpret analyst opinions and price targets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Info */}
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">{data.companyName}</h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground">Current Price:</span>
            <span className="text-2xl font-bold text-primary">${data.currentPrice}</span>
          </div>
        </div>

        {/* Analyst Ratings */}
        <div className="space-y-3">
          <h4 className="font-semibold">Analyst Ratings ({totalRatings} analysts)</h4>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-20">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Buy</span>
              </div>
              <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                <div 
                  className="h-full bg-green-500 flex items-center justify-end pr-2"
                  style={{ width: `${buyPercentage}%` }}
                >
                  <span className="text-xs font-bold text-white">{data.ratings.buy}</span>
                </div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{buyPercentage}%</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-20">
                <Minus className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Hold</span>
              </div>
              <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 flex items-center justify-end pr-2"
                  style={{ width: `${holdPercentage}%` }}
                >
                  <span className="text-xs font-bold text-white">{data.ratings.hold}</span>
                </div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{holdPercentage}%</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-20">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Sell</span>
              </div>
              <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                <div 
                  className="h-full bg-red-500 flex items-center justify-end pr-2"
                  style={{ width: `${sellPercentage}%` }}
                >
                  <span className="text-xs font-bold text-white">{data.ratings.sell}</span>
                </div>
              </div>
              <span className="text-sm font-medium w-12 text-right">{sellPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Price Targets */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" />
            Price Targets (12-month)
          </h4>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">High</p>
              <p className="text-lg font-bold">${data.priceTargets.high}</p>
              <p className={`text-xs font-medium ${highUpside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {highUpside >= 0 ? '+' : ''}{highUpside}%
              </p>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-3 text-center border-2 border-primary">
              <p className="text-xs text-muted-foreground mb-1">Average</p>
              <p className="text-lg font-bold text-primary">${data.priceTargets.average}</p>
              <p className={`text-xs font-medium ${avgUpside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {avgUpside >= 0 ? '+' : ''}{avgUpside}%
              </p>
            </div>
            
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Low</p>
              <p className="text-lg font-bold">${data.priceTargets.low}</p>
              <p className={`text-xs font-medium ${lowUpside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {lowUpside >= 0 ? '+' : ''}{lowUpside}%
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Button */}
        {!showAnalysis && (
          <Button 
            onClick={() => setShowAnalysis(true)} 
            className="w-full" 
            size="lg"
          >
            Show Interpretation
          </Button>
        )}

        {/* Analysis */}
        {showAnalysis && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Interpretation
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                {data.correctInterpretation}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 italic">
                💡 {data.reasoning}
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">Key Takeaways</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Average price target shows {avgUpside >= 0 ? 'upside' : 'downside'} of {Math.abs(avgUpside)}%</li>
                <li>• {buyPercentage}% of analysts recommend buying</li>
                <li>• Wide target range ({lowUpside}% to {highUpside}%) = {Math.abs(highUpside - lowUpside) > 40 ? 'high' : 'moderate'} uncertainty</li>
                <li>• Use this as ONE factor in your overall analysis</li>
              </ul>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              {currentScenario < analystScenarios.length - 1 ? 'Next Scenario' : 'Start Over'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalystRatingDecoder;
