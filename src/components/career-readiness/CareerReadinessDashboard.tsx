import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CareerModule } from '@/data/career-readiness/modules';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';
import { recordPathTouched } from '@/hooks/useDashboardProgress';
import CareerHeroHeader from './CareerHeroHeader';
import CareerModuleGrid from './CareerModuleGrid';
import CareerProgressRing from './CareerProgressRing';
import PhilTipCard from './PhilTipCard';
import CareerBadgesWidget from './CareerBadgesWidget';
import ResumeBuilderTeaser from './ResumeBuilderTeaser';
import CareerProgressBanner from './CareerProgressBanner';
import ModuleComingSoonSheet from './ModuleComingSoonSheet';

const CareerReadinessDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { overallPercent, badgesEarned, totalBadges, getModuleProgress } =
    useCareerReadinessProgress();

  const [selectedModule, setSelectedModule] = useState<CareerModule | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    recordPathTouched('careersFinance');
  }, []);

  const scrollToProgress = useCallback(() => {
    progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleStartModule = useCallback(
    (module: CareerModule) => {
      if (module.id === 'interviewing') {
        navigate('/career/interviewing');
        return;
      }
      // Email Etiquette content is still in progress — show the "coming soon"
      // sheet (same as Business Etiquette) instead of the unfinished module.
      setSelectedModule(module);
      setSheetOpen(true);
    },
    [navigate]
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <CareerHeroHeader />

      <CareerModuleGrid
        getModuleProgress={getModuleProgress}
        onStartModule={handleStartModule}
        onViewProgress={scrollToProgress}
      />

      <div ref={progressRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CareerProgressRing overallPercent={overallPercent} onViewProgress={scrollToProgress} />
        <PhilTipCard />
      </div>

      <CareerBadgesWidget badgesEarned={badgesEarned} totalBadges={totalBadges} />

      <ResumeBuilderTeaser />

      <CareerProgressBanner onViewProgress={scrollToProgress} />

      <ModuleComingSoonSheet
        module={selectedModule}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
};

export default CareerReadinessDashboard;
