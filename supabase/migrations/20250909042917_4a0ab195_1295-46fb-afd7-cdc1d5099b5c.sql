-- Add missing RLS policies for new video tables

-- RLS Policies for video_transcripts
CREATE POLICY "Anyone can view published video transcripts" ON public.video_transcripts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.phils_friends_videos 
    WHERE id = video_transcripts.video_id AND published = true
  )
);

CREATE POLICY "Admins can manage all transcripts" ON public.video_transcripts
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_clips
CREATE POLICY "Anyone can view published clips" ON public.video_clips
FOR SELECT USING (published = true);

CREATE POLICY "Admins can manage all clips" ON public.video_clips
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_analytics
CREATE POLICY "Users can view their own analytics" ON public.video_analytics
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.video_analytics
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all analytics" ON public.video_analytics
FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for video_points
CREATE POLICY "Users can view their own points" ON public.video_points
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can award points" ON public.video_points
FOR INSERT WITH CHECK (true);

-- RLS Policies for video_badges
CREATE POLICY "Anyone can view badges" ON public.video_badges
FOR SELECT USING (true);

CREATE POLICY "Admins can manage badges" ON public.video_badges
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for user_video_badges
CREATE POLICY "Users can view their own badges" ON public.user_video_badges
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can award badges" ON public.user_video_badges
FOR INSERT WITH CHECK (true);

-- RLS Policies for video_streaks
CREATE POLICY "Users can view their own streaks" ON public.video_streaks
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON public.video_streaks
FOR ALL USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Storage policies for phil-videos bucket
CREATE POLICY "Admins can upload videos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'phil-videos' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can view all videos" ON storage.objects
FOR SELECT USING (
  bucket_id = 'phil-videos' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Storage policies for video-thumbnails bucket
CREATE POLICY "Anyone can view thumbnails" ON storage.objects
FOR SELECT USING (bucket_id = 'video-thumbnails');

CREATE POLICY "Admins can upload thumbnails" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'video-thumbnails' AND 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Storage policies for video-transcripts bucket
CREATE POLICY "Admins can manage transcripts" ON storage.objects
FOR ALL USING (
  bucket_id = 'video-transcripts' AND 
  has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  bucket_id = 'video-transcripts' AND 
  has_role(auth.uid(), 'admin'::app_role)
);