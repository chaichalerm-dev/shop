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
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [qty, setQty] = useState(1);

  const open = !!product;
  const activeFlavor = selectedFlavor || product?.flavor || "";
  const discount = product?.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <AnimatePresence>
        {open && product && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950 shadow-2xl outline-none"
                initial={{ opacity: 0, scale: 0.93, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 12 }}
                transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                <Dialog.Title className="sr-only">{product.name}</Dialog.Title>

                {/* Close */}
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>

                <div className="grid sm:grid-cols-2">
                  {/* Image */}
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

                  {/* Details */}
                  <div className="flex flex-col p-6 sm:p-8">
                    {/* Brand & Category */}
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

                    {/* Rating */}
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

                    {/* Price */}
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

                    {/* Meta */}
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

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Flavors */}
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

                    {/* Quantity & CTA */}
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900">
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
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
                      <Button className="flex-1 gap-2" disabled={!product.inStock}>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>

                    {/* View full page */}
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
