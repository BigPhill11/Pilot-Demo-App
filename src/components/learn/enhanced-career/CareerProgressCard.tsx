
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

interface CareerProgressCardProps {
  completedLevels: number;
  currentLevel: number;
  userLevel: string;
}

const CareerProgressCard: React.FC<CareerProgressCardProps> = ({
  completedLevels,
  currentLevel,
  userLevel
}) => {
  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{completedLevels}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{currentLevel}</div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{userLevel}</div>
            <div className="text-sm text-muted-foreground">Difficulty</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerProgressCard;
