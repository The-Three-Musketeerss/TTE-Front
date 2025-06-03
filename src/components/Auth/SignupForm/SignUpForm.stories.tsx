import type { Meta, StoryObj } from "@storybook/react";
import SignupForm from "./SignupForm";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof SignupForm> = {
  title: "Auth/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SignupForm>;

export const Primary: Story = {
  render: () => (
    <BrowserRouter>
      <SignupForm />
    </BrowserRouter>
  ),
};
