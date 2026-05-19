/**
 * TH:
 * HeroSection — Section แรกที่ user เห็น เต็มหน้าจอ (min-h-screen)
 * เป็น Client Component เพราะใช้ Framer Motion animations
 *
 * โครงสร้าง visual:
 * 1. Background: gradient orbs (violet glow) + grid pattern + noise texture
 * 2. Floating product badges: แสดงเฉพาะ xl+ (widescreen)
 * 3. Content: badge → h1 → description → CTA buttons → stats
 * 4. Bottom fade: gradient fade สู่พื้นหลังด้านล่าง
 *
 * Animation pattern:
 * - ทุก element ใช้ initial/animate (ไม่ใช่ whileInView) เพราะ hero ต้อง animate ทันทีที่โหลด
 * - stagger delay เพิ่มขึ้น 0.1s ต่อ element: badge (0), h1 (0.1), p (0.2), buttons (0.3), stats (0.5)
 *
 * EN:
 * HeroSection — the first full-screen section the user sees.
 * Client Component because it uses Framer Motion animations.
 *
 * Visual structure:
 * 1. Background: ambient gradient orbs + subtle grid + noise overlay
 * 2. Floating product badges: decorative, visible only on xl+ viewports
 * 3. Content: badge → h1 → description → CTA buttons → trust stats
 * 4. Bottom fade: gradient fade into the next section
 *
 * Animation pattern:
 * - All elements use initial/animate (not whileInView) — hero must animate immediately on load
 * - Staggered delays: badge (0s), h1 (0.1s), p (0.2s), buttons (0.3s), stats (0.5s)
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * TH:
 * stats — ตัวเลข trust signals แสดงใต้ CTA buttons
 * ใช้ icon component เป็น property แทน string เพื่อ type safety
 *
 * EN:
 * stats — trust-building metrics displayed below the CTA buttons.
 * Using icon component as a property provides type safety vs string icon names.
 */
const stats = [
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Shield, value: "100%", label: "Authentic Products" },
  { icon: Truck, value: "1-3 Days", label: "Fast Delivery" },
];

/**
 * TH:
 * floatingBadges — decorative product badges ที่ลอยอยู่รอบๆ hero
 * แสดงเฉพาะ xl: (>=1280px) เพราะมือถือมีพื้นที่ไม่พอ
 * delay — stagger การ appear ของแต่ละ badge
 * x, y — position classes (Tailwind) สำหรับ absolute positioning
 *
 * EN:
 * floatingBadges — decorative product name tags floating around the hero.
 * Only visible at xl+ (≥1280px) — mobile screens lack space.
 * delay — stagger offset for each badge's appearance
 * x, y — Tailwind position class strings for absolute positioning
 */
const floatingBadges = [
  { text: "Ghost Whey", sub: "Cereal Milk", delay: 0, x: "left-[5%]", y: "top-[20%]" },
  { text: "Gold Standard", sub: "Double Chocolate", delay: 0.2, x: "right-[8%]", y: "top-[30%]" },
  { text: "ISO100", sub: "Fruity Pebbles", delay: 0.4, x: "left-[8%]", y: "bottom-[25%]" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* TH: Background layer — gradient orbs + grid | EN: Background layer */}
      <div className="absolute inset-0 bg-zinc-950">
        {/**
         * TH:
         * Gradient orbs — circles ที่ blur มากๆ สร้าง ambient glow
         * ใช้ blur-[120px] เพื่อ diffuse สีออกแบบ soft
         * opacity ต่ำ (10%, 8%, 5%) ให้ subtle ไม่ overwhelming
         *
         * EN:
         * Gradient orbs — heavily blurred circles creating ambient light effects.
         * Large blur-[120px] diffuses the color softly across a large area.
         * Low opacity keeps the effect subtle and non-distracting.
         */}
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/5 blur-[80px]" />

        {/* TH: Grid overlay — ตาราง subtle ให้ความรู้สึก tech/premium | EN: Subtle grid overlay for tech/premium aesthetic */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* TH: Floating product badges — decorative, xl+ only | EN: Decorative floating badges — xl+ only */}
      {floatingBadges.map(({ text, sub, delay, x, y }) => (
        <motion.div
          key={text}
          className={`absolute hidden xl:flex ${x} ${y} glass rounded-2xl px-4 py-3 shadow-xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 1 }}  // TH: +1 เพื่อให้ badge appear หลัง content | EN: +1 delay so badges appear after content
        >
          <div>
            <p className="text-xs font-bold text-zinc-200">{text}</p>
            <p className="text-[10px] text-zinc-500">{sub}</p>
          </div>
        </motion.div>
      ))}

      {/* TH: Main content — centered, max-w-4xl | EN: Main content — centered, constrained width */}
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          {/* TH: Top badge — "Thailand's #1 Premium Supplement Store" | EN: Top credibility badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="glass" className="mb-6 text-xs">
              <Zap className="h-3 w-3 text-amber-400" fill="currentColor" />
              Thailand&apos;s #1 Premium Supplement Store
            </Badge>
          </motion.div>

          {/* TH: H1 — หัวข้อหลัก responsive (5xl → 6xl → 8xl) | EN: Main headline — responsive sizes */}
          <motion.h1
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-zinc-100">Fuel Your</span>
            <br />
            {/* TH: gradient-text class ทำให้ text มีสี gradient violet | EN: gradient-text applies violet gradient fill */}
            <span className="gradient-text">Peak Performance</span>
          </motion.h1>

          {/* TH: Description paragraph | EN: Supporting description */}
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium sports nutrition from the world&apos;s top brands. Ghost,
            Optimum Nutrition, Dymatize, Myprotein, and more — all authentic,
            all delivered fast to your door.
          </motion.p>

          {/* TH: CTA buttons — primary + secondary | EN: CTA button pair */}
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/products">
              {/* TH: glow-primary เพิ่ม box-shadow สีม่วง | EN: glow-primary adds violet box-shadow glow */}
              <Button size="xl" className="group gap-3 glow-primary">
                Shop All Products
                {/* TH: Arrow เลื่อนขวาเมื่อ hover ผ่าน group-hover | EN: Arrow slides right on group hover */}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="xl" className="gap-2">
                Browse Categories
              </Button>
            </Link>
          </motion.div>

          {/* TH: Trust stats — Rating, Authenticity, Delivery | EN: Trust-building stats row */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80">
                  <Icon className="h-4.5 w-4.5 text-violet-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-zinc-100">{value}</p>
                  <p className="text-xs text-zinc-500">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* TH: Bottom fade — gradient เชื่อมต่อกับ section ถัดไป | EN: Bottom gradient fade into the next section */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
}
