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
  LayoutDashboard,
  LogOut,
  Mic,
  Plus,
  RefreshCw,
  Target,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
  refreshing?: boolean;
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
 * Desktop-first shell for the teacher dashboard.
 *
 * This is the app's only surface built for a laptop rather than a phone, so it
 * uses the sidebar layout instead of MinimalLayout's mobile header. On small
 * screens the sidebar collapses into a sheet via SidebarTrigger.
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
  const navigate = useNavigate();
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
          <SidebarGroup>
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
              <SidebarMenuButton onClick={() => navigate('/')} tooltip="Back to the app">
                <LogOut />
                <span>Back to app</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
          <SidebarTrigger />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {activeClassroom?.name ?? 'Teacher dashboard'}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={cn('h-4 w-4', refreshing && 'animate-spin')} />
            <span className="ml-1.5 hidden sm:inline">Refresh</span>
          </Button>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TeacherShell;
