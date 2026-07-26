import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// GET /api/downloads/[productId] — issues a short-lived signed URL for a file
// the current user has actually purchased. Never exposes the storage bucket publicly.
export async function GET(req: Request, { params }: { params: { productId: string } }) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`download:${ip}`, 20, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many download requests. Try again shortly." }, { status: 429 });
  }

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });

  // 1. Confirm the user purchased this product
  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", params.productId)
    .maybeSingle();

  if (!purchase) {
    return NextResponse.json({ error: "You have not purchased this product." }, { status: 403 });
  }

  // 2. Look up the storage path for the deliverable ZIP
  const { data: product } = await supabase
    .from("products")
    .select("file_path")
    .eq("id", params.productId)
    .single();

  if (!product?.file_path) {
    return NextResponse.json({ error: "File not available." }, { status: 404 });
  }

  // 3. Create a signed URL valid for 5 minutes
  const { data: signed, error } = await supabase.storage
    .from("product-files")
    .createSignedUrl(product.file_path, 60 * 5);

  if (error || !signed) {
    return NextResponse.json({ error: "Could not generate download link." }, { status: 500 });
  }

  // 4. Log the download for the customer's download history
  await supabase.from("downloads").insert({
    user_id: user.id,
    product_id: params.productId,
    ip_address: ip,
  });

  return NextResponse.json({ url: signed.signedUrl });
}
