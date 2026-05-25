import React, { useEffect, useRef, useState } from 'react';
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

const OnboardingOrchestrator: React.FC = () => {
  const { user, profile } = useAuth();
  const [phase, setPhase] = useState<Phase>('loading');

  /*
   * Tracks whether the tour was completed during this browser session.
   * Guards against a race condition where the second useEffect fires with a
   * stale profile (app_tour_completed still false) right after the Supabase
   * write is queued, incorrectly resetting phase back to 'tour'.
   */
  const completedThisSession = useRef(false);

  // Initialize phase once — only when profile first loads
  useEffect(() => {
    if (!profile || phase !== 'loading') return;
    if (!profile.survey_completed) setPhase('survey');
    else if (!profile.app_tour_completed) setPhase('tour');
    else setPhase('complete');
  }, [profile, phase]);

  /*
   * Re-check only when phase is 'complete' AND the user explicitly resets
   * onboarding from ProfileSettings (both flags cleared = full restart).
   *
   * We deliberately skip this check when completedThisSession is true so
   * that a stale in-memory profile can't yank the user back to the tour
   * immediately after they finish it.
   */
  useEffect(() => {
    if (!profile || phase !== 'complete') return;

    // Full reset: both flags cleared — deliberate restart from ProfileSettings
    if (!profile.survey_completed && !profile.app_tour_completed) {
      completedThisSession.current = false;
      setPhase('survey');
      return;
    }

    // Partial reset (survey done, tour reset) — only act if NOT just completed here
    if (!completedThisSession.current && profile.survey_completed && !profile.app_tour_completed) {
      setPhase('tour');
    }
  }, [profile, phase]);

  if (!user || phase === 'loading' || phase === 'complete') return null;

  if (phase === 'survey') {
    const handleSurveyComplete = (data: SurveyData) => {
      setPhase('tour'); // advance immediately — don't wait for DB
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
          // No refreshProfile() — a stale profile response could reset phase
        });
    };
    return <OnboardingInterestSurvey onComplete={handleSurveyComplete} />;
  }

  const handleTourComplete = () => {
    // Mark as completed THIS session BEFORE updating phase, so the guard
    // in the second useEffect is already set when it fires.
    completedThisSession.current = true;
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
        // No refreshProfile() — prevents stale data from resetting phase
      });
  };

  return <OnboardingAppTour onComplete={handleTourComplete} onSkip={handleTourComplete} />;
};

export default OnboardingOrchestrator;
