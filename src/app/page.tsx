/**
 * TH:
 * Home Page — หน้าแรกของ APEX ที่ URL "/"
 * เป็น Server Component (ไม่มี "use client") — render บน server
 * ทำหน้าที่เป็น orchestrator ที่จัดเรียง sections ตามลำดับ
 *
 * Section order:
 * 1. Navbar — navigation bar ด้านบน
 * 2. <main>
 *    a. HeroSection — full-screen hero
 *    b. PromoBanner — perks strip + promo card
 *    c. FeaturedProducts — 8 featured products grid + quick view
 *    d. CategoryGrid — 5 categories
 *    e. BrandShowcase — 5 featured brands
 *    f. CTASection — explore + newsletter
 * 3. Footer
 *
 * หมายเหตุ: Navbar และ Footer อยู่นอก layout.tsx
 * แต่ละหน้า import เอง เพื่อให้มี flexibility ในการ customize ต่อหน้า
 *
 * EN:
 * Home Page — the APEX landing page at URL "/".
 * Server Component — rendered on the server for optimal performance.
 * Acts as an orchestrator that composes sections in order.
 *
 * Section order:
 * 1. Navbar — sticky navigation at the top
 * 2. <main>
 *    a. HeroSection — full-viewport hero with animations
 *    b. PromoBanner — perks strip + violet promotional banner
 *    c. FeaturedProducts — 8 featured product cards + quick view modal
 *    d. CategoryGrid — 5 category navigation cards
 *    e. BrandShowcase — 5 featured brand cards
 *    f. CTASection — explore CTA + newsletter signup
 * 3. Footer
 *
 * Note: Navbar and Footer are NOT in layout.tsx.
 * Each page imports them directly for per-page layout flexibility.
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandShowcase from "@/components/home/BrandShowcase";
import PromoBanner from "@/components/home/PromoBanner";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      {/* TH: Navbar — fixed ด้านบน, transparent → glass on scroll | EN: Fixed navbar — transparent to glass on scroll */}
      <Navbar />

      <main>
        {/* TH: 1. Hero — full-screen, animated, section แรกที่เห็น | EN: 1. Full-screen animated hero */}
        <HeroSection />

        {/* TH: 2. Promo — perks strip + violet sale banner | EN: 2. Perks strip + promotional banner */}
        <PromoBanner />

        {/* TH: 3. Featured products — grid + quick view modal | EN: 3. Featured product grid with quick view */}
        <FeaturedProducts />

        {/* TH: 4. Categories — 5 category navigation cards | EN: 4. Category navigation grid */}
        <CategoryGrid />

        {/* TH: 5. Brands — featured brands showcase | EN: 5. Featured brand showcase */}
        <BrandShowcase />

        {/* TH: 6. CTA — explore + newsletter | EN: 6. Explore + newsletter CTAs */}
        <CTASection />
      </main>

      {/* TH: Footer — site links + social + copyright | EN: Footer with links and copyright */}
      <Footer />
    </>
  );
}
