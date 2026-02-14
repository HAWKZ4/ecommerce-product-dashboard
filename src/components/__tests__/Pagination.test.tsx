import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  test("disables Previous on first page", () => {
    render(<Pagination page={1} total={100} limit={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  test("disables Next on last page", () => {
    render(<Pagination page={10} total={100} limit={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  test("clicking Next calls onPageChange(page+1)", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(<Pagination page={2} total={100} limit={10} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test("clicking a page number calls onPageChange(number)", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();

    render(<Pagination page={5} total={300} limit={10} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "7" }));

    expect(onPageChange).toHaveBeenCalledWith(7);
  });
});
