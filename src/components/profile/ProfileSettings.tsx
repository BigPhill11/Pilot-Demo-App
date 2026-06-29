import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Settings, User, RotateCcw, LogIn, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useGuestMode } from '@/hooks/useGuestMode';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AuthModal from '@/components/auth/AuthModal';

interface ProfileSettingsProps {
  isGuest?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isGuest = false }) => {
  const { profile, refreshProfile } = useAuth();
  const { resetTour, resetOnboarding } = useOnboarding();
  const { updateGuestData } = useGuestMode();
  const [isOpen, setIsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const handleRestartTour = async () => {
    if (isGuest) {
      updateGuestData({ tourCompleted: false, surveyCompleted: false });
      toast.success('Onboarding restarted!');
      setIsOpen(false);
      return;
    }
    // resetTour clears the app_tour_completed flag; reloading re-runs the
    // onboarding resolver so the tour plays again.
    await resetTour();
    toast.success('Restarting onboarding…');
    window.location.href = '/';
  };

  if (isGuest) {
    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Guest mode</span>
              </DialogTitle>
              <DialogDescription>
                You&apos;re exploring Phil&apos;s Financials without an account. Progress is saved on
                this device.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <Button
                className="w-full flex items-center justify-center space-x-2"
                onClick={() => { setIsOpen(false); setAuthOpen(true); }}
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In / Create Account</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleRestartTour}
                className="w-full flex items-center justify-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Restart App Tour</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </>
    );
  }

  const handleDeleteAccount = async () => {
    if (!profile) return;
    try {
      // Permanently deletes the auth account + all the user's data, server-side.
      // (A user can only ever delete their own account — see delete_my_account.)
      const { error } = await (supabase as never as {
        rpc: (fn: string) => Promise<{ error: unknown }>;
      }).rpc('delete_my_account');
      if (error) throw error;
      // Session is now invalid; clear it locally (ignore any error).
      try { await supabase.auth.signOut(); } catch { /* already gone */ }
      toast.success('Your account has been deleted.');
      window.location.href = '/';
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </DialogTitle>
          <DialogDescription>
            Manage your Phil Finance profile settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Account</h3>
            <div className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Username</span>
                <span className="text-sm font-medium">{profile.username || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{profile.email || 'Not set'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Actions</h3>
            <Button
              variant="outline"
              onClick={handleRestartTour}
              className="w-full flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restart App Tour</span>
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await resetTour();
                await resetOnboarding();
                toast.success('Restarting onboarding…');
                window.location.href = '/';
              }}
              className="w-full flex items-center justify-center space-x-2 text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restart Full Onboarding</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-400 flex items-center justify-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Account</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account and all your learning progress, XP,
                    Bamboo Coins, and achievements. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
