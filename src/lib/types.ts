export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string; // sometimes exists in DummyJSON
  images: string[];
  thumbnail: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url?: string;
};

export type SortKey = "price" | "title" | "rating";
export type SortOrder = "asc" | "desc";

export type ProductQuery = {
  page: number; // 1-based in UI
  limit: number; // 12
  q?: string;
  category?: string;
  sortBy?: SortKey;
  order?: SortOrder;
};
