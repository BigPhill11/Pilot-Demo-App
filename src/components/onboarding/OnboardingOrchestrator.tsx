import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import OnboardingAuthGate from './OnboardingAuthGate';
import OnboardingInterestSurvey from './OnboardingInterestSurvey';
import OnboardingAppTour from './OnboardingAppTour';
import OnboardingTeacherSetup from './OnboardingTeacherSetup';
import { isOnboardingDoneLocally, markOnboardingDoneLocally } from '@/lib/onboardingState';
import { isTeacherPreview } from '@/dev/teacherPreview';

interface SurveyData {
  goal: string;
  interests: string[];
  financeGoals: string[];
  timeCommitment: string;
}

type Phase = 'loading' | 'auth-gate' | 'teacher-setup' | 'survey' | 'tour' | 'complete';

// Cleared by useOnboarding.resetOnboarding() to force restart
export const ONBOARDING_DONE_KEY = 'phils_onboarding_done';

const OnboardingOrchestrator: React.FC = () => {
  const { user, profile, loading: authLoading, isTeacher, isAdmin, rolesLoaded } = useAuth();
  const [phase, setPhase] = useState<Phase>('loading');
  const navigate = useNavigate();
  const location = useLocation();

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

    // Roles decide which onboarding branch to take, so wait for them rather
    // than briefly showing a teacher the student survey.
    if (!rolesLoaded) return;

    // Teachers take a different branch entirely: they name a classroom and get
    // a code to hand out, and never see the student survey or app tour.
    if (isTeacher) {
      if (profile.teacher_setup_completed === true) {
        setPhase('complete');
      } else {
        setPhase('teacher-setup');
      }
      return;
    }

    // Onboarding is "done" for this account if EITHER the DB flag says so OR we
    // recorded completion locally for this user id. The per-account local marker
    // makes this robust even when the DB write didn't persist (un-migrated column,
    // transient error) — so a returning account is never replayed through it.
    // A brand-new account has neither, so it still gets survey → tour.
    if (profile.app_tour_completed === true || isOnboardingDoneLocally(user.id)) {
      markOnboardingDoneLocally(user.id);
      localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      setPhase('complete');
      return;
    }

    // Not finished → start onboarding. (survey_completed lets us skip straight to
    // the tour if the survey was already done; otherwise we begin with the survey.)
    if (profile.survey_completed === true) { setPhase('tour'); return; }
    setPhase('survey');
  }, [authLoading, user, profile, phase, isTeacher, rolesLoaded]);

  // When a user signs in while on the auth gate, re-run the resolver
  useEffect(() => {
    if (user && phase === 'auth-gate') {
      setPhase('loading');
    }
  }, [user, phase]);

  // When the session goes away (sign-out elsewhere, token expiry), fall back
  // to the auth gate immediately instead of leaving the app signed-out but
  // still rendered — previously this required a manual page refresh.
  useEffect(() => {
    if (!authLoading && !user && phase !== 'auth-gate' && phase !== 'loading') {
      setPhase('loading');
    }
  }, [authLoading, user, phase]);

  // Teachers only ever use the teacher dashboard, so any student route sends
  // them to /teach. The admin account is exempt — it can browse everything.
  useEffect(() => {
    if (phase !== 'complete') return;
    if (!isTeacher || isAdmin) return;
    if (location.pathname.startsWith('/teach')) return;
    navigate('/teach', { replace: true });
  }, [phase, isTeacher, isAdmin, location.pathname, navigate]);

  // ── Render ───────────────────────────────────────────────────────────────

  // The dev-only teacher dashboard preview has no session to gate, and the
  // auth overlay would otherwise cover it.
  if (isTeacherPreview()) return null;

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

  if (phase === 'teacher-setup') {
    const handleTeacherSetupComplete = () => {
      setPhase('complete');
      navigate('/teach');
      if (!user) return;
      supabase
        .from('profiles')
        .update({
          teacher_setup_completed: true,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        } as never)
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error saving teacher setup:', error);
        });
    };
    return <OnboardingTeacherSetup onComplete={handleTeacherSetupComplete} />;
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
      // Persist so the signed-in user never sees onboarding again. The per-account
      // local marker is the durable source of truth on this device; the DB update
      // below is best-effort and also enables cross-device recognition.
      localStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      markOnboardingDoneLocally(user?.id);
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
