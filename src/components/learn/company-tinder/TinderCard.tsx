import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import {
  Building2,
  TrendingUp,
  DollarSign,
  MapPin,
  BarChart3,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

const PHIL_LOGO = '/lovable-uploads/ae543fd6-94e8-4c76-a9aa-b6cb9460a647.png';

interface TinderCardProps {
  company: CompanyProfile;
  onSwipeComplete?: (direction: 'left' | 'right') => void;
}

const TinderCard: React.FC<TinderCardProps> = ({ company, onSwipeComplete }) => {
  const [dragStart, setDragStart] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 100) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipeComplete?.(direction);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        window.dispatchEvent(new CustomEvent('tinderSwipe', { detail: 'pass' }));
      } else {
        window.dispatchEvent(new CustomEvent('tinderSwipe', { detail: 'like' }));
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.03, rotate: dragStart > 0 ? 4 : -4 }}
      onDragStart={(_e, info) => setDragStart(info.offset.x)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="cursor-grab active:cursor-grabbing touch-pan-y select-none"
    >
      <Card
        className="w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/[0.08] via-background to-muted/40 shadow-xl shadow-primary/10 ring-1 ring-primary/10"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-emerald-400/90 to-primary" aria-hidden />
        <CardHeader className="pb-3 pt-4 space-y-0 bg-primary/[0.04] border-b border-primary/10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4 min-w-0">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shadow-md"
                />
              )}
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate">
                  {company.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20">
                    {company.ticker}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{company.industry}</span>
                </div>
              </div>
            </div>
            <img
              src={PHIL_LOGO}
              alt="Phil's Financials"
              className="h-11 w-11 shrink-0 rounded-xl object-contain opacity-95 ring-1 ring-primary/20 bg-background/80 p-0.5"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-4 pb-5">
          <Tabs defaultValue="quick-stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto gap-1 bg-primary/10 p-1 rounded-xl border border-primary/15">
              <TabsTrigger
                value="quick-stats"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-1.5 text-xs sm:text-sm py-2"
              >
                <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Quick stats</span>
              </TabsTrigger>
              <TabsTrigger
                value="professional"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-1.5 text-xs sm:text-sm py-2"
              >
                <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Professional</span>
              </TabsTrigger>
              <TabsTrigger
                value="dating"
                className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-1.5 text-xs sm:text-sm py-2"
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Story</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quick-stats" className="space-y-4 focus-visible:outline-none">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                <div className="rounded-xl border border-primary/15 bg-background/60 p-3 sm:p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">Market cap</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{company.marketCap}</p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-background/60 p-3 sm:p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">Revenue (TTM)</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{company.revenueTTM}</p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-background/60 p-3 sm:p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm">P/E ratio</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{company.peRatio}</p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-background/60 p-3 sm:p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">HQ</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{company.headquarters}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-primary/10">
                <p className="text-sm text-muted-foreground leading-relaxed">{company.professional.overview}</p>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4 focus-visible:outline-none">
              <div className="rounded-xl border border-primary/10 bg-background/50 p-4 mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary">Overview</h3>
                <p className="text-sm leading-relaxed">{company.professional.overview}</p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary">Key metrics</h3>
                <div className="rounded-xl border border-primary/10 overflow-hidden divide-y divide-primary/10 bg-background/50">
                  {company.professional.kpis.map((kpi, index) => (
                    <div key={index} className="flex justify-between items-center gap-3 px-3 py-2.5 sm:px-4">
                      <span className="text-sm font-medium">{kpi.title}</span>
                      <span className="text-sm text-muted-foreground text-right">{kpi.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary">Financials</h3>
                <div className="rounded-xl border border-primary/10 overflow-hidden divide-y divide-primary/10 bg-background/50">
                  {company.professional.financials.map((item, index) => (
                    <div key={index} className="flex justify-between items-center gap-3 px-3 py-2.5 sm:px-4">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dating" className="space-y-4 focus-visible:outline-none">
              <div className="rounded-xl border border-primary/10 bg-primary/[0.04] p-4 mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Market sentiment
                </h3>
                <p className="text-sm italic text-muted-foreground leading-relaxed">{company.dating.marketSentiment}</p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-background/50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary">Analyst sentiment</h3>
                <p className="text-sm italic text-muted-foreground leading-relaxed">{company.dating.analystSentiment}</p>
              </div>

              <div className="rounded-xl border border-primary/10 bg-background/50 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide mb-2 text-primary">Historical performance</h3>
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  {company.dating.historicalPerformance}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TinderCard;
