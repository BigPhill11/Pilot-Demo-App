-- Allow Phil to upload to phil-videos and video-thumbnails regardless of whether
-- the user_roles grant ran correctly. Email-based fallback policies are permissive
-- (OR-ed with the existing has_role policy), so this only adds access, never removes.

-- Storage: phil-videos uploads
DROP POLICY IF EXISTS "Phil can upload videos" ON storage.objects;
CREATE POLICY "Phil can upload videos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'phil-videos'
  AND auth.email() = 'phillipghead@gmail.com'
);

-- Storage: phil-videos reads (belt-and-suspenders alongside the public bucket)
DROP POLICY IF EXISTS "Phil can view his videos" ON storage.objects;
CREATE POLICY "Phil can view his videos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'phil-videos'
  AND auth.email() = 'phillipghead@gmail.com'
);

-- Storage: video-thumbnails uploads
DROP POLICY IF EXISTS "Phil can upload thumbnails" ON storage.objects;
CREATE POLICY "Phil can upload thumbnails"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'video-thumbnails'
  AND auth.email() = 'phillipghead@gmail.com'
);

-- DB table: allow Phil to insert/update/delete phils_friends_videos rows
DROP POLICY IF EXISTS "Phil can manage all Phil videos" ON public.phils_friends_videos;
CREATE POLICY "Phil can manage all Phil videos"
ON public.phils_friends_videos
FOR ALL
USING (auth.email() = 'phillipghead@gmail.com')
WITH CHECK (auth.email() = 'phillipghead@gmail.com');

-- Re-ensure the admin role grant (idempotent — only runs if user exists)
DO $$
BEGIN
  IF to_regclass('public.user_roles') IS NOT NULL
     AND to_regtype('public.app_role') IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    SELECT id, 'admin'::public.app_role
    FROM auth.users
    WHERE lower(email) = 'phillipghead@gmail.com'
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;
