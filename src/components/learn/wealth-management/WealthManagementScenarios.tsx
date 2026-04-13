/**
 * Wealth Management Scenarios
 * 
 * Branching scenario-based learning that tests understanding
 * while affecting career stats. Covers client situations,
 * market events, career decisions, and work-life choices.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Users,
  TrendingUp,
  Briefcase,
  Heart,
  Lightbulb,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import WMSimMeters from './WMSimMeters';
import WMDecisionCard from './WMDecisionCard';
import { useWealthManagementSim } from '@/hooks/useWealthManagementSim';
import { WMScenario } from '@/types/wealth-management-sim';

interface WealthManagementScenariosProps {
  onComplete: () => void;
  onBack?: () => void;
}

const WealthManagementScenarios: React.FC<WealthManagementScenariosProps> = ({
  onComplete,
  onBack,
}) => {
  const {
    meters,
    scenariosCompleted,
    completeScenario,
    getNextScenario,
  } = useWealthManagementSim();

  const [currentScenario, setCurrentScenario] = useState<WMScenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLearningPoint, setShowLearningPoint] = useState(false);

  const requiredScenarios = 3;
  const completedCount = scenariosCompleted.length;

  useEffect(() => {
    if (!currentScenario && completedCount < requiredScenarios) {
      const next = getNextScenario();
      setCurrentScenario(next);
    }
  }, [currentScenario, completedCount, getNextScenario, requiredScenarios]);

  const getCategoryIcon = (category: WMScenario['category']) => {
    switch (category) {
      case 'client':
        return <Users className="h-4 w-4" />;
      case 'market':
        return <TrendingUp className="h-4 w-4" />;
      case 'career':
        return <Briefcase className="h-4 w-4" />;
      case 'worklife':
        return <Heart className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: WMScenario['category']) => {
    switch (category) {
      case 'client':
        return 'Client Situation';
      case 'market':
        return 'Market Event';
      case 'career':
        return 'Career Decision';
      case 'worklife':
        return 'Work-Life Choice';
      default:
        return 'Scenario';
    }
  };

  const getCategoryColor = (category: WMScenario['category']) => {
    switch (category) {
      case 'client':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'market':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'career':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'worklife':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (!showFeedback) {
      setSelectedOption(optionId);
    }
  };

  const handleConfirmChoice = () => {
    if (!selectedOption || !currentScenario) return;
    
    const option = currentScenario.options.find(o => o.id === selectedOption);
    if (!option) return;

    setShowFeedback(true);
    
    setTimeout(() => {
      setShowLearningPoint(true);
    }, 1500);
  };

  const handleContinue = () => {
    if (!currentScenario || !selectedOption) return;
    
    const option = currentScenario.options.find(o => o.id === selectedOption);
    if (!option) return;

    completeScenario(currentScenario.id, option.meterChanges);
    
    setCurrentScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
    setShowLearningPoint(false);

    if (completedCount + 1 >= requiredScenarios) {
      onComplete();
    }
  };

  if (completedCount >= requiredScenarios) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30 flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Scenarios Complete!</h2>
          <p className="text-green-600/80 mb-6">You've handled all the real-world challenges.</p>
          <Button
            onClick={onComplete}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            See Your Results
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative bamboo elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-2 w-1.5 h-40 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-0 right-2 w-1.5 h-36 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-600/70">Scenario Progress</span>
            <span className="text-sm font-medium text-green-800">
              {completedCount + 1} of {requiredScenarios}
            </span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
              style={{ width: `${((completedCount + 1) / requiredScenarios) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario Header */}
        <div className="text-center mb-6">
          <Badge className={`mb-3 ${getCategoryColor(currentScenario.category)}`}>
            {getCategoryIcon(currentScenario.category)}
            <span className="ml-1">{getCategoryLabel(currentScenario.category)}</span>
          </Badge>
          
          <h2 className="text-xl font-bold text-green-800">
            {currentScenario.title}
          </h2>
        </div>

        {/* Situation Card */}
        <Card className="border-green-200 bg-white/90 mb-6">
          <CardContent className="p-5">
            <p className="text-green-700 leading-relaxed mb-3">
              {currentScenario.situation}
            </p>
            <p className="text-sm text-green-600/70 italic">
              {currentScenario.context}
            </p>
          </CardContent>
        </Card>

        {/* Options */}
        {!showLearningPoint && (
          <div className="space-y-3 mb-6">
            {currentScenario.options.map((option) => (
              <WMDecisionCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={() => handleOptionSelect(option.id)}
                disabled={showFeedback}
                showFeedback={showFeedback && selectedOption === option.id}
              />
            ))}
          </div>
        )}

        {/* Learning Point */}
        {showLearningPoint && (
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 mb-6">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Key Learning</h3>
                  <p className="text-green-700">{currentScenario.learningPoint}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Phil's Comment */}
        {showLearningPoint && (
          <Card className="border-green-200 bg-white/90 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <PandaLogo className="h-10 w-10 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                  <p className="text-green-600/80 text-sm italic">
                    "Great job working through that scenario! Remember, there's often no 
                    perfect answer in wealth management - it's about understanding trade-offs 
                    and making thoughtful decisions."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Meters (compact) */}
        {showLearningPoint && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-green-800 mb-3">Updated Stats</h3>
            <WMSimMeters meters={meters} compact />
          </div>
        )}

        {/* Action Buttons */}
        {selectedOption && !showFeedback && (
          <Button
            onClick={handleConfirmChoice}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            Confirm Choice
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        )}

        {showLearningPoint && (
          <Button
            onClick={handleContinue}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            {completedCount + 1 >= requiredScenarios ? 'See Your Results' : 'Next Scenario'}
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        )}

        {/* Processing indicator */}
        {showFeedback && !showLearningPoint && (
          <div className="text-center text-green-600/70 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin inline mr-2" />
            Analyzing your choice...
          </div>
        )}
      </div>
    </div>
  );
};

export default WealthManagementScenarios;
