import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands } from "@/lib/data";
import FadeIn from "@/components/common/FadeIn";
import SectionHeading from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";

export default function BrandShowcase() {
  const featuredBrands = brands.filter((b) => b.featured);

  return (
    <section className="py-24 lg:py-32 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Official Brands"
            title="World-Class Brands, "
            highlight="Authentic Guaranteed"
            description="Every product is sourced directly from authorized distributors. Zero counterfeits, ever."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {featuredBrands.map((brand, i) => (
            <FadeIn key={brand.id} delay={i * 0.08}>
              <Link
                href={`/brands/${brand.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 transition-all duration-300 hover:border-violet-800/40 hover:bg-zinc-900/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/20"
              >
                {/* Country badge */}
                <Badge variant="outline" className="mb-4 w-fit text-[10px]">
                  {brand.country}
                </Badge>

                <h3 className="font-display text-xl font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                  {brand.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 line-clamp-2">
                  {brand.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {brand.productCount}+ products
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-violet-400 opacity-0 transition-all group-hover:opacity-100">
                    View all <ArrowRight className="h-3 w-3" />
                  </span>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-violet-500/30 transition-opacity group-hover:opacity-100" />
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all brands <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
