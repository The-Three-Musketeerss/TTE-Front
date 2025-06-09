import type { Meta, StoryObj } from "@storybook/react";
import StepperHeader from "./StepperHeader";
import { useState, useEffect } from "react";

const meta: Meta<typeof StepperHeader> = {
  title: "Checkout/StepperHeader",
  component: StepperHeader,
  tags: ["autodocs"],
  argTypes: {
    currentStep: {
      control: "radio",
      options: ["address", "shipping", "payment"],
      defaultValue: "address",
    },
  },
};

export default meta;

type Story = StoryObj<typeof StepperHeader>;

export const Primary: Story = {
  args: {
    currentStep: "address",
  },
  render: (args) => {
    const steps = [
      { key: "address", label: "Address" },
      { key: "shipping", label: "Shipping" },
      { key: "payment", label: "Payment" },
    ];

    const [step, setStep] = useState(args.currentStep);

    useEffect(() => {
      setStep(args.currentStep);
    }, [args.currentStep]);

    return (
      <div className="p-4 bg-white rounded-md shadow max-w-md">
        <StepperHeader steps={steps} currentStep={step} setStep={setStep} />
      </div>
    );
  },
};
