"use client";

import { IndianRupee, ShoppingCart, Users, Package, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import AdminTopbar from "@/components/admin/topbar";
import { formatINR } from "@/lib/utils";

const revenueData = [
  { day: "Mon", revenue: 42000 }, { day: "Tue", revenue: 58000 }, { day: "Wed", revenue: 39000 },
  { day: "Thu", revenue: 71000 }, { day: "Fri", revenue: 64000 }, { day: "Sat", revenue: 88000 },
  { day: "Sun", revenue: 52000 },
];

const stats = [
  { label: "Revenue (30d)", value: formatINR(184200 * 100), icon: IndianRupee, change: "+12.4%" },
  { label: "Orders (30d)", value: "312", icon: ShoppingCart, change: "+8.1%" },
  { label: "New Customers", value: "97", icon: Users, change: "+3.2%" },
  { label: "Products Live", value: "8", icon: Package, change: "+1" },
];

const recentOrders = [
  { id: "ORD-4821", customer: "Patel Engineering Works", product: "ISO 9001:2015 Kit", amount: 499900, status: "Paid" },
  { id: "ORD-4820", customer: "Rao Pharma Pack", product: "ISO 14001:2015 Kit", amount: 449900, status: "Paid" },
  { id: "ORD-4819", customer: "Sharma Fabricators", product: "ISO 45001:2018 Kit", amount: 449900, status: "Refunded" },
  { id: "ORD-4818", customer: "Deshmukh Exports", product: "ZED Bronze Kit", amount: 249900, status: "Paid" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminTopbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-signal-500" />
                <span className="flex items-center gap-1 text-xs font-medium text-certify-600 dark:text-certify-400">
                  <TrendingUp className="h-3 w-3" /> {s.change}
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Revenue — last 7 days</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v: number) => formatINR(v * 100)} />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          <div className="flex items-center justify-between p-5 pb-0">
            <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Recent orders</h2>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Product</th>
                <th className="px-5 py-3 font-medium text-right">Amount</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3 font-mono text-xs text-ink dark:text-white">{o.id}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{o.customer}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{o.product}</td>
                  <td className="px-5 py-3 text-right font-medium text-ink dark:text-white">{formatINR(o.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        o.status === "Paid"
                          ? "bg-certify-50 text-certify-600 dark:bg-certify-500/10 dark:text-certify-400"
                          : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {o.status}
                    </span>
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
