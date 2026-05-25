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

const OnboardingOrchestrator: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  // Phase only ever advances forward — never resets on profile refresh
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
    // Only set the phase once, when profile first loads
    if (!profile || phase !== 'loading') return;
    if (!profile.survey_completed) setPhase('survey');
    else if (!profile.app_tour_completed) setPhase('tour');
    else setPhase('complete');
  }, [profile, phase]);

  // React to profile flag resets (e.g. "Restart Onboarding" from ProfileSettings).
  // Only restart the flow when the user is already past it ('complete'); never
  // reverse forward progress during the live survey -> tour transition, because
  // refreshProfile() can briefly surface a stale profile where survey_completed
  // is still false, which would yank the user back to the survey.
  useEffect(() => {
    if (!profile || phase !== 'complete') return;
    if (!profile.survey_completed) setPhase('survey');
    else if (!profile.app_tour_completed) setPhase('tour');
  }, [profile, phase]);

  if (!user || phase === 'loading' || phase === 'complete') return null;

  if (phase === 'survey') {
    const handleSurveyComplete = (data: SurveyData) => {
      setPhase('tour'); // advance immediately — no waiting for DB
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
          refreshProfile().catch(() => {});
        });
    };
    return <OnboardingInterestSurvey onComplete={handleSurveyComplete} />;
  }

  const handleTourComplete = () => {
    setPhase('complete'); // advance immediately
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
        refreshProfile().catch(() => {});
      });
  };

  return <OnboardingAppTour onComplete={handleTourComplete} onSkip={handleTourComplete} />;
};

export default OnboardingOrchestrator;
