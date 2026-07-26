import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data";
import CategoryGrid from "@/components/shop/category-grid";
import ProductToolbar from "@/components/shop/product-toolbar";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Shop ISO Documentation Kits, SOPs & Checklists",
  description:
    "Browse ISO 9001, ISO 14001, ISO 45001, IMS, ZED, vendor registration, SOPs, formats, audit checklists and more. Instant digital download after purchase.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-signal-500">Home</Link> <span className="mx-1">/</span> Shop
      </nav>
      <SectionHeading
        eyebrow="Documentation Store"
        title="Shop by category"
        description="17 categories covering quality, environment, safety, HR and government scheme documentation."
      />
      <div className="mt-10">
        <CategoryGrid />
      </div>

      <div className="mt-16 border-t border-slate-200 dark:border-white/10 pt-12">
        <SectionHeading eyebrow="All products" title="Every documentation kit" />
        <div className="mt-8">
          <ProductToolbar products={products} />
        </div>
      </div>
    </div>
  );
}
