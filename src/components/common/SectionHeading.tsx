import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl lg:text-5xl">
        {titleParts[0]}
        {highlight && (
          <span className="gradient-text">{highlight}</span>
        )}
        {titleParts[1]}
      </h2>
      {description && (
        <p className="mt-4 text-base text-zinc-400 sm:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
