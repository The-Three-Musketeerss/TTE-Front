import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentForm from "./PaymentForm";

vi.mock("@services/OrderServices", () => ({
  createOrder: vi.fn(() => Promise.resolve()),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    promise: vi.fn((promise) => promise),
  },
}));

vi.mock("@hooks/useGetUser", () => ({
  useGetUser: () => ({ user: { token: "fake-token" } }),
}));

describe("PaymentForm", () => {
  const onFinish = vi.fn();
  const onChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all inputs and select fields", () => {
    render(<PaymentForm address="123 Main St" onFinish={onFinish} onChange={onChange} />);

    expect(screen.getByPlaceholderText("Cardholder Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Card Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVC")).toBeInTheDocument();

    expect(screen.getByRole("combobox", { name: /expiry month/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /expiry year/i })).toBeInTheDocument();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pay with card/i })).toBeInTheDocument();
  });

  it("calls createOrder and onFinish when submitted", async () => {
    const { createOrder } = await import("@services/OrderServices");

    render(<PaymentForm address="456 Elm St" onFinish={onFinish} onChange={onChange} />);

    fireEvent.input(screen.getByPlaceholderText("Cardholder Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByPlaceholderText("Card Number"), {
      target: { value: "1234567812345678" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /expiry month/i }), {
      target: { value: "01" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /expiry year/i }), {
      target: { value: new Date().getFullYear().toString() },
    });
    fireEvent.input(screen.getByPlaceholderText("CVC"), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /pay with card/i }));

    await waitFor(() => {
      expect(createOrder).toHaveBeenCalledWith("456 Elm St", "fake-token");
      expect(onFinish).toHaveBeenCalled();
    });
  });

  it("shows validation errors when fields are empty", async () => {
    render(<PaymentForm address="123" onFinish={onFinish} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: /pay with card/i }));

    await screen.findByText("Cardholder name is required");
    expect(screen.getByText("Card number is required")).toBeInTheDocument();
    expect(screen.getByText("Month is required")).toBeInTheDocument();
    expect(screen.getByText("Year is required")).toBeInTheDocument();
    expect(screen.getByText("CVC is required")).toBeInTheDocument();
  });
});