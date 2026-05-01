import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Lock, Sparkles, Trophy, Zap } from 'lucide-react';
import CourseDetailView from '@/components/softskills/CourseDetailView';
import { useSoftSkillsProgress } from '@/hooks/useSoftSkillsProgress';

interface SkillCourse {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tagline: string;
  moduleCount: number;
  duration: number;
  category: string;
  difficulty_level: string;
  gradient: string;
  accentColor: string;
  tag: string;
}

const SKILL_COURSES: SkillCourse[] = [
  {
    id: 'interviewing-mastery',
    title: 'Professional Interviewing Mastery',
    description: 'Land the job, internship, or opportunity you deserve.',
    emoji: '🎯',
    tagline: 'Walk in confident. Walk out hired.',
    moduleCount: 6,
    duration: 45,
    category: 'interviewing',
    difficulty_level: 'beginner',
    gradient: 'from-blue-500 via-indigo-500 to-violet-600',
    accentColor: 'blue',
    tag: 'Most Popular',
  },
  {
    id: 'networking-pro',
    title: 'Networking Like a Pro',
    description: 'Build real relationships that open real doors.',
    emoji: '🤝',
    tagline: 'Your network is your net worth.',
    moduleCount: 6,
    duration: 40,
    category: 'networking',
    difficulty_level: 'beginner',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accentColor: 'emerald',
    tag: 'High Impact',
  },
  {
    id: 'business-communication',
    title: 'Business Communication Excellence',
    description: 'Master emails, meetings, and professional conversations.',
    emoji: '✉️',
    tagline: 'Say the right thing, every time.',
    moduleCount: 6,
    duration: 35,
    category: 'professional_communication',
    difficulty_level: 'beginner',
    gradient: 'from-purple-500 via-violet-500 to-fuchsia-600',
    accentColor: 'purple',
    tag: 'Career Essential',
  },
  {
    id: 'dress-for-success',
    title: 'Dress for Success',
    description: 'Project confidence before you say a single word.',
    emoji: '👔',
    tagline: 'Look the part. Get the part.',
    moduleCount: 6,
    duration: 30,
    category: 'business_attire',
    difficulty_level: 'beginner',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    accentColor: 'amber',
    tag: 'First Impression',
  },
  {
    id: 'workplace-etiquette',
    title: 'Workplace Etiquette',
    description: 'Learn the unwritten rules that shape every career.',
    emoji: '🏢',
    tagline: 'Know the rules before you need them.',
    moduleCount: 6,
    duration: 35,
    category: 'workplace_etiquette',
    difficulty_level: 'beginner',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    accentColor: 'pink',
    tag: 'Office Ready',
  },
  {
    id: 'working-women',
    title: 'Working Women Excellence',
    description: 'Navigate the workplace with strategy and confidence.',
    emoji: '💪',
    tagline: 'Navigate, rise, and lead.',
    moduleCount: 5,
    duration: 40,
    category: 'diversity_inclusion',
    difficulty_level: 'intermediate',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-600',
    accentColor: 'fuchsia',
    tag: 'Leadership',
  },
  {
    id: 'black-in-business',
    title: 'Black in Business Excellence',
    description: 'Own your space. Build your legacy. Lead with purpose.',
    emoji: '✊',
    tagline: 'Own your space. Build your legacy.',
    moduleCount: 5,
    duration: 40,
    category: 'diversity_inclusion',
    difficulty_level: 'intermediate',
    gradient: 'from-orange-500 via-amber-500 to-yellow-500',
    accentColor: 'orange',
    tag: 'Legacy Builder',
  },
];

const COURSE_KEY_MAP: Record<string, string> = {
  'interviewing-mastery': 'interviewing',
  'networking-pro': 'networking',
  'business-communication': 'business_communication',
  'dress-for-success': 'business_attire',
  'workplace-etiquette': 'workplace_etiquette',
  'working-women': 'working_women',
  'black-in-business': 'black_business',
};

const accentClasses: Record<string, { border: string; badge: string; button: string; progress: string }> = {
  blue:    { border: 'border-blue-200 dark:border-blue-800',    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',    button: 'bg-blue-600 hover:bg-blue-700',    progress: '[&>div]:bg-blue-500' },
  emerald: { border: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300', button: 'bg-emerald-600 hover:bg-emerald-700', progress: '[&>div]:bg-emerald-500' },
  purple:  { border: 'border-purple-200 dark:border-purple-800',  badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',  button: 'bg-purple-600 hover:bg-purple-700',  progress: '[&>div]:bg-purple-500' },
  amber:   { border: 'border-amber-200 dark:border-amber-800',   badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',   button: 'bg-amber-600 hover:bg-amber-700',   progress: '[&>div]:bg-amber-500' },
  pink:    { border: 'border-pink-200 dark:border-pink-800',     badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',     button: 'bg-pink-600 hover:bg-pink-700',     progress: '[&>div]:bg-pink-500' },
  fuchsia: { border: 'border-fuchsia-200 dark:border-fuchsia-800', badge: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300', button: 'bg-fuchsia-600 hover:bg-fuchsia-700', progress: '[&>div]:bg-fuchsia-500' },
  orange:  { border: 'border-orange-200 dark:border-orange-800',  badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',  button: 'bg-orange-600 hover:bg-orange-700',  progress: '[&>div]:bg-orange-500' },
};

const SoftSkillsTab: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<SkillCourse | null>(null);
  const { getCourseProgress } = useSoftSkillsProgress();

  const getCourseProgressData = (courseId: string) => {
    const key = COURSE_KEY_MAP[courseId];
    if (!key) return { progress: 0, hasStarted: false, isCompleted: false };
    const data = getCourseProgress(key);
    const progress = data?.overallProgress ?? 0;
    return { progress, hasStarted: progress > 0, isCompleted: progress >= 100 };
  };

  const buildCourseObj = (course: SkillCourse) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    difficulty_level: course.difficulty_level,
    estimated_duration: course.duration,
  });

  if (selectedCourse) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <CourseDetailView
            course={buildCourseObj(selectedCourse)}
            onBack={() => setSelectedCourse(null)}
          />
        </motion.div>
      </AnimatePresence>
    );
  }

  const totalCompleted = SKILL_COURSES.filter(c => getCourseProgressData(c.id).isCompleted).length;
  const totalStarted = SKILL_COURSES.filter(c => getCourseProgressData(c.id).hasStarted).length;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 pb-6"
      >
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 py-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">Soft Skills Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Level Up Your Career Game</h1>
            <p className="text-slate-300 text-sm sm:text-base mb-5 max-w-lg">
              Master the skills employers notice before you say a word. These are the moves that separate good candidates from unforgettable ones.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">{totalCompleted}/{SKILL_COURSES.length} completed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium">{totalStarted} in progress</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        {totalStarted > 0 && (
          <div className="bg-card border rounded-xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Overall Journey</span>
              <span className="text-sm text-muted-foreground">{totalCompleted} of {SKILL_COURSES.length} courses</span>
            </div>
            <Progress value={(totalCompleted / SKILL_COURSES.length) * 100} className="h-2.5" />
          </div>
        )}

        {/* Course Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_COURSES.map((course, index) => {
            const { progress, hasStarted, isCompleted } = getCourseProgressData(course.id);
            const accent = accentClasses[course.accentColor] || accentClasses.blue;

            return (
              <motion.button
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                onClick={() => setSelectedCourse(course)}
                className={`group text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] ${accent.border} bg-card w-full`}
              >
                {/* Card Header Gradient */}
                <div className={`bg-gradient-to-br ${course.gradient} p-5 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-4 translate-x-4" />
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <span className="text-4xl leading-none">{course.emoji}</span>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-xs font-bold text-white/90 bg-white/20 rounded-full px-2.5 py-0.5">
                        {course.tag}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base leading-tight relative z-10">{course.title}</h3>
                  <p className="text-white/75 text-xs mt-1 relative z-10 italic">"{course.tagline}"</p>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${accent.badge}`}>
                        {course.moduleCount} modules
                      </span>
                      <span className="text-xs text-muted-foreground py-0.5">~{course.duration} min</span>
                    </div>
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                        Complete ✓
                      </Badge>
                    )}
                    {hasStarted && !isCompleted && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-xs">
                        In Progress
                      </Badge>
                    )}
                  </div>

                  {hasStarted && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className={`h-1.5 ${accent.progress}`} />
                    </div>
                  )}

                  <div className={`flex items-center justify-between pt-1 text-sm font-semibold text-white rounded-lg px-3 py-2.5 bg-gradient-to-r ${course.gradient} group-hover:opacity-95 transition-opacity`}>
                    <span>
                      {isCompleted ? 'Review Course' : hasStarted ? 'Continue' : 'Start Course'}
                    </span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom motivational note */}
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Each course earns you XP and brings you one step closer to Phil's Pro status. 🐼
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SoftSkillsTab;
