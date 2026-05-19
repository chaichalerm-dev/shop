/**
 * TH:
 * ProductCard — Reusable card component สำหรับแสดงสินค้า
 * ใช้ทั่วทั้งโปรเจกต์: FeaturedProducts, products/page.tsx, categories, brands, RelatedProducts
 *
 * โครงสร้าง:
 * 1. Image section: SafeImage + badge overlays + Quick View overlay
 * 2. Info section: brand, name (link), flavor, rating, price, tags
 *
 * State:
 * - hovered: ควบคุม Quick View overlay opacity
 *
 * Props:
 * - product: ข้อมูลสินค้าทั้งหมด
 * - onQuickView: callback เมื่อกด Quick View (optional — ถ้าไม่ส่ง Quick View จะไม่ทำงาน)
 *
 * EN:
 * ProductCard — the universal product display card used across the entire project.
 * Appears in: FeaturedProducts, /products catalog, category pages, brand pages, RelatedProducts.
 *
 * Structure:
 * 1. Image section: SafeImage + badge overlays + Quick View hover overlay
 * 2. Info section: brand label, product name (link), flavor, rating, price, tags
 *
 * State:
 * - hovered: controls Quick View overlay opacity
 *
 * Props:
 * - product: complete product data
 * - onQuickView: optional callback; Quick View button is only functional when provided
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SafeImage from "@/components/common/SafeImage";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;  // TH: optional — caller ส่งมาเมื่อต้องการ modal | EN: optional — callers pass this to enable quick-view modal
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  /**
   * TH:
   * คำนวณ discount percentage จาก originalPrice และ price
   * Math.round เพื่อให้ได้ตัวเลขกลมๆ เช่น 17% ไม่ใช่ 17.5%
   * ถ้าไม่มี originalPrice → discount = null → ไม่แสดง badge
   *
   * EN:
   * Calculate discount percentage from original vs current price.
   * Math.round gives clean integers (17% not 17.5%).
   * If no originalPrice exists, discount is null and no badge is rendered.
   */
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    /**
     * TH:
     * motion.div ด้วย whileHover={{ y: -4 }} — ยกการ์ดขึ้น 4px เมื่อ hover
     * onMouseEnter/Leave ควบคุม hovered state สำหรับ Quick View overlay
     *
     * EN:
     * motion.div with whileHover — lifts the card 4px on hover for depth effect.
     * onMouseEnter/Leave controls the hovered state for the Quick View overlay.
     */
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 transition-all duration-300 hover:border-zinc-700/60 hover:shadow-xl hover:shadow-black/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* TH: Image container — aspect-square ให้ภาพเป็น square เสมอ | EN: Square image container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800/40">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"  // TH: responsive sizes สำหรับ network optimization | EN: responsive image size hints
          className="object-cover transition-transform duration-500 group-hover:scale-105"  // TH: zoom เล็กน้อยเมื่อ hover | EN: subtle zoom on hover
          containerClassName="absolute inset-0"
        />

        {/* TH: Badge overlays — top-left ของ image | EN: Badge overlays — top-left of image */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {/* TH: Product badge เช่น "Best Seller", "Premium" | EN: Product badge e.g. "Best Seller" */}
          {product.badge && (
            <Badge variant="default" className="text-[10px]">
              {product.badge}
            </Badge>
          )}
          {/* TH: Discount badge เช่น "-17%" | EN: Discount badge e.g. "-17%" */}
          {discount && (
            <Badge variant="accent" className="text-[10px]">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* TH: Quick View overlay — แสดงเมื่อ hover บน image | EN: Quick View overlay — appears on image hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            size="sm"
            variant="glass"
            className="gap-2"
            onClick={() => onQuickView?.(product)}  // TH: optional chaining — ไม่ crash ถ้า onQuickView ไม่ได้ส่งมา | EN: optional chaining — safe if onQuickView not provided
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </Button>
        </motion.div>
      </div>

      {/* TH: Product info section | EN: Product information section */}
      <div className="flex flex-1 flex-col p-4">
        {/* TH: Brand label — uppercase, violet | EN: Brand label — uppercase, violet */}
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">
            {product.brand}
          </span>
        </div>

        {/* TH: Product name — link ไปยัง detail page | EN: Product name — links to detail page */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-sm font-bold leading-snug text-zinc-100 hover:text-violet-300 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* TH: Flavor | EN: Default flavor */}
        <p className="mt-1 text-[11px] text-zinc-600 line-clamp-1">
          {product.flavor}
        </p>

        {/* TH: Rating — star icon + score + review count | EN: Rating row */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-zinc-300">{product.rating}</span>
          <span className="text-xs text-zinc-600">({product.reviews.toLocaleString()})</span>
        </div>

        {/* TH: Price row — current price + strikethrough original + out-of-stock label | EN: Price row */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-zinc-100">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="text-[10px] font-medium text-red-400">Out of Stock</span>
          )}
        </div>

        {/* TH: Tags — แสดงสูงสุด 3 tags | EN: Tags — shows up to 3 tags */}
        {product.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[10px] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
