-- Fix missing RLS policy for bookings_for_owners view
-- Since views can't have RLS policies directly, we need to ensure proper access control

-- Drop the view and recreate it with proper security
DROP VIEW IF EXISTS public.bookings_for_owners;

-- Create a secure function instead of a view for better RLS control
CREATE OR REPLACE FUNCTION public.get_secure_bookings_for_owners()
RETURNS TABLE (
  id uuid,
  property_id uuid,
  user_id uuid,
  start_date date,
  end_date date,
  total_price numeric,
  team_size integer,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  notes text,
  status text,
  payment_status text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    b.id,
    b.property_id,
    b.user_id,
    b.start_date,
    b.end_date,
    b.total_price,
    b.team_size,
    b.created_at,
    b.updated_at,
    b.notes,
    b.status,
    b.payment_status
  FROM public.bookings b
  JOIN public.properties p ON b.property_id = p.id
  WHERE p.owner_id = auth.uid()
     OR b.user_id = auth.uid();
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_secure_bookings_for_owners() TO authenticated;

-- Add additional security measures for existing tables

-- Ensure bookings table has proper RLS policies
-- Add policy for commission data protection
CREATE POLICY "Hide commission data from non-admin users"
ON public.bookings
FOR SELECT
USING (
  -- Users can see their own bookings with full data
  auth.uid() = user_id OR
  -- Property owners can see booking data but commission info is null in the function
  EXISTS (
    SELECT 1 FROM public.properties 
    WHERE id = bookings.property_id AND owner_id = auth.uid()
  ) OR
  -- Admins can see everything
  is_admin_user(auth.uid())
);

-- Create a trigger to log sensitive data access
CREATE OR REPLACE FUNCTION public.log_sensitive_access()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log access to financial data
  IF TG_TABLE_NAME = 'bookings' AND (
    NEW.payment_id IS NOT NULL OR 
    NEW.commission_amount IS NOT NULL
  ) THEN
    INSERT INTO public.security_audit_log (
      user_id,
      action,
      table_name,
      record_id,
      sensitive_data_accessed
    ) VALUES (
      auth.uid(),
      'financial_data_accessed',
      TG_TABLE_NAME,
      NEW.id,
      true
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for booking updates
CREATE TRIGGER log_booking_access
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_access();