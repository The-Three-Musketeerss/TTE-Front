import type { Meta, StoryObj } from "@storybook/react";
import PaymentForm from "./PaymentForm";

const meta: Meta<typeof PaymentForm> = {
  title: "Checkout/PaymentForm",
  component: PaymentForm,
  tags: ["autodocs"],
  argTypes: {
    address: {
      control: "text",
      defaultValue: "123 Main St",
    },
    initialValues: {
      control: "object",
      defaultValue: {
        cardholderName: "John Doe",
        cardNumber: "4111111111111111",
        expiryMonth: "12",
        expiryYear: new Date().getFullYear().toString(),
        cvc: "123",
        saveCard: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PaymentForm>;

export const Primary: Story = {
  args: {
    address: "123 Main St",
    initialValues: {
      cardholderName: "John Doe",
      cardNumber: "4111111111111111",
      expiryMonth: "12",
      expiryYear: new Date().getFullYear().toString(),
      cvc: "123",
      saveCard: true,
    },
  },
  render: (args) => (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow">
      <PaymentForm
        {...args}
        onChange={(data) => console.log("Payment form changed:", data)}
        onFinish={() => alert("Payment complete")}
      />
    </div>
  ),
};
