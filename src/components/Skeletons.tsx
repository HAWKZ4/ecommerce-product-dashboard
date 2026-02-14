export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/70 overflow-hidden shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="h-44 w-full bg-black/[0.04] animate-pulse dark:bg-white/[0.06]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-black/[0.04] animate-pulse rounded dark:bg-white/[0.06]" />
        <div className="h-4 bg-black/[0.04] animate-pulse rounded w-2/3 dark:bg-white/[0.06]" />
        <div className="h-9 bg-black/[0.04] animate-pulse rounded-xl dark:bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
