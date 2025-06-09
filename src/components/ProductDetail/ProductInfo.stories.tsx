import type { Meta, StoryObj } from "@storybook/react";
import ProductInfo from "./ProductInfo";
import { ProductProps } from "@utils/types";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ShopProvider } from "@contexts/ShopContext";

const meta: Meta<typeof ProductInfo> = {
  title: "Shop/ProductInfo",
  component: ProductInfo,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "number", defaultValue: 1 },
    title: { control: "text", defaultValue: "Wireless Headphones" },
    price: { control: "number", defaultValue: 99.99 },
    description: {
      control: "text",
      defaultValue: "Noise-canceling Bluetooth headphones.",
    },
    category: {
      control: "text",
      defaultValue: "Audio",
    },
    image: {
      control: "text",
      defaultValue: "https://via.placeholder.com/300https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    inventory: {
      control: "object",
      defaultValue: { total: 100, available: 20 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductInfo>;

export const Primary: Story = {
  args: {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    description: "Noise-canceling Bluetooth headphones.",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inventory: { total: 100, available: 20 },
  },
  render: (args) => (
    <CookiesProvider>
      <ShopProvider>
        <BrowserRouter>
          <ProductInfo {...(args as ProductProps)} />
        </BrowserRouter>
      </ShopProvider>
    </CookiesProvider>
  ),
};
