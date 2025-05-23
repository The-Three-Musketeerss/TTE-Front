import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CartCard from "./CartCard";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as ProductServices from "@services/ProductServices";
import * as CartServices from "@services/CartServices";
import * as useShopModule from "@contexts/ShopContext";

// Mocks
vi.mock("@services/ProductServices", () => ({
  getProductById: vi.fn(),
}));

vi.mock("@services/CartServices", () => ({
  deleteFromCart: vi.fn(),
  getCart: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    promise: vi.fn((promise: Promise<any>, opts: any) =>
      promise.then(opts.success).catch(opts.error)
    ),
  },
}));

vi.mock("@contexts/ShopContext", () => ({
  useShop: vi.fn(),
}));

describe("CartCard", () => {
  const setCart = vi.fn();
  const token = "test-token";

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

    (ProductServices.getProductById as any).mockResolvedValue({
      data: {
        id: 1,
        title: "Test Product",
        price: 25,
        image: "https://example.com/img.jpg",
      },
    });

    (CartServices.deleteFromCart as any).mockResolvedValue({
      message: "Removed from cart",
    });

    (CartServices.getCart as any).mockResolvedValue({
      data: { items: [] },
    });
  });

  it("renders product info after fetch and handles remove click", async () => {
    render(<CartCard id={1} token={token} quantity={2} setCart={setCart} />);

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remove"));

    await waitFor(() => {
      expect(CartServices.deleteFromCart).toHaveBeenCalledWith(token, 1);
      expect(CartServices.getCart).toHaveBeenCalledWith(token);
      expect(setCart).toHaveBeenCalledWith({ items: [] });
    });
  });
});
