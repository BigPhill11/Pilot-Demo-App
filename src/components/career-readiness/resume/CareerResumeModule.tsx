import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';
import { useResumeDraftSync } from '@/hooks/useResumeDraftSync';
import { RESUME_SECTION_LABELS, RESUME_SECTION_TIPS } from '@/data/career-readiness/resume';
import {
  RESUME_SECTION_ORDER,
  calculateResumeProgress,
  canAccessResumeSection,
  isResumeSectionComplete,
  normalizeResumeDetails,
  type ResumeSectionId,
} from '@/types/career-readiness';
import ResumeSectionNavigator from './ResumeSectionNavigator';
import ResumeContactSection from './ResumeContactSection';
import ResumeEducationSection from './ResumeEducationSection';
import ResumeRoleSection from './ResumeRoleSection';
import ResumeAdditionalSection from './ResumeAdditionalSection';
import ResumePreviewSection from './ResumePreviewSection';
import ResumeFinishScreen from './ResumeFinishScreen';

const CareerResumeModule: React.FC = () => {
  const navigate = useNavigate();
  const { getResumeModuleDetails, updateResumeDetails, updateResumeAnswers } =
    useCareerReadinessProgress();

  const details = getResumeModuleDetails();
  const { answers, currentSectionId, isComplete } = details;
  const percent = calculateResumeProgress(details);

  const onHydrate = useCallback(
    (remote: ReturnType<typeof getResumeModuleDetails>) => {
      updateResumeDetails(() => normalizeResumeDetails(remote));
    },
    [updateResumeDetails]
  );

  const { syncStatus, isLoggedIn } = useResumeDraftSync(details, onHydrate);

  const syncLabel = useMemo(() => {
    if (!isLoggedIn) return 'Saved locally';
    switch (syncStatus) {
      case 'loading':
        return 'Loading…';
      case 'saving':
        return 'Saving…';
      case 'saved':
        return 'Saved to cloud';
      case 'error':
        return 'Sync issue';
      default:
        return 'Saved locally';
    }
  }, [isLoggedIn, syncStatus]);

  const sectionMeta = RESUME_SECTION_LABELS[currentSectionId];

  const goToSection = useCallback(
    (sectionId: ResumeSectionId) => {
      if (!canAccessResumeSection(details, sectionId)) return;
      updateResumeDetails((d) => ({ ...d, currentSectionId: sectionId }));
    },
    [details, updateResumeDetails]
  );

  const completeCurrentSection = useCallback(() => {
    const idx = RESUME_SECTION_ORDER.indexOf(currentSectionId);
    const completedSections = details.completedSections.includes(currentSectionId)
      ? details.completedSections
      : [...details.completedSections, currentSectionId];

    if (currentSectionId === 'preview') {
      updateResumeDetails((d) => ({
        ...d,
        completedSections,
        isComplete: true,
      }));
      return;
    }

    const next = RESUME_SECTION_ORDER[idx + 1] ?? 'preview';
    updateResumeDetails((d) => ({
      ...d,
      completedSections,
      currentSectionId: next,
    }));
  }, [currentSectionId, details.completedSections, updateResumeDetails]);

  const canContinue = isResumeSectionComplete(currentSectionId, answers);

  const renderSection = () => {
    switch (currentSectionId) {
      case 'contact':
        return (
          <ResumeContactSection
            contact={answers.contact}
            onChange={(patch) => updateResumeAnswers({ contact: patch })}
          />
        );
      case 'education':
        return (
          <ResumeEducationSection
            education={answers.education}
            onChange={(patch) => updateResumeAnswers({ education: patch })}
          />
        );
      case 'experience':
        return (
          <ResumeRoleSection
            title="Role"
            tip={RESUME_SECTION_TIPS.experience}
            section="experience"
            entries={answers.experience}
            onChange={(experience) => updateResumeAnswers({ experience })}
          />
        );
      case 'leadership':
        return (
          <ResumeRoleSection
            title="Leadership role"
            tip={RESUME_SECTION_TIPS.leadership}
            section="leadership"
            entries={answers.leadership}
            onChange={(leadership) => updateResumeAnswers({ leadership })}
          />
        );
      case 'additional':
        return (
          <ResumeAdditionalSection
            additional={answers.additional}
            onChange={(patch) => updateResumeAnswers({ additional: patch })}
          />
        );
      case 'preview':
        return <ResumePreviewSection answers={answers} />;
      default:
        return null;
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-5 pb-10">
        <Button variant="ghost" className="gap-2 -ml-2" onClick={() => navigate('/career')}>
          <ArrowLeft className="h-4 w-4" />
          Career Hub
        </Button>
        <ResumeFinishScreen
          answers={answers}
          onEdit={() =>
            updateResumeDetails((d) => ({
              ...d,
              isComplete: false,
              currentSectionId: 'contact',
            }))
          }
          onBackToCareer={() => navigate('/career')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-10">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" className="gap-2 -ml-2 shrink-0" onClick={() => navigate('/career')}>
          <ArrowLeft className="h-4 w-4" />
          Career Hub
        </Button>
        <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-800 shrink-0">
          {syncLabel}
        </Badge>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-emerald-200/90 font-medium">
              Career Readiness
            </p>
            <h1 className="text-xl font-bold mt-1">Resume Builder</h1>
            <p className="text-sm text-emerald-100/90 mt-1">
              Build a finance-ready resume step by step with Phil&apos;s coaching.
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-xs text-emerald-100">
            <span>Progress</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} className="h-2 bg-emerald-950/50" />
        </div>
      </div>

      <ResumeSectionNavigator details={details} onSelect={goToSection} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSectionId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="rounded-2xl border-emerald-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-950">{sectionMeta.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{sectionMeta.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-4">{renderSection()}</CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {currentSectionId !== 'contact' && (
          <Button
            variant="outline"
            className="border-emerald-200"
            onClick={() => {
              const idx = RESUME_SECTION_ORDER.indexOf(currentSectionId);
              if (idx > 0) goToSection(RESUME_SECTION_ORDER[idx - 1]);
            }}
          >
            Back
          </Button>
        )}
        <Button
          className="flex-1 bg-emerald-800 hover:bg-emerald-900"
          disabled={!canContinue && currentSectionId !== 'preview'}
          onClick={completeCurrentSection}
        >
          {currentSectionId === 'preview' ? 'Mark resume complete' : 'Save & continue'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {!canContinue && currentSectionId !== 'preview' && (
        <p className="text-xs text-center text-muted-foreground">
          Complete the required fields in this section to continue.
        </p>
      )}
    </div>
  );
};

export default CareerResumeModule;
