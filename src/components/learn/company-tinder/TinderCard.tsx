import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CompanyProfile } from '@/components/learn/CompanySwipeCard';
import { Building2, TrendingUp, DollarSign, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleDragEnd = (event: any, info: any) => {
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
      whileDrag={{ scale: 1.05, rotate: dragStart > 0 ? 5 : -5 }}
      onDragStart={(e, info) => setDragStart(info.offset.x)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="cursor-grab active:cursor-grabbing touch-pan-y select-none"
    >
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {company.logoUrl && (
                <img
                  src={company.logoUrl}
                  alt={`${company.name} logo`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-3xl font-bold">{company.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{company.ticker}</Badge>
                  <span className="text-muted-foreground">{company.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="quick-stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick-stats">📊 Quick Stats</TabsTrigger>
              <TabsTrigger value="professional">💼 Professional</TabsTrigger>
              <TabsTrigger value="dating">💘 Dating Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="quick-stats" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm">Market Cap</span>
                  </div>
                  <p className="text-2xl font-bold">{company.marketCap}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Revenue (TTM)</span>
                  </div>
                  <p className="text-2xl font-bold">{company.revenueTTM}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">P/E Ratio</span>
                  </div>
                  <p className="text-2xl font-bold">{company.peRatio}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">HQ</span>
                  </div>
                  <p className="text-lg font-semibold">{company.headquarters}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">{company.professional.overview}</p>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">OVERVIEW</h3>
                <p className="text-sm">{company.professional.overview}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">KEY METRICS</h3>
                <div className="grid grid-cols-1 gap-2">
                  {company.professional.kpis.map((kpi, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm font-medium">{kpi.title}</span>
                      <span className="text-sm text-muted-foreground">{kpi.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">FINANCIALS</h3>
                <div className="grid grid-cols-1 gap-2">
                  {company.professional.financials.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dating" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">💭 MARKET SENTIMENT</h3>
                <p className="text-sm italic">{company.dating.marketSentiment}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">📊 ANALYST SENTIMENT</h3>
                <p className="text-sm italic">{company.dating.analystSentiment}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">📈 HISTORICAL PERFORMANCE</h3>
                <p className="text-sm italic">{company.dating.historicalPerformance}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TinderCard;
