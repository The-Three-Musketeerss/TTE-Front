import type { Meta, StoryObj } from "@storybook/react";
import ShippingOption from "./ShippingOption";

const meta: Meta<typeof ShippingOption> = {
  title: "Checkout/ShippingOption",
  component: ShippingOption,
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text", defaultValue: "surepost" },
    title: { control: "text", defaultValue: "UPS/USPS Surepost" },
    description: {
      control: "text",
      defaultValue: "4–7 Business Days",
    },
    selected: { control: "boolean", defaultValue: true },
  },
};

export default meta;

type Story = StoryObj<typeof ShippingOption>;

export const Primary: Story = {
  args: {
    id: "surepost",
    title: "UPS/USPS Surepost",
    description: "4–7 Business Days",
    selected: true,
  },
  render: (args) => (
    <div className="max-w-md p-4">
      <ShippingOption {...args} onSelect={(id) => alert(`Selected: ${id}`)} />
    </div>
  ),
};
