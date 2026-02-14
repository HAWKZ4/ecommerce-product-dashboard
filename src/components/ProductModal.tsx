"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api";
import type { Product } from "@/lib/types";
import { discountedPrice, formatCurrency, stockBadge } from "@/lib/utils";
import {
  X,
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Ruler,
  Weight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Props = {
  productId: number | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: () => void;
};

function ReviewsMock({ product }: { product: Product }) {
  const base = [
    {
      name: "Alex",
      text: "Arrived quickly and matches the description.",
      stars: 5,
    },
    {
      name: "Sam",
      text: "Good value for the price. Would buy again.",
      stars: 4,
    },
    {
      name: "Taylor",
      text: "Quality is solid. Packaging was nice too.",
      stars: 4,
    },
  ];

  return (
    <div className="space-y-2">
      {base.map((r, i) => (
        <div
          key={`${r.name}-${i}`}
          className="rounded-2xl text-white border border-black/10 bg-white p-3 shadow-sm
                     dark:border-white/10 dark:bg-white/5 dark:shadow-none"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{r.name}</span>
            <span className="inline-flex items-center gap-1 text-sm text-black/60 dark:text-white/70">
              <Star className="h-4 w-4 fill-current opacity-80" />
              <span className="text-black/90 font-medium dark:text-white">
                {r.stars}
              </span>
            </span>
          </div>
          <p className="mt-1 text-sm text-black/60 dark:text-white/70">
            {r.text}
          </p>
        </div>
      ))}
      <p className="text-xs text-black/60 dark:text-white/60">
        Reviews shown are demo placeholders (DummyJSON doesn’t always include
        real reviews per product).
      </p>
    </div>
  );
}

function ModalSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
      <div className="space-y-3">
        <div className="h-72 lg:h-[520px] rounded-2xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-7 w-3/4 rounded bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        <div className="h-4 w-full rounded bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        <div className="h-4 w-5/6 rounded bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-full bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
          <div className="h-8 w-24 rounded-full bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        </div>
        <div className="h-10 w-44 rounded-xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 rounded-2xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
          <div className="h-28 rounded-2xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
        </div>
        <div className="h-32 rounded-2xl bg-black/[0.05] animate-pulse dark:bg-white/[0.06]" />
      </div>
    </div>
  );
}

export default function ProductModal({
  productId,
  open,
  onClose,
  onAddToCart,
}: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as number),
    enabled: open && typeof productId === "number",
  });

  const images = useMemo(() => {
    if (!data) return [];
    const list = (data.images?.length ? data.images : [data.thumbnail]).filter(
      Boolean
    );
    return Array.from(new Set([data.thumbnail, ...list]));
  }, [data]);

  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setActiveSrc(images[0] ?? null);
  }, [open, images]);

  // Snappy exit, premium enter
  const panelMotion = {
    initial: { opacity: 0, y: 18, scale: 0.985, rotateX: 6 },
    animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    exit: { opacity: 0, y: 10, scale: 0.985, rotateX: 4 },
  } as const;

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <Dialog open={open} onClose={onClose} className="relative z-50">
          {/* Backdrop: quicker exit so it doesn't linger */}
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 bg-black/40 dark:bg-black/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.14, ease: "easeOut" },
            }}
            exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }}
          />

          <div className="fixed inset-0 overflow-y-auto p-3 sm:p-4">
            <div className="mx-auto max-w-6xl">
              <DialogPanel
                className="overflow-hidden rounded-3xl border border-black/10 bg-white/92 shadow-2xl
                           dark:border-white/10 dark:bg-black/40 dark:backdrop-blur-xl"
              >
                <motion.div
                  {...panelMotion}
                  // Open: spring, Close: fast tween
                  transition={{
                    opacity: { duration: 0.12 },
                    type: "spring",
                    stiffness: 520,
                    damping: 38,
                    mass: 0.7,
                  }}
                  // Override only exit to be snappy
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.985,
                    rotateX: 4,
                    transition: { duration: 0.12, ease: "easeInOut" },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-black/10 p-4 dark:border-white/10">
                    <DialogTitle className="font-semibold tracking-tight text-black/90 dark:text-white">
                      Product Details
                    </DialogTitle>

                    <button
                      onClick={onClose}
                      className="inline-flex items-center gap-2 rounded-xl border text-white border-black/10 bg-white px-3 py-2 text-sm shadow-sm
                                 hover:bg-white/95 active:scale-[0.98]
                                 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                      Close
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5">
                    {isLoading ? <ModalSkeleton /> : null}

                    {isError ? (
                      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                        <p className="font-semibold text-black/90 dark:text-white">
                          Failed to load product
                        </p>
                        <p className="text-sm text-black/60 dark:text-white/70">
                          {(error as Error).message}
                        </p>
                      </div>
                    ) : null}

                    {data ? (
                      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
                        {/* LEFT: Media */}
                        <div className="lg:sticky lg:top-6 space-y-3">
                          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-transparent dark:shadow-none">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={activeSrc || images[0] || data.thumbnail}
                              alt={data.title}
                              className="w-full h-72 lg:h-[520px] object-cover"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                          </div>

                          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-6 gap-2">
                            {images.slice(0, 6).map((src, i) => {
                              const active = src === activeSrc;
                              return (
                                <button
                                  key={`${src}-${i}`}
                                  type="button"
                                  onClick={() => setActiveSrc(src)}
                                  className={[
                                    "rounded-xl border overflow-hidden transition shadow-sm",
                                    active
                                      ? "border-indigo-500/50 ring-2 ring-indigo-500/25"
                                      : "border-black/10 hover:opacity-90",
                                    "dark:shadow-none dark:border-white/10",
                                  ].join(" ")}
                                  aria-label={`Select image ${i + 1}`}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={src}
                                    alt={`${data.title} thumbnail ${i + 1}`}
                                    className="h-20 w-full object-cover"
                                    loading="lazy"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* RIGHT: Content */}
                        <div className="space-y-5">
                          <div className="space-y-2">
                            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-black/90 dark:text-white">
                              {data.title}
                            </h2>
                            <p className="text-sm text-black/60 dark:text-white/70">
                              {data.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span
                                className="rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 shadow-sm
                                           dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-none"
                              >
                                {data.category}
                              </span>

                              <span
                                className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-black/60 shadow-sm
                                           dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-none"
                              >
                                <Star className="h-4 w-4 fill-current opacity-80" />
                                <span className="text-black/90 font-medium dark:text-white">
                                  {data.rating.toFixed(1)}
                                </span>
                              </span>

                              <span className="text-black/60 dark:text-white/70">
                                Brand:{" "}
                                <span className="text-black/90 dark:text-white">
                                  {data.brand ?? "—"}
                                </span>
                              </span>
                              <span className="text-black/60 dark:text-white/70">
                                SKU:{" "}
                                <span className="text-black/90 dark:text-white">
                                  {data.sku ?? "—"}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Price card */}
                          <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="text-2xl font-semibold tracking-tight text-black/90 dark:text-white">
                                  {formatCurrency(
                                    discountedPrice(
                                      data.price,
                                      data.discountPercentage
                                    )
                                  )}
                                </div>
                                {(data.discountPercentage ?? 0) > 0 ? (
                                  <div className="mt-1 text-sm text-black/60 dark:text-white/70">
                                    <span className="line-through">
                                      {formatCurrency(data.price)}
                                    </span>
                                    <span className="ml-2 text-emerald-600 font-semibold dark:text-emerald-400">
                                      -{data.discountPercentage?.toFixed(0)}%
                                    </span>
                                  </div>
                                ) : null}
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                {(() => {
                                  const b = stockBadge(data.stock);
                                  const badgeClasses =
                                    b.tone === "green"
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                      : b.tone === "amber"
                                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                      : "bg-rose-500/10 text-rose-700 dark:text-rose-300";
                                  return (
                                    <span
                                      className={`text-xs px-2.5 py-1 rounded-full ${badgeClasses}`}
                                    >
                                      {b.label}
                                    </span>
                                  );
                                })()}

                                <button
                                  onClick={onAddToCart}
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:opacity-95 active:opacity-90"
                                >
                                  <ShoppingBag className="h-4 w-4" />
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Details grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                              <h3 className="font-semibold text-black/90 dark:text-white">
                                Specs
                              </h3>
                              <ul className="mt-3 text-sm text-black/60 dark:text-white/70 space-y-2">
                                <li className="flex items-center gap-2">
                                  <Weight className="h-4 w-4" />
                                  Weight:{" "}
                                  <span className="text-black/90 dark:text-white">
                                    {data.weight ?? "—"}
                                  </span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Ruler className="h-4 w-4" />
                                  Dimensions:{" "}
                                  <span className="text-black/90 dark:text-white">
                                    {data.dimensions
                                      ? `${data.dimensions.width ?? "—"} × ${
                                          data.dimensions.height ?? "—"
                                        } × ${data.dimensions.depth ?? "—"}`
                                      : "—"}
                                  </span>
                                </li>
                                <li>
                                  Stock:{" "}
                                  <span className="text-black/90 dark:text-white">
                                    {data.stock}
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                              <h3 className="font-semibold text-black/90 dark:text-white">
                                Warranty & Shipping
                              </h3>
                              <ul className="mt-3 text-sm text-black/60 dark:text-white/70 space-y-2">
                                <li className="flex items-center gap-2">
                                  <ShieldCheck className="h-4 w-4" />
                                  Warranty:{" "}
                                  <span className="text-black/90 dark:text-white">
                                    {data.warrantyInformation ?? "—"}
                                  </span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <Truck className="h-4 w-4" />
                                  Shipping:{" "}
                                  <span className="text-black/90 dark:text-white">
                                    {data.shippingInformation ?? "—"}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          {/* Reviews */}
                          <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
                            <h3 className="font-semibold text-black/90 dark:text-white">
                              Customer Reviews
                            </h3>
                            <div className="mt-3">
                              <ReviewsMock product={data} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      ) : null}
    </AnimatePresence>
  );
}
