import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGuestMode } from '@/hooks/useGuestMode';
import PandaPhilTour from '@/components/onboarding/PandaPhilTour';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, profile } = useAuth();
  const { isGuestTourCompleted, markTourCompleted } = useGuestMode();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For authenticated users, check their profile tour status
  if (user && profile) {
    const appTourCompleted = (profile as any).app_tour_completed || (profile as any).onboarding_completed;
    
    if (!appTourCompleted) {
      return (
        <PandaPhilTour 
          placementTrack="personal-finance"
          onComplete={async () => {
            const { error } = await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                placement_track: 'personal-finance',
                app_version: 'personal-finance',
                app_tour_completed: true,
                onboarding_completed: true,
                updated_at: new Date().toISOString()
              }, { onConflict: 'id' });
            
            if (error) {
              console.error('Error completing tour:', error);
              toast.error('Failed to save progress, but continuing...');
            }
            
            toast.success("You're all set! Let's start learning!");
          }} 
        />
      );
    }
    
    return <>{children}</>;
  }

  // For guests, check localStorage tour status
  if (!isGuestTourCompleted) {
    return (
      <PandaPhilTour 
        placementTrack="personal-finance"
        onComplete={() => {
          markTourCompleted();
          toast.success("You're all set! Let's start learning!");
        }} 
      />
    );
  }

  // Guest with completed tour - show app
  return <>{children}</>;
};

export default ProtectedRoute;
