import type { Meta, StoryObj } from "@storybook/react";
import EditProductForm from "./EditProductForm";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

const meta: Meta<typeof EditProductForm> = {
  title: "Admin/EditProductForm",
  component: EditProductForm,
  tags: ["autodocs"],
  argTypes: {
    productId: {
      control: "number",
      defaultValue: 1,
    },
    token: {
      control: "text",
      defaultValue: "mock-token",
    },
  },
};

export default meta;

type Story = StoryObj<typeof EditProductForm>;

export const Primary: Story = {
  args: {
    productId: 1,
    token: "mock-token",
  },
  render: (args) => {
    const [success, setSuccess] = useState(false);

    return (
      <CookiesProvider>
        <BrowserRouter>
          {!success ? (
            <EditProductForm
              {...args}
              onCancel={() => alert("Cancel clicked")}
              onSuccess={() => {
                alert("Update success!");
                setSuccess(true);
              }}
            />
          ) : (
            <p className="text-green-600 text-center">Product updated</p>
          )}
        </BrowserRouter>
      </CookiesProvider>
    );
  },
};
