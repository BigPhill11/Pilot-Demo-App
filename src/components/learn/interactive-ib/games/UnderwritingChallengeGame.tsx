import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, DollarSign, Users } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface UnderwritingScenario {
  id: string;
  company: string;
  industry: string;
  revenue: string;
  growth: string;
  marketConditions: string;
  challenge: string;
  options: {
    price: number;
    shares: number;
    reasoning: string;
  }[];
  optimalChoice: number;
}

const scenarios: UnderwritingScenario[] = [
  {
    id: 'techstartup',
    company: 'TechFlow Inc.',
    industry: 'Software',
    revenue: '$50M',
    growth: '80% YoY',
    marketConditions: 'Bullish tech market',
    challenge: 'High-growth SaaS company seeking $100M in IPO',
    options: [
      {
        price: 20,
        shares: 5000000,
        reasoning: 'Conservative pricing to ensure full subscription'
      },
      {
        price: 25,
        shares: 4000000,
        reasoning: 'Balanced approach considering growth and market conditions'
      },
      {
        price: 30,
        shares: 3333333,
        reasoning: 'Aggressive pricing betting on market enthusiasm'
      }
    ],
    optimalChoice: 1
  },
  {
    id: 'manufacturing',
    company: 'SteelWorks Corp.',
    industry: 'Manufacturing',
    revenue: '$200M',
    growth: '5% YoY',
    marketConditions: 'Volatile market conditions',
    challenge: 'Established manufacturer needing $75M for expansion',
    options: [
      {
        price: 15,
        shares: 5000000,
        reasoning: 'Low pricing reflects modest growth and market volatility'
      },
      {
        price: 18,
        shares: 4166667,
        reasoning: 'Fair value pricing for stable, profitable business'
      },
      {
        price: 22,
        shares: 3409091,
        reasoning: 'Premium pricing may be too aggressive for current conditions'
      }
    ],
    optimalChoice: 0
  },
  {
    id: 'biotech',
    company: 'BioGenetics Ltd.',
    industry: 'Biotech',
    revenue: '$10M',
    growth: '200% YoY',
    marketConditions: 'Mixed biotech sentiment',
    challenge: 'Early-stage biotech with promising drug pipeline seeking $150M',
    options: [
      {
        price: 12,
        shares: 12500000,
        reasoning: 'Conservative pricing due to early stage and execution risk'
      },
      {
        price: 16,
        shares: 9375000,
        reasoning: 'Moderate pricing reflecting pipeline potential'
      },
      {
        price: 20,
        shares: 7500000,
        reasoning: 'High pricing betting on breakthrough potential'
      }
    ],
    optimalChoice: 0
  }
];

interface UnderwritingChallengeGameProps {
  onComplete: (score: number) => void;
}

const UnderwritingChallengeGame: React.FC<UnderwritingChallengeGameProps> = ({ onComplete }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [feedback, setFeedback] = useState<string>('');

  const currentScenario = scenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex + 1) / scenarios.length) * 100;

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentScenario.optimalChoice;
    const roundScore = isCorrect ? 30 : 10;
    setScore(prev => prev + roundScore);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (scenarios.length * 30)) * 100);
    let feedbackText = '';

    if (accuracy >= 90) {
      feedbackText = 'Excellent! You understand the nuances of underwriting and pricing strategies.';
    } else if (accuracy >= 75) {
      feedbackText = 'Great work! You grasp the key factors in underwriting decisions.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good effort! Keep studying market conditions and pricing strategies.';
    } else {
      feedbackText = 'Keep learning! Underwriting requires balancing risk, market conditions, and company fundamentals.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGamePhase('playing');
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Underwriting Challenge Complete!"
        score={score}
        totalScore={scenarios.length * 30}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>Underwriting Challenge</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Structure and price IPOs based on company fundamentals and market conditions
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Scenario {currentScenarioIndex + 1}/{scenarios.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-green-800">
                {currentScenario.company}
              </h3>
              <Badge variant="outline">
                {currentScenario.industry}
              </Badge>
            </div>
            <p className="text-green-700 mb-4">{currentScenario.challenge}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-semibold text-green-800">Revenue:</span>
                <span className="ml-2 text-green-700">{currentScenario.revenue}</span>
              </div>
              <div>
                <span className="font-semibold text-green-800">Growth:</span>
                <span className="ml-2 text-green-700">{currentScenario.growth}</span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-green-800">Market:</span>
                <span className="ml-2 text-green-700">{currentScenario.marketConditions}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Choose your underwriting strategy:
          </h4>
          <div className="space-y-4">
            {currentScenario.options.map((option, index) => {
              const isSelected = selectedOption === index;
              
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedOption(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-primary">
                          ${option.price}/share
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {option.shares.toLocaleString()} shares
                        </div>
                      </div>
                      <div className="text-lg font-semibold">
                        ${(option.price * option.shares / 1000000).toFixed(1)}M raised
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {option.reasoning}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="animate-scale-in"
            size="lg"
          >
            <Users className="h-4 w-4 mr-2" />
            Submit Pricing
          </Button>
          <Button variant="outline" onClick={resetGame}>
            New Scenario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnderwritingChallengeGame;