import React, { useMemo, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3x3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CURRICULUM_TRACKS } from '@/lib/teacherCurriculum';
import type { ModuleMatrixCell, RosterEntry } from '@/integrations/supabase/teacherTypes';

interface ModuleMatrixProps {
  roster: RosterEntry[];
  cells: ModuleMatrixCell[];
  loading?: boolean;
  onSelectStudent: (studentId: string) => void;
}

type CellState = 'complete' | 'progress' | 'none';

function cellState(percent: number | undefined): CellState {
  if (percent === undefined) return 'none';
  if (percent >= 100) return 'complete';
  if (percent > 0) return 'progress';
  return 'none';
}

const CELL_STYLES: Record<CellState, string> = {
  complete: 'bg-emerald-500 text-white',
  progress: 'bg-emerald-200 text-emerald-900',
  none: 'bg-muted/60 text-muted-foreground/50',
};

const ModuleMatrix: React.FC<ModuleMatrixProps> = ({
  roster,
  cells,
  loading,
  onSelectStudent,
}) => {
  const [activeType, setActiveType] = useState(CURRICULUM_TRACKS[0].moduleType);

  // Only show tracks that actually have data, so an unused area of the
  // curriculum does not present a teacher with a wall of empty cells.
  const availableTracks = useMemo(() => {
    const typesWithData = new Set(cells.map((c) => c.module_type));
    const withData = CURRICULUM_TRACKS.filter((t) => typesWithData.has(t.moduleType));
    return withData.length > 0 ? withData : [CURRICULUM_TRACKS[0]];
  }, [cells]);

  const track =
    availableTracks.find((t) => t.moduleType === activeType) ?? availableTracks[0];

  const lookup = useMemo(() => {
    const map = new Map<string, number>();
    for (const cell of cells) {
      if (cell.module_type !== track.moduleType) continue;
      map.set(`${cell.student_id}::${cell.module_id}`, cell.progress_percentage);
    }
    return map;
  }, [cells, track.moduleType]);

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <Grid3x3 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Module completion</h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={track.moduleType} onValueChange={setActiveType}>
            <TabsList>
              {availableTracks.map((t) => (
                <TabsTrigger key={t.moduleType} value={t.moduleType} className="text-xs">
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-emerald-500" /> Complete
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-emerald-200" /> Started
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-sm bg-muted/60" /> Not started
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="p-8 text-center text-sm text-muted-foreground">Loading progress…</p>
      ) : roster.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          The matrix fills in as students join and start modules.
        </p>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-card px-2 pb-2 text-left text-xs font-medium text-muted-foreground">
                  Student
                </th>
                {track.columns.map((col) => (
                  <th key={col.moduleId} className="pb-2" title={col.label}>
                    <span className="block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {col.shortLabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roster.map((student) => (
                <tr key={student.student_id}>
                  <td className="sticky left-0 z-10 bg-card pr-3">
                    <button
                      type="button"
                      onClick={() => onSelectStudent(student.student_id)}
                      className="max-w-[10rem] truncate text-left text-sm hover:text-primary hover:underline"
                    >
                      {student.username ?? 'Unnamed'}
                    </button>
                  </td>
                  {track.columns.map((col) => {
                    const percent = lookup.get(`${student.student_id}::${col.moduleId}`);
                    const state = cellState(percent);
                    return (
                      <td key={col.moduleId}>
                        <div
                          className={cn(
                            'mx-auto flex h-7 w-full min-w-[2rem] items-center justify-center rounded-md text-[10px] font-semibold',
                            CELL_STYLES[state]
                          )}
                          title={`${student.username ?? 'Unnamed'} · ${col.label}: ${percent ?? 0}%`}
                        >
                          {state === 'progress' ? `${percent}%` : ''}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ModuleMatrix;
