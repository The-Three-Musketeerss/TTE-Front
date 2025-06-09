import type { Meta, StoryObj } from "@storybook/react";
import CheckoutSummary from "./CheckoutSummary";
import { CartItemProps } from "@utils/types";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ShopProvider } from "@contexts/ShopContext";
import { useState } from "react";

const meta: Meta<typeof CheckoutSummary> = {
  title: "Checkout/CheckoutSummary",
  component: CheckoutSummary,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CheckoutSummary>;

const defaultCart: CartItemProps = {
  userId: 1,
  couponApplied: null,
  shoppingCart: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
  totalBeforeDiscount: 100,
  totalAfterDiscount: 80,
  shippingCost: 10,
  finalTotal: 90,
};

export const Primary: Story = {
  render: () => {
    const [cart, setCart] = useState<CartItemProps>(defaultCart);

    return (
      <CookiesProvider>
        <ShopProvider>
          <BrowserRouter>
            <CheckoutSummary cart={cart} setCart={setCart} />
          </BrowserRouter>
        </ShopProvider>
      </CookiesProvider>
    );
  },
};
