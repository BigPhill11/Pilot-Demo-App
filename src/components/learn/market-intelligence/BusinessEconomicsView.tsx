import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EconomicsTrackSection } from '../economics';
import EconomicsLessonContainer from '../economics/EconomicsLessonContainer';
import EconomicWeatherReport from './boss/EconomicWeatherReport';
import EconomicsSimulator from '../economics-sim/EconomicsSimulator';
import { useEconomicsProgress } from '@/hooks/useEconomicsProgress';
import { economicsUnits } from '@/data/economics-curriculum';
import { businessCompetitionUnits } from '@/data/market-intelligence/ap-business-curriculum';

const allEconomicsUnits = [...economicsUnits, ...businessCompetitionUnits];
import { getSimulatorIdByUnitId } from '@/data/economics-simulators';
import { EconomicsTrack, EconomicsLesson, EconomicsUnit } from '@/types/economics-curriculum';
import { EconomicsSimulatorId } from '@/types/economics-sim';
import { ThemedEmoji } from '@/components/ui/themed-icons';

/**
 * Business Economics View
 * 
 * Themed as a "business window" with professional corporate styling.
 * Covers micro and macro economics fundamentals using the new curriculum structure.
 */
const BusinessEconomicsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EconomicsTrack>('microeconomics');
  const [bossActive, setBossActive] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: EconomicsLesson;
    unit: EconomicsUnit;
  } | null>(null);

  const [unitSimulator, setUnitSimulator] = useState<{
    unitId: string;
    track: EconomicsTrack;
    simulatorId: EconomicsSimulatorId;
  } | null>(null);
  
  const {
    getUnitStatus,
    getUnitProgress,
    startUnit,
    completeLesson,
    completeGamifiedActivity,
    totalProgress,
    totalXpEarned,
    totalBambooEarned,
  } = useEconomicsProgress();

  const handleOpenSimulator = useCallback((unitId: string, track: EconomicsTrack) => {
    const simulatorId = getSimulatorIdByUnitId(unitId);
    if (!simulatorId) return;
    startUnit(unitId, track);
    setUnitSimulator({ unitId, track, simulatorId });
  }, [startUnit]);

  const handleSimulatorComplete = useCallback(
    (result: { ending: string; bambooEarned: number; xpEarned: number }) => {
      if (!unitSimulator) return;
      const unit = allEconomicsUnits.find((u) => u.id === unitSimulator.unitId);
      const progress = getUnitProgress(unitSimulator.unitId, unitSimulator.track);
      if (unit && !progress?.gamifiedActivityCompleted) {
        completeGamifiedActivity(
          unitSimulator.unitId,
          unitSimulator.track,
          result.xpEarned,
          result.bambooEarned,
          unit.lessons.length
        );
      }
      setUnitSimulator(null);
    },
    [unitSimulator, completeGamifiedActivity, getUnitProgress]
  );

  const microUnits = allEconomicsUnits.filter(u => u.track === 'microeconomics');
  const macroUnits = allEconomicsUnits.filter(u => u.track === 'macroeconomics');
  const bizCompUnits = allEconomicsUnits.filter(u => u.track === 'businesses-competition');

  const handleSelectLesson = (unitId: string, lessonId: string) => {
    const unit = allEconomicsUnits.find(u => u.id === unitId);
    if (!unit) return;
    
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    setSelectedLesson({ lesson, unit });
  };

  const handleLessonComplete = (xp: number, bamboo: number) => {
    if (!selectedLesson) return;
    
    completeLesson(
      selectedLesson.unit.id,
      selectedLesson.lesson.id,
      selectedLesson.unit.track,
      xp,
      bamboo,
      selectedLesson.unit.lessons.length
    );
    
    setSelectedLesson(null);
  };

  const handleExitLesson = () => {
    setSelectedLesson(null);
  };

  if (bossActive) {
    return (
      <EconomicWeatherReport
        onComplete={() => setBossActive(false)}
        onExit={() => setBossActive(false)}
      />
    );
  }

  if (unitSimulator) {
    return (
      <EconomicsSimulator
        simulatorId={unitSimulator.simulatorId}
        onBack={() => setUnitSimulator(null)}
        onComplete={handleSimulatorComplete}
      />
    );
  }

  if (selectedLesson) {
    return (
      <EconomicsLessonContainer
        lesson={selectedLesson.lesson}
        unitId={selectedLesson.unit.id}
        track={selectedLesson.unit.track}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header - Light sage/emerald theme */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-green-200 shadow-sm">
        {/* Subtle window accent */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100/60 border-b border-green-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          </div>
          <span className="text-green-700 text-sm font-medium ml-2">Business Economics</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-200">
              <span className="text-3xl"><ThemedEmoji emoji="📊" className="h-[1em] w-[1em]" /></span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Business Economics</h2>
              <p className="text-green-700/80 max-w-2xl">
                The "how the world works" foundation. Understand supply and demand, market structures, 
                economic cycles, and how interest rates and inflation affect everything.
              </p>
              
              {/* Progress Summary */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  🔬 Micro: {totalProgress.microeconomics}/{microUnits.length} units
                </Badge>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-300">
                  🌍 Macro: {totalProgress.macroeconomics}/{macroUnits.length} units
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                  <ThemedEmoji emoji="🏢" className="h-[1em] w-[1em]" /> Biz & Comp: {totalProgress.businessesCompetition}/{bizCompUnits.length} units
                </Badge>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                  <ThemedEmoji emoji="⭐" className="h-[1em] w-[1em]" /> {totalXpEarned} XP earned
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  <ThemedEmoji emoji="🎋" className="h-[1em] w-[1em]" /> {totalBambooEarned} Bamboo
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EconomicsTrack)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-green-50 border border-green-200 h-auto">
          <TabsTrigger 
            value="microeconomics" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm text-xs sm:text-sm py-2"
          >
            <span className="mr-1 sm:mr-2">🔬</span>
            <span className="hidden sm:inline">Microeconomics</span>
            <span className="sm:hidden">Micro</span>
          </TabsTrigger>
          <TabsTrigger 
            value="macroeconomics"
            className="data-[state=active]:bg-white data-[state=active]:text-teal-800 data-[state=active]:shadow-sm text-xs sm:text-sm py-2"
          >
            <span className="mr-1 sm:mr-2">🌍</span>
            <span className="hidden sm:inline">Macroeconomics</span>
            <span className="sm:hidden">Macro</span>
          </TabsTrigger>
          <TabsTrigger 
            value="businesses-competition"
            className="data-[state=active]:bg-white data-[state=active]:text-amber-900 data-[state=active]:shadow-sm text-xs sm:text-sm py-2"
          >
            <span className="mr-1 sm:mr-2"><ThemedEmoji emoji="🏢" className="h-[1em] w-[1em]" /></span>
            <span className="hidden sm:inline">Businesses & Competition</span>
            <span className="sm:hidden">Biz & Comp</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="microeconomics" className="mt-4">
          <EconomicsTrackSection
            track="microeconomics"
            units={allEconomicsUnits}
            getUnitStatus={getUnitStatus}
            getUnitProgress={getUnitProgress}
            onStartUnit={(unitId, track) => startUnit(unitId, track)}
            onSelectLesson={handleSelectLesson}
            onOpenSimulator={handleOpenSimulator}
          />
        </TabsContent>

        <TabsContent value="macroeconomics" className="mt-4">
          <EconomicsTrackSection
            track="macroeconomics"
            units={allEconomicsUnits}
            getUnitStatus={getUnitStatus}
            getUnitProgress={getUnitProgress}
            onStartUnit={(unitId, track) => startUnit(unitId, track)}
            onSelectLesson={handleSelectLesson}
            onOpenSimulator={handleOpenSimulator}
          />
        </TabsContent>

        <TabsContent value="businesses-competition" className="mt-4">
          <EconomicsTrackSection
            track="businesses-competition"
            units={allEconomicsUnits}
            getUnitStatus={getUnitStatus}
            getUnitProgress={getUnitProgress}
            onStartUnit={(unitId, track) => startUnit(unitId, track)}
            onSelectLesson={handleSelectLesson}
          />
        </TabsContent>
      </Tabs>

      {/* Boss Game */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌤️</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800">Boss Game: Phil's Economic Weather Report</h3>
              <p className="text-sm text-green-600/80">React to economic news — pick the forecast and the winning sector.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700 font-medium">+100 🎋 +25 XP on first clear</span>
            <button
              className="text-xs px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              onClick={() => setBossActive(true)}
            >
              ▶ Play
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEconomicsView;



