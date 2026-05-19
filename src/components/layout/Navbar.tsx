/**
 * TH:
 * Navbar — Navigation bar หลักของเว็บไซต์
 * เป็น Client Component เพราะต้องการ:
 * 1. useEffect สำหรับ scroll detection (transparent → glass transition)
 * 2. useState สำหรับ mobile menu state
 * 3. usePathname สำหรับ active link detection
 *
 * พฤติกรรม:
 * - Position: fixed ค้างอยู่ด้านบนเสมอ (z-50)
 * - บน hero: transparent background
 * - เมื่อ scroll > 20px: glassmorphism background (glass-strong)
 * - Desktop: horizontal nav links + Search button + Shop Now button
 * - Mobile: hamburger button → MobileMenu drawer (slide-in จากขวา)
 * - Active link: violet color + animated underline indicator (layoutId)
 *
 * EN:
 * Navbar — the primary site navigation bar.
 * Must be a Client Component because it uses:
 * 1. useEffect for scroll detection (transparent → glass transition)
 * 2. useState for mobile menu open/close
 * 3. usePathname for active link highlighting
 *
 * Behavior:
 * - Fixed position at top of viewport (z-50)
 * - At hero: transparent background
 * - After scrolling > 20px: glassmorphism background (glass-strong class)
 * - Desktop: horizontal links + Search icon + "Shop Now" button
 * - Mobile: hamburger → MobileMenu slide-in drawer
 * - Active link: violet text + Framer Motion layout animation indicator
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

/**
 * TH:
 * navLinks — array ของ navigation links
 * กำหนดที่นี่แทน hardcode ใน JSX เพื่อให้ส่งต่อไปยัง MobileMenu ได้
 * { label: แสดงบนหน้าจอ, href: URL path }
 *
 * EN:
 * navLinks — centralized navigation link definitions.
 * Defined here (not hardcoded in JSX) so they can be passed to MobileMenu too.
 */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * TH:
   * Scroll listener — เปลี่ยน navbar style เมื่อ scroll > 20px
   * passive: true — ปรับปรุง performance โดยบอก browser ว่า event handler
   * จะไม่เรียก preventDefault() ทำให้ scroll smoother
   * Cleanup: remove listener เมื่อ component unmount ป้องกัน memory leak
   *
   * EN:
   * Scroll listener — toggles glass background when scrolled > 20px.
   * passive: true improves scroll performance by telling the browser
   * we won't call preventDefault(), allowing it to optimize scroll.
   * Cleanup: removes listener on unmount to prevent memory leaks.
   */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /**
   * TH:
   * Auto-close mobile menu เมื่อ pathname เปลี่ยน (user navigate ไปหน้าอื่น)
   * ป้องกัน menu ค้างเปิดหลัง navigation
   *
   * EN:
   * Auto-close mobile menu on pathname change (user navigated to a new page).
   * Prevents the menu from staying open after navigation.
   */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/**
       * TH:
       * motion.header — header element ที่มี animation เมื่อ mount
       * initial={{ y: -80 }} → เริ่มที่ 80px บน viewport
       * animate={{ y: 0 }} → เลื่อนลงมาอยู่ตำแหน่งปกติ
       * transition: custom easing curve [0.21, 0.47, 0.32, 0.98] = smooth ease-out
       *
       * EN:
       * motion.header — animates in from above on mount.
       * Slides down from -80px to its final position with a smooth ease-out curve.
       */}
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-xl shadow-black/30"  // TH: scroll state | EN: scrolled state
            : "bg-transparent"                          // TH: top state | EN: at top
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* TH: Logo — Zap icon + "APEX" text | EN: Logo — Zap icon + APEX wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Zap className="h-4 w-4 text-white" fill="white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-zinc-100">
              APEX
            </span>
          </Link>

          {/* TH: Desktop nav links — hidden บน mobile (<md) | EN: Desktop nav links — hidden on mobile */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              /**
               * TH:
               * active detection: Home "/" ต้อง exact match
               * ส่วน links อื่น (/products, /categories, /brands) ใช้ startsWith
               * เพื่อให้ sub-pages เช่น /products/ghost-legend ยังแสดง Products เป็น active
               *
               * EN:
               * active detection: "/" requires exact match to avoid false positives.
               * Other links use startsWith so sub-pages like /products/ghost-legend
               * still highlight "Products" as active.
               */
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-violet-300"
                      : "text-zinc-400 hover:text-zinc-100"
                  )}
                >
                  {/**
                   * TH:
                   * layoutId="nav-active" — Framer Motion layout animation
                   * เมื่อ active link เปลี่ยน Framer Motion จะ animate background indicator
                   * เลื่อนจาก link เดิมไปยัง link ใหม่แบบ smooth
                   *
                   * EN:
                   * layoutId="nav-active" — Framer Motion shared layout animation.
                   * When the active link changes, the indicator smoothly slides
                   * from the old active link to the new one.
                   */}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-violet-600/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* TH: Action buttons — Search, Shop Now, Mobile menu toggle | EN: Action buttons */}
          <div className="flex items-center gap-2">
            {/* TH: Search icon → navigate ไปหน้า products | EN: Search icon → navigates to products page */}
            <Link href="/products?search=true">
              <Button variant="ghost" size="icon" aria-label="Search products">
                <Search className="h-4 w-4" />
              </Button>
            </Link>

            {/* TH: Shop Now button — hidden บน xs (มือถือเล็ก) | EN: Shop Now — hidden on xs screens */}
            <Link href="/products" className="hidden sm:flex">
              <Button variant="default" size="sm" className="gap-2">
                <ShoppingBag className="h-3.5 w-3.5" />
                Shop Now
              </Button>
            </Link>

            {/* TH: Hamburger button — แสดงเฉพาะ mobile (<md) | EN: Hamburger — visible only on mobile */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* TH: MobileMenu — drawer ที่ slide-in จากขวา | EN: MobileMenu — slide-in drawer from right */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  );
}
