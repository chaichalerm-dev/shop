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
import { getBrandBySlug, getProductsByBrand, brands } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [selected, setSelected] = useState<Product | null>(null);

  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <nav className="mb-5 flex items-center gap-1.5 text-xs text-zinc-600">
              <Link href="/" className="hover:text-zinc-400">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/brands" className="hover:text-zinc-400">Brands</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-zinc-400">{brand.name}</span>
            </nav>
            <div className="flex flex-wrap items-start gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl font-bold text-zinc-100">{brand.name}</h1>
                  <Badge variant="outline">{brand.country}</Badge>
                  {brand.featured && <Badge variant="default">Featured</Badge>}
                </div>
                <p className="max-w-2xl text-sm text-zinc-500">{brand.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-7 text-sm text-zinc-500">{brandProducts.length} products from {brand.name}</p>
          {brandProducts.length === 0 ? (
            <p className="text-zinc-600">No products found for this brand.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {brandProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setSelected} />
              ))}
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-zinc-800/60">
            <h2 className="mb-5 font-display text-xl font-bold text-zinc-200">Other Brands</h2>
            <div className="flex flex-wrap gap-3">
              {brands.filter((b) => b.slug !== slug).map((b) => (
                <Link key={b.id} href={`/brands/${b.slug}`}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 transition-all">
                  {b.name}
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
