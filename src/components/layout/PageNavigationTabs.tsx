import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Crown, MessageCircle, Home, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAskPhilUi } from '@/contexts/AskPhilUiContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const NAV_TABS = [
  { value: 'home',      label: 'Home',      icon: Home,          action: 'navigate', path: '/' },
  { value: 'empire',   label: 'Empire',    icon: Crown,         action: 'navigate', path: '/empire' },
  { value: 'learn',    label: 'Learn',     icon: BookOpen,      action: 'navigate', path: '/learn' },
  { value: 'ask-phil', label: 'Ask Phil',  icon: MessageCircle, action: 'ask-phil', path: null },
];

const VISIBLE_COUNT = 3;

const PageNavigationTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openAskPhil } = useAskPhilUi();
  const isMobile = useIsMobile();
  const [offset, setOffset] = useState(0);

  const getCurrentTab = () => {
    if (location.pathname === '/learn') return 'learn';
    if (location.pathname === '/empire') return 'empire';
    if (location.pathname === '/') return 'home';
    return 'home';
  };

  const currentTab = getCurrentTab();
  const maxOffset = NAV_TABS.length - VISIBLE_COUNT;

  const handleTabClick = (tab: typeof NAV_TABS[number]) => {
    if (tab.action === 'ask-phil') {
      openAskPhil();
    } else if (tab.path) {
      navigate(tab.path);
    }
  };

  const shiftLeft = () => setOffset(o => Math.max(0, o - 1));
  const shiftRight = () => setOffset(o => Math.min(maxOffset, o + 1));

  const canGoLeft = isMobile && offset > 0;
  const canGoRight = isMobile && offset < maxOffset;
  const visibleTabs = isMobile ? NAV_TABS.slice(offset, offset + VISIBLE_COUNT) : NAV_TABS;

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-12 gap-1">
          {/* Left arrow on mobile */}
          {isMobile && (
            <button
              onClick={shiftLeft}
              disabled={!canGoLeft}
              aria-label="Previous"
              className={cn(
                "flex-shrink-0 h-8 w-8 flex items-center justify-center rounded transition-all",
                canGoLeft
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-muted-foreground/20 cursor-not-allowed"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Tab list */}
          <div className="flex flex-1 h-full overflow-hidden">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabClick(tab)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 px-4 h-full text-sm font-medium border-b-2 transition-all duration-150",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right arrow on mobile */}
          {isMobile && (
            <button
              onClick={shiftRight}
              disabled={!canGoRight}
              aria-label="Next"
              className={cn(
                "flex-shrink-0 h-8 w-8 flex items-center justify-center rounded transition-all",
                canGoRight
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-muted-foreground/20 cursor-not-allowed"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageNavigationTabs;
