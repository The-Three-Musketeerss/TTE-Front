import type { Meta, StoryObj } from "@storybook/react";
import BaseInput from "./BaseInput";

const meta: Meta<typeof BaseInput> = {
  title: "Shared/BaseInput",
  component: BaseInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BaseInput>;

export const Primary: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "This input is disabled",
    register: {
      disabled: true,
    },
  },
};