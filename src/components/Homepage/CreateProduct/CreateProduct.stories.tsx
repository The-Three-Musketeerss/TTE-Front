import type { Meta, StoryObj } from "@storybook/react";
import CreateProduct from "./CreateProduct";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof CreateProduct> = {
  title: "Admin/CreateProduct",
  component: CreateProduct,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreateProduct>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <CreateProduct />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
