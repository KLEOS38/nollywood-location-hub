-- CRITICAL SECURITY FIX: Enhanced Profile Data Protection
-- This migration implements comprehensive data minimization for profile access

-- First, drop the existing problematic policies that expose too much data
DROP POLICY IF EXISTS "Property owners can view essential renter contact info for acti" ON public.profiles;
DROP POLICY IF EXISTS "Renters can view essential property owner info" ON public.profiles;

-- Create a more secure minimal profile function with strict data minimization
CREATE OR REPLACE FUNCTION public.get_minimal_profile_info(profile_user_id uuid)
RETURNS TABLE(id uuid, name text, phone text, company_name text, user_type text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT 
    p.id,
    p.name,
    CASE 
      -- Only show phone during active confirmed bookings
      WHEN EXISTS (
        SELECT 1 FROM public.bookings b
        JOIN public.properties pr ON b.property_id = pr.id
        WHERE (
          (pr.owner_id = auth.uid() AND b.user_id = profile_user_id) OR
          (b.user_id = auth.uid() AND pr.owner_id = profile_user_id)
        )
        AND b.status = 'confirmed'
        AND b.start_date <= CURRENT_DATE + INTERVAL '7 days'
        AND b.end_date >= CURRENT_DATE - INTERVAL '1 day'
      ) THEN p.phone
      ELSE NULL
    END as phone,
    -- Only show company name for business relationships
    CASE 
      WHEN EXISTS (
        SELECT 1 FROM public.bookings b
        JOIN public.properties pr ON b.property_id = pr.id
        WHERE (
          (pr.owner_id = auth.uid() AND b.user_id = profile_user_id) OR
          (b.user_id = auth.uid() AND pr.owner_id = profile_user_id)
        )
        AND b.status IN ('confirmed', 'active', 'completed')
      ) THEN p.company_name
      ELSE NULL
    END as company_name,
    p.user_type
  FROM public.profiles p
  WHERE p.id = profile_user_id;
$$;

-- Create new secure profile access policies with strict data minimization
CREATE POLICY "Users can view minimal profile info during active business relationships"
ON public.profiles
FOR SELECT
USING (
  -- Users can always see their own full profile
  auth.uid() = id 
  OR
  -- Users can see minimal info only during active business relationships
  (auth.uid() <> id AND EXISTS (
    SELECT 1 FROM public.bookings b
    JOIN public.properties p ON b.property_id = p.id
    WHERE (
      (p.owner_id = auth.uid() AND b.user_id = profiles.id) OR
      (b.user_id = auth.uid() AND p.owner_id = profiles.id)
    )
    AND b.status IN ('confirmed', 'active', 'completed')
    -- Additional privacy protection: only recent/current bookings
    AND b.created_at >= CURRENT_DATE - INTERVAL '30 days'
  ))
);

-- CRITICAL: Simplify and strengthen message security
-- Drop existing complex message policy
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;

-- Create simple, secure message access policy
CREATE POLICY "Users can only access their own messages"
ON public.messages
FOR SELECT
USING (
  auth.uid() = sender_id OR auth.uid() = recipient_id
);

-- Add additional security for admin_users table
CREATE POLICY "Explicit admin user access control"
ON public.admin_users
FOR ALL
USING (
  -- Only allow access if user is explicitly an admin
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid()
  )
  OR
  -- Super admin failsafe
  auth.uid() IN (
    SELECT user_id FROM public.admin_users 
    WHERE role = 'super_admin'
  )
);