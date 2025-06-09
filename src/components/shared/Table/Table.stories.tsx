import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta: Meta<typeof Table> = {
  title: "Shared/Table",
  component: Table,
  argTypes: {
    headers: {
      control: "object",
      description: "Array of column definitions with label and key",
    },
    data: {
      control: "object",
      description: "Array of rows with values matching header keys",
    },
    rowKey: {
      control: "text",
      description: "Key to uniquely identify each row (defaults to 'id')",
      defaultValue: "id",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Table>;

const sampleHeaders = [
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Email", key: "email" },
];

const sampleData = [
  { id: 1, name: "Alice", age: 28, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 34, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
];

export const Primary: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    rowKey: "id",
  },
};

export const Empty: Story = {
  args: {
    headers: sampleHeaders,
    data: [],
  },
};
