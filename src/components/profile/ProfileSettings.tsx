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
import { Settings, User, RotateCcw, UserPlus, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { toast } from 'sonner';
import AuthModal from '@/components/auth/AuthModal';

interface ProfileSettingsProps {
  isGuest?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isGuest = false }) => {
  const { profile } = useAuth();
  const { resetTour } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleRestartTour = async () => {
    await resetTour();
    toast.success('Tour reset! Refresh the page to restart.');
    setIsOpen(false);
  };

  // Guest mode - show create profile prompt
  if (isGuest) {
    return (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="relative flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              {/* Notification dot */}
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full animate-pulse" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Save Your Progress!</span>
              </DialogTitle>
              <DialogDescription>
                Create a profile to save your XP, coins, and learning progress.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Create Profile CTA */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">Create Your Profile</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep your progress, compete on leaderboards, and unlock achievements!
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-3" 
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                Already have an account?{' '}
                <button 
                  className="text-primary hover:underline"
                  onClick={() => {
                    setIsOpen(false);
                    setShowAuthModal(true);
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AuthModal 
          open={showAuthModal} 
          onOpenChange={setShowAuthModal}
          onSuccess={() => window.location.reload()}
        />
      </>
    );
  }

  // Authenticated user - show profile settings
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
          {/* User Info */}
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

          {/* Actions */}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
