import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import FadeIn from "@/components/common/FadeIn";
import SectionHeading from "@/components/common/SectionHeading";

export default function CategoryGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading
            eyebrow="Browse by Category"
            title="Everything You Need to "
            highlight="Perform Better"
            description="From explosive pre-workouts to premium proteins — find the right supplement for every goal."
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 0.07} direction="up">
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>

                <h3 className="font-display text-base font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-zinc-600">
                  <span>{cat.productCount}+ products</span>
                </div>

                {/* Arrow */}
                <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-zinc-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-violet-400" />

                {/* Bottom gradient accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                />
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
