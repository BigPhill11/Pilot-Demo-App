import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RedFlagGreenFlagCardProps {
  type: 'red' | 'green';
  title: string;
  description: string;
  example?: string;
}

const RedFlagGreenFlagCard: React.FC<RedFlagGreenFlagCardProps> = ({
  type,
  title,
  description,
  example
}) => {
  const isRed = type === 'red';

  return (
    <Card className={`border-2 transition-all hover:shadow-md ${
      isRed 
        ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/50' 
        : 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50'
    }`}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          {isRed ? (
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 space-y-2">
            <h4 className={`font-semibold ${isRed ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {example && (
              <p className="text-xs italic text-muted-foreground">
                Example: {example}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedFlagGreenFlagCard;
