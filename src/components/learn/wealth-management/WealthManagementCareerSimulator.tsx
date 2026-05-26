import React, { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Crown,
  Lock,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import {
  wealthManagementCareerStages,
  wealthManagementMeterLabels,
  type WealthManagementCareerStage,
  type WealthManagementMeter,
} from '@/data/wealth-management/wealthManagementCurriculum';

interface WealthManagementCareerSimulatorProps {
  completedStageIds: string[];
  onCompleteStage: (stageId: string) => void;
  onBack: () => void;
}

type MeterState = Record<WealthManagementMeter, number>;

const initialMeters: MeterState = {
  trust: 50,
  technical: 50,
  growth: 50,
  risk: 50,
};

const meterIcons: Record<WealthManagementMeter, React.ElementType> = {
  trust: Users,
  technical: ShieldCheck,
  growth: TrendingUp,
  risk: ShieldCheck,
};

const clampMeter = (value: number) => Math.min(100, Math.max(0, value));

const WealthManagementCareerSimulator: React.FC<WealthManagementCareerSimulatorProps> = ({
  completedStageIds,
  onCompleteStage,
  onBack,
}) => {
  const firstUnlockedIndex = Math.min(completedStageIds.length, wealthManagementCareerStages.length - 1);
  const [activeStageId, setActiveStageId] = useState(wealthManagementCareerStages[firstUnlockedIndex].id);
  const [roundIndex, setRoundIndex] = useState(0);
  const [meters, setMeters] = useState<MeterState>(initialMeters);
  const [selectedDecisionIds, setSelectedDecisionIds] = useState<Record<string, string>>({});
  const [stageComplete, setStageComplete] = useState(false);

  const activeStage = wealthManagementCareerStages.find((stage) => stage.id === activeStageId) ?? wealthManagementCareerStages[0];
  const activeStageIndex = wealthManagementCareerStages.findIndex((stage) => stage.id === activeStage.id);
  const currentRound = activeStage.rounds[roundIndex];
  const selectedDecisionId = selectedDecisionIds[currentRound.id];
  const selectedDecision = currentRound.decisions.find((decision) => decision.id === selectedDecisionId);
  const isAlreadyCompleted = completedStageIds.includes(activeStage.id);
  const stageProgress = Math.round((Object.keys(selectedDecisionIds).length / activeStage.rounds.length) * 100);

  const bestDecisionCount = useMemo(() => {
    return activeStage.rounds.reduce((total, round) => {
      const selectedId = selectedDecisionIds[round.id];
      const decision = round.decisions.find((item) => item.id === selectedId);
      return total + (decision?.isBest ? 1 : 0);
    }, 0);
  }, [activeStage.rounds, selectedDecisionIds]);

  const canSelectStage = (stage: WealthManagementCareerStage, index: number) => {
    return index === 0 || completedStageIds.includes(stage.id) || completedStageIds.includes(wealthManagementCareerStages[index - 1].id);
  };

  const resetStageRun = (stageId = activeStage.id) => {
    setActiveStageId(stageId);
    setRoundIndex(0);
    setMeters(initialMeters);
    setSelectedDecisionIds({});
    setStageComplete(false);
  };

  const handleDecision = (decisionId: string) => {
    if (selectedDecisionId) return;

    const decision = currentRound.decisions.find((item) => item.id === decisionId);
    if (!decision) return;

    setSelectedDecisionIds((current) => ({
      ...current,
      [currentRound.id]: decisionId,
    }));

    setMeters((current) => {
      const next = { ...current };
      for (const [meter, change] of Object.entries(decision.meterChanges) as [WealthManagementMeter, number][]) {
        next[meter] = clampMeter(next[meter] + change);
      }
      return next;
    });
  };

  const handleNextRound = () => {
    if (roundIndex < activeStage.rounds.length - 1) {
      setRoundIndex((current) => current + 1);
      return;
    }

    setStageComplete(true);
    if (!isAlreadyCompleted) onCompleteStage(activeStage.id);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} className="-ml-2 text-green-800 hover:bg-green-100">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Lab
        </Button>
        <Badge className="bg-green-700 text-white hover:bg-green-700">
          Career Simulator
        </Badge>
      </div>

      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-950 via-emerald-900 to-teal-800 text-white shadow-2xl">
        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <BriefcaseBusiness className="h-6 w-6 text-emerald-200" />
                <p className="text-sm font-semibold text-emerald-100">Live the full wealth management path</p>
              </div>
              <h1 className="text-3xl font-black sm:text-4xl">From intern to managing director</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-green-100">
                Make the same kinds of tradeoffs professionals face: client trust,
                technical quality, business growth, and risk control.
              </p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 text-center">
              <Crown className="mx-auto mb-2 h-8 w-8 text-amber-300" />
              <p className="text-2xl font-black">{completedStageIds.length}/6</p>
              <p className="text-xs text-green-100">titles completed</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-6">
        {wealthManagementCareerStages.map((stage, index) => {
          const isUnlocked = canSelectStage(stage, index);
          const isComplete = completedStageIds.includes(stage.id);
          const isActive = stage.id === activeStage.id;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => isUnlocked && resetStageRun(stage.id)}
              disabled={!isUnlocked}
              className={`rounded-2xl border p-3 text-left transition-all ${
                isActive
                  ? 'border-emerald-400 bg-emerald-50 shadow-md'
                  : isComplete
                    ? 'border-emerald-200 bg-white'
                    : isUnlocked
                      ? 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50'
                      : 'border-slate-100 bg-slate-50 opacity-70'
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Level {index + 1}
                </span>
                {isComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : isUnlocked ? (
                  <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                ) : (
                  <Lock className="h-4 w-4 text-slate-400" />
                )}
              </div>
              <p className="text-sm font-black text-green-950">{stage.title}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="space-y-4">
          <Card className="border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-5">
              <Badge className="mb-3 bg-emerald-600 text-white hover:bg-emerald-600">
                {activeStage.title}
              </Badge>
              <h2 className="text-xl font-black text-green-950">{activeStage.headline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeStage.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeStage.coreSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-emerald-200 text-emerald-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-100 bg-white shadow-sm">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Stage Progress</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {Object.keys(selectedDecisionIds).length}/{activeStage.rounds.length} decisions
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => resetStageRun()}>
                  <RotateCcw className="mr-2 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
              <Progress
                value={stageProgress}
                className="h-2 bg-slate-100"
                indicatorClassName="bg-gradient-to-r from-emerald-500 to-green-500"
              />

              {Object.entries(meters).map(([meter, value]) => {
                const typedMeter = meter as WealthManagementMeter;
                const Icon = meterIcons[typedMeter];

                return (
                  <div key={meter}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-emerald-700" />
                        <span className="text-xs font-bold text-slate-700">
                          {wealthManagementMeterLabels[typedMeter]}
                        </span>
                      </div>
                      <span className="text-xs font-black text-green-800">{value}</span>
                    </div>
                    <Progress
                      value={value}
                      className="h-2 bg-slate-100"
                      indicatorClassName="bg-emerald-500"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </aside>

        <main>
          {!stageComplete ? (
            <Card className="overflow-hidden border-emerald-100 bg-white shadow-sm">
              <CardContent className="p-0">
                <div className="border-b border-emerald-100 bg-emerald-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="outline" className="border-emerald-200 bg-white text-emerald-700">
                      Decision {roundIndex + 1} of {activeStage.rounds.length}
                    </Badge>
                    <Badge variant="outline" className="border-slate-200 bg-white text-slate-600">
                      {activeStage.title}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-green-950">{currentRound.prompt}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-green-800/80">{currentRound.clientContext}</p>
                </div>

                <div className="space-y-3 p-5">
                  {currentRound.decisions.map((decision) => {
                    const isSelected = selectedDecisionId === decision.id;
                    const showBest = Boolean(selectedDecisionId) && decision.isBest;

                    return (
                      <button
                        key={decision.id}
                        type="button"
                        onClick={() => handleDecision(decision.id)}
                        disabled={Boolean(selectedDecisionId)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all ${
                          isSelected && decision.isBest
                            ? 'border-emerald-400 bg-emerald-50'
                            : isSelected
                              ? 'border-amber-300 bg-amber-50'
                              : showBest
                                ? 'border-emerald-300 bg-emerald-50'
                                : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-bold text-slate-900">{decision.label}</p>
                          {isSelected && decision.isBest && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                          {!isSelected && showBest && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })}

                  {selectedDecision && (
                    <div className={`rounded-2xl border p-4 ${
                      selectedDecision.isBest
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-amber-200 bg-amber-50 text-amber-900'
                    }`}>
                      <p className="text-sm font-medium">{selectedDecision.result}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleNextRound}
                    disabled={!selectedDecisionId}
                    className="w-full bg-green-700 text-white hover:bg-green-800"
                  >
                    {roundIndex < activeStage.rounds.length - 1 ? 'Next Decision' : 'Complete Stage'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-emerald-50 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
                  <Crown className="h-9 w-9" />
                </div>
                <Badge className="bg-amber-500 text-white hover:bg-amber-500">
                  {activeStage.title} Complete
                </Badge>
                <h3 className="mt-4 text-2xl font-black text-green-950">{activeStage.unlockSummary}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-green-800/80">
                  You chose the strongest response {bestDecisionCount} out of {activeStage.rounds.length} times.
                  The next title unlocks when this stage is complete.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button variant="outline" onClick={() => resetStageRun()}>
                    Replay Stage
                  </Button>
                  {activeStageIndex < wealthManagementCareerStages.length - 1 ? (
                    <Button
                      onClick={() => resetStageRun(wealthManagementCareerStages[activeStageIndex + 1].id)}
                      className="bg-green-700 text-white hover:bg-green-800"
                    >
                      Next Title
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={onBack} className="bg-green-700 text-white hover:bg-green-800">
                      Finish Simulator
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default WealthManagementCareerSimulator;
