/**
 * TH:
 * ไฟล์นี้รวบรวม utility functions ที่ใช้บ่อยทั่วทั้งโปรเจกต์
 * ทุก function เป็น pure function (ไม่มี side effects) และ reusable
 * Import ด้วย: import { cn, formatPrice, slugify } from "@/lib/utils"
 *
 * EN:
 * This file contains shared utility functions used throughout the project.
 * All functions are pure (no side effects) and can be imported anywhere.
 * Import: import { cn, formatPrice, slugify } from "@/lib/utils"
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * TH:
 * cn() — ฟังก์ชัน helper สำหรับรวม CSS class names
 * ใช้ clsx() เพื่อ handle conditional classes แล้วส่งผ่าน twMerge() เพื่อ resolve
 * TailwindCSS conflicts (เช่น "px-4 px-6" → "px-6")
 *
 * การใช้งาน:
 *   cn("base-class", isActive && "active-class", className)
 *   cn("text-sm", variant === "lg" && "text-lg")
 *
 * EN:
 * cn() — class name merging helper.
 * Combines clsx (conditional class logic) with tailwind-merge (conflict resolution).
 * Without twMerge, two conflicting Tailwind classes like "px-4 px-6" would both
 * be applied; twMerge resolves them to the last one ("px-6").
 *
 * Usage:
 *   cn("base-class", isActive && "active-class", className)
 *   cn("text-sm", variant === "lg" && "text-lg")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * TH:
 * formatPrice() — แปลงตัวเลขราคาเป็น string สกุลเงินบาทไทย
 * ใช้ Intl.NumberFormat ซึ่งเป็น built-in browser API สำหรับ localization
 * ผลลัพธ์: 1890 → "฿1,890" (ไม่มีทศนิยม)
 *
 * EN:
 * formatPrice() — formats a number into Thai Baht currency string.
 * Uses the native Intl.NumberFormat API for locale-aware formatting.
 * Result: 1890 → "฿1,890" (no decimal places by design for clean display).
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,  // TH: ไม่แสดงสตางค์ | EN: no cents/satang displayed
  }).format(price);
}

/**
 * TH:
 * slugify() — แปลง string เป็น URL-safe slug
 * ใช้สำหรับสร้าง slug จาก product/category/brand names
 * ขั้นตอน: lowercase → spaces to hyphens → remove special chars → dedupe hyphens → trim
 *
 * ตัวอย่าง:
 *   slugify("Ghost Legend Pre-Workout") → "ghost-legend-pre-workout"
 *   slugify("  Multiple   Spaces  ") → "multiple-spaces"
 *
 * EN:
 * slugify() — converts a string into a URL-safe slug.
 * Used for generating slugs from human-readable names.
 * Steps: lowercase → spaces to hyphens → remove non-word chars → collapse hyphens → trim.
 *
 * Examples:
 *   slugify("Ghost Legend Pre-Workout") → "ghost-legend-pre-workout"
 *   slugify("  Multiple   Spaces  ") → "multiple-spaces"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")         // TH: แทน whitespace ด้วย hyphen | EN: replace whitespace with hyphen
    .replace(/[^\w-]+/g, "")      // TH: ลบอักขระที่ไม่ใช่ word char หรือ hyphen | EN: remove non-word, non-hyphen chars
    .replace(/--+/g, "-")         // TH: รวม hyphens หลายตัวเป็นตัวเดียว | EN: collapse multiple hyphens
    .trim();
}

/**
 * TH:
 * capitalize() — ทำให้อักษรตัวแรกเป็นตัวพิมพ์ใหญ่
 * ใช้สำหรับ display formatting ทั่วไป
 *
 * EN:
 * capitalize() — capitalizes the first character of a string.
 * Utility for display formatting.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * TH:
 * truncate() — ตัด string ให้สั้นลงและต่อด้วย ellipsis (…)
 * ใช้สำหรับ product descriptions ที่ยาวเกินไป
 * ถ้า text สั้นกว่า maxLength อยู่แล้ว จะ return ตามเดิม
 *
 * ตัวอย่าง:
 *   truncate("Hello World", 8) → "Hello W…"
 *   truncate("Hi", 10) → "Hi"
 *
 * EN:
 * truncate() — shortens a string to maxLength and appends an ellipsis (…).
 * Used for product description previews.
 * If text is already shorter than maxLength, it returns unchanged.
 *
 * Examples:
 *   truncate("Hello World", 8) → "Hello W…"
 *   truncate("Hi", 10) → "Hi"
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
