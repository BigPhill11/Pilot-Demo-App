
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface ClientProblemIdentifierProps {
  onComplete: (score: number) => void;
}

const ClientProblemIdentifier: React.FC<ClientProblemIdentifierProps> = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: 'Tech Startup Revenue Decline',
      description: 'A tech startup has seen a 30% decline in revenue over the last 6 months. The CEO mentions they recently launched new features, hired more sales staff, and increased marketing spend.',
      options: [
        'Customer acquisition cost is too high',
        'Product-market fit issues with new features',
        'Sales team needs more training',
        'Market saturation'
      ],
      correct: 1,
      explanation: 'Despite increased marketing and sales efforts, revenue declined after new features launched, suggesting the new features may not align with customer needs - a classic product-market fit issue.'
    },
    {
      id: 2,
      title: 'Manufacturing Company Efficiency',
      description: 'A manufacturing company has high operational costs and long production cycles. Workers report frequent equipment breakdowns and unclear processes.',
      options: [
        'Reduce workforce to cut costs',
        'Implement preventive maintenance and process standardization',
        'Outsource manufacturing entirely',
        'Increase product prices'
      ],
      correct: 1,
      explanation: 'The root causes are equipment breakdowns and unclear processes. Preventive maintenance and process standardization directly address these operational inefficiencies.'
    },
    {
      id: 3,
      title: 'Retail Chain Customer Retention',
      description: 'A retail chain has good foot traffic but poor customer retention. Customers visit once but rarely return. Staff turnover is also high.',
      options: [
        'Increase advertising to attract more new customers',
        'Focus on customer experience and staff training',
        'Lower prices across all products',
        'Open more store locations'
      ],
      correct: 1,
      explanation: 'High staff turnover often correlates with poor customer service. Improving customer experience through better-trained, more stable staff addresses both retention and the underlying service quality issues.'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
    setShowFeedback(true);
    
    if (answerIndex === scenarios[currentScenario].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
      const finalScore = Math.round((score / scenarios.length) * 100);
      setTimeout(() => onComplete(finalScore), 1000);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setGameComplete(false);
  };

  const scenario = scenarios[currentScenario];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Client Problem Identifier
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge variant="outline">Scenario {currentScenario + 1}/{scenarios.length}</Badge>
            <Badge variant="outline">Score: {score}/{scenarios.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!gameComplete ? (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{scenario.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">What is the core problem to address?</h4>
                {scenario.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index.toString() ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                  >
                    <span className="flex items-center gap-3">
                      {showFeedback && (
                        index === scenario.correct ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : selectedAnswer === index.toString() ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : null
                      )}
                      {option}
                    </span>
                  </Button>
                ))}
              </div>

              {showFeedback && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${selectedAnswer === scenario.correct.toString() ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 mt-1 text-blue-500" />
                      <div>
                        <p className="font-medium mb-2">
                          {selectedAnswer === scenario.correct.toString() ? 'Correct!' : 'Not quite right.'}
                        </p>
                        <p className="text-sm">{scenario.explanation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleNext} className="w-full">
                    {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Game'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Game Complete!</h3>
              <p className="text-blue-700 mb-4">
                You scored {score}/{scenarios.length} ({Math.round((score / scenarios.length) * 100)}%)
              </p>
              <Button onClick={resetGame} variant="outline">Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientProblemIdentifier;
