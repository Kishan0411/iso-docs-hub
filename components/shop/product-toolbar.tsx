"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductCard from "../product-card";

type SortKey = "latest" | "popular" | "rating" | "price-low" | "price-high";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most Popular" },
  { key: "latest", label: "Latest" },
  { key: "rating", label: "Top Rated" },
  { key: "price-low", label: "Price: Low to High" },
  { key: "price-high", label: "Price: High to Low" },
];

export default function ProductToolbar({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.price <= maxPrice &&
        (query.trim() === "" ||
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()))
    );
    switch (sort) {
      case "latest":
        list = [...list].sort((a, b) => +new Date(b.lastUpdated) - +new Date(a.lastUpdated));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular));
    }
    return list;
  }, [products, query, sort, maxPrice]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search documents…"
            className="w-full rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light py-2.5 pl-9 pr-3 text-sm outline-none focus:border-signal-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light py-2.5 px-3 text-sm outline-none focus:border-signal-500"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="rounded-md border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light py-2.5 px-3 text-sm outline-none focus:border-signal-500"
          >
            <option value={1000000}>Any price</option>
            <option value={100000}>Under ₹1,000</option>
            <option value={500000}>Under ₹5,000</option>
            <option value={900000}>Under ₹9,000</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{filtered.length} documents found</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-slate-500 dark:text-slate-400">
            No documents match your search. Try a different keyword or clear filters.
          </p>
        )}
      </div>
    </div>
  );
}
