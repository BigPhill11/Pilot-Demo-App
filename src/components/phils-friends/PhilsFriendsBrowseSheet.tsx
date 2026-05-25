import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, Video } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import VideoDetailDialog from '@/components/videos/VideoDetailDialog';
import type { ReelCourseCategory } from '@/types/phils-friends';
import { normalizeCourseCategory } from '@/types/phils-friends';

interface BrowseVideo {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  role_tier: string;
  duration_sec: number;
  thumbnail_url?: string;
  source_type: string;
  source_url?: string;
  published: boolean;
  video_url?: string;
  company: string;
  course_category: string;
}

interface PhilsFriendsBrowseSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ReelCourseCategory;
}

const PhilsFriendsBrowseSheet: React.FC<PhilsFriendsBrowseSheetProps> = ({
  open,
  onOpenChange,
  category,
}) => {
  const [videos, setVideos] = useState<BrowseVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<BrowseVideo | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchVideos = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('phils_friends_videos')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;

        let filtered = (data || []) as BrowseVideo[];
        if (category !== 'all') {
          filtered = filtered.filter(
            (v) => normalizeCourseCategory(v.course_category) === category
          );
        }
        setVideos(filtered);
      } catch (e) {
        console.error(e);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [open, category]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 flex flex-col">
          <SheetHeader className="px-4 pt-4 pb-2 border-b">
            <SheetTitle className="text-green-800">Browse full interviews</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-xl" />
                ))}
              </div>
            ) : videos.length === 0 ? (
              <p className="text-center text-muted-foreground py-12 text-sm">No videos yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {videos.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedVideo(video);
                      setShowDetail(true);
                    }}
                  >
                    <div className="relative aspect-video bg-muted">
                      {video.thumbnail_url ? (
                        <img
                          src={video.thumbnail_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {formatDuration(video.duration_sec || 0)}
                      </span>
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm line-clamp-2">
                        {video.name || video.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-1 text-xs">
                        {video.company}
                      </CardDescription>
                      {video.role_tier && (
                        <Badge variant="secondary" className="text-[10px] mt-1 w-fit">
                          {video.role_tier}
                        </Badge>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <VideoDetailDialog
        video={selectedVideo as Parameters<typeof VideoDetailDialog>[0]['video']}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
};

export default PhilsFriendsBrowseSheet;
