# APEX — Premium Supplement & Wellness Store

> **TH:** เว็บไซต์ร้านขายอาหารเสริมระดับพรีเมียมสำหรับตลาดประเทศไทย สร้างด้วย Next.js App Router, TypeScript และ TailwindCSS v4
>
> **EN:** A production-quality premium supplement e-commerce showcase built with Next.js App Router, TypeScript, and TailwindCSS v4 — targeting the Thai market.

---

## Table of Contents | สารบัญ

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Routing Architecture](#routing-architecture)
- [Component Architecture](#component-architecture)
- [Data Layer](#data-layer)
- [Design System](#design-system)
- [Rendering Strategy](#rendering-strategy)
- [Animation System](#animation-system)
- [Responsive Design](#responsive-design)
- [SEO Setup](#seo-setup)
- [Development Workflow](#development-workflow)
- [Future Scaling Suggestions](#future-scaling-suggestions)

---

## Project Overview

### TH — ภาพรวมโปรเจกต์

**APEX** คือเว็บแอปพลิเคชัน e-commerce สำหรับธุรกิจขายอาหารเสริมและสินค้าสุขภาพแบบพรีเมียม ออกแบบมาสำหรับตลาดประเทศไทย

จุดเด่นของโปรเจกต์:
- **Dark-first aesthetic** — ธีมสีเข้ม zinc-950 พร้อม primary สีม่วง (#7c3aed) และ accent สีทอง (#f59e0b)
- **Glassmorphism UI** — ใช้ backdrop-filter blur เพื่อให้ดูทันสมัยและ premium
- **Fully animated** — ทุก section มี scroll-based animation ด้วย Framer Motion
- **Fully responsive** — รองรับทุกหน้าจอตั้งแต่มือถือจนถึง widescreen
- **20 สินค้า** ใน 5 categories จาก 6 แบรนด์ระดับโลก
- **27 static routes** ที่ build ผ่านทั้งหมด

### EN — Project Overview

**APEX** is a full-featured premium supplement e-commerce showcase web application, designed for the Thai market with global brands.

Key highlights:
- **Dark-first aesthetic** — zinc-950 background, violet primary (#7c3aed), amber accent (#f59e0b)
- **Glassmorphism UI** — modern backdrop-filter blur effects for a premium feel
- **Fully animated** — every section uses scroll-triggered animations via Framer Motion
- **Fully responsive** — mobile-first, works on all screen sizes
- **20 products** across 5 categories from 6 world-class brands
- **27 static routes** — all build cleanly

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.x |
| Styling | TailwindCSS | v4 (CSS-first, `@theme`) |
| Animation | Framer Motion | latest |
| Icons | Lucide React | 1.16.0 |
| UI Primitives | Radix UI | latest |
| Variant Classes | class-variance-authority (CVA) | latest |
| Class Merging | clsx + tailwind-merge | latest |
| Fonts | Inter (body) + Space Grotesk (display) | via next/font |
| Images | picsum.photos (seeded) + local SVG fallback | — |

### TH — หมายเหตุ TailwindCSS v4

โปรเจกต์นี้ใช้ TailwindCSS **v4** ซึ่งมีความแตกต่างสำคัญจาก v3:
- **ไม่มี** `tailwind.config.ts` — ใช้ `@theme { }` ใน CSS แทน
- Import ด้วย `@import "tailwindcss"` แทน `@tailwind base/components/utilities`
- Custom tokens (colors, fonts) กำหนดใน `globals.css` ด้วย `@theme { }`

### EN — TailwindCSS v4 Note

This project uses TailwindCSS **v4** with breaking changes from v3:
- **No** `tailwind.config.ts` — configuration lives inside `globals.css` under `@theme { }`
- Import via `@import "tailwindcss"` instead of `@tailwind` directives
- Custom design tokens defined in `globals.css` using `@theme { }` block

---

## Prerequisites

### TH — สิ่งที่ต้องติดตั้งก่อน

```
Node.js  >= 18.17.0
npm      >= 9.x  (หรือ yarn/pnpm/bun)
Git
```

### EN — Requirements

```
Node.js  >= 18.17.0
npm      >= 9.x  (or yarn/pnpm/bun)
Git
```

---

## Installation

### TH — วิธีติดตั้ง

```bash
# 1. Clone โปรเจกต์
git clone <repository-url>
cd shop

# 2. ติดตั้ง dependencies
npm install

# 3. ตรวจสอบว่าติดตั้งสำเร็จ
npm run build  # ควรผ่านทั้งหมด 27 routes
```

### EN — Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd shop

# 2. Install all dependencies
npm install

# 3. Verify the installation
npm run build  # Should produce 27 static routes cleanly
```

**Dependencies installed:**

```
next                       — Framework
react + react-dom          — UI runtime
typescript                 — Type safety
tailwindcss                — Styling (v4)
framer-motion              — Animations
lucide-react               — Icons
@radix-ui/react-dialog     — Accessible modal primitive
@radix-ui/react-slot       — Polymorphic component primitive
class-variance-authority   — Variant-based class generation (CVA)
clsx                       — Conditional class merging
tailwind-merge             — Tailwind class conflict resolution
```

---

## Running the Project

### TH — วิธีรันโปรเจกต์

```bash
# Development mode (hot reload)
npm run dev
# เปิดเบราว์เซอร์ที่ http://localhost:3000

# Production build
npm run build

# Start production server (หลัง build แล้ว)
npm run start

# Type check (ไม่ emit ไฟล์)
npx tsc --noEmit

# Lint
npm run lint
```

### EN — Available Scripts

```bash
npm run dev     # Start dev server with hot reload at http://localhost:3000
npm run build   # Build for production (outputs to .next/)
npm run start   # Start production server (requires build first)
npm run lint    # Run ESLint checks
```

---

## Project Structure

### TH — โครงสร้างโฟลเดอร์

```
shop/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout — fonts, SEO metadata, HTML shell
│   │   ├── globals.css               # Global styles + TailwindCSS v4 @theme config
│   │   ├── page.tsx                  # หน้าแรก (Home page)
│   │   ├── products/
│   │   │   ├── page.tsx              # หน้าสินค้าทั้งหมด (client-side filters)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # หน้ารายละเอียดสินค้า (SSG)
│   │   │       ├── FlavorSelector.tsx # Client component — เลือก flavor + จำนวน
│   │   │       └── RelatedProducts.tsx # Client component — สินค้าที่เกี่ยวข้อง
│   │   ├── categories/
│   │   │   ├── page.tsx              # หน้าหมวดหมู่ทั้งหมด
│   │   │   └── [slug]/page.tsx       # หน้าสินค้าในหมวดหมู่เดียว
│   │   └── brands/
│   │       ├── page.tsx              # หน้าแบรนด์ทั้งหมด
│   │       └── [slug]/page.tsx       # หน้าสินค้าของแบรนด์เดียว
│   │
│   ├── components/
│   │   ├── layout/                   # Layout components (ใช้ทุกหน้า)
│   │   │   ├── Navbar.tsx            # Navigation bar — sticky, scroll-aware, animated
│   │   │   ├── Footer.tsx            # Footer — links, social icons
│   │   │   └── MobileMenu.tsx        # Mobile drawer menu — slide-in animation
│   │   │
│   │   ├── home/                     # Components เฉพาะหน้าแรก
│   │   │   ├── HeroSection.tsx       # Full-screen hero — gradient orbs, floating badges
│   │   │   ├── PromoBanner.tsx       # Perks strip + promo banner
│   │   │   ├── FeaturedProducts.tsx  # Grid ของสินค้า featured + ProductModal
│   │   │   ├── CategoryGrid.tsx      # Grid ของ categories
│   │   │   ├── BrandShowcase.tsx     # Grid ของแบรนด์ที่ featured
│   │   │   └── CTASection.tsx        # Explore CTA + Newsletter form
│   │   │
│   │   ├── product/                  # Product-specific components
│   │   │   ├── ProductCard.tsx       # Reusable product card — hover overlay, quick view
│   │   │   ├── ProductModal.tsx      # Quick-view modal (Radix Dialog + Framer Motion)
│   │   │   ├── ProductFilters.tsx    # Sidebar filters — category, brand, search
│   │   │   └── ProductSkeleton.tsx   # Loading skeleton สำหรับ product grid
│   │   │
│   │   ├── common/                   # Reusable utility components
│   │   │   ├── FadeIn.tsx            # Scroll-triggered fade animation wrapper
│   │   │   ├── SafeImage.tsx         # next/image wrapper ป้องกัน error + fallback
│   │   │   └── SectionHeading.tsx    # Section title ที่มี gradient highlight text
│   │   │
│   │   └── ui/                       # Primitive UI components (hand-built, no shadcn CLI)
│   │       ├── button.tsx            # Button — CVA variants (default/accent/outline/ghost/glass)
│   │       ├── badge.tsx             # Badge — CVA variants (default/accent/success/outline/glass)
│   │       ├── skeleton.tsx          # Skeleton loading placeholder
│   │       └── input.tsx             # Input field — styled, accessible
│   │
│   ├── lib/
│   │   ├── data.ts                   # Mock data — products, categories, brands + query functions
│   │   └── utils.ts                  # Utility functions — cn(), formatPrice(), slugify()
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces — Product, Category, Brand, FilterState
│
├── public/                           # Static assets
├── .gitignore
├── eslint.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

### EN — Folder Structure Explanation

- **`src/app/`** — All Next.js App Router pages. Each folder is a route segment. Files named `page.tsx` render the UI for that route.
- **`src/components/layout/`** — Navbar, Footer, and MobileMenu are included in every page. They are not placed in `app/layout.tsx` intentionally — each page imports them directly, giving pages full control.
- **`src/components/home/`** — Section-specific components only used on the homepage.
- **`src/components/product/`** — Components that can appear on multiple pages wherever products are displayed.
- **`src/components/common/`** — Truly generic, reusable presentation utilities.
- **`src/components/ui/`** — Design system primitives. Hand-built without shadcn CLI.
- **`src/lib/`** — Non-UI logic: data access and utility functions.
- **`src/types/`** — Single source of truth for TypeScript types used across the app.

---

## Routing Architecture

### TH — โครงสร้าง Routes

โปรเจกต์ใช้ **Next.js App Router** ซึ่งจะสร้าง route จากโครงสร้างโฟลเดอร์ใน `src/app/`

| URL | File | Rendering | คำอธิบาย |
|-----|------|-----------|----------|
| `/` | `app/page.tsx` | Static | หน้าแรก |
| `/products` | `app/products/page.tsx` | Client | รายการสินค้าพร้อม filter |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | SSG | รายละเอียดสินค้า |
| `/categories` | `app/categories/page.tsx` | Static | รายการหมวดหมู่ |
| `/categories/[slug]` | `app/categories/[slug]/page.tsx` | Client | สินค้าในหมวดหมู่ |
| `/brands` | `app/brands/page.tsx` | Static | รายการแบรนด์ |
| `/brands/[slug]` | `app/brands/[slug]/page.tsx` | Client | สินค้าของแบรนด์ |

**Dynamic segments** `[slug]` หมายถึง URL จะเปลี่ยนตามค่า slug เช่น `/products/ghost-legend-pre-workout`

### EN — Route Table

| URL Pattern | Rendering Mode | Description |
|-------------|---------------|-------------|
| `/` | Static (SSG) | Homepage with all sections |
| `/products` | Client Component | Full catalog with real-time client-side filters |
| `/products/[slug]` | SSG via `generateStaticParams` | Individual product page, pre-rendered at build time |
| `/categories` | Static | All categories listing |
| `/categories/[slug]` | Client Component | Products filtered by category |
| `/brands` | Static | All brands listing |
| `/brands/[slug]` | Client Component | Products filtered by brand |

**Total: 27 static routes** generated at build time (1 home + 1 products-listing + 20 product-detail + 1 categories + 5 category-detail + 1 brands + 6 brand-detail = 35, but some are client-rendered so Next.js reports 27 static shell pages).

---

## Component Architecture

### TH — สถาปัตยกรรม Components

โปรเจกต์แบ่ง components เป็น 4 ชั้น:

#### 1. UI Primitives (`src/components/ui/`)
ชั้นล่างสุด — components ที่ไม่รู้จักโดเมนธุรกิจเลย
- `Button` — มี 6 variants และ 6 sizes ใช้ CVA
- `Badge` — มี 6 variants ใช้ CVA
- `Skeleton` — loading placeholder
- `Input` — styled text input

#### 2. Common Utilities (`src/components/common/`)
ชั้น utility ที่ใช้ซ้ำข้ามโดเมน:
- `FadeIn` — wrapper สำหรับ scroll-triggered animation
- `SafeImage` — next/image ที่มี error fallback และ loading skeleton
- `SectionHeading` — heading ที่มี eyebrow label + gradient highlight

#### 3. Domain Components (`src/components/product/`, `src/components/home/`, `src/components/layout/`)
ชั้นที่รู้จัก business domain:
- รู้จัก `Product`, `Category`, `Brand` types
- ใช้ data จาก `src/lib/data.ts`

#### 4. Page Components (`src/app/**`)
ชั้นบนสุด — orchestrate ทุกอย่าง กำหนด layout, ดึงข้อมูล, pass props ลงมา

### EN — Layered Component Architecture

```
┌─────────────────────────────────────────────┐
│              Page Components                │  ← Orchestration layer
│         (src/app/**/page.tsx)               │     (routes, data fetching)
├─────────────────────────────────────────────┤
│           Domain Components                 │  ← Business logic layer
│   (layout/, home/, product/)                │     (knows about Product, Brand, Category)
├─────────────────────────────────────────────┤
│          Common Utilities                   │  ← Shared presentation layer
│         (common/FadeIn, SafeImage)          │     (animation, image handling)
├─────────────────────────────────────────────┤
│            UI Primitives                    │  ← Design system layer
│        (ui/Button, Badge, Input)            │     (no business knowledge)
└─────────────────────────────────────────────┘
```

---

## Data Layer

### TH — ชั้นข้อมูล

ข้อมูลทั้งหมดอยู่ใน `src/lib/data.ts` เป็น **static mock data** (ไม่มี API หรือ database จริง)

**โครงสร้าง:**
```
data.ts
├── categories[]      — 5 หมวดหมู่ (Pre-Workout, Protein, Amino, Vitamins, Energy)
├── brands[]          — 6 แบรนด์ (Ghost, ON, Dymatize, Cellucor, Myprotein, Prime)
├── products[]        — 20 สินค้าพร้อม flavors, prices, ratings, tags
└── Query functions:
    ├── getProductBySlug(slug)
    ├── getProductsByCategory(categorySlug)
    ├── getProductsByBrand(brandSlug)
    ├── getFeaturedProducts()
    ├── getCategoryBySlug(slug)
    ├── getBrandBySlug(slug)
    └── getAllFlavors()
```

**การใช้งาน:** แต่ละ page import functions เหล่านี้โดยตรง ไม่ผ่าน API — เหมาะสมสำหรับ prototype/showcase

**ขยายไปสู่ production:** แทนที่ query functions ด้วย `fetch()` calls ไปยัง REST API หรือ GraphQL โดย interface ของ functions ยังคงเดิม pages ไม่ต้องแก้

### EN — Data Architecture

All data lives in `src/lib/data.ts` as **static TypeScript arrays** — no database or API at this stage.

```typescript
// Pattern: import and call directly in Server Components
const product = getProductBySlug(slug);   // returns Product | undefined
const catProducts = getProductsByCategory("protein"); // returns Product[]
```

**To scale to production:** replace the query function bodies with `fetch()` or ORM calls. The function signatures stay the same, so pages don't need to change.

---

## Design System

### TH — ระบบ Design

สีและ font ทั้งหมดกำหนดใน `src/app/globals.css` ด้วย TailwindCSS v4 `@theme { }` block:

```css
@theme {
  --font-sans: var(--font-inter);           /* body text */
  --font-display: var(--font-space-grotesk); /* headings */

  --color-primary: #7c3aed;       /* violet — CTA, active states */
  --color-accent: #f59e0b;        /* amber — sale badges, highlights */
  --color-surface: #111116;       /* card backgrounds */
  --color-surface-2: #18181f;
  --color-surface-3: #1f1f28;
  --color-border: rgba(255,255,255,0.07);
}
```

**Custom utility classes** ที่สำคัญ:

| Class | ใช้สำหรับ |
|-------|----------|
| `.glass` | Glassmorphism card (backdrop blur + semi-transparent bg) |
| `.glass-strong` | Glassmorphism ที่เข้มกว่า (used in Navbar on scroll) |
| `.gradient-text` | Gradient text สีม่วง (ใช้กับ headings) |
| `.gradient-text-accent` | Gradient text สีทอง |
| `.gradient-primary` | Gradient bg สีม่วง (promo banner, logo) |
| `.glow-primary` | Box shadow สีม่วงสำหรับ CTA buttons |
| `.card-shadow` | Drop shadow สำหรับ cards |
| `.noise` | Subtle noise texture overlay |
| `.line-clamp-2/3` | CSS text truncation |

### EN — Design Tokens Summary

The entire design system is defined in a single CSS file (`globals.css`). No `tailwind.config.ts` exists — this is the TailwindCSS v4 approach.

**Color palette:** Dark zinc-950 base, violet-600 primary, amber-500 accent.  
**Typography:** Inter for body text, Space Grotesk for display/headings.  
**Glassmorphism:** `.glass` and `.glass-strong` utility classes.  
**Gradients:** `.gradient-primary`, `.gradient-text`, `.gradient-accent`.

---

## Rendering Strategy

### TH — กลยุทธ์การ Render

โปรเจกต์ใช้ 3 strategies ขึ้นอยู่กับความต้องการของแต่ละ page:

#### 1. Static Site Generation (SSG) — หน้าที่ข้อมูลคงที่
- `app/page.tsx` (Home)
- `app/categories/page.tsx`
- `app/brands/page.tsx`
- `app/products/[slug]/page.tsx` — ใช้ `generateStaticParams()` สร้าง 20 product pages ตอน build

#### 2. Client-Side Rendering — หน้าที่ต้องการ interactivity
- `app/products/page.tsx` — `"use client"` เพราะต้องการ real-time filtering ด้วย `useState` + `useMemo`
- `app/categories/[slug]/page.tsx` — `"use client"` เพราะมี ProductModal state
- `app/brands/[slug]/page.tsx` — `"use client"` เพราะมี ProductModal state

#### 3. Hybrid Pattern (Server + Client)
- `app/products/[slug]/page.tsx` — Server Component ที่ render product data
- `FlavorSelector.tsx` — Client Component ที่ embedded ใน Server Component เพื่อจัดการ interactive state

**Server Components** = ถูก render บน server ก่อน, ลด JavaScript ที่ส่งไปให้ browser  
**Client Components** = ใส่ `"use client"` ที่บรรทัดแรก, รองรับ useState/useEffect/event handlers

### EN — Rendering Strategy Breakdown

| Page | Strategy | Reason |
|------|----------|--------|
| Home (`/`) | SSG | Static content, no user interaction |
| Products listing (`/products`) | CSR | Real-time client-side filtering |
| Product detail (`/products/[slug]`) | SSG | Pre-rendered at build via `generateStaticParams` |
| Categories listing | SSG | Static content |
| Category detail | CSR | ProductModal requires `useState` |
| Brands listing | SSG | Static content |
| Brand detail | CSR | ProductModal requires `useState` |

The hybrid pattern used in the product detail page:
```
ProductDetailPage (Server Component)
└── FlavorSelector (Client Component — "use client")
└── RelatedProducts (Client Component — "use client")
```
This keeps the expensive product data fetch on the server while interactive elements are client-only.

---

## Animation System

### TH — ระบบ Animation

ทุก animation ในโปรเจกต์ใช้ **Framer Motion** ซึ่งแบ่งเป็น 3 ประเภท:

#### 1. Mount Animations (เมื่อ component โหลดครั้งแรก)
```tsx
// ใช้ใน Navbar, HeroSection
<motion.div initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
```

#### 2. Scroll-triggered Animations (เมื่อ scroll ถึง element)
```tsx
// ใช้ผ่าน FadeIn component ที่ wrap ทุก section
<FadeIn delay={0.1} direction="up">
  <content />
</FadeIn>
```
FadeIn ใช้ `whileInView` + `viewport={{ once: true }}` — animation จะเกิดครั้งเดียวเมื่อ scroll ถึง

#### 3. Interaction Animations (เมื่อ hover/click)
```tsx
// ProductCard hover lift
<motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>

// Quick View overlay fade
<motion.div animate={{ opacity: hovered ? 1 : 0 }}>

// ProductModal scale-in
<motion.div initial={{ scale: 0.93, y: 12 }} animate={{ scale: 1, y: 0 }}>
```

#### 4. Layout Animation (Navbar active indicator)
```tsx
// Active nav link indicator — เลื่อน smoothly ระหว่าง links
<motion.span layoutId="nav-active">
```
`layoutId` ทำให้ Framer Motion ติดตาม element และ animate การเปลี่ยน position อัตโนมัติ

### EN — Animation Patterns

| Pattern | API Used | Where |
|---------|----------|-------|
| Page-enter slide | `initial/animate` | Navbar, Hero |
| Scroll-triggered fade | `whileInView` + `viewport.once` | All sections via `FadeIn` |
| Staggered children | `FadeIn delay={i * 0.06}` | Product grids, category lists |
| Hover lift | `whileHover={{ y: -4 }}` | ProductCard |
| Overlay fade | `animate={{ opacity: hovered ? 1 : 0 }}` | Quick View button |
| Modal scale-in | `initial/animate/exit` + `AnimatePresence` | ProductModal, MobileMenu |
| Layout animation | `layoutId="nav-active"` | Navbar active indicator |

**Performance:** All `whileInView` animations use `viewport={{ once: true }}` to fire only once, not on every scroll-back.

---

## Responsive Design

### TH — ระบบ Responsive

โปรเจกต์ใช้ **mobile-first approach** ของ TailwindCSS — เขียน base styles สำหรับมือถือ แล้วเพิ่ม breakpoints สำหรับหน้าจอใหญ่

**Breakpoints:**

| Prefix | Width | อุปกรณ์ |
|--------|-------|---------|
| (none) | 0px+ | Mobile |
| `sm:` | 640px+ | Large phone / small tablet |
| `md:` | 768px+ | Tablet |
| `lg:` | 1024px+ | Laptop |
| `xl:` | 1280px+ | Desktop |

**ตัวอย่างใน ProductCard:**
```tsx
// มือถือ: 2 คอลัมน์ | sm: 3 คอลัมน์ | lg: 4 คอลัมน์
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
```

**Navigation:**
- Desktop (md+): แสดง horizontal nav links
- Mobile (<md): ซ่อน nav links แสดง hamburger button → `MobileMenu` drawer

**HeroSection floating badges:**
- แสดงเฉพาะ `xl:` (widescreen) เท่านั้น เพราะพื้นที่มือถือน้อยเกินไป

### EN — Responsive Breakpoint Usage

The project consistently uses these Tailwind grid patterns:

```
2 cols mobile → 3 cols sm → 4 cols lg    (product grids)
2 cols mobile → 3 cols sm → 3 cols lg    (brand showcase)
2 cols mobile → 4 cols sm               (perks strip)
1 col  mobile → 2 cols lg               (CTA section)
```

Responsive padding: `px-4 sm:px-6 lg:px-8` — tighter on mobile, roomier on desktop.  
Max content width: `max-w-7xl` (1280px) centered with `mx-auto`.

---

## SEO Setup

### TH — การตั้งค่า SEO

Next.js App Router ใช้ `Metadata` object สำหรับ SEO แทน `<head>` tags โดยตรง

**Root metadata** (ใช้กับทุกหน้า) กำหนดใน `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: {
    default: "APEX — Premium Supplement & Wellness Store",
    template: "%s | APEX",   // หน้าอื่นๆ จะต่อท้ายด้วย " | APEX"
  },
  description: "...",
  keywords: [...],
  openGraph: { type: "website", locale: "th_TH", ... },
  robots: { index: true, follow: true },
};
```

**Per-page metadata** กำหนดด้วย `generateMetadata()` ใน product detail page:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = getProductBySlug(slug);
  return {
    title: product.name,           // จะกลายเป็น "Ghost Legend | APEX"
    description: product.description,
    openGraph: { images: [product.image] },
  };
}
```

**Viewport** กำหนดแยกต่างหากด้วย `export const viewport: Viewport`:
```typescript
export const viewport: Viewport = {
  themeColor: "#09090f",   // browser chrome color (mobile)
  width: "device-width",
  initialScale: 1,
};
```

### EN — SEO Implementation

- **Title template:** `%s | APEX` — product pages get `"Ghost Legend | APEX"` automatically
- **OpenGraph:** locale set to `th_TH`, type `website`, includes images per product
- **Robots:** `index: true, follow: true` — fully crawlable
- **Viewport:** `themeColor` colors the browser chrome on mobile
- **HTML lang:** `<html lang="th">` for Thai language declaration
- **Font optimization:** `next/font/google` with `display: "swap"` prevents invisible text during load

---

## Development Workflow

### TH — ขั้นตอนการพัฒนา

#### เพิ่มสินค้าใหม่
1. เปิด `src/lib/data.ts`
2. เพิ่ม object ใหม่ในอาเรย์ `products[]`
3. ตรวจสอบว่า `categorySlug` และ `brandSlug` ตรงกับที่มีอยู่
4. รัน `npm run build` เพื่อตรวจสอบว่า static pages สร้างถูกต้อง

#### เพิ่ม Category ใหม่
1. เพิ่มใน `categories[]` array ใน `data.ts`
2. เพิ่มสินค้าที่ใช้ `categorySlug` นั้น
3. Route `/categories/[slug]` จะสร้างอัตโนมัติ

#### เพิ่ม Component ใหม่
1. เลือกโฟลเดอร์ที่เหมาะสม (`ui/`, `common/`, `product/`, `home/`, `layout/`)
2. สร้างไฟล์ `.tsx`
3. ถ้าใช้ `useState`/`useEffect`/event handlers → ใส่ `"use client"` บรรทัดแรก
4. Import และใช้งานในหน้าที่ต้องการ

#### แก้ไข Design System
- สีและ fonts → แก้ใน `src/app/globals.css` ใน `@theme { }` block
- Component variants → แก้ใน `buttonVariants` / `badgeVariants` ด้วย CVA

### EN — Development Workflow

#### Adding a new product
```typescript
// In src/lib/data.ts, add to products[]
{
  id: "prod-21",
  name: "New Product Name",
  slug: "new-product-name",        // must be URL-safe
  category: "Protein",
  categorySlug: "protein",         // must match a Category.slug
  brand: "Ghost",
  brandSlug: "ghost",              // must match a Brand.slug
  // ... rest of fields
}
```

#### Adding a new page
1. Create folder in `src/app/` matching the URL
2. Add `page.tsx` inside it
3. Export a default React component
4. Next.js automatically picks it up as a route

#### Modifying the design system
- Colors: edit `@theme { }` in `globals.css`
- Button variants: edit `buttonVariants` cva config in `ui/button.tsx`
- New utility class: add to `@layer utilities { }` in `globals.css`

---

## Future Scaling Suggestions

### TH — แนวทางการพัฒนาต่อ

#### Short-term (ระยะสั้น)
1. **Backend API** — แทนที่ `data.ts` ด้วย real API (Next.js Route Handlers หรือ Express)
2. **Database** — PostgreSQL + Prisma หรือ MongoDB + Mongoose
3. **Shopping Cart** — ใช้ Zustand หรือ React Context สำหรับ cart state
4. **Authentication** — NextAuth.js สำหรับ user accounts

#### Medium-term (ระยะกลาง)
5. **Payment Gateway** — PromptPay, Omise, หรือ Stripe
6. **CMS Integration** — Contentful หรือ Sanity สำหรับ product management
7. **Search** — Algolia หรือ Meilisearch สำหรับ full-text search
8. **Image Optimization** — Cloudinary หรือ Vercel Image Storage สำหรับ product images จริง

#### Long-term (ระยะยาว)
9. **Internationalization (i18n)** — next-intl สำหรับ Thai + English UI
10. **Analytics** — Vercel Analytics หรือ Google Analytics 4
11. **PWA** — next-pwa สำหรับ offline support
12. **Testing** — Vitest + React Testing Library สำหรับ unit tests, Playwright สำหรับ E2E

### EN — Scaling Roadmap

| Priority | Enhancement | Technology |
|----------|-------------|-----------|
| 1 | Replace mock data with real API | Next.js Route Handlers |
| 2 | Database integration | PostgreSQL + Prisma |
| 3 | Shopping cart state | Zustand |
| 4 | User authentication | NextAuth.js |
| 5 | Payment processing | Omise / Stripe |
| 6 | Product CMS | Sanity / Contentful |
| 7 | Full-text search | Algolia |
| 8 | Real product images | Cloudinary |
| 9 | Thai/English i18n | next-intl |
| 10 | E2E testing | Playwright |

The codebase is structured so that adding a backend is purely additive — the component tree and routing stay the same, only the data-fetching functions in `src/lib/data.ts` change.

---

## Key Architectural Decisions

### TH — การตัดสินใจสำคัญในการออกแบบ

1. **ไม่ใช้ shadcn/ui CLI** — Components ใน `src/components/ui/` เขียนเองทั้งหมด ให้ flexibility เต็มที่
2. **TailwindCSS v4 CSS-first config** — ไม่มี `tailwind.config.ts`, ทุกอย่างอยู่ใน `globals.css`
3. **Navbar แยกจาก Root Layout** — แต่ละ page import Navbar/Footer โดยตรง ให้ flexibility สูงกว่า
4. **picsum.photos seeded URLs** — ใช้ `picsum.photos/seed/<name>/600/600` เพื่อให้ภาพสม่ำเสมอและไม่ 404
5. **lucide-react v1.16.0** — ไม่มี Social Media icons จริง ใช้ Camera/Globe/Play/MessageCircle แทน
6. **FilterState แบบ flat** — ไม่ใช้ URLSearchParams เพราะ prototype stage, ง่ายต่อการ upgrade ในอนาคต

### EN — Key Decisions

1. **No shadcn CLI** — UI components are hand-built in `src/components/ui/` for full control
2. **TailwindCSS v4 CSS-first** — No config file; `@theme {}` in CSS is the v4 convention
3. **Navbar not in root layout** — Each page imports Navbar/Footer directly for layout flexibility
4. **Seeded picsum.photos** — `picsum.photos/seed/<name>` always returns the same consistent image
5. **Flat FilterState** — State not synced to URL params yet (appropriate for prototype stage)
6. **`once: true` on all FadeIn** — Scroll animations fire once, not every time the user scrolls back

---

## License

Built with passion in Thailand 🇹🇭  
© 2026 APEX. All rights reserved.
