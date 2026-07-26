"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20help%20choosing%20an%20ISO%20documentation%20kit."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 shadow-card-hover transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6 text-white" fill="white" />
    </a>
  );
}
