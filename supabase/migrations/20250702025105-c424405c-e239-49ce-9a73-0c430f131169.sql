
-- Enable RLS on tables that don't have it yet (skip if already enabled)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Enable RLS on other tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_unavailability ENABLE ROW LEVEL SECURITY;

-- Create comprehensive RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for properties
CREATE POLICY "Anyone can view published properties" ON public.properties
  FOR SELECT USING (is_published = true OR auth.uid() = owner_id);

CREATE POLICY "Property owners can manage their properties" ON public.properties
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can create properties" ON public.properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id AND auth.uid() IS NOT NULL);

-- Create RLS policies for property images
CREATE POLICY "Anyone can view property images for published properties" ON public.property_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_images.property_id 
      AND (properties.is_published = true OR properties.owner_id = auth.uid())
    )
  );

CREATE POLICY "Property owners can manage their property images" ON public.property_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_images.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

-- Create RLS policies for property amenities
CREATE POLICY "Anyone can view property amenities for published properties" ON public.property_amenities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_amenities.property_id 
      AND (properties.is_published = true OR properties.owner_id = auth.uid())
    )
  );

CREATE POLICY "Property owners can manage their property amenities" ON public.property_amenities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_amenities.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings as guest" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Property owners can view bookings for their properties" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = bookings.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Property owners can update bookings for their properties" ON public.bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = bookings.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

-- Create RLS policies for reviews
CREATE POLICY "Anyone can view published reviews" ON public.reviews
  FOR SELECT USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id 
    AND auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE bookings.id = reviews.booking_id 
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'confirmed'
    )
  );

CREATE POLICY "Users can update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for property unavailability
CREATE POLICY "Property owners can manage unavailability periods" ON public.property_unavailability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.properties 
      WHERE properties.id = property_unavailability.property_id 
      AND properties.owner_id = auth.uid()
    )
  );

-- Create admin check function to avoid recursion
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID DEFAULT auth.uid())
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT CASE 
    WHEN EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = user_uuid) THEN 'admin'
    ELSE 'user'
  END;
$$;

-- Update existing RLS policies that reference admin functions
DROP POLICY IF EXISTS "Users can view their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can create their own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can delete their own favorites" ON public.favorites;

CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Update messages policies
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update their received messages" ON public.messages;

CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their received messages" ON public.messages
  FOR UPDATE USING (auth.uid() = recipient_id);

-- Update notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Update referrals policies
DROP POLICY IF EXISTS "Users can view their own referrals" ON public.referrals;
DROP POLICY IF EXISTS "Users can create referrals" ON public.referrals;

CREATE POLICY "Users can view their own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

CREATE POLICY "Users can create referrals" ON public.referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id AND auth.uid() IS NOT NULL);

-- Update disputes policies
DROP POLICY IF EXISTS "Users can view their own disputes" ON public.disputes;
DROP POLICY IF EXISTS "Users can create disputes" ON public.disputes;
DROP POLICY IF EXISTS "Admins can update disputes" ON public.disputes;

CREATE POLICY "Users can view their own disputes" ON public.disputes
  FOR SELECT USING (
    auth.uid() = complainant_id 
    OR auth.uid() = respondent_id 
    OR public.get_user_role() = 'admin'
  );

CREATE POLICY "Users can create disputes" ON public.disputes
  FOR INSERT WITH CHECK (auth.uid() = complainant_id AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update disputes" ON public.disputes
  FOR UPDATE USING (public.get_user_role() = 'admin');

-- Update admin users policies
DROP POLICY IF EXISTS "Only admins can access admin_users" ON public.admin_users;

CREATE POLICY "Only admins can access admin_users" ON public.admin_users
  FOR ALL USING (public.get_user_role() = 'admin');

-- Create policy for amenities (public read)
CREATE POLICY "Anyone can view amenities" ON public.amenities
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage amenities" ON public.amenities
  FOR ALL USING (public.get_user_role() = 'admin');
