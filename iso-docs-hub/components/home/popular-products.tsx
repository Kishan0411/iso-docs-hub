import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "../product-card";
import SectionHeading from "../section-heading";

export default function PopularProducts() {
  const popular = products.filter((p) => p.popular).slice(0, 4);
  return (
    <section className="border-y border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
      <div className="container-page py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Bestsellers" title="Popular documentation kits" />
          <Link
            href="/shop"
            className="flex items-center gap-1.5 text-sm font-semibold text-signal-600 dark:text-signal-400 hover:underline"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
