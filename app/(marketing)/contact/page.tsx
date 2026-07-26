import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/marketing/contact-form";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ISO Docs Hub for documentation kit queries, customisation support or bulk pricing.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading eyebrow="Contact" title="Talk to a documentation specialist" align="center" />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-signal-500" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">Email</p>
              <a href="mailto:support@isodocshub.com" className="text-sm text-slate-500 dark:text-slate-400 hover:text-signal-500">support@isodocshub.com</a>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-signal-500" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">Phone</p>
              <a href="tel:+919876543210" className="text-sm text-slate-500 dark:text-slate-400 hover:text-signal-500">+91 98765 43210</a>
            </div>
          </div>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 p-5 flex items-start gap-3 hover:border-[#25D366]"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 text-[#128C4A]" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">WhatsApp</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Chat with us for fast answers</p>
            </div>
          </a>
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5 flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-signal-500" />
            <div>
              <p className="text-sm font-semibold text-ink dark:text-white">Office</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">402, Business Square, Andheri East, Mumbai, Maharashtra 400069</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
            <iframe
              title="ISO Docs Hub location"
              src="https://www.google.com/maps?q=Andheri+East+Mumbai&output=embed"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
