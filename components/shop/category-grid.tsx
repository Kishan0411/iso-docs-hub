import Link from "next/link";
import * as Icons from "lucide-react";
import { categories } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((c) => {
        const Icon = (Icons as unknown as Record<string, LucideIcon>)[c.icon] ?? Icons.FileText;
        return (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 hover:border-signal-400 dark:hover:border-signal-500/50 hover:shadow-card transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-50 dark:bg-signal-500/10 group-hover:bg-signal-500 transition-colors">
              <Icon className="h-5 w-5 text-signal-600 dark:text-signal-400 group-hover:text-white transition-colors" />
            </div>
            <h3 className="mt-3 font-display text-sm font-semibold text-ink dark:text-white">{c.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
              {c.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
