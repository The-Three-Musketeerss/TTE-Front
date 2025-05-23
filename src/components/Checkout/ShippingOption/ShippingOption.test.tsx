import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ShippingOption from "./ShippingOption";

describe("ShippingOption", () => {
  const baseProps = {
    id: "surepost",
    title: "UPS/USPS Surepost",
    description: "4–7 Business Days",
  };

  it("renders title and description", () => {
    render(
      <ShippingOption
        {...baseProps}
        selected={false}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it("sets input as checked when selected is true", () => {
    render(
      <ShippingOption
        {...baseProps}
        selected={true}
        onSelect={() => {}}
      />
    );

    const radio = screen.getByRole("radio");
    expect(radio).toBeChecked();
  });

  it("calls onSelect with the correct ID when clicked", () => {
    const mockSelect = vi.fn();

    render(
      <ShippingOption
        {...baseProps}
        selected={false}
        onSelect={mockSelect}
      />
    );

    const radio = screen.getByRole("radio");
    fireEvent.click(radio);

    expect(mockSelect).toHaveBeenCalledWith("surepost");
  });
});