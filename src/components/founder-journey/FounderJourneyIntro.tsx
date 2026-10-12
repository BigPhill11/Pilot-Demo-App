import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import PandaLogo from '@/components/icons/PandaLogo';

const steps = [
  { title: 'Welcome, future founder', message: 'I’m Phil. A founder brings an idea to life by solving a problem for someone. You do not need a finished business or money to invest to begin. Bring a problem you notice at school or in your community.', points: ['Practice decisions before committing resources.', 'Use your own idea in the Founder Plan.'] },
  { title: 'Your route: six modules, eighteen lessons', message: 'Start with real demand, learn how the money works, then prepare to launch with a team. Each of the six modules has three lessons. Finish one lesson to unlock the next.', points: ['Discover: Idea to MVP and Customer Validation.', 'Business: Money & Funding and Pricing & First Sales.', 'Launch: Your First Team and Launch & Learn.'] },
  { title: 'Learn, decide, explain, build', message: 'Each lesson starts with five comic panels and worked examples. Then make three simulator decisions, answer four questions, explain the concept to Phil, and add to your canvas.', points: ['Score at least 75% on the knowledge check.', 'Allow about 18 minutes per lesson; pause and resume.', 'Review completed lessons without earning duplicate rewards.'] },
  { title: 'Build a plan and choose your next move', message: 'Your nine-block Founder Plan grows across the journey. Keep answers short, specific, and grounded in evidence. Earn XP and bamboo when you complete lessons, then print your completed plan.', points: ['Answers save on this browser for your account.', 'For students in a class, signed-in module progress syncs to the teacher dashboard.', 'This is practice. Check permissions and get appropriate adult support before a real launch.'] },
];

const FounderJourneyIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const step = steps[index];
  return <Dialog open onOpenChange={(open) => !open && onComplete()}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-md overflow-y-auto rounded-3xl p-5 sm:p-6">
      <p className="pr-8 text-xs font-semibold text-muted-foreground">Journey intro · {index + 1} of {steps.length}</p>
      <Progress value={(index + 1) / steps.length * 100} className="h-2" />
      <PandaLogo className="mx-auto h-20 w-20" />
      <DialogTitle className="text-center text-xl">{step.title}</DialogTitle>
      <DialogDescription className="text-center text-sm leading-relaxed">{step.message}</DialogDescription>
      <ul className="space-y-2 rounded-2xl bg-primary/5 p-4 text-sm leading-relaxed">{step.points.map((point) => <li key={point} className="flex gap-2"><span aria-hidden className="text-primary">•</span><span>{point}</span></li>)}</ul>
      <div className="flex gap-3"><Button variant="outline" className="h-12 flex-1" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ChevronLeft className="mr-1 h-4 w-4" />Back</Button><Button className="h-12 flex-1" onClick={() => index === steps.length - 1 ? onComplete() : setIndex((value) => value + 1)}>{index === steps.length - 1 ? 'Explore the Journey' : 'Next'}<ChevronRight className="ml-1 h-4 w-4" /></Button></div>
      <Button variant="ghost" className="h-11 text-muted-foreground" onClick={onComplete}>Skip intro</Button>
    </DialogContent>
  </Dialog>;
};
export default FounderJourneyIntro;
