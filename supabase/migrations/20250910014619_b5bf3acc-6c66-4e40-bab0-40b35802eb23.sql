-- FINAL SECURITY FIX: Strengthen Admin Access Control  
-- This addresses the ERROR level admin privilege escalation finding

-- Drop the current admin policy and recreate with stronger controls
DROP POLICY IF EXISTS "secure_admin_access" ON public.admin_users;

-- Create a more restrictive admin policy that requires explicit admin status
-- This prevents any potential privilege escalation attacks
CREATE POLICY "strict_admin_only_access"
ON public.admin_users
FOR ALL
TO authenticated
USING (
  -- Only allow access if the user is already confirmed in admin_users table
  -- Use a simple EXISTS check to avoid function dependencies
  EXISTS (
    SELECT 1 
    FROM public.admin_users existing_admin 
    WHERE existing_admin.user_id = auth.uid()
  )
)
WITH CHECK (
  -- Same strict check for writes
  EXISTS (
    SELECT 1 
    FROM public.admin_users existing_admin 
    WHERE existing_admin.user_id = auth.uid()
  )
);

-- Ensure the admin functions are bulletproof by adding additional validation
CREATE OR REPLACE FUNCTION public.is_admin_user(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  -- Add explicit null check and validate user_uuid
  SELECT CASE 
    WHEN user_uuid IS NULL THEN false
    WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_uuid) THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = user_uuid 
      AND role IS NOT NULL
    )
  END;
$$;

-- Update the admin status function with the same validation
CREATE OR REPLACE FUNCTION public.get_user_admin_status(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  -- Add explicit validation to prevent any bypass attempts
  SELECT CASE 
    WHEN check_user_id IS NULL THEN false
    WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE id = check_user_id) THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = check_user_id 
      AND role IS NOT NULL
    )
  END;
$$;