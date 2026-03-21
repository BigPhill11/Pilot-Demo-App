import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, TrendingUp, Target, Shuffle } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Company {
  id: string;
  name: string;
  description: string;
  sector: string;
  keyMetric: string;
  keyMetricValue: string;
}

interface Sector {
  id: string;
  name: string;
  primaryMetrics: string[];
  color: string;
}

const companies: Company[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'Streaming entertainment service with global reach',
    sector: 'technology',
    keyMetric: 'Subscriber Growth',
    keyMetricValue: '15M new subscribers'
  },
  {
    id: 'pfizer',
    name: 'Pfizer',
    description: 'Pharmaceutical company developing vaccines and treatments',
    sector: 'healthcare',
    keyMetric: 'R&D Pipeline',
    keyMetricValue: '12 drugs in Phase 3'
  },
  {
    id: 'exxon',
    name: 'ExxonMobil',
    description: 'Oil and gas exploration and production company',
    sector: 'energy',
    keyMetric: 'Oil Reserves',
    keyMetricValue: '22B barrels'
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase',
    description: 'Investment banking and financial services',
    sector: 'financial',
    keyMetric: 'Net Interest Margin',
    keyMetricValue: '2.5%'
  },
  {
    id: 'walmart',
    name: 'Walmart',
    description: 'Retail chain with physical and online presence',
    sector: 'retail',
    keyMetric: 'Same-Store Sales',
    keyMetricValue: '+4.2% growth'
  },
  {
    id: 'tesla',
    name: 'Tesla',
    description: 'Electric vehicle and clean energy company',
    sector: 'automotive',
    keyMetric: 'Vehicle Deliveries',
    keyMetricValue: '500K units/year'
  }
];

const sectors: Sector[] = [
  {
    id: 'technology',
    name: 'Technology',
    primaryMetrics: ['Revenue Growth', 'User Metrics', 'Recurring Revenue'],
    color: 'bg-blue-500'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    primaryMetrics: ['R&D Pipeline', 'FDA Approvals', 'Patent Protection'],
    color: 'bg-green-500'
  },
  {
    id: 'energy',
    name: 'Energy',
    primaryMetrics: ['Oil Reserves', 'Production Costs', 'Commodity Prices'],
    color: 'bg-orange-500'
  },
  {
    id: 'financial',
    name: 'Financial Services',
    primaryMetrics: ['Net Interest Margin', 'Return on Equity', 'Loan Growth'],
    color: 'bg-purple-500'
  },
  {
    id: 'retail',
    name: 'Retail',
    primaryMetrics: ['Same-Store Sales', 'Inventory Turnover', 'Customer Traffic'],
    color: 'bg-pink-500'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    primaryMetrics: ['Vehicle Sales', 'Market Share', 'Production Efficiency'],
    color: 'bg-indigo-500'
  }
];

interface SectorSpecialistGameProps {
  onComplete: (score: number) => void;
}

const SectorSpecialistGame: React.FC<SectorSpecialistGameProps> = ({ onComplete }) => {
  const [shuffledCompanies, setShuffledCompanies] = useState<Company[]>(
    [...companies].sort(() => Math.random() - 0.5)
  );
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [feedback, setFeedback] = useState<string>('');
  const [streak, setStreak] = useState(0);

  const currentCompany = shuffledCompanies[currentCompanyIndex];

  const submitAnswer = () => {
    if (!selectedSector) return;

    const isCorrect = selectedSector === currentCompany.sector;
    let roundScore = 0;

    if (isCorrect) {
      roundScore = 20 + (streak * 5); // Streak bonus
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setScore(prev => prev + roundScore);

    if (currentCompanyIndex < shuffledCompanies.length - 1) {
      setCurrentCompanyIndex(prev => prev + 1);
      setSelectedSector('');
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (companies.length * 20)) * 100);
    let feedbackText = '';

    if (accuracy >= 90) {
      feedbackText = 'Outstanding! You have exceptional sector knowledge across all industries.';
    } else if (accuracy >= 75) {
      feedbackText = 'Excellent work! You understand the key characteristics of different sectors.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good job! Keep studying sector-specific metrics and trends.';
    } else {
      feedbackText = 'Keep learning! Each sector has unique characteristics and key performance indicators.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setShuffledCompanies([...companies].sort(() => Math.random() - 0.5));
    setCurrentCompanyIndex(0);
    setSelectedSector('');
    setScore(0);
    setGamePhase('playing');
    setFeedback('');
    setStreak(0);
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Sector Specialist Challenge Complete!"
        score={score}
        totalScore={companies.length * 20}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Building className="h-6 w-6 text-primary" />
          <span>Industry Expert Challenge</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Match each company to its correct sector and understand industry-specific metrics
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Company {currentCompanyIndex + 1}/{companies.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
          {streak > 0 && (
            <Badge variant="secondary" className="animate-pulse">
              🔥 Streak: {streak}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2" />
              {currentCompany.name}
            </h3>
            <p className="text-muted-foreground mb-4 text-lg">
              {currentCompany.description}
            </p>
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Performance Indicator:</h4>
              <div className="flex items-center justify-between">
                <span className="font-medium">{currentCompany.keyMetric}:</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {currentCompany.keyMetricValue}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4">Which sector does this company belong to?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector) => {
              const isSelected = selectedSector === sector.id;
              
              return (
                <Card 
                  key={sector.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSector(sector.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className={`w-4 h-4 rounded-full ${sector.color} mr-2`} />
                      <h5 className="font-semibold">{sector.name}</h5>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground font-medium">Key Metrics:</p>
                      {sector.primaryMetrics.map((metric, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={submitAnswer}
            disabled={!selectedSector}
            className="animate-scale-in"
            size="lg"
          >
            <Target className="h-4 w-4 mr-2" />
            Submit Answer
          </Button>
          <Button variant="outline" onClick={resetGame}>
            <Shuffle className="h-4 w-4 mr-2" />
            New Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorSpecialistGame;