export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink dark:text-white">{title}</h1>
      <p className="mt-2 text-xs text-slate-400">Last updated: {updated}</p>
      <div className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-h2:text-lg">
        {children}
      </div>
    </div>
  );
}
