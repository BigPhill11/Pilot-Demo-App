import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EconomicsTrackSection } from '../economics';
import EconomicsLessonContainer from '../economics/EconomicsLessonContainer';
import { useBusinessFoundationsProgress } from '@/hooks/useBusinessFoundationsProgress';
import { businessFoundationsUnits } from '@/data/market-intelligence/ap-business-foundations';
import { EconomicsLesson, EconomicsUnit, EconomicsTrack } from '@/types/economics-curriculum';

const TRACK: EconomicsTrack = 'business-foundations';

/**
 * Business Foundations — Marketing and Management & Strategy.
 */
const BusinessFoundationsView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: EconomicsLesson;
    unit: EconomicsUnit;
  } | null>(null);

  const {
    getUnitStatus,
    getUnitProgress,
    startUnit,
    completeLesson,
    totalXpEarned,
    totalBambooEarned,
    totalProgress,
  } = useBusinessFoundationsProgress();

  const handleSelectLesson = (unitId: string, lessonId: string) => {
    const unit = businessFoundationsUnits.find((u) => u.id === unitId);
    if (!unit) return;
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    setSelectedLesson({ lesson, unit });
  };

  const handleLessonComplete = (xp: number, bamboo: number) => {
    if (!selectedLesson) return;
    completeLesson(
      selectedLesson.unit.id,
      selectedLesson.lesson.id,
      xp,
      bamboo,
      selectedLesson.unit.lessons.length
    );
    setSelectedLesson(null);
  };

  const wrapGetUnitStatus = useCallback(
    (unitId: string, _track: EconomicsTrack, previousUnitId?: string) =>
      getUnitStatus(unitId, previousUnitId),
    [getUnitStatus]
  );

  const wrapGetUnitProgress = useCallback(
    (unitId: string, _track: EconomicsTrack) => getUnitProgress(unitId),
    [getUnitProgress]
  );

  if (selectedLesson) {
    return (
      <EconomicsLessonContainer
        lesson={selectedLesson.lesson}
        unitId={selectedLesson.unit.id}
        track={TRACK}
        onComplete={handleLessonComplete}
        onExit={() => setSelectedLesson(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-50 via-purple-50 to-emerald-50 border border-violet-200 shadow-sm">
        <div className="flex items-center gap-2 px-4 py-2 bg-violet-100/60 border-b border-violet-200">
          <span className="text-violet-800 text-sm font-medium">Business Foundations</span>
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-violet-100 border border-violet-200">
              <span className="text-3xl">🧭</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-violet-900 mb-2">Business Foundations</h2>
              <p className="text-violet-800/80 max-w-2xl">
                Marketing and management strategy — how companies reach customers, set goals,
                and compete over time.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge variant="outline" className="bg-violet-50 text-violet-800 border-violet-300">
                  {totalProgress.completed}/{totalProgress.total} units
                </Badge>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                  ⭐ {totalXpEarned} XP
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  🎋 {totalBambooEarned} Bamboo
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EconomicsTrackSection
        track={TRACK}
        units={businessFoundationsUnits}
        getUnitStatus={wrapGetUnitStatus}
        getUnitProgress={wrapGetUnitProgress}
        onStartUnit={(unitId) => startUnit(unitId)}
        onSelectLesson={handleSelectLesson}
      />

      <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="text-lg font-bold text-violet-900">Practice in Company Tinder</h3>
              <p className="text-sm text-violet-700/80">
                Apply lifecycle and strategy ideas while swiping on real companies
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-violet-600/70">
            Open the Company Tinder tab after completing a unit lesson
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessFoundationsView;
