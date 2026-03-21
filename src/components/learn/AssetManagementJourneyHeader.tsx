import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, BookOpen } from 'lucide-react';

interface AssetManagementJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const AssetManagementJourneyHeader: React.FC<AssetManagementJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          💼 Asset Management Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master the art of professional investing. Learn how asset managers build portfolios, analyze risks, and create wealth for their clients.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Target className="h-5 w-5" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {completedLevels}
              </div>
              <div className="text-sm text-muted-foreground">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {totalLevels}
              </div>
              <div className="text-sm text-muted-foreground">Total Levels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-muted-foreground">Journey Progress</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress to Portfolio Pro</span>
              <span>{completedLevels}/{totalLevels}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-blue-700">Learn the Fundamentals</h3>
                <p className="text-sm text-muted-foreground">Understand asset management industry basics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-blue-700">Master Analysis</h3>
                <p className="text-sm text-muted-foreground">Research companies and build portfolios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-blue-700">Manage Risk</h3>
                <p className="text-sm text-muted-foreground">Protect and grow client assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssetManagementJourneyHeader;