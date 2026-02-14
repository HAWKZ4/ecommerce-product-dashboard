import { getProducts } from "@/lib/api";

describe("api.getProducts", () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [], total: 0, skip: 0, limit: 12 }),
      text: async () => "",
      status: 200,
      statusText: "OK",
    });
  });

  test("uses /products/search when q exists", async () => {
    await getProducts({ page: 1, limit: 12, q: "iphone" });

    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain("https://dummyjson.com/products/search?");
    expect(url).toContain("q=iphone");
    expect(url).toContain("limit=12");
    expect(url).toContain("skip=0");
  });

  test("uses /products/category when category != all", async () => {
    await getProducts({ page: 1, limit: 12, category: "phones" });

    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain("https://dummyjson.com/products/category/phones?");
  });

  test("uses /products when no q and category is all/undefined", async () => {
    await getProducts({ page: 2, limit: 12, category: "all" });

    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain("https://dummyjson.com/products?");
    expect(url).toContain("limit=12");
    expect(url).toContain("skip=12"); // (2-1)*12
  });
});
