import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Benefits from "@/components/home/benefits";
import PopularProducts from "@/components/home/popular-products";
import Testimonials from "@/components/home/testimonials";
import FreeDownloadsTeaser from "@/components/home/free-downloads-teaser";
import BlogPreview from "@/components/home/blog-preview";
import FAQ from "@/components/home/faq";

export const metadata: Metadata = {
  title: "ISO Docs Hub | Professional Documentation for Certification & Compliance",
  description:
    "Editable ISO 9001, ISO 14001, ISO 45001, IMS, ZED and vendor registration documentation kits — SOPs, formats, checklists and registers. Preview a sample, buy, download instantly.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <PopularProducts />
      <Testimonials />
      <FreeDownloadsTeaser />
      <BlogPreview />
      <FAQ />
    </>
  );
}
