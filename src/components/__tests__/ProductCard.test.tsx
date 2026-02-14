import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";

const product: Product = {
  id: 1,
  title: "iPhone 15",
  description: "Nice phone",
  category: "phones",
  price: 1000,
  discountPercentage: 10,
  rating: 4.7,
  stock: 5,
  images: ["x"],
  thumbnail: "https://example.com/p.jpg",
};

describe("ProductCard", () => {
  test("renders title and rating", () => {
    render(
      <ProductCard product={product} onOpen={() => {}} onAddToCart={() => {}} />
    );
    expect(screen.getByText(/iphone 15/i)).toBeInTheDocument();
    expect(screen.getByText("4.7")).toBeInTheDocument();
  });

  test("clicking card opens details", async () => {
    const user = userEvent.setup();
    const onOpen = jest.fn();

    render(
      <ProductCard product={product} onOpen={onOpen} onAddToCart={() => {}} />
    );
    await user.click(
      screen.getByRole("button", { name: /open details for iphone 15/i })
    );

    expect(onOpen).toHaveBeenCalled();
  });

  test("clicking Add to cart calls handler", async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();

    render(
      <ProductCard
        product={product}
        onOpen={() => {}}
        onAddToCart={onAddToCart}
      />
    );
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onAddToCart).toHaveBeenCalled();
  });
});
