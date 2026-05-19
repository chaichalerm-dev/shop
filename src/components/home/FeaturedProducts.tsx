/**
 * TH:
 * FeaturedProducts — Section แสดง featured products บนหน้าแรก
 * เป็น Client Component เพราะต้องการ useState สำหรับ selectedProduct (ProductModal)
 *
 * Data: getFeaturedProducts() — filter สินค้าที่มี featured: true จาก data.ts
 * ปัจจุบันมี 8 featured products
 *
 * Layout: responsive grid 2→3→4 columns พร้อม staggered FadeIn animation
 * - header row: SectionHeading (left-align) + "View all" link (right)
 * - product grid: FadeIn wrapper ต่อ card ด้วย delay={i * 0.06} สำหรับ stagger
 * - ProductModal: render ที่ระดับ section (ไม่ใช่ per-card)
 *
 * EN:
 * FeaturedProducts — homepage section displaying featured products.
 * Client Component because it manages selectedProduct state for the ProductModal.
 *
 * Data: getFeaturedProducts() — filters products with featured: true from data.ts
 * Currently 8 featured products.
 *
 * Layout: responsive 2→3→4 column grid with staggered FadeIn animations
 * - header row: left-aligned SectionHeading + "View all" link on the right
 * - product grid: each card wrapped in FadeIn with i * 0.06 stagger delay
 * - ProductModal: rendered once at section level (not per-card)
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import ProductModal from "@/components/product/ProductModal";
import FadeIn from "@/components/common/FadeIn";
import SectionHeading from "@/components/common/SectionHeading";
import type { Product } from "@/types";

export default function FeaturedProducts() {
  /**
   * TH:
   * selectedProduct — สินค้าที่ user กด Quick View
   * null = modal ปิด, Product = modal เปิดแสดงสินค้านั้น
   * State อยู่ที่ section level เพราะ ProductModal render เดียวใช้กับทุก card
   *
   * EN:
   * selectedProduct — product whose Quick View was triggered.
   * null = modal closed, Product object = modal open for that product.
   * State lives at section level because one ProductModal serves all cards.
   */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featured = getFeaturedProducts();

  return (
    <section className="py-24 lg:py-32 bg-zinc-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TH: Header row — heading left, "View all" link right | EN: Header with left heading and right link */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <SectionHeading
              eyebrow="Featured Products"
              title="Community "
              highlight="Favorites"
              description="The best-selling, highest-rated products loved by thousands of athletes."
              align="left"
            />
            <Link
              href="/products"
              className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        {/* TH: Product grid — stagger delay i * 0.06 | EN: Staggered product grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product, i) => (
            /**
             * TH:
             * FadeIn direction="up" delay={i * 0.06}
             * card ที่ 0: delay 0s, card ที่ 1: 0.06s, card ที่ 2: 0.12s ฯลฯ
             * ทำให้การ์ดดูเหมือน "ไหลขึ้นมา" ทีละอัน
             *
             * EN:
             * FadeIn direction="up" with stagger delay per card
             * card 0: 0s, card 1: 0.06s, card 2: 0.12s — creates a cascading effect
             */
            <FadeIn key={product.id} delay={i * 0.06} direction="up">
              <ProductCard
                product={product}
                onQuickView={setSelectedProduct}  // TH: เปิด modal | EN: triggers modal
              />
            </FadeIn>
          ))}
        </div>
      </div>

      {/* TH: ProductModal — render ที่นี่ ใช้กับทุก card | EN: One modal shared across all cards */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
