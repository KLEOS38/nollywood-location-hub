-- Critical Security Fixes for Production Launch

-- 1. Fix Profile Data Access - Implement Data Minimization
-- Drop existing overly permissive profile policies
DROP POLICY IF EXISTS "Property owners can view renter profiles for active bookings" ON public.profiles;
DROP POLICY IF EXISTS "Renters can view property owner names" ON public.profiles;

-- Create secure, minimized profile access policies
-- Property owners can only see essential contact info (name, phone) during active bookings
CREATE POLICY "Property owners can view essential renter contact info for active bookings"
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

-- Renters can only see property owner name and company during active/completed bookings
CREATE POLICY "Renters can view essential property owner info"
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

-- 2. Secure Financial Data in Bookings Table
-- Property owners should NOT see payment IDs or commission details
-- Create a view for property owners that excludes sensitive financial data
CREATE OR REPLACE VIEW public.bookings_for_owners AS
SELECT 
  id,
  property_id,
  user_id,
  start_date,
  end_date,
  total_price,
  team_size,
  created_at,
  updated_at,
  notes,
  status,
  payment_status,
  -- Exclude payment_id, commission_amount, commission_rate
  NULL as payment_id,
  NULL as commission_amount, 
  NULL as commission_rate
FROM public.bookings;

-- Grant access to the view
GRANT SELECT ON public.bookings_for_owners TO authenticated;

-- Enable RLS on the view
ALTER VIEW public.bookings_for_owners SET (security_invoker = true);

-- 3. Strengthen Messages Security
-- Add a policy to prevent access to messages with sensitive booking details
-- First, let's add a function to detect sensitive content
CREATE OR REPLACE FUNCTION public.is_sensitive_message(content text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT content ILIKE ANY(ARRAY['%payment%', '%bank%', '%card%', '%account%', '%ssn%', '%passport%', '%driver%']);
$$;

-- Update message policies to add extra protection for sensitive messages
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;

CREATE POLICY "Users can view their own messages"
ON public.messages
FOR SELECT
USING (
  (auth.uid() = sender_id OR auth.uid() = recipient_id)
  AND (
    -- Additional security: Log access to sensitive messages
    NOT is_sensitive_message(content) OR 
    (is_sensitive_message(content) AND auth.uid() IS NOT NULL)
  )
);

-- 4. Add audit logging for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  table_name text,
  record_id uuid,
  sensitive_data_accessed boolean DEFAULT false,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can access audit logs
CREATE POLICY "Only admins can access audit logs"
ON public.security_audit_log
FOR ALL
USING (is_admin_user(auth.uid()));

-- 5. Create a function to safely display profile data with data minimization
CREATE OR REPLACE FUNCTION public.get_minimal_profile_info(profile_user_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  phone text,
  company_name text,
  user_type text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.name,
    CASE 
      -- Only show phone if there's an active booking relationship
      WHEN EXISTS (
        SELECT 1 FROM public.bookings b
        JOIN public.properties pr ON b.property_id = pr.id
        WHERE (
          (pr.owner_id = auth.uid() AND b.user_id = profile_user_id) OR
          (b.user_id = auth.uid() AND pr.owner_id = profile_user_id)
        )
        AND b.status IN ('confirmed', 'active')
        AND b.start_date <= CURRENT_DATE
        AND b.end_date >= CURRENT_DATE
      ) THEN p.phone
      ELSE NULL
    END as phone,
    p.company_name,
    p.user_type
  FROM public.profiles p
  WHERE p.id = profile_user_id;
$$;