-- Fix the conflicting policies for profiles table
-- Drop the overly permissive public policy
DROP POLICY IF EXISTS "Public can view basic profile info" ON public.profiles;

-- Keep only the secure policy that allows users to view their own profiles
-- This will require updates to application code to handle cases where profile names 
-- are needed for display purposes (reviews, bookings, etc.)

-- For cases where we need to show basic profile info (like names in reviews),
-- we'll need to create a separate view or modify the application logic