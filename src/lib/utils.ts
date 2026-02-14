import type { Product, SortKey, SortOrder } from "./types";

export function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

export function discountedPrice(price: number, discountPercentage?: number) {
  if (!discountPercentage || discountPercentage <= 0) return price;
  const v = price * (1 - discountPercentage / 100);
  return Math.round(v * 100) / 100;
}

export function stockBadge(stock: number) {
  if (stock <= 0) return { label: "Out of Stock", tone: "red" as const };
  if (stock <= 10) return { label: "Low Stock", tone: "amber" as const };
  return { label: "In Stock", tone: "green" as const };
}

export function sortProductsClientSide(
  products: Product[],
  sortBy?: SortKey,
  order?: SortOrder
) {
  if (!sortBy || !order) return products;
  const dir = order === "asc" ? 1 : -1;

  const copy = [...products];
  copy.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title) * dir;
    if (sortBy === "price") return (a.price - b.price) * dir;
    if (sortBy === "rating") return (a.rating - b.rating) * dir;
    return 0;
  });
  return copy;
}
