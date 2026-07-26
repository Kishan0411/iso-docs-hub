"use client";

import { useState } from "react";
import { Send, Users, Download } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";

const subscribers = [
  { email: "rakesh@patelengg.com", source: "Free Download", date: "2026-07-10" },
  { email: "sunita@raopharma.com", source: "Newsletter", date: "2026-07-08" },
  { email: "vivek@sharmafab.com", source: "Checkout", date: "2026-07-05" },
  { email: "anita@deshmukhexp.com", source: "Free Download", date: "2026-06-30" },
];

export default function AdminNewsletterPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <AdminTopbar title="Newsletter & Email Marketing" />
      <div className="p-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-4">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white flex items-center gap-2"><Send className="h-4 w-4" /> Compose campaign</h2>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Body</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <button
            onClick={() => alert(`Campaign queued for ${subscribers.length} subscribers.`)}
            className="flex items-center gap-2 rounded-md bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-600"
          >
            <Send className="h-4 w-4" /> Send to All Subscribers
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold text-ink dark:text-white flex items-center gap-2"><Users className="h-4 w-4" /> Subscribers ({subscribers.length})</h2>
            <button className="flex items-center gap-1.5 text-xs font-medium text-signal-600 dark:text-signal-400 hover:underline"><Download className="h-3.5 w-3.5" /> Export CSV</button>
          </div>
          <div className="mt-4 divide-y divide-slate-100 dark:divide-white/10">
            {subscribers.map((s) => (
              <div key={s.email} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-slate-700 dark:text-slate-200">{s.email}</span>
                <span className="text-xs text-slate-400">{s.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
