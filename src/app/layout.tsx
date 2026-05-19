/**
 * TH:
 * Root Layout — ไฟล์นี้คือ "กรอบ" ที่ครอบทุกหน้าในโปรเจกต์
 * Next.js App Router กำหนดว่า src/app/layout.tsx จะถูก render ก่อน แล้ว children
 * จะแทนที่ตำแหน่งของ {children} ด้วย content ของแต่ละ page
 *
 * หน้าที่ของไฟล์นี้:
 * 1. โหลด fonts (Inter + Space Grotesk) และผูกกับ CSS variables
 * 2. กำหนด metadata (SEO) ระดับ site-wide
 * 3. กำหนด viewport settings
 * 4. สร้าง HTML shell (<html>, <body>) ที่ใช้ร่วมกันทุกหน้า
 *
 * EN:
 * Root Layout — this file is the "frame" that wraps every page in the project.
 * Next.js App Router renders this layout first, then injects each page's content
 * into the {children} slot.
 *
 * Responsibilities:
 * 1. Load and configure Google Fonts (Inter + Space Grotesk)
 * 2. Define site-wide SEO metadata
 * 3. Configure viewport settings
 * 4. Provide the shared HTML shell (<html>, <body>) for all pages
 */

import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

/**
 * TH:
 * Inter — font สำหรับ body text ทั่วไป
 * variable: "--font-inter" ทำให้ใช้ใน CSS ด้วย var(--font-inter)
 * display: "swap" ป้องกัน FOIT (Flash of Invisible Text) โดยแสดง fallback font ก่อน
 *
 * EN:
 * Inter — the body text font loaded via next/font/google for zero layout shift.
 * variable: "--font-inter" exposes it as a CSS custom property.
 * display: "swap" prevents invisible text while the font loads (FOIT prevention).
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * TH:
 * Space Grotesk — font สำหรับ headings และ display text
 * ใช้กับ class "font-display" ซึ่ง globals.css map ไว้กับ --font-space-grotesk
 * weight ที่เลือก: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
 *
 * EN:
 * Space Grotesk — the display/heading font. Applied via the "font-display" Tailwind class
 * which maps to --font-space-grotesk defined in globals.css @theme.
 * Only the needed weights are loaded to minimize bundle size.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/**
 * TH:
 * Metadata — กำหนด SEO metadata ระดับ site-wide
 * title.template: "%s | APEX" หมายความว่าแต่ละหน้าที่ export title จะได้ " | APEX" ต่อท้าย
 * ตัวอย่าง: product detail export title: "Ghost Legend" → browser แสดง "Ghost Legend | APEX"
 *
 * openGraph — สำหรับ social sharing (Facebook, Twitter, Line)
 * locale: "th_TH" บอก social crawlers ว่าเนื้อหาเป็นภาษาไทย
 *
 * EN:
 * Metadata — site-wide SEO configuration exported for Next.js to inject into <head>.
 * title.template: "%s | APEX" automatically appends " | APEX" to every child page title.
 * Example: a product page returning title "Ghost Legend" → displays "Ghost Legend | APEX".
 *
 * openGraph locale: "th_TH" tells social media crawlers this is Thai-language content.
 */
export const metadata: Metadata = {
  title: {
    default: "APEX — Premium Supplement & Wellness Store",
    template: "%s | APEX",
  },
  description:
    "Thailand's premier destination for premium sports nutrition, protein, pre-workouts, and wellness supplements from top global brands.",
  keywords: [
    "protein powder",
    "pre-workout",
    "supplements",
    "sports nutrition",
    "Ghost",
    "Optimum Nutrition",
    "Dymatize",
    "Thailand",
  ],
  authors: [{ name: "APEX" }],
  creator: "APEX",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "APEX",
    title: "APEX — Premium Supplement & Wellness Store",
    description: "Thailand's premier destination for premium sports nutrition.",
  },
  robots: { index: true, follow: true },
};

/**
 * TH:
 * Viewport — กำหนด viewport settings แยกต่างหากจาก metadata (Next.js >=14 บังคับให้แยก)
 * themeColor: "#09090f" ทำให้ browser chrome บนมือถือ Android มีสีเข้มตาม theme
 *
 * EN:
 * Viewport — viewport configuration is separated from metadata in Next.js >=14.
 * themeColor colors the browser chrome on Android devices to match the dark theme.
 */
export const viewport: Viewport = {
  themeColor: "#09090f",
  width: "device-width",
  initialScale: 1,
};

/**
 * TH:
 * RootLayout — React component ที่ครอบทุก page
 * font variables inject เป็น className บน <html> ทำให้ CSS variables พร้อมใช้งานทั่ว DOM
 * lang="th" บอก screen readers และ SEO crawlers ว่าเนื้อหาเป็นภาษาไทย
 * body: flex + min-h-screen ทำให้ Footer ถูก push ลงล่างสุดเสมอ (sticky footer pattern)
 *
 * EN:
 * RootLayout — the React component that wraps every page.
 * Font variables are injected as className on <html> making CSS variables available globally.
 * lang="th" declares Thai as the primary language for accessibility and SEO.
 * body: flex + min-h-screen implements the sticky footer pattern.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
