/**
 * Wealth Management Career Simulation
 * 
 * Multi-year career simulation spanning 5 "years" with decisions,
 * events, and outcomes tracking salary, skills, and work-life balance.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Calendar,
  Sparkles,
  AlertTriangle,
  Trophy,
  RefreshCw
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import WMSimMeters from './WMSimMeters';
import WMDecisionCard from './WMDecisionCard';
import { useWealthManagementSim } from '@/hooks/useWealthManagementSim';
import { WMDecision, WMRandomEvent } from '@/types/wealth-management-sim';

interface WealthManagementCareerSimProps {
  onComplete: () => void;
  onBack?: () => void;
}

const WealthManagementCareerSim: React.FC<WealthManagementCareerSimProps> = ({
  onComplete,
  onBack,
}) => {
  const {
    state,
    meters,
    currentYear,
    currentPhase,
    currentTitle,
    advanceToDecisions,
    makeDecision,
    triggerEvent,
    skipEvent,
    advanceYear,
    getCurrentYearConfig,
    getCurrentDecision,
    getRandomEvent,
  } = useWealthManagementSim();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<WMRandomEvent | null>(null);
  const [showEventResult, setShowEventResult] = useState(false);

  const yearConfig = getCurrentYearConfig();
  const currentDecision = getCurrentDecision();

  useEffect(() => {
    if (currentPhase === 'event') {
      const event = getRandomEvent();
      setCurrentEvent(event);
      if (!event) {
        skipEvent();
      }
    }
  }, [currentPhase, getRandomEvent, skipEvent]);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setShowEventResult(false);
  }, [currentPhase, state.currentDecisionIndex]);

  const handleOptionSelect = (optionId: string) => {
    if (!showFeedback) {
      setSelectedOption(optionId);
    }
  };

  const handleConfirmDecision = () => {
    if (!selectedOption || !currentDecision) return;
    
    const option = currentDecision.options.find(o => o.id === selectedOption);
    if (!option) return;

    setShowFeedback(true);
    
    setTimeout(() => {
      makeDecision(currentDecision.id, selectedOption, option.meterChanges);
    }, 2000);
  };

  const handleEventAcknowledge = () => {
    if (!currentEvent) return;
    
    setShowEventResult(true);
    
    setTimeout(() => {
      triggerEvent(currentEvent.id, currentEvent.meterChanges);
    }, 2000);
  };

  const handleAdvanceYear = () => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementCareerSim.tsx:handleAdvanceYear',message:'Advancing year, calling onComplete',data:{currentYear:currentYear,currentPhase:currentPhase},hypothesisId:'H3',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // In module-based flow, completing a year means completing the module
    // The next year will be started when the user enters the next module
    onComplete();
  };

  const renderYearIntro = () => (
    <div className="space-y-6">
      {/* Year Header */}
      <div className="text-center">
        <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
          <Calendar className="h-3 w-3 mr-1" />
          Year {currentYear} of 5
        </Badge>
        
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          {currentTitle}
        </h2>
        
        <p className="text-green-600/80">
          Salary Range: ${(yearConfig?.salaryRange.min || 0) / 1000}K - ${(yearConfig?.salaryRange.max || 0) / 1000}K
        </p>
      </div>

      {/* Narrative */}
      <Card className="border-green-200 bg-white/90">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <PandaLogo className="h-10 w-10 flex-shrink-0" />
            <div>
              <p className="text-green-700 leading-relaxed">
                {yearConfig?.openingNarrative}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Meters */}
      <WMSimMeters meters={meters} compact />

      {/* Start Year Button */}
      <Button
        onClick={advanceToDecisions}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        size="lg"
      >
        Begin Year {currentYear}
        <ChevronRight className="h-5 w-5 ml-1" />
      </Button>
    </div>
  );

  const renderDecisions = () => {
    if (!currentDecision) return null;

    return (
      <div className="space-y-6">
        {/* Decision Header */}
        <div className="text-center">
          <Badge className="mb-2 bg-amber-100 text-amber-700 border-amber-200">
            Decision {state.currentDecisionIndex + 1} of {yearConfig?.decisions.length || 0}
          </Badge>
          
          <h2 className="text-xl font-bold text-green-800">
            {currentDecision.title}
          </h2>
        </div>

        {/* Situation */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <p className="text-green-700">{currentDecision.situation}</p>
            {currentDecision.context && (
              <p className="text-sm text-green-600/70 mt-2 italic">{currentDecision.context}</p>
            )}
          </CardContent>
        </Card>

        {/* Options */}
        <div className="space-y-3">
          {currentDecision.options.map((option) => (
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

        {/* Confirm Button */}
        {selectedOption && !showFeedback && (
          <Button
            onClick={handleConfirmDecision}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            Confirm Decision
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        )}

        {/* Processing indicator */}
        {showFeedback && (
          <div className="text-center text-green-600/70 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin inline mr-2" />
            Processing your decision...
          </div>
        )}
      </div>
    );
  };

  const renderEvent = () => {
    if (!currentEvent) return null;

    return (
      <div className="space-y-6">
        {/* Event Header */}
        <div className="text-center">
          <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Random Event!
          </Badge>
          
          <h2 className="text-xl font-bold text-green-800">
            {currentEvent.title}
          </h2>
        </div>

        {/* Event Description */}
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="p-5">
            <p className="text-amber-800 leading-relaxed">
              {currentEvent.description}
            </p>
          </CardContent>
        </Card>

        {/* Phil's Comment */}
        {showEventResult && (
          <Card className="border-green-200 bg-white/90">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <PandaLogo className="h-8 w-8 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                  <p className="text-green-600/80 text-sm italic">{currentEvent.philComment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Acknowledge Button */}
        {!showEventResult ? (
          <Button
            onClick={handleEventAcknowledge}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            size="lg"
          >
            See What Happens
            <Sparkles className="h-5 w-5 ml-1" />
          </Button>
        ) : (
          <div className="text-center text-green-600/70 text-sm">
            <RefreshCw className="h-4 w-4 animate-spin inline mr-2" />
            Applying effects...
          </div>
        )}
      </div>
    );
  };

  const renderYearReview = () => (
    <div className="space-y-6">
      {/* Review Header */}
      <div className="text-center">
        <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200">
          <Trophy className="h-3 w-3 mr-1" />
          Year {currentYear} Complete!
        </Badge>
        
        <h2 className="text-xl font-bold text-green-800">
          Year-End Review
        </h2>
      </div>

      {/* Review Narrative */}
      <Card className="border-green-200 bg-gradient-to-r from-emerald-50 to-green-50">
        <CardContent className="p-5">
          <p className="text-green-700 leading-relaxed">
            {yearConfig?.yearEndReview}
          </p>
        </CardContent>
      </Card>

      {/* Updated Meters */}
      <WMSimMeters meters={meters} />

      {/* Next Year Button */}
      <Button
        onClick={handleAdvanceYear}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
        size="lg"
      >
        {currentYear >= 5 ? 'Continue to Scenarios' : `Start Year ${currentYear + 1}`}
        <ChevronRight className="h-5 w-5 ml-1" />
      </Button>
    </div>
  );

  const renderContent = () => {
    // #region agent log
    fetch('http://127.0.0.1:7381/ingest/8f93aedd-571d-48d1-ab86-1303c48cdef9',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96d572'},body:JSON.stringify({sessionId:'96d572',location:'WealthManagementCareerSim.tsx:renderContent',message:'Rendering content for phase',data:{currentPhase:currentPhase,currentYear:currentYear},hypothesisId:'H3,H4',timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    switch (currentPhase) {
      case 'year-intro':
        return renderYearIntro();
      case 'decisions':
        return renderDecisions();
      case 'event':
        return renderEvent();
      case 'year-review':
        return renderYearReview();
      default:
        return renderYearIntro();
    }
  };

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
            <span className="text-sm text-green-600/70">Career Progress</span>
            <span className="text-sm font-medium text-green-800">Year {currentYear}/5</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
              style={{ width: `${(currentYear / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        {renderContent()}

        {/* Back Button (only on year intro) */}
        {currentPhase === 'year-intro' && currentYear === 1 && onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mt-4 text-green-600/70 hover:text-green-700"
          >
            Back to Comic
          </Button>
        )}
      </div>
    </div>
  );
};

export default WealthManagementCareerSim;
