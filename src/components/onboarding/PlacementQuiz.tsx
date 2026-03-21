import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import PandaLogo from '@/components/icons/PandaLogo';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: { label: string; points: number }[];
}

const questions: Question[] = [
  // Basic Financial Literacy (Q1-5)
  {
    id: 1,
    text: "What is the difference between a debit card and a credit card?",
    options: [
      { label: "They are the same thing", points: 1 },
      { label: "Debit uses your money, credit is a loan", points: 4 },
      { label: "Credit cards are only for emergencies", points: 2 },
      { label: "Debit cards have better rewards", points: 1 }
    ]
  },
  {
    id: 2,
    text: "What is a budget?",
    options: [
      { label: "A plan for how to spend and save money", points: 4 },
      { label: "The total amount of money you have", points: 1 },
      { label: "A type of bank account", points: 1 },
      { label: "Money you owe to others", points: 1 }
    ]
  },
  {
    id: 3,
    text: "What is compound interest?",
    options: [
      { label: "Interest charged on a loan", points: 1 },
      { label: "Interest on both principal and accumulated interest", points: 4 },
      { label: "A type of savings account", points: 1 },
      { label: "The interest rate set by banks", points: 2 }
    ]
  },
  {
    id: 4,
    text: "What is an emergency fund?",
    options: [
      { label: "Money for vacation", points: 1 },
      { label: "Savings for unexpected expenses", points: 4 },
      { label: "A government program", points: 1 },
      { label: "Insurance premium payments", points: 2 }
    ]
  },
  {
    id: 5,
    text: "What is the 50/30/20 budgeting rule?",
    options: [
      { label: "50% needs, 30% wants, 20% savings", points: 4 },
      { label: "A credit score calculation", points: 1 },
      { label: "Investment portfolio allocation", points: 2 },
      { label: "Tax bracket percentages", points: 1 }
    ]
  },
  // Investment Knowledge (Q6-10)
  {
    id: 6,
    text: "What is a stock?",
    options: [
      { label: "A loan to a company", points: 1 },
      { label: "Ownership share in a company", points: 4 },
      { label: "A type of bank account", points: 1 },
      { label: "Government-issued currency", points: 1 }
    ]
  },
  {
    id: 7,
    text: "What is diversification in investing?",
    options: [
      { label: "Putting all money in one stock", points: 1 },
      { label: "Spreading investments across different assets", points: 4 },
      { label: "Only investing in bonds", points: 1 },
      { label: "Investing in foreign currency", points: 2 }
    ]
  },
  {
    id: 8,
    text: "What is a bond?",
    options: [
      { label: "Ownership in a company", points: 1 },
      { label: "A loan you give to a company or government", points: 4 },
      { label: "A type of insurance", points: 1 },
      { label: "A retirement account", points: 1 }
    ]
  },
  {
    id: 9,
    text: "What does P/E ratio measure?",
    options: [
      { label: "Profit and expenses", points: 1 },
      { label: "Price relative to earnings per share", points: 4 },
      { label: "Portfolio efficiency", points: 2 },
      { label: "Prime interest rate", points: 1 }
    ]
  },
  {
    id: 10,
    text: "What is an ETF?",
    options: [
      { label: "A single company stock", points: 1 },
      { label: "Electronic transfer fund", points: 1 },
      { label: "A fund that tracks an index or sector", points: 4 },
      { label: "A type of cryptocurrency", points: 1 }
    ]
  },
  // Advanced Concepts (Q11-15)
  {
    id: 11,
    text: "What is the role of the Federal Reserve?",
    options: [
      { label: "Collect taxes", points: 1 },
      { label: "Set monetary policy and interest rates", points: 4 },
      { label: "Regulate stock markets", points: 2 },
      { label: "Print physical currency only", points: 1 }
    ]
  },
  {
    id: 12,
    text: "What is a DCF analysis used for?",
    options: [
      { label: "Tracking daily cash flow", points: 1 },
      { label: "Valuing a company based on future cash flows", points: 4 },
      { label: "Calculating credit scores", points: 1 },
      { label: "Measuring market volatility", points: 2 }
    ]
  },
  {
    id: 13,
    text: "What is the difference between investment banking and commercial banking?",
    options: [
      { label: "They are the same", points: 1 },
      { label: "Investment banks help raise capital; commercial banks take deposits", points: 4 },
      { label: "Commercial banks only serve businesses", points: 1 },
      { label: "Investment banks are only for individuals", points: 1 }
    ]
  },
  {
    id: 14,
    text: "What is a hedge fund?",
    options: [
      { label: "A type of savings account", points: 1 },
      { label: "A mutual fund for retirement", points: 1 },
      { label: "A pooled investment using various strategies", points: 4 },
      { label: "Government bonds", points: 1 }
    ]
  },
  {
    id: 15,
    text: "What career path focuses on analyzing financial statements and valuations?",
    options: [
      { label: "Marketing", points: 1 },
      { label: "Equity Research or Financial Analysis", points: 4 },
      { label: "Human Resources", points: 1 },
      { label: "Customer Service", points: 1 }
    ]
  }
];

const encouragements = [
  "Great start! Keep going! 🐼",
  "You're doing amazing! 🌟",
  "Nice work! Almost halfway there!",
  "Excellent! You're on fire! 🔥",
  "Fantastic! Keep it up!",
  "You're crushing it! 💪",
  "Awesome answer! 🎯",
  "Great thinking! 🧠",
  "You're doing great!",
  "Almost there! Keep going!",
  "Impressive! 🌟",
  "You've got this!",
  "Nearly done! 🎉",
  "Last stretch! You can do it!",
  "Final question! Make it count!"
];

interface PlacementQuizProps {
  onComplete: (track: string, score: number) => void;
  onSkip?: () => void;
}

const PlacementQuiz: React.FC<PlacementQuizProps> = ({ onComplete, onSkip }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (points: number, index: number) => {
    setSelectedAnswer(index);
    const newScore = score + points;
    
    setTimeout(() => {
      setScore(newScore);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete - determine track
        setShowResult(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 300);
  };

  const getTrack = (totalScore: number): { track: string; name: string; description: string } => {
    if (totalScore <= 25) {
      return {
        track: 'personal-finance',
        name: 'Personal Finance',
        description: "You'll start with the fundamentals of managing money, budgeting, saving, and building a strong financial foundation."
      };
    } else if (totalScore <= 45) {
      return {
        track: 'market-intelligence',
        name: 'Market Intelligence',
        description: "You have solid basics! You'll dive into investing, market analysis, and understanding how financial markets work."
      };
    } else {
      return {
        track: 'careers-in-finance',
        name: 'Careers in Finance',
        description: "Impressive knowledge! You'll explore advanced topics and career paths in the finance industry."
      };
    }
  };

  const handleComplete = () => {
    const { track } = getTrack(score);
    onComplete(track, score);
  };

  if (showResult) {
    const result = getTrack(score);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
        >
          <Card className="w-full max-w-lg text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <PandaLogo className="h-20 w-20" />
              </div>
              <CardTitle className="text-2xl">Quiz Complete! 🎉</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-muted-foreground">Your Score</p>
                <p className="text-4xl font-bold text-primary">{score} / 60</p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-6 space-y-3">
                <p className="text-lg font-semibold">Your Learning Track:</p>
                <p className="text-2xl font-bold text-primary">{result.name}</p>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
              
              <Button onClick={handleComplete} size="lg" className="w-full">
                Start My Journey! 🚀
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-2 sm:p-4">
      <Card className="w-full max-w-2xl mx-2 sm:mx-4">
        <CardHeader className="text-center px-3 sm:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <PandaLogo className="h-10 w-10 sm:h-12 sm:w-12" />
            <CardTitle className="text-lg sm:text-xl">Placement Quiz</CardTitle>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">
            This quiz helps personalize your learning path, but it's optional!
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Encouragement */}
              <p className="text-center text-xs sm:text-sm text-muted-foreground italic">
                {encouragements[currentQuestion]}
              </p>
              
              {/* Question */}
              <h3 className="text-base sm:text-lg font-semibold text-center px-1">
                {questions[currentQuestion].text}
              </h3>
              
              {/* Options */}
              <div className="grid gap-2 sm:gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full h-auto min-h-[48px] py-3 sm:py-4 px-3 sm:px-4 text-left justify-start whitespace-normal"
                      onClick={() => handleAnswer(option.points, index)}
                      disabled={selectedAnswer !== null}
                    >
                      <span className="font-medium mr-2 sm:mr-3 text-muted-foreground shrink-0">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="break-words leading-relaxed text-sm sm:text-base">
                        {option.label}
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Skip Quiz Button */}
          {onSkip && (
            <div className="pt-3 sm:pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="lg"
                className="w-full h-auto min-h-[56px] py-3 text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground flex flex-col sm:flex-row items-center justify-center gap-1"
                onClick={onSkip}
              >
                <span>Skip Quiz & Start Learning →</span>
                <span className="text-xs opacity-70">(Start with Personal Finance)</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementQuiz;
