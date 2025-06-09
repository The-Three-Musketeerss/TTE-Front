import type { Meta, StoryObj } from "@storybook/react";
import CreateEmployee from "./CreateEmployee";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof CreateEmployee> = {
  title: "Admin/CreateEmployee",
  component: CreateEmployee,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CreateEmployee>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <CreateEmployee />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
