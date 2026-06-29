import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2, Mail, Lock, KeyRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Capacitor } from '@capacitor/core';
import PandaLogo from '@/components/icons/PandaLogo';
import { validateAccessCode } from '@/lib/accessCode';

interface OnboardingAuthGateProps {
  /** Called when the user successfully signs in or creates an account.
   *  The orchestrator will detect the new auth state automatically. */
  onSignedIn: () => void;
}

const OnboardingAuthGate: React.FC<OnboardingAuthGateProps> = ({ onSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'signup' | 'signin'>('signup');
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

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
        options: {
          emailRedirectTo: redirectTo,
          // access_code is also enforced server-side by the handle_new_user trigger.
          data: { username: username || email.split('@')[0], access_code: normalizedCode },
        },
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email,
          username: username || email.split('@')[0],
          age_confirmed: true,
          signup_access_code: normalizedCode,
          placement_track: 'personal-finance',
          app_tour_completed: false,
          survey_completed: false,
          onboarding_completed: false,
          updated_at: new Date().toISOString(),
        } as never, { onConflict: 'id' });
        if (data.session) {
          toast.success("Account created! Let's get started!");
          onSignedIn();
        } else {
          // Email confirmation is required — guide the user to confirm, then sign in.
          setPendingEmail(email);
          setPassword('');
          setTab('signin');
          toast.success('Account created! Check your email to confirm, then sign in.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error('Enter your email above first, then tap “Forgot password”.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });
      if (error) throw error;
      toast.success(`Password reset email sent to ${email.trim()}. Check your inbox.`);
    } catch (err: any) {
      toast.error(err.message || 'Could not send reset email');
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
            action: {
              label: 'Resend',
              onClick: async () => { await supabase.auth.resend({ type: 'signup', email }); toast.success('Confirmation email resent!'); },
            },
            duration: 8000,
          });
        } else {
          throw error;
        }
        return;
      }
      toast.success('Welcome back!');
      onSignedIn();
    } catch (err: any) {
      toast.error(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col overflow-y-auto"
      style={{ background: 'linear-gradient(160deg, #1a4d1a 0%, #2d7a2d 45%, #4caf50 100%)' }}
    >
      {/* Hero */}
      <div className="flex flex-col items-center pt-12 pb-6 px-4 shrink-0">
        <PandaLogo className="w-20 h-20 rounded-2xl shadow-2xl mb-4" />
        <h1 className="text-white text-3xl font-bold tracking-tight text-center">Phil's Financials</h1>
        <p className="text-green-200 text-sm mt-1 text-center">Learn. Earn. Grow.</p>
      </div>

      {/* Auth card */}
      <div className="flex-1 flex flex-col justify-start px-4 pb-6">
        {pendingEmail && (
          <div className="w-full max-w-md mx-auto mb-3 rounded-xl bg-white/95 p-3 text-center shadow-lg">
            <p className="text-sm font-semibold text-emerald-900">Check your email</p>
            <p className="text-xs text-gray-600 mt-1">
              We sent a confirmation link to <span className="font-medium">{pendingEmail}</span>.
              Tap it, then sign in below.
            </p>
          </div>
        )}
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">

          <Tabs value={tab} onValueChange={(v) => setTab(v as 'signup' | 'signin')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 rounded-none border-b border-white/20">
              <TabsTrigger
                value="signup"
                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/20 rounded-none"
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="signin"
                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/20 rounded-none"
              >
                Sign In
              </TabsTrigger>
            </TabsList>

            {/* ── Sign Up ── */}
            <TabsContent value="signup" className="p-4 space-y-3">
              <form onSubmit={handleSignUp} className="space-y-3">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    placeholder="Access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="pl-9 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 uppercase"
                    autoCapitalize="characters"
                    required
                  />
                </div>
                <Input
                  placeholder="Username (optional)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                />
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="age-gate"
                    checked={ageConfirmed}
                    onCheckedChange={(c) => setAgeConfirmed(c as boolean)}
                    className="mt-0.5 border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-green-800"
                  />
                  <label htmlFor="age-gate" className="text-xs text-white/80 leading-snug cursor-pointer">
                    I confirm I am 13 or older and agree to the{' '}
                    <Link to="/terms" className="underline text-white">Terms</Link>{' '}and{' '}
                    <Link to="/privacy" className="underline text-white">Privacy Policy</Link>
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-green-800 font-bold hover:bg-green-50"
                  disabled={loading || !ageConfirmed}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
              </form>
            </TabsContent>

            {/* ── Sign In ── */}
            <TabsContent value="signin" className="p-4 space-y-3">
              <form onSubmit={handleSignIn} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-green-800 font-bold hover:bg-green-50"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Sign In
                </Button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="w-full text-center text-xs text-white/80 hover:text-white underline underline-offset-2 py-1"
                >
                  Forgot password?
                </button>
              </form>
            </TabsContent>

          </Tabs>
        </div>

        <p className="text-[11px] text-white/40 text-center max-w-[260px] mx-auto mt-6">
          You&apos;ll need an access code to create an account. Don&apos;t have one? Ask the
          person who invited you.
        </p>
      </div>
    </div>
  );
};

export default OnboardingAuthGate;
