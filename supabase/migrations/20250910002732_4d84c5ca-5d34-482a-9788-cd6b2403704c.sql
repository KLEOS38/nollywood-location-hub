-- CRITICAL SECURITY FIX: Fix Admin Users Infinite Recursion and Policy Conflicts
-- This addresses the ERROR level security finding and infinite recursion in PostgreSQL logs

-- Drop conflicting admin policies to prevent infinite recursion
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Explicit admin user access control" ON public.admin_users;

-- Create a security definer function for admin checks to prevent recursion
CREATE OR REPLACE FUNCTION public.get_user_admin_status(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = check_user_id
  );
$$;

-- Create single, clear admin policy using the security definer function
CREATE POLICY "secure_admin_access"
ON public.admin_users
FOR ALL
TO authenticated
USING (public.get_user_admin_status(auth.uid()))
WITH CHECK (public.get_user_admin_status(auth.uid()));

-- Fix the function search path issues by updating existing functions
-- Update all functions to have proper search_path set

-- Fix is_admin_user function
CREATE OR REPLACE FUNCTION public.is_admin_user(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
$$;

-- Fix is_admin function  
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
$$;

-- Fix is_sensitive_message function
CREATE OR REPLACE FUNCTION public.is_sensitive_message(content text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT content ILIKE ANY(ARRAY['%payment%', '%bank%', '%card%', '%account%', '%ssn%', '%passport%', '%driver%']);
$$;

-- Fix get_user_id function
CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT auth.uid();
$$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'renter')
  );
  RETURN NEW;
END;
$$;