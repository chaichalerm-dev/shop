/**
 * TH:
 * Skeleton — Loading placeholder component
 * ใช้ animate-pulse เพื่อสร้าง pulsing animation ที่บ่งบอกว่า content กำลังโหลด
 * render เป็น <div> ที่มี zinc-800 background และ rounded corners
 *
 * การใช้งาน: ใช้ใน ProductSkeleton.tsx เพื่อ match layout ของ ProductCard ขณะโหลด
 * ปรับขนาดด้วย className: h-4 w-full, h-3 w-16, aspect-square ฯลฯ
 *
 * EN:
 * Skeleton — content loading placeholder with pulse animation.
 * Uses animate-pulse to indicate that content is loading.
 * Renders as a <div> with a zinc-800 background and rounded corners.
 *
 * Usage: used in ProductSkeleton.tsx to match the ProductCard layout during load.
 * Size is controlled via className: h-4 w-full, h-3 w-16, aspect-square, etc.
 */

import { cn } from "@/lib/utils";

/**
 * TH:
 * Skeleton รับ props ทั้งหมดของ <div> ผ่าน React.HTMLAttributes
 * ทำให้ปรับ className, style, aria-label ได้จากภายนอก
 *
 * EN:
 * Skeleton accepts all <div> props via React.HTMLAttributes.
 * This allows passing className, style, aria-label from the caller.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-zinc-800/60",  // TH: pulse animation + dark bg | EN: pulse + dark background
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
