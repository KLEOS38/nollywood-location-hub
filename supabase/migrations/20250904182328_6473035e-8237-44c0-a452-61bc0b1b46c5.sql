-- Fix function search path security issues
-- Update existing functions to have secure search_path settings

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $function$
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
$function$;

-- Fix is_admin function  
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid
  );
$function$;

-- Fix is_property_available function
CREATE OR REPLACE FUNCTION public.is_property_available(property_id uuid, check_in date, check_out date)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  is_available BOOLEAN;
BEGIN
  -- Check if there are any bookings that overlap with the requested dates
  SELECT NOT EXISTS (
    SELECT 1 FROM public.bookings
    WHERE 
      bookings.property_id = $1 AND
      bookings.status NOT IN ('cancelled') AND
      (
        (bookings.start_date <= $3 AND bookings.end_date >= $2)
      )
  ) INTO is_available;
  
  -- Check if there are any unavailability periods that overlap with the requested dates
  IF is_available THEN
    SELECT NOT EXISTS (
      SELECT 1 FROM public.property_unavailability
      WHERE 
        property_unavailability.property_id = $1 AND
        (
          (property_unavailability.start_date <= $3 AND property_unavailability.end_date >= $2)
        )
    ) INTO is_available;
  END IF;
  
  RETURN is_available;
END;
$function$;