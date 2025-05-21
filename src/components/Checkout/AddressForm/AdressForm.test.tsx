import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddressForm from "./AddressForm";

describe("AddressForm", () => {
  it("renders all fields correctly", () => {
    const mockNext = vi.fn();
    render(<AddressForm onNext={mockNext} />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Apartment, suite, etc (optional)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Zipcode")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Optional")).toBeInTheDocument();

    const selects = screen.getAllByRole("combobox");
    expect(selects).toHaveLength(2);
    expect(selects[0]).toHaveDisplayValue("Country");
    expect(selects[1]).toHaveDisplayValue("City");

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue to shipping" })).toBeInTheDocument();
  });

  it("calls onNext with form data when submitted", async () => {
    const mockNext = vi.fn();
    render(<AddressForm onNext={mockNext} />);

    fireEvent.input(screen.getByPlaceholderText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByPlaceholderText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByPlaceholderText("Address"), {
      target: { value: "123 Main St" },
    });
    fireEvent.input(screen.getByPlaceholderText("Apartment, suite, etc (optional)"), {
      target: { value: "Apt 4" },
    });
    fireEvent.change(screen.getAllByRole("combobox")[0], {
      target: { value: "Colombia" },
    });
    fireEvent.change(screen.getAllByRole("combobox")[1], {
      target: { value: "Bogotá" },
    });
    fireEvent.input(screen.getByPlaceholderText("Zipcode"), {
      target: { value: "11011" },
    });
    fireEvent.input(screen.getByPlaceholderText("Optional"), {
      target: { value: "Some notes" },
    });
    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: "Continue to shipping" }));
    await waitFor(() => {
    expect(mockNext).toHaveBeenCalledWith("123 Main St", expect.objectContaining({
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      apartment: "Apt 4",
      country: "Colombia",
      city: "Bogotá",
      zipcode: "11011",
      optional: "Some notes",
      saveContact: true,
    }))});
  });
});
