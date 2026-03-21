import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PandaLogo from '@/components/icons/PandaLogo';
import ProfileSettings from '@/components/profile/ProfileSettings';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUnifiedStreak } from '@/hooks/useUnifiedStreak';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useGameStore } from '@/store/useGameStore';
import { LogOut, User, Flame, Moon, Sun, Menu, RotateCcw, Leaf, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Navbar = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const { currentStreak, streakMultiplier } = useUnifiedStreak();
  const { resetTour } = useOnboarding();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bamboo Empire game state
  const bamboo = useGameStore(state => state.bamboo);
  const xp = useGameStore(state => state.xp);
  const initialized = useGameStore(state => state.initialized);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Learn', path: '/learn' },
    { label: 'Soft Skills', path: '/soft-skills' },
    { label: 'Phil\'s Friends', path: '/phils-friends' },
    { label: 'Ask Phil', path: '/ask-phil' },
  ];

  const handleRestartTour = async () => {
    await resetTour();
    toast.success('Tour reset! Refresh the page to restart.');
    setIsMenuOpen(false);
  };

  const MobileMenu = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 mt-8">
          {/* User Info */}
          {user && profile && (
            <div className="flex flex-col space-y-3 pb-4 border-b">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{profile.username || 'User'}</span>
              </div>
              
              {/* Bamboo Empire Stats */}
              {initialized && (
                <Link to="/empire" className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-1.5">
                    <Leaf className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium text-sm">{Math.floor(bamboo).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="font-medium text-sm">{Math.floor(xp).toLocaleString()} XP</span>
                  </div>
                </Link>
              )}
              
              <div className="flex items-center space-x-1 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{currentStreak} day streak</span>
                {streakMultiplier > 1 && (
                  <Badge variant="secondary" className="text-xs ml-1">
                    {streakMultiplier.toFixed(1)}x
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          {/* Navigation Items */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-colors hover:text-primary p-3 rounded-lg ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Restart Tour</span>
              <Button variant="ghost" size="sm" onClick={handleRestartTour}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Settings</span>
              <ProfileSettings />
            </div>
            
            {user && (
              <Button
                variant="ghost"
                onClick={signOut}
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  if (isMobile) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <PandaLogo className="h-8 w-8" />
              <span className="font-bold text-lg">Phil's Financials</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              {user && profile && initialized && (
                <Link 
                  to="/empire"
                  className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                >
                  <Leaf className="h-4 w-4 text-emerald-500" />
                  <span className="font-medium text-sm">{Math.floor(bamboo).toLocaleString()}</span>
                </Link>
              )}
              {user && profile && (
                <div className="flex items-center space-x-1 text-sm">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{currentStreak}</span>
                </div>
              )}
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PandaLogo className="h-8 w-8" />
            <span className="font-bold text-xl">Phil's Financials</span>
          </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user && profile && (
            <>
              {/* Streak Display */}
              <div className="flex items-center space-x-1 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{currentStreak}</span>
                {streakMultiplier > 1 && (
                  <span className="text-xs text-orange-600">({streakMultiplier.toFixed(1)}x)</span>
                )}
              </div>

              {/* Bamboo Empire Stats - XP and Bamboo Coins */}
              {initialized && (
                <Link 
                  to="/empire" 
                  className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/10 to-purple-500/10 hover:from-emerald-500/20 hover:to-purple-500/20 border border-emerald-500/20 transition-all"
                >
                  <div className="flex items-center gap-1">
                    <Leaf className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium text-sm">{Math.floor(bamboo).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="font-medium text-sm">{Math.floor(xp).toLocaleString()}</span>
                  </div>
                </Link>
              )}

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 text-sm">
                  <User className="h-4 w-4" />
                  <span>{profile.username || 'User'}</span>
                </div>
                
                {/* Profile Settings */}
                <ProfileSettings />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
