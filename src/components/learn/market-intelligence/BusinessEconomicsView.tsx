import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EconomicsTrackSection } from '../economics';
import EconomicsLessonContainer from '../economics/EconomicsLessonContainer';
import { useEconomicsProgress } from '@/hooks/useEconomicsProgress';
import { economicsUnits } from '@/data/economics-curriculum';
import { EconomicsTrack, EconomicsLesson, EconomicsUnit } from '@/types/economics-curriculum';

/**
 * Business Economics View
 * 
 * Themed as a "business window" with professional corporate styling.
 * Covers micro and macro economics fundamentals using the new curriculum structure.
 */
const BusinessEconomicsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EconomicsTrack>('microeconomics');
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: EconomicsLesson;
    unit: EconomicsUnit;
  } | null>(null);
  
  const {
    getUnitStatus,
    getUnitProgress,
    startUnit,
    completeLesson,
    totalProgress,
    totalXpEarned,
    totalBambooEarned,
  } = useEconomicsProgress();

  const microUnits = economicsUnits.filter(u => u.track === 'microeconomics');
  const macroUnits = economicsUnits.filter(u => u.track === 'macroeconomics');

  const handleSelectLesson = (unitId: string, lessonId: string) => {
    const unit = economicsUnits.find(u => u.id === unitId);
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
              <span className="text-3xl">📊</span>
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
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                  ⭐ {totalXpEarned} XP earned
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  🎋 {totalBambooEarned} Bamboo
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as EconomicsTrack)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-green-50 border border-green-200">
          <TabsTrigger 
            value="microeconomics" 
            className="data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
          >
            <span className="mr-2">🔬</span>
            Microeconomics
          </TabsTrigger>
          <TabsTrigger 
            value="macroeconomics"
            className="data-[state=active]:bg-white data-[state=active]:text-teal-800 data-[state=active]:shadow-sm"
          >
            <span className="mr-2">🌍</span>
            Macroeconomics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="microeconomics" className="mt-4">
          <EconomicsTrackSection
            track="microeconomics"
            units={economicsUnits}
            getUnitStatus={getUnitStatus}
            getUnitProgress={getUnitProgress}
            onStartUnit={(unitId, track) => startUnit(unitId, track)}
            onSelectLesson={handleSelectLesson}
          />
        </TabsContent>

        <TabsContent value="macroeconomics" className="mt-4">
          <EconomicsTrackSection
            track="macroeconomics"
            units={economicsUnits}
            getUnitStatus={getUnitStatus}
            getUnitProgress={getUnitProgress}
            onStartUnit={(unitId, track) => startUnit(unitId, track)}
            onSelectLesson={handleSelectLesson}
          />
        </TabsContent>
      </Tabs>

      {/* Boss Game Preview */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌤️</span>
            <div>
              <h3 className="text-lg font-bold text-green-800">Boss Game: Phil's Economic Weather Report</h3>
              <p className="text-sm text-green-600/80">React to economic news and predict their market impact</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600/70">Complete all units to unlock</span>
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 border border-green-200">Planned</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessEconomicsView;



