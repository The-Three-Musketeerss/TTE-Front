import { render, screen, waitFor } from "@testing-library/react";
import OrderCard from "./OrderCard";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as ProductServices from "@services/ProductServices";

vi.mock("@services/ProductServices", () => ({
  getProductById: vi.fn(),
}));

describe("OrderCard", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 25,
    image: "https://example.com/image.jpg",
    description: "Description",
    category: "Test",
    inventory: {
      total: 100,
      available: 50,
    },
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing while loading", () => {
    (ProductServices.getProductById as any).mockReturnValue(new Promise(() => {})); // pending

    render(<OrderCard id={1} token="abc" quantity={2} />);
    expect(screen.queryByText("Quantity:")).not.toBeInTheDocument();
  });

  it("calls getProductById with correct ID", async () => {
    (ProductServices.getProductById as any).mockResolvedValue({ data: mockProduct });

    render(<OrderCard id={1} token="abc" quantity={2} />);

    await waitFor(() => {
      expect(ProductServices.getProductById).toHaveBeenCalledWith("1");
    });
  });

  it("renders product details correctly", async () => {
    (ProductServices.getProductById as any).mockResolvedValue({ data: mockProduct });

    render(<OrderCard id={1} token="abc" quantity={2} />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
      expect(screen.getByText("$50.00")).toBeInTheDocument(); // 25 * 2
      expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    });

    const image = screen.getByAltText("Test Product") as HTMLImageElement;
    expect(image.src).toBe("https://example.com/image.jpg");
  });
});
