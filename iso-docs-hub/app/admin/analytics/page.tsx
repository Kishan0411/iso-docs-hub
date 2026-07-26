"use client";

import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import AdminTopbar from "@/components/admin/topbar";

const salesByCategory = [
  { name: "ISO 9001", value: 42 },
  { name: "ISO 14001", value: 24 },
  { name: "ISO 45001", value: 18 },
  { name: "IMS", value: 12 },
  { name: "ZED", value: 22 },
  { name: "Vendor Reg.", value: 9 },
];

const trafficSources = [
  { name: "Organic Search", value: 48 },
  { name: "Direct", value: 22 },
  { name: "Social", value: 14 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 6 },
];

const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444"];

export default function AdminAnalyticsPage() {
  return (
    <div>
      <AdminTopbar title="Analytics" />
      <div className="p-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Sales by category (last 30 days)</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Traffic sources</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficSources} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {trafficSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
            <p className="text-xs text-slate-500 dark:text-slate-400">Conversion rate</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-white">3.8%</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
            <p className="text-xs text-slate-500 dark:text-slate-400">Avg. order value</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-white">₹4,180</p>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
            <p className="text-xs text-slate-500 dark:text-slate-400">Cart abandonment</p>
            <p className="mt-1 font-display text-2xl font-semibold text-ink dark:text-white">61%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
