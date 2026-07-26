import type { Metadata } from "next";
import LegalPage from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Refund Policy", alternates: { canonical: "/legal/refund-policy" } };

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="25 July 2026">
      <h2>Digital products</h2>
      <p>All products sold on ISO Docs Hub are digital documentation files delivered instantly on payment confirmation. Because the files are accessible immediately, we generally do not offer refunds once a download has been unlocked.</p>
      <h2>When a refund applies</h2>
      <ul>
        <li>The file delivered is corrupted or unopenable and cannot be resolved by re-issuing the download.</li>
        <li>You were charged for a product you did not purchase, or charged twice for the same order.</li>
        <li>The wrong product was delivered against your order.</li>
      </ul>
      <h2>How to request</h2>
      <p>Email support@isodocshub.com within 7 days of purchase with your order ID and a description of the issue. Approved refunds are processed to the original payment method within 5–7 business days.</p>
    </LegalPage>
  );
}
