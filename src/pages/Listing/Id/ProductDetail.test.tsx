import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as ProductServices from "@services/ProductServices";
import { useParams } from "react-router-dom";

// Mocks
vi.mock("@services/ProductServices", () => ({
  getProductById: vi.fn(),
}));

vi.mock("@components/ProductDetail/ProductDetailSkeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@components/ProductDetail/ProductInfo", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="product-info">ProductInfo: {props.title}</div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("ProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeleton on initial load", () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: "123" });

    // never resolves
    (ProductServices.getProductById as any).mockImplementation(() => new Promise(() => {}));

    render(<ProductDetail />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("fetches and renders product detail on success", async () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: "123" });

    (ProductServices.getProductById as any).mockResolvedValue({
      data: {
        id: 123,
        title: "Test Product",
        image: "https://example.com/img.jpg",
        price: 20,
        description: "Product Description",
        category: "Books",
        inventory: { available: 5, total: 5 },
      },
    });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.getByAltText("Test Product")).toBeInTheDocument();
      expect(screen.getByTestId("product-info")).toHaveTextContent("Test Product");
    });
  });

  it("logs error if product ID is missing", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: undefined });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching product:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("handles API returning undefined product gracefully", async () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: "999" });

    (ProductServices.getProductById as any).mockResolvedValue({
      data: null,
    });

    render(<ProductDetail />);

    await waitFor(() => {
      expect(screen.queryByTestId("product-info")).not.toBeInTheDocument();
      expect(screen.queryByAltText(/.+/)).not.toBeInTheDocument();
    });
  });

  it("renders correct product image", async () => {
    (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: "123" });

    (ProductServices.getProductById as any).mockResolvedValue({
      data: {
        id: 123,
        title: "Test Product",
        image: "https://example.com/img.jpg",
        price: 20,
        description: "Product Description",
        category: "Books",
        inventory: { available: 5, total: 5 },
      },
    });

    render(<ProductDetail />);
    const image = await screen.findByAltText("Test Product");
    expect(image).toHaveAttribute("src", "https://example.com/img.jpg");
  });
});
