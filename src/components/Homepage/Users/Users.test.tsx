import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, expect } from "vitest";
import Users from "./Users";
import * as UserServices from "@services/UserServices";
import * as useGetUserHook from "@hooks/useGetUser";

vi.mock("@components/shared/Table/Table", () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <table data-testid="table">
      <tbody>
        {data.map((user: any, i: number) => (
          <tr key={i}>
            <td>{user.id}</td>
            <td>{user.userName}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("@components/shared/Table/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("@hooks/useGetUser", () => ({
  useGetUser: vi.fn(),
}));

const mockGetUsers = vi.spyOn(UserServices, "getUsers");

describe("Users component", () => {
  const mockUser = {
    user: { token: "mock-token" },
  };

  let consoleErrorSpy: ReturnType<typeof vi.spyOn> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    (useGetUserHook.useGetUser as any).mockReturnValue(mockUser);
  });

  afterEach(() => {
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore();
      consoleErrorSpy = undefined;
    }
  });

  it("renders loading skeleton initially", () => {
    mockGetUsers.mockReturnValue(new Promise(() => {}));

    render(<Users />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders users table after data is loaded", async () => {
    mockGetUsers.mockResolvedValue([
      {
        id: 1,
        userName: "admin",
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
      },
    ]);

    render(<Users />);

    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
      expect(screen.getByText("admin")).toBeInTheDocument();
      expect(screen.getByText("Admin User")).toBeInTheDocument();
      expect(screen.getByText("admin@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });
  });

  it("does not fetch if token is missing", async () => {
    (useGetUserHook.useGetUser as any).mockReturnValue({ user: null });

    render(<Users />);

    await waitFor(() => {
      expect(mockGetUsers).not.toHaveBeenCalled();
    });
  });

  it("logs error if getUsers fails", async () => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockGetUsers.mockRejectedValue(new Error("Fetch failed"));

    render(<Users />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to load users",
        expect.any(Error)
      );
    });
  });
});
