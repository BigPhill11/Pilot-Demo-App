import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Trophy, Timer, Star } from 'lucide-react';
import { AssetManagementMiniGame } from '@/data/asset-management-journey-data';

interface AssetManagementLevelMiniGamesProps {
  miniGames: AssetManagementMiniGame[];
}

const AssetManagementLevelMiniGames: React.FC<AssetManagementLevelMiniGamesProps> = ({ miniGames }) => {
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [gameState, setGameState] = useState<any>({});
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameStart = (gameIndex: number) => {
    setSelectedGame(gameIndex);
    setGameState({});
    setGameComplete(false);
    setScore(0);
  };

  const handleGameBack = () => {
    setSelectedGame(null);
    setGameComplete(false);
    setGameState({});
  };

  if (selectedGame !== null) {
    const game = miniGames[selectedGame];
    
    if (game.type === 'role-match') {
      return <RoleMatchGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'quiz-showdown') {
      return <QuizShowdownGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'stock-detective') {
      return <StockDetectiveGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'valuation-battle') {
      return <ValuationBattleGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'portfolio-builder') {
      return <PortfolioBuilderGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'risk-radar') {
      return <RiskRadarGame game={game} onBack={handleGameBack} />;
    } else if (game.type === 'hedge-game') {
      return <HedgeGameComponent game={game} onBack={handleGameBack} />;
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-blue-600 mb-2">Interactive Mini Games</h3>
        <p className="text-muted-foreground">Practice your asset management skills with these engaging games</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miniGames.map((game, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Gamepad2 className="h-5 w-5" />
                {game.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {game.type.replace('-', ' ').toUpperCase()}
                </Badge>
                <Button 
                  onClick={() => handleGameStart(index)}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Play Game
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Individual Game Components
const RoleMatchGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleMatch = (scenarioId: string, roleId: string) => {
    setMatches(prev => ({ ...prev, [scenarioId]: roleId }));
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const correctMatches = game.gameData.scenarios.filter((scenario: any) => 
    matches[scenario.id] === scenario.correctRole
  ).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            {game.title}
          </CardTitle>
          <Button variant="outline" onClick={onBack}>Back</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{game.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Roles:</h4>
            <div className="space-y-2">
              {game.gameData.roles.map((role: any) => (
                <Badge key={role.id} variant="outline" className="w-full justify-start p-2">
                  {role.name}: {role.description}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Scenarios:</h4>
            <div className="space-y-3">
              {game.gameData.scenarios.map((scenario: any) => (
                <div key={scenario.id} className="border rounded-lg p-3">
                  <p className="text-sm mb-2">{scenario.description}</p>
                  <select 
                    className="w-full p-2 border rounded text-sm"
                    onChange={(e) => handleMatch(scenario.id, e.target.value)}
                    value={matches[scenario.id] || ''}
                  >
                    <option value="">Select a role...</option>
                    {game.gameData.roles.map((role: any) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  {showResults && (
                    <div className="mt-2">
                      {matches[scenario.id] === scenario.correctRole ? (
                        <Badge className="bg-green-500 text-white text-xs">✓ Correct!</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">
                          ✗ Correct: {game.gameData.roles.find((r: any) => r.id === scenario.correctRole)?.name}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {Object.keys(matches).length === game.gameData.scenarios.length && !showResults && (
          <div className="text-center">
            <Button onClick={checkResults} className="bg-blue-500 hover:bg-blue-600">
              Check Results
            </Button>
          </div>
        )}

        {showResults && (
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-bold text-blue-600">Game Complete!</h3>
            <p>You scored {correctMatches} out of {game.gameData.scenarios.length}</p>
            <Badge className={`mt-2 ${correctMatches === game.gameData.scenarios.length ? 'bg-green-500' : correctMatches >= Math.ceil(game.gameData.scenarios.length * 0.7) ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {correctMatches === game.gameData.scenarios.length ? '⭐ Perfect!' : 
               correctMatches >= Math.ceil(game.gameData.scenarios.length * 0.7) ? '🥉 Good Job!' : 
               '📚 Keep Learning!'}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const QuizShowdownGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);

  React.useEffect(() => {
    if (timeLeft > 0 && !answered && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, answered, gameOver]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    const question = game.gameData.questions[currentQuestion];
    if (answerIndex === question.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 >= game.gameData.questions.length) {
        setGameOver(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(10);
        setAnswered(false);
      }
    }, 1500);
  };

  if (gameOver) {
    const percentage = (score / game.gameData.questions.length) * 100;
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quiz Complete!</CardTitle>
            <Button variant="outline" onClick={onBack}>Back</Button>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Trophy className="h-12 w-12 text-blue-500 mx-auto" />
          <h3 className="text-xl font-bold">Final Score: {score}/{game.gameData.questions.length}</h3>
          <Badge className={`text-lg py-2 px-4 ${
            percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {percentage >= 80 ? '🥇 Gold' : percentage >= 60 ? '🥈 Silver' : '🥉 Bronze'}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  const question = game.gameData.questions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Quiz Showdown
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="outline">Score: {score}</Badge>
            <Badge className={timeLeft <= 3 ? 'bg-red-500' : 'bg-blue-500'}>
              {timeLeft}s
            </Badge>
            <Button variant="outline" onClick={onBack}>Exit</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option: string, index: number) => (
              <Button
                key={index}
                variant={answered ? (index === question.correctAnswer ? 'default' : 'outline') : 'outline'}
                className={`h-auto p-4 ${
                  answered && index === question.correctAnswer ? 'bg-green-500 hover:bg-green-600' :
                  answered && index !== question.correctAnswer ? 'bg-red-100' : ''
                }`}
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Simplified versions of other game components
const StockDetectiveGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{game.title}</CardTitle>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-center text-muted-foreground">Stock Detective game coming soon!</p>
    </CardContent>
  </Card>
);

const ValuationBattleGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{game.title}</CardTitle>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-center text-muted-foreground">Valuation Battle game coming soon!</p>
    </CardContent>
  </Card>
);

const PortfolioBuilderGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{game.title}</CardTitle>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-center text-muted-foreground">Portfolio Builder game coming soon!</p>
    </CardContent>
  </Card>
);

const RiskRadarGame: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{game.title}</CardTitle>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-center text-muted-foreground">Risk Radar game coming soon!</p>
    </CardContent>
  </Card>
);

const HedgeGameComponent: React.FC<{ game: AssetManagementMiniGame; onBack: () => void }> = ({ game, onBack }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{game.title}</CardTitle>
        <Button variant="outline" onClick={onBack}>Back</Button>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-center text-muted-foreground">Hedge It! game coming soon!</p>
    </CardContent>
  </Card>
);

export default AssetManagementLevelMiniGames;