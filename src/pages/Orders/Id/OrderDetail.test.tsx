import { render, screen, waitFor } from "@testing-library/react";
import OrderDetail from "./OrderDetail";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as OrderServices from "@services/OrderServices";
import * as useGetUserModule from "@hooks/useGetUser";
import { useNavigate, useParams } from "react-router-dom";

// Mocks
vi.mock("@services/OrderServices", () => ({
  getOrderById: vi.fn(),
}));

vi.mock("@hooks/useGetUser", () => ({
  useGetUser: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("@components/OrderDetail/OrderCard/OrderCard", () => ({
  default: ({ id, quantity }: any) => (
    <div>OrderCard - Product {id} (x{quantity})</div>
  ),
}));

vi.mock("@components/OrderDetail/OrderSummary/OrderSummary", () => ({
  default: ({ total, shipping }: any) => (
    <div>OrderSummary - Total: ${total}, Shipping: ${shipping}</div>
  ),
}));

describe("OrderDetail", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigate);
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: "42" });

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        username: "test-user",
        email: "test@example.com",
        role: "user",
        token: "test-token",
      },
      hasLoggedIn: true,
    });

    (OrderServices.getOrderById as any).mockResolvedValue({
      data: {
        id: 42,
        orderItems: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
        total: 150,
        shipping: 10,
      },
    });
  });

  it("fetches and displays order details", async () => {
    render(<OrderDetail />);

    await waitFor(() => {
      expect(OrderServices.getOrderById).toHaveBeenCalledWith("test-token", 42);
    });

    expect(screen.getByText("OrderCard - Product 1 (x2)")).toBeInTheDocument();
    expect(screen.getByText("OrderCard - Product 2 (x1)")).toBeInTheDocument();
    expect(screen.getByText("OrderSummary - Total: $150, Shipping: $10")).toBeInTheDocument();
  });
});
