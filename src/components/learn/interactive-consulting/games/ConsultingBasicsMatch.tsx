
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Trophy, Shuffle } from 'lucide-react';

interface ConsultingBasicsMatchProps {
  onComplete: (score: number) => void;
}

const ConsultingBasicsMatch: React.FC<ConsultingBasicsMatchProps> = ({ onComplete }) => {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedDefinition, setSelectedDefinition] = useState<string>('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const terms = [
    { term: 'Strategy', definition: 'Long-term plan to achieve business objectives' },
    { term: 'McKinsey 7S', definition: 'Framework analyzing Strategy, Structure, Systems, Skills, Style, Staff, Shared Values' },
    { term: 'Value Proposition', definition: 'Unique benefit offered to customers' },
    { term: 'Stakeholder', definition: 'Anyone affected by or influencing business decisions' },
    { term: 'Deliverable', definition: 'Tangible output or result provided to client' },
    { term: 'Engagement', definition: 'Consulting project or assignment with a client' }
  ];

  const [shuffledTerms, setShuffledTerms] = useState(terms);
  const [shuffledDefinitions, setShuffledDefinitions] = useState(terms);

  useEffect(() => {
    shuffleItems();
  }, []);

  const shuffleItems = () => {
    setShuffledTerms([...terms].sort(() => Math.random() - 0.5));
    setShuffledDefinitions([...terms].sort(() => Math.random() - 0.5));
    setMatches({});
    setSelectedTerm('');
    setSelectedDefinition('');
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
    setFeedback('');
  };

  const handleTermClick = (term: string) => {
    if (matches[term]) return; // Already matched
    setSelectedTerm(selectedTerm === term ? '' : term);
    setFeedback('');
  };

  const handleDefinitionClick = (definition: string) => {
    if (!selectedTerm) {
      setFeedback('Please select a term first!');
      return;
    }
    
    handleMatch(selectedTerm, definition);
    setSelectedTerm('');
  };

  const handleMatch = (term: string, definition: string) => {
    const isCorrect = terms.find(t => t.term === term)?.definition === definition;
    const newMatches = { ...matches, [term]: definition };
    setMatches(newMatches);
    setAttempts(attempts + 1);

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setFeedback(`✅ Correct! ${term} matched properly.`);
      
      if (newScore === terms.length) {
        setGameComplete(true);
        const finalScore = Math.max(0, 100 - (attempts - terms.length) * 5);
        setTimeout(() => onComplete(finalScore), 1000);
      }
    } else {
      setFeedback(`❌ Incorrect. Try again with ${term}.`);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Consulting Basics Match
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge variant="outline">Score: {score}/{terms.length}</Badge>
            <Badge variant="outline">Attempts: {attempts}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Match each consulting term with its correct definition.
          </p>

          {feedback && (
            <div className={`p-3 rounded-lg ${feedback.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {feedback}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Terms</h3>
              <div className="space-y-2">
                {shuffledTerms.map((item) => (
                  <Button
                    key={item.term}
                    variant={matches[item.term] ? "default" : selectedTerm === item.term ? "secondary" : "outline"}
                    className="w-full justify-start"
                    disabled={gameComplete}
                    onClick={() => handleTermClick(item.term)}
                  >
                    <span className="flex items-center gap-2">
                      {matches[item.term] && 
                        terms.find(t => t.term === item.term)?.definition === matches[item.term] ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> : 
                        matches[item.term] ? <XCircle className="h-4 w-4 text-red-500" /> : null
                      }
                      {item.term}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Definitions</h3>
              <div className="space-y-2">
                {shuffledDefinitions.map((item) => (
                  <Button
                    key={item.definition}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto py-3 px-3"
                    disabled={gameComplete}
                    onClick={() => handleDefinitionClick(item.definition)}
                  >
                    {item.definition}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {gameComplete && (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">Congratulations!</h3>
              <p className="text-green-700">You've mastered consulting basics terminology!</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={shuffleItems} variant="outline" className="flex items-center gap-2">
              <Shuffle className="h-4 w-4" />
              Shuffle & Restart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultingBasicsMatch;
