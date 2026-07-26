"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "../section-heading";

const faqs = [
  {
    q: "Are these the official ISO standard documents?",
    a: "No. ISO Docs Hub does not sell or distribute official ISO standard publications, which are copyrighted by ISO. We author original documentation — manuals, SOPs, formats and checklists — that helps you implement and comply with those standards. Official standards must be purchased from ISO or your national standards body.",
  },
  {
    q: "How do I receive the files after payment?",
    a: "Your files unlock instantly in your Dashboard → Purchased Products the moment payment is confirmed by Razorpay. You'll also receive a download link and invoice by email.",
  },
  {
    q: "Can I preview a document before buying?",
    a: "Yes. Every product page includes a sample preview PDF and screenshots of the actual formatting so you know exactly what you're purchasing.",
  },
  {
    q: "What file formats do I get?",
    a: "Most kits are delivered as editable MS Word and MS Excel files, compatible with Google Docs and Google Sheets. Compatibility is listed on each product page.",
  },
  {
    q: "Do you offer customisation support?",
    a: "Yes — our consultants can help you adapt clauses to your process over WhatsApp or email. Extended customisation is available as a paid add-on for select kits.",
  },
  {
    q: "What is your refund policy?",
    a: "Because these are instantly downloadable digital products, refunds are evaluated case-by-case for technical issues (corrupted files, wrong product delivered). See our full Refund Policy for details.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="container-page py-16 sm:py-24">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" />
      <div className="mx-auto mt-10 max-w-2xl divide-y divide-slate-200 dark:divide-white/10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light">
        {faqs.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm font-medium text-ink dark:text-white">{item.q}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
