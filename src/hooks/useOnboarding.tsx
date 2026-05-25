import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface OnboardingState {
  placementTrack: string | null;
  placementScore: number | null;
  appTourCompleted: boolean;
  surveyCompleted: boolean;
  loading: boolean;
}

export const useOnboarding = () => {
  const { user, profile } = useAuth();
  const [state, setState] = useState<OnboardingState>({
    placementTrack: null,
    placementScore: null,
    appTourCompleted: false,
    surveyCompleted: false,
    loading: true,
  });

  useEffect(() => {
    if (profile) {
      setState({
        placementTrack: (profile as any).placement_track || null,
        placementScore: (profile as any).placement_score || null,
        appTourCompleted: (profile as any).app_tour_completed || false,
        surveyCompleted: (profile as any).survey_completed || false,
        loading: false,
      });
    }
  }, [profile]);

  const markPlacementComplete = async (track: string, score: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          placement_track: track,
          placement_score: score,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ 
        ...prev, 
        placementTrack: track,
        placementScore: score 
      }));
    } catch (error) {
      console.error('Error marking placement complete:', error);
    }
  };

  const markTourComplete = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          app_tour_completed: true,
          onboarding_completed: true, // Also mark general onboarding complete
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ ...prev, appTourCompleted: true }));
    } catch (error) {
      console.error('Error marking tour complete:', error);
    }
  };

  const resetTour = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          app_tour_completed: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ ...prev, appTourCompleted: false }));
    } catch (error) {
      console.error('Error resetting tour:', error);
    }
  };

  const resetOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          survey_completed: false,
          app_tour_completed: false,
          onboarding_completed: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setState(prev => ({ ...prev, surveyCompleted: false, appTourCompleted: false }));
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    ...state,
    markPlacementComplete,
    markTourComplete,
    resetTour,
    resetOnboarding,
  };
};
