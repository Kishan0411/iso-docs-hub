"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Download } from "lucide-react";

const freebies = [
  "ZED Bronze Starter Kit",
  "Safety Posters (Set of 10)",
  "5S Posters (Set of 5)",
  "Sample Internal Audit Checklist",
  "Sample SOP",
  "Sample Procedure",
  "Sample Record Formats",
];

export default function LeadCaptureForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [selected, setSelected] = useState<string[]>([freebies[0]]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      mobile: form.get("mobile"),
      company: form.get("company"),
      items: selected,
    };
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-certify-200 dark:border-certify-500/30 bg-certify-50 dark:bg-certify-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-certify-600" />
        <h3 className="mt-3 font-display text-lg font-semibold text-ink dark:text-white">Check your inbox</h3>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
          Download links for your selected resources have been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6 sm:p-8">
      <p className="text-sm font-semibold text-ink dark:text-white">Select what you'd like</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {freebies.map((f) => (
          <label key={f} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 px-3 py-2.5 text-sm cursor-pointer has-[:checked]:border-signal-500 has-[:checked]:bg-signal-50 dark:has-[:checked]:bg-signal-500/10">
            <input
              type="checkbox"
              className="accent-signal-500"
              checked={selected.includes(f)}
              onChange={(e) =>
                setSelected((prev) => (e.target.checked ? [...prev, f] : prev.filter((x) => x !== f)))
              }
            />
            {f}
          </label>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Full Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Work Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Mobile Number</label>
          <input name="mobile" type="tel" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Company Name</label>
          <input name="company" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || selected.length === 0}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        Send Me the Downloads
      </button>
      <p className="mt-3 text-center text-[11px] text-slate-400">
        By submitting, you agree to receive occasional emails from ISO Docs Hub. Unsubscribe anytime.
      </p>
    </form>
  );
}
