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
  const [isGuest, setIsGuest] = useState(false);

  // ── Main phase resolver ──────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return;
    if (phase !== 'loading') return;

    // Signed-in user who already finished onboarding
    if (user && localStorage.getItem(ONBOARDING_DONE_KEY) === 'true') {
      setPhase('complete');
      return;
    }

    // No session → show auth gate
    if (!user) {
      setPhase('auth-gate');
      return;
    }

    // Signed-in but profile hasn't loaded yet
    if (!profile) return;

    if (!profile.survey_completed) { setPhase('survey'); return; }
    if (!profile.app_tour_completed) { setPhase('tour'); return; }

    localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
    setPhase('complete');
  }, [authLoading, user, profile, phase]);

  // When a user signs in while on the auth gate, re-run the resolver
  useEffect(() => {
    if (user && phase === 'auth-gate') {
      setPhase('loading');
    }
  }, [user, phase]);

  // Explicit restart from ProfileSettings (localStorage cleared)
  useEffect(() => {
    if (!profile || phase !== 'complete') return;
    if (localStorage.getItem(ONBOARDING_DONE_KEY) === 'true') return;
    if (!profile.survey_completed) setPhase('survey');
    else if (!profile.app_tour_completed) setPhase('tour');
  }, [profile, phase]);

  // ── Render ───────────────────────────────────────────────────────────────

  if (phase === 'auth-gate') {
    return (
      <OnboardingAuthGate
        onSignedIn={() => {
          // Auth state change will flip phase via the useEffect above.
          // Nothing extra needed here.
        }}
        onGuest={() => {
          setIsGuest(true);
          setPhase('tour');
        }}
      />
    );
  }

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
        .eq('id', user!.id)
        .then(({ error }) => { if (error) console.error('Error saving survey:', error); });
    };
    return <OnboardingInterestSurvey onComplete={handleSurveyComplete} />;
  }

  if (phase === 'tour') {
    const handleTourComplete = () => {
      if (!isGuest) {
        // Persist for signed-in users so they never see it again
        localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
        supabase
          .from('profiles')
          .update({
            app_tour_completed: true,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user!.id)
          .then(({ error }) => { if (error) console.error('Error saving tour completion:', error); });
      }
      // Guests: no localStorage save — they'll see auth gate + tour again next session
      setPhase('complete');
    };

    return <OnboardingAppTour onComplete={handleTourComplete} onSkip={handleTourComplete} />;
  }

  return null;
};

export default OnboardingOrchestrator;
