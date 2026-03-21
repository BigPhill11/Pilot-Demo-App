import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, TrendingUp, Building, CheckCircle } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface DealAnnouncement {
  id: string;
  headline: string;
  details: string;
  dealValue: string;
  targetCompany: string;
  acquirer: string;
  correctSpecialist: string;
  sector: string;
  keyIndicators: string[];
}

interface Specialist {
  id: string;
  name: string;
  expertise: string;
  color: string;
  icon: string;
}

const specialists: Specialist[] = [
  {
    id: 'technology',
    name: 'Technology Specialist',
    expertise: 'Software, hardware, AI, and tech platforms',
    color: 'bg-blue-500',
    icon: '💻'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Specialist', 
    expertise: 'Pharma, biotech, medical devices, healthcare services',
    color: 'bg-green-500',
    icon: '🏥'
  },
  {
    id: 'energy',
    name: 'Energy Specialist',
    expertise: 'Oil & gas, renewables, utilities, mining',
    color: 'bg-orange-500',
    icon: '⚡'
  },
  {
    id: 'financial',
    name: 'Financial Services Specialist',
    expertise: 'Banks, insurance, fintech, asset management',
    color: 'bg-purple-500',
    icon: '🏦'
  },
  {
    id: 'industrials',
    name: 'Industrials Specialist',
    expertise: 'Manufacturing, aerospace, transportation, logistics',
    color: 'bg-gray-500',
    icon: '🏭'
  }
];

const dealAnnouncements: DealAnnouncement[] = [
  {
    id: 'salesforce-slack',
    headline: 'Salesforce Acquires Slack for $27.7 Billion',
    details: 'Leading CRM platform acquires workplace collaboration tool to enhance digital communication capabilities',
    dealValue: '$27.7B',
    targetCompany: 'Slack Technologies',
    acquirer: 'Salesforce',
    correctSpecialist: 'technology',
    sector: 'Technology',
    keyIndicators: ['SaaS revenue model', 'Cloud infrastructure', 'Enterprise software']
  },
  {
    id: 'pfizer-arena',
    headline: 'Pfizer Acquires Arena Pharmaceuticals for $6.7 Billion',
    details: 'Pharmaceutical giant expands immunology portfolio with acquisition of biotech developing treatments for inflammatory diseases',
    dealValue: '$6.7B',
    targetCompany: 'Arena Pharmaceuticals',
    acquirer: 'Pfizer',
    correctSpecialist: 'healthcare',
    sector: 'Healthcare',
    keyIndicators: ['Drug pipeline', 'Clinical trials', 'FDA approvals']
  },
  {
    id: 'warren-buffett-occidental',
    headline: 'Berkshire Hathaway Increases Stake in Occidental Petroleum',
    details: 'Warren Buffett\'s conglomerate continues building position in oil producer amid energy sector recovery',
    dealValue: '$10B+',
    targetCompany: 'Occidental Petroleum',
    acquirer: 'Berkshire Hathaway',
    correctSpecialist: 'energy',
    sector: 'Energy',
    keyIndicators: ['Oil reserves', 'Production capacity', 'Commodity exposure']
  },
  {
    id: 'morgan-stanley-eaton',
    headline: 'Morgan Stanley Acquires Eaton Vance for $7 Billion',
    details: 'Investment bank expands wealth management capabilities with acquisition of asset management firm',
    dealValue: '$7B',
    targetCompany: 'Eaton Vance',
    acquirer: 'Morgan Stanley',
    correctSpecialist: 'financial',
    sector: 'Financial Services',
    keyIndicators: ['Assets under management', 'Fee income', 'Client relationships']
  },
  {
    id: 'caterpillar-mining',
    headline: 'Caterpillar Acquires Mining Equipment Manufacturer',
    details: 'Heavy machinery leader expands mining solutions portfolio with strategic acquisition',
    dealValue: '$2.3B',
    targetCompany: 'MineMax Solutions',
    acquirer: 'Caterpillar',
    correctSpecialist: 'industrials',
    sector: 'Industrials',
    keyIndicators: ['Manufacturing capacity', 'Industrial automation', 'Heavy equipment']
  }
];

interface SectorDetectiveGameProps {
  onComplete: (score: number) => void;
}

const SectorDetectiveGame: React.FC<SectorDetectiveGameProps> = ({ onComplete }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'analyzing' | 'completed'>('analyzing');
  const [feedback, setFeedback] = useState<string>('');
  const [streak, setStreak] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const currentDeal = dealAnnouncements[currentDealIndex];
  const progress = ((currentDealIndex + 1) / dealAnnouncements.length) * 100;

  const submitPrediction = () => {
    if (!selectedSpecialist) return;

    const isCorrect = selectedSpecialist === currentDeal.correctSpecialist;
    let roundScore = 0;

    if (isCorrect) {
      roundScore = 25 + (streak * 5); // Base points plus streak bonus
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
      roundScore = 5; // Participation points
    }

    // Bonus for not using hints
    if (!showHints) {
      roundScore += 10;
    }

    setScore(prev => prev + roundScore);

    if (currentDealIndex < dealAnnouncements.length - 1) {
      setCurrentDealIndex(prev => prev + 1);
      setSelectedSpecialist('');
      setShowHints(false);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (dealAnnouncements.length * 25)) * 100);
    let feedbackText = '';

    if (accuracy >= 90 && streak >= 3) {
      feedbackText = 'Outstanding! You have exceptional sector expertise and pattern recognition skills.';
    } else if (accuracy >= 75) {
      feedbackText = 'Excellent detective work! You understand how different sectors operate.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good analysis! Keep studying sector-specific deal patterns and key metrics.';
    } else {
      feedbackText = 'Keep learning! Each sector has unique characteristics that investment bankers must recognize.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setCurrentDealIndex(0);
    setSelectedSpecialist('');
    setScore(0);
    setGamePhase('analyzing');
    setFeedback('');
    setStreak(0);
    setShowHints(false);
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Sector Detective Case Closed!"
        score={score}
        totalScore={dealAnnouncements.length * 35}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Search className="h-6 w-6 text-primary" />
          <span>Sector Detective</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Analyze deal announcements and predict which sector specialist would handle each transaction
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Deal {currentDealIndex + 1}/{dealAnnouncements.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
          {streak > 0 && (
            <Badge variant="secondary" className="animate-pulse">
              🔥 Streak: {streak}
            </Badge>
          )}
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-800 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                {currentDeal.headline}
              </h3>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {currentDeal.dealValue}
              </Badge>
            </div>
            <p className="text-blue-700 text-lg leading-relaxed mb-4">
              {currentDeal.details}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-blue-800">Target:</span>
                <span className="ml-2 text-blue-700">{currentDeal.targetCompany}</span>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Acquirer:</span>
                <span className="ml-2 text-blue-700">{currentDeal.acquirer}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {showHints && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">🔍 Investigation Clues:</h4>
              <div className="flex flex-wrap gap-2">
                {currentDeal.keyIndicators.map((indicator, index) => (
                  <Badge key={index} variant="outline" className="text-yellow-700">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Which sector specialist should lead this deal?
            </h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowHints(!showHints)}
            >
              {showHints ? 'Hide' : 'Show'} Clues
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialists.map((specialist) => {
              const isSelected = selectedSpecialist === specialist.id;
              
              return (
                <Card 
                  key={specialist.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSpecialist(specialist.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{specialist.icon}</div>
                    <h5 className="font-semibold mb-2">{specialist.name}</h5>
                    <p className="text-xs text-muted-foreground">
                      {specialist.expertise}
                    </p>
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 mx-auto mt-2 text-primary" />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={submitPrediction}
            disabled={!selectedSpecialist}
            className="animate-scale-in"
            size="lg"
          >
            <Search className="h-4 w-4 mr-2" />
            Submit Prediction
          </Button>
          <Button variant="outline" onClick={resetGame}>
            New Case
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorDetectiveGame;