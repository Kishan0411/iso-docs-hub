import { Download, FileText, RefreshCcw } from "lucide-react";
import { products } from "@/lib/data";

export default function PurchasesPage() {
  const purchased = products.slice(0, 3);
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Purchased Products</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Download any version you own, anytime.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {purchased.map((p) => (
          <div key={p.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-400">{p.docCode}</span>
              <span className="rounded-full bg-certify-50 dark:bg-certify-500/10 px-2 py-0.5 text-[10px] font-semibold text-certify-600 dark:text-certify-400">
                Active
              </span>
            </div>
            <h3 className="mt-2 font-display text-sm font-semibold text-ink dark:text-white">{p.title}</h3>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {p.documentCount} docs</span>
              <span className="flex items-center gap-1"><RefreshCcw className="h-3.5 w-3.5" /> v{p.version}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-signal-500 py-2.5 text-sm font-semibold text-white hover:bg-signal-600">
                <Download className="h-4 w-4" /> Download ZIP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
