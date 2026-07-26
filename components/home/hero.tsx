"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, Download, ShieldCheck } from "lucide-react";

const stats = [
  { value: "3,200+", label: "kits delivered" },
  { value: "17", label: "document categories" },
  { value: "4.8/5", label: "average rating" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/10 bg-grid">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-signal-100 dark:bg-signal-500/10 blur-3xl" />
      <div className="container-page relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-certify-200 dark:border-certify-500/30 bg-certify-50 dark:bg-certify-500/10 px-3 py-1 text-xs font-medium text-certify-700 dark:text-certify-400">
            <ShieldCheck className="h-3.5 w-3.5" /> Original documentation — not official ISO standards
          </span>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-tight text-ink dark:text-white text-balance">
            Documentation for certification,
            <br className="hidden sm:block" /> ready before your{" "}
            <span className="text-signal-500">next audit.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
            Editable ISO 9001, 14001, 45001, IMS and ZED documentation kits — manuals, SOPs,
            formats and audit checklists built by practicing consultants. Preview before you buy,
            download instantly after payment.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="group flex items-center gap-2 rounded-md bg-signal-500 px-5 py-3 text-sm font-semibold text-white shadow-card hover:bg-signal-600 transition-colors"
            >
              Browse Documentation Kits
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/free-downloads"
              className="flex items-center gap-2 rounded-md border border-slate-300 dark:border-white/15 px-5 py-3 text-sm font-semibold text-ink dark:text-white hover:border-signal-500 hover:text-signal-600 transition-colors"
            >
              <Download className="h-4 w-4" /> Get Free Samples
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-xl font-semibold text-ink dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 shadow-card-hover">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-400">QMS-9001-KIT · v4.2</span>
              <FileCheck2 className="h-4 w-4 text-certify-500" />
            </div>
            <div className="mt-3 space-y-2">
              {["Quality Manual", "42 SOPs", "38 Record Formats", "Internal Audit Checklist"].map((row, i) => (
                <div key={row} className="flex items-center justify-between rounded-md bg-slate-50 dark:bg-white/5 px-3 py-2.5">
                  <span className="text-sm text-slate-700 dark:text-slate-200">{row}</span>
                  <span className="h-2 w-2 rounded-full bg-certify-500" />
                </div>
              ))}
            </div>
            <motion.div
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: -12, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute -right-4 -top-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border-[3px] border-certify-500 bg-white dark:bg-ink-light text-center shadow-stamp"
            >
              <span className="text-[9px] font-bold uppercase tracking-wide text-certify-600">Audit</span>
              <span className="text-[9px] font-bold uppercase tracking-wide text-certify-600">Ready</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
