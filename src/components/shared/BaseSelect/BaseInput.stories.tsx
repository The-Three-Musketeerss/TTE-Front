import type { Meta, StoryObj } from "@storybook/react";
import BaseSelect from "./BaseSelect";

const meta: Meta<typeof BaseSelect> = {
  title: "Shared/BaseSelect",
  component: BaseSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BaseSelect>;

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

export const Primary: Story = {
  args: {
    label: "Select an option",
    options,
  },
};

export const Disabled: Story = {
  args: {
    label: "Select an option",
    options,
    register: {
      disabled: true,
    },
  },
};
