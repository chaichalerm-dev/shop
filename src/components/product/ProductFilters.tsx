/**
 * TH:
 * ProductFilters — Sidebar filter component สำหรับหน้า Products catalog (/products)
 * แสดง filter options สำหรับ Category และ Brand
 * state ทั้งหมดถูก manage โดย parent (products/page.tsx) ด้วย pattern "lifting state up"
 *
 * Pattern: Controlled Component
 * - ไม่มี internal state
 * - รับ filters state จาก parent
 * - ส่ง onFilterChange กลับไปยัง parent เมื่อ filter เปลี่ยน
 *
 * Sub-component: FilterGroup — reusable filter button group (Category/Brand)
 *
 * EN:
 * ProductFilters — sidebar filter panel for the /products catalog page.
 * Filters for Category and Brand.
 * All state is managed by the parent (products/page.tsx) — "lifting state up" pattern.
 *
 * Pattern: Controlled Component
 * - No internal state
 * - Receives filter values from parent
 * - Calls onFilterChange to notify parent of changes
 *
 * Sub-component: FilterGroup — reusable filter button group (for Category/Brand)
 */

"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { categories, brands } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * TH:
 * FilterState (local) — subset ของ FilterState จาก types/index.ts
 * ใช้เฉพาะ 3 fields ที่ ProductFilters จัดการ: category, brand, search
 * price filter และ flavor filter ยังไม่ได้ implement ใน UI
 *
 * EN:
 * FilterState (local) — a subset of the global FilterState type.
 * Only the 3 fields that ProductFilters handles: category, brand, search.
 * Price and flavor filters are reserved for future implementation.
 */
interface FilterState {
  category: string;
  brand: string;
  search: string;
}

interface ProductFiltersProps {
  filters: FilterState;                                          // TH: filter state ปัจจุบัน | EN: current filter state
  onFilterChange: (key: keyof FilterState, value: string) => void;  // TH: callback เมื่อ filter เปลี่ยน | EN: called when a filter changes
  onReset: () => void;                                           // TH: callback เมื่อ reset all filters | EN: called to reset all filters
  totalResults: number;                                          // TH: จำนวนสินค้าที่ match | EN: count of filtered products
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: ProductFiltersProps) {
  /**
   * TH:
   * hasActiveFilters — true ถ้ามี filter ที่ active อยู่
   * ใช้สำหรับ show/hide "Clear all" button
   *
   * EN:
   * hasActiveFilters — true if any filter is currently applied.
   * Controls visibility of the "Clear all" button.
   */
  const hasActiveFilters = filters.category || filters.brand || filters.search;

  return (
    <aside className="w-full lg:w-60 shrink-0">
      {/* TH: Filter header — title + Clear all button (conditional) | EN: Filter header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-semibold text-zinc-200">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* TH: Result count | EN: Current result count */}
      <p className="mb-6 text-xs text-zinc-600">
        {totalResults} product{totalResults !== 1 ? "s" : ""} found
      </p>

      {/* TH: Category filter group | EN: Category filter */}
      <FilterGroup
        label="Category"
        options={[
          { label: "All Categories", value: "" },
          ...categories.map((c) => ({ label: c.name, value: c.slug })),
        ]}
        value={filters.category}
        onChange={(v) => onFilterChange("category", v)}
      />

      {/* TH: Brand filter group | EN: Brand filter */}
      <FilterGroup
        label="Brand"
        options={[
          { label: "All Brands", value: "" },
          ...brands.map((b) => ({ label: b.name, value: b.slug })),
        ]}
        value={filters.brand}
        onChange={(v) => onFilterChange("brand", v)}
      />
    </aside>
  );
}

/**
 * TH:
 * FilterGroup — Reusable filter button group สำหรับ single-select filtering
 * แสดง list ของ options เป็น buttons ที่ highlight เมื่อ active
 * ใช้ pattern: value === opt.value เพื่อ determine active state
 *
 * EN:
 * FilterGroup — reusable single-select filter button group.
 * Renders a list of options as buttons; the matching value is highlighted.
 * Uses value equality to determine active state.
 */
function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      {/* TH: Group header — uppercase, tracked | EN: Group label */}
      <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "w-full rounded-xl px-3 py-2 text-left text-sm transition-all",
              // TH: Active style — violet background tint + violet text | EN: Active — violet tint
              value === opt.value
                ? "bg-violet-600/15 text-violet-300 font-medium"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
