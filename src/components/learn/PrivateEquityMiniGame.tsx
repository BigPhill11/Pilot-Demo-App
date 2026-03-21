import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, RotateCcw } from 'lucide-react';

interface MiniGame {
  name: string;
  description: string;
  goal: string;
  completion: string;
}

interface PrivateEquityMiniGameProps {
  games: MiniGame[];
  levelId: number;
  onComplete: (points: number) => void;
  isCompleted: boolean;
}

const PrivateEquityMiniGame: React.FC<PrivateEquityMiniGameProps> = ({
  games,
  levelId,
  onComplete,
  isCompleted
}) => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [gameResults, setGameResults] = useState<{ [key: number]: string }>({});

  const getGameComponent = (gameIndex: number) => {
    const game = games[gameIndex];
    
    // Level 1 Games
    if (levelId === 1) {
      if (game.name === "PE or Not?") {
        return <PEOrNotGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "Exit Path") {
        return <ExitPathGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 2 Games
    if (levelId === 2) {
      if (game.name === "Fund Builder") {
        return <FundBuilderGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "GP vs LP") {
        return <GPvsLPGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 3 Games
    if (levelId === 3) {
      if (game.name === "Deal Sorter") {
        return <DealSorterGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "LBO Simulator") {
        return <LBOSimulatorGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 4 Games
    if (levelId === 4) {
      if (game.name === "Valuation Match") {
        return <ValuationMatchGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "Red Flag Hunt") {
        return <RedFlagHuntGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 5 Games
    if (levelId === 5) {
      if (game.name === "Value Builder") {
        return <ValueBuilderGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "Fix or Forget") {
        return <FixOrForgetGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 6 Games
    if (levelId === 6) {
      if (game.name === "Exit Picker") {
        return <ExitPickerGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "ROI Calculator") {
        return <ROICalculatorGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    // Level 7 Games
    if (levelId === 7) {
      if (game.name === "Trend Tracker") {
        return <TrendTrackerGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      } else if (game.name === "Survival Strategy") {
        return <SurvivalStrategyGame onResult={(result) => handleGameResult(gameIndex, result)} />;
      }
    }
    
    return <div>Game not implemented yet</div>;
  };

  const handleGameResult = (gameIndex: number, result: string) => {
    setGameResults(prev => ({ ...prev, [gameIndex]: result }));
    
    const completedGames = Object.keys(gameResults).length + 1;
    if (completedGames === games.length) {
      const totalPoints = Object.values({ ...gameResults, [gameIndex]: result })
        .reduce((sum, result) => sum + getPointsForResult(result), 0);
      onComplete(totalPoints);
    }
  };

  const getPointsForResult = (result: string): number => {
    switch (result) {
      case 'gold': return 20;
      case 'silver': return 15;
      case 'bronze': return 10;
      default: return 5;
    }
  };

  const getBadgeVariant = (result: string) => {
    switch (result) {
      case 'gold': return 'default';
      case 'silver': return 'secondary';
      case 'bronze': return 'outline';
      default: return 'destructive';
    }
  };

  if (selectedGame !== null) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedGame(null)}>
          ← Back to Games
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{games[selectedGame].name}</CardTitle>
            <p className="text-sm text-muted-foreground">{games[selectedGame].goal}</p>
          </CardHeader>
          <CardContent>
            {getGameComponent(selectedGame)}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mini Games</h3>
        <Badge variant="outline">
          {Object.keys(gameResults).length}/{games.length} completed
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {games.map((game, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{game.name}</CardTitle>
                {gameResults[index] && (
                  <Badge variant={getBadgeVariant(gameResults[index])}>
                    {gameResults[index]}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {game.description}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                {game.completion}
              </p>
              <Button 
                onClick={() => setSelectedGame(index)}
                disabled={isCompleted}
                className="w-full"
                variant={gameResults[index] ? "outline" : "default"}
              >
                {gameResults[index] ? 'Play Again' : 'Start Game'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {isCompleted && (
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-green-800 font-medium">All Mini Games Completed!</p>
        </div>
      )}
    </div>
  );
};

// Sample game components (simplified for space)
const PEOrNotGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const questions = [
    { scenario: "Buying shares of Apple on NASDAQ", answer: false },
    { scenario: "Acquiring a private restaurant chain to improve operations", answer: true },
    { scenario: "Investing in government bonds", answer: false },
    { scenario: "Purchasing a family-owned manufacturing business", answer: true },
    { scenario: "Day trading cryptocurrencies", answer: false }
  ];

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 >= questions.length) {
      const percentage = ((score + (isCorrect === questions[currentQuestion].answer ? 1 : 0)) / questions.length) * 100;
      if (percentage === 100) onResult('gold');
      else if (percentage >= 75) onResult('silver');
      else if (percentage >= 50) onResult('bronze');
      else onResult('none');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="text-center">
        <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-lg font-semibold">Game Complete!</p>
        <p>Score: {score}/{questions.length}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</p>
        <h4 className="text-lg font-semibold mt-2">{questions[currentQuestion].scenario}</h4>
        <p className="text-sm text-muted-foreground mt-2">Is this private equity?</p>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Button onClick={() => handleAnswer(true)} className="bg-green-600 hover:bg-green-700">
          Yes, it's PE
        </Button>
        <Button onClick={() => handleAnswer(false)} variant="outline">
          No, it's not PE
        </Button>
      </div>
    </div>
  );
};

// Additional game components would be implemented similarly...
const ExitPathGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const FundBuilderGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const GPvsLPGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const DealSorterGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const LBOSimulatorGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const ValuationMatchGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const RedFlagHuntGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const ValueBuilderGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const FixOrForgetGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const ExitPickerGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const ROICalculatorGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const TrendTrackerGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

const SurvivalStrategyGame: React.FC<{ onResult: (result: string) => void }> = ({ onResult }) => (
  <div className="text-center"><Button onClick={() => onResult('gold')}>Complete Game</Button></div>
);

export default PrivateEquityMiniGame;