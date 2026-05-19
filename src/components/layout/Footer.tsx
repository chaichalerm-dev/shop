/**
 * TH:
 * Footer — ส่วนล่างสุดของทุกหน้า
 * เป็น Server Component (ไม่มี "use client") เพราะไม่มี interactivity
 * โครงสร้าง:
 * - Brand column: logo + tagline + social links
 * - Link columns: Shop, Brands, Company, Support (4 columns)
 * - Bottom row: copyright + "Built with passion in Thailand"
 *
 * หมายเหตุ: Social media icons ใช้ Camera/Globe/Play/MessageCircle
 * เป็น proxy เพราะ lucide-react v1.16.0 ไม่มี Instagram/Facebook/YouTube/Twitter icons
 *
 * EN:
 * Footer — the site-wide bottom section present on every page.
 * Server Component (no "use client") — no interactivity needed.
 * Structure:
 * - Brand column: logo, tagline, social links
 * - Link columns: Shop, Brands, Company, Support (4 cols)
 * - Bottom row: copyright and attribution
 *
 * Note: Social icons use Camera/Globe/Play/MessageCircle as stand-ins
 * because lucide-react v1.16.0 lacks the actual social media brand icons.
 */

import Link from "next/link";
import { Zap, Camera, Globe, Play, MessageCircle } from "lucide-react";

/**
 * TH:
 * footerLinks — link groups ทั้งหมดในรูปแบบ object
 * key = ชื่อ group (แสดงเป็น column header)
 * value = array ของ { label, href }
 *
 * EN:
 * footerLinks — all link groups as an object.
 * Key = group name (rendered as column header)
 * Value = array of { label, href } link objects
 */
const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Pre-Workout", href: "/categories/pre-workout" },
    { label: "Protein", href: "/categories/protein" },
    { label: "Amino Acids", href: "/categories/amino-acids" },
    { label: "Energy Drinks", href: "/categories/energy-drinks" },
  ],
  Brands: [
    { label: "Ghost", href: "/brands/ghost" },
    { label: "Optimum Nutrition", href: "/brands/optimum-nutrition" },
    { label: "Dymatize", href: "/brands/dymatize" },
    { label: "Myprotein", href: "/brands/myprotein" },
    { label: "Prime Hydration", href: "/brands/prime-hydration" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

/**
 * TH:
 * socialLinks — Social media links พร้อม icon component และ label สำหรับ accessibility
 * icon: Camera ≈ Instagram, Globe ≈ Facebook, Play ≈ YouTube, MessageCircle ≈ Twitter/X
 *
 * EN:
 * socialLinks — social media links with icon components and accessible labels.
 * Camera ≈ Instagram, Globe ≈ Facebook, Play ≈ YouTube, MessageCircle ≈ Twitter/X
 */
const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
  { icon: MessageCircle, label: "X / Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* TH: Top Row — Brand column + 4 link columns | EN: Top Row — brand info + link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">

          {/* TH: Brand column — ครอบ 2 columns | EN: Brand column — spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Zap className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-bold text-zinc-100">APEX</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Thailand&apos;s premier destination for premium sports nutrition
              and wellness supplements from top global brands.
            </p>

            {/* TH: Social links — icon buttons รอบ | EN: Social icon links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}  // TH: สำหรับ screen readers | EN: for screen readers
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* TH: Link columns — loop ผ่าน footerLinks object | EN: Link columns — mapped from footerLinks object */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              {/* TH: Column header — uppercase, tracked | EN: Column header */}
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TH: Bottom Row — copyright + attribution | EN: Bottom Row — copyright and attribution */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/60 pt-8 sm:flex-row">
          {/* TH: ใช้ new Date().getFullYear() เพื่อ auto-update ปี | EN: auto-updating copyright year */}
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} APEX. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Built with passion in Thailand 🇹🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
