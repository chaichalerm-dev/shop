/**
 * TH:
 * CategoryGrid — Section แสดงหมวดหมู่สินค้าบนหน้าแรก
 * เป็น Server Component (ไม่มี "use client") — render บน server
 * ใช้ FadeIn wrapper สำหรับ scroll-triggered animations
 *
 * Layout: responsive grid 2→3→5 columns (5 categories พอดีบน desktop)
 * แต่ละ card มี:
 * - Icon (emoji) ใน colored background (opacity 15% ของ category color)
 * - ชื่อ + description + product count
 * - Arrow indicator เลื่อนขวาเมื่อ hover
 * - Bottom color bar (gradient ตาม category color) แสดงเมื่อ hover
 *
 * EN:
 * CategoryGrid — homepage section displaying product categories.
 * Server Component — no client JavaScript needed.
 * FadeIn wrappers provide scroll-triggered entrance animations.
 *
 * Layout: 2→3→5 responsive columns (5 categories fit perfectly on desktop)
 * Each card contains:
 * - Emoji icon in a tinted background (15% category color opacity)
 * - Name, description, product count
 * - Arrow that slides right on hover
 * - Bottom gradient bar using category color — visible on hover
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";
import FadeIn from "@/components/common/FadeIn";
import SectionHeading from "@/components/common/SectionHeading";

export default function CategoryGrid() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TH: Section heading — centered | EN: Centered section heading */}
        <FadeIn>
          <SectionHeading
            eyebrow="Browse by Category"
            title="Everything You Need to "
            highlight="Perform Better"
            description="From explosive pre-workouts to premium proteins — find the right supplement for every goal."
          />
        </FadeIn>

        {/* TH: Categories grid — 2→3→5 columns, stagger delay | EN: Staggered 5-column category grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 0.07} direction="up">
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
              >
                {/* TH: Icon container — colored background ด้วย opacity 15% | EN: Emoji icon in tinted background */}
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${cat.color}15` }}  // TH: 15% opacity ของ category color | EN: 15% opacity tint
                >
                  {cat.icon}
                </div>

                {/* TH: Name — เปลี่ยนเป็น violet เมื่อ hover ผ่าน group-hover | EN: Name — violet on group-hover */}
                <h3 className="font-display text-base font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                  {cat.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-zinc-600">
                  <span>{cat.productCount}+ products</span>
                </div>

                {/* TH: Arrow — top-right corner, เลื่อนขวา + เปลี่ยนสีเมื่อ hover | EN: Arrow — top-right, slides and changes color on hover */}
                <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-zinc-700 transition-all duration-200 group-hover:translate-x-1 group-hover:text-violet-400" />

                {/* TH: Color accent bar — bottom edge, แสดงเมื่อ hover, gradient fade to transparent | EN: Category color accent bar — bottom edge, hover only */}
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
