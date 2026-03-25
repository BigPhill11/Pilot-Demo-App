import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import PandaLogo from '@/components/icons/PandaLogo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import GameProgressBadge from '@/components/ui/game-progress-badge';
import PageNavigationTabs from '@/components/layout/PageNavigationTabs';
import PhilChatAssistant from '@/components/ai/PhilChatAssistant';
import PersonalStatsDashboard from '@/components/dashboard/PersonalStatsDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { useAskPhilUi } from '@/contexts/AskPhilUiContext';
import { usePersonalDashboard } from '@/contexts/PersonalDashboardContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { LogOut, User, Flame, Moon, Sun, MessageCircle, BarChart2 } from 'lucide-react';
interface MinimalLayoutProps {
  children: React.ReactNode;
}
const MinimalLayout: React.FC<MinimalLayoutProps> = ({
  children
}) => {
  const {
    user,
    profile,
    signOut
  } = useAuth();
  const {
    isDark,
    toggleTheme
  } = useTheme();
  const isMobile = useIsMobile();
  const {
    currentStreak,
    streakMultiplier
  } = useUnifiedStreak();
  const { isOpen: isAskPhilOpen, openAskPhil, closeAskPhil } = useAskPhilUi();
  const { isOpen: isDashboardOpen, openDashboard, closeDashboard } = usePersonalDashboard();
  const navigate = useNavigate();
  const isGuest = !user;

  const handleDashboardNavigate = (tab: string) => {
    closeDashboard();
    navigate(`/learn?tab=${tab}`);
  };
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500 hover:bg-green-600';
      case 'intermediate':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'advanced':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  const formatLevel = (level: string) => {
    return level === 'advanced' ? 'Pro Phil' : `${level.charAt(0).toUpperCase() + level.slice(1)} Phil`;
  };
  return <div className="min-h-screen bg-background text-foreground">
      {/* Minimal Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <PandaLogo className="h-8 w-8" />
              <span className="font-bold text-xl">Phil's Financials
            </span>
            </div>
            
            {/* User Info and Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* My Progress Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={openDashboard}
                className="gap-1.5"
                aria-label="My Progress"
              >
                <BarChart2 className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">My Progress</span>
              </Button>

              {/* Ask Phil Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={openAskPhil}
                className="gap-1.5"
                aria-label="Ask Phil"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline text-sm">Ask Phil</span>
              </Button>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Guest Mode - Just settings with notification */}
              {isGuest && <ProfileSettings isGuest />}

              {/* Authenticated User */}
              {user && profile && <>
                  {/* Streak Display */}
                  <div className="flex items-center space-x-1 text-sm">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{currentStreak}</span>
                    {streakMultiplier > 1 && <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>}
                  </div>

                  {!isMobile && <>
                      {/* User Level Badge */}
                      <Badge className={`${getLevelBadgeColor(profile.app_version)} text-white px-3 py-1`} variant="secondary">
                        {formatLevel(profile.app_version)}
                      </Badge>

                      {/* Game Progress Badge - links to Bamboo Empire */}
                      <GameProgressBadge compact />

                      {/* Username */}
                      <div className="flex items-center space-x-1 text-sm">
                        <User className="h-4 w-4" />
                        <span>{profile.username || 'User'}</span>
                      </div>
                    </>}
                  
                  {/* Profile Settings */}
                  <ProfileSettings />
                  
                  {/* Sign Out */}
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>}
            </div>
          </div>
        </div>
      </header>

      {/* Page Navigation Tabs */}
      <PageNavigationTabs />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Personal Stats Dashboard Sheet */}
      <Sheet open={isDashboardOpen} onOpenChange={(open) => (open ? openDashboard() : closeDashboard())}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col overflow-hidden">
          <SheetHeader className="px-4 pt-4 pb-2 border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <SheetTitle className="flex items-center gap-2 text-green-800">
              <BarChart2 className="h-5 w-5 text-green-600" />
              My Progress
            </SheetTitle>
            <SheetDescription className="text-green-600/80">
              Track your journey through Phil's jungle
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <PersonalStatsDashboard onNavigate={handleDashboardNavigate} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Ask Phil Chat Sheet */}
      <Sheet open={isAskPhilOpen} onOpenChange={(open) => (open ? openAskPhil() : closeAskPhil())}>
        <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
          <SheetHeader className="px-6 pt-6 pb-2 border-b">
            <SheetTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ask Phil
            </SheetTitle>
            <SheetDescription>
              Your AI finance buddy — ask anything about budgeting, investing, or saving.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <PhilChatAssistant variant="embedded" />
          </div>
        </SheetContent>
      </Sheet>
    </div>;
};
export default MinimalLayout;