import type { Meta, StoryObj } from "@storybook/react";
import Users from "./Users";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof Users> = {
  title: "Admin/Users",
  component: Users,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Users>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
