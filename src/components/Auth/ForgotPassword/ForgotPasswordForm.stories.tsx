import type { Meta, StoryObj } from "@storybook/react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ForgotPasswordForm>;

export const Primary: Story = {
  render: () => (
    <BrowserRouter>
      <ForgotPasswordForm />
    </BrowserRouter>
  ),
};
