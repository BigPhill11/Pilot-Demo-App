import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Check,
  ClipboardCopy,
  Flame,
  Layers,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { ClassSummary } from '@/lib/teacherMetrics';
import type { TeacherClassroomSummary } from '@/integrations/supabase/teacherTypes';

interface ClassPulseHeaderProps {
  classroom: TeacherClassroomSummary;
  summary: ClassSummary;
  loading?: boolean;
}

const ClassPulseHeader: React.FC<ClassPulseHeaderProps> = ({ classroom, summary, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(classroom.join_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy the code.');
    }
  };

  const tiles = [
    {
      key: 'students',
      icon: Users,
      label: 'Students',
      value: summary.studentCount,
      tone: 'from-emerald-500/10 to-primary/5 border-emerald-500/20 text-emerald-600',
    },
    {
      key: 'active',
      icon: TrendingUp,
      label: 'Active this week',
      value: summary.activeLast7,
      tone: 'from-sky-500/10 to-sky-400/5 border-sky-500/20 text-sky-600',
    },
    {
      key: 'modules',
      icon: Layers,
      label: 'Avg modules done',
      value: summary.avgModulesCompleted,
      tone: 'from-violet-500/10 to-violet-400/5 border-violet-500/20 text-violet-600',
    },
    {
      key: 'streak',
      icon: Flame,
      label: 'Avg streak',
      value: summary.avgStreak,
      tone: 'from-orange-500/10 to-amber-400/5 border-orange-400/30 text-orange-500',
    },
    {
      key: 'attention',
      icon: TriangleAlert,
      label: 'Need attention',
      value: summary.needsAttention,
      tone: 'from-rose-500/10 to-rose-400/5 border-rose-400/30 text-rose-500',
    },
    {
      key: 'xp',
      icon: Sparkles,
      label: 'Class XP',
      value: summary.totalXp.toLocaleString(),
      tone: 'from-amber-500/10 to-yellow-400/5 border-amber-400/30 text-amber-500',
    },
  ];

  return (
    <section className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white">
        {/* Soft decorative wash, same treatment as the student hero. */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {classroom.school_name && (
                <Badge className="border-white/25 bg-white/15 text-white hover:bg-white/20">
                  {classroom.school_name}
                </Badge>
              )}
              {classroom.term && (
                <Badge className="border-white/25 bg-white/15 text-white hover:bg-white/20">
                  {classroom.term}
                </Badge>
              )}
              {!classroom.is_active && (
                <Badge className="border-white/25 bg-white/15 text-white">Archived</Badge>
              )}
            </div>
            <h1 className="truncate text-2xl font-bold md:text-3xl">{classroom.name}</h1>
            <p className="mt-1 text-sm text-white/70">
              {summary.studentCount === 0
                ? 'No students yet — share the code below to get started.'
                : `${summary.activeLast7} of ${summary.studentCount} students active in the last 7 days`}
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm">
            <p className="mb-1 text-xs uppercase tracking-wide text-white/60">Class code</p>
            <p className="font-mono text-2xl font-bold tracking-[0.15em]">{classroom.join_code}</p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-3 w-full bg-white/90 text-emerald-900 hover:bg-white"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <ClipboardCopy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              className={cn(
                'rounded-xl border bg-gradient-to-br p-4 text-center',
                tile.tone.replace(/text-\S+/, '')
              )}
            >
              <Icon className={cn('mx-auto mb-2 h-5 w-5', tile.tone.match(/text-\S+/)?.[0])} />
              <div className="text-2xl font-bold text-foreground">
                {loading ? '—' : tile.value}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{tile.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ClassPulseHeader;
