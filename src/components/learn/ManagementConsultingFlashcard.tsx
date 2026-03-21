import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, CheckCircle2, Star } from 'lucide-react';

interface ManagementConsultingFlashcardProps {
  term: string;
  definition: string;
  onMastered: (term: string, isMastered: boolean) => void;
  isMastered: boolean;
}

const ManagementConsultingFlashcard: React.FC<ManagementConsultingFlashcardProps> = ({
  term,
  definition,
  onMastered,
  isMastered
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMastery = () => {
    onMastered(term, !isMastered);
  };

  return (
    <Card className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
      isMastered ? 'border-green-200 bg-green-50' : ''
    }`}>
      <CardContent className="p-6 h-48 flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center text-center">
          {!isFlipped ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">{term}</h3>
              <p className="text-sm text-muted-foreground">Click to reveal definition</p>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{definition}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFlip}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {isFlipped ? 'Show Term' : 'Show Definition'}
          </Button>

          <div className="flex items-center gap-2">
            {isMastered && (
              <Badge variant="default" className="bg-green-500">
                <Star className="h-3 w-3 mr-1" />
                Mastered
              </Badge>
            )}
            <Button
              variant={isMastered ? "outline" : "default"}
              size="sm"
              onClick={handleMastery}
              className={isMastered ? "text-green-600 border-green-200" : ""}
            >
              {isMastered ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Mastered
                </>
              ) : (
                'Mark as Mastered'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagementConsultingFlashcard;