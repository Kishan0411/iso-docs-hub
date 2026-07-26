import Link from "next/link";
import { Star, FileText, BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] bg-slate-50 dark:bg-white/5 bg-grid overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-24 w-20 rotate-[-4deg] rounded-sm bg-white dark:bg-slate-100 shadow-card border border-slate-200">
            <div className="absolute left-2 right-2 top-3 h-1 rounded-full bg-slate-200" />
            <div className="absolute left-2 right-4 top-6 h-1 rounded-full bg-slate-200" />
            <div className="absolute left-2 right-6 top-9 h-1 rounded-full bg-slate-200" />
          </div>
          <div className="relative -ml-8 mt-6 h-24 w-20 rotate-[5deg] rounded-sm bg-white dark:bg-slate-100 shadow-card border border-slate-200">
            <div className="absolute left-2 right-2 top-3 h-1 rounded-full bg-slate-200" />
            <div className="absolute left-2 right-4 top-6 h-1 rounded-full bg-slate-200" />
          </div>
        </div>
        {product.popular && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-certify-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-stamp">
            <BadgeCheck className="h-3 w-3" /> Bestseller
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded bg-ink/90 dark:bg-black/60 px-2 py-1 font-mono text-[10px] tracking-wide text-white">
          {product.docCode} · {product.version}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-signal-600 dark:text-signal-400">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 font-display text-[15px] font-semibold leading-snug text-ink dark:text-white line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" /> {product.documentCount} docs
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-slate-100 dark:border-white/10 pt-3">
          <div>
            <span className="font-display text-lg font-semibold text-ink dark:text-white">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-2 text-xs text-slate-400 line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold text-signal-600 dark:text-signal-400 group-hover:underline">
            View kit →
          </span>
        </div>
      </div>
    </Link>
  );
}
