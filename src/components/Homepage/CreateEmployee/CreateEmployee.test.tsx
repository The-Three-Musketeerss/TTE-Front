import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateEmployee from "./CreateEmployee";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as AuthServices from "@services/AuthServices";
import * as useGetUserModule from "@hooks/useGetUser";

// Mocks
vi.mock("@services/AuthServices", () => ({
  createEmployee: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));


vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  default: ({ label, register, ...props }: any) => {
    return (
      <input
        aria-label={label}
        {...register}
        {...props}
      />
    );
  },
}));




vi.mock("@components/shared/Button/Button", () => ({
  default: ({ text, ...props }: any) => <button {...props}>{text}</button>,
}));

describe("CreateEmployee", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        username: "admin-user",
        email: "admin@example.com",
        role: "admin",
        token: "test-token",
      },
      hasLoggedIn: true,
    });

    (AuthServices.createEmployee as any).mockResolvedValue({
      message: "Employee created successfully",
    });
  });

  it("submits the form and calls createEmployee with correct data", async () => {
    render(<CreateEmployee />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "jdoe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Employee" }));

    await waitFor(() => {
      expect(AuthServices.createEmployee).toHaveBeenCalledWith(
        {
          name: "John Doe",
          userName: "jdoe",
          email: "john@example.com",
          password: "secret123",
        },
        "test-token"
      );
    });
  });

  it("shows backend error message if request fails", async () => {
    (AuthServices.createEmployee as any).mockRejectedValueOnce(
      new Error("Email already exists")
    );

    render(<CreateEmployee />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "jsmith" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Employee" }));

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("shows toast error if user is not authorized", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: null,
      hasLoggedIn: false,
    });

    const toast = await import("react-hot-toast");

    render(<CreateEmployee />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Employee" }));

    await waitFor(() => {
      expect(toast.default.error).toHaveBeenCalledWith("Not authorized");
    });
  });
});
