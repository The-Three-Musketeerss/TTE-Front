import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateProduct from "./CreateProduct";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as ProductServices from "@services/ProductServices";
import * as useGetUserModule from "@hooks/useGetUser";

// Mocks
vi.mock("@services/ProductServices", () => ({
  createProduct: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    promise: vi.fn((promise: Promise<any>, opts: any) =>
      promise.then(opts.success).catch(opts.error)
    ),
  },
}));

vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  default: ({ label, register, ...props }: any) => {
    const { name, onChange, onBlur, ref } = register;
    return (
      <input
        aria-label={label}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
    );
  },
}));

vi.mock("@components/shared/Button/Button", () => ({
  default: ({ text, ...props }: any) => <button {...props}>{text}</button>,
}));

describe("CreateProduct", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        username: "test-user",
        email: "test@example.com",
        role: "admin",
        token: "test-token",
      },
      hasLoggedIn: true,
    });

    (ProductServices.createProduct as any).mockResolvedValue({
      message: "Product created successfully",
    });
  });

  it("submits the form and calls createProduct with correct data", async () => {
    render(<CreateProduct />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Sample Product" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "99.99" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A sample product description" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Books" },
    });
    fireEvent.change(screen.getByLabelText("Image URL"), {
      target: { value: "https://example.com/image.jpg" },
    });
    fireEvent.change(screen.getByLabelText("Total"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Available"), {
      target: { value: "5" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(ProductServices.createProduct).toHaveBeenCalledWith(
        {
          id: undefined, // not in form
          title: "Sample Product",
          price: 99.99,
          description: "A sample product description",
          category: "Books",
          image: "https://example.com/image.jpg",
          inventory: {
            total: 10,
            available: 5,
          },
        },
        "test-token"
      );
    });
  });
});
