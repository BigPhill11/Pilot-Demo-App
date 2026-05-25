import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { ReelFeedItem } from '@/types/phils-friends';

interface ReelOverlayProps {
  item: ReelFeedItem;
}

const ReelOverlay: React.FC<ReelOverlayProps> = ({ item }) => {
  const video = item.type === 'clip' ? item.video : item.video;
  const title = item.type === 'clip' ? item.clip.title : video.title;
  const hook =
    item.type === 'clip'
      ? item.clip.excerpt || video.description
      : video.description;
  const speaker = video.speaker_name || video.name || 'Industry pro';
  const role = video.role_tier || video.level;
  const company = video.company;

  const durationSec =
    item.type === 'clip'
      ? Math.round(item.clip.end_sec - item.clip.start_sec)
      : video.duration_sec ?? 0;

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-10 pointer-events-none pb-4 pr-20"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="bg-gradient-to-t from-white via-white/95 to-transparent pt-16 px-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {video.category && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 border-0 text-xs"
            >
              {video.category}
            </Badge>
          )}
          {role && (
            <Badge variant="outline" className="border-green-200 text-green-800 text-xs">
              {role}
            </Badge>
          )}
          {durationSec > 0 && (
            <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
              {Math.floor(durationSec / 60)}:{String(durationSec % 60).padStart(2, '0')}
            </Badge>
          )}
        </div>

        <p className="text-green-900 font-bold text-lg leading-tight mb-0.5">{speaker}</p>
        {company && <p className="text-green-700 text-sm mb-2">{company}</p>}

        <h3 className="text-green-900 font-semibold text-base leading-snug mb-1">{title}</h3>
        {hook && (
          <p className="text-green-800/90 text-sm line-clamp-2 leading-relaxed">{hook}</p>
        )}
      </div>
    </div>
  );
};

export default ReelOverlay;
