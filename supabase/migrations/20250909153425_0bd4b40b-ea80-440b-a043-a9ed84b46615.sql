-- BULLETPROOF SECURITY FIX: Strengthen Profile RLS with Authentication Checks
-- Add explicit authentication checks to prevent any possible bypass

-- Drop existing policies to recreate with stronger security
DROP POLICY IF EXISTS "secure_profile_select" ON public.profiles;
DROP POLICY IF EXISTS "secure_profile_update" ON public.profiles;

-- Create ironclad RLS policies with explicit authentication checks
-- Policy 1: SELECT - Only authenticated users can view their own profile
CREATE POLICY "authenticated_users_own_profile_select"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = id);

-- Policy 2: UPDATE - Only authenticated users can update their own profile
CREATE POLICY "authenticated_users_own_profile_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = id);

-- Ensure RLS is enabled (should already be, but double-checking)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- No INSERT or DELETE policies - profiles are managed via trigger only
-- This prevents any unauthorized profile creation or deletion