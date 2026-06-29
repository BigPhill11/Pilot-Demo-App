import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  KeyRound,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  const [username, setUsername] = useState(profile?.username ?? '');
  const [savingName, setSavingName] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [sendingReset, setSendingReset] = useState(false);

  // Only require an authenticated user — render even if the profile row is slow
  // or unavailable, falling back to the auth user's email so the page never hangs.
  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const displayEmail = profile?.email ?? user.email ?? '';

  const handleSaveUsername = async () => {
    const trimmed = username.trim();
    if (trimmed.length < 2) {
      toast.error('Username must be at least 2 characters.');
      return;
    }
    setSavingName(true);
    const { error } = await supabase
      .from('profiles')
      .update({ username: trimmed, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    setSavingName(false);
    if (error) {
      toast.error('Could not update username.');
      return;
    }
    await refreshProfile();
    toast.success('Username updated.');
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      toast.error(error.message || 'Could not change password.');
      return;
    }
    setNewPassword('');
    setConfirmPassword('');
    toast.success('Password changed.');
  };

  const handleSendReset = async () => {
    if (!displayEmail) {
      toast.error('No email on file for this account.');
      return;
    }
    setSendingReset(true);
    const { error } = await supabase.auth.resetPasswordForEmail(displayEmail);
    setSendingReset(false);
    if (error) {
      toast.error('Could not send reset email.');
      return;
    }
    toast.success(`Password reset email sent to ${displayEmail}.`);
  };

  const handleDeleteAccount = async () => {
    try {
      const { error } = await (supabase as never as {
        rpc: (fn: string) => Promise<{ error: unknown }>;
      }).rpc('delete_my_account');
      if (error) throw error;
      try { await supabase.auth.signOut(); } catch { /* session already gone */ }
      toast.success('Your account has been deleted.');
      window.location.href = '/';
    } catch (e: any) {
      toast.error(`Delete failed: ${e?.message ?? 'unknown error'}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-5">
      <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account details and security.
        </p>
      </div>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
              <Button
                onClick={handleSaveUsername}
                disabled={savingName || username.trim() === (profile?.username ?? '')}
              >
                {savingName ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
            </Label>
            <Input value={displayEmail} disabled className="bg-muted/50" />
            <p className="text-xs text-muted-foreground">
              Your email is used to sign in and can&apos;t be changed here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-5 w-5" />
            Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-muted-foreground"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>
          <Button
            onClick={handleChangePassword}
            disabled={savingPassword || !newPassword}
            className="w-full"
          >
            {savingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Change password
          </Button>

          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Forgot your current password? We&apos;ll email a reset link to{' '}
              <span className="font-medium text-foreground">{displayEmail}</span>.
            </p>
            <Button
              variant="outline"
              onClick={handleSendReset}
              disabled={sendingReset}
              className="w-full flex items-center justify-center gap-2"
            >
              {sendingReset ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Send password reset email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-red-700">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Permanently delete your account and all your learning progress, XP, Bamboo Coins,
            and achievements. This cannot be undone.
          </p>
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
        </CardContent>
      </Card>

      {/* Visible build marker — lets you confirm the phone is running the
          latest build (it should match the marker shown on localhost). */}
      <p className="text-center text-xs text-muted-foreground pt-2">
        Phil&apos;s Financials · v1.0 · updated 2026-06-29
      </p>
    </div>
  );
};

export default ProfilePage;
