"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, FileUp } from "lucide-react";
import AdminTopbar from "@/components/admin/topbar";
import { products as seedProducts } from "@/lib/data";
import { formatINR } from "@/lib/utils";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(seedProducts);

  function remove(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setProducts((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div>
      <AdminTopbar title="Products" />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">{products.length} products</p>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-md bg-signal-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-signal-600"
          >
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/10 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Docs</th>
                <th className="px-5 py-3 font-medium">Files</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink dark:text-white">{p.title}</p>
                    <p className="text-xs text-slate-400 font-mono">{p.docCode}</p>
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400 capitalize">{p.category.replace(/-/g, " ")}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{formatINR(p.price)}</td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">{p.documentCount}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <FileUp className="h-3.5 w-3.5" /> ZIP + PDF preview
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/${p.id}`} className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5" aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button onClick={() => remove(p.id)} className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
