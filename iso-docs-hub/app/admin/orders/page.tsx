"use client";

import { useState } from "react";
import { FileDown, Eye } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";
import { formatINR } from "@/lib/utils";

const allOrders = [
  { id: "ORD-4821", customer: "Patel Engineering Works", email: "rakesh@patelengg.com", product: "ISO 9001:2015 Kit", amount: 499900, status: "Paid", date: "2026-07-10" },
  { id: "ORD-4820", customer: "Rao Pharma Pack", email: "sunita@raopharma.com", product: "ISO 14001:2015 Kit", amount: 449900, status: "Paid", date: "2026-07-09" },
  { id: "ORD-4819", customer: "Sharma Fabricators", email: "vivek@sharmafab.com", product: "ISO 45001:2018 Kit", amount: 449900, status: "Refunded", date: "2026-07-08" },
  { id: "ORD-4818", customer: "Deshmukh Exports", email: "anita@deshmukhexp.com", product: "ZED Bronze Kit", amount: 249900, status: "Paid", date: "2026-07-06" },
  { id: "ORD-4817", customer: "Iyer Consultants", email: "hello@iyerconsult.com", product: "IMS Kit", amount: 899900, status: "Pending", date: "2026-07-05" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-certify-50 text-certify-600 dark:bg-certify-500/10 dark:text-certify-400",
  Refunded: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Pending: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("All");
  const orders = filter === "All" ? allOrders : allOrders.filter((o) => o.status === filter);

  return (
    <div>
      <AdminTopbar title="Orders" />
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {["All", "Paid", "Pending", "Refunded"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                filter === f ? "border-signal-500 bg-signal-500 text-white" : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Product</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3 font-mono text-xs text-ink dark:text-white">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="text-slate-700 dark:text-slate-200">{o.customer}</p>
                    <p className="text-xs text-slate-400">{o.email}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400 hidden md:table-cell">{o.product}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {new Date(o.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-5 py-3 text-right font-medium text-ink dark:text-white">{formatINR(o.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="View order"><Eye className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Download invoice"><FileDown className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
