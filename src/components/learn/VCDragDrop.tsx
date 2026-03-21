import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, RotateCcw } from 'lucide-react';
import { VCMiniGame } from '@/data/venture-capital-journey-data';

interface GameData {
  name: string;
  howItWorks: string;
  learningGoal: string;
  completionSystem: string;
  keyTerms: string[];
}

interface VCDragDropProps {
  gameData: GameData;
  onComplete: (score: number) => void;
  isCompleted: boolean;
}

const VCDragDrop: React.FC<VCDragDropProps> = ({ gameData, onComplete, isCompleted }) => {
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'completed'>('waiting');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const getGameScenarios = () => {
    switch (gameData.name) {
      case 'Finance Match-Up':
        return [
          {
            question: "Which funding source is best for a high-growth tech startup with no revenue but huge potential?",
            options: ["Bank loan", "Venture capital", "Personal savings", "Credit card"],
            correct: 1,
            explanation: "Venture capital is specifically designed for high-growth startups that may not have revenue yet but show massive potential."
          },
          {
            question: "What funding is most appropriate for an established restaurant wanting to expand?",
            options: ["Venture capital", "Bank loan", "Angel investor", "Government grant"],
            correct: 1,
            explanation: "Established businesses with steady cash flow are better suited for traditional bank loans rather than VC funding."
          },
          {
            question: "A college student wants to start a small tutoring business. What's the best funding option?",
            options: ["Venture capital", "Bank loan", "Personal savings", "Crowdfunding"],
            correct: 2,
            explanation: "Small personal projects are typically best funded through personal savings as they don't need large amounts of capital."
          }
        ];
      case 'Risk or Reward?':
        return [
          {
            question: "A startup with no revenue but claims to revolutionize transportation",
            options: ["High risk, High reward - VC interested", "Low risk, Low reward - VC not interested", "High risk, Low reward - VC not interested", "Low risk, High reward - VC very interested"],
            correct: 0,
            explanation: "VCs look for high-risk, high-reward opportunities. Revolutionary ideas in large markets are exactly what they seek."
          },
          {
            question: "A profitable family restaurant that's been running for 20 years",
            options: ["High risk, High reward - VC interested", "Low risk, Low reward - VC not interested", "High risk, Low reward - VC not interested", "Low risk, High reward - VC very interested"],
            correct: 1,
            explanation: "Stable, profitable businesses don't offer the explosive growth potential that VCs need for their return models."
          },
          {
            question: "An AI startup with early product-market fit and growing user base",
            options: ["High risk, High reward - VC interested", "Low risk, Low reward - VC not interested", "High risk, Low reward - VC not interested", "Low risk, High reward - VC very interested"],
            correct: 0,
            explanation: "AI with proven traction reduces risk while maintaining high growth potential - perfect for VC investment."
          }
        ];
      default:
        return [
          {
            question: "Sample scenario for " + gameData.name,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0,
            explanation: "This is a sample explanation."
          }
        ];
    }
  };

  const scenarios = getGameScenarios();

  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setAttempts(0);
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAttempts(prev => prev + 1);
    
    if (answerIndex === scenarios[currentScenario].correct) {
      setScore(prev => prev + 1);
    }
    
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameState('completed');
    }
  };

  const getScoreLevel = () => {
    const percentage = (score / scenarios.length) * 100;
    if (percentage >= 90) return { level: "Gold", color: "text-yellow-600" };
    if (percentage >= 70) return { level: "Silver", color: "text-gray-600" };
    return { level: "Bronze", color: "text-amber-600" };
  };

  if (isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-golden" />
            {gameData.name} - Completed!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You've already completed this game. Great job!
          </p>
          <Button onClick={() => handleStartGame()}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'waiting') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{gameData.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">How it Works:</h4>
              <p className="text-muted-foreground">{gameData.howItWorks}</p>
            </div>
            <div>
              <h4 className="font-semibold">Learning Goal:</h4>
              <p className="text-muted-foreground">{gameData.learningGoal}</p>
            </div>
            <div>
              <h4 className="font-semibold">How to Win:</h4>
              <p className="text-muted-foreground">{gameData.completionSystem}</p>
            </div>
            <div>
              <h4 className="font-semibold">Key Terms:</h4>
              <div className="flex flex-wrap gap-2">
                {gameData.keyTerms.map((term, index) => (
                  <Badge key={index} variant="outline">{term}</Badge>
                ))}
              </div>
            </div>
          </div>
          <Button onClick={handleStartGame} className="w-full">
            Start Game
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    const scoreLevel = getScoreLevel();
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Game Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {scoreLevel.level === "Gold" ? "🥇" : scoreLevel.level === "Silver" ? "🥈" : "🥉"}
          </div>
          <h3 className={`text-2xl font-bold ${scoreLevel.color}`}>
            {scoreLevel.level} Achievement!
          </h3>
          <p className="text-lg">
            Score: {score}/{scenarios.length} correct
          </p>
          <p className="text-muted-foreground">
            Attempts: {attempts}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleStartGame()}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
            <Button onClick={() => onComplete(score)} variant="outline">
              Complete Game
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{gameData.name}</CardTitle>
          <Badge variant="outline">
            Question {currentScenario + 1} of {scenarios.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {scenarios[currentScenario].question}
          </h3>
          
          <div className="grid gap-3">
            {scenarios[currentScenario].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`text-left justify-start h-auto p-4 ${
                  showFeedback && index === scenarios[currentScenario].correct
                    ? "bg-green-100 border-green-300 text-green-800"
                    : showFeedback && selectedAnswer === index && index !== scenarios[currentScenario].correct
                    ? "bg-red-100 border-red-300 text-red-800"
                    : ""
                }`}
              >
                {option}
              </Button>
            ))}
          </div>

          {showFeedback && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Explanation:</strong> {scenarios[currentScenario].explanation}
              </p>
              <Button onClick={handleNextScenario} className="mt-3">
                {currentScenario === scenarios.length - 1 ? "Finish Game" : "Next Question"}
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Score: {score}/{currentScenario + (showFeedback ? 1 : 0)}</span>
          <span>Attempts: {attempts}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VCDragDrop;