import Link from "next/link";
import { ShoppingBag, Download, Receipt, Heart, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { formatINR } from "@/lib/utils";

const stats = [
  { label: "Purchased Kits", value: "3", icon: ShoppingBag, href: "/dashboard/purchases" },
  { label: "Downloads", value: "7", icon: Download, href: "/dashboard/downloads" },
  { label: "Invoices", value: "3", icon: Receipt, href: "/dashboard/invoices" },
  { label: "Wishlist", value: "2", icon: Heart, href: "/dashboard/wishlist" },
];

export default function DashboardOverviewPage() {
  const recent = products.slice(0, 3);
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Here's what's happening with your account.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 hover:border-signal-300 dark:hover:border-signal-500/40 transition-colors"
          >
            <s.icon className="h-5 w-5 text-signal-500" />
            <p className="mt-3 font-display text-2xl font-semibold text-ink dark:text-white">{s.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">Recently purchased</h2>
          <Link href="/dashboard/purchases" className="flex items-center gap-1 text-sm font-medium text-signal-600 dark:text-signal-400 hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-slate-100 dark:divide-white/10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          {recent.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-ink dark:text-white">{p.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{p.docCode} · v{p.version}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">{formatINR(p.price)}</span>
                <button className="rounded-md border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium hover:border-signal-500">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
