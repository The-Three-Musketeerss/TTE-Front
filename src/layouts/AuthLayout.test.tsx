import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import AuthLayout from "./AuthLayout";
import { MemoryRouter } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Mocked Outlet</div>,
  };
});

describe("AuthLayout", () => {
  it("renders heading and nested outlet", () => {
    render(<AuthLayout />, { wrapper: MemoryRouter });

    expect(screen.getByText("Tech Trend Emporium")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
