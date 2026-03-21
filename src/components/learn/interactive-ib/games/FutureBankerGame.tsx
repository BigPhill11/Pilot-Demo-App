import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Smartphone, Lightbulb, TrendingUp } from 'lucide-react';
import GameCompletionBanner from './components/GameCompletionBanner';

interface TechnologyTrend {
  id: string;
  trend: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  timeline: string;
  adaptationStrategies: {
    strategy: string;
    description: string;
    effectiveness: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
  optimalStrategy: number;
}

const technologyTrends: TechnologyTrend[] = [
  {
    id: 'ai-automation',
    trend: 'AI-Powered Deal Analysis',
    description: 'Advanced AI systems can now analyze thousands of potential deals, market data, and due diligence documents in minutes instead of weeks',
    impact: 'high',
    timeline: '2-3 years',
    adaptationStrategies: [
      {
        strategy: 'Resist and maintain traditional methods',
        description: 'Continue using manual processes and avoid AI integration',
        effectiveness: 20,
        difficulty: 'easy'
      },
      {
        strategy: 'Embrace AI as a powerful analytical tool',
        description: 'Integrate AI for data analysis while focusing on high-level strategy and client relationships',
        effectiveness: 90,
        difficulty: 'medium'
      },
      {
        strategy: 'Become an AI specialist exclusively',
        description: 'Focus entirely on AI development and lose traditional banking skills',
        effectiveness: 40,
        difficulty: 'hard'
      }
    ],
    optimalStrategy: 1
  },
  {
    id: 'blockchain-deals',
    trend: 'Blockchain-Based Securities',
    description: 'Companies are issuing tokenized securities and using smart contracts for more efficient and transparent deal execution',
    impact: 'medium',
    timeline: '3-5 years',
    adaptationStrategies: [
      {
        strategy: 'Ignore blockchain trends completely',
        description: 'Assume blockchain is a fad and continue with traditional securities',
        effectiveness: 30,
        difficulty: 'easy'
      },
      {
        strategy: 'Develop blockchain expertise gradually',
        description: 'Learn blockchain technology while maintaining core banking skills',
        effectiveness: 85,
        difficulty: 'medium'
      },
      {
        strategy: 'Become a crypto-only specialist',
        description: 'Focus exclusively on cryptocurrency and blockchain deals',
        effectiveness: 60,
        difficulty: 'hard'
      }
    ],
    optimalStrategy: 1
  },
  {
    id: 'esg-integration',
    trend: 'ESG-Driven Decision Making',
    description: 'Environmental, Social, and Governance factors are becoming primary drivers in investment decisions and deal valuations',
    impact: 'high',
    timeline: '1-2 years',
    adaptationStrategies: [
      {
        strategy: 'Treat ESG as a minor consideration',
        description: 'Continue focusing primarily on financial metrics and treat ESG as optional',
        effectiveness: 25,
        difficulty: 'easy'
      },
      {
        strategy: 'Integrate ESG into all deal analysis',
        description: 'Develop deep ESG expertise and make it central to investment banking services',
        effectiveness: 95,
        difficulty: 'medium'
      },
      {
        strategy: 'Create separate ESG-only practice',
        description: 'Isolate ESG work from traditional investment banking',
        effectiveness: 50,
        difficulty: 'medium'
      }
    ],
    optimalStrategy: 1
  },
  {
    id: 'virtual-dealmaking',
    trend: 'Virtual Reality Deal Rooms',
    description: 'VR technology enables immersive virtual meetings, virtual data rooms, and global collaboration without travel',
    impact: 'medium',
    timeline: '4-6 years',
    adaptationStrategies: [
      {
        strategy: 'Stick to in-person meetings only',
        description: 'Maintain traditional face-to-face deal processes exclusively',
        effectiveness: 40,
        difficulty: 'easy'
      },
      {
        strategy: 'Adopt hybrid virtual-physical approach',
        description: 'Use VR for efficiency while maintaining personal relationships',
        effectiveness: 80,
        difficulty: 'medium'
      },
      {
        strategy: 'Go fully virtual immediately',
        description: 'Eliminate all in-person interactions and operate purely in VR',
        effectiveness: 35,
        difficulty: 'hard'
      }
    ],
    optimalStrategy: 1
  }
];

interface FutureBankerGameProps {
  onComplete: (score: number) => void;
}

const FutureBankerGame: React.FC<FutureBankerGameProps> = ({ onComplete }) => {
  const [currentTrendIndex, setCurrentTrendIndex] = useState(0);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [gamePhase, setGamePhase] = useState<'adapting' | 'completed'>('adapting');
  const [feedback, setFeedback] = useState<string>('');
  const [adaptationScore, setAdaptationScore] = useState(100);

  const currentTrend = technologyTrends[currentTrendIndex];
  const progress = ((currentTrendIndex + 1) / technologyTrends.length) * 100;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleSubmit = () => {
    if (selectedStrategy === null) return;

    const strategy = currentTrend.adaptationStrategies[selectedStrategy];
    const isOptimal = selectedStrategy === currentTrend.optimalStrategy;
    
    let roundScore = strategy.effectiveness;
    if (isOptimal) {
      roundScore += 20; // Bonus for optimal choice
    }

    setScore(prev => prev + roundScore);
    
    // Update adaptation score based on effectiveness
    const adaptationChange = strategy.effectiveness - 60; // 60 is baseline
    setAdaptationScore(prev => Math.max(0, Math.min(100, prev + adaptationChange / 2)));

    if (currentTrendIndex < technologyTrends.length - 1) {
      setCurrentTrendIndex(prev => prev + 1);
      setSelectedStrategy(null);
    } else {
      endGame();
    }
  };

  const endGame = () => {
    const finalScore = Math.round(score + (adaptationScore / 100) * 50);
    let feedbackText = '';

    if (adaptationScore >= 90 && finalScore >= 350) {
      feedbackText = 'Incredible! You\'re ready to lead investment banking into the future. Your adaptive mindset will drive industry innovation.';
    } else if (adaptationScore >= 75 && finalScore >= 300) {
      feedbackText = 'Excellent adaptation! You understand how to evolve with technology while maintaining core banking expertise.';
    } else if (adaptationScore >= 60) {
      feedbackText = 'Good progress! Keep studying emerging trends and developing adaptive strategies for the future.';
    } else {
      feedbackText = 'Keep learning! The future of investment banking requires embracing change while maintaining professional excellence.';
    }

    setFeedback(feedbackText);
    setGamePhase('completed');
    onComplete(finalScore);
  };

  const resetGame = () => {
    setCurrentTrendIndex(0);
    setSelectedStrategy(null);
    setScore(0);
    setGamePhase('adapting');
    setFeedback('');
    setAdaptationScore(100);
  };

  if (gamePhase === 'completed') {
    return (
      <GameCompletionBanner
        title="Future Investment Banker Ready!"
        score={score}
        totalScore={400}
        feedback={feedback}
        onPlayAgain={resetGame}
      />
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <span>Future Investment Banker</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Navigate emerging technology trends and adapt your investment banking career for the future
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Badge variant="outline">
            Trend {currentTrendIndex + 1}/{technologyTrends.length}
          </Badge>
          <Badge variant="default">Score: {score}</Badge>
          <Badge 
            variant={adaptationScore >= 70 ? "default" : adaptationScore >= 50 ? "secondary" : "destructive"}
          >
            Adaptation: {adaptationScore}%
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Card className="border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-cyan-800 flex items-center">
                <Smartphone className="h-6 w-6 mr-2" />
                {currentTrend.trend}
              </h3>
              <div className="flex space-x-2">
                <Badge className={getImpactColor(currentTrend.impact)}>
                  {currentTrend.impact} impact
                </Badge>
                <Badge variant="outline">
                  {currentTrend.timeline}
                </Badge>
              </div>
            </div>
            <p className="text-cyan-700 text-lg leading-relaxed">
              {currentTrend.description}
            </p>
          </CardContent>
        </Card>

        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            How do you adapt to this technological shift?
          </h4>
          <div className="space-y-4">
            {currentTrend.adaptationStrategies.map((strategy, index) => {
              const isSelected = selectedStrategy === index;
              
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:ring-1 hover:ring-primary/50 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedStrategy(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <h5 className="font-semibold">{strategy.strategy}</h5>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {strategy.effectiveness}% effective
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(strategy.difficulty)}`}>
                          {strategy.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground ml-8">
                      {strategy.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button 
            onClick={handleSubmit}
            disabled={selectedStrategy === null}
            className="animate-scale-in"
            size="lg"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Implement Strategy
          </Button>
          <Button variant="outline" onClick={resetGame}>
            Reset Future
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureBankerGame;