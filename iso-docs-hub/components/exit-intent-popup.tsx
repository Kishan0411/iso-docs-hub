"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem("exitPopupShown")) shown.current = true;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown.current) {
        shown.current = true;
        sessionStorage.setItem("exitPopupShown", "1");
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 backdrop-blur-sm px-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-ink-light p-8 shadow-card-hover"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-ink dark:hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-certify-50 dark:bg-certify-500/10">
              <Download className="h-5 w-5 text-certify-600" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">Before you go — grab the free kit</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Get the ZED Bronze Starter Kit and 5 audit-ready formats, free. No document is complete
              without seeing one first.
            </p>
            <a
              href="/free-downloads"
              className="mt-5 flex w-full items-center justify-center rounded-md bg-signal-500 py-2.5 text-sm font-semibold text-white hover:bg-signal-600"
              onClick={() => setShow(false)}
            >
              Get Free Downloads
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
