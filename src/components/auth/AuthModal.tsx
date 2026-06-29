import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Capacitor } from '@capacitor/core';
import { validateAccessCode } from '@/lib/accessCode';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectTo = Capacitor.isNativePlatform() ? undefined : `${window.location.origin}/`;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) { toast.error('Please confirm you are 13 years or older'); return; }
    if (!accessCode.trim()) { toast.error('Enter the access code you were given'); return; }
    setLoading(true);
    try {
      const normalizedCode = accessCode.trim().toUpperCase();
      const codeValid = await validateAccessCode(normalizedCode);
      if (!codeValid) {
        toast.error("That access code isn't valid. Check it and try again.");
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: redirectTo, data: { username, access_code: normalizedCode } },
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email, username, age_confirmed: true,
          signup_access_code: normalizedCode,
          placement_track: 'personal-finance', app_tour_completed: false,
          survey_completed: false, onboarding_completed: false,
          updated_at: new Date().toISOString(),
        } as never, { onConflict: 'id' });
        if (data.session) {
          toast.success('Account created! Your progress is now saved.');
          onSuccess?.();
        } else {
          toast.success('Account created! Check your email to confirm, then sign in.');
        }
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          toast.error('Please confirm your email first.', {
            action: { label: 'Resend', onClick: async () => { await supabase.auth.resend({ type: 'signup', email }); toast.success('Confirmation email resent!'); } },
            duration: 8000,
          });
        } else { throw error; }
        return;
      }
      toast.success('Welcome back!');
      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Your Profile</DialogTitle>
          <DialogDescription>Save your progress and earn rewards across sessions!</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>

          {/* ── Sign Up ── */}
          <TabsContent value="signup">
            <div className="space-y-4 pt-2">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="access-code">Access code</Label>
                  <Input id="access-code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Enter your access code" className="uppercase" autoCapitalize="characters" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age" checked={ageConfirmed} onCheckedChange={(c) => setAgeConfirmed(c as boolean)} />
                  <Label htmlFor="age" className="text-sm text-muted-foreground">I confirm I am 13 years or older</Label>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Create Account
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* ── Sign In ── */}
          <TabsContent value="signin">
            <div className="space-y-4 pt-2">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input id="signin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input id="signin-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Sign In
                </Button>
              </form>
            </div>
          </TabsContent>

        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
