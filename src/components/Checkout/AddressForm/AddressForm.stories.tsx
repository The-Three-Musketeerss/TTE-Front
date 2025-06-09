import type { Meta, StoryObj } from "@storybook/react";
import AddressForm from "./AddressForm";

const meta: Meta<typeof AddressForm> = {
  title: "Checkout/AddressForm",
  component: AddressForm,
  tags: ["autodocs"],
  argTypes: {
    initialValues: {
      control: "object",
      defaultValue: {
        firstName: "Juan",
        lastName: "Pérez",
        address: "Calle 123",
        apartment: "Apto 4B",
        country: "Colombia",
        city: "Bogotá",
        zipcode: "11011",
        optional: "",
        saveContact: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AddressForm>;

export const Primary: Story = {
  args: {
    initialValues: {
      firstName: "Juan",
      lastName: "Pérez",
      address: "Calle 123",
      apartment: "Apto 4B",
      country: "Colombia",
      city: "Bogotá",
      zipcode: "110111",
      optional: "",
      saveContact: true,
    },
  },
  render: (args) => (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow">
      <AddressForm
        {...args}
        onNext={(address, data) => {
          alert(`Address submitted: ${address}`);
          console.log("Full form data:", data);
        }}
      />
    </div>
  ),
};
