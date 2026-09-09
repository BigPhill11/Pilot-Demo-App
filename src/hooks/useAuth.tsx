
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { isPhilAdminEmail } from '@/lib/adminAccess';
import type { AppRole } from '@/integrations/supabase/teacherTypes';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  profile: any | null;
  /** Roles from public.user_roles. Empty until the role fetch resolves. */
  roles: AppRole[];
  /** False until roles have loaded, so callers never gate on a half-loaded state. */
  rolesLoaded: boolean;
  isTeacher: boolean;
  /** Teacher role without admin: sees the dashboard instead of the student app. */
  isTeacherOnly: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshRoles: () => Promise<void>;
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
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [rolesLoaded, setRolesLoaded] = useState(false);

  // user_roles lets a user read their own rows, so this needs no privileged RPC.
  const fetchRoles = async (userId: string) => {
    try {
      const { data, error } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
      } else {
        setRoles(((data ?? []) as { role: AppRole }[]).map((r) => r.role));
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      setRoles([]);
    } finally {
      setRolesLoaded(true);
    }
  };

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
          survey_completed: false,
          app_tour_completed: false,
          placement_track: 'personal-finance',
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
      // Clear per-device onboarding markers so the NEXT account that signs in
      // on this device gets the first-run onboarding + empire tutorial.
      localStorage.removeItem('phils_onboarding_done');
      localStorage.removeItem('bamboo_empire_tutorial_v2_completed');
      await supabase.auth.signOut();
      // A hard navigation deliberately remounts App: the branded splash plays
      // again, then the onboarding auth gate becomes the sign-in screen. It
      // also makes every sign-out button behave identically regardless of the
      // route it was pressed from.
      window.location.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const refreshProfile = async () => {
    const currentUser = user;
    if (currentUser) await fetchProfile(currentUser.id, currentUser.email ?? undefined);
  };

  // Roles are otherwise only read at sign-in, so redeeming a teacher code
  // mid-session would leave isTeacher stale until the next page load.
  const refreshRoles = async () => {
    const currentUser = user;
    if (currentUser) await fetchRoles(currentUser.id);
  };

  useEffect(() => {
    let mounted = true;

    // onAuthStateChange fires INITIAL_SESSION immediately with the current session,
    // so no separate getSession() call is needed — that caused double fetchProfile.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // setTimeout prevents Supabase client deadlock on auth state updates
          setTimeout(async () => {
            if (!mounted) return;
            await Promise.all([
              fetchProfile(session.user.id, session.user.email),
              fetchRoles(session.user.id),
            ]);
            // Only record daily login on actual sign-in events, not every session restore
            if (event === 'SIGNED_IN') {
              await handleDailyLogin(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
          setRolesLoaded(true);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // The owner email is treated as an admin even without the role row, matching
  // the is_phil_admin() check the database uses.
  const isAdmin = roles.includes('admin') || isPhilAdminEmail(user?.email);
  const isTeacher = roles.includes('teacher') || isAdmin;
  // The dashboard is the whole app for a teacher, so the student routes are
  // closed to them. Admins are teachers by the rule above but still need to see
  // what students see, so they keep both sides.
  const isTeacherOnly = isTeacher && !isAdmin;

  const value: AuthContextType = {
    user,
    session,
    loading,
    profile,
    roles,
    rolesLoaded,
    isTeacher,
    isTeacherOnly,
    isAdmin,
    signOut,
    refreshProfile,
    refreshRoles,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
