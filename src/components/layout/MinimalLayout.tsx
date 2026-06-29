import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
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
import { useDailyTimeGoal } from '@/hooks/useDailyTimeGoal';
import { LogOut, User, Flame, Moon, Sun, MessageCircle, BarChart2, Menu, Home, Crown, BookOpen, Briefcase, Users, Shield, X } from 'lucide-react';
import { isPhilAdminEmail } from '@/lib/adminAccess';
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
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    currentStreak,
    streakMultiplier
  } = useUnifiedStreak();
  const { isOpen: isAskPhilOpen, openAskPhil, closeAskPhil } = useAskPhilUi();
  const { isOpen: isDashboardOpen, openDashboard, closeDashboard } = usePersonalDashboard();
  const navigate = useNavigate();

  // Swipe-right-to-close for the Ask Phil panel (it slides in from the right).
  const askPhilTouchStart = useRef<{ x: number; y: number } | null>(null);
  const handleAskPhilTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    askPhilTouchStart.current = { x: t.clientX, y: t.clientY };
  };
  const handleAskPhilTouchEnd = (e: React.TouchEvent) => {
    const start = askPhilTouchStart.current;
    askPhilTouchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Mostly-horizontal swipe to the right, far enough to count as a dismiss.
    if (dx > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      closeAskPhil();
    }
  };
  const isGuest = !user;
  const isAdmin = isPhilAdminEmail(user?.email);
  useDailyTimeGoal({ trackActivity: true });

  const mobileNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Empire', path: '/empire', icon: Crown },
    { label: 'Learn', path: '/learn', icon: BookOpen },
    { label: 'Career', path: '/career', icon: Briefcase },
    { label: 'Friends', path: '/phils-friends', icon: Users },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin', icon: Shield }] : []),
  ];

  const handleDashboardNavigate = (tab: string) => {
    closeDashboard();
    if (tab.startsWith('/')) {
      navigate(tab);
      return;
    }
    navigate(`/learn?tab=${tab}`);
  };

  const handleMobileNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileAskPhil = () => {
    openAskPhil();
    setIsMobileMenuOpen(false);
  };

  const handleMobileDashboard = () => {
    openDashboard();
    setIsMobileMenuOpen(false);
  };

  const handleMobileThemeToggle = () => {
    toggleTheme();
    setIsMobileMenuOpen(false);
  };

  const handleMobileSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
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
            
            {isMobile ? (
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 rounded-xl" data-tutorial="app-mobile-menu">
                    <Menu className="h-4 w-4" />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex w-[320px] flex-col overflow-y-auto sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Phil's Financials</SheetTitle>
                    <SheetDescription>Navigate, check progress, or ask Phil.</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    <div className="grid gap-2">
                      {mobileNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                        return (
                          <button
                            key={item.path}
                            onClick={() => handleMobileNavigate(item.path)}
                            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                              isActive
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-background hover:bg-muted'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-2 border-t pt-4">
                      <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleMobileDashboard}>
                        <BarChart2 className="h-4 w-4" />
                        My Progress
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleMobileAskPhil}>
                        <MessageCircle className="h-4 w-4" />
                        Ask Phil
                      </Button>
                      <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleMobileThemeToggle}>
                        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </Button>
                    </div>

                    {user && profile && (
                      <div className="space-y-3 rounded-2xl border bg-muted/40 p-4">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4" />
                          {profile.username || 'User'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Flame className="h-4 w-4 text-orange-500" />
                          {currentStreak} day streak
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 border-t pt-4">
                      {user && (
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3"
                          onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }}
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Button>
                      )}
                      <div className="flex items-center justify-between rounded-xl px-3 py-2">
                        <span className="text-sm font-medium">Settings</span>
                        <ProfileSettings isGuest={isGuest} />
                      </div>
                      {user && (
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleMobileSignOut}>
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openDashboard}
                  className="gap-1.5"
                  aria-label="My Progress"
                  data-tutorial="app-header-my-progress"
                >
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">My Progress</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openAskPhil}
                  className="gap-1.5"
                  aria-label="Ask Phil"
                  data-tutorial="app-header-ask-phil"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Ask Phil</span>
                </Button>

                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                {isGuest && <ProfileSettings isGuest />}

                {user && profile && <>
                    <div data-tutorial="app-header-streak" className="flex items-center space-x-1 text-sm">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{currentStreak}</span>
                      {streakMultiplier > 1 && <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>}
                    </div>

                    <Badge className={`${getLevelBadgeColor(profile.app_version)} text-white px-3 py-1`} variant="secondary">
                      {formatLevel(profile.app_version)}
                    </Badge>

                    <GameProgressBadge compact />

                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
                      aria-label="Profile"
                    >
                      <User className="h-4 w-4" />
                      <span>{profile.username || 'User'}</span>
                    </button>

                    <ProfileSettings />
                    
                    <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </>}
              </div>
            )}
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
        {/* [&>button]:hidden hides the tiny built-in close button for this sheet only,
            so we can show a larger, easier-to-tap one below. */}
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg p-0 flex flex-col [&>button]:hidden"
          onTouchStart={handleAskPhilTouchStart}
          onTouchEnd={handleAskPhilTouchEnd}
        >
          <SheetHeader className="px-6 pt-6 pb-2 border-b relative">
            <SheetTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ask Phil
            </SheetTitle>
            <SheetDescription>
              Your AI finance buddy — ask anything about budgeting, investing, or saving.
            </SheetDescription>
            <button
              type="button"
              onClick={closeAskPhil}
              aria-label="Close Ask Phil"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-muted text-foreground shadow-sm hover:bg-muted-foreground/20 active:scale-95 transition touch-manipulation"
            >
              <X className="h-6 w-6" />
            </button>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <PhilChatAssistant variant="embedded" />
          </div>
        </SheetContent>
      </Sheet>
    </div>;
};
export default MinimalLayout;