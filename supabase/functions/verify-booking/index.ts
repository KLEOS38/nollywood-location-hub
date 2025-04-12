
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyId } = await req.json();

    // Initialize Supabase client with service role to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Initialize client with anon key for user authentication
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const user = userData.user;

    // Check if user has a completed booking for this property
    const { data: bookings, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("property_id", propertyId)
      .eq("user_id", user.id)
      .eq("status", "completed")
      .limit(1);
    
    if (bookingError) {
      throw new Error(`Failed to check booking: ${bookingError.message}`);
    }

    // Check if user has already reviewed this property
    const { data: existingReviews, error: reviewError } = await supabaseAdmin
      .from("reviews")
      .select("id")
      .eq("property_id", propertyId)
      .eq("user_id", user.id)
      .limit(1);
    
    if (reviewError) {
      throw new Error(`Failed to check existing reviews: ${reviewError.message}`);
    }

    const canReview = bookings.length > 0 && existingReviews.length === 0;
    const bookingId = bookings.length > 0 ? bookings[0].id : null;

    return new Response(JSON.stringify({ 
      canReview,
      bookingId,
      hasCompletedBooking: bookings.length > 0,
      hasReviewed: existingReviews.length > 0
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Verify booking error:", errorMessage);
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
