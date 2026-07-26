import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!success) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const supabase = createServerClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);
  if (error) {
    console.error("contact form error", error);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }

  // TODO: notify support@isodocshub.com via nodemailer/Resend

  return NextResponse.json({ success: true });
}
