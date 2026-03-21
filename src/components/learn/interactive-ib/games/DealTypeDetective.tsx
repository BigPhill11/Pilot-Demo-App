
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import HighlightableTerm from '@/components/HighlightableTerm';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';

interface DealTypeDetectiveProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

interface Scenario {
  id: string;
  company: string;
  situation: string;
  correctType: 'IPO' | 'M&A' | 'Financing';
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: '1',
    company: 'TechStart Inc.',
    situation: 'A 5-year-old software company wants to sell shares to the public for the first time to raise money for expansion.',
    correctType: 'IPO',
    explanation: 'This is an IPO because the company is going public for the first time by selling shares to public investors.'
  },
  {
    id: '2',
    company: 'MegaCorp & SmallCo',
    situation: 'A large retail chain wants to buy a smaller competitor to expand into new markets.',
    correctType: 'M&A',
    explanation: 'This is M&A (Mergers & Acquisitions) because one company is acquiring another company.'
  },
  {
    id: '3',
    company: 'GrowthCorp',
    situation: 'An established public company needs to raise additional capital by issuing new bonds to fund a major project.',
    correctType: 'Financing',
    explanation: 'This is Financing because the company is raising money through debt (bonds) rather than going public or acquiring another company.'
  },
  {
    id: '4',
    company: 'AutoGiant & ElectricStart',
    situation: 'Two car manufacturers of similar size decide to combine into one company to better compete with Tesla.',
    correctType: 'M&A',
    explanation: 'This is M&A because two companies are merging together to form one combined entity.'
  },
  {
    id: '5',
    company: 'PrivateApp Co.',
    situation: 'A successful app company that has been private for 8 years wants to let employees sell their shares and raise money from public investors.',
    correctType: 'IPO',
    explanation: 'This is an IPO because the private company is going public to allow public investment and liquidity for employees.'
  }
];

const DealTypeDetective: React.FC<DealTypeDetectiveProps> = ({ onComplete, isCompleted }) => {
  const { profile } = useAuth();
  const { updateActivityComplete } = useProgressTracking();
  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);
  
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const dealTypes = ['IPO', 'M&A', 'Financing'];

  const renderTextWithTermHighlights = (text: string) => {
    let processedText = text;
    
    // Find all terms that exist in our ibTerms and wrap them with highlights
    Object.keys(ibTerms).forEach(termKey => {
      const term = ibTerms[termKey];
      const termDisplayName = term.term;
      
      // Create regex to find the term (case insensitive, whole word)
      const regex = new RegExp(`\\b${termDisplayName}\\b`, 'gi');
      
      processedText = processedText.replace(regex, (match) => {
        return `<TERM_HIGHLIGHT>${match}</TERM_HIGHLIGHT>`;
      });
    });

    // Split the text and render with highlights
    const parts = processedText.split(/(<TERM_HIGHLIGHT>.*?<\/TERM_HIGHLIGHT>)/);
    
    return parts.map((part, index) => {
      const termMatch = part.match(/<TERM_HIGHLIGHT>(.*?)<\/TERM_HIGHLIGHT>/);
      if (termMatch) {
        const termText = termMatch[1];
        // Find matching term data
        const termData = Object.values(ibTerms).find(term => 
          term.term.toLowerCase() === termText.toLowerCase()
        );
        
        if (termData) {
          return (
            <HighlightableTerm
              key={index}
              term={termData.term}
              definition={termData.definition}
              analogy={termData.analogy}
            >
              <span className="font-semibold text-primary cursor-help underline decoration-dotted">
                {termText}
              </span>
            </HighlightableTerm>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    const isCorrect = type === scenarios[currentScenario].correctType;
    
    if (isCorrect) {
      setFeedback('Correct! 🎉');
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setFeedback(`Not quite. The correct answer is ${scenarios[currentScenario].correctType}`);
    }
    
    setShowExplanation(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedType(null);
      setFeedback(null);
      setShowExplanation(false);
    } else {
      setGameCompleted(true);
      const finalScore = Math.round((correctAnswers / scenarios.length) * 100);
      const bonusPoints = finalScore >= 80 ? 25 : 15;
      updateActivityComplete('deal-type-detective', bonusPoints);
      onComplete('deal-type-detective');
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedType(null);
    setScore(0);
    setFeedback(null);
    setShowExplanation(false);
    setGameCompleted(false);
    setCorrectAnswers(0);
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Deal Type Detective</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-normal">Score: {score}</span>
            <Badge variant="outline">
              {currentScenario + 1} / {scenarios.length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {gameCompleted ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-2">🎉 Game Complete!</h3>
              <p className="text-green-700 mb-2">
                You got {correctAnswers} out of {scenarios.length} correct!
              </p>
              <p className="text-green-600">
                Final Score: {Math.round((correctAnswers / scenarios.length) * 100)}%
              </p>
            </div>
            <Button onClick={resetGame} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">{currentScenarioData.company}</h3>
              <p className="text-blue-700">
                {renderTextWithTermHighlights(currentScenarioData.situation)}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">What type of investment banking deal is this?</h4>
              <div className="grid grid-cols-1 gap-3">
                {dealTypes.map((type) => (
                  <Button
                    key={type}
                    onClick={() => handleTypeSelection(type)}
                    disabled={showExplanation}
                    variant={selectedType === type ? "default" : "outline"}
                    className={`p-4 h-auto text-left justify-start text-wrap break-words whitespace-normal ${
                      showExplanation && selectedType === type
                        ? type === currentScenarioData.correctType
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {showExplanation && selectedType === type && (
                        type === currentScenarioData.correctType ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )
                      )}
                      <span className="font-medium">{type}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded-lg border-l-4 ${
                feedback.includes('Correct') 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-red-50 border-red-400'
              }`}>
                <p className={`font-medium ${
                  feedback.includes('Correct') ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedback}
                </p>
              </div>
            )}

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Explanation:</h4>
                <p className="text-blue-700">
                  {renderTextWithTermHighlights(currentScenarioData.explanation)}
                </p>
              </div>
            )}

            {showExplanation && (
              <Button onClick={nextScenario} className="w-full">
                {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Game'}
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DealTypeDetective;
