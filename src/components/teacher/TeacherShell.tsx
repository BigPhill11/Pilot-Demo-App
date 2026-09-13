import React from 'react';
import { useAuth } from '@/hooks/useAuth';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  RefreshCw,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TeacherClassroomSummary } from '@/integrations/supabase/teacherTypes';

export type TeacherView = 'overview' | 'roster' | 'insights';

interface TeacherShellProps {
  classrooms: TeacherClassroomSummary[];
  activeClassroomId: string | null;
  onSelectClassroom: (id: string) => void;
  onCreateClassroom: () => void;
  view: TeacherView;
  onChangeView: (view: TeacherView) => void;
  onRefresh: () => void;
  refreshing?: boolean;
  children: React.ReactNode;
}

const VIEWS: { id: TeacherView; label: string; shortLabel: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: LayoutDashboard },
  { id: 'roster', label: 'Students', shortLabel: 'Students', icon: Users },
  { id: 'insights', label: 'Class insights', shortLabel: 'Insights', icon: BookOpen },
];

/**
 * Sidebar body lives inside SidebarProvider so it can reach useSidebar() and
 * close the mobile sheet after a tap — otherwise on a phone the sheet stays
 * open over the content the tap just changed.
 */
const TeacherSidebar: React.FC<
  Pick<
    TeacherShellProps,
    'classrooms' | 'activeClassroomId' | 'onSelectClassroom' | 'onCreateClassroom' | 'view' | 'onChangeView'
  >
> = ({ classrooms, activeClassroomId, onSelectClassroom, onCreateClassroom, view, onChangeView }) => {
  const { signOut } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
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
        <SidebarGroup>
          <SidebarGroupLabel>Classes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {classrooms.map((classroom) => (
                <SidebarMenuItem key={classroom.id}>
                  <SidebarMenuButton
                    isActive={classroom.id === activeClassroomId}
                    onClick={() => {
                      onSelectClassroom(classroom.id);
                      closeMobile();
                    }}
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
                <SidebarMenuButton
                  onClick={() => {
                    onCreateClassroom();
                    closeMobile();
                  }}
                  tooltip="New class"
                >
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
                      onClick={() => {
                        onChangeView(item.id);
                        closeMobile();
                      }}
                      tooltip={item.label}
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
            <SidebarMenuButton onClick={signOut} tooltip="Sign out">
              <LogOut />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

/**
 * Shell for the teacher dashboard.
 *
 * Desktop gets the classic sidebar layout. On a phone the sidebar collapses
 * into a sheet (classes + sign out) and the three views move to a bottom tab
 * bar, matching the navigation pattern of the student app.
 */
const TeacherShell: React.FC<TeacherShellProps> = ({
  classrooms,
  activeClassroomId,
  onSelectClassroom,
  onCreateClassroom,
  view,
  onChangeView,
  onRefresh,
  refreshing,
  children,
}) => {
  const activeClassroom = classrooms.find((c) => c.id === activeClassroomId);

  return (
    <SidebarProvider>
      <TeacherSidebar
        classrooms={classrooms}
        activeClassroomId={activeClassroomId}
        onSelectClassroom={onSelectClassroom}
        onCreateClassroom={onCreateClassroom}
        view={view}
        onChangeView={onChangeView}
      />

      <SidebarInset>
        <header
          className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur"
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          <div className="flex h-14 items-center gap-3 px-4">
            <SidebarTrigger className="h-9 w-9 md:h-7 md:w-7" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {activeClassroom?.name ?? 'Teacher dashboard'}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onRefresh} disabled={refreshing}>
              <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
              <span className="ml-1.5 hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </header>

        {/* Extra bottom padding on mobile keeps the last card clear of the tab bar. */}
        <main className="flex-1 space-y-6 p-4 pb-28 md:p-6 md:pb-6">{children}</main>

        <nav
          className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="grid grid-cols-3">
            {VIEWS.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChangeView(item.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {item.shortLabel}
                </button>
              );
            })}
          </div>
        </nav>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TeacherShell;
