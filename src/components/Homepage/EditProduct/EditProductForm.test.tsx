import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import EditProductForm from "./EditProductForm";
import * as ProductServices from "@services/ProductServices";

vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  __esModule: true,
  default: ({ label, register, type = "text", placeholder }: any) => {
    const name = register?.name || "input";
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={register?.onChange}
          onBlur={register?.onBlur}
          ref={register?.ref}
        />
      </div>
    );
  },
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockGetProductById = vi.spyOn(ProductServices, "getProductById");
const mockUpdateProduct = vi.spyOn(ProductServices, "updateProduct");

describe("EditProductForm", () => {
  const token = "mock-token";
  const productId = 123;
  const mockOnCancel = vi.fn();
  const mockOnSuccess = vi.fn();

  const mockProduct = {
    id: productId,
    title: "Sample Product",
    price: 49.99,
    description: "Great product",
    category: "Electronics",
    image: "http://example.com/image.jpg",
    inventory: {
      total: 100,
      available: 75,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads and displays product data", async () => {
    mockGetProductById.mockResolvedValue({ data: mockProduct });

    render(
      <EditProductForm
        productId={productId}
        token={token}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toHaveValue("Sample Product");
      expect(screen.getByLabelText("Price")).toHaveValue("49.99");
      expect(screen.getByLabelText("Description")).toHaveValue("Great product");
      expect(screen.getByLabelText("Category")).toHaveValue("Electronics");
      expect(screen.getByLabelText("Image URL")).toHaveValue("http://example.com/image.jpg");
      expect(screen.getByLabelText("Total")).toHaveValue("100");
      expect(screen.getByLabelText("Available")).toHaveValue("75");
    });
  });

  it("submits updated data and calls onSuccess", async () => {
    const toast = await import("react-hot-toast");
    mockGetProductById.mockResolvedValue({ data: mockProduct });
    mockUpdateProduct.mockResolvedValue({});

    render(
      <EditProductForm
        productId={productId}
        token={token}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Title")).toHaveValue("Sample Product");
    });

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Product" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith(
        productId.toString(),
        {
          id: productId,
          title: "Updated Product",
          price: 49.99,
          description: "Great product",
          category: "Electronics",
          image: "http://example.com/image.jpg",
          inventory: {
            total: 100,
            available: 75,
          },
        },
        token
      );
      expect(toast.default.success).toHaveBeenCalledWith("Product updated");
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("calls onCancel when product is not found", async () => {
    const toast = await import("react-hot-toast");
    mockGetProductById.mockResolvedValue({ data: null });

    render(
      <EditProductForm
        productId={productId}
        token={token}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith("Product not found");
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  it("shows error toast if update fails", async () => {
    const toast = await import("react-hot-toast");

    mockGetProductById.mockResolvedValue({ data: mockProduct });
    mockUpdateProduct.mockRejectedValue(new Error("Update failed"));

    render(
      <EditProductForm
        productId={productId}
        token={token}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalled;
    });
  });

  it("calls onCancel when Cancel button is clicked", async () => {
    mockGetProductById.mockResolvedValue({ data: mockProduct });

    render(
      <EditProductForm
        productId={productId}
        token={token}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
