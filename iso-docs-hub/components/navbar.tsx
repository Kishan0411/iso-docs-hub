"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Search, User, ChevronDown } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { categories } from "@/lib/data";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Free Downloads", href: "/free-downloads" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-paper/85 dark:bg-ink/85 backdrop-blur-md border-b border-slate-200 dark:border-white/10"
          : "bg-paper dark:bg-ink border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-md bg-ink dark:bg-signal-500">
            <ShieldCheck className="h-4.5 w-4.5 text-certify-400" strokeWidth={2.25} />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            ISO Docs Hub
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-ink dark:hover:text-white rounded-md">
              Shop <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light shadow-card-hover p-3">
                    {categories.slice(0, 12).map((c) => (
                      <Link
                        key={c.slug}
                        href={`/shop/${c.slug}`}
                        className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5"
                      >
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{c.description}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light shadow-card p-1">
                    <Link href="/shop" className="block text-center text-sm font-medium text-signal-600 dark:text-signal-400 py-2 hover:underline">
                      View all categories →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-ink dark:hover:text-white rounded-md"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/shop"
            aria-label="Search documents"
            className="p-2 rounded-md text-slate-500 hover:text-ink dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <Search className="h-4.5 w-4.5" />
          </Link>
          <ThemeToggle />
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-ink dark:hover:text-white"
          >
            <User className="h-4 w-4" /> Login
          </Link>
          <Link
            href="/shop"
            className="rounded-md bg-signal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-signal-600 transition-colors"
          >
            Browse Documents
          </Link>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-slate-700 dark:text-slate-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-white/10 bg-paper dark:bg-ink"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium border-b border-slate-100 dark:border-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-3">
                <Link href="/login" className="flex-1 text-center rounded-md border border-slate-200 dark:border-white/10 py-2.5 text-sm font-medium">
                  Login
                </Link>
                <Link href="/register" className="flex-1 text-center rounded-md bg-signal-500 text-white py-2.5 text-sm font-medium">
                  Register
                </Link>
              </div>
              <div className="pt-2"><ThemeToggle /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
