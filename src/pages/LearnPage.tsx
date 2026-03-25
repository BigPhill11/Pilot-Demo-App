import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalFinanceTab from "@/components/learn/PersonalFinanceTab";
import LearningDashboard from "@/components/learning/LearningDashboard";
import AdaptiveFlashcards from "@/components/learning/AdaptiveFlashcards";
import MarketIntelligenceTab from "@/components/learn/MarketIntelligenceTab";
import CareersInFinanceTab from "@/components/learn/CareersInFinanceTab";

import { MobileTabNav } from "@/components/ui/mobile-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Briefcase,
  Layers
} from 'lucide-react';

const LearnPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('interactive-hub');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNavigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  // Mobile navigation items
  const mobileNavItems = [
    { value: 'interactive-hub', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { value: 'adaptive-flashcards', label: 'Flashcards', icon: <Layers className="h-5 w-5" /> },
    { value: 'personal-finance', label: 'Finance', icon: <Wallet className="h-5 w-5" /> },
    { value: 'companies', label: 'Markets', icon: <TrendingUp className="h-5 w-5" /> },
    { value: 'careers', label: 'Careers', icon: <Briefcase className="h-5 w-5" /> },
  ];

  return (
    <div className="relative">
      <div className={`container mx-auto px-4 sm:px-6 ${isMobile ? 'pb-24' : 'py-8'}`}>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Desktop Tab Navigation */}
          {!isMobile && (
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="interactive-hub" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="adaptive-flashcards" className="gap-2">
                <Layers className="h-4 w-4" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="personal-finance" className="gap-2">
                <Wallet className="h-4 w-4" />
                Personal Finance
              </TabsTrigger>
              <TabsTrigger value="companies" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Markets
              </TabsTrigger>
              <TabsTrigger value="careers" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Careers
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="adaptive-flashcards" className="mt-0">
            <AdaptiveFlashcards />
          </TabsContent>
          
          <TabsContent value="personal-finance" className={isMobile ? "mt-2" : "mt-6"}>
            <PersonalFinanceTab />
          </TabsContent>
          
          <TabsContent value="interactive-hub" className="mt-0">
            <LearningDashboard onNavigateToTab={handleNavigateToTab} />
          </TabsContent>

          <TabsContent value="companies" className={isMobile ? "mt-2" : "mt-6"}>
            <MarketIntelligenceTab />
          </TabsContent>

          <TabsContent value="careers" className={isMobile ? "mt-2" : "mt-6"}>
            <CareersInFinanceTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileTabNav 
        items={mobileNavItems}
        activeValue={activeTab}
        onValueChange={handleTabChange}
      />
    </div>
  );
};

export default LearnPage;
