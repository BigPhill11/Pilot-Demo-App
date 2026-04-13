/**
 * Economics Unit View
 * 
 * Displays a single economics unit with:
 * - Unit overview and learning objectives
 * - List of lessons with completion status
 * - Personal finance connections
 * - Career exposure information
 * - Gamified activity
 * - Rewards summary
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  Briefcase,
  Link2,
  Gamepad2,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';
import { EconomicsUnit, EconomicsLesson } from '@/types/economics-curriculum';
import { useEconomicsProgress } from '@/hooks/useEconomicsProgress';

interface EconomicsUnitViewProps {
  unit: EconomicsUnit;
  onBack: () => void;
  onSelectLesson: (lesson: EconomicsLesson) => void;
  onStartActivity: () => void;
}

const EconomicsUnitView: React.FC<EconomicsUnitViewProps> = ({
  unit,
  onBack,
  onSelectLesson,
  onStartActivity,
}) => {
  const {
    getUnitProgress,
    isLessonCompleted,
    startUnit,
  } = useEconomicsProgress();

  const [activeTab, setActiveTab] = useState('lessons');

  const unitProgress = getUnitProgress(unit.id, unit.track);
  const completedLessons = unitProgress?.completedLessons || [];
  const progressPercent = Math.round((completedLessons.length / unit.lessons.length) * 100);
  const isActivityCompleted = unitProgress?.gamifiedActivityCompleted || false;

  const handleStartUnit = () => {
    startUnit(unit.id, unit.track);
  };

  const getNextLesson = (): EconomicsLesson | null => {
    for (const lesson of unit.lessons) {
      if (!completedLessons.includes(lesson.id)) {
        return lesson;
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50/50 to-teal-50/30">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-4 w-2 h-48 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
        <div className="absolute top-0 right-4 w-2 h-44 bg-gradient-to-b from-green-300/20 to-green-500/10 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Skill Tree
        </Button>

        {/* Unit Header Card */}
        <Card className="border-green-200 bg-white/90 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center text-3xl shadow-sm">
                {unit.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="outline" 
                    className="bg-white/60 border-green-300 text-green-700"
                  >
                    {unit.track === 'microeconomics' ? '🔬 Microeconomics' : '🌍 Macroeconomics'}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-white/60 border-green-300 text-green-700"
                  >
                    Unit {unit.order}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">{unit.title}</h1>
                <p className="text-green-600/80">{unit.description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-green-700 mb-2">
                <span>{completedLessons.length}/{unit.lessons.length} lessons complete</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2 bg-green-200" />
            </div>
          </div>

          {/* Quick stats */}
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <BookOpen className="h-4 w-4" />
                  <span>{unit.lessons.length} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Clock className="h-4 w-4" />
                  <span>~{unit.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0)} min</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-green-600">🎋 {unit.rewards.bamboo}</span>
                <span className="text-green-600">⭐ {unit.rewards.xp} XP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue/Start Button */}
        {nextLesson && (
          <Card className="border-emerald-300 bg-emerald-50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Play className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-600">
                      {completedLessons.length === 0 ? 'Start with' : 'Continue with'}
                    </p>
                    <p className="font-semibold text-emerald-800">{nextLesson.title}</p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (completedLessons.length === 0) handleStartUnit();
                    onSelectLesson(nextLesson);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {completedLessons.length === 0 ? 'Start' : 'Continue'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs for different content sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-green-100">
            <TabsTrigger value="lessons" className="data-[state=active]:bg-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="connections" className="data-[state=active]:bg-white">
              <Link2 className="h-4 w-4 mr-2" />
              Connections
            </TabsTrigger>
            <TabsTrigger value="careers" className="data-[state=active]:bg-white">
              <Briefcase className="h-4 w-4 mr-2" />
              Careers
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-white">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-3">
            {unit.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isNext = nextLesson?.id === lesson.id;
              const isLocked = !isCompleted && !isNext && index > completedLessons.length;

              return (
                <Card
                  key={lesson.id}
                  className={`
                    border-green-200 transition-all cursor-pointer
                    ${isCompleted 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : isNext 
                        ? 'bg-white hover:shadow-md border-green-300' 
                        : isLocked 
                          ? 'bg-gray-50 opacity-60 cursor-not-allowed' 
                          : 'bg-white hover:shadow-md'
                    }
                  `}
                  onClick={() => !isLocked && onSelectLesson(lesson)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${isCompleted 
                          ? 'bg-emerald-100 text-emerald-600' 
                          : isLocked 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-green-100 text-green-600'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isLocked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <span className="font-semibold">{index + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold ${isLocked ? 'text-gray-400' : 'text-green-800'}`}>
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-green-600/60 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.estimatedMinutes} min
                          </span>
                          <span>{lesson.coreConcepts.length} concepts</span>
                          <span>{lesson.flashcards.length} flashcards</span>
                        </div>
                      </div>

                      {isNext && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Start
                        </Button>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                          Complete
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-4">
            {/* Personal Finance Connection */}
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <h3 className="font-semibold text-green-800">Personal Finance Connection</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-600/80 mb-3">{unit.personalFinanceConnection.description}</p>
                <div className="flex flex-wrap gap-2">
                  {unit.personalFinanceConnection.relatedPFModules.map((module, i) => (
                    <Badge key={i} variant="outline" className="bg-green-50 border-green-200 text-green-700">
                      {module}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investing Connection */}
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  <h3 className="font-semibold text-green-800">Investing Connection</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {unit.investingConnection.map((connection, i) => (
                    <li key={i} className="flex items-start gap-2 text-green-600/80">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                      <span>{connection}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Core Concepts */}
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-semibold text-green-800">Core Concepts You'll Learn</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {unit.coreEconomicsConcepts.map((concept, i) => (
                    <Badge key={i} className="bg-green-100 text-green-700 border-green-200">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-4">
            {unit.careerExposure.map((career, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 mb-1">{career.title}</h3>
                      <p className="text-sm text-green-600/80 mb-3">{career.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                          💵 {career.salaryRange}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {career.skills.map((skill, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="text-xs bg-green-50 border-green-200 text-green-600"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className={`
              border-2 transition-all
              ${isActivityCompleted 
                ? 'border-emerald-300 bg-emerald-50' 
                : progressPercent === 100 
                  ? 'border-green-300 bg-white' 
                  : 'border-gray-200 bg-gray-50'
              }
            `}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4">
                    {isActivityCompleted ? (
                      <Trophy className="h-8 w-8 text-emerald-600" />
                    ) : (
                      <Gamepad2 className="h-8 w-8 text-green-600" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {unit.gamifiedActivity.title}
                  </h3>
                  <p className="text-green-600/80 mb-4 max-w-md mx-auto">
                    {unit.gamifiedActivity.description}
                  </p>

                  {progressPercent < 100 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-yellow-700">
                        <Lock className="h-4 w-4 inline mr-2" />
                        Complete all lessons to unlock this activity
                      </p>
                    </div>
                  ) : isActivityCompleted ? (
                    <div className="bg-emerald-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-emerald-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 inline mr-2" />
                        Activity Completed!
                      </p>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-800">🎋 {unit.gamifiedActivity.rewards.bamboo}</div>
                      <div className="text-xs text-green-600/60">Bamboo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-800">⭐ {unit.gamifiedActivity.rewards.xp}</div>
                      <div className="text-xs text-green-600/60">XP</div>
                    </div>
                  </div>

                  <Button
                    onClick={onStartActivity}
                    disabled={progressPercent < 100 || isActivityCompleted}
                    className={`
                      ${isActivityCompleted 
                        ? 'bg-emerald-200 text-emerald-700' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }
                    `}
                  >
                    {isActivityCompleted ? 'Completed' : 'Start Activity'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Phil's tip */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <PandaLogo className="h-8 w-8 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Phil says:</p>
                <p className="text-sm text-green-600/80 italic">
                  {progressPercent === 0
                    ? `Ready to learn about ${unit.title}? Each lesson builds on the last, so take your time and really understand the concepts. I'll be here to help with fun analogies!`
                    : progressPercent === 100 && !isActivityCompleted
                      ? "Amazing work completing all the lessons! Now it's time to put your knowledge to the test with the gamified activity. You've got this!"
                      : progressPercent === 100 && isActivityCompleted
                        ? `You've mastered ${unit.title}! The concepts you learned here will help you understand how the economy really works. On to the next unit!`
                        : "You're making great progress! Remember, economics is all about understanding how people make decisions. Keep going!"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EconomicsUnitView;
