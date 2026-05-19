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
  const { slug } = use(params);
  const [selected, setSelected] = useState<Product | null>(null);

  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-1.5 text-xs text-zinc-600">
              <Link href="/" className="hover:text-zinc-400">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/categories" className="hover:text-zinc-400">Categories</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-zinc-400">{category.name}</span>
            </nav>
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
          {categoryProducts.length === 0 ? (
            <p className="text-zinc-500">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setSelected} />
              ))}
            </div>
          )}

          {/* Other categories */}
          <div className="mt-20 pt-10 border-t border-zinc-800/60">
            <h2 className="mb-6 font-display text-xl font-bold text-zinc-200">Other Categories</h2>
            <div className="flex flex-wrap gap-3">
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
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}
