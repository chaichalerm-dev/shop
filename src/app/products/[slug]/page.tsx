/**
 * TH:
 * Product Detail Page — หน้ารายละเอียดสินค้าแต่ละชิ้น
 * เป็น Server Component (ไม่มี "use client") — render บน server
 *
 * Rendering Strategy: Static Site Generation (SSG)
 * - generateStaticParams() บอก Next.js ให้ pre-render 20 product pages ตอน build time
 * - แต่ละ page จะถูก generate เป็น static HTML ที่ fast และ SEO-friendly
 *
 * Architecture Pattern: Hybrid (Server + Client)
 * - Page component เอง: Server Component (ดึง data, render static content)
 * - FlavorSelector: Client Component (interactive state)
 * - RelatedProducts: Client Component (ProductModal state)
 *
 * SEO:
 * - generateMetadata() สร้าง metadata เฉพาะสำหรับแต่ละสินค้า
 * - title จะ populate title template: "Ghost Legend | APEX"
 * - OpenGraph image ใช้ product image
 *
 * EN:
 * Product Detail Page — individual product detail page.
 * Server Component — rendered on the server for performance and SEO.
 *
 * Rendering Strategy: Static Site Generation (SSG)
 * - generateStaticParams() tells Next.js to pre-render all 20 product pages at build time
 * - Each page is a static HTML file — fast load, excellent SEO
 *
 * Architecture Pattern: Hybrid (Server + Client)
 * - Page component: Server Component (data fetching, static layout)
 * - FlavorSelector: Client Component (interactive flavor + quantity state)
 * - RelatedProducts: Client Component (ProductModal state)
 *
 * SEO:
 * - generateMetadata() generates per-product metadata
 * - title populates the root layout template: "Ghost Legend | APEX"
 * - OpenGraph image uses the product's image URL
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Star, Package, Layers, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SafeImage from "@/components/common/SafeImage";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, products, getProductsByCategory } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import FlavorSelector from "./FlavorSelector";
import RelatedProducts from "./RelatedProducts";

/**
 * TH:
 * PageProps — Next.js >=15 ทำให้ params เป็น Promise
 * ต้อง await params ก่อนใช้ slug
 *
 * EN:
 * PageProps — Next.js >=15 makes params a Promise.
 * Must await params before accessing slug.
 */
interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * TH:
 * generateStaticParams — บอก Next.js ให้สร้าง static pages สำหรับทุก product slug
 * return array ของ { slug: string } objects
 * Next.js จะ call หน้านี้ 20 ครั้ง (หนึ่งครั้งต่อ slug) ตอน build
 *
 * EN:
 * generateStaticParams — instructs Next.js which slugs to pre-render at build time.
 * Returns one { slug } object per product — Next.js calls this page 20 times.
 */
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/**
 * TH:
 * generateMetadata — สร้าง SEO metadata เฉพาะสำหรับแต่ละ product page
 * Next.js จะ merge กับ root metadata จาก layout.tsx
 * title: "Ghost Legend" → template: "Ghost Legend | APEX"
 *
 * EN:
 * generateMetadata — generates per-product SEO metadata.
 * Next.js merges this with the root metadata from layout.tsx.
 * title: "Ghost Legend" + template "%s | APEX" → "Ghost Legend | APEX"
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  /**
   * TH:
   * notFound() — trigger Next.js 404 page เมื่อ product ไม่มีอยู่
   * จะไม่เกิดขึ้นในทางปฏิบัติเพราะ generateStaticParams ครอบทุก slug
   * แต่เป็น defensive programming ที่ดี
   *
   * EN:
   * notFound() — renders the Next.js 404 page if slug has no matching product.
   * In practice this won't happen since generateStaticParams covers all slugs.
   * But it's good defensive programming for when data changes.
   */
  if (!product) notFound();

  /**
   * TH:
   * related — สินค้าอื่นในหมวดเดียวกัน ไม่รวม product ปัจจุบัน
   * slice(0, 4) — แสดงสูงสุด 4 สินค้า
   *
   * EN:
   * related — other products in the same category, excluding current product.
   * slice(0, 4) — maximum 4 related products displayed.
   */
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">

        {/* TH: Breadcrumb navigation — Home > Products > Category > Product | EN: Breadcrumb navigation */}
        <div className="border-b border-zinc-800/60 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-zinc-600">
              <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/products" className="hover:text-zinc-400 transition-colors">Products</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/categories/${product.categorySlug}`} className="hover:text-zinc-400 transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="h-3 w-3" />
              {/* TH: truncate max-w-xs ป้องกัน overflow บน mobile | EN: truncated product name prevents overflow */}
              <span className="text-zinc-400 truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* TH: Main product section — image | info grid | EN: Main product section — 2-column grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* TH: Product image — square, rounded, priority loading | EN: Product image — square container, priority load */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                containerClassName="absolute inset-0"
                priority  // TH: LCP image — โหลดก่อนเสมอ | EN: LCP image — preloaded for performance
              />
              {product.badge && (
                <Badge variant="default" className="absolute left-5 top-5 text-sm px-3 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* TH: Product info column | EN: Product info column */}
            <div className="flex flex-col">

              {/* TH: Brand / Category breadcrumb (text) | EN: Brand / Category inline breadcrumb */}
              <div className="flex items-center gap-2 mb-3">
                <Link href={`/brands/${product.brandSlug}`} className="text-xs font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300">
                  {product.brand}
                </Link>
                <span className="text-zinc-700">/</span>
                <Link href={`/categories/${product.categorySlug}`} className="text-xs text-zinc-500 hover:text-zinc-400">
                  {product.category}
                </Link>
              </div>

              <h1 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
                {product.name}
              </h1>

              {/* TH: Star rating row | EN: Star rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-200">{product.rating}</span>
                <span className="text-sm text-zinc-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* TH: Price section — large price + strikethrough + discount badge | EN: Price section */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-zinc-100">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-zinc-600 line-through">{formatPrice(product.originalPrice)}</span>
                    {discount && <Badge variant="accent" className="text-sm px-2.5 py-1">-{discount}%</Badge>}
                  </>
                )}
              </div>

              {/* TH: Meta info — servings + weight | EN: Product meta — servings and weight */}
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-500">
                {product.servings && (
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-zinc-600" />
                    {product.servings} servings
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center gap-1.5">
                    <Package className="h-4 w-4 text-zinc-600" />
                    {product.weight}
                  </div>
                )}
              </div>

              {/* TH: Full description | EN: Full product description */}
              <p className="mt-6 text-base leading-relaxed text-zinc-400">
                {product.description}
              </p>

              {/**
               * TH:
               * FlavorSelector — Client Component ที่ embedded ใน Server Component
               * รับ product ทั้ง object เพราะต้องการ flavors array และ inStock flag
               * Client Component boundary: interactive state ถูก isolate ไว้ใน FlavorSelector
               *
               * EN:
               * FlavorSelector — Client Component embedded inside this Server Component.
               * Receives the full product object for flavors and inStock.
               * This is the "client component island" pattern — interactivity is isolated.
               */}
              <FlavorSelector product={product} />

              {/* TH: Tags | EN: Product tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-lg bg-zinc-800/60 px-3 py-1 text-xs text-zinc-400">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TH: Related Products section — แสดงถ้ามีสินค้าที่เกี่ยวข้อง | EN: Related products — renders only if related products exist */}
          {related.length > 0 && <RelatedProducts products={related} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
