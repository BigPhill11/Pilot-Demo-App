
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grid3x3, Star, TrendingUp, TrendingDown } from 'lucide-react';

interface BCGPortfolioManagerProps {
  onComplete: (score: number) => void;
}

const BCGPortfolioManager: React.FC<BCGPortfolioManagerProps> = ({ onComplete }) => {
  const [gameComplete, setGameComplete] = useState(false);

  const handleComplete = () => {
    setGameComplete(true);
    setTimeout(() => onComplete(85), 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3x3 className="h-5 w-5 text-blue-500" />
            BCG Portfolio Manager
          </CardTitle>
          <Badge variant="outline">Strategic Analysis</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-8 space-y-4">
            <Grid3x3 className="h-16 w-16 text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold">Coming Soon!</h3>
            <p className="text-muted-foreground">
              The BCG Portfolio Manager game will help you categorize business units using the Boston Consulting Group matrix.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Stars</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Cash Cows</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="h-6 w-6 bg-blue-600 rounded-full mx-auto mb-2" />
                <p className="text-sm font-medium">Question Marks</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Dogs</p>
              </div>
            </div>
            <Button onClick={handleComplete}>Complete Demo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BCGPortfolioManager;
