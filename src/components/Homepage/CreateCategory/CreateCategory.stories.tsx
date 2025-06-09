import type { Meta, StoryObj } from "@storybook/react";
import CreateCategory from "./CreateCategory";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof CreateCategory> = {
  title: "Homepage/CreateCategory",
  component: CreateCategory,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreateCategory>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <CreateCategory />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
