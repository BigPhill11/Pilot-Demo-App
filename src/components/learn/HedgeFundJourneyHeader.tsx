import React from 'react';
import { TrendingUp } from 'lucide-react';

interface HedgeFundJourneyHeaderProps {
  completedLevels: number;
  totalLevels: number;
}

const HedgeFundJourneyHeader: React.FC<HedgeFundJourneyHeaderProps> = ({
  completedLevels,
  totalLevels
}) => {
  const progressPercentage = Math.round((completedLevels / totalLevels) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-orange-600">Hedge Fund Journey</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Master how hedge funds operate, generate returns, and create value for sophisticated investors. 
          Learn the advanced strategies that drive alternative investment success.
        </p>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-bold text-orange-800">Your Progress</h2>
          <span className="ml-auto text-sm text-orange-600 font-semibold">
            {completedLevels}/{totalLevels} Levels
          </span>
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-orange-700 mb-2">Journey Progress</div>
          <div className="w-full bg-orange-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-right text-sm text-orange-600 font-semibold mt-1">
            {progressPercentage}%
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{completedLevels}</div>
            <div className="text-sm text-orange-700">Completed Levels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{totalLevels}</div>
            <div className="text-sm text-orange-700">Total Levels</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{progressPercentage}%</div>
            <div className="text-sm text-orange-700">Journey Progress</div>
          </div>
        </div>
      </div>

      {/* Learning Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-6 border border-orange-200">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center mb-4">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-orange-800 text-lg mb-2">Hedge Fund Fundamentals</h3>
          <p className="text-sm text-orange-700">
            Master hedge fund basics, structure, and regulatory environment
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-lg p-6 border border-yellow-200">
          <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center mb-4">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-yellow-800 text-lg mb-2">Investment Strategies</h3>
          <p className="text-sm text-yellow-700">
            Understand complex trading strategies and risk management
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-lg p-6 border border-green-200">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center mb-4">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-green-800 text-lg mb-2">Fee Structures & Investors</h3>
          <p className="text-sm text-green-700">
            Grasp fee models and sophisticated investor requirements
          </p>
        </div>
      </div>
    </div>
  );
};

export default HedgeFundJourneyHeader;