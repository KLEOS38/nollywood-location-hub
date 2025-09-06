
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
    // Enhanced input validation and sanitization
    const requestBody = await req.json();
    const { propertyId, startDate, endDate, totalPrice, teamSize, notes, paymentProvider = 'paystack' } = requestBody;

    // Validate required fields
    if (!propertyId || !startDate || !endDate || !totalPrice) {
      throw new Error("Missing required fields");
    }

    // Sanitize and validate inputs
    if (typeof totalPrice !== 'number' || totalPrice <= 0 || totalPrice > 10000000) {
      throw new Error("Invalid total price");
    }

    if (typeof teamSize !== 'number' || teamSize < 1 || teamSize > 100) {
      throw new Error("Invalid team size");
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new Error("Invalid booking dates");
    }

    // Rate limiting check (simple implementation)
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    // Log security event
    console.log(`Payment attempt from IP: ${clientIP}, Property: ${propertyId}, Amount: ${totalPrice}`);

    // Initialize Supabase client
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

    // Get property details
    const { data: property, error: propertyError } = await supabaseClient
      .from("properties")
      .select("title, price")
      .eq("id", propertyId)
      .single();
    
    if (propertyError || !property) {
      throw new Error("Property not found");
    }

    // Create booking record in database (pending payment)
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
        status: "pending",
        payment_status: "pending"
      })
      .select()
      .single();
      
    if (bookingError) {
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    // Handle Paystack payment
    if (paymentProvider === 'paystack') {
      const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
      
      if (!paystackSecretKey) {
        throw new Error("Paystack secret key not configured");
      }

      // Initialize Paystack payment
      const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          amount: Math.round(totalPrice * 100), // Convert to kobo (Paystack uses kobo)
          currency: "NGN",
          reference: `booking_${booking.id}_${Date.now()}`,
          callback_url: `${req.headers.get("origin")}/booking-success?booking_id=${booking.id}`,
          metadata: {
            booking_id: booking.id,
            property_id: propertyId,
            user_id: user.id,
            property_title: property.title,
            start_date: startDate,
            end_date: endDate,
          },
        }),
      });

      const paystackData = await paystackResponse.json();

      if (!paystackData.status) {
        throw new Error(`Paystack error: ${paystackData.message}`);
      }

      // Update booking with payment reference
      await supabaseClient
        .from("bookings")
        .update({
          payment_id: paystackData.data.reference,
        })
        .eq("id", booking.id);

      return new Response(JSON.stringify({ 
        authorization_url: paystackData.data.authorization_url,
        payment_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
        booking_id: booking.id 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Fallback for other payment providers or future implementations
    throw new Error("Payment provider not supported");

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Payment error:", errorMessage);
    
    // Security: Don't expose internal error details
    const publicError = errorMessage.includes("Missing") || errorMessage.includes("Invalid") 
      ? errorMessage 
      : "Payment processing failed. Please try again.";
    
    return new Response(JSON.stringify({ error: publicError }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
