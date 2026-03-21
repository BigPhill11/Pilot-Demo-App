-- Fix security vulnerability: Remove public access to user_social_stats table
-- This prevents competitors from harvesting user social media profiles and follower data

-- Drop the overly permissive policy that allows anyone to view social stats
DROP POLICY IF EXISTS "Anyone can view social stats" ON public.user_social_stats;

-- Create a secure policy that only allows authenticated users to view social stats
-- This prevents anonymous harvesting while still allowing legitimate app functionality
CREATE POLICY "Authenticated users can view social stats" 
ON public.user_social_stats 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Keep the existing user-specific update policy (this is already secure)
-- CREATE POLICY "Users can update their own stats" 
-- ON public.user_social_stats 
-- FOR UPDATE 
-- USING (auth.uid() = user_id);