import type { Metadata } from "next";
import LegalPage from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/legal/privacy-policy" } };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="25 July 2026">
      <h2>1. Information we collect</h2>
      <p>We collect the information you provide when you register an account, purchase a product, request a free download, or contact us — including name, email, mobile number, company name and billing details.</p>
      <h2>2. How we use your information</h2>
      <p>We use your information to process orders, deliver digital downloads, generate GST invoices, provide support, and — where you've consented — send product updates and newsletters.</p>
      <h2>3. Payment data</h2>
      <p>Payments are processed by Razorpay. We do not store your card, UPI or net banking credentials on our servers.</p>
      <h2>4. Data storage</h2>
      <p>Account, order and product data is stored securely with Supabase (PostgreSQL) using row-level security. Digital files are stored in access-controlled storage buckets.</p>
      <h2>5. Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data by emailing support@isodocshub.com.</p>
      <h2>6. Cookies</h2>
      <p>We use essential cookies for authentication and session management, and optional analytics cookies to improve the site.</p>
    </LegalPage>
  );
}
