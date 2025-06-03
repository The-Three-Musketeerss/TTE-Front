import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Shared/Select",
  component: Select,
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the select",
      defaultValue: "Select an option",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the default option",
      defaultValue: "Choose one...",
    },
    data: {
      control: "object",
      description: "Array of options to show in the dropdown",
    },
    error: {
      control: false,
      description: "React Hook Form field error object",
    },
    register: {
      control: false,
      description: "React Hook Form register function",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { id: 1, label: "Option A" },
  { id: 2, label: "Option B" },
  { id: 3, label: "Option C" },
];

export const Primary: Story = {
  args: {
    label: "Choose an option",
    placeholder: "Select one",
    data: sampleOptions,
  },
  render: (args) => {
    const { register } = useForm();
    return <Select {...args} register={register("selectField")} />;
  },
};

export const WithError: Story = {
  args: {
    label: "Choose an option",
    placeholder: "Select one",
    data: sampleOptions,
    error: { type: "required", message: "This field is required" },
  },
  render: (args) => {
    const { register } = useForm();
    return <Select {...args} register={register("selectField")} />;
  },
};
