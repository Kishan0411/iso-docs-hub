"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setLoading(false);
    if (error) return setError(error.message);
    router.push(params.get("redirect") || "/dashboard");
    router.refresh();
  }

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink dark:bg-signal-500">
            <ShieldCheck className="h-5 w-5 text-certify-400" />
          </span>
          <h1 className="mt-4 font-display text-xl font-semibold text-ink dark:text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Log in to access your purchased documents</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {error && <p className="rounded-md bg-red-50 dark:bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Email</label>
            <input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-signal-600 dark:text-signal-400 hover:underline">Forgot?</Link>
            </div>
            <input name="password" type="password" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account? <Link href="/register" className="font-medium text-signal-600 dark:text-signal-400 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
