"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Shield, value: "100%", label: "Authentic Products" },
  { icon: Truck, value: "1-3 Days", label: "Fast Delivery" },
];

const floatingBadges = [
  { text: "Ghost Whey", sub: "Cereal Milk", delay: 0, x: "left-[5%]", y: "top-[20%]" },
  { text: "Gold Standard", sub: "Double Chocolate", delay: 0.2, x: "right-[8%]", y: "top-[30%]" },
  { text: "ISO100", sub: "Fruity Pebbles", delay: 0.4, x: "left-[8%]", y: "bottom-[25%]" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-zinc-950">
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/5 blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating product badges — decorative, hidden on mobile */}
      {floatingBadges.map(({ text, sub, delay, x, y }) => (
        <motion.div
          key={text}
          className={`absolute hidden xl:flex ${x} ${y} glass rounded-2xl px-4 py-3 shadow-xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: delay + 1 }}
        >
          <div>
            <p className="text-xs font-bold text-zinc-200">{text}</p>
            <p className="text-[10px] text-zinc-500">{sub}</p>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
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

          <motion.h1
            className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-zinc-100">Fuel Your</span>
            <br />
            <span className="gradient-text">Peak Performance</span>
          </motion.h1>

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

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/products">
              <Button size="xl" className="group gap-3 glow-primary">
                Shop All Products
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="xl" className="gap-2">
                Browse Categories
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
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

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
}
