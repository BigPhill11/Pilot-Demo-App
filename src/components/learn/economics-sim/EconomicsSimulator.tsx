/**
 * Economics Simulator Component
 * 
 * Main component for running economics unit simulators.
 * Handles all phases: intro, round-intro, decision, round-summary, completion.
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  Play,
  Trophy,
  RefreshCw,
  ArrowLeft,
  Sparkles,
  Target,
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import EconomicsSimMeters from './EconomicsSimMeters';
import EconomicsSimDecision from './EconomicsSimDecision';
import { useEconomicsSim } from '@/hooks/useEconomicsSim';
import { EconomicsSimulatorId } from '@/types/economics-sim';

interface EconomicsSimulatorProps {
  simulatorId: EconomicsSimulatorId;
  onComplete: (result: { ending: string; bambooEarned: number; xpEarned: number }) => void;
  onBack?: () => void;
}

const EconomicsSimulator: React.FC<EconomicsSimulatorProps> = ({
  simulatorId,
  onComplete,
  onBack,
}) => {
  const {
    config,
    state,
    currentRound,
    currentPhase,
    resetSimulator,
    startSimulator,
    startRound,
    makeDecision,
    advanceRound,
    completeSimulator,
    getCurrentRoundConfig,
    getCurrentDecision,
    getEndingDetails,
    getMeterConfigs,
    hasExistingProgress,
  } = useEconomicsSim(simulatorId);

  const [showResumePrompt, setShowResumePrompt] = useState(false);

  useEffect(() => {
    if (hasExistingProgress() && currentPhase !== 'completion') {
      setShowResumePrompt(true);
    }
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-6">
          <p className="text-gray-600">Simulator not found: {simulatorId}</p>
          {onBack && (
            <Button onClick={onBack} className="mt-4">
              Go Back
            </Button>
          )}
        </Card>
      </div>
    );
  }

  const roundConfig = getCurrentRoundConfig();
  const currentDecision = getCurrentDecision();
  const meterConfigs = getMeterConfigs();

  const handleDecision = (optionId: string, meterChanges: Record<string, number>) => {
    const decision = getCurrentDecision();
    if (decision) {
      makeDecision(decision.id, optionId, meterChanges);
    }
  };

  const handleComplete = () => {
    const result = completeSimulator();
    if (result) {
      onComplete(result);
    }
  };

  const handleRestart = () => {
    resetSimulator();
    setShowResumePrompt(false);
  };

  const handleResume = () => {
    setShowResumePrompt(false);
  };

  // Resume prompt
  if (showResumePrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-gray-200">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Continue Your Progress?</h2>
            <p className="text-gray-600 mb-6">
              You have an unfinished simulation. Would you like to continue where you left off?
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleResume}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue
              </Button>
              <Button
                onClick={handleRestart}
                variant="outline"
                className="w-full"
              >
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Intro phase
  if (currentPhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Unit
            </Button>
          )}

          <Card className="border-gray-200 bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 text-center">
              <div className="text-5xl mb-4">{config.icon}</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h1>
              <p className="text-gray-600">{config.subtitle}</p>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{config.description}</p>

              {/* Intro Narrative */}
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <p className="text-blue-800">{config.introNarrative}</p>
                </CardContent>
              </Card>

              {/* Phil's Intro */}
              <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <PandaLogo className="h-10 w-10 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                      <p className="text-green-700 italic">{config.philIntro}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Initial Meters */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Starting Conditions</h3>
                <EconomicsSimMeters meters={config.initialMeters} compact />
              </div>

              {/* Rewards */}
              <div className="flex items-center justify-center gap-6 py-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-700">🎋 {config.rewards.bamboo}</div>
                  <div className="text-xs text-gray-500">Bamboo</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-700">⭐ {config.rewards.xp}</div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
              </div>

              {/* Start Button */}
              <Button
                onClick={startSimulator}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Simulation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Round intro phase
  if (currentPhase === 'round-intro' && roundConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Progress Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Simulation Progress</span>
              <span className="text-sm font-medium text-gray-800">
                Round {currentRound}/{config.rounds.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${((currentRound - 1) / config.rounds.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6 space-y-6">
              {/* Round Header */}
              <div className="text-center">
                <Badge className="mb-3 bg-blue-100 text-blue-700 border-blue-200">
                  <Target className="h-3 w-3 mr-1" />
                  Round {currentRound}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{roundConfig.title}</h2>
              </div>

              {/* Narrative */}
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-4">
                  <p className="text-gray-700">{roundConfig.narrative}</p>
                </CardContent>
              </Card>

              {/* Current Meters */}
              <EconomicsSimMeters meters={meterConfigs} />

              {/* Start Round Button */}
              <Button
                onClick={startRound}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Begin Round {currentRound}
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Decision phase
  if (currentPhase === 'decision' && roundConfig && currentDecision) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* Progress Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Round {currentRound}: {roundConfig.title}
              </span>
              <span className="text-sm font-medium text-gray-800">
                Decision {state.currentDecisionIndex + 1}/{roundConfig.decisions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${((currentRound - 1 + (state.currentDecisionIndex / roundConfig.decisions.length)) / config.rounds.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Current Meters (compact) */}
          <div className="mb-4">
            <EconomicsSimMeters meters={meterConfigs} compact />
          </div>

          {/* Decision */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <EconomicsSimDecision
                decision={currentDecision}
                onSelect={handleDecision}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Round summary phase
  if (currentPhase === 'round-summary' && roundConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6 space-y-6">
              {/* Summary Header */}
              <div className="text-center">
                <Badge className="mb-3 bg-green-100 text-green-700 border-green-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Round {currentRound} Complete!
                </Badge>
                <h2 className="text-xl font-bold text-gray-800">{roundConfig.title} Summary</h2>
              </div>

              {/* Summary Text */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <p className="text-green-800">{roundConfig.roundSummary}</p>
                </CardContent>
              </Card>

              {/* Updated Meters */}
              <EconomicsSimMeters meters={meterConfigs} />

              {/* Next Button */}
              <Button
                onClick={advanceRound}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                {currentRound >= config.rounds.length ? 'See Results' : `Continue to Round ${currentRound + 1}`}
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Completion phase
  if (currentPhase === 'completion') {
    const endingDetails = getEndingDetails();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-slate-100">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <Card className="border-gray-200 bg-white overflow-hidden">
            {/* Completion Header */}
            <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="h-10 w-10 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Simulation Complete!</h1>
              <Badge className="bg-amber-200 text-amber-800 border-amber-300">
                {endingDetails?.title || 'Results'}
              </Badge>
            </div>

            <CardContent className="p-6 space-y-6">
              {/* Ending Description */}
              {endingDetails && (
                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <p className="text-gray-700">{endingDetails.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Final Meters */}
              <EconomicsSimMeters meters={meterConfigs} />

              {/* Phil's Message */}
              {endingDetails && (
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <PandaLogo className="h-10 w-10 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                        <p className="text-green-700 italic">{endingDetails.philMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleComplete}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Complete & Claim Rewards
                  <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-6">
        <p className="text-gray-600">Unknown phase: {currentPhase}</p>
        <Button onClick={handleRestart} className="mt-4">
          Restart
        </Button>
      </Card>
    </div>
  );
};

export default EconomicsSimulator;
