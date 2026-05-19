/**
 * TH:
 * data.ts — ชั้นข้อมูลของโปรเจกต์ APEX
 * ไฟล์นี้เป็น "database" แบบ static สำหรับ prototype/showcase
 * ประกอบด้วย:
 * - categories[] — 5 หมวดหมู่สินค้า
 * - brands[] — 6 แบรนด์
 * - products[] — 20 สินค้าพร้อมข้อมูลครบถ้วน
 * - Query functions — สำหรับ filter/find ข้อมูล
 *
 * การ scale ไปสู่ production:
 * แทนที่ query functions ด้วย API calls หรือ ORM queries
 * interface ของ functions ยังคงเดิม — pages ไม่ต้องแก้ไข
 *
 * Images: ใช้ picsum.photos/seed/<name>/<w>/<h>
 * Seeded URLs ให้ภาพสม่ำเสมอและไม่มี 404
 *
 * EN:
 * data.ts — the data layer for the APEX project.
 * This file acts as a static "database" for the prototype/showcase.
 * Contains:
 * - categories[] — 5 product categories
 * - brands[] — 6 supplement brands
 * - products[] — 20 fully-populated products
 * - Query functions — for filtering and looking up data
 *
 * Scaling to production:
 * Replace query function bodies with API calls or ORM queries.
 * Function signatures stay the same — pages need no changes.
 *
 * Images: picsum.photos/seed/<name>/<w>/<h>
 * Seeded URLs always return the same image and never 404.
 */

import type { Product, Category, Brand } from "@/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Pre-Workout",
    slug: "pre-workout",
    description: "Maximum energy, focus, and pump formulas to power your hardest sessions.",
    image: "https://picsum.photos/seed/preworkout/800/600",
    icon: "⚡",
    productCount: 12,
    color: "#7c3aed",
  },
  {
    id: "cat-2",
    name: "Protein",
    slug: "protein",
    description: "Premium whey, casein, and plant-based proteins for recovery and growth.",
    image: "https://picsum.photos/seed/protein/800/600",
    icon: "💪",
    productCount: 18,
    color: "#2563eb",
  },
  {
    id: "cat-3",
    name: "Amino Acids",
    slug: "amino-acids",
    description: "EAAs, BCAAs, and glutamine to accelerate recovery and reduce soreness.",
    image: "https://picsum.photos/seed/amino/800/600",
    icon: "🔬",
    productCount: 9,
    color: "#059669",
  },
  {
    id: "cat-4",
    name: "Vitamins & Health",
    slug: "vitamins-health",
    description: "Daily essentials, greens, omegas, and adaptogens for total wellness.",
    image: "https://picsum.photos/seed/vitamins/800/600",
    icon: "🌿",
    productCount: 14,
    color: "#16a34a",
  },
  {
    id: "cat-5",
    name: "Energy Drinks",
    slug: "energy-drinks",
    description: "Zero-sugar, high-performance energy drinks for all-day focus.",
    image: "https://picsum.photos/seed/energy/800/600",
    icon: "🥤",
    productCount: 8,
    color: "#dc2626",
  },
];

export const brands: Brand[] = [
  {
    id: "brand-1",
    name: "Ghost",
    slug: "ghost",
    description: "The lifestyle sports nutrition brand with legendary transparency and bold flavors.",
    logo: "https://picsum.photos/seed/ghost-logo/200/80",
    image: "https://picsum.photos/seed/ghost/600/400",
    productCount: 11,
    country: "USA",
    featured: true,
  },
  {
    id: "brand-2",
    name: "Optimum Nutrition",
    slug: "optimum-nutrition",
    description: "The gold standard in sports nutrition trusted by athletes for over 35 years.",
    logo: "https://picsum.photos/seed/on-logo/200/80",
    image: "https://picsum.photos/seed/optimum/600/400",
    productCount: 15,
    country: "USA",
    featured: true,
  },
  {
    id: "brand-3",
    name: "Dymatize",
    slug: "dymatize",
    description: "Science-backed, award-winning protein and performance supplements.",
    logo: "https://picsum.photos/seed/dymatize-logo/200/80",
    image: "https://picsum.photos/seed/dymatize/600/400",
    productCount: 8,
    country: "USA",
    featured: true,
  },
  {
    id: "brand-4",
    name: "Cellucor",
    slug: "cellucor",
    description: "Creators of the world's #1 pre-workout, C4, pushing performance since 2002.",
    logo: "https://picsum.photos/seed/cellucor-logo/200/80",
    image: "https://picsum.photos/seed/cellucor/600/400",
    productCount: 7,
    country: "USA",
    featured: false,
  },
  {
    id: "brand-5",
    name: "Myprotein",
    slug: "myprotein",
    description: "Europe's #1 sports nutrition brand — quality at every level.",
    logo: "https://picsum.photos/seed/myprotein-logo/200/80",
    image: "https://picsum.photos/seed/myprotein/600/400",
    productCount: 13,
    country: "UK",
    featured: true,
  },
  {
    id: "brand-6",
    name: "Prime Hydration",
    slug: "prime-hydration",
    description: "Premium hydration and energy drinks redefining the beverage category.",
    logo: "https://picsum.photos/seed/prime-logo/200/80",
    image: "https://picsum.photos/seed/prime/600/400",
    productCount: 5,
    country: "USA",
    featured: true,
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Ghost Legend Pre-Workout",
    slug: "ghost-legend-pre-workout",
    category: "Pre-Workout",
    categorySlug: "pre-workout",
    brand: "Ghost",
    brandSlug: "ghost",
    flavor: "Blue Raspberry",
    flavors: ["Blue Raspberry", "Warheads Sour Watermelon", "Sour Patch Kids Redberry", "Welch's Grape"],
    image: "https://picsum.photos/seed/ghost-legend/600/600",
    images: [
      "https://picsum.photos/seed/ghost-legend/600/600",
      "https://picsum.photos/seed/ghost-legend-2/600/600",
    ],
    price: 1890,
    originalPrice: 2290,
    description: "Ghost Legend is the fully transparent, fully dosed pre-workout formula. Formulated with clinically studied ingredients including L-Citrulline, Beta-Alanine, and Caffeine to maximize energy, focus, and muscle pump.",
    tags: ["energy", "focus", "pump", "caffeine", "vegan"],
    featured: true,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    weight: "365g",
    servings: 30,
  },
  {
    id: "prod-2",
    name: "Gold Standard 100% Whey",
    slug: "gold-standard-100-whey",
    category: "Protein",
    categorySlug: "protein",
    brand: "Optimum Nutrition",
    brandSlug: "optimum-nutrition",
    flavor: "Double Rich Chocolate",
    flavors: ["Double Rich Chocolate", "Vanilla Ice Cream", "Strawberry Banana", "Cookies & Cream", "Rocky Road"],
    image: "https://picsum.photos/seed/gold-standard/600/600",
    price: 2590,
    originalPrice: 2990,
    description: "The world's best-selling whey protein powder. Gold Standard 100% Whey packs 24g of protein into every serving with minimal fat, sugar, and carbohydrates. Mixes instantly with a spoon.",
    tags: ["protein", "whey", "recovery", "muscle"],
    featured: true,
    badge: "Top Rated",
    rating: 4.9,
    reviews: 18742,
    inStock: true,
    weight: "2.27kg",
    servings: 74,
  },
  {
    id: "prod-3",
    name: "ISO100 Hydrolyzed Protein",
    slug: "iso100-hydrolyzed-protein",
    category: "Protein",
    categorySlug: "protein",
    brand: "Dymatize",
    brandSlug: "dymatize",
    flavor: "Fruity Pebbles",
    flavors: ["Fruity Pebbles", "Chocolate Fudge", "Gourmet Vanilla", "Cocoa Pebbles"],
    image: "https://picsum.photos/seed/iso100/600/600",
    price: 3190,
    originalPrice: 3690,
    description: "Dymatize ISO100 is formulated with 100% hydrolyzed whey protein isolate — the purest, fastest-absorbing protein available. 25g of protein per serving with zero added sugar.",
    tags: ["protein", "isolate", "hydrolyzed", "zero-sugar", "fast-absorbing"],
    featured: true,
    badge: "Premium",
    rating: 4.7,
    reviews: 9823,
    inStock: true,
    weight: "2.27kg",
    servings: 76,
  },
  {
    id: "prod-4",
    name: "C4 Original Pre-Workout",
    slug: "c4-original-pre-workout",
    category: "Pre-Workout",
    categorySlug: "pre-workout",
    brand: "Cellucor",
    brandSlug: "cellucor",
    flavor: "Watermelon",
    flavors: ["Watermelon", "Pink Lemonade", "Fruit Punch", "Cherry Limeade", "Strawberry Margarita"],
    image: "https://picsum.photos/seed/c4-original/600/600",
    price: 1290,
    description: "The world's #1 pre-workout. C4 Original delivers powerful explosive energy, enhanced endurance, and extreme pumps to maximize every workout.",
    tags: ["energy", "endurance", "pump", "explosive"],
    featured: false,
    badge: "World #1",
    rating: 4.6,
    reviews: 31245,
    inStock: true,
    weight: "195g",
    servings: 30,
  },
  {
    id: "prod-5",
    name: "Ghost BCAA",
    slug: "ghost-bcaa",
    category: "Amino Acids",
    categorySlug: "amino-acids",
    brand: "Ghost",
    brandSlug: "ghost",
    flavor: "Sour Patch Kids Blue Raspberry",
    flavors: ["Sour Patch Kids Blue Raspberry", "Warheads Sour Watermelon", "Cherry"],
    image: "https://picsum.photos/seed/ghost-bcaa/600/600",
    price: 1490,
    originalPrice: 1790,
    description: "Ghost BCAA brings a transparent, fully dosed amino acid formula with 6g of branched-chain amino acids in the 2:1:1 ratio. Essential for intra and post-workout recovery.",
    tags: ["bcaa", "amino", "recovery", "intra-workout"],
    featured: false,
    rating: 4.5,
    reviews: 1876,
    inStock: true,
    weight: "338g",
    servings: 30,
  },
  {
    id: "prod-6",
    name: "Impact Whey Protein",
    slug: "impact-whey-protein",
    category: "Protein",
    categorySlug: "protein",
    brand: "Myprotein",
    brandSlug: "myprotein",
    flavor: "Chocolate Smooth",
    flavors: ["Chocolate Smooth", "Vanilla", "Strawberry Cream", "Natural Chocolate", "Unflavored"],
    image: "https://picsum.photos/seed/impact-whey/600/600",
    price: 1990,
    description: "Myprotein's best-selling whey protein concentrate with 21g of protein per serving. An incredibly affordable, high-quality protein for any fitness level.",
    tags: ["protein", "whey", "value", "everyday"],
    featured: true,
    badge: "Best Value",
    rating: 4.6,
    reviews: 42167,
    inStock: true,
    weight: "2.5kg",
    servings: 100,
  },
  {
    id: "prod-7",
    name: "Prime Hydration Drink",
    slug: "prime-hydration-drink",
    category: "Energy Drinks",
    categorySlug: "energy-drinks",
    brand: "Prime Hydration",
    brandSlug: "prime-hydration",
    flavor: "Tropical Punch",
    flavors: ["Tropical Punch", "Lemon Lime", "Blue Raspberry", "Meta Moon", "Ice Pop"],
    image: "https://picsum.photos/seed/prime-hydration/600/600",
    price: 149,
    description: "Prime Hydration is packed with coconut water, B vitamins, BCAAs, and antioxidants. 10% coconut water, 835mg of electrolytes, and zero sugar.",
    tags: ["hydration", "electrolytes", "zero-sugar", "bcaa"],
    featured: true,
    badge: "Viral",
    rating: 4.4,
    reviews: 5672,
    inStock: true,
    weight: "500ml",
  },
  {
    id: "prod-8",
    name: "Ghost Energy Drink",
    slug: "ghost-energy-drink",
    category: "Energy Drinks",
    categorySlug: "energy-drinks",
    brand: "Ghost",
    brandSlug: "ghost",
    flavor: "Tropical Mango",
    flavors: ["Tropical Mango", "Swedish Fish", "Sour Patch Kids Blue Raspberry", "Orange Cream"],
    image: "https://picsum.photos/seed/ghost-energy/600/600",
    price: 79,
    description: "Ghost Energy packs 200mg of natural caffeine, L-Carnitine, and AstraGin® into every can. Fully transparent formula, zero sugar, no artificial colors.",
    tags: ["energy", "caffeine", "natural", "zero-sugar"],
    featured: false,
    badge: "New",
    rating: 4.7,
    reviews: 3412,
    inStock: true,
    weight: "473ml",
  },
  {
    id: "prod-9",
    name: "Gold Standard BCAA",
    slug: "gold-standard-bcaa",
    category: "Amino Acids",
    categorySlug: "amino-acids",
    brand: "Optimum Nutrition",
    brandSlug: "optimum-nutrition",
    flavor: "Fruit Punch",
    flavors: ["Fruit Punch", "Watermelon Splash", "Blueberry Mojito", "Cranberry Lemonade"],
    image: "https://picsum.photos/seed/on-bcaa/600/600",
    price: 1390,
    description: "Gold Standard BCAA Train + Sustain supports muscle endurance, reduces muscle breakdown, and helps recovery with 5g of BCAAs per serving.",
    tags: ["bcaa", "amino", "endurance", "recovery"],
    featured: false,
    rating: 4.5,
    reviews: 4231,
    inStock: true,
    weight: "266g",
    servings: 28,
  },
  {
    id: "prod-10",
    name: "C4 Smart Energy Drink",
    slug: "c4-smart-energy-drink",
    category: "Energy Drinks",
    categorySlug: "energy-drinks",
    brand: "Cellucor",
    brandSlug: "cellucor",
    flavor: "Peach Mango Nectar",
    flavors: ["Peach Mango Nectar", "Frozen Bombsicle", "Midnight Cherry", "Watermelon Strawberry"],
    image: "https://picsum.photos/seed/c4-smart/600/600",
    price: 89,
    description: "C4 Smart Energy is the first energy drink with patented CarnoSyn® Beta-Alanine and clinically studied InnovaTea® natural caffeine. 200mg caffeine, zero sugar.",
    tags: ["energy", "smart", "caffeine", "zero-sugar", "beta-alanine"],
    featured: false,
    rating: 4.3,
    reviews: 2156,
    inStock: true,
    weight: "473ml",
  },
  {
    id: "prod-11",
    name: "Ghost Whey Protein",
    slug: "ghost-whey-protein",
    category: "Protein",
    categorySlug: "protein",
    brand: "Ghost",
    brandSlug: "ghost",
    flavor: "Cereal Milk",
    flavors: ["Cereal Milk", "Oreo", "Chips Ahoy!", "Peanut Butter Cereal Milk", "Nutter Butter"],
    image: "https://picsum.photos/seed/ghost-whey/600/600",
    price: 2890,
    originalPrice: 3290,
    description: "Ghost Whey blends whey protein isolate and concentrate with digestive enzymes for maximum absorption. Each serving delivers 25g of protein with real collab flavors.",
    tags: ["protein", "whey", "isolate", "enzymes", "collab"],
    featured: true,
    badge: "Limited Collab",
    rating: 4.8,
    reviews: 7832,
    inStock: true,
    weight: "1.02kg",
    servings: 26,
  },
  {
    id: "prod-12",
    name: "Myprotein THE Pre-Workout",
    slug: "myprotein-the-pre-workout",
    category: "Pre-Workout",
    categorySlug: "pre-workout",
    brand: "Myprotein",
    brandSlug: "myprotein",
    flavor: "Berry Blast",
    flavors: ["Berry Blast", "Tropical", "Watermelon", "Orange"],
    image: "https://picsum.photos/seed/mp-preworkout/600/600",
    price: 1190,
    description: "Myprotein THE Pre-Workout delivers a fully loaded formula with Citrulline Malate, Beta-Alanine, Creatine Monohydrate, and Caffeine for explosive performance.",
    tags: ["energy", "pump", "creatine", "caffeine", "loaded"],
    featured: false,
    rating: 4.4,
    reviews: 3210,
    inStock: true,
    weight: "500g",
    servings: 50,
  },
  {
    id: "prod-13",
    name: "Platinum 100% Creatine",
    slug: "platinum-100-creatine",
    category: "Amino Acids",
    categorySlug: "amino-acids",
    brand: "Optimum Nutrition",
    brandSlug: "optimum-nutrition",
    flavor: "Unflavored",
    flavors: ["Unflavored"],
    image: "https://picsum.photos/seed/on-creatine/600/600",
    price: 890,
    originalPrice: 1090,
    description: "5g of pure, micronized Creapure® Creatine Monohydrate per serving. Supports strength, power output, and lean muscle mass gains. Mixes instantly and completely.",
    tags: ["creatine", "strength", "power", "pure", "unflavored"],
    featured: false,
    rating: 4.9,
    reviews: 12843,
    inStock: true,
    weight: "400g",
    servings: 80,
  },
  {
    id: "prod-14",
    name: "Elite 100% Whey",
    slug: "elite-100-whey",
    category: "Protein",
    categorySlug: "protein",
    brand: "Dymatize",
    brandSlug: "dymatize",
    flavor: "Rich Chocolate",
    flavors: ["Rich Chocolate", "Smooth Vanilla", "Strawberry Blast", "Chocolate Peanut Butter"],
    image: "https://picsum.photos/seed/elite-whey/600/600",
    price: 2190,
    description: "Dymatize Elite Whey delivers 25g of protein per serving with whey concentrate and isolate blend. Banned Substance Tested and Informed Sport Certified.",
    tags: ["protein", "whey", "certified", "informed-sport"],
    featured: false,
    rating: 4.6,
    reviews: 5431,
    inStock: true,
    weight: "2.27kg",
    servings: 76,
  },
  {
    id: "prod-15",
    name: "Prime Energy Drink",
    slug: "prime-energy-drink",
    category: "Energy Drinks",
    categorySlug: "energy-drinks",
    brand: "Prime Hydration",
    brandSlug: "prime-hydration",
    flavor: "Blue Raspberry",
    flavors: ["Blue Raspberry", "Orange Mango", "Tropical Punch", "Lemon Lime"],
    image: "https://picsum.photos/seed/prime-energy/600/600",
    price: 99,
    description: "Prime Energy delivers 200mg of caffeine with only 10 calories per can. B vitamins for energy metabolism, zero sugar, and the electrolytes your body craves.",
    tags: ["energy", "caffeine", "zero-sugar", "b-vitamins"],
    featured: false,
    badge: "New",
    rating: 4.5,
    reviews: 4123,
    inStock: true,
    weight: "355ml",
  },
  {
    id: "prod-16",
    name: "Ghost Size Creatine",
    slug: "ghost-size-creatine",
    category: "Amino Acids",
    categorySlug: "amino-acids",
    brand: "Ghost",
    brandSlug: "ghost",
    flavor: "Sonic Ocean Water",
    flavors: ["Sonic Ocean Water", "Mango", "Unflavored"],
    image: "https://picsum.photos/seed/ghost-size/600/600",
    price: 1690,
    description: "Ghost Size is the complete lean muscle builder featuring 5g Creatine Monohydrate, plus Betaine, Beta-Alanine, and Epicatechin for fuller, stronger muscles.",
    tags: ["creatine", "lean-muscle", "betaine", "strength"],
    featured: true,
    rating: 4.7,
    reviews: 2987,
    inStock: true,
    weight: "488g",
    servings: 30,
  },
  {
    id: "prod-17",
    name: "THE Whey+",
    slug: "the-whey-plus",
    category: "Protein",
    categorySlug: "protein",
    brand: "Myprotein",
    brandSlug: "myprotein",
    flavor: "Salted Caramel",
    flavors: ["Salted Caramel", "Vanilla", "Chocolate", "White Chocolate", "Birthday Cake"],
    image: "https://picsum.photos/seed/mp-thewhey/600/600",
    price: 2790,
    originalPrice: 3190,
    description: "Myprotein THE Whey+ uses ultra-premium whey protein isolate with added Proteint™ enzyme blend. 22g of protein, just 113 calories, and an extraordinary taste experience.",
    tags: ["protein", "isolate", "premium", "enzymes", "low-calorie"],
    featured: false,
    rating: 4.5,
    reviews: 6124,
    inStock: true,
    weight: "1.5kg",
    servings: 50,
  },
  {
    id: "prod-18",
    name: "C4 Ripped Pre-Workout",
    slug: "c4-ripped-pre-workout",
    category: "Pre-Workout",
    categorySlug: "pre-workout",
    brand: "Cellucor",
    brandSlug: "cellucor",
    flavor: "Arctic Snow Cone",
    flavors: ["Arctic Snow Cone", "Cherry Limeade", "Raspberry Lemonade", "Fruit Punch", "Tropical Punch"],
    image: "https://picsum.photos/seed/c4-ripped/600/600",
    price: 1490,
    description: "C4 Ripped combines pre-workout energy with fat-burning ingredients. No Creatine formula features L-Carnitine, CLA, and Capsaicin to support a lean physique.",
    tags: ["fat-burn", "energy", "lean", "no-creatine", "carnitine"],
    featured: false,
    rating: 4.4,
    reviews: 8234,
    inStock: true,
    weight: "186g",
    servings: 30,
  },
  {
    id: "prod-19",
    name: "Platinum Multivitamin",
    slug: "platinum-multivitamin",
    category: "Vitamins & Health",
    categorySlug: "vitamins-health",
    brand: "Optimum Nutrition",
    brandSlug: "optimum-nutrition",
    flavor: "Unflavored",
    flavors: ["Unflavored"],
    image: "https://picsum.photos/seed/on-multi/600/600",
    price: 990,
    description: "Optimum Nutrition Opti-Men is a complete multi-nutrient system with 75+ active ingredients including 25 vitamins and essential minerals, amino acids, and botanical blend.",
    tags: ["vitamins", "minerals", "health", "complete", "daily"],
    featured: false,
    rating: 4.7,
    reviews: 9124,
    inStock: true,
    weight: "240 tablets",
    servings: 80,
  },
  {
    id: "prod-20",
    name: "Alpha Men Multivitamin",
    slug: "alpha-men-multivitamin",
    category: "Vitamins & Health",
    categorySlug: "vitamins-health",
    brand: "Myprotein",
    brandSlug: "myprotein",
    flavor: "Unflavored",
    flavors: ["Unflavored"],
    image: "https://picsum.photos/seed/mp-alphamen/600/600",
    price: 690,
    description: "Myprotein Alpha Men super multi-vitamin contains 25 key vitamins and minerals including B12 for energy, Vitamin D3, and Zinc for immune support.",
    tags: ["vitamins", "minerals", "men", "immune", "energy"],
    featured: false,
    rating: 4.5,
    reviews: 7231,
    inStock: true,
    weight: "360 tablets",
    servings: 120,
  },
];

/**
 * TH:
 * Query Functions — ฟังก์ชัน helper สำหรับดึงข้อมูลจาก arrays ด้านบน
 * ทุก function เป็น pure synchronous function
 * ใช้แทน database queries ในขั้น prototype
 *
 * EN:
 * Query Functions — helper functions for accessing data from the arrays above.
 * All functions are pure and synchronous.
 * Serve as database query substitutes at the prototype stage.
 */

/** TH: หา product จาก slug | EN: Find a single product by its URL slug */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** TH: ดึงสินค้าทั้งหมดในหมวดหมู่ | EN: Get all products in a category */
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

/** TH: ดึงสินค้าทั้งหมดของแบรนด์ | EN: Get all products from a brand */
export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brandSlug === brandSlug);
}

/** TH: ดึงสินค้าที่ featured: true (สำหรับหน้าแรก) | EN: Get products marked as featured (homepage section) */
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** TH: หา category จาก slug | EN: Find a category by its slug */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** TH: หา brand จาก slug | EN: Find a brand by its slug */
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

/**
 * TH:
 * getAllFlavors — รวบรวม flavors ทั้งหมดจากทุกสินค้า (deduplicated, sorted)
 * ใช้ Set เพื่อ deduplicate (ป้องกัน flavor ซ้ำ)
 * ยังไม่ได้ใช้ใน UI แต่เตรียมไว้สำหรับ flavor filter
 *
 * EN:
 * getAllFlavors — collects all unique flavors across all products (deduplicated, sorted).
 * Uses Set to eliminate duplicates before converting to a sorted array.
 * Not yet wired to UI — reserved for future flavor filter feature.
 */
export function getAllFlavors(): string[] {
  const flavors = new Set<string>();
  products.forEach((p) => p.flavors.forEach((f) => flavors.add(f)));
  return Array.from(flavors).sort();
}
