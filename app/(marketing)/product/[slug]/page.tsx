import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, FileText, RefreshCcw } from "lucide-react";
import { products, getProductBySlug, getReviewsForProduct, getRelatedProducts } from "@/lib/data";
import Gallery from "@/components/product/gallery";
import BuyBox from "@/components/product/buy-box";
import ReviewList from "@/components/product/review-list";
import ProductCard from "@/components/product-card";
import SectionHeading from "@/components/section-heading";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.tagline}. ${product.documentCount} editable documents. Instant download after purchase.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: product.title, description: product.tagline, images: product.images },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.docCode,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="container-page py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-signal-500">Home</Link> <span className="mx-1">/</span>
        <Link href="/shop" className="hover:text-signal-500">Shop</Link> <span className="mx-1">/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-signal-500 capitalize">{product.category.replace(/-/g, " ")}</Link>{" "}
        <span className="mx-1">/</span> {product.title}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Gallery product={product} />

          <div className="mt-10">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink dark:text-white">{product.title}</h1>
            <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">{product.tagline}</p>
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">{product.description}</p>
          </div>

          <div className="mt-10">
            <SectionHeading title="What's included" />
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {product.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-lg bg-slate-50 dark:bg-white/5 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-certify-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 dark:border-white/10 p-4">
              <FileText className="h-4 w-4 text-signal-500" />
              <p className="mt-2 text-sm font-semibold text-ink dark:text-white">{product.documentCount} documents</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Editable & print-ready</p>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-white/10 p-4">
              <RefreshCcw className="h-4 w-4 text-signal-500" />
              <p className="mt-2 text-sm font-semibold text-ink dark:text-white">Version {product.version}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Updated {new Date(product.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-white/10 p-4">
              <CheckCircle2 className="h-4 w-4 text-signal-500" />
              <p className="mt-2 text-sm font-semibold text-ink dark:text-white">Compatible with</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{product.compatibility.join(", ")}</p>
            </div>
          </div>

          <div className="mt-14">
            <SectionHeading eyebrow="Reviews" title={`Customer reviews (${product.reviewCount})`} />
            <div className="mt-6"><ReviewList reviews={reviews} /></div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <BuyBox product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20 border-t border-slate-200 dark:border-white/10 pt-14">
          <SectionHeading eyebrow="You may also need" title="Related documentation kits" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
