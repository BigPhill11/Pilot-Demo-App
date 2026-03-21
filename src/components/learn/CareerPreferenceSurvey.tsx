import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export interface SurveyQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    scores: {
      [careerId: string]: number;
    };
  }[];
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'work-style',
    question: 'How do you like to work?',
    options: [
      {
        text: '🚀 Fast-paced action! I love quick decisions and lots of variety',
        scores: {
          'investment-banking': 3,
          'sales-trading': 3,
          'hedge-funds': 2,
          'venture-capital': 2
        }
      },
      {
        text: '🎯 Strategic thinking - I prefer planning long-term moves',
        scores: {
          'private-equity': 3,
          'management-consulting': 3,
          'corporate-finance': 2,
          'venture-capital': 2
        }
      },
      {
        text: '🤝 Building relationships - I enjoy helping people one-on-one',
        scores: {
          'wealth-management': 3,
          'commercial-banking': 2,
          'asset-management': 2
        }
      },
      {
        text: '📊 Analyzing data and finding patterns',
        scores: {
          'hedge-funds': 3,
          'asset-management': 3,
          'corporate-finance': 2
        }
      }
    ]
  },
  {
    id: 'problem-type',
    question: 'What kinds of challenges excite you most?',
    options: [
      {
        text: '💼 Helping companies make big business decisions',
        scores: {
          'investment-banking': 3,
          'management-consulting': 3,
          'corporate-finance': 2
        }
      },
      {
        text: '🌱 Finding and growing the next big thing',
        scores: {
          'venture-capital': 3,
          'private-equity': 2,
          'asset-management': 1
        }
      },
      {
        text: '📈 Making smart investments and beating the market',
        scores: {
          'hedge-funds': 3,
          'asset-management': 3,
          'private-equity': 2
        }
      },
      {
        text: '🛡️ Protecting and growing people\'s life savings',
        scores: {
          'wealth-management': 3,
          'asset-management': 2,
          'commercial-banking': 2
        }
      }
    ]
  },
  {
    id: 'time-horizon',
    question: 'How patient are you when it comes to seeing results?',
    options: [
      {
        text: '⚡ I like seeing results right away!',
        scores: {
          'sales-trading': 3,
          'hedge-funds': 2,
          'investment-banking': 1
        }
      },
      {
        text: '📅 A few months to a year is perfect',
        scores: {
          'investment-banking': 2,
          'management-consulting': 2,
          'asset-management': 2
        }
      },
      {
        text: '🌳 I can wait years for something great',
        scores: {
          'private-equity': 3,
          'venture-capital': 3,
          'wealth-management': 2
        }
      },
      {
        text: '🔄 Mix of short and long-term is ideal',
        scores: {
          'corporate-finance': 2,
          'commercial-banking': 2,
          'asset-management': 2
        }
      }
    ]
  },
  {
    id: 'interaction-style',
    question: 'Who would you rather work with?',
    options: [
      {
        text: '👔 Big company executives and business leaders',
        scores: {
          'investment-banking': 3,
          'management-consulting': 3,
          'commercial-banking': 2
        }
      },
      {
        text: '🚀 Entrepreneurs and startup founders',
        scores: {
          'venture-capital': 3,
          'private-equity': 1
        }
      },
      {
        text: '👨‍👩‍👧‍👦 Families planning their financial future',
        scores: {
          'wealth-management': 3,
          'asset-management': 1
        }
      },
      {
        text: '🏢 Company teams fixing business problems',
        scores: {
          'management-consulting': 3,
          'corporate-finance': 2,
          'private-equity': 2
        }
      }
    ]
  },
  {
    id: 'risk-appetite',
    question: 'How do you feel about taking risks?',
    options: [
      {
        text: '🎲 Love it! Big risks, big rewards',
        scores: {
          'venture-capital': 3,
          'hedge-funds': 2,
          'private-equity': 2
        }
      },
      {
        text: '⚖️ Calculated risks with good research',
        scores: {
          'private-equity': 3,
          'investment-banking': 2,
          'asset-management': 2
        }
      },
      {
        text: '🛡️ Prefer safer, steady approaches',
        scores: {
          'wealth-management': 3,
          'commercial-banking': 3,
          'asset-management': 2
        }
      },
      {
        text: '📊 Risk-aware but opportunity-focused',
        scores: {
          'corporate-finance': 2,
          'management-consulting': 2,
          'sales-trading': 2
        }
      }
    ]
  }
];

interface CareerPreferenceSurveyProps {
  onComplete: (results: { careerId: string; score: number }[]) => void;
  onSkip: () => void;
}

const CareerPreferenceSurvey: React.FC<CareerPreferenceSurveyProps> = ({ onComplete, onSkip }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = {
      ...answers,
      [surveyQuestions[currentQuestion].id]: selectedOption
    };
    setAnswers(newAnswers);

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate final scores
      const scores: { [careerId: string]: number } = {};
      
      Object.entries(newAnswers).forEach(([questionId, optionIndex]) => {
        const question = surveyQuestions.find(q => q.id === questionId);
        if (question) {
          const option = question.options[optionIndex];
          Object.entries(option.scores).forEach(([careerId, score]) => {
            scores[careerId] = (scores[careerId] || 0) + score;
          });
        }
      });

      const sortedResults = Object.entries(scores)
        .map(([careerId, score]) => ({ careerId, score }))
        .sort((a, b) => b.score - a.score);

      onComplete(sortedResults);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[surveyQuestions[currentQuestion - 1].id] ?? null);
    }
  };

  const question = surveyQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-2 border-primary/20 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>
              Find Your Perfect Finance Career! ✨
            </CardTitle>
          </div>
          <CardDescription className={`${isMobile ? 'text-sm' : 'text-base'}`}>
            Let's discover which finance career matches your personality and interests!
          </CardDescription>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {surveyQuestions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className={`font-semibold mb-6 ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {question.question}
            </h3>

            <RadioGroup value={selectedOption?.toString()} onValueChange={(value) => handleAnswer(parseInt(value))}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 hover:bg-accent/30 ${
                      selectedOption === index
                        ? 'border-primary bg-accent'
                        : 'border-border'
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`cursor-pointer flex-1 ${isMobile ? 'text-sm' : 'text-base'}`}
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={currentQuestion === 0 ? onSkip : handleBack}
              className={isMobile ? 'text-sm' : ''}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentQuestion === 0 ? 'Skip Survey' : 'Back'}
            </Button>

            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={isMobile ? 'text-sm' : ''}
            >
              {currentQuestion === surveyQuestions.length - 1 ? 'See My Results!' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPreferenceSurvey;
