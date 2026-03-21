import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Calculator, DollarSign } from 'lucide-react';

interface CorporateFinanceJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const CorporateFinanceJourneyHeader: React.FC<CorporateFinanceJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Corporate Finance Journey
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master how companies make financial decisions, manage money, and create shareholder value. 
          Learn the fundamentals that drive business success and growth.
        </p>
      </div>

      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-orange-200 dark:border-orange-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-orange-700 dark:text-orange-300 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
              {completedLevels}/{totalLevels} Levels
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Journey Progress</span>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-orange-100 dark:bg-orange-900/30"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {completedLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {totalLevels}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Levels
              </div>
            </div>
            <div className="text-center p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
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
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              Learn the Fundamentals
            </h3>
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Master corporate finance basics, debt vs equity, and business objectives
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-yellow-500 rounded-full">
                <Calculator className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
              Master Financial Statements
            </h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              Understand revenue, expenses, assets, liabilities, and profit calculations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 border-amber-200 dark:border-amber-800 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-amber-500 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
              Time Value Concepts
            </h3>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Grasp present value, future value, and discounting for smart decisions
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateFinanceJourneyHeader;