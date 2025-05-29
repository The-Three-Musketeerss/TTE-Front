import { screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Orders from "./Orders";
import * as OrderServices from "@services/OrderServices";
import * as useGetUserModule from "@hooks/useGetUser";
import { customRender } from "@utils/test-utils";

vi.mock("@components/shared/Table/Table", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <table data-testid="order-table">
      <tbody>
        {data.map((row: any, i: number) => (
          <tr key={i}>
            <td>{row.orderNo}</td>
            <td>{row.customerName}</td>
            <td>{row.paymentStatus}</td>
            <td>{row.amount}</td>
            <td>{row.address}</td>
            <td>{row.orderDate}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("@components/shared/Table/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="table-skeleton">Loading...</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

const mockGetOrders = vi.spyOn(OrderServices, "getOrders");

describe("Orders component", () => {
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

  it("shows loading skeleton initially", async () => {
    mockGetOrders.mockResolvedValue({ data: [] });

    customRender(<Orders />);

    expect(screen.getByTestId("table-skeleton")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetOrders).toHaveBeenCalledWith("mock-token");
    });
  });

  it("renders order table with rows", async () => {
    mockGetOrders.mockResolvedValue({
      data: [
        {
          id: 1,
          customerName: "John Doe",
          paymentStatus: "Paid",
          finalTotal: 120.5,
          address: "123 Main St",
          createdAt: new Date().toISOString(),
          status: "Shipped",
        },
      ],
    });

    customRender(<Orders />);

    await waitFor(() => {
      expect(screen.getByTestId("order-table")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Paid")).toBeInTheDocument();
      expect(screen.getByText("$120.50")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("Shipped")).toBeInTheDocument();
    });
  });

  it("shows message when there are no orders", async () => {
    mockGetOrders.mockResolvedValue({ data: [] });

    customRender(<Orders />);

    await waitFor(() => {
      expect(screen.getByText("No orders found.")).toBeInTheDocument();
    });
  });

  it("does not call getOrders if token is missing", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: null,
      hasLoggedIn: false,
    });

    customRender(<Orders />);

    await waitFor(() => {
      expect(mockGetOrders).not.toHaveBeenCalled();
    });
  });
});
