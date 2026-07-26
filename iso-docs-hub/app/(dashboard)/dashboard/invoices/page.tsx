import { FileDown } from "lucide-react";
import { products } from "@/lib/data";
import { formatINR } from "@/lib/utils";

const invoices = [
  { id: "INV-2026-0142", product: products[0], date: "2026-07-10", gst: 90000 },
  { id: "INV-2026-0098", product: products[2], date: "2026-06-28", gst: 68000 },
  { id: "INV-2026-0071", product: products[6], date: "2026-05-05", gst: 18000 },
];

export default function InvoicesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Invoices</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">GST invoices for every order, ready to download.</p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
              <th className="px-4 py-3 font-medium">Invoice #</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Amount (incl. GST)</th>
              <th className="px-4 py-3 font-medium text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/10">
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="px-4 py-3 font-mono text-xs text-ink dark:text-white">{inv.id}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{inv.product.title}</td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                  {new Date(inv.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink dark:text-white">{formatINR(inv.product.price + inv.gst)}</td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-1.5 text-signal-600 dark:text-signal-400 hover:underline text-xs font-medium">
                    <FileDown className="h-3.5 w-3.5" /> PDF
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
