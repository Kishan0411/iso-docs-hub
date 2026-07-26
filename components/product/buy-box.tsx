"use client";

import { useState } from "react";
import { Star, FileText, ShieldCheck, Download, Heart, Tag } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BuyBox({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");

  async function handleBuyNow() {
    setLoading(true);
    try {
      // 1. Create an order on the server (amount, currency, receipt tied to productId + coupon)
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, couponCode: coupon || undefined }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not start checkout");

      // 2. Load Razorpay checkout and open payment modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ISO Docs Hub",
        description: product.title,
        order_id: order.id,
        prefill: {},
        theme: { color: "#2563EB" },
        handler: async function (response: any) {
          // 3. Verify signature server-side, then unlock download
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, productId: product.id }),
          });
          if (verifyRes.ok) {
            window.location.href = "/dashboard/purchases?success=1";
          } else {
            alert("Payment could not be verified. Contact support with your payment ID.");
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6 shadow-card">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        {product.rating} <span>·</span> {product.reviewCount} reviews
      </div>

      <div className="mt-2 flex items-end gap-2">
        <span className="font-display text-3xl font-semibold text-ink dark:text-white">{formatINR(product.price)}</span>
        {product.compareAtPrice && (
          <span className="pb-1 text-sm text-slate-400 line-through">{formatINR(product.compareAtPrice)}</span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Inclusive of GST · Instant download</p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="flex-1 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60 transition-colors"
        >
          {loading ? "Starting checkout…" : "Buy Now"}
        </button>
        <button
          aria-label="Add to wishlist"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 dark:border-white/10 text-slate-500 hover:text-signal-500 hover:border-signal-500"
        >
          <Heart className="h-4.5 w-4.5" />
        </button>
      </div>

      {product.previewPdfUrl && (
        <a
          href={product.previewPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 dark:border-white/10 py-2.5 text-sm font-medium text-ink dark:text-white hover:border-signal-500"
        >
          <Download className="h-4 w-4" /> Preview Sample PDF
        </a>
      )}

      <div className="mt-4 flex items-center gap-2 rounded-md bg-slate-50 dark:bg-white/5 px-3 py-2">
        <Tag className="h-4 w-4 text-slate-400" />
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          placeholder="Coupon code"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <ul className="mt-5 space-y-2 border-t border-slate-100 dark:border-white/10 pt-4 text-sm text-slate-600 dark:text-slate-300">
        <li className="flex items-center gap-2"><FileText className="h-4 w-4 text-signal-500" /> {product.documentCount} documents included</li>
        <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-certify-500" /> Version {product.version} · updated {new Date(product.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</li>
        <li className="flex items-center gap-2"><Download className="h-4 w-4 text-signal-500" /> Lifetime access to this version</li>
      </ul>
    </div>
  );
}
