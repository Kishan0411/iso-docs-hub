"use client";

import { motion } from "framer-motion";
import { FileCheck2, Zap, Users2, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";
import SectionHeading from "../section-heading";

const benefits = [
  {
    icon: FileCheck2,
    title: "Audit-tested content",
    description: "Every template is built and field-tested by practicing quality, safety and environment consultants — not scraped or generic.",
  },
  {
    icon: Zap,
    title: "Instant download",
    description: "No waiting for email delivery. Files unlock in your dashboard the moment payment is confirmed.",
  },
  {
    icon: RefreshCcw,
    title: "Version updates",
    description: "Documentation kits are revised as standards and audit practices evolve — your download link stays current.",
  },
  {
    icon: Users2,
    title: "Built for every scale",
    description: "From single-plant MSMEs to multi-site exporters — kits scale from starter formats to full IMS structures.",
  },
  {
    icon: ShieldCheck,
    title: "Original & compliant",
    description: "We author every document ourselves. Nothing here reproduces copyrighted ISO standard text.",
  },
  {
    icon: Headphones,
    title: "Consultant support",
    description: "Stuck customising a clause? Reach us on WhatsApp or email and a documentation specialist will help.",
  },
];

export default function Benefits() {
  return (
    <section className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Why teams choose us"
        title="Documentation built the way auditors actually read it"
        description="Not a repackaged PDF — a working document set your team can edit, issue and control."
        align="center"
      />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-6 hover:border-signal-300 dark:hover:border-signal-500/40 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-50 dark:bg-signal-500/10">
              <b.icon className="h-5 w-5 text-signal-600 dark:text-signal-400" />
            </div>
            <h3 className="mt-4 font-display text-[15px] font-semibold text-ink dark:text-white">{b.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{b.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
