import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateCategory from "./CreateCategory";
import { vi, describe, it, expect, beforeEach } from "vitest";
import * as CategoryServices from "@services/CategoryServices";
import * as useGetUserModule from "@hooks/useGetUser";

// Mocks
vi.mock("@services/CategoryServices", () => ({
  createCategory: vi.fn(),
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
  default: ({ label, register }: any) => {
    const { name, onChange, onBlur, ref } = register;
    return (
      <input
        aria-label={label}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    );
  },
}));

vi.mock("@components/shared/Button/Button", () => ({
  default: ({ text, ...props }: any) => <button {...props}>{text}</button>,
}));

describe("CreateCategory", () => {
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

    (CategoryServices.createCategory as any).mockResolvedValue({
      message: "Category created successfully",
    });
  });

  it("submits the form and calls createCategory", async () => {
    render(<CreateCategory />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Books" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(CategoryServices.createCategory).toHaveBeenCalledWith(
        "Books",
        "test-token"
      );
    });
  });
});
