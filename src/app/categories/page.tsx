import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { categories } from "@/lib/data";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-zinc-100">Categories</h1>
            <p className="mt-2 text-zinc-500">Browse supplements by category</p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-8 transition-all hover:border-zinc-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <h2 className="font-display text-2xl font-bold text-zinc-100 group-hover:text-violet-300 transition-colors">{cat.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{cat.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">{cat.productCount}+ products</span>
                  <ArrowRight className="h-4 w-4 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-violet-400" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
