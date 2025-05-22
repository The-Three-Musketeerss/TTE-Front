import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import BaseLayout from "./BaseLayout";
import { MemoryRouter } from "react-router-dom";

vi.mock("@components/shared/Header/Header", () => ({
  __esModule: true,
  default: () => <div data-testid="header">Mocked Header</div>,
}));

vi.mock("@components/shared/Footer/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer">Mocked Footer</div>,
}));

vi.mock("react-router-dom", async (importActual) => {
  const actual = await importActual();
  return {
    ...(typeof actual === "object" && actual !== null ? actual : {}),
    Outlet: () => <div data-testid="outlet">Mocked Outlet</div>,
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

vi.mock("@hooks/useGetUser", () => ({
  useGetUser: vi.fn(),
}));

import * as useGetUserModule from "@hooks/useGetUser";

describe("BaseLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with header and footer when enabled", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({ user: { role: "Shopper" } });

    render(<BaseLayout showHeader={true} showFooter={true} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("does not render header and footer when disabled", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({ user: { role: "Admin" } });

    render(<BaseLayout showHeader={false} showFooter={false} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.queryByTestId("header")).toBeNull();
    expect(screen.queryByTestId("footer")).toBeNull();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("shows 'Wishlist' link only for Shopper role", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({ user: { role: "Shopper" } });

    render(<BaseLayout />, { wrapper: MemoryRouter });

    expect(screen.getByText("Wishlist")).toBeInTheDocument();
    expect(screen.getByText("Shop list")).toBeInTheDocument();
  });

  it("does not show 'Wishlist' link for Admin role", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({ user: { role: "Admin" } });

    render(<BaseLayout />, { wrapper: MemoryRouter });

    expect(screen.queryByText("Wishlist")).toBeNull();
    expect(screen.getByText("Shop list")).toBeInTheDocument();
  });

  it("renders drawer elements correctly", () => {
  (useGetUserModule.useGetUser as any).mockReturnValue({ user: { role: "Shopper" } });

  render(<BaseLayout />, { wrapper: MemoryRouter });

  expect(screen.getByRole("checkbox")).toHaveAttribute("id", "my-drawer");

  const overlayLabel = screen.getByLabelText("");
  expect(overlayLabel).toBeInTheDocument();
});

});
