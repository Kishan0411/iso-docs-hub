import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

const items = [
  "ZED Bronze Starter Kit",
  "Safety Posters (Set of 10)",
  "5S Posters",
  "Sample Internal Audit Checklist",
  "Sample SOP",
  "Sample Record Formats",
];

export default function FreeDownloadsTeaser() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-ink dark:bg-ink-light px-6 py-12 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-certify-500/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-certify-300">
              <Download className="h-3.5 w-3.5" /> Free, no strings attached
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white text-balance">
              Try before you buy — free samples and starter kits
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-300">
              See our formatting, clause mapping and writing style firsthand. Share a few details
              and we'll email your download links instantly.
            </p>
            <Link
              href="/free-downloads"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-slate-100 transition-colors"
            >
              Get Free Downloads <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200"
              >
                <Download className="h-3.5 w-3.5 shrink-0 text-certify-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
