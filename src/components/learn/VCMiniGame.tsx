import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy } from 'lucide-react';

interface VCMiniGameProps {
  onBack: () => void;
  onComplete: () => void;
}

const VCMiniGame: React.FC<VCMiniGameProps> = ({ onBack, onComplete }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);

  const challenges = [
    {
      title: "Portfolio Construction Challenge",
      description: "You're managing a $100M VC fund. Allocate your investments across different stages and sectors.",
      scenario: "You have 5 promising startups to choose from. You can only invest in 3. Which ones do you choose?",
      options: [
        "Early-stage AI startup (high risk, high potential)",
        "Growth-stage SaaS company (medium risk, proven revenue)",
        "Seed-stage biotech (very high risk, revolutionary potential)",
        "Series B fintech (lower risk, established market)",
        "Pre-revenue clean energy startup (high risk, large market)"
      ],
      correctAnswers: [0, 1, 3], // Balanced portfolio across stages
      explanation: "A balanced VC portfolio typically includes investments across different stages and risk levels. The AI startup (early-stage), SaaS company (growth-stage), and fintech (Series B) provide good diversification."
    },
    {
      title: "Due Diligence Detective",
      description: "Evaluate a startup pitch and identify the most important factors for investment decisions.",
      scenario: "FoodieBot wants $2M for 20% equity. They have an AI-powered restaurant recommendation app with 10,000 users and $5K monthly revenue. What's your biggest concern?",
      options: [
        "User growth is too slow for the market size",
        "Revenue per user is very low",
        "Team lacks restaurant industry experience",
        "Competition from established players like Yelp"
      ],
      correctAnswers: [1], // Revenue per user is critically low
      explanation: "With 10,000 users generating only $5K monthly revenue, that's just $0.50 per user per month. This suggests weak monetization and possible lack of product-market fit."
    },
    {
      title: "Market Timing Master",
      description: "Assess market timing and competitive landscape for investment decisions.",
      scenario: "Two similar startups: one entered the market 2 years ago with modest growth, another is brand new with an innovative approach. The market is heating up. Which do you choose?",
      options: [
        "The established player - safer bet with proven execution",
        "The new startup - innovation advantage in growing market",
        "Neither - market is too competitive now",
        "Both - diversify across the space"
      ],
      correctAnswers: [1], // New innovation in heating market
      explanation: "In a rapidly growing market, innovative newcomers can quickly capture market share. The 'first-mover advantage' matters less than having the best solution when the market is expanding."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const currentQ = challenges[currentChallenge];
    if (currentQ.correctAnswers.includes(answerIndex)) {
      setScore(prev => prev + 1);
    }

    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1);
    } else {
      setGameState('completed');
    }
  };

  const getPerformanceLevel = () => {
    const percentage = (score / challenges.length) * 100;
    if (percentage >= 80) return { level: "VC Star", icon: "🌟", color: "text-yellow-600" };
    if (percentage >= 60) return { level: "Investment Analyst", icon: "📊", color: "text-blue-600" };
    return { level: "Junior Associate", icon: "📚", color: "text-green-600" };
  };

  if (gameState === 'intro') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <CardTitle className="text-center text-2xl">
            VC Final Challenge 🚀
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="text-6xl mb-4">💼</div>
          <h2 className="text-xl font-bold">Welcome to the VC Challenge!</h2>
          <p className="text-muted-foreground">
            Put your venture capital knowledge to the test. You'll face real-world scenarios 
            that VCs encounter daily, from portfolio construction to due diligence decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold">Strategic Thinking</h3>
              <p className="text-sm text-muted-foreground">Make investment decisions like a real VC</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">Evaluate opportunities and risks</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold">Portfolio Building</h3>
              <p className="text-sm text-muted-foreground">Create balanced investment strategies</p>
            </div>
          </div>

          <Button onClick={() => setGameState('playing')} size="lg" className="w-full">
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'completed') {
    const performance = getPerformanceLevel();
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Challenge Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">{performance.icon}</div>
          <h2 className={`text-2xl font-bold ${performance.color}`}>
            {performance.level}
          </h2>
          <p className="text-lg">
            Final Score: {score}/{challenges.length}
          </p>
          <p className="text-muted-foreground">
            {score === challenges.length 
              ? "Perfect! You're ready to join a top VC firm!" 
              : score >= 2 
              ? "Great work! You understand VC fundamentals well." 
              : "Good effort! Review the concepts and try again."}
          </p>
          
          <div className="space-y-4">
            <h3 className="font-semibold">What You've Mastered:</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <Badge variant="outline" className="p-2">✓ VC Investment Decision-Making</Badge>
              <Badge variant="outline" className="p-2">✓ Portfolio Construction Strategies</Badge>
              <Badge variant="outline" className="p-2">✓ Due Diligence Analysis</Badge>
              <Badge variant="outline" className="p-2">✓ Market Timing Assessment</Badge>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => {
              setGameState('intro');
              setCurrentChallenge(0);
              setScore(0);
            }}>
              <Trophy className="h-4 w-4 mr-2" />
              Retake Challenge
            </Button>
            <Button onClick={onComplete} variant="outline">
              Complete Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">
            Challenge {currentChallenge + 1} of {challenges.length}
          </Badge>
          <Badge variant="secondary">
            Score: {score}/{currentChallenge}
          </Badge>
        </div>
        <CardTitle>{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{challenge.description}</p>
        
        <div className="p-4 bg-primary/5 rounded-lg border">
          <h3 className="font-semibold mb-3">Scenario:</h3>
          <p>{challenge.scenario}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">What's your decision?</h3>
          <div className="grid gap-3">
            {challenge.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswer(index)}
                className="text-left justify-start h-auto p-4 whitespace-normal"
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VCMiniGame;