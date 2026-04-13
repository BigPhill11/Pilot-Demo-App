/**
 * Wealth Management Completion
 * 
 * Summary screen showing final career outcome, key decisions,
 * rewards earned, and option to replay.
 */

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy,
  Star,
  DollarSign,
  Zap,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  Heart,
  Brain,
  Users,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import PandaLogo from '@/components/icons/PandaLogo';
import WMSimMeters from './WMSimMeters';
import { useWealthManagementSim } from '@/hooks/useWealthManagementSim';
import { usePlatformIntegration } from '@/hooks/usePlatformIntegration';

interface WealthManagementCompletionProps {
  onReplay: () => void;
  onExit: () => void;
}

const WealthManagementCompletion: React.FC<WealthManagementCompletionProps> = ({
  onReplay,
  onExit,
}) => {
  const {
    state,
    meters,
    decisionLog,
    getEnding,
    getSkillsAverage,
    resetSimulation,
  } = useWealthManagementSim();

  const { awardResources } = usePlatformIntegration();
  const [rewardsAwarded, setRewardsAwarded] = useState(false);

  const ending = getEnding();
  const skillsAvg = getSkillsAverage();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#059669', '#047857', '#fbbf24', '#f59e0b'],
    });
  }, []);

  useEffect(() => {
    if (!rewardsAwarded && ending) {
      awardResources(
        ending.bambooReward,
        ending.xpReward,
        'wealth-management-journey',
        true
      );
      setRewardsAwarded(true);
    }
  }, [ending, rewardsAwarded, awardResources]);

  const handleReplay = () => {
    resetSimulation();
    onReplay();
  };

  const getEndingIcon = () => {
    switch (ending.id) {
      case 'ending-md':
        return <Trophy className="h-12 w-12 text-amber-500" />;
      case 'ending-balance':
        return <Heart className="h-12 w-12 text-rose-500" />;
      case 'ending-expert':
        return <Brain className="h-12 w-12 text-purple-500" />;
      case 'ending-client-champion':
        return <Users className="h-12 w-12 text-blue-500" />;
      case 'ending-burnout':
        return <Scale className="h-12 w-12 text-gray-500" />;
      default:
        return <Star className="h-12 w-12 text-emerald-500" />;
    }
  };

  const getEndingColor = () => {
    switch (ending.id) {
      case 'ending-md':
        return 'from-amber-100 to-yellow-50 border-amber-300';
      case 'ending-balance':
        return 'from-rose-100 to-pink-50 border-rose-300';
      case 'ending-expert':
        return 'from-purple-100 to-indigo-50 border-purple-300';
      case 'ending-client-champion':
        return 'from-blue-100 to-cyan-50 border-blue-300';
      case 'ending-burnout':
        return 'from-gray-100 to-slate-50 border-gray-300';
      default:
        return 'from-emerald-100 to-green-50 border-emerald-300';
    }
  };

  const formatSalary = (salary: number) => {
    return `$${(salary / 1000).toFixed(0)}K`;
  };

  const getKeyInsights = () => {
    const insights: string[] = [];
    
    if (meters.salary >= 150000) {
      insights.push("You achieved a high salary through dedication and skill development.");
    }
    if (meters.workLifeBalance >= 70) {
      insights.push("You maintained excellent work-life balance throughout your career.");
    }
    if (meters.fatigue >= 60) {
      insights.push("Watch out for burnout - high fatigue can impact long-term success.");
    }
    if (skillsAvg >= 70) {
      insights.push("Your technical skills are exceptional - you're a true expert.");
    }
    if (meters.clientRelations >= 80) {
      insights.push("Your client relationships are your greatest asset.");
    }
    if (decisionLog.length >= 8) {
      insights.push("You made thoughtful decisions throughout your journey.");
    }
    
    return insights.slice(0, 3);
  };

  const insights = getKeyInsights();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-2 w-1.5 h-40 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-0 right-2 w-1.5 h-36 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute bottom-20 left-4 text-green-200/30 text-2xl">🎋</div>
        <div className="absolute bottom-40 right-4 text-green-200/30 text-2xl">🎋</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl">
        {/* Completion Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
            <Trophy className="h-3 w-3 mr-1" />
            Journey Complete!
          </Badge>
          
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Congratulations!
          </h1>
          
          <p className="text-green-600/80">
            You've completed the Wealth Management career simulation
          </p>
        </div>

        {/* Ending Card */}
        <Card className={`border-2 bg-gradient-to-br ${getEndingColor()} mb-6 overflow-hidden`}>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              {getEndingIcon()}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {ending.title}
            </h2>
            
            <Badge className="mb-4 bg-white/50">
              Final Title: {ending.finalTitle}
            </Badge>
            
            <p className="text-gray-700 leading-relaxed">
              {ending.description}
            </p>
          </CardContent>
        </Card>

        {/* Rewards Earned */}
        <Card className="border-green-200 bg-white/90 mb-6">
          <CardContent className="p-5">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Rewards Earned
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-2xl">🎋</span>
                <div>
                  <p className="text-xs text-emerald-600/70">Bamboo</p>
                  <p className="font-bold text-emerald-800">+{ending.bambooReward}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Zap className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="text-xs text-amber-600/70">XP</p>
                  <p className="font-bold text-amber-800">+{ending.xpReward}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Stats */}
        <Card className="border-green-200 bg-white/90 mb-6">
          <CardContent className="p-5">
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Final Career Stats
            </h3>
            
            {/* Salary Highlight */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="text-green-700">Final Salary</span>
              </div>
              <span className="text-xl font-bold text-emerald-800">{formatSalary(meters.salary)}</span>
            </div>
            
            <WMSimMeters meters={meters} showSalary={false} compact />
          </CardContent>
        </Card>

        {/* Key Insights */}
        {insights.length > 0 && (
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mb-6">
            <CardContent className="p-5">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-emerald-600" />
                Key Insights
              </h3>
              
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Phil's Final Message */}
        <Card className="border-green-200 bg-white/90 mb-8">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <PandaLogo className="h-12 w-12 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800 mb-2">Phil says:</p>
                <p className="text-green-600/80 text-sm leading-relaxed">
                  "Amazing job completing the Wealth Management journey! Remember, every career 
                  path has trade-offs. Whether you prioritized salary, work-life balance, or 
                  expertise, the key is making intentional choices that align with your values. 
                  In real life, you can always adjust your path as your priorities change. 
                  Keep learning and growing! 🐼"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleReplay}
            className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Different Choices
          </Button>
          
          <Button
            onClick={onExit}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Back to Careers
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <p className="text-center text-xs text-green-600/60 mt-4">
          Your progress has been saved. You can replay anytime to explore different paths!
        </p>
      </div>
    </div>
  );
};

export default WealthManagementCompletion;
