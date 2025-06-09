import type { Meta, StoryObj } from "@storybook/react";
import OrderSummary from "./OrderSummary";
import { orderProps } from "@utils/types";

const meta: Meta<typeof OrderSummary> = {
  title: "Orders/OrderSummary",
  component: OrderSummary,
  tags: ["autodocs"],
  argTypes: {
    address: { control: "text", defaultValue: "123 Example St." },
    paymentStatus: { control: "text", defaultValue: "Paid" },
    status: { control: "text", defaultValue: "Shipped" },
    createdAt: { control: "date", defaultValue: new Date().toISOString() },
    totalBeforeDiscount: { control: "number", defaultValue: 100 },
    totalAfterDiscount: { control: "number", defaultValue: 80 },
    shippingCost: { control: "number", defaultValue: 10 },
    finalTotal: { control: "number", defaultValue: 90 },
    customerName: { control: "text", defaultValue: "John Doe" },
    userId: { control: false },   
    couponId: { control: false },   
    id: { control: false },        
    orderItems: { control: false }, 
  },
};

export default meta;

type Story = StoryObj<typeof OrderSummary>;

export const Primary: Story = {
  args: {
    id: 1,
    userId: 1,
    couponId: null,
    address: "123 Example St.",
    paymentStatus: "Paid",
    status: "Shipped",
    createdAt: new Date().toISOString(),
    totalBeforeDiscount: 100,
    totalAfterDiscount: 80,
    shippingCost: 10,
    finalTotal: 90,
    customerName: "John Doe",
  },
  render: (args) => <OrderSummary {...(args as orderProps)} />,
};
