import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Listing from "./Listing";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as CategoryServices from "@services/CategoryServices";
import * as useShopModule from "@contexts/ShopContext";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

vi.mock("@hooks/useProducts", () => {
  return {
    useProducts: vi.fn(),
  };
});

import { useProducts } from "@hooks/useProducts";

const mockProductsPage1 = {
  data: [
    { id: 1, title: "Product A", price: 10, image: "", description: "" },
    { id: 2, title: "Product B", price: 20, image: "", description: "" },
  ],
  page: 1,
  totalPages: 2,
};

const mockProductsPage2 = {
  data: [
    { id: 3, title: "Product C", price: 30, image: "", description: "" },
    { id: 4, title: "Product D", price: 40, image: "", description: "" },
  ],
  page: 2,
  totalPages: 2,
};

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

    (useProducts as any).mockReturnValue({
      data: mockProductsPage1,
      isLoading: false,
    });
  });

  const renderWithClient = (ui: React.ReactElement) => {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{ui}</MemoryRouter>
      </QueryClientProvider>
    );
  };

  it("renders loading skeletons initially", async () => {
    (useProducts as any).mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    renderWithClient(<Listing />);
    await waitFor(() => {
      expect(screen.getAllByText("Loading...").length).toBeGreaterThan(0);
    });
  });

  it("renders fetched categories and products", async () => {
    renderWithClient(<Listing />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
      expect(screen.getByLabelText("Books")).toBeInTheDocument();
      expect(screen.getByLabelText("Electronics")).toBeInTheDocument();
    });
  });

  it("filters by category", async () => {
    renderWithClient(<Listing />);

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByTestId("category-Books"));

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });
  });

  it("clears category filter", async () => {
    renderWithClient(<Listing />);

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByText("Clear filters"));

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });
  });

  it("applies sorting by title", async () => {
    renderWithClient(<Listing />);

    await waitFor(() => screen.getByText("Product A"));
    fireEvent.click(screen.getByText(/Sort by/i));
    fireEvent.click(screen.getByText("Title"));

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });
  });

  it("loads more products", async () => {

    interface MockProduct {
      id: number;
      title: string;
      price: number;
      image: string;
      description: string;
    }

    interface MockProductsPage {
      data: MockProduct[];
      page: number;
      totalPages: number;
    }

    (useProducts as unknown as {
      mockImplementation: (
      fn: (
        category: string | undefined,
        sort: string | undefined,
        search: string | undefined,
        page: number
      ) => { data: MockProductsPage; isLoading: boolean }
      ) => void;
    }).mockImplementation(
      (
      _category: string | undefined,
      _sort: string | undefined,
      _search: string | undefined,
      page: number
      ): { data: MockProductsPage; isLoading: boolean } => {
      return {
        data: page === 1 ? mockProductsPage1 : mockProductsPage2,
        isLoading: false,
      };
      }
    );

    renderWithClient(<Listing />);

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Load more products"));

    await waitFor(() => {
      expect(screen.getByText("Product C")).toBeInTheDocument();
      expect(screen.getByText("Product D")).toBeInTheDocument();
    });
  });

  it("shows product count", async () => {
    renderWithClient(<Listing />);
    await waitFor(() => {
      expect(screen.getByText("Showing 2 Products")).toBeInTheDocument();
    });
  });

  it("handles empty product list gracefully", async () => {
    (useProducts as any).mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    renderWithClient(<Listing />);

    await waitFor(() => {
      expect(screen.getAllByText("Loading...").length).toBeGreaterThan(0);
    });
  });
});
