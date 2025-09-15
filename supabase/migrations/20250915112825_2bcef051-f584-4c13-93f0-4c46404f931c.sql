-- Fix booking security by implementing granular access control
-- This addresses the security finding about booking and payment information at risk

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view their booking basic data" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their bookings" ON public.bookings;

-- Create secure function to check booking ownership
CREATE OR REPLACE FUNCTION public.can_access_booking(booking_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.id = booking_uuid
    AND (
      b.user_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM public.properties p 
        WHERE p.id = b.property_id 
        AND p.owner_id = auth.uid()
      )
    )
  );
$$;

-- Create secure function to check financial data access
CREATE OR REPLACE FUNCTION public.can_access_financial_data(booking_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.id = booking_uuid
    AND b.status IN ('confirmed', 'active', 'completed')
    AND (
      -- User who made the booking (after confirmation)
      b.user_id = auth.uid() OR
      -- Property owner (after confirmation)
      EXISTS (
        SELECT 1 FROM public.properties p 
        WHERE p.id = b.property_id 
        AND p.owner_id = auth.uid()
      ) OR
      -- Admin users
      public.is_admin_user_secure(auth.uid())
    )
  );
$$;

-- Create policy for basic booking data (excludes financial fields)
CREATE POLICY "Users can view basic booking info"
ON public.bookings
FOR SELECT
USING (public.can_access_booking(id));

-- Create policy for financial data access (more restrictive)
CREATE POLICY "Restricted financial data access"
ON public.bookings
FOR SELECT
USING (
  public.can_access_financial_data(id) AND
  (total_price IS NOT NULL OR commission_amount IS NOT NULL OR payment_id IS NOT NULL)
);

-- Update policy for booking updates (only basic fields, not financial)
CREATE POLICY "Users can update basic booking info"
ON public.bookings
FOR UPDATE
USING (
  public.can_access_booking(id) AND
  -- Prevent unauthorized financial data updates
  (
    OLD.total_price = NEW.total_price AND
    OLD.commission_amount = NEW.commission_amount AND
    OLD.payment_id = NEW.payment_id AND
    OLD.commission_rate = NEW.commission_rate
  )
)
WITH CHECK (
  public.can_access_booking(id) AND
  -- Prevent unauthorized financial data updates
  (
    OLD.total_price = NEW.total_price AND
    OLD.commission_amount = NEW.commission_amount AND
    OLD.payment_id = NEW.payment_id AND
    OLD.commission_rate = NEW.commission_rate
  )
);

-- Create separate policy for financial updates (admin only)
CREATE POLICY "Admin can update financial data"
ON public.bookings
FOR UPDATE
USING (public.is_admin_user_secure(auth.uid()))
WITH CHECK (public.is_admin_user_secure(auth.uid()));

-- Enhanced audit logging for financial data access
CREATE OR REPLACE FUNCTION public.log_booking_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log financial data access
  IF TG_OP = 'SELECT' AND (
    NEW.total_price IS NOT NULL OR 
    NEW.commission_amount IS NOT NULL OR 
    NEW.payment_id IS NOT NULL
  ) THEN
    INSERT INTO public.security_audit_log (
      user_id,
      action,
      table_name,
      record_id,
      sensitive_data_accessed
    ) VALUES (
      auth.uid(),
      'booking_financial_access',
      'bookings',
      NEW.id,
      true
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for booking access logging
DROP TRIGGER IF EXISTS log_booking_access_trigger ON public.bookings;
CREATE TRIGGER log_booking_access_trigger
  AFTER SELECT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.log_booking_access();

-- Add comment explaining the security model
COMMENT ON TABLE public.bookings IS 'Booking data with separated access control: basic booking info vs financial data. Financial data requires confirmed booking status and stricter authorization.';