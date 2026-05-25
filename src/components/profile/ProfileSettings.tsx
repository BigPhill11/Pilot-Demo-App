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
import { Settings, User, RotateCcw, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useGuestMode } from '@/hooks/useGuestMode';
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
    } else {
      await resetOnboarding();
      await refreshProfile();
    }
    toast.success('Onboarding restarted!');
    setIsOpen(false);
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
                await resetOnboarding();
                toast.success('Onboarding reset! Reload the page to restart.');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restart Full Onboarding</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
