import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, KeyRound } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { validateAccessCode } from "@/lib/accessCode";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const getEmailRedirectTo = () => {
    if (Capacitor.isNativePlatform()) return undefined;
    return `${window.location.origin}/`;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) {
      toast.error("Please confirm you are 13 years or older to continue");
      return;
    }
    if (!accessCode.trim()) {
      toast.error("Enter the access code you were given");
      return;
    }
    setLoading(true);
    try {
      const normalizedCode = accessCode.trim().toUpperCase();
      const codeValid = await validateAccessCode(normalizedCode);
      if (!codeValid) {
        toast.error("That access code isn't valid. Check it and try again.");
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getEmailRedirectTo(),
          data: { username: username || email.split("@")[0], access_code: normalizedCode },
        },
      });
      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        await supabase.from('profiles').update({ age_confirmed: true, signup_access_code: normalizedCode } as never).eq('id', data.user.id);
        if (data.session) {
          toast.success("Account created! Let's get started!");
          navigate("/");
        } else {
          toast.success("Account created! Check your email to confirm, then sign in.");
        }
      }
    } catch {
      toast.error("An unexpected error occurred");
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
          toast.error("Please confirm your email first.", {
            action: {
              label: "Resend email",
              onClick: async () => {
                await supabase.auth.resend({ type: 'signup', email });
                toast.success("Confirmation email resent!");
              },
            },
            duration: 8000,
          });
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email address first"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: getEmailRedirectTo() });
      if (error) { toast.error(error.message); }
      else { toast.success("Password reset email sent! Check your inbox."); setShowForgotPassword(false); }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgotPassword(false)}>
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Phil's Financials</CardTitle>
          <CardDescription>Start your financial learning journey with Phil the Panda!</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* ── Sign In ── */}
            <TabsContent value="signin">
              <div className="space-y-4 pt-2">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                  <Button type="button" variant="link" className="w-full text-sm text-muted-foreground" onClick={() => setShowForgotPassword(true)}>
                    Forgot password?
                  </Button>
                </form>
              </div>
            </TabsContent>

            {/* ── Sign Up ── */}
            <TabsContent value="signup">
              <div className="space-y-4 pt-2">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="text" placeholder="Access code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="pl-10 uppercase" autoCapitalize="characters" required />
                    </div>
                    <Input type="text" placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder="Password (min 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" minLength={6} required />
                      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="age-confirm" checked={ageConfirmed} onCheckedChange={(c) => setAgeConfirmed(c as boolean)} className="mt-1" />
                    <label htmlFor="age-confirm" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      I confirm that I am 13 years of age or older and agree to the{' '}
                      <Link to="/terms" className="text-primary underline hover:no-underline">Terms of Service</Link>{' '}and{' '}
                      <Link to="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading || !ageConfirmed}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </div>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
