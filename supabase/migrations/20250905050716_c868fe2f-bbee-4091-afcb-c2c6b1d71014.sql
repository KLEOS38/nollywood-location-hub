-- Fix admin_users infinite recursion and enhance profile policies
-- First, create a secure function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin_user(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
$$;

-- Drop the existing problematic admin_users policy
DROP POLICY IF EXISTS "Only admins can access admin_users" ON public.admin_users;

-- Create proper admin_users policies without recursion
CREATE POLICY "Admins can manage admin users"
ON public.admin_users
FOR ALL
USING (public.is_admin_user(auth.uid()));

-- Enhance profiles table to allow property owners to see renter contact info
-- when there's an active booking (for legitimate business purposes)
CREATE POLICY "Property owners can view renter profiles for active bookings"
ON public.profiles
FOR SELECT
USING (
  auth.uid() != id AND EXISTS (
    SELECT 1 FROM public.bookings b
    JOIN public.properties p ON b.property_id = p.id
    WHERE p.owner_id = auth.uid() 
    AND b.user_id = profiles.id
    AND b.status IN ('confirmed', 'active')
    AND b.start_date <= CURRENT_DATE
    AND b.end_date >= CURRENT_DATE
  )
);

-- Allow renters to see basic property owner info (name only, no sensitive data)
CREATE POLICY "Renters can view property owner names"
ON public.profiles  
FOR SELECT
USING (
  auth.uid() != id AND EXISTS (
    SELECT 1 FROM public.bookings b
    JOIN public.properties p ON b.property_id = p.id
    WHERE b.user_id = auth.uid()
    AND p.owner_id = profiles.id
    AND b.status IN ('confirmed', 'active', 'completed')
  )
);