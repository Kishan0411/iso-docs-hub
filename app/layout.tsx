import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import ExitIntentPopup from "@/components/exit-intent-popup";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://isodocshub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ISO Docs Hub | Professional Documentation for Certification & Compliance",
    template: "%s | ISO Docs Hub",
  },
  description:
    "Ready-to-use ISO 9001, ISO 14001, ISO 45001, IMS, ZED and vendor registration documentation kits — SOPs, formats, checklists and registers built by compliance consultants. Instant download.",
  keywords: [
    "ISO 9001 documentation kit",
    "ISO 14001 templates",
    "ISO 45001 SOPs",
    "ZED certification documents",
    "quality management system templates",
    "audit checklist download",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ISO Docs Hub",
    title: "ISO Docs Hub | Professional Documentation for Certification & Compliance",
    description:
      "Editable ISO documentation kits, SOPs, formats and audit checklists for MSMEs, manufacturers, pharma and exporters. Instant digital download after purchase.",
    images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISO Docs Hub | Professional Documentation for Certification & Compliance",
    description:
      "Editable ISO documentation kits, SOPs, formats and audit checklists. Instant digital download.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ISO Docs Hub",
                url: SITE_URL,
                logo: `${SITE_URL}/images/logo.png`,
                description:
                  "Original ISO documentation templates, SOPs, formats and audit checklists for certification and compliance.",
                sameAs: [
                  "https://www.linkedin.com/company/isodocshub",
                  "https://www.facebook.com/isodocshub",
                  "https://www.instagram.com/isodocshub",
                ],
              }),
            }}
          />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ExitIntentPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
