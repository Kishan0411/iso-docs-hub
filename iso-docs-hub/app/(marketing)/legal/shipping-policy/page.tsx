import type { Metadata } from "next";
import LegalPage from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Shipping Policy", alternates: { canonical: "/legal/shipping-policy" } };

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy" updated="25 July 2026">
      <h2>Digital delivery only</h2>
      <p>ISO Docs Hub sells digital documentation files only — no physical products are shipped. On successful payment, your files unlock instantly in Dashboard → Purchased Products and a download link is emailed to you.</p>
      <h2>Delivery time</h2>
      <p>Delivery is instant. If a download does not appear in your dashboard within 10 minutes of a successful payment, contact support@isodocshub.com with your order ID.</p>
      <h2>Re-download access</h2>
      <p>You can re-download purchased files anytime from your dashboard's Download History — there's no limit on re-downloads for the version you purchased.</p>
    </LegalPage>
  );
}
