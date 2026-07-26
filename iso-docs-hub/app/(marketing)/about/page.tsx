import type { Metadata } from "next";
import { Target, Eye, Award, Users, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About Us",
  description: "ISO Docs Hub builds original ISO documentation templates, SOPs and compliance formats for MSMEs, manufacturers, pharma and exporters.",
  alternates: { canonical: "/about" },
};

const whyUs = [
  { icon: ShieldCheck, title: "Original content", desc: "Every document is authored in-house by our consulting team — never copied from a standard." },
  { icon: Award, title: "Practitioner-built", desc: "Written by people who've sat across the table from certification body auditors." },
  { icon: Users, title: "MSME-first pricing", desc: "Priced so a first-time exporter and a multi-plant manufacturer can both afford to get audit-ready." },
  { icon: Sparkles, title: "Kept current", desc: "Kits are revised as clauses, schemes and audit practices change." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading eyebrow="About Us" title="We turn management systems into documents people actually use" align="center" />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-8">
          <h2 className="font-display text-lg font-semibold text-ink dark:text-white">Our story</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            ISO Docs Hub started inside a compliance consultancy that kept rebuilding the same manuals, SOPs and
            checklists for every new MSME client. We packaged that experience into ready, editable documentation kits —
            so businesses no longer have to pay consultant hours for a first draft, and consultants can spend their
            time on implementation, not formatting.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6">
            <Target className="h-5 w-5 text-signal-500" />
            <h3 className="mt-3 font-display text-sm font-semibold text-ink dark:text-white">Mission</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Make audit-ready documentation accessible and affordable for every MSME, manufacturer and exporter in India.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6">
            <Eye className="h-5 w-5 text-certify-500" />
            <h3 className="mt-3 font-display text-sm font-semibold text-ink dark:text-white">Vision</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              To be the documentation layer every certification journey in India starts with.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-200 dark:border-white/10 pt-14">
        <SectionHeading eyebrow="Why choose us" title="What sets our documentation apart" align="center" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-50 dark:bg-signal-500/10">
                <w.icon className="h-5 w-5 text-signal-600 dark:text-signal-400" />
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink dark:text-white">{w.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
