import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Star, Target } from 'lucide-react';

interface WealthManagementMiniGameProps {
  onBack: () => void;
  onComplete: () => void;
}

const WealthManagementMiniGame: React.FC<WealthManagementMiniGameProps> = ({ onBack, onComplete }) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'completed'>('intro');
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const challenges = [
    {
      title: "Portfolio Master Challenge",
      description: "Apply your wealth management knowledge to create optimal portfolios for different client profiles.",
      scenario: "Design a portfolio for a 35-year-old doctor saving for retirement and her children's education.",
      options: [
        "70% Stocks, 20% Bonds, 10% Cash",
        "40% Stocks, 40% Bonds, 20% Cash", 
        "90% Stocks, 5% Bonds, 5% Cash",
        "50% Stocks, 30% Bonds, 20% Real Estate"
      ],
      correct: 0,
      explanation: "A 35-year-old professional has a long time horizon, allowing for higher growth allocation while maintaining some stability."
    },
    {
      title: "Client Scenario Analysis",
      description: "Analyze complex client situations and recommend appropriate wealth management strategies.",
      scenario: "A retired teacher wants to minimize taxes on her portfolio withdrawals while ensuring steady income.",
      options: [
        "Focus only on tax-free municipal bonds",
        "Mix of dividend stocks, bonds, and tax-efficient withdrawal strategy",
        "Put everything in a savings account",
        "Invest heavily in growth stocks"
      ],
      correct: 1,
      explanation: "A balanced approach with tax-efficient strategies provides both income and tax optimization."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === challenges[currentChallenge].correct) {
      setScore(score + 1);
    }
    
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      setGameState('completed');
    }
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>

          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-emerald-800">Portfolio Master Challenge</CardTitle>
              <CardDescription className="text-lg text-emerald-700">
                Test your wealth management expertise with real-world scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Target className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-emerald-800">Client Analysis</p>
                  <p className="text-xs text-muted-foreground">Assess needs & goals</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-teal-800">Strategy Design</p>
                  <p className="text-xs text-muted-foreground">Create optimal plans</p>
                </div>
                <div className="text-center">
                  <Trophy className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-emerald-800">Portfolio Mastery</p>
                  <p className="text-xs text-muted-foreground">Achieve excellence</p>
                </div>
              </div>
              
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">Challenge Overview:</h4>
                <ul className="text-sm text-emerald-700 space-y-1 text-left">
                  <li>• Analyze diverse client profiles and financial situations</li>
                  <li>• Design appropriate investment strategies and allocations</li>
                  <li>• Apply holistic wealth management principles</li>
                  <li>• Demonstrate mastery of risk management and planning</li>
                </ul>
              </div>
              
              <Button 
                onClick={() => setGameState('playing')}
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
              >
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const percentage = (score / challenges.length) * 100;
    const level = percentage >= 80 ? 'Master' : percentage >= 60 ? 'Expert' : 'Apprentice';
    const levelColor = percentage >= 80 ? 'text-yellow-600' : percentage >= 60 ? 'text-emerald-600' : 'text-blue-600';

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Journey
          </Button>

          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-emerald-800">Challenge Complete!</CardTitle>
              <CardDescription className="text-lg text-emerald-700">
                You've demonstrated your wealth management expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-white/50 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">Final Score</h3>
                <p className="text-4xl font-bold text-emerald-600 mb-2">{score}/{challenges.length}</p>
                <Badge className={`${levelColor} text-lg px-4 py-2`}>
                  {level} Level
                </Badge>
              </div>

              <div className="text-left bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">What You've Mastered:</h4>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>✅ Client needs assessment and goal identification</li>
                  <li>✅ Portfolio construction and asset allocation</li>
                  <li>✅ Risk management and diversification strategies</li>
                  <li>✅ Tax-efficient planning and withdrawal strategies</li>
                  <li>✅ Holistic wealth management approach</li>
                </ul>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setGameState('intro');
                    setScore(0);
                    setCurrentChallenge(0);
                  }}
                >
                  Retake Challenge
                </Button>
                <Button 
                  onClick={() => {
                    onComplete();
                    onBack();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Complete Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journey
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline">
                Challenge {currentChallenge + 1} of {challenges.length}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Score: {score}/{challenges.length}
              </div>
            </div>
            
            <CardTitle className="text-2xl text-emerald-800">{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 mb-2">Scenario:</h4>
              <p className="text-emerald-700">{challenge.scenario}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Choose the best approach:</h4>
              {challenge.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4 hover:bg-emerald-50 hover:border-emerald-200"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WealthManagementMiniGame;