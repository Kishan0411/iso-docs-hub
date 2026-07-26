"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Download, Receipt, Heart, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/purchases", label: "Purchased Products", icon: ShoppingBag },
  { href: "/dashboard/downloads", label: "Download History", icon: Download },
  { href: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-full lg:w-60 shrink-0">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-signal-50 text-signal-700 dark:bg-signal-500/10 dark:text-signal-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="flex items-center gap-2.5 whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" /> Log Out
        </button>
      </nav>
    </aside>
  );
}
