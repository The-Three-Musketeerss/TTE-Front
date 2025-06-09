import type { Meta, StoryObj } from "@storybook/react";
import OrderCard from "./OrderCard";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof OrderCard> = {
  title: "Orders/OrderCard",
  component: OrderCard,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "number", defaultValue: 1 },
    token: { control: "text", defaultValue: "mock-token" },
    quantity: { control: "number", defaultValue: 2 },
  },
};

export default meta;

type Story = StoryObj<typeof OrderCard>;

export const Primary: Story = {
  args: {
    id: 1,
    token: "mock-token",
    quantity: 2,
  },
  render: (args) => (
    <CookiesProvider>
      <BrowserRouter>
        <OrderCard {...args} />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
