import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQuery } from "../../../test/test-utils";
import ProductModal from "@/components/ProductModal";

jest.mock("@/lib/api", () => ({
  getProductById: jest.fn(),
}));

import { getProductById } from "@/lib/api";
import { Product } from "@/lib/types";

const product: Product = {
  id: 1,
  title: "MacBook Pro",
  description: "Great laptop",
  price: 2000,
  discountPercentage: 0,
  rating: 4.9,
  stock: 12,
  category: "laptops",
  brand: "Apple",
  sku: "MBP-1",
  thumbnail: "https://example.com/t.jpg",
  images: ["https://example.com/1.jpg", "https://example.com/2.jpg"],
};

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe("ProductModal", () => {
  test("renders product content when query resolves", async () => {
    (getProductById as jest.Mock).mockResolvedValue(product);

    const user = userEvent.setup();
    const onAddToCart = jest.fn();

    renderWithQuery(
      <ProductModal
        productId={1}
        open={true}
        onClose={() => {}}
        onAddToCart={onAddToCart}
      />
    );

    expect(await screen.findByText(/macbook pro/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalled();
  });

  test("Close button calls onClose", async () => {
    (getProductById as jest.Mock).mockResolvedValue(product);
    const user = userEvent.setup();
    const onClose = jest.fn();

    renderWithQuery(
      <ProductModal
        productId={1}
        open={true}
        onClose={onClose}
        onAddToCart={() => {}}
      />
    );

    await screen.findByText(/macbook pro/i);
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test("does not render product title before data resolves", async () => {
    const d = deferred<Product>();
    (getProductById as jest.Mock).mockReturnValue(d.promise);

    renderWithQuery(
      <ProductModal
        productId={1}
        open={true}
        onClose={() => {}}
        onAddToCart={() => {}}
      />
    );

    expect(screen.queryByText(/macbook pro/i)).not.toBeInTheDocument();

    d.resolve(product);
    expect(await screen.findByText(/macbook pro/i)).toBeInTheDocument();
  });
});
