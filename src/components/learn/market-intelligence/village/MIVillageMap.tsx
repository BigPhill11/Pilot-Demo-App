import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import type { VillageModuleConfig } from '@/types/village-lesson';
import { VILLAGE_MODULES } from '@/data/village-lessons';
import { useVillageLessonProgress } from '@/hooks/useVillageLessonProgress';

interface MIVillageMapProps {
  onSelectModule: (moduleId: string) => void;
  totalXp: number;
  totalBamboo: number;
}

import { VILLAGE_ASSET_VERSION, VILLAGE_BUILDING_ASSETS } from './village-assets';

export { VILLAGE_ASSET_VERSION, VILLAGE_BUILDING_ASSETS };

const MAP_SRC = `/market-intelligence/village/map.svg?${VILLAGE_ASSET_VERSION}`;

const BUILDING_CONFIGS: Record<
  string,
  { accentColor: string; roofColor: string; glowColor: string }
> = {
  'business-economics': {
    accentColor: '#334155',
    roofColor: '#475569',
    glowColor: 'rgba(148,163,184,0.5)',
  },
  ownership: {
    accentColor: '#92400e',
    roofColor: '#b45309',
    glowColor: 'rgba(217,119,6,0.5)',
  },
  'language-finance': {
    accentColor: '#4c1d95',
    roofColor: '#6d28d9',
    glowColor: 'rgba(124,58,237,0.5)',
  },
  'markets-headlines': {
    accentColor: '#134e4a',
    roofColor: '#0f766e',
    glowColor: 'rgba(13,148,136,0.5)',
  },
  'business-foundations': {
    accentColor: '#9a3412',
    roofColor: '#c2410c',
    glowColor: 'rgba(234,88,12,0.5)',
  },
  'company-tinder': {
    accentColor: '#831843',
    roofColor: '#9d174d',
    glowColor: 'rgba(190,24,93,0.5)',
  },
};

/** Positions are intentionally pulled inward so labels never clip at map edges. */
const HOTSPOTS: Record<string, { top: string; left: string; width: string }> = {
  'business-economics': { top: '10%', left: '23%', width: 'clamp(82px, 14vw, 122px)' },
  ownership: { top: '10%', left: '67%', width: 'clamp(82px, 14vw, 122px)' },
  'language-finance': { top: '39%', left: '24%', width: 'clamp(78px, 13vw, 116px)' },
  'markets-headlines': { top: '39%', left: '72%', width: 'clamp(78px, 13vw, 116px)' },
  'business-foundations': { top: '64%', left: '36%', width: 'clamp(78px, 13vw, 116px)' },
  'company-tinder': { top: '64%', left: '63%', width: 'clamp(78px, 13vw, 116px)' },
};

interface BuildingHotspotProps {
  module: VillageModuleConfig;
  completed: number;
  total: number;
  onClick: () => void;
}

const BuildingHotspot: React.FC<BuildingHotspotProps> = ({
  module,
  completed,
  total,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const colors = BUILDING_CONFIGS[module.id];
  const isGame = module.isSwipeGame;
  const isCompleted = percent === 100;
  const hotspot = HOTSPOTS[module.id];
  const assetSrc = `${VILLAGE_BUILDING_ASSETS[module.id]}?${VILLAGE_ASSET_VERSION}`;

  return (
    <div
      className="absolute select-none touch-manipulation"
      style={{
        top: hotspot.top,
        left: hotspot.left,
        width: hotspot.width,
        transform: `translate(-50%, 0) scale(${hovered ? 1.04 : 1})`,
        transition: 'transform 0.2s ease, filter 0.2s ease',
        filter: hovered ? `drop-shadow(0 10px 20px ${colors.glowColor})` : undefined,
        zIndex: hovered ? 30 : 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={assetSrc}
        alt={`${module.name} building`}
        className="mx-auto h-auto w-[min(100%,clamp(72px,10vw,104px))] pointer-events-none"
        draggable={false}
        loading="eager"
      />

      <button
        className="absolute left-1/2 top-0 h-[clamp(70px,10vw,104px)] w-[clamp(70px,10vw,104px)] -translate-x-1/2 rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-green-300/70"
        style={{
          background: hovered ? `radial-gradient(circle, ${colors.glowColor} 0%, transparent 68%)` : 'transparent',
        }}
        onClick={onClick}
        aria-label={`Enter ${module.name}`}
      />

      <div
        className="relative -mt-1 px-2 py-1.5 rounded-xl text-center shadow-lg backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(255,255,255,0.94)',
          border: '2px solid',
          borderColor: colors.accentColor,
        }}
      >
        <div className="text-[10px] sm:text-[11px] font-bold leading-tight" style={{ color: colors.accentColor }}>
          {module.name}
        </div>
        {isGame ? (
          <div className="text-[9px] mt-0.5 font-medium flex items-center justify-center gap-0.5" style={{ color: colors.roofColor }}>
            <Sparkles className="h-2.5 w-2.5" />
            Swipe game
          </div>
        ) : total > 0 ? (
          <div className="mt-1">
            <div className="flex items-center gap-1 justify-between text-[8px]" style={{ color: colors.accentColor }}>
              <span>{completed}/{total}</span>
              <span>{percent}%</span>
            </div>
            <div className="h-1.5 rounded-full mt-0.5 overflow-hidden" style={{ backgroundColor: `${colors.accentColor}25` }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${percent}%`, backgroundColor: colors.accentColor }} />
            </div>
          </div>
        ) : null}
        {isCompleted && <div className="text-[9px] mt-0.5 text-amber-500 font-bold">★ Complete</div>}
      </div>
    </div>
  );
};

const MIVillageMap: React.FC<MIVillageMapProps> = ({ onSelectModule, totalXp, totalBamboo }) => {
  const { getModuleProgress } = useVillageLessonProgress();

  return (
    <div
      className="relative w-full select-none mx-auto overflow-hidden rounded-b-xl"
      style={{
        width: '100%',
        maxWidth: '100%',
        height: 'clamp(320px, min(64vh, calc(100dvh - 16rem)), 620px)',
        aspectRatio: '16 / 10',
      }}
    >
      <img
        src={MAP_SRC}
        alt="Market Intelligence Village map"
        className="absolute inset-0 h-full w-full object-contain"
        draggable={false}
      />

      {VILLAGE_MODULES.map((module) => {
        const prog = module.isSwipeGame
          ? { completed: 0, total: 0, percent: 0 }
          : getModuleProgress(module.id, module.lessons.length);
        return (
          <BuildingHotspot
            key={module.id}
            module={module}
            completed={prog.completed}
            total={prog.total}
            onClick={() => onSelectModule(module.id)}
          />
        );
      })}

      <div className="absolute top-2 right-2 flex flex-col gap-1.5 pointer-events-none z-20">
        {totalXp > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-lg"
            style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)' }}>
            ⚡ {totalXp.toLocaleString()} XP
          </div>
        )}
        {totalBamboo > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-lg"
            style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(8px)' }}>
            🎋 {totalBamboo.toLocaleString()} Bamboo
          </div>
        )}
      </div>

      <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg pointer-events-none z-20"
        style={{ background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(6px)' }}>
        <MapPin className="h-3.5 w-3.5 text-green-300" aria-hidden />
        <span className="text-[10px] text-green-300 font-medium">Tap a building to enter</span>
      </div>
    </div>
  );
};

export default MIVillageMap;
