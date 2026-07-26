import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment details." }, { status: 400 });
    }

    // 1. Verify the HMAC signature Razorpay sends back — this proves the payment is genuine.
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
    }

    const supabase = createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated." }, { status: 401 });

    // 2. Mark the order as paid
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        razorpay_payment_id,
        razorpay_signature,
        paid_at: new Date().toISOString(),
      })
      .eq("id", razorpay_order_id)
      .eq("user_id", user.id);

    if (updateError) throw updateError;

    // 3. Grant a purchase record so the product appears in the dashboard / unlocks download
    await supabase.from("purchases").insert({
      user_id: user.id,
      product_id: productId,
      order_id: razorpay_order_id,
    });

    // 4. Generate a GST invoice row (numbering + PDF generation handled by a DB trigger / edge function)
    await supabase.from("invoices").insert({
      order_id: razorpay_order_id,
      user_id: user.id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("verify-payment error", err);
    return NextResponse.json({ error: "Could not verify payment." }, { status: 500 });
  }
}
