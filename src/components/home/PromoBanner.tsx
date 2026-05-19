"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag, Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/common/FadeIn";

const perks = [
  { icon: Truck, title: "Free Shipping", desc: "Orders over ฿1,500" },
  { icon: Tag, title: "Best Price Guarantee", desc: "Price match on all items" },
  { icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free returns" },
  { icon: Headphones, title: "Expert Support", desc: "Nutrition advice 24/7" },
];

export default function PromoBanner() {
  return (
    <>
      {/* Perks strip */}
      <section className="border-y border-zinc-800/60 bg-zinc-900/20 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {perks.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08} direction="up">
                <div className="flex items-start gap-3">
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

      {/* Hero Promo Banner */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background */}
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

              {/* Content */}
              <div className="relative px-8 py-16 sm:px-16 sm:py-20 lg:px-20">
                <div className="max-w-2xl">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-200/70">
                    Limited Time Offer
                  </p>
                  <motion.h2
                    className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Up to{" "}
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
