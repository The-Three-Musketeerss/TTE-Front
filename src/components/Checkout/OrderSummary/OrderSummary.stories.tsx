import type { Meta, StoryObj } from "@storybook/react";
import OrderSummary from "./OrderSummary";

const meta: Meta<typeof OrderSummary> = {
  title: "Checkout/OrderSummary",
  component: OrderSummary,
  tags: ["autodocs"],
  argTypes: {
    subtotal: {
      control: { type: "number" },
      defaultValue: 100,
    },
    subAfterDiscount: {
      control: { type: "number" },
      defaultValue: 80,
    },
    shipping: {
      control: { type: "number" },
      defaultValue: 10,
    },
    total: {
      control: { type: "number" },
      defaultValue: 90,
    },
    setCart: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof OrderSummary>;

export const Primary: Story = {
  args: {
    subtotal: 100,
    subAfterDiscount: 80,
    shipping: 10,
    total: 90,
    setCart: () => {},
  },
};
