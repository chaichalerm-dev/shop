/**
 * TH:
 * ไฟล์นี้เป็น Single Source of Truth สำหรับ TypeScript types ทั้งหมดในโปรเจกต์
 * ทุก component และ function ที่ทำงานกับ data จะต้อง import types จากที่นี่
 * การรวม types ไว้ที่เดียวช่วยให้การ refactor ง่ายและลด inconsistency
 *
 * EN:
 * This file is the single source of truth for all TypeScript interfaces in the project.
 * Every component and function that works with data imports its types from here.
 * Centralizing types prevents drift and makes refactoring safe across the codebase.
 */

/**
 * TH:
 * Product — interface หลักสำหรับสินค้าแต่ละรายการ
 * ทุก field ที่เป็น optional (?) หมายความว่าไม่จำเป็นต้องมีสำหรับทุกสินค้า
 * เช่น energy drink อาจไม่มี servings, หรือสินค้าที่ไม่มี sale อาจไม่มี originalPrice
 *
 * EN:
 * Product — the core interface for every product in the catalog.
 * Optional fields (?) allow flexibility: an energy drink may not have servings,
 * and a non-discounted product won't have an originalPrice.
 */
export interface Product {
  id: string;              // TH: unique identifier | EN: unique identifier
  name: string;            // TH: ชื่อสินค้าเต็ม | EN: full display name
  slug: string;            // TH: URL-safe name สำหรับ routing | EN: URL-safe name used in routing
  category: string;        // TH: ชื่อ category สำหรับ display | EN: display name of the category
  categorySlug: string;    // TH: slug ของ category สำหรับ filter/link | EN: category slug for filtering and linking
  brand: string;           // TH: ชื่อแบรนด์สำหรับ display | EN: brand display name
  brandSlug: string;       // TH: slug ของแบรนด์สำหรับ filter/link | EN: brand slug for filtering and linking
  flavor: string;          // TH: flavor เริ่มต้น (default selected) | EN: default / primary flavor shown
  flavors: string[];       // TH: ทุก flavor ที่มี สำหรับ FlavorSelector | EN: all available flavors for the selector
  image: string;           // TH: URL ภาพหลัก | EN: primary product image URL
  images?: string[];       // TH: ภาพเพิ่มเติม (optional, ยังไม่ได้ใช้ใน gallery) | EN: additional images (optional, reserved for future gallery)
  price: number;           // TH: ราคาปัจจุบัน (หน่วย: บาท) | EN: current price in Thai Baht
  originalPrice?: number;  // TH: ราคาเดิมก่อนลด (ถ้ามี) ใช้คำนวณ discount % | EN: pre-sale price, used to compute discount badge
  description: string;     // TH: คำอธิบายสินค้าแบบละเอียด | EN: full product description
  tags: string[];          // TH: tags สำหรับ search และ display | EN: searchable tags shown on the card
  featured: boolean;       // TH: แสดงใน FeaturedProducts section หรือไม่ | EN: whether this product appears in the Featured section
  badge?: string;          // TH: ป้ายกำกับเช่น "Best Seller" (optional) | EN: promotional badge label (optional)
  rating: number;          // TH: คะแนนเฉลี่ย 0–5 | EN: average star rating (0–5)
  reviews: number;         // TH: จำนวนรีวิวทั้งหมด | EN: total review count
  inStock: boolean;        // TH: มีสินค้าในสต็อกหรือไม่ | EN: inventory availability flag
  weight?: string;         // TH: น้ำหนักหรือขนาด เช่น "2.27kg", "500ml" | EN: package weight or volume e.g. "2.27kg", "500ml"
  servings?: number;       // TH: จำนวนมื้อต่อกระป๋อง/ถุง | EN: number of servings per container
}

/**
 * TH:
 * Category — interface สำหรับหมวดหมู่สินค้า
 * มี 5 categories: Pre-Workout, Protein, Amino Acids, Vitamins & Health, Energy Drinks
 * color ใช้สร้าง category-specific accent ใน CategoryGrid และ page headers
 *
 * EN:
 * Category — represents a product category (5 total in the catalog).
 * The color field drives per-category accent backgrounds in grids and page headers.
 */
export interface Category {
  id: string;            // TH: unique identifier | EN: unique identifier
  name: string;          // TH: ชื่อ category สำหรับ display | EN: display name
  slug: string;          // TH: ใช้เป็น URL segment: /categories/[slug] | EN: URL segment: /categories/[slug]
  description: string;   // TH: คำอธิบายสั้นๆ แสดงใน category cards | EN: short description shown on category cards
  image: string;         // TH: URL ภาพ category (ยังไม่ได้แสดง) | EN: category image URL (reserved for future hero)
  icon: string;          // TH: emoji icon แสดงบน card | EN: emoji icon displayed on cards
  productCount: number;  // TH: จำนวนสินค้าโดยประมาณ (แสดงเป็น text) | EN: approximate product count shown as informational text
  color: string;         // TH: hex color สำหรับ accent (background opacity 15%) | EN: hex color for per-category accent backgrounds
}

/**
 * TH:
 * Brand — interface สำหรับแบรนด์สินค้า
 * มี 6 brands: Ghost, Optimum Nutrition, Dymatize, Cellucor, Myprotein, Prime Hydration
 * featured brands แสดงใน BrandShowcase section บนหน้าแรก
 *
 * EN:
 * Brand — represents a supplement brand (6 total).
 * featured brands appear in the BrandShowcase section on the homepage.
 */
export interface Brand {
  id: string;            // TH: unique identifier | EN: unique identifier
  name: string;          // TH: ชื่อแบรนด์สำหรับ display | EN: display name
  slug: string;          // TH: ใช้เป็น URL segment: /brands/[slug] | EN: URL segment: /brands/[slug]
  description: string;   // TH: คำอธิบายแบรนด์ | EN: brand description
  logo: string;          // TH: URL โลโก้ (ยังไม่ได้ใช้) | EN: logo URL (reserved for future use)
  image: string;         // TH: URL ภาพ hero ของแบรนด์ | EN: brand hero image URL
  productCount: number;  // TH: จำนวนสินค้าโดยประมาณ | EN: approximate product count
  country: string;       // TH: ประเทศต้นกำเนิด แสดงเป็น Badge | EN: origin country displayed as a Badge
  featured: boolean;     // TH: แสดงใน BrandShowcase หน้าแรกหรือไม่ | EN: whether this brand appears in the homepage showcase
}

/**
 * TH:
 * FilterState — สถานะ filter สำหรับหน้า Products catalog (/products)
 * ใช้กับ useState ใน products/page.tsx และ ProductFilters component
 * string เปล่า ("") หมายถึง "ทั้งหมด" (ไม่มี filter)
 *
 * EN:
 * FilterState — the shape of active filters on the /products catalog page.
 * An empty string ("") for any field means "show all" (no filter applied).
 * Used by useState in products/page.tsx and passed down to ProductFilters.
 */
export interface FilterState {
  category: string;   // TH: slug ของ category ที่เลือก หรือ "" | EN: selected category slug, or "" for all
  brand: string;      // TH: slug ของแบรนด์ที่เลือก หรือ "" | EN: selected brand slug, or "" for all
  flavor: string;     // TH: flavor ที่เลือก หรือ "" (ยังไม่ได้ใช้ใน UI) | EN: selected flavor, or "" (not yet wired to UI)
  search: string;     // TH: คำค้นหา matches name/brand/category/flavor/tags | EN: search query matched against name/brand/category/flavor/tags
  minPrice: number;   // TH: ราคาต่ำสุด (ยังไม่ได้ใช้ใน UI) | EN: minimum price filter (not yet wired to UI)
  maxPrice: number;   // TH: ราคาสูงสุด (ยังไม่ได้ใช้ใน UI) | EN: maximum price filter (not yet wired to UI)
}
