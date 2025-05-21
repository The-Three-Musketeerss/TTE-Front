import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import StepperHeader from "./StepperHeader";

const steps = [
  { key: "address", label: "Address" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
];

describe("StepperHeader", () => {
  it("renders all steps with labels", () => {
    render(<StepperHeader steps={steps} currentStep="shipping" setStep={() => {}} />);

    steps.forEach((step) => {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    });
  });

  it("disables future steps and highlights current step", () => {
    render(<StepperHeader steps={steps} currentStep="shipping" setStep={() => {}} />);

    const shippingButton = screen.getByText("Shipping");
    const paymentButton = screen.getByText("Payment");
    const addressButton = screen.getByText("Address");

    expect(shippingButton).toHaveClass("text-black");

    expect(paymentButton).toBeDisabled();

    expect(addressButton).not.toBeDisabled();
  });

  it("calls setStep when clicking on a past step", () => {
    const setStep = vi.fn();
    render(<StepperHeader steps={steps} currentStep="shipping" setStep={setStep} />);

    const addressButton = screen.getByText("Address");
    fireEvent.click(addressButton);

    expect(setStep).toHaveBeenCalledWith("address");
  });

  it("does not call setStep when clicking on current or future steps", () => {
    const setStep = vi.fn();
    render(<StepperHeader steps={steps} currentStep="shipping" setStep={setStep} />);

    fireEvent.click(screen.getByText("Shipping")); 
    fireEvent.click(screen.getByText("Payment"));

    expect(setStep).not.toHaveBeenCalled();
  });
});
