import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Wishlist from "./Wishlist";
import * as WishlistServices from "@services/WishlistServices";
import * as useGetUserModule from "@hooks/useGetUser";
import { customRender } from "@utils/test-utils";

const mockToggleWishlist = vi.fn();
const mockIsInWishlist = vi.fn((id: number) => id === 1);
const mockNavigate = vi.fn();

vi.mock("@components/shared/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({ title, onToggleFavorite }: any) => (
    <div data-testid="product-card">
      <p>{title}</p>
      <button onClick={onToggleFavorite}>Toggle Wishlist</button>
    </div>
  ),
}));

vi.mock("@components/shared/ProductCard/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, onClick }: any) => <button onClick={onClick}>{text}</button>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@contexts/ShopContext", () => ({
  useShop: () => ({
    toggleWishlist: mockToggleWishlist,
    isInWishlist: mockIsInWishlist,
    wishlist: new Set([1]),
  }),
}));

const mockGetWishlist = vi.spyOn(WishlistServices, "getWishlist");

describe("Wishlist component", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        token: "mock-token",
        username: "testuser",
        email: "test@example.com",
        role: "Shopper",
      },
      hasLoggedIn: true,
    });
  });

  it("renders skeletons while loading", async () => {
    mockGetWishlist.mockResolvedValue([]);

    customRender(<Wishlist />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);

    await waitFor(() => {
      expect(mockGetWishlist).toHaveBeenCalled();
    });
  });

  it("renders wishlist products after loading", async () => {
    mockGetWishlist.mockResolvedValue([
      { id: 1, title: "Item 1", image: "url", price: 10 },
      { id: 2, title: "Item 2", image: "url", price: 20 },
    ]);

    customRender(<Wishlist />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(2);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  it("calls toggleWishlist when clicking toggle button", async () => {
    mockGetWishlist.mockResolvedValue([
      { id: 3, title: "Item 3", image: "url", price: 30 },
    ]);

    customRender(<Wishlist />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Toggle Wishlist"));
      expect(mockToggleWishlist).toHaveBeenCalled();
    });
  });

  it("shows empty message if no products", async () => {
    mockGetWishlist.mockResolvedValue([]);

    customRender(<Wishlist />);

    await waitFor(() => {
      expect(screen.getByText("Your wishlist is empty")).toBeInTheDocument();
      expect(
        screen.getByText("Start adding your favorite items to keep track of them here.")
      ).toBeInTheDocument();
    });
  });

  it("navigates to /listing when clicking 'Shop all'", async () => {
    mockGetWishlist.mockResolvedValue([]);

    customRender(<Wishlist />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Shop all"));
      expect(mockNavigate).toHaveBeenCalledWith("/listing");
    });
  });
});
