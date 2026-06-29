import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import OnboardingAuthGate from './OnboardingAuthGate';
import OnboardingInterestSurvey from './OnboardingInterestSurvey';
import OnboardingAppTour from './OnboardingAppTour';

interface SurveyData {
  goal: string;
  interests: string[];
  financeGoals: string[];
  timeCommitment: string;
}

type Phase = 'loading' | 'auth-gate' | 'survey' | 'tour' | 'complete';

// Cleared by useOnboarding.resetOnboarding() to force restart
export const ONBOARDING_DONE_KEY = 'phils_onboarding_done';

const OnboardingOrchestrator: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [phase, setPhase] = useState<Phase>('loading');

  // ── Main phase resolver ──────────────────────────────────────────────────
  // Onboarding is decided from the user's PROFILE flags (per-account, stored in
  // the database) — NOT a device-wide localStorage flag — so every new account
  // gets onboarding even on a device a previous account already used.
  useEffect(() => {
    if (authLoading) return;
    if (phase !== 'loading') return;

    // No session → show auth gate
    if (!user) {
      setPhase('auth-gate');
      return;
    }

    // Signed-in but profile hasn't loaded yet
    if (!profile) return;

    // app_tour_completed is the authoritative per-account completion flag (a real
    // DB column). Once it's true, onboarding is done for this account — on any
    // device. If it's false (every brand-new account), run survey → tour.
    if (profile.app_tour_completed === true) {
      localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      setPhase('complete');
      return;
    }

    // Not finished → start onboarding. (survey_completed lets us skip straight to
    // the tour if the survey was already done; otherwise we begin with the survey.)
    if (profile.survey_completed === true) { setPhase('tour'); return; }
    setPhase('survey');
  }, [authLoading, user, profile, phase]);

  // When a user signs in while on the auth gate, re-run the resolver
  useEffect(() => {
    if (user && phase === 'auth-gate') {
      setPhase('loading');
    }
  }, [user, phase]);

  // ── Render ───────────────────────────────────────────────────────────────

  if (phase === 'auth-gate') {
    return (
      <OnboardingAuthGate
        onSignedIn={() => {
          // Auth state change will flip phase via the useEffect above.
          // Nothing extra needed here.
        }}
      />
    );
  }

  if (phase === 'survey') {
    const handleSurveyComplete = (data: SurveyData) => {
      setPhase('tour');
      if (!user) return;
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
        .then(({ error }) => { if (error) console.error('Error saving survey:', error); });
    };
    return <OnboardingInterestSurvey onComplete={handleSurveyComplete} />;
  }

  if (phase === 'tour') {
    const handleTourComplete = () => {
      // Persist so the signed-in user never sees onboarding again
      localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      if (user) {
        supabase
          .from('profiles')
          .update({
            app_tour_completed: true,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)
          .then(({ error }) => { if (error) console.error('Error saving tour completion:', error); });
      }
      setPhase('complete');
    };

    return <OnboardingAppTour onComplete={handleTourComplete} />;
  }

  return null;
};

export default OnboardingOrchestrator;
