import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { ShopProvider, useShop } from "./ShopContext";
import * as WishlistServices from "@services/WishlistServices";
import * as CartServices from "@services/CartServices";
import * as useGetUserHook from "@hooks/useGetUser";
import toast from "react-hot-toast";
import { act } from "react";

vi.mock("@services/WishlistServices");
vi.mock("@services/CartServices");
vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const TestComponent = () => {
  const {
    wishlist,
    isInWishlist,
    toggleWishlist,
    cartCount,
    refreshCart,
    resetShop,
  } = useShop();

  return (
    <div>
      <p>{`wishlist-size: ${wishlist.size}`}</p>
      <p>{`cart-count: ${cartCount}`}</p>
      <button onClick={() => toggleWishlist(1)}>Toggle Wishlist</button>
      <button onClick={() => refreshCart()}>Refresh Cart</button>
      <button onClick={() => resetShop()}>Reset</button>
      <p>{`wishlist-status: ${isInWishlist(1) ? "yes" : "no"}`}</p>
    </div>
  );
};

describe("ShopProvider", () => {
  const mockUser = {
    user: { username: "mock-username", email: "mock@email.com", token: "mock-token", role: "Shopper" },
    hasLoggedIn: true,
  };

  const mockGetWishlist = WishlistServices.getWishlist as unknown as ReturnType<typeof vi.fn>;
  const mockAddToWishlist = WishlistServices.addToWishlist as unknown as ReturnType<typeof vi.fn>;
  const mockRemoveFromWishlist = WishlistServices.removeFromWishlist as unknown as ReturnType<typeof vi.fn>;
  const mockGetCart = CartServices.getCart as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useGetUserHook, "useGetUser").mockReturnValue(mockUser);
  });

  it("initializes wishlist and cartCount", async () => {
    mockGetWishlist.mockResolvedValue([{ id: 1 }]);
    mockGetCart.mockResolvedValue({
      data: { shoppingCart: [{ quantity: 2 }, { quantity: 3 }] },
    });

    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes("wishlist-size: 1"))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes("cart-count: 5"))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes("wishlist-status: yes"))).toBeInTheDocument();
    });
  });

  it("adds item to wishlist", async () => {
    mockGetWishlist.mockResolvedValue([]);
    mockAddToWishlist.mockResolvedValue({});

    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    await waitFor(() => screen.getByText((text) => text.includes("wishlist-size: 0")));

    fireEvent.click(screen.getByText("Toggle Wishlist"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Added to wishlist");
      expect(screen.getByText((text) => text.includes("wishlist-size: 1"))).toBeInTheDocument();
    });
  });

  it("removes item from wishlist", async () => {
    mockGetWishlist.mockResolvedValue([{ id: 1 }]);
    mockRemoveFromWishlist.mockResolvedValue({});

    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    await waitFor(() => screen.getByText((text) => text.includes("wishlist-size: 1")));

    fireEvent.click(screen.getByText("Toggle Wishlist"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Removed from wishlist");
      expect(screen.getByText((text) => text.includes("wishlist-size: 0"))).toBeInTheDocument();
    });
  });

  it("shows error when non-shopper tries to add to wishlist", async () => {
    vi.spyOn(useGetUserHook, "useGetUser").mockReturnValue({
      user: { username: "mock-username", email: "mock@email.com", token: "mock-token", role: "Admin" },
      hasLoggedIn: true,
    });

    mockGetWishlist.mockResolvedValue([]);
    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    fireEvent.click(screen.getByText("Toggle Wishlist"));

    expect(toast.error).toHaveBeenCalledWith("Only shoppers can add to wishlist");
  });

  it("resets state with resetShop", async () => {
    mockGetWishlist.mockResolvedValue([{ id: 1 }]);
    mockGetCart.mockResolvedValue({
      data: { shoppingCart: [{ quantity: 10 }] },
    });

    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes("wishlist-size: 1"))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes("cart-count: 10"))).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Reset"));
    });

    await waitFor(() => {
      expect(screen.getByText((text) => text.includes("wishlist-size: 0"))).toBeInTheDocument();
      expect(screen.getByText((text) => text.includes("cart-count: 0"))).toBeInTheDocument();
    });
  });
});
