"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { categories, brands } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterState {
  category: string;
  brand: string;
  search: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  totalResults: number;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: ProductFiltersProps) {
  const hasActiveFilters = filters.category || filters.brand || filters.search;

  return (
    <aside className="w-full lg:w-60 shrink-0">
      {/* Header */}
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

      <p className="mb-6 text-xs text-zinc-600">
        {totalResults} product{totalResults !== 1 ? "s" : ""} found
      </p>

      {/* Category filter */}
      <FilterGroup
        label="Category"
        options={[
          { label: "All Categories", value: "" },
          ...categories.map((c) => ({ label: c.name, value: c.slug })),
        ]}
        value={filters.category}
        onChange={(v) => onFilterChange("category", v)}
      />

      {/* Brand filter */}
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
