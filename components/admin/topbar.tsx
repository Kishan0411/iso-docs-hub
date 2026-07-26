"use client";

import { Bell, Search } from "lucide-react";
import ThemeToggle from "../theme-toggle";

export default function AdminTopbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light px-6 py-4">
      <h1 className="font-display text-lg font-semibold text-ink dark:text-white">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search…"
            className="w-56 rounded-md border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-2 pl-9 pr-3 text-sm outline-none focus:border-signal-500"
          />
        </div>
        <button className="relative p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Notifications">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-certify-500" />
        </button>
        <ThemeToggle />
        <div className="h-8 w-8 rounded-full bg-signal-500 flex items-center justify-center text-xs font-semibold text-white">A</div>
      </div>
    </div>
  );
}
