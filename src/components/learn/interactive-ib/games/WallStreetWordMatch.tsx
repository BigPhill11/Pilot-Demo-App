
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getIBTermsForLevel } from '@/data/investment-banking-terms';
import { useAuth } from '@/hooks/useAuth';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import GameHeader from './components/GameHeader';
import GameControls from './components/GameControls';
import TermButton from './components/TermButton';
import GameCompletionBanner from './components/GameCompletionBanner';
import TermHighlighter from './components/TermHighlighter';

interface WallStreetWordMatchProps {
  onComplete: (gameId: string) => void;
  isCompleted: boolean;
}

const WallStreetWordMatch: React.FC<WallStreetWordMatchProps> = ({ onComplete, isCompleted }) => {
  const { profile } = useAuth();
  const { updateActivityComplete } = useProgressTracking();
  const userLevel = profile?.app_version || 'beginner';
  const ibTerms = getIBTermsForLevel(userLevel);
  
  // Get appropriate terms for the game
  const gameTerms = Object.entries(ibTerms).slice(0, 6);
  
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);

  useEffect(() => {
    shuffleGame();
  }, []);

  const shuffleGame = () => {
    const termKeys = gameTerms.map(([key]) => key);
    const shuffled1 = [...termKeys].sort(() => Math.random() - 0.5);
    const shuffled2 = [...termKeys].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled1);
    setShuffledDefinitions(shuffled2);
  };

  const handleTermClick = (termKey: string) => {
    if (matches.has(termKey) || gameCompleted) return;
    
    if (selectedTerm === termKey) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(termKey);
    }
  };

  const handleDefinitionClick = (termKey: string) => {
    if (matches.has(termKey) || gameCompleted) return;
    
    if (selectedDefinition === termKey) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(termKey);
      
      if (selectedTerm) {
        setAttempts(prev => prev + 1);
        
        if (selectedTerm === termKey) {
          // Correct match
          const newMatches = new Set([...matches, termKey]);
          setMatches(newMatches);
          setScore(prev => prev + 10);
          setSelectedTerm(null);
          setSelectedDefinition(null);
          
          if (newMatches.size === gameTerms.length) {
            setGameCompleted(true);
            const finalScore = score + 10;
            const bonusPoints = attempts < gameTerms.length * 1.5 ? 25 : 15;
            updateActivityComplete('ib-basics-matching', bonusPoints);
            onComplete('ib-basics-matching');
          }
        } else {
          // Incorrect match
          setTimeout(() => {
            setSelectedTerm(null);
            setSelectedDefinition(null);
          }, 1000);
        }
      }
    }
  };

  const resetGame = () => {
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setMatches(new Set());
    setScore(0);
    setAttempts(0);
    setGameCompleted(false);
    shuffleGame();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <GameHeader score={score} attempts={attempts} />
      
      <CardContent className="space-y-6">
        {gameCompleted && <GameCompletionBanner score={score} />}

        <GameControls onShuffle={shuffleGame} onReset={resetGame} />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-center">Terms</h3>
            <div className="space-y-2">
              {shuffledTerms.map((termKey) => {
                const termData = ibTerms[termKey];
                return (
                  <TermButton
                    key={`term-${termKey}`}
                    termKey={termKey}
                    termData={termData}
                    isMatched={matches.has(termKey)}
                    isSelected={selectedTerm === termKey}
                    gameCompleted={gameCompleted}
                    onClick={handleTermClick}
                  >
                    <span className="font-medium">
                      {termData.term}
                    </span>
                  </TermButton>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-center">Definitions</h3>
            <div className="space-y-2">
              {shuffledDefinitions.map((termKey) => {
                const termData = ibTerms[termKey];
                return (
                  <TermButton
                    key={`def-${termKey}`}
                    termKey={termKey}
                    termData={termData}
                    isMatched={matches.has(termKey)}
                    isSelected={selectedDefinition === termKey}
                    gameCompleted={gameCompleted}
                    onClick={handleDefinitionClick}
                  >
                    <span className="text-sm leading-relaxed">
                      <TermHighlighter text={termData.definition} ibTerms={ibTerms} />
                    </span>
                  </TermButton>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Click a term, then click its matching definition. Hover over terms to see Phil's explanations!
        </div>
      </CardContent>
    </Card>
  );
};

export default WallStreetWordMatch;
