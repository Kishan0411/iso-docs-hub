import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/data";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "ISO & Compliance Blog",
  description: "ISO tips, internal audit guides, quality, safety, environment, ZED and vendor registration articles.",
  alternates: { canonical: "/blog" },
};

const blogCategories = ["All", "ISO Tips", "Internal Audit", "Quality", "Safety", "Environment", "ZED", "Vendor Registration", "Government Schemes"];

export default function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const active = searchParams.category ?? "All";
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading eyebrow="Blog" title="ISO tips, audit guides & compliance updates" align="center" />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {blogCategories.map((c) => (
          <Link
            key={c}
            href={c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              active === c
                ? "border-signal-500 bg-signal-500 text-white"
                : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-signal-400"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light hover:-translate-y-0.5 hover:shadow-card-hover transition-all"
          >
            <div className="aspect-[16/9] bg-grid bg-gradient-to-br from-signal-50 to-certify-50 dark:from-signal-500/10 dark:to-certify-500/10" />
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-certify-600 dark:text-certify-400">{post.category}</span>
              <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink dark:text-white group-hover:text-signal-600 dark:group-hover:text-signal-400">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{post.excerpt}</p>
              <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min read</span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-slate-500 dark:text-slate-400">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}
