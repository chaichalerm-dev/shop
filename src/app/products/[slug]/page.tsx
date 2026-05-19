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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

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
  if (!product) notFound();

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
        {/* Breadcrumb */}
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
              <span className="text-zinc-400 truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-zinc-800/60 bg-zinc-900">
              <SafeImage
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                containerClassName="absolute inset-0"
                priority
              />
              {product.badge && (
                <Badge variant="default" className="absolute left-5 top-5 text-sm px-3 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
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

              {/* Rating */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-700"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-zinc-200">{product.rating}</span>
                <span className="text-sm text-zinc-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-zinc-100">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-zinc-600 line-through">{formatPrice(product.originalPrice)}</span>
                    {discount && <Badge variant="accent" className="text-sm px-2.5 py-1">-{discount}%</Badge>}
                  </>
                )}
              </div>

              {/* Meta */}
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

              <p className="mt-6 text-base leading-relaxed text-zinc-400">
                {product.description}
              </p>

              {/* Flavor selector — client component */}
              <FlavorSelector product={product} />

              {/* Tags */}
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

          {/* Related Products */}
          {related.length > 0 && <RelatedProducts products={related} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
