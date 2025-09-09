-- CRITICAL SECURITY FIX: Remove Conflicting Profile RLS Policies
-- Clean up duplicate and conflicting policies that could expose user data

-- Drop all existing policies on profiles table to start clean
DROP POLICY IF EXISTS "Users can only view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create single, clear RLS policies with no conflicts
-- Only authenticated users can view their own profile
CREATE POLICY "secure_profile_select"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Only authenticated users can update their own profile  
CREATE POLICY "secure_profile_update"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Ensure no INSERT or DELETE is allowed (profiles are created via trigger)
-- No additional policies needed - this blocks these operations by default