import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PandaLogo from '@/components/icons/PandaLogo';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Crown,
  Route,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import type { WealthManagementModule } from '@/data/wealth-management/wealthManagementCurriculum';

interface WealthManagementOverviewProps {
  careerName: string;
  modules: WealthManagementModule[];
  completedModuleIds: string[];
  completedCareerStageIds: string[];
  onSelectModule: (moduleId: string) => void;
  onStartSimulator: () => void;
}

const WealthManagementOverview: React.FC<WealthManagementOverviewProps> = ({
  careerName,
  modules,
  completedModuleIds,
  completedCareerStageIds,
  onSelectModule,
  onStartSimulator,
}) => {
  const completedModules = modules.filter((module) => completedModuleIds.includes(module.id)).length;
  const progressPercent = Math.round((completedModules / modules.length) * 100);
  const nextModule = modules.find((module) => !completedModuleIds.includes(module.id)) ?? modules[0];

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-950 via-emerald-900 to-green-800 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-lime-300 blur-3xl" />
        </div>

        <div className="relative z-10 p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-white/15">
                  <PandaLogo className="h-11 w-11 object-contain" />
                </div>
                <div>
                  <Badge className="bg-white text-green-900 hover:bg-white">
                    {careerName} Lab
                  </Badge>
                  <p className="mt-1 text-xs text-green-200">Holistic advice, client trust, and career reps</p>
                </div>
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Learn how advisors protect, grow, and transfer family wealth.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-green-100 sm:text-base">
                Move from the big picture to real execution: planning vs. wealth management,
                advisory team roles, tax-aware decisions, and the recruiting playbook.
              </p>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-200">Track Progress</p>
                  <p className="mt-1 text-3xl font-black">{progressPercent}%</p>
                </div>
                <Trophy className="h-10 w-10 text-amber-300" />
              </div>
              <Progress
                value={progressPercent}
                className="mt-4 h-2 bg-white/20"
                indicatorClassName="bg-gradient-to-r from-lime-300 to-emerald-300"
              />
              <p className="mt-3 text-xs text-green-100">
                {completedModules}/{modules.length} curriculum modules completed
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => onSelectModule(nextModule.id)}
              className="bg-white text-green-900 hover:bg-green-50"
            >
              {progressPercent === 0 ? 'Start Curriculum' : 'Continue Curriculum'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onStartSimulator}
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              Try Career Simulator
              <BriefcaseBusiness className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard icon={<Shield className="h-5 w-5" />} label="Advice Layers" value="Planning to Private Banking" />
        <StatCard icon={<Users className="h-5 w-5" />} label="Career Roles" value="Advisor, Strategist, PM" />
        <StatCard icon={<Sparkles className="h-5 w-5" />} label="Practice Style" value="Cases and Roleplay" />
        <StatCard icon={<Crown className="h-5 w-5" />} label="Simulator" value={`${completedCareerStageIds.length}/6 titles unlocked`} />
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-green-950">Four-Module Curriculum</h2>
            <p className="text-sm text-green-700/80">Short lessons, quick decisions, and fast feedback.</p>
          </div>
          <Badge variant="outline" className="hidden border-emerald-200 text-emerald-700 sm:inline-flex">
            <Route className="mr-1 h-3 w-3" />
            Macro to execution
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const isComplete = completedModuleIds.includes(module.id);

            return (
              <button
                key={module.id}
                type="button"
                onClick={() => onSelectModule(module.id)}
                className="group text-left"
              >
                <Card className={`h-full overflow-hidden border-2 bg-white shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:shadow-xl ${
                  isComplete ? 'border-emerald-300' : 'border-slate-100 group-hover:border-emerald-200'
                }`}>
                  <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="rounded-2xl bg-emerald-50 px-3 py-2">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                          Module {module.number}
                        </p>
                      </div>
                      {isComplete ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-slate-400" />
                      )}
                    </div>

                    <h3 className="text-lg font-black text-green-950">{module.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">{module.shortTitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{module.subtitle}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-slate-200 text-slate-600">
                        {module.minutes} min
                      </Badge>
                      <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                        {module.activity.title}
                      </Badge>
                    </div>

                    <div className="mt-4 flex items-center text-sm font-bold text-green-700">
                      {isComplete ? 'Review module' : 'Start module'}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50 p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="bg-green-700 text-white hover:bg-green-700">Second Part</Badge>
            <h2 className="mt-3 text-2xl font-black text-green-950">Live the career ladder</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-green-800/80">
              Step into the job from intern to managing director. Make client decisions,
              watch your trust and risk meters move, and unlock the next title.
            </p>
          </div>
          <Button onClick={onStartSimulator} className="bg-green-700 text-white hover:bg-green-800">
            Enter Simulator
            <Crown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <Card className="border-emerald-100 bg-white shadow-sm">
    <CardContent className="p-4">
      <div className="mb-3 inline-flex rounded-2xl bg-emerald-50 p-2 text-emerald-700">
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-green-950">{value}</p>
    </CardContent>
  </Card>
);

export default WealthManagementOverview;
