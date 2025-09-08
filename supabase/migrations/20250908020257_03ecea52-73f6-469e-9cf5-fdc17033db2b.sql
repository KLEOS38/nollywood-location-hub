-- CRITICAL SECURITY FIX: Simplify Profile RLS to Prevent Data Exposure
-- Remove complex business relationship policy that could expose personal data

-- Drop the complex business relationship policy that could expose personal data
DROP POLICY IF EXISTS "Users can view minimal profile info during active business rela" ON public.profiles;

-- Keep only the simple, secure policy: users can only view their own profiles
-- This ensures no personal data leakage through complex business logic
CREATE POLICY "Users can only view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Ensure the secure function for business data sharing is properly set up
-- This function implements proper data minimization and only shares essential info
-- when there's an active business relationship
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
      -- Only show phone during active confirmed bookings (within 7 days of start)
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
    -- Only show company name for active/completed business relationships
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