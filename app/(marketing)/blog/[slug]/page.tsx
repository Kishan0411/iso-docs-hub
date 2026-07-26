import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.coverImage] },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
  };

  return (
    <article className="container-page max-w-3xl py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-xs text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-signal-500">Home</Link> <span className="mx-1">/</span>
        <Link href="/blog" className="hover:text-signal-500">Blog</Link> <span className="mx-1">/</span> {post.title}
      </nav>

      <span className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-wide text-certify-600 dark:text-certify-400">
        {post.category}
      </span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold leading-tight text-ink dark:text-white text-balance">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readMinutes} min read</span>
      </div>

      <div className="mt-8 aspect-[16/8] rounded-xl bg-grid bg-gradient-to-br from-signal-50 to-certify-50 dark:from-signal-500/10 dark:to-certify-500/10" />

      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-headings:font-display">
        <p>{post.excerpt}</p>
        <p>
          This article is part of our editorial library on {post.category.toLowerCase()}. Replace this placeholder
          body with the full article content — headings, numbered steps, tables and downloadable checklist links —
          when connecting this page to your CMS or Supabase <code>blog_posts</code> table.
        </p>
        <h2>Key takeaways</h2>
        <ul>
          <li>Written by practicing compliance consultants, not generic content.</li>
          <li>Every article links to a matching documentation kit or free sample where relevant.</li>
          <li>Updated periodically as certification body practices evolve.</li>
        </ul>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6">
        <p className="text-sm font-semibold text-ink dark:text-white">Need the documentation to match?</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Browse our ready-to-use kits for this topic.</p>
        <Link href="/shop" className="mt-3 inline-block text-sm font-semibold text-signal-600 dark:text-signal-400 hover:underline">
          Browse the shop →
        </Link>
      </div>
    </article>
  );
}
