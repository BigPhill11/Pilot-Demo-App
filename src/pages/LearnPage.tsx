import React, { useState, useRef } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveFlashcards from "@/components/learning/AdaptiveFlashcards";
import MarketIntelligenceTab from "@/components/learn/MarketIntelligenceTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import SoftSkillsTab from "@/components/learn/SoftSkillsTab";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Briefcase,
  Layers,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const TABS = [
  { value: 'interactive-hub',      label: 'Dashboard',    icon: LayoutDashboard },
  { value: 'adaptive-flashcards',  label: 'Flashcards',   icon: Layers },
  { value: 'soft-skills',          label: 'Soft Skills',  icon: Star },
  { value: 'personal-finance',     label: 'Finance',      icon: Wallet },
  { value: 'companies',            label: 'Markets',      icon: TrendingUp },
  { value: 'careers',              label: 'Careers',      icon: Briefcase },
];

const VISIBLE_COUNT = 3;

const LearnPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('interactive-hub');
  const [offset, setOffset] = useState(0);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const maxOffset = TABS.length - VISIBLE_COUNT;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Ensure the newly active tab is in the visible window
    const idx = TABS.findIndex(t => t.value === value);
    if (idx < offset) setOffset(idx);
    else if (idx >= offset + VISIBLE_COUNT) setOffset(idx - VISIBLE_COUNT + 1);
  };

  const shiftLeft = () => setOffset(o => Math.max(0, o - 1));
  const shiftRight = () => setOffset(o => Math.min(maxOffset, o + 1));

  const visibleTabs = isMobile ? TABS.slice(offset, offset + VISIBLE_COUNT) : TABS;
  const canGoLeft = isMobile && offset > 0;
  const canGoRight = isMobile && offset < maxOffset;

  const TabNav = () => (
    <div className="flex items-center gap-1 w-full mb-4 sm:mb-6">
      {/* Left arrow */}
      {isMobile && (
        <button
          onClick={shiftLeft}
          disabled={!canGoLeft}
          aria-label="Previous tabs"
          className={cn(
            "flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-lg transition-all",
            canGoLeft
              ? "bg-muted hover:bg-muted/80 text-foreground"
              : "text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Tab buttons */}
      <div
        ref={tabBarRef}
        className={cn(
          "flex flex-1 gap-1 overflow-hidden",
          !isMobile && "bg-muted rounded-xl p-1"
        )}
      >
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                "flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 rounded-lg px-2 py-2 sm:py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 min-h-[52px] sm:min-h-[36px]",
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              )}
            >
              <Icon className={cn("flex-shrink-0", isMobile ? "h-4 w-4" : "h-4 w-4")} />
              <span className={cn("truncate leading-tight", isMobile && "text-[10px]")}>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      {isMobile && (
        <button
          onClick={shiftRight}
          disabled={!canGoRight}
          aria-label="Next tabs"
          className={cn(
            "flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-lg transition-all",
            canGoRight
              ? "bg-muted hover:bg-muted/80 text-foreground"
              : "text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  // Dot indicators for mobile (shows position in tab list)
  const DotIndicators = () => {
    if (!isMobile) return null;
    return (
      <div className="flex justify-center gap-1.5 mb-3 -mt-2">
        {TABS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-full transition-all duration-200",
              i >= offset && i < offset + VISIBLE_COUNT
                ? "w-4 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabNav />
        <DotIndicators />

        <TabsContent value="interactive-hub" className="mt-0">
          <LearningDashboard onNavigateToTab={handleTabChange} />
        </TabsContent>

        <TabsContent value="adaptive-flashcards" className="mt-0">
          <AdaptiveFlashcards />
        </TabsContent>

        <TabsContent value="soft-skills" className="mt-0">
          <SoftSkillsTab />
        </TabsContent>

        <TabsContent value="personal-finance" className="mt-0">
          <PersonalFinanceTab />
        </TabsContent>

        <TabsContent value="companies" className="mt-0">
          <MarketIntelligenceTab />
        </TabsContent>

        <TabsContent value="careers" className="mt-0">
          <CareersInFinanceTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnPage;
