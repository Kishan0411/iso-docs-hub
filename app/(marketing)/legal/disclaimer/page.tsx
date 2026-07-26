import type { Metadata } from "next";
import LegalPage from "@/components/marketing/legal-page";

export const metadata: Metadata = { title: "Disclaimer", alternates: { canonical: "/legal/disclaimer" } };

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="25 July 2026">
      <h2>Not an official ISO source</h2>
      <p>ISO Docs Hub is an independent documentation provider and is not affiliated with, endorsed by, or acting on behalf of the International Organization for Standardization (ISO) or any accreditation or certification body. "ISO" and standard numbers (e.g. ISO 9001, ISO 14001, ISO 45001) are used descriptively to indicate the management system framework our templates support.</p>
      <h2>No official standard text included</h2>
      <p>Our products do not contain, reproduce or quote the official text of any ISO standard. Businesses seeking the authoritative standard text must purchase it directly from ISO or their national standards body.</p>
      <h2>General information only</h2>
      <p>Blog content and free resources are provided for general informational purposes and do not constitute legal, regulatory or certification advice.</p>
    </LegalPage>
  );
}
