import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Shared/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
      defaultValue: false,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    checked: false,
    value: "Accept terms",
  },
  render: (args) => {
    return (
      <Checkbox
        {...args}
        onChange={() => args.onChange ? args.onChange() : null}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Checkbox value="Disabled option" checked={false} onChange={() => {}} />
  ),
};
