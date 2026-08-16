import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, ArrowUp, ChevronsUpDown, Download, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RosterEntry } from '@/integrations/supabase/teacherTypes';
import {
  STATUS_META,
  downloadCsv,
  formatLastActive,
  rosterToCsv,
  studentStatus,
} from '@/lib/teacherMetrics';

type SortKey =
  | 'username'
  | 'last_login_date'
  | 'current_streak'
  | 'modules_completed'
  | 'avg_progress'
  | 'total_points';

interface RosterTableProps {
  roster: RosterEntry[];
  loading?: boolean;
  className: string;
  onSelectStudent: (studentId: string) => void;
}

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: 'username', label: 'Student' },
  { key: 'last_login_date', label: 'Last active' },
  { key: 'current_streak', label: 'Streak', numeric: true },
  { key: 'modules_completed', label: 'Modules done', numeric: true },
  { key: 'avg_progress', label: 'Avg progress', numeric: true },
  { key: 'total_points', label: 'XP', numeric: true },
];

const RosterTable: React.FC<RosterTableProps> = ({
  roster,
  loading,
  className,
  onSelectStudent,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('username');
  const [ascending, setAscending] = useState(true);
  const [search, setSearch] = useState('');

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = term
      ? roster.filter((r) => (r.username ?? '').toLowerCase().includes(term))
      : roster;

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'username') {
        return (a.username ?? '').localeCompare(b.username ?? '');
      }
      if (sortKey === 'last_login_date') {
        // Never-logged-in sorts last regardless of direction flip below.
        const aTime = a.last_login_date ? new Date(a.last_login_date).getTime() : 0;
        const bTime = b.last_login_date ? new Date(b.last_login_date).getTime() : 0;
        return aTime - bTime;
      }
      return (a[sortKey] as number) - (b[sortKey] as number);
    });

    return ascending ? sorted : sorted.reverse();
  }, [roster, search, sortKey, ascending]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      // Names read best A-Z; every numeric column is more useful highest-first.
      setAscending(key === 'username');
    }
  };

  const handleExport = () => {
    const slug = className.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    downloadCsv(`${slug || 'classroom'}-roster.csv`, rosterToCsv(visible));
  };

  return (
    <section className="rounded-2xl border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Roster</h2>
          <span className="text-sm text-muted-foreground">({roster.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Find a student"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 sm:w-56"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={visible.length === 0}>
            <Download className="mr-1.5 h-4 w-4" />
            CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="p-8 text-center text-sm text-muted-foreground">Loading roster…</p>
      ) : roster.length === 0 ? (
        <div className="p-10 text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="font-medium">No students yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Students appear here automatically once they sign up with your class code.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          No student matches “{search}”.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {COLUMNS.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn('whitespace-nowrap', col.numeric && 'text-right')}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1 hover:text-foreground',
                        col.numeric && 'flex-row-reverse'
                      )}
                    >
                      {col.label}
                      {sortKey === col.key ? (
                        ascending ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 opacity-40" />
                      )}
                    </button>
                  </TableHead>
                ))}
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((entry) => {
                const status = STATUS_META[studentStatus(entry)];
                return (
                  <TableRow
                    key={entry.student_id}
                    className="cursor-pointer"
                    onClick={() => onSelectStudent(entry.student_id)}
                  >
                    <TableCell className="font-medium">{entry.username ?? 'Unnamed'}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {formatLastActive(entry.last_login_date)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {entry.current_streak}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {entry.modules_completed}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={entry.avg_progress} className="h-1.5 w-16" />
                        <span className="w-9 tabular-nums text-muted-foreground">
                          {entry.avg_progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {entry.total_points.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={status.className} title={status.description}>
                        {status.label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default RosterTable;
