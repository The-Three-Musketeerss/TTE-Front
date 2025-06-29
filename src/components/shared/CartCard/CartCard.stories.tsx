import type { Meta, StoryObj } from "@storybook/react";
import CartCard from "./CartCard";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "@contexts/ShopContext";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof CartCard> = {
  title: "Cart/CartCard",
  component: CartCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CartCard>;

export const Primary: Story = {
  args: {
    id: 1,
    token: "fake-token",
    quantity: 2,
  },
  render: (args) => {
    return (
      <CookiesProvider>
        <ShopProvider>
          <BrowserRouter>
            <CartCard {...args}/>
          </BrowserRouter>
        </ShopProvider>
      </CookiesProvider>
    );
  },
};
