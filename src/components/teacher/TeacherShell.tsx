import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Mic,
  Plus,
  RefreshCw,
  Target,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import type { TeacherClassroomSummary } from '@/integrations/supabase/teacherTypes';

export type TeacherView = 'overview' | 'roster' | 'scenarios' | 'teachback' | 'insights';

interface TeacherShellProps {
  classrooms: TeacherClassroomSummary[];
  activeClassroomId: string | null;
  onSelectClassroom: (id: string) => void;
  onCreateClassroom: () => void;
  view: TeacherView;
  onChangeView: (view: TeacherView) => void;
  onRefresh: () => void;
  onReplayTutorial: () => void;
  refreshing?: boolean;
  /** Header slot, used for the report download. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const VIEWS: { id: TeacherView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'roster', label: 'Students', icon: Users },
  { id: 'scenarios', label: 'Scenario answers', icon: Target },
  { id: 'teachback', label: 'Teach-backs', icon: Mic },
  { id: 'insights', label: 'Class insights', icon: BookOpen },
];

/**
 * Shell for the teacher dashboard.
 *
 * Laptops get the sidebar; on a phone it collapses into a sheet behind
 * SidebarTrigger, and the views move into a scrollable strip under the header
 * so switching between them stays one tap rather than open-sheet-then-tap.
 */
const TeacherShell: React.FC<TeacherShellProps> = ({
  classrooms,
  activeClassroomId,
  onSelectClassroom,
  onCreateClassroom,
  view,
  onChangeView,
  onRefresh,
  onReplayTutorial,
  refreshing,
  actions,
  children,
}) => {
  const navigate = useNavigate();
  const { isTeacherOnly, signOut } = useAuth();
  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <PandaLogo className="h-8 w-8 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Teacher</p>
              <p className="truncate text-xs text-muted-foreground">Phil&apos;s Financials</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup data-tutorial="teacher-classes">
            <SidebarGroupLabel>Classes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {classrooms.map((classroom) => (
                  <SidebarMenuItem key={classroom.id}>
                    <SidebarMenuButton
                      isActive={classroom.id === activeClassroomId}
                      onClick={() => onSelectClassroom(classroom.id)}
                      tooltip={classroom.name}
                    >
                      <GraduationCap />
                      <span className="truncate">{classroom.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {classroom.student_count}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={onCreateClassroom} tooltip="New class">
                    <Plus />
                    <span>New class</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>View</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {VIEWS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={view === item.id}
                        onClick={() => onChangeView(item.id)}
                        tooltip={item.label}
                        data-tutorial={`teacher-view-${item.id}`}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onReplayTutorial} tooltip="Replay dashboard tutorial">
                <HelpCircle />
                <span>Replay tutorial</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              {/* A teacher account has no student app to go back to, so the
                  same slot signs them out instead. */}
              {isTeacherOnly ? (
                <SidebarMenuButton onClick={() => signOut()} tooltip="Sign out">
                  <LogOut />
                  <span>Sign out</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton onClick={() => navigate('/')} tooltip="Back to the app">
                  <LogOut />
                  <span>Back to app</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
          <div
            className="flex h-14 items-center gap-2 px-3 sm:px-4"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
          >
            <SidebarTrigger className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {activeClassroom?.name ?? 'Teacher dashboard'}
              </p>
              {activeClassroom && (
                <p className="truncate text-[11px] text-muted-foreground sm:hidden">
                  {activeClassroom.student_count}{' '}
                  {activeClassroom.student_count === 1 ? 'student' : 'students'} ·{' '}
                  {activeClassroom.join_code}
                </p>
              )}
            </div>
            {actions}
            <Button
              variant="ghost"
              size="icon"
              onClick={onReplayTutorial}
              className="shrink-0 md:hidden"
              aria-label="Replay dashboard tutorial"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={refreshing}
              className="shrink-0 px-2 sm:px-3"
              aria-label="Refresh"
            >
              <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
              <span className="ml-1.5 hidden sm:inline">Refresh</span>
            </Button>
          </div>

          {/* Phones do not get the sidebar, so the views live here instead. */}
          <div className="-mx-px overflow-x-auto pb-2 md:hidden">
            <div className="flex w-max gap-1.5 px-3">
              {VIEWS.map((item) => {
                const Icon = item.icon;
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeView(item.id)}
                    aria-current={active ? 'page' : undefined}
                    data-tutorial={`teacher-view-${item.id}`}
                    className={cn(
                      'flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card text-muted-foreground'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 space-y-4 p-3 sm:space-y-6 sm:p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TeacherShell;
