import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import { describe, it, expect } from "vitest";

describe("OrderSummary", () => {
  const mockOrder = {
    address: "123 Main St, Cityville",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "2024-05-20T15:30:00Z",
    totalBeforeDiscount: 100,
    totalAfterDiscount: 90,
    shippingCost: 11,
    finalTotal: 101,
  };

  it("renders all order summary fields correctly", () => {
    render(<OrderSummary id={0} userId={0} couponId={null} customerName={""} {...mockOrder} />);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();

    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, Cityville")).toBeInTheDocument();

    expect(screen.getByText("Payment Status")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();

    expect(screen.getByText("Order Status")).toBeInTheDocument();
    expect(screen.getByText("Delivered")).toBeInTheDocument();

    expect(screen.getByText("Order Date")).toBeInTheDocument();
    expect(screen.getByText(new Date(mockOrder.createdAt).toLocaleDateString())).toBeInTheDocument();

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    expect(screen.getByText("Discount")).toBeInTheDocument();
    expect(screen.getByText("$-10.00")).toBeInTheDocument();

    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("$11")).toBeInTheDocument();

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$101")).toBeInTheDocument();
  });
});
