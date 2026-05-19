/**
 * TH:
 * Products Page — หน้าแสดงสินค้าทั้งหมดพร้อมระบบ filter
 * เป็น Client Component เพราะต้องการ:
 * 1. useState สำหรับ filter state และ selected product (modal)
 * 2. useMemo สำหรับ compute filtered products อย่างมีประสิทธิภาพ
 * 3. onChange event handlers สำหรับ search input และ filter buttons
 *
 * Features:
 * - Search bar: ค้นหาด้วยชื่อ, แบรนด์, category, flavor, หรือ tags
 * - Category filter: กรองตาม category slug
 * - Brand filter: กรองตาม brand slug
 * - Quick View modal: click สินค้าเพื่อดูรายละเอียดใน popup
 * - Empty state: แสดง UI ที่ดีเมื่อไม่พบสินค้า
 *
 * Data flow:
 * products (ทั้งหมด) → filter (useMemo) → filtered → ProductCard[]
 *
 * EN:
 * Products Page — the full catalog page with real-time client-side filtering.
 * Must be a Client Component because it uses:
 * 1. useState for filter state and selected product (modal trigger)
 * 2. useMemo for efficient filtered product computation
 * 3. onChange/onClick handlers for search and filter buttons
 *
 * Features:
 * - Search bar: matches against name, brand, category, flavor, and tags
 * - Category filter: filters by categorySlug
 * - Brand filter: filters by brandSlug
 * - Quick View modal: opens ProductModal on product click
 * - Empty state: helpful UI when no products match
 *
 * Data flow:
 * products (all) → useMemo filter → filtered array → ProductCard grid
 */

"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import ProductModal from "@/components/product/ProductModal";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import type { Product } from "@/types";

/**
 * TH:
 * FilterState — local type สำหรับหน้านี้
 * category, brand, search เป็น filter ที่ active ใน UI
 * string เปล่า "" = "ไม่ filter" (แสดงทั้งหมด)
 *
 * EN:
 * FilterState — filter shape for this page.
 * Empty string "" means "no filter" (show all).
 */
interface FilterState {
  category: string;
  brand: string;
  search: string;
}

const defaultFilters: FilterState = { category: "", brand: "", search: "" };

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /**
   * TH:
   * handleFilterChange — อัพเดต filter field เดียวโดยไม่ affect fields อื่น
   * ใช้ spread operator เพื่อ merge ค่าใหม่เข้ากับ state เดิม
   *
   * EN:
   * handleFilterChange — updates a single filter field without affecting others.
   * Spread operator merges the new value into the existing state.
   */
  function handleFilterChange(key: keyof FilterState, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters(defaultFilters);
  }

  /**
   * TH:
   * filtered — computed list ของสินค้าที่ match filters ทั้งหมด
   * ใช้ useMemo เพื่อ cache ผลลัพธ์ — จะ recompute เฉพาะเมื่อ filters เปลี่ยน
   * ถ้าไม่ใช้ useMemo จะ recompute ทุก render แม้ว่าจะไม่จำเป็น
   *
   * Filter logic:
   * 1. category filter — exact match บน categorySlug
   * 2. brand filter — exact match บน brandSlug
   * 3. search — case-insensitive match บน name/brand/category/flavor/tags
   * Filter ทุกตัว apply พร้อมกัน (AND logic)
   *
   * EN:
   * filtered — memoized list of products matching all active filters.
   * useMemo caches the result — only recomputes when filters change.
   * Without useMemo, it would recompute on every render (unnecessary work).
   *
   * Filter logic:
   * 1. category — exact categorySlug match
   * 2. brand — exact brandSlug match
   * 3. search — case-insensitive substring match across multiple fields
   * All filters apply simultaneously (AND logic).
   */
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.category && p.categorySlug !== filters.category) return false;
      if (filters.brand && p.brandSlug !== filters.brand) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.flavor.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [filters]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">

        {/* TH: Page header — title + product count + search bar | EN: Page header section */}
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-zinc-500">
              {products.length} products from top global brands
            </p>

            {/* TH: Search bar — icon left + clear button right | EN: Search bar with icon and clear button */}
            <div className="relative mt-6 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search products, brands, flavors…"
                className="pl-10 pr-10"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              {/* TH: Clear button — แสดงเฉพาะเมื่อมีข้อความ | EN: Clear button — only when search has text */}
              {filters.search && (
                <button
                  type="button"
                  onClick={() => handleFilterChange("search", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TH: Main body — sidebar filters + products grid | EN: Main content — sidebar + grid */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">

            {/* TH: Filters sidebar — w-full mobile, w-60 desktop | EN: Filter sidebar — full width on mobile, fixed 60 on desktop */}
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filtered.length}
            />

            {/* TH: Products grid — flex-1 ขยายเต็มพื้นที่ที่เหลือ | EN: Products grid — takes remaining space */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                /* TH: Empty state — user-friendly message เมื่อไม่พบสินค้า | EN: Empty state */
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-2xl">🔍</p>
                  <p className="mt-3 text-lg font-semibold text-zinc-300">
                    No products found
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Try adjusting your filters or search query.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 text-sm text-violet-400 hover:text-violet-300 underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                /* TH: Product grid — responsive: 2 → 3 → 4 columns | EN: Responsive product grid */
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}  // TH: trigger modal | EN: opens modal
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* TH: ProductModal — render outside main สำหรับ stacking context | EN: Modal outside main for correct stacking */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
