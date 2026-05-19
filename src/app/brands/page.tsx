import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { brands } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Brands" };

export default function BrandsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-100">Brands</h1>
            <p className="mt-2 text-zinc-500">Official products from {brands.length} top global brands</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-7 transition-all hover:border-violet-800/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/20">
                <div className="mb-4 flex items-start justify-between">
                  <Badge variant="outline" className="text-[10px]">{brand.country}</Badge>
                  {brand.featured && <Badge variant="default" className="text-[10px]">Featured</Badge>}
                </div>
                <h2 className="font-display text-2xl font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">{brand.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">{brand.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">{brand.productCount}+ products</span>
                  <ArrowRight className="h-4 w-4 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-violet-400" />
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 ring-1 ring-violet-500/30 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
