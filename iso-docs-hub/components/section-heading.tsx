export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-certify-600 dark:text-certify-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink dark:text-white text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
