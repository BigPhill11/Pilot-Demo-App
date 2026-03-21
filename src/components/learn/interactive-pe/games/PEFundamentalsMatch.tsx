import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { privateEquityTerms } from '@/data/private-equity-terms';
import GameCompletionBanner from '../../interactive-ib/games/components/GameCompletionBanner';
import GameHeader from '../../interactive-ib/games/components/GameHeader';

interface PEFundamentalsMatchProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

interface MatchPair {
  term: string;
  definition: string;
  id: string;
}

const PEFundamentalsMatch: React.FC<PEFundamentalsMatchProps> = ({ onComplete, isCompleted }) => {
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const beginnerTerms = Object.entries(privateEquityTerms)
      .filter(([_, term]) => term.difficulty === 'beginner')
      .slice(0, 6)
      .map(([key, term]) => ({
        term: term.term,
        definition: term.definition,
        id: key
      }));
    
    setPairs(beginnerTerms);
    setMatchedPairs(new Set());
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setAttempts(0);
    setGameCompleted(false);
    setScore(0);
  };

  const handleTermClick = (termId: string) => {
    if (matchedPairs.has(termId)) return;
    
    if (selectedTerm === termId) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(termId);
      if (selectedDefinition) {
        checkMatch(termId, selectedDefinition);
      }
    }
  };

  const handleDefinitionClick = (termId: string) => {
    if (matchedPairs.has(termId)) return;
    
    if (selectedDefinition === termId) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(termId);
      if (selectedTerm) {
        checkMatch(selectedTerm, termId);
      }
    }
  };

  const checkMatch = (termId: string, definitionId: string) => {
    setAttempts(prev => prev + 1);
    
    if (termId === definitionId) {
      // Correct match
      const newMatchedPairs = new Set(matchedPairs);
      newMatchedPairs.add(termId);
      setMatchedPairs(newMatchedPairs);
      setScore(prev => prev + 10);
      
      if (newMatchedPairs.size === pairs.length) {
        setGameCompleted(true);
        onComplete('pe-basics-matching');
      }
    }
    
    // Reset selections
    setSelectedTerm(null);
    setSelectedDefinition(null);
  };

  const resetGame = () => {
    initializeGame();
  };

  if (gameCompleted) {
    return (
      <GameCompletionBanner score={score} />
    );
  }

  return (
    <div className="space-y-6">
      <GameHeader score={score} attempts={attempts} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Terms Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-center">Terms</h3>
          {pairs.map((pair) => (
            <Card
              key={`term-${pair.id}`}
              className={`cursor-pointer transition-all ${
                matchedPairs.has(pair.id)
                  ? 'bg-green-100 border-green-500'
                  : selectedTerm === pair.id
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleTermClick(pair.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pair.term}</span>
                  {matchedPairs.has(pair.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Definitions Column */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-center">Definitions</h3>
          {pairs.map((pair) => (
            <Card
              key={`def-${pair.id}`}
              className={`cursor-pointer transition-all ${
                matchedPairs.has(pair.id)
                  ? 'bg-green-100 border-green-500'
                  : selectedDefinition === pair.id
                  ? 'bg-blue-100 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleDefinitionClick(pair.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{pair.definition.substring(0, 100)}...</span>
                  {matchedPairs.has(pair.id) && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            Matched: {matchedPairs.size}/{pairs.length}
          </Badge>
          <Badge variant="outline">
            Score: {score}
          </Badge>
        </div>
        <Button variant="outline" onClick={resetGame}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default PEFundamentalsMatch;