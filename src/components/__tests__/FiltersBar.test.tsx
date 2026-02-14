import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FiltersBar from "@/components/FiltersBar";
import { Category } from "@/lib/types";

const categories: Category[] = [
  { slug: "smartphones", name: "Smartphones" },
  { slug: "laptops", name: "Laptops" },
];

describe("FiltersBar", () => {
  test("typing in search calls onSearchChange", async () => {
    const user = userEvent.setup();
    const onSearchChange = jest.fn();

    render(
      <FiltersBar
        categories={categories}
        category="all"
        onCategoryChange={jest.fn()}
        search=""
        onSearchChange={onSearchChange}
        onClearSearch={jest.fn()}
        sortBy=""
        order=""
        onSortChange={jest.fn()}
        resultsCount={42}
      />
    );

    await user.type(screen.getByPlaceholderText(/search products/i), "iphone");
    expect(onSearchChange).toHaveBeenCalled();
  });

  test("clicking a category pill calls onCategoryChange", async () => {
    const user = userEvent.setup();
    const onCategoryChange = jest.fn();

    render(
      <FiltersBar
        categories={categories}
        category="all"
        onCategoryChange={onCategoryChange}
        search=""
        onSearchChange={jest.fn()}
        onClearSearch={jest.fn()}
        sortBy=""
        order=""
        onSortChange={jest.fn()}
      />
    );

    await user.click(screen.getByRole("button", { name: /smartphones/i }));
    expect(onCategoryChange).toHaveBeenCalledWith("smartphones");
  });

  test("changing sort calls onSortChange with tuple", async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();

    render(
      <FiltersBar
        categories={categories}
        category="all"
        onCategoryChange={jest.fn()}
        search=""
        onSearchChange={jest.fn()}
        onClearSearch={jest.fn()}
        sortBy=""
        order=""
        onSortChange={onSortChange}
      />
    );

    await user.selectOptions(screen.getByRole("combobox"), "price:asc");
    expect(onSortChange).toHaveBeenCalledWith("price", "asc");
  });

  test("shows results count when provided", () => {
    render(
      <FiltersBar
        categories={categories}
        category="all"
        onCategoryChange={jest.fn()}
        search=""
        onSearchChange={jest.fn()}
        onClearSearch={jest.fn()}
        sortBy=""
        order=""
        onSortChange={jest.fn()}
        resultsCount={123}
      />
    );

    expect(screen.getByText(/results/i)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });
});
