"use client";

import type { Category as CategoryType, SortKey, SortOrder } from "@/lib/types";
import { Search, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  categories: CategoryType[];
  category: string;
  onCategoryChange: (c: string) => void;

  search: string;
  onSearchChange: (v: string) => void;
  onClearSearch: () => void;

  sortBy: SortKey | "";
  order: SortOrder | "";
  onSortChange: (sortBy: SortKey | "", order: SortOrder | "") => void;

  resultsCount?: number;
};

export default function FiltersBar({
  categories,
  category,
  onCategoryChange,
  search,
  onSearchChange,
  onClearSearch,
  sortBy,
  order,
  onSortChange,
  resultsCount,
}: Props) {
  const sortValue = `${sortBy || ""}:${order || ""}`;

  return (
    <div className="space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 pl-11 pr-11 py-3 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/40"
          />

          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={onClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sort + Results */}
        <div className="flex items-center gap-3 justify-between lg:justify-end">
          {typeof resultsCount === "number" && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {resultsCount}
              </span>{" "}
              results
            </div>
          )}

          <div className="relative">
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={sortValue}
              onChange={(e) => {
                const [s, o] = e.target.value.split(":");
                onSortChange((s as SortKey) || "", (o as SortOrder) || "");
              }}
              className="appearance-none rounded-2xl bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 px-4 pr-10 py-2.5 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500/40"
            >
              <option value=":">Sort: Default</option>
              <option value="price:asc">Price ↑ </option>
              <option value="price:desc">Price ↓</option>
              <option value="title:asc">Title A → Z</option>
              <option value="title:desc">Title Z → A</option>
              <option value="rating:desc">Rating High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <CategoryPill
          label="All"
          active={category === "all"}
          onClick={() => onCategoryChange("all")}
        />

        {categories.map((c) => (
          <CategoryPill
            key={c.slug}
            label={c.name}
            active={category === c.slug}
            onClick={() => onCategoryChange(c.slug)}
          />
        ))}
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {(search || category !== "all" || (sortBy && order)) && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex flex-wrap gap-2"
          >
            {search && (
              <FilterBadge
                label={`Search: "${search}"`}
                onRemove={onClearSearch}
              />
            )}

            {category !== "all" && (
              <FilterBadge
                label={`Category: ${category}`}
                onRemove={() => onCategoryChange("all")}
              />
            )}

            {sortBy && order && (
              <FilterBadge
                label={`Sort: ${sortBy} (${order})`}
                onRemove={() => onSortChange("", "")}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------ Components ------------------ */

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={[
        "px-4 py-2 text-sm rounded-full transition-all border",
        active
          ? "bg-foreground text-background border-foreground shadow"
          : "bg-white/60 dark:bg-white/5 border-black/5 dark:border-white/10 hover:bg-white hover:dark:bg-white/10",
      ].join(" ")}
    >
      {label}
    </motion.button>
  );
}

function FilterBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-black/5 dark:bg-white/10"
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/20 transition"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
