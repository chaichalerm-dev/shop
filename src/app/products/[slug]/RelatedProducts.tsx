"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import ProductModal from "@/components/product/ProductModal";
import type { Product } from "@/types";

export default function RelatedProducts({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className="mt-20 pt-12 border-t border-zinc-800/60">
      <h2 className="font-display text-2xl font-bold text-zinc-100 mb-8">
        More from this Category
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setSelected} />
        ))}
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
