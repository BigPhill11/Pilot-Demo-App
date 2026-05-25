import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import OnboardingInterestSurvey from './OnboardingInterestSurvey';
import OnboardingAppTour from './OnboardingAppTour';

interface SurveyData {
  goal: string;
  interests: string[];
  financeGoals: string[];
  timeCommitment: string;
}

type Phase = 'loading' | 'survey' | 'tour' | 'complete';

// Also imported by useOnboarding.resetOnboarding() to clear on explicit restart
export const ONBOARDING_DONE_KEY = 'phils_onboarding_done';

const OnboardingOrchestrator: React.FC = () => {
  const { user, profile } = useAuth();
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    if (!profile || phase !== 'loading') return;

    // localStorage is written synchronously when the tour finishes, so it's
    // always ahead of the async Supabase write. If it says done, trust it.
    if (localStorage.getItem(ONBOARDING_DONE_KEY) === 'true') {
      setPhase('complete');
      return;
    }

    if (!profile.survey_completed) {
      setPhase('survey');
    } else if (!profile.app_tour_completed) {
      setPhase('tour');
    } else {
      // DB already has both flags — cache in localStorage for future loads
      localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      setPhase('complete');
    }
  }, [profile, phase]);

  // Only restart when ProfileSettings explicitly resets onboarding.
  // The localStorage guard prevents any stale-profile race condition from
  // sending the user back to the tour after they just finished.
  useEffect(() => {
    if (!profile || phase !== 'complete') return;
    if (localStorage.getItem(ONBOARDING_DONE_KEY) === 'true') return;
    // localStorage was cleared (explicit restart) — re-evaluate DB flags
    if (!profile.survey_completed) setPhase('survey');
    else if (!profile.app_tour_completed) setPhase('tour');
  }, [profile, phase]);

  if (!user || phase === 'loading' || phase === 'complete') return null;

  if (phase === 'survey') {
    const handleSurveyComplete = (data: SurveyData) => {
      setPhase('tour');
      supabase
        .from('profiles')
        .update({
          survey_completed: true,
          interests: data.interests,
          finance_goals: data.financeGoals,
          time_commitment: data.timeCommitment,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error saving survey:', error);
        });
    };
    return <OnboardingInterestSurvey onComplete={handleSurveyComplete} />;
  }

  const handleTourComplete = () => {
    // Write localStorage BEFORE setPhase so the guard is in place
    // before any effects can fire with a stale profile.
    localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
    setPhase('complete');
    supabase
      .from('profiles')
      .update({
        app_tour_completed: true,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .then(({ error }) => {
        if (error) console.error('Error saving tour completion:', error);
      });
  };

  return <OnboardingAppTour onComplete={handleTourComplete} onSkip={handleTourComplete} />;
};

export default OnboardingOrchestrator;
