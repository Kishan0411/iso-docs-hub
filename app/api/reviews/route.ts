import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  productId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5).max(1000),
});

// Only customers who purchased the product may leave a review — enforced here
// and again via Supabase RLS policy on the reviews table.
export async function POST(req: Request) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in to leave a review." }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid review data." }, { status: 400 });

  const { data: purchase } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", parsed.data.productId)
    .maybeSingle();

  if (!purchase) {
    return NextResponse.json({ error: "Only verified buyers can review this product." }, { status: 403 });
  }

  const { error } = await supabase.from("reviews").insert({
    user_id: user.id,
    product_id: parsed.data.productId,
    rating: parsed.data.rating,
    comment: parsed.data.comment,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
