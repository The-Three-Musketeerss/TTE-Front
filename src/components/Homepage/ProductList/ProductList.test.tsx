import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as ProductServices from "@services/ProductServices";
import * as useGetUserModule from "@hooks/useGetUser";

// Mocks
vi.mock("@services/ProductServices", () => ({
  getProducts: vi.fn(),
  deleteProduct: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@components/Homepage/EditProduct/EditProductForm", () => ({
  __esModule: true,
  default: ({ onCancel, onSuccess }: any) => (
    <div>
      <button onClick={onCancel}>Cancel Edit</button>
      <button onClick={onSuccess}>Confirm Edit</button>
    </div>
  ),
}));

vi.mock("@components/shared/Table/Table", () => ({
  __esModule: true,
  default: ({ headers, data }: any) => (
    <table>
      <thead>
        <tr>
          {headers.map((h: any) => (
            <th key={h.key}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, index: number) => (
          <tr key={index}>
            <td>{row.title}</td>
            <td>{row.total}</td>
            <td>{row.available}</td>
            <td>{row.createdAt}</td>
            <td>{row.price}</td>
            <td>{row.actions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, ...props }: any) => (
    <button {...props}>{typeof text === "string" ? text : "Icon"}</button>
  ),
}));

vi.mock("@components/shared/Table/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe("ProductList", () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      inventory: { total: 50, available: 10 },
      createdAt: new Date().toISOString(),
      price: 99.99,
    },
    {
      id: 2,
      title: "Product 2",
      inventory: { total: 30, available: 5 },
      createdAt: new Date().toISOString(),
      price: 149.99,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        token: "test-token",
        username: undefined,
        email: undefined,
        role: undefined,
      },
      hasLoggedIn: false,
    });

    (ProductServices.getProducts as any).mockResolvedValue({
      data: products,
      page: 1,
      totalPages: 2,
    });
  });

  it("renders the product list and allows deletion", async () => {
    window.confirm = vi.fn(() => true);

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTitle("Delete Button");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(ProductServices.deleteProduct).toHaveBeenCalledWith("1", "test-token");
    });
  });

  it("renders edit form when clicking edit icon", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    const editButtons = screen.getAllByTitle("Edit Button");
    fireEvent.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Cancel Edit"));

    await waitFor(() => {
      expect(screen.queryByText("Cancel Edit")).not.toBeInTheDocument();
    });
  });

  it("navigates to next page", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    const navButtons = screen.getAllByText("Icon");
    const nextButton = navButtons.find((_, i) => i > 0);

    fireEvent.click(nextButton!);

    await waitFor(() => {
      expect(ProductServices.getProducts).toHaveBeenCalledWith({ page: 2, size: 10 });
    });
  });
});
