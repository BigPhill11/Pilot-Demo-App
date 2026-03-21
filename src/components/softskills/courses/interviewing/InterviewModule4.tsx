
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface InterviewModule4Props {
  onComplete: () => void;
  onBack: () => void;
}

const InterviewModule4: React.FC<InterviewModule4Props> = ({ onComplete, onBack }) => {
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
    toast.success("Module 4 completed! 🎉");
    onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-blue-500">Module 4 of 6</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <span>Interview Day Etiquette & Execution</span>
          </CardTitle>
          <Progress value={100} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-lg">
              Master the art of professional presence and interview day execution. First impressions matter!
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400 my-6">
              <h3 className="text-purple-800 font-semibold mb-2">🎯 Professional Etiquette Essentials:</h3>
              <ul className="text-purple-700 space-y-1">
                <li>• Dress code: Always formal unless told otherwise</li>
                <li>• Arrive 10-15 minutes early (never late!)</li>
                <li>• Master virtual interview etiquette</li>
                <li>• Ask thoughtful questions at the end</li>
                <li>• Show genuine enthusiasm and gratitude</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-green-50 border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Great Questions to Ask:</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• "What's the most rewarding part of working here?"</li>
                <li>• "How is feedback typically delivered on your team?"</li>
                <li>• "What traits do successful analysts share?"</li>
                <li>• "How has the team adapted to market changes?"</li>
              </ul>
            </Card>
            <Card className="p-4 bg-red-50 border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">❌ Avoid These Mistakes:</h4>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• Asking about salary/benefits first</li>
                <li>• Being late or unprepared</li>
                <li>• Poor virtual meeting setup</li>
                <li>• Not having questions prepared</li>
              </ul>
            </Card>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">🎯 Etiquette Knowledge Check</h4>
            
            {renderQuizQuestion(
              "What's the best time to arrive for an in-person interview?",
              [
                "Exactly on time",
                "5 minutes early",
                "10-15 minutes early",
                "20+ minutes early"
              ],
              2,
              "etiquette1"
            )}

            {renderQuizQuestion(
              "For virtual interviews, what's most important?",
              [
                "Having an interesting background",
                "Good lighting, eye contact, and minimal distractions",
                "Using the most expensive equipment",
                "Having family members nearby for support"
              ],
              1,
              "etiquette2"
            )}
          </div>

          <Button 
            onClick={handleComplete} 
            className="w-full"
            disabled={Object.keys(quizAnswers).length < 2}
          >
            Complete Module 4! 🎉
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewModule4;
