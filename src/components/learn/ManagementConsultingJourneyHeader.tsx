import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, BookOpen, Target, CheckCircle2 } from 'lucide-react';

interface ManagementConsultingJourneyHeaderProps {
  completedLevels: number[];
  totalLevels: number;
  journeyCompleted: boolean;
}

const ManagementConsultingJourneyHeader: React.FC<ManagementConsultingJourneyHeaderProps> = ({
  completedLevels,
  totalLevels,
  journeyCompleted
}) => {
  const progressPercentage = (completedLevels.length / totalLevels) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Management Consulting Journey
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Master the fundamentals of management consulting through 7 comprehensive levels covering everything from basic concepts to future trends.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Your Progress</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Levels Completed</span>
                  <span className="font-medium">{completedLevels.length} / {totalLevels}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {Math.round(progressPercentage)}% Complete
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Skills You'll Learn</h3>
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs mr-1 mb-1">Problem Solving</Badge>
                <Badge variant="outline" className="text-xs mr-1 mb-1">Data Analysis</Badge>
                <Badge variant="outline" className="text-xs mr-1 mb-1">Strategy</Badge>
                <Badge variant="outline" className="text-xs mr-1 mb-1">Frameworks</Badge>
                <Badge variant="outline" className="text-xs mr-1 mb-1">Change Management</Badge>
              </div>
            </div>

            {/* Achievement Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="space-y-2">
                {journeyCompleted ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Journey Master!</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Complete all levels to unlock achievements
                  </div>
                )}
                
                {completedLevels.length >= 3 && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Consulting Fundamentals</span>
                  </div>
                )}
                
                {completedLevels.length >= 5 && (
                  <div className="flex items-center gap-2 text-purple-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Strategy Specialist</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {journeyCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-green-800">Congratulations!</h3>
            <p className="text-sm text-green-700">
              You've completed the entire Management Consulting Journey and earned the title of Consulting Master!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManagementConsultingJourneyHeader;