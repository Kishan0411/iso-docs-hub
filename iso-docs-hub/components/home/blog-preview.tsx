import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";
import SectionHeading from "../section-heading";

export default function BlogPreview() {
  return (
    <section className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
      <div className="container-page py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="From the blog" title="ISO tips, audit guides & scheme updates" />
          <Link href="/blog" className="flex items-center gap-1.5 text-sm font-semibold text-signal-600 dark:text-signal-400 hover:underline">
            Visit blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light hover:-translate-y-0.5 hover:shadow-card-hover transition-all"
            >
              <div className="aspect-[16/10] bg-grid bg-gradient-to-br from-signal-50 to-certify-50 dark:from-signal-500/10 dark:to-certify-500/10" />
              <div className="flex flex-1 flex-col p-4">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-certify-600 dark:text-certify-400">
                  {post.category}
                </span>
                <h3 className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink dark:text-white line-clamp-2 group-hover:text-signal-600 dark:group-hover:text-signal-400">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
