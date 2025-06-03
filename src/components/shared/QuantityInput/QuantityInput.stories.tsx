import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import QuantityInput from "./QuantityInput";

const meta: Meta<typeof QuantityInput> = {
  title: "Shared/QuantityInput",
  component: QuantityInput,
  argTypes: {
    count: {
      control: { type: "number", min: 0, max: 20 },
      description: "Current quantity value",
    },
    maxCount: {
      control: { type: "number" },
      description: "Maximum allowed quantity",
      defaultValue: 10,
    },
    minCount: {
      control: { type: "number" },
      description: "Minimum allowed quantity",
      defaultValue: 1,
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof QuantityInput>;

export const Primary: Story = {
  args: {
    count: 1,
    maxCount: 10,
    minCount: 1,
  },
  render: (args) => {
    const [count, setCount] = useState(args.count);
    return (
      <QuantityInput
        count={count}
        setCount={setCount}
        maxCount={args.maxCount}
        minCount={args.minCount}
      />
    );
  },
};

export const MaxReached: Story = {
  args: {
    count: 10,
    maxCount: 10,
    minCount: 1,
  },
  render: (args) => {
    const [count, setCount] = useState(args.count);
    return (
      <QuantityInput
        count={count}
        setCount={setCount}
        maxCount={args.maxCount}
        minCount={args.minCount}
      />
    );
  },
};

export const MinReached: Story = {
  args: {
    count: 1,
    maxCount: 10,
    minCount: 1,
  },
  render: (args) => {
    const [count, setCount] = useState(args.count);
    return (
      <QuantityInput
        count={count}
        setCount={setCount}
        maxCount={args.maxCount}
        minCount={args.minCount}
      />
    );
  },
};
