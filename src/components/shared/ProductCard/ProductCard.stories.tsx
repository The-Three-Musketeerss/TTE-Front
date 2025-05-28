import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";
import { BrowserRouter } from "react-router-dom";
import Image from "@assets/Media/ProductPlaceholder.png";

const meta: Meta<typeof ProductCard> = {
    title: "Shared/ProductCard",
    component: ProductCard,
    argTypes: {
        isFavorite: {
            control: "boolean",
            description: "Whether the product is marked as favorite",
            defaultValue: false,
        },
        onToggleFavorite: {
            action: "toggled",
            description: "Function to toggle the favorite status of the product",
        },
        id: {
            description: "Unique identifier for the product",
            defaultValue: 0,
        },
    },
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const mockProduct = {
    id: 1,
    title: "Mocked Product",
    price: 29.99,
    image: Image,
};

export const Primary: Story = {
    args: {
      isFavorite: false,
    },
  render: (args) => {
    return (
      <BrowserRouter>
        <ProductCard
          {...mockProduct}
          {...args}
        />
      </BrowserRouter>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <BrowserRouter>
      <ProductCard
        {...mockProduct}
        isFavorite={true}
        onToggleFavorite={() => {}}
      />
    </BrowserRouter>
  ),
};
