import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, DollarSign, Users, Scale, TrendingUp } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Investment {
  id: string;
  name: string;
  description: string;
  expectedReturn: number;
  esgScore: number;
  environmentalImpact: number;
  socialImpact: number;
  governanceScore: number;
  sector: string;
}

interface Portfolio {
  investments: string[];
  totalReturn: number;
  totalESGScore: number;
  balance: number;
}

const investments: Investment[] = [
  {
    id: 'solar-energy',
    name: 'Solar Energy Corp',
    description: 'Leading solar panel manufacturer with clean production',
    expectedReturn: 8,
    esgScore: 92,
    environmentalImpact: 95,
    socialImpact: 85,
    governanceScore: 96,
    sector: 'Clean Energy'
  },
  {
    id: 'oil-giant',
    name: 'PetroMax Oil',
    description: 'Traditional oil company with high dividends',
    expectedReturn: 12,
    esgScore: 35,
    environmentalImpact: 20,
    socialImpact: 40,
    governanceScore: 45,
    sector: 'Energy'
  },
  {
    id: 'fair-trade',
    name: 'Fair Trade Foods',
    description: 'Organic food company supporting farmers globally',
    expectedReturn: 6,
    esgScore: 88,
    environmentalImpact: 85,
    socialImpact: 95,
    governanceScore: 84,
    sector: 'Consumer Goods'
  },
  {
    id: 'tech-giant',
    name: 'DataMine Tech',
    description: 'AI company with privacy concerns but high growth',
    expectedReturn: 15,
    esgScore: 65,
    environmentalImpact: 70,
    socialImpact: 55,
    governanceScore: 70,
    sector: 'Technology'
  },
  {
    id: 'green-bank',
    name: 'GreenVest Bank',
    description: 'Sustainable banking with climate-focused lending',
    expectedReturn: 7,
    esgScore: 89,
    environmentalImpact: 90,
    socialImpact: 88,
    governanceScore: 89,
    sector: 'Financial Services'
  },
  {
    id: 'mining-corp',
    name: 'MegaMine Corp',
    description: 'Mining company with high profits but environmental issues',
    expectedReturn: 14,
    esgScore: 25,
    environmentalImpact: 15,
    socialImpact: 30,
    governanceScore: 30,
    sector: 'Materials'
  }
];

interface ESGInvestmentChallengeProps {
  onComplete: (score: number) => void;
}

const ESGInvestmentChallenge: React.FC<ESGInvestmentChallengeProps> = ({ onComplete }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    investments: [],
    totalReturn: 0,
    totalESGScore: 0,
    balance: 0
  });
  const [gamePhase, setGamePhase] = useState<'building' | 'completed'>('building');
  const [targetGoals] = useState({
    minReturn: 8,
    minESGScore: 70,
    maxInvestments: 4
  });

  const addToPortfolio = (investmentId: string) => {
    if (portfolio.investments.length >= targetGoals.maxInvestments) return;
    if (portfolio.investments.includes(investmentId)) return;

    const investment = investments.find(inv => inv.id === investmentId);
    if (!investment) return;

    const newInvestments = [...portfolio.investments, investmentId];
    const totalReturn = calculateAverageReturn(newInvestments);
    const totalESGScore = calculateAverageESGScore(newInvestments);
    const balance = calculateBalance(totalReturn, totalESGScore);

    setPortfolio({
      investments: newInvestments,
      totalReturn,
      totalESGScore,
      balance
    });
  };

  const removeFromPortfolio = (investmentId: string) => {
    const newInvestments = portfolio.investments.filter(id => id !== investmentId);
    const totalReturn = calculateAverageReturn(newInvestments);
    const totalESGScore = calculateAverageESGScore(newInvestments);
    const balance = calculateBalance(totalReturn, totalESGScore);

    setPortfolio({
      investments: newInvestments,
      totalReturn,
      totalESGScore,
      balance
    });
  };

  const calculateAverageReturn = (investmentIds: string[]): number => {
    if (investmentIds.length === 0) return 0;
    const totalReturn = investmentIds.reduce((sum, id) => {
      const investment = investments.find(inv => inv.id === id);
      return sum + (investment?.expectedReturn || 0);
    }, 0);
    return Math.round((totalReturn / investmentIds.length) * 10) / 10;
  };

  const calculateAverageESGScore = (investmentIds: string[]): number => {
    if (investmentIds.length === 0) return 0;
    const totalESG = investmentIds.reduce((sum, id) => {
      const investment = investments.find(inv => inv.id === id);
      return sum + (investment?.esgScore || 0);
    }, 0);
    return Math.round(totalESG / investmentIds.length);
  };

  const calculateBalance = (returnRate: number, esgScore: number): number => {
    const returnWeight = 0.6;
    const esgWeight = 0.4;
    
    const returnScore = Math.min(100, (returnRate / 15) * 100);
    const normalizedESGScore = esgScore;
    
    return Math.round((returnScore * returnWeight + normalizedESGScore * esgWeight));
  };

  const submitPortfolio = () => {
    const meetsReturnTarget = portfolio.totalReturn >= targetGoals.minReturn;
    const meetsESGTarget = portfolio.totalESGScore >= targetGoals.minESGScore;
    const hasMinimumInvestments = portfolio.investments.length >= 3;

    let score = portfolio.balance;
    
    // Bonus points for meeting targets
    if (meetsReturnTarget && meetsESGTarget) score += 50;
    if (hasMinimumInvestments) score += 25;
    
    // Perfect balance bonus
    if (portfolio.totalReturn >= 9 && portfolio.totalESGScore >= 80) score += 25;

    setGamePhase('completed');
    onComplete(Math.min(200, score));
  };

  const resetGame = () => {
    setPortfolio({
      investments: [],
      totalReturn: 0,
      totalESGScore: 0,
      balance: 0
    });
    setGamePhase('building');
  };

  if (gamePhase === 'completed') {
    const meetsTargets = portfolio.totalReturn >= targetGoals.minReturn && 
                        portfolio.totalESGScore >= targetGoals.minESGScore;
    
    const feedback = meetsTargets
      ? 'Excellent! You successfully balanced financial returns with ESG principles.'
      : 'Good effort! ESG investing requires balancing profit with purpose.';

    return (
      <GameCompletionBanner
        title="ESG Investment Challenge Complete!"
        score={portfolio.balance}
        totalScore={200}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Scale className="h-6 w-6 text-primary" />
          <span>ESG Investment Challenge</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Build a portfolio that balances financial returns with environmental, social, and governance principles
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-muted-foreground">Expected Return</p>
              <p className="text-2xl font-bold text-green-600">
                {portfolio.totalReturn}%
              </p>
              <p className="text-xs text-muted-foreground">Target: ≥{targetGoals.minReturn}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Leaf className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-muted-foreground">ESG Score</p>
              <p className="text-2xl font-bold text-blue-600">
                {portfolio.totalESGScore}
              </p>
              <p className="text-xs text-muted-foreground">Target: ≥{targetGoals.minESGScore}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-muted-foreground">Balance Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {portfolio.balance}
              </p>
              <p className="text-xs text-muted-foreground">Profit + Purpose</p>
            </CardContent>
          </Card>
        </div>
        
        <Progress value={(portfolio.investments.length / targetGoals.maxInvestments) * 100} className="mt-4" />
        <p className="text-sm text-muted-foreground">
          Portfolio: {portfolio.investments.length}/{targetGoals.maxInvestments} investments
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investments.map((investment) => {
            const isSelected = portfolio.investments.includes(investment.id);
            const canAdd = !isSelected && portfolio.investments.length < targetGoals.maxInvestments;
            
            return (
              <Card 
                key={investment.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : canAdd
                      ? 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                      : 'opacity-50'
                }`}
                onClick={() => isSelected ? removeFromPortfolio(investment.id) : canAdd && addToPortfolio(investment.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-sm">{investment.name}</h5>
                    <Badge variant="outline" className="text-xs">
                      {investment.sector}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">
                    {investment.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-muted-foreground">Return</p>
                      <p className="font-semibold text-green-600">{investment.expectedReturn}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">ESG Score</p>
                      <p className="font-semibold text-blue-600">{investment.esgScore}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center">
                        <Leaf className="h-3 w-3 mr-1 text-green-500" />
                        Environmental
                      </span>
                      <span>{investment.environmentalImpact}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-blue-500" />
                        Social
                      </span>
                      <span>{investment.socialImpact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {portfolio.investments.length > 0 && (
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Current Portfolio:</h4>
              <div className="flex flex-wrap gap-2">
                {portfolio.investments.map(id => {
                  const investment = investments.find(inv => inv.id === id);
                  return (
                    <Badge key={id} variant="default" className="cursor-pointer hover:bg-destructive"
                           onClick={() => removeFromPortfolio(id)}>
                      {investment?.name} ✕
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={submitPortfolio}
            disabled={portfolio.investments.length === 0}
            className="animate-scale-in"
            size="lg"
          >
            Submit Portfolio
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Reset Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ESGInvestmentChallenge;