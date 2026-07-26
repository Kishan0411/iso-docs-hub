import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProductsByCategory } from "@/lib/data";
import type { Category } from "@/lib/types";
import ProductToolbar from "@/components/shop/product-toolbar";
import SectionHeading from "@/components/section-heading";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} Documentation Kits & Templates`,
    description: `${cat.description}. Editable, audit-ready ${cat.name} templates with instant download after purchase.`,
    alternates: { canonical: `/shop/${cat.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) return notFound();
  const items = getProductsByCategory(params.category as Category);

  return (
    <div className="container-page py-12 sm:py-16">
      <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-signal-500">Home</Link> <span className="mx-1">/</span>
        <Link href="/shop" className="hover:text-signal-500">Shop</Link> <span className="mx-1">/</span> {cat.name}
      </nav>
      <SectionHeading eyebrow="Category" title={cat.name} description={cat.description} />
      <div className="mt-10">
        {items.length > 0 ? (
          <ProductToolbar products={items} />
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 dark:border-white/10 py-16 text-center text-sm text-slate-500 dark:text-slate-400">
            New kits for {cat.name} are coming soon.{" "}
            <Link href="/contact" className="text-signal-600 dark:text-signal-400 hover:underline">
              Tell us what you need →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
