import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductInfo from "./ProductInfo";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as useUserModule from "@hooks/useGetUser";
import * as useShopModule from "@contexts/ShopContext";
import * as CartServices from "@services/CartServices";
import toast from "react-hot-toast";

// Mocks
vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

vi.mock("@components/shared/QuantityInput/QuantityInput", () => ({
  __esModule: true,
  default: ({ count, setCount }: any) => (
    <div>
      <button onClick={() => setCount(count - 1)} disabled={count <= 1}>
        -
      </button>
      <span data-testid="quantity">{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  ),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    promise: vi.fn((promise: Promise<any>, opts: any) =>
      promise.then(opts.success).catch(opts.error)
    ),
    error: vi.fn(),
  },
}));

vi.mock("react-icons/ai", () => ({
  AiOutlineHeart: () => <svg data-testid="heart-outline" />,
  AiFillHeart: () => <svg data-testid="heart-filled" />,
}));

vi.mock("react-icons/ci", () => ({
  CiShare1: () => <svg data-testid="share-icon" />,
}));

describe("ProductInfo", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 10,
    description: "A great item",
    category: "Books",
    image: "",
    inventory: { available: 5, total: 5 },
  };

  const refreshCart = vi.fn();
  const toggleWishlist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: true,
      user: {
        username: "testuser",
        email: "test@example.com",
        role: "Shopper",
        token: "fake-token",
      },
    });

    vi.spyOn(useShopModule, "useShop").mockReturnValue({
      wishlist: new Set<number>(),
      isInWishlist: vi.fn(() => false),
      toggleWishlist,
      loading: false,
      cartCount: 0,
      refreshCart,
      resetShop: vi.fn(),
    });

    vi.spyOn(CartServices, "addToCart").mockResolvedValue({});
  });

  it("renders product information", () => {
    render(<ProductInfo {...mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("A great item")).toBeInTheDocument();
  });

  it("shows outline heart when product is not wishlisted", () => {
    render(<ProductInfo {...mockProduct} />);
    expect(screen.getByTestId("heart-outline")).toBeInTheDocument();
  });

  it("calls toggleWishlist when heart icon is clicked", () => {
    render(<ProductInfo {...mockProduct} />);
    fireEvent.click(screen.getByTestId("heart-outline").closest("button")!);
    expect(toggleWishlist).toHaveBeenCalledWith(1);
  });

  it("adds to cart and updates cart when button is clicked", async () => {
    render(<ProductInfo {...mockProduct} />);
    fireEvent.click(screen.getByText("Add to Cart - $10.00"));

    await waitFor(() => {
      expect(CartServices.addToCart).toHaveBeenCalledWith("fake-token", 1, 1);
      expect(refreshCart).toHaveBeenCalled();
    });
  });

  it("prevents add to cart if not logged in", async () => {
    vi.spyOn(useUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: false,
      user: null,
    });

    render(<ProductInfo {...mockProduct} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please log in to add items to your cart."
      );
    });
  });

  it("prevents add to cart if role is not Shopper", async () => {
    vi.spyOn(useUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: true,
      user: {
        username: "adminuser",
        email: "admin@example.com",
        role: "Admin",
        token: "admin-token",
      },
    });

    render(<ProductInfo {...mockProduct} />);
    fireEvent.click(screen.getByText(/Add to Cart/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please log in to add items to your cart."
      );
    });
  });

  it("updates price display as quantity changes", () => {
    render(<ProductInfo {...mockProduct} />);
    expect(screen.getByText("Add to Cart - $10.00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("Add to Cart - $20.00")).toBeInTheDocument();

    fireEvent.click(screen.getByText("-"));
    expect(screen.getByText("Add to Cart - $10.00")).toBeInTheDocument();
  });

  it("handles addToCart failure", async () => {
    vi.spyOn(CartServices, "addToCart").mockRejectedValue(
      new Error("Server error")
    );

    render(<ProductInfo {...mockProduct} />);
    fireEvent.click(screen.getByText("Add to Cart - $10.00"));

    await waitFor(() => {
      expect(toast.promise).toHaveBeenCalled();
    });
  });
});
