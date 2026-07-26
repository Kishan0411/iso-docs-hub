import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, status: 401, error: "Not authenticated." };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { ok: false as const, status: 403, error: "Admin access required." };

  return { ok: true as const, supabase, user };
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json();
  const { data, error } = await auth.supabase
    .from("products")
    .insert({
      title: body.title,
      slug: String(body.title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline: body.tagline,
      description: body.description,
      category: body.category,
      doc_code: body.docCode,
      price_paise: Number(body.price) * 100,
      compare_at_price_paise: body.compareAtPrice ? Number(body.compareAtPrice) * 100 : null,
      document_count: Number(body.documentCount),
      version: body.version,
      whats_included: String(body.whatsIncluded || "").split("\n").filter(Boolean),
      compatibility: String(body.compatibility || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      popular: body.popular === "on" || body.popular === true,
      active: true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function PATCH(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { data, error } = await auth.supabase
    .from("products")
    .update({
      title: body.title,
      tagline: body.tagline,
      description: body.description,
      category: body.category,
      doc_code: body.docCode,
      price_paise: Number(body.price) * 100,
      compare_at_price_paise: body.compareAtPrice ? Number(body.compareAtPrice) * 100 : null,
      document_count: Number(body.documentCount),
      version: body.version,
      whats_included: String(body.whatsIncluded || "").split("\n").filter(Boolean),
      compatibility: String(body.compatibility || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      popular: body.popular === "on" || body.popular === true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data });
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await req.json();
  const { error } = await auth.supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
