"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: {
        data: {
          full_name: form.get("name"),
          company: form.get("company"),
          phone: form.get("mobile"),
        },
      },
    });
    setLoading(false);
    if (error) return setError(error.message);
    setDone(true);
  }

  if (done) {
    return (
      <div className="container-page flex min-h-[80vh] items-center justify-center py-16">
        <div className="w-full max-w-sm rounded-2xl border border-certify-200 dark:border-certify-500/30 bg-certify-50 dark:bg-certify-500/10 p-8 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-certify-600" />
          <h1 className="mt-3 font-display text-lg font-semibold text-ink dark:text-white">Confirm your email</h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">We've sent a confirmation link to your inbox. Verify to activate your account.</p>
          <Link href="/login" className="mt-5 inline-block text-sm font-semibold text-signal-600 dark:text-signal-400 hover:underline">Go to login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink dark:bg-signal-500">
            <ShieldCheck className="h-5 w-5 text-certify-400" />
          </span>
          <h1 className="mt-4 font-display text-xl font-semibold text-ink dark:text-white">Create your account</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Buy, preview and manage documentation kits</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {error && <p className="rounded-md bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Full Name</label>
            <input name="name" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Company Name</label>
            <input name="company" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Mobile Number</label>
            <input name="mobile" type="tel" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Email</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
            <input name="password" type="password" required minLength={8} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <Link href="/login" className="font-medium text-signal-600 dark:text-signal-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
