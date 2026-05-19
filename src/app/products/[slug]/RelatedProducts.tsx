/**
 * TH:
 * RelatedProducts — Client Component แสดงสินค้าที่เกี่ยวข้องในหมวดเดียวกัน
 * อยู่ที่ด้านล่างของ Product Detail page
 * เป็น Client Component เพราะต้องการ useState สำหรับ ProductModal
 *
 * Data: รับ products array จาก Server Component parent (products/[slug]/page.tsx)
 * ซึ่ง filter + slice ข้อมูลมาแล้ว (สูงสุด 4 สินค้า, ไม่รวม current product)
 *
 * EN:
 * RelatedProducts — Client Component displaying products from the same category.
 * Placed at the bottom of the Product Detail page.
 * Must be a Client Component because it manages ProductModal state.
 *
 * Data: receives a pre-filtered products array from the Server Component parent.
 * Parent already filtered (same category, excluding current, max 4).
 */

"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import ProductModal from "@/components/product/ProductModal";
import type { Product } from "@/types";

export default function RelatedProducts({ products }: { products: Product[] }) {
  /**
   * TH:
   * selected — สินค้าที่ user click Quick View
   * null = modal ปิด, Product object = modal เปิด
   *
   * EN:
   * selected — the product whose Quick View was triggered.
   * null = modal closed, Product object = modal open.
   */
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className="mt-20 pt-12 border-t border-zinc-800/60">
      <h2 className="font-display text-2xl font-bold text-zinc-100 mb-8">
        More from this Category
      </h2>

      {/* TH: 2 columns mobile, 4 columns sm+ | EN: 2 columns mobile, 4 columns tablet+ */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setSelected} />
        ))}
      </div>

      {/* TH: Modal สำหรับ quick view ของ related products | EN: Quick View modal for related products */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
