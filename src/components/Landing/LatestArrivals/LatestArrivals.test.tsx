import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import LatestArrivals from "./LatestArrivals";
import * as ProductServices from "@services/ProductServices";
import { customRender } from "@utils/test-utils";

const mockToggleWishlist = vi.fn();
const mockIsInWishlist = vi.fn((id: number) => id === 1);

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

vi.mock("@contexts/ShopContext", () => ({
  useShop: () => ({
    isInWishlist: mockIsInWishlist,
    toggleWishlist: mockToggleWishlist,
  }),
}));

const mockGetLatestArrivals = vi.spyOn(ProductServices, "getLatestArrivals");

describe("LatestArrivals", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeletons while loading", async () => {
    mockGetLatestArrivals.mockResolvedValue({ data: [] });

    customRender(<LatestArrivals />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);

    await waitFor(() => {
      expect(mockGetLatestArrivals).toHaveBeenCalled();
    });
  });

  it("renders product cards after loading", async () => {
    mockGetLatestArrivals.mockResolvedValue({
      data: [
        { id: 1, title: "New Product 1" },
        { id: 2, title: "New Product 2" },
      ],
    });

    customRender(<LatestArrivals />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card").length).toBe(2);
      expect(screen.getByText("New Product 1")).toBeInTheDocument();
      expect(screen.getByText("New Product 2")).toBeInTheDocument();
    });
  });

  it("calls toggleWishlist when clicking wishlist button", async () => {
    mockGetLatestArrivals.mockResolvedValue({
      data: [{ id: 3, title: "Wishlist Product" }],
    });

    customRender(<LatestArrivals />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Add to wishlist"));
      expect(mockToggleWishlist).toHaveBeenCalled();
    });
  });
});
