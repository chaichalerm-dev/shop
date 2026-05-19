/**
 * TH:
 * CTASection — Section สุดท้ายบนหน้าแรก ก่อน Footer
 * ประกอบด้วย 2 cards แบบ side-by-side (responsive: stack → 2 cols lg)
 *
 * Card 1 — Explore CTA:
 * - Icon + heading + description + 2 buttons
 * - Slide ขึ้นจากซ้าย (direction="left")
 *
 * Card 2 — Newsletter CTA:
 * - Email subscription form
 * - State: email input, submitted flag
 * - เมื่อ submit: แสดง success message แทน form
 * - Slide ขึ้นจากขวา (direction="right")
 *
 * เป็น Client Component เพราะ:
 * 1. useState สำหรับ email input value
 * 2. useState สำหรับ submitted state
 * 3. onSubmit event handler
 * 4. Framer Motion animation บน success message
 *
 * EN:
 * CTASection — the final homepage section before the Footer.
 * Two side-by-side cards (stacked on mobile, 2-column on lg+).
 *
 * Card 1 — Explore CTA:
 * - Sparkles icon + heading + description + 2 action buttons
 * - Slides up from the left
 *
 * Card 2 — Newsletter CTA:
 * - Email subscription form with submit handler
 * - State: email value, submitted flag
 * - On submit: replaces form with animated success message
 * - Slides up from the right
 *
 * Client Component because:
 * 1. useState for email input value
 * 2. useState for submitted state (shows success message)
 * 3. onSubmit event handler
 * 4. Framer Motion animation on success message
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/common/FadeIn";

export default function CTASection() {
  /**
   * TH:
   * email — controlled input value สำหรับ newsletter form
   * submitted — toggle ระหว่าง form view และ success message view
   *
   * EN:
   * email — controlled value for the newsletter email input
   * submitted — toggles between the form view and success message view
   */
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /**
   * TH:
   * handleSubmit — handle form submission
   * e.preventDefault() — ป้องกัน page reload (default form behavior)
   * ตรวจสอบ email ว่าไม่ว่าง ก่อน set submitted
   * ใน production จะ call API endpoint สำหรับ newsletter subscription
   *
   * EN:
   * handleSubmit — form submission handler.
   * e.preventDefault() — prevents browser default page reload.
   * Validates email is non-empty before setting submitted.
   * In production, this would call a newsletter subscription API.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TH: 2 cards — stacked mobile, side-by-side lg | EN: 2-column layout on lg */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* TH: Card 1 — Explore / Browse CTAs (slide from left) | EN: Card 1 — Explore CTAs */}
          <FadeIn direction="left">
            <div className="rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-8 sm:p-10">
              <Sparkles className="h-8 w-8 text-violet-400 mb-5" />
              <h2 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
                Find Your Perfect
                {/* TH: gradient-text ใน inline span | EN: gradient text in inline span */}
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

          {/* TH: Card 2 — Newsletter form (slide from right, delay 0.1s) | EN: Card 2 — Newsletter signup */}
          <FadeIn direction="right" delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-violet-800/30 bg-gradient-to-br from-violet-950/50 to-zinc-900/50 p-8 sm:p-10">
              {/* TH: Background glow — decorative blur circle | EN: Decorative background glow */}
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

              {/**
               * TH:
               * Conditional render: submitted → success message, ไม่ submitted → form
               * success message มี motion.div animation (scale-in) เพื่อ visual feedback
               *
               * EN:
               * Conditional: submitted → animated success message, else → email form.
               * Success message uses motion.div scale animation for visual feedback.
               */}
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
