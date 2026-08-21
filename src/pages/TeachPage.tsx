import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import {
  teacherKeys,
  useClassrooms,
  useModuleMatrix,
  useRefreshClassroom,
  useRoster,
} from '@/hooks/useTeacherDashboard';
import TeacherShell, { type TeacherView } from '@/components/teacher/TeacherShell';
import ClassPulseHeader from '@/components/teacher/ClassPulseHeader';
import RosterTable from '@/components/teacher/RosterTable';
import ModuleMatrix from '@/components/teacher/ModuleMatrix';
import CreateClassroomDialog from '@/components/teacher/CreateClassroomDialog';
import EngagementHeatmap from '@/components/teacher/EngagementHeatmap';
import StudentDetailSheet from '@/components/teacher/StudentDetailSheet';
import ClassInsightsPanel from '@/components/teacher/ClassInsightsPanel';
import { Button } from '@/components/ui/button';
import { GraduationCap, Loader2, Plus } from 'lucide-react';
import { summarizeClass } from '@/lib/teacherMetrics';
import { isTeacherPreview } from '@/dev/teacherPreview';

const TeachPage: React.FC = () => {
  const { user, loading, isTeacher, rolesLoaded } = useAuth();
  // Dev-only: `/teach?preview=1` renders the dashboard against fixtures so it
  // can be reviewed before the classroom migrations are applied anywhere.
  const preview = isTeacherPreview();
  const queryClient = useQueryClient();

  const [activeClassroomId, setActiveClassroomId] = useState<string | null>(null);
  const [view, setView] = useState<TeacherView>('overview');
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const classroomsQuery = useClassrooms();
  const classrooms = useMemo(() => classroomsQuery.data ?? [], [classroomsQuery.data]);

  // Land on the first class until the teacher picks another.
  useEffect(() => {
    if (!activeClassroomId && classrooms.length > 0) {
      setActiveClassroomId(classrooms[0].id);
    }
  }, [classrooms, activeClassroomId]);

  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);
  const rosterQuery = useRoster(activeClassroomId ?? undefined);
  const matrixQuery = useModuleMatrix(activeClassroomId ?? undefined);
  const refresh = useRefreshClassroom(activeClassroomId ?? undefined);

  const roster = useMemo(() => rosterQuery.data ?? [], [rosterQuery.data]);
  const summary = useMemo(() => summarizeClass(roster), [roster]);

  if (!preview && (loading || !rolesLoaded)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!preview && (!user || !isTeacher)) {
    return <Navigate to="/" replace />;
  }

  const handleCreated = (classroomId: string) => {
    queryClient.invalidateQueries({ queryKey: teacherKeys.classrooms });
    setActiveClassroomId(classroomId);
    setView('overview');
  };

  // A teacher with no classes at all — the only state where the shell has
  // nothing to frame.
  if (!classroomsQuery.isLoading && classrooms.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md rounded-2xl border bg-card p-8 text-center">
          <GraduationCap className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="text-xl font-semibold">No classes yet</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first class to get a code you can hand out. Students who sign up with it
            land on your roster automatically.
          </p>
          <Button className="mt-5" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            Create a class
          </Button>
        </div>
        <CreateClassroomDialog
          open={createOpen}
          onOpenChange={setCreateOpen}
          onCreated={handleCreated}
        />
      </div>
    );
  }

  const dataLoading = rosterQuery.isLoading || classroomsQuery.isLoading;

  return (
    <>
      <TeacherShell
        classrooms={classrooms}
        activeClassroomId={activeClassroomId}
        onSelectClassroom={(id) => {
          setActiveClassroomId(id);
          setSelectedStudentId(null);
        }}
        onCreateClassroom={() => setCreateOpen(true)}
        view={view}
        onChangeView={setView}
        onRefresh={refresh}
        refreshing={rosterQuery.isFetching || matrixQuery.isFetching}
      >
        {preview && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
            Preview mode — sample data, not a real classroom. Drop{' '}
            <code className="font-mono text-xs">?preview=1</code> from the URL to use live data.
          </div>
        )}

        {activeClassroom && (
          <ClassPulseHeader
            classroom={activeClassroom}
            summary={summary}
            loading={dataLoading}
          />
        )}

        {view === 'overview' && (
          <>
            <EngagementHeatmap
              classroomId={activeClassroomId ?? undefined}
              roster={roster}
              onSelectStudent={setSelectedStudentId}
            />
            <ModuleMatrix
              roster={roster}
              cells={matrixQuery.data ?? []}
              loading={matrixQuery.isLoading}
              onSelectStudent={setSelectedStudentId}
            />
          </>
        )}

        {view === 'roster' && (
          <RosterTable
            roster={roster}
            loading={rosterQuery.isLoading}
            className={activeClassroom?.name ?? 'classroom'}
            onSelectStudent={setSelectedStudentId}
          />
        )}

        {view === 'insights' && <ClassInsightsPanel classroomId={activeClassroomId ?? undefined} />}
      </TeacherShell>

      <CreateClassroomDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreated}
      />

      <StudentDetailSheet
        classroomId={activeClassroomId ?? undefined}
        studentId={selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
      />
    </>
  );
};

export default TeachPage;
