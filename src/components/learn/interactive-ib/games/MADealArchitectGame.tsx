import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Target, TrendingUp } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface DealScenario {
  id: string;
  acquirer: string;
  target: string;
  industry: string;
  dealRationale: string;
  synergies: string[];
  challenges: string[];
  dealStructure: {
    cashPercent: number;
    stockPercent: number;
    premium: number;
    reasoning: string;
  }[];
  optimalStructure: number;
}

const dealScenarios: DealScenario[] = [
  {
    id: 'tech-merger',
    acquirer: 'CloudTech Corp',
    target: 'DataAnalytics Inc',
    industry: 'Technology',
    dealRationale: 'Expand analytics capabilities and enter new customer segments',
    synergies: ['Cross-selling opportunities', 'Technology integration', 'Cost savings from overlapping functions'],
    challenges: ['Cultural integration', 'Talent retention', 'Technology platform compatibility'],
    dealStructure: [
      {
        cashPercent: 100,
        stockPercent: 0,
        premium: 25,
        reasoning: 'All-cash deal provides certainty but strains acquirer balance sheet'
      },
      {
        cashPercent: 60,
        stockPercent: 40,
        premium: 30,
        reasoning: 'Mixed consideration balances cash preservation with target shareholder participation'
      },
      {
        cashPercent: 20,
        stockPercent: 80,
        premium: 35,
        reasoning: 'Stock-heavy deal shares future upside but creates integration risk'
      }
    ],
    optimalStructure: 1
  },
  {
    id: 'pharma-acquisition',
    acquirer: 'GlobalPharma Ltd',
    target: 'BioInnovate Co',
    industry: 'Healthcare',
    dealRationale: 'Acquire promising drug pipeline and R&D capabilities',
    synergies: ['Pipeline diversification', 'R&D expertise', 'Regulatory knowledge'],
    challenges: ['Regulatory approval risk', 'Clinical trial outcomes', 'Integration complexity'],
    dealStructure: [
      {
        cashPercent: 80,
        stockPercent: 20,
        premium: 40,
        reasoning: 'Cash-heavy structure reduces execution risk for high-risk biotech target'
      },
      {
        cashPercent: 50,
        stockPercent: 50,
        premium: 45,
        reasoning: 'Balanced approach sharing both risks and rewards'
      },
      {
        cashPercent: 30,
        stockPercent: 70,
        premium: 50,
        reasoning: 'Stock-heavy deal appropriate if pipeline success is highly likely'
      }
    ],
    optimalStructure: 0
  },
  {
    id: 'retail-consolidation',
    acquirer: 'MegaRetail Group',
    target: 'BoutiqueChain LLC',
    industry: 'Retail',
    dealRationale: 'Consolidate market position and achieve economies of scale',
    synergies: ['Supply chain optimization', 'Store footprint synergies', 'Brand portfolio expansion'],
    challenges: ['Store overlap rationalization', 'Brand positioning', 'Customer retention'],
    dealStructure: [
      {
        cashPercent: 90,
        stockPercent: 10,
        premium: 20,
        reasoning: 'Cash deal reflects mature industry with limited growth prospects'
      },
      {
        cashPercent: 70,
        stockPercent: 30,
        premium: 25,
        reasoning: 'Mixed structure provides some upside participation'
      },
      {
        cashPercent: 40,
        stockPercent: 60,
        premium: 30,
        reasoning: 'Stock-heavy inappropriate for mature industry consolidation'
      }
    ],
    optimalStructure: 0
  }
];

interface MADealArchitectGameProps {
  onComplete: (score: number) => void;
}

const MADealArchitectGame: React.FC<MADealArchitectGameProps> = ({ onComplete }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [selectedStructure, setSelectedStructure] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'analyzing' | 'completed'>('analyzing');
  const [feedback, setFeedback] = useState<string>('');

  const currentDeal = dealScenarios[currentDealIndex];
  const progress = ((currentDealIndex + 1) / dealScenarios.length) * 100;

  const handleSubmit = () => {
    if (selectedStructure === null) return;

    const isCorrect = selectedStructure === currentDeal.optimalStructure;
    const roundScore = isCorrect ? 40 : 15;
    setScore(prev => prev + roundScore);

    if (currentDealIndex < dealScenarios.length - 1) {
      setCurrentDealIndex(prev => prev + 1);
      setSelectedStructure(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (dealScenarios.length * 40)) * 100);
    let feedbackText = '';

    if (accuracy >= 90) {
      feedbackText = 'Outstanding! You have excellent M&A structuring skills and strategic thinking.';
    } else if (accuracy >= 75) {
      feedbackText = 'Great work! You understand the key factors in M&A deal structuring.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good progress! Keep studying deal structures and industry dynamics.';
    } else {
      feedbackText = 'Keep learning! M&A structuring requires balancing financial, strategic, and risk considerations.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setCurrentDealIndex(0);
    setSelectedStructure(null);
    setScore(0);
    setGamePhase('analyzing');
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="M&A Deal Architect Complete!"
        score={score}
        totalScore={dealScenarios.length * 40}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span>M&A Deal Architect</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Structure mergers and acquisitions by analyzing synergies and choosing optimal deal terms
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Deal {currentDealIndex + 1}/{dealScenarios.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-purple-800 flex items-center">
                <Target className="h-6 w-6 mr-2" />
                {currentDeal.acquirer} acquiring {currentDeal.target}
              </h3>
              <Badge variant="outline" className="text-purple-700">
                {currentDeal.industry}
              </Badge>
            </div>
            <p className="text-purple-700 text-lg mb-4">{currentDeal.dealRationale}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">🚀 Key Synergies</h4>
                <ul className="space-y-1">
                  {currentDeal.synergies.map((synergy, index) => (
                    <li key={index} className="text-sm text-purple-700">• {synergy}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">⚠️ Key Challenges</h4>
                <ul className="space-y-1">
                  {currentDeal.challenges.map((challenge, index) => (
                    <li key={index} className="text-sm text-purple-700">• {challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Choose the optimal deal structure:
          </h4>
          <div className="space-y-4">
            {currentDeal.dealStructure.map((structure, index) => {
              const isSelected = selectedStructure === index;
              
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStructure(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-primary">
                          {structure.cashPercent}% Cash / {structure.stockPercent}% Stock
                        </div>
                        <Badge variant="outline">
                          {structure.premium}% Premium
                        </Badge>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {String.fromCharCode(65 + index)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {structure.reasoning}
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
            disabled={selectedStructure === null}
            className="animate-scale-in"
            size="lg"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Finalize Deal Structure
          </Button>
          <Button variant="outline" onClick={resetGame}>
            New Deal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MADealArchitectGame;