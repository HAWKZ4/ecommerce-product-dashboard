"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, total, limit, onPageChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < pages;

  // how many page numbers to show around current
  const delta = 2;

  const range: number[] = [];
  const rangeWithDots: (number | "...")[] = [];

  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(pages, page + delta);
    i++
  ) {
    range.push(i);
  }

  if (range[0] > 1) {
    rangeWithDots.push(1);
    if (range[0] > 2) rangeWithDots.push("...");
  }

  rangeWithDots.push(...range);

  if (range[range.length - 1] < pages) {
    if (range[range.length - 1] < pages - 1) rangeWithDots.push("...");
    rangeWithDots.push(pages);
  }

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-black/5 bg-white/60 px-3 py-2 text-sm shadow-sm hover:bg-white/80 disabled:opacity-50 disabled:hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {rangeWithDots.map((item, idx) =>
          item === "..." ? (
            <span
              key={`dots-${idx}`}
              className="px-2 text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={[
                "min-w-9 h-9 rounded-lg text-sm transition",
                item === page
                  ? "bg-black text-white shadow"
                  : "bg-white/60 hover:bg-white/80 border border-black/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
              ].join(" ")}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        className="inline-flex items-center gap-2 rounded-xl border border-black/5 bg-white/60 px-3 py-2 text-sm shadow-sm hover:bg-white/80 disabled:opacity-50 disabled:hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
