import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(8),
  company: z.string().min(2),
  items: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const supabase = createServerClient();

  // Upsert into subscribers/leads table
  const { error } = await supabase.from("newsletter_subscribers").upsert(
    {
      name: parsed.data.name,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
      company: parsed.data.company,
      source: "free_download",
      requested_items: parsed.data.items ?? [],
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("newsletter subscribe error", error);
    return NextResponse.json({ error: "Could not save your details." }, { status: 500 });
  }

  // TODO: trigger a transactional email (via nodemailer / Resend / Supabase Edge Function)
  // containing signed download links for each requested item.

  return NextResponse.json({ success: true });
}
