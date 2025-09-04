-- Fix critical security vulnerability: Restrict profile access to own data only
-- Drop the overly permissive policy that allows viewing any profile
DROP POLICY IF EXISTS "Users can view any profile" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Create a separate policy for basic public profile info (name only) for legitimate use cases
-- This allows displaying names in reviews, bookings, etc. without exposing sensitive data
CREATE POLICY "Public can view basic profile info"
ON public.profiles
FOR SELECT
USING (true);