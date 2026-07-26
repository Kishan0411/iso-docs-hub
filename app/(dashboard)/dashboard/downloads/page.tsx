import { Download } from "lucide-react";
import { products } from "@/lib/data";

const history = [
  { id: "d1", product: products[0], date: "2026-07-10T10:22:00", ip: "49.36.xx.xx" },
  { id: "d2", product: products[0], date: "2026-07-01T08:05:00", ip: "49.36.xx.xx" },
  { id: "d3", product: products[2], date: "2026-06-28T14:41:00", ip: "49.36.xx.xx" },
];

export default function DownloadHistoryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Download History</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Every time you've downloaded a purchased file.</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">IP Address</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/10">
            {history.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-3 font-medium text-ink dark:text-white">{h.product.title}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                  {new Date(h.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell font-mono text-xs">{h.ip}</td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-1.5 text-signal-600 dark:text-signal-400 hover:underline text-xs font-medium">
                    <Download className="h-3.5 w-3.5" /> Re-download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
