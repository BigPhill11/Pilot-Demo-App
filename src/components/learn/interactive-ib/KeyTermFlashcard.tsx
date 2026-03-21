
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import HighlightableTerm from '@/components/HighlightableTerm';

interface KeyTermFlashcardProps {
  term: string;
  definition: string;
  analogy: string;
  onMastered: (term: string) => void;
  isMastered: boolean;
}

const KeyTermFlashcard: React.FC<KeyTermFlashcardProps> = ({
  term,
  definition,
  analogy,
  onMastered,
  isMastered
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnalogy, setShowAnalogy] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastered = () => {
    onMastered(term);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setShowAnalogy(false);
  };

  return (
    <Card className={`transition-all duration-300 ${isMastered ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-primary'}`}>
      <CardContent className="p-6">
        <div className="min-h-[200px] flex flex-col">
          {!isFlipped ? (
            // Front of card - Term
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">{term}</h3>
              <p className="text-muted-foreground mb-4">Click to reveal definition</p>
              <Button onClick={handleFlip} variant="outline">
                Show Definition
              </Button>
            </div>
          ) : (
            // Back of card - Definition and controls
            <div className="flex-1 flex flex-col">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold mb-2 text-primary">{term}</h4>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                  <p className="text-gray-800">{definition}</p>
                </div>
                
                {analogy && (
                  <div className="mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAnalogy(!showAnalogy)}
                    >
                      {showAnalogy ? 'Hide' : 'Show'} Phil's Example
                    </Button>
                    {showAnalogy && (
                      <div className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800 italic">{analogy}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-auto space-y-2">
                <div className="flex gap-2">
                  <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleFlip} variant="outline" size="sm" className="flex-1">
                    Show Term
                  </Button>
                </div>
                
                <Button 
                  onClick={handleMastered}
                  disabled={isMastered}
                  className={`w-full ${isMastered ? 'bg-green-500' : ''}`}
                >
                  {isMastered ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mastered!
                    </>
                  ) : (
                    'Mark as Mastered'
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyTermFlashcard;
