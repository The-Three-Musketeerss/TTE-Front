import type { Meta, StoryObj } from "@storybook/react";
import ShippingMethodForm from "./ShippingMethodForm";

const meta: Meta<typeof ShippingMethodForm> = {
  title: "Checkout/ShippingMethodForm",
  component: ShippingMethodForm,
  tags: ["autodocs"],
  argTypes: {
    initialValue: {
      control: "radio",
      options: ["surepost", "ground"],
      defaultValue: "surepost",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ShippingMethodForm>;

export const Primary: Story = {
  args: {
    initialValue: "surepost",
  },
  render: (args) => (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow">
      <ShippingMethodForm
        {...args}
        onChange={(option) => console.log("Shipping method selected:", option)}
        onNext={() => alert("Continue to payment")}
      />
    </div>
  ),
};
