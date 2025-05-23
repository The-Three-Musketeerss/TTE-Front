import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ShippingMethodForm from "./ShippingMethodForm";

describe("ShippingMethodForm", () => {
    it("renders both shipping options with correct default selection", () => {
        const mockChange = vi.fn();
        const mockNext = vi.fn();
        render(<ShippingMethodForm onChange={mockChange} onNext={mockNext} />);

        expect(screen.getByText("UPS/USPS Surepost")).toBeInTheDocument();
        expect(screen.getByText("4–7 Business Days")).toBeInTheDocument();
        expect(screen.getByText("UPS Ground Shipping")).toBeInTheDocument();
        expect(screen.getByText("3–5 Business Days")).toBeInTheDocument();

        const surepostRadio = screen.getByRole("radio", { name: /UPS\/USPS Surepost/i }) as HTMLInputElement;
        const groundRadio = screen.getByRole("radio", { name: /UPS Ground Shipping/i }) as HTMLInputElement;

        expect(surepostRadio.checked).toBe(true);
        expect(groundRadio.checked).toBe(false);
    });

    it("calls onChange when a shipping option is selected", () => {
        const mockChange = vi.fn();
        const mockNext = vi.fn();
        render(<ShippingMethodForm onChange={mockChange} onNext={mockNext} />);

        const groundRadio = screen.getByRole("radio", { name: /UPS Ground Shipping/i });
        fireEvent.click(groundRadio);
        expect(mockChange).toHaveBeenCalledWith("ground");
    });


    it("calls onNext when the continue button is clicked", () => {
        const mockChange = vi.fn();
        const mockNext = vi.fn();
        render(<ShippingMethodForm onChange={mockChange} onNext={mockNext} />);

        fireEvent.click(screen.getByRole("button", { name: /Continue to payment/i }));
        expect(mockNext).toHaveBeenCalled();
    });
});