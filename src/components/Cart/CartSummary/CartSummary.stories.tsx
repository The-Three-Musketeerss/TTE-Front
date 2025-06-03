import type { Meta, StoryObj } from "@storybook/react";
import CartSummary from "./CartSummary";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "@contexts/ShopContext";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

const meta: Meta<typeof CartSummary> = {
  title: "Cart/CartSummary",
  component: CartSummary,
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
  },
};

export default meta;

type Story = StoryObj<typeof CartSummary>;

export const Primary: Story = {
  args: {
    subtotal: 100,
    subAfterDiscount: 80,
    shipping: 10,
    total: 90,
  },
  render: (args) => {
    const [cart, setCart] = useState({});
    return (
      <CookiesProvider>
        <ShopProvider>
          <BrowserRouter>
            <CartSummary {...args} setCart={setCart} />
          </BrowserRouter>
        </ShopProvider>
      </CookiesProvider>
    );
  },
};
