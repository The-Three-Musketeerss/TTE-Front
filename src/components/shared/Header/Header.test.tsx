import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Header from "./Header";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import * as useGetUserModule from "@hooks/useGetUser";
import * as useShopModule from "@contexts/ShopContext";

vi.mock("react-cookie", () => ({
  useCookies: vi.fn(() => [[], vi.fn(), vi.fn()]),
}));

vi.mock("@hooks/useGetUser", () => ({
  useGetUser: vi.fn(),
}));

vi.mock("@contexts/ShopContext", () => ({
  useShop: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/", search: "" }),
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
    Link: (props: any) => <a href={props.to}>{props.children}</a>,
  };
});

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it("shows logo and shop link", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({
      user: null,
      hasLoggedIn: false,
    });

    (useShopModule.useShop as any).mockReturnValue({ cartCount: 0 });

    renderWithRouter();

    expect(screen.getByText("Shop list")).toBeInTheDocument();
  });

  it("shows login button when not logged in", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({
      user: null,
      hasLoggedIn: false,
    });

    (useShopModule.useShop as any).mockReturnValue({ cartCount: 0 });

    renderWithRouter();

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("shows username and logout when logged in", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({
      user: { username: "Shopper", role: "Shopper" },
      hasLoggedIn: true,
    });

    (useShopModule.useShop as any).mockReturnValue({
      cartCount: 1,
    });

    renderWithRouter();

    expect(screen.getByText("Shopper")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // cart count badge
  });

  it("navigates on search", async () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({
      user: null,
      hasLoggedIn: false,
    });

    (useShopModule.useShop as any).mockReturnValue({ cartCount: 0 });

    renderWithRouter();

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "keyboard" } });

    const form = input.closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/listing?search=keyboard");
    });
  });

  it("navigates to cart when cart icon is clicked", () => {
    (useGetUserModule.useGetUser as any).mockReturnValue({
      user: { username: "Shopper", role: "Shopper" },
      hasLoggedIn: true,
    });

    (useShopModule.useShop as any).mockReturnValue({
      cartCount: 1,
    });

    renderWithRouter();

    const cartIcon = screen.getByTitle("Cart Icon");
    fireEvent.click(cartIcon);

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });
});
