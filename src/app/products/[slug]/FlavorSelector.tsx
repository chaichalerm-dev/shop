/**
 * TH:
 * FlavorSelector — Client Component สำหรับเลือก flavor และจำนวน บนหน้า Product Detail
 * เป็น Client Component เพราะต้องการ useState สำหรับ selectedFlavor และ qty
 * Embedded ใน Server Component (products/[slug]/page.tsx) — "client island" pattern
 *
 * วิธีการทำงาน:
 * - แสดง flavor buttons เฉพาะสินค้าที่มีมากกว่า 1 flavor
 * - เริ่มต้น selectedFlavor = product.flavor (default flavor)
 * - แสดง quantity stepper (minimum 1)
 * - Add to Cart button — disabled เมื่อ out of stock
 *
 * EN:
 * FlavorSelector — Client Component for choosing flavor and quantity on the Product Detail page.
 * Must be a Client Component because it manages selectedFlavor and qty state.
 * Embedded inside a Server Component (products/[slug]/page.tsx) — "client island" pattern.
 *
 * How it works:
 * - Flavor buttons only shown for products with more than 1 flavor
 * - Initial selected flavor = product.flavor (the default)
 * - Quantity stepper with minimum 1
 * - Add to Cart button — disabled when product is out of stock
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export default function FlavorSelector({ product }: { product: Product }) {
  /**
   * TH:
   * selectedFlavor — flavor ที่ user เลือก
   * เริ่มต้นด้วย product.flavor (default/featured flavor ของสินค้า)
   *
   * EN:
   * selectedFlavor — the flavor the user has selected.
   * Initialized to product.flavor (the product's default/featured flavor).
   */
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavor);

  /**
   * TH:
   * qty — จำนวนสินค้าที่ต้องการ
   * Math.max(1, q - 1) ป้องกันไม่ให้ qty ต่ำกว่า 1
   *
   * EN:
   * qty — quantity the user wants to purchase.
   * Math.max(1, q - 1) prevents qty from going below 1.
   */
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-7 space-y-5">

      {/* TH: Flavor buttons — แสดงเฉพาะสินค้าที่มีมากกว่า 1 flavor | EN: Flavor buttons — only for multi-flavor products */}
      {product.flavors.length > 1 && (
        <div>
          {/* TH: Label แสดง selected flavor แบบ real-time | EN: Label shows selected flavor in real-time */}
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
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"  // TH: active flavor | EN: active state
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"  // TH: inactive | EN: inactive state
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TH: Quantity stepper + Add to Cart button | EN: Quantity + CTA row */}
      <div className="flex items-center gap-3 pt-2">
        {/* TH: Quantity stepper — − [qty] + | EN: Quantity stepper */}
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

        {/* TH: Add to Cart — glow-primary + disabled ถ้า out of stock | EN: Add to Cart with glow effect */}
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
