import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import EditCategoryForm from "./EditCategoryForm";
import * as CategoryServices from "@services/CategoryServices";

vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  __esModule: true,
  default: ({ label, register, error }: any) => {
    const name = register?.name || "field";
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          onChange={register?.onChange}
          onBlur={register?.onBlur}
          ref={register?.ref}
        />
        {error && <p>{error.message}</p>}
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

const mockGetCategories = vi.spyOn(CategoryServices, "getCategories");
const mockUpdateCategory = vi.spyOn(CategoryServices, "updateCategory");

describe("EditCategoryForm", () => {
  const mockOnCancel = vi.fn();
  const mockOnSuccess = vi.fn();
  const mockToken = "test-token";
  const categoryId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders and loads category name", async () => {
    mockGetCategories.mockResolvedValue({
      data: [
        { id: 1, name: "Test Category" },
        { id: 2, name: "Other Category" },
      ],
    });

    render(
      <EditCategoryForm
        categoryId={categoryId}
        token={mockToken}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Test Category");
    });
  });

  it("shows error toast and calls onCancel if category not found", async () => {
    const toast = await import("react-hot-toast");

    mockGetCategories.mockResolvedValue({
      data: [{ id: 999, name: "Unrelated" }],
    });

    render(
      <EditCategoryForm
        categoryId={categoryId}
        token={mockToken}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith("Category not found");
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  it("updates category and calls onSuccess", async () => {
    const toast = await import("react-hot-toast");

    mockGetCategories.mockResolvedValue({
      data: [{ id: categoryId, name: "Old Name" }],
    });

    mockUpdateCategory.mockResolvedValue({});

    render(
      <EditCategoryForm
        categoryId={categoryId}
        token={mockToken}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Old Name");
    });

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Name" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(mockUpdateCategory).toHaveBeenCalledWith(
        categoryId.toString(),
        { name: "Updated Name" },
        mockToken
      );
      expect(toast.default.success).toHaveBeenCalledWith("Category updated");
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("cancels when Cancel button is clicked", async () => {
    mockGetCategories.mockResolvedValue({
      data: [{ id: categoryId, name: "Cancelable Category" }],
    });

    render(
      <EditCategoryForm
        categoryId={categoryId}
        token={mockToken}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("shows toast error if update fails", async () => {
    const toast = await import("react-hot-toast");

    mockGetCategories.mockResolvedValue({
      data: [{ id: categoryId, name: "Fails on Update" }],
    });

    mockUpdateCategory.mockRejectedValue(new Error("Update failed"));

    render(
      <EditCategoryForm
        categoryId={categoryId}
        token={mockToken}
        onCancel={mockOnCancel}
        onSuccess={mockOnSuccess}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Name")).toHaveValue("Fails on Update");
    });

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Will Fail" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith("Update failed");
    });
  });
});
