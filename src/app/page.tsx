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
      <Navbar />
      <main>
        <HeroSection />
        <PromoBanner />
        <FeaturedProducts />
        <CategoryGrid />
        <BrandShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
