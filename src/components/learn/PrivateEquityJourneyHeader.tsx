import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Briefcase, TrendingUp, Target, Zap } from 'lucide-react';

interface PrivateEquityJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const PrivateEquityJourneyHeader: React.FC<PrivateEquityJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full shadow-lg">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Private Equity Journey
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master the art of private equity investing. Learn how firms buy, improve, and sell companies 
          to generate exceptional returns for their investors.
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              {completedLevels}/{totalLevels} Levels
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Journey Progress</span>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-purple-100 dark:bg-purple-900/30"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {completedLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {totalLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Journey Progress
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Learn PE Fundamentals
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Master private equity basics, deal types, and investment strategies
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/30 border-violet-200 dark:border-violet-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-violet-500 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-violet-700 dark:text-violet-300 mb-2">
              Master Value Creation
            </h3>
            <p className="text-sm text-violet-600 dark:text-violet-400">
              Understand how PE firms improve companies and generate returns
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-900/30 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Future of PE
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Explore trends, technology, and the evolving landscape of private equity
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivateEquityJourneyHeader;