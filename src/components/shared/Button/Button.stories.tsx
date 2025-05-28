import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    type: {
      control: "select",
      options: ["button", "submit"],
    },
    fullWidth: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: "Click Me",
    fullWidth: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    text: "Can't Click",
    disabled: true,
  },
};

export const WithJSX: Story = {
  args: {
    text: <span><strong>Bold</strong> Text</span>,
  },
};
