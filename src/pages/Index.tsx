import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, BriefcaseBusiness, Clapperboard, Target } from 'lucide-react';
import GameStatusCard from '@/components/empire/GameStatusCard';
import PandaLogo from '@/components/icons/PandaLogo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useDashboardProgress } from '@/hooks/useDashboardProgress';
import { useProgressContext } from '@/contexts/ProgressContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useCareerReadinessProgress } from '@/hooks/useCareerReadinessProgress';

const Index = () => {
  const { user } = useAuth();
  const { paths, overallProgress, totalLessonsCompleted } = useDashboardProgress();
  const { allProgress } = useProgressContext();
  const { moduleProgress: careerModuleProgress } = useCareerReadinessProgress();
  const [friendsQuizWins, setFriendsQuizWins] = useState(0);

  const careerStats = useMemo(() => {
    const entries = Object.values(careerModuleProgress);
    const totalModules = entries.length || 6;
    const completedModules = entries.filter((p) => p >= 100).length;
    const averageProgress =
      entries.length > 0
        ? Math.round(entries.reduce((sum, p) => sum + p, 0) / entries.length)
        : 0;
    return { totalModules, completedModules, averageProgress };
  }, [careerModuleProgress]);

  const philsFriendsStats = useMemo(() => {
    const readSetSize = (key: string) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return 0;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.length : 0;
      } catch {
        return 0;
      }
    };

    const completedClips = readSetSize('phils_friends_reel_completed');
    const likedClips = readSetSize('phils_friends_reel_likes');
    const bookmarkedClips = readSetSize('phils_friends_reel_bookmarks');
    const targetClips = 20;
    const progressToTarget = Math.min(100, Math.round((completedClips / targetClips) * 100));

    return {
      completedClips,
      likedClips,
      bookmarkedClips,
      progressToTarget,
      targetClips,
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadFriendsQuizWins = async () => {
      if (!user) {
        setFriendsQuizWins(0);
        return;
      }

      const { count } = await supabase
        .from('clip_quiz_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_correct', true);

      if (isMounted) {
        setFriendsQuizWins(count ?? 0);
      }
    };

    void loadFriendsQuizWins();
    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className="min-h-full bg-[#145f22] text-white">
      <div className="bg-[radial-gradient(circle_at_30%_10%,rgba(210,255,196,0.28),transparent_32%),linear-gradient(135deg,#145f22_0%,#2f913a_58%,#45ad4b_100%)]">
        <div className="container mx-auto space-y-6 px-4 py-6 md:py-8">
          <section className="rounded-[2rem] border border-white/15 bg-white/10 px-5 py-10 text-center shadow-2xl shadow-green-950/20 backdrop-blur-sm md:px-10 md:py-14">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-[#e8f9dc] shadow-xl shadow-green-950/20 md:h-28 md:w-28">
              <PandaLogo className="h-20 w-20 md:h-24 md:w-24" />
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-green-100">
              Learn. Earn. Grow.
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Phil&apos;s Financials
            </h1>
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.12] p-5">
              <h2 className="text-lg font-bold text-white md:text-xl">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-green-50 md:text-base">
                Empowering you to explore finance through market literacy, transforming passive learning into
                active career and personal growth with accessible, gamified, and community-driven financial
                education.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="bg-white text-[#176b2a] hover:bg-green-50">
                <Link to="/learn" className="inline-flex items-center gap-2">
                  Continue learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link to="/empire">Open Bamboo Empire</Link>
              </Button>
            </div>
          </section>

          <section aria-label="Home progress sections" className="grid gap-4 md:grid-cols-3">
            <Card className="border-white/70 bg-white text-[#145f22] shadow-xl shadow-green-950/10">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2 text-[#2f913a]">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Learn Tabs</span>
                </div>
                <CardTitle className="text-lg text-[#145f22]">Learning progress</CardTitle>
                <CardDescription className="text-green-800/80">
                  {totalLessonsCompleted} lessons completed across your paths
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Overall</span>
                    <span className="font-semibold">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
                <div className="space-y-2">
                  {paths.slice(0, 3).map((path) => (
                    <div key={path.id} className="rounded-md border border-green-200 bg-green-50/70 p-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{path.title}</span>
                        <span>{path.progressPct}%</span>
                      </div>
                      <Progress value={path.progressPct} className="mt-2 h-1.5" />
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full border-[#2f913a] text-[#176b2a] hover:bg-green-50">
                  <Link to="/learn">Open Learn</Link>
                </Button>
              </CardContent>
            </Card>

          <Card className="border-white/70 bg-white text-[#145f22] shadow-xl shadow-green-950/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-[#2f913a]">
                <BriefcaseBusiness className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Career Readiness</span>
              </div>
              <CardTitle className="text-lg text-[#145f22]">Careers in Finance</CardTitle>
              <CardDescription className="text-green-800/80">
                {careerStats.completedModules} of {careerStats.totalModules} modules completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Overall</span>
                  <span className="font-semibold">{careerStats.averageProgress}%</span>
                </div>
                <Progress value={careerStats.averageProgress} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-green-200 bg-green-50/70 p-2">
                  <p className="text-green-800/70">Completed</p>
                  <p className="text-lg font-semibold">{careerStats.completedModules}</p>
                </div>
                <div className="rounded-md border border-green-200 bg-green-50/70 p-2">
                  <p className="text-green-800/70">Total</p>
                  <p className="text-lg font-semibold">{careerStats.totalModules}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full border-[#2f913a] text-[#176b2a] hover:bg-green-50">
                <Link to="/career">Open Career Hub</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/70 bg-white text-[#145f22] shadow-xl shadow-green-950/10">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-[#2f913a]">
                <Clapperboard className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Phil&apos;s Friends</span>
              </div>
              <CardTitle className="text-lg text-[#145f22]">Video track progress</CardTitle>
              <CardDescription className="text-green-800/80">
                {philsFriendsStats.completedClips} clips completed, {friendsQuizWins} quiz wins
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Target progress</span>
                  <span className="font-semibold">{philsFriendsStats.progressToTarget}%</span>
                </div>
                <Progress value={philsFriendsStats.progressToTarget} className="h-2" />
                <p className="mt-1 text-xs text-green-800/70">
                  {philsFriendsStats.completedClips}/{philsFriendsStats.targetClips} clip goal
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-green-200 bg-green-50/70 p-2">
                  <p className="text-green-800/70">Liked</p>
                  <p className="text-lg font-semibold">{philsFriendsStats.likedClips}</p>
                </div>
                <div className="rounded-md border border-green-200 bg-green-50/70 p-2">
                  <p className="text-green-800/70">Bookmarked</p>
                  <p className="text-lg font-semibold">{philsFriendsStats.bookmarkedClips}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full border-[#2f913a] text-[#176b2a] hover:bg-green-50">
                <Link to="/phils-friends">Open Phil&apos;s Friends</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section aria-label="Your Bamboo Empire">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-green-100" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-green-100">Bamboo Empire</h2>
          </div>
          <React.Suspense fallback={null}>
            <GameStatusCard />
          </React.Suspense>
        </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
