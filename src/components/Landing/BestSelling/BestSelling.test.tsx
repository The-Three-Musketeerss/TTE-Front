import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import BestSelling from "./BestSelling";
import * as ProductServices from "@services/ProductServices";
import { MemoryRouter } from "react-router-dom";

vi.mock("@components/shared/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({ title, isFavorite, onToggleFavorite }: any) => (
    <div data-testid="product-card">
      <p>{title}</p>
      <button onClick={onToggleFavorite}>
        {isFavorite ? "Remove from wishlist" : "Add to wishlist"}
      </button>
    </div>
  ),
}));

vi.mock("@components/shared/ProductCard/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const mockGetTopSellingProducts = vi.spyOn(ProductServices, "getTopSellingProducts");
const mockToggleWishlist = vi.fn();
const mockIsInWishlist = vi.fn(() => false);

vi.mock("@contexts/ShopContext", () => ({
  useShop: () => ({
    isInWishlist: mockIsInWishlist,
    toggleWishlist: mockToggleWishlist,
  }),
}));

describe("BestSelling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeletons initially", async () => {
    mockGetTopSellingProducts.mockResolvedValue({ data: [] });

    render(<BestSelling />, { wrapper: MemoryRouter });

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);

    await waitFor(() => {
      expect(mockGetTopSellingProducts).toHaveBeenCalled();
    });
  });

  it("renders product cards after loading", async () => {
    mockGetTopSellingProducts.mockResolvedValue({
      data: [
        { id: 1, title: "Product A" },
        { id: 2, title: "Product B" },
      ],
    });

    render(<BestSelling />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card").length).toBe(2);
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    });
  });

  it("calls toggleWishlist when clicking wishlist button", async () => {
    mockGetTopSellingProducts.mockResolvedValue({
      data: [{ id: 1, title: "Product A" }],
    });

    render(<BestSelling />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Add to wishlist"));
    expect(mockToggleWishlist).toHaveBeenCalled();
  });

  it("navigates to /listing when clicking Shop all", async () => {
  mockGetTopSellingProducts.mockResolvedValue({ data: [] });

  render(<BestSelling />, { wrapper: MemoryRouter });

  await waitFor(() => {
    fireEvent.click(screen.getByText("Shop all"));
  });

  expect(navigateMock).toHaveBeenCalledWith("/listing");
});

});
