import Link from "next/link";
import { ShieldCheck, Linkedin, Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "ISO 9001", href: "/shop/iso-9001" },
      { label: "ISO 14001", href: "/shop/iso-14001" },
      { label: "ISO 45001", href: "/shop/iso-45001" },
      { label: "ZED Certification", href: "/shop/zed-certification" },
      { label: "All Categories", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Free Downloads", href: "/free-downloads" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "My Dashboard", href: "/dashboard" },
      { label: "Purchased Products", href: "/dashboard#purchases" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Refund Policy", href: "/legal/refund-policy" },
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
      { label: "Shipping Policy", href: "/legal/shipping-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-ink mt-24">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink dark:bg-signal-500">
                <ShieldCheck className="h-4.5 w-4.5 text-certify-400" />
              </span>
              <span className="font-display text-[15px] font-semibold">ISO Docs Hub</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              Professional documentation for certification & compliance — SOPs, formats,
              checklists and manuals built by consultants, delivered instantly.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Mail className="h-4 w-4" /> support@isodocshub.com
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Phone className="h-4 w-4" /> +91 98765 43210
            </div>
            <div className="mt-4 flex items-center gap-3">
              {[Linkedin, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 dark:border-white/10 text-slate-500 hover:text-signal-500 hover:border-signal-500"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-600 dark:text-slate-300 hover:text-signal-500">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-certify-200/60 bg-certify-50 dark:bg-white/5 dark:border-white/10 px-4 py-3 text-xs text-certify-700 dark:text-certify-400">
          <strong>Important:</strong> ISO Docs Hub sells original, independently authored documentation templates
          (manuals, SOPs, formats and checklists). We do not sell or distribute official ISO standard publications,
          which remain copyrighted by ISO and must be purchased from ISO or its authorized national bodies.
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} ISO Docs Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Secure payments via Razorpay</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>UPI · Cards · Net Banking · Wallets</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
