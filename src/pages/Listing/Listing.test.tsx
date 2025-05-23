import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Listing from "./Listing";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as ProductServices from "@services/ProductServices";
import * as CategoryServices from "@services/CategoryServices";
import * as useShopModule from "@contexts/ShopContext";
import { MemoryRouter } from "react-router-dom";

// Mocks
vi.mock("@services/ProductServices", () => ({
  getProducts: vi.fn(),
}));

vi.mock("@services/CategoryServices", () => ({
  getCategories: vi.fn(),
}));

vi.mock("@components/shared/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({ title }: any) => <div>{title}</div>,
}));

vi.mock("@components/shared/ProductCard/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

vi.mock("@components/shared/Checkbox/Checkbox", () => ({
  __esModule: true,
  default: ({ value, onChange, checked }: any) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        data-testid={`category-${value}`}
      />
      {value}
    </label>
  ),
}));

vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

describe("Listing", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useShopModule, "useShop").mockReturnValue({
      wishlist: new Set<number>(),
      isInWishlist: vi.fn(() => false),
      toggleWishlist: vi.fn(),
      loading: false,
      cartCount: 0,
      refreshCart: vi.fn(),
      resetShop: vi.fn(),
    });

    (CategoryServices.getCategories as any).mockResolvedValue({
      data: [
        { id: 1, name: "Books" },
        { id: 2, name: "Electronics" },
      ],
    });

    (ProductServices.getProducts as any).mockResolvedValue({
      data: [
        { id: 1, title: "Product A", price: 10, image: "", description: "" },
        { id: 2, title: "Product B", price: 20, image: "", description: "" },
      ],
      page: 1,
      totalPages: 2,
    });
  });

  const setup = () => render(<Listing />, { wrapper: MemoryRouter });

  it("renders loading skeletons initially", async () => {
    (ProductServices.getProducts as any).mockResolvedValueOnce({
      data: [],
      page: 1,
      totalPages: 1,
    });

    setup();
    await waitFor(() => {
      expect(screen.getAllByText("Loading...").length).toBeGreaterThan(0);
    })
  });

  it("renders fetched categories and products", async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
      expect(screen.getByLabelText("Books")).toBeInTheDocument();
      expect(screen.getByLabelText("Electronics")).toBeInTheDocument();
    });
  });

  it("filters by category", async () => {
    setup();

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByTestId("category-Books"));

    await waitFor(() => {
      expect(ProductServices.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({ category: "Books" })
      );
    });
  });

  it("clears category filter", async () => {
    setup();

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByText("Clear filters"));

    await waitFor(() => {
      expect(ProductServices.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({ category: "" })
      );
    });
  });

  it("applies sorting by title", async () => {
    setup();

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByText(/Sort by/i));
    fireEvent.click(screen.getByText("Title"));

    await waitFor(() => {
      expect(ProductServices.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({ sort: "title" })
      );
    });
  });

  it("loads more products", async () => {
    setup();

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByText("Load more products"));

    await waitFor(() => {
      expect(ProductServices.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      );
    });
  });

  it("shows product count", async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText("Showing 2 Products")).toBeInTheDocument();
    });
  });

  it("handles empty product list gracefully", async () => {
    (ProductServices.getProducts as any).mockResolvedValueOnce({
      data: [],
      page: 1,
      totalPages: 1,
    });

    setup();

    await waitFor(() => {
      expect(screen.queryByText("Product A")).not.toBeInTheDocument();
      expect(screen.getAllByText("Loading...").length).toBeGreaterThan(0);
    });
  });
});
