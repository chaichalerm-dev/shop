/**
 * TH:
 * ProductModal — Quick View modal สำหรับดูรายละเอียดสินค้าโดยไม่ต้องเข้าหน้าใหม่
 * ใช้ Radix UI Dialog เป็น accessible modal primitive
 * ใช้ Framer Motion สำหรับ enter/exit animations
 *
 * เปิดได้จาก: FeaturedProducts, Products catalog, Category pages, Brand pages, RelatedProducts
 * ปิดได้ด้วย: ปุ่ม X, กด backdrop, กด Escape key (Radix UI จัดการอัตโนมัติ)
 *
 * Content:
 * - Left panel: product image + badge
 * - Right panel: brand/category links, name, rating, price, meta, description, flavor selector, quantity, CTA
 *
 * EN:
 * ProductModal — quick-view modal for inspecting product details without leaving the page.
 * Built on Radix UI Dialog (accessibility: focus trap, aria-* attributes, Escape key).
 * Framer Motion handles the enter/exit animations.
 *
 * Opened from: FeaturedProducts, Products catalog, Category pages, Brand pages, RelatedProducts
 * Closed by: X button, backdrop click, Escape key (Radix UI handles all three)
 *
 * Layout:
 * - Left panel: product image + badge overlay
 * - Right panel: breadcrumb, name, rating, price, meta, description, flavor selector, qty, CTA
 */

"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Package, Layers, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SafeImage from "@/components/common/SafeImage";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductModalProps {
  product: Product | null;   // TH: null = modal ปิด | EN: null = modal is closed
  onClose: () => void;       // TH: callback เมื่อต้องการปิด | EN: callback to close the modal
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [qty, setQty] = useState(1);

  /**
   * TH:
   * open — derived state จาก product prop
   * ถ้า product มีค่า (ไม่ใช่ null) → modal เปิด
   * !!product แปลง Product object เป็น boolean (truthy/falsy)
   *
   * EN:
   * open — derived from the product prop.
   * Non-null product → modal open. !!product converts object to boolean.
   */
  const open = !!product;

  /**
   * TH:
   * activeFlavor — ใช้ selectedFlavor ถ้าผู้ใช้เลือกแล้ว
   * ถ้ายังไม่เลือก → ใช้ product.flavor (default flavor)
   *
   * EN:
   * activeFlavor — the currently selected flavor.
   * Falls back to product.flavor (the default) if user hasn't selected yet.
   */
  const activeFlavor = selectedFlavor || product?.flavor || "";

  const discount = product?.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    /**
     * TH:
     * Dialog.Root — Radix UI Dialog root
     * open: ควบคุมด้วย product state
     * onOpenChange: เมื่อ Dialog ต้องการปิด (Escape, backdrop) → call onClose
     * !v && onClose() → ปิดเฉพาะเมื่อ v = false (ไม่ใช่เมื่อ open)
     *
     * EN:
     * Dialog.Root — Radix UI Dialog root component.
     * open: controlled by product state
     * onOpenChange: fires when Dialog wants to close → calls onClose
     * !v && onClose() → only closes, never re-opens through this handler
     */
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && product && (
          /**
           * TH:
           * Dialog.Portal forceMount — render portal แม้ว่า open=false
           * ต้องใช้ forceMount เมื่อต้องการ exit animations กับ AnimatePresence
           *
           * EN:
           * Dialog.Portal forceMount — renders the portal even when closed.
           * Required to allow AnimatePresence to run exit animations.
           */
          <Dialog.Portal forceMount>
            {/* TH: Backdrop — animate opacity | EN: Animated backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            {/* TH: Modal panel — centered, scale + slide animation | EN: Centered modal panel */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950 shadow-2xl outline-none"
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 12 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                {/* TH: sr-only title สำหรับ screen readers | EN: Visually hidden title for screen readers */}
                <Dialog.Title className="sr-only">{product.name}</Dialog.Title>

                {/* TH: Close button — top-right corner | EN: Close button */}
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>

                {/* TH: Grid layout — image | details (responsive: stack mobile, side-by-side sm+) */}
                {/* EN: Two-column grid — image left, details right */}
                <div className="grid sm:grid-cols-2">

                  {/* TH: Left panel — product image | EN: Left panel — product image */}
                  <div className="relative bg-zinc-900 aspect-square sm:aspect-auto">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                      containerClassName="absolute inset-0"
                    />
                    {product.badge && (
                      <Badge variant="default" className="absolute left-4 top-4">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  {/* TH: Right panel — product details | EN: Right panel — product details */}
                  <div className="flex flex-col p-6 sm:p-8">

                    {/* TH: Brand → Category breadcrumb | EN: Brand/Category mini-breadcrumb */}
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        href={`/brands/${product.brandSlug}`}
                        className="text-xs font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300"
                      >
                        {product.brand}
                      </Link>
                      <ChevronRight className="h-3 w-3 text-zinc-700" />
                      <Link
                        href={`/categories/${product.categorySlug}`}
                        className="text-xs text-zinc-500 hover:text-zinc-400"
                      >
                        {product.category}
                      </Link>
                    </div>

                    <h2 className="font-display text-2xl font-bold leading-tight text-zinc-100">
                      {product.name}
                    </h2>

                    {/* TH: Star rating — filled stars ตามจำนวน floor(rating) | EN: Star rating — filled up to floor(rating) */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-zinc-300">{product.rating}</span>
                      <span className="text-xs text-zinc-600">({product.reviews.toLocaleString()} reviews)</span>
                    </div>

                    {/* TH: Price + original + discount badge | EN: Price with optional strikethrough and discount badge */}
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-zinc-100">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-base text-zinc-600 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                          {discount && (
                            <Badge variant="accent">-{discount}%</Badge>
                          )}
                        </>
                      )}
                    </div>

                    {/* TH: Meta — servings และ weight | EN: Product metadata — servings and weight */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
                      {product.servings && (
                        <div className="flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5" />
                          {product.servings} servings
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          {product.weight}
                        </div>
                      )}
                    </div>

                    {/* TH: Description — clamp 3 บรรทัด | EN: Description — 3-line clamp */}
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                      {product.description}
                    </p>

                    {/* TH: Flavor selector — แสดงเฉพาะสินค้าที่มีมากกว่า 1 flavor | EN: Flavor selector — only rendered for multi-flavor products */}
                    {product.flavors.length > 1 && (
                      <div className="mt-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          Flavor
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {product.flavors.map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setSelectedFlavor(f)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                activeFlavor === f
                                  ? "bg-violet-600 text-white"
                                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TH: Quantity selector + Add to Cart button | EN: Quantity stepper + Add to Cart */}
                    <div className="mt-6 flex items-center gap-3">
                      {/* TH: Quantity stepper — min 1 | EN: Quantity stepper — minimum 1 */}
                      <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}  // TH: ไม่ต่ำกว่า 1 | EN: floor at 1
                          className="flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-zinc-100">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty((q) => q + 1)}
                          className="flex h-10 w-10 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      {/* TH: Add to Cart — disabled เมื่อ out of stock | EN: Add to Cart — disabled when out of stock */}
                      <Button className="flex-1 gap-2" disabled={!product.inStock}>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>

                    {/* TH: Link ไปหน้า detail เต็ม | EN: Link to full product detail page */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      View full product page <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
