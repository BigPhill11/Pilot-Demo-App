import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Loader2, Mail, Lock, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Capacitor } from '@capacitor/core';
import PandaLogo from '@/components/icons/PandaLogo';

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Divider = () => (
  <div className="relative my-1">
    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/20" /></div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-white/10 px-2 text-white/60 rounded">or</span>
    </div>
  </div>
);

interface OnboardingAuthGateProps {
  /** Called when the user successfully signs in or creates an account.
   *  The orchestrator will detect the new auth state automatically. */
  onSignedIn: () => void;
  /** Called when the user chooses to continue without an account. */
  onGuest: () => void;
}

const OnboardingAuthGate: React.FC<OnboardingAuthGateProps> = ({ onSignedIn, onGuest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Phone OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const redirectTo = Capacitor.isNativePlatform() ? undefined : `${window.location.origin}/`;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
      if (error) toast.error(error.message);
    } catch {
      toast.error('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) { toast.error('Please confirm you are 13 years or older'); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: redirectTo, data: { username: username || email.split('@')[0] } },
      });
      if (error) throw error;
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email,
          username: username || email.split('@')[0],
          age_confirmed: true,
          placement_track: 'personal-finance',
          app_tour_completed: false,
          survey_completed: false,
          onboarding_completed: false,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
        if (data.session) {
          toast.success("Account created! Let's get started!");
          onSignedIn();
        } else {
          toast.success('Account created! Check your email to confirm, then sign in.');
        }
      }
    } catch (err: any) {
      toast.error(err.message || 'Sign up failed');
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: normalized });
      if (error) { toast.error(error.message); }
      else { setPhone(normalized); setOtpSent(true); toast.success('Code sent! Check your texts.'); }
    } catch {
      toast.error('Failed to send code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
      if (error) { toast.error(error.message); }
      else { toast.success('Welcome!'); onSignedIn(); }
    } catch {
      toast.error('Verification failed');
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
        <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl overflow-hidden">

          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 rounded-none border-b border-white/20">
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
              <TabsTrigger
                value="phone"
                className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/20 rounded-none"
              >
                Phone
              </TabsTrigger>
            </TabsList>

            {/* ── Sign Up ── */}
            <TabsContent value="signup" className="p-4 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-gray-800 border-white hover:bg-gray-50"
                disabled={loading}
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />Continue with Google
              </Button>
              <Divider />
              <form onSubmit={handleSignUp} className="space-y-3">
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
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-gray-800 border-white hover:bg-gray-50"
                disabled={loading}
                onClick={handleGoogleSignIn}
              >
                <GoogleIcon />Continue with Google
              </Button>
              <Divider />
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
              </form>
            </TabsContent>

            {/* ── Phone OTP ── */}
            <TabsContent value="phone" className="p-4 space-y-3">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <p className="text-xs text-white/70">
                    Enter your phone number and we'll text a one-time code. US numbers can omit the country code.
                  </p>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-green-800 font-bold hover:bg-green-50"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Send Code
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <p className="text-xs text-white/70">
                    Enter the 6-digit code sent to <span className="font-semibold text-white">{phone}</span>.
                  </p>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center text-2xl tracking-widest bg-white/20 border-white/30 text-white placeholder:text-white/30 focus:bg-white/30"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-green-800 font-bold hover:bg-green-50"
                    disabled={loading || otp.length < 6}
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Verify & Sign In
                  </Button>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-white/60 hover:text-white mx-auto"
                    onClick={() => { setOtpSent(false); setOtp(''); }}
                  >
                    <ArrowLeft className="h-3 w-3" />Change number
                  </button>
                </form>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Guest option */}
        <div className="flex flex-col items-center mt-6 gap-1">
          <button
            type="button"
            onClick={onGuest}
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors touch-manipulation py-2 px-4"
          >
            Continue as Guest
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <p className="text-[11px] text-white/40 text-center max-w-[240px]">
            Guest progress is not saved between sessions
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAuthGate;
