import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay/client";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`create-order:${ip}`, 15, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  try {
    const { productId, couponCode } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const supabase = createServerClient();

    // 1. Look up authenticated user (checkout requires an account)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please log in to purchase." }, { status: 401 });
    }

    // 2. Fetch the product from the DB (never trust a client-sent price)
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, title, price_paise, active")
      .eq("id", productId)
      .single();

    if (productError || !product || !product.active) {
      return NextResponse.json({ error: "Product not found or unavailable." }, { status: 404 });
    }

    let amount = product.price_paise;

    // 3. Apply a coupon if provided
    if (couponCode) {
      const { data: coupon } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", couponCode.toUpperCase())
        .eq("active", true)
        .single();

      if (coupon && coupon.uses < coupon.max_uses) {
        amount =
          coupon.type === "percent"
            ? Math.round(amount * (1 - coupon.value / 100))
            : Math.max(0, amount - coupon.value * 100);
      }
    }

    // 4. Create the Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${productId}_${Date.now()}`,
      notes: { productId, userId: user.id, couponCode: couponCode ?? "" },
    });

    // 5. Persist a pending order row so the webhook/verify step can reconcile it
    await supabase.from("orders").insert({
      id: order.id,
      user_id: user.id,
      product_id: productId,
      amount_paise: amount,
      status: "pending",
      coupon_code: couponCode ?? null,
    });

    return NextResponse.json({ id: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error("create-order error", err);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
