import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Shield, TrendingDown, Brain } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface Crisis {
  id: string;
  title: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  solutions: Solution[];
  correctSolutionId: string;
}

interface Solution {
  id: string;
  description: string;
  outcome: string;
  timeToResolve: number;
  stakeholderImpact: 'positive' | 'neutral' | 'negative';
}

const crises: Crisis[] = [
  {
    id: 'regulatory-delay',
    title: 'Regulatory Approval Delayed',
    description: 'The SEC has requested additional documentation, delaying the deal closing by 2 weeks. Client is getting nervous.',
    urgency: 'high',
    impact: 'medium',
    correctSolutionId: 'proactive-communication',
    solutions: [
      {
        id: 'wait-and-see',
        description: 'Wait for the SEC to respond and hope for the best',
        outcome: 'Client loses confidence, deal falls apart',
        timeToResolve: 14,
        stakeholderImpact: 'negative'
      },
      {
        id: 'proactive-communication',
        description: 'Immediately call client, prepare comprehensive response plan, and provide daily updates',
        outcome: 'Client stays confident, deal completes successfully',
        timeToResolve: 7,
        stakeholderImpact: 'positive'
      },
      {
        id: 'blame-lawyers',
        description: 'Tell client it\'s the lawyers\' fault and not your responsibility',
        outcome: 'Client fires the bank, deal dies',
        timeToResolve: 1,
        stakeholderImpact: 'negative'
      }
    ]
  },
  {
    id: 'financing-gap',
    title: 'Financing Falls Through',
    description: 'Lead lender pulls out 48 hours before closing due to internal credit issues. $500M deal at risk.',
    urgency: 'high',
    impact: 'high',
    correctSolutionId: 'emergency-syndicate',
    solutions: [
      {
        id: 'cancel-deal',
        description: 'Recommend canceling the deal to avoid embarrassment',
        outcome: 'Massive reputational damage, lose client forever',
        timeToResolve: 2,
        stakeholderImpact: 'negative'
      },
      {
        id: 'emergency-syndicate',
        description: 'Activate emergency lender network, work through weekend to restructure financing',
        outcome: 'Deal saves, become legendary dealmaker',
        timeToResolve: 3,
        stakeholderImpact: 'positive'
      },
      {
        id: 'delay-closing',
        description: 'Ask for 30-day extension to find new financing',
        outcome: 'Seller gets cold feet, walks away',
        timeToResolve: 30,
        stakeholderImpact: 'negative'
      }
    ]
  },
  {
    id: 'due-diligence-surprise',
    title: 'Due Diligence Red Flag',
    description: 'Buyer discovers target company has undisclosed environmental liability worth $50M. Deal value is $200M.',
    urgency: 'medium',
    impact: 'high',
    correctSolutionId: 'renegotiate-terms',
    solutions: [
      {
        id: 'hide-information',
        description: 'Advise client to downplay the issue and push through',
        outcome: 'SEC investigation, career over',
        timeToResolve: 1,
        stakeholderImpact: 'negative'
      },
      {
        id: 'renegotiate-terms',
        description: 'Facilitate honest discussion, renegotiate price and warranties',
        outcome: 'Deal completes at fair price, all parties satisfied',
        timeToResolve: 10,
        stakeholderImpact: 'positive'
      },
      {
        id: 'kill-deal',
        description: 'Recommend terminating the transaction immediately',
        outcome: 'Overreaction kills viable deal, client unhappy',
        timeToResolve: 2,
        stakeholderImpact: 'negative'
      }
    ]
  }
];

interface CrisisManagerGameProps {
  onComplete: (score: number) => void;
}

const CrisisManagerGame: React.FC<CrisisManagerGameProps> = ({ onComplete }) => {
  const [currentCrisisIndex, setCurrentCrisisIndex] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'crisis' | 'completed'>('crisis');
  const [feedback, setFeedback] = useState<string>('');
  const [reputationScore, setReputationScore] = useState(100);

  const currentCrisis = crises[currentCrisisIndex];

  useEffect(() => {
    if (gamePhase === 'crisis' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Auto-submit worst solution if time runs out
      handleSolutionSubmit(currentCrisis.solutions[0].id);
    }
  }, [timeRemaining, gamePhase]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';  
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleSolutionSubmit = (solutionId: string = selectedSolution) => {
    const solution = currentCrisis.solutions.find(s => s.id === solutionId);
    if (!solution) return;

    const isCorrect = solutionId === currentCrisis.correctSolutionId;
    let roundScore = 0;

    if (isCorrect) {
      roundScore = 100;
      setReputationScore(prev => Math.min(100, prev + 10));
    } else {
      roundScore = 25;
      setReputationScore(prev => Math.max(0, prev - 20));
    }

    // Time bonus
    const timeBonus = Math.round((timeRemaining / 60) * 25);
    roundScore += timeBonus;

    setScore(prev => prev + roundScore);

    if (currentCrisisIndex < crises.length - 1) {
      setCurrentCrisisIndex(prev => prev + 1);
      setSelectedSolution('');
      setTimeRemaining(60);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const finalScore = Math.round(score + (reputationScore / 100) * 50);
    let feedbackText = '';

    if (reputationScore >= 90 && finalScore >= 300) {
      feedbackText = 'Legendary! You\'re the crisis manager every bank wants on their team.';
    } else if (reputationScore >= 70 && finalScore >= 250) {
      feedbackText = 'Excellent crisis management! You kept your cool under pressure.';
    } else if (reputationScore >= 50) {
      feedbackText = 'Good handling of most crises. Keep practicing your decision-making skills.';
    } else {
      feedbackText = 'Crisis management is tough! Remember: communication and quick thinking are key.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(finalScore);
  };

  const resetGame = () => {
    setCurrentCrisisIndex(0);
    setSelectedSolution('');
    setTimeRemaining(60);
    setScore(0);
    setGamePhase('crisis');
    setFeedback('');
    setReputationScore(100);
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Crisis Management Complete!"
        score={score}
        totalScore={400}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span>Deal Crisis Manager</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Navigate unexpected challenges that threaten to derail your transaction
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline" className="animate-pulse">
            <Clock className="h-3 w-3 mr-1" />
            {timeRemaining}s
          </Badge>
          <Badge variant="default">Crisis {currentCrisisIndex + 1}/{crises.length}</Badge>
          <Badge variant="secondary">Score: {score}</Badge>
          <Badge 
            variant={reputationScore >= 70 ? "default" : reputationScore >= 50 ? "secondary" : "destructive"}
            className="flex items-center"
          >
            <TrendingDown className="h-3 w-3 mr-1" />
            Rep: {reputationScore}%
          </Badge>
        </div>
        <Progress value={(timeRemaining / 60) * 100} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-red-800 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2" />
                {currentCrisis.title}
              </h3>
              <div className="flex space-x-2">
                <Badge className={getUrgencyColor(currentCrisis.urgency)}>
                  {currentCrisis.urgency} urgency
                </Badge>
                <Badge className={getImpactColor(currentCrisis.impact)}>
                  {currentCrisis.impact} impact
                </Badge>
              </div>
            </div>
            <p className="text-red-700 text-lg leading-relaxed">
              {currentCrisis.description}
            </p>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            How do you handle this crisis?
          </h4>
          <div className="space-y-4">
            {currentCrisis.solutions.map((solution, index) => {
              const isSelected = selectedSolution === solution.id;
              
              return (
                <Card 
                  key={solution.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSolution(solution.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <h5 className="font-semibold">Solution {index + 1}</h5>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {solution.timeToResolve} days
                      </Badge>
                    </div>
                    <p className="text-sm mb-2 ml-8">{solution.description}</p>
                    <div className="ml-8 flex items-center space-x-2">
                      <Badge 
                        variant={solution.stakeholderImpact === 'positive' ? 'default' : 
                                solution.stakeholderImpact === 'neutral' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {solution.stakeholderImpact} impact
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => handleSolutionSubmit()}
            disabled={!selectedSolution || timeRemaining === 0}
            className="animate-scale-in"
            size="lg"
          >
            <Shield className="h-4 w-4 mr-2" />
            Execute Solution
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Reset Crisis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrisisManagerGame;