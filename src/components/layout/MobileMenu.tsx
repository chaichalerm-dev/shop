/**
 * TH:
 * MobileMenu — Drawer navigation สำหรับ mobile (<768px)
 * เป็น Client Component ที่รับ state จาก Navbar และ render drawer overlay
 *
 * โครงสร้าง:
 * 1. Backdrop — overlay สีดำโปร่งใส ปิด menu เมื่อ click
 * 2. Drawer — panel สีขาวจากขวาพร้อม nav links
 * 3. AnimatePresence — handle mount/unmount animations (enter + exit)
 *
 * Animation:
 * - Backdrop: opacity 0 → 1 (fade in) / 1 → 0 (fade out)
 * - Drawer: x: "100%" → 0 (slide in from right) / 0 → "100%" (slide out)
 * - Nav links: stagger entrance (delay={i * 0.05 + 0.1})
 *
 * EN:
 * MobileMenu — slide-in drawer navigation for mobile (<768px viewports).
 * Receives open state from Navbar and renders an overlay drawer.
 *
 * Structure:
 * 1. Backdrop — semi-transparent overlay that closes the menu on click
 * 2. Drawer — panel from the right with nav links
 * 3. AnimatePresence — handles enter and exit animations
 *
 * Animation:
 * - Backdrop: opacity fade
 * - Drawer: slide in/out from right edge
 * - Nav links: staggered entrance with delay per item
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * TH:
 * Props:
 * isOpen — ควบคุมการแสดง/ซ่อน drawer (managed by Navbar)
 * onClose — callback เมื่อ user ต้องการปิด (click backdrop, click X, click link)
 * links — array ของ nav links รับมาจาก Navbar (single source of truth)
 * pathname — current URL path สำหรับ active link detection
 *
 * EN:
 * Props:
 * isOpen — controls drawer visibility (state owned by Navbar)
 * onClose — callback called when user wants to close (backdrop click, X, link click)
 * links — nav link array passed from Navbar (single source of truth)
 * pathname — current URL path for active link highlighting
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  pathname: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  pathname,
}: MobileMenuProps) {
  return (
    /**
     * TH:
     * AnimatePresence — จำเป็นสำหรับ exit animations
     * โดยปกติ React unmount element ทันทีเมื่อ condition เป็น false
     * AnimatePresence บอก Framer Motion ให้รอ exit animation เสร็จก่อน unmount
     *
     * EN:
     * AnimatePresence — required to enable exit animations.
     * Without it, React removes the element immediately when isOpen becomes false.
     * AnimatePresence waits for the exit animation to complete before unmounting.
     */
    <AnimatePresence>
      {isOpen && (
        <>
          {/* TH: Backdrop — คลิกเพื่อปิด menu | EN: Backdrop — click to close */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* TH: Drawer panel — slide in จากขวา | EN: Drawer panel — slides in from right */}
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-zinc-950 shadow-2xl"
            initial={{ x: "100%" }}    // TH: เริ่มนอก viewport ทางขวา | EN: starts off-screen right
            animate={{ x: 0 }}         // TH: เลื่อนเข้ามา | EN: slides in to position
            exit={{ x: "100%" }}       // TH: เลื่อนออกเมื่อปิด | EN: slides out on close
            transition={{ type: "spring", damping: 28, stiffness: 280 }}  // TH: spring animation | EN: spring physics
          >
            {/* TH: Drawer header — logo + close button | EN: Drawer header — logo and close */}
            <div className="flex items-center justify-between border-b border-zinc-800/60 p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
                  <Zap className="h-3.5 w-3.5 text-white" fill="white" />
                </div>
                <span className="font-display text-lg font-bold text-zinc-100">APEX</span>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* TH: Nav links — stagger animation (delay เพิ่มขึ้นทีละ link) | EN: Nav links — stagger entrance */}
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link, i) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  /**
                   * TH:
                   * motion.div wrapper สำหรับ stagger effect ของแต่ละ link
                   * delay: i * 0.05 + 0.1 → link แรก 0.1s, ที่สอง 0.15s, ที่สาม 0.2s
                   * ให้ความรู้สึก links "ไหลเข้ามา" ทีละอัน
                   *
                   * EN:
                   * motion.div adds staggered entrance per link.
                   * delay: i * 0.05 + 0.1 → first link at 0.1s, second at 0.15s, etc.
                   * Creates a cascading "flowing in" visual effect.
                   */
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}  // TH: ปิด menu เมื่อ navigate | EN: close on navigation
                      className={cn(
                        "flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors",
                        active
                          ? "bg-violet-600/15 text-violet-300"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* TH: Footer CTA — "Shop All Products" button ที่ด้านล่างสุดของ drawer | EN: Sticky CTA at drawer bottom */}
            <div className="mt-auto border-t border-zinc-800/60 p-5">
              <Link href="/products" onClick={onClose}>
                <Button variant="default" size="lg" className="w-full gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Shop All Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
