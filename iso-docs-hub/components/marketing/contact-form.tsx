"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("idle");
      alert("Could not send your message. Please try again or WhatsApp us.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-certify-200 dark:border-certify-500/30 bg-certify-50 dark:bg-certify-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-certify-600" />
        <h3 className="mt-3 font-display text-lg font-semibold text-ink dark:text-white">Message sent</h3>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">We'll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6 sm:p-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Full Name</label>
          <input name="name" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Mobile Number</label>
        <input name="mobile" type="tel" className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Message</label>
        <textarea name="message" required rows={5} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Message
      </button>
    </form>
  );
}
