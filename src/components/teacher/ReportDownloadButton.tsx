import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { teacherKeys } from '@/hooks/useTeacherDashboard';
import {
  getActivity,
  getClassInsights,
  getLearningMomentum,
  getQuestionBreakdown,
  getRoster,
  getTeachBackOverview,
} from '@/lib/teacherApi';
import { buildClassReport } from '@/lib/teacherReport';
import type { TeacherClassroomSummary } from '@/integrations/supabase/teacherTypes';

interface ReportDownloadButtonProps {
  classroom: TeacherClassroomSummary | undefined;
}

const WINDOW_DAYS = 28;
/** Matches the dashboard hooks, so a fresh view is reused rather than refetched. */
const STALE_MS = 60_000;

/**
 * Builds the class report on demand.
 *
 * It pulls through React Query's cache rather than the hooks, so opening the
 * overview and hitting download does not refetch five endpoints, but a teacher
 * who lands on the roster and downloads immediately still gets everything.
 */
const ReportDownloadButton: React.FC<ReportDownloadButtonProps> = ({ classroom }) => {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    if (!classroom || busy) return;
    setBusy(true);

    try {
      const id = classroom.id;
      const [roster, activity, insights, questions, teachBack, momentum] = await Promise.all([
        queryClient.fetchQuery({
          queryKey: teacherKeys.roster(id),
          queryFn: () => getRoster(id),
          staleTime: STALE_MS,
        }),
        queryClient.fetchQuery({
          queryKey: teacherKeys.activity(id, WINDOW_DAYS),
          queryFn: () => getActivity(id, WINDOW_DAYS),
          staleTime: STALE_MS,
        }),
        queryClient.fetchQuery({
          queryKey: teacherKeys.insights(id),
          queryFn: () => getClassInsights(id),
          staleTime: STALE_MS,
        }),
        queryClient.fetchQuery({
          queryKey: teacherKeys.breakdown(id, 'all'),
          queryFn: () => getQuestionBreakdown(id),
          staleTime: STALE_MS,
        }),
        queryClient.fetchQuery({
          queryKey: teacherKeys.teachback(id),
          queryFn: () => getTeachBackOverview(id),
          staleTime: STALE_MS,
        }),
        queryClient.fetchQuery({
          queryKey: teacherKeys.momentum(id),
          queryFn: () => getLearningMomentum(id),
          staleTime: STALE_MS,
        }),
      ]);

      // jsPDF and its dependencies are around a third of a megabyte, and only a
      // teacher pressing this button ever needs them, so they load on demand
      // rather than riding along in every student's bundle.
      const { classReportFilename, generateClassReportPdf } = await import(
        '@/lib/teacherReportPdf'
      );

      const report = buildClassReport({
        classroom,
        roster,
        activity,
        insights,
        questions,
        teachBack,
        momentum,
        windowDays: WINDOW_DAYS,
      });

      const blob = await generateClassReportPdf(report);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = classReportFilename(report);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Class report downloaded');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Could not build the report. Please try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={!classroom || busy}
      className="shrink-0 px-2 sm:px-3"
      aria-label="Download the class report as a PDF"
      data-tutorial="teacher-report"
    >
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin sm:mr-1.5" />
      ) : (
        <FileText className="h-4 w-4 sm:mr-1.5" />
      )}
      <span className="hidden sm:inline">{busy ? 'Building…' : 'Report'}</span>
    </Button>
  );
};

export default ReportDownloadButton;
