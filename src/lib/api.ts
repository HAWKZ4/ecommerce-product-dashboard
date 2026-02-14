import type {
  Category,
  Product,
  ProductsResponse,
  ProductQuery,
} from "./types";

const BASE_URL = "https://dummyjson.com";

async function fetchJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    // Next.js caching: we want client-side caching via React Query,
    // so keep fetch uncached.
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function getCategories() {
  return fetchJSON<Category[]>("/products/categories");
}

export function getProductById(id: number) {
  return fetchJSON<Product>(`/products/${id}`);
}

/**
 * Strategy:
 * - If `q` exists: use /products/search?q=...
 * - Else if `category` exists: use /products/category/{slug}
 * - Else: use /products with pagination
 *
 * Note: DummyJSON sorting (`sortBy`/`order`) is documented for /products.
 * For search/category endpoints, sorting support may be inconsistent.
 * We pass sort params anyway, and ALSO do a safe client-side sort as fallback in UI.
 */
export function getProducts(query: ProductQuery) {
  const limit = query.limit;
  const skip = (query.page - 1) * query.limit;

  const params = new URLSearchParams();
  params.set("limit", String(limit));
  params.set("skip", String(skip));

  if (query.sortBy) params.set("sortBy", query.sortBy);
  if (query.order) params.set("order", query.order);

  if (query.q && query.q.trim()) {
    params.set("q", query.q.trim());
    return fetchJSON<ProductsResponse>(`/products/search?${params.toString()}`);
  }

  if (query.category && query.category !== "all") {
    return fetchJSON<ProductsResponse>(
      `/products/category/${encodeURIComponent(
        query.category
      )}?${params.toString()}`
    );
  }

  return fetchJSON<ProductsResponse>(`/products?${params.toString()}`);
}
