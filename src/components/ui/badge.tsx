/**
 * TH:
 * Badge — Primitive UI component สำหรับ labels และ status indicators
 * ใช้ CVA เช่นเดียวกับ Button สำหรับจัดการ variants
 * ใช้กับ: product badges ("Best Seller"), discount badges ("-30%"),
 *          country labels ("USA"), category labels, brand featured labels
 *
 * EN:
 * Badge — small label component for status indicators and categorical tags.
 * Uses CVA like Button for consistent variant management.
 * Used for: product badges ("Best Seller"), discount labels ("-30%"),
 *           country tags ("USA"), category indicators, brand featured labels.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * TH:
 * badgeVariants — CVA config สำหรับ Badge
 * Base classes: inline-flex, gap-1 (สำหรับ icon + text), rounded-full,
 *               px-2.5 py-0.5 (compact padding), text-xs (เล็ก), font-semibold
 *
 * Variants:
 * default — violet (product badges, active states)
 * accent — amber/gold (sale badges, discount percentages)
 * success — emerald (in-stock, positive states)
 * destructive — red (out-of-stock, warnings)
 * outline — border only (country labels, neutral info)
 * glass — glassmorphism (hero badge)
 *
 * EN:
 * badgeVariants — CVA config for Badge component.
 * Base: compact pill shape with gap for optional icon+text layout.
 *
 * Variants:
 * default — violet (product badges, active navigation)
 * accent — amber/gold (sale price, discount %)
 * success — emerald (positive status)
 * destructive — red (out-of-stock, warnings)
 * outline — border only, no fill (country labels, neutral metadata)
 * glass — glassmorphism (used on hero section badge)
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-violet-600/20 text-violet-300 border border-violet-500/30",
        accent: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
        success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        destructive: "bg-red-500/20 text-red-300 border border-red-500/30",
        outline: "border border-zinc-700 text-zinc-400",
        glass: "glass text-zinc-200",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

/**
 * TH:
 * BadgeProps ขยายมาจาก HTMLAttributes<HTMLDivElement>
 * Badge render เป็น <div> (ไม่ใช่ <span>) เพื่อรองรับ block-level children
 * ถ้าต้องการ inline ให้เพิ่ม inline-flex ใน className
 *
 * EN:
 * BadgeProps extends HTMLAttributes<HTMLDivElement>.
 * Badge renders as <div> (not <span>) to support complex children.
 * For inline use, pass "inline-flex" in className.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
