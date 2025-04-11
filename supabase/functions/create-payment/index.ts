
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
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace("Bearer ", "");
    
    // Verify the user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 401 }
      );
    }

    // Get the request body
    const { propertyId, startDate, endDate, totalPrice, teamSize, notes } = await req.json();

    // TODO: This is where you would integrate with a payment gateway like Stripe
    // For now, let's simulate a successful payment

    // Create a booking in the database
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        property_id: propertyId,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
        total_price: totalPrice,
        team_size: teamSize,
        notes: notes,
        status: "confirmed", // Auto-confirm for now
        payment_status: "paid", // Simulate payment
        payment_id: `sim_${Date.now()}` // Simulate payment ID
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking creation error:", bookingError);
      return new Response(
        JSON.stringify({ error: bookingError.message }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        booking: booking,
        message: "Booking confirmed successfully"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
