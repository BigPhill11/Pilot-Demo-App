
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { AskPhilUiProvider } from "@/contexts/AskPhilUiContext";
import { PersonalDashboardProvider } from "@/contexts/PersonalDashboardContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import MinimalLayout from "@/components/layout/MinimalLayout";
import GameStateInitializer from "@/components/game/GameStateInitializer";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">Please restart the app.</p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import Index from "./pages/Index";
import LearnPage from "./pages/LearnPage";
import EmpirePage from "./pages/EmpirePage";
import AskPhilPage from "./pages/AskPhilPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import PaperTradingPage from "./pages/PaperTradingPage";
import CareerPage from "./pages/CareerPage";
import CareerInterviewPage from "./pages/CareerInterviewPage";
import CareerResumePage from "./pages/CareerResumePage";
import PhilsFriendsPage from "./pages/PhilsFriendsPage";
import AdminPage from "./pages/AdminPage";
import SplashScreen from "@/components/onboarding/SplashScreen";
import OnboardingOrchestrator from "@/components/onboarding/OnboardingOrchestrator";

const queryClient = new QueryClient();

const Router = Capacitor.isNativePlatform() ? MemoryRouter : BrowserRouter;

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ErrorBoundary>
    {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
          <TooltipProvider>
            <GameStateInitializer />
            <Toaster />
            <Router>
              <AskPhilUiProvider>
                <PersonalDashboardProvider>
                  <OnboardingOrchestrator />
                  <ProtectedRoute>
                    <MinimalLayout>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/empire" element={<EmpirePage />} />
                        <Route path="/learn" element={<LearnPage />} />
                        <Route path="/career" element={<CareerPage />} />
                        <Route path="/career/interviewing" element={<CareerInterviewPage />} />
                        <Route path="/career/resume" element={<CareerResumePage />} />
                        <Route path="/phils-friends" element={<PhilsFriendsPage />} />
                        <Route path="/ask-phil" element={<AskPhilPage />} />
                        <Route path="/paper-trading" element={<PaperTradingPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </MinimalLayout>
                  </ProtectedRoute>
                </PersonalDashboardProvider>
              </AskPhilUiProvider>
            </Router>
          </TooltipProvider>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
