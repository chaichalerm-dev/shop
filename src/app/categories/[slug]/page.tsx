/**
 * TH:
 * Category Detail Page — หน้าแสดงสินค้าทั้งหมดในหมวดหมู่เดียว (/categories/[slug])
 * เป็น Client Component เพราะต้องการ useState สำหรับ ProductModal
 * ใช้ React.use() เพื่อ unwrap params Promise (Next.js >=15 pattern)
 *
 * Logic:
 * 1. Unwrap slug จาก params
 * 2. ค้นหา category จาก slug
 * 3. ถ้าไม่พบ → notFound() → render 404 page
 * 4. ดึงสินค้าทั้งหมดในหมวดนี้
 * 5. แสดง product grid + "Other Categories" section ด้านล่าง
 *
 * หมายเหตุ: Client Component ใช้ notFound() ได้ แต่ Next.js จะ render 404 component
 * การใช้ generateStaticParams ใน client pages ไม่ทำงาน — route เป็น dynamic
 *
 * EN:
 * Category Detail Page — displays all products in a single category (/categories/[slug]).
 * Client Component because it needs useState for the ProductModal.
 * Uses React.use() to unwrap the params Promise (Next.js >=15 pattern).
 *
 * Logic:
 * 1. Unwrap slug from params Promise using React.use()
 * 2. Look up category by slug
 * 3. If not found → notFound() → renders 404 page
 * 4. Fetch all products in this category
 * 5. Render product grid + "Other Categories" section
 *
 * Note: Client Components can call notFound() but cannot use generateStaticParams.
 * This route is dynamic — each category page is rendered on-demand.
 */

"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ProductModal from "@/components/product/ProductModal";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/lib/data";
import type { Product } from "@/types";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  /**
   * TH:
   * React.use() — unwrap Promise synchronously ใน Client Components
   * ใช้แทน await (ซึ่งใช้ได้แค่ใน Server Components)
   * Next.js >=15 ทำให้ params เป็น Promise — ต้อง unwrap ก่อนใช้
   *
   * EN:
   * React.use() — synchronously unwraps a Promise in Client Components.
   * Alternative to await (which is only available in Server Components).
   * Next.js >=15 wraps params in a Promise — must unwrap before use.
   */
  const { slug } = use(params);
  const [selected, setSelected] = useState<Product | null>(null);

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">

        {/* TH: Page header — breadcrumb + category info | EN: Page header with breadcrumb */}
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* TH: Breadcrumb | EN: Breadcrumb */}
            <nav className="mb-4 flex items-center gap-1.5 text-xs text-zinc-600">
              <Link href="/" className="hover:text-zinc-400">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/categories" className="hover:text-zinc-400">Categories</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-zinc-400">{category.name}</span>
            </nav>

            {/* TH: Category icon + name + description | EN: Category identity row */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: `${category.color}20` }}>
                {category.icon}
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-zinc-100">{category.name}</h1>
                <p className="mt-1 text-sm text-zinc-500">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* TH: Empty state หรือ product grid | EN: Empty state or product grid */}
          {categoryProducts.length === 0 ? (
            <p className="text-zinc-500">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setSelected} />
              ))}
            </div>
          )}

          {/* TH: Other categories — link chips สำหรับ navigate ข้าม categories | EN: Other categories — quick navigation chips */}
          <div className="mt-20 pt-10 border-t border-zinc-800/60">
            <h2 className="mb-6 font-display text-xl font-bold text-zinc-200">Other Categories</h2>
            <div className="flex flex-wrap gap-3">
              {/* TH: filter ออก current category | EN: exclude current category */}
              {categories.filter((c) => c.slug !== slug).map((c) => (
                <Link key={c.id} href={`/categories/${c.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-all">
                  <span>{c.icon}</span>{c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* TH: ProductModal สำหรับ quick view | EN: Quick View modal */}
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
