import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle } from 'lucide-react';

interface HedgeFundFlashcardProps {
  term: string;
  definition: string;
  onMastered?: () => void;
  isMastered?: boolean;
}

const HedgeFundFlashcard: React.FC<HedgeFundFlashcardProps> = ({ 
  term, 
  definition, 
  onMastered,
  isMastered = false 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
      isMastered ? 'border-green-200 bg-green-50/50' : 'border-blue-200'
    }`}>
      <CardContent className="p-6">
        {!isFlipped ? (
          // Front of card - Term
          <div 
            className="text-center space-y-4"
            onClick={() => setIsFlipped(true)}
          >
            <div className="text-lg font-semibold text-blue-600">
              {term}
            </div>
            <div className="text-sm text-muted-foreground">
              Click to see definition
            </div>
            {isMastered && (
              <div className="flex justify-center">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
        ) : (
          // Back of card - Definition
          <div className="space-y-4">
            <div className="text-sm font-medium text-blue-600 text-center">
              {term}
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              {definition}
            </div>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFlipped(false)}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Flip Back
              </Button>
              {onMastered && !isMastered && (
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => {
                    onMastered();
                    setIsFlipped(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Mark as Learned
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HedgeFundFlashcard;