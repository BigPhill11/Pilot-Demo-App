import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface AssetManagementFlashcardProps {
  term: string;
  definition: string;
  onMastered?: () => void;
  isMastered?: boolean;
}

const AssetManagementFlashcard: React.FC<AssetManagementFlashcardProps> = ({
  term,
  definition,
  onMastered,
  isMastered = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-48">
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 backface-hidden border-2 border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <CardContent className="flex items-center justify-center h-full p-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-blue-600 mb-2">{term}</h3>
              <p className="text-sm text-muted-foreground">Click to reveal definition</p>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 border-2 border-blue-500/30 bg-blue-50">
          <CardContent className="flex flex-col justify-between h-full p-4">
            <div className="flex-1 flex items-center">
              <p className="text-sm leading-relaxed text-gray-700">{definition}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Flip Back
              </Button>
              {onMastered && (
                <Button
                  variant={isMastered ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMastered();
                  }}
                  className="text-xs"
                >
                  {isMastered ? "✓ Mastered" : "Mark as Learned"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagementFlashcard;