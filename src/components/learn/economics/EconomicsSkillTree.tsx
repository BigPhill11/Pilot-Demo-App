/**
 * Economics Skill Tree
 * 
 * Displays a visual skill tree for the Economics curriculum with two parallel tracks:
 * - Microeconomics (left branch)
 * - Macroeconomics (right branch)
 * 
 * Each unit is displayed as a node that can be locked, unlocked, active, or completed.
 * Units unlock progressively based on completion of previous units in the same track.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2, Play, ChevronRight } from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { EconomicsUnit, EconomicsTrack, UnitStatus } from '@/types/economics-curriculum';
import { useEconomicsProgress } from '@/hooks/useEconomicsProgress';

interface EconomicsSkillTreeProps {
  units: EconomicsUnit[];
  onSelectUnit: (unit: EconomicsUnit) => void;
}

const EconomicsSkillTree: React.FC<EconomicsSkillTreeProps> = ({
  units,
  onSelectUnit,
}) => {
  const {
    getUnitStatus,
    getUnitProgress,
    getTrackProgress,
    totalXpEarned,
    totalBambooEarned,
  } = useEconomicsProgress();

  const microUnits = units
    .filter(u => u.track === 'microeconomics')
    .sort((a, b) => a.order - b.order);
  
  const macroUnits = units
    .filter(u => u.track === 'macroeconomics')
    .sort((a, b) => a.order - b.order);

  const microProgress = getTrackProgress('microeconomics', microUnits.length);
  const macroProgress = getTrackProgress('macroeconomics', macroUnits.length);

  const getStatusForUnit = (unit: EconomicsUnit): UnitStatus => {
    return getUnitStatus(unit.id, unit.track, unit.unlockRequirements.previousUnitId);
  };

  const renderUnitNode = (unit: EconomicsUnit, index: number, track: EconomicsTrack) => {
    const status = getStatusForUnit(unit);
    const progress = getUnitProgress(unit.id, track);
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';
    const isActive = status === 'active';
    const lessonProgress = progress 
      ? Math.round((progress.completedLessons.length / unit.lessons.length) * 100)
      : 0;

    return (
      <div
        key={unit.id}
        className={`
          relative group cursor-pointer transition-all duration-200
          ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
        `}
        onClick={() => !isLocked && onSelectUnit(unit)}
      >
        <Card className={`
          border-2 transition-all
          ${isCompleted 
            ? 'border-emerald-400 bg-emerald-50/80' 
            : isActive 
              ? 'border-green-400 bg-green-50/80 shadow-md' 
              : isLocked 
                ? 'border-gray-200 bg-gray-50' 
                : 'border-green-200 bg-white hover:border-green-300 hover:shadow-md'
          }
        `}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {/* Unit Icon */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                ${isCompleted 
                  ? 'bg-emerald-100' 
                  : isActive 
                    ? 'bg-green-100' 
                    : isLocked 
                      ? 'bg-gray-100' 
                      : 'bg-green-50'
                }
              `}>
                {isLocked ? (
                  <Lock className="h-5 w-5 text-gray-400" />
                ) : isCompleted ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                ) : (
                  <span>{unit.icon}</span>
                )}
              </div>

              {/* Unit Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={`
                      text-xs
                      ${isCompleted 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : isActive
                          ? 'bg-green-50 border-green-300 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                      }
                    `}
                  >
                    Unit {unit.order}
                  </Badge>
                  {isActive && (
                    <Badge className="bg-green-500 text-white text-xs">
                      In Progress
                    </Badge>
                  )}
                </div>

                <h3 className={`
                  font-semibold text-sm mb-1
                  ${isLocked ? 'text-gray-400' : 'text-green-800'}
                `}>
                  {unit.title}
                </h3>

                <p className={`
                  text-xs line-clamp-2
                  ${isLocked ? 'text-gray-400' : 'text-green-600/70'}
                `}>
                  {unit.description}
                </p>

                {/* Progress bar for active/in-progress units */}
                {(isActive || (progress && progress.completedLessons.length > 0)) && !isCompleted && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-green-600 mb-1">
                      <span>{progress?.completedLessons.length || 0}/{unit.lessons.length} lessons</span>
                      <span>{lessonProgress}%</span>
                    </div>
                    <Progress value={lessonProgress} className="h-1.5 bg-green-100" />
                  </div>
                )}

                {/* Rewards preview */}
                {!isLocked && (
                  <div className="flex items-center gap-3 mt-2 text-xs text-green-600/60">
                    <span>🎋 {unit.rewards.bamboo}</span>
                    <span>⭐ {unit.rewards.xp} XP</span>
                  </div>
                )}
              </div>

              {/* Action indicator */}
              {!isLocked && !isCompleted && (
                <div className="flex-shrink-0 self-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    {isActive ? (
                      <Play className="h-4 w-4 text-green-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Connector line to next unit */}
        {index < (track === 'microeconomics' ? microUnits.length : macroUnits.length) - 1 && (
          <div className="flex justify-center py-2">
            <div className={`
              w-0.5 h-6 rounded-full
              ${isCompleted ? 'bg-emerald-300' : 'bg-gray-200'}
            `} />
          </div>
        )}
      </div>
    );
  };

  const renderTrackHeader = (
    title: string, 
    emoji: string, 
    progress: { completedUnits: number; totalUnits: number; percentage: number },
    colorClass: string
  ) => (
    <div className={`text-center mb-4 p-4 rounded-xl ${colorClass}`}>
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="font-bold text-green-800">{title}</h3>
      <p className="text-xs text-green-600/70 mb-2">
        {progress.completedUnits}/{progress.totalUnits} units complete
      </p>
      <Progress value={progress.percentage} className="h-2 bg-green-100" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Stats Header */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PandaLogo className="h-10 w-10" />
              <div>
                <h2 className="font-bold text-green-800">Economics Skill Tree</h2>
                <p className="text-sm text-green-600/70">Master micro and macro economics</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-green-800">🎋 {totalBambooEarned}</div>
                <div className="text-xs text-green-600/60">Bamboo</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-800">⭐ {totalXpEarned}</div>
                <div className="text-xs text-green-600/60">XP</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-column skill tree */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Microeconomics Track */}
        <div>
          {renderTrackHeader(
            'Microeconomics',
            '🔬',
            microProgress,
            'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
          )}
          <div className="space-y-0">
            {microUnits.map((unit, index) => renderUnitNode(unit, index, 'microeconomics'))}
          </div>
        </div>

        {/* Macroeconomics Track */}
        <div>
          {renderTrackHeader(
            'Macroeconomics',
            '🌍',
            macroProgress,
            'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
          )}
          <div className="space-y-0">
            {macroUnits.map((unit, index) => renderUnitNode(unit, index, 'macroeconomics'))}
          </div>
        </div>
      </div>

      {/* Phil's guidance */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <PandaLogo className="h-8 w-8 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
              <p className="text-sm text-green-600/80 italic">
                {microProgress.completedUnits === 0 && macroProgress.completedUnits === 0
                  ? "Welcome to Economics! Start with either Microeconomics (how individuals and businesses make decisions) or Macroeconomics (how the whole economy works). Both paths lead to financial wisdom!"
                  : microProgress.percentage === 100 && macroProgress.percentage === 100
                    ? "Incredible! You've mastered both tracks! You now understand how economies work from the smallest transaction to global markets. That's bamboo-level brilliance! 🎋"
                    : "Great progress! Keep exploring both tracks to see how micro and macro economics connect. Every concept builds on the last!"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomicsSkillTree;
