import { render, screen, fireEvent } from "@testing-library/react";
import QuantityInput from "./QuantityInput";
import { describe, it, expect, vi } from "vitest";
describe("QuantityInput", () => {
  it("renders with initial count", () => {
    render(<QuantityInput count={3} setCount={vi.fn()} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
  });

  it("calls setCount with increment", () => {
    const setCount = vi.fn();
    render(<QuantityInput count={2} setCount={setCount} />);

    const incrementButton = screen.getAllByRole("button")[1]; // second button
    fireEvent.click(incrementButton);

    expect(setCount).toHaveBeenCalledWith(3);
  });

  it("calls setCount with decrement", () => {
    const setCount = vi.fn();
    render(<QuantityInput count={2} setCount={setCount} />);

    const decrementButton = screen.getAllByRole("button")[0]; // first button
    fireEvent.click(decrementButton);

    expect(setCount).toHaveBeenCalledWith(1);
  });

  it("disables decrement button at minCount", () => {
    const setCount = vi.fn();
    render(<QuantityInput count={1} setCount={setCount} minCount={1} />);

    const decrementButton = screen.getAllByRole("button")[0];
    expect(decrementButton).toBeDisabled();
  });

  it("disables increment button at maxCount", () => {
    const setCount = vi.fn();
    render(<QuantityInput count={10} setCount={setCount} maxCount={10} />);

    const incrementButton = screen.getAllByRole("button")[1];
    expect(incrementButton).toBeDisabled();
  });
});
