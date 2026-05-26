import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveFlashcards from "@/components/learning/AdaptiveFlashcards";
import MarketIntelligenceTab from "@/components/learn/MarketIntelligenceTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";
import { useDailyLogin } from "@/hooks/useDailyLogin";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Briefcase,
  Layers,
  Menu,
} from 'lucide-react';

const TABS = [
  { value: 'interactive-hub',     label: 'Dashboard',   icon: LayoutDashboard },
  { value: 'adaptive-flashcards', label: 'Flashcards',  icon: Layers },
  { value: 'personal-finance',    label: 'Finance',     icon: Wallet },
  { value: 'companies',           label: 'Markets',     icon: TrendingUp },
  { value: 'careers',             label: 'Careers',     icon: Briefcase },
];

const DEFAULT_TAB = 'interactive-hub';

const LearnPage = () => {
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get('tab');
    return TABS.some((item) => item.value === tab) ? tab! : DEFAULT_TAB;
  });
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  useDailyLogin();

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (!tab) return;
    setActiveTab(TABS.some((item) => item.value === tab) ? tab : DEFAULT_TAB);
  }, [searchParams]);

  const activeTabMeta = TABS.find((tab) => tab.value === activeTab) ?? TABS[0];
  const ActiveIcon = activeTabMeta.icon;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsSectionMenuOpen(false);
  };

  const TabNav = () => (
    <div className="mb-4 sm:mb-6">
      {isMobile ? (
        <div className="flex items-center justify-between rounded-2xl border bg-background/95 p-2 shadow-sm">
          <div className="flex items-center gap-2 px-2">
            <div className="rounded-xl bg-primary/10 p-2 text-primary">
              <ActiveIcon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Learn section</p>
              <p className="text-sm font-semibold">{activeTabMeta.label}</p>
            </div>
          </div>

          <Sheet open={isSectionMenuOpen} onOpenChange={setIsSectionMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                <Menu className="h-4 w-4" />
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle>Choose a Learn section</SheetTitle>
              </SheetHeader>
              <div className="mt-5 grid gap-2">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.value;
                  return (
                    <button
                      key={tab.value}
                      onClick={() => handleTabChange(tab.value)}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors',
                        isActive
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background hover:bg-muted'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-background/60 hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabNav />

        <TabsContent value="interactive-hub" className="mt-0">
          <LearningDashboard onNavigateToTab={handleTabChange} />
        </TabsContent>

        <TabsContent value="adaptive-flashcards" className="mt-0">
          <AdaptiveFlashcards />
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
