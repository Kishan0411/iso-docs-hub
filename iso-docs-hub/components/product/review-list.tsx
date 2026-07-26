import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No reviews yet for this kit.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-white/10"}`} />
            ))}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{r.comment}</p>
          <p className="mt-3 text-xs font-semibold text-ink dark:text-white">{r.name} <span className="font-normal text-slate-400">· {r.company}</span></p>
        </div>
      ))}
    </div>
  );
}
