"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText, Save, Loader2 } from "lucide-react";
import { categories } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function ProductForm({ initial }: { initial?: Partial<Product> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/admin/products", {
        method: initial?.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: initial?.id, ...payload }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/products");
      router.refresh();
    } catch {
      alert("Could not save product. Check required fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-4">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Basic details</h2>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Title</label>
            <input name="title" defaultValue={initial?.title} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Tagline</label>
            <input name="tagline" defaultValue={initial?.tagline} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Description</label>
            <textarea name="description" defaultValue={initial?.description} required rows={4} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Category</label>
              <select name="category" defaultValue={initial?.category} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500">
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Document Code</label>
              <input name="docCode" defaultValue={initial?.docCode} required placeholder="QMS-9001-KIT" className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-4">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">What's included</h2>
          <textarea
            name="whatsIncluded"
            defaultValue={initial?.whatsIncluded?.join("\n")}
            rows={5}
            placeholder="One item per line — e.g. Quality Manual&#10;42 Standard Operating Procedures"
            className="w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500"
          />
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Compatibility (comma separated)</label>
            <input name="compatibility" defaultValue={initial?.compatibility?.join(", ")} placeholder="MS Word, MS Excel, Google Docs" className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-3">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Files</h2>
          <label className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 dark:border-white/15 p-4 text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:border-signal-500">
            <UploadCloud className="h-5 w-5" /> Upload deliverable ZIP file
            <input type="file" name="zipFile" accept=".zip" className="hidden" />
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 dark:border-white/15 p-4 text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:border-signal-500">
            <FileText className="h-5 w-5" /> Upload preview PDF
            <input type="file" name="previewPdf" accept=".pdf" className="hidden" />
          </label>
          <label className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 dark:border-white/15 p-4 text-sm text-slate-500 dark:text-slate-400 cursor-pointer hover:border-signal-500">
            <UploadCloud className="h-5 w-5" /> Upload product images
            <input type="file" name="images" accept="image/*" multiple className="hidden" />
          </label>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 space-y-4">
          <h2 className="font-display text-sm font-semibold text-ink dark:text-white">Pricing & inventory</h2>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Price (₹)</label>
            <input name="price" type="number" defaultValue={initial?.price ? initial.price / 100 : undefined} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Compare-at price (₹)</label>
            <input name="compareAtPrice" type="number" defaultValue={initial?.compareAtPrice ? initial.compareAtPrice / 100 : undefined} className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Number of documents</label>
            <input name="documentCount" type="number" defaultValue={initial?.documentCount} required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Version</label>
            <input name="version" defaultValue={initial?.version} placeholder="v1.0" required className="mt-1 w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-signal-500" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" name="popular" defaultChecked={initial?.popular} className="accent-signal-500" /> Mark as bestseller
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-500 py-3 text-sm font-semibold text-white hover:bg-signal-600 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {initial?.id ? "Save Changes" : "Publish Product"}
        </button>
      </div>
    </form>
  );
}
