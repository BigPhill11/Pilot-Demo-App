import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface ValuationScenario {
  id: string;
  company: string;
  industry: string;
  financials: {
    revenue: number;
    ebitda: number;
    netIncome: number;
    sharesOutstanding: number;
  };
  comparables: {
    peRatio: number;
    evEbitda: number;
    priceToSales: number;
  };
  valuationMethods: {
    method: string;
    calculation: string;
    result: number;
    reasoning: string;
  }[];
  correctMethod: number;
}

const valuationScenarios: ValuationScenario[] = [
  {
    id: 'mature-tech',
    company: 'EstablishedTech Corp',
    industry: 'Software',
    financials: {
      revenue: 500,
      ebitda: 150,
      netIncome: 80,
      sharesOutstanding: 50
    },
    comparables: {
      peRatio: 20,
      evEbitda: 12,
      priceToSales: 4
    },
    valuationMethods: [
      {
        method: 'P/E Multiple',
        calculation: 'Net Income × P/E Ratio',
        result: 1600,
        reasoning: 'Reliable for profitable companies with comparable public peers'
      },
      {
        method: 'EV/EBITDA Multiple',
        calculation: 'EBITDA × EV/EBITDA Multiple',
        result: 1800,
        reasoning: 'Good for capital-intensive businesses, excludes capital structure'
      },
      {
        method: 'Price/Sales Multiple',
        calculation: 'Revenue × Price/Sales Multiple',
        result: 2000,
        reasoning: 'Useful for high-growth companies but ignores profitability'
      }
    ],
    correctMethod: 0
  },
  {
    id: 'growth-startup',
    company: 'RocketGrowth Inc',
    industry: 'E-commerce',
    financials: {
      revenue: 100,
      ebitda: -20,
      netIncome: -35,
      sharesOutstanding: 25
    },
    comparables: {
      peRatio: 35,
      evEbitda: 25,
      priceToSales: 8
    },
    valuationMethods: [
      {
        method: 'P/E Multiple',
        calculation: 'Not applicable (negative earnings)',
        result: 0,
        reasoning: 'Cannot use P/E when company has negative earnings'
      },
      {
        method: 'EV/EBITDA Multiple',
        calculation: 'Not applicable (negative EBITDA)',
        result: 0,
        reasoning: 'Cannot use EV/EBITDA when EBITDA is negative'
      },
      {
        method: 'Price/Sales Multiple',
        calculation: 'Revenue × Price/Sales Multiple',
        result: 800,
        reasoning: 'Most appropriate for high-growth, pre-profit companies'
      }
    ],
    correctMethod: 2
  },
  {
    id: 'manufacturing',
    company: 'SteelWorks Manufacturing',
    industry: 'Industrials',
    financials: {
      revenue: 800,
      ebitda: 120,
      netIncome: 45,
      sharesOutstanding: 40
    },
    comparables: {
      peRatio: 15,
      evEbitda: 8,
      priceToSales: 1.5
    },
    valuationMethods: [
      {
        method: 'P/E Multiple',
        calculation: 'Net Income × P/E Ratio',
        result: 675,
        reasoning: 'Conservative approach for cyclical, asset-heavy business'
      },
      {
        method: 'EV/EBITDA Multiple',
        calculation: 'EBITDA × EV/EBITDA Multiple',
        result: 960,
        reasoning: 'Best for capital-intensive manufacturing businesses'
      },
      {
        method: 'Price/Sales Multiple',
        calculation: 'Revenue × Price/Sales Multiple',
        result: 1200,
        reasoning: 'Less relevant for low-margin manufacturing business'
      }
    ],
    correctMethod: 1
  }
];

interface CompanyValuationMasterGameProps {
  onComplete: (score: number) => void;
}

const CompanyValuationMasterGame: React.FC<CompanyValuationMasterGameProps> = ({ onComplete }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'valuing' | 'completed'>('valuing');
  const [feedback, setFeedback] = useState<string>('');

  const currentScenario = valuationScenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex + 1) / valuationScenarios.length) * 100;

  const handleSubmit = () => {
    if (selectedMethod === null) return;

    const isCorrect = selectedMethod === currentScenario.correctMethod;
    const roundScore = isCorrect ? 50 : 20;
    setScore(prev => prev + roundScore);

    if (currentScenarioIndex < valuationScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedMethod(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (valuationScenarios.length * 50)) * 100);
    let feedbackText = '';

    if (accuracy >= 90) {
      feedbackText = 'Outstanding! You have mastered the art of company valuation across different scenarios.';
    } else if (accuracy >= 75) {
      feedbackText = 'Excellent work! You understand when to apply different valuation methods.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good progress! Keep studying the nuances of different valuation approaches.';
    } else {
      feedbackText = 'Keep learning! Valuation requires understanding business fundamentals and choosing appropriate methods.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setCurrentScenarioIndex(0);
    setSelectedMethod(null);
    setScore(0);
    setGamePhase('valuing');
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Company Valuation Master Complete!"
        score={score}
        totalScore={valuationScenarios.length * 50}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span>Company Valuation Master</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Choose the most appropriate valuation method based on company characteristics and financial profile
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Company {currentScenarioIndex + 1}/{valuationScenarios.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-indigo-200 bg-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-indigo-800">
                {currentScenario.company}
              </h3>
              <Badge variant="outline" className="text-indigo-700">
                {currentScenario.industry}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-800">
                  ${currentScenario.financials.revenue}M
                </div>
                <div className="text-sm text-indigo-600">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-800">
                  ${currentScenario.financials.ebitda}M
                </div>
                <div className="text-sm text-indigo-600">EBITDA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-800">
                  ${currentScenario.financials.netIncome}M
                </div>
                <div className="text-sm text-indigo-600">Net Income</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-800">
                  {currentScenario.financials.sharesOutstanding}M
                </div>
                <div className="text-sm text-indigo-600">Shares Outstanding</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Comparable Company Multiples</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">P/E Ratio:</span> {currentScenario.comparables.peRatio}x
                </div>
                <div>
                  <span className="font-medium">EV/EBITDA:</span> {currentScenario.comparables.evEbitda}x
                </div>
                <div>
                  <span className="font-medium">Price/Sales:</span> {currentScenario.comparables.priceToSales}x
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Which valuation method is most appropriate?
          </h4>
          <div className="space-y-4">
            {currentScenario.valuationMethods.map((method, index) => {
              const isSelected = selectedMethod === index;
              const isApplicable = method.result > 0;
              
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    !isApplicable ? 'opacity-60' : ''
                  } ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedMethod(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <h5 className="text-lg font-bold text-primary">
                          {method.method}
                        </h5>
                        {isApplicable && (
                          <Badge variant="outline" className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            ${method.result}M
                          </Badge>
                        )}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm font-medium">Calculation: </span>
                      <span className="text-sm text-muted-foreground">{method.calculation}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {method.reasoning}
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
            disabled={selectedMethod === null}
            className="animate-scale-in"
            size="lg"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Submit Valuation
          </Button>
          <Button variant="outline" onClick={resetGame}>
            New Company
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyValuationMasterGame;