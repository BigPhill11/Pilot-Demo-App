-- Add device preference fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN device_preference text DEFAULT 'desktop' CHECK (device_preference IN ('mobile', 'tablet', 'desktop')),
ADD COLUMN mobile_optimized boolean DEFAULT false;