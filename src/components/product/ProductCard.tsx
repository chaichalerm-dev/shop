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
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 transition-all duration-300 hover:border-zinc-700/60 hover:shadow-xl hover:shadow-black/40"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800/40">
        <SafeImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          containerClassName="absolute inset-0"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge variant="default" className="text-[10px]">
              {product.badge}
            </Badge>
          )}
          {discount && (
            <Badge variant="accent" className="text-[10px]">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Quick View overlay */}
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
            onClick={() => onQuickView?.(product)}
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </Button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-violet-400">
            {product.brand}
          </span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-sm font-bold leading-snug text-zinc-100 hover:text-violet-300 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-[11px] text-zinc-600 line-clamp-1">
          {product.flavor}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-zinc-300">{product.rating}</span>
          <span className="text-xs text-zinc-600">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
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

        {/* Tags */}
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
