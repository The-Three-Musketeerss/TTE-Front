import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderSummary from "./OrderSummary";

describe("OrderSummary", () => {
  it("renders all price values correctly", () => {
    const props = {
      subtotal: 100,
      subAfterDiscount: 80,
      shipping: 10,
      total: 90,
      setCart: vi.fn(),
    };

    render(<OrderSummary {...props} />);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();

    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText("$90")).toBeInTheDocument();
  });
});