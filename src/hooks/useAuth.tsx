
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: any | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

interface DailyLoginResponse {
  login_recorded: boolean;
  streak: number;
  points_earned: number;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);

  const fetchProfile = async (userId: string, userEmail?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      // If no profile exists, create one
      if (!data) {
        const newProfile = {
          id: userId,
          email: userEmail || null,
          username: userEmail ? userEmail.split('@')[0] : null,
          onboarding_completed: false,
          app_tour_completed: false,
          placement_track: null,
          placement_score: null,
        };
        
        const { data: upsertedProfile, error: upsertError } = await supabase
          .from('profiles')
          .upsert(newProfile, { onConflict: 'id' })
          .select()
          .single();
        
        if (upsertError) {
          console.error('Error creating profile:', upsertError);
          return;
        }
        
        setProfile(upsertedProfile);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDailyLogin = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('handle_daily_login', {
        user_id_param: userId
      });

      if (error) {
        console.error('Error handling daily login:', error);
        return;
      }

      // Safe type checking instead of direct casting
      if (data && typeof data === 'object' && 'login_recorded' in data) {
        const result = data as unknown as DailyLoginResponse;
        
        // Refresh profile after daily login to get updated streak
        if (result?.login_recorded) {
          await fetchProfile(userId);
        }
      }
    } catch (error) {
      console.error('Error in daily login:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to prevent potential deadlock
          setTimeout(async () => {
            if (mounted) {
              await fetchProfile(session.user.id, session.user.email);
              await handleDailyLogin(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          if (mounted) {
            await fetchProfile(session.user.id, session.user.email);
            await handleDailyLogin(session.user.id);
          }
        }, 0);
      }
      
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    session,
    loading,
    profile,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
