import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Users, CheckCircle } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Responsibility {
  id: string;
  description: string;
  correctDivision: string;
}

const divisions: Division[] = [
  {
    id: 'investment-banking',
    name: 'Investment Banking Division',
    description: 'M&A, IPOs, and advisory services',
    icon: '🏢'
  },
  {
    id: 'sales-trading',
    name: 'Sales & Trading',
    description: 'Market making and client trading',
    icon: '📈'
  },
  {
    id: 'research',
    name: 'Research Division',
    description: 'Company analysis and investment recommendations',
    icon: '📊'
  },
  {
    id: 'asset-management',
    name: 'Asset Management',
    description: 'Managing investment portfolios for clients',
    icon: '💰'
  }
];

const responsibilities: Responsibility[] = [
  {
    id: 'advise-merger',
    description: 'Advising companies on mergers and acquisitions',
    correctDivision: 'investment-banking'
  },
  {
    id: 'execute-trades',
    description: 'Executing large stock trades for institutional clients',
    correctDivision: 'sales-trading'
  },
  {
    id: 'publish-reports',
    description: 'Publishing detailed company analysis reports',
    correctDivision: 'research'
  },
  {
    id: 'manage-funds',
    description: 'Managing mutual funds and hedge funds',
    correctDivision: 'asset-management'
  },
  {
    id: 'underwrite-ipo',
    description: 'Underwriting initial public offerings',
    correctDivision: 'investment-banking'
  },
  {
    id: 'make-markets',
    description: 'Providing liquidity and making markets in securities',
    correctDivision: 'sales-trading'
  }
];

interface DivisionDetectiveGameProps {
  onComplete: (score: number) => void;
}

const DivisionDetectiveGame: React.FC<DivisionDetectiveGameProps> = ({ onComplete }) => {
  const [currentResponsibilityIndex, setCurrentResponsibilityIndex] = useState(0);
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completed'>('playing');
  const [feedback, setFeedback] = useState<string>('');

  const currentResponsibility = responsibilities[currentResponsibilityIndex];
  const progress = ((currentResponsibilityIndex + 1) / responsibilities.length) * 100;

  const handleSubmit = () => {
    if (!selectedDivision) return;

    const isCorrect = selectedDivision === currentResponsibility.correctDivision;
    const roundScore = isCorrect ? 20 : 5;
    setScore(prev => prev + roundScore);

    if (currentResponsibilityIndex < responsibilities.length - 1) {
      setCurrentResponsibilityIndex(prev => prev + 1);
      setSelectedDivision('');
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const accuracy = Math.round((score / (responsibilities.length * 20)) * 100);
    let feedbackText = '';

    if (accuracy >= 90) {
      feedbackText = 'Outstanding! You clearly understand how investment banks are organized.';
    } else if (accuracy >= 75) {
      feedbackText = 'Great work! You have a solid grasp of investment banking divisions.';
    } else if (accuracy >= 60) {
      feedbackText = 'Good effort! Keep studying the different divisions and their roles.';
    } else {
      feedbackText = 'Keep learning! Each division has specific responsibilities in the investment bank.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(score);
  };

  const resetGame = () => {
    setCurrentResponsibilityIndex(0);
    setSelectedDivision('');
    setScore(0);
    setGamePhase('playing');
    setFeedback('');
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Division Detective Complete!"
        score={score}
        totalScore={responsibilities.length * 20}
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
          <span>Division Detective</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Match responsibilities with the correct investment banking division
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            {currentResponsibilityIndex + 1}/{responsibilities.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Which division handles this responsibility?
            </h3>
            <p className="text-lg text-blue-700">
              {currentResponsibility.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((division) => {
            const isSelected = selectedDivision === division.id;
            
            return (
              <Card 
                key={division.id}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                }`}
                onClick={() => setSelectedDivision(division.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{division.icon}</div>
                  <h4 className="font-semibold mb-2">{division.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {division.description}
                  </p>
                  {isSelected && (
                    <CheckCircle className="h-5 w-5 mx-auto mt-2 text-primary" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedDivision}
            className="animate-scale-in"
            size="lg"
          >
            <Users className="h-4 w-4 mr-2" />
            Submit Answer
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Restart Game
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DivisionDetectiveGame;