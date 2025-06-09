import type { Meta, StoryObj } from "@storybook/react";
import ProductList from "./ProductList";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof ProductList> = {
  title: "Homepage/ProductList",
  component: ProductList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductList>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
