/**
 * TH:
 * PromoBanner — Component ที่ประกอบด้วย 2 ส่วน:
 * 1. Perks Strip — แถบแสดง 4 selling points (Shipping, Price, Returns, Support)
 * 2. Hero Promo Banner — banner สีม่วงขนาดใหญ่สำหรับ promotion
 *
 * เป็น Client Component เพราะต้องการ Framer Motion (motion.h2 ใน banner)
 * ทั้งสองส่วนนี้ render เป็น fragment (<>) โดยไม่มี wrapper element
 *
 * Perks Strip:
 * - Grid 2→4 columns
 * - icon + title + description ต่อ perk
 * - FadeIn stagger animation
 *
 * Hero Banner:
 * - gradient-primary background + radial gradient overlay + grid overlay
 * - motion.h2 ใช้ whileInView (scroll-triggered) แทน initial/animate
 * - 2 CTA buttons: "Shop the Sale" (accent) + "Browse Categories" (glass)
 *
 * EN:
 * PromoBanner — renders two components in sequence:
 * 1. Perks Strip — 4 selling points bar (Shipping, Price, Returns, Support)
 * 2. Hero Promo Banner — large violet promotional banner
 *
 * Client Component because it uses Framer Motion (motion.h2 inside the banner).
 * Both sections are siblings in a fragment, not wrapped.
 *
 * Perks Strip:
 * - 2→4 column responsive grid
 * - icon + title + description per perk
 * - Staggered FadeIn animations
 *
 * Hero Banner:
 * - gradient-primary + radial overlay + grid overlay for depth
 * - motion.h2 uses whileInView (scroll-triggered, not mount-triggered)
 * - Two CTAs: "Shop the Sale" (accent amber) + "Browse Categories" (glass)
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag, Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/common/FadeIn";

/**
 * TH:
 * perks — selling points ที่แสดงใน perks strip
 * icon: Lucide icon component
 * title: ชื่อสั้นๆ
 * desc: คำอธิบายเพิ่มเติม
 *
 * EN:
 * perks — selling point data for the perks strip.
 * icon: Lucide icon component reference
 * title: short label
 * desc: additional detail
 */
const perks = [
  { icon: Truck, title: "Free Shipping", desc: "Orders over ฿1,500" },
  { icon: Tag, title: "Best Price Guarantee", desc: "Price match on all items" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns" },
  { icon: Headphones, title: "Expert Support", desc: "Nutrition advice 24/7" },
];

export default function PromoBanner() {
  return (
    <>
      {/* TH: Perks strip — horizontal bar ด้านบน | EN: Perks strip — trust-building bar */}
      <section className="border-y border-zinc-800/60 bg-zinc-900/20 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TH: 2 columns mobile, 4 columns sm+ | EN: 2→4 column grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08} direction="up">
                <div className="flex items-start gap-3">
                  {/* TH: Icon container — violet tinted background | EN: Violet tinted icon container */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600/10">
                    <Icon className="h-4.5 w-4.5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{title}</p>
                    <p className="text-xs text-zinc-500">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TH: Hero Promo Banner — violet gradient card | EN: Large violet promotional banner */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              {/* TH: Background layers — gradient + radial highlights + subtle grid | EN: Layered background */}
              <div className="absolute inset-0 gradient-primary" />
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)",
                }}
              />
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* TH: Content — left-aligned บน background | EN: Content overlaid on background */}
              <div className="relative px-8 py-16 sm:px-16 sm:py-20 lg:px-20">
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-200/70">
                    Limited Time Offer
                  </p>

                  {/**
                   * TH:
                   * motion.h2 ใช้ whileInView ไม่ใช่ initial/animate
                   * เพราะ banner อยู่ใต้ fold — ต้อง animate เมื่อ scroll ถึง
                   * viewport={{ once: true }} — เล่นครั้งเดียว
                   *
                   * EN:
                   * motion.h2 uses whileInView (not initial/animate).
                   * The banner is below the fold — triggers on scroll, not page load.
                   * viewport={{ once: true }} — plays once, doesn't repeat on scroll back.
                   */}
                  <motion.h2
                    className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Up to{" "}
                    {/* TH: accent color (amber) highlight ใน headline | EN: amber accent highlight in headline */}
                    <span className="text-amber-300">30% OFF</span>
                    <br />
                    Bestsellers
                  </motion.h2>
                  <p className="mt-5 text-lg text-violet-100/80">
                    Stock up on your favorite proteins, pre-workouts, and amino
                    acids. Sale ends Sunday midnight.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/products">
                      {/* TH: accent (amber) CTA | EN: Amber accent primary CTA */}
                      <Button
                        size="lg"
                        variant="accent"
                        className="group gap-2"
                      >
                        Shop the Sale
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Link href="/categories">
                      {/* TH: Glass button บน violet background | EN: Glass button on violet background */}
                      <Button
                        size="lg"
                        className="border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur"
                      >
                        Browse Categories
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
