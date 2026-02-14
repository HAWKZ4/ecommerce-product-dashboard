"use client";

import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onOpenProduct: (id: number) => void;
  onAddToCart: () => void;
};

export default function ProductGrid({
  products,
  onOpenProduct,
  onAddToCart,
}: Props) {
  return (
    <section aria-label="Product list">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onOpen={() => onOpenProduct(p.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
