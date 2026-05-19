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

interface FilterState {
  category: string;
  brand: string;
  search: string;
}

const defaultFilters: FilterState = { category: "", brand: "", search: "" };

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleFilterChange(key: keyof FilterState, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters(defaultFilters);
  }

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
        {/* Header */}
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-zinc-500">
              {products.length} products from top global brands
            </p>

            {/* Search bar */}
            <div className="relative mt-6 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search products, brands, flavors…"
                className="pl-10 pr-10"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
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

        {/* Body */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters sidebar */}
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filtered.length}
            />

            {/* Products grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
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
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
