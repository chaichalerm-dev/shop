"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export default function FlavorSelector({ product }: { product: Product }) {
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavor);
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-7 space-y-5">
      {product.flavors.length > 1 && (
        <div>
          <p className="mb-2.5 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Flavor — <span className="text-violet-400">{selectedFlavor}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFlavor(f)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  selectedFlavor === f
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors text-lg"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-bold text-zinc-100">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors text-lg"
          >
            +
          </button>
        </div>

        <Button
          size="lg"
          className="flex-1 text-base glow-primary"
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
