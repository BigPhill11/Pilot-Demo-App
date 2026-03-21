
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewModule3Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule3: React.FC<InterviewModule3Props> = ({ onComplete, onBack }) => {
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: number}>({});

  const renderQuizQuestion = (question: string, options: string[], correctAnswer: number, questionKey: string) => {
    const userAnswer = quizAnswers[questionKey];
    const hasAnswered = userAnswer !== undefined;
    
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3 break-words">{question}</h4>
          <div className="space-y-2">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={hasAnswered ? 
                  (index === correctAnswer ? "default" : 
                   index === userAnswer ? "destructive" : "outline") : 
                  "outline"}
                className="w-full justify-start text-left h-auto p-3 whitespace-normal break-words"
                onClick={() => !hasAnswered && setQuizAnswers({...quizAnswers, [questionKey]: index})}
                disabled={hasAnswered}
              >
                <span className="mr-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                <span className="flex-1">{option}</span>
              </Button>
            ))}
          </div>
          {hasAnswered && (
            <div className={`mt-3 p-3 rounded break-words ${userAnswer === correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {userAnswer === correctAnswer ? '✅ Correct!' : '❌ Incorrect. '}
              {userAnswer !== correctAnswer && `The correct answer is ${String.fromCharCode(65 + correctAnswer)}.`}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const handleComplete = () => {
    toast.success("Module 3 completed! 🎉");
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-blue-500">Module 3 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-green-600" />
            <span>Technical Excellence</span>
          </CardTitle>
          <Progress value={100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 mb-6">
              <h3 className="text-green-800 font-semibold mb-2">🎯 Module Objectives:</h3>
              <p className="text-green-700 mb-2">
                Master the technical finance knowledge required for interviews, from financial statements 
                to valuation methods and market awareness.
              </p>
              <p className="text-green-700 text-sm">
                <strong>Why this matters:</strong> Technical competency is table stakes in finance interviews. 
                Even if you nail the behavioral questions, weak technical answers will eliminate you immediately. 
                This module ensures you can confidently discuss core finance concepts and current market conditions.
              </p>
            </div>

            <p className="text-lg">
              Master technical finance questions with confidence! This module covers the essential technical 
              knowledge you need for finance interviews.
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 my-6">
              <h3 className="text-green-800 font-semibold mb-2">🎯 Key Technical Areas:</h3>
              <ul className="text-green-700 space-y-1">
                <li>• Three financial statements and how they connect</li>
                <li>• Valuation methods (DCF, Comps, Precedents)</li>
                <li>• "Walk me through a DCF" question</li>
                <li>• Market awareness and current events</li>
                <li>• Impact of accounting changes on statements</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">🧠 Technical Knowledge Check</h4>
            
            {renderQuizQuestion(
              "What are the three main financial statements?",
              [
                "Balance Sheet, Income Statement, Cash Flow Statement",
                "P&L, Balance Sheet, Budget",
                "Income Statement, Budget, Cash Flow",
                "Balance Sheet, P&L, Equity Statement"
              ],
              0,
              "tech1"
            )}

            {renderQuizQuestion(
              "In a DCF model, what does the terminal value represent?",
              [
                "The company's current market value",
                "The value of cash flows beyond the projection period",
                "The value of the company's assets",
                "The present value of Year 1 cash flow"
              ],
              1,
              "tech2"
            )}

            {renderQuizQuestion(
              "If depreciation increases by $10, what happens to the cash flow statement?",
              [
                "Cash decreases by $10",
                "Cash increases by $10 (assuming 0% tax rate)",
                "Cash increases by $10 × (1 - tax rate)",
                "No change to cash"
              ],
              2,
              "tech3"
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Technical Interview Tips:</h4>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Know current Fed Funds Rate, 10-year Treasury, and S&P 500 level</li>
              <li>• Practice "Walk me through a DCF" until it's second nature</li>
              <li>• Understand how interest rate changes affect different sectors</li>
              <li>• Be ready to explain recent market movements</li>
            </ul>
          </div>

          <Button 
            onClick={handleComplete} 
            className="w-full"
            disabled={Object.keys(quizAnswers).length < 3}
          >
            Complete Module 3! 🎉
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewModule3;
