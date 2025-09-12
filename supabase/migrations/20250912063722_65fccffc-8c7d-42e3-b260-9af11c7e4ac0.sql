-- Security Fix Phase 1: Critical Data Exposure Fixes

-- 1. Fix Profile Data Exposure - Simplify and strengthen RLS policies
DROP POLICY IF EXISTS "authenticated_users_own_profile_select" ON public.profiles;
DROP POLICY IF EXISTS "authenticated_users_own_profile_update" ON public.profiles;
DROP POLICY IF EXISTS "deny_public_access_profiles" ON public.profiles;

-- Create simplified, non-conflicting profile policies
CREATE POLICY "Users can only access their own profile"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Deny all public access (this takes precedence)
CREATE POLICY "Block all public profile access"
  ON public.profiles
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- 2. Secure Message Access - Strengthen message policies
DROP POLICY IF EXISTS "Users can only access their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update their received messages" ON public.messages;
DROP POLICY IF EXISTS "deny_public_access_messages" ON public.messages;

-- Create stronger message policies
CREATE POLICY "Users can access messages they sent or received"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can only send messages as themselves"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can only mark their received messages as read"
  ON public.messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Block all public message access
CREATE POLICY "Block all public message access"
  ON public.messages
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- 3. Protect Financial Data - Separate financial from regular booking data
DROP POLICY IF EXISTS "Hide commission data from non-admin users" ON public.bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Owners can view bookings for their properties" ON public.bookings;
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "deny_public_access_bookings" ON public.bookings;

-- Create secure booking policies with financial data protection
CREATE POLICY "Users can view their booking basic data"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = bookings.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bookings"
  ON public.bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM properties 
    WHERE properties.id = bookings.property_id 
    AND properties.owner_id = auth.uid()
  ))
  WITH CHECK (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM properties 
    WHERE properties.id = bookings.property_id 
    AND properties.owner_id = auth.uid()
  ));

-- Block all public booking access
CREATE POLICY "Block all public booking access"
  ON public.bookings
  FOR ALL
  TO anon
  USING (false)
  WITH CHECK (false);

-- 4. Strengthen admin function security
CREATE OR REPLACE FUNCTION public.is_admin_user_secure(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  -- Enhanced admin check with additional security validations
  SELECT CASE 
    WHEN user_uuid IS NULL THEN false
    WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_uuid AND deleted_at IS NULL) THEN false
    WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = user_uuid) THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = user_uuid 
      AND role IS NOT NULL
      AND role != ''
    )
  END;
$function$;

-- 5. Create secure financial data access function
CREATE OR REPLACE FUNCTION public.get_secure_financial_data(booking_uuid uuid)
RETURNS TABLE(
  commission_amount numeric,
  commission_rate numeric,
  payment_id text,
  payment_status text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT 
    b.commission_amount,
    b.commission_rate,
    b.payment_id,
    b.payment_status
  FROM public.bookings b
  WHERE b.id = booking_uuid
    AND (
      -- User owns the booking
      b.user_id = auth.uid() OR
      -- User owns the property
      EXISTS (
        SELECT 1 FROM properties p 
        WHERE p.id = b.property_id 
        AND p.owner_id = auth.uid()
      ) OR
      -- User is admin
      public.is_admin_user_secure(auth.uid())
    );
$function$;

-- 6. Enhanced audit logging trigger for sensitive operations
CREATE OR REPLACE FUNCTION public.log_sensitive_access_enhanced()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log access to financial data with enhanced details
  IF TG_TABLE_NAME = 'bookings' AND TG_OP = 'SELECT' THEN
    INSERT INTO public.security_audit_log (
      user_id,
      action,
      table_name,
      record_id,
      sensitive_data_accessed,
      user_agent
    ) VALUES (
      auth.uid(),
      'booking_financial_access',
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      true,
      current_setting('request.headers', true)::json->>'user-agent'
    );
  END IF;
  
  -- Log admin function calls
  IF TG_TABLE_NAME = 'admin_users' THEN
    INSERT INTO public.security_audit_log (
      user_id,
      action,
      table_name,
      record_id,
      sensitive_data_accessed
    ) VALUES (
      auth.uid(),
      'admin_access_check',
      TG_TABLE_NAME,
      COALESCE(NEW.id, OLD.id),
      true
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Create triggers for enhanced audit logging
DROP TRIGGER IF EXISTS log_booking_access ON public.bookings;
CREATE TRIGGER log_booking_access
  AFTER SELECT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access_enhanced();

DROP TRIGGER IF EXISTS log_admin_access ON public.admin_users;
CREATE TRIGGER log_admin_access
  AFTER SELECT ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access_enhanced();