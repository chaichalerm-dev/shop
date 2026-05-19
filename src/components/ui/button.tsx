/**
 * TH:
 * Button — Primitive UI component สำหรับทุก interactive button ในโปรเจกต์
 * ใช้ CVA (class-variance-authority) เพื่อจัดการ variant classes อย่างมีระบบ
 * รองรับ asChild pattern ผ่าน Radix UI Slot เพื่อ polymorphic rendering
 *
 * Variants ที่มี: default, accent, outline, ghost, glass, destructive, link
 * Sizes ที่มี: sm, default, lg, xl, icon, icon-sm
 *
 * EN:
 * Button — the foundational interactive element used throughout the project.
 * Uses CVA (class-variance-authority) for systematic variant management.
 * Supports the asChild pattern via Radix UI Slot for polymorphic rendering.
 *
 * Available variants: default, accent, outline, ghost, glass, destructive, link
 * Available sizes: sm, default, lg, xl, icon, icon-sm
 */

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * TH:
 * buttonVariants — CVA config กำหนด class ของแต่ละ variant และ size
 *
 * Base classes (ใช้กับทุก variant):
 * - inline-flex, items-center, justify-center: layout
 * - whitespace-nowrap: ไม่ตัดบรรทัดใน button text
 * - rounded-xl: border radius (14px)
 * - text-sm font-semibold: typography
 * - transition-all duration-200: smooth state transitions
 * - focus-visible: accessibility — visible focus ring สำหรับ keyboard navigation
 * - disabled: ลด opacity และ disable pointer events
 * - cursor-pointer select-none: UX improvements
 *
 * EN:
 * buttonVariants — CVA configuration mapping variants and sizes to class strings.
 *
 * Base classes (shared by all variants):
 * - flex layout for icon+text alignment
 * - rounded-xl: consistent 14px border radius
 * - focus-visible: keyboard navigation accessibility
 * - disabled states: visual indication when disabled
 * - cursor-pointer + select-none: better click UX
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        /**
         * TH: default — violet CTA button (ใช้กับ primary actions เช่น "Shop Now", "Add to Cart")
         * EN: default — violet primary CTA (used for primary actions)
         */
        default:
          "bg-violet-600 text-white hover:bg-violet-500 active:scale-[0.98] shadow-lg shadow-violet-900/30",

        /**
         * TH: accent — amber/gold button (ใช้กับ sale CTAs เช่น "Shop the Sale")
         * EN: accent — amber/gold button for sale or promotional CTAs
         */
        accent:
          "bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-[0.98] font-bold shadow-lg shadow-amber-900/30",

        /**
         * TH: outline — border button โปร่งใส (ใช้กับ secondary actions เช่น "Browse Categories")
         * EN: outline — transparent with border (secondary actions)
         */
        outline:
          "border border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 active:scale-[0.98]",

        /**
         * TH: ghost — ไม่มี border ไม่มี background (ใช้กับ icon buttons ใน Navbar)
         * EN: ghost — no border, no background (icon buttons in Navbar)
         */
        ghost:
          "bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100",

        /**
         * TH: glass — glassmorphism button (ใช้กับ Quick View overlay button)
         * EN: glass — glassmorphism button (Quick View overlay button)
         */
        glass:
          "glass text-zinc-100 hover:bg-white/10 active:scale-[0.98]",

        /**
         * TH: destructive — red สำหรับ destructive actions
         * EN: destructive — red button for dangerous actions
         */
        destructive:
          "bg-red-600 text-white hover:bg-red-500 active:scale-[0.98]",

        /**
         * TH: link — ดู link แต่เป็น button (ใช้ underline hover)
         * EN: link — looks like a text link (underline on hover)
         */
        link: "text-violet-400 underline-offset-4 hover:underline hover:text-violet-300 p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-lg",          // TH: เล็กมาก | EN: extra small
        default: "h-10 px-5 py-2",                   // TH: ขนาดมาตรฐาน | EN: standard
        lg: "h-12 px-7 text-base rounded-2xl",       // TH: ใหญ่ | EN: large
        xl: "h-14 px-9 text-lg rounded-2xl",         // TH: ใหญ่มาก (HeroSection CTAs) | EN: extra large (hero CTAs)
        icon: "h-10 w-10",                           // TH: square icon button | EN: square icon button
        "icon-sm": "h-8 w-8 rounded-lg",             // TH: small square icon | EN: small square icon
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * TH:
 * ButtonProps ขยายมาจาก React.ButtonHTMLAttributes ทำให้รับ props ของ <button> ทุกตัว
 * asChild — เมื่อ true จะใช้ Radix Slot แทน <button>
 * Slot จะ merge props ลงไปยัง child element แทน
 * ใช้เมื่อ: <Button asChild><Link href="/products">Shop</Link></Button>
 * → render เป็น <a> ด้วย styles ของ Button
 *
 * EN:
 * ButtonProps extends React.ButtonHTMLAttributes (accepts all native button props).
 * asChild — when true, uses Radix Slot instead of <button>.
 * Slot merges all props onto the child element.
 * Use case: <Button asChild><Link href="/products">Shop</Link></Button>
 * → renders as <a> with Button styles
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    /**
     * TH:
     * Comp — เลือก element type:
     * asChild=false (default) → render <button>
     * asChild=true → render Radix Slot (passes props to child)
     *
     * EN:
     * Comp — determines the rendered element:
     * asChild=false (default) → standard <button> element
     * asChild=true → Radix Slot (merges props onto first child)
     */
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
