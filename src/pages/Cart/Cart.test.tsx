import { render, screen, waitFor } from "@testing-library/react";
import Cart from "./Cart";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as useGetUserModule from "@hooks/useGetUser";
import * as CartServices from "@services/CartServices";
import { useNavigate } from "react-router-dom";

// Mocks
vi.mock("@services/CartServices", () => ({
  getCart: vi.fn(),
}));

vi.mock("@components/shared/CartCard/CartCard", () => ({
  __esModule: true,
  default: ({ id, quantity }: any) => (
    <div data-testid="cart-card">{`Product ${id} x${quantity}`}</div>
  ),
}));

vi.mock("@components/Cart/Shipping/Shipping", () => ({
  __esModule: true,
  default: () => <div data-testid="shipping">Shipping Info</div>,
}));

vi.mock("@components/Cart/CartSummary/CartSummary", () => ({
  __esModule: true,
  default: ({ subtotal, total }: any) => (
    <div data-testid="summary">{`Subtotal: ${subtotal}, Total: ${total}`}</div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

describe("Cart", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      navigate
    );
  });

  const mockUser = {
    hasLoggedIn: true,
    user: {
      role: "Shopper",
      token: "abc123",
      username: "testuser",
      email: "user@example.com",
    },
  };

  const cartMock = {
    data: {
      shoppingCart: [{ productId: 1, quantity: 2 }],
      totalBeforeDiscount: 50,
      totalAfterDiscount: 45,
      shippingCost: 5,
      finalTotal: 50,
    },
  };

  it("redirects if user is not logged in", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: false,
      user: null,
    });

    render(<Cart />);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("redirects if user is not a shopper", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: true,
      user: {
        username: "admin",
        email: "admin@example.com",
        role: "Admin",
        token: "admin-token",
      },
    });

    render(<Cart />);
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("renders empty cart message when cart is empty", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue(mockUser);
    (CartServices.getCart as any).mockResolvedValue({
      data: { shoppingCart: [] },
    });

    render(<Cart />);
    await waitFor(() => {
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    });
  });

  it("renders cart, shipping, and summary on success", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue(mockUser);
    (CartServices.getCart as any).mockResolvedValue(cartMock);

    render(<Cart />);

    await waitFor(() => {
      expect(screen.getByText("Your Cart")).toBeInTheDocument();
      expect(screen.getByTestId("cart-card")).toHaveTextContent("Product 1 x2");
      expect(screen.getByTestId("shipping")).toBeInTheDocument();
      expect(screen.getByTestId("summary")).toHaveTextContent(
        "Subtotal: 50, Total: 50"
      );
    });
  });

  it("displays link to continue shopping", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue(mockUser);
    (CartServices.getCart as any).mockResolvedValue(cartMock);

    render(<Cart />);
    await waitFor(() => {
      expect(
        screen.getByText("Not ready to checkout? Continue Shopping")
      ).toHaveAttribute("href", "/listing");
    });
  });

  it("logs an error if cart fetch fails", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue(mockUser);
    (CartServices.getCart as any).mockRejectedValue(new Error("Network Error"));

    render(<Cart />);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch cart:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
