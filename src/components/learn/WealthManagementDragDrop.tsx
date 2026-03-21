import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, X } from 'lucide-react';

interface GameData {
  name: string;
  howItWorks: string;
  learningGoal: string;
  completionSystem: string;
  keyTerms: string;
}

interface WealthManagementDragDropProps {
  gameData: GameData;
  onComplete: () => void;
  isCompleted: boolean;
}

const WealthManagementDragDrop: React.FC<WealthManagementDragDropProps> = ({
  gameData,
  onComplete,
  isCompleted
}) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'completed'>('waiting');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Simplified game scenarios based on game type
  const getGameScenarios = () => {
    if (gameData.name.includes('Match') || gameData.name.includes('Sorter')) {
      return [
        { question: '"I want to lower my taxes"', options: ['Tax Planning', 'Investment Planning', 'Insurance Planning'], correct: 0 },
        { question: '"I need to protect my family"', options: ['Estate Planning', 'Tax Planning', 'Retirement Planning'], correct: 0 },
        { question: '"I want to save for retirement"', options: ['Insurance Planning', 'Retirement Planning', 'Tax Planning'], correct: 1 },
      ];
    } else if (gameData.name.includes('Builder') || gameData.name.includes('Portfolio')) {
      return [
        { question: 'Young professional risk tolerance:', options: ['High', 'Medium', 'Low'], correct: 0 },
        { question: 'Retiree investment priority:', options: ['Growth', 'Income', 'Speculation'], correct: 1 },
        { question: 'Emergency fund priority:', options: ['Long-term', 'Short-term', 'Never'], correct: 1 },
      ];
    }
    return [
      { question: 'Sample scenario 1', options: ['Option A', 'Option B', 'Option C'], correct: 0 },
      { question: 'Sample scenario 2', options: ['Option A', 'Option B', 'Option C'], correct: 1 },
    ];
  };

  const [scenarios] = useState(getGameScenarios());
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setAttempts(0);
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setAttempts(attempts + 1);
    
    if (answerIndex === scenarios[currentScenario].correct) {
      setScore(score + 1);
    }
  };

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('completed');
      if (!isCompleted) {
        onComplete();
      }
    }
  };

  const getScoreLevel = () => {
    const percentage = (score / scenarios.length) * 100;
    if (percentage >= 80) return { level: 'Gold', color: 'text-yellow-600' };
    if (percentage >= 60) return { level: 'Silver', color: 'text-gray-600' };
    return { level: 'Bronze', color: 'text-amber-600' };
  };

  if (isCompleted && gameState === 'waiting') {
    return (
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span className="text-emerald-700 font-medium">Game Completed!</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleStartGame}>
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'waiting') {
    return (
      <div className="text-center">
        <Button onClick={handleStartGame} className="bg-emerald-600 hover:bg-emerald-700">
          Start {gameData.name}
        </Button>
      </div>
    );
  }

  if (gameState === 'completed') {
    const scoreLevel = getScoreLevel();
    return (
      <Card className="bg-emerald-50 border-emerald-200">
        <CardContent className="text-center p-6">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-emerald-800 mb-2">Game Complete!</h4>
          <p className="text-emerald-700 mb-4">
            You scored {score} out of {scenarios.length} correct
          </p>
          <Badge className={`${scoreLevel.color} mb-4`}>
            {scoreLevel.level} Level Achievement!
          </Badge>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" onClick={handleStartGame}>
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const scenario = scenarios[currentScenario];
  const isCorrect = selectedAnswer === scenario.correct;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline">
              Question {currentScenario + 1} of {scenarios.length}
            </Badge>
            <div className="text-sm text-muted-foreground">
              Score: {score}/{scenarios.length}
            </div>
          </div>
          
          <h4 className="text-lg font-semibold text-emerald-800 mb-4">
            {scenario.question}
          </h4>
          
          <div className="space-y-2">
            {scenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-red-500 bg-red-50 text-red-700'
                    : showFeedback && index === scenario.correct
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-muted hover:border-emerald-200 hover:bg-emerald-50'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showFeedback && selectedAnswer === index && (
                    isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )
                  )}
                  {showFeedback && index === scenario.correct && selectedAnswer !== index && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {showFeedback && (
            <div className="mt-4">
              <p className={`text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                {isCorrect ? '🎉 Correct!' : '❌ Not quite right. '}
                {!isCorrect && `The correct answer is: ${scenario.options[scenario.correct]}`}
              </p>
              
              <Button 
                onClick={handleNextScenario}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700"
              >
                {currentScenario < scenarios.length - 1 ? 'Next Question' : 'Complete Game'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthManagementDragDrop;