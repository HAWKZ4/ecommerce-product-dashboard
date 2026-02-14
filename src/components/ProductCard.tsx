"use client";

import type { Product } from "@/lib/types";
import { discountedPrice, formatCurrency, stockBadge } from "@/lib/utils";
import { Star, Tag, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  product: Product;
  onOpen: () => void;
  onAddToCart: () => void;
};

export default function ProductCard({ product, onOpen, onAddToCart }: Props) {
  const badge = stockBadge(product.stock);
  const hasDiscount = (product.discountPercentage ?? 0) > 0;
  const finalPrice = discountedPrice(product.price, product.discountPercentage);

  const badgeClasses =
    badge.tone === "green"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : badge.tone === "amber"
      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
      : "bg-rose-500/10 text-rose-700 dark:text-rose-300";

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className="group rounded-2xl border border-black/5 bg-white/70 overflow-hidden shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
      <button
        onClick={onOpen}
        className="text-left w-full"
        aria-label={`Open details for ${product.title}`}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/25 px-2.5 py-1 text-xs text-white backdrop-blur">
            <Tag className="h-3.5 w-3.5" />
            {product.category}
          </div>
        </div>
      </button>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug line-clamp-2">
            {product.title}
          </h3>
          <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current opacity-80" />
            <span className="font-medium text-foreground">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm">
            <span className="text-base font-semibold">
              {formatCurrency(finalPrice)}
            </span>{" "}
            {hasDiscount ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            ) : null}
            {hasDiscount ? (
              <span className="ml-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                -{product.discountPercentage?.toFixed(0)}%
              </span>
            ) : null}
          </div>

          <span className={`text-xs px-2.5 py-1 rounded-full ${badgeClasses}`}>
            {badge.label}
          </span>
        </div>

        <button
          onClick={onAddToCart}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-3.5 py-2.5 text-xs font-medium text-background shadow hover:opacity-95 active:opacity-90"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </motion.article>
  );
}
