import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface ManagementConsultingMiniGameProps {
  game: {
    id: string;
    title: string;
    description: string;
    type: string;
    gameData: any;
  };
  levelId: number;
}

const ManagementConsultingMiniGame: React.FC<ManagementConsultingMiniGameProps> = ({ game, levelId }) => {
  const [gameState, setGameState] = useState<any>({ phase: 'ready' });
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const resetGame = () => {
    setGameState({ phase: 'ready' });
    setScore(0);
    setAttempts(0);
  };

  const renderClassificationGame = () => {
    if (gameState.phase === 'ready') {
      return (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{game.description}</p>
          <Button onClick={() => setGameState({ phase: 'playing', currentIndex: 0, correct: 0, incorrect: 0 })}>
            Start Game
          </Button>
        </div>
      );
    }

    if (gameState.phase === 'playing') {
      const items = game.gameData.items || [];
      const currentItem = items[gameState.currentIndex];
      
      if (!currentItem) {
        const finalScore = Math.round((gameState.correct / items.length) * 100);
        setGameState({ phase: 'completed', finalScore });
        return null;
      }

      const handleChoice = (isCorrect: boolean) => {
        const newState = { ...gameState };
        if (isCorrect) {
          newState.correct += 1;
        } else {
          newState.incorrect += 1;
        }
        newState.currentIndex += 1;
        setGameState(newState);
      };

      return (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Item {gameState.currentIndex + 1} of {items.length}
            </p>
            <h4 className="text-lg font-medium mb-4">{currentItem.text}</h4>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => handleChoice(currentItem.correct === true)}
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                ✓ Consultant Role
              </Button>
              <Button 
                onClick={() => handleChoice(currentItem.correct === false)}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                ✗ Not Consultant
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (gameState.phase === 'completed') {
      return (
        <div className="text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h4 className="text-lg font-semibold">Game Complete!</h4>
          <p>Score: {gameState.correct} / {game.gameData.items.length}</p>
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }
  };

  const renderMatchingGame = () => {
    if (gameState.phase === 'ready') {
      return (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{game.description}</p>
          <Button onClick={() => setGameState({ 
            phase: 'playing', 
            pairs: [...game.gameData.pairs],
            matched: [],
            currentLeft: null,
            currentRight: null
          })}>
            Start Game
          </Button>
        </div>
      );
    }

    if (gameState.phase === 'playing') {
      const { pairs, matched, currentLeft, currentRight } = gameState;
      
      if (matched.length === pairs.length) {
        setGameState({ phase: 'completed' });
        return null;
      }

      const handleLeftClick = (index: number) => {
        setGameState({ ...gameState, currentLeft: index, currentRight: null });
      };

      const handleRightClick = (index: number) => {
        if (gameState.currentLeft === null) return;
        
        const leftItem = pairs[gameState.currentLeft];
        const rightItem = pairs[index];
        
        if (leftItem.right === rightItem.right) {
          // Correct match
          setGameState({
            ...gameState,
            matched: [...matched, gameState.currentLeft, index],
            currentLeft: null,
            currentRight: null
          });
        } else {
          // Incorrect match - reset selection
          setTimeout(() => {
            setGameState({
              ...gameState,
              currentLeft: null,
              currentRight: null
            });
          }, 1000);
          setGameState({ ...gameState, currentRight: index });
        }
      };

      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-center">Industries</h4>
            {pairs.map((pair, index) => (
              <Button
                key={index}
                variant={matched.includes(index) ? "default" : currentLeft === index ? "secondary" : "outline"}
                className="w-full text-sm"
                onClick={() => handleLeftClick(index)}
                disabled={matched.includes(index)}
              >
                {pair.left}
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-center">Projects</h4>
            {pairs.map((pair, index) => (
              <Button
                key={index}
                variant={matched.includes(index) ? "default" : currentRight === index ? "destructive" : "outline"}
                className="w-full text-sm"
                onClick={() => handleRightClick(index)}
                disabled={matched.includes(index)}
              >
                {pair.right}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (gameState.phase === 'completed') {
      return (
        <div className="text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h4 className="text-lg font-semibold">Perfect Match!</h4>
          <p>All pairs matched correctly!</p>
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }
  };

  const renderHypothesisGame = () => {
    if (gameState.phase === 'ready') {
      return (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{game.description}</p>
          <Button onClick={() => setGameState({ 
            phase: 'playing', 
            currentScenario: 0,
            score: 0
          })}>
            Start Game
          </Button>
        </div>
      );
    }

    if (gameState.phase === 'playing') {
      const scenarios = game.gameData.scenarios;
      const currentScenario = scenarios[gameState.currentScenario];
      
      if (!currentScenario) {
        setGameState({ phase: 'completed', finalScore: gameState.score });
        return null;
      }

      const handleHypothesisSelect = (index: number) => {
        const isCorrect = currentScenario.correctHypotheses.includes(index);
        const newScore = isCorrect ? gameState.score + 1 : gameState.score;
        
        setTimeout(() => {
          setGameState({
            phase: 'playing',
            currentScenario: gameState.currentScenario + 1,
            score: newScore
          });
        }, 1500);

        setGameState({ 
          ...gameState, 
          selectedHypothesis: index,
          showFeedback: true,
          isCorrect
        });
      };

      return (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h4 className="font-medium">Problem: {currentScenario.problem}</h4>
            <p className="text-sm text-muted-foreground mt-2">Choose the most logical hypothesis:</p>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {currentScenario.hypotheses.map((hypothesis, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start"
                onClick={() => handleHypothesisSelect(index)}
                disabled={gameState.showFeedback}
              >
                {hypothesis}
              </Button>
            ))}
          </div>

          {gameState.showFeedback && (
            <div className={`p-3 rounded-lg ${gameState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {gameState.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${gameState.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {gameState.isCorrect ? 'Good hypothesis!' : 'Consider other factors'}
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (gameState.phase === 'completed') {
      return (
        <div className="text-center space-y-4">
          <Trophy className="h-12 w-12 mx-auto text-yellow-500" />
          <h4 className="text-lg font-semibold">Analysis Complete!</h4>
          <p>Logical hypotheses: {gameState.finalScore} / {game.gameData.scenarios.length}</p>
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }
  };

  const renderOrderingGame = () => {
    if (gameState.phase === 'ready') {
      return (
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{game.description}</p>
          <Button onClick={() => {
            const shuffled = [...game.gameData.slides].sort(() => Math.random() - 0.5);
            setGameState({ 
              phase: 'playing', 
              slides: shuffled,
              userOrder: [],
              isCorrect: false
            });
          }}>
            Start Game
          </Button>
        </div>
      );
    }

    if (gameState.phase === 'playing') {
      const handleSlideClick = (slideIndex: number) => {
        if (gameState.userOrder.includes(slideIndex)) return;
        
        const newOrder = [...gameState.userOrder, slideIndex];
        const isComplete = newOrder.length === game.gameData.slides.length;
        
        if (isComplete) {
          const correctOrder = game.gameData.correctOrder;
          const isCorrect = newOrder.every((slide, index) => correctOrder[index] === slide);
          setGameState({ 
            ...gameState, 
            userOrder: newOrder, 
            isCorrect,
            phase: 'completed'
          });
        } else {
          setGameState({ ...gameState, userOrder: newOrder });
        }
      };

      return (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="font-medium mb-2">Arrange slides in correct order:</h4>
            <p className="text-sm text-muted-foreground">Click slides in the correct presentation order</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {gameState.slides.map((slide, index) => {
              const orderIndex = gameState.userOrder.indexOf(index);
              const isSelected = orderIndex !== -1;
              
              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className="text-left justify-start relative"
                  onClick={() => handleSlideClick(index)}
                  disabled={isSelected}
                >
                  {isSelected && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white">
                      {orderIndex + 1}
                    </Badge>
                  )}
                  {slide}
                </Button>
              );
            })}
          </div>
        </div>
      );
    }

    if (gameState.phase === 'completed') {
      return (
        <div className="text-center space-y-4">
          <div className={`p-4 rounded-lg ${gameState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {gameState.isCorrect ? (
              <>
                <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                <h4 className="text-lg font-semibold text-green-800">Perfect Order!</h4>
                <p className="text-green-700">You arranged the slides correctly!</p>
              </>
            ) : (
              <>
                <XCircle className="h-12 w-12 mx-auto text-red-500 mb-2" />
                <h4 className="text-lg font-semibold text-red-800">Try Again</h4>
                <p className="text-red-700">The correct order is different. Practice more!</p>
              </>
            )}
          </div>
          <Button onClick={resetGame} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </div>
      );
    }
  };

  const renderGameContent = () => {
    switch (game.type) {
      case 'classification':
        return renderClassificationGame();
      case 'matching':
        return renderMatchingGame();
      case 'hypothesis':
        return renderHypothesisGame();
      case 'ordering':
        return renderOrderingGame();
      default:
        return renderClassificationGame(); // Default fallback
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{game.title}</span>
          <Badge variant="outline">{game.type}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderGameContent()}
      </CardContent>
    </Card>
  );
};

export default ManagementConsultingMiniGame;