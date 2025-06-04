import type { Meta, StoryObj } from "@storybook/react";
import CategoryList from "./CategoryList";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof CategoryList> = {
  title: "Homepage/CategoryList",
  component: CategoryList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CategoryList>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <CategoryList />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
