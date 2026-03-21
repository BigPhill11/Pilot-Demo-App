import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Building2, Briefcase, LineChart, Target } from 'lucide-react';

interface InvestmentBankingJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const InvestmentBankingJourneyHeader: React.FC<InvestmentBankingJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg animate-scale-in">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Investment Banking Journey
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in">
          Master the art of investment banking with comprehensive training from analyst to MD level. 
          Learn deal execution, client management, and financial modeling that drives global markets.
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              {completedLevels}/{totalLevels} Levels
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Journey Progress</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-blue-100 dark:bg-blue-900/30"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg hover-scale">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {completedLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg hover-scale">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {totalLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg hover-scale">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Master IB Fundamentals
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Learn banking basics, deal types, and industry structure from the ground up
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/30 border-indigo-200 dark:border-indigo-800 hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-indigo-500 rounded-full">
                <LineChart className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
              Financial Modeling
            </h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">
              Build complex models, valuations, and analytical frameworks for deals
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Deal Execution
            </h3>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Execute M&A, IPOs, and capital raising transactions like a pro
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentBankingJourneyHeader;