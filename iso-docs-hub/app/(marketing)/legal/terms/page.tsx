import type { Metadata } from "next";
import LegalPage from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/legal/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="25 July 2026">
      <h2>1. Use of documents</h2>
      <p>Documents purchased from ISO Docs Hub are licensed for use within the purchasing organisation only. Resale, redistribution or public sharing of the files is prohibited.</p>
      <h2>2. Intellectual property</h2>
      <p>All templates, manuals, SOPs, formats and checklists are original works created by ISO Docs Hub or its contributing consultants. We do not sell, reproduce or distribute official ISO standard publications, which remain the copyrighted property of the International Organization for Standardization (ISO).</p>
      <h2>3. No certification guarantee</h2>
      <p>Our documentation supports your certification and compliance effort but does not itself guarantee certification, which is granted solely by accredited certification bodies following their own audit process.</p>
      <h2>4. Account responsibility</h2>
      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</p>
      <h2>5. Governing law</h2>
      <p>These terms are governed by the laws of India, with courts in Mumbai, Maharashtra having exclusive jurisdiction.</p>
    </LegalPage>
  );
}
