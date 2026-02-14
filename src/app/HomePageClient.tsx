"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import FiltersBar from "@/components/FiltersBar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import ProductModal from "@/components/ProductModal";
import { GridSkeleton } from "@/components/Skeletons";

import { getCategories, getProducts } from "@/lib/api";
import { getCartCount, setCartCount as persistCartCount } from "@/lib/cart";
import type { SortKey, SortOrder } from "@/lib/types";
import { sortProductsClientSide } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import UpdatingBar from "@/components/UpdatingBar";

const LIMIT = 12;

function parseNum(v: string | null, fallback: number) {
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function HomePageClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const page = parseNum(sp.get("page"), 1);
  const category = sp.get("category") || "all";
  const sortBy = (sp.get("sortBy") as SortKey) || "";
  const order = (sp.get("order") as SortOrder) || "";
  const qParam = sp.get("q") || "";

  const [search, setSearch] = useState(qParam);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => setSearch(qParam), [qParam]);

  const [cartCount, setCartCountState] = useState(0);

  useEffect(() => {
    setCartCountState(getCartCount());
  }, []);

  function updateQuery(
    next: Partial<{
      page: number;
      category: string;
      sortBy: string;
      order: string;
      q: string;
    }>
  ) {
    const params = new URLSearchParams(sp.toString());

    if (typeof next.page === "number") params.set("page", String(next.page));
    if (typeof next.category === "string")
      params.set("category", next.category);

    if (typeof next.sortBy === "string")
      next.sortBy ? params.set("sortBy", next.sortBy) : params.delete("sortBy");

    if (typeof next.order === "string")
      next.order ? params.set("order", next.order) : params.delete("order");

    if (typeof next.q === "string")
      next.q ? params.set("q", next.q) : params.delete("q");

    if (
      next.category !== undefined ||
      next.sortBy !== undefined ||
      next.order !== undefined ||
      next.q !== undefined
    ) {
      params.set("page", "1");
    }

    router.push(`/?${params.toString()}`);
  }

  useEffect(() => {
    if ((debouncedSearch || "") !== (qParam || "")) {
      updateQuery({ q: debouncedSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const productsQuery = useQuery({
    queryKey: ["products", { page, category, sortBy, order, q: qParam }],
    queryFn: () =>
      getProducts({
        page,
        limit: LIMIT,
        category: category || "all",
        sortBy: (sortBy || undefined) as SortKey | undefined,
        order: (order || undefined) as SortOrder | undefined,
        q: qParam || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const [openId, setOpenId] = useState<number | null>(null);

  const sortedProducts = useMemo(() => {
    if (!productsQuery.data) return [];
    return sortProductsClientSide(
      productsQuery.data.products,
      sortBy || undefined,
      order || undefined
    );
  }, [productsQuery.data, sortBy, order]);

  function handleAddToCart() {
    setCartCountState((c) => {
      const next = c + 1;
      persistCartCount(next);
      return next;
    });
    toast.success("Added to cart");
  }

  const isInitialLoading = productsQuery.isLoading && !productsQuery.data;
  const isUpdating = productsQuery.isFetching && !!productsQuery.data;

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_20%_-10%,theme(colors.indigo.200/.35),transparent_55%),radial-gradient(900px_circle_at_80%_0%,theme(colors.cyan.200/.25),transparent_50%)] dark:bg-[radial-gradient(1200px_circle_at_20%_-10%,theme(colors.indigo.500/.15),transparent_55%),radial-gradient(900px_circle_at_80%_0%,theme(colors.cyan.500/.12),transparent_50%)]">
      <Header cartCount={cartCount} />

      <main className="mx-auto max-w-6xl px-4 py-6 space-y-4">
        <FiltersBar
          categories={categoriesQuery.data ?? []}
          category={category}
          onCategoryChange={(c) => updateQuery({ category: c })}
          search={search}
          onSearchChange={setSearch}
          onClearSearch={() => setSearch("")}
          sortBy={sortBy}
          order={order}
          onSortChange={(s, o) => updateQuery({ sortBy: s, order: o })}
          resultsCount={productsQuery.data?.total}
        />

        <UpdatingBar show={isUpdating} />
        {isInitialLoading ? <GridSkeleton count={12} /> : null}

        {productsQuery.isError ? (
          <section className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="font-semibold text-foreground">
              Failed to load products
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {(productsQuery.error as Error).message}
            </p>
          </section>
        ) : null}

        {productsQuery.data && sortedProducts.length === 0 ? (
          <section className="rounded-2xl border border-black/5 bg-white/70 p-8 text-center shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="text-base font-semibold">No results found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different search term, clear filters, or choose “All
              Categories”.
            </p>
          </section>
        ) : null}

        {productsQuery.data && sortedProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProductGrid
                products={sortedProducts}
                onOpenProduct={(id) => setOpenId(id)}
                onAddToCart={handleAddToCart}
              />
            </motion.div>

            <div className="rounded-2xl border border-black/5 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <Pagination
                page={page}
                total={productsQuery.data.total}
                limit={LIMIT}
                onPageChange={(p) => updateQuery({ page: p })}
              />
            </div>
          </>
        ) : null}
      </main>

      <ProductModal
        productId={openId}
        open={openId !== null}
        onClose={() => setOpenId(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
