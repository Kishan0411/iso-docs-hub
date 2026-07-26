import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServerClient } from "@/lib/supabase/server";

// Configure this exact URL in the Razorpay Dashboard → Settings → Webhooks.
// It acts as a server-to-server backstop in case the browser closes before
// /api/checkout/verify runs (e.g. user closes tab right after paying).
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (signature !== expected) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const supabase = createServerClient();

  if (event.event === "payment.captured") {
    const payment = event.payload.payment.entity;
    const orderId = payment.order_id;

    const { data: order } = await supabase.from("orders").select("*").eq("id", orderId).single();
    if (order && order.status !== "paid") {
      await supabase
        .from("orders")
        .update({ status: "paid", razorpay_payment_id: payment.id, paid_at: new Date().toISOString() })
        .eq("id", orderId);

      await supabase.from("purchases").insert({
        user_id: order.user_id,
        product_id: order.product_id,
        order_id: orderId,
      });
    }
  }

  if (event.event === "payment.failed") {
    const orderId = event.payload.payment.entity.order_id;
    await supabase.from("orders").update({ status: "failed" }).eq("id", orderId);
  }

  return NextResponse.json({ received: true });
}
