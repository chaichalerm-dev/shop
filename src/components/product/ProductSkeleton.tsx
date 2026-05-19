/**
 * TH:
 * ProductSkeleton — Loading placeholder ที่ match layout ของ ProductCard
 * แสดงระหว่างที่ข้อมูลกำลังโหลด ให้ user เห็น "shape" ของ content ที่กำลังจะมา
 * ใช้ Skeleton component จาก ui/skeleton.tsx ซึ่งมี animate-pulse
 *
 * ProductGridSkeleton — แสดง grid ของ ProductSkeleton หลายๆ อัน
 * ปรับจำนวนด้วย count prop (default 8)
 *
 * หมายเหตุ: ปัจจุบัน skeleton ยังไม่ถูกใช้งาน เพราะทุกหน้ามีข้อมูลพร้อมแล้ว
 * แต่เตรียมไว้สำหรับเมื่อเพิ่ม API calls ในอนาคต (loading states)
 *
 * EN:
 * ProductSkeleton — loading placeholder that matches the ProductCard layout.
 * Shows users the content shape while data is loading.
 * Uses the Skeleton component from ui/skeleton.tsx which has animate-pulse.
 *
 * ProductGridSkeleton — renders a grid of ProductSkeleton placeholders.
 * Count is configurable via the count prop (default 8).
 *
 * Note: Currently unused since all data is available at build time.
 * Ready for when real API calls with loading states are added.
 */

import { Skeleton } from "@/components/ui/skeleton";

/**
 * TH:
 * ProductSkeleton — single card skeleton
 * layout structure mirrors ProductCard:
 * - aspect-square image area (top)
 * - p-4 info area (bottom) with matching height elements
 *
 * EN:
 * ProductSkeleton — single card placeholder.
 * Layout matches ProductCard structure:
 * - Full-width square image placeholder (top)
 * - Info area skeletons (bottom) matching text line heights
 */
export default function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40">
      {/* TH: Image placeholder — full width square | EN: Square image placeholder */}
      <Skeleton className="aspect-square w-full rounded-none" />

      {/* TH: Info section placeholders | EN: Info section placeholders */}
      <div className="p-4">
        <Skeleton className="mb-2 h-3 w-16" />   {/* brand label */}
        <Skeleton className="mb-1 h-4 w-full" />  {/* product name line 1 */}
        <Skeleton className="mb-3 h-4 w-3/4" />   {/* product name line 2 */}
        <Skeleton className="mb-2 h-3 w-12" />    {/* rating */}
        <Skeleton className="h-5 w-20" />          {/* price */}
      </div>
    </div>
  );
}

/**
 * TH:
 * ProductGridSkeleton — grid ของ skeleton cards
 * ใช้ grid layout เดียวกับ product grids ทั่วไป (2 → 3 → 4 columns)
 * count: จำนวน skeleton cards ที่แสดง
 *
 * EN:
 * ProductGridSkeleton — renders multiple skeleton cards in the standard product grid.
 * Matches the same column breakpoints as real product grids.
 * count: how many placeholder cards to render
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
