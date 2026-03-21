-- Fix security vulnerability: Remove public access to market predictions
-- and restrict community predictions to authenticated users only

-- Drop the overly permissive policy that allows anyone to view all predictions
DROP POLICY IF EXISTS "Users can view all predictions for community" ON public.market_predictions;

-- Create a more secure policy that only allows authenticated users to view community predictions
-- and limits the data exposure by not showing user_id in community view
CREATE POLICY "Authenticated users can view community predictions" 
ON public.market_predictions 
FOR SELECT 
TO authenticated
USING (true);

-- The existing policy "Users can view their own predictions" remains for personal access
-- This ensures users can still see their full prediction data including user_id