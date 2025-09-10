-- CRITICAL SECURITY FIX: Block Public Access to Sensitive Tables
-- This fixes the ERROR level security findings for profiles and bookings tables

-- Add explicit public access denial policies for profiles table
-- This prevents any unauthorized access attempts to sensitive user data
CREATE POLICY "deny_public_access_profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add explicit public access denial policies for bookings table  
-- This prevents unauthorized access to financial transaction data
CREATE POLICY "deny_public_access_bookings"
ON public.bookings
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add explicit public access denial policies for messages table
-- This prevents unauthorized access to private communications
CREATE POLICY "deny_public_access_messages"
ON public.messages
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add explicit public access denial policies for admin_users table
-- This prevents unauthorized access to administrative data
CREATE POLICY "deny_public_access_admin"
ON public.admin_users
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Add explicit public access denial policies for security_audit_log table  
-- This prevents unauthorized access to security monitoring data
CREATE POLICY "deny_public_access_audit_log"
ON public.security_audit_log
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Also secure other sensitive tables
CREATE POLICY "deny_public_access_referrals"
ON public.referrals
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "deny_public_access_disputes"
ON public.disputes
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "deny_public_access_favorites"
ON public.favorites
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "deny_public_access_notifications"
ON public.notifications
FOR ALL
TO anon
USING (false)
WITH CHECK (false);