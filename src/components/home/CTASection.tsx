"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/common/FadeIn";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Explore CTA */}
          <FadeIn direction="left">
            <div className="rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-8 sm:p-10">
              <Sparkles className="h-8 w-8 text-violet-400 mb-5" />
              <h2 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
                Find Your Perfect
                <span className="gradient-text"> Supplement Stack</span>
              </h2>
              <p className="mt-4 text-zinc-400">
                Browse 200+ products across 5 categories and 6 top brands.
                Filter by goal, flavor, and brand to find exactly what you need.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products">
                  <Button size="lg" className="group gap-2">
                    Explore Products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="outline" size="lg">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Newsletter CTA */}
          <FadeIn direction="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-violet-800/30 bg-gradient-to-br from-violet-950/50 to-zinc-900/50 p-8 sm:p-10">
              {/* BG glow */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/10 blur-2xl" />

              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-400">
                Newsletter
              </p>
              <h2 className="font-display text-3xl font-bold text-zinc-100">
                Stay Ahead of the Game
              </h2>
              <p className="mt-3 text-zinc-400">
                Get exclusive deals, new product alerts, and expert tips
                delivered straight to your inbox.
              </p>

              {submitted ? (
                <motion.div
                  className="mt-8 rounded-xl bg-violet-600/20 border border-violet-500/30 px-5 py-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-sm font-semibold text-violet-300">
                    🎉 You&apos;re subscribed! Welcome to the APEX community.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}

              <p className="mt-3 text-xs text-zinc-600">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
