import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Crown, MessageCircle, Home, BookOpen, Briefcase, Users, Shield } from 'lucide-react';
import { useAskPhilUi } from '@/contexts/AskPhilUiContext';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { isPhilAdminEmail } from '@/lib/adminAccess';
import { cn } from '@/lib/utils';

const NAV_TABS = [
  { value: 'home',          label: 'Home',     icon: Home,          action: 'navigate', path: '/',              tutorialId: 'app-nav-home' },
  { value: 'empire',        label: 'Empire',   icon: Crown,         action: 'navigate', path: '/empire',        tutorialId: 'app-nav-empire' },
  { value: 'learn',         label: 'Learn',    icon: BookOpen,      action: 'navigate', path: '/learn',         tutorialId: 'app-nav-learn' },
  { value: 'career',        label: 'Career',   icon: Briefcase,     action: 'navigate', path: '/career',        tutorialId: 'app-nav-career' },
  { value: 'phils-friends', label: 'Friends',  icon: Users,         action: 'navigate', path: '/phils-friends', tutorialId: 'app-nav-phils-friends' },
  { value: 'ask-phil',      label: 'Ask Phil', icon: MessageCircle, action: 'ask-phil', path: null,             tutorialId: 'app-nav-ask-phil' },
];

const PageNavigationTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAskPhil } = useAskPhilUi();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isAdmin = isPhilAdminEmail(user?.email);
  const tabs = isAdmin
    ? [
        ...NAV_TABS.slice(0, 5),
        { value: 'admin', label: 'Admin', icon: Shield, action: 'navigate', path: '/admin', tutorialId: 'app-nav-admin' },
        NAV_TABS[5],
      ]
    : NAV_TABS;

  const getCurrentTab = () => {
    if (location.pathname === '/learn') return 'learn';
    if (location.pathname === '/career' || location.pathname.startsWith('/career/')) return 'career';
    if (location.pathname === '/phils-friends') return 'phils-friends';
    if (location.pathname === '/admin') return 'admin';
    if (location.pathname === '/empire') return 'empire';
    if (location.pathname === '/') return 'home';
    return 'home';
  };

  const currentTab = getCurrentTab();

  const handleTabClick = (tab: typeof NAV_TABS[number]) => {
    if (tab.action === 'ask-phil') {
      openAskPhil();
    } else if (tab.path) {
      navigate(tab.path);
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <div className="border-b bg-background" data-tutorial="app-nav-tabs">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12 gap-1">
          <div className="flex flex-1 h-full overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabClick(tab)}
                  data-tutorial={tab.tutorialId}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 px-4 h-full text-sm font-medium border-b-2 transition-all duration-150',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNavigationTabs;
