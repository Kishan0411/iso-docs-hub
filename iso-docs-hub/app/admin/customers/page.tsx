import { Mail, Phone } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";
import { formatINR } from "@/lib/utils";

const customers = [
  { name: "Rakesh Patel", company: "Patel Engineering Works", email: "rakesh@patelengg.com", phone: "+91 98200 11223", orders: 3, spent: 1249700 },
  { name: "Sunita Rao", company: "Rao Pharma Pack", email: "sunita@raopharma.com", phone: "+91 99870 44556", orders: 2, spent: 899800 },
  { name: "Vivek Sharma", company: "Sharma Fabricators", email: "vivek@sharmafab.com", phone: "+91 90040 77889", orders: 1, spent: 449900 },
  { name: "Anita Deshmukh", company: "Deshmukh Exports", email: "anita@deshmukhexp.com", phone: "+91 88881 22334", orders: 4, spent: 999600 },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <AdminTopbar title="Customers" />
      <div className="p-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium text-right">Orders</th>
                <th className="px-5 py-3 font-medium text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {customers.map((c) => (
                <tr key={c.email}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink dark:text-white">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.company}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-right text-slate-600 dark:text-slate-300">{c.orders}</td>
                  <td className="px-5 py-3 text-right font-medium text-ink dark:text-white">{formatINR(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
