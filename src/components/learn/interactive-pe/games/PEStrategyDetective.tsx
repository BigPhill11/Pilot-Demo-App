import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw, Building2, TrendingUp, Lightbulb } from 'lucide-react';
import GameCompletionBanner from '../../interactive-ib/games/components/GameCompletionBanner';
import GameHeader from '../../interactive-ib/games/components/GameHeader';

interface PEStrategyDetectiveProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

interface CompanyScenario {
  id: string;
  name: string;
  industry: string;
  stage: string;
  revenue: string;
  growth: string;
  challenge: string;
  characteristics: string[];
  correctStrategy: 'buyout' | 'growth' | 'venture';
}

const scenarios: CompanyScenario[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    industry: 'Software',
    stage: 'Startup',
    revenue: '$2M ARR',
    growth: '150% YoY',
    challenge: 'Need capital to scale sales team and expand internationally',
    characteristics: ['High growth', 'Early stage', 'Proven product-market fit', 'Need scaling capital'],
    correctStrategy: 'venture'
  },
  {
    id: '2',
    name: 'MidSize Manufacturing Co.',
    industry: 'Manufacturing',
    stage: 'Mature',
    revenue: '$200M annually',
    growth: '5% YoY',
    challenge: 'Aging leadership wants to retire, needs operational improvements',
    characteristics: ['Stable cash flows', 'Experienced management retiring', 'Operational inefficiencies', 'Market leader'],
    correctStrategy: 'buyout'
  },
  {
    id: '3',
    name: 'HealthTech Innovations',
    industry: 'Healthcare Technology',
    stage: 'Growth',
    revenue: '$50M ARR',
    growth: '40% YoY',
    challenge: 'Want to expand product line and enter new markets',
    characteristics: ['Profitable', 'Strong growth', 'Market expansion opportunity', 'Mature product'],
    correctStrategy: 'growth'
  },
  {
    id: '4',
    name: 'RetailCorp',
    industry: 'Retail',
    stage: 'Mature',
    revenue: '$500M annually',
    growth: '2% YoY',
    challenge: 'Needs digital transformation and cost reduction',
    characteristics: ['Large revenue base', 'Low growth', 'Public company', 'Operational challenges'],
    correctStrategy: 'buyout'
  },
  {
    id: '5',
    name: 'AI Robotics Startup',
    industry: 'Artificial Intelligence',
    stage: 'Early',
    revenue: '$500K ARR',
    growth: '300% YoY',
    challenge: 'Need significant R&D investment and talent acquisition',
    characteristics: ['Very early stage', 'Explosive growth', 'High risk/reward', 'Technology focused'],
    correctStrategy: 'venture'
  }
];

const strategyDescriptions = {
  buyout: {
    name: 'Leveraged Buyout',
    icon: Building2,
    description: 'Acquire mature companies with stable cash flows using leverage',
    characteristics: ['Mature companies', 'Stable cash flows', 'Operational improvements', 'Management changes']
  },
  growth: {
    name: 'Growth Equity',
    icon: TrendingUp,
    description: 'Invest in profitable, growing companies for expansion',
    characteristics: ['Profitable companies', 'Strong growth', 'Market expansion', 'Minority stake']
  },
  venture: {
    name: 'Venture Capital',
    icon: Lightbulb,
    description: 'Early-stage investments in high-growth potential companies',
    characteristics: ['Early stage', 'High growth potential', 'Technology focus', 'High risk/reward']
  }
};

const PEStrategyDetective: React.FC<PEStrategyDetectiveProps> = ({ onComplete, isCompleted }) => {
  const [currentScenario, setCurrentScenario] = useState<CompanyScenario>(scenarios[0]);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set());
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStrategySelect = (strategy: 'buyout' | 'growth' | 'venture') => {
    setSelectedStrategy(strategy);
    setAttempts(prev => prev + 1);
    
    if (strategy === currentScenario.correctStrategy) {
      setScore(prev => prev + 25);
      const newCompleted = new Set(completedScenarios);
      newCompleted.add(currentScenario.id);
      setCompletedScenarios(newCompleted);
      
      if (newCompleted.size === scenarios.length) {
        setGameCompleted(true);
        onComplete('strategy-selector');
      } else {
        // Move to next scenario after a delay
        setTimeout(() => {
          nextScenario();
        }, 2000);
      }
    } else {
      // Reset selection after showing wrong answer
      setTimeout(() => {
        setSelectedStrategy(null);
      }, 2000);
    }
  };

  const nextScenario = () => {
    const nextIndex = (currentIndex + 1) % scenarios.length;
    setCurrentIndex(nextIndex);
    setCurrentScenario(scenarios[nextIndex]);
    setSelectedStrategy(null);
  };

  const resetGame = () => {
    setCurrentScenario(scenarios[0]);
    setSelectedStrategy(null);
    setCompletedScenarios(new Set());
    setGameCompleted(false);
    setScore(0);
    setAttempts(0);
    setCurrentIndex(0);
  };

  if (gameCompleted) {
    return (
      <GameCompletionBanner score={score} />
    );
  }

  return (
    <div className="space-y-6">
      <GameHeader score={score} attempts={attempts} />

      {/* Current Scenario */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Company Analysis: {currentScenario.name}
            <Badge variant="outline">
              {completedScenarios.size + 1}/{scenarios.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-600">Industry</div>
              <div className="font-medium">{currentScenario.industry}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Stage</div>
              <div className="font-medium">{currentScenario.stage}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Revenue</div>
              <div className="font-medium">{currentScenario.revenue}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-600">Growth</div>
              <div className="font-medium">{currentScenario.growth}</div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Challenge</div>
            <div className="text-sm">{currentScenario.challenge}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Key Characteristics</div>
            <div className="flex flex-wrap gap-2">
              {currentScenario.characteristics.map((char, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {char}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategy Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(strategyDescriptions).map(([key, strategy]) => {
          const Icon = strategy.icon;
          const isSelected = selectedStrategy === key;
          const isCorrect = selectedStrategy === key && key === currentScenario.correctStrategy;
          const isWrong = selectedStrategy === key && key !== currentScenario.correctStrategy;
          const isCompleted = completedScenarios.has(currentScenario.id);
          
          return (
            <Card
              key={key}
              className={`cursor-pointer transition-all ${
                isCompleted
                  ? 'opacity-50 cursor-not-allowed'
                  : isCorrect
                  ? 'border-green-500 bg-green-50'
                  : isWrong
                  ? 'border-red-500 bg-red-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => !isCompleted && handleStrategySelect(key as 'buyout' | 'growth' | 'venture')}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm">
                  <Icon className="h-5 w-5" />
                  <span>{strategy.name}</span>
                  {isCorrect && <CheckCircle className="h-4 w-4 text-green-500" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                <div className="space-y-1">
                  {strategy.characteristics.map((char, index) => (
                    <div key={index} className="text-xs text-gray-500">
                      • {char}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress and Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Completed: {completedScenarios.size}/{scenarios.length}
          </Badge>
          <Badge variant="outline">
            Score: {score}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={nextScenario} disabled={gameCompleted}>
            Skip Scenario
          </Button>
          <Button variant="outline" onClick={resetGame}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PEStrategyDetective;