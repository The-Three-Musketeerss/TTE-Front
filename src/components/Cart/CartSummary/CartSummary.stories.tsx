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
};

export default meta;

type Story = StoryObj<typeof CartSummary>;

export const Primary: Story = {
  render: () => {
    const [cart, setCart] = useState({});

    return (
      <CookiesProvider>
        <ShopProvider>
          <BrowserRouter>
            <CartSummary
              subtotal={100}
              subAfterDiscount={80}
              shipping={10}
              total={90}
              setCart={setCart}
            />
          </BrowserRouter>
        </ShopProvider>
      </CookiesProvider>
    );
  },
};
