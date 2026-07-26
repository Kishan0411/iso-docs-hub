"use client";

import { useState } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";

type Coupon = { code: string; type: "percent" | "flat"; value: number; uses: number; maxUses: number; active: boolean };

const seed: Coupon[] = [
  { code: "LAUNCH20", type: "percent", value: 20, uses: 142, maxUses: 500, active: true },
  { code: "MSME500", type: "flat", value: 500, uses: 61, maxUses: 200, active: true },
  { code: "EXPO10", type: "percent", value: 10, uses: 300, maxUses: 300, active: false },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(seed);
  const [form, setForm] = useState({ code: "", type: "percent" as "percent" | "flat", value: 10, maxUses: 100 });

  function addCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code.trim()) return;
    setCoupons((c) => [{ ...form, code: form.code.toUpperCase(), uses: 0, active: true }, ...c]);
    setForm({ code: "", type: "percent", value: 10, maxUses: 100 });
  }

  return (
    <div>
      <AdminTopbar title="Coupons" />
      <div className="p-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light h-fit">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Code</th>
                <th className="px-5 py-3 font-medium">Discount</th>
                <th className="px-5 py-3 font-medium">Usage</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {coupons.map((c) => (
                <tr key={c.code}>
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-ink dark:text-white">{c.code}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{c.type === "percent" ? `${c.value}% off` : `₹${c.value} off`}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{c.uses}/{c.maxUses}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.active ? "bg-certify-50 text-certify-600 dark:bg-certify-500/10 dark:text-certify-400" : "bg-slate-100 text-slate-500 dark:bg-white/5"}`}>
                      {c.active ? "Active" : "Expired"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => navigator.clipboard.writeText(c.code)} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Copy code"><Copy className="h-4 w-4" /></button>
                      <button onClick={() => setCoupons((prev) => prev.filter((x) => x.code !== c.code))} className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={addCoupon} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-4 h-fit">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white flex items-center gap-2"><Plus className="h-4 w-4" /> New coupon</h2>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Code</label>
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "percent" | "flat" })} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500">
                <option value="percent">% off</option>
                <option value="flat">₹ off</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Value</label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Max uses</label>
            <input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <button type="submit" className="w-full rounded-md bg-signal-500 py-2.5 text-sm font-semibold text-white hover:bg-signal-600">Create Coupon</button>
        </form>
      </div>
    </div>
  );
}
