import type { Metadata } from "next";
import { Gem, ShieldCheck, ClipboardCheck, FileText, LayoutGrid, FileStack } from "lucide-react";
import LeadCaptureForm from "@/components/marketing/lead-capture-form";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Free ISO & Compliance Document Downloads",
  description:
    "Download free samples: ZED Bronze Starter Kit, Safety Posters, 5S Posters, Internal Audit Checklist, Sample SOP, Sample Procedure and Sample Forms.",
  alternates: { canonical: "/free-downloads" },
};

const resources = [
  { icon: Gem, title: "ZED Bronze Starter Kit", desc: "Parameter-wise self-assessment starter templates for MSMEs." },
  { icon: ShieldCheck, title: "Safety Posters", desc: "10 print-ready workplace safety posters (A3 & A4)." },
  { icon: LayoutGrid, title: "5S Posters", desc: "Visual 5S posters for shopfloor and office areas." },
  { icon: ClipboardCheck, title: "Audit Checklist", desc: "A sample internal audit checklist with scoring columns." },
  { icon: FileStack, title: "Sample SOP", desc: "One complete sample SOP showing our documentation format." },
  { icon: FileText, title: "Sample Forms", desc: "A small set of record formats ready to adapt." },
];

export default function FreeDownloadsPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Free Resources"
        title="Try our documentation style — free"
        description="Enter your details once and get instant email access to every free resource below."
        align="center"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {resources.map((r) => (
            <div key={r.title} className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-light p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-certify-50 dark:bg-certify-500/10">
                <r.icon className="h-4.5 w-4.5 text-certify-600 dark:text-certify-400" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink dark:text-white">{r.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>

        <LeadCaptureForm />
      </div>
    </div>
  );
}
