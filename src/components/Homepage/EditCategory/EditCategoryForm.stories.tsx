import type { Meta, StoryObj } from "@storybook/react";
import EditCategoryForm from "./EditCategoryForm";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { useState } from "react";

const meta: Meta<typeof EditCategoryForm> = {
  title: "Homepage/EditCategoryForm",
  component: EditCategoryForm,
  tags: ["autodocs"],
  argTypes: {
    categoryId: {
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

type Story = StoryObj<typeof EditCategoryForm>;

export const Primary: Story = {
  args: {
    categoryId: 1,
    token: "mock-token",
  },
  render: (args) => {
    const [success, setSuccess] = useState(false);

    return (
      <CookiesProvider>
        <BrowserRouter>
          {!success ? (
            <EditCategoryForm
              {...args}
              onSuccess={() => {
                setSuccess(true);
                alert("Success callback triggered");
              }}
              onCancel={() => alert("Cancel callback triggered")}
            />
          ) : (
            <p className="text-center text-green-600">Category updated successfully</p>
          )}
        </BrowserRouter>
      </CookiesProvider>
    );
  },
};
