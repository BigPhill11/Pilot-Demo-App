type SignOutResult = { error?: unknown } | void;

/**
 * Ends the local session and always returns to a freshly mounted welcome flow.
 *
 * Supabase can clear its browser session and still return an error from the
 * server-side logout request. Redirecting in `finally` prevents that partial
 * success from leaving a signed-out user inside the application shell.
 */
export async function signOutAndReturnToWelcome(
  endSession: () => Promise<SignOutResult>,
  redirect: () => void = () => {
    const destination = new URL('/', window.location.origin);
    // A distinct URL guarantees a real document navigation even when sign-out
    // was pressed from the home route. App then remounts SplashScreen before
    // OnboardingAuthGate presents student/teacher sign-up and sign-in.
    destination.searchParams.set('signedOut', '1');
    window.location.replace(destination.toString());
  }
): Promise<void> {
  try {
    const result = await endSession();
    if (result?.error) console.error('Error signing out:', result.error);
  } catch (error) {
    console.error('Error signing out:', error);
  } finally {
    redirect();
  }
}
