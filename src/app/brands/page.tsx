/**
 * TH:
 * Brands Page — หน้าแสดงแบรนด์ทั้งหมด (/brands)
 * เป็น Server Component — ไม่ต้องการ client-side interactivity
 * แสดงแบรนด์ทั้ง 6 ใน grid พร้อม country badge และ featured badge
 *
 * Layout:
 * - Page header: ชื่อหน้า + จำนวนแบรนด์
 * - Grid: 6 brands (1 col → 2 cols sm → 3 cols lg)
 * - แต่ละ card: country badge, featured badge, ชื่อ, description, product count, arrow
 *
 * Interaction: CSS-only hover effects (ไม่ต้องการ JavaScript)
 * - Hover: card ยกขึ้น, glow ring แสดง, text สีม่วง, arrow เลื่อนขวา
 *
 * EN:
 * Brands Page — displays all 6 brands (/brands).
 * Server Component — pure CSS hover effects, no client-side JavaScript.
 *
 * Layout:
 * - Page header: title and brand count
 * - Grid: 6 brands (1→2→3 columns)
 * - Each card: country badge, featured badge, name, description, count, arrow
 *
 * Interactions: CSS-only hover (no JavaScript required)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { brands } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Brands" };

export default function BrandsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">

        {/* TH: Page header | EN: Page header */}
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-100">Brands</h1>
            {/* TH: brands.length แสดงจำนวนแบรนด์ dynamic | EN: dynamic brand count */}
            <p className="mt-2 text-zinc-500">Official products from {brands.length} top global brands</p>
          </div>
        </div>

        {/* TH: Brands grid | EN: Brands grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-7 transition-all hover:border-violet-800/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/20">

                {/* TH: Top row — country badge + featured badge | EN: Top badge row */}
                <div className="mb-4 flex items-start justify-between">
                  <Badge variant="outline" className="text-[10px]">{brand.country}</Badge>
                  {brand.featured && <Badge variant="default" className="text-[10px]">Featured</Badge>}
                </div>

                <h2 className="font-display text-2xl font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">{brand.name}</h2>
                {/* TH: line-clamp-2 จำกัด description 2 บรรทัด | EN: 2-line description clamp */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">{brand.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">{brand.productCount}+ products</span>
                  <ArrowRight className="h-4 w-4 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-violet-400" />
                </div>

                {/* TH: Hover glow ring — absolute positioned ring รอบ card | EN: Hover glow ring overlay */}
                <div className="absolute inset-0 rounded-3xl opacity-0 ring-1 ring-violet-500/30 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
