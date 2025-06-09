import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {
  render: () => (
    <CookiesProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </CookiesProvider>
  ),
};
