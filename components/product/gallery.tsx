"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import type { Product } from "@/lib/types";

export default function Gallery({ product }: { product: Product }) {
  const shots = product.images.length ? product.images : ["placeholder"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 bg-grid flex items-center justify-center">
        <div className="relative h-40 w-32 rotate-[-3deg] rounded-sm bg-white shadow-card-hover border border-slate-200">
          <div className="absolute inset-x-4 top-5 h-1.5 rounded-full bg-signal-200" />
          <div className="absolute inset-x-4 top-9 h-1 rounded-full bg-slate-200" />
          <div className="absolute inset-x-4 top-12 h-1 rounded-full bg-slate-200" />
          <div className="absolute inset-x-4 top-15 h-1 rounded-full bg-slate-200" />
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-[9px] font-mono text-slate-400">
            <FileText className="h-2.5 w-2.5" /> {product.docCode}
          </div>
        </div>
        <span className="absolute right-3 bottom-3 rounded bg-ink/90 px-2 py-1 font-mono text-[10px] text-white">
          Sample layout — actual doc styled to your brand
        </span>
      </div>
      {shots.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {shots.map((s, i) => (
            <button
              key={s}
              onClick={() => setActive(i)}
              className={`aspect-[4/3] rounded-md border bg-slate-50 dark:bg-white/5 ${
                active === i ? "border-signal-500" : "border-slate-200 dark:border-white/10"
              }`}
              aria-label={`View screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
