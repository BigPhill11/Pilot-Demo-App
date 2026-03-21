import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Zap, Target, TrendingUp } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Company {
  id: string;
  name: string;
  sector: string;
  revenue: number;
  ebitda: number;
  marketCap: number;
  correctValuation: number;
}

interface ValuationMethod {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

const companies: Company[] = [
  {
    id: 'techcorp',
    name: 'TechCorp',
    sector: 'Technology',
    revenue: 1000,
    ebitda: 200,
    marketCap: 5000,
    correctValuation: 4800
  },
  {
    id: 'retailplus',
    name: 'RetailPlus',
    sector: 'Retail',
    revenue: 2000,
    ebitda: 150,
    marketCap: 1800,
    correctValuation: 1875
  },
  {
    id: 'manufactory',
    name: 'Manufactory',
    sector: 'Manufacturing',
    revenue: 1500,
    ebitda: 300,
    marketCap: 3600,
    correctValuation: 3750
  }
];

const valuationMethods: ValuationMethod[] = [
  {
    id: 'ev-revenue',
    name: 'EV/Revenue',
    multiplier: 2.5,
    description: 'Enterprise Value to Revenue ratio'
  },
  {
    id: 'ev-ebitda', 
    name: 'EV/EBITDA',
    multiplier: 12.5,
    description: 'Enterprise Value to EBITDA ratio'
  },
  {
    id: 'pe-ratio',
    name: 'P/E Ratio',
    multiplier: 18,
    description: 'Price to Earnings ratio'
  }
];

interface ValuationBattleGameProps {
  onComplete: (score: number) => void;
}

const ValuationBattleGame: React.FC<ValuationBattleGameProps> = ({ onComplete }) => {
  const [currentCompany, setCurrentCompany] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    if (gamePhase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gamePhase]);

  const calculateValuation = (company: Company, method: ValuationMethod) => {
    switch (method.id) {
      case 'ev-revenue':
        return company.revenue * method.multiplier;
      case 'ev-ebitda':
        return company.ebitda * method.multiplier;
      case 'pe-ratio':
        return company.ebitda * 1.5 * method.multiplier; // Simplified earnings
      default:
        return 0;
    }
  };

  const submitValuation = () => {
    if (!selectedMethod) return;

    const company = companies[currentCompany];
    const method = valuationMethods.find(m => m.id === selectedMethod);
    if (!method) return;

    const calculatedValue = calculateValuation(company, method);
    const accuracy = Math.abs(calculatedValue - company.correctValuation) / company.correctValuation;
    const roundScore = Math.max(0, 100 - Math.round(accuracy * 100));

    setScore(prev => prev + roundScore);

    if (currentCompany < companies.length - 1) {
      setCurrentCompany(prev => prev + 1);
      setSelectedMethod('');
      setRound(prev => prev + 1);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const finalScore = Math.min(300, score);
    let feedbackText = '';
    
    if (finalScore >= 250) {
      feedbackText = 'Outstanding! You\'re a valuation master with excellent timing and accuracy.';
    } else if (finalScore >= 200) {
      feedbackText = 'Great work! You understand how different valuation methods work.';
    } else if (finalScore >= 150) {
      feedbackText = 'Good effort! Keep practicing different valuation approaches.';
    } else {
      feedbackText = 'Nice try! Remember: match the valuation method to the company type.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(finalScore);
  };

  const resetGame = () => {
    setCurrentCompany(0);
    setSelectedMethod('');
    setTimeLeft(60);
    setScore(0);
    setRound(1);
    setGamePhase('playing');
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Valuation Battle Complete!"
        score={score}
        totalScore={300}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  const company = companies[currentCompany];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <span>Valuation Battle Arena</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Race against time to value companies using the best method for each!
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline" className="animate-pulse">
            <Timer className="h-3 w-3 mr-1" />
            {timeLeft}s
          </Badge>
          <Badge variant="default">Round: {round}/3</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            {company.name}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Sector</p>
              <p className="font-semibold">{company.sector}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="font-semibold">${company.revenue}M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">EBITDA</p>
              <p className="font-semibold">${company.ebitda}M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-semibold">${company.marketCap}M</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Choose the best valuation method:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {valuationMethods.map((method) => {
              const calculatedValue = calculateValuation(company, method);
              const isSelected = selectedMethod === method.id;
              
              return (
                <Card 
                  key={method.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4 text-center">
                    <h5 className="font-semibold mb-2">{method.name}</h5>
                    <p className="text-xs text-muted-foreground mb-3">{method.description}</p>
                    <Badge variant="outline" className="mb-2">
                      ${Math.round(calculatedValue)}M
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Multiplier: {method.multiplier}x
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={submitValuation}
            disabled={!selectedMethod || timeLeft === 0}
            className="animate-scale-in"
            size="lg"
          >
            <Target className="h-4 w-4 mr-2" />
            Submit Valuation
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationBattleGame;