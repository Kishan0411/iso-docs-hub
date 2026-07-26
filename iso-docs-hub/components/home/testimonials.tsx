import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";
import SectionHeading from "../section-heading";

export default function Testimonials() {
  return (
    <section className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Customer reviews"
        title="Trusted by compliance teams across industries"
        align="center"
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6"
          >
            <Quote className="h-5 w-5 text-certify-500" />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-white/10"}`}
                />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              "{r.comment}"
            </p>
            <div className="mt-4 border-t border-slate-100 dark:border-white/10 pt-3">
              <p className="text-sm font-semibold text-ink dark:text-white">{r.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
