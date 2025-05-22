import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartSummary from "./CartSummary";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as CartServices from "@services/CartServices";
import * as useGetUserModule from "@hooks/useGetUser";
import * as useShopModule from "@contexts/ShopContext";
import { useNavigate } from "react-router-dom";

// Mocks
vi.mock("@services/CartServices", () => ({
  applyCoupon: vi.fn(),
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

vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  default: ({ register, placeholder }: any) => {
    const { name, onChange, onBlur, ref } = register;
    return (
      <input
        aria-label={placeholder}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
  },
}));

vi.mock("@components/shared/Button/Button", () => ({
  default: ({ text, onClick }: any) => (
    <button onClick={onClick}>{text}</button>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("CartSummary", () => {
  const setCart = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigate);

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        username: "test-user",
        email: "test@example.com",
        role: "user",
        token: "test-token",
      },
      hasLoggedIn: true,
    });

    vi.spyOn(useShopModule, "useShop").mockReturnValue({
      wishlist: new Set<number>(),
      isInWishlist: vi.fn(() => false),
      toggleWishlist: vi.fn(),
      loading: false,
      cartCount: 0,
      refreshCart: vi.fn(),
      resetShop: vi.fn(),
    });

    (CartServices.applyCoupon as any).mockResolvedValue({ message: "Discount applied" });
    (CartServices.getCart as any).mockResolvedValue({
      data: { items: ["item1", "item2"] },
    });
  });

  it("applies coupon and updates cart", async () => {
    render(
      <CartSummary
        subtotal={100}
        subAfterDiscount={80}
        shipping={10}
        total={90}
        setCart={setCart}
      />
    );

    fireEvent.change(screen.getByLabelText("Enter coupon code here"), {
      target: { value: "DISCOUNT10" },
    });

    fireEvent.submit(screen.getByLabelText("Enter coupon code here").closest("form") as HTMLFormElement);

    await waitFor(() => {
      expect(CartServices.applyCoupon).toHaveBeenCalledWith(
        "test-token",
        "DISCOUNT10"
      );
      expect(CartServices.getCart).toHaveBeenCalledWith("test-token");
      expect(setCart).toHaveBeenCalledWith({ items: ["item1", "item2"] });
    });
  });

  it("navigates to checkout on button click", () => {
    render(
      <CartSummary
        subtotal={100}
        subAfterDiscount={80}
        shipping={10}
        total={90}
        setCart={setCart}
      />
    );

    fireEvent.click(screen.getByText("Continue to checkout"));
    expect(navigate).toHaveBeenCalledWith("/checkout");
  });
});
